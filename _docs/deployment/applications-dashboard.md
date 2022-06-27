---
title: "Applications dashboard"
description: ""
group: deployment
toc: true
---

View, monitor, and analyze deployments across your enterprise in the Applications dashboard. As a one-stop shop for Argo Rollouts and Argo CD in Codefresh, the Applications dashboard delivers on the challenge of keeping track of deployments, whatever the frequency and scale. A wide range of filters, enriched CI and CD information, provide full traceability and visibility to continuous deployments. 

Here are some insights you can derive from the Applications dashboard:   
* Visibility into deployments from all the clusters associated with the provisioned runtimes, in-cluster and managed
* Timeline on current and historical deployments 
* Enriched CI information for deployments, including links to container images, Git hashes correlated with feature requests, Jira issues
* Microservices deployed by the application
* Hierarchical view of the resources in the application in the Current State



### Applications main view

The main view shows all deployed applications, sorted by the most recent deployments (default).   


Here is an example of the main page in the Applications dashboard. 

  {% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="Applications Dashboard"
caption="Applications Dashboard"
max-width="70%"
%}  

#### Application inventory and state 

The application state snapshot shows at a glance both the total number of applications that are deployed and their breakdown according to state.

> The state snapshot works also as a quick filter. Selecting a state filters the application view by that state.

####  Filters and favorites
Similar to other dashboards, the Applications dashboard also offers a set of filters designed to bring you the information you need as quickly as possible.  
You can also mark applications as favorites to focus on the applications of interest.

**Filters**  

Filters are divided into frequently used and advanced filters.
* Frequently-used filters: Available at the top of the dashboard. These filters support multi-selection, and results are based on an OR relationship within the same filter with multiple options, and an AND relationship between filters.
* Advanced filters: Available on selecting **More Filters**. These filters include application type, health, and labels. 

  * Application type  
    Applications and ApplicationSet
    
  * Health filters  
    The built-in Argo CD set of health filters.  
    For detailed information, see the official documentation on [Health sets](https://argo-cd.readthedocs.io/en/stable/operator-manual/health/){:target="\_blank"}. 

  
  * Labels  
    The K8s labels defined for the applications. The list displays labels of _all_ the applications, even if you have applied filters.

    To see the available labels, select **Add**, and then select the required label and one or more values.  
    To filter by the labels, select **Add** and then **Apply**.  


    For detailed information, see the official documentation on [Labels and selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/){:target="\_blank"}.

    {% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-adv-filters.png"
url="/images/applications/app-dashboard-adv-filters.png"
alt="Advanced filters in Applications Dashboard"
caption="Advanced filters in Applications Dashboard"
max-width="70%"

%}


**'Favorite' applications**  

Mark applications as favorites, and view them with a click.  
* Select the {::nomarkdown}<img src="../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/} to the left of the application name to mark it as a favorite. 
* To view only favorites, on the filters bar, select {::nomarkdown}<img src="../../../images/icons/icon-fav-starred.png?display=inline-block">{:/}.



#### Deployment type
Applications are displayed according to their deployment type which can be one of the following:
* Applications  
  Standalone applications. For detailed information, see the official documentation on [Applications](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#applications){:target="\_blank"}.

  {% include
image.html
lightbox="true"
file="/images/applications/apps-standalone.png"
url="/images/applications/apps-standalone.png"
alt="Standalone applications in Applications Dashboard"
caption="Standalone applications in Applications Dashboard"
max-width="30%"
%}

* Application set  
  Based on the Argo CD's ApplicationSet CRD, where several applications are always deployed as a set. For detailed information, see the official documentation on [Generating Applications with ApplicationSet](https://argo-cd.readthedocs.io/en/stable/user-guide/application-set/){:target="\_blank"}.
max-width="70%"
%}

* Application set  
  Based on the Argo CD's ApplicationSet CRD, where several applications are always deployed as a set. For more information, see [Generating Applications with ApplicationSet](https://argo-cd.readthedocs.io/en/stable/user-guide/application-set/){:target="\_blank"}.

  {% include
image.html
lightbox="true"
file="/images/applications/app-appset-model.png"
url="/images/applications/app-appset-model.png"
alt="Application Set in Applications Dashboard"
caption="Application Set in Applications Dashboard"
max-width="70%"
%}
  
* App-of-apps  
  In this deployment model, the parent application deploys a set of child applications.  For more information, see [App of Apps](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#app-of-apps){:target="\_blank"}. 


{% include
image.html
lightbox="true"
file="/images/applications/app-appofapps-model.png"
url="/images/applications/app-appofapps-model.png"
alt="App of Apps in Applications Dashboard"
caption="App of Apps in Applications Dashboard"
max-width="70%"
%}


### Application timeline 
The Timeline tab displays the history of deployments for the selected application, sorted by the most recent update (default), and enriched with image, Pull Request (PR), Jira issues, and commit information, for each deployment. 

Each application displays up to ten of the most recent deployments through deployment cards. 

{% include
image.html
lightbox="true"
file="/images/applications/apps-dashboard-timeline-collapsed.png"
url="/images/applications/apps-dashboard-timeline-collapsed.png"
alt="Applications Dashboard: Timeline tab"
caption="Applications Dashboard: Timeline tab"
max-width="70%"
%}



**Filters**  

View the subset of deployments of interest to you. Filter by Date range, PRs, issues, committers, and more.  

**Deployment chart**  

View day-to-day deployment information for the selected time period. The deployment chart is useful to get information on historical deployments, as deployment cards are shown for up to ten of the most recent deployments.  

* To jump to a specific deployment, click the dot on the chart that represents the deployment. 
* To see GitOps details, mouse over the dot that represents the deployment. 

{% include
image.html
lightbox="true"
file="/images/applications/apps-historical-deployment.png"
url="/images/applications/apps-historical-deployment.png"
alt="Applications Dashboard: Deployment chart"
caption="Applications Dashboard: Deployment chart"
max-width="70%"
%}

**Deployment entries**  

Each deployment entry displays the complete history of that deployment, by Git hash, Kubernetes services, and Argo applications:

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-time-expanded-card.png"
url="/images/applications/app-dashboard-time-expanded-card.png"
alt="Applications Dashboard: Deployment entry in Timeline tab"
caption="Applications Dashboard: Deployment entry in Timeline tab"
max-width="70%"
%}

* The **CI Builds** showing the image(s) created or updated during deployment. Click to see the **Images** view in a browser window.
* The **Pull Request (PRs)** used for the commit.
* The Jira **Issues** the PR aims to resolve or has resolved, with the current status.
* The **Committer** who made the changes.
* The Kubernetes **Services** updated during the deployment, according to the Argo rollout strategy, and the current rollout status. 
  The example above shows the rollouts according to the canary rollout strategy. The blue line shows the progress of rollout with the current step versus the total number of steps.  
  Expanding the live version deployment shows the number of replicas currently deployed, as green circles.
* The Argo **Applications** updated during this deployment.


### Application services
The Services tab for an application shows the K8s services for each deployment of the application. 
Each service shows the number of replicas, the endpoint IP, the labels that reference the application, and the health status.  

For more information, see the official documentation on [Services](https://kubernetes.io/docs/concepts/services-networking/service/){:target="\_blank"}.

{% include
image.html
lightbox="true"
file="/images/applications/apps-dashboard-services.png"
url="/images/applications/apps-dashboard-services.png"
alt="Applications Dashboard: Services tab"
caption="Applications Dashboard: Services tab"
max-width="30%"
%}

### Application Current State
The Current State tab for an application shows the live state of the application and the application's resources (Kubernetes objects) in the cluster in Tree and List view formats. 
* Tree view (default): A hierarchical, interactive visualization of the application and its resources. Useful for complex deployments with multiple clusters and large numbers of resources. 

* List View: A representation of application's resources, sorted by the Last Update.

> Filters are shared between both views, and when applied are retained when switching between views. 

Current State insights and actions:
*  Health status: Reflects Argo CD's built-in health checks and status for the Application resource and Kubernetes objects. For more information, see [Argo CD Resource Health](https://argo-cd.readthedocs.io/en/stable/operator-manual/health/){:target="\_blank"}.
*  Sync state: Desired state in Git versus live state in cluster.
* Resource details: High-level information on mouse-over, and detailed manifest and log information on selecting the resource.

The icon for a resource node identifies the type of Kubernetes resource it represents. For general information on K8s resources, see [Working with Kubernetes objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/){:target="\_blank"}.

#### Current State Tree view
Below is an example of an application's Current State in Tree view, with the root node, the application itself, expanded to display all resources.  

The Tree view is designed to impart key information at a glance. Review the sections that follow for pointers to get to what you need in the Tree view.


{% include
image.html
lightbox="true"
file="/images/applications/current-state-tree-app-in-progress.png"
url="/images/applications/current-state-tree-app-in-progress.png"
alt="Current State: Tree view"
caption="Current State: Tree view"
max-width="50%"
%}

##### Health status  
The health status of a node is identified by the border around both the node and the resource-type icon. The health statuses tracked are [Argo CD's set of health checks](https://argo-cd.readthedocs.io/en/stable/operator-manual/health/).

> The Unknown health status is assigned to resources that do not have a health status and are not tracked in Argo CD. `ConfigMaps` for example.

{: .table .table-bordered .table-hover}
| Health status  | Display in Tree view  | 
| -------------- | ----------| ----------|  
| **Healthy**                     | {::nomarkdown}<img src="../../../images/icons/current-state-healthy.png" display=inline-block">{:/} |                        
| **Degraded**                    | {::nomarkdown}<img src="../../../images/icons/current-state-degraded.png" display=inline-block/>{:/} |
| **Suspended**                   | {::nomarkdown}<img src="../../../images/icons/current-state-suspended.png" display=inline-block">{:/} |  
| **Missing**                   | {::nomarkdown}<img src="../../../images/icons/current-state-missing.png" display=inline-block">{:/} |  
| **Progressing**                 | {::nomarkdown}<img src="../../../images/icons/current-state-progressing.png" display=inline-block">{:/} | 
| **Unknown**                     | {::nomarkdown}<img src="../../../images/icons/current-state-unknown.png" display=inline-block">{:/} |  



##### Sync state
The sync state is identified by the icon to the left of the resource name and the color of the resource name. For information on sync options you can configure for applications, see [Sync settings]({{site.baseurl}}docs/deployment/create-application/#sync-settings).

{: .table .table-bordered .table-hover}
| Sync state     | Display in Tree view  |  
| -------------- | ----------        |  
| **Synced**                  | {::nomarkdown}<img src="../../../images/icons/current-state-synced.png" display=inline-block">{:/} |                            
| **Syncing**                 | {::nomarkdown}<img src="../../../images/icons/current-state-syncing.png" display=inline-block/>{:/} |  
| **Out-of-Sync**             | {::nomarkdown}<img src="../../../images/icons/current-state-out-of-sync.png" display=inline-block">{:/} |  
| **Unknown**                 | {::nomarkdown}<img src="../../../images/icons/current-state-sync-unknown.png" display=inline-block">{:/} |  


##### Resource inventory
At the bottom left is the Resource inventory, summarizing the aggregated count for each resource type in the application. Syncing and Out-of-Sync resources are bucketed separately for visibility and quick access. 

**Click-filters**  
In the resource inventory, selecting a Syncing or Out-of-Sync resource type, filters the Current State by that resource type and sync state.
These filters are automatically reflected in the default filter list for both Tree and List views. 
Here's an example of an application with out-of-sync resources, and the result on selecting an out-of-sync resource type.


{% include
image.html
lightbox="true"
file="/images/applications/current-state-tree-resource-list.png"
url="/images/applications/current-state-tree-resource-list.png"
alt="Current State Tree view: Resource inventory"
caption="Current State Tree view: Resource inventory"
max-width="50%"
%}

{% include
image.html
lightbox="true"
file="/images/applications/current-state-tree-resource-filtered.png"
url="/images/applications/current-state-tree-resource-filtered.png"
alt="Current State Tree view: Resource inventory filtered by out-of-sync service"
caption="Current State Tree view: Resource inventory filtered by out-of-sync service"
max-width="50%"
%}

##### Resource info
Mouse over a node to see a tooltip for that resource. For detailed information, select the resource; see [Detailed resource information](#detailed-resource-information) in this article.

{% include
image.html
lightbox="true"
file="/images/applications/current-state-resource-summary.png"
url="/images/applications/current-state-resource-summary.png"
alt="Current State Tree view: Resource tooltip"
caption="Current State Tree view: Resource tooltip"
max-width="50%"
%}

##### Search resources
Quickly find a resource by typing the resource name in the search field. Search results have a different border for identification. Press Enter to navigate to the next result. 

{% include
image.html
lightbox="true"
file="/images/applications/current-state-tree-search.png"
url="/images/applications/current-state-tree-search.png"
alt="Current State Tree view: Search resources"
caption="Current State: Search resources"
max-width="50%"
%}

#### Current State List view 
Here is an example of the Current State in List view.

{% include
image.html
lightbox="true"
file="/images/applications/apps-current-state.png"
url="/images/applications/apps-current-state.png"
alt="Applications Dashboard: List view of Current State"
caption="Applications Dashboard: List view of Current State"
max-width="50%"
%}


#### Detailed resource information
Selecting a resource, in either Tree or List view, shows resource manifests and logs, based on the resource type you selected. Endpoints for example show only manifests, while pods show both manifests and logs.  


**Summary**
 
{% include
image.html
lightbox="true"
file="/images/applications/current-state-resource-summary.png"
url="/images/applications/current-state-resource-summary.png"
alt="Current State Tree view: Resource tooltip"
caption="Current State Tree view: Resource tooltip"
max-width="50%"
%}

* Desired and Live states: 
  * Managed resources stored in Git repositories and using Git as the single source of truth, show both the Desired state and the Live state.    
    If there are discrepancies between them, the Diff view is displayed, highlighting the differences in both versions for comparison.
  * Resources that are not stored in Git but live in the cluster, show only the Live state.
* Share resource details: Copy the URL and send to others in your organization to share the resource details for collaborative review and analysis. Pasting the URL in a browser opens to the same resource view.
* Hide Managed Fields: When selected, hides managed-field information from the manifest. Managed-fields show information on which field manager manages the field, after Kubernetes introduced `Server Side Apply`. For more information, see [Field Management](https://kubernetes.io/docs/reference/using-api/server-side-apply/#field-management){:target="\_blank"}.


**Logs**  

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




