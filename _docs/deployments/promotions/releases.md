
A release refers to a new version of software deployed to production, after ensuring that the code has passed all necessary stages of testing and validation. 

In the context of Codefresh GitOps, a release is a comprehensive view of the progression of a Product as it is promoted through different environments until deployment to production. A release encompasses the collective state of all environments and workflows involved in deploying that change, from the initial trigger environment to the final production-ready environment. 

##### Releases & developers
Release information is optimized for application developers. As an application developer who needs to see where an ongoing deploymnent is at, or troubleshoot issues preventing deployment to production, or reported by customers, the Releases feature in Codefresh provides holistic picture of the deployment lifecycle accompanied by an intergated list of changes leading to deployment.

You can analayxe the Worflows nand the 



##### Releases & Products
A Release is added to a Product when it is promoted from the trigger environment. The Releases tab conveniently located next to 


## Release insights

The Releases tab in the Products dashboard displays releases for all Products with promotions, whether successful or failed.

EXAMPLE

Important insights to note:
Release ID is the Codefreh-assigned identifier uniquely identifying the release. Clicking the Release ID displays the ongoing or promotion flow for the release with the promotion policies.
Promotion Flow is the link to the pomrotion flow used to ochrestrate the promotion for the release. Clicking the promotion flow takes you yo yhr Promotion Flow page with the grpahical reppresentation of the flow. For details see???
environments The environments defined in the promotion flow for release deployment and their status.



## Promotion Workflow visualization

As a developer visualize promotion ochreatration for the Product for a specific release.
The visualization includes all aspects of the promotion ochestration, including Promotion Workflows, 
Clicking the release ID displays the promotion flow for the Product and the Promotion Workflows triggered as part of the Pomrotion Policy.

Current status: On the right is the current status of the release.
The visualization of the promotion flow for the release with the environments included int he flow.
Each environment is color-coded to indicate the overall status of the promotion for that environemtn.
Each environment displays  








### Status logic for releases

The overall status of a release is determined by the status of each of its environments, which in turn is determined by the status of the Promotion Workflows defined for it. 


#### Release status
The status is displayed on the right when you drill down into a specific release.  
The status of the release is determined from the status of all of the environments required for deployment.
 

#### Deployment (Environment) status
The overall deployment status of an environment is determined by the cumulative statuses of the Promotion Workflows run for that environment. 

{::nomarkdown}<img src="../../../images/icons/promotion-success.png?display=inline-block">{:/}: Successful  
{::nomarkdown}<img src="../../../images/icons/promotion-running.png?display=inline-block">{:/}: Running
{::nomarkdown}<img src="../../../images/icons/promotion-pending.png?display=inline-block">{:/}: Pending
{::nomarkdown}<img src="../../../images/icons/promotion-failed.png?display=inline-block">{:/}: Failed

#### Workflow step status
The status of the Pre- or Post-Action Promotion Workflow is on the aggregated status of the workflow's steps.
Every step  


For a release, status is aggregated for the release based on all its environments. For an environment based on its workflows, and for the workflow, its steps.
In the Workflow vsualization, the status icons indicate the status of individual workflow steps, and the same status is also reflected in the Environment header.  For example, if at least one step in any Promotion Workflow is pending execution, the environment header is colored gray."
Releases provide statuses for Promotion workflows, promption environments, and the release itself.

These are the possible statuses for a Promotion Workflow and by extension of the Environment in which it is run: 


### Status quick reference



Release status

Succeeded: Promotion was successfully validated in and deployed to each of the environments comprising the promotion
Running: Validation or Promotion Policies are currently in progress for the Environment.
Pending: Environment is pending validation through Promotion Policies.
Failed: 

Workflow step statuses
Success: The sep defined for the environment completed successfully. Meaning that all the steps in one or both Workflows completed execution without errors.
Running: At least one Promotion Workflow is in progress, meaning that a step in the Promoyion Workflow is running.
Pending: One or both Promotion Workflows are pending execution.
Failed: At least one step in a Promotion Workflow failed to execute
Error: At least one step has a syntax error
Terminated: The step was  or manually terminated.
  If the Wor



## Release notes 

Release Notes  the complete history of code changes for the promotion flow across Git repositories, ticketing systems and more.
If you are a developer, the code history is invaluaable to troubelshhot issues identifed as application related errors.

Drill down into a release
Click Release Notes

This view should be populates based on a specific change we want to track. 

GitOps repository commit / pr

Image tag

Jira feature

Code commit / pr

## Manage Releases
mm