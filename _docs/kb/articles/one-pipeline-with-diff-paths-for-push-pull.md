---
title: "How To: Using one pipeline with different paths for push/pull requests/release"
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

## Overview

You have a pipeline that covers push, pull requests, and/or releases, but need to alter certain steps depending for each type of event.

## Details

There are a number of different paths to solving this. Two include:

* Use a generic pipeline which is only called from other pipelines - one pipeline for push, one for pull requests, etc. This is the preferred method where there are numerous differences and only a small overlap. For this solution, please [see this article]({{site.baseurl}}/docs/kb/articles/start-another-pipeline-based-on-condition/).
* In a build step, parse the webhook payload stored in the [events.json file]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#accessing-directly-the-webhook-content-of-the-trigger) to determine what type of event triggered the current build.
* Set environment variables based on triggers, and use conditionals to determine which ones to run. This is the preferred method when the majority is the same.

We will cover the third solution here. For our example, we're defining a
different path for push and pull requests.

1. Create a trigger that acts only on push requests.
2. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `push`. ![Setting a variable]({{site.baseurl}}/images/troubleshooting/set-variable.png)
3. Save this trigger.
4. Create a new trigger that acts only on pull requests.
5. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `pull`.

With these variables set, you can now use [step conditionals]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) or `if` statements in your freestyle steps to check the value of "GIT_EVENT" within your build, and control the flow of your pipeline at run time.

## Related Items

[How-to: Start another pipeline based on condition]({{site.baseurl}}/docs/kb/articles/start-another-pipeline-based-on-condition/)

[More details on conditionals]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)
