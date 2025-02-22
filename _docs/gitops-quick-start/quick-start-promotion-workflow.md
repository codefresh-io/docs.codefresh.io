---
title: "Quick start: Simple Promotion Workflow"
description: "Create a workflow template to use as pre- or post-action"
group: gitops-quick-start
toc: true
---

## Simple Promotion Workflow
In this quick start guide, we'll see how to create an Argo WorkflowTemplate using the UI, that you can use in your prmotionb flow as pre- or post-action.

* [GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/create-git-source/) to store application manifests
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)  
  For a Promotion Flow, you need at least three environments.
  Here we use `dev`, `qa`, and `prod`.
* [Products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)  
  Each environment must have an application for the product. For example, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`representing the development, testing, and production versions.
* [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)
  this is where you promotion workflow will be stored (in the `resources/control-planes/promotion-workflows` folder)

## Example 1: Slack notification

Creating a Promotion Workflow is as simple as creating an [Argo WorkflowTewmplate[(https://argo-workflows.readthedocs.io/en/latest/workflow-templates/).
You can do so directly from the UI.

##### Step-by-step

1. In the Codefresh UI, from the sidebar, select **Promotion Workflows**, and
   click **Add Promotion Workflow**.
1. Define the following:
    1. **Name**: A unique name for the Promotion Workflow, `slack-notification`
    for the quick start.
    1. **Description**: A meaningful comment on what the workflowTemplate is
    doing, `A template to send a Slack notification when a promotion start` in
    our case.
    1. **Resource Filename**: the name of the manifest file that will be saved
    under the `resources/control-planes/promotion-workflows`
    folder in your Shared Configuration Repository. Leave as-is for the
    quick-start.

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/add-promotion-workflow.png"
	url="/images/quick-start/promotion-workflow/add-promotion-workflow.png"
	alt="Promotion workflow quick start: Create promotion workflow"
	caption="Promotion workflow quick start: Create promotion workflow"
  max-width="50%"
%}

{:start="3"}
1. Click **Add**.
1. Select a **template**, for this quick-start, select the **start-manual-sync**
1. Click **Next**
1. Before we commit the file, we are going to do a few changes:
    1. Line 13: change the description to `This Workflow Template is an example for pre promotion workflow that
    send a slack message before the app is promoted`
    1. Line 18-21: change our developer info by your own.
    1. Line 33 & 35: change the name to `slack-promotion`
    1. Line 38: change description to `send a slack message before the app is promoted`
    1. Line 44-80: remove the 2 tasks `sync` and `wait`
    1. remote Line 54 (after above deletion). it is the `depends` one
    1. change template on line 47 to `post-to-channel`
    1. change the parameters to:
    ```
    - name: SLACK_CHANNEL
      value: '<YOUR FAVORITE CHANNEL or email address for DM'
    - name: SLACK_MESSAGE
      value: 'Application `{{ workflow.parameters.APP_NAME }}` is ready to be promoted'
    - name: SLACK_TOKEN
      value: slack-token
    ```
    **Notes**: `slack-token` is the name of the secret holding your Slack Token (in the `token` key)

Your Promotion Workflow should look something like:
```
# DO NOT REMOVE the following attributes:
# annotations.codefresh.io/workflow-origin (identifies type of Workflow Template as Promotion Workflow)
# annotations.version (identifies version of Promotion Workflow used)
# annotations.description (identifies intended use of the Promotion Workflow)
apiVersion: argoproj.io/v1alpha1
kind: WorkflowTemplate
metadata:
  name: slack-notification
  annotations:
    version: 0.0.1
    codefresh.io/workflow-origin: promotion
    argo-hub/version: 0.0.2
    argo-hub/description: >-
     This Workflow Template is an example for pre promotion workflow that send a
     slack message before the app is promoted
    argo-hub/categories: promotion example workflow
    argo-hub/license: MIT
    argo-hub/owner_name: Laurent Rochette
    argo-hub/owner_email: laurent.rochette@octopus.com
    argo-hub/owner_avatar: https://avatars.githubusercontent.com/u/2013371
    argo-hub/owner_url: https://github.com/lrochette
    argo-hub/icon_url: >-
      https://cdn.jsdelivr.net/gh/codefresh-io/argo-hub@main/examples/starter-manual-sync/assets/icon.svg
    argo-hub/icon_background: '#f4f4f4'
    description: A template to send a Slack notification when a promotion start
spec:
  arguments:
    parameters:
      - name: APP_NAME
      - name: APP_NAMESPACE
      - name: SERVER_URL
        value: argo-cd-server.{{workflow.parameters.APP_NAMESPACE}}.svc.cluster.local
  entrypoint: slack-promotion
  templates:
    - name: slack-promotion
      metadata:
        annotations:
          argo-hub-template/description: send a slack message before the app is promoted
          argo-hub-template/icon_url: >-
            https://cdn.jsdelivr.net/gh/codefresh-io/argo-hub@main/examples/starter-manual-sync/assets/icon.svg
          argo-hub-template/icon_background: '#f4f4f4'
      dag:
        tasks:
          - name: send-message
            templateRef:
              name: argo-hub.slack.0.0.2
              template: send-message
            arguments:
              parameters:
                - name: SLACK_CHANNEL
                  value: 'laurent.rochette@octopus.com'
                - name: SLACK_TEXT
                  value: 'Application `{{ workflow.parameters.APP_NAME }}` is ready to be promoted'
                - name: SLACK_TOKEN
                  value: slack-token
```
{:start="7"}
1. Click on **Commit**
1. Feel free to add a **commit message**
1. Click on **Commit**. It will take you back to the Promotion Workflows page.
   After a few minutes, the new Promotion Worflow should appear in the list

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/new-promotion-workflow.png"
	url="/images/quick-start/promotion-workflow/new-promotion-workflow.png"
	alt="Promotion workflow quick start: New promotion workflow"
	caption="Promotion workflow quick start: New promotion workflow"
 max-width="50%"
%}

## Example 2: Open a Service Now Change Request
## Example 3: Close the Service Now Change Request


## Related articles
[Promotion Flow]({{site.baseurl}}/docs/promotions/promotion-flow/)   
[Promotion Workflow]({{site.baseurl}}/docs/promotions/promotion-workflow/)   
