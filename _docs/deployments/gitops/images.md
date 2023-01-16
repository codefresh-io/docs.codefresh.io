---
title: "Images in Codefresh"
description: ""
group: deployments
sub_group: gitops
toc: true
---

Building Docker images is one of the most basic requirements of Codefresh pipelines and Argo Workflows. 
Once you create an image, push the image to a registry, and report it to Codefresh, image information is continually updated in the Images page. 

You can enrich the basic information reported with the image with issue-tracking metadata and annotations.

## Image reporting and enrichment flow 

Complete these steps to see images in the Images dashboard.  

1. (Mandatory) Build and push the Docker image  
    * Codefresh pipelines
      Use the `build` step to build a Docker image declaratively in simple or multi-stage Dockerfiles. See [Build step in pipelines]({{site.baseurl}}/docs/pipelines/steps/build/).  
      The pipeline pushes the image to the default Docker registry.
      You can also push the image to any external Docker registry that you integrate with Codefresh. See [Docker Registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries/).  

      Review different scenarios for building and pushing Docker images in  our [Build/push examples]({{site.baseurl}}/docs/example-catalog/examples/#buildpush-examples).
 
    * GitOps
      Create the Docker image.
      [Create a Docker image using Kaniko](https://codefresh.io/argohub/workflow-template/kaniko){:target="\_blank"}. 

{:start="2"}   
1. (Mandatory) GitOps: Connect to Docker registries  
  Connect Docker registries to Codefresh to store Docker images.  
  See [GitOps container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries).

{:start="3"}
1. (Mandatory) GitOps: Report image information to Codefresh  
  This is the equivalent to pushing the image in Codefresh pipelines.  

    Use the [report-image-info](https://github.com/codefresh-io/argo-hub/blob/main/workflows/codefresh-csdp/versions/0.0.6/docs/report-image-info.md){:target="\_blank"} DAG template to report image information to Codefresh. 
  
    > If you are using an external platform or tool for your CI pipelines such as GitHub Actions or Jenkins, or even Codefresh pipelines, we have a new template that combines image reporting and enrichment. See [GitOps CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations) for details.

{:start="4"}
1. (Optional) Enrich image with annotations and metadata  
  Image enrichment exposes metadata such as feature requests, pull requests, and logs as part of the application’s deployment, for visibility into all aspects of the deployment, making it easier to track actions and identify root cause of failures.  
    * Codefresh pipelines  
      See [Docker image metadata]({{site.baseurl}}/docs/pipelines/docker-image-metadata/)  
    * GitOps  
      See [GitOps issue tracking integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking) and [Jira]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/jira) integration.  



## Images dashboard 

* In the Codefresh UI, from Artifacts in the sidebar, select [Images](https://g.codefresh.io/2.0/images){:target="\_blank"}.

Image views are layered to show three levels of data: 
* Repository and application deployment
* Tags
* Summary with metadata and binary information 

### Filters for Image views
As with any resource in Codefresh, the Image dashboard  support filters that allow you focus on the data that's important to you.
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



### Image repository and deployment view
The default view for image resources shows repository and deployment information.

{% include 
   image.html 
   lightbox="true" 
   file="/images/image/application-level.png" 
   url="/images/image/application-level.png" 
   alt="Repository & deployment info for Images in Codefresh" 
   caption="Repository & deployment info for Images in Codefresh"
   max-width="30%" 
   %}

{: .table .table-bordered .table-hover}
|  Legend          |  Description|  
| --------------   | --------------           |  
| **1**            | The name of the image.   |                            
| **2**            | The applications in which the image is currently deployed. Select the application to go to the Applications dashboard.|  
| **3**            | The details on the most recent commit associated with the image. Select the commit to view the changes in the Git repository.|
| **4**            | Binary information on the image.|
| **5**            | The registry to which the image is pushed, and from which it is distributed.|
                     
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

##  Image summary view
The Summary view shows metadata for the image. 
Selecting **more details** for an image tag.

{% include 
   image.html 
   lightbox="true" 
   file="/images/image/summary-view.png" 
   url="/images/image/summary-view.png" 
   alt="Summary info for Images in Codefresh" 
   caption="Summary info for Images in Codefresh"
   max-width="30%" 
   %}

{: .table .table-bordered .table-hover}
|  Legend          |  Description|  
| --------------   | --------------           |  
| **1**            | The bugs or fix requests opened and being worked on for this image tag. |                            
| **2**            | The pull request or requests pending commit.|  
| **3**            | The Git details for this image tag, such as the Git hash, the Jira issue number, Git Pull Request, commit information, the name of the user who performed the commit. |       
| **4**            | The workflow for the image step. Select to go to the Workflow.| 
| **5**             | The log information for the build image step in the relevant workflow. Select to view Logs panel. |

## Related articles
[Creating GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application)  
[Managing GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-applications)  
[Image enrichment for GitOps with integrations]({{site.baseurl}}/integrations/image-enrichment-overview)  
[Home dashboard]({{site.baseurl}}/docs/dashboard/home-dashboard)  
