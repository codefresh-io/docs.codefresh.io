---
title: "Promotion orchestration"
description: "Create flows to orchestrate promotion for products across environments"
group: deployments
toc: true
---




PromotionFlow selection is based on a product selector and a release to an environment.
Products “Billing” is deployed to the first env, “dev”

Define Rollback Logic for Rollouts, when rollout fails and creates a rollback on env us-east, rollback eu and asia as they have the same version. Potentially rollback asia-2 as well
Asia-2 promotion starts depends on multiple envs
define release windows






Configure Promotion Flows


A Promotion Flow is a structured sequence of actions that automates the promotion of changes in products through various environments until deployment. It ensures that code changes are automatically, systematically, and consistently moved, from development to production environments, enhancing the reliability and efficiency of deployments.

Benefits of Promotion Flows
Simplicity 

Automated deployment processes


Simple vs. complex promotion logic

Product-agnostic



4. Applying Promotion Flows
Promotion flows are not tied to any specific product or technology stack, making them versatile tools for managing deployments across various platforms. They can be applied to:
Consistency: Automates repetitive tasks, ensuring uniformity across deployments.
Efficiency: Reduces manual effort and accelerates the deployment process.
Control: Allows precise control over the conditions under which changes are promoted.
Visibility: Provides clear insights into the progress and status of changes across environments.
Contribution to Deployments
Promotion flows streamline the process of moving code changes through different stages, such as testing, staging, and production. By defining specific criteria for promotion, they help maintain the integrity of the software and reduce the likelihood of introducing bugs into production.

## Flow Builder vs. YAML
Similar to most entities, and to all promotion-entities, you can create Promotion Workflows through the Flow Builder, a graphical interface, or through a YAML Custom Resource Definition (CRD). You can switch seamlessly between both when creating Promotion Flows.


## Sequential vs. parallel flows

Promotion flows can be designed to run sequentially or in parallel to suit the unique requirements of any deployment process.

Sequential flows
Sequential flows are linear, where changes are promoted from the previous to the next environment in the order in which they are defined.
This is the more common and traditional flow where you start the flow from the dev environment as the trigger environment, and then promote to testing, staging, and finally production.

Parallel flows
In a parallel flow, changes are promoted across multiple environments simultaneously. This promotion logic groups environments to create promotions after multiple environments are healthy. 




## Promotion Flow components

A Promotion Flow comprises several components, optional and required, each serving a specific role in the deployment process.
Before creating Promotion Flows it is advisable to understand the role of the components and the 

* Trigger Environment (required)
  The trigger environment is where a change initiates the promotion flow. The change in the trigger environment is a manual user commit or pull request action, and not an automated promotion action as in the other environments defined in the Promotion Flow.  
  To automate specific actions after the change, you can configure a trigger workflow (akin to a Post-Action Workflow).

* Promotion Workflows (optional)
  Promotion workflows, categorized as Pre-Action and Post-Action workflows, validate the environment's readiness for promotion:  
  * Pre-Action Workflow: Executes before changes are committed to ensure the environment meets predefined criteria.
  * Post-Action Workflow: Executes after changes are committed to verify the environment's stability and functionality post-deployment.
  While optional, we highly recommend adding these workflows to environments to enhance deployment reliability and consistency.  
  You can select from available Promotion Workflows or create a new Pre- or Post-Action Workflow as needed. 

* Inter-environment dependencies
  In both sequential and parallel flows, adding a new environment automatically establishes a dependency on the previous environment. This ensures that changes are promoted in a controlled manner.

  For parallel flows, you can add multiple environments as simultaneous dependencies on new environments. This means that the changes from the previous environment are promoted concurrently to each of the dependent environments, and only when successfully deployed across all environments are they promoted to the next environment in the flow. 





## Create Promotion Flow with Flow Builder
Visually design and create the flow by selecting environments, promotion workflows, setting trigger conditions, and defining dependencies through the Flow Builder. If needed add new environments and promotion workflows on-the-fly when doing so. 

##### Before you begin
* Review 
* 

##### How to
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Flows**. 
1. Click **Add Promotion Flow**.
1. Select the trigger environment:
  1. Click ?? to see the list of available environments.
  1. Do one of the following:
      * To add an existing environment, select it and click **Add**. Continue from step ??
      * To create a new environment, click **Add New Environment**. 
1. Select the next environment to promote to:
  1. Mouse over the right of the current environment and click ??.
  1. Do one of the following:
      * To add an existing environment, select it and click **Add**. Continue from step ??
      * To create a new environment, click **Add New Environment**.  
        The Create Environment form is displayed. See ???? 
        A notification alerts you that are unsaved changes to the Promotion Flow.   
1. Add Pre- and Post-Action Workflows:
  1. Mouse over the connector between the two environments.
  1. To add a Pre-Action Workflow, click the top ??? icon.
  1. To add a Post-Action Workflow, click the lower ??? icon.
  1. From the list displayed, do one of the following:
      * To add an existing Pre- or Post-Action Workflow, select it and click **Add**. Continue from step ??
      * To add a new Workflow, click **Add New Workflow**. 
        The Add Promotion Workflows form is displayed. See ???? 
        A notification alerts you that are unsaved changes to the Promotion Flow. 
1. If needed, create dependencies on the next environment:
  1. Mouse over the current environment.
  1. From the **Depends on** list, select the environment and click **Update dependency**.
    The environment is added below the existing environment, and a link is added between it and the next environment to indicate a dependency.   
1. Click **Save Promotion Flow** to commit changes.



