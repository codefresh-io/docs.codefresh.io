---
title: "Failed to push"
description: "Failed to update your image with promote event, could not tag image"
group: troubleshooting
sub_group: common-issues
toc: true
---
You have a [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) in your pipeline that fails with the following error:


```
[SYSTEM] Error: Failed to push image docker.io/example/my-image:1.0.0; caused by Error: Failed to update your image with promote event; caused by Error: NotFoundError: could not tag image 
```

## Problem description

This issue occurs because of a race condition when trying to [push to a docker registry]({{site.baseurl}}/docs/docker-registries/push-image-to-a-docker-registry/) the same image at the same time. If there are 2 builds for a pipeline triggered at the same time for the same commit one of them will pass and the other will fail.

## The solution

It is not possible to push the same image at the same time to the same registry. Your pipeline configuration has probably [multiple triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) (such as a commit and tag) that trigger the pipeline twice.

Review the trigger setup according to the pipeline logic and verify that is is triggered only once when an event happens.




