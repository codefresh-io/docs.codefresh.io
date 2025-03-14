---
title: "Quick start: Simple Promotion Workflow"
description: "Create a workflow template to use as pre- or post-action"
group: gitops-quick-start
toc: true
---

## Simple Promotion Workflow quick start
In this quick start guide, we'll guide you through creating a Promotion Workflow in Codefresh.  

Promotion Workflows are Argo WorkflowTemplates that allow you to automate tasks such as notifications, validations, or additional deployments during the promotion process. They can be used in Promotion Flows to automate tasks before or after promotion.
For detailed information, see [Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).

This quick start includes examples of two Promotion Workflows:
* Example 1: Create Promotion Workflow for Slack notifications. The Workflow runs a container from Codefresh’s Argo Hub, which posts a message to Slack. 
* Example 2: Open a Service Now Change Request




## Requirements
* [GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/create-git-source/) to store application manifests.
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)
* [Products and applications]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)
<!---* [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)
  this is where you promotion workflow will be stored (in the `resources/control-planes/promotion-workflows` folder) -->

## Example 1: Create Promotion Workflow for Slack notifications to be used as a post-action

Creating a Promotion Workflow is as simple as creating an [Argo WorkflowTemplate](https://argo-workflows.readthedocs.io/en/latest/workflow-templates/){:target="\_blank"}.
You can do so directly from the UI.

For simplification, we are using a hard coded version of an existing template from [our library](https://github.com/codefresh-io/argo-hub/tree/main/workflows/slack/versions/0.0.2){:target="\_blank"}.

##### Step-by-step

1. In the Codefresh UI, from the sidebar, select **Promotion Workflows**, and click **Add Promotion Workflow**.
1. Define the following:
    1. **Name**: A unique name for the Promotion Workflow, `slack-notification`
    for the quick start.
    1. **Description**: A meaningful comment on the purpose of the workflowTemplate, for example, `A template to send a Slack notification when a promotion ends` in our case.
    1. **Resource Filename**: The name of the manifest file that will be saved in `resources/control-planes/promotion-workflows`
    folder in your Shared Configuration Repository. By default, this is
    identical to the Name of the Workflow. Leave as-is for the
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
1. For the quick start, select **Blank Skeleton File** as the Workflow Template,
   and click **Next**.
1. In the YAML editor on the right, replace the `spec` in line 15 with the
   following block:
   {% highlight yaml %}
    {% raw %}
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
                value: 'Application `{{ workflow.parameters.APP_NAME }}` has been promoted'
              - name: LOG_LEVEL
                value: 'info'
              - name: SLACK_TOKEN
                valueFrom:
                  secretKeyRef:
                    name: 'slack-token'
                    key: token          
{% endraw %}
{% endhighlight %}
  where:  
  * `SLACK_CHANNEL` can either be the name of a Slack channel or the email of a user.
  * `slack-token` is the name of the secret holding your Slack Token, in the `token` key.


{:start="6"}
1. Click **Commit**
1. Optional. Feel free to add a **Commit Message**.
1. Click **Commit** again.  
   After a few minutes, the new Promotion Workflow is displayed in the Promotion Workflows list.

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/new-promotion-workflow.png"
	url="/images/quick-start/promotion-workflow/new-promotion-workflow.png"
	alt="Promotion workflow quick start: New promotion workflow"
	caption="Promotion workflow quick start: New promotion workflow"
 max-width="50%"
%}



## Example 2: Open a Service Now Change Request as a pre-action

For this next example, we will use the existing [servicenow workflowTemplate from our library](https://github.com/codefresh-io/argo-hub/tree/main/workflows/servicenow/versions/1.3.1).

So you will need to add a [Git Source]({{site.baseurl}}/docs/gitops-quick-start/create-git-source/) pointing to that library.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/promotion-workflow/git-source.png" 
	url="/images/quick-start/promotion-workflow/git-source.png" 
	alt="Promotion workflow quick start: Argo hub git source" 
	caption="Promotion workflow quick start: Argo hub git source"
    max-width="50%" 
%}



##### Step-by-step
1. In the Codefresh UI, from the sidebar, select **Promotion Workflows**, and click **Add Promotion Workflow**.
1. Define the following:
    1. **Name**: A unique name for the Promotion Workflow, `sn-open-cr`
    for the quick start.
    1. **Description**: A meaningful comment on the purpose of the workflowTemplate, for example, `A template to open a ServiceNow Change Request before an application is promoted` in our case.
    1. **Resource Filename**: The name of the manifest file that will be saved in `resources/control-planes/promotion-workflows`
    folder in your Shared Configuration Repository. By default, this is
    identical to the Name of the Workflow. Leave as-is for the
    quick-start.

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/add-sn-open-wkf.png"
	url="/images/quick-start/promotion-workflow/add-sn-open-wkf.png"
	alt="Promotion workflow quick start: Create promotion workflow for ServiceNow"
	caption="Promotion workflow quick start: Create promotion workflow" for ServiceNow
  max-width="50%"
%}

{:start="3"}
1. Click **Add**.
1. For the quick start, select **Blank Skeleton File** as the Workflow Template,
   and click **Next**.
1. In the YAML editor on the right, replace the `spec` in line 13 with the
   following block:
   {% highlight yaml %}
    {% raw %}
   spec:
     serviceAccountName: promotion-template
     arguments:
       parameters:
         - name: APP_NAME   
       entrypoint: sn-open-cr
       templates:
       - name: sn-open-cr
         outputs:
           parameters:
           - name: CR_SYSID
             valueFrom:
               expression: "tasks['create-sn-cr'].outputs.parameters['CR_SYSID']"
         dag:
           tasks:
             - name: create-sn-cr
               templateRef:
                 name: argo-hub.servicenow.1.3.1
                 template: createcr
               arguments:
                 parameters:
                 - name: TOKEN
                   value: cf-api-key-aperture
                 - name: CF_RUNTIME
                   value: demo
                 - name: SN_INSTANCE
                   value: "https://xxxxxx.service-now.com/"
                 - name: SN_AUTH
                   value: "sn-auth"
                 - name: CR_DATA
                   value: >-
                     {"short_description": "{{ workflow.parameters.APP_NAME }} deployment",
                     "description": "Change for build {{workflow.uid}}.\nThis change was created by the Codefresh GitOps promotion flow",
                     "justification": "My app is awesome! Please deploy ASAP",
                     "cmdb_ci":"tomcat", "assignment_group":"a715cd759f2002002920bde8132e7018"
                     }
{% endraw %}
{% endhighlight %}

where:
* `TOKEN` is the Codefresh CF API Key to allow Service Now to reach back to the Codefresh instance.
* `SN_AUTH` is the secret holding credentials to connect to the ServiceNow instance (`SN_INSTANCE`)
* `CR_DATA` is the JSON payload to be able to open a Change Request.

{:start="6"}
1. Click **Commit**
1. Optional. Feel free to add a **Commit Message**.
1. Click **Commit** again.  
   After a few minutes, the new Promotion Workflow is displayed in the Promotion Workflows list.

You can now use this Promotion Workflow as a pre-action to open a Change Request before proceeding with the deployment itself.

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/sn-release.png"
	url="/images/quick-start/promotion-workflow/sn-release.png"
	alt="Promotion workflow quick start: Running a release with ServiceNow pre-action"
	caption="Promotion workflow quick start: Running a release with ServiceNow pre-action
  max-width="50%"
%}

## Using Promotion Workflows
Once you create Promotion Workflows, you can use them in any Promotion Flow.

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/slack-message.png"
	url="/images/quick-start/promotion-workflow/slack-message.png"
	alt="Promotion workflow quick start: New slack message"
	caption="Promotion workflow quick start: New slack message"
 max-width="50%"
%}

## What's next
The next quick start will guide you through adding Promotion Workflows to each environment in a Promotion Flow, acting as gates for conditional promotions, allowing you to introduce more control and flexibility in your promotion processes.

[Quick start: Advanced Promotion Flow with Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/policy-multi-env-promotion/)
