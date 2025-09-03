---
title: "Quick start: Creating Promotion Workflows"
description: "Create a workflow template to use as pre- or post-action"
group: gitops-quick-start
toc: true
---

{{site.data.callout.callout_tip}}
**Promotions is currently in development.**
This feature is still under active development and we've identified some issues with its resilience and reliability, particularly with recovery from cluster and network problems. We are currently upgrading our architecture to resolve these known issues and add self-healing capabilities.
We don't recommend using Promotions for mission-critical or production deployments at this time.
{{site.data.callout.end}}

## Promotion Workflows quick start
This quick start will guide you through creating a Promotion Workflow in Codefresh.  

Promotion Workflows are Argo Workflow Templates that automate tasks such as notifications, validations, and additional deployments before or after a promotion. They can be used in Promotion Flows to automate tasks before or after promotion.

For detailed information, see [Configure Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).

This quick start includes examples of two Promotion Workflows:
* Example 1: Promotion Workflow for Slack notifications
* Example 2: Promotion Workflow to open a ServiceNow Change Request




## Requirements
* [GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-install-runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/quick-start-configure-runtime/#add-git-source-to-runtime) to store application manifests
* [Products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)

<!---* [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)
  this is where you promotion workflow will be stored (in the `resources/control-planes/promotion-workflows` folder) -->

## Example 1: Create Promotion Workflow to send Slack notifications

This example creates a Promotion Workflow that sends Slack notifications. The Workflow runs a container from Codefresh’s Argo Hub, which posts a message to Slack. 

Creating a Promotion Workflow is as simple as creating an [Argo Workflow Template](https://argo-workflows.readthedocs.io/en/latest/workflow-templates/){:target="\_blank"} which you can create directly from the UI.

For simplification, we are using a hard coded version of an existing template from [our library](https://github.com/codefresh-io/argo-hub/tree/main/workflows/slack/versions/0.0.2){:target="\_blank"}.

##### Step-by-step

1. In the Codefresh UI, from the sidebar, select **Promotion Workflows**, and click **Add Promotion Workflow**.
1. Define the following:
    1. **Name**: A unique name for the Promotion Workflow, `slack-notification`
    for the quick start.
    1. **Description**: A meaningful description of the Workflow Template's purpose. For example, `A template to send a Slack notification`.
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
1. Select **Blank Skeleton File** as the Workflow Template,
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
  * `SLACK_MESSAGE` is the message to display in the Slack notification. In the example, the message indicates that the application has been promoted.
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
	alt="Promotion Workflow quick start: New Promotion Workflow in list"
	caption="Promotion Workflow quick start: New Promotion Workflow in list"
 max-width="50%"
%}

##### Example of Slack notification sent with this Promotion Workflow

This is an example of the Slack notification sent before promotion starts in an environment.  

{% include
	image.html
	lightbox="true"
	file="/images/quick-start/promotion-workflow/slack-message.png"
	url="/images/quick-start/promotion-workflow/slack-message.png"
	alt="Promotion Workflow quick start: Slack notification example"
	caption="Promotion Workflow quick start: Slack notification example"
 max-width="80%"
%}

## Example 2: Open a ServiceNow change request
This example creates a Promotion Workflow that opens a ServiceNow change request. The Promotion Workflow uses the existing [ServiceNow Workflow Template](https://github.com/codefresh-io/argo-hub/tree/main/workflows/servicenow/versions/1.3.1){:target="\_blank"} from the Codefresh Argo Hub library.


### Step 1: Add a Git Source for the Argo Hub library

To use the ServiceNow Workflow Template, first add a Git Source to your GitOps Runtime that points to the Argo Hub library.  
See [Add a Git Source]({{site.baseurl}}/docs/gitops-quick-start/quick-start-configure-runtime/#add-git-source-to-runtime).

* Configure the Git Source using the settings shown in the example below.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/promotion-workflow/git-source.png" 
	url="/images/quick-start/promotion-workflow/git-source.png" 
	alt="Promotion Workflow quick start: Git Source settings for Argo Hub library" 
	caption="Promotion Workflow quick start: Git Source settings for Argo Hub library"
    max-width="50%" 
%}

### Step 2: Create Promotion Workflow with ServiceNow change request
Create the Promotion Workflow with the ServiceNow change request. 

1. In the Codefresh UI, from the sidebar, select **Promotion Workflows**, and click **Add Promotion Workflow**.
1. Define the following:
    1. **Name**: A unique name for the Promotion Workflow, `sn-open-cr`
    for the quick start.
    1. **Description**: A meaningful description of the Workflow Template's purpose. For example, `A template to open a ServiceNow Change Request before an application is promoted`.
    1. **Resource Filename**: The name of the manifest file that will be saved in `resources/control-planes/promotion-workflows`
    folder in your Shared Configuration Repository. By default, this is
    identical to the Name of the Workflow. Leave as-is for the
    quick-start.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/promotion-workflow/add-sn-open-wkf.png" 
	url="/images/quick-start/promotion-workflow/add-sn-open-wkf.png" 
	alt="Promotion Workflow quick start: Example for ServiceNow" 
	caption="Promotion Workflow quick start: Example for ServiceNow"
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
* `TOKEN` is the Codefresh API Key to allow Service Now to reach back to the Codefresh instance.
* `SN_AUTH` is the secret holding credentials to connect to the ServiceNow instance (`SN_INSTANCE`)
* `CR_DATA` is the JSON payload to be able to open a Change Request.

{:start="6"}
1. Click **Commit**
1. Optional. Feel free to add a **Commit Message**.
1. Click **Commit** again.  
   After a few minutes, the new Promotion Workflow is displayed in the Promotion Workflows list.


## Using Promotion Workflows in Promotion Flows
After creating Promotion Workflows, you can add them to any Promotion Flow and automate key actions before or after promoting an environment.  
These workflows help enforce policies, validate changes, and trigger external processes as part of the promotion lifecycle.

For example, you can configure the ServiceNow Promotion Workflow in example 2 as a Pre-Action Workflow in a Promotion Flow. The Workflow will then run before the changes are promoted to open a change request.


## What's next
The next quick start will guide you through adding Promotion Workflows to each environment in a Promotion Flow. Promotion Workflows act as gates for conditional promotions, giving you more control and flexibility over promotion processes.

[Quick start: Advanced Promotion Flow with Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/policy-multi-env-promotion/)