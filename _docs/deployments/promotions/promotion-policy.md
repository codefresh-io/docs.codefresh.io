---
title: "Validate environment readiness for promotions"
description: "Runs validations through Promotion Policies to assess environment compliance before promotion"
group: promotions
toc: true
---




When a promotion is triggered in an environment for a Product, it is customary to validate the environment's readiness before deploying the changes and promoting the Product in that environment.
Readiness validation for an environment verifies that the application and its dependencies meet the requirements and standards necessary for deployment in the target environment. Validations can include checks for code quality, passing unit or smoke tests, verifying compatibility with dependencies, security compliance, and other factors relevant to the target environment.

In Codefresh you have the complete functionality create and auatomate these validations and connect them to any combination of Products or Environments. These validations are implemented or run when
You can set up your validation to run wirkflows before submitting the action that will triffer the promotion, and then run validations after the action to make sure that all is as required.

Automated Enforcement: Streamline your deployment process with automated enforcement of promotion policies, minimizing the risk of errors and ensuring consistent and reliable deployments across your pipeline.

Scalable Governance: Scale effortlessly with your evolving infrastructure and application landscape, as promotion policies adapt to accommodate changes in products, environments, and deployment strategies.
Youc an create any number of validations, at any level, and for any combination


Define the Promotion Policy for the Product-Environment combination
Defining the Promotion Workflows 
## Promotion Policies 

Validate environment-readiness for promotion

Flexible 
Promotion Policies are highly customizable to suit your needs. Define policies per Product and per Environment, or with broader coverage for a Product across multiple Environments, or even for different Products for a single Environment. 

Priority-driven
When multiple Promotion Policies match the same Product or Environment, Codefresh applies the Promotion Policy based on the predefined priroty to ensuring seamless enforcement.

Versatile Promotion Actions
Whether your promotion actions are Git-based or utilize custom repositories and mechanisms for compiling application repositories, Codefresh accommodates diverse workflows and deployment strategies with ease.




##### How do you define validation for promotion-readiness?

You define the validation process for the target environment through Promotion Policies. A Promotion Policy is a Kubernetes CRD created per Product and Environment, or any combinations of Products and Environments.

Every Promotion Policy includes these settings:

Promotion Action
The Promotion Action is typically a Git action in the application's source repository that triggers the promotion in the target environment. 

Promotion Workflows
The Promotion Workflow is an Argo Workflow executed before or after the Promotion Action.

Products and Environments
The Products and Environments to which to assign the Promotion Policy.

### How does the Promotion Policy work?

When a promotion is triggered and Codefresh identifies a Promotion Lifecycle for the tarhet environment, 

1. Identifies the Promotion Policy to apply

1. If defined, runs the Pre-Action Promotion Workflow if defined

If successful, 
If failed

1. Applies the Promotion Action 


1. If defined, runs the Post-Action Workflow 



When there is 




### Promotion Policy settings

The table below describes the settings you can define for a Promotion Policy.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Name**       | The name of the Promotion Policy.<br>The name must be unique in the cluster, and must match Kubernetes naming conventions. |
|**Policy Settings**       | The settings that comprise the Promotion Policy.<br>{::nomarkdown}  <ul><li><b>Pre-Action Workflow</b>Optional. The Promotion Workflow to run before the Promotion Action. </li>.<li><b>Action</b>Required. The Promotion Action to update the target application's source repository.<ul><li><b>Commit</b>: Perform a Git commit on the source repository. Commits are implemented immediately without not requiring manual approval to move to the next stage of the Promotion Policy.</li><li><b>Pull Request</b>: Open a pull request (PR) on the change to the source repository. Depending on your PR policy, this option may require manual approval.</li><li><b>No Action</b>: Run the selected Pre- and Post- Promotion Workflows without performing a commit or opening a pull request.<br>Selecting this option requires a Pre- or a Post-Action Workflow to be selected that includes an action to promote the target application.<br>This option is useful to run custom promotion policy mechanisms, not involving updating the target application's source repository to promote the application.<br></li></ul>{:/}|
|**Products** |Single or multiple Products to which to apply the Promotion Policy.<ul><li><b>Product</b>: Match Products by the name or names defined. </li><li><b>Tags</b>: Match Products by the tag or tags defined.</li></ul>{:/}|
|**Environments** |Single or multiple Environments to which to apply the Promotion Policy.<ul><li><b>Kind</b>: Match Environments by their type, either <b>Pre-production</b> or <b>Production</b>.</li><li><b>Environment</b>: Match Environments by the name or names defined.</li><li><b>Tags</b>: Match Environments by the tag or tags defined. </li></ul>{:/}|


### Create a Promotion Policy

Create a Promotion Policy to validate an environment's readiness before promoting and deploying changes.  
Connect the Policy to multiple Products and Environments 

1. In the Codefresh UI, from Promotions in the sidebar, select [Promotion Policies](https://g.codefresh.io/2.0/?????){:target="\_blank"}.
1. Do one of the following:
  * If this is your first Promotion Policy, click **Add Policy**.
  * If you have already added Promotion Policies, click **Add** at the bottom of the list.
1. Select the mode in which to define the Promotion Policy as **YAML** or **Form**.  
  You can toggle between the modes as you define the Promotion Policy.
1. Define the **Policy Settings**, as described in XREF:   
1. Define how and which **Products** to select for this Promotion Policy.
1. Define how and which **Environments** to select for this Promotion Policy.
1. Commit the changes.


The Promotion Policy is added to the Promotion List. (NIMA: is the newest policy displayed first by default??)
If there are multiple Promotion Polcies, you can define the priority of the Policies, and 



### Define priority for Promotion Policies
Define which Promotion Policy is applied to the Product/Environment when there is more than one Promotion Policy that matches the same Product or Environment combination. 

##### Before you begin
* If required, first [Match Promotion Policy to Products and Environments](#match-promotion-policy-to-products-and-environments)


##### How to
1. Drag and drop the Promotion Policy to the required position in the list.
1. Commit the changes to confirm.
 
 SCREENSHOT

### Match Promotion Policy to Products and Environments 
Select a specific Product-Environment pair to match the Promotion Policy that will be applied. Codefresh matches the Promotion Policy with the highest priority for the selected combination. 

When there are multiple Promotion Policies for a Product or Environment, the Match Promotion Policy functionality is valuable to review the policy that will be applied and potentially adjusting its priority as required.

1. From the sidebar, select **Promotion Policies**.
1. In the Promotion Policies page, click **Match Promotion Policy**.
screenshot
1. Select the Product and Environment for which to match the Promotion Policy, and click **Find Promotion Policy**.
  The Simulation Result summarizes the components for the Policy.
  On the right, you can select the Policy, or its Workflows if defined, to review manifests.

SCREENSHOT 

1. If required, [change its priority in the Promotion Policy list](#define-priority-for-promotion-policies).

### Edit/delete Promotion Policies
Manage Promotion Policies by updating settings for existing Promotion Policies, and deleting unused Policies.

>**NOTES**  
When editing Promotion Policy settings, you cannot change the name.

Deleting a Promotion Policy removes it from all the Products and Environments it is assigned to. 



## Promotion Workflows

What are Promotion Workflows?

Promotion Worflows are Argo CD Workflows that you can run as part of a Promotion Policy to validate readiness of the current environment for promotion.

The Promotion Workflows run steps with the steps consisting of tests

Create your own Promotion Workflows or use Codefresh's starter Workflow Templates as your base and

Why define or create a Promotion Workflow?
Though they are optional, Promotion Workflows are designed to run tests before and after the promotion to ensure that
Staging Environment
Performance Testing
Production Environment 




Promotion Workflow settings

The table below describes the settings you can define for a Promotion Policy.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|



## Create a Promotion Workflow

Create a Promotion Workflow to run as part of the Promotion Policy to validate target environment's readiness.


1. In the Codefresh UI, from Promotions in the sidebar, select [Promotion Workflows](https://g.codefresh.io/2.0/?????){:target="\_blank"}.
1. Click **Add Promotion Workflow**.
1. Define the following:
  1. **Name**: The name of the Promotion Workflow.<br>The name must be unique in the cluster, and must match Kubernetes naming conventions. 
  1. **Description** : The intended use of the Promotion Workflow.<br>The description is added as an annotation to the YAML file. It is also displayed in the Promotion Workflows list in the UI. 
  1. **Resource Filename**: The name of the YAML resource file with the configuration settings for the Promotion Workflow, by default, identical to the Name of the Promotion Workflow. You can change as needed.  

SCREENSHOT

{:start="4"}
1. Click **Add**.
1. Select **Blank Skeleton File** and click **Next**.
  The YAML is displayed on the right populated with the settings you defined.

SCREENSHOT 
1. Note the instructions at the top of the YAML file.
1. If needed, change `metadata.annotations.version`.
  The version is displayed in the Promotion Workflows list in the UI.
  You should update it manually when there are changes.
1. To test the Promotion Workflow with the current settings before committing the changes, click **Run**.
?????
1. Make updates if needed.
1. Commit the changes.

When the YAML file is synced to the cluster, it is displayed in the Promotion Workflows list.


## Analyze Promotion Workflows

Clicking on a Promotion Workflow in the list takes you to the detailed view or detailed information on the workflow manifest and workflow runs.

SCREENSHOT 

### Work with Workflow manifests

* Toggle between the Git State, Desired State and Live State
* Diff View of all three states
* Edit mode for updates.
 Option to Run the Promotion Workflow and validate changes before committing them. 

* Analyze the workflow: Analyze each step in the workflow, including the Argo Events that triggered the pipeline
* View workflow logs: Real-time logs for ongoing workflows, and archived logs for completed workflows
* Manage the workflow: Retry, resubmit, or delete workflows

### View Workflow runs Submitted Workflows

The Workflows tab displays all the instances of the Promotion Workflow submitted and run as part of different Promotion Policies.

Filters: 

Workflow run entry
* Merge request details
* SHA
* Commit author
* Repo and branh
* Workflow stats
* Date and duration of the workflow
* Status 
* View Workflow Details: 

### Analyze Workflow executions
Visualize the steps in the Workflow, the connection between them, and detailed information on a step. 

#### Workflow and step management
* **Summary**: ???.
* **Resubmit**: Rerun or re-execute the Workflow. Resubmitting a Workflow, creates a new instance of the Workflow.  to create a new workflow and submit it. You can resubmit both successful and failed workflows.
* **Delete**: Remove unused or legacy workflows. Deleting a Workflow removes it from the Workflows list and frp, .
**Logs**: View online logs for ongoing or completed Workflow, . As with logs in any standard terminal, you can copy/cut/paste log info. The commands differ based on the OS.
  * For an ongoing Workflow, view live logs for steps as they are being executed.  
  * For a completed Workflow, view logs for the Workflow, or for any step in the workflow.  

#### Step details
For additional information on the step, click the step to open the pull-out panel.
* The header displays the name of the step, its status, the step-type, the date of the most recent update, and duration.  
* The tabs displayed differ according to the step type:  
  * The Summary, Manifest, Containers, Inputs, Outputs tabs are displayed for all alomst all step types. (NIMA: what about Artifacts??)
  * The Logs tab is displayed for Pod step types.
  * Event-step types display Manifest, Summary and Payload.
    For Cron and Unknown event types, only the Event Sources are shown. 



## Manage Promotion Workflows


### Copy Promotion Workflow

### Edit Promotion Workflow

### Delete Promotion Workflow