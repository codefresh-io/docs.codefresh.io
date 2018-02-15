---
layout: docs
title: "Deploy to Kubernetes"
description: ""
group: deploy-to-kubernetes
permalink: /:path/codefresh-kubernetes-integration-beta/
redirect_from:
  - /docs/codefresh-kubernetes-integration-beta
  - /docs/codefresh-kubernetes-integration-beta/
toc: true
---

## Add a Kubernetes Cluster
On your Account settings, go to Kubernetes Integration tab.

{% include image.html 
lightbox="true" 
file="/images/c7b958e-Screen_Shot_2017-10-23_at_7.31.49_PM.png" 
url="/images/c7b958e-Screen_Shot_2017-10-23_at_7.31.49_PM.png" 
alt="Screen Shot 2017-10-23 at 7.31.49 PM.png" 
max-width="40%" 
%}
 
If you would like to switch google account, you can remove this integration from [here](https://myaccount.google.com/permissions){:target="_blank"}.

## Add a Kubernetes cluster
In the kubernetes integration window, you will be able to add your K8 clusters for view and deployment. 

{:.text-secondary}
### Adding GKE Cluster
This will be done by clicking the “Add cluster” button and selecting desired project and cluster.

{:.text-secondary}
### Adding other clusters
Follow the following guide to add any kubernetes cluster - [Add Kubernetes cluster]({{ site.baseurl }}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/)
 
{% include image.html 
lightbox="true" 
file="/images/9095bec-Screen_Shot_2017-10-23_at_7.35.06_PM.png" 
url="/images/9095bec-Screen_Shot_2017-10-23_at_7.35.06_PM.png" 
alt="Screen Shot 2017-10-23 at 7.35.06 PM.png" 
max-width="40%" 
%}
 
## Explore your services on Kubernetes Cluster
After adding a cluster, a Kubernetes Tab will be added to your Left pane. Clicking on Kubernetes icon will take you to your services dashboard.

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

## Deploy new service

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

Use the following steps in order to add Image and pull secrets from [Codefresh Registry]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/):
* Specify the image name in the format `r.cfcr.io/<ACCOUNT>/<IMAGE>:<TAG>`
* Provide image pull secret - this shall be done for each namespace

{% include image.html 
lightbox="true" 
file="/images/11c15f3-Screen_Shot_2017-09-06_at_6.28.30_PM.png" 
url="/images/11c15f3-Screen_Shot_2017-09-06_at_6.28.30_PM.png" 
alt="Screen Shot 2017-09-06 at 6.28.30 PM.png" 
max-width="40%" 
%}

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

{:.text-secondary}
### Congratulations! Your service is now deployed to your K8 cluster!

You can update it from your Kubernetes services window - Just hit the "edit" icon and update your service using the same steps as in "Add new service" section.

## Automate your deployment
After your service is deployed to your Kubernetes cluster, you can automate image deployment using Codefresh pipelines.

Just add the following to your [pipeline definition](https://dash.readme.io/project/codefresh-docs/v1.0/docs/pipeline):
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
See detailed explanation [here]({{ site.baseurl }}/docs/codefresh-yaml/steps/deploy/)

{:.text-secondary}
### Example:
Click [here](https://docs.codefresh.io/docs/codefresh-kubernetes-integration-demochat-example) to see an example of deploying our Demochat app to Kubernetes cluster.

{{site.data.callout.callout_warning}}
##### Beta disclaimer

Please note that this is a beta version of the Codefresh GKE integration which is still undergoing final testing before its official release. The website, its software and all content found on it are provided on an “as is” and “as available” basis. Codefresh does not give any warranties, whether express or implied, as to the suitability or usability of the website, its software or any of its content.

Codefresh will not be liable for any loss, whether such loss is direct, indirect, special or consequential, suffered by any party as a result of their use of the Codefresh website, its software or content. <br><br>Should you encounter any bugs, glitches, lack of functionality or other problems on the website, please let us know immediately so we can rectify these accordingly. please contact us on email: [support@codefresh.io](mailto:support@codefresh.io) 

Your help in this regard is greatly appreciated. 
{{site.data.callout.end}}
