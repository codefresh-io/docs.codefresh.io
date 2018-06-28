---
title: "Deployment to Kubernetes"
description: "Using the Codefresh GUI to deploy to a Kubernetes cluster"
group: getting-started
redirect_from:
  - /docs/getting-started-deployment-to-kubernetes-quick-start-guide/
toc: true
---

In this tutorial we will see how you can use Codefresh to deploy a Docker image to a Kubernetes cluster
and also how to to setup an automated pipeline to automatically redeploy it when the source code changes

>Even though, in this tutorial we use Codefresh to deploy docker images directly to the Kubernetes cluster,
in production we suggest you use [Helm](https://helm.sh/) instead. Helm is a package manager for Kubernetes that allows you to
deploy multiple applications at once as a single entity (Helm Charts) and also perform rollbacks to previous versions.
Like Kubernetes, [Codefresh has native support for Helm deployments]({{ site.baseurl }}/docs/new-helm/using-helm-in-codefresh-pipeline/) including a [release dashboard]({{ site.baseurl }}/docs/new-helm/helm-releases-management/).

Notice that for this tutorial we will use the GUI provided by Codefresh to both create the Kubernetes service inside the cluster and also to create the CI/CD pipeline that keeps it up-to-date. In a real world scenario it is best if you use  [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) which is much more powerful and flexible.

## Overview

At then end of this tutorial we will have a pipeline that 

1. checks out code from Github and creates a Docker image
1. stores it in the internal Codefresh Docker registry
1. Notifies the K8s cluster that a new version of the application is present. Kubernetes will pull the new image and deploy it.

IMAGE here.

For simplicity reasons, we will use the built-in Docker registry that is available to all Codefresh accounts. For your own application you can also integrate with any of the popular Docker registries.

## Prerequisites

It is assumed that:
  - you have already [added your K8s cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) into Codefresh
  - You have already an application that has a Dockerfile. In not, see the [previous tutorial]({{ site.baseurl }}docs/getting-started/create-a-basic-pipeline/)

Notice that for this tutorial you **don't** need a Kubernetes deployment file. Codefresh will create one for you via its friendly GUI. If you already have an existing deployment file for your own application, [consult the main K8s documentation]({{ site.baseurl }}/docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/) on how to use it.
  
## Build and Push your image
The following describe a basic Codefresh pipeline scenario to build and push your image to Dockerhub registry.
  
  `YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildImage:
    type: build
    image_name: '<your_docker_repo>/<your_image_name>' #specify your future image reference here
    dockerfile: Dockerfile
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    
  PushToDockerRegistry:
    type: push
    candidate: '${{BuildImage}}'
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    registry: 'dockerhub' #the name of the registry you added to Codefresh
{% endraw %}
{% endhighlight %}

Using this YAML example, we'll add an additional step to deploy the image in Dockerhub to Kubernetes.

## Describe your deployment
The following instructions describe how to create a new service in your Kubernetes cluster in order to deploy to it from Codefresh pipeline.
**Note**: If you're deploying to an existing service in your Kubernetes cluster please skip to the [next step]({{ site.baseurl }}/docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/#add-a-deployment-step)

{:start="1"}
 1. Go to the **`Kubernetes` &#8594; `Services page`**
 
{:start="2"}
 2. Click the button **“Add Service”**
 
{:start="3"}
3. Select the **cluster**

{:start="4"}
4. Select the **namespace**
 
{:start="5"}
5. Type an arbitrary **service name**
 
{:start="6"}
6. Specify the **number of replicas**
 
{:start="7"}
7. Type the name of your **pushed image** and **tag** 
 
{:start="8"}
8. Add an image pull secret from the list per your desired registry
 
{:start="9"}
9. Configure your application internal and external ports based on your needs
 
{:start="10"}
10. Click the button **“Deploy”** to deploy the application.
  
{% include image.html 
lightbox="true" 
file="/images/3f36367-Screenshot_from_2018-02-16_17-09-54.png" 
url="/images/3f36367-Screenshot_from_2018-02-16_17-09-54.png" 
alt="Screenshot from 2018-02-16 17-09-54.png" 
max-width="40%" 
%}

Now that you have the desired service ready you can add the appropriate deployment step in your pipeline.

## Add a Deployment step
In order to trigger the deployment within your pipeline you will need to add a step of a “Deploy” type to the Codefresh YAML manifest file:

  `YAML`
{% highlight yaml %}
{% raw %}
RunningDeployScript:
    title: Running Deploy Script
    type: deploy
    kind: kubernetes
    cluster: '<cluster_name>' #the name specified when you added the cluster
    namespace: <namespcae_name> #the namespace you wish to deploy into
    service: <service_name> #the service you would like to update the deployment in
    candidate:
      image: '${{BuildImage}}'
      registry: 'dockerhub'
{% endraw %}
{% endhighlight %}

The full Codefresh YAML looks like this:

  `YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildImage:
    type: build
    image_name: '<your_docker_repo>/<your_image_name>'
    dockerfile: Dockerfile
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    
  PushToDockerRegistry:
    type: push
    candidate: '${{BuildImage}}'
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    registry: 'dockerhub' #the name of the registry you added to Codefresh
    
  RunningDeployScript:
    title: Running Deploy Script
    type: deploy
    kind: kubernetes
    cluster: '<cluster_name>' #the name specified when you added the cluster
    namespace: <namespcae_name> #the namespace you wish to deploy into
    service: <service_name> #the service you would like to update the deployment in
    candidate:
      image: '${{BuildImage}}'
      registry: 'dockerhub'
{% endraw %}
{% endhighlight %}

You can now run the whole pipeline that builds your application from source to a docker image, pushes it to a docker registry and deploys it to your Kubernetes cluster.
