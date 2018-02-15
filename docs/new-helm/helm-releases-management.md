---
layout: docs
title: "Helm Releases management"
description: ""
group: new-helm
redirect_from:
  - /docs/helm-releases-management
  - /docs/helm-releases-management/
toc: true
---
Codefresh has build in Helm integration that provides a unique view into your production Kubernetes cluster. In the "Helm Releases" page, you can see the current status of your cluster, including the currently deployed releases, their previous revisions including change tracking, and even roll back to a previous release.

## Helm Releases overview
You can view your installed Helm releases from the Helm Releases page (in the side menu)

{% include 
image.html 
lightbox="true" 
file="/images/e4a832f-Screen_Shot_2018-01-23_at_11.30.41.png" 
url="/images/e4a832f-Screen_Shot_2018-01-23_at_11.30.41.png"
alt="e4a832f-Screen_Shot_2018-01-23_at_11.30.41.png" 
max-width="30%"
%}

Clicking on a release name will take you to the Kubernetes view, showing the selected release.

{% include 
image.html 
lightbox="true" 
file="/images/a6dbd48-Screen_Shot_2017-12-05_at_5.16.17_PM.png" 
url="/images/a6dbd48-Screen_Shot_2017-12-05_at_5.16.17_PM.png"
alt="a6dbd48-Screen_Shot_2017-12-05_at_5.16.17_PM.png" 
max-width="30%"
%}

Expand a release to show it's history.

{% include 
image.html 
lightbox="true" 
file="/images/3181fb5-Screen_Shot_2018-01-23_at_11.31.45.png" 
url="/images/3181fb5-Screen_Shot_2018-01-23_at_11.31.45.png"
alt="3181fb5-Screen_Shot_2018-01-23_at_11.31.45.png" 
max-width="30%"
%}

You can further expand a release revision to see exactly what files was changed in this release.

{% include 
image.html 
lightbox="true" 
file="/images/94ca432-Screen_Shot_2018-01-23_at_11.32.03.png" 
url="/images/94ca432-Screen_Shot_2018-01-23_at_11.32.03.png"
alt="94ca432-Screen_Shot_2018-01-23_at_11.32.03.png" 
max-width="30%"
%}

You can issue a rollback to a previous revision by clicking on the rollback button on the desired revision row.

You can issue a [Helm test](https://github.com/kubernetes/helm/blob/master/docs/chart_tests.md){:target="_blank"} by clicking on the 'Run Test' button on the desired chart row.

You can delete a release by clicking on the 'Delete' button on the desired chart row.
For deletion options, see [helm delete documentaiton](https://github.com/kubernetes/helm/blob/master/docs/helm/helm_delete.md){:target="_blank"}, for example, purge will remove the revision from the release history.
