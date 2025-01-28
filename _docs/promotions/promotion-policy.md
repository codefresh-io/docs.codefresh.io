---
title: "Configure Promotion Policies"
description: "Create patterns to govern promotion behavior for environments"
group: promotions
redirect-from: 
 - /docs/promotions/configuration/
 - /docs/promotions/entities/
toc: true
---




When a promotion is triggered for a product in an environment, it's essential to govern promotion behavior for that environment, both before and after promoting changes.  
These polices can include validations checks, such as code quality, unit or smoke tests, compatibility with dependencies, security compliance, 
and other relevant factors specific to the target environment, performance checks, notifications.

##### GitOps Promotion 
Codefresh empowers you to create and automate promotion behavior for environments through Promotion Policies.  

A Promotion Policy combines promotion settings defining workflows that govern behavior for the environment before and after promotion, and targets defining the products or environments for which to implement the Policies.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/policies/new-promotion-policy.png" 
url="/images/gitops-promotions/policies/new-promotion-policy.png"
alt="Example Promotion Policy" 
caption="Example Promotion Policy"
max-width="60%"
%}


The Policies can be tailored to a combination of products and environments, be generic to match all products and environments, giving you the flexibility you need to implement the most simple to the most complex promotion behavior.  

You can create dedicated Promotion Policies for the account which are global in scope, or define them within a Promotion Flow as inline Policy settings.

Review the [settings](#promotion-policy-settings--targets) you can configure for a Promotion Policy, and how to [create a Promotion Policy](#create-a-promotion-policy). 

##### Promotion Policy implementation
More than one Promotion Policy can match the same target product or environment. 
The logic for applying Promotion Policy settings is based on predefined priorities and target attributes.
[Promotion Policy implementation logic](#promotion-policy-implementation-logic) details different scenarios and examples describing the implementation logic. 


## Promotion Policy YAML
Once configured and committed, Promotion Policy settings are saved as a CRD (Custom Resource Definition) within the Shared Configuration Repository in the GitOps Runtime selected as the Configuration Runtime.  
The path in the Shared Configuration Repo is `<gitops-runtime>/<shared-configuration-repo>/resources/configurations/promotion-policies/`.  
See [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) and [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/).  

For the YAML specifications, see [Promotion Policy YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-policy-crd/).



## Key features of Promotion Policies

* **Automated validation**     
  Validations defined in the Promotion Policy are enforced automatically, minimizing the risk of errors, and ensuring consistency and reliability in deployments.

* **Flexible configuration**  
  Promotion Policies are highly customizable to match your requirements. Define Policies per product, per environment, 
  or with broader coverage for a specific product across all environments, or only by specific types of environments. 

* **Priority-driven enforcement**  
In cases where multiple Promotion Policies match products, environments, or a combination of both, Codefresh merges Promotion Settings from matching Policies in order of priority, ensuring seamless enforcement.

* **On-demand evaluation**  
Visualize the policy settings which will be applied to a product-environment pair with Evaluate Promotion Policy option. Not only does this option identify product and environments which do not match existing Promotion Policies, it also identifies misconfigured policies. 

* **Git-based and custom promotion actions**  
Whether your promotion actions are Git-based or utilize custom repositories and mechanisms for compiling application repositories, Codefresh supports both types of actions.





<!--- ## Where does the Promotion Policy fit in the Promotion Flow?


Promotion Policies are run:
Upon manually promoting the Product from the trigger environment to the destination environment.
OR
Upon updating the Git repository with the application manifest.

TBD
-->

## Promotion Policy settings & targets

A Promotion Policy comprises the Policy's promotion settings and the Policy's targets. 
The table below describes the settings and targets you can define for a Promotion Policy.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/policies/policy-settings.png" 
url="/images/gitops-promotions/policies/policy-settings.png" 
alt="Promotion Policy settings" 
caption="Promotion Policy settings" 
max-width="60%" 
%}



{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Name**       | The name of the Promotion Policy.<br>The name must be unique in the cluster and must match Kubernetes naming conventions. |
|**Promotion Settings**       | The settings that comprise the Promotion Policy.<br>{::nomarkdown}  <ul><li><b>Pre-Action Workflow</b>: Optional. The Promotion Workflow to run before the Promotion Action. </li><li><b>Action</b>Optional. The Promotion Action to update the target application's source repository:<ul><li><b>Commit</b>: Perform a Git commit on the source repository. Commits are implemented immediately and do not require manual approval to move to the next stage of the Promotion Policy.</li><li><b>Pull Request</b>: Open a pull request (PR) on the change to the source repository. Depending on your PR policy, this option may require manual approval to move to the next stage.</li><li><b>No Action</b>: Run the selected Pre-Action Workflow, and the Post-Action Workflow if any, without performing a commit or opening a pull request on the application's source repository.<!--- <br>No Action requires a Pre-Action Workflow to be selected that includes a step to automatically execute the action to promote the target application. Otherwise, Promotion Flows will fail. --><br>This option is useful to run custom promotion logic instead of Codefresh, not involving updating the target application's source repository to promote the application.<br></li></ul>{:/}See [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).|
|**Products** |Single or multiple Products to which to apply the Promotion Policy. <br>Match Products by the name or names defined. <!--- {::nomarkdown}<ul><li><b>Product</b>: Match Products by the name or names defined. </li><li><b>Tags</b>: Match Products by the tag or tags defined.</li></ul>{:/}-->|
|**Environments** |Single or multiple Environments to which to apply the Promotion Policy. {::nomarkdown}<ul><li><b>Kind</b>: Match Environments by their type, either <b>Pre-production</b> or <b>Production</b>.</li><li><b> Environment</b>: Match Environments by the name or names defined.</li><!--- <li><b>Tags</b>: Match Environments by the tag or tags defined. </li> --></ul>{:/}|
|**Priority** |The priority assigned to the Promotion Policy. The priority determines how and which Promotion Settings are applied when two or Polices match the target attributes. The priority is a positive or negative integer and defined in ascending order.<br>To understand how Promotion Settings are implemented, see [Promotion Policy implementation logic](#promotion-policy-implementation-logic).|



## Promotion Policy implementation logic

When a promotion is triggered, regardless of whether it’s manual or automated, Promotion Policy settings are merged from all defined policies across the account that match the specified Product or Environment. Policies are merged according to priority, with higher-priority policies overriding lower-priority ones.

##### Promotion Policies in Trigger Environments
In Trigger Environments, you can add a Post-Action Workflow to run after the Promotion Action. 

##### Manually triggered promotions
For manually triggered promotions, if only partial Policy settings are merged or no settings apply because no policies match, you can define the policy settings to control promotion behavior for the selected product or environment.

##### Promotion Flows
When a Promotion Flow is triggered, either automatically or on-demand, Policy settings are merged on a per-environment basis. 

There are two options:  

* **Inline policy settings**  
  Manually select policy settings for an environment. These _inline_ selections override any global Promotion Policy settings that match the product/environment when the flow is triggered.

* **Global Promotion Policy settings**  
  Explicitly select Global Policy Settings. The promotion mechanism then applies global Promotion Policy settings based on predefined priorities. <!-- See TBD -->

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/promotion-flow/inline-vs-global-policy.png" 
url="/images/gitops-promotions/promotion-flow/inline-vs-global-policy.png"
alt="Inline vs. global Promotion Policy settings" 
caption="Inline vs. global Promotion Policy settings"
max-width="60%"
%}




<!-- ### Example Promotion Policies

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


-->

<!--- ### Promotion Policy logic for identical target attributes 
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


### Promotion Policy logic for different target attributes

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
The Post-Action comes from `pp-notify`, the Policy with the next highest priority that defines a Post-Action.  -->

## Create a Promotion Policy
Create a Promotion Policy to validate an environment's readiness before promoting and deploying changes to a Product.  

##### Before you begin

* Create [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/)
* Review [Policy settings](#promotion-policy-settings--targets)

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Policies**.
1. Do one of the following:
  * To create your first Promotion Policy, click **Add Policy**.
  * If you have already Promotion Policies, click **Add** at the bottom of the list.
1. Select the mode in which to define the Promotion Policy as **YAML** or **Form**.  
  You can toggle between the modes as you define the Promotion Policy.
1. Define the **Policy Settings**.  
1. Define how and which **Products** to select for this Promotion Policy.
1. Define how and which **Environments** to select for this Promotion Policy.
1. Commit the changes.
  The Promotion Policy is added to the Promotion List.

## Promotion Policy list

Here's an example of the Promotion Policy page which displays all Promotion Policies in the account. This is also the location from which you can create and manage existing policies.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/policies/policy-list.png" 
url="/images/gitops-promotions/policies/policy-list.png"
alt="Example Promotion Policy" 
caption="Example Promotion Policy"
max-width="60%"
%}

* If there are multiple Promotion Policies that match the same product or environments, the Priority determines how Promotion Policy settings are applied. 
* The **Evaluate Promotion Policy** functionality allows you to select any product and environment pair and visualize the settings that will be applied from all the Promotion Policies that match the selected pair. See [Evaluate Promotion Settings for Products and Environments ](#match-promotion-policies-to-products-and-environments).


## Evaluate Promotion Settings for Products and Environments 
Select a specific Product-Environment pair and preview the Promotion Settings that will be applied for it.  

Evaluate Promotion Policies to identify:
* Product-Environment pairs that don't match any existing Promotion Policies
* Missing Promotion Settings
* Possible conflicts with Promotion Flows
* How to optimize existing Policies

If there are multiple Policies with either identical or different target attributes that match the Product-Environment selected, Codefresh merges Promotion Settings from all matched polices based on the priority of each Policy and the [implementation logic](#promotion-policy-implementation-logic). 

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from Promotions in the sidebar, select **Promotion Policies**.
1. In the Promotion Policies page, click **Evaluate Promotion Policy**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/policies/evaluate-promotion-policy.png" 
url="/images/gitops-promotions/policies/evaluate-promotion-policy.png" 
alt="Evaluate Promotion Policy" 
caption="Evaluate Promotion Policy" 
max-width="60%" 
%}

{:start="3"}
1. Select the Product and Environment for which to evaluate the Promotion Policy, and click **Preview Promotion**.
  The Result summarizes the Promotion Settings that will be applied for the selected pair from all matched Promotion Policies.
  * If there are messages on misconfigured Policies, see [Understand results from Promotion Policy evaluation](#understand-results-from-promotion-policy-evaluation).
  * On the right, select the Workflows if defined to view manifests.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/policies/promotion-policy-evaluation-result.png" 
url="/images/gitops-promotions/policies/promotion-policy-evaluation-result.png" 
alt="Previewing results for Promotion Policy evaluation" 
caption="Previewing results for Promotion Policy evaluation" 
max-width="60%" 
%}

{:start="4"}
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
<!--- SCREENSHOT OF MESSAGE -->

**Reason**  
Promotion Action has not been configured in any of the Policies that match the selected Product-Environment pair.
Promotion Policy cannot be applied to the pair. 


**Corrective action**  
Promotion Policies must be configured with an Action: Commit, Pull request, or No Action. 


#### Pre-Action Workflow does not include required step with promotion action
**Message**  
Promotion Flow will fail for the selected Product-Environment pair.<br>
Merged Promotion Settings from the matched Promotion Policies define No Action as the Promotion Action, but either matched Promotion Policies do not include a Pre-Action Workflow or Pre-Action Workflows do not include a step to initiate a corresponding promotion action.<br>
Configure or update a Pre-Action Workflow in one of the matched Promotion Policies as required.


**Reason**  
When No Action is configured as a Promotion Setting, one of the matched Promotion Policies:
* Must be configured with a Pre-Action Workflow
* Pre-Action Workflow must include a step that initiates or executes the corresponding Promotion Action

**Corrective action**  
Configure one of the matched Promotion Policies with a Pre-Action Workflow.
Make sure it includes a step to execute the Promotion Action that will promote the changes in the environment.

## Edit/delete Promotion Policies
Manage Promotion Policies by updating settings for existing Promotion Policies, and deleting unused Policies.

>**NOTES**  
When editing Promotion Policy settings, you cannot change the name.

Deleting a Promotion Policy removes it from all the Products and Environments it is assigned to. 

## Visualize Promotion Workflows in Releases

When a product is promoted manually or automatically, the promotion mechanism create a release for the product with a unique Release ID. The release  provides a graphical representation of the promotion flow across the environments defined for it.
The visualization includes the Pre- and Post-Action Promotion Workflows within the environments, more specifically, the steps within the workflows.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/release-visualization.png" 
url="/images/gitops-promotions/releases/release-visualization.png" 
alt="Promotion Workflows in product release view" 
caption="Promotion Workflows in product release view" 
max-width="60%" 
%}

For more information, see [Promotion Workflows in Product Releases]({{site.baseurl}}/docs/promotions/releases/#promotion-workflows-in-product-releases).

## Related articles
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
[Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)   
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
