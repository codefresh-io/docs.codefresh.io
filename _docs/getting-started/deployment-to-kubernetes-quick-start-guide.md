---
title: "Deployment to Kubernetes"
description: ""
group: getting-started
redirect_from:
  - /docs/getting-started-deployment-to-kubernetes-quick-start-guide/
toc: true
---

## Overview
This guide will walk you through the most common Kubernetes deployment scenario.

## Prerequisites

It is assumed that:
  - you have already [added your K8 cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) into Codefresh
  - you are familiar with [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) and basic [pipeline steps ]({{ site.baseurl }}/docs/codefresh-yaml/steps/)and know how to describe it 
  - you know how to [integrate your docker registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/) with Codefresh
  
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
**Note**: If you're deploying to an exisitng service in your Kubernetes cluster please skip to the [next step]({{ site.baseurl }}/docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/#add-a-deployment-step)

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
