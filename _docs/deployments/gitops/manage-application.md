---
title: "Managing Argo CD applications"
description: ""
group: deployments
sub_group: gitops
toc: true
---

Application creation and deployment is one part of the continuous deployment/delivery process. An equally important part is optimizing deployed applications as and when needed. 

There are two aspects to managing and optimizing Argo CD applications in Codefresh:
* Optimizing deployments through GitOps Environments and Products 
* Managing individual applications 

##### Optimizing application deployments 

* [GitOps Environments](#gitops-environments--argo-cd-applications)  
  The GitOps Environments dashboard visualizes Argo CD applications within the context of their environments, allowing you to track their journey through the software development lifecycle.

* [GitOps Products](#gitops-products--argo-cd-applications)  
  The GitOps Products dashboard displays applications grouped within a Product, with version, Git, and feature-tracking information. 

##### Managing individual applications

>**NOTE**  
  The actions you can perform depend on the [permissions]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/) assigned to you. 


* [Edit Argo CD applications](#edit-argo-cd-application-definitions)  
  Optimize deployed applications by changing application definitions when needed.

* [Manage Application Groups](#manage-application-groups)  
  Add to and remove applications from Application Groups.

* [Synchronize Argo CD applications](#manually-synchronize-an-argo-cd-application)   
  Sync applications on-demand by manually applying sync options or by manually selecting the resources to sync.

* [Configure sync-timeout for Argo CD applications](#configure-sync-timeout-for-argo-cd-applications)  
  Configure the sync-timeout through an annotation to be notified of long sync operations.

  
* [Terminate sync for Argo CD applications](#terminate-on-going-sync-for-argo-cd-applications)  
  With a single-click, terminate on-going sync processes when needed.

* [Refresh Argo CD applications](#refreshhard-refresh-argo-cd-applications)  
  Manually refresh applications with a single-click, as an alternative to manually synchronizing them.

* [Rollback Argo CD applications](#rollback-aro-cd-applications)   
  Rollback applications to previous deployment versions.

* [Manage rollouts for deployments](#manage-rollouts-for-argo-cd-application-deployments)  
  Control ongoing rollouts by resuming indefinitely paused steps, promoting rollouts, aborting, restarting and retrying rollouts. 

* [Rename an ApplicationSet](#rename-an-application-set)  
  Change the name of an existing ApplicationSet and point all its applications to the new ApplicationSet.

* [Delete Argo CD applications](#delete-argo-cd-applications)  
  Delete unused or legacy applications to avoid clutter and remove unnecessary resources.

  To delete specific resources within an application, see [Delete application resources]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#delete-application-resources).


## GitOps Environments & Argo CD applications
To track, optimize, and manage deployments at scale you need a way to visualize applications at every stage of their development and deployment lifecycle. Our custom Environment resource allows you to do just this without the need for complex configuration and maintenance overhead. 

Create Environments by defining one or more pairs of clusters and namespaces for it. Codefresh collates the data on these Environments, populates them with the applications deployed to the target clusters and namespaces. Visualize the environments and their applications in the GitOps Environments dashboard to track promotions and view version and details on the most recent commits that caused the change.

Here's a visualization of Argo CD applications in the GitOps Environments dashboard.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	url="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	alt="Argo CD applications organized in GitOps Environments" 
	caption="Argo CD applications organized in GitOps Environments"
  max-width="70%" 
%}

For detailed information on how to work with Argo CD applications and Environments in Codefresh, see [GitOps Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/).

## GitOps Products & Argo CD applications
The Product is another custom resource from Codefresh, also enhancing application management at scale. As teams expand and applications and services multiply, keeping track of deployments across various environments can become challenging, if not unmanageable. 

Instead of having to switch between applications, or switch across multiple tools to track and manage different aspects of deployments, Products allow you to group applications into cohesive units, simplifying viewing, tracking, and management. 
Codefresh seamlessly collates the Environments where each application in the Product is deployed, along with insights into commits, contributors, and features deployed across versions.

Here's a visualization of Argo CD applications grouped by Products in the GitOps Products dashboard.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by Products and organized by Environments" 
	caption="Argo CD applications grouped by Products and organized by Environments"
  max-width="70%" 
%}

For detailed information on how to work with Argo CD applications and Products in Codefresh, see [GitOps Products]({{site.baseurl}}/docs/dashboards/gitops-products/).



## Edit Argo CD application definitions 
Update General or Advanced configuration settings for a deployed Argo CD application through the Configuration tab. Once the application is deployed to the cluster, the Configuration tab is available on selecting the application in the GitOps Apps dashboard. 

>**NOTE**  
  You cannot change application definitions (the application name and the selected runtime), and the Git Source selected for the application.

**How to**  

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Do one of the following: 
  * Select the application to update, and then from the context menu on the right, select **Edit**. 
  
  * Click the application and then select the **Configuration** tab.

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/edit-app-configuration-tab.png" 
   url="/images/applications/edit-app-configuration-tab.png" 
   alt="Configuration tab with application settings" 
   caption="Configuration tab with application settings"
   max-width="70%" 
   %} 

{:start="3"}
1. Update the **General** or **Advanced** configuration settings as needed:  
  [General configuration]({{site.baseurl}}/docs/deployments/gitops/create-application/#application-general-configuration-settings)  
  [Advanced configuration]({{site.baseurl}}/docs/deployments/gitops/create-application/#application-advanced-configuration-settings)  
  When you change a setting, the Commit and Discard Changes buttons are displayed.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/edit-app-change-setting.png" 
   url="/images/applications/edit-app-change-setting.png" 
   alt="Edit application settings" 
   caption="Edit application settings"
   max-width="70%" 
   %} 

{:start="4"}
1. Do one of the following:
   * To _commit all changes_, click **Commit**. This final commit screen is displayed with a diff view of the changes.  
   * To _undo all changes_ and return to the previous settings, click **Discard Changes**. This action removes all the changes you have made so far and returns you to the GitOps Apps dashboard.

      {{site.data.callout.callout_tip}}
      **TIP**  
      If you change settings and then restore existing values for the same, Codefresh automatically removes the Commit and Discard Changes buttons as there are no new changes to commit or discard. 
      {{site.data.callout.end}}

  {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/edit-app-diff-view.png" 
   url="/images/applications/edit-app-diff-view.png" 
   alt="Commit changes with diff view" 
   caption="Commit changes with diff view"
   max-width="70%" 
   %} 

{:start="5"}
1. To confirm all changes, at the bottom-left, click **Commit**.
  The changes are committed to Git, and in a few moments also synced to the cluster. 




## Manage Application Groups

Clicking on an Application Group in the Group tab navigates to the list of applications in the Group.
You can see the collective timelines for all applications within the group, instead of the individual source, health, or target information for each application.

Once you assign an application to a group, you can add it to or remove it from different Application Groups through the application's Configuration settings. See also [Application Groups for Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/).


1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and then click the **Configuration** tab.
1. From **Groups**, do one of the following:
  * To add the application to one or more groups, select the group or groups.
  * To remove the application from a group, click the remove button for the group.





## Manually synchronize an Argo CD application
Manually synchronize an application to expedite Git-to-cluster sync.  The sync options selected for manual sync override the sync options defined for the application.  
The sync options, grouped into Revision and Additional Settings, are identical to the Sync options in the General settings when you created the application. 

{{site.data.callout.callout_tip}}
**TIP**   
You can also synchronize _application resources_ with sync statuses such as `Service`, `AnalysisTemplate`, and `Rollouts` resources for example, in the Current State tab. Select the Sync option from resource's context menu. 
{{site.data.callout.end}}

**Before you begin**  
* Review:  
  [Revision settings for application sync](#revision-settings-for-application-sync)  
  [Additional Options for application sync](#additional-options-for-application-sync)  
  [Synchronize resources](#synchronize-resources-in-the-application)  

**How to**  
1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. To sync an application, select the application to sync, and do one of the following: 
  * From the context menu on the right, select **Synchronize**. 
  * On the top-right, click **Synchronize**.  
1. To sync a resource:
  * Click the application with the resource to sync.
  * In the **Current State** tab, open the context menu of the resource, and then select **Sync**. 

1. Select the **Revision** and **Additional Options** for the manual sync.  
  Review 
1. Click **Next**.
1. In the Synchronize Resources form, select the scope of the manual sync:
  * To sync only specific resources, search for the resources by any part of their names, or define a Regex to filter by the required resources.  
  * **All**: Sync all resources regardless of their sync state.
  * **Out of sync**: Sync _only_ resources that are `Out of sync`.  


### Revision settings for application sync
Revision settings determine the behavior for the branch you select.  

**Revision** 
The branch in Git to synchronize with the cluster.

**Prune**
When selected, removes legacy resources from the cluster that do not exist currently in the Git branch. 

**Apply only**
When selected, syncs only those resources in the application that have been changed and are `OutOfSync`, instead of syncing every resource regardless of their state. This option is useful to reduce load and save time when you have thousands of resources in an application. See [Selective Sync](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#selective-sync){:target="\_blank"}.

**Dry run**
When selected, allows you to preview the application before changes are made to the cluster. 

**Force**  
When selected, orphans the dependents of a deleted resource during the sync operation. This option is useful to prevent 



### Additional Options for application sync

#### Sync Options

* **Skip schema validation**  
  When selected, bypasses validating the YAML schema.  
* **Auto-create namespace**   
  When selected, automatically creates the namespace if the specified namespace does not exist in the cluster. If the namespace already exists, this setting is ignored.
* **Prune last**  
  When selected, removes those resources that do not exist in the currently deployed version during the final wave of the sync operation. See [Prune last](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#prune-last){:target="\_blank"}.  
* **Apply out of sync only**
  When selected, syncs only those resources in the application that have been changed and are `OutOfSync`, instead of syncing every resource regardless of their state. This option is useful to reduce load and save time when you have thousands of resources in an application. See [Selective Sync](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#selective-sync){:target="\_blank"}.  
* **Respect ignore differences**  
  When selected, Argo CD omits resources defined for the `spec.ignoreDifferences` attribute from the sync. Otherwise, Argo CD implements the desired state ad-hoc during the sync operation. See [Respect ignore difference configs](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#respect-ignore-difference-configs){:target="\_blank"}.

#### Prune propagation policy
{::nomarkdown}Defines how resources are pruned, applying Kubernetes cascading deletion prune policies. 
Read more at <a href="https://kubernetes.io/docs/concepts/architecture/garbage-collection/#cascading-deletion" target="_blank">Kubernetes - Cascading deletion</a>.<ul><li><b>Foreground</b>: The default prune propagation policy used by Argo CD. With this policy, Kubernetes changes the state of the owner resource to `deletion in progress`, until the controller deletes the dependent resources and finally the owner resource itself. </li><li><b>Background</b>: When selected, Kubernetes deletes the owner resource immediately, and then deletes the dependent resources in the background.</li><li><b>Orphan</b>: When selected, Kubernetes deletes the dependent resources that remain orphaned after the owner resource is deleted.</li></ul> </br>{:/}
All Prune propagation policies can be used with:  

**Replace**: When selected, Argo CD executes `kubectl replace` or `kubectl create`, instead of the default `kubectl apply` to enforce the changes in Git. This action will potentially recreate resources and should be used with care. See [Replace Resource Instead Of Applying Change](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#replace-resource-instead-of-applying-changes){:target="\_blank"}.   
  

**Retry**: When selected, retries a failed sync operation, based on the retry settings configured:   
* Maximum number of sync retries (**Limit**)  
* Duration of each retry attempt in seconds, minutes, or hours (**Duration**)  
* Maximum duration permitted for each retry (**Max Duration**)  
* Factor by which to multiply the Duration in the event of a failed retry (**Factor**). A factor of 2 for example, attempts the second retry in 2 X 2 seconds, where 2 seconds is the Duration.



### Synchronize resources in the application
Synchronize Resource options allow you to selectively sync application resources. You can bypass sync settings at the application level, and directly select the resources you want to sync, by state or otherwise.  
* All resources regardless of their sync states
* Only out-of-sync resources
* Only selected resources

By default, Synchronize Resources displays and selects all resources in the application. 

   {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/sync-manual-resources-form.png" 
   url="/images/applications/sync-manual-resources-form.png" 
   alt="Default settings for Synchronize Resources" 
   caption="Default settings for Synchronize Resources"
   max-width="50%" 
   %} 

You can search/filter resources using part of the resource names or regex strings, and then select the resources you want to sync.
For example, if you made changes to `api` resources or `audit` resources, type `api` or `audit` to locate the resources and then selectively sync those resources.

   {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/sync-manual-resource-search.png" 
   url="/images/applications/sync-manual-resource-search.png" 
   alt="Selective sync in Synchronize Resources" 
   caption="Selective sync in Synchronize Resources"
   max-width="50%" 
   %} 


## Configure sync-timeout for Argo CD applications
Add an annotation with the timeout threshold for the application to get notified when an ongoing sync exceeds the defined timeout.  
Codefresh uses Argo CD's default duration of 30 minutes which you can customize as needed.  

Instead of waiting indefinitely for syncs to complete and then navigating through the GitOps Apps dashboard, get timely warnings from Codefresh.

* Add the following annotation to the application's YAML with the timeout you need:
  ```yaml
  annotation:
  codefresh.io/app-sync-warning-threshold: "35"
  ```
  Codefresh displays a warning in the **Warnings/Errors** button at the top right of the Applications tab in the GitOps Apps dashboard, when the sync duration exceeds the timeout specified.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/app-sync-timeout-warning.png" 
   url="/images/applications/app-sync-timeout-warning.png" 
   alt="Sync duration exceeded warning for application" 
   caption="Sync duration exceeded warning for application"
   max-width="60%" 
   %} 


You can view more [details on the sync]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#warning-long-sync) or [terminate](#terminate-on-going-sync-for-argo-cd-applications) it.



## Terminate on-going sync for Argo CD applications
Manually terminate an on-going synchronization process for the application. You may need to terminate an on-going sync that remains indefinitely as Syncing, or because you have detected problems in the current deployment 
Terminating a sync operation reverts the deployment to the previously deployed version or image.  

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. If needed, filter by **Status** **Syncing** to view applications with active sync operations.
1. Select the application and then from the application header, click **Terminate Sync**.

   {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/app-terminate-sync.png" 
   url="/images/applications/app-terminate-sync.png" 
   alt="Manually terminate on-going sync" 
   caption="Manually terminate on-going sync"
   max-width="50%" 
   %} 




## Refresh/hard refresh Argo CD applications

As an alternative to manually syncing an application, either refresh or hard refresh the application. Both options are always available in the application toolbar.

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application, and then from the top-right, select the required action:  
  * **Refresh**: Retrieve desired (Git) state, compare with the live (cluster) state, and refresh the application to sync with the desired state.
  * **Hard Refresh**: Refresh the application to sync with the Git state, while removing the cache.

   {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/app-refresh-hard-refresh.png" 
   url="/images/applications/app-refresh-hard-refresh.png" 
   alt="Refresh/Hard Refresh for applications" 
   caption="Refresh/Hard Refresh for applications"
   max-width="50%" 
   %} 

## Rollback Argo CD applications
Rollback to a previously deployed version of active Argo CD applications. You may want to roll back a newly deployed version due to errors in your code or misconfigurations, etc.  

### Prerequisites for rollback

Rollback can be disabled for the following reasons:

* **Auto-sync ON for applications**  
  If auto-sync is `ON`, the default behavior for GitOps is to sync the cluster with the desired state in Git. The Rollback button is disabled with a tooltip.


  For application rollback, auto-sync must be `OFF`. The quickest and easiest way to identify auto-sync status is through the Application Header.  
  To change the setting, [edit]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-application-definitions) the application's [General configuration settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#application-general-configuration-settings).


  {% include
image.html
lightbox="true"
file="/images/applications/app-rollback-autosync-app-header.png"
url="/images/applications/app-rollback-autosync-app-header.png"
alt="Auto-sync status in Application Header"
caption="Auto-sync status in Application Header"
max-width="80%"
%}

* **Deployment version for rollback older than history limit**  
  By default, you can roll back to any the previous ten deployments (same as Argo CD). 
  If you try to roll back to a deployment older than ten of the most recent deployments, the Rollback option is disabled with a tooltip, that the 'Release is not in history'.

    {{site.data.callout.callout_tip}}
    **TIP**    
    To configure a different number, edit the application manifest and add `RevisionHistoryLimit` set to the number of previous deployments you need in the `spec` section.
    {{site.data.callout.end}}
 

* **Deleted version of application**  
  You can activate rollback only for _new_ and currently active application versions that are deployed.  
  If you deleted an application and then recreated it with the same name, you cannot rollback to the deleted version or to any version prior to the deletion. The Rollback button is disabled with a tooltip.
  
  {% include
image.html
lightbox="true"
file="/images/applications/app-rollback-disabled.png"
url="/images/applications/app-rollback-disabled.png"
alt="Rollback disabled for deleted version of application"
caption="Rollback disabled for deleted version of application"
max-width="80%"
%}




### How to rollback an application 
1. In the Codefresh UI, from Ops in the sidebar, select **GitOps Apps**. 
1. Select the application to rollback and then click the **Timeline** tab.
1. In the Application Header, verify that Auto-sync is `OFF` for the application.
1. Mouse over the deployment version to rollback to view the Rollback option. 

  {% include
image.html
lightbox="true"
file="/images/applications/app-rollback-enabled.png"
url="/images/applications/app-rollback-enabled.png"
alt="Rollback application in Timeline tab"
caption="Rollback application in Timeline tab"
max-width="70%"
%}

{:start="5"}
1. To start, click **Rollback** and confirm.
  * The 'Rollout process started' notification is displayed.
  * The application's Health status changes to `Progressing` and the Sync status changes to `out-of-sync`.
  *  A deployment record is created for the rollout with `Progressing`.

  {% include
image.html
lightbox="true"
file="/images/applications/app-rollback-progressing.png"
url="/images/applications/app-rollback-progressing.png"
alt="Rollback progressing in deployment record"
caption="Rollback progressing in deployment record"
max-width="70%"
%}

Once completed, the application's statuses are updated.  

  {% include
image.html
lightbox="true"
file="/images/applications/app-rollback-completed.png"
url="/images/applications/app-rollback-completed.png"
alt="Rollback completed for application"
caption="Rollback completed for application"
max-width="70%"
%}

## Manage rollouts for Argo CD application deployments
Control ongoing rollouts by resuming indefinitely paused steps, promoting rollouts, aborting, restarting and retrying rollouts.  



### Pause/resume ongoing rollouts
Pause and resume ongoing rollouts directly from the Timeline tab in the GitOps Apps dashboard.  
If the rollout is already automatically paused as result of a step definition, this action pauses the rollout even after the pause duration.


1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and go to the Timelines tab.
1. In the deployment record for the ongoing rollout, expand **Updated Services**.
1. Based on the current state of the rollout, click **Pause** or **Resume**, as relevant.

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/rollout-resume-indefinite-pause.png" 
   url="/images/applications/rollout-resume-indefinite-pause.png" 
   alt="Resume paused rollout" 
   caption="Resume paused rollout"
   max-width="70%" 
   %}



### Manage an ongoing rollout with the Rollout Player
Manage an ongoing rollout using the controls in the Rollout Player to skip steps, and promote rollouts.

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and go to the Timelines tab.
1. In the deployment record for the ongoing rollout, click the name of the rollout. 
1. Select the required option in the Rollout Player.


{% include
image.html
lightbox="true"
file="/images/applications/rollout-player.png"
url="/images/applications/rollout-player.png"
alt="Rollout Player controls for an ongoing rollout"
caption="Rollout Player controls for an ongoing rollout"
max-width="50%"
%}

 
The table describes the controls in the Rollout Player.

{: .table .table-bordered .table-hover}
| Rollback player option   | Description |  
| --------------  | ------------| 
| **Rollback**      | Rolls back to the previous deployment. See also [Prerequisites for rollback](#prerequisites-for-rollback).  | 
|**Abort**          | Terminate the current rollout. | 
| **Pause**         | Pause the rollout. If the rollout is already automatically paused as the result of a step definition, clicking Pause pauses the rollout also after the pause duration. | 
| **Resume** <!---{::nomarkdown}<img src="../../../images/icons/rollout-resume.png" display=inline-block"> {:/}-->| Resume a rollout that was paused either manually by clicking Pause, or automatically through the step's definition. | 
|**Retry**              | Retry a rollout that has been aborted. Restarts the rollout from the beginning. Available only when a rollout has been aborted. | 
| **Skip step** <!---{::nomarkdown}<img src="../../../images/icons/rollout-skip-step.png" display=inline-block"> {:/}--> | Skip execution of current step. Such steps are marked as Skipped in the rollout visualization. | 
| **Promote full** <!---{::nomarkdown}<img src="../../../images/icons/rollout-promote-full.png" display=inline-block"> {:/} -->  | Skip all remaining steps, and deploy the current image. |        



### Manually rollback completed rollout to previous revision
<!--- add screenshots -->
Manually rollback a completed rollout to a previous revision when and if needed. If after a successful analysis run and rollout, your application is not functioning as it should, you can rollback to a prior revision from the Rollout’s revision history. The revision depth is determined by the `spec.revisionHistoryLimit` parameter in the [Rollout Specification](https://argoproj.github.io/argo-rollouts/features/specification/#rollout-specification){:target="\_blank"}.
Manual rollback changes the live state of the rollout resource to the state in the previous commit that you select.

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and select the **Timeline** tab.
1. Click the name of the rollout to rollback.
1. From the **Choose version to Rollabck** dropdown, select the revision to rollback to.
1. Review the changes in the revision. 
1. In the Rollout Player, click **Rollback to**.


### Manage the Rollout resource

Control the rollout through the options available for the Rollout resource in the Current State tab. 

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application and go to the Current State tab.
1. Open the context menu of the `Rollout` resource, and select the relevant option. 

{% include
image.html
lightbox="true"
file="/images/applications/rollout-resource-context-menu.png"
url="/images/applications/rollout-resource-context-menu.png"
alt="Options for `rollout` resource in the Current State tab"
caption="Options for `rollout` resource in the Current State tab"
max-width="50%"
%}

The table describes the options for the `Rollout` resource.

{: .table .table-bordered .table-hover}
| Option             | Description              | 
| --------------    | --------------           |
|**Abort**              | Terminate the current rollout. | 
|**Pause**              | Pause the current rollout.  | 
|**Promote-full**       | Promote the current rollout by skipping all remaining stages in the rollout, and deploy the current image.  | 
|**Restart**            | Manually restart the pods of the rollout.| 
|**Resume**             | Resume a rollout that has been paused. | 
|**Retry**              | Retry a rollout that has been aborted. Available only when a rollout has been aborted. | 
|**Skip-current-step**  | Skip executing the current step, and continue with the next step. | 

## Rename an Application Set
Rename an Application Set and point all existing applications to the Application Set.

1. In the Codefresh UI, from the sidebar, select [**GitOps Apps**](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Click the Git Source application with the Application Set.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/rename-appset/appset-view.png" 
   url="/images/applications/rename-appset/appset-view.png" 
   alt="GitOps Apps dashboard with example ApplicationSet" 
   caption="GitOps Apps dashboard with example ApplicationSet"
   max-width="70%" 
   %}

{:start="3"}
1. From the Application Header, click the link in Source to go the repo in your Shared Configuration Repository.

{% include 
	image.html 
	lightbox="true" 
	file="/images/applications/rename-appset/source-repo-link.png" 
	url="/images/applications/rename-appset/source-repo-link.png" 
	alt="Link to source repo in Application Header" 
	caption="Link to source repo in Application Header"
  max-width="50%" 
%}

{:start="4"}
1. In Git, open the `appset.yaml`, click **Edit**, and do the following:
  * Rename the ApplicationSet as needed.  
  * Disable auto-sync by commenting out the lines with sync options.  
  * Commit the changes.

{% include 
	image.html 
	lightbox="true" 
	file="/images/applications/rename-appset/auto-sync-rename-appset.png" 
	url="/images/applications/rename-appset/auto-sync-rename-appset.png" 
	alt="Rename ApplicationSet and comment out sync options" 
	caption="Rename ApplicationSet and comment out sync options"
  max-width="50%" 
%}

{:start="5"}
1. Go back to the **GitOps Apps** dashboard in the Codefresh UI, and verify that the **Current State** tab displays the renamed ApplicationSet.  
  As you can see in the picture below, the Current State tab displays the new ApplicationSet, but the applications still point to the old ApplicationSet. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/applications/rename-appset/renamed-appset-current-state.png" 
	url="/images/applications/rename-appset/renamed-appset-current-state.png" 
	alt="Renamed ApplicationSet as new ApplicationSet in Current State tab" 
	caption="Renamed ApplicationSet as new ApplicationSet in Current State tab"
  max-width="50%" 
%}

{:start="6"}
1. Go to the cluster with the applications, and change Owner Reference of the existing applications to point them to the new ApplicationSet by running:
  ```
  kubectl get applications -o=json -n <namespace> | jq -r '.items[] | select(.metadata.ownerReferences[0].name == "<orginal-appset-name>") | .metadata.name' | xargs -I {} kubectl patch application {} --type="json" -p='[{"op": "replace", "path": "/metadata/ownerReferences/0/name", "value": "<new-appset-name>"}]' -n <namespace>
  ```
  where:  
    * `<namespace>` is the namespace on the cluster where the applications are deployed, for example, `argocd`.
    * `<orginal-appset-name>` is the _old name_ of the ApplicationSet, for example, `"example-appset-v4"`. 
    * `<new-appset-name>` is the _new name_ of the renamed ApplicationSet, for example, `"example-appset-v5"`.

{:start="7"}
1. Go back to the GitOps dashboard in the Codefresh UI, and in the Current State tab make sure that the applications are now linked to the renamed (new) ApplicationSet.

{% include 
	image.html 
	lightbox="true" 
	file="/images/applications/rename-appset/apps-point-to-new-appset.png" 
	url="/images/applications/rename-appset/apps-point-to-new-appset.png" 
	alt="Applications linked to new ApplicationSet in Current State tab" 
	caption="Applications linked to new ApplicationSet in Current State tab"
  max-width="50%" 
%}

{:start="8"}
1. Click **Synchronize** and wait for the synchronization to complete.
1. Delete the old ApplicationSet, as described in [Delete Argo CD applications](#delete-argo-cd-applications) in this article.

{% include 
	image.html 
	lightbox="true" 
	file="/images/applications/rename-appset/delete-old-appset.png" 
	url="/images/applications/rename-appset/delete-old-appset.png" 
	alt="Delete old ApplicationSet" 
	caption="Delete old ApplicationSet"
  max-width="50%" 
%}

## Delete Argo CD applications
Delete an Argo CD application from Codefresh. Deleting an application deletes the manifest from the Git repository, and then from the cluster where it is deployed. When deleted from the cluster, the application is removed from the GitOps Apps dashboard in Codefresh.
 
{{site.data.callout.callout_warning}}
**WARNING**  
**Prune resources** in the application's General settings determines the scope of the delete action.  
When selected, both the application and its resources are deleted. When cleared, only the application is deleted. For more information, review [Sync settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#sync-settings).  
Codefresh warns you of the implication of deleting the selected application in the Delete form. 
{{site.data.callout.end}}

1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Select the application to delete.
1. Click the three dots for additional actions, and select **Delete**.
  
  {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/app-delete-option.png" 
   url="/images/applications/app-delete-option.png" 
   alt="Delete application" 
   caption="Delete application"
   max-width="80%" 
   %} 

  Pay attention to the _impact of the delete action_ for the selected application that Codefresh displays.

   {% include 
   image.html 
   lightbox="true" 
   file="/images/applications/delete-app-prune-affects.png" 
   url="/images/applications/delete-app-prune-affects.png" 
   alt="Prune setting impact on deleting application" 
   caption="Prune setting impact on deleting application"
   max-width="70%" 
   %} 

{:start="4"}
1. To confirm, click **Commit & Delete**.


## Add external links to application resources
Add external links to application resources through annotations to view and access them directly from the Current State's Tree view.    
External links include links to dashboards such as monitoring dashboards, documentation, or any other external resource you think is relevant to the resource.  

See Argo CD's documentation on [Adding external URL](https://argo-cd.readthedocs.io/en/stable/user-guide/external-url/){:target="\_blank"}.


1. From the sidebar, select GitOps Apps, and then select the application for which to add external links.
1. Add the following annotation:

```yaml
...
metadata:
  annotations:
    link.argocd.argoproj.io/external-link: <external-link. # http://my-grafana.example.com/pre-generated-link
...
```
1. Click the icon is displayed next to the resource in the Tree view to access the external link.





## Related articles
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Troubleshooting Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/troubleshooting-gitops-apps)  
[GitOps Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)    
[GitOps Products dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)   
[Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics)  



