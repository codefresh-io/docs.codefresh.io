---
title: "Managing GitOps applications"
description: ""
group: deployments
sub_group: gitops
toc: true
---

Application creation and deployment is one part of the continuous deployment/delivery process. An equally important part is optimizing deployed applications when needed. 

* [Edit applications](#edit-application-definitions)  
  Optimize deployed applications by changing application definitions when needed.

* [Synchronize applications](#manually-synchronize-an-application)   
  Sync applications on-demand by manually applying sync options or selecting the resources to sync.

* [Delete applications](#delete-an-application)  
  Delete unused or legacy applications to avoid clutter and remove unnecessary resources.


* [Manage rollouts for deployments](#manage-rollouts-for-deployments)  
  Control ongoing rollouts by resuming indefinitely paused steps, promoting rollouts, aborting, restarting and retrying rollouts.  





### Edit application definitions 
Update General or Advanced configuration settings for a deployed application through the Configuration tab. Once the application is deployed to the cluster, the Configuration tab is available on selecting the application in the GitOps Apps dashboard. 

> You cannot change application definitions (the application name and the selected runtime), and the Git Source selected for the application.

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

   >If you change settings and then restore existing values for the same, Codefresh automatically removes the Commit and Discard Changes buttons as there are no new changes to commit or discard. 

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

{::nomarkdown}
<br><br>
{:/}

### Manually synchronize an application
Manually synchronize an application to expedite Git-to-cluster sync.  The sync options selected for manual sync override the sync options defined for the application.  
The sync options, grouped into Revision and Additional Settings, are identical to the Sync options in the General settings when you created the application. 

>You can also synchronize application resources with sync statuses,  such as `Service`, `AnalysisTemplate`, and `Rollouts` resources for example, in the Current State tab. The context menu of the resource shows the Sync option. 

**Before you begin**  
* Review:  
  [Revision settings for application sync](#revision-settings-for-application-sync)  
  [Additional Options for application sync](#additional-options-for-application-sync)  
  [Synchronize resources](#synchronize-resources)  

**How to**  
1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
1. Sync an application:  
  * Select the application to sync, and do one of the following: 
  * From the context menu on the right, select **Synchronize**. 
  * On the top-right, click **Synchronize**.  

  Sync a resource:  
  * Click the application with the resource to sync.
  * In the **Current State** tab, open the context menu of the resource, and then select **Sync**. 

1. Select the **Revision** and **Additional Options** for the manual sync.  
  Review 
1. Click **Next**.
1. In the Synchronize Resources form, select the scope of the manual sync:
  * To sync only specific resources, search for the resources by any part of their names, or define a Regex to filter by the required resources.  
  * **All**: Sync all resources regardless of their sync state.
  * **Out of sync**: Sync _only_ resources that are `Out of sync`.  

{::nomarkdown}
<br>
{:/}

#### Revision settings for application sync
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

{::nomarkdown}
<br>
{:/}

#### Additional Options for application sync

##### Sync Options

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

##### Prune propagation policy
{::nomarkdown}Defines how resources are pruned, applying Kubernetes cascading deletion prune policies. 
Read more at <a href="https://kubernetes.io/docs/concepts/architecture/garbage-collection/#cascading-deletion" target="_blank">Kubernetes - Cascading deletion</a>.<ul><li><b>Foreground</b>: The default prune propagation policy used by Argo CD. With this policy, Kubernetes changes the state of the owner resource to `deletion in progress`, until the controller deletes the dependent resources and finally the owner resource itself. </li><li><b>Background</b>: When selected, Kubernetes deletes the owner resource immediately, and then deletes the dependent resources in the background.</li><li><b>Orphan</b>: When selected, Kubernetes deletes the dependent resources that remain orphaned after the owner resource is deleted.</li></ul> </br>{:/}
All Prune propagation policies can be used with:  

**Replace**: When selected, Argo CD executes `kubectl replace` or `kubectl create`, instead of the default `kubectl apply` to enforce the changes in Git. This action will potentially recreate resources and should be used with care. See [Replace Resource Instead Of Applying Change](https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#replace-resource-instead-of-applying-changes){:target="\_blank"}.   
  

**Retry**: When selected, retries a failed sync operation, based on the retry settings configured:   
* Maximum number of sync retries (**Limit**)  
* Duration of each retry attempt in seconds, minutes, or hours (**Duration**)  
* Maximum duration permitted for each retry (**Max Duration**)  
* Factor by which to multiply the Duration in the event of a failed retry (**Factor**). A factor of 2 for example, attempts the second retry in 2 X 2 seconds, where 2 seconds is the Duration.

{::nomarkdown}
<br>
{:/}

#### Synchronize resources
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


{::nomarkdown}
<br><br>
{:/}

### Delete an application
Delete an application from Codefresh. Deleting an application deletes the manifest from the Git repository, and then from the cluster where it is deployed. When deleted from the cluster, the application is removed from the GitOps Apps dashboard in Codefresh.
 
>**Prune resources** in the application's General settings determines the scope of the delete action.  
When selected, both the application and its resources are deleted. When cleared, only the application is deleted. For more information, review [Sync settings]({{site.baseurl}}/docs/deployments/gitops/create-application/#sync-settings).  
Codefresh warns you of the implication of deleting the selected application in the Delete form. 

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

### Manage rollouts for deployments
Control ongoing rollouts by resuming indefinitely paused steps, promoting rollouts, aborting, restarting and retrying rollouts.  

{::nomarkdown}
<br>
{:/}

#### Pause/resume ongoing rollouts
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

{::nomarkdown}
<br>
{:/}

#### Manage an ongoing rollout with the Rollout Player
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
| **Rollback**      | Not available currently.  | 
| **Pause**         | Pause the rollout. If the rollout is already automatically paused as the result of a step definition, clicking Pause pauses the rollout also after the pause duration. | 
| **Resume** <!---{::nomarkdown}<img src="../../../images/icons/rollout-resume.png" display=inline-block"> {:/}-->| Resume a rollout that was paused either manually by clicking Pause, or automatically through the step's definition. | 
| **Skip step** <!---{::nomarkdown}<img src="../../../images/icons/rollout-skip-step.png" display=inline-block"> {:/}--> | Skip execution of current step. Such steps are marked as Skipped in the rollout visualization. | 
| **Promote full** <!---{::nomarkdown}<img src="../../../images/icons/rollout-promote-full.png" display=inline-block"> {:/} -->  | Skip all remaining steps, and deploy the current image. |        

{::nomarkdown}
<br>
{:/}

#### Manage the `rollout` resource

Control the rollout through the options available for the Rollout resource. 

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




### Related articles
[Creating GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application)  
[GitOps Overview dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics)  



