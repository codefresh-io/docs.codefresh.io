---
title: "GitOps Docker Hub integration"
description: ""
group: gitops-integrations
sub_group: container-registries
toc: true
---

Codefresh has native support for interacting with Docker Hub registries, to push, pull, and deploy images.  
For information on adding a Docker Hub integration in Codefresh, see [GitOps container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).

## Prerequisites
Before you configure settings in Codefresh to integrate Docker Hub registry, do the following:

* [Create an account or sign in to your account at Docker Hub](https://hub.docker.com/signup){:target="\_blank"}
* (Optional) [Enable 2FA (Two-Factor Authentication)](https://docs.docker.com/docker-hub/2fa/){:target="\_blank"}
* [Create a personal account token](https://docs.docker.com/docker-hub/access-tokens/){:target="\_blank"}

## Docker Hub-GitOps integration settings in Codefresh
The table describes the arguments required for Docker Hub GitOps integration in Codefresh.  

{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br>The integration resource is created in the Git repository with the shared configuration, within <code class="highlighter-rouge">resources</code>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <code class="highlighter-rouge">resources/all-runtimes-all-clusters/</code></li><li>Selected runtimes: Created in <code class="highlighter-rouge">resources/runtimes/<runtime-name></code></li></ul> You can reference the Docker Hub integration in the CI tool. {:/}|
| **Username**       | The Docker Hub username.|
| **Password**       |  If you enabled two-factor authentication, enter the personal access token for your Docker Hub account for Codefresh to push images. Personal access tokens are more secure and can be revoked when needed. Codefresh can then push your images. If two-factor authentication is not enabled, enter the password of your Docker Hub account (not recommended).|
| **Test connection**       | Click to verify that you can connect to the specified instance before you commit changes. |
   

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/docker-registries/docker-hub.png" 
   url="/images/integrations/docker-registries/docker-hub.png" 
   alt="Docker Hub integration for image enrichment" 
   caption="Docker Hub integration for image enrichment"
   max-width="50%" 
   %}
   
For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations-for-gitops).  

## Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[CI GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[Issue-tracking GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  

