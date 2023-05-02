---
title: GitOps Hybrid Runtime - Installation with No Ingress Controller
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [CLI, Ops, Runtimes]
support-reviewed: 2023-04-18 LG
---


## Pre-installation

Have a Cluster with the minimum requirements.

ENV Variables to set on local machine

* GIT_TOKEN - Your git provider PAT that is going to be used for the runtime
* GIT_REPO - The repo where the runtime information is going to set.

## Installation

Run the following command to start the install.

```chell
cf runtime install RUNTIME_NAME \
--access-mode tunnel \
--silent
```

If you get an error about cluster checks then we can run the following command

```shell
cf runtime install RUNTIME_NAME \
--access-mode tunnel \
--skip-cluster-checks \
--silent
```

This will start installing the runtime on your cluster. It maybe a bit slower to get the components installed but will install.

## Troubleshooting

If it seems to be stuck on the list of components being install for a good moment.

* In a different terminal run `kubectl get pods -n RUNTIME_NAMESPACE`
* If you see the “internal-router-*” in a CrashLoopBackOff for multiple times (usually 2 - 3 restarts are ok) I would delete that pod and have it be recreated.
