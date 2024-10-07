---
title: "Deploy with Helm"
description: "Use Helm in a Codefresh pipeline"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/helm/
toc: true
---

[Helm](https://helm.sh/){:target="\_blank"} is the package manager for Kubernetes.  
Codefresh has comprehensive support for Helm:

* Free [built-in Helm repository]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/) with each Codefresh account
* [Helm chart dashboard]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/) to track your charts
* [Helm Release dashboard]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/) to view your deployments
* [Environment dashsboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/) to view Helm releases 
* [Helm promotion dashboard]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/) to promote Helm releases
* Add any external Helm repository on any other cloud provider

Codefresh also provides a [pipeline step]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/) for deploying with Helm.

For more insights on Helm charts see also our [Helm best practices]({{site.baseurl}}/docs/ci-cd-guides/helm-best-practices/) guide.
 

## The example Helm project

You can see the example project at [https://github.com/codefresh-contrib/helm-sample-app](https://github.com/codefresh-contrib/helm-sample-app){:target="\_blank"}. The repository contains a simple Go application, a Dockerfile and an example chart.


## Prerequisites

[At least one Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster) in your Codefresh account. 

<!--- ask Kostis if we need this?>
>Notice that if you still use Helm 2 you should also have installed the server side of Helm 2 (Tiller) using `helm init`. This command is best run from the cloud console of your cluster. The respective pipelines of this guide are in the [helm-2 branch](https://github.com/codefresh-contrib/helm-sample-app/tree/helm-2){:target=\_blank"}.  -->



## CI/CD pipeline with Helm deployment

It is possible to deploy directly a Helm chart as it exists on the filesystem. This is not the recommended way to use Helm, because you are bypassing the Helm chart repository, but it is certainly the simplest Helm pipeline possible.

{% include image.html 
lightbox="true" 
file="/images/examples/helm/helm-deploy-pipeline.png" 
url="/images/examples/helm/helm-deploy-pipeline.png" 
alt="Pipeline for Helm deployment"
caption="Pipeline for Helm deployment"
max-width="100%" 
%}

Here is the whole pipeline:

 `codefresh-do-not-store.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
  - deploy
steps:
  clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    arguments:
      repo: codefresh-contrib/helm-sample-app
      revision: master
      git: github
  build:
    title: Building Docker Image
    stage: build
    type: build
    working_directory: ./helm-sample-app
    arguments:
      image_name: helm-sample-app-go
      tag: multi-stage
      dockerfile: Dockerfile
  deploy:
    title: Deploying Helm Chart
    type: helm:1.1.12
    stage: deploy
    working_directory: ./helm-sample-app
    arguments:
      action: install
      chart_name: charts/helm-example
      release_name: my-go-chart-prod
      helm_version: 3.0.2
      kube_context: my-demo-k8s-cluster
      custom_values:
        - 'buildID=${{CF_BUILD_ID}}'
        - 'image_pullPolicy=Always'
        - 'image_tag=multi-stage'
        - 'replicaCount=3'
        - 'image_pullSecret=codefresh-generated-r.cfcr.io-cfcr-default'
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
1. Builds a docker image through a [build step]({{site.baseurl}}/docs/pipelines/steps/build/)
1. Deploys the Helm chart to a cluster named `my-demo-k8s-cluster` using the Helm step [from the Step Marketplace](https://codefresh.io/steps/step/helm){:target="\_blank"}.

In this example, `charts/helm-example` refers to the [filesystem location in the code](https://github.com/codefresh-contrib/helm-sample-app/tree/master/charts/helm-example){:target="\_blank"} that was just checked out.

The deployment will be visible in the [Helm releases dashboard]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/).

{% include image.html 
lightbox="true" 
file="/images/examples/helm/helm-release.png" 
url="/images/examples/helm/helm-release.png" 
alt="Helm release view"
caption="Helm release view"
max-width="100%" 
%}

If you want to run this example yourself, make sure to edit the chart and put your own values there for the Docker image.

## CI/CD pipeline with Helm deployment that also stores the chart

It is recommended to use a Helm repository to store your chart before deploying it. This way you know what is deployed in your clusters
and you can also reuse charts in other installations.

First of all you need to import in your pipeline from the [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/) the settings for the internal Helm repository (or any other external repository that you have setup in Codefresh).
 This will make available the internal Helm repository to your pipeline so that it can push/pull Helm charts from it.

 {% include image.html 
 lightbox="true" 
 file="/images/examples/helm/import-helm-configuration.png" 
 url="/images/examples/helm/import-helm-configuration.png" 
 alt="Using the default Helm repository in a Pipeline"
 caption="Using the default Helm repository in a Pipeline"
 max-width="40%" 
 %}

Once that is done you can change your pipeline to also store the chart first and *then* deploy it.


{% include image.html 
lightbox="true" 
file="/images/examples/helm/helm-push-and-deploy-pipeline.png" 
url="/images/examples/helm/helm-push-and-deploy-pipeline.png" 
alt="Pipeline for Helm deployment that stores chart"
caption="Pipeline for Helm deployment that stores chart"
max-width="100%" 
%}

Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
  - store
  - deploy
steps:
  clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    arguments:
      repo: codefresh-contrib/helm-sample-app
      revision: master
      git: github
  build:
    title: Building Docker Image
    stage: build
    type: build
    working_directory: ./helm-sample-app
    arguments:
      image_name: helm-sample-app-go
      tag: multi-stage
      dockerfile: Dockerfile
  store:
    title: Storing Helm Chart
    type: helm:1.1.12
    stage: store
    working_directory: ./helm-sample-app
    arguments:
      action: push
      chart_name: charts/helm-example
      kube_context: my-demo-k8s-cluster
  deploy:
    type: helm:1.1.12
    stage: deploy
    working_directory: ./helm-sample-app
    arguments:
      action: install
      chart_name: charts/helm-example
      release_name: my-go-chart-prod
      helm_version: 3.0.2
      kube_context: my-demo-k8s-cluster
      custom_values:
        - 'buildID=${{CF_BUILD_ID}}'
        - 'image_pullPolicy=Always'
        - 'image_tag=multi-stage'
        - 'replicaCount=3'
        - 'image_pullSecret=codefresh-generated-r.cfcr.io-cfcr-default'
{% endraw %}
{% endhighlight %}


After you finish running your pipeline, not only the deployment will take place, but you will also see your chart in your [Helm Chart dashboard]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/):

{% include image.html 
lightbox="true" 
file="/images/examples/helm/helm-chart.png" 
url="/images/examples/helm/helm-chart.png" 
alt="Stored Helm chart"
caption="Stored Helm chart"
max-width="80%" 
%}

It is also possible to [run your own Helm commands]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/#example-custom-helm-commands) in a Codefresh pipeline.


## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
