---
title: "How To: Speed up Builds by Using Intermediate Images to Cache Dependencies"
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

If you have a build pipeline where the dependencies of your build do not often change, you can speed up those builds by building those dependencies into an intermediate container image.

## Details

### Example Project

<https://github.com/codefresh-support/cf-intermediate-build-example>

Inside of this project there is a example pipeline for Codefresh Classic that demonstrates how to selectively rebuild the intermediate container if the dependency's change:

<https://github.com/codefresh-support/cf-intermediate-build-example/blob/main/example-pipeline.yml>

### Technical details

This example checks to see if the `/dependency/dependencies.list` file has changed in the `dependency_evaluation` step, by running running the below command:

```shel
git diff --name-only HEAD~1 HEAD | grep dependency/dependencies.list
```

This checks all the file changes made in the last commit, and then filters this list of changes to see if the `dependencies.list` file is in that list of changes. The result of that test is then checked to see if a build step is required to run.

After doing so, the pipeline continues with the next step triggering on either a successful build, or a "failed" ('not required') result of the dependency_evaluation step.

### Key Takeaway

You don't have to rebuild your entire project on every commit. By using Conditional Execution [1] of steps and detecting when your dependencies change, you can further speed up your pipeline.

## Related Items

[1] <https://codefresh.io/docs/docs/pipelines/conditional-execution-of-steps/>
