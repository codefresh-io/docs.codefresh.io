---
title: "Managing Kubernetes clusters"
description: "Use the graphical Kubernetes dashboard in Codefresh"
group: deployments
sub_group: kubernetes
redirect_from:
  - /docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/
  - /docs/codefresh-kubernetes-integration-beta/
toc: true
---

Codefresh includes a built-in Kubernetes Dashboard that allows you to see the state of your clusters, and even make changes if you have the appropriate access privileges.

## Accessing the Kubernetes Dashboard

After [adding a cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster), you will be able to manage your Kubernetes assets via the *Kubernetes tab* on the left pane. Clicking on the Kubernetes icon will take you to your services dashboard.

{% include image.html
lightbox="true"
file="/images/integrations/kubernetes/kubernetes-dashboard.png"
url="/images/integrations/kubernetes/kubernetes-dashboard.png"
alt="Codefresh Kubernetes Dashboard"
caption="Codefresh Kubernetes Dashboard"
max-width="80%"
  %}

With the graphical dashboard, it is very easy to locate problematic services or deploy new ones quickly. If there are clusters that are not accessible to your user, you can hide them by enabling the *Hide inaccessible clusters* option at the top right of the window in order to simplify the view.

## Viewing your Kubernetes services

If you have too many clusters you can choose the *add filter* button at the top of the window to hide specific clusters or namespaces.

You will be able to see the following parameters for each service:
* Name
* Cluster
* Namespace
* Replica count
* Docker image
* Selector
* A status check

You can also switch to a Grid view if you prefer that over the default List view:


{% include image.html
lightbox="true"
file="/images/kubernetes/grid-view.png"
url="/images/kubernetes/grid-view.png"
alt="Kubernetes Dashboard grid view"
caption="Kubernetes Dashboard grid view"
max-width="80%"
  %}

 If there are clusters that are not accessible to your user you can hide them by enabling the *Hide inaccessible clusters* option at the top right of the window in order to simplify the view.


## Work with your services

In this view, you will be able to perform the following actions:

* Add new service
* Edit/Update existing services
* Remove service


## Deploying a new service

The Kubernetes dashboard provides a GUI dialog to quickly deploy new services in your cluster.

### Choose a Docker image

To add a service, click the "Add Service" button on the top or the "plus" button on a specific namespace. Then fill in the details for your new service.

You can add images built in Codefresh which were pushed to Codefresh registry or provide a name for Docker image that will be pulled from an [external Docker registry]({{site.baseurl}}/docs/integrations/docker-registries/). Notice that images which are not from Dockerhub must be mentioned with their full domain name. 

{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/quick-ui-deploy.png" 
url="/images/deployments/kubernetes/quick-ui-deploy.png" 
alt="Deploying with the quick UI dialog"
caption="Deploying with the quick UI dialog"
max-width="60%" 
%}


Use the following steps in order to add Image and pull secrets from the connected Docker Registry:
* Specify the image name in the format `<DOMAIN>/<ACCOUNT>/<IMAGE>:<TAG>`
* Provide and image pull secret - this will be done for each namespace

{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/deploying-private-cf-registry.png" 
url="/images/deployments/kubernetes/deploying-private-cf-registry.png" 
alt="Deploying from the private Codefresh registry"
caption="Deploying from the private Codefresh registry"
max-width="60%" 
%}

<!-- change the xref when content is ported -->
From this screen you can also [create Kubernetes image secrets]({{site.baseurl}}/docs/ci-cd-guides/access-docker-registry-from-kubernetes/) without actually deploying anything.


### Set environment variables and resources

You can add extra environment variables that will passed to the deployment image.

{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/environment-variables-deployment.png" 
url="/images/deployments/kubernetes/environment-variables-deployment.png" 
alt="Environment variables for the deployment"
caption="Environment variables for the deployment" 
max-width="60%" 
%}



You can also define resource limits for your pods.
It is a good practice to place maximum limits so that your services do not experience resource starvation.


### Adding a service with a manifest file

If you are an advanced Kubernetes user, toggle the Deployment option button to the `YAML` position on the top right corner of the screen.
In this mode you can define exactly the contents for the service and deployment Kubernetes resources.
  
{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/define-k8s-service-resource.png" 
url="/images/deployments/kubernetes/define-k8s-service-resource.png" 
alt="Define a Kubernetes Service Resource"
caption="Define a Kubernetes Service Resource" 
max-width="60%" 
%}

You can type directly in the browser window or paste content from a text editor.

{% include image.html 
lightbox="true" 
file="/images/deployments/kubernetes/define-k8s-deployment-resource.png" 
url="/images/deployments/kubernetes/define-k8s-deployment-resource.png" 
alt="Define a Kubernetes Deployment Resource"
caption="Define a Kubernetes Deployment Resource" 
max-width="60%" 
%}


Congratulations! Your service is now deployed to your Kubernetes cluster.

You can update an existing service in a similar manner from your Kubernetes services window - Just hit the "edit" icon and update your service using the same steps as in "Add new service" section.

## Automate your deployment

After your service is deployed to your Kubernetes cluster, you can automate image deployment using Codefresh pipelines.

Some of the possible options are:

1. The dedicated [deploy step]({{site.baseurl}}/docs/pipelines/steps/deploy/) in a pipeline. 
1. The [cf-deploy-kubernetes step]({{site.baseurl}}/docs/ci-cd-guides/kubernetes-templating/) in a pipeline. This can also perform simple templating on Kubernetes manifests.

Read more [Deployment options for Kubernetes]({{site.baseurl}}/docs/deployments/kubernetes/deployment-options-to-kubernetes/).
<!-- will need to change xrefs after porting content -->
## Related articles
[Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  
[Add Config Maps]({{site.baseurl}}/docs/ci-cd-guides/add-config-maps-to-your-namespaces/)  
[Kubernetes deployment quick start]({{site.baseurl}}/docs/quick-start/ci-quickstart/deploy-to-kubernetes/)  



