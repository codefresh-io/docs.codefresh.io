---
title: "Manage your Kubernetes cluster"
description: "Using the graphical Kubernetes Dashboard in Codefresh"
group: deploy-to-kubernetes
redirect_from:
  - /docs/deploy-to-kubernetes/codefresh-kubernetes-integration-beta/
  - /docs/codefresh-kubernetes-integration-beta/
toc: true
---

Codefresh includes a built-in Kubernetes Dashboard that allows you to see the state of your cluster(s) and even make changes if you have the appropriate access privileges.

## Accessing the Kubernetes Dashboard

After [adding a cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/), you will be able to manage your Kubernetes assets via the *Kubernetes tab* on the left pane. Clicking on the Kubernetes icon will take you to your services dashboard.

{% include image.html
lightbox="true"
file="/images/kubernetes/kubernetes-management.png"
url="/images/kubernetes/kubernetes-management.png"
alt="Codefresh Kubernetes Dashboard"
caption="Codefresh Kubernetes Dashboard"
max-width="60%"
  %}

With the graphical dashboard it is very easy to locate problematic services or deploy new ones quickly.

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
file="/images/kubernetes/kubernetes-dashboard-grid.png"
url="/images/kubernetes/kubernetes-dashboard-grid.png"
alt="Kubernetes Dashboard grid view"
caption="Kubernetes Dashboard grid view"
max-width="60%"
  %}



## Work with your services

In this view, you will be able to perform the following actions:

* Add new service
* Edit/Update existing services
* Remove service


## Deploying a new service

The Kubernetes dashboard provides a GUI dialog to quickly deploy new services in your cluster.

### Choose a Docker image

To add a service, click the "Add Service" button on the top or the "plus" button on a specific namespace. Then fill in the details for your new service.

You can add images built in Codefresh which were pushed to Codefresh registry or provide a name for Docker image that will be pulled from an [external Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). Notice that images which are not from Dockerhub must be mentioned with their full domain name. 

{% include image.html 
lightbox="true" 
file="/images/d07104d-Screen_Shot_2017-07-23_at_6.46.17_PM.png" 
url="/images/d07104d-Screen_Shot_2017-07-23_at_6.46.17_PM.png" 
alt="Deploying with the quick GUI dialog"
caption="Deploying with the quick GUI dialog"
max-width="60%" 
%}


Use the following steps in order to add Image and pull secrets from the [connected Docker Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/):
* Specify the image name in the format `<DOMAIN>/<ACCOUNT>/<IMAGE>:<TAG>`
* Provide and image pull secret - this will be done for each namespace

{% include image.html 
lightbox="true" 
file="/images/11c15f3-Screen_Shot_2017-09-06_at_6.28.30_PM.png" 
url="/images/11c15f3-Screen_Shot_2017-09-06_at_6.28.30_PM.png" 
alt="Deploying from the private Codefresh registry"
caption="Deploying from the private Codefresh registry"
max-width="60%" 
%}

From this screen you can also [create Kubernetes image secrets]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/) without actually deploying anything.


### Set Environment variables and resources

You can add extra environment variables that will passed to the deployment image.

{% include image.html 
lightbox="true" 
file="/images/58ac43c-Screen_Shot_2017-07-23_at_6.42.58_PM.png" 
url="/images/58ac43c-Screen_Shot_2017-07-23_at_6.42.58_PM.png" 
alt="Environment variables for the deployment"
caption="Environment variables for the deployment" 
max-width="60%" 
%}



You can also define resource limits for your pods.
It is a good practice to place maximum limits so that your services do not experience resource starvation.


### Adding a service with a manifest file

If you are an advance Kubernetes user, toggle the Deployment option button to the `YAML` position on the top right corner of the screen.
In this mode you can define exactly the contents for the service and deployment Kubernetes resources.
  
{% include image.html 
lightbox="true" 
file="/images/cc01a9f-Pasted_image_at_2017_07_23_03_17_PM.png" 
url="/images/cc01a9f-Pasted_image_at_2017_07_23_03_17_PM.png" 
alt="Define a Kubernetes Service Resource"
caption="Define a Kubernetes Service Resource" 
max-width="60%" 
%}

You can type directly in the browser window or paste content from a text editor.

{% include image.html 
lightbox="true" 
file="/images/7238315-Pasted_image_at_2017_07_23_03_18_PM.png" 
url="/images/7238315-Pasted_image_at_2017_07_23_03_18_PM.png" 
alt="Define a Kubernetes Deployment Resource"
caption="Define a Kubernetes Deployment Resource" 
max-width="60%" 
%}


Congratulations! Your service is now deployed to your Kubernetes cluster.

You can update an existing service in a similar manner from your Kubernetes services window - Just hit the "edit" icon and update your service using the same steps as in "Add new service" section.

## Automate your deployment

After your service is deployed to your Kubernetes cluster, you can automate image deployment using Codefresh pipelines.

Some of the possible options are:

1. The dedicated [deploy step]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/) in a pipeline. 
1. The [cf-deploy-kubernetes step]({{site.baseurl}}/docs/deploy-to-kubernetes/kubernetes-templating/) in a pipeline. This can also perform simple templating on Kubernetes manifests.

See more choices in the [Deployment options page]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/).

## What to read next

- [Environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)
- [Add Config Maps]({{site.baseurl}}/docs/deploy-to-kubernetes/add-config-maps-to-your-namespaces/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Deploy to Kubernetes - quick start]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)


