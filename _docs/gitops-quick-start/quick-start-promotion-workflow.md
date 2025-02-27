---
title: "Quick start: Simple Promotion Workflow"
description: "Create a workflow template to use as pre- or post-action"
group: gitops-quick-start
toc: true
---

## Simple Promotion Workflow
In this quick start guide, we'll see how to create an Argo WorkflowTemplate using the UI, that you can use in your promotion flow as pre- or post-action.

## Requirements
* [GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/create-git-source/) to store application manifests.
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)
* [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)
  this is where you promotion workflow will be stored (in the `resources/control-planes/promotion-workflows` folder)

## Example 1: Slack notification

Creating a Promotion Workflow is as simple as creating an [Argo WorkflowTemplate](https://argo-workflows.readthedocs.io/en/latest/workflow-templates/).
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
1. Select a **template**, for this quick-start, select the **Blank Skeleton File**
1. Click **Next**
1. Before we commit the file, we are going to add a spec. So replace line 13 by the following block:
    ```
    spec:
      serviceAccountName: promotion-template
      arguments:
        parameters:
          - name: APP_NAME
      entrypoint: slack-promotion
      templates:
        - name: slack-promotion
          container:
            name: main
            imagePullPolicy: Always
            image: quay.io/codefreshplugins/argo-hub-slack-post-to-channel:0.0.2-main
            command:
              - python
              - /slack/slack.py
            env:
              - name: SLACK_CHANNEL
                value: 'name@domain.com'
              - name: SLACK_MESSAGE
                value: 'Application `{{ workflow.parameters.APP_NAME }}` is ready to be promoted'
              - name: LOG_LEVEL
                value: 'info'
              - name: SLACK_TOKEN
                valueFrom:
                  secretKeyRef:
                    name: 'slack-token'
                    key: token          
    ```
    **Notes**:
    * We are using a hardcoded version (for simplification) of an existing template you can find in [our library](https://github.com/codefresh-io/argo-hub/tree/main/workflows/slack/versions/0.0.2)
    * SLACK_CHANNEL can either be the name of a Slack channel or the email of a user.
    * `slack-token` is the name of the secret holding your Slack Token (in the `token` key)


{:start="7"}
1. Click on **Commit**
1. Feel free to add a **commit message**
1. Click on **Commit**. It will take you back to the Promotion Workflows page.
   After a few minutes, the new Promotion Workflow should appear in the list

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/new-promotion-workflow.png"
	url="/images/quick-start/promotion-workflow/new-promotion-workflow.png"
	alt="Promotion workflow quick start: New promotion workflow"
	caption="Promotion workflow quick start: New promotion workflow"
 max-width="50%"
%}

{:start="10"}

1. Your Promotion Workflow is now ready to be used in your Promotion Flow
1. When you run your Promotion Flow using this Promotion Workflow, you should get a Slack message.

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/slack-message.png"
	url="/images/quick-start/promotion-workflow/slack-message.png"
	alt="Promotion workflow quick start: New slack message"
	caption="Promotion workflow quick start: New slack message"
 max-width="50%"
%}

## Example 2: Open a Service Now Change Request
## Example 3: Close the Service Now Change Request


## Related articles
[Promotion Flow]({{site.baseurl}}/docs/promotions/promotion-flow/)   
[Promotion Workflow]({{site.baseurl}}/docs/promotions/promotion-workflow/)   
