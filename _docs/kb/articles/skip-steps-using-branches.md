---
title: "How To: Skip steps in your pipeline using Branches"
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

You have certain steps you want to skip over for specific branches.

## Details

1. See the [Branch Conditions]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/#branch-conditions) feature. This will be used for our example.
2. Add a condition to your step. In this case, we will skip in the event of the branch being "master":

```yaml
when:
  branch:
    ignore:
      - master
```

>_Notes_ More advanced options and custom logic expressions are available for step conditions. Please refer to this documentation page for details: [Conditional Execution of Steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)
