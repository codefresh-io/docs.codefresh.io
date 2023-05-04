---
title: Freestyle step fails while testing a Node app with Jest
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

Step fails when running tests with a similar error:

```shell
Message: Failed to read environment variable exporting file:/codefresh/volume/asdfg/env_vars_to_export  

Caused by: Failed to read file /codefresh/volume/asdfg/env_vars_to_export
```

## Details

This error can mean multiple things, but the most common reason is that the build was killed due to reaching the memory limit.

[There is a known memory consumption issue with Jest](https://github.com/facebook/jest/issues/11956) affecting Node v16.11.0 or later. You can avoid this issue by following the steps below.

1. Check the size (Small, Medium, Large, etc.) of the build to see the memory limit for the build.
2. Choose one of the options:
   * Upgrade Jest to v29.0 or later and use [workerIdleMemoryLimit option](https://jestjs.io/docs/configuration#workeridlememorylimit-numberstring) which was created as a workaround for aforementioned issue. Adjust this option according to the amount of memory available for your build.
   * Use [--max-old-space-size V8 flag](https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes) to set the max memory size of V8's old memory section:  

      Example: change your test command from `jest` to `node --max-old-space-size=<SIZE> node_modules/.bin/jest <JEST_ARGS>`, where `--max-old-space-size` value is smaller than the memory limit for the build size in MB.

3. Re-run the build, and it should not be killed due to hitting the memory limit.
