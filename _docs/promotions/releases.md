---
title: "Tracking product deployments"
description: "Monitor promotion orchestration for products releases"
group: promotions
toc: true
---



A release refers to a new version of software deployed to production after ensuring that the code has passed all necessary stages of testing and validation. 

In the context of Codefresh GitOps, a release is a comprehensive view of the progression of a product as it is promoted through different environments until deployed to production. A release encompasses the collective state of all environments and workflows involved in deploying that change, from the initial trigger environment to the final production-ready environment. 


##### Releases & Products
A Release is added for a Product when the Product is promoted from the trigger environment according to the Promotion Flow selected for the Product. 
The Releases tab with the details of the release is displayed on drill down into a product. 

##### Releases & developers
Release information is optimized for application developers. As an application developer who needs to see where an ongoing deploymnent is at, or troubleshoot issues preventing deployment to production or reported by customers, Product Releases provides a holistic picture of the deployment lifecycle accompanied by an integrated list of changes leading to deployment.







## Product Release views 

The Releases tab for a product displays on-going and completed releases for the Product across the different environments.  

EXAMPLE

Important insights to note:
Release ID  The Codefreh-assigned identifier uniquely identifying the release. Clicking the Release ID displays the ongoing or completed promotion flow for the release with the promotion policies.
Promotion Flow  The Promotion Flow which is orchestrating or orchestrated the promotion for the specific release of the product. Clicking the link takes you to the Promotion Flow page with the graphical representation of the flow. For details see???
Environments:  The environments defined in the Promotion Flow for the release and their statuses.


## Release visualization

As a developer, you can visualize the promotion orchestration for on-going or completed releases.
The visualization is a graphical representation of the Promotion Flow defined for that release, showing the:
Environments defined for the Promotion Flow
The dependencies between the environments
Pre- and Post-Action Workflows with the steps 

In addition, the Release Notes brings toegther all the canges 





## Status logic for Releases

These are the three levels of statuses for releases:
* Release status
* Environment (deployment) status
* Promotion Workflow and step status

### Status quick reference

{: .table .table-bordered .table-hover}
| Status             | Applies to  |  Description              | 
| --------------    | --------------           |
|{::nomarkdown}<img src="../../../images/icons/promotion-success.png?display=inline-block">{:/}: Successful  | Release, Environment, Workflows & steps | Promotion was successfully validated in and deployed to each of the environments |
|{::nomarkdown}<img src="../../../images/icons/promotion-running.png?display=inline-block">{:/}: Running |
{::nomarkdown}<img src="../../../images/icons/promotion-pending.png?display=inline-block">{:/}: Pending
{::nomarkdown}<img src="../../../images/icons/promotion-failed.png?display=inline-block">{:/}: Failed



### Release status
The status of a release is the overall status, determined from the statuses of all the environments defined in the Promotion Flow used to orchestrate the Release. 

You can identify the overall status from the status of all its environments in the Releases page, or you can drill down into a Release ID. 

SCREENSHOT OF RELEASE ID DRILLDOWN

The table describes the possible statuses of a release.

{: .table .table-bordered .table-hover}
| Release Status      | Description                                    | 
| ------------------- | ---------------------------------------------- |
| **Successful**      | All Promotion Workflows in all the environments completed successfully. |
| **Progressing**     | Deployment is in progress in at least one environment. |
| **Terminated**       | The Promotion Workflow currently being executed in an environment was terminated preventing deployment to the other environments defined in the Promotion Flow. NIMA: is this connected with concurrent promotions? |
| **Failed**         | Deployment failed for at least one environment and the Release failed. The Workflow with the failed step is flagged in the environment and in the header. Clicking it opens a panel with a link to the logs for that step. |

### Environment (deployment) status
The deployment status of an environment is determined by the cumulative statuses of the Pre- and Post-Action Promotion Workflows run within that environment. 

SCREENSHOT

The table describes the possible statuses of an environment.


{: .table .table-bordered .table-hover}
| Environment (deployment) Status      | Description                                    | 
| ------------------- | ---------------------------------------------- |
| **Successful**      | One or both Promotion Workflows for the environment completed successfully. |
| **Running**         | At least one step in either a Pre- or Post-Action Workflow is currently in progress.|
| **Pending**       | One or both Promotion Workflows are pending execution. This status occurs when the Promotion Workflows in the previous environment failed validation. |
| **Failed**         | At least one step in a Promotion Workflow failed to execute, has a syntax error, or was manually terminated.|


### Workflow and workflow-step status

* The status of a Pre- or Post-Action Promotion Workflow is determined by the status of all its steps.
* The status of a step in a Promotion Workflow is its status aggregated across all the Workflows including and running that step within the environment.
This is because a Product typically includes multiple applications, and therefore runs multiple Promotion Workflows in parallel for the product. 

SCREENSHOT

The table describes the possible statuses of workflow steps.


{: .table .table-bordered .table-hover}
| Environment (deployment) Status      | Description                                    | 
| ------------------- | ---------------------------------------------- |
| **Success**         | The step completed execution without errors in all the Pre- or Post-Action Workflows.|
| **Running**         | The step is currently in progress in at least one of the Pre- or Post-Action Workflows.|
| **Pending**         | The step is pending execution in at least one of the Pre- or Post-Action Workflows. |
| **Failed**          | The step failed to execute, |
| **Error**           | At least one step has a syntax error. |
| **Terminated**      | Step execution was manually terminated. |


 





























## Release Notes 

Release Notes detail the complete history of code changes for the Promotion Flow across Git repositories, ticketing systems, and more.
If you are a developer, the code history is invaluaable to troubelshhot issues identifed as application related errors.

1. Drill down into a release
1. Click **Release Notes**.

This view should be populates based on a specific change we want to track. 

GitOps repository commit / pr

Image tag

Jira feature

Code commit / pr

## Manage Releases

Releases with specific statuses such as Failed 
mm