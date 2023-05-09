---
title: "How To: Override registry for Codefresh-related images in your runtime environment"
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

All the Codefresh-related images are pulled from quay.io by default, this includes images that are needed for the build itself (engine, dind, etc) and images for [built-in Codefresh steps]({{site.baseurl}}/docs/pipelines/steps/#built-in-steps). If you want to make your Hybrid Runner pull these images, for example, from your internal registry mirror, you can do this by modifying the Runtime Environment.

## Details

To make the changes to your Runtime Environment, you will need to use the [Codefresh CLI.](https://codefresh-io.github.io/cli/installation/)

1. Get your Runtime Environment spec:

    `codefresh get re <name> -o yaml > spec.yaml`

2. Modify\add the `envVar` section in `runtimeScheduler` in the downloaded file with the registry you want to use:

    ```yaml
    runtimeScheduler:
      image: 'quay.io/codefresh/engine:1.158.0'  
      [....]
      envVars:
        CONTAINER_LOGGER_IMAGE: 'quay.io/codefresh/cf-container-logger:1.9.0'
        DOCKER_PUSHER_IMAGE: 'quay.io/codefresh/cf-docker-pusher:6.0.10'
        DOCKER_TAG_PUSHER_IMAGE: 'quay.io/codefresh/cf-docker-tag-pusher:1.3.8'
        DOCKER_PULLER_IMAGE: 'quay.io/codefresh/cf-docker-puller:8.0.9'
        DOCKER_BUILDER_IMAGE: 'quay.io/codefresh/cf-docker-builder:1.1.20'
        GIT_CLONE_IMAGE: 'quay.io/codefresh/cf-git-cloner:10.1.17'
        COMPOSE_IMAGE: 'quay.io/codefresh/compose:1.3.0'
        KUBE_DEPLOY: 'quay.io/codefresh/cf-deploy-kubernetes:16.1.11'
        FS_OPS_IMAGE: 'quay.io/codefresh/fs-ops:1.2.3'
        TEMPLATE_ENGINE: 'quay.io/codefresh/pikolo:0.13.6'
        PIPELINE_DEBUGGER_IMAGE: 'quay.io/codefresh/cf-debugger:1.3.0'
        GC_BUILDER_IMAGE: 'quay.io/codefresh/cf-gc-builder:0.5.3'
    [....]
    dockerDaemonScheduler:
      [....]
      dindImage: 'quay.io/codefresh/dind:20.10.18-1.25.4' 
    ```

3. Save the file and then patch your RE using the following CLI command:  

    `codefresh patch re -f spec.yaml`

## Related Items

[Public Marketplace Registry]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#advanced-pipeline-options)
