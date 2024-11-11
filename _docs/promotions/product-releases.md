---
title: "Tracking product releases"
description: "Monitor promotion orchestration for a product through Releases"
group: promotions
toc: true
---




When promotions are triggered for a product, the flow orchestrates deployment across one or more environments until the new version is deployed to production or to the desired target environment. 

In the context of GitOps, a release is a comprehensive view of the progression of a product as it is promoted through different environments when a promotion flow is triggered. The release encompasses the collective state of all environments and workflows involved in deploying that change, from the initial trigger environment to the final target environment. 

Visually track deployments of a product across multiple environments with Releases. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/release-view.png" 
url="/images/gitops-promotions/releases/release-view.png"
alt="Example of a product release view" 
caption="Example of a product release view"
max-width="60%"
%}

Whether you are a product manager or an application developer, with Releases, you can:
* Visualize the product's deployment lifecycle
* Access an integrated list of changes that led to the deployment
* See the current status of ongoing deployments
* Troubleshoot issues preventing deployment to production
* Address customer-reported issues through detailed insights into the deployment lifecycle



##### Releases for products
A release is created for a product when a promotion is triggered, either automatically or manually.
On drill down into a product, the Releases tab displays the list of ongoing and completed releases, with the option of getting detailed insights on each release.

##### Releases for developers
As an application developer or a DevOps engineer, you often lack visibility into the deployment process after pushing your code, only being alerted when issues arise. Our Releases feature changes this dynamic by offering full visibility at all times, whether you need to monitor an ongoing deployment, identify and resolve issues for failed deployments, or understand the changes involved in a release.




##### Tracking deployments through releases
There are two key aspects of tracking deployments for a product through releases:
* **Release promotion flow**  
  Tracking the release visually, shows the progression of the release through each phase of the promotion lifecycle through different environments.  
  This is the place where you can view issues that arise. Instead of having to switch between different interfaces, or even tools to troubleshoot errors, the Releases page funnnels all erros  Codefresh funnels everything into one screen on the Releases page. Developers have everything they need at their fingertips, saving time so you can get updates into the hands of your customers sooner.

  See [Monitor promotion orchestration for releases](#monitor-promotion-orchestration-for-releases).  
  
  For information on the different aspects of a release, see:
  [Release summary](#release-summary)  
  [Environments in product releases](#environments-in-product-releases)  
  [Promotion Workflows in product releases](#promotion-workflows-in-product-releases)
  
* **Release notes**  
  Tracking through release notes provides an integrated list of changes from various sources and tools, providing a comprehensive view of what led to the deployment.  
  See [Analyze change history in Release Notes](#analyze-change-history-in-release-notes).


## View Releases for products

The Releases tab for a product displays the releases for that product, whether successful or failed.

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the product and then click the **Releases** tab.

The Releases page displays on-going and completed releases for the product.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/releases-list.png" 
url="/images/gitops-promotions/releases/releases-list.png"
alt="Release list for a product" 
caption="Release list for a product"
max-width="60%"
%}

The table describes important insights in the Releases page.

|Item      | Description*           |
|-------------|---------------------|
| **Release ID**     | The Codefresh-assigned identifier uniquely identifying the release. Clicking the Release ID displays the ongoing or completed Promotion Flow for the release. |
| **Initiator**      | The user who created the release. The initiator is displayed only for releases created through automated promotions.  |
| **Promotion Flow** | The name of the flow orchestrating the promotion for the specific release. Clicking the link takes you to the Promotion Flow page with a graphical representation of the flow. For details, see [Promotion Flows]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/).<br>**Manual** indicates that the release was created for manually triggered single-environment promotions, from the trigger to a single target environment. See [Manual promotion triggers]({{site.baseurl}}/docs/promotions/trigger-promotions/#manual-promotion-triggers-quick-reference). |
| **Environments**   | The environments promoted for the release and their deployment statuses, which can be one of the following:{::nomarkdown}<ul><li><img src="../../../images/icons/promotion-success.png?display=inline-block">: Successful</li><li><img src="../../../images/icons/promotion-running.png?display=inline-block">: Running</li><li><img src="../../../images/icons/promotion-suspended.png?display=inline-block"> or <img src="../../../images/icons/promotion-suspending-pending-pr.png?display=inline-block">: Suspended or suspended pending PR approval/merge.</li><li><img src="../../../images/icons/promotion-pending.png?display=inline-block">: Pending</li><li><img src="../../../images/icons/promotion-terminated.png?display=inline-block">: Terminated.</li><li><img src="../../../images/icons/promotion-failed.png?display=inline-block">: Failed</li><li><img src="../../../images/icons/promotion-failed.png?display=inline-block">: Failed</li></ul>{:/} See [Environment (deployment) status](#environment-deployment-status).|




## Monitor promotion orchestration for releases

Visually monitor promotion orchestration for an on-going release, or analyze that of a completed release, for multi-environment promotion flows or single-environment promotions:
* View how different environments are interconnected within the Promotion Flow to understand the dependencies and flow of deployment.
* Monitor executions of workflow steps in each environment and get alerted to failed steps in workflows. Early detection of failures allows for quick intervention, reducing the risk of prolonged issues and ensuring the deployment process remains on track.

##### How to

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the product and then click the **Releases** tab.
1. Click a Release ID to view the promotion orchestration.
1. To view the complete history of code changes, click **Release Notes**.   

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/release-visualization.png" 
url="/images/gitops-promotions/releases/release-visualization.png"
alt="Promotion visualization for a release" 
caption="Promotion visualization for a release"
max-width="60%"
%}



## Release summary

### Header
The header in the Releases page summarizes the change that triggered the promotion, the overall status of the release, and the count of failed, successful, running, and pending environments.

>**NOTE:**  
The commit details are always for the trigger environment that initiated the promotion.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/header.png" 
url="/images/gitops-promotions/releases/header.png"
alt="Example header for product releases" 
caption="Example header for product releases"
max-width="60%"
%}

### Release status
The release status is displayed on the right when you drill down into a release ID.  
It is determined from the statuses of all the environments included in the promotion flow that orchestrates the deployment of the product.
For single-environment promotions triggered manually, there are two environments.

The table describes the possible statuses of a Release.

{: .table .table-bordered .table-hover}
| Release Status     | Description           |
|------------        |---------------------------------------|
| **Successful**     | Promotions were completed successfully in all the environments and the changes were successfully deployed .  |
| **Progressing**    | Promotion is currently ongoing for at least one environment.  |
| **Suspended**      | Promotion in an environment is pending completion. This could be because of a condition in one of its workflows or because a pull request is waiting for approval.  |
| **Terminated**     | Promotion currently being run in an environment was terminated, preventing deployment to the other environments defined in the Promotion Flow. |
| **Failed**         | Promotion failed in at least one environment causing the entire release to fail. This could be because:<br>-The Pre- or Post-Action Workflow, or Promotion Action failed. <br>-At least one application is out of sync or degraded.<br><br>Failures are flagged in the environment under Issues. Clicking on Issues opens a panel displaying the reason for the error, with links to the resource causing the issue, or to the logs and manifests of the resource.|

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/release-terminated.png" 
url="/images/gitops-promotions/releases/release-terminated.png"
alt="Example of release with Terminated status" 
caption="Example of release with Terminated status"
max-width="60%"
%}

## Environments in product releases

The graphical view of the different environments defined in the Promotion Flo allows you to:
* Understand the interconnections between the environments, whether sequential or parallel.
* Visualize the dependencies between environments to see how changes propagate through the deployment process

Each environment is color-coded to indicate the overall status of the promotion for that environment. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/environments.png" 
url="/images/gitops-promotions/releases/environments.png"
alt="Example of environments for product release" 
caption="Example of environments for product release"
max-width="60%"
%}

### Environment (deployment) status
The overall deployment status of an environment is determined by the cumulative statuses of its Promotion (Pre- and Post-Action) Workflows, the Promotion Action, and the application status.


The success status for an environment is evaluated in this order:
1. Pre-Action Workflow
1. Promotion Action
1. Application sync and health
1. Post-Action Workflow

The table describes the possible deployment statuses for environments.

{: .table .table-bordered .table-hover}
| Environment Status     | Description           |
|------------        |---------------------------------------|
| **Successful**     | Promotion to an environment is considered successful when the following conditions are met, in the order listed. {::nomarkdown}<ol><li>Pre-Action Workflow completed successfully.</li><li>Promotion Action submitted successfully. For PRs, the PR was successfully merged.</li><li>Application synced to the cluster.</li><li><li>Application is healthy.</li><li>Post-Action Workflow completed successfully.</li></ol>{:/}.    |
| **Running**        | At least one step in a Pre- or Post-Action Workflow in the environment is currently in progress.  |
| **Suspended**        | One or both the Pre- and Post-Action Workflows or the Promotion Action is pending execution. This could be because of a condition in the Workflow or because a pull request is pending manual approval.  |
| **Failed**         | At least one step in a Workflow failed to execute, has a syntax error, was manually terminated, or the application is out of sync or degraded. |

Here's an example of an environment with a failed status because of a Degraded application.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/env-app-degraded.png" 
url="/images/gitops-promotions/releases/env-app-degraded.png"
alt="Example of failed release: Degraded application" 
caption="Example of failed release: Degraded application"
max-width="60%"
%}


### Environment history in product releases

* Active environments per release
  The current view of a release displays only the active environments defined in the associated Promotion Flow at the time of release. Historical data for environments that were deleted, removed, or renamed in previous releases is not retained in the current view.  
  By displaying only the current set of environments per release, you get a clear, focused view of the product’s deployment landscape.

* Historical data for environments
  Individual release views retain information on environments targeted during promotion, even if those environments have since been removed or renamed, ensuring traceability.


### Concurrent workflow executions within environments

If there is an update that triggers a Pre- or Post-Action Workflow within an environment while the same Workflow is already in progress, the ongoing Workflow is automatically terminated and the latest Workflow is run instead.

For example, if an update in the `staging` environment triggers the `echo-pre-action` Pre-Action Workflow, and a later update in the same environment also triggers the same `echo-pre-action` Pre-Action Workflow, the earlier instance is terminated, and the later instance continues to run. 



<!--- NIMA: how will it be shown in the releases tab? -->

## Promotion Workflows in product releases

Each environment displays the steps for the Pre- and Post-Action Workflows defined for it. The workflows are designed to ensure that the deployment process is thoroughly validated and executed correctly.  


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/workflows.png" 
url="/images/gitops-promotions/releases/workflows.png"
alt="Example of workflows for product release" 
caption="Example of workflows for product release"
max-width="60%"
%}

### Workflow and workflow-step statuses

* The status of a Workflow is determined by the status of all its steps.

* The status of a step in the Pre- or Post-Action Workflow is its aggregated status across all the Workflows including and running that step within the environment. Step status is aggregated because a product typically includes multiple applications, and therefore executes multiple Promotion Workflows in parallel through the Promotion Policies. 

The table describes the possible statuses for Promotion Workflow steps.

{: .table .table-bordered .table-hover}
| Workflow-step Status     | Description           |
|------------        |---------------------------------------|
| **Success**        | The step completed execution without errors in all the Pre- and Post-Action Workflows that included it.  |
| **Running**        | The step is currently in progress in at least one of the Pre- and Post-Action Workflows.  |
| **Pending**        | The step is pending execution in at least one of the Pre- and Post-Action Workflows. |
| **Failed**         | At least one step in a Pre- or Post-Action Workflow failed to execute. <!--- what could be the reasons?--> |
| **Error**          | At least one step in a Pre- or Post-Action Workflow has a syntax error. <!--- example -->|
| **Terminated**     | At least one step in a Pre- or Post-Action Workflow was manually terminated. <!--- example of reasons -->|


{% include 
  image.html 
  lightbox="true" 
  file="/images/gitops-promotions/releases/workflow-steps.png" 
  url="/images/gitops-promotions/releases/workflow-steps.png"
  alt="Example of a workflow with a failed step" 
  caption="Example of a workflow with a failed step"
  max-width="60%"
%}

### Versioning in Environments
When the Post-Action Workflow in the trigger environment, or the Pre-Action Workflow and Promotion Action in target environments, completes successfully, the promotion mechanism commits the changes and advances the version number for the applications within the product in those environments. Version numbers are updated even if the Post-Action Workflow in a specific environment fails to complete.

Because of this automatic version update, it's essential to incorporate a revert or rollback mechanism in the Post-Action Workflow to easily revert changes if needed.

<!--- TBD ask if this is correct and dependent promotion is to be documented -->


### Errors for Workflow steps
Workflows fail when at least one step in the workflow does not complete successful execution. 
Identifying and resolving these failures in real-time are critical to maintaining smooth deployment processes.

Errors can be categorized into:

* **Workflow errors**
  * Prefixed with {::nomarkdown}<img src="../../../images/icons/product-release-workflow-step-error.png?display=inline-block">{:/}.
  * Listed at the top of each environment for easy identification.
  * Clicking on the issue shows a description of the error, logs for the step, the workflow manifest used, and a link to the workflow.

* **Application errors**
  * Prefixed with {::nomarkdown}<img src="../../../images/icons/product-release-app-error.png?display=inline-block">{:/}.
  * Occurs when the health status of an application connected to the product is Degraded, indicating that one of its resources is not healthy.
    See [Health status for application resources]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#health-status-for-application-resources).   
    Clicking on the error takes you to the Current State tab in the GitOps Apps dashboard. 

* **Git errors**
  * Prefixed with {::nomarkdown}<img src="../../../images/icons/product-release-git-error.png?display=inline-block">{:/}.
  * Typically commit failures related to Git operations.



Other types of errors that result in failed workflows can include network or connectivity errors, or errors
arising from insufficient permissions to execute workflow steps or access necessary resources.



## Analyze change history in Release Notes 

Access the release notes to see a detailed history of all changes that led to the deployed release and artifacts created for it.

These changes are collated from various tools and sources, including code changes, commits, and linked issues or fixes, with information pulled from image-based annotations.
<!--- Use the historical data to troubleshoot issues, understand the context of the deployment, and improve future releases.

NIMA: Add here use case of how to use release notes to troubleshoot/trace issue?  -->

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/release-notes.png" 
url="/images/gitops-promotions/releases/release-notes.png"
alt="Release notes with change history for release" 
caption="Release notes with change history for release"
max-width="60%"
%}

## Terminate a release
Manually terminate a release to stop the promotion process. Terminating a release stops all downstream promotions, preventing further propagation across environments.

Release termination may be necessary if issues are detected in an environment or application, or if a version is identified as problematic. Stopping downstream promotions in these cases prevents propagating unwanted changes, and enables the rollback of in-flight versions.

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the product and then click the **Releases** tab.
1. Click the Release ID for the ongoing release to terminate, and then click **Terminate**.
  The release is set to status terminated. All downstream environments are set to Pending.  
  If you return to the Releases list for the product, mouse over the Release ID displays the reason why the release failed, and the specific displays this status {::nomarkdown}{<img src="../../../images/icons/promotion-terminated.png?display=inline-block">{:/}.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/release-terminated.png" 
url="/images/gitops-promotions/releases/release-terminated.png"
alt="Example of a manually terminated release" 
caption="Example of a manually terminated release"
max-width="60%"
%}


## Retry a failed release
Retry a failed release to restart the process from the exact point of failure.  Restarting from the point of failure rather than from scratch saves time and resources, enabling a quicker recovery and minimizing downtime.  

For example, you may want to retry a release if the deployment failed due to an application being out of sync or in a degraded state, and the issue has since been resolved.  
Another scenario where a retry is useful is when a workflow step encountered a temporary network issue that has now been corrected. By retrying the release, you can continue the deployment without redoing steps that were already successful.

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the product and then click the **Releases** tab.
1. Click the Release ID for a failed release, and then click **Retry**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/retry-failed-release.png" 
url="/images/gitops-promotions/releases/retry-failed-release.png"
alt="Retry failed release" 
caption="Retry failed release"
max-width="60%"
%}

   The release resumes execution from the point of failure, in this case, retries the Post-Action Workflow step, and the status of the release changes to Running.  Note that there is no change to the Release ID. 

<!--
{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/result-retry-failed-release.png" 
url="/images/gitops-promotions/releases/result-retry-failed-release.png"
alt="Retried failed release" 
caption="Retried failed release"
max-width="60%"
%}

-->


## Related articles
[Promotion Flows]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)   
[Promotions: End-to-end guide]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  

 




  
