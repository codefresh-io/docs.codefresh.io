---
title: "Images in Codefresh"
description: ""
group: deployments
sub_group: gitops
redirect_from:
  - /csdp-docs/docs/deployment/images/
toc: true
---

Images from connected registries are displayed in a 


## Access the Images dashboard 


* In the Codefresh UI, from Artifacts in the sidebar, select [Images](https://g.codefresh.io/2.0/images){:target="\_blank"}.



Image views to show multiple levels of data: 

1. Repository and application deployment
1. Tags
1. Summary with metadata and binary information 
1. Dockerfile info
1. Layers

## Filters for Image views
As with any resource in Codefresh, the Images dashboard supports filters that allow you focus on the data that's important to you.
Most image filters support multi-selection.  Unless otherwise indicated, the filters are common to all view levels.

{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------           |  
| **Repository Names** | The Git repository or repositories that contain the image.  |                            
| **Tag**              | The tag by which to filter. |  
| **Registry Types**   | The registry which stores your image. To filter by registries that are not listed, select **Other types**.|   
| **Deployed in application**| The application or applications in which the image is currently deployed.|
| **Currently Deployed**| When enabled, displays only images that are currently deployed in applications. |
| **Sorted by** | List images by **Name**, or by the most recent update, **Last update**.
| **Git branch**       | Available in **More filters**. The Git branch to which the image is pushed.|
| **Git repositories** | Available in **More filters**. The Git provider you use.|   

Currently Deployed

## Image main view: deployment and repo information
The main view of the Images dashboard displays high-level deployment, repository, and registry information. 


{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-main-view.png" 
   url="/images/image/images-main-view.png" 
   alt="Images in Codefresh" 
   caption="Images in Codefresh"
   max-width="60%" 
   %}

 
For each image, you can see:
* The name of the image. Clicking the image name 
* The application or list of applications in which the image is currently deployed. Clicking an application takes you to the GitOps Apps dashboard with detailed information on the application.| 
* Binary information from Git, including the most recent commit, creation date, size, and tag. 
* The registry to which the image is pushed, and from which it is distributed.

The Currently Deployed stamp on the right shows the number of applications in which the image is deployed.

                     
## Image tag view
Drilldown on the repository shows all the tags created for the image.
{% include 
   image.html 
   lightbox="true" 
   file="/images/image/image-drill-down-view.png" 
   url="/images/image/image-drill-down-view.png" 
   alt="Image tag info" 
   caption="Image tag info"
   max-width="60%" 
   %}

Each row displays information on the tag:
                            
* The comment describing the commit or change, with the name of the Git provider and the corresponding PR. To view details of the commit changes in the Git repository, select the commit text.|  
* The hash of the Docker image, generated as sha256. A change in the digest indicates that something has changed in the image.|
* The registry to which the image is pushed, and from which it is distributed.|
* The OS and architecture in which the image was created. The date and time of the most recent update is in the local time zone|       
* The date and time of the most recent update.
* The size of the tag.

> For Summary, Dockerfile, and Layer information on a tag, click **more details**.

##  Image Summary 
The Summary view summarizes the metadata for the image. 



{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-summary-tab.png" 
   url="/images/image/images-summary-tab.png" 
   alt="Image Summary tab" 
   caption="Image Summary tab"
   max-width="60%" 
   %}


* **Image info**:  The image name, registry, OS architecture, and last update.                          
* **Applications** : The application or applications in which the image is deployed. 
* **Build Info**: The size of the image, and the Argo Workflow for the image step. Click the link to go to the Argo Workflow.
* **Issues**: The Jira issue number and the committer, enriched with the commit message and its status.
* **Git**: The Git details for this image tag, such as repo, branch, commit message, committer(s) and Pull Request information.
* **Annotations**: Annotations if any assigned to the image.

##  Image Dockerfile 


{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-dockerfile-tab.png" 
   url="/images/image/images-dockerfile-tab.png" 
   alt="Image Dockerfile tab" 
   caption="Image Dockerfile tab"
   max-width="60%" 
   %}
 
##  Image Layers


{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-layers-tab.png" 
   url="/images/image/images-layers-tab.png" 
   alt="Image Layers tab" 
   caption="Image Layers tab"
   max-width="60%" 
   %}

## Related articles 
[Image enrichment for GitOps with integrations]({{site.baseurl}}/docs/ci-cd-guides/image-enrichment/)  
[GitOps Overview dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
