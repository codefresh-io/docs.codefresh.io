---
title: Monitor pod in CrashLoopBackOff state. "UNAUTHORIZED_ERROR" messages in logs
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Runtimes]
support-reviewed: 2023-04-18 LG
---

## Overview

You see the Monitor pod in the CrashLoopBackOff state in your Codefresh Runner
installation and there are similar errors in the pod's log:

```shell
error: Request error: 401 - 401 - {"status":401,"code":"2401","name":"UNAUTHORIZED_ERROR","message":"Unauthorized","context":{}} 
error: Can't init agent. Reason: StatusCodeError: 401 - {"status":401,"code":"2401","name":"UNAUTHORIZED_ERROR","message":"Unauthorized","context":{}}  
error Command failed with exit code 1.
```

## Details

The Monitor component helps to get information from the "behind firewall" clusters to the Kubernetes dashboard here: <https://g.codefresh.io/kubernetes/services/> and the same information about releases\services goes to [Helm releases](https://g.codefresh.io/helm/releases/releasesNew/) and [Helm Boards](https://g.codefresh.io/helm/helm-kanban/) dashboards. Any failures in the Monitor component don't affect the Runner itself or any builds.

Most likely the API token that is used in the Monitor deployment is not valid. Probably the user who installed the Codefresh Runner in your cluster has deleted the API key from the account or the user doesn't exist in your Codefresh account anymore.

## Solution

To correct this you can edit the `monitor` deployment and modify the `API_TOKEN` variable at `.spec.containers[].env` with a new token :

```shell
kubectl edit deploy -n <runner_namespace> monitor
```

The token can be generated in your [User Settings](https://g.codefresh.io/user/settings%C2%A0) with the **General** scope in it.
