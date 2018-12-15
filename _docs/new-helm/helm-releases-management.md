---
title: "Helm Releases management"
description: "Manage Helm deployments from the Codefresh UI"
group: new-helm
redirect_from:
  - /docs/helm-releases-management/
toc: true
---
Codefresh has built-in Helm integration that provides a unique view into your production Kubernetes cluster. In the "Helm Releases" page, you can see the current status of your cluster, including the currently deployed releases, their previous revisions including change tracking, and even roll back to a previous release.

## Helm Releases overview
You can view your installed Helm releases from the Helm Releases page (Expand the Helm menu from the left sidebar)

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/releases.png" 
url="/images/kubernetes-helm/dashboard/releases.png"
alt="Helm Releases" 
caption="Helm Releases" 
max-width="50%"
%}

Clicking on a release name will take you to its details, showing the individual services that comprise it.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/services.png" 
url="/images/kubernetes-helm/dashboard/services.png"
alt="Kubernetes Services" 
caption="Kubernetes Services" 
max-width="50%"
%}

The history tab shows all previous releases.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/history.png" 
url="/images/kubernetes-helm/dashboard/history.png"
alt="Helm History" 
caption="Helm History"
max-width="50%"
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

You can issue a rollback to a previous revision by clicking on the rollback button on the desired revision row.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/rollback.png" 
url="/images/kubernetes-helm/dashboard/rollback.png"
alt="Rolling back to a previous release" 
caption="Rolling back to a previous release" 
max-width="40%"
%}

There are other tabs that show you the chart used, the values as well as the final manifests that were actually deployed

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

From the main release screen you have some additional actions.

You can issue a [Helm test](https://github.com/kubernetes/helm/blob/master/docs/chart_tests.md){:target="_blank"} by clicking on the 'Run Test' button on the desired chart row.

You can delete a release by clicking on the 'Delete' button on the desired chart row.
For deletion options, see the [helm delete documentation](https://github.com/kubernetes/helm/blob/master/docs/helm/helm_delete.md){:target="_blank"}, for example, *purge* will remove the revision from the release history.

## Helm Deployment Badge

Similar to a [build badge]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/#using-the-build-badge) you can also get a deployment badge for a Helm release.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/helm-badge.png" 
url="/images/kubernetes-helm/dashboard/helm-badge.png"
alt="Helm Deployment badge" 
caption="Helm Deployment badge" 
max-width="50%"
%}


Click on the *Badge* button and Codefresh will give you a Markdown/HTML/Link segment that you can embed in README or other 
documents to show deployment information.

## What to read next

* [Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Helm Charts and repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
* [Codefresh Managed Helm Repositories]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)