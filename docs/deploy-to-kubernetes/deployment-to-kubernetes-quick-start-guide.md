---
layout: docs
title: "Deployment to Kubernetes: Quick Start Guide"
description: ""
group: deploy-to-kubernetes
redirect_from:
  - /docs/deployment-to-kubernetes-quick-start-guide
toc: true
---

## Overview
This guide will walk you through the most common K8 deployment scenario:

{:start="1"}
1. Build a docker image

{:start="2"}
2. Push it into Dockerhub

{:start="3"}
3. Deploy to Kubernetes using [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) and [Service](https://kubernetes.io/docs/concepts/services-networking/service/) objects.

## Prerequisites

It is assumed that:
  - you have already [added your K8 cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) into Codefresh
  - your cluster supports usage of [LoadBalancer service type](https://kubernetes.io/docs/concepts/services-networking/service/#type-loadbalancer){:target="_blank"} (otherwise the service won’t be exposed to the internet via public IP)
  - you are familiar with [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) and basic [pipeline steps ]({{ site.baseurl }}/docs/codefresh-yaml/steps/)and know how to describe it 
  - you know how to [integrate your docker registry/repository]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/) with Codefresh
  
## Build and Push your image
Add [the following](https://github.com/codefresh-demo/example-go-webserver){:target="_blank"} repository to your Codefresh account. It contains a Dockerfile for building a sample web server from Go sources.

When you have added the repo, create a pipeline using the Codefresh YAML, describe the build and push steps:

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

Now run the pipeline to build the app into a docker image and push it into your dockerhub repository.

## Describe your deployment
After that we should create Depoyment and Service K8 objects for our deployment. For that, please do the following (see the video below):

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
7. Type the name of your **pushed image**
 
{:start="8"}
8. In the **“Internal Ports”** field specify the port which your application listens to.
 
{:start="9"}
9. In the **“Expose port”** field specify the port to be exposed to the Internet and check the checkbox
 
{:start="10"}
10. Click the button **“Deploy”** to deploy the application and wait a while.
     
                                       <THE-VIDEO-HERE> 

Wait until the deployment is finished and you will be able to open the deployed app in the browser clicking on the "endpoint" link.

{% include image.html 
lightbox="true" 
file="/images/3f36367-Screenshot_from_2018-02-16_17-09-54.png" 
url="/images/3f36367-Screenshot_from_2018-02-16_17-09-54.png" 
alt="Screenshot from 2018-02-16 17-09-54.png" 
max-width="40%" 
%}

**Note**: you can switch from UI to **YAML format** and describe the Deployment and Service objects in more details if you need.

## Add a Deployment step
So now you have deployed your image manually, which is great. But how to trigger the deployment within your pipeline? For that you will need to add a step of a “Deploy” type to the Codefresh YAML manifest file:

  `YAML`
{% highlight yaml %}
{% raw %}
RunningDeployScript:
    title: Running Deploy Script
    type: deploy
    kind: kubernetes
    cluster: '<cluster_name>' #the name specified when you added the cluster
    namespace: default
    service: goexamplewebserver
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
    namespace: default
    service: goexamplewebserver
    candidate:
      image: '${{BuildImage}}'
      registry: 'dockerhub'
{% endraw %}
{% endhighlight %}

You can now run the whole pipeline that builds your application from source to a docker image, pushes it to a docker registry and deploys it to your Kubernetes cluster.

## More complex scenarios
This tutorial showed you how to perform the basic K8 deployment with Codefresh. If you intend to dive into more complex deployment scenarios, please refer to these pages:

* [Link to the tutorial on how to deploy to K8 using a freestyle step with kubectl image](javascript:void(0)) - not created yet
* [Links to K8 deployment examples](javascript:void(0)) - not created yet
