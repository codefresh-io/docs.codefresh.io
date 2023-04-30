---
title: "Home dashboard"
description: ""
group: dashboards
toc: true
---

Get a global picture of performance for GitOps entities, Argo Workflow entites, and pipelines in the Home dashboard. The Home dashboard is displayed when you log in to Codefresh, providing system-wide visualization in real-time or near real-time for all stakeholders. 

The date range filter which is the   


The Home Dashboard  three different dashboards:

* **GitOps Dashboard**  
  Get a global overview of GitOps Runtimes, clusters managed by the Runtimes, deployments and applications in the GitOps dashboard. 

* **Argo Workflows Dashboard**  
  Get aggregated metrics on Argo Workflows and Delivery Pipelines, and identify trends.
 
 >**TIP**  
  The Argo Workflows dashboard is displayed only if you have enabled pipelines with Argo Workflows for the account. 
  See 

* **Pipelines Dashboard**  
  View and analyze pipeline performance, identify bottlenecks, and trends for your CI pipelines in the Pipelines dashboard.   
  The Pipelines dashboard displays aggregated pipeline data, updated at 30-minute intervals. All stakeholders can get quick visibility into cross-project pipeline metrics.

Set the date range as a global filter to define the scope of the data in the Home dashboard. 
 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/gitops-overview-dashboard.png" 
   url="/images/reporting/gitops-overview-dashboard.png" 
   alt="Home dashboard: Global enterprise analytics" 
   caption="Home dashboard: Global enterprise analytics"
   max-width="70%" 
   %}

## Global date range filter
Filter the view in the Home dashboard by the date range.

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/global-filters.png" 
   url="/images/reporting/global-filters.png" 
   alt="Home dashboard: Global filters" 
   caption="Home dashboard: Global filters"
   max-width="60%" 
   %}

## GitOps Dashboard
Use the GitOps dashboard to:
1. Identify status of GitOps Runtimes and the clusters managed by the Runtimes
1. View history of successful and failed deployments, and rollbacks to previous deployments
1. View the most active applications, filter by cluster to which they are deployed
1. Go to the GitOps Apps dashboard to further analyze the different applications 


###  GitOps Runtimes and Managed Clusters

Identify the health of the GitOps Runtimes and managed clusters in your enterprise.    
* Health status is displayed for both Hosted and Hybrid GitOps untimes.  
* Managed clusters are external clusters registered to GitOps Runtimes to which you deploy applications and -managed resources.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/runtimes-clusters-widgets.png" 
   url="/images/reporting/runtimes-clusters-widgets.png" 
   alt="Runtimes and Managed Clusters in the GitOps Dashboard" 
   caption="Runtimes and Managed Clusters in the GitOps Dashboard"
   max-width="80%" 
   %}

{: .table .table-bordered .table-hover}
| Item                    | Description   |
| ------------------------| ---------------- |
|**Runtimes**             | {::nomarkdown} <ul><li><b>Healthy vs Error</b>: The number of GitOps Runtimes that are currently healthy/failed, including Hosted, CLI Hybrid (legacy), and Helm Hybrid Runtimes.  </li><li><b>View</b>: Click to go to the Runtimes page, List View. </li> </ul> {:/}|
|**Managed Clusters**    |{::nomarkdown} <ul><li><b>Status</b>: One of the following: <ul><li><b>Connected</b>: Argo CD can connect to and successfully deploy resources on the cluster.</li><li><b>Failed</b>: Argo CD cannot connect to the cluster because of authentication, networking, or other issues. </li> <li> <b>Unknown</b>: Argo CD has no information on the cluster as there are no resources deployed on the managed cluster.</li></ul><li><b>View</b>: Takes you to the List View of the Runtimes page with the list of runtime components. <br>To see the runtime's managed clusters, select the runtime.</li> </ul> {:/}|


### Deployments

View the deployment history for the selected date range, and the average number of successful, failed, rollback deployments for the selected granularity. Identify trends compared to the background period.   

<!--- ask if to add here that only those changes that resulted in deployments are shown -->

 {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/deployments-widget.png" 
   url="/images/reporting/deployments-widget.png" 
   alt="Deployments in the GitOps Dashboard" 
   caption="Deployments in the GitOps Dashboard"
   max-width="70%" 
   %}

{: .table .table-bordered .table-hover}
| Item                    | Description   |
| ------------------------| ---------------- |
|**Daily/Weekly/Monthly** | Granularity for deployment views that affects the average number of deployments and the comparison to the reference period.|
|**Number and Comparison Average**            | The number on the top right is the number of successful/failed/rollback deployments for the selected granularity. The percentage is the comparison to the reference period, also for the selected granularity.   |
|**Successful**            | The number of deployments successfully deployed to the cluster per day, week, or month according to the selected granularity.   |
|**Failed Deployments**    | The number of deployments that failed and could not be deployed to the cluster, per day, week, or month according to the selected granularity.   |
|**Rollbacks**             | The number of deployments that were deployed to the cluster but had to be rolled back to a previously deployed version, per day, week, or month according to the selected granularity.   |



### Applications

Displays up to five of the most active applications and their current deployment status. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/applications-widget.png" 
   url="/images/reporting/applications-widget.png" 
   alt="Applications in the GitOps Overview dashboard" 
   caption="Applications in the GitOps Overview dashboard"
   max-width="70%" 
   %}

{: .table .table-bordered .table-hover}

| Item                    | Description   |
| ------------------------| ---------------- |
|**Filter**                | Filter applications by the clusters on which they are deployed, either by Cluster Name or by Cluster.    |
|**View**                  | Click to go to the GitOps Apps dashboard. See [Monitoring GitOps applications]({{site.baseurl}}}}docs/deployments/gitops/applications-dashboard)  |
|**Application Name**     | The name of the application, and the names of the GitOps Runtime and the cluster on which it is deployed. Click the name to drill down into the application in the GitOps Apps dashboard. |
|**Health status**         | The health status of the application, and can be either:{::nomarkdown}<ul><li>Healthy (green): The application is running on the cluster.</li><li>Degraded (red): The application failed to run.</li> <li>Rollback (yellow): There was a rollback to the previously deployed version.</li></ul> To see the breakdown by health status, mouse over the chart. <br> The number at the end of the bar is the total number of deployments for the application, and the percentage indicates the overall decrease or increase compared to the reference period. {:/}  |


## Argo Workflows Dashboard
Displays all active Delivery Pipelines for the selected date range, providing insights into trends for these Delivery Pipelines.  Active Delivery Pipelines are those with at least one active or completed Argo Workflow. 

>If you can't see this dashboard, go to the Pipeline Settings and enable.

Use the Argo Workflows dashboard to:  

1. Identify performance issues in Delivery Pipelines, both in terms of number of executions and execution duration
1. Drill down on a specific Delivery Pipeline 
1. Validate improvements by comparing current metrics to those in the reference time period
1. Ensure that you are meeting defined SLAs


> Delivery Pipeline data is shown for Hybrid GitOps Runtimes.



{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/delivery-pipeline-widget.png" 
   url="/images/reporting/delivery-pipeline-widget.png" 
   alt="Delivery Pipelines in the Argo Work dashboard" 
   caption="Delivery Pipelines in the Home dashboard"
   max-width="80%" 
   %}


### Filters for Delivery Pipelines
Filters narrow the scope of aggregated data, allowing you to focus on the information you want to see. Unless otherwise indicated, all filters support multi-selection.


The filters available to focus on the pipelines of interest:<li><b>Repository</b>: The Git repository or repositories tracked, with the events that triggered or ran the pipelines.</li><li><b>Event Type</b>: The Git or Calendar event or events by which to view pipelines. If you select Git push, only those pipelines configured to be run on Git push are displayed.</li> <li><b>Initiator</b>: The user who made the commit that triggered the event and caused the pipeline to run.</li></ul>{:/} 
{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------|  
| **Status** | {::nomarkdown}<ul><li><b>Status</b>:<ul><li>Succeeded: Delivery Pipelines with workflows completed successfully.</li><li>Failed: Delivery Pipelines with workflows that failed.</li><li>Error: Delivery Pipelines with workflows that resulted in errors.</li></ul>|
| **Repository**           | The Git repository or repositories tracked, with the events that triggered or ran the pipelines. |                            
| **Branch**           | The pipeline or pipelines to filter by. |                            
| **Event Type**           |  The Git or Calendar event or events by which to view pipelines. If you select Git push, only those pipelines configured to be run on Git push are displayed.|                            
| **Initiator**             |The user who made the commit that triggered the event and caused the Delivery Pipeline to run.|
{: .table .table-bordered .table-hover}

### Delivery Pipeline Metrics

KPIs for Delivery Pipelines are displayed in line charts and in tables. 

For line charts, to see detailed day-to-day values, select a line chart.  

In the tables, Delivery Pipelines are organized by the **Most Active** (number of executions), and by the **Longest** running (average duration) KPIs. Each table shows up to ten Delivery Pipelines.

They include:  

* **Success Rate**  
  The average number of successful executions, in percentage.

* **Average Duration**
  The average length of time to complete execution of a Delivery Pipeline in mm:ss.
* **Executions**  
  The average number of times the Delivery Pipeline was triggered, in percentage.
* **Committers**
  The number of users whose commits to the repository or repositories triggered the Delivery Pipelines.  
  User count is aggregated per user, so multiple commits from the same user are counted as a single commit.



## Pipelines Dashboard

Use the Pipelines dashboard to:
1. Identify performance issues in pipelines, both in terms of number of executions and execution duration
1. Identify spikes in specific pipelines
1. Focus on the performance of a specific pipeline, or pipelines in a specific project
1. Validate improvements by comparing current metrics to those in the reference time period
1. Ensure that you are meeting defined SLAs


{% include image.html
  lightbox="true"
  file="/images/pipeline/dashboard/pipeline-dashboard.png"
  url="/images/pipeline/dashboard/pipeline-dashboard.png"
  alt="Pipelines dashboard"
  caption="Pipelines dashboard"
  max-width="60%"
    %} 



### Filters for pipelines
Filters narrow the scope of aggregated data, allowing you to focus on the information you want to see. Unless otherwise indicated, all filters support multi-selection.

{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------|  
| **Date Range** | The time frame for which to view data. The date range affects the other filters. In addition to the predefined date ranges, you can select a custom date range up to the last six months. <br>If you select Today, then the Success Rate and Duration charts reflect hourly granularity.<br><br>Every date range you select has a reference period corresponding to the same period of time preceding the selected date range. The reference period is used to derive comparisons for trends.|
| **Project**           | The project or projects to which the pipeline belongs. Selecting a project allows you to focus on performance of pipelines assigned to it.|                            
| **Pipeline**           | The pipeline or pipelines to filter by. |                            
| **Status**           | {::nomarkdown}<ul><li><b>Error</b>: Pipelines with builds that failed due to errors in the pipeline specifications or steps that failed. </li><li><b>Succeeded</b>: Pipelines with builds that completed successfully.</li> <li><b>Terminated</b>: Pipelines with builds terminated by the system according to the policy defined in the pipeline's settings. These can be any of these: <ul><li>Recent build from the same branch terminating all previous pipeline builds </li><li>Recent build from the specified branch terminating all previous builds from that branch</li><li>Running build terminating all running builds</li><li>Child builds terminated when the parent build is terminated.</li> </ul></li>For details, see <a href ="https://codefresh.io/docs/docs/pipelines/pipelines/#policies">Build Termination in Pipeline Policies</a>. </ul>{:/}|                            
| **Tags**             |The tag or tags assigned to the pipelines. |      



### Pipeline success rate
The pipelines that completed execution successfully, from the total number of pipelines executed within the selected date range, as percentage. 
> TIP:  
  Pipelines in Pending status are excluded from the Success Rate calculations.



### Pipeline duration
The time it takes for a pipeline workflow to complete the build, calculated from the total number of pipelines executed within the selected date range, unless you apply additional filters. 
You can switch between average (the default), and percentile views. 

**Duration as average or percentile**  
The average duration calculation shows the duration across all the pipelines within the selected date range. 
To better understand the performance over time, switch to duration by the median (P-50) or the 90th (P-90) percentiles. 

The comparison percentage is derived from the reference time period. The reference period corresponds to the same length of time that  preceding the date range selected. <br>

**Pipeline duration breakdown**  
Every pipeline workflow can be divided into phases, some of which apply to all pipelines, while others depend on the settings configured for each pipeline. The initialization phase is common to all pipelines. Other phases such as pending approval to continue execution, and pending execution due to concurrency limits depends on the settings.

>TIP:  
 Each phase is color-coded for easy visualization. To show/hide phases in the chart, click the name of the phase in the legend. 
 
{% include image.html
  lightbox="true"
  file="/images/pipeline/dashboard/duration-all-stages-versus-selected.png"
  url="/images/pipeline/dashboard/duration-all-stages-versus-selected.png"
  alt="Pipeline duration with all phases displayed versus selected only"
  caption="Pipeline duration with all phases displayed versus selected only"
  max-width="60%"
    %} 

* **Pending approval**  
    The average duration of pipelines pending manual approval to continue workflow execution.  

*  **Running**  
  The average duration of pipeline workflows in running state.
  
*  **Initializing**  
  The average duration of pipeline workflows in the initialization phase.  

*  **Pending concurrency policy**  
  The average duration of pipeline workflows pending execution due to the concurrency limits configured for the pipelines. Workflows with pipeline, trigger, and branch concurrency limits are included in the calculation.
  >Pipeline workflows pending execution due to concurrency policies are affected by the global account or pipeline's settings for Pending approval.
                         
*  **Delayed due to license limit**  
  The pipeline workflows pending execution due to the license limits configured for your account.  




### Pipeline performance metrics
Performance metrics for individual pipelines for the current and preceding time frames provide more insights and identify trends for pipelines. 

* The list view shows pipelines sorted by average workflow build duration (default sort). 
* The scatter chart shows all the pipelines, charted by number of executions (X-axis) versus duration (Y-axis). Every dot represents a pipeline. 

The list view shows the following information.

{: .table .table-bordered .table-hover}
|  Metric               |  Description|  
| --------------        | --------------|  
| **Pipeline Name**      | A pipeline name prefixed with this {::nomarkdown}<img src="../../../../images/icons/error.png" display=inline-block">{:/} icon indicates that it has been deleted. |    
| **Project Name**      | The project to which the pipeline belongs. |                            
| **Executions**  | The number of times that pipeline was triggered within the selected date range, with the comparison to the preceding date range in percentage.  |          
| **Duration (Avg/P-50/P-90)**        | The length of time for the pipeline to complete execution according to the duration measure selected in the Duration chart. The comparison percentage is to the preceding date range. |  



**Correlate scatter chart with list view**  

Identify outliers in terms of executions and duration in the scatter chart map, and correlate with the list view. For example, a pipeline with more than 174 executions, that always exceeds 2 minutes in duration, can indicate potential for improvements.

* Clicking the dot that represents that pipeline in the scatter chart, changes the list view to show that and other pipelines with similar number of executions and duration.
* Clicking a row in the metrics table highlights the dot in the scatter chart that corresponds to that pipeline.

{% include image.html
  lightbox="true"
  file="/images/pipeline/dashboard/pipeline-performance-correlation.png"
  url="/images/pipeline/dashboard/pipeline-performance-correlation.png"
  alt="Pipeline correlation in Metrics table with scatter chart"
  caption="Pipeline correlation in Metrics table with scatter chart"
  max-width="60%"
    %} 

You can then filter by the specific pipeline or pipelines and analyze success rate, overall, and phase-level duration.   

## Related articles
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  
[Monitoring applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/)  


