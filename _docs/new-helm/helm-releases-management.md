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

Notice that for better service visibility we suggest you add the [recommended labels](https://helm.sh/docs/topics/chart_best_practices/labels/) in your Kubernetes service.

{% highlight yaml %}
{% raw %}
apiVersion: v1
kind: Service
metadata:
  name: {{ template "fullname" . }}
  labels:
    app.kubernetes.io/name: "{{ template "name" . }}"  
    helm.sh/chart: "{{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}"
    app.kubernetes.io/managed-by: "{{ .Release.Service  }}"
    app.kubernetes.io/instance: "{{ .Release.Name }}"   
{% endraw %}
{% endhighlight %}

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

### Showing an upgrade message

Codefresh allows you to show a human readable description of each release in the UI of the release history. This message
can help you showing the main reason behind each release (or any other text message that you find convenient).

{% include 
image.html 
lightbox="true" 
file="/images/kubernetes-helm/dashboard/helm-commit-message.png" 
url="/images/kubernetes-helm/dashboard/helm-commit-message.png"
alt="Helm release message" 
caption="Helm release message" 
max-width="70%"
%}

You can set this message for your Helm release in 3 ways:

1. When you manually install a Helm release from the [Helm charts screen]({{site.baseurl}}/docs/new-helm/add-helm-repository/#install-chart-from-your-helm-repository) there is a field for this message
1. You can setup the property `commit_message` inside the [notes.txt](https://helm.sh/docs/chart_template_guide/notes_files/) file of your chart
1. By providing an environment variable called `COMMIT_MESSAGE` inside your [pipeline Helm step]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)


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

### Overriding the default Helm actions

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
max-width="50%"
%}

This way you can add your extra logic on top of these actions. For example your own Helm uninstall pipeline might also have a notification step that posts a message to a slack channel after the release is removed.

If you do override any of these actions the following [environment variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) are available in the respective pipeline, so that you can use your own custom helm command.

*Helm Test pipeline*

* `CF_HELM_RELEASE` - name of release
* `CF_HELM_KUBE_CONTEXT` - kubectl context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_NAMESPACE` - namespace for Tiller Namespace (helm2) or namespace where release is stored (helm3) 
* `CF_HELM_TIMEOUT` - time in seconds to wait for any individual Kubernetes operation
* `CF_HELM_CLEANUP` - delete test pods upon completion
* `CF_HELM_TILLER_VERSION` - version of tiller for helm2


*Helm Rollback pipeline*

* `CF_HELM_VERSION` - Helm version, ex.: 3.0.1, 2.7.0
* `CF_HELM_RELEASE` - name of release on cluster
* `CF_HELM_REVISION` - revision which will be used for rollback
* `CF_HELM_KUBE_CONTEXT` - kubectl context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_NAMESPACE` - namespace for Tiller Namespace (helm2) or namespace where release is stored (helm3) 


*Helm delete pipeline*

* `CF_HELM_PURGE` - boolean, delete release from store
* `CF_HELM_RELEASE` - name of release
* `CF_HELM_TIMEOUT` - time in seconds to wait for any individual Kubernetes operation
* `CF_HELM_HOOKS` - prevent hooks from running during install
* `CF_HELM_KUBE_CONTEXT` - kubectl context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_VERSION` - Helm version, ex.: 3.0.1, 2.7.0
* `CF_HELM_NAMESPACE` - namespace for Tiller Namespace (helm2) or namespace where release is stored (helm3)



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