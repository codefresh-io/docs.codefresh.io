---
title: "Configure Promotion Policies"
description: "Run validations through Promotion Policies to assess environment readiness before orchestrating promotion"
group: promotions
toc: true
---




When a promotion is triggered for a Product in an Environment, it's essential to validate the environment's readiness before deploying changes and promoting the Product. 
Readiness validation ensures that the Product's applications and their dependencies meet the necessary requirements and standards for deployment in the 
target environment. 
These validations include various checks, such as code quality, unit or smoke tests, compatibility with dependencies, security compliance, 
and other relevant factors specific to the target environment.

##### Promotion Policies for readiness validation
Codefresh empowers you to create and automate environment readiness validations through Promotion Policies. 
A Promotion Policy combines promotion settings and targets.  The Policies can be tailored for any combination of Products and Environments.  
You have the flexibility to create dedicated Promotion Policies or define them as part of a Promotion Flow, 
which orchestrates the promotion and deployment of the Product across all Environments.

DIAGRAM

Review the [settings](#promotion-policy-settings) you can configure for a Promotion Policy and how to [create a Promotion Policy](#create-a-promotion-policy). 

##### Promotion Policy implementation
More than one Promotion Policy can match the same target Product or Environment. 
The logic for applying Promotion Policy settings is based on predefined priorities and target attributes.
[Promotion Policy logic](#promotion-policy-logic) details different scenarios and examples describing the logic. 






## Key features of Promotion Policies

* **Automated validation**   
  Validations defined in the Promotion Policy are enforced automatically, minimizing the risk of errors, and ensuring consistency and reliability in deployments.

* **Flexible configuration**  
  Promotion Policies are highly customizable to match your requirements. Define Policies per Product, per Environment, 
  or with broader coverage for a specific Product across all environments, or by specific types of Environments. 

* **On-demand evaluation**
Select any Product-Environment pair to visualize which Promotion Policy is applied to the combination. defresh does not find a Promotion Policy, you can create one. 
If there are Promotion Policy, YEither optimize the Policy or redefine its priority in the Policy list.

* **Priority-driven enforcement**
In cases where multiple Promotion Policies match Products, Environments, or a combination of both, Codefresh applies Promotion Policies in order of priority, ensuring seamless enforcement.

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

A Promotion Policy comprises the Policy's settings and the Policy's targets. 
The table below describes the settings and targets you can define for a Promotion Policy.



{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Name**       | The name of the Promotion Policy.<br>The name must be unique in the cluster, and must match Kubernetes naming conventions. |
|**Policy Settings**       | The settings that comprise the Promotion Policy.<br>{::nomarkdown}  <ul><li><b>Pre-Action Workflow</b>Optional. The Promotion Workflow to run before the Promotion Action. </li>.<li><b>Action</b>Required. The Promotion Action to update the target application's source repository.<ul><li><b>Commit</b>: Perform a Git commit on the source repository. Commits are implemented immediately without not requiring manual approval to move to the next stage of the Promotion Policy.</li><li><b>Pull Request</b>: Open a pull request (PR) on the change to the source repository. Depending on your PR policy, this option may require manual approval.</li><li><b>No Action</b>: Run the selected Pre- and Post- Promotion Workflows without performing a commit or opening a pull request.<br>Selecting this option requires a Pre- or a Post-Action Workflow to be selected that includes an action to promote the target application.<br>This option is useful to run custom promotion policy mechanisms, not involving updating the target application's source repository to promote the application.<br></li></ul>{:/}|
|**Products** |Single or multiple Products to which to apply the Promotion Policy. At least one Product is required if target Environments are not defined. {::nomarkdown}<ul><li><b>Product</b>: Match Products by the name or names defined. </li><li><b>Tags</b>: Match Products by the tag or tags defined.</li></ul>{:/}|
|**Environments** |Single or multiple Environments to which to apply the Promotion Policy. At least one Environment is required if target Products are not defined.{::nomarkdown}<ul><li><b>Kind</b>: Match Environments by their type, either <b>Pre-production</b> or <b>Production</b>.</li><li><b> Environment</b>: Match Environments by the name or names defined.</li><li><b>Tags</b>: Match Environments by the tag or tags defined. </li></ul>{:/}|





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

Here's an example of the Promotion Policy page.
SCREENSHOT

* (NIMA: is the newest policy displayed first by default??)
* If there are multiple Promotion Policies that match the same Product or Environments, the Priority determines how Promotion Policy settings are is applied. 
* The Evaluate Promotion Policy feature allows you to select any Product and Environment pair and identify the Promotion Policy associated with it. 







## Promotion Policy implementation logic

Each Promotion Policy can define some or all settings, and target one or more Products or Environments. 
When a Promotion Policy is run to validate readiness for an environment, settings are merged from all the matched policies based on their priority. 
Higher priority policies take precedence.

### Promotion Policies in Trigger Environments
TBD



### Example Promotion Policies

Let's consider a few different Promotion Polices. As you can see in the table below, each Policy has a name, priority, validation settings, and target attributes.
Note that not all settings are defined or configured for all policies. But all policies have a pre-defined Priority, and one or both target attributes.

{: .table .table-bordered .table-hover}
| Promotion Policy       |             |  
| Name       |Priority   |Pre-Action Workflow |  Action | Post-Action Workflow | Products  | Environments |
| -----------| ----------| ------------------ | ---------------------| ----------| -------------|
| pp-demo     | 20        |send-slack-alert    | commit   |-                    | demo  | none  |
| pp-notify   | 300       |send-slack-alert-1  | ??       |send-slack-success-fail  | demo  | none  |
| pp-pre-prod |200       |                   | commit   | validate-deployment                    | none   | ENV_TYPE=non-prod |
| pp-prod     |100       | send-slack-alert  | pr       |none                      |none   | ENV_TYPE=prod  |


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




## Define priority for Promotion Policies
Define the priority for a Promotion Policy which determines when and how it is applied to the Product/Environment when there is more than one Promotion Policy that matches the same Product or Environment combination. 

##### Before you begin
* If required, first [Match Promotion Policy to Products and Environments](#match-promotion-policy-to-products-and-environments)


##### How to
1. Drag and drop the Promotion Policy to the required position in the list.
1. Commit the changes to confirm.
 
 SCREENSHOT

## Match Promotion Policies to Products and Environments 
Select a specific Product-Environment pair, and preview the Promotion Policy settings that will be applied for it. 
Codefresh matches the Promotion Policy with the highest priority for the selected combination. 

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

TBD