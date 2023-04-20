---
title: "How-to: Using one pipeline with different paths for push/pull requests/release"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipeline]
support-reviewed: 2023-04-18 LG
---

## Overview

You have a pipeline that covers push, pull requests, and/or releases, but need
to alter certain steps depending for each type of event.

## Details

There are a number of different paths to solving this. Two include:

  * Use a generic pipeline which is only called from other pipelines - one pipeline for push, one for pull requests, etc. This is the preferred method where there are numerous differences and only a small overlap. For this solution, please [see this article](https://support.codefresh.io/knowledge/articles/360015541779/en-us?brand_id=360000863253).

  * In a build step, parse the webhook payload stored in the [events.json file](https://codefresh.io/docs/docs/configure-ci-cd-pipeline/triggers/git-triggers/#accessing-directly-the-webhook-content-of-the-trigger) to determine what type of event triggered the current build.
  * Set environment variables based on triggers, and use conditionals to determine which ones to run. This is the preferred method when the majority is the same.

We will cover the third solution here. For our example, we're defining a
different path for push and pull requests.

  1. Create a trigger that acts only on push requests.
  2. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `push`. ![Setting a variable](https://support.codefresh.io/hc/article_attachments/360016048520/set-variable.png)
  3. Save this trigger.
  4. Create a new trigger that acts only on pull requests.
  5. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `pull`.

With these variables set, you can now use [step
conditionals](https://codefresh.io/docs/docs/codefresh-yaml/conditional-
execution-of-steps/) or `if` statements in your freestyle steps to check the
value of "GIT_EVENT" within your build, and control the flow of your pipeline
at run time.

## Related Items

[How-to: Start another pipeline based on
condition](https://support.codefresh.io/knowledge/articles/360015541779/en-
us?brand_id=360000863253)

[More details on conditionals](https://codefresh.io/docs/docs/codefresh-
yaml/conditional-execution-of-steps/)

