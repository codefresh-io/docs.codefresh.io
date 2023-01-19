---
title: "GitOps GitHub Container Registry (GHCR) integration"
description: ""
group: gitops-integrations
sub_group: container-registries
redirect_from:
  - /csdp-docs/docs/integrations/container-registries/github-cr/
toc: true
---

The GitHub Container registry allows you to host and manage your Docker container images in your personal or organisation account on GitHub. One of the benefits is that permissions can be defined for the Docker image independent from any repository. Thus, your repository could be private and your Docker image public.   
For information on adding a GitHub Container registry integration in Codefresh, see [Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).

## Prerequisites
Before you configure settings in Codefresh to integrate GitHub container registry:  
* Make sure you have a personal access token with the correct scopes or create one.  
  You need at least the following scopes:  
  * `write:packages`  
  * `read:packages`
  * `delete:packages`
  * `repo` (if your repository is private; do not select if it is public)  

  For detailed information, see the [Authenticating to the Container registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-to-the-container-registry){:target="\_blank"}.


### GitHub Container registry (GHCR)-GitOps integration settings in Codefresh

{: .table .table-bordered .table-hover}
| Setting    | Description  |
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br> The integration resource is created in the Git repository with the shared configuration, within <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources</span>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/all-runtimes-all-clusters/</span></li><li>Selected runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/runtimes/<runtime-name>/</span></li></ul> {:/}|
| **Domain**         | The GitHub registry domain and is set to `ghcr.io`.|
| **Username**       | Your GitHub username.|
| **GitHub Token**   | Your GitHub PAT (personal access token).|
|**Test Connection** | Click to verify that you can connect to the specified instance before you commit changes. |


    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/githubcr/githubcr-int-settings.png" 
   url="/images/integrations/githubcr/githubcr-int-settings.png" 
   alt="GitHub Container registry integration" 
   caption="GitHub Container registry integration"
   max-width="50%" 
   %}
   
For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations).  

## Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
