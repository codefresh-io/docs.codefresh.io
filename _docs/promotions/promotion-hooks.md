---
title: "Hooks in Promotion Flows"
description: "Configure hooks to capture release- and environment-level events in promotion releases"
group: promotions"
toc: true
---


## Overview

Promotion hooks in Codefresh GitOps are implemented through Promotion Hook Workflows, which run custom logic during a promotion release without interacting directly with application deployments. They are especially useful to expose values and run actions that must persist across environments, independent of any specific cluster. Promotion hooks are created when you assign predefined Promotion Hook Workflows to your Promotion Flow. They are run when the Promotion Flow is triggered either manually or automatically to create promotion releases. 

While Pre- and Post-Action Workflows run within the target environment and operate on specific applications, Promotion Hook Workflows run at the release or environment level. 


### When are promotion hooks triggered?  
Promotion hooks can execute at different stages of a release:  
* **Release start**: Runs when a release is initiated.  
* **Release end**: Runs when a release completes, whether **successful** or **failed**.  
* **Per environment**: Runs when a release transitions through specific environments:  
  * **On start**: Runs when the promotion reaches an environment.  
  * **On success**: Runs when the promotion completes successfully in an environment.  
  * **On failure**: Runs when the promotion fails in an environment.  

### Use cases for promotion hooks
* Auditing and visibility  
  Capture details on the entire promotion release and take action

* Notifications and reporting 
  Get timely alerts and notifications on success and failures alike through familiar channels. Send alerts to Slack, email, or monitoring tools based on release events to be always in the loop instead of having to constantly monitor the promotion release.

* Integration with external tools
  Automate updates to ticketing systems such as Jira, or observability platforms. Create 

### Promotion Hook Workflows vs. Promotion Workflows

The table lists key differences between Promotion Hook Workflows and Promotion (Pre- and Post-Action) Workflows.

| **Feature**    | **Promotion Hooks**  | **Promotion Workflows**    |
|----------------|----------------------|-----------------------------------------------|
| **Purpose**    | Provide information on the release  | Provide information on promoted changes ing applications within an environment    |
| **Execution**  | Runs at release start, end (success, failure), or per environment (start, success, failure) | Runs for each application in an environment before and after promotion |
| **Scope**      | Runs on cluster at release or environment level      | Runs per application in the environment |
| **Effect on Promotion**  | Does not modify applications or deployments | Blocks a promotion if conditions fail  |

### What do you need for Promotion Hook Workflows

* Service account, service account role, and role binding 
* Promotion context

## Service accounts & service account roles for Promotion Hook Workflows
When a GitOps Runtime is installed, to support promotion hooks, Codefresh GitOps creates the following resources:  

* **Service account**  
  * `cf-default-promotion-workflows-sa` service account with the required role and role binding.  
  * Workflow template manifests in Codefresh reference this service account.  

* **Service account role**
  `cf-default-promotion-workflows-role`, the default role for Promotion Workflows, bound to the service account `cf-default-promotion-workflows-sa`.  

If you already have service accounts or want to create your own service accounts, make sure that the system-provided service account is not compromised.


### RBAC permissions for service account role  
The following Role-Based Access Control (RBAC) permissions are required:   
* `GET`  
* `WATCH`  
* `PATCH`  

These permissions allow hooks to retrieve and update release and promotion details securely. 

### Using an existing service account
For existing service accounts:
* Create a new role with the required RBAC permissions.
* Add a role binding to associate the new role with the service account.


### Creating a new service account.
* Bind the `cf-default-promotion-workflows-role` to the new service account.


## Promotion contexts in Promotion Hook Workflows
Codefresh GitOps automatically passes a [default set of release metadata](#default-arguments-in-promotion-hook-workflows) to all Promotion Hook Workflows. This includes system-generated values such as the release ID, commit SHA, product, and other release-related context.
To expose or run actions based on user-specific or external metadata and custom logic-like Jira ticket IDs, approver names, Slack channels, or custom business logic—you must define and pass this information explicitly using a **promotion context**.  
Unlike standard Promotion Workflows which have built-in access to internal context, Promotion Hook Workflows run within GitOps Runtimes in your own clusters. These workflows do not automatically receive custom values unless you define them in a promotion context. 

Promotion contexts allow you to:
* Expose and store user-defined variables that Codefresh cannot natively access.
* Make those variables available as input parameters to subsequent Promotion Hook Workflows in the same Promotion Flow.

For example:
* Send a Slack notification when a promotion starts, you can pass the target channel in the promotion context.
* For a Jira ticket related to the promotion to be available as an input parameter for subsequent promotion hooks.

### Promotion context features
The promotion context:
* Is a user-defined _JSON object_ in a Promotion Hook Workflow
* Contains custom variables such as Jira ticket ID, approver, change reason, as key-value pairs
* Contains the path where the file is saved

### Creating a promotion context in a Promotion Hook Workflow

Create a promotion context in the Promotion Hook Workflow by following these steps:
 
* Create the promotion context as a JSON object including the custom parameters, and the file to which to export or save it.
* Export the promotion context an output parameter to pass to subsequent Promotion Hook Workflow


1. **Create the promotion context**  
  * Create the promotion context as a JSON object containing the:
      * Input parameters as variables
      * File to which to save the promotion context. The file is referenced as the promotion context source.

  **Example:**  
  The example creates a promotion context `PROMOTION_CONTEXT` as a JSON object passed to subsequent Promotion Hook Workflows in the same Promotion Flow. 
  The promotion context:
  * Defines `JIRA_ISSUE_SOURCE_FIELD` and makes it available an input parameter to subsequent Promotion Hook Workflows.
  * Writes the context to a file `/tmp/promotion-context.txt`
  
```yaml 
...
spec:
...
    - name: set-promotion-context
      serviceAccountName: hook
      inputs:
        parameters:
          - name: JIRA_ISSUE_SOURCE_FIELD
          - name: JIRA_BASE_URL
      script:
        image: alpine
        command:
          - sh
        source: |
            export JIRA_ISSUE_BASE_URL="{{inputs.parameters.JIRA_BASE_URL}}"
            export JIRA_ISSUE_SOURCE_FIELD="{{inputs.parameters.JIRA_ISSUE_SOURCE_FIELD}}"
            PROMOTION_CONTEXT=$(echo "{\"JIRA_ISSUE_URL\": \"${JIRA_ISSUE_BASE_URL}/browse/${JIRA_ISSUE_SOURCE_FIELD}\"}")
            echo "$PROMOTION_CONTEXT" > /tmp/promotion-context.txt
...
``` 

1. **Export promotion context**  
  Expose the file with the promotion context as an output parameter to make it available to Codefresh  Promotion Hook Workflows.
  * Add `PROMOTION_CONTEXT` as the `name` to `outputs.parameters`. _The name must not be changed_.
  * Add the `globalName` attribute to make it available globally. The value must be identical to the name of the promotion context.
  * `valueFrom` attribute to reference the file path

  **Example:** The example adds `PROMOTION_CONTEXT` to `outputs.parameters.name`,  defines `globalName` as the name of the promotion context, and specifies the file path where the promotion context JSON was saved for Codefresh GitOps to retrieve and pass on to subsequent Promotion Hook Workflows.

```yaml 
...
spec:
...
      outputs:
        parameters:
          - name: PROMOTION_CONTEXT  # cannot be changed
            globalName: PROMOTION_CONTEXT # name of promotion context
            valueFrom:
              path: /tmp/promotion-context.txt
...
``` 

## Examples of Promotion Hook Workflows
The following examples of Promotion Hook Workflows 

TBD

## How promotion hooks work during execution

Once you assign Promotion Hook Workflows to environments in a Promotion Flow, Codefresh GitOps executes them automatically at the relevant stages of the Promotion Flow:

**Assigning hooks**
You assign Promotion Hook Workflows in the Promotion Flow:
* Release-level hooks run before the trigger environment and after the final target environment
* Environment-level hooks run on entry to or exit from each environment

  >**NOTE**  
  You cannot assign a Promotion Hook Workflow to the Trigger Environment itself. 

**Triggering the first hook**
When the Promotion Flow is triggered, the promotion mechanism:
* Passes the default promotion metadata (e.g., release ID, commit SHA)
* Initializes the promotion context, if defined and valid, with any custom values 

**Triggering subsequent hooks**
As the Flow progresses, the promotion mechanism:
* Retrieves the promotion context with the custom variables stored in the first hook
* Passes the context automatically to all subsequent hooks as input parameters, making user-defined values consistently available across the entire flow, regardless of environment or cluster

For example, if a Jira ticket ID is defined in the context when a promotion starts, it’s accessible later when a post-promotion hook runs in a different environment or cluster.




## Default arguments in Promotion Hook Workflows

{: .table .table-bordered .table-hover}
| Parameter                     | Description            | Notes | 
| --------------                 | --------------           |  --------------   |
|`RELEASE_URL` | The URL link to the release associated with the promotion. Is this the release nmae? Can you see this somewhere? How can users  | All hooks   | 
|`PRODUCT_NAME` | The name of the product for which the promotion release is running.  | All hooks   | 
|`COMMIT_SHA`   | The unique identifier (SHA) of the commit, generated by Git, that triggered the promotion and creaged the release.| All hooks   | 
|`PROMOTION_FLOW_NAME` | The name of the Promotion Flow triggerend for the release .  | All hooks   | 
|`RELEASE_ID` | The unique identifier of the release.  | All hooks   | 
|`ERROR_MESSAGE` | The system-generated error message identifying the reason why the release failed to complete. For example, `Product release was automatically terminated because the workflow state remained unknown`. | OnFailed hooks only  | 
|`FAILED_ENVIRONMENTS` | The environment or environments which failed in the release with this information: {::nomarkdown}<ul><li>Name: The name of the environment that failed to complete the release. For example, production</li><li>Status: The release or promotion status for the environment. Can be one of the following: {::nomarkdown}<ul><li>**Successful** </li><li>Running</li><li>Suspended</li><li>Failed</li><li>Terminated</li></ul></li><li>Error-message: Thesystem-generated error message identifying the reason for the failed promotion. For example, `Product release was automatically terminated because the workflow state remained unknown`. | OnFailed hooks only  | 



## Examples





