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

The environment dashboard is configurable and each environment can represent a plain Kubernetes deployment or a Helm release. You can access the dashboard by clicking on *Environments* from the left sidebar in Codefresh.


## How environments work

The purpose of an environment is to give you an overview of both the cluster status as well as the builds that affect it. The environment acts as a link between the status of builds and the status of the cluster.


{% include
image.html
lightbox="true"
file="/images/kubernetes/environments/environment-info.png"
url="/images/kubernetes/environments/environment-info.png"
alt="Components of an environment"
caption="Components of an environment"
max-width="100%"
%}

A Codefresh environment is based on two components

* a cluster namespace that holds a deployment/service (or a Helm release in the case of Helm)
* an association between builds and this cluster

When you visit the environment screen you can see consolidated information on what your environment is doing. Codefresh will pull live data from the cluster to populate the status bar of each environment entry and will automatically show the status of the last 3 builds that affected this environment.

The overall status of the environment (shown as a green or red label at the top of the environment card) is the exit result of the last build that affected that environment.

The URL shown at the environment is just a shortcut link that allows you to quickly visit the user application exposed by the environment (if this is applicable). It is not used by Codefresh for anything else (i.e. Codefresh does *not* check it to actually decide if an environment is healthy).


## Creating an environment

You can create an environment in two ways

* Describe the environment details in the any pipeline that affects it using the [special env syntax]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments/). The first time the pipeline runs, the environment GUI entry will be created automatically in the dashboard
* Create the environment details yourself straight from the Codefresh UI

To create an environment while in the dashboard screen, click the *New environment* button on the top right corner and fill in the required details:

{% include
image.html
lightbox="true"
file="/images/kubernetes/environments/create-environment.png"
url="/images/kubernetes/environments/create-environment.png"
alt="Creating an environment from the GUI"
caption="Creating an environment from the GUI"
max-width="50%"
%}

Once you create the environment, Codefresh will pull automatically the status of pods/deployments/services from the cluster and show it at the environment status bar. To link specific pipelines to that environment follow the [env syntax guide]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments/).

You can also combine the two ways by first creating an environment in the GUI and then associating it with a pipeline. But notice that in that case the environment details you selected in the GUI must **EXACTLY** match those defined in the pipeline (so that the pipeline can detect which environment entry it should update).

## Filtering environments boards

* Filter Helm boards by Namespace, Cluster, and Release. The Namespace filter is useful when you have more than one Helm release per namespace, or you have the same Helm release in more than one* namespace.
* Filter Kubernetes boards by Release, Cluster, and Namespace.



## Understanding cluster issues

There is no restriction to the number of pipelines linked to an environment (and the number of environments affected by a single pipeline). In fact the true power of the environment dashboard becomes evident when you link multiple pipelines to a single environment.

One of the most common deployment issues are errors in configuration. Instead of just linking pipelines that deploy applications, you should instead link *all* types of pipelines that affect a cluster. These pipelines can contains

* application deployments
* cluster component changes
* configuration changes (e.g. configmaps or secrets)
* database changesets

This means that the environment entry will have a history of *all* changes that happened on the cluster and not just application deployments. Ideally no manual change should happen to the cluster outside of a pipeline.

{% include
image.html
lightbox="true"
file="/images/kubernetes/environments/error-detection.png"
url="/images/kubernetes/environments/error-detection.png"
alt="Looking at the history of an environment"
caption="Looking at the history of an environment"
max-width="100%"
%}

Here we have a classic deployment issue where an application is deployed on the cluster and fails, even thought the exact same application tag was previously successful.

Because that team that created this dashboard also linked the pipeline that does configuration changes to the cluster, it is clear that there was a configmap change between the two application deployments. Even though the configuration change itself was successful, the application deployment failed the second time because of it.

With the environment dashboard it is very easy to understand that the configuration change was responsible for breaking the next deployment. An operator can now look at the configuration change and talk with a developer that knows what the application needs and why it failed.

Therefore make sure to link all pipelines that affect a cluster in the environment dashboard and not just application deployments.




## What to read next

- [How to update environment status from builds]({{site.baseurl}}/docs/codefresh-yaml/deployment-environments/)
- [Add your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
- [Manage your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)
- [Helm environment board]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/)


