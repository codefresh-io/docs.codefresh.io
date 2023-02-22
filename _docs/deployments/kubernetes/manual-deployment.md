---
title: "Manual deployments"
description: "Deploy to Kubernetes with the Codefresh GUI"
group: deployments
sub_group: kubernetes
toc: true
---

First you need a Docker image to deploy to the cluster.
If you don't have one already you can use a Codefresh pipeline to build one.
  
## Build and push your image

Here is a basic Codefresh pipeline scenario to build and push your image to the DockerHub registry.
  
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

Run the pipeline and the container image will be pushed to Dockerhub.

## Describe your deployment

The following instructions describe how to create a new service in your Kubernetes cluster in order to deploy to it.


 1. In the Codefresh UI, from Ops in the sidebar, select [**Kubernetes Services**](https://g.codefresh.io/kubernetes/services/){:target="\_blank"}.
 1. Click the button **Add Service**.
 1. Select the **cluster**.
 1. Select the **namespace**.
 1. Type an arbitrary **service name**.
 1. Specify the **number of replicas**.
 1. Type the name of your **pushed image**.
 1. In the **“Internal Ports”** field specify the port which your application listens to.
 1. In the **“Expose port”** field specify the port to be exposed to the Internet and check the checkbox.
 1. Click the button **“Deploy”** to deploy the application.
  
Wait until the deployment is completed, and you can open the deployed application in your browser by clicking on the "endpoint" link.

{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/describe-k8s-deployment.png" 
url="/images/deployments/kubernetes/describe-k8s-deployment.png" 
alt="Describe Kubernetes deployment" 
caption="Describe Kubernetes deployment" 
max-width="60%" 
%}

## Related articles

[Manage your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  
