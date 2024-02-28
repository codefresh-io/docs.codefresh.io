---
title: "How To: Check potentially unstable service for pipelines"
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

This article describes how to check for a service that may be inaccessible for a number of reasons, including:
* Connectivity issues
* Connection limits
* Rate limits
* Unstable service

## How to

* In the pipeline step, add the `retry` attribute, as in the following example:

```yaml
steps:
  test:
    image: ubuntu:latest
    commands:
      - api-test-here.sh
    retry:
      maxAttempts: 5
      delay: 5
      exponentialFactor: 2
```  

>**NOTE**  
Every retry attempt uses up one of your concurrent builds. For this reason, we suggest limiting the amount of retries.

## Related articles
[Retrying a step]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#retrying-a-step)  
[Pipeline policy settings]({{site.baseurl}}/docs/pipelines/pipelines/#policies)  
[Pipeline concurrency]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-concurrency)   
