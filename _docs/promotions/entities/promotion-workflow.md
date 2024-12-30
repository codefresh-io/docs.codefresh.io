---
title: "Configure Promotion Workflows"
description: "Create, run, and manage Promotion Workflows"
redirect-from: 
 - /docs/promotions/configuration/
group: promotions
toc: true
---


Workflows are automated processes designed to orchestrate tasks, checks, and actions in a defined sequence to achieve a specific outcome. 
In the context of GitOps promotions, Promotion Workflows automate tests and tasks before and after changes are promoted in environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/workflows/workflow-overview-image.png" 
url="/images/gitops-promotions/workflows/workflow-overview-image.png"
alt="Promotion Workflows" 
caption="Promotion Workflows"
max-width="60%"
%}


##### Promotion Workflows and Argo Workflows
Promotion Workflows are Argo Workflows that include a specific annotation identifying them for promotion use. You can harness the full capabilities of Argo Workflows and integrate them seamlessly into the GitOps promotion process. 

If you are not familiar with Argo Workflows, refer to their official [documentation](https://argo-workflows.readthedocs.io/en/latest/){:target="\_blank"}.  
We also have several articles on all aspects of Argo Workflows at our [learning center](https://codefresh.io/learn/argo-workflows/){:target="\_blank"}. 

See [Annotation attribute for Promotion Workflows](#annotation-attribute-for-promotion-workflows).


##### Pre-Action and Post-Action Workflows 

Promotion Workflows though optional in the promotion process, play a critical role in ensuring that the promoted changes to target environments meet the necessary standards for quality and performance. 

Our GitOps promotion process allows you to run Promotion Workflows at different stages of the process:

* **_Before_ the changes are applied through Pre-Action Workflows**  
  Pre-Action Workflows validate the readiness of the environment for the changes. These workflows can include tasks such as smoke tests, security scans, or dependency checks.
* **_After_ the changes are applied through Post-Action Workflows**  
  Post-Action Workflows validate the success of the promotion after the changes are committed. Such workflows can run performance testing, data integrity checks, or notifying stakeholders about the update status.

See [Promotion Workflow examples](#promotion-workflow-examples).


##### Using Promotion Workflows in the promotion process
After creating Promotion Workflows, there are two ways to use them in the promotion process, depending on the level of control and scalability you need:

* Manual selection  
  When triggering a promotion manually, you can select specific Pre- and Post-Action Workflows to run for the target environment. This approach is ideal for single-environment promotions or when you need granular control over the workflows for a specific change.  
  Example:  
  During a drag-and-drop promotion, you might choose a Pre-Action Workflow to run integration tests and a Post-Action Workflow to send Slack notifications for the target environment.  
  See [Triggering promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/).

* Controlled automation with policies  
  For scalable, automated usage, associate Promotion Workflows with Promotion Policies. Promotion Policies govern promotion behavior according to predefined criteria to create reusable promotion patterns for different environments.
  With this approach, you can match workflows to environments or products, ensuring consistent behavior in multi-environment promotion flows. You can also combine workflows with specific promotion actions, such as committing changes in pre-production evironments and creating pull requests in production.  
  Example: 
  Assign a validation workflow for all staging environments and a performance testing workflow for production environments.  
  See [Configuring Promotion Policies]({{site.baseurl}}/docs/promotions/configuration/promotion-policy/).


##### Arguments in Pre-Action and Post-Action Workflows
Codefresh passes a set of arguments it retrieves during the promotion process to both Pre- and Post-Action Workflows. You can use these as dynamic data throughout the promotion lifecycle.  
See [Parameters in Pre-Action and Post-Action Workflows](#parameters-in-pre-action-and-post-action-workflows).

##### Manage workflows and workflow instances
After creating Promotion Workflows, you can [manage workflows](#managing-promotion-workflows) and [workflow instances](#managing-workflow-instances). 

##### Workflow settings in Shared Repo
Once configured and committed, Promotion Workflow settings are saved as a CRD (Custom Resource Definition) within the Shared Configuration Repository in the GitOps Runtime selected as the Configuration Runtime.  
The path in the Shared Configuration Repo is `<gitops-runtime>/<shared-configuration-repo>/resources/control-planes/promotion-workflows/`.  
See [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) and [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes).   

## Annotation attribute for Promotion Workflows
An Argo Workflow or a Workflow Template is classified as a Promotion Workflow when the following annotation is present in the workflow manifest:  
`metadata.annotations: codefresh.io/workflow-origin: promotion`

This annotation in the Promotion Workflow's manifest ensures that:
* The Promotion Workflow is displayed in the Promotion Workflows list and can be managed there
* You can assign the Promotion Workflow to Promotion Policies
* Select the Promotion Workflow within Promotion Flows  

## Parameters in Pre-Action and Post-Action Workflows
Pre-Action and Post-Action Workflows can use default parameters retrieved from application manifest data, and user-defined custom parameters to adapt dynamically to specific environments and processes.

### Default parameters

The table describes the default parameters and values passed to Pre- and Post-Action Workflows.   
The same set of parameters are passed also for pull requests (GitHub only), after the pull request is merged.

At the simplest levels, you can display the values from the parameters in notifications. In more advanced scenarios, you can customize the workflow execution based on specific parameters and their values.

{: .table .table-bordered .table-hover}
| Parameters                     | Description            | Pre-Action Workflow | Post-Action Workflow | 
| --------------                 | --------------           |  --------------   | --------------        |
|`APP_NAMESPACE` | The namespace where the application is deployed to. For example, `gitops`.  | ✅   | ✅   | 
|`APP_NAME`      | The name of the specific application the Promotion Workflows and the Promotion Action pertain to. For example, `trioapp-staging`.| ✅   | ✅   | 
| `REPO_URL`     | The Git repository with the application settings, as defined in the application's configuration. See [Source settings for applications]({{site.baseurl}}/docs/deployments/gitops/create-application/#sources).|  ✅   | ✅   | 
| `BRANCH`       | The specific Git branch to which to promote changes. For example, `main`.   |✅   | ✅   | 
| `PATH`         |  The relative path within the repository defined by `REPO_URL` to the directory or file containing the application's configuration. See [Source settings for applications]({{site.baseurl}}/docs/deployments/gitops/create-application/#sources). |  ✅   | ✅   | 
|`RUNTIME`       |The name of the GitOps Runtime the application being promoted is associated with. |✅   | ✅   | 
|`COMMIT_SHA`| The unique identifier (SHA) of the commit, generated by Git, including the precise set of changes addressed by the commit. Can be used as a trigger condition in Promotion Flows configured for a product.  |   |✅   | 
|`COMMIT_AUTHOR`| The name of the user who made the commit. Useful for tracking changes and for notifications.| | ✅   |  
|`COMMIT-MESSAGE` | The text in the commit message associated with the code change that triggered the promotion, providing context for the changes introduced by the commit. | |✅   | 
|`COMMIT-DATE`  | The date and time when the commit was made. Useful to correlate the commit with other events and understand the timeline of changes.|  | ✅   | 


### Custom global parameters
In Pre-Action Workflows, you can define _custom parameters as global outputs_, making them available as input parameters in subsequent Post-Action Workflows. This feature provides a seamless way to pass data across workflows and create complex automation scenarios.

In the Pre-Action Workflow, any parameter marked with a `globalName` in its `outputs` definition becomes a global parameter.  
These parameters are then available to the Post-Action Workflow.

```yaml
outputs:
  parameters:
  - name: JIRA_ID
    globalName: JIRA_ID
    valueFrom:
      path: /tmp/JIRA_ID
```
See this [example](#example-3-pre--and-post-action-workflows-with-custom-globalname-argument-usage) that uses the `globalName` argument. 





## Promotion Workflow examples

You can create different types of workflows to address specific requirements at various stages of the GitOps promotion process.  
Here are some examples:
* Testing workflows to run unit and smoke tests to validate and verify that the promoted change is functional in the target environment.
* Notification workflows to send updates or alerts to stakeholders via tools like Slack or email.
* Performance testing workflows to run benchmarks or load tests to validate performance post-promotion.
* Validation workflows to ensure compliance with security, quality, or policy standards before deployment.
* Rollback workflows to automatically revert changes if a promotion fails validation or post-action checks.

##### YAML examples 

Here are some examples of Promotion Workflows with different objectives, run at different stages of the promotion process:
* [Example 1: Pre-Action Workflow with application sync check](#example-1-pre-action-application-sync-check-test)
* [Example 2: Post-Action Workflow to send Slack notification with commit details](#example-2-post-action-workflow-to-send-slack-notification-with-commit-details)
* [Example 3: Pre- and Post-Action Workflows with custom `globalName` argument usage](#example-3-pre--and-post-action-workflows-with-custom-globalname-argument-usage)


### Example 1: Pre-Action application sync check test
This Pre-action Workflow performs a preliminary validation by echoing a sync message for the application being promoted.
The workflow confirms that the argument `APP_NAME` is correctly passed to it and right application is being promoted.

* The workflow accepts parameters such as the application namespace (`APP_NAMESPACE`), application name (`APP_NAME`), repository URL (`REPO_URL`), branch (`BRANCH`), and path (`PATH`), automatically passed by Codefresh and uses them in the steps.
* The `run-echo` step executes an `echo` command that outputs a message, including the provided parameters, confirming the syncing of the application from the repository.
* The `send-message` step sends a message to a Slack channel using a webhook URL (`SLACK_HOOK_URL`). The message, which can be customized (`SLACK_TEXT`), notifies stakeholders which application (`APP_NAME`) is being promoted.

```yaml 
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: pre-action
  annotations:
    codefresh.io/workflow-origin: promotion
    version: 0.0.1
spec:
  arguments:
    parameters:
      - name: APP_NAMESPACE
      - name: APP_NAME
      - name: REPO_URL
      - name: BRANCH
      - name: PATH
  entrypoint: main-workflow
  templates:
    # Parent template to run both tasks
    - name: main-workflow
      steps:
        - - name: run-echo
            template: echo
        - - name: run-send-message
            template: send-message

    # Echo template
    - name: echo
      script:
        image: alpine
        command:
          - sh
        source: >
          echo "syncing
          {{workflow.parameters.APP_NAMESPACE}}/{{workflow.parameters.APP_NAME}}
          from {{workflow.parameters.REPO_URL}} branch
          {{workflow.parameters.BRANCH}} path {{workflow.parameters.PATH}}"

    # Send-message template
    - name: send-message
      retryStrategy:
        limit: "10"
        retryPolicy: "Always"
        backoff:
          duration: "5s"
      inputs:
        parameters:
          - name: MODE
            value: "simple"
          - name: SLACK_HOOK_URL
            value: <SLACK_HOOK_URL>
          - name: SLACK_TEXT
            value: Promotion initiated for {{workflow.parameters.APP_NAME}}!  
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


### Example 2: Post-Action Workflow to send Slack notification with commit details 
This example is of a Post-Action Promotion Workflow run after the Promotion Action is executed, using the information about the commit action to notify stakeholders.

* The workflow accepts the same parameters passed in the Pre-Action Workflow such as application namespace (`APP_NAMESPACE`), application name (`APP_NAME`), repository URL (`REPO_URL`), branch (`BRANCH`), and path (`PATH`).  
It also includes additional parameters taken from the optional commit details like `COMMIT_SHA`, `COMMIT_MESSAGE`, `COMMIT_AUTHOR`, and `COMMIT_DATE`.
* The `run-echo` step logs a message about the application syncing, including the commit details if they are provided.
* The `run-send-message` step sends a Slack notification if the promotion is successful.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: post-action
  annotations:
    codefresh.io/workflow-origin: promotion
    version: 0.0.1
spec:
  arguments:
    parameters:
      - name: APP_NAMESPACE
      - name: APP_NAME
      - name: REPO_URL
      - name: BRANCH
      - name: PATH
      - name: COMMIT_SHA
        value: ''
      - name: COMMIT_MESSAGE
        value: ''
      - name: COMMIT_AUTHOR
        value: ''
      - name: COMMIT_DATE
        value: ''
  entrypoint: main-workflow
  templates:
    # Parent template to run both tasks
    - name: main-workflow
      steps:
        - - name: run-echo
            template: echo
        - - name: run-send-message
            template: send-message

    # Echo template
    - name: echo
      script:
        image: alpine
        command:
          - sh
        source: >
          echo "syncing
          {{workflow.parameters.APP_NAMESPACE}}/{{workflow.parameters.APP_NAME}}
          from {{workflow.parameters.REPO_URL}} branch
          {{workflow.parameters.BRANCH}} path {{workflow.parameters.PATH}}"

          if [[ -n "{{workflow.parameters.COMMIT_SHA}}" ]]; then
            echo "commit SHA: {{workflow.parameters.COMMIT_SHA}}"
          fi

          if [[ -n "{{workflow.parameters.COMMIT_AUTHOR}}" ]]; then
            echo "commit author: {{workflow.parameters.COMMIT_AUTHOR}}"
          fi

          if [[ -n "{{workflow.parameters.COMMIT_MESSAGE}}" ]]; then
            echo "commit message: {{workflow.parameters.COMMIT_MESSAGE}}"
          fi

          if [[ -n "{{workflow.parameters.COMMIT_DATE}}" ]]; then
            echo "commit date: {{workflow.parameters.COMMIT_DATE}}"
          fi

    # Send-message template
    - name: send-message
      retryStrategy:
        limit: "10"
        retryPolicy: "Always"
        backoff:
          duration: "5s"
      inputs:
        parameters:
          - name: MODE
            value: "simple"
          - name: SLACK_HOOK_URL
            value: <SLACK_HOOK_URL>
          - name: SLACK_TEXT
            value: Successfully promoted {{workflow.parameters.APP_NAME}}!  
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



### Example 3: Pre- and Post-Action Workflows with custom `globalName` argument usage

This is an example of a Pre-Action Workflow that simulates creating a Jira ticket with the data retreived from the application manifest and outputs the ticket ID as a global parameter. The Post-Action Workflow simulates using the ID as an input parameter to close the ticket. 

#### Pre-Action Workflow example with Jira ID as global parameter

Main features:
* **Workflow parameters**
  The following parameters are passed to the Pre-Action Workflow:
    * Application details: `APP_NAMESPACE`, `APP_NAME`
    * Source repository details: `REPO_URL`, `BRANCH, PATH`

* **Argo CD application fetch task**  
  The `argocd-get` task fetches application details using Argo CD's CLI, storing the application manifest for downstream tasks.

* **Jira ticket creation task**  
  The `jira-create-ticket` task generates a simulated Jira ticket ID based on the application manifest.  
  The `JIRA_ID` parameter is marked with a `globalName` to allow it to be passed to post-action workflows seamlessly. 


```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: pre-action-argo-cd-jira-example
  annotations:
    codefresh.io/workflow-origin: promotion
    codefresh.io/promotion-stage: pre-action
    version: 0.0.1
    description: 'a demo jira-open-ticket wf. reads argo-cd app information, outputs (dummy) JIRA_ID value'
spec:
  serviceAccountName: pre-action-sa
  entrypoint: dag
  arguments:
    parameters:
    - name: APP_NAMESPACE
    - name: APP_NAME
    - name: REPO_URL
    - name: BRANCH
    - name: PATH
  templates:
  - name: dag
    inputs:
      parameters:
      - name: APP_NAMESPACE
      - name: APP_NAME
      - name: REPO_URL
      - name: BRANCH
      - name: PATH
    dag:
      tasks:
      - name: argocd-get
        template: argocd-get-tmpl
        arguments:
          parameters:
          - name: ARGOCD_SERVER
            value: argo-cd-server:80 # or whatever service name you end up using
          - name: APP_NAME
            value: "{{ inputs.parameters.APP_NAME }}"
          - name: TOKEN_SECRET
            value: argocd-token
          - name: TOKEN_SECRET_KEY
            value: token

      - name: jira-create-ticket
        depends: "argocd-get"
        template: jira-create-ticket-tmpl
        arguments:
          parameters:
          - name: APP_MANIFEST
            value: "{{ tasks['argocd-get'].outputs.parameters.APP_MANIFEST }}"

  - name: argocd-get-tmpl
    inputs:
      parameters:
      - name: ARGOCD_SERVER
      - name: APP_NAME
      - name: TOKEN_SECRET
        default: argocd-token
      - name: TOKEN_SECRET_KEY
        default: token
    outputs:
      parameters:
      - name: APP_MANIFEST
        # globalName: APP_MANIFEST # optional - any global output will reach the post-action as well
        valueFrom:
          path: /tmp/result.json
    script:
      name: app-get
      image: quay.io/codefreshplugins/argo-hub-workflows-argocd-versions-0.0.1-images-argocd-cli:main
      env:
      - name: APP_NAME
        value: "{{ inputs.parameters.APP_NAME }}"
      - name: ARGOCD_SERVER
        value: "{{ inputs.parameters.ARGOCD_SERVER }}"
      - name: ARGOCD_AUTH_TOKEN
        valueFrom:
          secretKeyRef:
            name: "{{ inputs.parameters.TOKEN_SECRET }}"
            key: "{{ inputs.parameters.TOKEN_SECRET_KEY }}"
      - name: ARGOCD_OPTS
        value: --grpc-web --plaintext
      command:
      - sh
      source: |
        argocd app get ${APP_NAME} --output json > /tmp/result.json

  - name: jira-create-ticket-tmpl
    inputs:
      parameters:
      - name: APP_MANIFEST
    outputs:
      parameters:
      - name: JIRA_ID
        globalName: JIRA_ID
        valueFrom:
          path: /tmp/JIRA_ID
    script:
      image: alpine:3.20
      command:
      - sh
      source: |
        echo "create jira ticket with data from the inputs.prameters.APP_MANIFEST"
        sleep 5
        RANDOM_HASH=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13)
        echo "JIRA-ticket-id-${RANDOM_HASH}" > /tmp/JIRA_ID
```

#### Post-Action Workflow with Jira ID 

Main features:
* **Workflow parameters**  
  The following parameters are passed to the Post-Action Workflow:
    * Application details: `APP_NAMESPACE`, `APP_NAME`
    * Source repository details: `REPO_URL`, `BRANCH, PATH`
    * Promotion metadata: `COMMIT_SHA`, `COMMIT_MESSAGE`, `COMMIT_AUTHOR`, `COMMIT_DATE`
    * Jira ticket ID: `JIRA_ID`
* **Close Jira ticket task**  
  Uses the `close-jira task` to call a script that simulates closing the JIRA ticket by using the provided `JIRA_ID`.  
  The task output will show: `Closing JIRA ticket: <JIRA_ID> followed by JIRA ticket <JIRA_ID> closed`.
* **Log summary task**  
  After closing the Jira ticket, the `echo` task logs and outputs all provided contextual information, including the promotion details from the arguments passed to the workflow. 

```yaml
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: post-action-jira-example
  annotations:
    codefresh.io/workflow-origin: promotion
    codefresh.io/promotion-stage: post-action
    version: 0.0.1
    description: 'a demo jira-close-ticket wf. expects (dummy) JIRA_ID argument'
spec:
  serviceAccountName: post-action-sa
  entrypoint: dag
  arguments:
    parameters:
    - name: APP_NAMESPACE
    - name: APP_NAME
    - name: REPO_URL
    - name: BRANCH
    - name: PATH
    - name: COMMIT_SHA
      value: ""
    - name: COMMIT_MESSAGE
      value: ""
    - name: COMMIT_AUTHOR
      value: ""
    - name: COMMIT_DATE
      value: ""
    - name: JIRA_ID
  templates:
  - name: dag
    inputs:
      parameters:
      - name: APP_NAMESPACE
      - name: APP_NAME
      - name: REPO_URL
      - name: BRANCH
      - name: PATH
      - name: COMMIT_SHA
      - name: COMMIT_MESSAGE
      - name: COMMIT_AUTHOR
      - name: COMMIT_DATE
      - name: JIRA_ID
    dag:
      tasks:
      - name: jira-close
        template: jira-close-tmpl
        arguments:
          parameters:
          - name: JIRA_ID
            value: "{{ inputs.parameters.JIRA_ID }}"

      - name: echo
        depends: "jira-close"
        template: echo-tmpl
        arguments:
          parameters:
          - name: APP_NAMESPACE
            value: "{{ inputs.parameters.APP_NAMESPACE }}"
          - name: APP_NAME
            value: "{{ inputs.parameters.APP_NAME }}"
          - name: REPO_URL
            value: "{{ inputs.parameters.REPO_URL }}"
          - name: BRANCH
            value: "{{ inputs.parameters.BRANCH }}"
          - name: PATH
            value: "{{ inputs.parameters.PATH }}"
          - name: COMMIT_SHA
            value: "{{ inputs.parameters.COMMIT_SHA }}"
          - name: COMMIT_MESSAGE
            value: "{{ inputs.parameters.COMMIT_MESSAGE }}"
          - name: COMMIT_AUTHOR
            value: "{{ inputs.parameters.COMMIT_AUTHOR }}"
          - name: COMMIT_DATE
            value: "{{ inputs.parameters.COMMIT_DATE }}"

  - name: jira-close-tmpl
    inputs:
      parameters:
      - name: JIRA_ID
    script:
      image: alpine:3.20
      env:
      - name: JIRA_ID
        value: "{{ inputs.parameters.JIRA_ID }}"
      command:
      - sh
      source: |
        echo "got JIRA_ID \"${JIRA_ID}\""
        sleep 5
        echo "after handling jira in post action"

  - name: echo-tmpl
    inputs:
      parameters:
      - name: APP_NAMESPACE
      - name: APP_NAME
      - name: REPO_URL
      - name: BRANCH
      - name: PATH
      - name: COMMIT_SHA
      - name: COMMIT_MESSAGE
      - name: COMMIT_AUTHOR
      - name: COMMIT_DATE
    outputs:
      parameters:
      - name: RESULT
        valueFrom:
          path: /tmp/result
        globalName: RESULT
    script:
      image: alpine:3.20
      command:
      - sh
      source: |
        converted_date=$(date -d "{{ inputs.parameters.COMMIT_DATE }}" +"%a %b %d %H:%M:%S %Y %z")
        echo "post action for \"{{ inputs.parameters.APP_NAMESPACE }}/{{ inputs.parameters.APP_NAME }}\""
        echo "repoUrl: {{ inputs.parameters.REPO_URL }}, branch: {{ inputs.parameters.BRANCH }}, path: {{ inputs.parameters.PATH }}"
        echo ""
        echo "commit {{ inputs.parameters.COMMIT_SHA }}"
        echo "Author: {{ inputs.parameters.COMMIT_AUTHOR }}"
        echo "Date:   ${converted_date}"
        echo ""
        echo "    {{ inputs.parameters.COMMIT_MESSAGE }}"
        echo ""
        echo "{\"POST_ACTION_RESULT\": "\Success\""}" > /tmp/result
```




## Create Promotion Workflows

Create a Promotion Workflow from scratch, use the base Promotion Workflow Template, or use one of the predefined Promotion Workflows in Codefresh.

Whichever method you use to create your Promotion Workflow, make sure you include the annotation in the manifest to classify and use it as a Promotion Workflow.


1. In the Codefresh UI, from Promotions in the sidebar, select **Promotion Workflows**.
1. Click **Add Promotion Workflow**.
1. Define the following:
    1. **Name**: The name of the Promotion Workflow.<br>The name must be unique in the cluster, and must match Kubernetes naming conventions. 
    1. **Description** : The intended use of the Promotion Workflow.<br>The description is added as an annotation to the YAML file. It is also displayed in the Promotion Workflows list in the UI. 
    1. **Resource Filename**: The name of the YAML resource file with the configuration settings for the Promotion Workflow, by default, identical to the Name of the Promotion Workflow. You can change as needed.  

{:start="4"}
1. Click **Add**.
1. Select **Blank Skeleton File** and click **Next**.
  The YAML is displayed on the right populated with the settings you defined.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/workflows/add-workflow-final-stage.png" 
url="/images/gitops-promotions/workflows/add-workflow-final-stage.png"
alt="Adding a Promotion Workflow" 
caption="Adding a Promotion Workflow"
max-width="60%"
%}

{:start="6"}  
1. Note the instructions at the top of the YAML file.
1. If needed, change `metadata.annotations.version`.
  The version is displayed in the Promotion Workflows list in the UI.
  You should update it manually when there are changes.
1. To test the Promotion Workflow with the current settings before committing the changes, click **Run**.
1. Make any updates needed.
1. Commit the changes.

When the YAML file is synced to the cluster, it is displayed in the Promotion Workflows list.





## Promotion Workflow list

All Workflows which include `metadata.annotations: codefresh.io/workflow-origin: promotion` are displayed in the Promotion Workflows list.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/workflows/workflow-list.png" 
url="/images/gitops-promotions/workflows/workflow-list.png"
alt="Promotion Workflow list" 
caption="Promotion Workflow list"
max-width="60%"
%}

The Promotion Workflows list is also the centralized location from which you can manage both Workflows and Workflow instances. See [Managing Promotion Workflows](#managing-promotion-workflows) and [Managing Workflow instances](#managing-workflow-instances).  
The Description and Version information are retrieved from the manifest if these are specified there.



## Managing Promotion Workflows
After you create a Promotion Workflow, you can:
* Optimize the manifest by updating steps or refining the logic to better suit evolving requirements
* Locally validate the current version of the manifest with different values for parameters
* Copy and delete Promotion Workflows
  


### Update Promotion Workflow manifests
Update and optimize the Promotion Workflow manifest including steps, actions, and parameters, to adapt to changing requirements.  
When triggered, the Promotion Workflow uses the current version of the manifest, ensuring that the Workflow execution instance always uses the latest configurations and optimizations.

You can:
* Toggle between the Git State, Desired State, and Live State
* Render Diff views of all three states
* Update manifest

Changes to the manifest do not affect past execution instances as the manifest is updated independently of individual workflow executions.


<!---- ##### How to
1. In the Codefresh UI, from Promotions in the sidebar, select **Promotion Workflows**.
1. Do one of the following:
  * From the context menu of the Promotion Workflow select **Edit**.
  * Click the name of the Promotion Workflow.
1. In the Manifest tab, do any of the following:
  * Identify **Errors** or **Warnings** if any. 
  * To make changes, make sure **Git State** is selected and then click **Edit**.
  * To view the differences between the three states, click **Diff View**, and toggle between **Full** and **Compact** views.

SCREENSHOTS OF DIFF VIEW AND MANIFEST WITH ERRORS -->


### Validate Promotion Workflow parameters  


When you create a Promotion Workflow or modify the manifest of an existing workflow, you can validate the new workflow or the changes made before committing them to Git.  

The Run option supplements the automatic inline validations, allowing you to verify parameter values and confirm that the workflow behaves as expected, or change parameter values to test behavior.  
The option runs the specific Promotion Workflow in the cluster, verifying all actions and steps in the workflow, such as sending notifications, running pre-action validations or post-action tests.

1. In the Codefresh UI, from Promotions in the sidebar, select **Promotion Workflows**.
1. Click the name of the Promotion Workflow to validate.
1. Click **Run** at the top-right.
   Codefresh displays the parameters passed in the Promotion Workflow. 

<!--- ADD SCREENSHOT WITH POPULATED PARAMETERS -->

{:start="4"}
1. Modify as needed.
1. Click **Run** at the bottom of the form.



### Copy/delete Promotion Workflows
Copy an existing Promotion Workflow to create a new Promotion Workflow with the same manifest configuration. 

Delete unused legacy Promotion Workflows. Deleting a Promotion Workflow removes it from the Promotion Workflow list, from the Promotion Policies it is configured in, and from the Promotion Flows. 

Both options are available in the context menu of the selected Promotion Workflow.




## Managing Workflow instances
Workflow instances are the specific execution instances of the Promotion Workflow. 

You can:
* View instances of a Promotion Workflow
  In addition to the status which is prominently displayed on the right for each execution instance, you can filter by products, environments and applications to get to the instances of interest to you. 
* Analyze the version of the manifest used for the instance with the configuration, parameters, artifacts (Workflow summary)
* Take action on a completed or failed workflow (Workflow actions)
  * **Resubmit**: Rerun or re-execute the Workflow. Resubmitting a Workflow, creates a new instance of the Workflow.  You can resubmit both successful and failed workflows.
  * **Retry**: Rerun the workflow instance from the point of error. Unlike Resubmit, Retry does not create a new workflow instance.
  * **Delete** an instance (Workflow actions)
* Analyze individual steps of the workflow (Workflow steps)  
  * The header displays the name of the step, its status, the step-type, the date of the most recent update, and duration.  
  * The tabs displayed differ according to the step type:  
      * The Summary, Manifest, Containers, Inputs, Outputs tabs are displayed for all almost all step types. 
      * The Logs tab is displayed for Pod step types.
      * Event-step types display Manifest, Summary, and Payload.
        For Cron and Unknown event types, only the Event Sources are shown. 
* View detailed logs to troubleshoot execution (Workflow logs)
  View online logs for ongoing or completed Workflows. As with logs in any standard terminal, you can copy/cut/paste log info. The commands differ based on the OS.  


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/workflows/workflow-instances.png" 
url="/images/gitops-promotions/workflows/workflow-instances.png"
alt="Workflow execution instances" 
caption="Workflow execution instances"
max-width="60%"
%}




<!--- ### View/analyze Workflow instances



1. In the Codefresh UI, from the sidebar, select **Promotion Workflows**.
1. Click a Promotion Workflow, and then click the **Workflows** tab to see its instances.
1. If needed, filter by Status, Target Environment, Product, or Application.
1. To visualize steps and view detailed information, click **View Workflow Details**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/workflows/workflow-instance-details.png" 
url="/images/gitops-promotions/workflows/workflow-instance-details.png"
alt="Detailed view of workflow execution instance" 
caption="Detailed view of workflow execution instance"
max-width="60%"
%}



### Workflow summary

SCREENSHOT

The table highlights key information you can find in the Summary tab for a workflow.

{: .table .table-bordered .table-hover}
|  Workflow Summary    | Description                   | 
| --------------       | ------------------------------|  
| **Errors**               | Displayed when the Workflow instance has at least one failed step.   |  
| **Summary**              | Namespace, memory and CPU resource usage, and execution context of the workflow.<br>If triggered by a parent workflow, displays the link to that workflow.|  
| **Manifests**            | The version of the manifest used for the specific Workflow execution. This may not be the same version currently displayed in the Manifest tab. Useful to troubleshoot failed steps and errors in the execution instance. |  
| **Labels**            | Labels assigned to the workflow. Useful to filter, search, organize workflow executions. <br>Examples:<br>`codefresh.io/app-name: trioapp-qa`, `codefresh.io/app-namespace: gitops`.| 
| **Parameters**            | The inputs set/modified for the specific execution. <br>Examples:<br>`Threshold: 50`, `Nb: 100`.| 
| **Artifacts**            | The outputs if any generated by a workflow step, and can be logs, test-reports, binaries or any other type of file. Each artifact is associated with a specific step in the workflow. For example: `main-logs: smoketests-k9ss6`.| 



###  Workflow actions
Depending on the status of the workflow instance, you can do the following: 



SCREENSHOT 
Remove unused or legacy workflow instances. Deleting a workflow instance removes it from the list of executions. The Promotion Workflow itself is not changed. 

### Workflow steps
Visualize the steps in the Workflow. For additional information on the step, click the step to open the pull-out panel.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/workflows/workflow-step-details.png" 
url="/images/gitops-promotions/workflows/workflow-step-details.png"
alt="Workflow instance step detailed view" 
caption="Workflow instance step detailed view"
max-width="60%"
%}



### Workflow logs



{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/workflows/workflow-logs.png" 
url="/images/gitops-promotions/workflows/workflow-logs.png"
alt="Workflow instance logs" 
caption="Workflow instance logs"
max-width="60%"
%}
-->


## Promotion Workflows in product release views

When a promotion is triggered—either automatically or manually—a release is automatically created for the product. This release tracks the orchestration and outcomes of the promotion across environments.

##### Releases list
Each release is and displayed in the Releases list (Product > Releases tab), identified by the Release Date, Release Initiator, and other details specific to the promotion that was triggered.
Clicking the Release Date opens the detailed view of the promotion orchestration, showing the status of the workflows and their results across all targeted environments.

##### Monitoring releases
In the detailed release view, you can monitor the Pre-Action and Post-Action workflows assigned to each environment. For ongoing releases, this includes the specific steps of each workflow.

The overall promotion status of an environment is determined by the collective status of its workflows. Successful execution of the workflows indicates a successful promotion, while failures in any workflow will reflect in the environment’s promotion status.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/releases/workflows.png" 
url="/images/gitops-promotions/releases/workflows.png"
alt="Example of workflows in a product release view" 
caption="Example of workflows in a product release view"
max-width="60%"
%}

See [Tracking product releases]({{site.baseurl}}/docs/promotions/releases/).



## Related articles
[Configure Promotion Policies]({{site.baseurl}}/docs/promotions/configuration/promotion-policy/)  
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)   
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
