---
title: "Tracking product promotions"
description: "Monitor promotion orchestration for a product through Releases"
group: promotions
toc: true
---




When promotions are triggered for a product, the flow orchestrates deployment across one or more environments until the new version is deployed to production or to the desired target environment. 

In the context of GitOps, a release is a comprehensive view of the progression of a product as it is promoted through different environments when a promotion flow is triggered. The release encompasses the collective state of all environments and workflows involved in deploying that change, from the initial trigger environment to the final target environment. 

The Releases feature in Codefresh is designed for tracking deployments of a product across multiple environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/releases-list.png" 
url="/images/gitops-promotions/releases/releases-list.png"
alt="Release list for a product" 
caption="Release list for a product"
max-width="60%"
%}


<!--- NIMA: add an xref to the three different ways promotions can be triggered -->

##### Releases & Products
A release is created for a product when a promotion is triggered, either automatically or manually.
On drill down into a product, the Releases tab displays the list of ongoing and completed releases, with the option of getting detailed insights on each release.

##### Releases & developers
As an application developer or a DevOps engineer, you often lack visibility into the deployment process after pushing your code, only being alerted when issues arise. Our Releases feature changes this dynamic by offering full visibility at all times, whether you need to monitor an ongoing deployment, identify and resolve issues for failed deployments, or understand the changes involved in a release.

##### Use cases
Whether you are a product manager or an application developer, with Releases, you can:
* Visualize the product's deployment lifecycle
* Access an integrated list of changes that led to the deployment
* See the current status of ongoing deployments
* Troubleshoot issues preventing deployment to production
* Address customer-reported issues through detailed insights into the deployment lifecycle

##### Tracking deployments through releases
There are two key aspects of tracking deployments for a product through releases:
* **Promotion Flow**  
  Tracking the release through the graphical representation, shows the progression of the release through each phase of the promotion lifecycle through different environments.  
  See [Monitor promotion orchestration for releases](#monitor-promotion-orchestration-for-releases).

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
| **Promotion Flow** | The name of the flow orchestrating the promotion for the specific release. Clicking the link takes you to the Promotion Flow page with a graphical representation of the flow. For details, see [Promotion Flows]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/).<br>**Manual** indicates that the release was created for manually triggered promotions. See [Triggering promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/). |
| **Environments**   | The environments promoted for the release and their deployment statuses, which can be one of the following:{::nomarkdown}<ul><li><img src="../../../images/icons/promotion-success.png?display=inline-block">: Successful</li><li><img src="../../../images/icons/promotion-running.png?display=inline-block">: Running</li> <li><img src="../../../images/icons/promotion-pending.png?display=inline-block">: Pending</li><li><img src="../../../images/icons/promotion-failed.png?display=inline-block">: Failed</li></ul>{:/} See [Status logic for releases](#status-logic-for-releases).|





## Monitor promotion orchestration for releases

Monitor promotion orchestration for an on-going release, or analyze that of a completed release, across the different environments defined for it in the Promotion Flow:
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

### Header in Product Releases
The header summarizes the change that triggered the promotion, the overall status of the release, and the number of failed, successful, running, and pending environments.

The commit details are always for the trigger environment that initiated the promotion.

See also [Release status](#release-status).



### Environments in Product Releases

Graphical view of the different environments defined in the Promotion Flow.

You can: 
* Understand the interconnections between the environments, whether linear or parallel.
* Visualize the dependencies between environments to see how changes propagate through the deployment process

Each environment is color-coded to indicate the overall status of the promotion for that environment. See also [Environment (deployment) status](#environment-deployment-status).


#### Concurrent promotions within environments

If there is an update that triggers a Pre- or Post-Action Workflow within an environment while the same Workflow is already in progress, the ongoing Workflow is automatically terminated and the latest Workflow is run instead.


For example, if an update in the `staging` environment triggers the `echo-pre-action` Pre-Action Workflow, and a later update in the same environment also triggers the same `echo-pre-action` Pre-Action Workflow, the earlier instance is terminated, and the later instance continues to run. 


NIMA: how will it be shown in the releases tab?

### Promotion Workflows in Product Releases

Each environment displays the steps for the Pre- and Post-Action Workflows defined for it. The workflows are designed to ensure that the deployment process is thoroughly validated and executed correctly.  
See [Workflow and workflow-step status](#workflow-and-workflow-step-status).

#### Pre- and Post-Action Workflows

* Trigger Environment: Can run only Post-Action workflows.
* Other Environments: Can run both Pre- and Post-Action workflows as defined by the Promotion Policies applied to the environments.

#### Versioning in Environments
When the Post-Action Workflow in the trigger environment, or the Pre-Action Workflow and Promotion Action in any other environment, completes successfully, the promotion mechanism commits the changes and advances the version number for the applications within the product. This occurs even if the Post-Action Workflow in a specific environment fails to complete.

Because of this automatic version update, it's essential to incorporate a revert or rollback mechanism in the Post-Action Workflow to easily revert changes if needed.

<!--- TBD  -->


#### Errors for Workflow steps
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

These changes are collated from different tools and sources, and include code changes, commits, and associated issues or fixes.
Use the historical data to troubleshoot issues, understand the context of the deployment, and improve future releases.

NIMA: Add here use case of how to use release notes to troubleshoot/trace issue?

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/release-notes.png" 
url="/images/gitops-promotions/releases/release-notes.png"
alt="Release notes with change history for release" 
caption="Release notes with change history for release"
max-width="60%"
%}



## Status logic for Releases


There are three levels of statuses for a product release.  

In top-down order, you have the: 
* Overall release status 
* Environment deployment status
* Workflow step status



### Release status
The release status is displayed on the right on drilldown into a release ID.  
It is determined from the statuses of all the environments defined in the Promotion Flow that orchestrates the deployment of the product.

The table describes the possible statuses of a Release.

{: .table .table-bordered .table-hover}
| Release Status     | Description           |
|------------        |---------------------------------------|
| **Successful**     | Promotions were completed successfully in all the environments and the changes were successfully deployed .  |
| **Progressing**    | Promotion is currently on-going for at least one environment.  |
| **Suspended**      | Promotion in an environment is pending completion. This could be because of a condition in one of its workflows or because a pull request is waiting for approval.  |
| **Terminated**     | Promotion currently being run in an environment was terminated, preventing deployment to the other environments defined in the Promotion Flow. |
| **Failed**         | Promotion failed in at least one environment causing the entire release to fail. This could be because:<br>-The Pre- or Post-Action Workflow, or Promotion Action failed. <br>-At least one application is out of sync or degraded.<br><br>Failures are flagged in the environment under Issues. Clicking on Issues opens a panel displaying the reason for the error, with links to the resource causing the issue, or to the logs and manifests of the resource.|



### Environment (deployment) status
The overall deployment status of an environment is determined by the cumulative statuses of its Promotion (Pre- and Post-Action) Workflows and the Promotion Action.

The table describes the possible deployment statuses for environments.

{: .table .table-bordered .table-hover}
| Environment Status     | Description           |
|------------        |---------------------------------------|
| **Successful**     | All Workflows in the environment completed successfully and the Promotion Action was successful.  |
| **Running**        | At least one step in a Pre- or Post-Action Workflow in the environment is currently in progress.  |
| **Suspended**        | One or both the Pre- and Post-Action Workflows or the Promotion Action is pending execution. This could be because of a condition in the Workflow or because a pull request is pending manual approval.  |
| **Failed**         | At least one step in a Workflow failed to execute, has a syntax error, was manually terminated, or the application is out of sync or degraded. |


### Workflow and workflow-step status

* The status of a Workflow is determined by the status of all its steps.

* The status of a step in the Pre- or Post-Action Workflow is its aggregated status across all the Workflows including and running that step within the environment. Step status is aggregated because a product typically includes multiple applications, and therefore executes multiple Promotion Workflows in parallel through the Promotion Policies. 

The table describes the possible statuses for Promotion Workflow steps.

{: .table .table-bordered .table-hover}
| Workflow-step Status     | Description           |
|------------        |---------------------------------------|
| **Success**        | The step completed execution without errors in all the Pre- and Post-Action Workflows that included it.  |
| **Running**        | The step is currently in progress in at least one of the Pre- and Post-Action Workflows.  |
| **Pending**        | The step is pending execution in at least one of the Pre- and Post-Action Workflows. |
| **Failed**         | At least one step in a Pre- or Post-Action Workflow failed to execute. (NIMA: what could be the reasons?) |
| **Error**          | At least one step in a Pre- or Post-Action Workflow has a syntax error. (NIMA: example|
| **Terminated**     | At least one step in a Pre- or Post-Action Workflow was manually terminated. (NIMA: example of reasons)|




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

   The release resumes execution from the point of failure, in this case, retries the Post-Action Workflow step, and the status of the release changes to Running.  Note that the release ID does not change. 

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
TBD

 





