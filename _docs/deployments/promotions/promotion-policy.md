---
title: "Environment readiness validation for promotions"
description: "Run validations through Promotion Policies to assess environment compliance before ochestrating promotion"
group: promotions
toc: true
---




When a promotion is triggered for a Product in an Environment, before deploying changes and promoting the Product in that environment, it is customary to validate the environment's readiness for the promotion.
Readiness validation confirms that the Product's applications and their dependencies meet the necessary requirements and standards for deployment in the target environment. These validations encompass various checks, including code quality, unit or smoke tests, compatibility with dependencies, security compliance, and other relevant factors specific to the target environment.

##### Promotion Policies for readiness validation
Codefresh empowers you to create validations and automate executions through Promotion Policies for any combination of Products and Environments. You can create dedicated Promotion Policies, or you can define a Promotion Policy as part of a Promotion Flow which orchestrates the promotion and deployment of the Product across all the Environments.

DIAGRAM




* **Automated validation**   
  Validations defined in the Promotion Policy are enforced automatically, minimizing the risk of errors, and ensuring consistency and reliability in deployments.

* **Flexible configuration**  
  Promotion Policies are highly customizable to match your requirements. Define Policies per Product and per Environment, or with broader coverage for a specific Product across multiple Environments, or for different Products for a specific kind of Environment. 

## Features of Promotion Policies


On-demand evaluation
Select any Product-Environment pair to see which Promotion Policy is applied to the combination. If Codefresh does not find a Promotion Policy, you can create one. If there is a Promotion Policy, YEither optimize the Policy or redefine its priority in the Policy list.

Priority-driven enforcement
In cases where multiple Promotion Policies match the same Product or Environment, Codefresh applies the Policy with the highest predefined priority, ensuring seamless enforcement.

Versatile promotion actions
Whether your promotion actions are Git-based or utilize custom repositories and mechanisms for compiling application repositories, Codefresh accommodates both types of actions .

##### How do you define Promotion Policies?

You define a Promotion Policy by configuring the Promotion Action and the Promotion Workflows to run for it.
 


* Promotion Action
  The Promotion Action is the action that triggers the promotion in the target environment which is being validated by the Promotion Policy. It is typically a Git action in the application's source repository. Codefresh also permits a no-action Policy for organizations which utilize custom compilation or build mechanisms.

* Promotion Workflows
  The Promotion Workflow is an Argo Workflow executed before or after the Promotion Action.
  When executed before the Promotion Action, it is the Pre-Action Workflow, and when executed after, it the Post-Action Workflow.  
  Technically both are optional, but we highly recommend including both stages depending on the kind of environment you are validating.  

* Products and Environments
  The final component are the Products and Environments the Promotion Policy applies to.

See ???



## How or where does the Promotion Policy fit in the Promotion Flow?


Promotion Policies are run:
Upon manually promoting the Product from the trigger Environment to the destination Environment.
OR
Upon updating the Git repository with the application manifest.













### How does the Promotion Policy work?

In the Trigger Environment, a the Promotion Action is manual When a promotion is triggered in an environment and Codefresh identifies a Promotion Lifecycle for the tarhet environment, 

In the 
1. Identifies the Promotion Policy to apply

1. If defined, runs the Pre-Action Promotion Workflow 

If successful, 
If failed

1. Applies the Promotion Action 


1. If defined, runs the Post-Action Workflow 



When there is 





## Promotion Policy settings

The table below describes the settings you can define for a Promotion Policy.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Name**       | The name of the Promotion Policy.<br>The name must be unique in the cluster, and must match Kubernetes naming conventions. |
|**Policy Settings**       | The settings that comprise the Promotion Policy.<br>{::nomarkdown}  <ul><li><b>Pre-Action Workflow</b>Optional. The Promotion Workflow to run before the Promotion Action. </li>.<li><b>Action</b>Required. The Promotion Action to update the target application's source repository.<ul><li><b>Commit</b>: Perform a Git commit on the source repository. Commits are implemented immediately without not requiring manual approval to move to the next stage of the Promotion Policy.</li><li><b>Pull Request</b>: Open a pull request (PR) on the change to the source repository. Depending on your PR policy, this option may require manual approval.</li><li><b>No Action</b>: Run the selected Pre- and Post- Promotion Workflows without performing a commit or opening a pull request.<br>Selecting this option requires a Pre- or a Post-Action Workflow to be selected that includes an action to promote the target application.<br>This option is useful to run custom promotion policy mechanisms, not involving updating the target application's source repository to promote the application.<br></li></ul>{:/}|
|**Products** |Single or multiple Products to which to apply the Promotion Policy.<ul><li><b>Product</b>: Match Products by the name or names defined. </li><li><b>Tags</b>: Match Products by the tag or tags defined.</li></ul>{:/}|
|**Environments** |Single or multiple Environments to which to apply the Promotion Policy.<ul><li><b>Kind</b>: Match Environments by their type, either <b>Pre-production</b> or <b>Production</b>.</li><li><b> Environment</b>: Match Environments by the name or names defined.</li><li><b>Tags</b>: Match Environments by the tag or tags defined. </li></ul>{:/}|


## Create a Promotion Policy

##### Before you begin

* Create Promotion Workflows

##### How to
Create a Promotion Policy to validate an environment's readiness before promoting and deploying changes to a Product.  


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Promotions in the sidebar, select [Promotion Policies](https://g.codefresh.io/2.0/?????){:target="\_blank"}.
1. Do one of the following:
  * To create your first Promotion Policy, click **Add Policy**.
  * If you have already Promotion Policies, click **Add** at the bottom of the list.
1. Select the mode in which to define the Promotion Policy as **YAML** or **Form**.  
  You can toggle between the modes as you define the Promotion Policy.
1. Define the **Policy Settings**, as described in XREF:   
1. Define how and which **Products** to select for this Promotion Policy.
1. Define how and which **Environments** to select for this Promotion Policy.
1. Commit the changes.


* The Promotion Policy is added to the Promotion List. (NIMA: is the newest policy displayed first by default??)
* If there are multiple Promotion Policies that match the same Product or Environments, the order in which the Policies are listed determines which Promotion Policy is applied. 
The priority is in descending order. 
* The Evaluate Promotion Policy feature allows you to select any Product and Environment pair and identify the Promotion Policy associated with it. 


## Define priority for Promotion Policies
Define which Promotion Policy is applied to the Product/Environment when there is more than one Promotion Policy that matches the same Product or Environment combination. 

##### Before you begin
* If required, first [Match Promotion Policy to Products and Environments](#match-promotion-policy-to-products-and-environments)


##### How to
1. Drag and drop the Promotion Policy to the required position in the list.
1. Commit the changes to confirm.
 
 SCREENSHOT

## Evaluate Promotion Policies for Products and Environments 
Select a specific Product-Environment pair to match it with the Promotion Policy that will be applied for it. Codefresh matches the Promotion Policy with the highest priority for the selected combination. 

When there are multiple Promotion Policies for a Product or Environment, evaluating the Promotion Policy is valuable to review the policy that will be applied and potentially adjusting its priority as required.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Promotions in the sidebar, select **Promotion Policies**.
1. In the Promotion Policies page, click **Evaluate Promotion Policy**.
screenshot
1. Select the Product and Environment for which to evaluate the Promotion Policy, and click **Find Promotion Policy**.
  The Simulation Result summarizes the components for the Policy.
  On the right, you can select the Policy, or its Workflows if defined, to review manifests.

SCREENSHOT 

1. If required, [change its priority in the Promotion Policy list](#define-priority-for-promotion-policies).

## Edit/delete Promotion Policies
Manage Promotion Policies by updating settings for existing Promotion Policies, and deleting unused Policies.

>**NOTES**  
When editing Promotion Policy settings, you cannot change the name.

Deleting a Promotion Policy removes it from all the Products and Environments it is assigned to. 

## Visualizing Promotion Workflows in Releases

