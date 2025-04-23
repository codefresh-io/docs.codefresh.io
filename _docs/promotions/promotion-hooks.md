---
title: "Hooks in Promotion Flows"
description: "Configure hooks to capture release- and environment-level events in promotion releases"
group: promotions"
toc: true
---


## What are promotion hooks?

Promotion hooks in Codefresh GitOps are specialized workflows that run at key points during a promotion release. A promotion release is created when a Promotion Flow is manually or automatically triggered.   

Promotion hooks are implemented using the same underlying mechanism as standard Promotion Workflows, but run with additional context and scope on releases and environments. 
Unlike Pre- and Post-Action Promotion Workflows, which run in specific environments and target individual applications, promotion hooks run at the release or environment level. They are not tied to a particular deployment or application, and enable real-time alerts, custom logic and actions without requiring users to monitor the promotion directly in the UI. Teams can stay informed and take action instantly as promotions progress.

DIAGRAM


##### When are promotion hooks triggered?  
Promotion hooks can run at different stages of a release:  
* **Release start**: When a release is initiated  
* **Release end**: When a release completes, whether **successful** or **failed** 
* **Per environment**: When a release transitions through specific environments:  
  * **On start**: When the promotion reaches an environment
  * **On success**: When the promotion completes successfully in an environment  
  * **On failure**: When the promotion fails in an environment

##### Use cases for promotion hooks
* Auditing and visibility  
  Capture details on the entire promotion release and take action

* Notifications and reporting 
  Get timely alerts and notifications on success and failures alike through familiar channels. Send alerts to Slack, email, or monitoring tools based on release events to be always in the loop instead of having to constantly monitor the promotion release.

* Integration with external tools
  Automate updates to ticketing systems such as Jira, or observability platforms.  

##### Requirements for promotion hooks

* Service account
* Service account role and role binding 
* Promotion context

## Promotion hooks vs. Pre- and Post-Action Promotion Workflows

The table lists key differences between Promotion Workflows containing hooks and Promotion (Pre- and Post-Action) Workflows.

| **Feature**    | **Promotion Hooks**  | **Promotion Workflows**    |
|----------------|----------------------|-----------------------------------------------|
| **Purpose**    | Provide information on the release  | Provide information on promoted changes in applications within an environment    |
| **Execution**  | Runs run at release start, end (success, failure), or per environment (start, success, failure) | Runs for each application in an environment before and after promotion |
| **Scope**      | Runs on cluster at release or environment level      | Runs per application in the environment |
| **Effect on promotion**  | Notifies on promotion status | Blocks a promotion if conditions fail  |



## Promotion hooks in Shared Configuration Repository
Promotion Workflows with hooks are saved in the Shared Configuration Repository of the Runtime designated as the Configuration Runtime.
If you have multiple Configuration Runtimes, the hooks are saved in the first Configuration Runtime in the list  

TBD - SHOW EXAMPLE OF SETTINGS

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


## Promotion contexts for promotion hooks
All promotion hooks receive a standard set of [default arguments](#default-arguments-in-promotion-hook-workflows) such as the release ID, product, commit SHA.  
To expose custom data such as Jira ticket IDs, approver names, or Slack channels, and make this data available to additional promotion hooks in the same Promotion Flow, you must define a **promotion context**.
A promotion context is a user-defined JSON object passed between hooks in the same Promotion Flow. It enables sharing values that the promotion mechanism cannot access by default.  

Unlike standard Promotion Workflows which have built-in access to internal context, promotion hooks run within GitOps Runtimes in your own clusters. These hooks do not automatically receive custom values unless you define them in a promotion context. 

Promotion contexts allow you to:
* Expose and store user-defined variables that the promotion mechanism cannot natively access.
* Make those variables available as input parameters to subsequent hooks in the same Promotion Flow.

Examples:
* Send a Slack alert to a specific channel by passing the channel name in the promotion context
* Link to a Jira ticket across all hooks in the release by storing the ticket ID in the promotion context


### Creating and exporting a promotion context 

To create a promotion context in the Promotion Flow:
* Create the JSON object including the custom parameters, and the file to which to export or save the promotion context
* Export the promotion context an output parameter to pass to subsequent hooks


1. **Create the promotion context**  
  * Create the promotion context as a JSON object containing the:
      * Input parameters as variables
      * File to which to save the promotion context. The file is referenced as the promotion context source.

  **Example:**  
  The example creates a promotion context `PROMOTION_CONTEXT` as a JSON object passed to subsequent promotion hooks in the same Promotion Flow. 
  The promotion context:
  * Defines `JIRA_ISSUE_SOURCE_FIELD` and makes it available an input parameter to subsequent hooks.
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
  Expose the file with the promotion context as an output parameter to make it available to the promotion mechanism.
  * Add `PROMOTION_CONTEXT` as the `name` to `outputs.parameters`. _The name must not be changed_.
  * Add the `globalName` attribute to make it available globally. The value must be identical to the name of the promotion context.
  * Add the `valueFrom` attribute to reference the file path.

  **Example:** The example adds `PROMOTION_CONTEXT` to `outputs.parameters.name`,  defines `globalName` as the name of the promotion context, and in `valueFrom.path` specifies the file path where the promotion context JSON was saved for GitOps Cloud to retrieve and pass on to subsequent Promotion Hook Workflows.

```yaml 
...
spec:
...
      outputs:
        parameters:
          - name: PROMOTION_CONTEXT  #  cannot be changed
            globalName: PROMOTION_CONTEXT # name of promotion context
            valueFrom:
              path: /tmp/promotion-context.txt
...
``` 






## Examples of Promotion Hook Workflows
The following are examples of Promotion Workflows with hooks 
They show that even though the hooks runs in the context of a promotion, they do not rely on implicit promotion behavior. Instead, they define their own logic for what to do and how (which plugin to use, which parameters to pass).
This makes the hook reusable in different workflows, or even outside promotion flows, as long as the required parameters are provided.


### On-start hook Promotion Workflow
The example below shows a Promotion Workflow configured as an on-start hook. This workflow can run when a new release starts or when a promotion begins in any environment. It sends a Slack notification with the required parameters defined explicitly as input parameters and not as part of a promotion context.


##### Default parameters in on-start hook
  These are passed automatically as workflow arguments and are typically used to build contextual messages or logs.

`RELEASE_URL`
`PRODUCT_NAME`
`COMMIT_SHA`
`PROMOTION_FLOW_NAME`
`RELEASE_ID`


##### Custom parameters in on-start hook  
  This hook defines additional inputs in the send-message template:
  * `MODE` is the value used by the Slack plugin logic.
  * `SLACK_HOOK_URL` is the user-define incoming webhook URL.
  * `SLACK_TEXT` is the message to send. The example uses the default parameter `RELEASE_URL`.



##### YAML example for on-start hook

```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: on-start-hook
  annotations:
    codefresh.io/workflow-origin: promotion
    version: 0.0.1
spec:
  arguments:
    parameters:
      - name: RELEASE_URL
      - name: PRODUCT_NAME
      - name: COMMIT_SHA
      - name: PROMOTION_FLOW_NAME
      - name: RELEASE_ID
  serviceAccountName: hook
  entrypoint: send-message
  templates:
    # Send-message template
    - name: send-message
      retryStrategy:
        limit: "1"
        retryPolicy: "Always"
        backoff:
          duration: "5s"
      inputs:
        parameters:
          - name: MODE
            value: "simple"
          - name: SLACK_HOOK_URL
            value: <put here your webhook url>
          - name: SLACK_TEXT
            value: Successfully started a release flow {{workflow.parameters.RELEASE_URL}}!  
      container:
        name: main
        imagePullPolicy: Always
        image: quay.io/codefreshplugins/argo-hub-slack-send-message:0.0.2-main
        command:
          - node
          - /usr/src/app/index.js
        env:
          - name: MODE
            value: '{{ inputs.parameters.MODE }}'
          - name: SLACK_HOOK_URL
            value: '{{ inputs.parameters.SLACK_HOOK_URL }}'
          - name: SLACK_TEXT
            value: '{{ inputs.parameters.SLACK_TEXT }}'
```

### On-fail promotion hook example

The example below shows a Promotion Workflow configured as an on-fail hook. This workflow can run when a new release fails or when a promotion fails in any environment. It sends a Slack notification with additional context  defined explicitly as input parameters and not as part of a promotion context.


##### Default parameters in on-fail hook
It includes the same set of default parameters as for the [on-start hook Promotion Workflow](#default-parameters-in-on-start-hook) with two additional parameters specific to promotion failures:
* `FAILED_ENVIRONMENTS` is a JSON array of failed environments if the hook is configured at release-level, or the specific environment if configured at environment level. 
* `ERROR_MESSAGE` is the message describing the failure.

Both parameters are passed automatically.


##### Custom parameters in on-fail hook  
This hook defines the same custom parameters as in the [on-start promotion hook](#custom-parameters-in-on-start-hook). 
The `SLACK_TEXT` parameter is extended to include additional information, such as product, Promotion Flow, release ID etc, ensuring that you have  enough context to take action.


##### On-fail hook YAML

```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: on-fail-hook
  annotations:
    codefresh.io/workflow-origin: promotion
    version: 0.0.1
spec:
  arguments:
    parameters:
      - name: RELEASE_URL
      - name: PRODUCT_NAME
      - name: COMMIT_SHA
      - name: PROMOTION_FLOW_NAME
      - name: RELEASE_ID
      - name: FAILED_ENVIRONMENTS
        value: '[]'
      - name: ERROR_MESSAGE  
  serviceAccountName: hook
  entrypoint: send-message
  templates:
    - name: send-message
      retryStrategy:
        limit: "1"
        retryPolicy: "Always"
        backoff:
          duration: "5s"
      inputs:
        parameters:
          - name: MODE
            value: "simple"
          - name: SLACK_HOOK_URL
            value: https://hooks.slack.com/services/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
          - name: SLACK_TEXT
            value: |
              🚨 *Promotion Failed!* 🚨  
              *Product:* {{workflow.parameters.PRODUCT_NAME}}  
              *Trigger Commit Sha:* {{workflow.parameters.COMMIT_SHA}}  
              *Promotion Flow:* {{workflow.parameters.PROMOTION_FLOW_NAME}}  
              *Release:* <{{workflow.parameters.RELEASE_URL}}|View Release>  
              *Release ID:* {{workflow.parameters.RELEASE_ID}}  
              *Failed Environments:* {{workflow.parameters.FAILED_ENVIRONMENTS}}
              *Error Message:* {{workflow.parameters.ERROR_MESSAGE}}
      container:
        name: main
        imagePullPolicy: Always
        image: quay.io/codefreshplugins/argo-hub-slack-send-message:0.0.2-main
        command:
          - node
          - /usr/src/app/index.js
        env:
          - name: MODE
            value: '{{ inputs.parameters.MODE }}'
          - name: SLACK_HOOK_URL
            value: '{{ inputs.parameters.SLACK_HOOK_URL }}'
          - name: SLACK_TEXT
            value: '{{ inputs.parameters.SLACK_TEXT }}'
```

### On-start hook with promotion context example

The example below shows a Promotion Workflow configured as an _on-start hook with a promotion context_. This workflow can run when a new release starts or when a promotion starts in any environment. It passes a custom parameter, the Jira issue ID, within the promotion context and exports it as an output parameter. The twin advantage is that Jira issue ID is now available to and passed on to other promotion hooks in the same Promotion Flow. (NIMA: are these with promotion context only? or regardless?)


##### Default parameters in on-start hook with promotion context
????

```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: on-start-hook-jira
  annotations:
    codefresh.io/workflow-origin: promotion
    version: 0.0.1

spec:
  serviceAccountName: hook
  entrypoint: main-dag
  templates:
    - name: main-dag
      dag:
        tasks:
          - name: create-issue
            template: create-issue
          - name: set-promotion-context
            template: set-promotion-context
            depends: "create-issue.Succeeded"
            arguments:
              parameters:
                - name: JIRA_ISSUE_SOURCE_FIELD
                  value: "{{tasks.create-issue.outputs.parameters.JIRA_ISSUE_SOURCE_FIELD}}"

    - name: create-issue
      serviceAccountName: hook
      retryStrategy:
        limit: "3"
        retryPolicy: "Always"
        backoff:
          duration: "5s"
      inputs:
        parameters:
          - name: JIRA_API_KEY
            value: 1234
          - name: JIRA_BASE_URL
            value: https://testjira273.atlassian.net
          - name: JIRA_USERNAME
            value: testjira273@gmail.com
          - name: JIRA_API_KEY_SECRET_KEY
            default: 'api-key'
          - name: JIRA_USERNAME_SECRET_KEY
            default: 'username'
          - name: ISSUE_PROJECT
            default: 'TEST'
          - name: ISSUE_SUMMARY
            default: 'some summary'
          - name: ISSUE_DESCRIPTION
            default: 'ISSUE_DESCRIPTION'
          - name: ISSUE_COMPONENTS
            default: ''
          - name: ISSUE_CUSTOMFIELDS
            default: ''
          - name: ISSUE_TYPE
            default: 'Task'
      outputs:
        parameters:
          - name: JIRA_ISSUE_SOURCE_FIELD
            valueFrom:
              path: /tmp/JIRA_ISSUE_SOURCE_FIELD
      container:
        name: main
        imagePullPolicy: Always
        image: quay.io/codefreshplugins/argo-hub-workflows-jira-versions-0.0.1-images-jira-manager:main
        command:
          - python
          - /jira/jira_issue_manager.py
        env:
          - name: JIRA_BASE_URL
            value: '{{ inputs.parameters.JIRA_BASE_URL }}'
          - name: JIRA_USERNAME
            value: '{{ inputs.parameters.JIRA_USERNAME }}'
          - name: JIRA_API_KEY
            value: '{{ inputs.parameters.JIRA_API_KEY }}'
          - name: ACTION
            value: 'issue_create'
          - name: ISSUE_PROJECT
            value: '{{ inputs.parameters.ISSUE_PROJECT }}'
          - name: ISSUE_SUMMARY
            value: '{{ inputs.parameters.ISSUE_SUMMARY }}'
          - name: ISSUE_DESCRIPTION
            value: '{{ inputs.parameters.ISSUE_DESCRIPTION }}'
          - name: ISSUE_COMPONENTS
            value: '{{ inputs.parameters.ISSUE_COMPONENTS }}'
          - name: ISSUE_CUSTOMFIELDS
            value: '{{ inputs.parameters.ISSUE_CUSTOMFIELDS }}'
          - name: ISSUE_TYPE
            value: '{{ inputs.parameters.ISSUE_TYPE }}'
        volumeMounts:
          - name: promotion-context
            mountPath: /tmp
      volumes:
        - name: promotion-context
          emptyDir: {}

    - name: set-promotion-context
      serviceAccountName: hook
      inputs:
        parameters:
          - name: JIRA_ISSUE_SOURCE_FIELD
      script:
        image: alpine
        command:
          - sh
        source: |
          PROMOTION_CONTEXT=$(echo "{\"jira_issue_id\": \"{{inputs.parameters.JIRA_ISSUE_SOURCE_FIELD}}\"}")
          echo $PROMOTION_CONTEXT > /tmp/promotion-context.txt
      outputs:
        parameters:
          - name: PROMOTION_CONTEXT
            globalName: PROMOTION_CONTEXT
            valueFrom:
              path: /tmp/promotion-context.txt
```

## Assigning promotion hooks in Promotion Flows

Assign Promotion Workflows with promotion hooks in the Promotion Flow for the release or environments:
* Release-level hooks run before the trigger environment and after the final target environment
* Environment-level hooks run on entry to or exit from each environment

  >**NOTE**  
  You cannot assign a Promotion Hook Workflow to the Trigger Environment itself. 


SCREENSHOT TBD

## How promotion hooks work during execution

Once you assign Promotion Workflows with promotion hooks in a Promotion Flow, Codefresh GitOps executes them automatically at the relevant stages of the Promotion Flow:

**Triggering the first hook**
When the Promotion Flow is triggered, the promotion mechanism:
* Passes the default promotion metadata (e.g., release ID, commit SHA)
* Initializes the promotion context, if defined and valid, with any custom values 

**Triggering subsequent hooks**
As the Flow progresses, the promotion mechanism:
* Retrieves the promotion context with the custom variables stored in the previous hook
* Passes the context automatically to the next hook as input parameters:
  * New custom parameters are added to the next hook's promotion context
  * If the same custom parameter exists in both the previous and next hooks, the parameter in the next hook overrides the one in the previous hook.  
  
User-defined custom parameters and their values are consistently available across the entire flow, regardless of environment or cluster

For example, if a Jira ticket ID is defined in the context when the release starts, it’s accessible later when another promotion hook runs in a different environment or cluster.

DIAGRAM


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






