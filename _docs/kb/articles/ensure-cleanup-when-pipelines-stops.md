---
title: "How To: Ensure Clean Up Commands Always Run If a Pipeline Is Manually Stopped"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: 
kb-cat: [Pipelines]
support-reviewed: 2023-05-04 LG
---

## Overview

Sometimes you might want to run code at the end of every pipeline (eg to clean up resources) regardless of success, failure, or the pipeline is manually stopped.

## Details

When working with a sequential (default) pipeline, you will find that manually stopping a pipeline halts the entire pipeline - including any pipeline hooks set to run on_success or on_failure [1]. However, if you switch the entire pipeline work in parallel [2], you can use the below step as a template to ensure that your clean up code will always run:

```yaml
cleaner_always_executed:
  image: alpine
    commands:
      - echo "This is a step that is always executed at the end of the build. No matter what"
    when:
    condition:
        any:
          buildTerminated: workflow.result == 'terminated'
          buildFailed: workflow.result == 'failure'
          buildSuccess: workflow.result == 'success'
```

## Related Items

[1] <https://codefresh.io/docs/docs/pipelines/hooks/>
[2] <https://codefresh.io/docs/docs/pipelines/advanced-workflows/#parallel-pipeline-mode>
