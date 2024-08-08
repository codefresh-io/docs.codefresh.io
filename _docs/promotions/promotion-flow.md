---
title: "Promotion orchestration"
description: "Create flows to orchestrate promotion for products across environments"
group: deployments
toc: true
---


A Promotion Flow is a structured sequence of actions that automates the promotion of changes in products through various environments until deployment. It ensures that code changes are automatically, systematically, and consistently moved, from development to production environments, enhancing the reliability and efficiency of deployments.

Benefits of Promotion Flows
Simplicity 

Automated deployment


Promotion logic





4. Applying Promotion Flows
Promotion flows are not tied to any specific product or technology stack, making them versatile tools for managing deployments across various platforms. They can be applied to:
Consistency: Automates repetitive tasks, ensuring uniformity across deployments.
Efficiency: Reduces manual effort and accelerates the deployment process.
Control: Allows precise control over the conditions under which changes are promoted.
Visibility: Provides clear insights into the progress and status of changes across environments.
Contribution to Deployments
Promotion flows streamline the process of moving code changes through different stages, such as testing, staging, and production. By defining specific criteria for promotion, they help maintain the integrity of the software and reduce the likelihood of introducing bugs into production.

## Flow Builder vs. YAML
You can create Promotion Workflows through the Flow Builder, a graphical interface, or through a YAML Custom Resource Definition (CRD). You can switch seamlessly between both when creating Promotion Flows.Similar to most entities, and all promotion-entities, 


## Sequential vs. parallel flows

Promotion flows can be designed to run sequentially or in parallel to suit the unique requirements of any deployment process.

Sequential flows
Sequential flows are linear, where changes are promoted from the previous to the next environment in the order in which they are defined.
This is the more common and traditional flow where you start the flow from the dev environment as the trigger environment, and then promote to testing, staging, and finally production.

Parallel flows
In a parallel flow, changes are promoted across multiple environments simultaneously. This promotion logic groups environments to create promotions after multiple environments are healthy. 




## Promotion Flow building blocks

A Promotion Flow comprises several building blocks, optional and required, each serving a specific role in the deployment process.
Before creating Promotion Flows it is advisable to understand the role of these building blocks.

* Environments (required)
  
  * Trigger environment
    The trigger environment is where a change initiates the promotion flow. The change in the trigger environment is a manual user commit or pull request action, and not an automated promotion action as in the other environments defined in the Promotion Flow.  
    To automate specific actions after the change, you can configure a trigger workflow (akin to a Post-Action Workflow).
   
   * Target environments
     Any environment apart from the trigger environment are target environments in the promotion flow. A Promotion Flow requires at least one target environment.
     Target environments can linear or parallel.
     

* Promotion Workflows (optional)
  Promotion workflows, categorized as Pre-Action and Post-Action workflows, validate the environment's readiness for promotion:  
  * Pre-Action Workflow: Executes before changes are committed to ensure the target environment meets predefined criteria.
  * Post-Action Workflow: Executes after changes are committed to verify the environment's stability and functionality post-deployment.
  While optional, we highly recommend adding these workflows to environments to enhance deployment reliability and consistency.  
  You can select from available Promotion Workflows or create a new Pre- or Post-Action Workflow as needed. 

* Promotion Action (required)
  The Promotion Action is the action that activates and propagates the changes to the current environment, and can be Commit, Pull Request, or No Action. The Action is generally defined as part of the Promotion Policy. You can also select an action on-the-fly

* Product (optional)
  Instead of manually applying Pre-Action, Post-Action, and Action for each environment, you can select a Product to apply the Promotion Policy defined for it to all environments defined, excluding the trigger environment. 

  The promotion policy defined for the Product dictates the Pre-Action, Post-Action, and Action for each environment. You retain the flexibility to configure parts of the Promotion Policy not defined in the Product.
  This allows you to customize specific steps or workflows as needed, while still leveraging the overall Product policy.
  


Inter-environment dependencies
  In both sequential and parallel flows, adding a new environment automatically establishes a dependency on the previous environment. This ensures that changes are promoted in a controlled manner.

  For parallel flows, you can add multiple environments as simultaneous dependencies on new environments. This means that the changes from the previous environment are first promoted concurrently to each of the dependent environments, and only when successfully deployed across all environments are they promoted to the next environment in the flow. 





## Create Promotion Flow with Flow Builder
Visually design and create the flow by selecting environments, promotion workflows, setting trigger conditions, and defining dependencies through the Flow Builder. If needed add new environments and promotion workflows on-the-fly when doing so. 

### Before you begin
* Review 
* 

### Step 1: Add a Promotion Flow
Add the Promotion Flow to 
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Flows**. 
1. Click **Add Promotion Flow**.

### Step 2: Select Trigger Environment
Evry Promotion Flow starts from a Trigger Environment where the change is first made.  
You can either select a predefined environment or create a new environment and then return to the Promotion Flow and select the environment.


1. Click ?? to see the list of available environments.
1. Do one of the following:
1. To add an existing environment, select it and click **Add**. Continue from step ??
1. To create a new environment, click **Add New Environment**. 
  * You are taken to the Environments page and the Create Environment form is displayed. See ???? 
  * A notification alerts you that are unsaved changes to the Promotion Flow.  
    This notification remains as long as you are unsaved changes and you are in different UI.
1. To return to the Promotion Flow and continue, click **Go to Promotion Flow**.
  You ccan now pick up from where you left off. 
 



### Step 3: Select environment to promote to
Add the environment to promote to from the trigger environment. Again, you can select a predefined environment or create a new environment and then return to the Promotion Flow and select the environment.



1. Mouse over the right of the current environment and click ??.
1. To add an existing environment, select it and click **Add**. Continue from step ??
1. To create a new environment, click **Add New Environment**. 
  * You are taken to the Environments page and the Create Environment form is displayed. See ???? 
  * A notification alerts you that are unsaved changes to the Promotion Flow.  
    This notification remains as long as you have unsaved changes and you are in different UI.
1. To return to the Promotion Flow and continue, click **Go to Promotion Flow**.
  You can now pick up from where you left off. 
1. To 

### Step 4: (Optional) Select a Product to apply Promotion Policy
Select a product to automatically apply its Promotion Policy to all environments defined, excluding the trigger environment.  
This is an alternative to manually applying Pre-Action, Post-Action, and Action for each environment (described in Steps 5 and 6). 

Promotion Policy ???

1. From the list of Products, select the product with the Promotion Policy to apply.
  The Pre-Action, Post-Action, and Action defined for the Policy are assigned to all the environments.
  Mouse over the Pre-Action, Post-Action, and Action icons to see the Workflows and the Promotion Action assigned.

  If the Policy does not match an environment, it will not apply any of the Policy components.
  
1. If any component is not defined for the Policy, click the corresponding icon and assign a Workflow or an Action.


### Step 5: Select Promotion Action        
        
        The  See ???? 
        A notification alerts you that are unsaved changes to the Promotion Flow. 

        Inline not defined = Undefined   

### Step 6: (Optional) Add Pre- and Post-Action Workflows
1. Mouse over the connector on the left between the two environments.
1. To add a Pre-Action Workflow, click the top ??? icon.
1. To add a Post-Action Workflow, click the lower ??? icon.
1. To add an existing Pre- or Post-Action Workflow, select it and click **Add**. Continue from step ??
1. To add a new Workflow, click **Add New Workflow**. 
  * You are taken to the Promotion Workflows page and the Add Promotion Workflows form is displayed. See ???? 
  * A notification alerts you that are unsaved changes to the Promotion Flow.  
    This notification remains as long as you have unsaved changes and you are in different locations in the UI.
1. To return to the Promotion Flow and continue, click **Go to Promotion Flow**.
  You can now pick up from where you left off.         
        




### Step 7: Add additional environments

1. Mouse over the right of the current environment and click ??.
1. To add environments for parallel Flows creating dependencies on the next environment:
  1. Mouse over the current environment.
  1. From the **Depends on** list, select the environment and click **Update dependency**.
    The environment is added below the existing environment, and a link is added between it and the next environment to indicate a dependency.  
1. Repeat step 1 and step 2 as needed.

### Step 8: Save changes and commit flow
1. Click **Save Promotion Flow** to commit changes.





## Manually trigger a Promotion Flow




## Troubleshooting Promotion Flow creation

