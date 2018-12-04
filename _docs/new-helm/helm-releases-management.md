---
title: "Helm Releases management"
description: ""
group: new-helm
redirect_from:
  - /docs/helm-releases-management/
toc: true
---
Codefresh has built-in Helm integration that provides a unique view into your production Kubernetes cluster. In the "Helm Releases" page, you can see the current status of your cluster, including the currently deployed releases, their previous revisions including change tracking, and even roll back to a previous release.

## Helm Releases overview
You can view your installed Helm releases from the Helm Releases page (in the side menu)

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/releases.png" 
url="/images/kubernetes-helm/dashboard/releases.png"
alt="Helm Releases" 
caption="Helm Releases" 
max-width="50%"
%}

Clicking on a release name will take you to the Kubernetes view, showing the selected release.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/services.png" 
url="/images/kubernetes-helm/dashboard/services.png"
alt="Kubernetes Services" 
caption="Kubernetes Services" 
max-width="50%"
%}

Expand a release to show it's history.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/history.png" 
url="/images/kubernetes-helm/dashboard/history.png"
alt="Helm History" 
caption="Helm History"
max-width="50%"
%}

You can further expand a release revision to see exactly what files was changed in this release.

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/diff.png" 
url="/images/kubernetes-helm/dashboard/diff.png"
alt="Helm diff" 
caption="Helm diff" 
max-width="50%"
%}

You can issue a rollback to a previous revision by clicking on the rollback button on the desired revision row.

You can issue a [Helm test](https://github.com/kubernetes/helm/blob/master/docs/chart_tests.md){:target="_blank"} by clicking on the 'Run Test' button on the desired chart row.

You can delete a release by clicking on the 'Delete' button on the desired chart row.
For deletion options, see [helm delete documentaiton](https://github.com/kubernetes/helm/blob/master/docs/helm/helm_delete.md){:target="_blank"}, for example, purge will remove the revision from the release history.
