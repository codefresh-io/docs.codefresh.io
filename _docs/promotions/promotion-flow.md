---
title: "Creating Promotion Flows"
description: "Create Promotion Flows to orchestrate promotion for products across environments"
group: promotions
toc: true
---


A Promotion Flow is a structured sequence of actions that automates the promotion of changes in products through various environments until deployment. It ensures that code changes are automatically, systematically, and consistently moved, from development to production environments, enhancing the reliability and efficiency of deployments.


Promotion Flows streamline the process of moving code changes through different stages, such as testing, staging, and production. They automate repetitive tasks, reducing manual efforts, ensuring uniformity across deployments.  
By defining specific criteria for promotion, they help maintain the integrity of the software and reduce the likelihood of introducing bugs into production.
Our Flow Builder visually guides you through creating any type of Promotion Flow. See [Create a Promotion Flow](#create-a-promotion-flow).
As with other entities, you can toggle between YAML and chart modes while in the Flow Builder.


Before creating promotion flows, review [our notes on Promotion Flows](#notes-on-promotion-flows) which highlights key factors to be aware of in promotion flow behavior. 




## Flow Builder vs. YAML
You can create Promotion Workflows through the Flow Builder, a graphical interface, or through a YAML Custom Resource Definition (CRD). You can switch seamlessly between both when creating Promotion Flows.
The Flow Builder visually guides you through creating any type of Promotion Flow. See [Create a Promotion Flow](#create-a-promotion-flow).


## Sequential vs. parallel promotions

Promotion Flows can be designed to run sequentially or in parallel to suit the unique requirements of any deployment process.

Sequential flows
Sequential flows are linear, where changes are promoted from the previous to the next environment in the order in which they are defined.
This is the more common and traditional kind of Promotion Flow where you start the flow from the development environment as the trigger environment, and then promote to the testing, staging, and finally to the production environments.

Parallel flows
In a parallel flow, changes are promoted across multiple environments simultaneously. This promotion logic groups environments to create promotions after multiple environments are healthy. 

## Notes on Promotion Flows 
Here are a few key factors to be aware of when creating Promotion Flows.  






### Trigger and target environments 
You can create and assign environments for the Promotion Flow, starting with the Trigger Environment, where the change initiates the flow, and the other target environments required for promotion. You need at least one target environment for promotions. 

* Adding environments  
  When adding an environment, you can select from the list of available environments, or create a new one that takes you to the Environments page for defining settings.  At this point, the Promotion Flow remains unsaved, allowing to return to the flow later.

* Removing environments
  You can remove an environment from the Promotion Flow, and decide how to reconnect next environments to previous environments.  

  Reconnecting environments is only relevant when there is one or more environments in the flow _following_ the one being removed. If the environment you’re removing, for example `staging` is the final environment in the flow, you can remove it directly without needing to reconnect.

### ## Dependencies

### Inline versus global Promotion Policy settings

For each environment, you can explicitly set the Promotion Policy, including the Promotion Action (required), and the optional Pre- and Post-Action Workflows.

##### Inline Promotion Policy settings
The Flow Builder displays available settings for the Promotion Policy. If you manually select these settings, this _inline_ selection overides any automated Promotion Policy settings that match the product/environment when the flow is triggered.

##### Global Promotion Policy settings
If no inline settings are defined, the system applies automated Promotion Policy settings based on predefined priorities. See TBD

## Previewing Promotion Policies by Product
Instead of waiting for the Promotion Flow to be triggered, you can preview Promotion Policy settings for any product to ensure that the environment and product have the desired policies.  
Previewing Policies by product confirms if the automated Policies that will be applied for the product are the correct ones for it. Preview is also useful to identify  environments and products without matching Policies or Policies that are missing required settings such as the Promotion Action.  
Note that only those settings without inline values are populated by the preview.

## Create a Promotion Flow 
Visually design and create the flow by selecting environments, Promotion Actions and Workflows, and defining dependencies through the Flow Builder. If needed create new environments and promotion workflows on-the-fly when doing so. 

### Before you begin
* Review [Create a promotion sequence]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)


### Step 1: Add a Promotion Flow
Open the Flow Builder to add a Promotion Flow.
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Flows**. 
1. Click **Add Promotion Flow**.

SCREENSHOT

{:start="3"}
1. Continue with [Step 2: Select Trigger Environment](#step-2-select-trigger-environment).



### Step 2: Select Trigger Environment
Every Promotion Flow starts from a Trigger Environment where the change is made that triggers the flow.  
Select a predefined environment, or create a new environment and then return to the Promotion Flow and select the new environment.


1. Click ?? in **Select Trigger Environment** to see the list of available environments.

SCREENSHOT

{:start="2"}
1. Do one of the following:
    * To add an existing environment, select it and click **Add**. Continue from step ??
    * To create a new environment, click **Add New Environment**. 
        * You are taken to the Environments page and the Create Environment form is displayed. See ???? 
        * A notification alerts you that there are unsaved changes to the Promotion Flow.  
          This notification remains as long as you have unsaved changes in the Promotion Flow.
1. If needed, to return to the Promotion Flow and continue, click **Go to Promotion Flow**.
  You can now pick up from where you left off. 
1. Continue with [Step 3: (Optional) Add Trigger Workflow to Trigger Environment](#step-3-optional-add-post-action-workflow-to-trigger-environment).


### Step 3: (Optional) Add Trigger Workflow to Trigger Environment
If required, add a Trigger Workflow to validate the readiness of the trigger environment after the change and commit action.
TBD purpose of doing it

1. Click {::nomarkdown}<img src="../../../../images/icons/flow-builder-add-workflow.png" display=inline-block>{:/}.

SCREENSHOT

{:start="2"}
1. Do one of the following: 
    * To review the manifest of an inline Trigger Workflow, click ??? and then select the required workflow. Continue from _step 2_.
    * To apply a Trigger Workflow from global Promotion Policy settings, click **Automated Promotion Policy**.  Continue from _step 2_.
    * To add a new Promotion Workflow, click **Add New Workflow**. 
        * You are taken to the Add Promotion Workflow page where you can define the settings. See TBD???? 
        * A notification alerts you that there are unsaved changes to the Promotion Flow.  
          This notification remains as long as you have unsaved changes in the Promotion Flow.
1. If needed, to return to the Promotion Flow and continue, click **Go to Promotion Flow**.
1. Continue with [Step 4: Add target environment to promote to](#step-4-add-target-environment-to-promote-to).


### Step 4: Add target environment to promote to
Add the environment to promote to from the trigger environment. You can add as many target environments as you need.  
Again, you can select a predefined environment or create a new environment and then return to the Promotion Flow and select the new environment.



1. Mouse over the right of the current environment and click ??.

SCREENSHOT

{:start="2"}
1. To add an existing environment, select it and click **Add**. Continue from _step 3_.
1. To create a new environment, click **Add New Environment**. 
  * You are taken to the Create Environment page where you can define the settings. See TBD???? 
  * A notification alerts you that are unsaved changes to the Promotion Flow.  
    This notification remains as long as you have unsaved changes in the Promotion Flow.
1. To return to the Promotion Flow and continue, click **Go to Promotion Flow**. 
1. To add more target environments, repeat _step 1_ through _step 3_.
1. Continue with [Step 5: (Optional) Add dependencies to target environment](#step-5-optional-add-dependencies-to-target-environment).

### Step 5: (Optional) Add dependencies to target environment
Promote changes from the previous environment concurrently to multiple environments by adding dependencies to the current target environment. When there are dependent environments, changes are promoted to the next environment in the flow only after they are successfully deployed across all dependent environments. 

1. Mouse over the target environment.
1. From the **Depends on** list, select the environment and click **Update Dependency**.
  The environment is added below the existing environment, and a link is added between it and the next environment to indicate a dependency.  

  SCREENSHOT

{:start="3"}
1. Repeat _step 2_ as needed to add other environments as dependencies.
1. Continue with [Step 6: Select Promotion Action for target environment](#step-6-select-promotion-action-for-target-environment).

### Step 6: Select Promotion Action for target environment       

Select the Promotion Action to use for the target environment, either manually from the inline settings, or through automated Promotion Policies. 
An inline Promotion Action when selected overrides the Promotion Actions in automated Promotion Policies that may match the product and the environment. If the system identifies that no inline Action is selected, and none of the matched Promotion Policies have an Action, it pops up an error message.   

{{site.data.callout.callout_tip}}
**TIP**  
If you define the Promotion Action through automated Promotion Policies, you can preview the Promotion Action that will be applied for a Product.  
See [Step 8: (Optional) Preview automated Promotion Policy settings by product](#step-8-optional-preview-automated-promotion-policy-settings-by-product).
{{site.data.callout.end}}


1. Mouse over the left of the target environment and click ??.

SCREENSHOT

{:start="2"}
1. To define an inline Promotion Action, select one from the list.
1. To define an Action from automated Promotion Policies, click **Automated Promotion Policies**. 
1. Continue with [Step 7: (Optional) Add Pre- and Post-Action Workflows for target environment](#step-7-optional-add-pre--and-post-action-workflows-for-target-environment).




### Step 7: (Optional) Add Pre- and Post-Action Workflows for target environment
Add Pre- or Post-Action Workflows to the target environment.  
Either manually select an inline Workflow for the Promotion Flow, or leave it to the Automated Promotion Policy to apply and execute the appropriate Workflow.

1. Mouse over the left of the target environment.
1. Do one of the following:
  * To add a Pre-Action Workflow, click the top ??? icon.
  * To add a Post-Action Workflow, click the lower ??? icon.

SCREENSHOT

{:start="3"}
1. Define the Pre-/Post-Action Workflow:
  * To add an inline Workflow, select it and click **Add**. Continue from step ??
  * To add a new Workflow, click **Add New Workflow**. 
      * You are taken to the Add Promotion Workflow page where you can define the settings. See ???? 
      * A notification alerts you that are unsaved changes to the Promotion Flow.  
        This notification remains as long as you have unsaved changes in the Flow.
  * To apply an automated Promotion Policy, click Automated Promotion Policy. 
1. To return to the Promotion Flow and continue, click **Go to Promotion Flow**.
  You can now pick up from where you left off.         
1. Continue with [Step 8: (Optional) Preview automated Promotion Policy settings by product](#step-8-optional-preview-automated-promotion-policy-settings-by-product).    










### Step 8: (Optional) Preview automated Promotion Policy settings by product
Select a product to preview settings that will be applied from automated Promotion Policies for all target environments without inline settings. 

When there are no inline settings selected or defined for an environment's Promition Polocy, the system applies settings from all predefined or automated Promotion Policies that match the product and the environment according to priority.

Preview by product within a Promotion Flow shows you if there is a Promotion Policy that matches the product, and which settings will be applied.



>**NOTE**
This action is only a preview and does not impact the Promotion Flow.


1. From the list of Products, select the product for which to evaluate or apply Promotion Policy settings.
  The Promotion Action, Pre- and Post-Action Workflows that match are applied from the predefined or automated promotion policies and displayed for each environment. Mouse over the Pre-Action, Post-Action, and Action icons to see the Workflows and the Promotion Action assigned.

SCREENSHOT
  
1. If you get an error component is not defined for the Policy, click the corresponding icon and assign a Workflow or an Action.


### Step 9: Save changes and commit flow
As the final action in creating a Promotion Flow, save the settings and commit the changes.
TBD where are teh changes saved?

1. Click **Save Promotion Flow** to commit changes.



## Removing environments from Promotion Flows
Remove one or more environments from a Promotion Flow. TBD why would you want to remove an environment? What happens if the env is defined as part of the promotion policies?
 
Removing an environment requires you to reconnect environments linked to the one being removed to prevent orhpans. 

Reconnecting environments is only relevant when there are one or more environments in the flow _following_ the one being removed. If the environment you’re removing, for example `staging` is the final environment in the flow, you can remove it directly without needing to reconnect.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Flows**. 
1. Select the Promotion Flow with the environment you want to remove.
1. Mouse over the environment node and then click {::nomarkdown}<img src="../../../../images/icons/delete-red.png" display=inline-block>{:/}.
  If the environment is linked to another one, you are prompted to select the reconnect behavior.  

SCREENSHOT

1. Do one of the following:
    * If you have environments in the flow linked to the environment you are removing, from the **Reconnect next environments to** list, select a preceding environment to reconnect to.  
      For example, consider a promotion flow with `dev`, `qa`, `staging`, and `prod` environments in that order. When removing the `qa` environment which is linked to `staging`, you need to reconnect `staging` to the preceding environment, `dev` in our example.

    SCREENSHOT
        
    * To remove all connected environments, select **Remove all connected environments**.
      This action removes all environments linked to and succeeding `qa`, which are `staging` and `prod` in our example. 
    
     SCREENSHOT

## Troubleshooting Promotion Flow creation
TBD

## Related articles
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Promotions overview]({{site.baseurl}}/docs/promotions/promotion-components/)  
