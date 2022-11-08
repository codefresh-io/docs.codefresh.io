---
title: "Home dashboard"
description: ""
group: reporting
toc: true
---

Get a global picture of runtimes, managed clusters, deployments, and pipelines in the Home dashboard. The Home dashboard is displayed when you log in to Codefresh, providing system-wide visualization in real-time.  

Global filters allow you to narrow the scope of the data, and  drill down into specific entities for more details.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/home-dashboard.png" 
   url="/images/reporting/home-dashboard.png" 
   alt="Home dashboard: Global enterprise analytics" 
   caption="Home dashboard: Global enterprise analytics"
   max-width="70%" 
   %}

### Global filters
Filter the view in the Home dashboard by runtimes and date range.

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/global-filters.png" 
   url="/images/reporting/global-filters.png" 
   alt="Home dashboard: Global filters" 
   caption="Home dashboard: Global filters"
   max-width="60%" 
   %}

### Runtimes and Managed Clusters

Identify the health of the runtimes and managed clusters in your enterprise.  
Health status is displayed for both hosted (if you have Hosted GitOps), and hybrid runtimes.  

Managed clusters are external clusters registered to runtimes to which you deploy applications and GitOps-managed resources.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/runtimes-clusters-widgets.png" 
   url="/images/reporting/runtimes-clusters-widgets.png" 
   alt="Runtimes and Managed Clusters in the Home dashboard" 
   caption="Runtimes and Managed Clusters in the Home dashboard"
   max-width="80%" 
   %}

{: .table .table-bordered .table-hover}
| Item                    | Description   |
| ------------------------| ---------------- |
|**Runtimes**             | Identify failed runtimes.|
|**Managed Clusters**    |{::nomarkdown} <ul><li><b>Status</b>: One of the following: <ul><li><b>Connected</b>: Argo CD is able to connect and successfully deploy resources to the cluster.</li><li><b>Failed</b>: Argo CD is unable to connect to the cluster because of authentication, networking, or other issues. </li> <li> <b>Unknown</b>: Argo CD has no information on the cluster as there are no resources deployed to the managed cluster.</li></ul><li><b>View</b>: Click to go to the Runtimes page. <br>To see the runtime's managed clusters, select the runtime.</li> </ul> {:/}|


### Deployments

Identify trends for deployments.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/deployments-widget.png" 
   url="/images/reporting/deployments-widget.png" 
   alt="Deployments in the Home dashboard" 
   caption="Deployments in the Home dashboard"
   max-width="70%" 
   %}

{: .table .table-bordered .table-hover}
| Item                    | Description   |
| ------------------------| ---------------- |
|**Daily/Weekly/Monthly** | Granularity for deployment views that affects the average number of deployments and the comparison to the reference period.|
|**Number and Comparison Average**            | The number on the top right is the number of successful/failed/rollback deployments for the selected granularity. The percentage is the comparison to the reference period, also for the selected granularity.   |
|**Successful**            | The number of successful deployments per day, week, or month according to the selected granularity.   |
|**Failed Deployments**    | The number of successful deployments per day, week, or month according to the selected granularity.   |
|**Rollbacks**             | The number of successful deployments per day, week, or month according to the selected granularity.   |



### Applications

Displays up to five of the most active applications and their current deployment status. 

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/applications-widget.png" 
   url="/images/reporting/applications-widget.png" 
   alt="Applications in the Home dashboard" 
   caption="Applications in the Home dashboard"
   max-width="70%" 
   %}

{: .table .table-bordered .table-hover}

| Item                    | Description   |
| ------------------------| ---------------- |
|**Filter**                | Filter applications by the cluster on which they are deployed.    |
|**View**                  | Click to go to the Applications dashboard. See   |
|**Application Name**     | The name of the application, and the names of the runtime and cluster on which it is deployed. Click the name to drill down into the application in the Applications dashboard. |
|**Health status**         | The health status of the application, and can be either:{::nomarkdown}<ul><li>Healthy (green): The application is running on the cluster.</li><li>Degraded (red): The application failed to run.</li> <li>Rollback (yellow): There was a rollback to the previously deployed version.</li></ul> To see the breakdown by health status, mouse over the chart. <br> The number at the end of the bar is the total number of deployments for the application, with the overall decrease or increase compared to the reference period. {:/}  |



### Delivery Pipelines 

> Delivery Pipline data is shown for hybrid enviroments.

Displays all active pipelines for the selected date range, providing insights into trends for pipelines.  Active pipelines are those with at least one active or completed workflow.  
Analytics are derived by comparing the selected date range to the corresponding reference period. If your date range is the last seven days, the reference period is the seven days that precede the date range.

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/delivery-pipeline-widget.png" 
   url="/images/reporting/delivery-pipeline-widget.png" 
   alt="Delivery Pipelines in the Home dashboard" 
   caption="Delivery Pipelines in the Home dashboard"
   max-width="80%" 
   %}

{: .table .table-bordered .table-hover}

| Item                    | Description   |
| ------------------------| ---------------- |
|**Pipelines**            | The number prefixed to the pipeline name indicates the change in position of the pipeline compared to the reference period. To drill down into a specific pipeline, click the pipeline.|
|**Filter**               | The filters available to focus on the pipelines of interest:{::nomarkdown}<ul><li><b>Status</b>:<ul><li>Succeeded: Pipelines with workflows completed successfully.</li><li>Failed: Pipelines with workflows that failed.</li><li>Error: Pipelines with workflows that resulted in errors.</li></ul><li><b>Repository</b>: The Git repository or repositories tracked, with the events that triggered or ran the pipelines.</li><li><b>Event Type</b>: The Git or Calendar event or events by which to view pipelines. If you select Git push, only those pipelines configured to be run on Git push are displayed.</li> <li><b>Initiator</b>: The user who made the commit that triggered the event and caused the pipeline to run.</li></ul>{:/} |
|**View**                  | Click to go to the Delivery Pipelines dashboard.    |
|**KPI Averages**         | KPI averages for: {::nomarkdown}<ul><li>Success Rate: The average number of successful executions, in percentage.</li><li>Average Duration: The average length of time to complete execution, in mm:ss.</li> <li>Executions: The average number of times the pipeline was triggered, in percentage.</li><li>Committers: The number of users whose commits on the repository or repositories triggered the pipelines. User count is aggregated per user, so multiple commits from the same user are counted as a single commit.</li></ul> To see detailed day-to-day values, select a line chart.{:/}|
|**Most Active Delivery Pipelines**      | Up to ten pipelines with the highest number of executions. The same KPIs are displayed, and compared to those in the reference period. |
|**Longest Delivery Pipelines**      | Up to ten pipelines with the longest duration. The same KPIs are displayed, and compared to those in the reference period.  |

### Related articles
[DORA metrics]({{site.baseurl}}/docs/reporting/dora-metrics/)  
[Monitoring applications]({{site.baseurl}}/docs/deployment/applications-dashboard/)  
[Images in Codefresh]({{site.baseurl}}/docs/deployment/images/)  


