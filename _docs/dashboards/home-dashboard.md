---
title: "GitOps Overview dashboard"
description: ""
group: dashboards
toc: true
---

Get a global picture of runtimes, managed clusters, deployments, and applications in the GitOps Overview dashboard. Get system-wide visualization in real-time for GitOps.  

Global filters allow you to narrow the scope of the data, and drill down into specific entities for more details.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/gitops-overview-dashboard.png" 
   url="/images/reporting/gitops-overview-dashboard.png" 
   alt="GitOps Overview dashboard: Global enterprise analytics for GitOps" 
   caption="GitOps Overview dashboard: Global enterprise analytics for GitOps"
   max-width="70%" 
   %}

### Global filters
Filter the view in the GitOps Overview dashboard by runtimes and date range.

{% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/global-filters.png" 
   url="/images/reporting/global-filters.png" 
   alt="GitOps Overview dashboard: Global filters" 
   caption="GitOps Overview dashboard: Global filters"
   max-width="60%" 
   %}

### Runtimes and Managed Clusters

Identify the health of the runtimes and managed clusters in your enterprise.  
Health status is displayed for both Hosted (if you have Hosted GitOps), and Hybrid runtimes.  

Managed clusters are external clusters registered to runtimes to which you deploy applications and GitOps-managed resources.

 {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/runtimes-clusters-widgets.png" 
   url="/images/reporting/runtimes-clusters-widgets.png" 
   alt="Runtimes and Managed Clusters in the GitOps Overview dashboard" 
   caption="Runtimes and Managed Clusters in the GitOps Overview dashboard"
   max-width="80%" 
   %}

{: .table .table-bordered .table-hover}
| Item                    | Description   |
| ------------------------| ---------------- |
|**Runtimes**             | Identify failed runtimes.|
|**Managed Clusters**    |{::nomarkdown} <ul><li><b>Status</b>: One of the following: <ul><li><b>Connected</b>: Argo CD is able to connect and successfully deploy resources to the cluster.</li><li><b>Failed</b>: Argo CD is unable to connect to the cluster because of authentication, networking, or other issues. </li> <li> <b>Unknown</b>: Argo CD has no information on the cluster as there are no resources deployed to the managed cluster.</li></ul><li><b>View</b>: Click to go to the Runtimes page. <br>To see the runtime's managed clusters, select the runtime.</li> </ul> {:/}|


### Deployments

Identify trends for deployments.

<!--- ask if to add here that only those changes that resulted in deployments are shown -->

 {% include 
   image.html 
   lightbox="true" 
   file="/images/reporting/deployments-widget.png" 
   url="/images/reporting/deployments-widget.png" 
   alt="Deployments in the GitOps Overview dashboard" 
   caption="Deployments in the GitOps Overview dashboard"
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
   alt="Applications in the GitOps Overview dashboard" 
   caption="Applications in the GitOps Overview dashboard"
   max-width="70%" 
   %}

{: .table .table-bordered .table-hover}

| Item                    | Description   |
| ------------------------| ---------------- |
|**Filter**                | Filter applications by the cluster on which they are deployed.    |
|**View**                  | Click to go to the Applications dashboard. See   |
|**Application Name**     | The name of the application, and the names of the runtime and cluster on which it is deployed. Click the name to drill down into the application in the Applications dashboard. |
|**Health status**         | The health status of the application, and can be either:{::nomarkdown}<ul><li>Healthy (green): The application is running on the cluster.</li><li>Degraded (red): The application failed to run.</li> <li>Rollback (yellow): There was a rollback to the previously deployed version.</li></ul> To see the breakdown by health status, mouse over the chart. <br> The number at the end of the bar is the total number of deployments for the application, with the overall decrease or increase compared to the reference period. {:/}  |





### Related articles
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  
[Monitoring applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Images in Codefresh]({{site.baseurl}}/docs/dashboards/images/)  


