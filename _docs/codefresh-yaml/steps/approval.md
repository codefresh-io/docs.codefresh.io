---
title: "Approval"
description: "How to pause pipelines for manual approval"
group: codefresh-yaml
sub_group: steps
toc: true
---

The approval step allows you to pause a pipeline and wait for human intervention before going on.

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/approval/approval-waiting.png" 
url="/images/codefresh-yaml/approval/approval-waiting.png"
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
  fail_fast: false
  when:
    branch:
      only: [ master ]

{% endraw %}
{% endhighlight %}

## Fields 

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                                                                                                                                                                 | Required/Optional/Default |
| ------------------------------------------ | ---------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                                                                                                                                                     | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                                                                                                                                                                 | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#grouping-steps-with-pipeline-stages) for more information.                                                                                                                                                                                          | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                                                                                                                                                    | Default                   |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                                                                                                                                                                     | Optional                  |


## Pausing the pipeline

Once the pipeline reaches an approval step it will stop. At this point it **does not** consume any resources.
In the codefresh UI you will see the *Approve/Reject* buttons.

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


## Getting the approval result

As also explained in [step dependencies]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/#custom-steps-dependencies) all steps in the Codefresh pipeline belong to a global object
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
   fail_fast: false
 destroyQaEnvNow:
   image: alpine:3.8
   title: Destroying env
   commands:
   - echo "Destroy command running"
   when:
     condition:
       all:
         approved: steps.askForPermission.result == 'approved'
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
- approved
- denied

steps:
 step_1:
   image: alpine:3.8
   title: building chart
   stage: prepare
   commands:
   - echo "prepare"
 approve:
   type: pending-approval
   title: wait for approval
   stage: prepare
   fail_fast: false
 step_2:
   image: alpine:3.8
   title: prepare environment
   stage: approved
   commands:
   - echo "world"
   when:
     condition:
       all:
         approved: steps.approve.result == 'approved'
 step_3:
   image: alpine:3.8
   title: deploy to production
   stage: approved
   commands:
   - echo "world"
   when:
     condition:
       all:
         approved: steps.approve.result == 'approved'
 step_4:
   image: alpine:3.8
   title: prepare environment
   stage: denied
   commands:
   - echo "world"
   when:
     condition:
       all:
         approved: steps.approve.result == 'denied'
 step_5:
   image: alpine:3.8
   title: deploy to staging
   stage: denied
   commands:
   - echo "world"
   when:
     condition:
       all:
         approved: steps.approve.result == 'denied'         
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



You can see that only two steps were ignored. If you rerun the pipeline and approve
it, the other two steps will be ignored.

## What to read next

- [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/) 
- [Advanced Workflows ]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) 
- [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) 
- [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).


