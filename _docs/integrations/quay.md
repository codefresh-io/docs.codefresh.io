---
title: "Quay Registry"
description: ""
group: integrations
toc: true
---

Codefresh has native support for interacting with Quay registries, from where you can push, pull, and deploy images.  
Adding a Quay integration allows you to reference the integration in external CI tools such as GitHub Actions by the name of the integration account, instead of adding explicit credentials. See [Image enrichment overview]({{site.baseurl}}/docs/integrations/image-enrichment-overview/) and [GitHub Action integration]({{site.baseurl}}/docs/integrations/github-actions/).


### Prerequisites

1. [Create a Redhat/Quay account at Quay](https://quay.io/).
1. Optional. For Codefresh integration, [create a robot account](https://docs.quay.io/glossary/robot-accounts.html).

### Configure Quay integration in Codefresh
Once you have created a Redhat or Quay, configure the Quay integration settings in Codefresh.  

**Before you begin**  
Make sure you have the:  
* Quay domain username
* Quay domain-encrypted password or that of the robot account

**How to**  
1. In the Codefresh UI, go to [Integrations](https://g.codefresh.io/2.0/account-settings/integrations){:target="\_blank"}. 
1. Select **Quay Docker Registry**, and then click **Add**.
1. Click **Add** on the top-right. 
1. Configure the Quay integration settings:
  * Enter an **Integration name**. You can have multiple Quay instances connected.
  * Use this integration for **All runtimes**, or specific **Selected runtimes**.
  * Set the **Domain** to `quay.io`.
  * **Username**: The Quay.io username.
  * **Password**: The Quay.io encrypted password, or robot account if you created one.

 {% include image.html 
 lightbox="true" 
 file="/images/integrations/quay/quay-int-settings.png" 
  url="/images/integrations/quay/quay-int-settings.png"
  alt="Quay Docker Registry integration settings in Codefresh"
  caption="Quay Docker Registry integration settings in Codefresh"
  max-width="50%"
  %}
{:start="5"}
1. To confirm, click **Commit**.
  It may take a few moments for the new integration to be synced to the cluster before it appears in the list.

### Integration resource in shared configuration repo
The integration resource is created in the Git repository with the shared configuration, within `resources`. The exact location depends on whether the integration is shared with all or specific runtimes:  

* All runtimes: Created in `resources/all-runtimes-all-clusters/`
* Selected runtimes: Created in `resources/runtimes/<runtime-name>/`

### What to read next  
[Shared runtime configuration]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Images]({{site.baseurl}}/docs/deployment/images/)  
[Applications dashboard]({{site.baseurl}}/docs/deployment/applications-dashboard/)    
[Adding Git sources]({{site.baseurl}}/docs/runtime/git-sources/)  
