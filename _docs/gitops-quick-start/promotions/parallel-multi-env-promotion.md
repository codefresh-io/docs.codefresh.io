---
title: "Quick start: Multi-environment parallel promotion"
description: "Promote product apps between environments in parallel"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/parallel-multi-env-promotion/
---


In this quick start, we'll learn how to configure parallel promotions across multiple environments.

Parallel promotions are ideal for scenarios like multi-region deployments, where updates must be promoted simultaneously to designated regions before proceeding to a production environment.

We’ll modify the `multi-env-sequential-promotion` flow to include parallel environments, saving it as a new flow called `multi-env-parallel`.

## Before you begin
* Ensure you have an existing product deployed to more than one production environment.  
  For example, the `demo-trioapp` product in this quick start is deployed to multiple production environments.
* If necessary, add at least two applications to two different production environments before proceeding.



{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-dashboard-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-dashboard-view.png"
alt="Promotions quick start: Product with applications in multiple production environments" 
caption="Promotions quick start: Product with applications in multiple production environments"
max-width="60%"
%}


## Add parallel environments to Promotion Flow

We'll enhance the Promotion Flow by adding multiple environments to execute promotions in parallel. 

For this example, we’ll add `prod-asia` and `prod-us` as additional production environments to `qa`. 

1. Open the Promotion Flow you created, `multi-env-sequential-promotion` for the quick start.
1. Open the Settings panel:
    * **Name**: Change the name to create a new Promotion Flow, `multi-env-parallel-promotion`.
    * **Version**: Change the version to 1.00.
1. Mouse over the right of the environment node before the final one in the flow and add the new environments.
  For the quick start, we'll add `prod-eu` and `prod-asia` to `qa`.

  {% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-add-envs.png" 
url="/images/quick-start/promotions/quick-start-parallel-add-envs.png"
alt="Promotions quick start: Adding parallel environments in Promotion Flow" 
caption="Promotions quick start: Adding parallel environments in Promotion Flow"
max-width="60%"
%}

{:start="4"}
1. Click **Save Promotion Flow**.


Below are the Chart and YAML views of the Promotion Flow. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-chart-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-chart-view.png"
alt="Promotions quick start: Chart view of Promotion Flow with parallel environments" 
caption="Promotions quick start: Chart view of Promotion Flow with parallel environments"
max-width="60%"
%}



{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-envs-yaml-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-envs-yaml-view.png"
alt="Promotions quick start: YAML view of Promotion Flow with parallel environments" 
caption="Promotions quick start: YAML view of Promotion Flow with parallel environments"
max-width="60%"
%}

{:start="5"}
1. Continue with [Trigger and view product release for parallel environment promotion](#trigger-and-view-product-release-for-parallel-environment-promotion).

## Trigger and view product release for parallel environment promotion

Triggering a Promotion Flow with parallel environments promotes changes simultaneously across all defined parallel environments. 
The release is considered successful only after all environments are promoted successfully.

1. Open the `multi-env-parallel-promotion` Promotion Flow and click **Trigger**.
1. Select the product, the application to promote, and then click **Trigger** once again. 
1. Click **View Release Details**.

The Release view displays the parallel structure of the Promotion Flow, with simultaneous promotions across `prod`, `prod-eu`, and `prod-asia`.



{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-release-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-release-view.png"
alt="Promotions quick start: Release view of Promotion Flow with parallel environments" 
caption="Promotions quick start: Release view of Promotion Flow with parallel environments"
max-width="60%"
%}

## What's next
The final quick start in this series will guide you through creating dependencies between environments to define the order for promotions.

[Quick start: Multi-environment promotion with dependencies]({{site.baseurl}}/docs/gitops-quick-start/promotions/dependency-multi-env-promotion/)

 
 