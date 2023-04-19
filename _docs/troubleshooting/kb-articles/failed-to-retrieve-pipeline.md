---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# Error: Failed to retrieve pipeline; caused by [object Object]

#

## Overview

After a pipeline is triggered, it immediately fails with the error `Error:
Failed to retrieve pipeline; caused by [object Object]`. There are no steps
present, or if you are using a legacy Git integration, there is only a clone
step present.

## Details

After the trigger, Codefresh was unable to fetch the YAML. This is usually
caused by auto-selection being selected for Branch, but no Branch is
specified.

  * If you are triggering this pipeline through a cron job, please [see this article](https://support.codefresh.io/hc/en-us/articles/360015263419-How-to-Selecting-branch-for-cron-activation).
  * Ensure that the Git Integration has access to reading the Repository. If access has changed recently, it may no longer have access to the YAML.
  * Ensure that you are able to connect to the Git repository. If there is a connectivity issue, Codefresh will be unable to fetch the YAML.

