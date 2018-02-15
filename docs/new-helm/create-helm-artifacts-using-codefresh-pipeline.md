---
layout: docs
title: "Create Helm artifacts using Codefresh pipeline"
description: ""
group: new-helm
redirect_from:
  - /docs/create-helm-artifacts-using-codefresh-pipeline
  - /docs/create-helm-artifacts-using-codefresh-pipeline/
toc: true
---

## Package a Helm chart
Below is an example for a freestyle step that package the chart and then extracts the chart name from the command output. It also saves that package name in an environment variable for later use.

  `YAML`
{% highlight yaml %}
{% raw %}
helm_package:
    image: devth/helm
    commands:
      - cf_export PACKAGE=$(helm package <mychart> | cut -d " " -f 8)
{% endraw %}
{% endhighlight %}

The `helm package` command expects a path to an unpacked chart, replace `<mychart>` in the example with the directory that holds your chart files. Note that this directory has to be named the same as the chart name, as per Helm requirements.<br>
See [helm package docs](https://github.com/kubernetes/helm/blob/master/docs/helm/helm_package.md){:target="_blank"} and [helm charts overview](https://github.com/kubernetes/helm/blob/master/docs/charts.md){:target="_blank"} for more information.

{{site.data.callout.callout_info}}
Note the usage of `cf_export` to make the variable available for other steps in the pipeline as described here: [Codefresh Yaml Variables]({{ site.baseurl }}/docs/variables). 
{{site.data.callout.end}}

## Exampe 1: Push the chart to GCS based Helm Repository
The first example will push the packaged chart into a public cloud storage service, like AWS S3, Azure Storage, or Google Cloud Storage. We chose Google Cloud Storage (GCS) for this example.
Our pipeline will have 3 steps:

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

{{site.data.callout.callout_info}}
##### Environment setup

Note that this pipeline references some pre-defined environment variables like GOOGLE_BUCKET_NAME, GOOGLE_PROJECT_ID and GOOGLE_CREDENTIALS. For this example, we created a service account with appropriate permissions in Google Cloud, and saved that credentials into GOOGLE_CREDENTIALS as a Codefresh Secret. <br>
For more information on authenticating with Google services, see [here](https://cloud.google.com/storage/docs/authentication#service_accounts){:target="_blank"}. <br>
For more information on Codefresh pipeline configuration and secrets, see [here](https://docs.codefresh.io/v1.0/docs/pipeline#section-environment-variables){:target="_blank"}. <br> 
{{site.data.callout.end}}

## Example 2: Push the chart to Chart Museum
Chart Museum is a Helm repository *server* that has an HTTP API, pluggable backends, Authentication, and more. 
More about it here: [https://github.com/kubernetes-helm/chartmuseum](https://github.com/kubernetes-helm/chartmuseum){:target="_blank"}.

In this example, we already have a Chart Museum server running, so we'll push the packaged chart to it. The steps will be:

{:start="1"}
1. helm_package: package the chart as described earlier.

{:start="2"}
2. get_repo_url: In order to avoid hard-coding the repository URL into the pipeline, we will retrieve it from the Codefresh Helm integration. 
In this case we have added our repository with Codefresh as described [here]({{ site.baseurl }}/docs/add-helm-repository). 
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
