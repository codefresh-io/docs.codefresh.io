---
title: "Failed to tag image"
description: "Failed to update your image with promote event, could not tag image"
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: true
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Issue

[Push step]({{site.baseurl}}/docs/pipelines/steps/push/) in your pipeline fails with the following error:

```shell
[SYSTEM] Error: Failed to push image docker.io/example/my-image:1.0.0; caused by Error: Failed to update your image with promote event; caused by Error: NotFoundError: could not tag image 
```

## Possible cause

This issue occurs because of a race condition when multiple builds try to push the same image at the same time [to a Docker registry]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/).  
For a pipeline, if two builds are triggered at the same time for the same commit, one of them will pass and the other will fail.

## Solution

Review the trigger setup according to the pipeline logic, and verify that is triggered only once when an event happens.  

It is not possible to push the same image at the same time to the same registry. Your pipeline configuration has probably [multiple triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) (such as a commit and tag) that trigger the pipeline twice.

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/kb/common-issues/)
