---
title: Reattaching a Classic Hybrid Runner
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [CLI, Runtimes]
support-reviewed: 2023-04-18 LG
---

## Overview

In some situations, you may need to reattach your hybrid runner after making configuration changes in your cluster.

## Details

The Codefresh Runner is installed with the [`cf-runtime` Helm chart](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime){:target="\_blank"}. Every time the runner pod starts, it attaches the Runtime Environment to the Agent in the Codefresh platform.

To reattach the runtime, do one of the following:

* Restart the runner deployment. By default, the deployment is named `<release-name>-runner`.
```shell
kubectl rollout restart deployment [RUNNER_DEPLOYMENT] --namespace [RUNNER_NAMESPACE]
```
* Run `helm upgrade` for the `cf-runtime` release with your existing values.

### Attach the runtime with the Codefresh CLI

You can also attach the runtime to the agent in the Codefresh platform with the [Codefresh CLI](https://codefresh-io.github.io/cli/){:target="\_blank"}. This command does not change any resources in your cluster.

Run `codefresh runner info` to get the agent and runtime names. The `NAME` is the agent name, and under `RUNTIMES` you see the names of all runtimes that are already attached to the agent.

```shell
codefresh attach runtime \
  --runtime-name [RUNTIME_NAME] \
  --agent-name [AGENT_NAME]
```

In many default installations, the runtime and agent names may match.

>**NOTE**  
As of Codefresh CLI version 2.0.0, `codefresh attach runtime` ignores the `--runtime-kube-*`, `--agent-kube-*`, and `--restart-agent` flags.
