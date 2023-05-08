---
title: Builds are stuck in pending
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines, Settings]
support-reviewed: 2023-04-18 LG
---

## Overview

One or a number of builds are stuck in pending state.

## Details

1. If you have reached your concurrency limit, any added builds will be put in queue.
2. You may have placed a limit on concurrent runs for one specific pipeline or trigger
3. A pending build is actually in a stuck state.

* Confirm the amount of concurrent builds you have.
* You can find this under `Account Settings` -> `Billing`.
  * If you have enough, ensure that you have set the appropriate runtime size for your pipeline to match your plan. These can be found under your Pipeline settings.
    * `Pipeline -> Settings -> Runtime`
      ![Pipeline size]({{site.baseurl}}/images/troubleshooting/pipeline-size.png)
* Ensure you do not have a limit on concurrent trigger/pipeline builds.
  * You can find this under `Pipeline -> Settings -> Policies`
    ![Pipeline Concurrencies]({{site.baseurl}}/images/troubleshooting/policies-concurrencies.png)
* Finally, check the earliest build stuck in pending.
* If it is terminated or stopped, attempt to restart it.
* If it is stuck in pending, or otherwise cannot be restarted, please reach out to our support team with details.
* If the build is on a hybrid runner runtime environment, check for general issues (such as resource availability) on your runner cluster.

## Related Items

[Builds are not starting on Hybrid/Venona/Runner]({{site.baseurl}}/docs/kb/articles/builds-not-starting-on-hybrid-runtime/)
