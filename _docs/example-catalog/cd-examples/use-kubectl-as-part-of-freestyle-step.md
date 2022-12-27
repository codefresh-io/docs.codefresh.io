---
title: "Use kubectl as part of freestyle step"
description: "How to run manually kubectl in a Codefresh pipeline"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/use-kubectl-as-part-of-freestyle-step/
toc: true
---


Running Kubernetes commands in Codefresh as part of the workflow is very easy.


Codefresh is adding all your clusters into the workflow ready to be used as part of your CI/CD pipeline.
The context remains the same as it appears in the [Codefresh Kubernetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/).

>If your cluster name includes spaces then make sure that you use quotes in the `kubectl` command.

* Use image: `codefresh/kubectl`
* Add your commands:
    * `kubectl config get-contexts`. Will print the cluster that we added to the workflow
    * `kubectl config use-context "my-cluster-name"`. The name is the same as in `Account settings` &#8594; `Integrations` &#8594; `Kubernetes`
    * `kubectl get po -owide`
    * `kubectl get nodes`


## Follow the example

* Add this [Git repo](https://github.com/Codefresh-Examples/kubectl-in-freestyle-step){:target="_blank"} to your account
* Change the pipeline configuration to use `codefresh.yml`.
* Build.

## Running parallel steps with kubectl

More complex examples can be found in the [custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/) documentation page.

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)