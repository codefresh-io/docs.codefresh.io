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

# How-to: Skip steps in your pipeline using Branches

#

## Overview

You have certain steps you want to skip over for specific branches.

## Details

  1. See the [Branch Conditions](https://codefresh.io/docs/docs/codefresh-yaml/conditional-execution-of-steps/#branch-conditions) feature. This will be used for our example.
  2. Add a condition to your step. In this case, we will skip in the event of the branch being "master":

    
    
    when:
      branch:
        ignore:
          - master
    

_Notes_ More advanced options and custom logic expressions are available for
step conditions. Please refer to this documentation page for details:
[Conditional Execution of Steps](https://codefresh.io/docs/docs/codefresh-
yaml/conditional-execution-of-steps/)

