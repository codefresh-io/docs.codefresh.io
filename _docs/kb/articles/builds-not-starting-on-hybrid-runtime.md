---
title: Builds are not starting on Hybrid/Venona/Runner
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines, Runtimes]
support-reviewed: 2023-04-18 LG
---

## Overview

A build is not starting on a hybrid installation.

1. No errors are being produced, instead hangs.
2. Builds do not start, stuck on pending.
3. The system otherwise appears functional

## Details

Codefresh is not able to start the pods in your cluster.

1. Run the following on your cluster with the Codefresh namespace: `kubectl describe nodes`
2. If no errors appear there, run the following:

{% raw %}

```shell
kubectl -n codefresh-runtime describe pod dind-<build_id>
kubectl -n codefresh-runtime describe pod engine-<build_id>
kubectl -n codefresh-runtime get pod dind-<build_id> -o yaml
kubectl -n codefresh-runtime get pod engine-<build_id> -o yaml
```

{% endraw %}

* If errors are still not clear, please use the following script with the build to gather diagnostics: [https://github.com/codefresh-support/hybrid-runner-support](https://github.com/codefresh-contrib/venona-support)

Please include the above information and open a ticket with our Support team.
