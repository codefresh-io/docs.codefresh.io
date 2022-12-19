---
title: "Approval"
description: "How to Pause Pipelines for Manual Approval"
group: codefresh-yaml
sub_group: steps
toc: true
---

The approval step allows you to pause a pipeline and wait for human intervention before going on.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/approval/approval-waiting.png" 
url="/images/pipeline/codefresh-yaml/approval/approval-waiting.png"
alt="Manual Approval step" 
caption="Manual Approval step"
max-width="80%"
%}

Some example scenarios for using the approval step:

* Pause before deploying to production
* Pause before destroying an environment
* Pause for some manual smoke tests or metric collection

## Usage

  `YAML`
{% highlight yaml %}
{% raw %}
step_name:
  type: pending-approval
  title: Step Title
  description: Step description
  timeout:
    duration: 2
    finalState: approved
    timeUnit: minutes
  when:
    branch:
      only: [ master ]

{% endraw %}
{% endhighlight %}

## Fields 

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                                                                                                                                                                 | Required/Optional/Default |
| ------------------------------------------ | ---------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.        | Optional                  |
| `description`                              | A basic, free-text description of the step.    | Optional                  |
| `timeout`                                  | Defines an automatic approval/rejection if a specified amount of time has passed. The `duration` field is hours. By default it is set to 168 (i.e, 7 days). The `finalState` field defines what will happen after the duration time has elapsed. Possible values are `approved`/`denied`/`terminated`    | Optional                  |
| `timeUnit`                               | This field defines possible options of `minutes`, or `hours`. If the field is not set, the default is `hours` | Optional                       
| `fail_fast`                              | If set to false, the pipeline will continue even when the step is rejected | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.    | Optional                  |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) article. | Optional                  |


## Pausing the Pipeline

Once the pipeline reaches an approval step it will stop. At this point it **does not** consume any resources.
In the Codefresh UI you will see the *Approve/Reject* buttons.

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/build-waiting.png" 
url="/images/codefresh-yaml/approval/build-waiting.png"
alt="Build waiting for input" 
caption="Build waiting for input"
max-width="80%"
%}

Once you click any of them the pipeline will continue. Further steps in the pipeline can be enabled/disabled
according to the approval result.

## Automatic Approvals/Rejections

By default, a pipeline that contains an approval step will pause for 7 days (168 hours) onces it reaches that step. If you want some automatic action to happen after a specified time period you can define it in advance with the `timeout` property:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
 waitForInputBeforeProduction:
   type: pending-approval
   title: Deploy to Production?
   timeout:
     duration: 2
     finalState: denied
{% endraw %}
{% endhighlight %}

This pipeline will wait for approval for two hours. If somebody approves it, it will continue. If nothing happens after two hours
the approval step will be automatically rejected.

## Approval Restrictions

By default, any Codefresh user can approve any pipeline that is paused at the approval state. If you want to restrict
the approval action to a subset of people, you can use the [Access Control facilities]({{site.baseurl}}/docs/enterprise/access-control/) that Codefresh provides.

This is a two-step process. First you need to tag your pipeline with one or more tags (tag names are arbitrary). You can edit tags in the pipeline settings screen.

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/pipeline-tag.png" 
url="/images/codefresh-yaml/approval/pipeline-tag.png"
alt="Marking a pipeline with tags" 
caption="Marking a pipeline with tags"
max-width="40%"
%}

Once you have tagged your pipelines you can create one or more access rules that restrict approval to specific teams within your organization.

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/approval-rule.png" 
url="/images/codefresh-yaml/approval/approval-rule.png"
alt="Rules for approvals" 
caption="Rules for approvals"
max-width="80%"
%}


For more details on access control and users see also the [access control page]({{site.baseurl}}/docs/administration/access-control/).

## Keeping the Shared Volume after an Approval

As soon as a pipeline starts waiting for an approval, all contents of the [shared Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) are lost. Once the pipeline continues running all files that were created manually inside the volume are not available any more. 

If you want to keep any temporary files that were there before the approval, you need to enable the respective policy in your [pipeline settings]({{site.baseurl}}/docs/pipelines/pipelines/#policies).

You can either set this option differently per pipeline, or globally in your account at your [account settings](https://g.codefresh.io/account-admin/account-conf/pipeline-settings).

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/keep-volume.png" 
url="/images/codefresh-yaml/approval/keep-volume.png"
alt="Preserve Codefresh volume after an approval" 
caption="Preserve Codefresh volume after an approval"
max-width="90%"
%}

>Notice that if you do decide to keep the volume after an approval, the pipeline will still count as "running" against your pricing plan (if you use the SAAS version of Codefresh). If you don't keep the volume, the pipeline is stopped/paused while it is waiting for approval and doesn't count against your pricing plan. We advise you to keep the volume only for pipelines that really need this capability.

>Notice also that you if you use the [Codefresh Runner]({{site.baseurl}}/docs/reference/behind-the-firewall/) and your [Runner]({{site.baseurl}}/docs/installation/codefresh-runner/) is setup with local volumes, then the volume will only be present if the dind pod
is scheduled in the same node once the pipeline resumes. Otherwise the volume will not be reused.

## Controlling the Rejection Behavior

By default if you reject a pipeline, it will stop right away and it will be marked as failed. All subsequent steps after the approval one will not run at all.

You might want to continue running the pipeline even when it is rejected by adding the `fail_fast` property in the approval step:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
 waitForInputBeforeProduction:
   fail_fast: false
   type: pending-approval
   title: Deploy to Production?
{% endraw %}
{% endhighlight %}

In this case you can also read the approval result and make the pipeline work differently according to each choice (demonstrated in the following section).


## Getting the Approval Result

As also explained in [step dependencies]({{site.baseurl}}/docs/pipelines/advanced-workflows/#custom-steps-dependencies) all steps in the Codefresh pipeline belong to a global object
called `steps` (indexed by name). You can read the `result` property for an approval step to see if it was approved or rejected.

Here is an example:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
 askForPermission:
   type: pending-approval
   title: Destroy QA environment?
 destroyQaEnvNow:
   image: alpine:3.8
   title: Destroying env
   commands:
   - echo "Destroy command running"
   when:
     steps:
     - name: askForPermission
       on:
       - approved
{% endraw %}
{% endhighlight %}

In this example the second step that is destroying an environment will only run if the user
approves the first step. In case of rejection the second step will be skipped.

You can follow the same pattern for running steps when an approval step was rejected.
Here is a full example with both cases.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
- prepare
- yesPleaseDo
- noDont

steps:
 step_1:
   image: alpine:3.8
   title: building chart
   stage: prepare
   commands:
   - echo "prepare"
 deployToProdNow:
   fail_fast: false
   type: pending-approval
   title: Should we deploy to prod
   stage: prepare
 step_2:
   image: alpine:3.8
   title: prepare environment
   stage: yesPleaseDo
   commands:
   - echo "world"
   when:
     steps:
     - name: deployToProdNow
       on:
       - approved
 step_3:
   image: alpine:3.8
   title: deploy to production
   stage: yesPleaseDo
   commands:
   - echo "world"
   when:
     steps:
     - name: deployToProdNow
       on:
       - approved
 step_4:
   image: alpine:3.8
   title: prepare environment
   stage: noDont
   commands:
   - echo "world"
   when:
     steps:
     - name: deployToProdNow
       on:
       - denied
 step_5:
   image: alpine:3.8
   title: deploy to staging
   stage: noDont
   commands:
   - echo "world"
   when:
     steps:
     - name: deployToProdNow
       on:
       - denied         
{% endraw %}
{% endhighlight %}

Here is the pipeline state after a rejection:

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/pipeline-rejected.png" 
url="/images/codefresh-yaml/approval/pipeline-rejected.png"
alt="Rejecting a pipeline" 
caption="Rejecting a pipeline"
max-width="80%"
%}

>Note that we have added the `fail_fast` property in the approval step because we want the pipeline to continue even when the step is rejected.


You can see that only two steps were ignored. If you rerun the pipeline and approve
it, the other two steps will be ignored.

## Define Concurrency Limits

Codefresh has the ability to limit the amount of running builds for a specific pipeline with several concurrency policies in the pipeline settings. You can choose if a build that is in a pending approval state will count against the concurrency limits or not.

As an example let's say that the concurrency limit for a specific pipeline is set to 2. Currently there is one active/running build  and a second build that is pending approval.

1. If the pipeline settings define that builds in pending approval **count** against concurrency, then if you launch a third build it will wait until one of the first two has finished
1. If the pipeline settings define that builds in pending approval **do not** count against concurrency, then if you launch a third build it will execute right away.

There isn't a correct or wrong way to set this option. It depends on your organization and if your consider builds pending approval as "active" or not.

You can either set this option [differently per pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#policies), or globally in your account at your [account settings](https://g.codefresh.io/account-admin/account-conf/pipeline-settings).


## Slack Integration

If you also enable [Slack integration]({{site.baseurl}}/docs/integrations/notifications/slack-integration/)  in Codefresh you will have the choice of approving/rejecting a pipeline
via a Slack channel

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/slack-approval.png" 
url="/images/codefresh-yaml/approval/slack-approval.png"
alt="Approval step in a slack channel" 
caption="Approval step in a slack channel"
max-width="80%"
%}

To enable this behavior, you need to activate it in the Slack settings page:

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/slack-settings.png" 
url="/images/codefresh-yaml/approval/slack-settings.png"
alt="Slack settings" 
caption="Slack settings"
max-width="50%"
%}

Also, if you run a pipeline manually that includes an approval step you should check
the "Report notification of pipeline execution" checkbox as explained in [Monitoring Pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#monitoring-pipelines-outside-the-codefresh-ui).



## Related articles
[Post-Step Operations]({{site.baseurl}}/docs/pipelines/post-step-operations/)  
[Advanced Workflows ]({{site.baseurl}}/docs/pipelines/advanced-workflows/)  
[Conditional Execution of Steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) 
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)


