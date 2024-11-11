---
title: "Multi-environment promotion with conditions"
description: "Promote product apps between multiple environments with promotion conditions"
group: promotions
toc: true
---


Now that we have reviewed multi-environment promotion in [Multi-environment sequential promotion]({{site.baseurl}}/docs/promotions/promotion-scenarios/multi-env-sequential-flow/), let's configure policies to manage promotion conditions, ensuring that each environment’s specific requirements are met before changes are promoted.

##### What are Promotion Policies?
Promotion Policies define the criteria for promoting changes through each environment. They govern promotion behavior through include automated tests, scans, quality checks, approvals, notifications, and more.  
You can define promotion criteria through Promotion Workflows, modeled on Argo Workflows.

* Create Promotion Workflows in Codefresh by selecting **Promotion Workflows** from the sidebar.






##### Assigning Policy settings

Promotion Policies support three optional settings:
* **Pre-Action Workflow**: The workflow to run before the Promotion Action.
* **Promotion Action**: The action that promotes the changes, which defaults to Commit if not set.
* **Post-Action Workflow**: The workflow to run after the Promotion Action.

We'll define the policy settings for the `three-env-promotion` Promotion Flow to manage promotion behavior for the `qa` and `production` target environments.

Assigning settings is as simple as clicking the respective controls and selecting the workflows/action from the list. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-pre-action.png" 
url="/images/gitops-promotions/tutorials/seq-flow-pre-action.png"
alt="Policy settings for target environments" 
caption="Policy settings for target environments"
max-width="60%"
%}

For both `qa` and `production`, we'll select the same workflows and the same promotion action.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-populated-policy.png" 
url="/images/gitops-promotions/tutorials/seq-flow-populated-policy.png"
alt="Target environment with policy settings" 
caption="Target environment with policy settings"
max-width="60%"
%}




##### Triggering policy-driven Promotion Flow
We'll save the changes to the `three-env-promotion` flow, trigger it, and monitor the release view.

In contrast to the previous release, the current release view shows the `qa` and `production` environments with the Pre- and Post-Action Workflows defined for each environment. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-release-with-workflows.png" 
url="/images/gitops-promotions/tutorials/seq-flow-release-with-workflows.png"
alt="Release view for policy-driven Promotion Flow" 
caption="Release view for policy-driven Promotion Flow"
max-width="60%"
%}

## Related articles
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
 