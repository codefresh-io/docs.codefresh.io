---
title: "Promotion sequences"
description: "Step-by-step guide to creating, triggering, and monitoring promotions"
group: promotions
toc: true
---


This guide lists the steps required to create a promotion sequence. Each step is followed by a brief description of its purpose and objective in the promotion sequence. For detailed information, click the step title.  

Follow the steps in the order in which they are listed. 


## Prerequisites
1. [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes)  
   The Configuration Runtime is a GitOps Runtime that stores the manifests of the promotion entities.  
   Designate at least one GitOps Runtime as the Cofiguration Runtime.  
   If no GitOps Runtime has been designated as such, Codefresh assigns one of the existing Runtimes.
 
1. Admin permissions  
  Only account admins can create promotion entities such as Promotion Policies and Promotion Flows.

1. [User permissions]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
  Users need the required ABAC permissions to create Promotion Workflows and configure product settings.

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
  As part of promoting changes across environments, it's customary to run tests and validations that match the requirements of the target environments in the promotion sequence. For example, implement smoke tests to verify basic functionality or database validation checks to ensure data integrity.

  Create Promotion Workflows to test different environments and enforce checks before and after promoting changes. 

1. [Create policies for environment validation]({{site.baseurl}}/docs/promotions/promotion-policy/)    
  Define the conditions to validate that the target environments are ready for promotion: workflows to run before and after changes are promoted, along with the action that promotes the changes. Enforcing these conditions ensure that promotions do not break or destabilize environments.  
  Promotion Policies define the products or type of environments with the promotion action (mandatory), and any Promotion Workflows to run before and after the promotion action (optional).


Optionally, define patterns to validate changes within the target environment by establishing conditions that enforce specific promotion workflows. This ensures that the target environments are prepared for promotion. Use Promotion Policies as advanced actions to combine Promotion Workflows with the promotion action, defining these patterns by products or types of environments. This includes the mandatory promotion action and any optional Promotion Workflows that should execute before and after the promotion action. For instance, a policy could dictate that a comprehensive set of regression tests must run in staging environments before deploying to production, thereby enhancing stability and reliability during the promotion process.


  Define patterns to validate the changes within the target environment. Establish conditions that enforce specific promotion workflows, ensuring that the target environments are prepared for promotion.  
  Use Promotion Policies to define patterns by products or types of environments, including the mandatory promotion action and any optional Promotion Workflows that should execute before and after the promotion action. Enforcing these conditions helps maintain stability and reliability during the promotion process.

1. [Create promotion flows to orchestrate promotions]({{site.baseurl}}/docs/promotions/promotion-flow/)  
  Orchestrate the sequence of actions to move and deploy changes through the required environments, from the trigger environment to the final target environment.  
  Promotion Flows ensure that changes are promoted in a controlled and predictable manner by integrating environments, products and applications, promotion workflows, and policies.
  
1. Configure [promotion settings]({{site.baseurl}}/docs/products/configure-product-settings/#configure-promotion-settings) and [flows]({{site.baseurl}}/products/configure-product-settings/#configure-promotion-flows) for product  
  After setting up the core and promotion-specific entities, configure additional promotion-specific settings for your product.  
  These settings include the attributes to be promoted across the product's applications (Product Promotion Templates), the promotion flows valid for the product and flow-specific trigger conditions (Promotion Flows).

1. [Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
  Implement the changes to initiate the promotion.  
  The change made to an application in the trigger environment starts the process of moving these changes through the defined sequence of environments, either automatically or manually.


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

