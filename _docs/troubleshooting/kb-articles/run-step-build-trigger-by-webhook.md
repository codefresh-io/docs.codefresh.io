---
title: "How-to: Run a step depending on if the build is webhook triggered"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You want to run a step only if the build is directly triggered by a webhook
event, or only if it's started manually.

For example, you may have your Slack notifications set up as steps using the
[Slack notifier plugin](https://codefresh.io/steps/step/slack-notifier) within
your pipeline in order to get more granular control over when and how these
notifications are sent, and you want to send these notifications only if the
build is automatically started via webhook, not when the build is manually
triggered.

## Details

To execute a step only when a build is manually triggered, you can create a
condition to check for the value of the [system-provided
variable](https://codefresh.io/docs/docs/codefresh-yaml/variables/#system-
provided-variables) `CF_BUILD_TRIGGER`. This variable's value will be
`webhook` if the build was started by a webhook event, and `build` if it was
started manually (through UI, CLI, or API).

    
    
    steps:
      SendToSlack:
        type: slack-notifier
        arguments:
          SLACK_HOOK_URL: '${{SLACK_WEBHOOK_URL}}'
          SLACK_TEXT: '${{SLACK_TEXT}}'
          SLACK_ATTACHMENTS: '${{SLACK_ATTACHMENTS}}'
      when:
        condition:
          all:
            webhookTriggered: '"${{CF_BUILD_TRIGGER}}" == "webhook"'
            
Similarly, you can match for the value `build` if you want to execute a step
only if the build is manually initiated.

In child builds started with codefresh run, the value of `CF_BUILD_TRIGGER`
will always be `build`. This is because although the parent build may be
webhook-triggered, the child build is always started via API, which counts as
a "manual" start.

To get around this, you can explicitly pass this variable from the parent to
the child build to override the default value.

    
    
    steps:
      run_child_pipeline:
        type: codefresh-run  
        arguments:
          ...
          VARIABLE:
            - CF_BUILD_TRIGGER=${{CF_BUILD_TRIGGER}}
    
