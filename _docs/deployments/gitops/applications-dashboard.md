---
title: "Monitoring GitOps applications"
description: ""
group: deployments
sub_group: gitops
toc: true
---

Monitor applications across clusters, and the deployments, resources, and services for an application in the GitOps Apps dashboard. As a one-stop shop for Argo Rollouts and Argo CD, the GitOps Apps dashboard in Codefresh delivers on the challenge of keeping track of your applications and their deployments, whatever the frequency and scale, across all clusters in your enterprise. A wide range of filters, progressive delivery views, and enriched CI and CD information, provide full traceability and visibility to your deployments.  

Select the view format for the GitOps Apps dashboard, as either [List or Card views](#select-view-mode-for-the-gitops-apps-dashboard). The default view displays all applications deployed within the last 30 days. Customize the scope through filters to display the [information](#/#gitops-apps-dashboard-information) you need.

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard: List view"
caption="GitOps Apps dashboard: List view"
max-width="60%"
%}

    
Identify applications with [health and sync errors](#identify-applications-with-warningserrors), and then select an application to drill down into its resources, deployments, and services:  
* [Get status from application header](#get-status-from-application-header)
* [View deployment and configuration info for selected application](#view-deployment-and-configuration-info-for-selected-application)
* [Monitor resources for selected application](#monitor-resources-for-selected-application)
* [Monitor deployments for selected application](#monitor-deployments-for-selected-application)
* [Monitor services for selected application](#monitor-services-for-selected-application)

>For information on creating and managing applications and application resources, see [Creating GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application/) and [Managing GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/).

## Select view mode for the GitOps Apps dashboard 
View deployed applications in either List (the default) or Card views. Both views are sorted by the most recent deployments. 

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select **List** or **Cards**.

### Applications List view

Here is an example of the GitOps Apps dashboard in List view mode. 

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard: List view"
caption="GitOps Apps dashboard: List view"
max-width="60%"
%} 

### Applications Card view
Here is an example of the GitOps Apps dashboard in Card view mode. The Card view provides a scannable view of application data and the actions to manage applications. 

  {% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-card-view.png"
url="/images/applications/app-dashboard-card-view.png"
alt="GitOps Apps dashboard: Card view"
caption="GitOps Apps dashboard: Card view"
max-width="60%"
%}

## GitOps Apps dashboard information 
Here's a description of the information and actions in the GitOps Apps dashboard.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|Application filters       | Filter by a range of attributes to customize the information in the dashboard to bring you what you need. {::nomarkdown}  <ul><li>Application state<br>A snapshot that displays a breakdown of the deployed applications by their health status.<br>Click a status to filter by applications that match it.<br>Codefresh tracks Argo CD's set of health statuses. See the official documentation on <a href="https://argo-cd.readthedocs.io/en/stable/operator-manual/health" target=”_blank”>Health sets</a>.</li><li>Application attributes<br>Attribute filters support multi-selection, and results are based on an OR relationship within the same filter with multiple options, and an AND relationship between filters.<br>Clicking <b>More Filters</b> gives you options to filter by Health status, Cluster names, Namespace, and Type. <br><ul><li>Application Type: Can be any of the following<ul><li>Applications: Standalone applications. See the official documentation on <a href="https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#applications" target=”_blank”>Applications</a>.</li><li>ApplicationSet: Applications created using the ApplicationSet Custom Resource (CR) template. An ApplicationSet can generate single or multiple applications. See the official documentation on <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/application-set" target=”_blank”>Generating Applications with ApplicationSet</a>.</li><li>Git Source: Applications created by Codefresh that includes other applications and CI resources. See <a href="https://codefresh.io/csdp-docs/docs/runtime/git-sources">Git Sources</a>.</li></ul></li></li><li>Labels:The K8s labels defined for the applications. The list displays labels of <i>all</i> the applications, even if you have applied filters.<br>To see the available labels, select <b>Add</b>, and then select the required label and one or more values. <br>To filter by the labels, select <b>Add</b> and then <b>Apply</b>.<br> See the official documentation on <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/labels" target=”_blank”>Labels and selectors</a>.</li></ul></ul>{:/}|
|{::nomarkdown}<img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Star applications as favorites and view only the starred applications.{::nomarkdown}<br>Select the <img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star the application as a favorite.<br><br>To filter by favorite applications, on the filters bar, select <img src="../../../../images/icons/icon-fav-starred.png?display=inline-block">.<br>{:/} TIP: If you star applications as favorites in the GitOps Apps dashboard, you can filter by the same applications in the [DORA metrics dashboard]({{site.baseurl}}/docs/dashboards/dora-metrics/#metrics-for-favorite-applications).  |
|Application actions| Options to monitor/manage applications through the application's context menu. {::nomarkdown}<ul><li>Quick view<br>A comprehensive read-only view of the deployment and definition information for the application.</li>{:/}See [Application Quick View](#view-deployment-and-configuration-info-for-selected-application) in this article.{::nomarkdown}<li>Synchronize/Sync<br>Manually synchronize the application.</li>{:/}See [Manually sync applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-synchronize-an-application).{::nomarkdown}<li>Edit<br>Modify application definitions.</li>{:/}See [Edit application definitions]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-application-definitions).{::nomarkdown}<li>Refresh and Hard Refresh: Available in Card view only. In List view, you must first select the application. <ul><li>Refresh: Retrieve desired (Git) state, compare with the live (cluster) state, and refresh the application to sync with the desired state.</li><li>Hard Refresh: Refresh the application to sync with the Git state, while removing the cache.</li></ul>{:/} |


## Identify applications with warnings/errors 
Errors are flagged in the **Warnings/Errors** button, displayed at the top right of the GitOps Apps dashboard. Clicking the button shows the list of applications with the warnings/errors and the possible reasons for these.

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-warnings-errors.png"
url="/images/applications/app-dashboard-warnings-errors.png"
alt="Example of warning and error notifications for applications"
caption="Example of warning and error notifications for applications"
max-width="60%"
%}

Every notification identifies:  
* The type of resource with the problem (`Application`, `Deployment`, `Pod`)
* If it is health or sync related 
* If it is a warning or error.

All errors are Argo CD-generated errors. Codefresh generates custom warnings for the following:

{::nomarkdown}
<br>
{:/}

### Warning: Missing Rollouts reporter in cluster

**Reason**: Codefresh has detected that Argo Rollouts is not installed on the target cluster. Rollout instructions are therefore not executed and the application is not deployed.  
Applications with `rollout` resources need Argo Rollouts on the target cluster, both to visualize rollouts in the GitOps Apps dashboard and control rollout steps with the Rollout Player.  

**Corrective Action**: Click **Install** and install Argo Rollouts on the target cluster.

{::nomarkdown}
<br>
{:/}

### Warning: Long sync 
**Reason**: Ongoing sync for application exceeds 30 minutes (Argo CD's default duration for a sync operation).

**Corrective Action**: 
* Click **View Details** to take you directly to the Sync Result tab. 
  Here you can see details on the sync job that was started, and info on the Hooks if any. Failed hooks are dsiplayed at the top. 
* To see more details such as the message and sync duration, switch to **Sync Info**.
* To stop the sync operation, click **Terminate**. 
* Drill down into the application to investigate the issue and make changes.

## Get status from application header
When you select an application from the GitOps Apps dashboard, the application header, at the top of the page, displays critical information on the application. 
Once you select an application, the quickest option to monitor statuses is through the application header which is always displayed, no matter what tab you navigate to.  

Information and actions in the application header:  
* Displays health and status, and results of current and previous sync operation
* Auto-sync enabled/disabled indication
* **More** links for sync statuses for details on the date, tags, and message
* **Terminate Sync** option for active sync operations to stop the sync if needed



{% include
image.html
lightbox="true"
file="/images/applications/application-header.png"
url="/images/applications/application-header.png"
alt="Application header for selected application"
caption="Application header for selected application"
max-width="80%"
%}

>Tip:  
  You can also view the current health and sync status for the application as a resource in the Current State tab. 

## View deployment and configuration info for selected application

View deployment, definition, and event information for the selected application in a centralized location through the Quick View.  
A read-only view, the Quick View displays information on the application state and location, labels and annotations, parameters, sync options, manifest, status and sync events.
Access the Quick View from the GitOps Apps dashboard, either from the application's context menu, or after drilldown, from the Current State tab.

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Do one of the following:  
  * From the List or Card views, select the context menu and then select **Quick View**.
  
{% include
image.html
lightbox="true"
file="/images/applications/quick-view-context-menu.png"
url="/images/applications/quick-view-context-menu.png"
alt="Selecting Quick View from the context menu"
caption="Selecting Quick View from the context menu"
max-width="80%"
%} 

  * Select the application, and from the application header's context menu on the right, select **Details**.

 {% include
image.html
lightbox="true"
file="/images/applications/app-header-view-details.png"
url="/images/applications/app-header-view-details.png"
alt="View app details from the application header context menu"
caption="View app details from the application header context menu"
max-width="80%"
%}

  * Select the application, and in the Current State tab, click the parent application resource.

{% include
image.html
lightbox="true"
file="/images/applications/quick-view-access-app-resource.png"
url="/images/applications/quick-view-access-app-resource.png"
alt="Accessing Quick View from the Current State tab"
caption="Accessing Quick View from the Current State tab"
max-width="60%"
%} 

The Quick View includes the following tabs:  
* Summary: Displays health, sync status, and source and destination definitions.
* Metadata: Displays labels and annotations for the application.
* Parameters:  Displays parameters configured for the application, based on the tool used to create the application's manifests.   
  The parameters displayed differ according to the tool: `directory`, `Helm` charts, or `Kustomize` manifests, or the specific plugin.  
* Sync Options: Displays the sync options enabled for the application.
* Manifest: Displays the YAML version of the application manifest.
* Events: Displays status and sync events for the application.





## Monitor resources for selected application

Monitor the resources deployed in the current version of the selected application in the Current State tab.  
Selecting an application from the GitOps Apps dashboard takes you to the Current State tab, which as its title indicates, displays the   
live state of the application's resources (Kubernetes objects) on the cluster, including health, sync state, manifests, and logs. 

{% include
image.html
lightbox="true"
file="/images/applications/app-resources-monitor-screen.png"
url="/images/applications/app-resources-monitor-screen.png"
alt="Monitor application resources in Current State tab"
caption="Monitor application resources in Current State tab"
max-width="60%"
%}

The icon for a resource node identifies the type of Kubernetes resource it represents. For general information on K8s resources, see [Working with Kubernetes objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/){:target="\_blank"}. 

You can view application resources in [List or Tree views](#view-modes-for-application-resources), [set filters](#filters-for-application-resources), and monitor:
* [Health status](#health-status-for-application-resources)
* [Sync status](#sync-status-for-application-resources)
* [Manifests](#manifests-for-application-resources)
* [Logs](#logs-for-application-resources)
* [Events](#events-for-application-resources)



### View modes for application resources

The Current State tab supports Tree and List view formats. 
* Tree view (default): A hierarchical, interactive visualization of the application and its resources. Useful for complex deployments with multiple clusters and large numbers of resources. See also [Working with resources in Tree view](#working-with-resources-in-tree-view).  
Here is an example of the Current State in Tree view.


{% include
image.html
lightbox="true"
file="/images/applications/current-state-tree-app-in-progress.png"
url="/images/applications/current-state-tree-app-in-progress.png"
alt="Tree view of application resources in Current State"
caption="Tree view of application resources in Current State"
max-width="50%"
%}

* List View: A list-based representation of application's resources, sorted by the Last Update. 
  Here is an example of the Current State in List view.

{% include
image.html
lightbox="true"
file="/images/applications/apps-current-state.png"
url="/images/applications/apps-current-state.png"
alt="List view of application resources in Current State"
caption="List view of application resources in Current State"
max-width="50%"
%}




#### Working with resources in Tree view
The Tree view is designed to impart key information at a glance. Review the sections that follow for pointers to quickly get to what you need in the Tree view.  

**Context menu**  
Every resource has a context menu that opens on clicking the three dots on the right of the resource. The options available differ according to the type of resource.
> If you have deep links configured for applications/resources for Hybrid GitOps Runtimes, these are also displayed in the context menu. To configure deep links in Codefresh, see [(Hybrid GitOps) Configure Deep Links to applications]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#hybrid-gitops-configure-deep-links-to-applicationsresources).


{% include
image.html
lightbox="true"
file="/images/applications/current-state-resource-context-menu.png"
url="/images/applications/current-state-resource-context-menu.png"
alt="Current State Tree view: Example of context menu for resource"
caption="Current State Tree view: Example of context menu for resource"
max-width="50%"
%}  

{% include
image.html
lightbox="true"
file="/images/applications/current-state-deep-links-context-menu.png"
url="/images/applications/current-state-deep-links-context-menu.png"
alt="Current State Tree view: Example of context menu with deep link"
caption="Current State Tree view: Example of context menu with deep link"
max-width="50%"
%}

**Resource info**  
Mouse over a node to see a tooltip for that resource. For detailed information, select the resource.

{% include
image.html
lightbox="true"
file="/images/applications/current-state-resource-summary.png"
url="/images/applications/current-state-resource-summary.png"
alt="Current State Tree view: Resource tooltip"
caption="Current State Tree view: Resource tooltip"
max-width="50%"
%}

**Search resources**  
Quickly find a resource by typing the resource name in the search field. You can identify search results through the border which is different from the borders depicting health status. Press Enter to navigate to the next result. 

{% include
image.html
lightbox="true"
file="/images/applications/current-state-tree-search.png"
url="/images/applications/current-state-tree-search.png"
alt="Current State Tree view: Search resources"
caption="Current State: Search resources"
max-width="50%"
%}



**Resource inventory**   
The Resource inventory in the Tree view (bottom-left), summarizes the aggregated count for each resource type in the application.  The number of `out-of-sync` items for that resource type if any are numbered in red.  

Click-filters:  

Selecting any resource type, filters the Current State by that resource type and sync status.
These filters are automatically applied to the default filter list for both Tree and List views. 
Here's an example of an application with out-of-sync resources, and the result on selecting an out-of-sync resource type.


{% include
image.html
lightbox="true"
file="/images/applications/current-state-tree-resource-filtered.png"
url="/images/applications/current-state-tree-resource-filtered.png"
alt="Current State Tree view: Resource inventory filtered by Secrets"
caption="Current State Tree view: Resource inventory filtered by Secrets"
max-width="50%"
%}


### Filters for application resources
Filters are common to both Tree and List views, and when applied are retained when switching between views. 

`IgnoreExtraneous` is a filter in [Argo CD](https://argo-cd.readthedocs.io/en/stable/user-guide/compare-options){:target="\_blank"} that allows you to hide specific resources from the Current State views. These resources are usually generated by a tool and their sync statuses have no impact on the sync status of the application. For example, `ConfigMap` and `pods`. The application remains in-sync even when such resources are syncing or out-of-sync.  

>The `IgnoreExtraneous` filter applies only to the sync status. The health status of the resource directly affects the application's health status. If the resource is degraded, then the application is also degraded. 

**For the `IgnoreExtraneous` filter to be effective:**  

* Add `IgnoreExtraneous` as an annotation to the resource, as in the example below of the `ConfigMap` resource. 

{% include
image.html
lightbox="true"
file="/images/applications/current-state-ignore-extraneous-annotation.png"
url="/images/applications/current-state-ignore-extraneous-annotation.png"
alt="Resource with IgnoreExtraneous annotation"
caption="Resource with IgnoreExtraneous annotation"
max-width="50%"
%}

* In the Current State tab, click the `IgnoreExtraneous` filter.  
 You can see that the `IgnoreExtraneous` filter is active and the `ConfigMap` resource is not displayed in the Current State.

{% include
image.html
lightbox="true"
file="/images/applications/current-state-ignore-extraneous-on.png"
url="/images/applications/current-state-ignore-extraneous-on.png"
alt="Current State filtered by IgnoreExtraneous resources"
caption="Current State filtered by IgnoreExtraneous resources"
max-width="50%"
%}


### Health status for application resources
View and monitor health status of the selected application's resources in the Current State tab, in Tree or List views.  
Identify the health of an application resource through the icon, as described in the table (Tree view), or the textual labels at the right of the resource (List view).  

The table describes the possible health statuses for an application resource in the Tree view. 

{: .table .table-bordered .table-hover}
|  Health icon    | Health status | Description  | 
| --------------  | ------------| ------------------|  
| {::nomarkdown}<img src="../../../../images/icons/current-state-healthy.png" display=inline-block">{:/}       | **Healthy**     | Resource is functioning as required.  | 
| {::nomarkdown}<img src="../../../../images/icons/current-state-progressing.png" display=inline-block">{:/}   | **Progressing** | Resource is not healthy but can become healthy before the timeout occurs. | 
| {::nomarkdown}<img src="../../../../images/icons/current-state-suspended.png" display=inline-block">{:/}     |  **Suspended**   | Resource is not functioning, and is either suspended or paused. For example, Cron job or a canary rollout.|
|{::nomarkdown}<img src="../../../../images/icons/current-state-missing.png" display=inline-block">{:/}        | **Missing**     | Resource is not present on the cluster.  |                        
| {::nomarkdown}<img src="../../../../images/icons/current-state-degraded.png" display=inline-block/>{:/}      | **Degraded**    | Resource is not healthy, or a timeout occurred before it could reach a healthy status. |
| {::nomarkdown}<img src="../../../../images/icons/current-state-unknown.png" display=inline-block/>{:/}      | **Unknown**   | Resource does not have a health status, or the health status is not tracked in Argo CD. For example, `ConfigMaps` resource types.   |


See also [Argo CD's set of health checks](https://argo-cd.readthedocs.io/en/stable/operator-manual/health/){:target="\_blank"}.



### Sync status for application resources

Similar to the health status, the Current State also tracks the sync status of all application resources. The sync status identifies if the live state of the application resource on the cluster is synced with its desired state in Git.   
Identify the sync status through the icon on the left of the resource name (Tree view), or the textual labels at the right of the resource (List view). 

The table describes the possible sync states for an application resource in the Tree view. 

{: .table .table-bordered .table-hover}
| Sync icon      | Sync state   |Description  |  
| -------------- | ----------    | ----------     |  
| {::nomarkdown}<img src="../../../../images/icons/current-state-synced.png" display=inline-block">{:/} | **Synced**  | The live state of the resource on the cluster is identical to the desired state in Git.|                            
| {::nomarkdown}<img src="../../../../images/icons/current-state-syncing.png" display=inline-block/>{:/}| **Syncing**  | The live state of the resource was not identical to the desired state, and is currently being synced. |  
| {::nomarkdown}<img src="../../../../images/icons/current-state-out-of-sync.png" display=inline-block">{:/}| **Out-of-Sync**  | The live state is not identical to the desired state.<br>To sync a resource, select the **Sync** option from the resource's context menu in Tree view.  |  
| No icon | **Unknown**      | The sync status could not be determined.  |  


> The application header displays the statuses of the current and previous sync operations. Clicking **More** opens the Sync panels with Sync Info, Sync Result and Commit Info.
  The Application Warnings/Errors panel surfaces sync errors on exceeding the maximum number of retries and when a sync operation extends beyond 30 minutes.

### Manifests for application resources

In either Tree or List views, double-click an application resource to see its manifests. The manifests are displayed in the Summary tab. 
> Based on the selected resource type, you can also view logs, and events. Endpoints for example show only manifests, while pods show manifests, logs, and events.  

> To view information for the application resource, select the application node in Tree View. See [Application information](#view-deployment-and-configuration-info-for-selected-application).

 
{% include
image.html
lightbox="true"
file="/images/applications/current-state-resource-summary.png"
url="/images/applications/current-state-resource-summary.png"
alt="Current State Tree view: Resource tooltip"
caption="Current State Tree view: Resource tooltip"
max-width="50%"
%}

Here's what you can see and do in the Summary tab:
> Press Ctrl/Command F to search for strings in the manifest.

* Desired and Live states of the resource manifest: 
  * Managed resources, stored in Git repositories and using Git as the single source of truth, show both the Desired (Git) and the Live (cluster) states.    
    If there are discrepancies between them, the Diff view is displayed, highlighting the differences in both versions for comparison.
  * Resources that are not stored in Git but live in the cluster, show only the Live state.
* Share resource details: Copy the URL and send to others in your organization to share the resource details for collaborative review and analysis. Pasting the URL in a browser opens to the same view of the resource.
* Hide Managed Fields: In the Live state version of the manifest, you can hide managed-field information from the manifest. Managed-fields show information on which field manager manages the field, after Kubernetes introduced `Server Side Apply`. For more information, see [Field Management](https://kubernetes.io/docs/reference/using-api/server-side-apply/#field-management){:target="\_blank"}.

{::nomarkdown}
<br>
{:/}

### Logs for application resources
In either Tree or List views, double-click an application resource to see its logs. Logs are available only for resource types such as pods.

{% include
image.html
lightbox="true"
file="/images/applications/current-state-logs.png"
url="/images/applications/current-state-logs.png"
alt="Current State: Logs for resource"
caption="Current State: Logs for resource"
max-width="50%"
%}


* Search: Free-text search for any string in the log, using the next and previous buttons to navigate between the results, or Enter for sequential navigation.
* Wrap: Enable/disable line wrapping 
* Download: Download the complete log into a text file for offline viewing and analysis.

{::nomarkdown}
<br>
{:/}

### Events for application resources
In either Tree or List views, double-click an application resource to see events in the Events tab. 
> If your runtime is lower than the version required to view events, you are notified to upgrade to the required version.

The Events tab displays both successful and failed events from Argo CD, starting with the most recent event. 
Argo CD displays events as they occur for an application resource, and retains event information for a duration of 30 minutes. Historical events older than this duration are removed, and the Events tab can be empty if there are no ongoing events.

{% include
image.html
lightbox="true"
file="/images/applications/current-state-events-tab.png"
url="/images/applications/current-state-events-tab.png"
alt="Current State: Events for resource"
caption="Current State: Events for resource"
max-width="50%"
%}






## Monitor deployments for selected application  
Monitor an ongoing deployment for the selected application, and review its historical deployments. 
The Timeline tab displays the history of deployments for the selected application, sorted by the most recent deployment (default), labeled **Current Version** at the top. 

The deployment chart displays the day-to-day deployments for the selected time period. Mouse over the dot on the deployment chart for information on historical deployments.  

{% include
image.html
lightbox="true"
file="/images/applications/dashboard-timeline-main.png"
url="/images/applications/dashboard-timeline-main.png"
alt="GitOps Apps dashboard: Timeline tab"
caption="GitOps Apps dashboard: Timeline tab"
max-width="30%"
%}

You can:  
* [Monitor CI details by deployments](#monitor-ci-details-by-deployment) 
<!--* [Monitor updated resources by deployment](#monitor-updated-resources-by-deployment)  -->
* [Monitor rollouts by deployment](#monitor-rollouts-by-deployment)


**How to monitor deployments**
1. If required, set filters to narrow the number of deployments for the selected application.
1. To view GitOps details for a deployment, in the deployment chart mouse over the dot that represents the deployment. 
1. To view additional details, expand the record for that deployment.

{% include
image.html
lightbox="true"
file="/images/applications/apps-historical-deployment.png"
url="/images/applications/apps-historical-deployment.png"
alt="GitOps Apps dashboard: Deployment chart"
caption="GitOps Apps dashboard: Deployment chart"
max-width="60%"
%}

### Monitor CI details by deployment

Each deployment record displays the complete CI history for that deployment.


* The **CI Builds** shows the Argo Workflow run in the deployment. Click the build name to see the Argo Workflow in a new browser window.
* The **Pull Request (PRs)** used for the commit.
* The Jira **Issues** the PR aims to resolve or has resolved, with the current status.
* The **Committer** who made the changes.


<!--- 
### Monitor updated resources by deployment
Each deployment record also identifies the applications that were changed (created, updated, or removed) as part of that deployment in **Updated Applications**. You can trace the history, from the original to their final versions. For each version, you can see the actual change or changes through the Diff view. The Full View shows the complete resource manifest, with the diff view of the changes, while the Compact View shows only those lines with the changes. 

> For detailed information on the current state of a resource, switch to the Current State tab and click the resource node. See [Monitoring application resources](#monitor-resources-for-selected-application).

1. Select a deployment record, and expand **Updated Resources**.

{% include
image.html
lightbox="true"
file="/images/applications/timeline-resources-updated.png"
url="/images/applications/timeline-resources-updated.png"
alt="Timeline tab: Updated Resources for deployment"
caption="Timeline tab: Updated Resources for deployment"
max-width="70%"
%}

{:start="2"}
1. To see the changes for a resource, click the resource name.
  The Full View of the resource manifest is displayed with the diff view of the changes. 

{% include
image.html
lightbox="true"
file="/images/applications/timeline-resources-full-view.png"
url="/images/applications/timeline-resources-full-view.png"
alt="Full View of changes for updated resource"
caption="Full View of changes for updated resource"
max-width="70%"
%}

{:start="3"}
1. To view only the changes, click **Compact View**.

{% include
image.html
lightbox="true"
file="/images/applications/timeline-resources-compact-view.png"
url="/images/applications/timeline-resources-compact-view.png"
alt="Full View of changes for updated resource"
caption="Full View of changes for updated resource"
max-width="70%"
%}
-->




### Monitor rollouts by deployment
A rollout is initiated when there is an Argo CD sync due to a change in the desired state.  
Visualize ongoing and completed rollouts by deployments in **Updated Services**. 

Clicking the image name displays the image in the **Images** dashboard. 

> To view and manage a rollout, you must have an Argo `rollout` resource defined for your application, and [install Argo Rollouts in the cluster]({{site.baseurl}}/docs/deployments/gitops/install-argo-rollouts).  

For detailed information on Argo Rollouts, see [Argo Rollouts documentation](https://argoproj.github.io/argo-rollouts/){:target="\_blank"}.

#### Rollout progress
For an ongoing rollout, the rollout bar displays the progress of the rollout. You can also visualize the steps in the rollout, and control the rollout using the options in the Rollout Player.  

Here is an example of an ongoing rollout for a canary deployment in Updated Services. The rollout comprising four steps has not started, and no traffic has not been routed as yet to the new version of the application.

{% include
image.html
lightbox="true"
file="/images/applications/apps-dashboard-rollout-in-progress.png"
url="/images/applications/apps-dashboard-rollout-in-progress.png"
alt="Rollout in progress for deployment"
caption="Rollout in progress for deployment"
max-width="50%"
%}

Based on the current state of the rollout, you can pause and resume an ongoing rollout.  
Here is an example of the rollout for the same deployment on completion. All traffic has been routed to the new version. 

{% include
image.html
lightbox="true"
file="/images/applications/apps-dashboard-rollout-complete.png"
url="/images/applications/apps-dashboard-rollout-complete.png"
alt="Rollout completed for deployment"
caption="Rollout completed for deployment"
max-width="50%"
%}

#### Manage ongoing rollout
Click the rollout name to visualize its steps. Manually manage the rollout through the controls in the Rollout Player. 
Here you can see that two out of four steps have been completed, 25% of the traffic has been routed, and the rollout has been paused for the defined length of time.  

{% include
image.html
lightbox="true"
file="/images/applications/rollout-player.png"
url="/images/applications/rollout-player.png"
alt="Rollout step visualization and Rollout Player"
caption="Rollout steps and Rollout Player"
max-width="50%"
%}

 
The table lists the controls in the Rollout Player to manage an ongoing rollout.

{: .table .table-bordered .table-hover}
|Rollback player icon | Option   | Description |  
| --------------  | ------------| 
| {::nomarkdown}<img src="../../../../images/icons/rollout-rollback.png" display=inline-block"> {:/}  | **Rollback**  | Rollback rollout to the selec.  | 
| {::nomarkdown}<img src="../../../../images/icons/rollout-resume.png" display=inline-block"> {:/}    |**Resume**     | Resume a step that has been paused indefinitely. | 
| {::nomarkdown}<img src="../../../../images/icons/rollout-skip-step.png" display=inline-block"> {:/} | **Skip step** | Skip execution of current step. Such steps are marked as Skipped in the rollout visualization. | 
| {::nomarkdown}<img src="../../../../images/icons/rollout-promote-full.png" display=inline-block"> {:/}| **Promote full rollout**    | Skip remaining pause, traffic routing, and analysis steps, and deploy the current release. |                        


 
#### View analysis run
If you have defined an analysis template for the rollout, you can check the run results and the manifest. 
 The result of an analysis run determines if the rollout is completed, paused, or aborted. For detailed information, see the [Analysis section in Argo Rollouts](https://argoproj.github.io/argo-rollouts/features/analysis/){:target="\_blank"}.  

If you are running Background Analysis for example, the first step shows the list of analysis metrics.

{% include
image.html
lightbox="true"
file="/images/applications/app-rollout-analysis-template-step.png"
url="/images/applications/app-rollout-analysis-template-step.png"
alt="Rollout: Analysis Metrics in Background Analysis"
caption="Analysis Template: Analysis Metrics in Background Analysis"
max-width="50%"
%}

Click the metric link in the step. 

{% include
image.html
lightbox="true"
file="/images/applications/app-rollout-run-results-manifest.png"
url="/images/applications/app-rollout-run-results-manifest.png"
alt="Analysis Template: Run Results and Manifest for Analysis Metric"
caption="Analysis Template: Run Results and Manifest for Analysis Metric"
max-width="50%"
%}


## Monitor services for selected application
The Services tab shows the K8s services for each deployment of the application. 
Each service shows the number of replicas, the endpoint IP, the labels that reference the application, and the health status.  

For more information, see the official documentation on [Services](https://kubernetes.io/docs/concepts/services-networking/service/){:target="\_blank"}.

{% include
image.html
lightbox="true"
file="/images/applications/apps-dashboard-services.png"
url="/images/applications/apps-dashboard-services.png"
alt="GitOps Apps dashboard: Services tab"
caption="GitOps Apps dashboard: Services tab"
max-width="50%"
%}

## Related articles
[Creating GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application)  
[Managing GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application)  
[GitOps Overview dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  


