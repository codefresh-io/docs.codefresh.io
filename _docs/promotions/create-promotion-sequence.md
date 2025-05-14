---
title: "Promotions: Setup & configuration guidelines"
description: "High-level tasks for creating, triggering, and monitoring promotions"
group: promotions
toc: true
---

## Promotion setup guidelines
This article outlines the tasks required to configure, trigger, and monitor promotions in Codefresh GitOps.

Promotions are a critical part of continuous delivery, enabling you to move changes through environments while meeting deployment and compliance requirements. A successful promotion sequence depends on key components that define and orchestrate the promotion flow. To review these components, see [Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/).

For details on current limitations when working with promotions, see [Promotion limitations]({{site.baseurl}}/docs/promotions/promotion-limitations/).

## Prerequisites
1. [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/)  
   The Configuration Runtime is a GitOps Runtime that stores configuration for GitOps promotion entities.  
    * Designate at least one GitOps Runtime as the Configuration Runtime.  
    * If no GitOps Runtime has been designated as such, Codefresh assigns one of the existing Runtimes.
 
1. **Admin permissions**  
  Only account admins can create promotion-specific entities such as Promotion Policies and Promotion Flows.

1. [User permissions]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
  Users need permissions to create Promotion Workflows, configure promotion settings for products, and trigger promotions.


## Setup tasks
1. [Create environments]({{site.baseurl}}/docs/environments/create-manage-environments/#create-environments)  
  Environments define the starting point and destination of promotions.   
  A promotion requires at least two environments:
    * Trigger Environment, the source of the changes being promoted
    * Target environment, to which to promote the changes
  
1. [Create applications]({{site.baseurl}}/docs/deployments/gitops/create-application/#create-an-argo-cd-application)  
  Applications represent the components or services to be promoted and deployed.   
  To promote across an application across environments:  
    * Create an instance of the application for each target environment 
    * Group related applications within a product to manage them collectively

1. [Create products]({{site.baseurl}}/docs/products/create-product/)  
  Products group related applications into a single entity.
    * Connect related applications manually or declaratively
    * Promote all applications collectively instead of promoting each individually

1. [Create Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/)  
  Promotion Workflows (Argo Workflows) automate environment-specific tests and validations before and after promotion.
    * Create Promotion Workflows to run smoke tests, database validation, and any other requirements to verify readiness of each application in an environment.

1. [Create Promotion Workflows with hooks]({{site.baseurl}}/docs/promotions/promotion-hooks/)
  Promotion hooks provide promotion status and custom information for releases and environments during the Promotion Flow.
    * Create hooks in Promotion Workflows to implement actions such as Slack notifications
    * Define and export promotion contexts in hooks to expose and pass custom parameters such as Jira ID 


1. [Define Promotion Policies]({{site.baseurl}}/docs/promotions/promotion-policy/)    
  Promotion Policies govern promotion behavior for environments enforcing rules, checks, and validations.
    * Define policies that combine Promotion Workflows with promotion actions such as commits, pull requests
    * The policy mechanism merges relevant settings from global policies according to priority, enforcing automated governance


1. [Create Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
  Promotion Flows orchestrate the sequence of actions required to move and deploy changes through multiple environments.    
    * Automatically integrate environments, products, Promotion Workflows, and Promotion Policies into a structured promotion process
    * Assign promotion hooks to track release and environment statuses for product releases
    * Reuse Promotion Flows across products for consistent and reliable promotions


  
1. [Customize promotions for products]({{site.baseurl}}/docs/promotions/product-promotion-props/) 
  After setting up promotion entities, configure additional promotion settings at the product level.  
    * Promotion Templates to define attributes to be promoted across the product's applications
    * Promotion Flows valid for the product and trigger conditions for each flow

## Trigger and monitor promotions

1. [Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
  Trigger the promotion manually or automatically.  


1. [Monitor promotion releases for products]({{site.baseurl}}/docs/promotions/product-releases/)  
  Monitor deployment progress as applications move through the promotion sequence.   
  * Use the Releases feature for products to monitor deployments


## Related articles
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
[Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  

