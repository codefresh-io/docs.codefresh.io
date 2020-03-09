---
title: "Helm Releases management"
description: "Manage Helm deployments from the Codefresh UI"
group: new-helm
redirect_from:
  - /docs/helm-releases-management/
  - /docs/new-helm/helm3/
toc: true
---
Codefresh has built-in Helm integration that provides a unique view into your production Kubernetes cluster. In the "Helm Releases" page, you can see the current status of your cluster, including the currently deployed releases, their previous revisions including change tracking, and even roll back to a previous release.

Codefresh also offers [an environment view for Helm releases]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/) as well as [a promotion dashboard]({{site.baseurl}}/docs/new-helm/helm-environment-promotion).


## Helm Releases overview

Before using the dashboard you should have [connected your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/) into Codefresh.

Then click on the left sidebar *Helm* and choose the *Releases* option to visit the dashboard. 

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/helm-release-dashboard.png" 
url="/images/kubernetes-helm/dashboard/helm-release-dashboard.png"
alt="Helm Releases" 
caption="Helm Releases" 
max-width="90%"
%}

### Choosing between Helm 2 and Helm 3 releases

You can specify the type of Helm release for a cluster by clicking on the small gear icon. Then make sure to refresh the page.

 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-helm/helm-version-selection.png" 
url="/images/getting-started/quick-start-helm/helm-version-selection.png" 
alt="Choosing a Helm version" 
caption="Choosing a Helm version" 
max-width="50%" 
%}

For Helm 2 releases, Codefresh will try to find the server component (Tiller) in the cluster in the namespace that you define.


### Viewing details and history from a Helm release

Clicking on a release name will take you to its details, showing the individual services that comprise it.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/services.png" 
url="/images/kubernetes-helm/dashboard/services.png"
alt="Kubernetes Services" 
caption="Kubernetes Services" 
max-width="70%"
%}

The history tab shows all previous releases.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/history.png" 
url="/images/kubernetes-helm/dashboard/history.png"
alt="Helm History" 
caption="Helm History"
max-width="60%"
%}

You can further expand a release revision to see exactly what files were changed in this release.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/diff.png" 
url="/images/kubernetes-helm/dashboard/diff.png"
alt="Helm diff" 
caption="Helm diff" 
max-width="60%"
%}

### Rolling back a Helm release

You can issue a rollback to a previous revision by clicking on the rollback button on the desired revision row.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/rollback.png" 
url="/images/kubernetes-helm/dashboard/rollback.png"
alt="Rolling back to a previous release" 
caption="Rolling back to a previous release" 
max-width="50%"
%}

There are other tabs that show you the chart used, the values as well as the final manifests that were actually deployed.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/manifests.png" 
url="/images/kubernetes-helm/dashboard/manifests.png"
alt="Final rendered manifests" 
caption="Final rendered manifests" 
max-width="50%"
%}


## Helm GUI actions

From the main release screen, you have some additional actions.

You can issue a [Helm test](https://github.com/kubernetes/helm/blob/master/docs/chart_tests.md) by clicking on the 'Run Test' button on the desired chart row.

You can delete a release by clicking on the 'Delete' button on the desired chart row.
For deletion options, see the [helm delete documentation](https://github.com/kubernetes/helm/blob/master/docs/helm/helm_delete.md), for example, *purge* will remove the revision from the release history.

### Overriding the default Helm action

By default Codefresh will just execute the native Helm command for each GUI action that you press

* `helm test` for testing a chart
* `helm rollback` for rollbacks
* `helm delete` or `helm uninstall --keep-history` for delete
* `helm delete --purge ` or `helm uninstall ` for purging a release

You can override these actions for a release by clicking on the gear icon on the main dashboard next to a cluster and input your own pipelines instead:

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/override-helm-actions.png" 
url="/images/kubernetes-helm/dashboard/override-helm-actions.png"
alt="Changing default Helm actions" 
caption="Changing default Helm actions" 
max-width="40%"
%}

This way you can add your extra logic on top of these actions. For example your own Helm uninstall pipeline might also have a notification step that posts a message to a slack channel after the release is removed.


## Helm Deployment Badge

Similar to a [build badge]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/#using-the-build-badge) you can also get a deployment badge for a Helm release. On the main dashboard screen click on the 3-dots menu at the bottom right of a Helm release and select the *Badge* option.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/helm-badge.png" 
url="/images/kubernetes-helm/dashboard/helm-badge.png"
alt="Helm Deployment badge" 
caption="Helm Deployment badge" 
max-width="60%"
%}


Click on the *Badge* button and Codefresh will give you a Markdown/HTML/Link segment that you can embed in README or other 
documents to show deployment information.

## What to read next

* [Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Helm Charts and repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
* [Codefresh Managed Helm Repositories]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
* [Helm Promotion boards]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)