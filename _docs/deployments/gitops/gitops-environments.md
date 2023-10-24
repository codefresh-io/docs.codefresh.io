---
title: "GitOps Environments"
description: ""
group: deployments
toc: true
---



GitOps environments overview

Codefresh has several dashboards each providing different views on different aspects of GitOps appllications and deployments. The GitOps Apps dashboard is a centralized location to view, monitor, and manage application deployments, resources, and configurations. The GitOps Overview dashboard is a high-level overview of GitOps applications via key APIs. 

The GitOps Environments dashboard combines a view of applications in the context of their environments allowing you to track applications as they move across your software development lifecycles. 

What is an environment
An Environment is a logical entity in Codefresh that consolidates deployment information for all the Argo CD applications linked to it. Allow you to see at any moment in time what's deployed where 

What can you see in an environment
1. Argo CD applications that are part of the environment
1. The phase of the application's deployment lifecycle
1. Git information


Characteristics of an environment

1. Account-level management: Environments are created and managed for an account with visibility into all the Runtimes and clusters created for the RUntimes in the account.
1. Tracability: There are two broad categories 
1. Moniorin: The main purpose of an environment is to show the Argo CD applications in that environment along with their current health and sync status, and Git information. This is only possible when you link an application to an environment. 
1. Promotion: 
1. Deployment destinations:

Environment views
## Products and Argo CD applications in GitOps Environments

## GitOps Environment dashboard
Here's an example of the GitOps Environments dashboard.


The table describes the information  displayed in the GitOps Environments dashboard.

{: .table .table-bordered .table-hover}
| Item             | Description              | 
| --------------    | --------------           |
|**Filters**              | Predefined filters that allow you to customize the Environment dashboard view by Product, Application, or by Application Health StatusTerminate the current rollout. | 
|{::nomarkdown}<img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Star a card with a product and application as a favorite and view only the starred products.{::nomarkdown}<br>Select the <img src="../../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star as a favorite.<br><br>To filter by favorites, on the filters bar, select <img src="../../../../images/icons/icon-fav-starred.png?display=inline-block">. {:/} |
|**Detailed/Compact views**              | View details on the application in an environment.{::nomarkdown}<ul><li><b>Compact</b>: The default view, displays the application's health and sync status.<br> <img src="../../../../images/gitops-environments/app-detailed-view.png?display=inline-block" width="70%"></li><li><b>Detailed</b>: Includes commit information that resulted in the application being promoted, including the commit message, SHA hash, user who made the commit.<br>Cluster and namespace the application is deployed to.<br><img src="../../../../images/gitops-environments/app-compact-view.png?display=inline-block" width="70%">.</li></ul>{:/}|
|**Environments**              | Environments are visually organized into columns, color-coded to differentiate between non-production environments (in gray) and production environments (in blue).<br>The column title is the name of the environment. Mouse over displays the edit, delete, and move icons to manage environments. See <a href="https://codefresh.io/docs/docs/deployments/gitops/gitops-environments/#working-with-gitops-environments">Working with GitOps Environments</a>.{::nomarkdown}<ul><li>Each environment is populated with the applications in the cluster-namespace pairs mapped to the environment. <br>An empty environment indicates that there are no applications in the cluster-namespaces mapped to it.</li><li>If the application is assigned to a product, the product name is displayed as the card title. If not, the application name is used.<li>Clicking the application name displays the deployment history for the application. See <a href="https://codefresh.io/docs/docs/deployments/gitops/gitops-environments/#view-deployment-timeline-history-for-applications">View deployment (Timeline) history for applications</a>.</li><li>Every application has a context-menu with quick access to frequently performed actions, such as Synchronize and Refresh. See <a href="https://codefresh.io/docs/docs/deployments/gitops/gitops-environments/#manage-applications-from-within-environments">Manage applications from within environments</a>.</li></ul>{:/} |

## Create GitOps Environments
Create one or more GitOps Environments corresponding to any stage in your development and deployment lifecycle.  
Define the configuration of the environment through a unique name, it's intended usage, and one or more cluster-namespace pairs that define the Argo CD applications populated for that environment. 


1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
    1. **Kind**: The purpose of this environment, and can be either **Production** where the live versions of the applications are deployed,  or **Non-production** where development, testing, staging versions are deployed.
    1. **Tags**: Any metadata providing additional context and information about the environment, used for filtering and organization purposes.
    1. **Clusters and Namespaces**: Single or multiple cluster-namespace pairs to map to the environment. Adding a cluster with one or more namespaces populates the environment with all the applications deployed in the namespaces. When selecting namespaces in a cluster, use `*` as a wildcard for pattern-based matching. For example, you can use `prod-*` to add all namespaces with names starting with `prod-`. 

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
1. Click **Add**. The environment is displayed in the Environments page.  (NIMA: Bogdan - Regex only for )

 

## Create an Environment
View environment dashboard

Simple drag-n-drop for left-right-shift environments  

Environments, products, applications
Codefresh allows you to define a unique relationship between applications and the environments they are deployed to or deployed in through the concept of Products.

Environments aggregates Argo CD applications based on a common dennominator and visualizes their based on deployment destinations.

Instead of switching between each Argo CD Application to see where it is deployed, associating application with environw

## Work with GitOps environments

Once you create an environment, it is displayed in the Environments page.
The Environments dashboard consolidates in one location the environments defined for the account along with the products and applications that belong to each environment.


 
### Edit environments
Update the environment's configuration settings when required. You can change all settings for an environment, including it's name.

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Mouse over the column with the environment to edit, and click {::nomarkdown}<img src="../../../../images/icons/edit.png?display=inline-block">{:/}.
1. Edit the settings as required. 

### Drag and drop to reorder environments
Change the order of the environments displayed in the Environments dashboard to suit your requirements by simple drag and drop. By default, the environments are displayed in the same order in which they were created.

For example, if you have two non-production and one production environment for your e-commerce application, you can order them to display first the non-production and then the production environment to reflect the corresponding stages.

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Mouse over the column with the environment to move.
1. Click {::nomarkdown}<img src="../../../../images/icons/move-environments.png?display=inline-block">{:/} and drag the column to the required location.

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
1. Click {::nomarkdown}<img src="../../../../images/icons/trash.png?display=inline-block">{:/}, type the name of the environment to confirm **Delete**.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/delete-environment.png" 
	url="/images/gitops-environments/delete-environment.png" 
	alt="Delete a GitOps Environment" 
	caption="Delete a GitOps Environment"
  max-width="60%" 
%}


## Work with applications in GitOps Environments

### View deployment (Timeline) history for applications
Review the deployments for the application. Clicking the application name takes you to the Timeline tab with the deployment history for the application. From there, clicking teyou can navigate to the detailed views of
 
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
1. To view all the application's tabs, including the Current State, Configuration, and others, click the link to Full View at the top of the deployment view.


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
