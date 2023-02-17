---
title: "Automated deployments"
description: "Deploy to Kubernetes with a pipeline"
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

Using this YAML example, we'll add an additional step to deploy the image in Dockerhub to Kubernetes.


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
