---
title: "GitOps Quay integration"
description: ""
group: gitops-integrations
sub_group: container-registries
toc: true
---

Codefresh has native support for interacting with Quay registries, from where you can push, pull, and deploy images.  
Adding a Quay integration allows you to reference the integration in external CI tools such as GitHub Actions by the name of the integration account, instead of adding explicit credentials. See [Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/) and [GitOps CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/).


## Prerequisites

1. [Create a Redhat/Quay account at Quay](https://quay.io/){:target="\_blank"}.
1. Optional. For Codefresh integration, [create a robot account](https://docs.quay.io/glossary/robot-accounts.html){:target="\_blank"}.

## Quay-GitOps integration settings in Codefresh


{: .table .table-bordered .table-hover}
| Setting    | Description     | 
| ----------  |  -------- | 
| **Integration name**       | A friendly name for the integration. This is the name you will reference in the third-party CI platform/tool. |
| **All Runtimes/Selected Runtimes**   | {::nomarkdown} The runtimes in the account with which to share the integration resource. <br>The integration resource is created in the Git repository with the shared configuration, within <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources</span>. The exact location depends on whether the integration is shared with all or specific runtimes: <br><ul><li>All runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/all-runtimes-all-clusters/</span></li><li>Selected runtimes: Created in <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">resources/runtimes/<runtime-name>/</span></li></ul> You can reference the Docker Hub integration in the CI tool. {:/}|
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

For how-to instructions, see [Configure container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#configure-container-registry-integrations-in-codefresh) and [Edit/delete container registry integrations for GitOps in Codefresh]({{site.baseurl}}/docs/gitops-integrations/container-registries/#editdelete-container-registry-integrations). 

Make sure you have the:  
* Quay domain username
* Quay domain-encrypted password or that of the robot account


## Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Image enrichment with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/)  
[GitOps CI integrations]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
[GitOps issue-tracking integrations]({{site.baseurl}}/docs/gitops-integrations/issue-tracking/)  
