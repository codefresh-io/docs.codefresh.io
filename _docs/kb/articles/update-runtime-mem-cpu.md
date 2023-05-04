---
title: "How To: Update runner runtime environment memory and CPU settings"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Runtimes, CLI]
support-reviewed: 2023-04-18 LG
---

## Overview

Your builds may require more CPU and/or memory allocated in order to run.

## Details

Memory and CPU for runner runtime environments can be set per-pipeline in the workflow definition, under settings -> runtime.

To modify the default values for a runtime environment, you will need to use the Codefresh CLI to directly edit the runtime environment spec:

1. First export the runtime environment spec into a yaml file

    `codefresh get runtime-environments <runtme_env_name> -o yaml > runtime.yaml`

2. Make modifications based on this yaml file. For build memory, these are the configurations to modify/add - replace "cpu" and "memory" values with the ones you want. `requests` is the amount of resources that are guaranteed per build, and `limits is` the maximum amount that can be allocated to a build.

    ```yaml
    dockerDaemonScheduler:
      defaultDindResources:
        requests:
          cpu: 400m
          memory: 800Mi
        limits:
          cpu: 400m
          memory: 800Mi
    ```

    Anything that's explicitly listed in your runtime environment config will be used, otherwise the setting will be inherited from a parent runtime environment. So if these fields don't already exist in your config, add them.

3. Once changes are complete, patch this config into your runtime environment definition on CF:

    `codefresh patch runtime-environment <runtme_env_name> -f runtime.yaml`
