---
title: "Images in Codefresh"
description: ""
group: deployments
sub_group: gitops
toc: true
---

Images from connected registries are displayed in a 


## Access the Images dashboard 

There are several ways to get to the 

* In the Codefresh UI, from Artifacts in the sidebar, select [Images](https://g.codefresh.io/2.0/images){:target="\_blank"}.

Image views to show three levels of data: 

1. Repository and application deployment
1. Tags
1. Summary with metadata and binary information 

## Filters for Image views
As with any resource in Codefresh, the Images dashboard supports filters that allow you focus on the data that's important to you.
Most image filters support multi-selection.  Unless otherwise indicated, the filters are common to all view levels.

{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------           |  
| **Repository Names** | The Git repository or repositories that contain the image.  |                            
| **Tag**              | The tag by which to filter. |  
| **Registry Types**   | The registry which stores your image. To filter by registries that are not listed, select **Other types**.|
| **Git branch**       | The Git branch to which the image is pushed.|
| **Git repositories** | The Git provider you use.|      
| **Deployed in application**| The application or applications in which the image is currently deployed.|
| **Sorted by** | List images by **Name**, or by the most recent update, **Last update**.



## Image main view: deployment and repo information
The main view of the Images dashboard display high-level deployment, repository, and registry information. 


{% include 
   image.html 
   lightbox="true" 
   file="/images/image/application-level.png" 
   url="/images/image/application-level.png" 
   alt="Main view for Images in Codefresh" 
   caption="Main view for Images in Codefresh"
   max-width="60%" 
   %}

 
For each image, you can see:
* The name of the image. Clicking the image name 
* The application or list of applications in which the image is currently deployed. Clicking an application takes you to the GitOps Apps dashboard with detailed information on the application.| 
* Binary information from Git, including the most recent commit, creation date, size, and tag. 
* The registry to which the image is pushed, and from which it is distributed.

The Currently Deployed stamp on the right shows the number of applications in which the image is deployed.

                     
## Image tag view
Drilldown on the repository shows tag information for the image.
{% include 
   image.html 
   lightbox="true" 
   file="/images/image/tag-view.png" 
   url="/images/image/tag-view.png" 
   alt="Tag info for Images in Codefresh" 
   caption="Tag info for Images in Codefresh"
   max-width="30%" 
   %}

{: .table .table-bordered .table-hover}
|  Legend          |  Description|  
| --------------   | --------------           |  
| **1**                | The image tag.   |                            
| **2**                | The comment describing the commit or change, with the name of the Git provider and the corresponding PR. To view details of the commit changes in the Git repository, select the commit text.|  
| **3**                | The hash of the Docker image, generated as sha256. A change in the digest indicates that something has changed in the image.|
| **4**                | The registry to which the image is pushed (stored), and from which it is distributed.|
| **5**                | The OS and architecture in which the image was created. The date and time of the most recent update is in the local time zone|       
| **6**                | Additional information on the image. To view the Summary, select **more details**.|

##  Image Summary 
The Summary view summarizes the metadata for the image. 



{% include 
   image.html 
   lightbox="true" 
   file="/images/image/summary-view.png" 
   url="/images/image/summary-view.png" 
   alt="Summary info for Images in Codefresh" 
   caption="Summary info for Images in Codefresh"
   max-width="30%" 
   %}


* **Image info**:  The image name, registry, OS architecture, and last update.                          
* **Applications** : |  
* **Build Info**: The size of the image, and the Argo Workflow for the image step. Click the link to go to the Argo Workflow.
**Issues**: The Jira issue number and the committer, enriched with the commit message and its status.
**Git**: The Git details for this image tag, such as repo, branch, commit message, committer(s) and Pull Request information.
**Annotations**: Annotations if any assigned to the image.

##  Image Dockerfile 
The Dockerfiles  view summarizes the metadata for the image. 

## Related articles
[Creating GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application)  
[Managing GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application)  
[Image enrichment for GitOps with integrations]({{site.baseurl}}/docs/ci-cd-guides/image-enrichment/)  
[GitOps Overview dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
