---
title: "How To: Skip Step If Pipeline Is Triggered With Cron"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-12-12 MB
---

## Overview

You have a build that is triggered by multiple triggers, and you need to skip a certain step if the pipeline was launched using a cron trigger.

## Details

### Configure Cron Trigger Message

In your cron trigger configuration, set a message (e.g., "using cron") in the Message field.

### Implement Conditional Step

Utilize the EVENT_MESSAGE variable in your pipeline steps with a condition like:

{% raw %} 

    ```yaml
    Freestyle:
      title: Running alpine image
      type: freestyle
      arguments:
        image: 'quay.io/codefreshplugins/alpine:3.8'
        commands:
          - echo "Displayed only when triggered by cron"
      when:
        condition:
          all:
            validateTriggerType: '"${{EVENT_MESSAGE}}" != "using cron"'
    ```

{% endraw %}

This ensures specific steps execute only when the cron job message is different from "using cron" and pipeline is triggered by cron.

## Related Items

[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/)

[Cron trigger event variables]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/#cron-event-payload)

[Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)

[Freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/)
