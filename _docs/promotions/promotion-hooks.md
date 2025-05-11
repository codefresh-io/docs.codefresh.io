---
title: "Configure hooks in Promotion Workflows"
description: "Configure hooks to capture release- and environment-level events in promotion releases"
group: promotions"
toc: true
---


## Promotion hooks overview

Promotion hooks in GitOps Cloud are specialized Promotion Workflows that run at key stages of a product release to provide information on the release and its environments. A product release is created when a Promotion Flow is triggered, either manually or automatically.   

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/hooks/promotion-hooks-in-flow.png" 
url="/images/gitops-promotions/hooks/promotion-hooks-in-flow.png"
alt="Promotion hooks in Promotion Flow" 
caption="Promotion hooks in Promotion Flow"
max-width="60%"
%}

Promotion hooks use the same mechanism as standard Promotion Workflows but run with additional context and scope on releases and environments. 
Unlike Pre- and Post-Action Promotion Workflows, which operate on each application within environments, promotion hooks run once per release or environment. They are not tied to a specific deployment or application, making them reusable across multiple flows. Promotion hooks enable real-time alerts, custom logic, and actions—without requiring users to monitor the promotion directly in the UI. Teams can stay informed and respond instantly as promotions progress.



##### When are promotion hooks triggered?  
Promotion hooks can run at different stages of a product release:  
* **Release**: When Promotion Flow trigger creates a product release:
  * **On start**: When the release is initiated  
  * **On success**: When the release completes successfully
  * **On failure**: When the release fails
* **Per environment**: When a release transitions through specific environments:  
  * **On start**: When the promotion reaches an environment
  * **On success**: When the promotion completes successfully in an environment  
  * **On failure**: When the promotion fails in an environment

See [Assigning promotion hooks in Promotion Flows](#assigning-promotion-hooks-in-promotion-flows). For the YAML specifications of promotion hooks when assigned, see [Promotion Flow YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-flow-crd/).

##### Use cases for promotion hooks
* Auditing and visibility  
  Capture details on the entire product release and take action.

* Notifications and reporting 
  Get timely alerts and notifications on success and failures alike through familiar channels. Send alerts to Slack, email, or monitoring tools based on release events to be always in the loop instead of having to constantly monitor the promotion release.

* Integration with external tools
  Automate updates to ticketing systems such as Jira, or observability platforms.  

* Approvals from external systems
  Handle approvals required from external systems such as ServiceNow by pausing the promotion through a promotion hook when a PR pause is not feasible.

Explore examples in [Codefresh Hub for Argo](https://codefresh.io/argohub/){:target="\_blank"}.

##### Arguments in promotion hooks
A default set of arguments are available to all Promotion Workflows with hooks. See [Default arguments in Promotion Workflows with hooks](#default-arguments-for-promotion-hooks).

## Promotion hooks vs. Pre- and Post-Action Promotion Workflows

The table lists key differences between Promotion Workflows containing hooks and Promotion (Pre- and Post-Action) Workflows.

|                | **Promotion Workflows**    |
| **Feature**    | **Promotion Hook Workflows**  | **Pre- and Post-Action Workflows**    |
|----------------|----------------------|-----------------------------------------------|
| **Purpose**    | Provide information on the release.  | Provide information on promoted changes in applications within an environment.    |
| **Execution**  | Run at release start, end (success, failure), or per environment (start, success, failure). | Run for each application in an environment before and after promotion. |
| **Runtime**    | Cluster with the Configuration Runtime. | Runtime managing the application.    |
| **Scope**      | Runs on cluster at release, or once per environment.    | Runs per application in the environment. |
| **Effect on promotion**  | If a hook fails, the product release fails as well. <br>If the release is terminated, the On Fail and On Release Fail hooks, if defined, will run.<br>If an On Start or On Success hook fails, the On Fail hook, if defined, will run. |   If a workflow fails, the product release fails as well.  |


<!--- ## Promotion hooks in Shared Configuration Repository
Promotion Workflows with hooks are saved in the Shared Configuration Repo in `<gitops-runtime>/<shared-configuration-repo>/resources/control-planes/promotion-workflows/`.  

The Workflow when submitted runs in the namespace of the Runtime designated as the [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/). If there is more than one Configuration Runtime, it runs on the first such Runtime in the list.  -->


## Default arguments in Promotion Workflows with hooks
The table below describes the default arguments that are replaced with values that GitOps Cloud retrieves from the promotion process.
* When you create a Promotion Workflow template from the Codefresh UI, these arguments are automatically defined in `spec.arguments.parameters`.
* When you create a template in Git, you must _manually add these arguments as required inputs_ if you want to use them.

{: .table .table-bordered .table-hover}
| Parameter         | Description       | Notes | 
| --------------    | --------------    |  --------------   |
|`RELEASE_URL`  | The URL link to the release associated with the promotion.  | All hooks   | 
|`PRODUCT_NAME` | The name of the product for which the promotion release is running.  | All hooks   |
|`VERSION`      | The version of the current release.| All hooks   | 
|`COMMIT_SHA`   | The unique identifier (SHA) of the commit, generated by Git, that triggered the promotion and created the release.| All hooks   | 
|`PROMOTION_FLOW_NAME` | The name of the Promotion Flow triggered for the release.  | All hooks   | 
|`RELEASE_ID` | The unique identifier of the release.  | All hooks   | 
|`ERROR_MESSAGE` | The system-generated error message identifying the reason why the release failed to complete. For example, `Product release was automatically terminated because the workflow state remained unknown`. | OnFailed hooks only  | 
|`FAILED_ENVIRONMENTS` | The environment or environments which failed in the release with this information: {::nomarkdown}<ul><li><b>Name</b>: The name of the environment that failed to complete the release. For example, production</li><li><b>Status</b>: The release or promotion status for the environment. Can be one of the following: <ul><li>Successful</li><li>Running</li><li>Suspended</li><li>Failed</li><li>Terminated</li></ul></li><li><b>Error-message</b>: The system-generated error message identifying the reason for the failed promotion. For example, <code class="highlighter-rouge">Product release was automatically terminated because the workflow state remained unknown</code>. {:/}| OnFailed hooks only  | 

## Promotion contexts in Promotion Workflows with hooks
In a Promotion Flow, hooks may need custom parameters beyond the default ones available to the promotion mechanism. Because promotion hooks run within GitOps Runtimes in your own clusters, they do not automatically have access to these custom internal parameters. To pass custom values like Jira ticket IDs, approver names, or Slack channel information between hooks in the same Promotion Flow, you must define and export a promotion context. For details, see [Creating and exporting a promotion context](#creating-and-exporting-a-promotion-context).


## Service accounts for promotion hooks

Promotion Workflows that include hooks must also specify a service account with the required permissions. For details, see [Service accounts for Promotion Workflows]({{site.baseurl}}/docs/promotions/service-accounts-promotion-workflows/).


## Examples of hooks in Promotion Workflows
The following are examples of Promotion Workflows with hooks. 
Though the hooks runs in the context of a promotion, they do not rely on implicit promotion behavior which makes the hooks reusable in different Promotion Flows at release or environment levels.

For examples of hooks with promotion contexts, see 


### On-start promotion hook example
The example below shows a Promotion Workflow configured as an on-start hook. This workflow can run when a new release starts or when a promotion begins in any environment. It sends a Slack notification with the required parameters explicitly defined as input parameters. As they are not within a promotion context, these parameters are only available within the scope of this specific hook.


##### Default parameters in on-start hook
These are defined in `arguments.parameters` and GitOps Cloud dynamically retrieves their values during the promotion. 
* `RELEASE_URL`  
* `PRODUCT_NAME`  
* `COMMIT_SHA`  
* `PROMOTION_FLOW_NAME`  
* `RELEASE_ID`  


##### Additional parameters in on-start hook  
This hook defines additional input parameters in the `send-message` template. Note that all parameters are defined with explicit values. 
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
            value: https://hooks.slack.com/services/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
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

The example below shows a Promotion Workflow configured as an on-fail hook. This workflow can run when a new release fails or when a promotion fails in any environment. It sends a Slack notification with additional context also explicitly defined as input parameters and not as part of a promotion context.


##### Default parameters in on-fail hook
It includes the same set of default parameters as for the [on-start hook Promotion Workflow](#default-parameters-in-on-start-hook) with two additional parameters specific to failed promotions:
* `FAILED_ENVIRONMENTS` is a JSON array of failed environments if the hook is configured at release-level, or the specific environment if configured at environment level. 
* `ERROR_MESSAGE` is the message describing the failure.


##### Additional parameters in on-fail hook  
This hook defines the same custom parameters as in the [on-start promotion hook](#custom-parameters-in-on-start-hook). 
The `SLACK_TEXT` parameter is extended to include additional information, such as product, Promotion Flow, release ID, and more, ensuring that you have enough context to take action.


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



## Assigning promotion hooks in Promotion Flows

Assign Promotion Workflows with promotion hooks to the Promotion Flow for the release or for one or more environments:
* Release-level hooks run before the trigger environment and after the final target environment.
* Environment-level hooks run on entry to or exit from each environment.
* Multiple hooks can run based the stage in the product release they are configured. Promotion failure for an environment will run both On Fail hooks if configured the environment and for the release.

You can also define them in the YAML manifest, as described in [Promotion Flow YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-flow-crd/).


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/hooks/assign-promotion-hooks-in-ui.png" 
url="/images/gitops-promotions/hooks/assign-promotion-hooks-in-ui.png"
alt="Assign promotion hooks in Promotion Flow" 
caption="Assign promotion hooks in Promotion Flow"
max-width="60%"
%}

>**NOTE**  
You cannot assign a Promotion Hook Workflow to the Trigger Environment itself. 




## Related articles
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
[Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/)  
[Promotion Flow YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-flow-crd/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  


