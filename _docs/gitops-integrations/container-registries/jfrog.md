---
title: "GitOps JFrog Artifactory integration"
description: "Integrate JFrog Artifactory with GitOps for image enrichment"
group: gitops-integrations
sub_group: container-registries
toc: true
---

{% if page.collection == site.gitops_collection %}
>**Early Access**  
This feature is available upon request through our Early Access Program. As it is still in development, you may encounter occasional bugs or limitations.
{% endif %}

Codefresh offers native support for integrating with JFrog Artifactory, enabling you to host, manage, and deploy Docker container images. 
<!--- With JFrog Artifactory, you can take advantage of fine-grained access control and support for multiple repository types, including Docker registries. This flexibility allows you to manage your images while enforcing strict security and permission policies, all within your GitOps process. -->
For general information on container registry integrations for GitOps, see [Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).




## JFrog Artifactory-GitOps integration settings in Codefresh

{: .table .table-bordered .table-hover}
| Setting    | Description  |
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br>The integration resource is created in the Git repository with the shared configuration, within <code class="highlighter-rouge">resources</code>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <code class="highlighter-rouge">resources/all-runtimes-all-clusters/</code></li><li>Selected runtimes: Created in <code class="highlighter-rouge">resources/runtimes/<runtime-name></code></li></ul> {:/}|
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
   
For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations-for-gitops).    


## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[GitOps CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[GitOps issue-tracking integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
