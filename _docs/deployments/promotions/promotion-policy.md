---
title: "Validate environment readiness for promotions"
description: "Runs validations through Promotion Policies to assess environment compliance before promotion"
group: promotions
toc: true
---




When a promotion is triggered for a Product in an Environment, it is customary to validate the environment's readiness before deploying changes and promoting the Product in that environment.
Readiness validation confirms that the application and its dependencies meet the necessary requirements and standards for deployment in the target environment. These validations encompass various checks, including code quality, unit or smoke tests, compatibility with dependencies, security compliance, and other relevant factors specific to the target environment.


Codefresh empowers you to create and automate these validations for any combination of Products and Environments through Promotion Policies. You can create dedicated Promotion Policies through the UI, or you can define it as part of a Promotion Flow which orchestrates the promotion and deployment of the Product across all the Environments.

 

##### How do you define validations for promotion-readiness?


 
Every Promotion Policy includes:

Promotion Action
The Promotion Action is the action that triggers the promotion in the target environment. It is typically a Git action in the application's source repository. Codefresh also permits a no-action Policy for organizations which utilize custom compilation or build mechanisms.

Promotion Workflows
The Promotion Workflow is an Argo Workflow executed before or after the Promotion Action.
The Pre-Action Workflow is run before, and the Post-Action Workflow after, the Promotion Action. Both are optional, but we recommend 

Products and Environments
The Products and Environments the Promotion Policy applies to.

See ???



## How or where does the Promotion Policy fit in the Promotion Flow?


Promotion Policies are run:
Upon manually promoting the Product from the trigger Environment to the destination Environment.
OR
Upon updating the Git repository with the application manifest.

The validations comprising the Pre Promotion Workflow, the Action, and the Postare condifured  to run as Argo Workflows, and . They include steps to run tests, notifications, and whatever else is required. 

## Benefits of Promotion Policies
 

* **Automated validation**   
  Validations defined in the Promotion Policy are enforced automatically, minimizing the risk of errors while ensuring consistent and reliable deployments.

* **Flexible configuration**  
  Promotion Policies are highly customizable to match your requirements. Define Policies per Product and per Environment, or with broader coverage for a specific Product across multiple Environments, or for different Products for a specific kind of Environment. 

## Unique features of Promotion Policies
On-demand evaluation
Select a Product-Environment pair to see which Promotion Policy is applied to the combination. Either optimize the Policy or redefine its priority in the Policy list.

Priority-driven enforcement
In cases where multiple Promotion Policies match the same Product or Environment, Codefresh applies the Policy with the highest predefined priority, ensuring seamless enforcement.

Versatile promotion Actions
Whether your promotion actions are Git-based or utilize custom repositories and mechanisms for compiling application repositories, Codefresh accommodates both types of actions to trigger pro .

-->







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


## Promotion Policies


### Promotion Policy settings

The table below describes the settings you can define for a Promotion Policy.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Name**       | The name of the Promotion Policy.<br>The name must be unique in the cluster, and must match Kubernetes naming conventions. |
|**Policy Settings**       | The settings that comprise the Promotion Policy.<br>{::nomarkdown}  <ul><li><b>Pre-Action Workflow</b>Optional. The Promotion Workflow to run before the Promotion Action. </li>.<li><b>Action</b>Required. The Promotion Action to update the target application's source repository.<ul><li><b>Commit</b>: Perform a Git commit on the source repository. Commits are implemented immediately without not requiring manual approval to move to the next stage of the Promotion Policy.</li><li><b>Pull Request</b>: Open a pull request (PR) on the change to the source repository. Depending on your PR policy, this option may require manual approval.</li><li><b>No Action</b>: Run the selected Pre- and Post- Promotion Workflows without performing a commit or opening a pull request.<br>Selecting this option requires a Pre- or a Post-Action Workflow to be selected that includes an action to promote the target application.<br>This option is useful to run custom promotion policy mechanisms, not involving updating the target application's source repository to promote the application.<br></li></ul>{:/}|
|**Products** |Single or multiple Products to which to apply the Promotion Policy.<ul><li><b>Product</b>: Match Products by the name or names defined. </li><li><b>Tags</b>: Match Products by the tag or tags defined.</li></ul>{:/}|
|**Environments** |Single or multiple Environments to which to apply the Promotion Policy.<ul><li><b>Kind</b>: Match Environments by their type, either <b>Pre-production</b> or <b>Production</b>.</li><li><b> Environment</b>: Match Environments by the name or names defined.</li><li><b>Tags</b>: Match Environments by the tag or tags defined. </li></ul>{:/}|


### Create a Promotion Policy

##### Before you begin

* Create Promotion Workflows

##### How to
Create a Promotion Policy to validate an environment's readiness before promoting and deploying changes to a Product.  


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


* The Promotion Policy is added to the Promotion List. (NIMA: is the newest policy displayed first by default??)
* If there are multiple Promotion Policies that match the same Product or Environments, the order in which the Policies are listed determines which Promotion Policy is applied. 
The priority is in descending order. 
* The Match Promotion Policy allows you to select any Product and Environment pair and review the Promotion Policy associated with it. 


### Define priority for Promotion Policies
Define which Promotion Policy is applied to the Product/Environment when there is more than one Promotion Policy that matches the same Product or Environment combination. 

##### Before you begin
* If required, first [Match Promotion Policy to Products and Environments](#match-promotion-policy-to-products-and-environments)


##### How to
1. Drag and drop the Promotion Policy to the required position in the list.
1. Commit the changes to confirm.
 
 SCREENSHOT

### Evaluate Promotion Policy for Products and Environments 
Select a specific Product-Environment pair to match the Promotion Policy that will be applied for it. Codefresh matches the Promotion Policy with the highest priority for the selected combination. 

When there are multiple Promotion Policies for a Product or Environment, evaluating the Promotion Policy is valuable to review the policy that will be applied and potentially adjusting its priority as required.

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

Promotion Worflows are Argo CD Workflows you can run as part of a Promotion Policy to validate readiness of the current environment for promotion.

The Promotion Workflow runs steps that execute tests, validations, sends notifications of tests.

Create your own Promotion Workflows or use Codefresh's starter Workflow Template as your base.

Why define or create a Promotion Workflow?
Though they are optional, Promotion Workflows are designed to run tests before and after the promotion to ensure that
Staging Environment
Performance Testing
Production Environment 




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

SCREENSHOT

<!--- * Name and Description: Retrieved from workflow manifest. These are as defined when you added the Promotion Workflow or as updated in the manifest.
* Version: The version of the Promotion Workflow retrieved from the manifest. It should be manually updated whenever the workflow manifest is updated.
* Last Modified: The date and time when the workflow manifest was modified.
* Sync Status: The  -->


## Analyze Promotion Workflows

Clicking on a Promotion Workflow in the list takes you to the detailed view of the workflow manifest and workflow runs.

SCREENSHOT 

### Work with Workflow manifests

* Toggle between the Git State, Desired State, and Live State
* Diff View of all three states
* Edit mode for updates.
 Option to Run the Promotion Workflow and validate changes before committing them. 

* Analyze the workflow: Analyze each step in the workflow, including the Argo Events that triggered the pipeline
* View workflow logs: Real-time logs for ongoing workflows, and archived logs for completed workflows
* Manage the workflow: Retry, resubmit, or delete workflows

### View submitted Workflows

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
* **Logs**: View online logs for ongoing or completed Workflow, . As with logs in any standard terminal, you can copy/cut/paste log info. The commands differ based on the OS.
  * For an ongoing Workflow, view live logs for steps as they are being executed.  
  * For a completed Workflow, view logs for the Workflow, or for any step in the workflow.  

#### Step details
For additional information on the step, click the step to open the pull-out panel.
* The header displays the name of the step, its status, the step-type, the date of the most recent update, and duration.  
* The tabs displayed differ according to the step type:  
  * The Summary, Manifest, Containers, Inputs, Outputs tabs are displayed for all alomst all step types. (NIMA: what about Artifacts??)
  * The Logs tab is displayed for Pod step types.
  * Event-step types display Manifest, Summary, and Payload.
    For Cron and Unknown event types, only the Event Sources are shown. 



### Manage Promotion Workflows

Manage existing Promotion Workflows by modifying, copying, deleting them.

: Modify Workflow manifest settings. You must be in Git State to edit Workflow manifest.   

1. In the Codefresh UI, from Promotions in the sidebar, select [Promotion Workflows](https://g.codefresh.io/2.0/?????){:target="\_blank"}.
1. In the **Promotion Workflows** list, select the Promotion Workflow to copy/edit/delete.
1. Open the context menu, and select the required option. 

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|Edit  | Update manifest. Clicking Edit opens You must be in Git State to enable Edit. After updating the manifest, before committing changes you can Run the workflow. |
|Copy  | Copy existing workflow with a new Name, Description, and resource filename  |
|Delete  | Delete existing workflow. Deleting the workflow removes it from all the Promotion Policies it is assigned to or selected for. |

### Copy Promotion Workflow

### Edit Promotion Workflow

### Delete Promotion Workflow