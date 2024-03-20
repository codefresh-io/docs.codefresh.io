---
title: "How To: Always run clean-up commands after pipeline execution"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-05-04 LG
---



This article describes how to insert a parallel step within a sequential pipeline to run specific commands at the end of pipeline execution. A common use case for this approach is automating resource cleanup tasks. 

The parallel step always runs at the end of the pipeline, regardless of its build status, or if the pipeline was manually terminated. 



## How to

In a sequential pipeline, which is the default execution mode for pipelines, manually terminating the pipeline, also terminates the execution of subsequent steps, including any pipeline hooks set to run on success or failure.  

You can circumvent this behavior by inserting a parallel step within the pipeline.

* Add the step below as a template to ensure code clean-up will always run:

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

## Related articles
[Hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/)  
[Parallel pipeline execution]({{site.baseurl}}/docs/pipelines/advanced-workflows/#parallel-pipeline-execution)  
