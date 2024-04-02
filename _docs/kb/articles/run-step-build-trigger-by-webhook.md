---
title: "How To: Run a step conditionally for build triggered by webhook"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---


This article explains how to run a step conditionally based on whether the build is triggered by a webhook event or manually.


## Conditional execution of steps

You want to execute a step only when a specfic condition is met.

For example,  to get more granular control over when and how Slack notifications are sent, you may have your Slack notifications set up as steps using the [Slack notifier plugin](https://codefresh.io/steps/step/slack-notifier){:target="\_blank"} within your pipeline.

You want to send these notifications only when the build is automatically triggerd via webhook, and not when it is manually
triggered.

## How to

To execute a step only when a build is manually triggered, you can create a condition to check for the value of the [system variable]({{site.baseurl}}/docs/pipelines/variables/#system-provided-variables) `CF_BUILD_TRIGGER`. 

This variable's value is `webhook` when the build is triggered by a webhook event, and `build` when triggered manually through the UI, CLI, or API.

{% raw %}

```yaml
steps:
  SendToSlack:
    type: slack-notifier:0.0.8
    arguments:
      SLACK_HOOK_URL: '${{SLACK_WEBHOOK_URL}}'
      SLACK_TEXT: '${{SLACK_TEXT}}'
      SLACK_ATTACHMENTS: '${{SLACK_ATTACHMENTS}}'
  when:
    condition:
      all:
        webhookTriggered: '"${{CF_BUILD_TRIGGER}}" == "webhook"'
```

{% endraw %}

Conversely, to execute a step only if the build is manually initiated, you can set a condition to match the value `build`.

##### Child builds
In child builds started with Codefresh run, the value of `CF_BUILD_TRIGGER` will always be `build`.  
This is because although the parent build may be webhook-triggered, the child build is always started via API, which is considered as a "manual" start.

As a workaround, you can explicitly pass this variable from the parent to the child build to override the default value.

{% raw %}

```yaml
steps:
  run_child_pipeline:
    type: codefresh-run:1.5.3 
    arguments:
      ...
      VARIABLE:
        - CF_BUILD_TRIGGER=${{CF_BUILD_TRIGGER}}
```
{% endraw %}
