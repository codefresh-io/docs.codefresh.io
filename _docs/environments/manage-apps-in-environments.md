---
title: "Manage Products and applications in Environments"
description: "Promote Products and manage applications from the Environments dashboard"
toc: true
---



## Working with Products and applications in Environments
Environments provide visibility into which applications are running where. If you have created products for applications, environments display the products, and mo and and their associated applications. If there are no products grouping applications, the dashboard displays individual applications.

Use the Environments dashboard to:

Promote products and applications to different environments
Manage individual applications with actions like syncing, refreshing, and editing
View deployment history for applications
Compare deployed versions and dependencies across environments

## Filter applications in Environments by health status
Quickly filter applications within an Environment by health status. For health status descriptions, see [Health status for application resources]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#health-status-for-application-resources).

1. In the Codefresh UI, from the sidebar, select [**Environments**](https://g.codefresh.io/2.0/environments?view=compact){:target="\_blank"}.
1. For any Environment, click the Health status or statuses by which to filter.  
  The Environment displays those applications that match the selected status. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-health-status-filter.png" 
	url="/images/gitops-environments/app-health-status-filter.png" 
	alt="Filter applications in Environment by Health Status" 
	caption="Filter applications in Environment by Health Status"
  max-width="60%" 
%}


## Promote Products and applications
You have two methods for promoting a product or application from the Environments dashboard:
* **Drag-and-drop promotion**  
  Manually move a product or application from one environment to another, and define the Promotion Settings. This method is useful for quickly promoting changes between two environments to test changes, such as promoting an application from development to testing.
* **Promote action**
  Instead of drag-and-drop, select the target environment to promote to, or initiate a predefined Promotion Flow configured with promotion settings, including the action, and Pre-Action and post-action workflows. This method is best suited for structured promotions that follow defined policies.



### Drag-and-drop promotion

Drag a product or application with changes to the target environment to promote it. Customize the Promotion Settings to control promotion behavior for the environment.    
This method is best for quick promotions to test changes within a specific environment, typically in internal environments.  

Watch this video:
{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Drag-and-drop promotions](https://www.youtube.com/watch?v=4isYoutmRco){:target="\_blank"}



##### Before you begin
* Make sure you have permission to trigger promotions in the Environments dashboard


##### How to
1. In the Codfresh UI, from the sidebar, select **Environments**, and then select the environment with the product or application to promote. 
1. Drag the product or application to the desired target environment.
    * On the left, you can see Promotion Settings, either populated from global Policy settings that match the product, or left empty for you to define.  
    * The right panel displays a Compact Diff View with the files and changes to be promoted.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/triggers/drag-n-drop.png" 
url="/images/gitops-promotions/triggers/drag-n-drop.png" 
alt="Promote app through drag-and-drop" 
caption="Promote app through drag-and-drop" 
max-width="60%" 
%}

{:start="3"}
1. If needed, configure the Promotion Settings:
    * Select the Promotion Action as **Commit** (automated) or **Pull Request** (amy require manual approval based on organization policies). 
    * Optional. Select the **Pre-Action Workflow** to run before, and the **Post-Action Workflow** to run after, the Promotion Action.
1. Review the files with the changes.
1. Add information on the commit or PR.
1. Click **Promote**.

A release is created for the Product and the Release tab displays the ongoing deployment.



### Using the Promote action

Select the Promote option to promote a product or application to a target environment or by triggering a Promotion Flow. 
* **Target environment** (manual, configurable): Similar to drag-and-drop, this option lets you select a target environment and define the Promotion Settings before applying the promotion.
* **Promotion Flow** (predefined, automated): This option allows you to view the available Promotion Flows, including their configured environments and settings, then select a Flow to trigger. The settings are predefined and cannot be modified.

##### Before you begin
* Make sure you have permission to trigger promotions in the Environments dashboard

##### How to
1. In the Codfresh UI, from the sidebar, select **Environments**. 
1. Click the context menu of the product or application with the change to promote, and select **Promote**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/triggers/promote-app-context-menu.png" 
url="/images/gitops-promotions/triggers/promote-app-context-menu.png" 
alt="Promote option in context menu" 
caption="Promote option in context menu" 
max-width="60%" 
%}

{:start="3"}
1. To promote to a specific environment, do the following:
  * From the **Select target environment** list, select the environment to promote to and click **Next**.
  * To trigger a Promotion Flow, select **Trigger Promotion Flow**, and click **Next**.
  * In the Commit Changes page, if needed, define the Promotion Settings:
      * Select the Promotion Action as **Commit** (automated) or **Pull Request** (amy require manual approval based on organization policies). 
      * Optional. Select the **Pre-Action Workflow** to run before, and the **Post-Action Workflow** to run after, the Promotion Action.
  * Review the files with the changes to be promoted. 
  * Click **Promote**.
1. To trigger a Promotion Flow, do the following:
  * Select **Trigger Promotion Flow**, and click **Next**.
  * Select a Promotion Flow from the list and view the environments and promotion settings configured for the Flow.
  * Click **Trigger**. 

A release is created for the product, and the Release tab displays the ongoing deployment.








## View and compare deployed versions for dependencies
View the dependencies included with each application, and compare versions of the application and dependencies deployed in different Environments. Track the progress of the applications, understand the changes made, and ensure that customers are using the latest or most appropriate release.

**Table and YAML views**
* Table: Compare more than two applications.
* YAML: Compare up to two applications.

**Dependency chart versions**
* List the charts (dependencies) deployed with the application and the release version for each
* Compare versions of dependencies in the different applications




##### How to
1. In the Codefresh UI, from the sidebar, select **Environments**.
1. Click the version number of the application.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/version-info.png" 
	url="/images/gitops-environments/version-info.png" 
	alt="Helm chart version for application" 
	caption="Helm chart version for application"
  max-width="60%" 
%}
  
{:start="3"}
1. To compare the versions of dependencies for the selected application across different Environments, enable **Compare**.
1. Select the Environments to compare to. 
1. To compare the versions of the dependencies for the applications in the selected Environments, switch to **Table** view.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/app-dependency-list.png" 
	url="/images/gitops-products/app-dependency-list.png" 
	alt="App dependencies and versions" 
	caption="App dependencies and versions"
  max-width="60%" 
%}

{:start="6"}
1. To see the actual diffs between the applications, switch to **YAML** view, and then toggle between **Full**/**Compact** views.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/version-compare-apps.png" 
	url="/images/gitops-environments/version-compare-apps.png" 
	alt="Compare versions of dependencies in different Environments" 
	caption="Compare versions of dependencies in different Environments"
  max-width="60%" 
%}


## View deployment (Timeline) history for applications
Review the deployments for a specific application in the Environments dashboard. 

1. In the Codefresh UI, from the sidebar, select Environments.
1. In the Environment column with the application you require, click the application name to view deployment history.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-timeline-view.png" 
	url="/images/gitops-environments/app-timeline-view.png" 
	alt="View deployment history for application in Environments dashboard" 
	caption="View deployment history for application in Environments dashboard"
  max-width="60%" 
%}

{:start="3"}
1. To view all the application’s tabs, including the Current State, Configuration, and others, click the link to **Full View** at the top of the deployment view.

## Manage individual applications
Manage applications from the Environments dashboard through each application's context menu, including manual sync, refresh, and other options.

1. In the Codefresh UI, from the sidebar, select **Environments**.
1. In the Environment with the application for which to take action, click the context menu to the right of the application, and select the option:
  * [Quick View]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#view-deployment-configuration-info-for-selected-argo-cd-application): View deployment, definition, and event information for the selected application in the same location.
  * [Diff View]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#analyze-out-of-sync-applications-in-diff-view): Analyze out of sync applications. This option is disabled when applications are synced.
  * [Synchronize]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-synchronize-an-argo-cd-application): Manually synchronize the application to expedite Git-to-cluster sync. 
  * [Refresh/Hard Refresh]({{site.baseurl}}/docs/deployments/gitops/manage-application/#refreshhard-refresh-argo-cd-applications): As an alternative to manually syncing an application, either sync the application with the desired state in Git (refresh), or sync the application with the desired state Git while removing the cache (hard refresh).
  * [Edit]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-argo-cd-application-definitions): Update General or Advanced configuration settings for the application.
  * [Delete]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-argo-cd-applications): Delete the application from Codefresh.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-context-menu-actions.png" 
	url="/images/gitops-environments/app-context-menu-actions.png" 
	alt="Context menu with actions for Argo CD applications within GitOps Environments" 
	caption="Context menu with actions for Argo CD applications within GitOps Environments"
  max-width="60%" 
%}

## Related articles
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Create and manage Environments]({{site.baseurl}}/docs/environments/create-manage-environments/)  
[About Environments]({{site.baseurl}}/docs/environments/environments-overview/)  


