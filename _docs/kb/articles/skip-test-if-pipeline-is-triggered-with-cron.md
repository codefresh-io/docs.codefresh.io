---
title: "How To: Skip step if pipeline triggered with Cron"
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

You have a build with multiple triggers and you need to skip a certain step if the pipeline was launched using a Cron trigger.

## Details

### Configure Cron trigger message

In the **Message** field of the Cron trigger configuration settings, set a message, for example, "using cron".

### Implement Conditional Step

Use the `EVENT_MESSAGE` variable in your pipeline steps with a condition as in the following example:

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

The condition ensures that specific steps execute only when the pipeline is triggered by Cron, _and_ if the Cron job message differs from the one defined in the Message field (`using cron` in our example).

## Related Items

[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/)  
[Cron trigger event variables]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/#cron-event-payload)  
[Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)  
[Freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/)  
