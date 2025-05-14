---
title: "Promotion contexts for promotion hooks"
description: "Use promotion contexts to expose custom parameters to hooks in Promotion Flows"
group: promotions
toc: true
---


{{site.data.callout.callout_tip}}
Available as part of the early access program.
{{site.data.callout.end}}

## About promotion contexts

Promotion Workflows with hooks in Codefresh GitOps have access to a standard set of [default parameters]({{site.baseurl}}/docs/promotions/promotion-hooks/#default-arguments-in-promotion-hooks), such as the release ID, current release version, product, and commit SHA. When you define these parameters in the hook as input parameters, their values are dynamically retrieved from the ongoing promotion.

Because promotion hooks run within GitOps Runtimes in your own clusters, custom parameters such as Jira ticket IDs, approver names, or Slack channel names are not automatically exposed to the promotion process. To use these custom parameters in hooks, you have two options:
* Define the custom parameters and their values manually in the workflow
* Use a **promotion context** for a more flexible and dynamic approach

A **promotion context** is a user-defined JSON object that allows you to pass custom values between promotion hooks in the same Promotion Flow. See [Creating and exporting a promotion context](#creating-and-exporting-a-promotion-context) and [Example of Promotion Workflow with promotion context](#example-of-promotion-workflow-with-promotion-context).

Defining a promotion context with the custom parameters and then **exporting the context** makes these custom values available to all subsequent hooks in the same Promotion Flow. Each hook can access and use the values from the promotion context as needed.  
Using promotion contexts enables scenarios like notifying specific Slack channels or linking Jira tickets to releases. See [How promotion context works during execution](#how-promotion-context-works-during-execution).  

To see a practical example, follow the [Walkthrough: Using promotion hooks in Promotion Flows to handle promotion failures](#walkthrough-using-promotion-hooks-in-promotion-flows-to-handle-promotion-failures), where you create different Promotion Workflows with hooks, define a promotion context in a workflow, and assign hooks at different stages of the Promotion Flow.



## Creating and exporting a promotion context 
You can use any method to create a promotion context as a JSON object and define the parameters you need.  
The key step is **exporting the promotion context**, as this makes its content available to the Promotion Workflow. The content is saved in the platform. 

When you export the promotion context, `name.outputs.parameters` must be set to `PROMOTION_CONTEXT` and _cannot be changed_. See [Example of Promotion Workflow with promotion context](#example-of-promotion-workflow-with-promotion-context).



## Example of Promotion Workflow with promotion context  
The example creates a promotion context `PROMOTION_CONTEXT` as a JSON object and exports it as an output parameter.
* The promotion context defines `JIRA_ISSUE_SOURCE_FIELD` and `JIRA_BASE_URL` 
* Writes the context to a file `/tmp/promotion-context.txt`
* Adds `PROMOTION_CONTEXT` to `outputs.parameters.name`, defines `globalName` as the name of the promotion context, and in `valueFrom.path` specifies the file path where the promotion context JSON was saved for GitOps Cloud to retrieve and pass on to subsequent Promotion  Workflows.

  
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
      outputs:
        parameters:
          - name: PROMOTION_CONTEXT  #  cannot be changed
            globalName: PROMOTION_CONTEXT # name of promotion context
            valueFrom:
              path: /tmp/promotion-context.txt
...
``` 

## How promotion context works during execution

When a hook exports a promotion context, the promotion mechanism passes the parameters defined within the context to all subsequent hooks in the Promotion Flow.  regardless of whether these hooks include promotion contexts. The promotion context is saved in the GitOps Cloud platform.

This ensures:
* Context values persist across environments and clusters
* If a hook redefines a parameter already in the context, the new value takes precedence


##### Triggering the first promotion hook
When the Promotion Flow is triggered and a product release is created, the promotion mechanism:
* Passes the default input parameters defined (release ID, commit SHA for example) to all hooks configured for the Promotion Flow
* Initializes the promotion context, if defined and exported, with custom values 

##### Triggering subsequent promotion hooks
As the Flow progresses, the promotion mechanism:
* Retrieves the promotion context exported by the previous hook
* Passes the promotion context automatically to the next hook
* If the current hook defines one or more of the parameters from the promotion context as input parameters, their values are taken from the context
* If the current hook also exports a promotion context with the same parameter, the value from the current hook’s promotion context overrides the value from the previous context
  


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/hooks/promotion-context-behavior.png" 
url="/images/gitops-promotions/hooks/promotion-context-behavior.png"
alt="Promotion context shared across promotion hooks in Promotion Flow" 
caption="Promotion context shared across promotion hooks in Promotion Flow"
max-width="60%"
%}


## Walkthrough: Using promotion hooks in Promotion Flows to handle promotion failures

Promotion hooks are designed to take action or provide information related to a release and its environments when a promotion is triggered.
In this walkthrough, you'll see how to create and export a promotion context, and create promotion hooks and use the promotion context to handle promotion failures, ensuring that stakeholders are notified with the right information—without needing to monitor the release manually.

This walkthrough covers:
* [Creating a Promotion Workflow template with a generic promotion context](#create-promotion-workflow-template-with-generic-promotion-context)
* [Creating Promotion Workflows with hooks](#create-promotion-workflows-with-hooks)
* [Assigning hooks in Promotion Flow](#assign-hooks-to-promotion-flow)
* [Triggering hooks in Promotion Flow](#result-of-triggering-hooks-1-and-2-work-in-the-promotion-flow)

### Create Promotion Workflow template with generic promotion context

This Promotion Workflow template:
* Defines a generic promotion context as a key-value map in JSON format. 
* Uses a single parameter, `context-params`, which is a JSON string of arbitrary keys and values, such as metadata for the promotion, Jira ticket references, base URLs.
* Exports the promotion context as `PROMOTION_CONTEXT`, ensuring that it's available to any promotion hook which references it.

##### Example YAML

```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: set-promotion-context
  annotations:
    version: 0.0.1
    codefresh.io/workflow-origin: promotion
spec:
  entrypoint: generate-context
  templates:
    - name: generate-context
      serviceAccountName: hook
      inputs:
        parameters:
          - name: context-params
            description: JSON string of key-value pairs
            # Example: '{"JIRA_ISSUE_SOURCE_FIELD": "ABC-123", "JIRA_BASE_URL": "https://jira.example.com"}'
      script:
        image: alpine
        command: [sh]
        source: |
          echo '{{inputs.parameters.context-params}}' > /tmp/context.json
          CONTEXT_JSON=$(cat /tmp/context.json)

          # Output the context as is
          echo "$CONTEXT_JSON" > /tmp/promotion-context.txt
      outputs:
        parameters:
          - name: PROMOTION_CONTEXT
            globalName: PROMOTION_CONTEXT
            valueFrom:
              path: /tmp/promotion-context.txt
```


### Create Promotion Workflows with hooks

#### Hook 1: Create Jira ticket on promotion failure and export Jira issue URL through promotion context
This hook performs two main actions:
* Creates a Jira issue when a promotion fails.
* References the  exports a promotion context that stores the URL of the created Jira issue, making it available to later hooks in the same Promotion Flow.


{: .table .table-bordered .table-hover}
| Hook 1 feature               | Description                                                                                       |
|-----------------------------|---------------------------------------------------------------------------------------------------|
| **Two-step DAG structure**  | The hook defines a Directed Acyclic Graph (DAG) with two steps: `create-issue` followed by `set-promotion-context`, which depends on successful Jira issue creation. |
| **Jira issue creation**     | The `create-issue` step runs a container that creates a Jira issue and outputs its key or ID.     |
| **Referenced template**     | The `set-promotion-context` step uses a reusable WorkflowTemplate named `set-promotion-context`, referencing its `generate-context` template. |
| **Promotion context setup** | The `set-promotion-context` step passes a `context-params` JSON object with a dynamic Jira field value (`JIRA_ISSUE_SOURCE_FIELD`) from `create-issue` and a static base URL (`JIRA_ISSUE_URL`). It outputs this object as `PROMOTION_CONTEXT`. |
| **Global sharing of context** | The exported `PROMOTION_CONTEXT` is globally accessible to any subsequent hook in the Promotion Flow. |




##### Example YAML
```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: jira-open-bug
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
            templateRef:
              name: set-promotion-context
              template: generate-context
            depends: "create-issue.Succeeded"
            arguments:
              parameters:
                - name: context-params
                  value: |
                    {
                      "JIRA_ISSUE_SOURCE_FIELD": "{{tasks.create-issue.outputs.parameters.JIRA_ISSUE_SOURCE_FIELD}}",
                      "JIRA_ISSUE_URL": "https://testjira273.atlassian.net"
                    }

    - name: create-issue
      serviceAccountName: hook
      retryStrategy:
        limit: "3"
        retryPolicy: "Always"
        backoff:
          duration: "5s"
      inputs:
        parameters:
          - name: SLACK_TOKEN
            valueFrom:
              secretKeyRef:
                name: promotions-secrets
                key: slack-token
          - name: JIRA_ISSUE_URL
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
            default: 'migration for product release failed'
          - name: ISSUE_DESCRIPTION
            default: 'fix migration and current db state'
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
            value: ''
          - name: JIRA_USERNAME
            value: ''
          - name: JIRA_API_SECRET_KEY
            value: ''
          - name: ACTION
            value: 'issue_create'
          - name: ISSUE_PROJECT
            value: ''
          - name: ISSUE_SUMMARY
            value: ''
          - name: ISSUE_DESCRIPTION
            value: ''
          - name: ISSUE_COMPONENTS
            value: ''
          - name: ISSUE_CUSTOMFIELDS
            value: ''
          - name: ISSUE_TYPE
            value: ''
        volumeMounts:
          - name: promotion-context
            mountPath: /tmp
      volumes:
        - name: promotion-context
          emptyDir: {}
   
```
<br><br>

#### Hook 2: Create a hook that sends a Slack notification 
This hook sends a Slack notification when a promotion fails. It uses the promotion context set by the Jira creation hook to include a direct link to the Jira issue in the Slack message.


{: .table .table-bordered .table-hover}
| Hook 2 feature         | Description       | 
| --------------    | --------------    |  
| **Single-step notification flow** | This hook uses a simple, single `send-message` template to post a Slack message. |
| **Detailed Slack notification** | The Slack message the includes product name, commit SHA, promotion flow name, release URL, release ID, failed environments, error message, and **the Jira ticket URL**. |
| **Dynamic inputs** | Parameters like `PRODUCT_NAME`, `COMMIT_SHA`, `ERROR_MESSAGE`, and `JIRA_ISSUE_URL` are passed dynamically, allowing the message to include real-time promotion failure details. |
| **Simple and reusable Slack template** | The hook uses a standard Slack webhook and a flexible `SLACK_TEXT` format, making it easy to modify for different products or flows without changing the container logic. |
| **Promotion context usage** | The `JIRA_ISSUE_URL` from the promotion context created in the previous hook is injected into the Slack message, linking the notification directly to the Jira ticket for tracking. |

##### Example YAML
```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: slack-fail-hook
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
      - name: JIRA_ISSUE_URL
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
              *JIRA Ticket:* {{workflow.parameters.JIRA_ISSUE_URL}} 
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


### Assign hooks to Promotion Flow

The next step is to assign Hook 1 and Hook 2 to different stages of the Promotion Flow.

Here's an example of the Chart and YAML views of a Promotion Flow with several promotion hooks assigned. The hooks relevant to the examples above are highlighted.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/hooks/promotion-flow-hooks-chart-view.png" 
url="/images/gitops-promotions/hooks/promotion-flow-hooks-chart-view.png"
alt="Chart view of Promotion Flows with hooks" 
caption="Chart view of Promotion Flows with hooks" 
max-width="60%"
%}

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/hooks/promotion-flow-hooks-yaml.png" 
url="/images/gitops-promotions/hooks/promotion-flow-hooks-yaml.png"
alt="YAML view of Promotion Flows with hooks" 
caption="YAML view of Promotion Flows with hooks" 
max-width="60%"
%}



### Result of triggering Hooks 1 and 2 work in the Promotion Flow
The table describes the results when the two hooks are triggered. 


{: .table .table-bordered .table-hover}
| Step | Action |
|----|------|
| **1** | Promotion fails in `staging` environment |  Triggers `On Failure` hook configured for `staging` environment |
| **2** | On Failure Hook 1: `jira-open-bug`| {::nomarkdown}<ol><li>Creates new Jira issue describing the release failure.</li><li>Defines a promotion context including the Jira issue URL</li><li>Exports the promotion context to all subsequent hooks in the Promotion Flow, including On Release Failure Hook 2: `slack-fail-hook`.</li></ul>  |
| **3** | Promotion failure for environment triggers On Release Failure  | Hook 2: `slack-fail-hook` sends a Slack notification to all stakeholders. The notification includes detailed failure information including the Jira issue URL value and other values available. | 

Here's an example of the Slack notification sent on release failure:

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/hooks/hook-slack-notification-example.png" 
url="/images/gitops-promotions/hooks/hook-slack-notification-example.png"
alt="Example of Slack notification sent on release failure with link to Jira issue URL" 
caption="Example of Slack notification sent on release failure with link to Jira issue URL" 
max-width="60%"
%}




## Related articles
[Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/)  
[Configure hooks in Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-hooks/)  
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
