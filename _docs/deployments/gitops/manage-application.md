---
title: "Managing Argo CD applications"
description: "Explore options and actions to manage applications"
group: deployments
sub_group: gitops
toc: true
---

## Managing Argo CD applications
Application creation and deployment is one part of the continuous deployment/delivery process. An equally important part is tracking, optimizing, and managing applications after deployment. 

There are two aspects to managing Argo CD applications in Codefresh GitOps:
* Optimizing deployments through environments and products 
* Managing individual applications 

### Optimizing application deployments 

* [Environments](#gitops-environments--argo-cd-applications)  
  Environments provide visibility into Argo CD applications in the context of their software lifecycle helping you track promotions from development to production.

* [Products](#gitops-products--argo-cd-applications)  
  Products group applications into logical units, showing version history, Git metadata, and feature tracking for improved organization and scalability.


### Managing individual applications

>**NOTE**  
  Available actions depend on your assigned [permissions]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/). 


* [Edit Argo CD applications](#edit-argo-cd-application-definitions)  
  Modify application configurations or update settings to align with deployment needs.

* [Manage Application Groups](#manage-application-groups)  
  Add to and remove applications from Application Groups.

* [Sync Argo CD applications](#manually-sync-an-argo-cd-application)   
  Sync applications on-demand by manually applying sync options or by manually selecting the resources to sync.

* [Configure sync timeout for Argo CD applications](#configure-sync-timeout-for-argo-cd-applications)  
  Configure the sync timeout through an annotation to be notified of long sync operations.


* [Terminate sync for Argo CD applications](#terminate-on-going-sync-for-argo-cd-applications)  
  With a single-click, terminate on-going sync process when needed.

* [Refresh Argo CD applications](#refreshhard-refresh-argo-cd-applications)  
  Force a refresh to fetch the latest application state without triggering a sync.

* [Rollback Argo CD applications](#rollback-argo-cd-applications)   
  Rollback applications to previous deployment versions.

* [Manage rollouts for deployments](#manage-rollouts-for-argo-cd-application-deployments)  
  Control ongoing rollouts by resuming indefinitely paused steps, promoting rollouts, aborting, restarting and retrying rollouts. 

* [Rename an ApplicationSet](#rename-an-application-set)  
  Change the name of an existing ApplicationSet and point all its applications to the new ApplicationSet.

* [Enable precise sync detection for monorepo apps](#enable-precise-sync-detection-for-monorepo-apps)  
  Enable the ACR Controller in GitOps Runtimes to precisely detect sync operations that triggered deployments for applications in monorepo setups.

* [Delete Argo CD applications](#delete-argo-cd-applications)  
  Delete unused or legacy applications to avoid clutter and remove unnecessary resources.

  To delete specific resources within an application, see [Delete application resources]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#delete-application-resources).


## Environments & Argo CD applications
Tracking and managing deployments at scale requires clear visibility into applications at every stage. Codefresh GitOps provides this visibility through environments.  
When you define an environment by specifying one or more cluster-namespace pairs, Codefresh automatically detects and displays the applications deployed to those locations.

Use environments to:
* Promote applications
* Track promotions
* Monitor application versions
* View recent commits that introduced changes


Here's a visualization of the Environments dashboard with Argo CD applications.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	url="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	alt="Argo CD applications organized in GitOps environments" 
	caption="Argo CD applications organized in GitOps environments"
  max-width="70%" 
%}

For detailed information, see [environments]({{site.baseurl}}/docs/environments/environments-overview/) and [Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/).

## Products & Argo CD applications
As applications and teams scale, tracking deployments across multiple environments can become challenging. Products in Codefresh GitOps provide a structured way to manage and track related applications across teams and environments.

Unlike environments, which focus on deployment tracking, products offer a broader view of multiple applications, simplifying organization and management.

Here's a visualization of Argo CD applications grouped by products in the Products dashboard.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by products and organized by environments" 
	caption="Argo CD applications grouped by products and organized by environments"
  max-width="70%" 
%}

For detailed information, see [products]({{site.baseurl}}/docs/products/about-products/) [GitOps Products dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/).



## Edit Argo CD application definitions 
Update General or Advanced configuration settings for a deployed Argo CD application through the Configuration tab. Once the application is deployed to the cluster, the Configuration tab is available on selecting the application in the GitOps Apps dashboard. 

>**NOTE**  
  You cannot change application definitions (the application name and the selected runtime), and the Git Source selected for the application.

**How to**  

1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
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


1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
1. Select the application and then click the **Configuration** tab.
1. From **Groups**, do one of the following:
  * To add the application to one or more groups, select the group or groups.
  * To remove the application from a group, click the remove button for the group.





## Manually sync an Argo CD application
Manually sync an application to expedite Git-to-cluster sync.  The sync options selected for manual sync override the sync options defined for the application.  
The sync options, grouped into Revision and Additional Settings, are identical to the Sync options in the General settings when you created the application. 

{{site.data.callout.callout_tip}}
**TIP**   
You can also sync _application resources_ with sync statuses such as `Service`, `AnalysisTemplate`, and `Rollouts` resources for example, in the Current State tab. Select the **Sync** option from resource's context menu. 
{{site.data.callout.end}}

**Before you begin**  
* Review:  
  [Revision settings for application sync](#revision-settings-for-application-sync)  
  [Additional Options for application sync](#additional-options-for-application-sync)  
  [Sync application resources](#sync-application-resources)  

**How to**  
1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
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
The branch in Git to sync with the cluster.

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



### Sync application resources
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
   alt="Default settings for Synchronize Resources in application" 
   caption="Default settings for Synchronize Resources in application"
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


## Configure sync timeout for Argo CD applications
Configure a custom sync timeout for Argo CD applications and get notified when an ongoing sync exceeds the defined timeout. 
Instead of waiting indefinitely for syncs to complete and then navigating through the GitOps Apps dashboard, get timely warnings from Codefresh.

Add an annotation with the timeout threshold you need for the application. Codefresh uses Argo CD's default duration of 30 minutes which you can customize as needed.  



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


You can view more [details on the sync]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#warning-long-sync) or [terminate](#terminate-on-going-sync-for-argo-cd-applications) it.



## Terminate on-going sync for Argo CD applications
Manually terminate an on-going synchronization process for the application. You may need to terminate an on-going sync that remains indefinitely as Syncing, or because you have detected problems in the current deployment 
Terminating a sync operation reverts the deployment to the previously deployed version or image.  

1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
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

1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
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
A rollout represents the progressive deployment of a new version of an application, allowing controlled updates with rollback capabilities.

##### Rollout controls
View rollout progress in the Timeline tab, and manage rollouts through multiple controls:
* **Timeline tab**: Pause and resume ongoing rollouts.
* **Rollout Player**: Offers additional controls, including custom actions such as skipping steps during rollouts.
* **Rollout resources in Current State tab**: Offers the same controls as the Rollout Player.

##### Custom action configuration
For GitOps Runtimes with existing Argo CD instances, to enable actions in the Rollout Player and in the Current State tab for the Rollout entity, you must configure custom actions in the Argo CD config map (`argocd-cm`).  
See [Argo CD's official documentation on resource actions](https://argo-cd.readthedocs.io/en/stable/operator-manual/resource_actions/#define-a-custom-resource-action-in-argocd-cm-configmap){:target="\_blank"}.

### Controls for ongoing rollouts
The table describes the controls available to manage rollouts.

{: .table .table-bordered .table-hover}
| Rollout control   | Description |  Available in  |
| --------------  | ------------|  ----------------|  
| **Rollback**      | Rolls back to the previous deployment. See also [Prerequisites for rollback](#prerequisites-for-rollback).  | {::nomarkdown}<ul><li>Timeline</li><li>Rollback Player</li><li>Current State</li>{:/}  |
| **Abort**          | Terminate the current rollout. | {::nomarkdown}<ul><li>Rollback Player</li><li>Current State</li>{:/} |
| **Pause**         | Pause the rollout. If the rollout is already automatically paused as the result of a step definition, clicking Pause continues pausing the rollout also after the pause duration configured. | {::nomarkdown}<ul><li>Timeline</li><li>Rollback Player</li><li>Current State</li>{:/} |
| **Resume** | Resume a rollout that was paused either manually by clicking Pause, or automatically through the step's definition. | {::nomarkdown}<ul><li>Timeline</li><li>Rollback Player</li><li>Current State</li>{:/} |
|**Retry**              | Retry a rollout that has been aborted. Restarts the rollout from the beginning. Available only when a rollout has been aborted. | {::nomarkdown}<ul><li>Rollback Player</li><li>Current State</li>{:/} |
| **Skip step**  | Skip execution of current step. Such steps are marked as Skipped in the rollout visualization. | {::nomarkdown}<ul><li>Rollback Player</li><li>Current State</li>{:/} |
| **Promote full**   | Skip all remaining steps, and deploy the current image. |  {::nomarkdown}<ul><li>Rollback Player</li><li>Current State</li>{:/}|   

### Configure custom actions for Rollout entities
For Runtime installations with existing Argo CD instances, configure custom rollout actions in Argo CD's config map. Otherwise, rollout controls such as **Pause** and **Skip Current Step** are disabled in the Rollout Player and in the Current State tab.

{{site.data.callout.callout_warning}}
**Argo CD warning**  
By default, defining a resource action customization will override any built-in action for this resource kind. As of Argo CD version 2.13.0, if you want to retain the built-in actions, you can set the `mergeBuiltinActions` key to `true`. Your custom actions will have precedence over the built-in actions.
{{site.data.callout.end}} 

* Add the following to the `argocd-cm`:

```yaml
resource.customizations.actions.argoproj.io_Rollout: |
  mergeBuiltinActions: true
  discovery.lua: |
    actions = {}
    local fullyPromoted = obj.status.currentPodHash == obj.status.stableRS
    actions["pause"] = {["disabled"] = fullyPromoted or obj.spec.paused == true}
    actions["skip-current-step"] = {["disabled"] = obj.spec.strategy.canary == nil or obj.spec.strategy.canary.steps == nil or obj.status.currentStepIndex == table.getn(obj.spec.strategy.canary.steps)}
    return actions
  definitions:
  - name: pause
    action.lua: |
      obj.spec.paused = true
      return obj
  - name: skip-current-step
    action.lua: |
      if obj.status ~= nil then
          if obj.spec.strategy.canary ~= nil and obj.spec.strategy.canary.steps ~= nil and obj.status.currentStepIndex < table.getn(obj.spec.strategy.canary.steps) then
              if obj.status.pauseConditions ~= nil and table.getn(obj.status.pauseConditions) > 0 then
                  obj.status.pauseConditions = nil
              end
              obj.status.currentStepIndex = obj.status.currentStepIndex + 1
          end
      end
      return obj
```


### Accessing rollout controls 
Manage rollouts from different locations in the GitOps Apps dashboard.  

#### Timeline tab  
* **Where:**  
  **GitOps Apps** > Selected application > **Timelines** > Deployment record > **Updated Services**  

{% include 
   image.html 
   lightbox="true" 
   file="/images/applications/rollout-resume-indefinite-pause.png" 
   url="/images/applications/rollout-resume-indefinite-pause.png" 
   alt="Resume paused rollout" 
   caption="Resume paused rollout"
   max-width="70%" 
   %}


#### Rollout Player  
* **Where:**  
  **GitOps Apps** > Selected application > **Timelines** > Deployment record > Rollout name  

{% include
image.html
lightbox="true"
file="/images/applications/rollout-player.png"
url="/images/applications/rollout-player.png"
alt="Rollout Player controls for an ongoing rollout"
caption="Rollout Player controls for an ongoing rollout"
max-width="50%"
%}

#### Current State tab  
* **Where:**  
  **GitOps Apps** > Selected application > **Current State** > Rollout resource's context menu 

{% include
image.html
lightbox="true"
file="/images/applications/rollout-resource-context-menu.png"
url="/images/applications/rollout-resource-context-menu.png"
alt="Options for `rollout` resource in the Current State tab"
caption="Options for `rollout` resource in the Current State tab"
max-width="50%"
%}




### Manually rollback completed rollout to previous revision
<!--- add screenshots -->
Manually rollback a completed rollout to a previous revision when and if needed. If after a successful analysis run and rollout, your application is not functioning as it should, you can rollback to a prior revision from the Rollout’s revision history.

The revision depth is determined by the `spec.revisionHistoryLimit` parameter in the [Rollout Specification](https://argoproj.github.io/argo-rollouts/features/specification/#rollout-specification){:target="\_blank"}.
Manual rollback changes the live state of the rollout resource to the state in the previous commit that you select.

1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
1. Select the application and select the **Timeline** tab.
1. Click the name of the rollout to rollback.
1. From the **Choose version to Rollback** dropdown, select the revision to rollback to.
1. Review the changes in the revision. 
1. In the Rollout Player, click **Rollback to**.





## Rename an Application Set
Rename an Application Set and point all existing applications to the renamed Application Set.

1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
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

## Enable precise sync detection for monorepo apps
Enable the ACR (Application Change Revision) Controller in GitOps Runtimes to precisely detect sync operations that triggered deployments for applications in monorepo setups.

>**NOTE**  
Not supported for GitOps Runtime installations with existing Argo CD. 


ACR Controller 
When enabled, the ACR Controller:
* Identifies and tracks application-specific changes by analyzing the application’s source path.
* Compares revisions to identify the specific sync operation that triggered the promotion or deployment.
* Automatically adds the `.app.status.operationState.operation.sync.changeRevision` to application manifests. 

To trigger and customize notifications for the identified revision, update the notification controller and configure the notification template accordingly.

##### How to

{::nomarkdown}
<ol>
  <li>If needed, upgrade your Runtime to version 0.13.0 or higher.</li>
  <li>In the Runtime's <code class="highlighter-rouge">values.yaml</code>, enable the ACR controller by adding the following to the <code class="highlighter-rouge">argo-cd</code> section:
    <pre><code>argo-cd:
  acrController:
    enabled: true
</code></pre>
  </li>
  <li>In the notification controller, switch the revision being used to <code class="highlighter-rouge">.app.status.operationState.operation.sync.changeRevision</code>.<br>
    Here's an example with the new notification trigger:<br>
   {% highlight yaml %}
    {% raw %}
    trigger.on-deployed: |
      - description: Application is synced and healthy. Triggered once per commit.
        when: app.status.health.status == 'Healthy' and app.status.operationState != nil and app.status.operationState.operation.sync.changeRevision != nil and app.status.operationState.phase in ['Succeeded']
        oncePer: app.status.operationState.operation.sync.changeRevision
        send:
          - app-deployed
  {% endraw %}
  {% endhighlight %}
  </li>
  <li>
    Configure the notification template to report the <code class="highlighter-rouge">changeRevision</code>, as in the example below:
    {% highlight yaml %}
    {% raw %}
    message: "Author: {{(call .repo.GetCommitMetadata .app.status.operationState.operation.sync.changeRevision).Author}}, message: {{(call .repo.GetCommitMetadata .app.status.operationState.operation.sync.changeRevision).Message}}"
    {% endraw %}
     {% endhighlight %}
  </li>
  <li>
    If you don't receive notifications, see <a href="https://codefresh.io/docs/docs/deployments/gitops/troubleshooting-gitops-apps/#not-receiving-application-scoped-sync-notifications-with-acr-controller">Not receiving application-scoped sync notifications with ACR Controller</a>.
  </li>
</ol>
{:/}

## Delete Argo CD applications
Delete an Argo CD application from Codefresh. Deleting an application deletes the manifest from the Git repository, and then from the cluster where it is deployed. When deleted from the cluster, the application is removed from the GitOps Apps dashboard in Codefresh.
 
{{site.data.callout.callout_warning}}
**WARNING**  
**Prune resources** in the application's General settings determines the scope of the delete action.  
When selected, both the application and its resources are deleted. When cleared, only the application is deleted. For more information, review [Sync settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#sync-settings).  
Codefresh warns you of the implication of deleting the selected application in the Delete form. 
{{site.data.callout.end}}

1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
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
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/)  
[Troubleshooting Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/troubleshooting-gitops-apps)  
[GitOps Apps dashboard]({{site.baseurl}}/docs/dashboards/gitops-apps-dashboard/)    
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)    
[Products dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)   
{% if page.collection != site.gitops_collection %}[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/){% endif %}  



