



## Promotion Workflows



Promotion Worflows are Argo CD Workflows you can run as part of a Promotion Policy to validate readiness of the current environment for promotion. 




For a Promotion Policy, you can configure Promotion Workflows as Pre- or Post-Action workflows, mhe Promotion Workflow runs steps that execute tests, validations, sends notifications of tests.

Create your own Promotion Workflows from scratch, use  Codefresh's starter Workflow Template as your base, or any one of the predefined Workflow Trmplates.


Why define or create a Promotion Workflow?
Though they are optional, Promotion Workflows are designed to run tests before and after the promotion to ensure that
Staging Environment
Performance Testing
Production Environment 





You can create a Promotion Workflow in the Codefresh UI from scratch, use the skeleton as the base template, or use a predefined Workflow Template.
Codefresh adds three annotation attributes to the workflow used internally to ???
If you create your own workflow, Codefresh automatically adds the annotation attributes to the YAML file.

Once you create the Workflow, you can run it to validate and verify settings and that it does what it is expected to do.

In the Workflows list, you can analyze the workflow manifest, see workflow runs, associating it with the product or environment it was run for.
Deep dive into the workflow details to see teh actual steps in the workflow and manage the workflow.

Whatever you do in he Promotion Workflows 




## Workflow Templates
Codefresh provides a starter template
You can use any of the Argo template types that define the required 

we recommend using our base starter template because it includes predefined annotations that.
If you create your own template, does CF add these annotations?



### Create Promotion Workflows

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
1. Make the updates needed.
1. Commit the changes.

When the YAML file is synced to the cluster, it is displayed in the Promotion Workflows list.

SCREENSHOT

* Name and Description: Retrieved from workflow manifest. These are as defined when you added the Promotion Workflow or as updated in the manifest.
* Version: The version of the Promotion Workflow retrieved from the manifest. It should be manually updated whenever the workflow manifest is updated.
* Last Modified: The date and time when the workflow manifest was modified.
* Sync Status: The  


## Analyze instances of Promotion Workflow submissions



Clicking on a Promotion Workflow in the list takes you to the detailed view of the workflow manifest and workflow runs.
Workflow runs are indiviudal instances of workflow execution. 



SCREENSHOT 

## Work with Workflow manifests

* Toggle between the Git State, Desired State, and Live State
* Diff View of all three states
* Edit mode for updates.
 Option to Run the Promotion Workflow and validate changes before committing them. 

* Analyze the workflow: Analyze each step in the workflow, including the Argo Events that triggered the pipeline
* View workflow logs: Real-time logs for ongoing workflows, and archived logs for completed workflows
* Manage the workflow: Retry, resubmit, or delete workflows

## View submitted Workflows

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


## Workflow steps as part of Product release

## Assign workflows to promotion policys