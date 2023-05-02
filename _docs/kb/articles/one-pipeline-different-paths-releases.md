---
title: "How To: Using one pipeline with different paths for releases"
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

You have a pipeline that covers push, pull requests, and/or releases, but need to run only specific certain steps.

## Details

There are a number of different paths to solving this. Two potential solutions:

### Shared Pipeline

* Use a generic pipeline which is only called from other pipelines - one pipeline for push, one for pull requests, etc. This is the preferred method where there are numerous differences and only a small overlap. To see more of this, please [see this article]({{site.baseurl}}/docs/kb/articles/start-another-pipeline-based-on-condition/).
* Set environment variables based on triggers, and use conditionals to determine which ones to run. This is the preferred method when the majority of the steps are the same.
  1. Create a trigger that acts only on push requests.
  2. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `push`.
  3. Save this trigger.
  4. Create a new trigger that acts only on pull requests.
  5. Under "Advanced Options", find "Build Variables" and add a variable. Name it `GIT_EVENT` and set its value to `pull`.

![Setting a variable]({{site.baseurl}}/images/troubleshooting/set-variable.png)

With this done, you are now able to make use of conditionals in your steps to control which steps are run. You can also use scripts with `if` statements inside your freestyle steps to.

## Related Items

[How-to: Start another pipeline based on condition]({{site.baseurl}}/docs/kb/articles/start-another-pipeline-based-on-condition/)

[More details on conditionals]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)
