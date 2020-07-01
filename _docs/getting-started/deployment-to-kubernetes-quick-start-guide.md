---
title: "Deployment to Kubernetes"
description: "Using the Codefresh GUI to deploy to a Kubernetes cluster"
group: getting-started
redirect_from:
  - /docs/getting-started-deployment-to-kubernetes-quick-start-guide/
toc: true
---

In this tutorial we will see how you can use Codefresh to deploy a Docker image to a Kubernetes cluster
and also how to setup an automated pipeline to automatically redeploy it when the source code changes.

>Even though, in this tutorial we use Codefresh to deploy docker images directly to the Kubernetes cluster,
in production we suggest you use [Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/)  instead. Helm is a package manager for Kubernetes that allows you to
deploy multiple applications at once as a single entity (Helm Charts) and also perform rollbacks to previous versions.
Like Kubernetes, [Codefresh has native support for Helm deployments]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/) including a [release dashboard]({{site.baseurl}}/docs/new-helm/helm-releases-management/).

Notice that for this tutorial we will use the GUI provided by Codefresh to both create the Kubernetes service inside the cluster and also to create the CI/CD pipeline that keeps it up to date. In a real world scenario it is best if you use  [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) which is much more powerful and flexible.

Codefresh also offers [several alternative ways]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) of deploying to Kubernetes.

## Overview

At the end of this tutorial we will have a pipeline that: 

1. Checks out code from GitHub and creates a Docker image
1. Stores it in the default Docker registry of your Codefresh account
1. Notifies the Kubernetes cluster that a new version of the application is present. Kubernetes will pull the new image and deploy it

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/overview.png" 
url="/images/getting-started/quick-start-k8s/overview.png" 
alt="Deployment overview" 
caption="A complete CI/CD pipeline" 
max-width="80%" 
%}

For simplicity reasons, we will use the [default Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/#the-default-registry) that is setup globally in your Codefresh account. For your own application you can also use any other of your registries even if it is not the default.


## Prerequisites

It is assumed that:
  - You have already [added your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) into Codefresh
  - You have connected at least one [Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) in your Codefresh account
  - You have already an application that has a Dockerfile. If not, see the [previous tutorial]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/)

Notice that for this tutorial you **don't** need a Kubernetes deployment file. Codefresh will create one for you via its friendly GUI. If you already have an existing deployment file for your own application, [consult the main K8s documentation]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-to-kubernetes-quick-start-guide/) on how to use it.


## Deploying a Docker image to Kubernetes manually

Codefresh offers a dedicated GUI that allows you to deploy any Docker image to your cluster without writing any configuration files at all.

Click the *Kubernetes* button from the left side bar.
The screen that appears is the Codefresh overview of your Kubernetes cluster that shows all your deployments (pods and namespaces)

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/add-service-button.png" 
url="/images/getting-started/quick-start-k8s/add-service-button.png" 
alt="Codefresh Kubernetes Dashboard" 
caption="Codefresh Kubernetes Dashboard (click image to enlarge)" 
max-width="70%" 
%}


Click the *Add Service button* on the top right. The screen that appears is a friendly UI that allows you to
create a Kubernetes deployment (and associated service). You can also toggle the top right button to define a Kubernetes YAML yourself, but for the purposes of this tutorial we will only use the GUI.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/add-service.png" 
url="/images/getting-started/quick-start-k8s/add-service.png" 
alt="Codefresh Kubernetes add service" 
caption="Codefresh Kubernetes add service (click image to enlarge)" 
max-width="70%" 
%}


The fields in this screen are:

* *Cluster* - choose your cluster if you have more than one.
* *Namespace* - select the namespace where the application will be deployed to (*default* will work just fine).
* *Service Name* - enter any arbitrary name for your service.
* *Replicas* - how many replicas you want for resiliency. This affects pricing, so 1 is a good value for a demo.
* *Expose Port* - check it so that your application is available outside the cluster .
* *Image* - enter the fully qualified name of your Docker image.
* *Image Pull Secret* - select your default Docker registry and create a pull secret for it.
* *Internal Ports* - which port is exposed from your application. The example Python app we deploy, exposes 5000.

From the same screen you can also define environment variables and cpu/mem limits.

You can see the full name of the Docker image, in the [Images tab](https://g.codefresh.io/images/) of the Codefresh GUI of your build.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/docker-image-name.png" 
url="/images/getting-started/quick-start-k8s/docker-image-name.png" 
alt="Finding the full name of a Docker image" 
caption="Finding the full name of a Docker image (click image to enlarge)" 
max-width="60%" 
%}

By default, Codefresh appends the branch name of a git commit to the resulting Docker image. This is why
in the *Image* field we used the branch name as tag

>Do not use `latest` for your deployments. This doesn't help you to understand which version is deployed. Use
either branch names or even better git hashes so that you know exactly what is deployed on your Kubernetes cluster. Notice also that the YML manifest
Codefresh is creating has an image pull policy of `always`, so the cluster will always redeploy the latest image even if it has the same name as the previous one.

Finally click the *deploy* button. Codefresh will create a Kubernetes YAML file behind the scenes and apply it to your
Kubernetes cluster. The cluster will contact the Codefresh registry and pull the image. The cluster will then create all the needed resources (service, deployments, pods) in order to make the application available.

You can watch the status of the deployment right from the Codefresh UI.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/after-deployment.png" 
url="/images/getting-started/quick-start-k8s/after-deployment.png" 
alt="Codefresh K8s deployment" 
caption="Codefresh K8s deployment (click image to enlarge)" 
max-width="70%" 
%}

Once the deployment is complete, you will also see the public URL of the application. You can visit it in the browser
and see the application running.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/before-change.png" 
url="/images/getting-started/quick-start-k8s/before-change.png" 
alt="Example Python Application" 
caption="Example Python Application (click image to enlarge)" 
max-width="50%" 
%}

This concludes the manual deployment. We deployed a Docker image from Codefresh to a Kubernetes cluster without
writing any YAML files at all! The next step is to automate this process so that every time a commit happens in git, the application will be redeployed.

## Automating deployments to Kubernetes

The application is now running successfully in the Kubernetes cluster. We will setup a pipeline in Codefresh
so that any commits that happen in GitHub, are automatically redeploying the application, giving us a true CI/CD pipeline.

To do this, we will add two extra steps in the basic pipeline created in the [previous tutorial]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/).

Here is the complete pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - package
  - test 
  - upload
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    stage: checkout
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: package
    image_name: my-app-image
    working_directory: ./
    tag: '${{CF_BRANCH}}'
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    image: '${{MyAppDockerImage}}'
    stage: test 
    commands:
      - python setup.py test    
  MyPushStep:
    title: Pushing to DockerHub Registry
    type: push
    stage: upload
    tag: '${{CF_BRANCH}}'
    candidate: '${{MyAppDockerImage}}'
    image_name: kkapelon/pythonflasksampleapp #Change kkapelon to your dockerhub username
    registry: dockerhub # Name of your integration as was defined in the Registry screen
  DeployToMyCluster:
    title: deploying to cluster
    type: deploy
    stage: deploy
    kind: kubernetes  
    ## cluster name as the shown in account's integration page
    cluster:  my-demo-k8s-cluster
    # desired namespace
    namespace: default
    service: python-demo
    candidate:
      # The image that will replace the original deployment image 
      # The image that been build using Build step
      image: kkapelon/pythonflasksampleapp:${{CF_BRANCH}}
      # The registry that the user's Kubernetes cluster can pull the image from
      # Codefresh will generate (if not found) secret and add it to the deployment so the Kubernetes master can pull it
      registry: dockerhub   
{% endraw %}      
{% endhighlight %}

You can see that we have added a new [deploy step]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/) at the end of the pipeline. Deploy steps allow you to deploy Kubernetes applications in a declarative manner. Codefresh offers many more [ways for Kubernetes deployments]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/).

The deploy step will update an *existing* Kubernetes deployment and will optionally create a [pull secret]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/) for the image if needed, but it will not create any Kubernetes services (which is ok in our case as we created it manually in the previous section).

Once all the details are filled in the pipeline editor, click the *Save* button.

Now we will change the application in the production branch and commit/push the change to Git.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/git-change.png" 
url="/images/getting-started/quick-start-k8s/git-change.png" 
alt="Git change" 
caption="Git change (click image to enlarge)" 
max-width="70%" 
%}

Codefresh will pick the change automatically and [trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/) a new build that deploys the new version:



 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/deployment-build.png" 
url="/images/getting-started/quick-start-k8s/deployment-build.png" 
alt="Codefresh K8s deployment" 
caption="Codefresh K8s deployment (click image to enlarge)" 
max-width="90%" 
%}


Once the build is complete, if you visit again the URL you will see your change
applied.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/after-change.png" 
url="/images/getting-started/quick-start-k8s/after-change.png" 
alt="Example Python Application after change" 
caption="Example Python Application after change (click image to enlarge)" 
max-width="50%" 
%}

You now have a complete CI/CD pipeline in Codefresh for fully automated builds to Kubernetes!

## What to read next

* [Deploying to Kubernetes with Helm]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/)
* [Kubernetes deployment methods]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/)
* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)












