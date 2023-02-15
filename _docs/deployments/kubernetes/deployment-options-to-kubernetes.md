---
title: "Deployment options for Kubernetes"
description: "Deploy to Kubernetes with the declarative deploy step"
group: deployments
sub_group: kubernetes
redirect_from:
  - /docs/deploy-to-kubernetes/environment-dashboard/
  - /docs/deploy-to-kubernetes/
  - /docs/deployment-to-kubernetes-quick-start-guide/
  - /docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/
  - /docs/deploy-to-kubernetes/get-ready-to-deploy/
toc: true
---

Codefresh offers several options when it comes to Kubernetes deployments:

1. Codefresh UI for on-demand deployments  
  This is the easiest deployment option for Kubernetes. See our [Kubernetes deployment quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-to-kubernetes/).
1. Through a dedicated [deploy step]({{site.baseurl}}/docs/pipelines/steps/deploy/) in a pipeline  
  Described in this article.
1. Through the [cf-deploy-kubernetes step]({{site.baseurl}}/docs/ci-cd-guides/kubernetes-templating/) in a pipeline  
  Use this to also perform simple templating on Kubernetes manifests.
1. Through a [freestyle]({{site.baseurl}}/docs/pipelines/steps/freestyle/) step with [Kustomize](https://kustomize.io){:target="\_blank"}.  
  See [Deployment with Kustomize]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-with-kustomize).
1. Using a freestyle step with your own `kubectl` commands  
  This deployment option gives you great flexibility, but assumes that you know how to work with `kubectl`. See [Custom kubectl commands]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/).
1. Using Helm as a package manager  
  See our [Helm deployment to Kubernetes quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-with-helm/).

## Prerequisites

* A K8s cluster in Codefresh (see [Connecting a Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster) 
* Familiarity with the [Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/), basic [pipeline steps]({{site.baseurl}}/docs/pipelines/steps/), and how to describe them
* [Docker registry integration]({{site.baseurl}}/docs/integrations/docker-registries/) in Codefresh
  
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

Using this YAML example, we'll add an additional step to deploy the image in Dockerhub to Kubernetes.

## Describe your deployment
The following instructions describe how to create a new service in your Kubernetes cluster in order to deploy to it.
 >To deploy to an existing service in your Kubernetes cluster, see [Add a deployment step](#add-a-deployment-step). 


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

## Add a Deployment step
So now you have deployed your image manually, which is great.  
But, how can you trigger the deployment within your pipeline? For that you will need to add a step of type `Deploy` type to the Codefresh YAML manifest file:

  `YAML`
{% highlight yaml %}
{% raw %}
RunningDeployScript:
    title: Running Deploy Script
    type: deploy
    kind: kubernetes
    cluster: '<cluster_name>' #the name specified when you added the cluster
    namespace: <namespace_name> #the namespace you wish to deploy into
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

You can now run the whole pipeline, that builds your application from source to a Docker image, pushes the image to a Docker registry, and deploys the image to your Kubernetes cluster.

## Related articles
[Manage your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  
