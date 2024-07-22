---
title: "Configure Promotion Policies"
description: "Run validations through Promotion Policies to assess environment readiness before orchestrating promotion"
group: promotions
toc: true
---




When a promotion is triggered for a Product in an Environment, it's essential to validate the environment's readiness before deploying changes and promoting the Product. Readiness validation ensures that the Product's applications and their dependencies meet the necessary requirements and standards for deployment in the target environment. 
These validations include various checks, such as code quality, unit or smoke tests, compatibility with dependencies, security compliance, 
and other relevant factors specific to the target environment.

##### Promotion Policies for readiness validation
Codefresh empowers you to create and automate environment readiness validations through Promotion Policies. 
A Promotion Policy combines promotion settings that define workflows to validate environment readiness, and targets that define the products or environments for which to implement the Policies.

The Policies can be tailored for any combination of Products and Environments, giving you the utmost felexibily with the .  

You can create dedicated Promotion Policies, or define them as part of a Promotion Flow which orchestrates the promotion and deployment of the Product across all Environments.

DIAGRAM

Review the [settings](#promotion-policy-settings) you can configure for a Promotion Policy and how to [create a Promotion Policy](#create-a-promotion-policy). 

##### Promotion Policy implementation
More than one Promotion Policy can match the same target Product or Environment. 
The logic for applying Promotion Policy settings is based on predefined priorities and target attributes.
[Promotion Policy logic](#promotion-policy-logic) details different scenarios and examples describing the implementation logic. 






## Key features of Promotion Policies

* **Automated validation**   
  Validations defined in the Promotion Policy are enforced automatically, minimizing the risk of errors, and ensuring consistency and reliability in deployments.

* **Flexible configuration**  
  Promotion Policies are highly customizable to match your requirements. Define Policies per Product, per Environment, 
  or with broader coverage for a specific Product across all environments, or only by specific types of Environments. 

* **Priority-driven enforcement**
In cases where multiple Promotion Policies match Products, Environments, or a combination of both, Codefresh merges Promotion Settings from matching Policies in order of priority, ensuring seamless enforcement.

* **On-demand evaluation**
Visualize Promotion Settings applied to a Product-Environment pair with Evaluate Promotion Policy option. Not only does this option identify Product-Environment pairs which do match existing Promotion Policies, it also identifies misconfigured policies. 

* **Versatile promotion actions**
Whether your promotion actions are Git-based or utilize custom repositories and mechanisms for compiling application repositories, Codefresh accommodates both types of actions.



See ???



## Where does the Promotion Policy fit in the Promotion Flow?


Promotion Policies are run:
Upon manually promoting the Product from the trigger Environment to the destination Environment.
OR
Upon updating the Git repository with the application manifest.

TBD


## Promotion Policy settings & targets

A Promotion Policy comprises the Policy's promotion settings and the Policy's targets. 
The table below describes the settings and targets you can define for a Promotion Policy.



{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Name**       | The name of the Promotion Policy.<br>The name must be unique in the cluster, and must match Kubernetes naming conventions. |
|**Promotion Settings**       | The settings that comprise the Promotion Policy.<br>{::nomarkdown}  <ul><li><b>Pre-Action Workflow</b>: Optional. The Promotion Workflow to run before the Promotion Action. </li><li><b>Action</b>Required. The Promotion Action to update the target application's source repository.<ul><li><b>Commit</b>: Perform a Git commit on the source repository. Commits are implemented immediately without not requiring manual approval to move to the next stage of the Promotion Policy.</li><li><b>Pull Request</b>: Open a pull request (PR) on the change to the source repository. Depending on your PR policy, this option may require manual approval to move to the nex stage.</li><li><b>No Action</b>: Run the selected Pre-Action Workflow, and the Post-Action Workflow if any, without performing a commit or opening a pull request on the application's source repository.<br>No Action requires a Pre-Action Workflow to be selected that includes a step to automatically execute the action to promote the target application. Otherwise, Promotion Flows will fail. <br>This option is useful to run custom promotion policy mechanisms, not involving updating the target application's source repository to promote the application.<br></li></ul>{:/}See [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).|
|**Products** |Single or multiple Products to which to apply the Promotion Policy. If target Environments are not defined, at least one Product is required. {::nomarkdown}<ul><li><b>Product</b>: Match Products by the name or names defined. </li><li><b>Tags</b>: Match Products by the tag or tags defined.</li></ul>{:/}|
|**Environments** |Single or multiple Environments to which to apply the Promotion Policy. If target Products are not defined, at least one Environment is required.{::nomarkdown}<ul><li><b>Kind</b>: Match Environments by their type, either <b>Pre-production</b> or <b>Production</b>.</li><li><b> Environment</b>: Match Environments by the name or names defined.</li><li><b>Tags</b>: Match Environments by the tag or tags defined. </li></ul>{:/}|
|**Priority** |The priority assigned to the Promotion Policy. The priority determines how and which Promotion Settings are applied when two or Polices match the target attributes. The priority is a positive or negative integer and defined in ascending order.<br>To understand the  implementation logic behind Promotion Settings, see [Promotion Policy implementation logic](#promotion-policy-implementation-logic).|


## Best practices for Promotion Policies

TBD  
Examples showing when to set by environment, by product and others

## Promotion Policy implementation logic

Each Promotion Policy can define some or all promotion settings, and one or more Products or Environments as targets. 
When a Promotion Policy is to be run to validate readiness for an environment, promotion settings are merged from all matched policies based on their priority. 
Always, policies with higher priority take precedence over those with lower priority.

### Promotion Policies in Trigger Environments
TBD



### Example Promotion Policies

Let's consider a few different Promotion Polices. As you can see in the table below, each Policy has a name, priority, validation settings, and target attributes.
Note that not all settings are defined or configured for all policies. But all policies have a pre-defined Priority, and one or both target attributes.

{: .table .table-bordered .table-hover}
| Promotion Policy       |             |  
| Name       |Priority   |Pre-Action Workflow |  Action | Post-Action Workflow | Products  | Environments |
| -----------| ----------| ------------------ | ---------------------| ----------| -------------|
| pp-demo     | 20        |send-slack-alert    | commit   |-                    | demo  | -  |
| pp-notify   | 300       |send-slack-alert-1  | ??       |send-slack-success-fail  | demo  | -  |
| pp-pre-prod |200       |                   | commit   | validate-deployment                    | -   | ENV_TYPE=non-prod |
| pp-prod     |100       | send-slack-alert  | pr       |-                      |-   | ENV_TYPE=prod  |


(NIMA: will convert this into a diagram)


### Scenario 1: Applying Promotion Policies with identical target attributes 
This scenario reviews how Promotion Policy settings are applied when at least two Policies match the same target attributes.

**Goal**: Promote `demo` product  
**Matched Promotion Policies**:  
  * `pp-demo` with the target Product attribute, `demo`
  * `pp-notify` also with target Product attribute, `demo`
**Apply Promotion Policy**: 
When more than one Policy matches the promotion requirement, the same Product in this case, the Priority determines how Policy settings are applied.
* **Priority**: Promotion Policy `pp-demo` has the highest priority (priority is in ascending order)
* **Promotion Policy settings**:
  * Pre-Action Workflow: Configured for `pp-demo` as `send-slack-alert`
  * Action: Configured for `pp-demo` as `commit`
  * Post-Action Workflow:  
    Not configured for `pp-demo`
    The Promotion Policy with the next highest priority that defines a Post-Action is `pp-notify`, as `send-slack-success-fail`

##### Summary
The promotion policy `pp-demo` has the highest priority (20), so its Pre-Action (`send-slack-alert`) and Action (`commit`) are applied.  
The Post-Action comes from `pp-notify`, the Policy with the next highest priority that defines a Post-Action.


### Scenario 2: Applying Promotion Policies with different target attributes

This scenario reviews how Promotion Policy settings are applied when two Policies have different target attributes that match the requirements. 

**Goal**: Promote `demo` product to all non-production environments  
**Matched Promotion Policies**:  
  * `pp-pre-prod` matches target Environment, `ENV_TYPE=non-prod`
  * `pp-demo` matches target Product, `demo`
**Apply Promotion Policy**: 
When there are no specific attributes,  the Priority determines how Policy settings are applied.
* **Priority**: Promotion Policy `pp-demo` has the highest priority (priority is in ascending order)
* **Promotion Policy settings**:
  * Pre-Action Workflow: Configured for `pp-demo` as `send-slack-alert`
  * Action: Configured for `pp-demo` as `commit`
  * Post-Action:  
    Not configured for `pp-demo`
    The Promotion Policy with the next highest priority that defines a Post-Action is `pp-notify`, as `send-slack-success-fail`

##### Summary
The promotion policy `pp-demo` has the highest priority (20), so its Pre-Action (`send-slack-alert`) and Action (`commit`) are applied.  
The Post-Action comes from `pp-notify`, the Policy with the next highest priority that defines a Post-Action.

## Create a Promotion Policy
Create a Promotion Policy to validate an environment's readiness before promoting and deploying changes to a Product.  

##### Before you begin

* Create [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-policy/)

##### How to

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
  The Promotion Policy is added to the Promotion List.

## Promotion Policy list

Here's an example of the Promotion Policy page which displays all Promotion Policies in the account. This is also the location from which you can create new and manage existing policies.
SCREENSHOT

* (NIMA: is the newest policy displayed first by default??)
* If there are multiple Promotion Policies that match the same Product or Environments, the Priority determines how Promotion Policy settings are is applied. 
* The **Evaluate Promotion Policy** functionality allows you to select any Product and Environment pair and visualize the Promotion Settings that will be applied from all the Promotion Policies that match the selected pair. See [Evaluate](#match-promotion-policies-to-products-and-environments)


## Evaluate Promotion Settings for Products and Environments 
Select a specific Product-Environment pair and preview the Promotion Settings that will be applied for it.  
Evaluate Promotion Policies to identify Product-Environment pairs that don't match any existing Promotion Policies, identify possible conflicts with Promotion Flows, and also optimize existing Policies.

If there are multiple Policies with either identical or different target attributes that match the Product-Environment selected, Codefresh merges Promotion Settings from all matched polices based on the priority of each Policy and the implementation logic. 


1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Promotions in the sidebar, select **Promotion Policies**.
1. In the Promotion Policies page, click **Evaluate Promotion Policy**.
SCREENSHOT
1. Select the Product and Environment for which to evaluate the Promotion Policy, and click **Preview Promotion**.
  The Result summarizes the Promotion Settings that will be applied for the selected pair from all matched Promotion Policies.
  * If there are messages on misconfigured Policies, see 
  * On the right, select the Workflows if defined to view manifests.

SCREENSHOT 

1. If required, update the Promotion Settings for one or more Promotion Policies.





### Understand results from Promotion Policy evaluation
When you evaluate Promotion Policies, in addition to identifying Products and Environments that do not match any existing Policies, you can also identify misconfigured Policies. 

Misconfigured Policies include: 
* [Action missing in matched Policies](#action-missing-in-matched-policies)
* [Pre-Action Workflow does not include required step with promotion action](#pre-action-workflow-does-not-include-required-step-with-promotion-action)

#### No Promotion Policy matches  

#### Action missing in matched Policies 

**Message**  
Unable to apply any Promotion Policy for the selected Product-Environment pair.<br>
Merged Promotion Settings from the matched Promotion Policies are missing the Promotion Action.<br>
Define an Action for one of the matched Promotion Policies and try again.

**Reason**  
Promotion Action has not been configured in any of the Policies that match the selected Product-Environment pair.
Promotion Policy cannot be applied to the pair. 


**Corrective action**  
Promotion Policies must be configured with at least one Action: Commit, Pull request, or No Action. 


#### Pre-Action Workflow does not include required step with promotion action
**Message**  
Promotion Flow will fail for the selected Product-Environment pair.<br>
Merged Promotion Settings from the matched Promotion Policies define No Action as the Promotion Action, but the Pre-Action Workflow does not include a step that initiates a corresponding promotion action.<br>
Update the Pre-Action Workflow as required.

**Reason**  
When No Action is configured as a Promotion Setting:
* Pre-Action Workflow must be configured 
* Pre-Action Workflow must include a step that initiates or executes the corresponding Promotion Action

**Corrective action**  


## Edit/delete Promotion Policies
Manage Promotion Policies by updating settings for existing Promotion Policies, and deleting unused Policies.

>**NOTES**  
When editing Promotion Policy settings, you cannot change the name.

Deleting a Promotion Policy removes it from all the Products and Environments it is assigned to. 

## Visualizing Promotion Workflows in Releases

TBD