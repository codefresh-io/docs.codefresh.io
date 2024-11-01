---
title: "Promotion sequences"
description: "Step-by-step guide to creating, triggering, and monitoring promotions"
group: promotions
toc: true
---


This high-level guide outlines the essential steps for creating a promotion sequence. Each step includes a brief overview of its purpose and role within the sequence. For detailed instructions, click on the step title.

Complete each step in the order presented.


## Prerequisites
1. [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes)  
   The Configuration Runtime is a GitOps Runtime that stores the manifests of the promotion entities.  
   Designate at least one GitOps Runtime as the Cofiguration Runtime.  
   If no GitOps Runtime has been designated as such, Codefresh assigns one of the existing Runtimes.
 
1. Admin permissions  
  Only account admins can create promotion entities such as Promotion Policies and Promotion Flows.

1. [User permissions]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
  Users need permissions to create Promotion Workflows, configure product settings, and trigger promotions.

## How to: Step-by-step
1. [Create environments]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-environments)  
  Environments define the starting and the end points of promotions.  
  
  For a promotion sequence, you need at least two environments: the trigger environment, which is the source of the changes to promote, and the target environment, to which the changes need to be promoted. 
  
1. [Create applications]({{site.baseurl}}//docs/deployments/gitops/create-application/#create-an-argo-cd-application)  
  Applications represent the components or services to be promoted and deployed, and are the smallest unit of deployment within a promotion sequence. To promote across an application across environments, you need an application for each target environment.  

  Create Argo CD applications in our user interface. For seamless promotions, group related applications within a product to manage them collectively.

1. [Create products]({{site.baseurl}}/docs/products/create-product/)  
  Products connect related applications and group them as a single entity. Applications represent instances of products within each environment. 
  Being able to apply promotion settings at the level of the product, and being able to promote applications belonging to the same product, simplifies promotion management.  
  Create a product and connect related applications to it, either manually or declaratively. 


1. [Create promotion workflows]({{site.baseurl}}/docs/promotions/promotion-workflows/)  
  As part of promoting changes across environments, it's customary to run tests and validations that match the requirements of the target environments in the promotion sequence. For example, create workflows that run smoke tests to verify basic functionality or database validation checks to ensure data integrity.

  Create Promotion Workflows (Argo Workflows) to implement any type of tests, validations, and custom requirements. 

1. [Create policies to govern environment promotions]({{site.baseurl}}/docs/promotions/promotion-policy/)    
 Govern promotion behavior for environments by setting rules, checks, and validations that environments must meet before and after changes are promoted.

  Promotion Policies allow you to define these rules by combining Promotion Workflows and the promotion action based on environment type, product, or other criteria. When a promotion is triggered for an environment, the policy mechanism merges settings from all relevant global policies according to priority, providing automated governance for consistent and reliable promotion behavior.



1. [Create promotion flows to orchestrate promotions]({{site.baseurl}}/docs/promotions/promotion-flow/)  
  Orchestrate the sequence of actions to move and deploy changes through the required environments, from the trigger environment to the final target environment.  
  Promotion Flows ensure that changes are promoted in a controlled and predictable manner by integrating environments, products and applications, promotion workflows, and policies.
  
1. Configure [promotion settings]({{site.baseurl}}/docs/products/configure-product-settings/#configure-promotion-settings) and [flows]({{site.baseurl}}/products/configure-product-settings/#configure-promotion-flows) for product  
  After setting up the core and promotion-specific entities, configure additional promotion-specific settings for your product.  
  These settings include the attributes to be promoted across the product's applications (Product Promotion Templates), the promotion flows valid for the product and flow-specific trigger conditions (Promotion Flows).

1. [Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
  Implement the changes to initiate the promotion.  
  The change made to an application in the trigger environment starts the process of promoting these changes through the defined sequence of environments, either automatically or manually.


1. [Track releases for products]({{site.baseurl}}/docs/promotions/releases/)  
  Monitor the deployment progress for the product as it moves through the promotion sequence.  
  Use the Releases feature to track and ensure successful deployments across environments.


<!--- 1. [Configure properties to be promoted]
  Instead of doing a manual diff and deciding which changes to promote, or promoting entire applications, configure the precise changes to promote, ensuring consistency and reducing errors.  
  Promotion Templates define which files and attributes within those files to promote across the applications in the product.  -->

## Related articles
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
[Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/)  
[Trigger promotions]({{site.baseurl}}docs/promotions/trigger-promotions/)  
[Tracking product promotions]({{site.baseurl}}/docs/promotions/product-releases/)  

