---
title: "Home dashboard"
description: ""
group: dashboards
toc: true
---

Get a global picture of performance for GitOps entities, Argo Workflow entites, and pipelines in the Home dashboard. The Home dashboard is displayed when you log in to Codefresh, providing system-wide visualization for all stakeholders. 
 

The Home Dashboard includes three different dashboards:

* **GitOps Dashboard**  
  Displays a global overview of GitOps Runtimes, clusters managed by the Runtimes, deployment history, and most active applications. 

* **Argo Workflows Dashboard**  
  Displays aggregated metrics on Argo Workflows and Delivery Pipelines to identify trends.
 
 >**TIP**  
  The Argo Workflows dashboard is displayed only when pipelines with Argo Workflows are enabled for the account. 
  Go to [Pipeline Settings](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"}.  

* **Pipelines Dashboard**  
  Displays aggregated pipeline data for performance analysis, identification of bottlenecks, and trends.  



 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/home-dashboard-all.png" 
   url="/images/reporting/home-dashboard-all.png" 
   alt="Home dashboard: Global enterprise analytics" 
   caption="Home dashboard: Global enterprise analytics"
   max-width="70%" 
   %}
   



## GitOps Dashboard
Use the GitOps dashboard to:
1. Identify status of GitOps Runtimes and the clusters managed by the Runtimes
1. View deployment history for the date range
1. View the most active applications, and filter by cluster to which they are deployed
1. Go to the GitOps Apps dashboard to further analyze specific applications 

### Filters for GitOps Dashboard 

* **Time**  
  The date range filter is always active, and by default, shows data for the last seven days.   
* **Runtimes**  
  Select one or more GitOps Runtimes to focus on data by specific GitOps Runtimes.  

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/home-dashboard-gitops-filters.png" 
   url="/images/reporting/home-dashboard-gitops-filters.png" 
   alt="GitOps dashboard filters" 
   caption="Home dashboard filters"
   max-width="80%" 
   %}

###  GitOps Runtimes and Managed Clusters

Identify the health of the GitOps Runtimes and managed clusters in your enterprise.    
* Health status is displayed for both Hosted and Hybrid GitOps untimes.  
* Managed clusters are external clusters registered to GitOps Runtimes to which you deploy applications and managed resources.

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
|**Runtimes**             | {::nomarkdown} <ul><li><b>Healthy/Error</b>: The number of GitOps Runtimes, including Hosted, CLI Hybrid (legacy), and Helm Hybrid Runtimes. that are currently healthy and failed.  </li><li><b>View</b>: Click to go to the Runtimes page, List View. </li> </ul> {:/}|
|**Managed Clusters**    |{::nomarkdown} <ul><li><b>Status</b>: One of the following: <ul><li><b>Connected</b>: Argo CD can connect to and successfully deploy resources on the cluster.</li><li><b>Failed</b>: Argo CD cannot connect to the cluster because of authentication, networking, or other issues. </li> <li> <b>Unknown</b>: Argo CD has no information on the cluster as there are no resources deployed on the managed cluster.</li></ul><li><b>View</b>: Takes you to the List View of the Runtimes page with the list of runtime components. <br>To see the runtime's managed clusters, select the runtime.</li> </ul> {:/}|


### Deployments

View the deployment history for the selected date range, and the average number of successful, failed, rollback deployments for the selected granularity. 
Compare with the background period to identify trends.   

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
   alt="Applications in the GitOps Dashboard" 
   caption="Applications in the GitOps Dashboard"
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
Displays aggregated chart views for the selected date range, and insights into active Delivery Pipelines triggered from Workflows. An active Delivery Pipeline is one with at least one active or completed Argo Workflow. 

>If you can't see this dashboard, go to the [Pipeline Settings](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"}, and toggle **Enable pipelines with Argo Workflows** to ON.

Use the Argo Workflows dashboard to:  

1. Compare aggregrated data for the date range with the same data for the reference period to validate improvements and identify trends
1. Identify performance issues in specific Delivery Pipelines, both in terms of number of executions and execution duration
1. Drill down on a specific Delivery Pipeline for additional analysis 




> Delivery Pipeline data is shown for Hybrid GitOps Runtimes.



{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/home-dashboard-argo-workflows.png" 
   url="/images/reporting/home-dashboard-argo-workflows.png" 
   alt="Argo Workflows dashboard with Delivery Pipelines" 
   caption="Argo Workflows dashboard with Delivery Pipelines"
   max-width="80%" 
   %}

### Filters for Argo Workflows Dashboard 

* **Time**  
  The date range filter is always active, and by default, shows data for the last seven days.   
* **Runtimes**  
  Select one or more GitOps Runtimes to focus on data by specific GitOps Runtimes.  

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/home-dashboard-gitops-filters.png" 
   url="/images/reporting/home-dashboard-gitops-filters.png" 
   alt="GitOps dashboard filters" 
   caption="Home dashboard filters"
   max-width="80%" 
   %}

### Filters for Delivery Pipelines
Filters narrow the scope of data, allowing you to focus on the information you want to see. Unless otherwise indicated, all filters support multi-selection.


{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------|  
| **Status**               | {::nomarkdown}<ul><li><b>Succeeded</b>: Delivery Pipelines with workflows completed successfully.</li><li><b>Failed</b>: Delivery Pipelines with workflows that failed.</li><li><b>Error</b>: Delivery Pipelines with workflows that resulted in errors.</li></ul>{:/}|
| **Repository**           | The Git repository or repositories tracked, with the events that triggered or ran the pipelines. |                            
| **Branch**               | The pipeline or pipelines to filter by. |                            
| **Event Type**           |  The Git or Calendar event or events by which to view pipelines. If you select Git push, only those pipelines configured to be run on Git push are displayed.|                            
| **Initiator**            |The user who made the commit that triggered the event and caused the Delivery Pipeline to run.|


### Delivery Pipeline Metrics

KPI metrics for active Delivery Pipelines such as number of executions, duration, and success rates, are displayed as aggregated averages, day-by-day averages, and individual averages. 

**Delivery Pipeline metric displays**

* Aggregated averages
  These are the average percentages compared to the reference period, and indicate general trends. 
* Day-by-day averages
  Selecting an aggregated metric, displays the daily breakdown percentage in the line chart.
* Delivery Pipeline list
  The tables display granular metrics for individual Delivery Pipelines, organized by ten of the **Most Active** (number of executions), and ten of the **Longest** running (average duration) ones. 
  You can drill down on any Delivery Pipeline to go to the pipeline's dashboard with Step Analaytis, and details on the Workflows, Configuration, Manifests, and Update History.

**Delivery Pipeline metrics**

* **Success Rate**  
  The average number of Delivery Pipelines that completed execution successfully, in percentage.

* **Average Duration**
  The average length of time to complete execution of a Delivery Pipeline in mm:ss.
* **Executions**  
  The average number of times the Delivery Pipeline was triggered, in percentage.
* **Committers**
  The number of users whose commits to the repository or repositories triggered the Delivery Pipelines.  
  User count is aggregated per user, so multiple commits from the same user are counted as a single commit.



## Pipelines Dashboard

View and analyze pipeline performance, identify bottlenecks, and trends for your CI pipelines in the Pipelines dashboard.  
The dashboard displays aggregated data for pipelines, updated at 30-minute intervals. All stakeholders can get quick visibility into cross-project pipeline metrics.

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
Filters narrow the scope of aggregated data, allowing you to focus on the information you want to see.  
Unless otherwise indicated, all filters support multi-selection.

>**TIP**:
Different filter types have an AND relationship.


{: .table .table-bordered .table-hover}
|  Filter          |  Description|  
| --------------   | --------------|  
| **Date Range** | The time frame for which to view data. The date range affects the other filters. In addition to the predefined date ranges, you can select a custom date range up to the last six months. <br>If you select Today, then the Success Rate and Duration charts reflect hourly granularity.<br><br>Every date range you select has a reference period corresponding to the same period of time preceding the selected date range. The reference period is used to derive comparisons for trends.|
| **Project**           | The project or projects to which the pipeline belongs. Selecting a project allows you to focus on performance of pipelines assigned to it. If you starred one or more projects as favorites, clicking {::nomarkdown}<img src="../../../../images/icons/icon-fav-starred.png?display=inline-block">{:/}, filters pipelines by the selected projects.|                            
| **Pipeline**           | The pipeline or pipelines to filter by. <br>If you starred one or more pipelines as favorites, clicking {::nomarkdown}<img src="../../../../images/icons/icon-fav-starred.png?display=inline-block">{:/}, filters by those pipelines. |                            
| **Status**           | {::nomarkdown}<ul><li><b>Error</b>: Pipelines with builds that failed due to errors in the pipeline specifications or steps that failed. </li><li><b>Succeeded</b>: Pipelines with builds that completed successfully.</li> <li><b>Terminated</b>: Pipelines with builds terminated by the system according to the policy defined in the pipeline's settings. These can be any of these: <ul><li>Recent build from the same branch terminating all previous pipeline builds </li><li>Recent build from the specified branch terminating all previous builds from that branch</li><li>Running build terminating all running builds</li><li>Child builds terminated when the parent build is terminated.</li> </ul></li>For details, see <a href ="https://codefresh.io/docs/docs/pipelines/pipelines/#policies">Build Termination in Pipeline Policies</a>. </ul>{:/}|                            
| **Tags**             |The tag or tags assigned to the pipelines. | 
|{::nomarkdown}<img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Filter to view only projects or pipelines that have been starred as favorites in the [Projects/Pipeline pages]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#starring-projects-and-pipelines-as-favorites).<br><br>When you have starred projects or pipelines, the icon changes to {::nomarkdown}<img src="../../../../images/icons/icon-fav-starred.png?display=inline-block">.<br>Clicking it filters by favorite projects and pipelines. {:/} |   



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
| **Executions**  | The number of times that pipeline was triggered within the selected date range, with the comparison to the preceding (reference) date range in percentage.  |          
| **Duration (Avg/P-50/P-90)**        | The length of time for the pipeline to complete execution according to the duration measure selected in the Duration chart. The comparison percentage is to the preceding (reference) date range. |  


<br>

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
[Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/)  
[Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/)  


