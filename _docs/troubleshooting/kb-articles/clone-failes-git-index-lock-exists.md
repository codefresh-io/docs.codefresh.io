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

# Clone error: Unable to create '/codefresh/volume/reponame/.git/index.lock':
File exists

#

## Overview

When running a clone step, you see this message: fatal: Unable to create
'/codefresh/volume/reponame/.git/index.lock': File exists

## Details

A stale volume may have crashed, leaving behind a lock file in the cache.

Re-run the build with a cleared file cache.

  1. Open the pipeline
  2. Select Run
  3. Click Advanced Options
  4. Select `Ignore Docker engine cache for build` and `Reset pipeline volume`
  5. Run the build

This will reset the volume and clear out any stale files.

## Related Items

[The Shared Volume](https://codefresh.io/docs/docs/yaml-
examples/examples/shared-volumes-between-builds/#the-shared-volume)

