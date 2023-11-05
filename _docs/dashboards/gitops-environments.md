---
title: "GitOps Environments dashboard"
description: "Track and manage Argo CD applications within and across Environments"
group: dashboards
toc: true
---


Codefresh offers a range of dashboards, each offering unique insights into Argo CD applications and their deployments. The GitOps Overview dashboard offers a high-level view, showcasing essential Key Performance Indicators (KPIs). The GitOps Apps dashboard centralizes the monitoring and management of individual application deployments, resources, and configurations.

While these dashboards provide extensive data on applications, they don't inherently reveal the relationships between different but interconnected Argo CD Applications. This is where the GitOps Environments dashboard comes in.

The **GitOps Environments** dashboard introduces a new dimension to your GitOps experience with Argo CD applications.  
* It places Argo CD applications within the context of their environments, providing a comprehensive view of their journey through the software development lifecycle.
* Beyond visibility, it allows you to delve into the deployment history of individual applications and take actions such as synchronization and refresh, among others.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/environments-dashboard.png" 
	url="/images/gitops-environments/environments-dashboard.png" 
	alt="GitOps Environments" 
	caption="GitOps Environments"
  max-width="70%" 
%}

**What is an Environment in Codefresh GitOps?**  
An Environment is an entity in Codefresh defined by one or more K8s clusters and namespaces. It consolidates information for all Argo CD applications deployed to those clusters and namespaces, allowing you to easily track what's deployed where at any given moment.

Codefresh allows you to define Environments that can exist without any applications deployed to them.


**What can you view in a GitOps Environment?**  
1. Argo CD applications: Environments are populated by the Argo CD applications in the clusters and namespaces mapped to them. 
1. Deployment lifecycle phase: The current phase of each application's deployment.
1. Commit information: Trace the commit/pull request (PR) history, such as the developer who initiated the promotion to each Environment.

**Benefits of GitOps Environments**  

* Account-level visibility:  GitOps Environments in Codefresh are managed at the account level, providing a holistic view of all Argo CD applications across GitOps Runtimes in clusters mapped to the Environments. 
* Application traceability: Gain insights into application promotions across diverse environments, including commit and PR histories, and developers responsible for each change.
* Micro-service visibility: Get a clear understanding of what is running in an Environment, including dependencies and services/components to enhance your control and management capabilities.

The diagram illustrates how GitOps Environments in Codefresh organizes different Argo CD applications in their deployment contexts.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	url="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	alt="Argo CD applications organized in GitOps Environments" 
	caption="Argo CD applications organized in GitOps Environments"
  max-width="70%" 
%}


Create environments by defining key settings (see [Create GitOps Environments](#create-gitops-environments)), and see how Codefresh pulls in all the information into an intuitive dashboard (see [GitOps Environments dashboard](#gitops-environments-dashboard)). Learn how to [work with GitOps Environments](/#working-with-gitops-environments) and [work with Argo CD applications](#working-with-applications-in-gitops-environments) within Environments.

Remember you can further refine application views in Environments through Products. Read more in [GitOps Products]({{site.baseurl}}docs/dashboards/gitops-products/).

## GitOps Environments dashboard
Here's an example of the GitOps Environments dashboard.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/environments-dashboard.png" 
	url="/images/gitops-environments/environments-dashboard.png" 
	alt="GitOps Environment dashboard" 
	caption="GitOps Environment dashboard"
  max-width="60%" 
%}

The table describes the information displayed in the GitOps Environments dashboard.

{: .table .table-bordered .table-hover}
| Item             | Description              | 
| --------------    | --------------           |
|**Filters**              | Predefined filters that allow you to customize the Environment dashboard view by Product, Application, or by Application Health Status. | 
|{::nomarkdown}<img src="../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Star a card with a product and application as a favorite and view only the starred products.{::nomarkdown}<br>Select the <img src="../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star as a favorite.<br><br>To filter by favorites, on the filters bar, select <img src="../../../images/icons/icon-fav-starred.png?display=inline-block">. {:/} |
|**Detailed/Compact views**              | View details on the application in an environment, including the version deployed in each environment.{::nomarkdown}<ul><li><b>Compact</b>: The default view, displays the application's version, health, and sync status.<br> <img src="../../../images/gitops-environments/app-compact-view.png?display=inline-block" width="70%"></li><li><b>Detailed</b>: Includes commit information that resulted in the application being promoted, including the commit message, Git hash, user who made the commit.<br>Cluster and namespace the application is deployed to.<br><img src="../../../images/gitops-environments/app-detailed-view.png?display=inline-block" width="70%">.</li></ul>{:/}|
|**Environments**              | Environments are visually organized into columns, color-coded to differentiate between non-production environments (in gray) and production environments (in blue).<br>The column title is the name of the environment. Mouse over displays the edit, delete, and move icons to manage environments. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/#working-with-gitops-environments">Working with GitOps Environments</a>.<br>Each environment is populated with the applications in the cluster-namespace pairs mapped to the environment. <br>An empty environment indicates that there are no applications in the cluster-namespaces mapped to it.|
|**Applications**| Applications are displayed as a list of cards. {::nomarkdown}<ul><li>If the application is assigned to a product, the product name is displayed as the title of the card. If not, the application name is used.</li><li>Clicking the application name displays the deployment history for the application. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/#view-deployment-timeline-history-for-applications">View deployment (Timeline) history for applications</a>.</li><li>Every application has a context-menu with quick access to frequently performed actions, such as Synchronize and Refresh. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/#manage-applications-from-within-environments">Manage applications from within environments</a>.</li></ul>{:/} |

## Create GitOps Environments
Create one or more GitOps Environments corresponding to any stage in your development and deployment lifecycle.  
Define the configuration of the Environment through a unique name, it's intended usage, and one or more cluster-namespace pairs that define the Argo CD applications populated for that environment. 


1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
    1. **Kind**: The purpose of this environment, and can be either **Production** where the live versions of the applications are deployed,  or **Non-production** where development, testing, staging versions are deployed.
    1. **Tags**: Any metadata providing additional context and information about the environment, used for filtering and organization purposes.
    1. **Clusters and Namespaces**: Single or multiple cluster-namespace pairs to map to the environment. Adding a cluster with one or more namespaces populates the environment with all the applications deployed in the namespaces. <!--- When selecting namespaces in a cluster, use `*` as a wildcard for pattern-based matching. For example, you can use `prod-*` to add all namespaces with names starting with `prod-`. -->

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/create-environment.png" 
	url="/images/gitops-environments/create-environment.png" 
	alt="Create a GitOps Environment" 
	caption="Create a GitOps Environment"
  max-width="60%" 
%} 

{:start="3"}  
1. Click **Add**. The environment is displayed in the Environments page. 

 

## Working with GitOps environments

Once you create an environment, it is displayed in the Environments page.
The Environments dashboard consolidates in one location the environments defined for the account along with the applications that belong to each environment, and the [Products]({{site.baseurl}}/docs/dashboards/gitops-products/) they are assigned to if you have created Products.


 
### Edit environments
Update the environment's configuration settings when required. You can change all settings for an environment, including it's name.

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Mouse over the column with the environment to edit, and click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
1. Edit the settings as required. 

### Reorder environments with drag and drop
Change the order of the environments displayed in the Environments dashboard to suit your requirements by simple drag and drop. By default, the environments are displayed in the same order in which they were created.

For example, if you have two non-production and one production environment for your e-commerce application, you can order them to display first the non-production and then the production environment to reflect the corresponding stages.

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Mouse over the column with the environment to move.
1. Click {::nomarkdown}<img src="../../../images/icons/move-environments.png?display=inline-block">{:/} and drag the column to the required location.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/reorder-environments.png" 
	url="/images/gitops-environments/reorder-environments.png" 
	alt="Drag and drop to move Environments" 
	caption="Drag and drop to move Environments"
  max-width="60%" 
%}

### Delete environments
Delete unused or legacy environments to avoid clutter. Deleting an environment removes it from the GitOps Environments dashboards. The underlying resources or configuration, including the products and applications remain intact. 

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Mouse over the column with the environment to delete.
1. Click {::nomarkdown}<img src="../../../images/icons/trash.png?display=inline-block">{:/}, type the name of the environment to confirm **Delete**.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/delete-environment.png" 
	url="/images/gitops-environments/delete-environment.png" 
	alt="Delete a GitOps Environment" 
	caption="Delete a GitOps Environment"
  max-width="60%" 
%}


## Working with applications in GitOps Environments
In the Environments dashboard, you get both visibility into applications running in different environments, detailed information on each application, and the ability to sync, refresh, and perform other actions for the application.  

### Trace applications across environments
Trace the same application as it moves across different environments in its development, testing, and deployment cycle. See the version of the application running in each environment, the most recent commit indicating the change, and the user who made the commit. 


Alternatively, track a set of applications deployed to multiple environments of the same kind and at the same level. For example, track the billing application deployed to multiple production environments based on regions.
Here too, see which applications are running on each environment, the most recent commit to the application, and the user who made the commit. 


1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Switch to **Detailed** view.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-trace-across-envs.png" 
	url="/images/gitops-environments/app-trace-across-envs.png" 
	alt="Example: Tracing application progress across different GitOps Environments" 
	caption="Example: Tracing application progress across different GitOps Environments"
  max-width="60%" 
%}

You can then view the deployment history for a specific version of the application.

### View deployment (Timeline) history for applications
Review the deployments for an application. Clicking the application name takes you to the familiar Timeline tab in the GitOps Apps dashboard with the deployment history for the application. See [Monitor deployments for selected Argo CD application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitor-deployments-for-selected-argo-cd-application).
 
 
1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. In the Environment column with the application, click the application name to view deployment history.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-timeline-view.png" 
	url="/images/gitops-environments/app-timeline-view.png" 
	alt="View deployment history for Argo CD application from GitOps Environments" 
	caption="View deployment history for Argo CD application from GitOps Environments"
  max-width="60%" 
%}

{:start="3"}
1. To view all the application's tabs, including the Current State, Configuration, and others, click the link to **Full View** at the top of the deployment view.


### Manage applications from within environments
Manage applications from within Environments through the application's context menu, including manual sync, refresh, and other options.

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Go to the Environment with the application for which to take action.
1. Click the context menu to the right of the application, and select the option:
  * [Quick View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#view-deployment-configuration-info-for-selected-argo-cd-application): View deployment, definition, and event information for the selected application in the same location.
  * [Synchronize]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-synchronize-an-argo-cd-application): Manually synchronize the application to expedite Git-to-cluster sync. 
  * [Edit]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-argo-cd-application-definitions): Update General or Advanced configuration settings for the application.
  * [Refresh/Hard Refresh]({{site.baseurl}}/docs/deployments/gitops/manage-application/#refreshhard-refresh-argo-cd-applications): As an alternative to manually syncing an application, either sync the application with the desired state in Git (refresh), or sync the application with the desired state Git while removing the cache (hard refresh). 
  * [Delete]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-argo-cd-applications): Delete the application from Codefresh.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-context-menu.png" 
	url="/images/gitops-environments/app-context-menu.png" 
	alt="Context menu with actions for Argo CD applications within GitOps Environments" 
	caption="Context menu with actions for Argo CD applications within GitOps Environments"
  max-width="60%" 
%}

## Related information
[Products dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)  
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)