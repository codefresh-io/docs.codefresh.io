---
layout: docs
title: "Failed to get accounts clusters during workflow"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:path/failed-to-get-accounts-clusters-during-workflow/
redirect_from:
  - /docs/failed-to-get-accounts-clusters-during-workflow
  - /docs/failed-to-get-accounts-clusters-during-workflow
toc: true
---
When we are preparing your workflow, we are trying to add all your clusters to the workflow.
Means, your container now have `KUBECONFIG` environment is the path to the kubeconfig file.
More information about KUBECONFIG environment variable can be found here at the official Kubernetes [page](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/#set-the-kubeconfig-environment-variable){:target="_blank"}.

## My cluster has not been added to the workflow
There are some reasons that your cluster appears in Codefresh (`Account setting` &#8594; `Integrations` &#8594; `Kubernetes`) but not been added to the workflow.
* The cluster is not accessible anymore, try run `kubectl get node -owide` to see the status of the nodes.
* The cluster has been 
* Contact us for additional assistance.
