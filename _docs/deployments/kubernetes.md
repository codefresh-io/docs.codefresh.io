---
title: "How to deploy to Kubernetes"
description: "Learn the different Kubernetes deployment options"
group: deployments
toc: true
redirect_from:
 - /docs/deployments/kubernetes/deployment-options-to-kubernetes/
---

Codefresh offers several options when it comes to Kubernetes deployments:

1. Codefresh UI for on-demand deployments  
  This is the easiest deployment option for Kubernetes. See our [Kubernetes deployment quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-to-kubernetes/).
1. Through a dedicated [deploy step]({{site.baseurl}}/docs/pipelines/steps/deploy/) in a pipeline.  
1. Through the [cf-deploy-kubernetes step]({{site.baseurl}}/docs/ci-cd-guides/kubernetes-templating/) in a pipeline  
  Use this to also perform simple templating on Kubernetes manifests.
1. Through a [freestyle]({{site.baseurl}}/docs/pipelines/steps/freestyle/) step with [Kustomize](https://kustomize.io){:target="\_blank"}.  
  See [Deployment with Kustomize]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-with-kustomize).
1. Using a freestyle step with your own `kubectl` commands  
  This deployment option gives you great flexibility, but assumes that you know how to work with `kubectl`. See [Custom kubectl commands]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/).
1. Using Helm as a package manager  
  See our [Helm deployment to Kubernetes quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-with-helm/).

## Prerequisites for all options

* A K8s cluster in Codefresh (see [Connecting a Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster) )
* Familiarity with the [Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/), basic [pipeline steps]({{site.baseurl}}/docs/pipelines/steps/), and how to describe them
* [Docker registry integration]({{site.baseurl}}/docs/integrations/docker-registries/) in Codefresh
  

## Related articles
[Manage your Kubernetes cluster]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/)  
[Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  

