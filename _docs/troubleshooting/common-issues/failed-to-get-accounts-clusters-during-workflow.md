---
title: "Failed to get account clusters during workflow"
description: ""
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/troubleshooting/common-issues/failed-to-get-accounts-clusters-during-workflow/
  - /docs/failed-to-get-accounts-clusters-during-workflow/
toc: true
---

When a pipeline is running, Codefresh automatically sets up several [environment variables]({{site.baseurl}}/docs/pipelines/variables/) that are available to all pipeline steps.

For Kubernetes clusters, if you have configured [at least one cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster), the `KUBECONFIG` environment variable, containing the path to the kubeconfig file will become available in the pipeline.

For more information about the `KUBECONFIG` environment variable, see the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/#set-the-kubeconfig-environment-variable){:target="_blank"}.

## Possible cause

If your Kubernetes cluster appears in the Codefresh Dashboard (`Integrations` &#8594; `Kubernetes` &#8594; `Configure`) but is not accessible in a pipeline, then maybe:

* The cluster is not accessible anymore via Codefresh. Try running `kubectl get node -owide` in your cloud shell to see the status of the nodes.
* The cluster has been deleted externally.

## Solution
Contact us via the Intercom window on the bottom right of the Codefresh interface for additional assistance.

## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)