---
title: "Amazon ECR"
description: ""
group: integrations
sub_group: container-registries
toc: true
---

Codefresh has native support for interacting with Amazon ECR (Elastic Container Registry), to push, pull, and deploy images.  
For information on adding an Amazon ECR integration in Codefresh, see [Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/).

>Amazon ECR integration is supported only in hybrid runtimes.

### Prerequisites
Before you configure settings in Codefresh to integrate Amazon ECR:  
* [Create an IAM (Identity and Access Management) role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html){:target="\_blank"} 


### Amazon ECR integration settings in Codefresh
The table describes the arguments required to integrate Amazon ECR in  Codefresh.  

{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. The integration resource is created in the Git repository with the shared configuration, within <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources</span>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/all-runtimes-all-clusters/</span></li><li>Selected runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/runtimes/<runtime-name>/</span></li></ul> You can reference the Docker Hub integration in the CI tool. {:/}|
| **IAM Role**       | The name of the IAM role with the specific permissions for authentication to the ECR.|
| **Region**       |  The geographic region hosting the container registry. Define the region nearest to you.|
| **Test connection**       | Click to verify that you can connect to the specified instance before you commit changes. |
   

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/aws/aws-int-settings.png" 
   url="/images/integrations/aws/aws-int-settings.png" 
   alt="Amazon ECR for image enrichment" 
   caption="Amazon ECR for image enrichment"
   max-width="50%" 
   %}
   
For how-to instructions, see [Configure container registry integrations in Codefresh]({{site.baseurl}}/docs/integrations/container-registries/#configure-container-registry-integrations-in-codefresh) and [Edit/delete container registry integrations in Codefresh]({{site.baseurl}}/docs/integrations/container-registries/#editdelete-container-registry-integrations-in-codefresh).  

### Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/)
[CI integrations]({{site.baseurl}}/docs/integrations/ci-integrations/)  
[Issue-tracking]({{site.baseurl}}/docs/integrations/issue-tracking/)  