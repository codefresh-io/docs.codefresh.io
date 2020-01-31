---
title: "Environment Dashboard"
description: "Viewing your deployment environments"
group: deploy-to-kubernetes

toc: true
---

The [built-in Kubernetes dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/) is a good way to see what your clusters are doing but it is mostly focused on low level constructs such as pods and docker images. The [Helm environment dashboard]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/) on the other hand offers an application level view of your cluster, but it only applies to Helm deployments.

To bridge this gap, Codefresh also offers a Environment Dashboard for both Kubernetes and Helm releases that allows you to see cluster status in addition to what the pipelines are doing.

{% include
image.html
lightbox="true"
file="/images/codefresh-yaml/environments/environments.png"
url="/images/codefresh-yaml/environments/environments.png"
alt="Codefresh Environment Dashboard"
caption="Codefresh Environment Dashboard"
max-width="70%"
%}

The environment dashboard is configurable and each enviroment can represent a plain Kubernetes deployment or a Helm release.


## How environments work



{% include
image.html
lightbox="true"
file="/images/kubernetes/environments/environment-info.png"
url="/images/kubernetes/environments/environment-info.png"
alt="Environment Dashboards"
caption="Environment Dashboards"
max-width="80%"
%}

## Creating an environment


## Understanding cluster issues

{% include
image.html
lightbox="true"
file="/images/kubernetes/environments/error-detection.png"
url="/images/kubernetes/environments/error-detection.png"
alt="Environment Dashboards"
caption="Environment Dashboards"
max-width="80%"
%}


## What to read next

- [How to update environment status from builds]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments/)
- [Add your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Helm environment board]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/)


