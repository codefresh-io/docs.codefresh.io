---
title: "Multi-environment promotion with parallel environments"
description: "Promote product apps between environments in parallel"
group: promotions
toc: true
---


In this quick start, we'll build on the `multi-env-sequential-promotion` flow to create a Promotion Flow with additional environments to activate parallel promotions, and save it as a new flow.

Consider a multi-region deployment model, where you have designated primary regions for deployment, and you want promotions to pass successfully for all these regions and the production environment in parallel.

## Context
In the Product Dashboard, the `demo-trioapp` product has applications in several production environments. 
If you need to add applications, add at least two applications. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-prod-apps.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-prod-apps.png"
alt="Product with applications in multiple production environments" 
caption="Product with applications in multiple production environments"
max-width="60%"
%}


## Add parallel environments to Promotion Flow

Add environments to the Promotion Flow to execute promotions in parallel in all of them.
We'll add two additional production environments to `qa`: `prod-asia` and `prod-us`. 

1. Open the Promotion Flow you created, `multi-env-sequential-promotion` for the quick start.
1. Mouse over the right of the environment node before the final one in the flow and add the new environments.
  For the quick start, we'll add `prod-eu` and `prod-asia` to `qa`.

  {% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png"
alt="Adding parallel environments in Promotion Flow" 
caption="Adding parallel environments in Promotion Flow"
max-width="60%"
%}

{:start="3"}
1. Click **Save Promotion Flow** and save it as a new flow, `multi-env-parallel` for the quick start.

## Chart and YAML views of parallel Promotion Flow

Here's the chart view of the Promotion Flow (top), and the YAML view of the same (below). 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-created.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-created.png"
alt="Promotion Flow with parallel environments" 
caption="Promotion Flow with parallel environments"
max-width="60%"
%}



{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-yaml-view.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-yaml-view.png"
alt="YAML view of Promotion Flow with parallel environments" 
caption="YAML view of Promotion Flow with parallel environments"
max-width="60%"
%}


## Release view for parallel environment promotion

Triggering this flow displays the parallel promotion structure in the Release view.  
Promotions are orchestrated simultaneously in each environment, and the release is considered successful only after all environments are promoted successfully.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-release-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-release-view.png"
alt="Release view of Promotion Flow with parallel environments" 
caption="Release view of Promotion Flow with parallel environments"
max-width="60%"
%}

## Continue with
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
 