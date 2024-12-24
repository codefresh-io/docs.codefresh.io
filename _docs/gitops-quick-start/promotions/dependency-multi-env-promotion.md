---
title: "Quick start: Multi-environment promotion with dependencies"
description: "Promote product apps between environments with dependencies"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/dependency-multi-env-promotion/
---


In the final quick start, we’ll explore how to create dependencies between environments in a Promotion Flow.

By default, each environment in a promotion flow (except the trigger environment), is dependent on the one preceding it.  
However, critical environments may rely on the success or stability of multiple environments before they are promoted to. By defining additional dependencies, you can ensure that changes are promoted only when all required environments meet the specified criteria.

In this quick start, we'll update the `multi-env-sequential-promotion` Promotion Flow.



## Add dependency
Update the dependency on the `prod` environment, by selecting `staging` in addition to `qa`.

1. From the list of Promotion Flows, open `multi-env-sequential-promotion`.
  In the example, we have already added the `staging` environment as a parallel environment to `qa`.  
1. Mouse over the environment for which to add the dependency (`prod`), and click **Depends on**.
1. Select the additional environment, `staging` for the quick start, and then click **Update dependency**.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-update.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow.png"
alt="Promotions quick start: Update dependencies for environment" 
caption="Promotions quick start: Update dependencies for environment"
max-width="60%"
%}


Here's the `multi-env-sequential-promotion` Promotion Flow with the updated dependency.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-flow.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow.png"
alt="Promotions quick start: Chart view of Promotion Flow with updated dependencies" 
caption="Promotions quick start: Chart view of Promotion Flow with updated dependencies"
max-width="60%"
%}

Here's the YAML view of the same flow with the updated dependency.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-flow-yaml.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow-yaml.png"
alt="Promotions quick start: YAML view of Promotion Flow with updated dependencies" 
caption="Promotions quick start: YAML view of Promotion Flow with updated dependencies"
max-width="60%"
%}


That concludes our set of quick-start walkthroughs for GitOps. 
 
 