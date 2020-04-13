---
title: "Trigger a Kubernetes Deployment from a Dockerhub Push Event"
description: "Learn how to trigger a Kubernetes deployment when an image is updated"
group: yaml-examples
sub_group: examples
toc: true
---

In this example, we will cover how to trigger a Kubernetes deployment from a Dockerhub Push event using a Dockerhub [registry trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/dockerhub-triggers/#create-a-new-dockerhub-trigger).

Our example will have two pipelines.  One that is responsible for packaging code (CI), and the other will be responsible for deploying code (CD).

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A DockerHub registry [connected to your Codefresh account]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/)
- A Kubernetes cluster [connected to your Codefresh account]({{site.baeurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- A service for your application [deployed to your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#viewing-your-kubernetes-services)

## The Example Project

You can see the example project on [GitHub](https://github.com/codefresh-contrib/registry-trigger-sample-app/tree/master). The repository contains a simple Hello World NodeJs app as well as 2 pipelines.

## Create the CI Pipeline

As mentioned before, our first pipeline will handle the CI process.  There will be 3 stages:

- A stage for cloning
- A stage for building the image
- A stage for pushing the image to DockerHub

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-deployment-ci-pipeline.png"
url="/images/examples/deployments/k8s-deployment-ci-pipeline.png"
alt="Codefresh UI CI Pipeline View"
caption="Codefresh UI CI Pipeline View"
max-width="90%"
%}

 `codefresh-CI-pipeline.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'

stages:
- checkout
- build
- push

steps:
  clone:
    title: Cloning main repository...
    type: git-clone
    stage: checkout
    arguments:
      repo: 'codefresh-contrib/registry-trigger-sample-app'
      revision: 'master'
      git: github
  build_my_app:
    title: Building image...
    type: build
    stage: build
    arguments:
      image_name: registry-trigger-sample-app
      working_directory: ${{clone}}
      tag: 'master'
      dockerfile: Dockerfile
  push_to_my_registry:
    stage: 'push'
    type: push
    title: Pushing to Dockerhub...
    arguments:
      candidate: ${{build_my_app}}
      tag: 'latest'
      registry: dockerhub
      image_name: annabaker/registry-trigger-sample-app
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
2. Builds a docker image tagged with the Application version using a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
3. Pushes the Docker image using a [Push step](https://codefresh.io/docs/docs/codefresh-yaml/steps/push/) to the DockerHub registry you have integrated with Codefresh.

## Create the CD Pipeline

This pipeline will only contain one stage/step, for deploying.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-deployment-CD-pipeline.png"
url="/images/examples/deployments/k8s-deployment-CD-pipeline.png"
alt="Codefresh UI CD Pipeline View"
caption="Codefresh UI CD Pipeline View"
max-width="90%"
%}

Note that for the trigger mechanism to take place, you will need to [add a DockerHub registry trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/dockerhub-triggers/#create-a-new-dockerhub-trigger) to the pipeline.

 `codefresh-CD-pipeline.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"

stages:
  - "deploy"

steps:
  deploy_to_k8s:
    title: Running Deploy Script...
    type: deploy
    kind: kubernetes
    arguments:
      cluster: anna-demo@FirstKubernetes
      namespace: default
      service: registry-trigger-sample-app
      candidate:
        image: annabaker/registry-trigger-sample-app:latest
        registry: 'dockerhub'
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Uses a [Deploy step]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/) to deploy the image to Kubernetes.  The deploy step uses a [Registry trigger](({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/dockerhub-triggers/#create-a-new-dockerhub-trigger)) to kick off the pipeline when the updated image is pushed to the registry.

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [Pipeline plugins](https://codefresh.io/steps/)
* [Triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/)
