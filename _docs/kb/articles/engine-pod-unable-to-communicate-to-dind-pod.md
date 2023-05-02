---
title: Engine pod is unable to communicate with the dind pod. EHOSTUNREACH error in logs
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Runtimes, CLI]
support-reviewed: 2023-04-18 LG
---

## Overview

When running a build, or troubleshooting a runner connection issue, you will see the error message `EHOSTUNREACH` in the engine logs while the build logs are stuck on `validating connection to docker daemon`.

## Details

One scenario where this situation can occur is when your Kubernetes cluster is configured to use the same CIDR block which is used internally by Docker. This CIDR block range, by default, is `172.17.0.0/16`. Using this CIDR block for both Docker as well as your Kubernetes cluster can cause a conflict. For Codefresh, this means that it's likely that you will see that the dind pod is unreachable from the engine.

## Resolution

You can resolve this issue by appending the following to the root level of the `codefresh-dind-config` configmap which will modify `/etc/docker/daemon.json` in the DinD pod to avoid this conflict.

```yaml
"bip": "172.26.0.1/16"
```

## Additional Information

If you'd like to read more on this topic, you can take a look at the following pages:

* <https://support.hyperglance.com/knowledge/changing-the-default-docker-subnet>
* <https://docs.docker.com/network/network-tutorial-standalone/>
