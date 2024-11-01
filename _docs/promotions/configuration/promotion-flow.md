---
title: "Creating Promotion Flows"
description: "Orchestrate promotion for products across environment with Create Promotion Flows"
group: promotions
toc: true
---


A promotion flow is a structured sequence of actions that automates the promotion of changes in products through various environments until deployment. It ensures that code changes are automatically, systematically, and consistently moved, from development to production environments, enhancing the reliability and efficiency of deployments.

We have a specialized Promotion Flow entity in Codefresh, dedicated to creating and managing multi-environment promotions! 
Promotion Flows in Codefresh GitOps, backed by the power of Argo CD, streamlines the process of moving code changes through different stages, minus all the manual work of custom scripting to manage environment-specific requirements. 

Set up completely automated promotion flows with just a few clicks and at the same govern how promotions should happen in different environments. 

SCREENSHOT

Review [key insights](#promotion-flow-behavior-key-insights) to understand promotion flow behavior before creating your first Promotion Flow. 



## Flow Builder vs. YAML
You can create Promotion Workflows through the Flow Builder, a graphical interface, or through a YAML Custom Resource Definition (CRD). You can switch seamlessly between both when creating Promotion Flows.

The Flow Builder visually guides you through creating any type of Promotion Flow. See [Create a Promotion Flow](#create-a-promotion-flow).
<!-- For a description of the CRD definition, see TBD  -->


## Sequential vs. parallel promotions

Model your Promotion Flows to suit the unique requirements of any deployment process with sequential or parallel promotions.

* **Sequential promotions**  
  Sequential flows are linear, where changes are promoted from the previous to the next environment in the order in which they are defined.
  This is the more common and traditional kind of Promotion Flow, where you start the flow from a trigger environment, usually the development environment, and then promote to the other target environments in succession.  

* **Parallel promotions**  
  In a parallel flow, changes are promoted across multiple environments simultaneously.   This design is ideal when environments serve distinct purposes or when they can be updated independently without risk to other environments, such as promoting changes to multiple regional clusters that do not have cross-dependencies.
  Parallel promotions are useful in multi-region setups, where you may want to promote changes to several regions before the final production environment. 



 
## Promotion Flow behavior: Key insights
Here are a few useful factors to be aware of when creating Promotion Flows.  


### Trigger and target environments 
You can create and assign environments for the Promotion Flow, starting with the Trigger Environment, where the change to the application initiates the flow, and the other target environments required for promotion. You need at least one target environment for promotions. 


##### Adding environments  
When adding an environment, you can select from the list of available environments, or create a new one that takes you to the Environments page for defining settings.  At this point, the Promotion Flow remains unsaved. A notification alerts you that there are unsaved changes to the Promotion Flow. This notification remains as long as you have unsaved changes in the Promotion Flow. 

##### Removing environments
You can remove an environment from the Promotion Flow, and decide how to reconnect next environments if any, to previous environments.  

Reconnecting environments is only relevant when there are one or more environments in the flow _following_ the one being removed. If the environment you’re removing, for example `staging` is the final environment in the flow, you can remove it directly without needing to reconnect. 

See [Removing environments](#removing-environments-from-promotion-flows).

### Applications in environments

##### Applications in Trigger Environment
It is recommended to have a single application for a product in the Trigger Environment. If the product has multiple applications with changes, changes are promoted only for a single application. <!--- NIMA: which app is selected? the one with the most recent change? 

##### Applications per defined environment
The product must include an application in each environment defined in the Promotion Flow. Otherwise the promotion will fail.

##### Multiple applications in a target environment
If a target environment, such as staging or production, contains multiple applications for the same product, segmented by region, tenant, or other criteria for example, each application in that environment is updated with changes from the source environment. 

While this behavior may seem intuitive, it’s important to understand that each set of Promotion Policy settings that govern the environment's promotion settings, _also applies individually to each application_.

For example, if there are three applications with Pre-Action Workflows, the Pre-Action Workflow will execute three times—once per application.
Execution of steps within the Pre-Action Workflow that create a resource or perform an action are also multiplied accordingly.  
Consider a step within the Pre-Action Workflow which creates a JIRA ticket upon initiating promotion. The step will run thrice, creating three separate JIRA tickets.

##### Deleting/adding files in applications

Adding or deleting files from applications in target environments does not impact the success of the Promotion Flow. The promotion mechanism simply retains the added/deleted files as they are in the target environments.



### Dependencies between environments

A dependency in a Promotion Flow is a direct relationship between two or more environments, where one environment’s promotion depends on the successful promotion of changes in another environment. Changes cannot be promoted to the dependent environment until the preceding one is successfully promoted.

By default, when you create a promotion flow, a dependency is automatically established between the trigger environment and its immediate target environment in a sequential flow. Add dependencies between environments when the success of one environment is essential for the promotion to the next. 

The arrows between the environments in the example below indicate the dependencies between environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/example-sequential-flow.png" 
url="/images/gitops-promotions/promotion-flow/example-sequential-flow.png"
alt="Simple sequential flow with dependencies between each environment" 
caption="Simple sequential flow with dependencies between each environment"
max-width="60%"
%}

Here's an example of a Promotion Flow with multiple dependencies between taregt environments.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/multi-region-dependency.png" 
url="/images/gitops-promotions/promotion-flow/multi-region-dependency.png"
alt="Multiple dependencies between two target environments" 
caption="Multiple dependencies between two target environments"
max-width="60%"
%}


##### Differentiating dependencies from parallel environments
In flows with parallel target environments, promotions to the parallel environments occur simultaneously. Unlike dependencies, each parallel target environment is updated independently of the others. 

In the example below, changes are promoted to `production` as soon as promotion for `staging` has completed successfully, without waiting for `prod-asia` and `prod-us`.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/parallel-vs-dependency.png" 
url="/images/gitops-promotions/promotion-flow/parallel-vs-dependency.png"
alt="Dependencies vs. parallel promotions in target environments" 
caption="Dependencies vs. parallel promotions in target environments"
max-width="60%"
%}




### Inline versus global Promotion Policy settings

For each environment, you can explicitly set the Promotion Policy that defines governs environment promotion behavior through the Promotion Action (required), and the optional Pre- and Post-Action Workflows.

##### Inline Promotion Policy settings
The Flow Builder displays available settings for the Promotion Policy. If you manually select these settings, the _inline_ selections override any global Promotion Policy settings that match the product/environment when the flow is triggered.

##### Global Promotion Policy settings
If no inline settings are defined, the system applies global Promotion Policy settings based on predefined priorities. <!-- See TBD -->

##### Promotion Workflows
Both Pre- and Post-Action Workflows are optional in a Promotion Flow. 

### Previewing Promotion Policies by Product
Instead of waiting for the Promotion Flow to be triggered, you can evaluate Promotion Policy settings for any product. Policy evaluation by product is useful to verify that the environment and product have the desired policies, or identify that there are no matching Policies, or have Policies missing required settings such as the Promotion Action.  

Note that when you evaluate by product, only those settings without inline values are populated.  
Previewing Policy settings does not impact the Promotion Flow when triggered.



## Create a Promotion Flow 
Visually design and create the flow by selecting environments, Promotion Actions, and Workflows, and defining dependencies through the Flow Builder. If needed, create new environments and promotion workflows on-the-fly when doing so. 

##### Before you begin
* Review [Create a promotion sequence]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)


##### How to
1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Flows**. 
1. Click **Add Promotion Flow**.
1. In **Select Trigger Environment**, click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/} to see the list of available environments:
    * Select an existing environment, select it and click **Add**. 
    * To create a new environment, click **Add New Environment**. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/add-trigger-env.png" 
url="/images/gitops-promotions/promotion-flow/add-trigger-env.png"
alt="Add Trigger Environment" 
caption="Add Trigger Environment"
max-width="60%"
%}

{:start="4"}
1. Optional. To add a trigger workflow to validate the trigger environment after the change and commit action, mouse over the left of the environment node, and click {::nomarkdown}<img src="../../../../images/icons/flow-builder-add-workflow.png" display=inline-block>{:/}, and select a Workflow.
    * To apply a trigger workflow from global Promotion Policy settings, click **Account-level Promotion Policy**.  
    * To add a new Promotion Workflow as the trigger workflow, click **Add New Workflow**. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/add-trigger-workflow.png" 
url="/images/gitops-promotions/promotion-flow/add-trigger-workflow.png"
alt="Add Trigger Workflow" 
caption="Add Trigger Workflow"
max-width="60%"
%}

{:start="5"}
1. To add a target environment to promote to, either sequentially or in parallel, mouse over the right of the environment to add to, click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/} and then select the environment or environments.
  The example below shows two environments, `qa` and `staging` as parallel environments to `dev`.
  <!--- To add parallel environments, click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/} on the right of the previous environment. For example, to add `qa` and `staging` as parallel environments to `dev`, you would click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/} on the `dev` environment.  -->

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/add-target-environments.png" 
url="/images/gitops-promotions/promotion-flow/add-target-environments.png"
alt="Add target environments" 
caption="Add target environments"
max-width="60%"
%}

{:start="6"}
1. To add a dependency between environments, from the **Depends on** list in the target environment, select the environment and click **Update Dependency**.
  The environment(s) are added, with the arrows indicating the links between the environments. 
  The Depends on counter shows the total number of dependencies.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/add-dependencies.png" 
url="/images/gitops-promotions/promotion-flow/add-dependencies.png"
alt="Add dependencies to environment" 
caption="Add dependencies to environment"
max-width="60%"
%}


{:start="7"}
1. To select the Promotion Action for the target environment, do the following:
    1. Mouse over the left of the target environment and click {::nomarkdown}<img src="../../../../images/icons/promotion-action.png" display=inline-block>{:/}.
    1. Select an inline action from the list, or to automatically select an action from the global promotion policies, click **Account-level promotion policies**. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/add-promotion-action.png" 
url="/images/gitops-promotions/promotion-flow/add-promotion-action.png"
alt="Add Promotion Action" 
caption="Add Promotion Action"
max-width="60%"
%}

{:start="8"}
1. To add a Pre- or Post-Action Promotion for the target environment, mouse over the left of the target environment and click the respective icons.
    * To add an inline Workflow, select it and click **Add**. 
    * To add a new Workflow, click **Add New Workflow**. 
    * To apply an automated Promotion Policy, click **Account-level Promotion Policy**. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/add-pre-post-action-workflow.png" 
url="/images/gitops-promotions/promotion-flow/add-pre-post-action-workflow.png"
alt="Add Pre-/Post-Action Workflows" 
caption="Add Pre-/Post-Action Workflows"
max-width="60%"
%}

{:start="8"}
1. To commit changes, click **Save Promotion Flow**.
  The Promotion Flow is added to the list of Promotion Flows.





<!--- 

### Step 2: Select Trigger Environment
Every Promotion Flow starts from a Trigger Environment where the change is made that triggers the flow.  
Select a predefined environment, or create a new environment and then return to the Promotion Flow and select the new environment.

.

SCREENSHOT

{:start="2"}
1. Do one of the following:
    * 
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
1. Continue with [Step 8: (Optional) Evaluate global Promotion Policy settings by product](#step-8-optional-evaluate-global-promotion-policy-settings-by-product).    

-->

## Evaluate global Promotion Policy settings by product
Select a product to evaluate the settings that will be applied from global Promotion Policies for all target environments without inline settings. 
Global Promotion Policy settings are applied from all Policies that match the product and the environment, according to priority.




>**NOTE**
This action is only a preview and does not impact the Promotion Flow when triggered.


1. From the list of Products, select the product for which to evaluate or apply Promotion Policy settings.
  The Promotion Action, Pre- and Post-Action Workflows that match are applied from the global Promotion Policies and displayed for each environment. Mouse over the Pre-Action, Post-Action, and Action icons to see the Workflows and the Promotion Action assigned.

SCREENSHOT

{:start="2"}  
1. If you get an error that the component is not defined for the Policy, click the corresponding icon and assign a Workflow or an Action.






## Remove environments from Promotion Flows
Remove one or more environments from a Promotion Flow. <!--- TBD why would you want to remove an environment? What happens if the env is defined as part of the promotion policies?  -->
 
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

<!--- ## Troubleshooting Promotion Flow creation
TBD
-->

## Related articles
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)   
[Tracking product promotions]({{site.baseurl}}/docs/promotions/product-releases/)  
[Promotion sequences]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
