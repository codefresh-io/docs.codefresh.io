---
title: "Multi-environment promotion with parallel environments"
description: "Promote product apps between environments in parallel"
group: promotions
toc: true
---


In this scenario, we'll build on the `three-env-promotion` flow to create a promotion flow with additional environments and parallel promotions, and save it as a new flow.

Consider a multi-region deployment model, where you have designated primary regions for deployment, and you want promotions to pass successfully for all these regions and the production environment in parallel.

##### Context
In the Product dashboard, the `cf-101` product has applications in several production environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-prod-apps.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-prod-apps.png"
alt="Product with applications in multiple production environments" 
caption="Product with applications in multiple production environments"
max-width="60%"
%}


##### Adding environments to Promotion Flow

We'll add two additional production environments to `qa`: `prod-asia` and `prod-us`. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png"
alt="Adding parallel environments in Promotion Flow" 
caption="Adding parallel environments in Promotion Flow"
max-width="60%"
%}

Here's the promotion flow with the parallel environments:

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-created.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-created.png"
alt="Promotion Flow with parallel environments" 
caption="Promotion Flow with parallel environments"
max-width="60%"
%}


We'll save this as `parallel-env-promotion`. 

Triggering this flow displays the parallel promotion structure in the Release view.  
Promotions occur simultaneously for each environment, and the release is considered successful once all environments are promoted successfully.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-release.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-release.png"
alt="Release view of Promotion Flow with parallel environments" 
caption="Release view of Promotion Flow with parallel environments"
max-width="60%"
%}

## Related articles
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
 