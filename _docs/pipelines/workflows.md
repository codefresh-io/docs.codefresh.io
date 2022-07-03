


Monitor workflows for all delivery pipelines in the Workflows dashboard, or monitor and manage workflows within the context of a specific delivery pipeline.  
Drill down into a workflow to analyze each step in the workflow, including the Argo-Event steps that triggered the pipeline, view workflow logs, and manage the workflow based on the status. 

 {% include image.html 
  lightbox="true" 
  file="/images/workflows/workflow-dashboard.png" 
  url="/images/workflows/workflow-dashboard.png"
  alt="Workflows Dashboard"
  caption="Workflows Dashboard"
  max-width="40%"
  %}



### Workflows dashboard
The Workflows dashboard is to continuous integration what the Applications dashboard is to continuous delivery. The dashboard shows all _active_ workflows across all delivery pipelines.  

Here's an example of the Workflows dashboard with different workflow statuses.

  {% include image.html 
  lightbox="true" 
  file="/images/workflows/workflow-dashboard-all-status.png" 
  url="/images/workflows/workflow-dashboard-all-status.png"
  alt="Workflows Dashboard with workflow statuses"
  caption="Workflows Dashboard workflow statuses"
  max-width="40%"
  %}


**Filters**  
Use the global filters to view a subset of workflows.   
To focus on workflows in the context of one or more delivery pipelines, select **More filters** and then select one more delivery pipelines. When you then drill down to the workflow details, you can also see the pipeline configuration, manifests and setup details in the same location.

**Workflow chart**  
The bar-chart shows the workflows submitted in the last seven days, including today. Workflows submitted most recently are added to the end.
* Color-coded bars identify workflow status at a glance. In the example above, blue bars indicate workflows that are currently active. Purple bars indicate workflows without events for the last hour (Unknown) status.
* Mouse over to see the tooltip for the workflow, including a link to **View workflow details** to drill down into the workflow.

**Workflow cards**
Every card has additional details on the workflow. Successfully completed workflows display Git and Jira information. The **View workflow details** link opens the interactive tree view of the workflow, where you can analyze steps, and manage the workflow according to its status.  

Drill down into a workflow to: 

* Analyze the workflow: Analyze each step in the workflow, including the Argo Events that triggered the pipeline
* View workflow logs: Real-time logs for ongoing workflows, and archived logs for completed workflows
* Manage the workflow: Retry, resubmit, or delete workflows

> To view the workflow in the context of its delivery pipeline, first select the pipeline.

### Select the workflow to monitor** 
Select a workflow from the Workflows dashboard, or first  
1. From the [Workflows dashboard](https://g.codefresh.io/2.0/workflows), select **View workflow details** on the right.
  OR  
  In the [Delivery Pipelines](https://g.codefresh.io/2.0/pipelines) page, select a pipeline.
  Select the workflow, and then select **View workflow details** on the right.

   {% include image.html 
  lightbox="true" 
  file="/images/workflows/workflow-drill-down.png" 
  url="/images/workflows/workflow-drill-down.png"
  alt="View Workflow Details"
  caption="View Workflow Details"
  max-width="30%"
  %}
  

**Workflow list for delivery pipeline**
Here's an example of the list of workflows on selecting a delivery pipeline (Workflows tab).

   {% include image.html 
  lightbox="true" 
  file="/images/pipeline/monitoring/monitor-workflows-tab.png" 
  url="/images/pipeline/monitoring/monitor-workflows-tab.png"
  alt="Workflow-level view in Delivery Pipeline"
  caption="Workflow-level view for Delivery Pipeline"
  max-width="30%"
  %}

The table describes the information.

| Legend        |  Description|  
| --------------| -------------|  
| **1**         | The filters available to customize the workflow view for the pipeline. The filters are identical to those available for the [aggregated view]({{site.baseurl}}/docs/pipelines/managing-pipelines/#filters-for-aggregated-views). In this view, in addition to the predefined time ranges, you can select a custom time range.  |                             
| **2**         | The bar chart with the duration and status of all workflows submitted for the pipeline, starting with the most oldest. The color of the bar indicates if the workflow it represents is in progress (blue), completed successfully (green), or failed (red). Mouse over the bar to see a pop-up of workflow-specific information (see image below entitled, Pop-up with workflow metadata).  |          
| **3**  | Workflow-specific information, similar to what you see in the bar chart pop-ups. You can see the git hash, the name of the user who made the commit, the pipeline that submitted the workflow, the start time and duration.|       
| **4**| Selecting **View Workflow Details** shows options to monitor and manage workflows, including viewing workflow logs.| 


   {% include image.html 
  lightbox="true" 
  file="/images/pipeline/monitoring/monitor-workflows-tab-popup.png" 
  url="/images/pipeline/monitoring/monitor-workflows-tab-popup.png"
  alt="Pop-up with workflow metadata"
  caption="Pop-up with workflow metadata"
  max-width="30%"
  %}

#### Analyze steps in workflows
View the connection between steps in the workflow, the status of each step, and additional information for the step. View subsets of steps in the workflow using filters.

* Visualize the entire flow of the pipeline, starting with the Argo Events that triggered the workflow, followed by the steps in the workflow itself. 

* View detailed information on a step in a convenient pull-out panel. Easily copy paths for attributes from event payloads, view logs for pods, and download artifacts.


**How to**
1. Select the [workflow](#select-the-workflow-to-monitor). 
  You can see all the steps in the selected workflow. Every step has a status indication.
  Event-type steps have labels within the step to differentiate them from workflow steps.
  
   {% include image.html 
  lightbox="true" 
  file="/images/workflows/workflow-steps.png" 
  url="/images/workflows/workflow-steps.png"
  alt="Workflow steps"
  caption="Workflow steps"
  max-width="30%"
  %}

  {% include image.html 
  lightbox="true" 
  file="/images/workflows/argo-events-in-wrkflow.png" 
  url="/images/workflows/argo-events-in-wrkflow.png"
  alt="Argo Event steps in workflow"
  caption="Argo Event steps in workflow"
  max-width="30%"
  %}

{:start="2"}
1. To display a subset of steps in the workflow, set filters.

 {% include image.html 
  lightbox="true" 
  file="/images/workflows/filters-workflow-steps.png" 
  url="/images/workflows/filters-workflow-steps.png"
  alt="Filters for workflow steps"
  caption="Filters for workflow steps"
  max-width="30%"
  %}

{:start="2"}
1. To view additional information for a step, select the step.

  The header displays the name of the step, followed by the step-type, the date of the most recent update, and its duration.  
  The tabs displayed differ according to the step type:  

  * Almost all workflow step types show the Summary, Manifest, Containers, Inputs, Outputs. 
  * Pod step-types also display the Logs tab.
  * Event-step types show Manifest, Summary and Payload.
    > For Cron and Unknown event types, only the Event Sources are shown. 
  
  Example: event-source manifest

  {% include image.html 
  lightbox="true" 
  file="/images/workflows/event-source.png" 
  url="/images/workflows/event-source.png"
  alt="Event source manifest in workflow"
  caption="Event source manifest in workflow"
  max-width="30%"
  %}

  Example: event-payload

 {% include image.html 
  lightbox="true" 
  file="/images/workflows/event-payload.png" 
  url="/images/workflows/event-payload.png"
  alt="Event payload in workflow"
  caption="Event source in workflow"
  max-width="30%"
  %}

 Example: pod step-type

 {% include image.html 
  lightbox="true" 
  file="/images/workflows/workflow-pod-step.png" 
  url="/images/workflows/workflow-pod-step.png"
  alt="Pod step type in workflow"
  caption="Pod step type in workflow"
  max-width="30%"
  %}

#### View logs for workflows

View logs for ongoing or completed workflows. As with logs in any standard terminal, you can copy/cut/paste log info. The commands differ based on the OS.

* For ongoing workflows, you can also see live logs for steps in the workflow as they are being executed.  
* For completed workflows, you can view logs for any step in the workflow.  

> To view logs for completed workflows, you must configure an artifact repository in CSDP to archive them. 

**Before you begin**  
[Configure an artifact repository]({{site.baseurl}}/docs/pipelines/configure-artifact-repository/)  

**How to**  
1. Select the [workflow](#select-the-workflow-to-monitor). 
1. Filter by **Node Type** of **Pods**, and then select a step to view its logs.

 {% include image.html 
  lightbox="true" 
  file="/images/workflows/view-logs-pull-out.png" 
  url="/images/workflows/view-logs-pull-out.png"
  alt="Event payload in workflow"
  caption="Event source in workflow"
  max-width="30%"
  %}


OR

1. In the Workflows tab, select **Logs**.
1. From the **Select Step (Pod)** dropdown, do one of the following:
  * To view live logs for an ongoing workflow, select **All**.
  * To view archived logs for a completed workflow, select the step and from the **Select Container** dropdown, select the container. 

  {% include image.html 
  lightbox="true" 
  file="/images/workflows/view-logs-logs-tab.png" 
  url="/images/workflows/view-logs-logs-tab.png"
  alt="Event payload in workflow"
  caption="Event source in workflow"
  max-width="30%"
  %}

1. If needed, copy/cut/paste log details. Refer to the table below for help on commands compatible with your OS.


{: .table .table-bordered .table-hover}
|OS/terminal emulator|Cut             |Copy           |Paste    | 
| --------------     | -----          | -----------   | --------| 
| **Apple**          | `Command`+`X`                      | `Command`+`C`                      | `Command`+`V`                    |                            
| **Windows/ GNOME/KDE**| `Control`+`X` or `Shift`+`Delete`| `Control`+`C` or `Control`+`Insert`| `Control`+`V` or `Shift`+`Insert`|   
| **GNOME/KDE terminal emulators**|N/A|`Control`+`Shift`+`C` or `Control`+`Insert`| `Control`+`Shift`+`V` or `Control`+`Shift`+`Insert`; (to paste selected text `Shift`+`Insert` or middle mouse button) |         

#### Manage workflows 
Based on the status of the workflow, retry, resubmit, or delete the workflow.
* **Retry** a workflow to restart the same workflow. You may want to retry a failed workflow, and retry end-to-end testing steps for example.  
  The retry option is available only for workflows with errors.
* **Resubmit** a workflow to create a new workflow and submit it. You can resubmit both successfully completed and failed workflows.
* **Delete** unused or legacy workflows. Deleting a workflow removes it from the pipeline's workflow list and from the Workflows dashboard.

**How to**
1. Select the [workflow](#select-the-workflow-to-monitor). 
1. To restart a failed workflow, select **Retry**.

{% include image.html 
  lightbox="true" 
  file="/images/workflows/retry-workflow.png" 
  url="/images/workflows/retry-workflow.png"
  alt="Retry workflow"
  caption="Retry workflow"
  max-width="50%"
  %

{:start="3"}
1. To start a new instance of the workflow, select **Resubmit**.

{% include image.html 
  lightbox="true" 
  file="/images/workflows/resubmit-workflow.png" 
  url="/images/workflows/resubmit-workflow.png"
  alt="Resubmit workflow"
  caption="Resubmit workflow"
  max-width="50%"
  %

{:start="4"}
1. To delete the workflow, select **Delete**.

  {% include image.html 
  lightbox="true" 
  file="/images/workflows/delete-workflow.png" 
  url="/images/workflows/delete-workflow.png"
  alt="Delete workflow"
  caption="Delete workflow"
  max-width="50%"
  %}