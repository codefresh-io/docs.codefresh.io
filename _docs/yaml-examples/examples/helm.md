---
title: "Deploy with Helm"
description: "Use Helm in a Codefresh pipeline"
group: yaml-examples
sub_group: examples
toc: true
---

[Helm](https://helm.sh/) is the package manager for Kubernetes. Codefresh has comprehensive support for Helm:

* You get a free [built-in Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/) with each Codefresh account.
* You can track your charts in the [Helm chart dashboard]({{site.baseurl}}/docs/new-helm/add-helm-repository/).
* You can view your deployments in your [Helm Release dashboard]({{site.baseurl}}/docs/new-helm/helm-releases-management/).
* You can view Helm releases in the [Environment dashsboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/).
* You can promote Helm releases in your [Helm promotion dashboard]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/).
* You can add any external Helm repository on any other cloud provider.

Codefresh also provides a [pipeline step]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/) for deploying with Helm.

For more insights on Helm charts see also our [Helm best practices]({{site.baseurl}}/docs/new-helm/helm-best-practices/) guide.
 

## The example Helm project

You can see the example project at [https://github.com/codefresh-contrib/helm-sample-app](https://github.com/codefresh-contrib/helm-sample-app). The repository contains a simple Go application, a Dockerfile and an example chart.


## Prerequisites

You need to have [added at least one Kubernetes cluster](https://codefresh.io/docs/docs/deploy-to-kubernetes/add-kubernetes-cluster/) in your Codefresh account. 

>Notice that if you still use Helm 2 you should also have installed the server side of Helm 2 (Tiller) using `helm init`. This command is best run from the cloud console of your cluster. The respective pipelines of this guide are in the [helm-2 branch](https://github.com/codefresh-contrib/helm-sample-app/tree/helm-2).



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

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare   
  - build
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/helm-sample-app'
    revision: master
    git: github    
  MyAppDockerImage:
    title: Building Docker Image
    stage: build
    type: build
    image_name: helm-sample-app-go
    working_directory: ./
    tag: 'multi-stage'
    dockerfile: Dockerfile  
  DeployMyChart:
    image: 'codefresh/cfstep-helm:3.0.3'
    title: Deploying Helm chart
    stage: deploy
    environment:
      - CHART_REF=charts/helm-example
      - RELEASE_NAME=my-go-chart-prod
      - KUBE_CONTEXT=my-demo-k8s-cluster
      - VALUE_image_pullPolicy=Always
      - VALUE_image_tag='multi-stage'
      - VALUE_replicaCount=3
      - VALUE_buildID='${{CF_BUILD_ID}}'
      - VALUE_image_pullSecret=codefresh-generated-r.cfcr.io-cfcr-default
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. Builds a docker image using a [Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
1. Deploys the Helm chart to a cluster named `my-demo-k8s-cluster`

Note that in this example `charts/helm-example` refers to the [filesystem location in the code](https://github.com/codefresh-contrib/helm-sample-app/tree/master/charts/helm-example) that was just checked out.

The deployment will be visible in the [Helm releases dashboard]({{site.baseurl}}/docs/new-helm/helm-releases-management/).

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

First of all you need to import in your pipeline from the [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) the settings for the internal Helm repository (or any other external repository that you have setup in Codefresh).
This will make available the internal Helm repository to your pipeline so that it can push/pull Helm charts from it.

{% include image.html 
lightbox="true" 
file="/images/examples/helm/import-helm-configuration.png" 
url="/images/examples/helm/import-helm-configuration.png" 
alt="Using the default Helm repository in a Pipeline"
caption="Using the default Helm repository in a Pipeline"
max-width="40%" 
%}

Once that is done you can change your pipeline to also store the chart first and *then* deploying it.


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
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/helm-sample-app'
    revision: master
    git: github    
  MyAppDockerImage:
    title: Building Docker Image
    stage: build
    type: build
    image_name: helm-sample-app-go
    working_directory: ./
    tag: 'multi-stage'
    dockerfile: Dockerfile
  StoreChart:
    title: Storing Helm chart
    stage: deploy
    image: 'codefresh/cfstep-helm:3.0.3'
    environment:
      - ACTION=push
      - CHART_REF=charts/helm-example    
  DeployMyChart:
    image: 'codefresh/cfstep-helm:3.0.3'
    title: Deploying Helm chart
    stage: deploy
    environment:
      - CHART_REF=charts/helm-example
      - RELEASE_NAME=my-go-chart-prod
      - KUBE_CONTEXT=my-demo-k8s-cluster
      - VALUE_image_pullPolicy=Always
      - VALUE_image_tag='multi-stage'
      - VALUE_replicaCount=3
      - VALUE_buildID='${{CF_BUILD_ID}}'
      - VALUE_image_pullSecret=codefresh-generated-r.cfcr.io-cfcr-default
{% endraw %}
{% endhighlight %}


After you finish running your pipeline, not only the deployment will take place, but you will also see your chart in your [Helm Chart dashboard]({{site.baseurl}}/docs/new-helm/add-helm-repository/):

{% include image.html 
lightbox="true" 
file="/images/examples/helm/helm-chart.png" 
url="/images/examples/helm/helm-chart.png" 
alt="Stored Helm chart"
caption="Stored Helm chart"
max-width="80%" 
%}

It is also possible to [run your own Helm commands]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/#example-custom-helm-commands) in a Codefresh pipeline.


## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Using Helm in Codefresh pipelines]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)