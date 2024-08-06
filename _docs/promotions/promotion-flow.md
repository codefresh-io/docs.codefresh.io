---
title: "Promotion orchestration"
description: "Create flows to orchestrate promotion for products across environments"
group: deployments
toc: true
---




PromotionFlow selection is based on a product selector and a release to an environment.
Products “Billing” is deployed to the first env, “dev”
Allow grouping of environments in order to create complex logic of promotion after multiple environments are healthy
Define Rollback Logic for Rollouts, when rollout fails and creates a rollback on env us-east, rollback eu and asia as they have the same version. Potentially rollback asia-2 as well
Asia-2 promotion starts depends on multiple envs
define release windows






Configure Promotion Flows


A Promotion Flow is a structured sequence of actions that automates the promotion of changes in products through various stages of development and deployment. It ensures that code changes are automatically, systematically, and consistently moved, from development to production environments, enhancing the reliability and efficiency of deployments.

Benefits of Promotion Flows
Consistency: Automates repetitive tasks, ensuring uniformity across deployments.
Efficiency: Reduces manual effort and accelerates the deployment process.
Control: Allows precise control over the conditions under which changes are promoted.
Visibility: Provides clear insights into the progress and status of changes across environments.
Contribution to Deployments
Promotion flows streamline the process of moving code changes through different stages, such as testing, staging, and production. By defining specific criteria for promotion, they help maintain the integrity of the software and reduce the likelihood of introducing bugs into production.

## Promotion Flow configuration
Similar to most entities, and to all promotion-entities, Promotion Workflows through the Flow Builder, a graphical interface, or through a YAML Custom Resource Definition (CRD).

### Flow Builder 
The Flow Builder provides an intuitive interface for creating and managing promotion flows. 
You can visually design the flow by selecting environments, promotion workflows, setting trigger conditions, and defining dependencies. And even add environments and promotion workflows on-the-fly when doing so. 


YAML Custom Resource Definition (CRD)
 a more technical approach, promotion flows can be defined using YAML CRD. This method allows for precise control and customization of the flow by editing a YAML file that describes the flow's actions, triggers, and dependencies.







Types of Flows

 Parallel and Sequential
Promotion flows can be designed to run actions in parallel or sequentially, depending on the desired workflow and dependencies.

a. Parallel Flows
In a Parallel Flow, multiple actions are executed simultaneously. This approach is useful when actions are independent of each other and can run concurrently, thereby reducing the overall time required for promotion.

Example Use Case: Running tests and building a container image at the same time.
b. Sequential Flows
A Sequential Flow involves executing actions in a specific order. This is essential when actions have dependencies or need to be completed before the next action can begin.

Example Use Case: Running a build process, followed by testing, and then deploying to a staging environment.
4. Applying Promotion Flows
Promotion flows are not tied to any specific product or technology stack, making them versatile tools for managing deployments across various platforms. They can be applied to:

Continuous Integration/Continuous Deployment (CI/CD) Pipelines: Automating the movement of code changes through different pipeline stages.
Release Management: Ensuring that releases are properly validated and approved before reaching production.
Environment Management: Controlling the promotion of changes across development, staging, and production environments.
Promotion flows can be customized to suit the unique requirements of any deployment process, providing a powerful way to automate and manage the lifecycle of software changes.

## Promotion Flow components

Promotion flows consist of several components, each serving a specific role in the deployment process.
Before creating Promotion Flows

Trigger Environment (Required)
The trigger environment is where a change initiates the promotion flow. The change in the trigger environment is a manual user commit or pull request actio, and not an automated promotion action as in other environments.  
You can configure a trigger workflow (akin to a Post-Action Workflow) to automate specific actions.

Promotion Workflows (Optional)
Promotion workflows, categorized as Pre-Action and Post-Action workflows, validate the environment's readiness for promotion:
* Pre-Action Workflow: Executes before committing changes to ensure the environment meets predefined criteria.
* Post-Action Workflow: Executes after committing changes to verify the environment's stability and functionality post-deployment.
While optional, it is highly recommended to add these workflows to environments and enhance deployment reliability and consistency.

Inter-Environment Dependencies
In both sequential and parallel promotion flows, adding a new environment automatically establishes a dependency on the previous environment. This ensures changes progress through stages in a controlled manner.

For parallel flows, you can add multiple environments as dependencies simultaneously. This means that the changes are promoted conncurrently to each of the environments and only when successfully deployed across all dependent environments are they promoted to the next environment in the flow. 





## Create Promotion Flow with Flow Builder


1. 1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Flows**. 
1. Click **Add Promotion Flow**.
1. Select the trigger environment:
  1. Click ?? to see the list of available environments.
  1. Do one of the following:
      * To add an existing environment, select it and click **Add**. Continue from step ??
      * To create a new environment, click **Add New Environment**. To
1. Select the next environment to promote to:
  1. Mouse over the right of the current environment and click ??.
  1. Repeat step 3 to add an existing or a new environment.    
1. Add Pre- and Post-Action Workflows:
  1. Mouse over the connector between the two environments.
  1. To add a Pre-Action Workflow, click the top ??? icon.
  1. To add a Post-Action Workflow, click the lower ??? icon.
  1. From the list displayed, do one of the following:
      * To add an existing Pre- or Post-Action Workflow, select it and click **Add**. Continue from step ??
      * To add a new Workflow, click **Add New Workflow**. To
1. Add inter-environment dependencies: 
