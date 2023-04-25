---
title: "How-to: Set shm-size for container"
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines, Runtimes]
support-reviewed: 2023-04-18 LG
---

## Overview

A user wants to have better performance for their containers/builds in their private Kubernetes clusters using the [Codefresh Runner]({{site.baseurl}}/docs/installation/codefresh-runner/)(Hybrid).

## Details

>_**Note**_
>
>* Must be using Hybrid only environments (no SaaS environments).
>* By default, a user cannot modify this parameter. A feature-flag controls this on the Codefresh side. Please contact support to enable this.
>* Once enabled, [Launch Compositions]({{site.baseurl}}/docs/pipelines/steps/launch-composition/) will not work.

### Patch Runtime Environment

Get the runtime Environment

```shell
codefresh get runtime-environments <runtme_env_name> -o yaml > runtime.yaml
```

Modify the `dockerDaemonScheduler`

```yaml
dockerDaemonScheduler:
  volumeMounts:
    dshm:
      name: dshm
      mountPath: /dev/shm
  volumes:
    dshm:
      name: dshm
      emptyDir:
        medium: Memory
```

Apply the patch

```shell
codefresh patch runtime-environment <runtme_env_name> -f runtime.yaml        
```

### Usage

#### **Freestyle Step**

This can only be done using the docker run command

```yaml
version: '1.0'
steps:
  test_shm:
    image: docker
    commands:
      - docker run -d --shm-size=256m nginx
      - sleep 300
```

You can exec into dind pod to verify changes

![shm-size in freestyle step](/images/troubleshooting/shm-size-freestyle.png)

#### **Service Containers**

Specify the shm_size as part of the services > composition section

```yaml
version: '1.0'
steps:  
  test:
    image: docker
    commands:
      - echo "Hello world"
      - sleep 30
    services:
      composition:
        alpine:
          image: alpine
          command: sleep 10
          shm_size: 256m
```

You can exec into dind pod to verify changes

![shm-size in service container](/images/troubleshooting/shm-size-service-container.png)
