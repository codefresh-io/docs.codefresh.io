
A release refers to a new version of software deployed to production after ensuring that the code has passed all necessary stages of testing and validation. 

In the context of Codefresh GitOps, a release is a comprehensive view of the progression of a Product as it is promoted through different environments until deployment to production. A release encompasses the collective state of all environments and workflows involved in deploying that change, from the initial trigger environment to the final production-ready environment. 

##### Releases & developers
Release information is optimized for application developers. As an application developer who needs to see where an ongoing deploymnent is at, or troubleshoot issues preventing deployment to production, or reported by customers, the Releases feature in Codefresh provides holistic picture of the deployment lifecycle accompanied by an intergated list of changes leading to deployment.

You can analayxe the Worflows nand the 



##### Releases & Products
A Release is added to a Product when it is promoted from the trigger environment according to the Promotion Flow selected for the Product. The Releases tab with the details of the release is displayed on drill down into a productd. 


## Release insights

The Releases tab for a product displays the releases for that with promotions, whether successful or failed.

EXAMPLE

Important insights to note:
Release ID is the Codefreh-assigned identifier uniquely identifying the release. Clicking the Release ID displays the ongoing or promotion flow for the release with the promotion policies.
Promotion Flow: The Promotion Flow that ochrestrated the promotion for the specific release of the product. Clicking the link takes you yo yhr Promotion Flow page with the grpahical reppresentation of the flow. For details see???
Environments The environments defined in the Promotion Flow for the release and their statuses.



## Promotion Workflow visualization

As a developer, you can visualize promotion ochestration of specific release.
The visualization includes all aspects of the promotion ochestration, including Promotion Workflows, 
Clicking the release ID displays the promotion flow for the Product and the Promotion Workflows triggered as part of the Pomrotion Policy.

Current status: On the right is the current status of the release.
The visualization of the promotion flow for the release with the environments included int he flow.
Each environment is color-coded to indicate the overall status of the promotion for that environemtn.
Each environment displays  








## Status logic for Releases





These are the three levels of statuses for releases. The overall status of a release is determined by the status of each of its environments, which in turn is determined by the status of the Promotion Workflows defined for it. 

So you have bottom-up:
* Workflow step status
* Environment deployment status
* Release status

### Workflow step status
The Promotion Worklfow status is the aggregated status of the workflow's steps. The Workflow can include a Pre-, Post-Action Promotion Workflow, or both. 
The Workflow status is 

These are the possible statuses of a workflow step:

Success: The step completed execution without errors.
Running: The step is currently in progress.
Pending: The step is pending execution.
Suspended: The step execution has been suspended, and requires manual intervention to resume ??
Failed: The step failed to execute.
Error: At least one step has a syntax error.
Terminated: The step was manually terminated.
 
### Environment (deployment) status
The overall deployment status of an environment is determined by the cumulative statuses of the Pre- and Post-Action Promotion Workflows run for that environment. 

Successful: One or both the Promotion Workflows for the environment completed successfully.
Running: At least one step in a Pre- or Post-Action Worfklow is currently in progress.
Pending: One or both Promotion Workflows are pending execution. This status occurs when the Promotion Workflows in the previous environment failed validation.
Failed: At least one step in a Workflow failed to execute, has a syntax error, or was manually terminated.






### Release status
The release status is displayed on the right on drilldown into a release ID.  
The overall status is determined from the statuses of all of the environments defined in the Promotion Flow used to ochestrate  the Release
 


These are the possible statuses of a Release:

Successful: All Promotion Workflows in all the environments completed successfully.
Progressing: Deployment is running for at least one environment.
Terminated: The Promotion Workflow currently being executed in an environment was terminated preventing deployment to the other environments defined in the Promotion Flow.
Failed: Deployment failed for at least one environment and the Release failed. The Workflow with the failed step is flagged in the environment and in the header. Clicking it opens a panel with a link to the logs for that step.






### Status quick reference

{: .table .table-bordered .table-hover}
| Status             | Applies to  |  Description              | 
| --------------    | --------------           |
|{::nomarkdown}<img src="../../../images/icons/promotion-success.png?display=inline-block">{:/}: Successful  | Release, Environment, Workflows & steps | Promotion was successfully validated in and deployed to each of the environments |
|{::nomarkdown}<img src="../../../images/icons/promotion-running.png?display=inline-block">{:/}: Running |
{::nomarkdown}<img src="../../../images/icons/promotion-pending.png?display=inline-block">{:/}: Pending
{::nomarkdown}<img src="../../../images/icons/promotion-failed.png?display=inline-block">{:/}: Failed





## Release Notes 

Release Notes detail the complete history of code changes for the Promotion Flow across Git repositories, ticketing systems and more.
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