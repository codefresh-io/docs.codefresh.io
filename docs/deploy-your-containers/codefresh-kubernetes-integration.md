---
layout: docs
title: "Codefresh - Kubernetes integration - BETA"
description: ""
group: deploy-your-containers
redirect_from:
  - /docs/codefresh-kubernetes-integration
toc: true
old_url: /docs/codefresh-kubernetes-integration
was_hidden: true
---
Google Container Engine is a powerful cluster manager and orchestration system for running your Docker containers built on Kubernetes. We’ve setup a deep integration with Google Container Engine that enables to create streamlined deployment to Kubernetes as part of a CI/CD pipeline.

This article will show you how to:
* View a service-dashboard of your kubernetes clusters on GKE
* Create new service and deploy an image
* Automate deployment to your cluster on image build

## Getting started - Create GKE Cluster
In order to enjoy the benefits of Codefresh - Kubernetes integration, you will need to accomplish the following steps:

{:.text-secondary}
### Create Google platform account
Just go to google cloud console [https://console.cloud.google.com/](https://console.cloud.google.com/)

{:.text-secondary}
### Create GKE Cluster
You are two steps away from your new Kubernetes cluster! Just follow steps 1-2 in these simple instructions: \\
[https://cloud.google.com/container-engine/docs/quickstart](https://cloud.google.com/container-engine/docs/quickstart)

{{site.data.callout.callout_info}}
##### Verify your Kubernetes version

1. Ensure that you are running the latest version of Kubernetes
2. Ensure that your Permissions are at least "Project Editor" 
{{site.data.callout.end}}

## Setting up your Codefresh - GKE integration
On your Account settings, go to Integration tab and Enable your integration with Google cloud. 
You will be redirected to google and will be asked to enter your google account credentials.

{% include image.html 
lightbox="true" 
file="/images/9633a57-Screen_Shot_2017-07-31_at_5.55.35_PM.png" 
url="/images/9633a57-Screen_Shot_2017-07-31_at_5.55.35_PM.png" 
alt="Screen Shot 2017-07-31 at 5.55.35 PM.png" 
max-width="40%" 
%}

## Adding a cluster to view
In the google cloud integration window, you will be able to add your K8 clusters for view and deployment. This will be done by clicking the “Add cluster” button and selecting desired project and cluster.

{% include image.html 
lightbox="true" 
file="/images/ff31a16-Screen_Shot_2017-07-31_at_5.56.00_PM.png" 
url="/images/ff31a16-Screen_Shot_2017-07-31_at_5.56.00_PM.png" 
alt="Screen Shot 2017-07-31 at 5.56.00 PM.png" 
max-width="40%" 
%}

## View your services on Kubernetes Cluster
After signing in your Google Cloud account, a Kubernetes Tab will be added to your Left pane. Clicking on Kubernetes icon will take you to your services dashboard.

{:.text-secondary}
### Access your clusters
Watch the services currently running on your clusters. You can use the filter in order to refine your view according to preferred clusters / namespaces.

You will be able to see the following parameters for each service:
* Name
* IP
* Cluster
* Namespace
* Selector

{:.text-secondary}
### Work with your services
In this view, you will be able to perform the following actions
* Add new service
* Edit/Update existing services
* Remove service

{% include image.html 
lightbox="true" 
file="/images/1f46c20-Screen_Shot_2017-07-31_at_10.06.32_PM.png" 
url="/images/1f46c20-Screen_Shot_2017-07-31_at_10.06.32_PM.png" 
alt="Screen Shot 2017-07-31 at 10.06.32 PM.png" 
max-width="40%" 
%}

## Add new service

{:.text-secondary}
### Add service
To add a service, click the "Add Service" button.
Insert basic definitions for your new Service

{:.text-secondary}
### Select your image
You can add images built in Codefresh which were pushed to Codefresh registry, or provide a name for Docker image that will be pulled from external Docker registry.

{% include image.html 
lightbox="true" 
file="/images/d07104d-Screen_Shot_2017-07-23_at_6.46.17_PM.png" 
url="/images/d07104d-Screen_Shot_2017-07-23_at_6.46.17_PM.png" 
alt="Screen Shot 2017-07-23 at 6.46.17 PM.png" 
max-width="40%" 
%}

Use the following steps in order to add Image and pull secrets from Codefresh Registry:
* Specify the image name in the format `r.cfcr.io/<ACCOUNT>/<IMAGE>:<TAG>`
* Provide image pull secret - run the following script locally on your Kubernetes cluster (where you are about to add your service) and then enter 'cfcr' in the pull secret field. You should do this for each of your namespaces.

{% highlight text %}
{% raw %}
export DOCKER_REGISTRY_SERVER=r.cfcr.io
export DOCKER_USER=YOUR_USERNAME
export DOCKER_PASSWORD=YOUR_REGISTRY_PASSWORD
export DOCKER_EMAIL=YOUR_EMAIL

kubectl create secret docker-registry cfcr\
 --docker-server=$DOCKER_REGISTRY_SERVER\
 --docker-username=$DOCKER_USER\
 --docker-password=$DOCKER_PASSWORD\
 --docker-email=$DOCKER_EMAIL
{% endraw %}
{% endhighlight %}

{:.text-secondary}
### Set Environment variables

{% include image.html 
lightbox="true" 
file="/images/58ac43c-Screen_Shot_2017-07-23_at_6.42.58_PM.png" 
url="/images/58ac43c-Screen_Shot_2017-07-23_at_6.42.58_PM.png" 
alt="Screen Shot 2017-07-23 at 6.42.58 PM.png" 
max-width="40%" 
%}

{:.text-secondary}
### Set required resources for your service (optional) - CPU, Memory

{% include image.html 
lightbox="true" 
file="/images/d072267-Screen_Shot_2017-07-31_at_10.12.53_PM.png" 
url="/images/d072267-Screen_Shot_2017-07-31_at_10.12.53_PM.png" 
alt="Screen Shot 2017-07-31 at 10.12.53 PM.png" 
max-width="40%" 
%}


{:.text-secondary}
### To add service using K8 yaml file:
Toggle the Deployment option button to the “Advanced” position (different naming in composition, not consistent)
Copy and paste your existing K8 yaml files:
  * Service
  * Deployment
  
{% include image.html 
lightbox="true" 
file="/images/cc01a9f-Pasted_image_at_2017_07_23_03_17_PM.png" 
url="/images/cc01a9f-Pasted_image_at_2017_07_23_03_17_PM.png" 
alt="Pasted image at 2017_07_23 03_17 PM.png" 
max-width="40%" 
%}

{% include image.html 
lightbox="true" 
file="/images/7238315-Pasted_image_at_2017_07_23_03_18_PM.png" 
url="/images/7238315-Pasted_image_at_2017_07_23_03_18_PM.png" 
alt="Pasted image at 2017_07_23 03_18 PM.png" 
max-width="40%" 
%}

## Congratulations! Your service is now deployed to your K8 cluster!
You can update it from your Kubernetes services window - Just hit the "edit" icon and update your service using the same steps as in "Add new service" section.

## Now, let's automate your deployment
After your service is deployed to your Kubernetes cluster, you can automate image deployment using Codefresh pipelines.

Just add the following to your [pipeline definition]({{ site.baseurl }}/docs/pipelines/introduction/):

{:start="1"}
1. In build step - define Docker registry to push

{% include image.html 
lightbox="true" 
file="/images/023f2ba-Screen_Shot_2017-08-01_at_12.09.31_PM.png" 
url="/images/023f2ba-Screen_Shot_2017-08-01_at_12.09.31_PM.png" 
alt="Screen Shot 2017-08-01 at 12.09.31 PM.png" 
max-width="40%" 
%}

{:start="2"}
2. Select *Kubernetes (Beta)* option in the deployment step drop down, and define desired cluster, namespace, service and branches for deployment.

{% include image.html 
lightbox="true" 
file="/images/ee8330b-Screen_Shot_2017-07-31_at_10.10.46_PM.png" 
url="/images/ee8330b-Screen_Shot_2017-07-31_at_10.10.46_PM.png" 
alt="Screen Shot 2017-07-31 at 10.10.46 PM.png" 
max-width="40%" 
%}

{% include image.html 
lightbox="true" 
file="/images/3f7c1cf-Screen_Shot_2017-07-31_at_10.19.23_PM.png" 
url="/images/3f7c1cf-Screen_Shot_2017-07-31_at_10.19.23_PM.png" 
alt="Screen Shot 2017-07-31 at 10.19.23 PM.png" 
max-width="40%" 
%}

{:.text-secondary}
### Adding step to Codefresh yaml
See detailed explanation [here]({{ site.baseurl }}/docs/codefresh-yaml/steps/)

{:.text-secondary}
### Example:
Click [here]({{ site.baseurl }}/docs/deploy-to-kubernetes/codefresh-kubernetes-integration-demochat-example/) to see an example of deploying our Demochat app to Kubernetes cluster.

{{site.data.callout.callout_warning}}
##### Beta disclaimer

Please note that this is a beta version of the Codefresh GKE integration which is still undergoing final testing before its official release. The website, its software and all content found on it are provided on an “as is” and “as available” basis. Codefresh does not give any warranties, whether express or implied, as to the suitability or usability of the website, its software or any of its content.

Codefresh will not be liable for any loss, whether such loss is direct, indirect, special or consequential, suffered by any party as a result of their use of the Codefresh website, its software or content.

Should you encounter any bugs, glitches, lack of functionality or other problems on the website, please let us know immediately so we can rectify these accordingly. please contact us on email: [support@codefresh.io](mailto:support@codefresh.io)

Your help in this regard is greatly appreciated.
{{site.data.callout.end}}
