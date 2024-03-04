---
title: "Validate environment readiness for promotions"
description: "Runs validations through Promotion Policies to assess environment compliance before promotion"
group: promotions
toc: true
---




When a promotion is triggered in the target environment for a Product, it is customary to validate the environment's readiness before deploying the changes to the environment.
Validation verifies that the application and its dependencies meet the requirements and standards necessary for deployment in the target environment. The validation process can include checks for code quality, passing unit or smoke tests, verifying compatibility with dependencies, security compliance, and other factors relevant to the target environment.


In Codefresh, create automated validation processess through Promotion Policies. The Promotion Policy defines workflows to run before the 


The validations can be 

On triggering a promotion, Codefreprovides you with the complete functionali to to cerate these validations and conntect them to any to The testing phase is where the teams will implement any testing needed to ensure the project functions as expected. This step is also where teams will test for edge and corner case issues. An "edge case" is a bug or issue that only presents at an extreme operating event, and a "corner case" is where a bug or issue presents when multiple conditions are met.

We will consider the facts and factors that may play a role in how things unfold. In the DevOps workflow, you would be highly remiss to leave this step out as it can shape the lifecycle of your entire project.

Considering the end-to-end needs of your project can save hours of work and simplify your team's workflow. Additionally, it helps identify tasks that can be automated, anticipates needs, and circumvents issues that may otherwise arise from otherwise unexpected variables.

Where are you?


Validate environment-readiness for promotion


##### How do you define validation for promotion-readiness?

You define the validation process for the target environment through the Promotion Policy. The Promotion Policy is a Kubernetes CRD created per Product and Environment or per Environment.
It is essentially a series of workdlow executions 

The Promotion Policy comprises:

(Mandatory) Promotion Action
The Promotion Action is mandatory. It is the action that triggers the promotion in the target envrionment. As we have already seen in XREF, it can be a commit or a PR.
Similar to the promotion trigger that initiated the promotion, 


(Optional) Promotion Workflows
The Promotion Workflow is an Argo Workflow that can ex  
It can be a single workflow, or can call other workflows. In short 
Promotion Workflows are completely optional. 

Promotion Workflows can be executed before or after the Promotion Action. 

Selects/applies the Promotion Policy according to its priority
Runs the p



## Promotion Policy settings

Here's a description of the settings you can define as part of a Promotion Policy.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Name**       | The name of the Promotion Policy.<br>The name must be unique in the cluster. The name must match Kubernetes conventions for enities. |
|**Policy Settings**       | The settings that comprise the Promotion Policy.<br>{::nomarkdown}  <ul><li><b>Pre-Action Workflow</b>Optional. The Promotion Workflow to run before the Promotion Action. </li>.<li><b>Action</b>Required. The Promotion Action to update the target application's source repository.<ul><li><b>Commit</b>: Perform a Git commit on the source repository. Commits are implemented immediately  without not requiring manual approval to move to the next stage of the Promotion Policy.</li><li><b>Pull Request</b>: Open a Pull Request for manual approval. </li><li><b>No Action</b>: Do not perform a commit  or open a Pull Request for manual approval. The target application's source repository remains unchanged. Only run the Promotion Workflows that are selected. </li><li><b>User-defined</b>:??? </li></ul> </li> <li><b>Products</b>: The Product or Products to which to apply the Promotion Policy, based on ???</li><li><b>Environments</b>: The Environment or Environments to which to apply the Promotion Policy, based on ???</li></ul>{:/}|


Quesstions:
What happens when there is no action and no promotion workflow defined?
What is the product property and environment property?




## Create a Promotion Policy


1. In the Codefresh UI, from Promotions in the sidebar, select [Promotion Policies](https://g.codefresh.io/2.0/?????){:target="\_blank"}.
1. Do one of the following:
  * If this is your first Promotion Policy, click **Add Policy**.
  * If you have added Promotion Policies, click **Add** at the bottom of the list.
1. Select the mode in which to define the Promotion Policy:
  * YAML: 
  * Form: 
  You can toggle between the modes as you define the Promotion Policy.
1. Define the **Policy Settings**, as described in XREF.  
1. Commit the changes.

The Promotion Policy is displayed in the Promotion List. (NIMA: is the newest policy displayed first by default??)

If needed, change the 



### Define priority for Promotion Policies
The Promotion Policy list displays all Promotion Policies created in descending order of priority.
The priority comes into play when there are Promotion Policies that match the same Product or Environment


* Drag the Promotion Policy to the position in the list *


## Match Promotion Policy to Products and Environments 
Select a Product and Environment and see the Promotion Policy that matches it.

Review the Pre- and Post-Action Promotion Workflows defined for the policy if any. 


Promotion Policy

## Edit/delete Promotion Policies
Manage Promotion Policies by updating policy settings for existing Promotion Policies, and deleting unused Policies.

>**NOTE**  
When edtiting Promotion Policy settings, you cannot change the name.

Deleting a Promotion Policy removes ?????



## Promotion Workflows

Workflow Templates



## Add a Promotion Workflow declarativley


## Create a Promotion Workflow on the fly





## Manage Promoption Workflows


### Copy Promotion Workflow


### Delete Promotion Workflow