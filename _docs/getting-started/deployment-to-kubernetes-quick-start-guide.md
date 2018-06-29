---
title: "Deployment to Kubernetes"
description: "Using the Codefresh GUI to deploy to a Kubernetes cluster"
group: getting-started
redirect_from:
  - /docs/getting-started-deployment-to-kubernetes-quick-start-guide/
toc: true
---

In this tutorial we will see how you can use Codefresh to deploy a Docker image to a Kubernetes cluster
and also how to to setup an automated pipeline to automatically redeploy it when the source code changes.

>Even though, in this tutorial we use Codefresh to deploy docker images directly to the Kubernetes cluster,
in production we suggest you use [Helm](https://helm.sh/) instead. Helm is a package manager for Kubernetes that allows you to
deploy multiple applications at once as a single entity (Helm Charts) and also perform rollbacks to previous versions.
Like Kubernetes, [Codefresh has native support for Helm deployments]({{ site.baseurl }}/docs/new-helm/using-helm-in-codefresh-pipeline/) including a [release dashboard]({{ site.baseurl }}/docs/new-helm/helm-releases-management/).

Notice that for this tutorial we will use the GUI provided by Codefresh to both create the Kubernetes service inside the cluster and also to create the CI/CD pipeline that keeps it up-to-date. In a real world scenario it is best if you use  [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) which is much more powerful and flexible.

## Overview

At the end of this tutorial we will have a pipeline that 

1. checks out code from Github and creates a Docker image
1. stores it in the internal Codefresh Docker registry
1. Notifies the K8s cluster that a new version of the application is present. Kubernetes will pull the new image and deploy it.

IMAGE here.

For simplicity reasons, we will use the [built-in Docker registry]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/) that is available to all Codefresh accounts. For your own application you can also integrate with any other [external Docker registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/).


## Prerequisites

It is assumed that:
  - you have already [added your K8s cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) into Codefresh
  - You have already an application that has a Dockerfile. In not, see the [previous tutorial]({{ site.baseurl }}docs/getting-started/create-a-basic-pipeline/)

Notice that for this tutorial you **don't** need a Kubernetes deployment file. Codefresh will create one for you via its friendly GUI. If you already have an existing deployment file for your own application, [consult the main K8s documentation]({{ site.baseurl }}/docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/) on how to use it.


## Giving the Kubernetes cluster read access to the internal Codefresh registry

A Kubernetes cluster deploys applications by *pulling* image from a Docker registries. In most cases your Docker image
will be on private Docker registry. Therefore, you need to grant access to the cluster so that it has read access to the image that are pushed on the Docker registry by Codefresh.

Each Codefresh account comes with its own built-in Docker registry, but by default this is not accessible externally. 
To make this registry "external" we need to declare it first as an integration.


### Creating an API key for the Codefresh internal registry

Click your account name at the bottom left of the screen and select *User settings* from the popup menu. At the User
settings screen, click the button *Generate* at the Codefresh Registry section.

IMAGE here.

In the dialog that appears, enter a name for your key (this name doesn't affect anything, it is just for you to remember the purpose of the key) and click the *Create* button. Your key will be generated. You can click the "eye" button inside the text field to view its full form.

IMAGE here.

**Write down this token** as it will never be visible again apart from this screen.

### Making the internal Codefresh Registry available to your Kubernetes cluster

After you have the API key, 
from the side menu, select *Configuration*, and in the *Integration* tab, click the *Configure* button under *Docker Registry*

Image here.

Then click the *Add Registry* button and select the Codefresh registry from the top down menu.

Image here

Enter your Codefresh username in the respective field and enter the token that we created in the previous section.

Image here


Finally click the *Test* button to make sure that everything works ok, and then the *Save* button to apply your changes.

The Codefresh Internal registry is now ready to by used by your Kubernetes cluster


## Deploying a Docker image to Kubernetes manually

Codefresh offers a friendly GUI that allows you to deploy any Docker image to your cluster without writing any configuration files at all.

Click the *Kubernetes* button from the left side bar and select the *services* item.
The screen that appears is the Codefresh overview of your Kubernetes cluster that shows all your deployments (pods and namespaces)

IMAGE here

Click the *Add Service button* on the top right. The screen that appears is a friendly UI that allows you to
create a Kubernetes deployment (and service). You can also toggle the top right button to define a Kubernetes YAML yourself, but for the purposes of this tutorial we will only use the GUI.

The fields in this screen are:

* *Cluster* - select your cluster if you have more than one
* *Namespace* - select the namespace where the application will be deployed to.(*default* will work just fine).
* *Service Name* - enter any arbitrary name of your service
* *replicas* - how many replicas you want for resiliency. This affects pricing, so 1 is a good value for a demo
* *Expose port* - check it so that you application is available outside the cluster 
* *Image* - Enter the full qualified name of your Docker image
* *Image pull request* - Select the Codefresh registry and create a pull secret for it
* *Internal ports* - which port is exposed from your application. The example Python app we deploy, exposes 5000

From the same screen you can also define environment variable and cpu/mem limits.

You can see the full name of the Docker image, in the *Images* tab of the Codefresh GUI.

IMAGE here.

Finally click the deploy button. Codefresh will create a Kubernetes YAML file behind the scenes and apply it to your
Kubernetes cluster. The cluster will contact the Codefresh registry and pull the image. Finally it will create all the needed resources (service, deployments, pods) in order to make the application available.

You can see the status of the deployment right from the Codefresh UI.

IMAGE here

Once the deployment is complete, you will also see the public URL of the application. You can visit it in the browser
and see the application running

IMAGE here.

This concludes the manual deployment. We deployed a Docker image from Codefresh to a Kubernetes cluster without
writing any YAML files at all. The next step is to automate this process

## Automating deployments to Kubernetes

The application is now running successfully in the Kubernetes cluster. We will setup a pipeline in Codefresh
so that any commits that happen in Github, are automatically redeploying the application giving us a true CI/CD pipeline.

To do this we will add two extra steps in the basic pipeline created in the [previous tutorial]({{ site.baseurl }}docs/getting-started/create-a-basic-pipeline/).

First of all we will make sure that the Docker image created is sent to the registry. In the pipeline definition
expand the *Push to Registry* section and make sure that the Codefresh Registry is selected from the popup menu

IMAGE here

Next expand the *Deploy Script stage*. From the popup menu select *Kubernetes* and fill the details of the service.

IMAGE here

Notice that by default Codefresh tags Docker images with the name of the GIt branch they were created from.
In the example above we use the `production` branch so that the name of the Docker image matches the one
that we defined in Kubernetes in the previous section.

Once all all details are filled in, click the *Save* button.

Now we will change the application in the production branch and commit/push the change to Git

Image here.

Codefresh will pick the change automatically and trigger a new build that deploys the new version

Image here.

Once the build is complete, if you visit again the URL you will see your change
applied.

You now have a complete CI/CD pipeline in Codefresh for fully automated builds to Kubernetes.












