---
title: "Promotions: Setup & configuration guidelines"
description: "High-level tasks for creating, triggering, and monitoring promotions"
group: promotions
toc: true
---

This article outlines the tasks required to configure, activate, and monitor GitOps promotions in Codefresh.

Promotions are a critical part of continuous delivery, enabling you to move changes through environments while meeting deployment and compliance requirements. A successful promotion sequence depends on key components that govern and orchestrate the promotion flow across environments. To review these components, see [Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/).

The sections in this article outline the tasks to set up and manage promotions tailored to your specific deployment requirements.


<!--- For step-by-step walkthroughs, review and follow along with our quick starts. -->


<!--- This guide covers the end-to-end flow of creating a promotion sequence, from initial setup to execution. Promotion sequences in Codefresh provide a structured way to move changes through different environments, integrating checks and policies to ensure stability, compliance, and predictable deployments.

A successful promotion sequence relies on several key components that together govern and orchestrate the promotion flow across environments. In the sections that follow, you’ll configure each of these components step-by-step, tailoring them to your specific deployment and compliance needs.

## From basic to complex promotions
The promotion process begins with foundational elements that enable simple deployments and gradually evolves into more complex flows, as additional requirements arise. Here’s how you move from basic to advanced promotion sequences:

Applications, Products, and Environments: These are core deployment entities, required for all types of promotions. Products allow you to group and configure related applications, and environments define where changes to these applications are promoted.  
These entities allow for quick drag-and-drop promotions across two environments and an option to select the target to promote to. 

Promotion Flow: Once the basics are in place, you can establish orchestration in your promotion sequence. Promotion Flow allows you to define how changes move through multiple environments, to accommodate more complex, multi-environment deployment strategies.

Promotion Workflows: Introducing Argo Workflows adds validations and checks ensures that each environment in the sequence meets your standards and is ready for changes, transitioning from basic deployments to rigorous testing and verification processes.

Promotion Policies: With a structured promotion flow and workflows established, you can implement policies that define rules for your promotions. These can range from global to environment-specific policies, ensuring that promotions comply with operational requirements and maintain consistency across environments and products.

Promotion Templates: Finally, Promotion Templates serve to further streamline your processes by allowing you to define precisely the changes  Templates simplify the configuration of promotion attributes for product groups, allowing you to quickly adapt standard settings to multiple products without redundant configuration.
enhance consistency, create reusable templates that apply across products. 

-->





### Prerequisites
1. [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes)  
   The Configuration Runtime is a GitOps Runtime that stores the manifests of the promotion entities.  
   Designate at least one GitOps Runtime as the Configuration Runtime.  
   If no GitOps Runtime has been designated as such, Codefresh assigns one of the existing Runtimes.
 
1. Admin permissions  
  Only account admins can create promotion entities such as Promotion Policies and Promotion Flows.

1. [User permissions]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
  Users need permissions to create Promotion Workflows, configure product settings, and trigger promotions.

### Tasks
1. [Create environments]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-environments)  
  Environments define the starting and the end points of promotions.  
  For a promotion sequence, you need at least two environments: the trigger environment, which is the source of the changes to promote, and the target environment, to which the changes need to be promoted. 
  
1. [Create applications]({{site.baseurl}}/docs/deployments/gitops/create-application/#create-an-argo-cd-application)  
  Applications represent the components or services to be promoted and deployed, and are the smallest unit of deployment within a promotion sequence. To promote across an application across environments, you need an application for each target environment.  
  Create Argo CD applications in our user interface. For seamless promotions, group related applications within a product to manage them collectively.

1. [Create products]({{site.baseurl}}/docs/products/create-product/)  
  Products connect related applications and group them as a single entity. Applications represent instances of products within each environment. 
  Being able to apply promotion settings at the level of the product, and being able to promote applications belonging to the same product, simplifies promotion management.  
  Create a product and connect related applications to it, either manually or declaratively. 


1. [Create promotion workflows]({{site.baseurl}}/docs/promotions/configuration/promotion-workflow/)  
  As part of promoting changes across environments, it's customary to run tests and validations that match the requirements of the target environments in the promotion sequence. For example, create workflows that run smoke tests to verify basic functionality or database validation checks to ensure data integrity.
  Create Promotion Workflows (Argo Workflows) to implement any type of tests, validations, and custom requirements. 

1. [Create policies to govern environment promotions]({{site.baseurl}}/docs/promotions/configuration/promotion-policy/)    
  Govern promotion behavior for environments by setting rules, checks, and validations that environments must meet before and after changes are promoted.
  Promotion Policies allow you to define these rules by combining Promotion Workflows and the promotion action based on environment type, product, or other criteria. When a promotion is triggered for an environment, the policy mechanism merges settings from all relevant global policies according to priority, providing automated governance for consistent and reliable promotion behavior.

1. [Create promotion flows to orchestrate promotions]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/)  
  Orchestrate the sequence of actions to move and deploy changes through the required environments, from the trigger environment to the final target environment.  
  Promotion Flows ensure that changes are promoted in a controlled and predictable manner by integrating environments, products and applications, promotion workflows, and policies.
  
1. Configure [promotion settings]({{site.baseurl}}/docs/products/configure-product-settings/#configure-promotion-settings) and [flows]({{site.baseurl}}/docs/products/configure-product-settings/#configure-promotion-flows) for product  
  After setting up the core and promotion-specific entities, configure additional promotion-specific settings for your product.  
  These settings include the attributes to be promoted across the product's applications (Product Promotion Templates), the promotion flows valid for the product and flow-specific trigger conditions (Promotion Flows).

1. [Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
  Trigger the promotion, either manually or automatically.  
  
1. [Track releases for products]({{site.baseurl}}/docs/promotions/releases/)  
  Monitor the deployment progress for the product as it moves through the promotion sequence.  
  Use the Releases feature to track and ensure successful deployments across environments.


<!--- 1. [Configure properties to be promoted]
  Instead of doing a manual diff and deciding which changes to promote, or promoting entire applications, configure the precise changes to promote, ensuring consistency and reducing errors.  
  Promotion Templates define which files and attributes within those files to promote across the applications in the product.  -->

## Related articles
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
[Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/)  
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  

