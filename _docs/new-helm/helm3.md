---
title: "Helm 3 support"
description: "How to use Kubernetes clusters without Tiller"
group: new-helm
toc: true
---

Codefresh is now adding alpha support for Helm 3 clusters. One of the major new features of Helm 3 is the client only architecture. The server component of Helm (called Tiller) is no longer present in Helm 3.

You can work with Helm 3 clusters the same way as Helm 2 clusters in the Codefresh UI. You can also have a mix of Helm 2 and Helm 3 clusters in the same Codefresh account.

## Marking your cluster with Helm 3

To work with a Helm cluster, [add your cluster in Codefresh]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) first.
Then find the Helm toggle button in the [integration settings](https://g.codefresh.io/account-admin/account-conf/integration/kubernetes) and click it to enable Helm 3 for that cluster.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/helm3/helm3-cluster-setting.png" 
url="/images/kubernetes-helm/helm3/helm3-cluster-setting.png"
alt="Helm 3 cluster settings" 
caption="Helm 3 cluster settings" 
max-width="80%"
%}

You can keep other clusters with Helm 2 without any extra changes.

## Working with Helm 3

Once a cluster is connected to Codefresh it will look and act the same way regardless of Helm version.
All Helm screens should work with Helm 3 as normal including:



* The [Helm releases dashboard]({{site.baseurl}}/docs/new-helm/helm-releases-management/)
* The [Helm chart dashboard]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
* The [Helm promotion dashboard]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)
* The [environment dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/)

>If you find an issue during this Alpha please contact us via intercom or open an issue from the top-level profile menu.



## What to read next

* [Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Helm Charts and repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
* [Codefresh Managed Helm Repositories]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
