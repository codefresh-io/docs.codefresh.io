---
title: "Images dashboard"
description: ""
group: deployments
toc: true
---


##  Images dashboard 
The Images dashboard provides a centralized view of container images built and used in deployments. With powerful filtering options and enriched metadata, it enhances visibility into an image’s provenance and deployment history.

{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-default-main-view.png" 
   url="/images/image/images-default-main-view.png" 
   alt="Images dashboard" 
   caption="Images dashboard"
   max-width="60%" 
   %}

##### Image enrichment and metadata
Image enrichment is the process of enhancing container images with valuable metadata to improve traceability and governance. 
The metadata is added to the image through third-party integrations with CI, registry, and issue-tracking tools.  

Each image tag reflects enriched information from these integrations, which can include:
* Source code details: Commit SHA, repository, branch, and PR associations
* Build metadata: Pipeline name, build status, timestamp
* Deployment tracking: Visibility into where an image is currently running

##### Advanced filtering
The dashboard offers a variety of filters to help quickly find relevant images. The default and most useful is the **Currently Deployed** filter, which pinpoints images actively deployed in applications with additional information on the tag, services, most recent commits and more. 

Other filters include build status, repository, commit SHA, and promotion status, giving you granular control over image tracking.

##### Layered views for enhanced visibility

The Images dashboard presents information in multiple layers, allowing you to drill down from high-level summaries to detailed metadata.  
This structure helps to quickly analyze images based on your needs:
* Current deployment view
* Tag-level view, displaying images in applications by tag versions
* Detailed view, displaying summary, Dockerfile, and layers

{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-default-main-view.png" 
   url="/images/image/images-default-main-view.png" 
   alt="Images dashboard" 
   caption="Images dashboard"
   max-width="60%" 
   %}

## Access the Images dashboard 


* In the Codefresh UI, from the sidebar, select **Images**.


## Filters for Image views
As with any resource, the Images dashboard supports filters that allow you focus on the data that's important to you.
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



## Image high-level view: current deployment and repo information
The main view of the Images dashboard displays high-level deployment, repository, and registry information. 

<!---

{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-main-view.png" 
   url="/images/image/images-main-view.png" 
   alt="Images in Codefresh" 
   caption="Images in Codefresh"
   max-width="60%" 
   %}

-->

For each image, you can see:
* The name of the image. Clicking the name takes you to the tag-level view of the image.
* The application or list of applications in which the image is currently deployed. Clicking an application takes you to the GitOps Apps dashboard with detailed information on the application.
* Binary information from Git, including the most recent commit, creation date, size, and tag. 
* The registry to which the image is pushed, and from which it is distributed.

The Currently Deployed stamp on the right shows the number of applications in which the image is deployed.

                     
## Image tag-level view
Drill down on the repository shows all the tags created for the image.
{% include 
   image.html 
   lightbox="true" 
   file="/images/image/image-drill-down-view.png" 
   url="/images/image/image-drill-down-view.png" 
   alt="Image tag info" 
   caption="Image tag info"
   max-width="60%" 
   %}

Each tag displays information:
                            
* The comment describing the commit or change, with the name of the Git provider and the corresponding PR. To view details of the commit changes in the Git repository, select the commit text.|  
* The hash of the Docker image, generated as sha256. A change in the digest indicates that something has changed in the image.|
* The registry to which the image is pushed, and from which it is distributed.|
* The OS and architecture in which the image was created. The date and time of the most recent update is in the local time zone|       
* The date and time of the most recent update.
* The size of the tag.

{{site.data.callout.callout_tip}}
**TIP**  
For Summary, Dockerfile, and Layer information on a tag, click **more details**.
{{site.data.callout.end}}


##  Image detailed view
The detailed view provides a granular breakdown of the image through the Summary, Dockerfile, and Layers tabs.

### Summary view
Summarizes the metadata for the image:
* **Image info**: The image name, registry, OS architecture, and last update.                          
* **Applications** : The application or applications in which the image is deployed. 
* **Build Info**: The size of the image, and the Argo Workflow for the image step. Click the link to go to the Argo Workflow.
* **Issues**: The Jira issue number and the committer, enriched with the commit message and its status.
* **Git**: The Git details for this image tag, such as repo, branch, commit message, committer(s) and Pull Request information.
* **Annotations**: Annotations if any assigned to the image.

<!--- {% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-summary-tab.png" 
   url="/images/image/images-summary-tab.png" 
   alt="Image Summary tab" 
   caption="Image Summary tab"
   max-width="60%" 
   %}
-->



###  Dockerfile 
The Dockerfile tab is populated only for images built with Dockerfiles.

<!--- 
{% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-dockerfile-tab.png" 
   url="/images/image/images-dockerfile-tab.png" 
   alt="Image Dockerfile tab" 
   caption="Image Dockerfile tab"
   max-width="60%" 
   %}
-->
###  Layers
The Layers tab provides a step-by-step breakdown of how an image was built, mapping each layer to a specific Docker instruction. Reviewing layers helps identify unnecessary bloat, detect security risks, and optimize images for faster builds and deployments.

<!--- {% include 
   image.html 
   lightbox="true" 
   file="/images/image/images-layers-tab.png" 
   url="/images/image/images-layers-tab.png" 
   alt="Image Layers tab" 
   caption="Image Layers tab"
   max-width="60%" 
   %}
-->

## Related articles 
[Image enrichment for GitOps with integrations]({{site.baseurl}}/docs/ci-cd-guides/image-enrichment/)  
[Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
