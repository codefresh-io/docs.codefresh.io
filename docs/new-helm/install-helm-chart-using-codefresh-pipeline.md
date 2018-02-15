---
layout: docs
title: "Install HELM chart using Codefresh pipeline"
description: ""
group: new-helm
redirect_from:
  - /docs/instal-helm-chart-using-codefresh-pipeline
  - /docs/install-helm-chart-using-codefresh-pipeline/
toc: true
---

## Prerequisites
Make sure the you have the following before you start deploying with HELM:
* Kubernetes Cluster - [Learn how to add Kubernetes cluster using our Kubernetes Integration](https://docs.codefresh.io/v1.0/docs/adding-non-gke-kubernetes-cluster)
* HELM Chart associated with your application

## Install chart from HELM Repository
In order to install your chart using Codefresh pipeline, add our ready-to-use Helm deploy step from our custom steps collection ([click here](https://github.com/codefresh-io/plugins/tree/master/stable/helm){:target="_blank"} to go to our custom steps collection).

Add the following step to you Codefresh YAML:

  `YAML`
{% highlight yaml %}
{% raw %}
---
version: '1.0'

steps:

  ...

  release_to_env:
    image: codefresh/plugin-helm:2.7.2

  ...
{% endraw %}
{% endhighlight %}

Add the Mandatory variables to your pipeline Environment variables:

  `TEXT`
{% highlight yaml %}
{% raw %}
CHART_NAME - The name of your Helm chart 
RELEASE_NAME - Helm release name that you would like to use
KUBE_CONTEXT - The name Kubernetes context to use (cluster name from Codefresh-Kubernetes integration)
{% endraw %}
{% endhighlight %}
 
You can also set optional variables such as Namespace, Chart repository url (for repositories other that kubeapps) and more - see [HELM deploy step description](https://github.com/codefresh-io/plugins/tree/master/stable/helm) for full list. 

## Install chart from your application repository
You can install helm chart directly from your repository. In this case, use the relative path of your chart files as CHART_NAME.

See the following example of a pipeline that builds an image, pushes it to docker registry and deploys from HELM chart to Kubernetes cluster:

  `YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: jennyps/demochat
    working_directory: ./
    dockerfile: Dockerfile
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    
  pushToRegistry:
    type: push
    title: push
    description: push to cfcr
    candidate: ${{BuildingDockerImage}}
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    image_name: demochat
    registry: cfcr
    fail_fast: false
    
  release_to_env:
    image: codefresh/plugin-helm:2.7.2
{% endraw %}
{% endhighlight %}

You can access your installed Helm releases from the HELM Releases dashboard under Kubernetes entry on your Left pane menu.
