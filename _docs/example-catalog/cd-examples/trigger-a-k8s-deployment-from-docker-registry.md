---
title: "Trigger a Kubernetes Deployment from a Docker Hub Push Event"
description: "Learn how to trigger a Kubernetes deployment when an image is updated"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/trigger-a-k8s-deployment-from-docker-registry/
toc: true
---

In this example, we will cover how to trigger a Kubernetes deployment from a Docker Hub Push event using a Dockerhub [registry trigger]({{site.baseurl}}/docs/pipelines/triggers/dockerhub-triggers/#create-a-new-dockerhub-trigger).

Our example has two pipelines: one for packaging code (CI), and the second for deploying code (CD).

## Prerequisites

- A [Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/)
- A Docker Hub registry [connected to your Codefresh account]({{site.baseurl}}/docs/integrations/docker-registries/#docker-hub)
- A Kubernetes cluster [connected to your Codefresh account]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster)
- A service for your application [deployed to your cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#viewing-your-kubernetes-services)

## Example Project

You can see the example project on [GitHub](https://github.com/codefresh-contrib/registry-trigger-sample-app/tree/master){:target="\_blank"}. The repository contains a simple Hello World NodeJs app as well as 2 pipelines.

## Create the CI Pipeline

As mentioned before, our first pipeline will handle the CI process.  
The pipeline has three stages:

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

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
2. Builds a docker image tagged with the Application version through a [build step]({{site.baseurl}}/docs/pipelines/steps/build/).
3. Pushes the Docker image through a [push step]({{site.baseurl}}/docs/pipelines/steps/push/) to the Docker Hub registry you have integrated with Codefresh.

## Create the CD Pipeline

This pipeline contains one stage/step, for deploying.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/k8s-deployment-CD-pipeline.png"
url="/images/examples/deployments/k8s-deployment-CD-pipeline.png"
alt="Codefresh UI CD Pipeline View"
caption="Codefresh UI CD Pipeline View"
max-width="90%"
%}

Note that for the trigger mechanism to take place, you will need to [add a Docker Hub registry trigger]({{site.baseurl}}/docs/pipelines/triggers/dockerhub-triggers/#create-a-new-dockerhub-trigger) to the pipeline.

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

1. Deploys the image to Kubernetes through a [deploy step]({{site.baseurl}}/docs/pipelines/steps/deploy/).  The deploy step uses a [Registry trigger]({{site.baseurl}}/docs/pipelines/triggers/dockerhub-triggers/#create-a-new-dockerhub-trigger) to kick off the pipeline when the updated image is pushed to the registry.

## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/)
