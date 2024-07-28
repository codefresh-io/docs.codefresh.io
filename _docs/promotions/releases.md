---
title: "Tracking product deployments"
description: "Monitor promotion orchestration for a product through Releases"
group: promotions
toc: true
---

## About tracking product deployments

When a Promotion Flow is triggered for a product, the flow orchestrates deployment across one or more environments until the new version is deployed to production. 
In the context of GitOps, a release is a comprehensive view of the progression of a product as it is promoted through different environments. The release encompasses the collective state of all environments and workflows involved in deploying that change, from the initial trigger environment to the final production-ready environment. 

The Releases feature in Codefresh is designed for tracking deployments of a product across multiple environments. 

SCREENSHOT

See [View Releases for Products](#view-releases-for-products).
<!--- A release refers to the new version of software deployed to an environment after ensuring that the code has passed all necessary stages of testing and validation. -->

##### Releases & Products
A Release is added for a Product when the Product is promoted from the trigger environment according to the Promotion Flow selected for the Product. 
On drill down into a Product, the Releases tab displays the list of ongoing and completed releases for that product, with the option of getting detailed insights on a specific release.

##### Releases & developers
As an application developer or a DevOps engineer, you often lack visibility into the deployment process after pushing your code, only being alerted when issues arise. Our Releases feature changes this dynamic by offering full visibility at all times, whether you need to monitor an ongoing deployment, identify and resolve issues, or understand the changes involved in a release.


There are two key aspects of tracking deployments for a product through releases:
* **Promotion Flow**  
  This aspect provides a graphical representation of the defined Promotion Flow for the release, showing the progression through different environments.  
  See [Monitor promotion orchestration for releases](#monitor-promotion-orchestration-for-releases).

* **Release notes**  
  This aspect collates an integrated list of changes from various sources, providing a comprehensive view of what has led to the deployment.  
  See [Analyze change history in Release Notes](#analyze-change-history-in-release-notes).


Whether you are a product manager or an application developer, with Releases, you can:
* Visualize the product's deployment lifecycle
* Access an integrated list of changes that led to the deployment
* See the current status of ongoing deployments
* Troubleshoot issues preventing deployment to production
* Address customer-reported issues with detailed insights into the deployment lifecycle


## View Releases for products

The Releases tab for a product displays the releases for that product with promotions, whether successful or failed.

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the product and then click the **Releases** tab.

The Releases page displays on-going and completed releases for the product.

SCREENSHOT

The table describes important insights in the Releases page.

|Item      | Description*           |
|-------------|---------------------|
| **Release ID**   | The Codefresh-assigned identifier uniquely identifying the release. Clicking the Release ID displays the ongoing or completed Promotion Flow for the release. |
| **Promotion Flow** | The flow orchestrating the promotion for the specific release. Clicking the link takes you to the Promotion Flow page with a graphical representation of the flow. For details, see ??? |
| **Environments**   | The environments defined in the Promotion Flow for the release and their deployment statuses, which can be one of the following:{::nomarkdown}<ul><li><img src="../../../images/icons/promotion-success.png?display=inline-block">: Successful</li><li><img src="../../../images/icons/promotion-running.png?display=inline-block">: Running</li> <li><img src="../../../images/icons/promotion-pending.png?display=inline-block">: Pending</li><li><img src="../../../images/icons/promotion-failed.png?display=inline-block">: Failed</li></ul>{:/} See [Status logic for releases](#status-logic-for-releases).|





## Monitor promotion orchestration for releases

Monitor promotion orchestration for an on-going release, or analyze that of a completed release, across the different environments defined for it in the Promotion Flow.   
* View how different environments are interconnected within the Promotion Flow to understand the dependencies and flow of deployment.
* Monitor executions of workflow steps in each environment and get alerted to failed steps in workflows. Early detection of failures allows for quick intervention, reducing the risk of prolonged issues and ensuring the deployment process remains on track.

##### How to

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the product and then click the **Releases** tab.
1. Click a Release ID to view the promotion orchestration.
1. To view the complete history of code changes, click **Release Notes**.   


### Header in Product Releases
The header summarizes the change that triggered the promotion, the overall status of the release, and the number of failed, successful, running, and pending environments.

The commit details are always for the trigger environment that initiated the promotion.

SCREENSHOT

### Environments in Product Releases

Graphical view of the different environments defined in the Promotion Flow.

You can: 
* Understand the interconnections between the environments, whether linear or parallel.
* Visualize the dependencies between environments to see how changes propagate through the deployment process

Each environment is color-coded to indicate the overall status of the promotion for that environment.


SCREENSHOT

#### Concurrent promotions within environments

If there is an update that triggers a Pre- or Post-Action Workflow within an environment while the same Workflow is already in progress, the ongoing Workflow is automatically terminated and the  one is run instead.


For example, if an update in the staging environment triggers the `echo-pre-action` Pre-Action Workflow, and a later update in the same environment also triggers the same `echo-pre-action` Pre-Action Workflow, the earlier instance is terminated, and the later instance is run. 


NIMA: how will it be shown in the releases tab?

### Promotion Workflows in Product Releases

Each environment displays the steps for the Pre- and Post-Action Workflows defined for it. The workflows are designed to ensure that the deployment process is thoroughly validated and executed correctly.

#### Pre- and Post-Action Workflows

* Trigger Environment: Runs only Post-Action workflows.
* Other Environments: Can run both Pre- and Post-Action workflows as defined by the Promotion Policies applied to the environments.

#### Versioning in Environments
When the Post-Action Workflow in the trigger environment and the Pre-Action Workflows in other environments complete successfully, the promotion mechanism commits the changes and advances the version number. 
Even if there is a failure in the Post-Action Workflow within an environment, the version of the product in that environment reflects the version in the preceding environment in the promotion flow.

Understanding this versioning is crucial for tracking the progression of releases and troubleshooting issues.

#### Errors for Workflow steps
Workflows fail when at least one step in the workflow does not complete successful execution. 
Identifying and resolving these failures in real-time  critical to maintaining smooth deployment processes.

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
These changes include code changes, commits, and associated issues or fixes.
Use the historical data to troubleshoot issues, understand the context of the deployment, and improve future releases.

SCREENSHOT



## Status logic for Releases


There are three levels of statuses for a product release.  
In top-down order: 
* Overall release status 
* Environment deployment status
* Workflow step status



### Release status
The release status is displayed on the right on drilldown into a release ID.  
It is determined from the statuses of all of the environments defined in the Promotion Flow that orchestrates the deployment of the product.

The table describes the possible statuses of a Release.

{: .table .table-bordered .table-hover}
| Release Status     | Description           |
|------------        |---------------------------------------|
| **Successful**     | The Pre- and Post-Action Workflows in all the environments completed successfully and the changes were successfully deployed .  |
| **Progressing**    | Deployment is currently on-going for at least one environment.  |
| **Terminated**     | The Pre- or Post-Action Workflow currently being run in an environment was terminated preventing deployment to the other environments defined in the Promotion Flow. |
| **Failed**         | Deployment to at least one environment failed and the Release failed. The Pre- or Post-Action Workflow with the failed step is flagged in the environment and in the header. Clicking it opens a panel with a link to the logs for that step. |


### Environment (deployment) status
The overall deployment status of an environment is determined by the cumulative statuses of the Pre- and Post-Action Promotion Workflows run within that environment.

The table describes the possible deoloyment statuses for environments.

{: .table .table-bordered .table-hover}
| Environment Status     | Description           |
|------------        |---------------------------------------|
| **Successful**     | One or both the Pre- and Post-Action Workflows in the environment completed successfully.  |
| **Running**        | At least one step in a Pre- or Post-Action Worfklow in the environment is currently in progress.  |
| **Pending**        | One or both the Pre- and Post-Action Workflows are pending execution. This status occurs when the Promotion Workflows in the previous environment failed to complete successfully. |
| **Failed**         | At least one step in a Pre- or Post-Action Workflow failed to execute, has a syntax error, or was manually terminated. |


### Workflow and workflow-step status

* The status of a Workflow is determined by the status of all its steps.

* The status of a step in the Pre- or Post-Action Workflow is its aggregated status across all the Workflows including and running that step within the environment. Step status is aggregated because a Product typically includes multiple applications, and therefore executes multiple Promotion Workflows in parallel through the Promotion Policies. 

The table describes the possible statuses for Promotion Workflow steps.

{: .table .table-bordered .table-hover}
| Workflow-step Status     | Description           |
|------------        |---------------------------------------|
| **Success**        | The step completed execution without errors in all the Pre- and Post-Action Workflows that included it.  |
| **Running**        | The step is currently in progress in at least one of the Pre- and Post-Action Workflows.  |
| **Pending**        | The step is pending execution in at least one of the Pre- and Post-Action Workflows. |
| **Failed**         | At least one step in a Pre- or Post-Action Workflow failed to execute. (NIMA: what could be the reasons?) |
| **Error**          | At least one step in a Pre- or Post-Action Workflow has a syntax error. (NIMA: example|
| **Terminated**     | At least one step in a Pre- or Post-Action Workflow was manually terminated. (NIMA: example of reasons|




## Restart a failed release
???
mm