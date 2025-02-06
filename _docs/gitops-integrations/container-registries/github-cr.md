---
title: "GitOps GitHub Container Registry (GHCR) integration"
description: "Integrate GHCR with GitOps for image enrichment"
group: gitops-integrations
sub_group: container-registries
toc: true
---


Codefresh offers native support for interacting with GitHub Container Registry, allowing you to host and manage Docker container images within your personal or organization account on GitHub, to push, pull, and deploy images seamlessly.

A key benefit of the GitHub Container Registry is the ability to define permissions for Docker images independently of the repository. This means you can keep your repository private while making the Docker image public, offering more flexibility in managing access.

For general information on container registry integrations for GitOps, see [Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).

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
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br> The integration resource is created in the Git repository with the shared configuration, within <code class="highlighter-rouge">resources</code>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <code class="highlighter-rouge">resources/all-runtimes-all-clusters/</code></li><li>Selected runtimes: Created in <code class="highlighter-rouge">resources/runtimes/<runtime-name></code></li></ul> {:/}|
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
   
For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-for-gitops-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations-for-gitops).  

## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
