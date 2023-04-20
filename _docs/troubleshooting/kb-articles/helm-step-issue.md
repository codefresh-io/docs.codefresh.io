---
title: 'Troubleshooting: Receiving "401 Unauthorized" when using the Helm step (1.1.8)'
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines, Artifacts & Insights]
support-reviewed: 2023-04-18 LG
---

## Overview

I am seeing a failure caused by the Helm step and when I look at the failure I
am seeing something similar to the following:

    
    
    Error: 401: unauthorized                                                                                                                                         
    Error: Looks like "cm://h.cfcr.io/codefresh-example/default" is not a valid chart repository or cannot be reached: plugin "bin/helmpush" exited with error                 
    Reading environment variable exporting file contents.  
    [...]

## Details

### Workaround

If you are using the latest version of the helm step or helm step version
_1.1.8_ you will need to set a fixed version in your helm steps to use version
_1.1.7_. This is a known issue and is currently being looked into for a
resolution.

Here is an example of the workaround:

    
    
    title: Storing Helm Chart
    type: 'helm:1.1.7'
    stage: test
    arguments:
      action: push
      ...

