---
title: "Deployment Options for Kubernetes"
description: "Learn how to deploy to Kubernetes with the declarative deploy step"
group: deploy-to-kubernetes
redirect_from:
  - /docs/deploy-to-kubernetes/
  - /docs/deployment-to-kubernetes-quick-start-guide/
  - /docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/
  - /docs/deploy-to-kubernetes/get-ready-to-deploy/
toc: true
---

Codefresh offers a lot of options when it comes to Kubernetes deployments:

1. Using the Codefresh GUI to deploy on demand. This is the easiest way and was described in the [quick start guide]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/).
1. Using the dedicated [deploy step]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/) in a pipeline. Explained in detail in the present page.
1. Using the [cf-deploy-kubernetes step]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) in a pipeline. This can also perform simple templating on Kubernetes manifests.
1. Using a [freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step with [Kustomize](https://kustomize.io). Described in details in [this page]({{site.baseurl}}/docs/yaml-examples/examples/deploy-with-kustomize).
1. Using a [freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step with your own `kubectl` commands. This is very flexible, but assumes that you know how to work with `kubectl`. Described in details in [this page]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/).
1. Using Helm as a package manager. See the [Helm quick start guide]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/) for more details.

## Prerequisites

It is assumed that
  - You have already [added your K8s cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) into Codefresh
  - You are familiar with [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) and basic [pipeline steps ]({{site.baseurl}}/docs/codefresh-yaml/steps/)and know how to describe it
  - You know how to [integrate your docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) with Codefresh
  
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
The following instructions describe how to create a new service in your Kubernetes cluster in order to deploy to it.
>Note: If you're deploying to an existing service in your Kubernetes cluster please skip to the [next step]({{ site.baseurl }}/docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/#add-a-deployment-step)


 1. Go to the **`Kubernetes` &#8594; `Services page`**.
 1. Click the button **“Add Service”**.
 1. Select the **cluster**.
 1. Select the **namespace**.
 1. Type an arbitrary **service name**.
 1. Specify the **number of replicas**.
 1. Type the name of your **pushed image**.
 1. In the **“Internal Ports”** field specify the port which your application listens to.
 1. In the **“Expose port”** field specify the port to be exposed to the Internet and check the checkbox.
 1. Click the button **“Deploy”** to deploy the application.
  
Wait until the deployment is finished and you will be able to open the deployed application in your browser by clicking on the "endpoint" link.

{% include image.html 
lightbox="true" 
file="/images/3f36367-Screenshot_from_2018-02-16_17-09-54.png" 
url="/images/3f36367-Screenshot_from_2018-02-16_17-09-54.png" 
alt="Screenshot from 2018-02-16 17-09-54.png" 
max-width="60%" 
%}

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
