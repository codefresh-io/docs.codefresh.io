---
title: "How To: Selecting branch for cron activation"
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

You want to run a pipeline on a specific branch as part of your cron job, but you're unable to select in the trigger creation.

## Details

Set up a separate cron-triggered pipeline as the parent pipeline. From this parent pipeline, use the `codefresh-run` step to run your original pipeline as a child build with a repository trigger and branch specified.

1. Create a pipeline with the cron trigger you want to use.
2. In this pipeline, add the following step:

    ```yaml
    codeamlfresh-run:
      title: Run a codefresh pipeline
      type: codefresh-run
      arguments:
        PIPELINE_ID: <project-name/pip_name>
        TRIGGER_ID: <trigger-name>
        BRANCH: <branch-name>
    ```

3. Repeat for all branches you wish to run.

## Related Items

[Codefresh Run Step](https://codefresh.io/steps/step/codefresh-run)
