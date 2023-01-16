---
title: "Creating and uploading Helm packages"
description: "Manually create and upload Helm packages"
group: deployments
sub_group: helm
redirect_from:
  - /docs/create-helm-artifacts-using-codefresh-pipeline/
toc: true
---

Helm packages are just TAR files. Helm repositories are simple file hierarchies with an extra [index.yaml](https://helm.sh/docs/developing_charts/#the-chart-repository-structure){:target="\_blank"}.
You can run custom commands and manually upload indexes and packages to a Helm repo.

>This article shows some non-standard Helm examples.  
  For the basic use cases, or if you are just getting started with Helm, see our [Helm quick start guide]({{site.baseurl}}/docs/quick-start/ci-quickstart/deploy-with-helm/)  and [Using Helm in pipelines]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/).

## Package a Helm chart
Below is an example of a freestyle step in a Codefresh pipeline that packages the Helm chart and then extracts the chart name from the command output. It also saves that package name in an environment variable for later use.

  `YAML`
{% highlight yaml %}
{% raw %}
helm_package:
    image: devth/helm
    commands:
      - cf_export PACKAGE=$(helm package <mychart> | cut -d " " -f 8)
{% endraw %}
{% endhighlight %}

The `helm package` command expects a path to an unpacked chart. Replace `<mychart>` in the example with the directory that holds your chart files. Note that this directory must have the same name as the chart name, as per Helm requirements.<br>
See [Helm package docs](https://helm.sh/docs/helm/helm_package/){:target="_blank"} and [Helm charts overview](https://helm.sh/docs/topics/charts/){:target="_blank"} for more information.

{{site.data.callout.callout_info}}
To use `cf_export`and make the variable available to other steps in the pipeline, see [Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables). 
{{site.data.callout.end}}

## Example 1: Push the chart to GCS based Helm Repository
The first example pushes the packaged chart into a public cloud storage service, like AWS S3, Azure Storage, or Google Cloud Storage. We chose Google Cloud Storage (GCS) for this example.
Our pipeline has three steps:

{:start="1"}
1. download_index: download the Helm `index.yaml` file from GCS, or create one of it's not there.

{:start="2"}
2. helm_package_merge: package the chart as described earlier, and also merge the new package into the downloaded `index.yaml` file, using the `helm repo index --merge` command.

{:start="3"}
3. push_gcs: upload the updated `index.yaml` file and the newly created package to GCS.

  `YAML`
{% highlight yaml %}
{% raw %}
steps:
  download_index:
    image: appropriate/curl:latest
    commands:
      - 'curl https://storage.googleapis.com/$GOOGLE_BUCKET_NAME/index.yaml --output ./index.yaml --fail || :'
      - '[ ! -f ./index.yaml ] && echo "apiVersion: v1">./index.yaml'
  helm_package_merge:
    image: devth/helm
    commands:
      - cf_export PACKAGE=$(helm package <mychart> | cut -d " " -f 8)
      - helm repo index --merge ./index.yaml .
  push_gcs:
    image: camil/gsutil
    commands:
      - echo -E $GOOGLE_CREDENTIALS > /gcs-creds.json
      - echo -e "[Credentials]\ngs_service_key_file = /gcs-creds.json\n[GSUtil]\ndefault_project_id = $GOOGLE_PROJECT_ID" > /root/.boto
      - gsutil cp ./index.yaml gs://$GOOGLE_BUCKET_NAME 
      - gsutil cp $PACKAGE gs://$GOOGLE_BUCKET_NAME
{% endraw %}
{% endhighlight %}


### Environment setup

This pipeline references some predefined environment variables such as `GOOGLE_BUCKET_NAME`, `GOOGLE_PROJECT_ID` and `GOOGLE_CREDENTIALS`.  
For this example, we created a service account with appropriate permissions in Google Cloud, and saved the credentials into `GOOGLE_CREDENTIALS` as a Codefresh Secret. <br>
For more information, see:
[Authenticating with Google services](https://cloud.google.com/storage/docs/authentication#service_accounts){:target="_blank"} 
[Codefresh pipeline configuration and secrets]({{site.baseurl}}/pipelines/variables/#user-provided-variables)

## Example 2: Push the chart to Chart Museum
Chart Museum is a Helm repository *server* that has an HTTP API, pluggable backends, authentication, and more. 
Read more about [Chart Museum](https://github.com/kubernetes-helm/chartmuseum){:target="_blank"}.

In this example, we already have a Chart Museum server running, so we'll push the packaged chart to it.  

The steps will be:

{:start="1"}
1. helm_package: package the chart as described earlier.

{:start="2"}
2. get_repo_url: In order to avoid hard-coding the repository URL into the pipeline, we will retrieve it from the Codefresh Helm integration. 
In this case, we have added our repository with Codefresh as described in [Using external Helml repos in Codefresh pipelines]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories). 
Replace `<reponame>` in the example with the name you gave to your repository when you added it to Codefresh.

{:start="3"}
3. helm_push: call the Chart Museum HTTP api to just upload the package. Chart Museum will take care of the rest.

  `YAML`
{% highlight yaml %}
{% raw %}
steps:
  helm_package:
    image: devth/helm
    commands:
      - cf_export PACKAGE=$(helm package <mychart> | cut -d " " -f 8)
  get_repo_url:
    image: codefresh/cli:latest
    commands:
      - cf_export HELM_URL=$(codefresh get ctx <reponame> -o=yaml | grep repositoryUrl | cut -d "'" -f 2)
  helm_push:
    image: appropriate/curl
    commands:
        - curl --data-binary "@$PACKAGE" $HELM_URL/api/charts
{% endraw %}
{% endhighlight %}


## Related articles
[Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)  
[Using a managed Helm repository]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/)  
[Promoting Helm environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion)
