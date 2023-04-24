---
title: Files reset after approval step
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

A file or module is no longer present after an approval step

**This article is superseded by new functionalities** \- Please refer to the following link: [Retaining the shared volume]({{site.baseurl}}/docs/pipelines/steps/approval/#keeping-the-shared-volume-after-an-approval).

There are some caveats with the new functionalities that are described in detail in the above documentation. As such, if you do not wish to use the above feature, the methods described here are still valid solutions.

## Details

The pipeline is restarted upon using an approval step. The clone step is run once more. The cache is reset to the same as the pipeline's initial start.

* If applicable, consider adding any initialization after the approval step. If cached from a previously completed pipeline, they will be reused.
* Examples include `npm install` and `bundle install`
* For artifacts, consider using an external store as a temporary holding location.
* As an advanced option, consider running a secondary pipeline:
  1. Create a second pipeline which only includes an approval step
  2. In your primary pipeline, [use the `codefresh-run` step](https://g.codefresh.io/steps/codefresh-run) to run the approval pipeline.
  3. To avoid timeouts, include a looping print statement.
  4. If the secondary pipeline is approved, the primary pipeline will continue.

An example approval pipeline of calling the secondary pipeline with a notification is below:

{% raw %}

```yaml
version: "1.0"

steps:
  slack_notify:
    type: slack-notifier
    arguments:
    SLACK_HOOK_URL: '${{SLACK_WEBHOOK_URL}}'
    SLACK_TEXT: 'There is a build pending approval'

  approval:
    type: pending-approval
```

{% endraw %}
