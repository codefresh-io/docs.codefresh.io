---
title: "GitOps Quay integration"
description: "Integrate Quay with GitOps for image enrichment"
group: gitops-integrations
sub_group: container-registries
toc: true
---

{% if page.collection == site.gitops_collection %}
>**Early Access**  
This feature is available upon request through our Early Access Program. As it is still in development, you may encounter occasional bugs or limitations.
{% endif %}

Codefresh offers native support for integrating with Quay, enabling seamless pushing, pulling, and deploying of container images.

By adding a Quay integration in Codefresh, you can reference the integration account in external CI tools, such as GitHub Actions, using the integration name instead of managing explicit credentials. This simplifies security and enhances the ease of managing integrations in GitOps.

For general information on container registry integrations for GitOps, see [Container registry GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).

## Prerequisites

1. [Create a Redhat/Quay account at Quay](https://quay.io/){:target="\_blank"}.
1. Optional. For Codefresh integration, [create a robot account](https://docs.quay.io/glossary/robot-accounts.html){:target="\_blank"}.

## Quay-GitOps integration settings in Codefresh


{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br>The integration resource is created in the Git repository with the shared configuration, within <code class="highlighter-rouge">resources</code>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <code class="highlighter-rouge">resources/all-runtimes-all-clusters</code></li><li>Selected runtimes: Created in <code class="highlighter-rouge">resources/runtimes/<runtime-name>/</code></li></ul> You can reference the Docker Hub integration in the CI tool. {:/}|
|**Domain**| Set to `quay.io`.|
|**Username**| The Quay.io username.|
|**Password**| The Quay.io encrypted password, or robot account if you created one.|

 {% include image.html 
 lightbox="true" 
 file="/images/integrations/quay/quay-int-settings.png" 
  url="/images/integrations/quay/quay-int-settings.png"
  alt="Quay Docker Registry integration settings in Codefresh"
  caption="Quay Docker Registry integration settings in Codefresh"
  max-width="50%"
  %}

For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations-for-gitops). 

Make sure you have the:  
* Quay domain username
* Quay domain-encrypted password or that of the robot account


## Related articles
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[GitOps CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[GitOps issue-tracking integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
