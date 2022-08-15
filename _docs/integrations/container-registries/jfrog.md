---
title: "JFrog Artifactory"
description: ""
group: integrations
sub_group: container-registries
toc: true
---

Codefresh has native support for interacting with JFrog Artifactory.  
For information on adding a JFrog Artifactory integration in Codefresh, see [Container registry integrations]({{site.baseurl}}/docs/integrations/container-registries/).



### JFrog Artifactory integration settings in Codefresh

{: .table .table-bordered .table-hover}
| Setting    | Description  |
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share integration resource. The integration resource is created in the Git repository with the shared configuration, within <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources</span>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/all-runtimes-all-clusters/</span></li><li>Selected runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/runtimes/<runtime-name>/</span></li></ul> {:/}|
| **Server Name**    | The URL of the JFrog Artifactory server instance.|
| **Username**       | The JFrog Artifactory username.|
| **Password**       | The JFrog Artifactory password.|
|**Test Connection** | Click to verify that you can connect to the specified instance before you commit changes. |


    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/jfrog/jfrog-int-settings.png" 
   url="/images/integrations/jfrog/jfrog-int-settings.png" 
   alt="JFrog Artifactory container registry integration" 
   caption="JFrog Artifactory container registry integration"
   max-width="50%" 
   %}
   
For how-to instructions, see [Configure container registry integrations in Codefresh]({{site.baseurl}}/docs/integrations/container-registries/#configure-container-registry-integrations-in-codefresh) and [Edit/delete container registry integrations in Codefresh]({{site.baseurl}}/docs/integrations/container-registries/#editdelete-container-registry-integrations-in-codefresh).  

### Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/)
[CI integrations]({{site.baseurl}}/docs/integrations/ci-integrations/)  
[Issue-tracking]({{site.baseurl}}/docs/integrations/issue-tracking/)  
