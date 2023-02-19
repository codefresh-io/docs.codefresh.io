---
title: "Failed to get accounts clusters during workflow"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:collection/troubleshooting/common-issues/failed-to-get-accounts-clusters-during-workflow/
redirect_from:
  - /docs/failed-to-get-accounts-clusters-during-workflow/
toc: true
---

When a pipeline is running, Codefresh is automatically setting up several [environment variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) that
are available to all pipeline steps.

In the case of Kubernetes clusters, if you have configured [at least one cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/), the `KUBECONFIG` environment
variable will become available in the pipeline and will contain the path to the kubeconfig file.

More information about the `KUBECONFIG` environment variable can be found at the [official Kubernetes documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/#set-the-kubeconfig-environment-variable){:target="_blank"}.

## My cluster has not been added to the workflow

If your Kubernetes cluster appears in the Codefresh Dashboard (`Integrations` &#8594; `Kubernetes` &#8594; `Configure`) but is not accessible in a pipeline, then maybe:

* The cluster is not accessible anymore via Codefresh. Try running `kubectl get node -owide` in your cloud shell to see the status of the nodes.
* The cluster has been deleted externally.

Contact us via the Intercom window on the bottom right of the Codefresh interface for additional assistance.
