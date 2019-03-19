---
title: "Use kubectl as part of Freestyle step"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/use-kubectl-as-part-of-freestyle-step/
toc: true
---

## Kubernetes in Freestyle step

Running Kubernetes cmd in Codefresh as part of the workflow is easy.
Codefresh adding all you clusters into the workflow to be used as part of your CI/CD pipeline.
The context remains the same as it appears in Codefresh

>If your cluster name includes spaces then make sure that you use quotes in the `kubectl` command

* Use image: `codefresh/kubectl`
* Add your commands
    * `kubectl config get-contexts`. Will print the cluster that we added to the workflow
    * `kubectl config use-context "my-cluster-name"`. The name is the same as in `Account settings` &#8594; `Integrations` &#8594; `Kubernetes`
    * `kubectl get po -owide`
    * `kubectl get nodes`


## Follow the example
* Add this [repo](){:target="_blank"} to your account
* Change the pipeline configuration to use `codefresh.yml`.
* Build.

## Running parallel steps with kubectl

More complex examples can be found in the [custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/) documentation page.
