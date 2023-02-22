---
title: "Managing Helm releases"
description: "Manage Helm deployments from the Codefresh UI"
group: deployments
sub_group: helm
redirect_from:
  - /docs/new-helm/helm-releases-management/
  - /docs/helm-releases-management/
  - /docs/deployments/helm/helm3/
toc: true
---
Codefresh has built-in integration for Helm that provides a unique view into your production Kubernetes cluster.  
In Helm Releases, you can see the current status of your cluster, including the currently deployed releases, their previous revisions including change tracking, and even roll back to a previous release.

Codefresh also offers [an environment view for Helm releases]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/) as well as [a promotion dashboard]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion).


## View Helm releases and release information

View all the Helm releases in your cluster, and drill down into a specific release to see its services, deployed versions, manifests and more. 

> Make sure you have [connected your Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster) to Codefresh.

1. In the Codefresh UI, from DevOps Insights in the sidebar, select [**Helm Releases**](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"}. 

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/helm-release-dashboard.png" 
url="/images/deployments/helm/helm-release-dashboard.png"
alt="Helm Releases" 
caption="Helm Releases" 
max-width="90%"
%}

<!---### Choosing between Helm 2 and Helm 3 releases

You can specify the type of Helm release for a cluster by clicking on the small gear icon. Then make sure to refresh the page.

 {% include 
image.html 
lightbox="true" 
file="/images/quick-start/quick-start-helm/helm-version-selection.png" 
url="/images/quick-start/quick-start-helm/helm-version-selection.png" 
alt="Choosing a Helm version" 
caption="Choosing a Helm version" 
max-width="50%" 
%}

For Helm 2 releases, Codefresh will try to find the server component (Tiller) in the cluster in the namespace that you define. -->


{:start="2"}
1. To see details for a specific release, click the release name.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/services.png" 
url="/images/deployments/helm/services.png"
alt="Kubernetes Services" 
caption="Kubernetes Services" 
max-width="70%"
%}

The History tab shows all previous releases.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/history.png" 
url="/images/deployments/helm/history.png"
alt="Helm History" 
caption="Helm History"
max-width="60%"
%}

You can further expand a release revision to see exactly what files were changed in this release.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/diff.png" 
url="/images/deployments/helm/diff.png"
alt="Helm diff" 
caption="Helm diff" 
max-width="60%"
%}
 
There are other tabs that show you the chart used, the values as well as the final manifests that were actually deployed.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/manifests.png" 
url="/images/deployments/helm/manifests.png"
alt="Final rendered manifests" 
caption="Final rendered manifests" 
max-width="50%"
%}

## Add labels to Kubernetes services
 
For better visibility into services, add the [recommended labels](https://helm.sh/docs/topics/chart_best_practices/labels/){:target="\_blank"} to your Kubernetes service.

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

To use the instance label for something different, you can also use a release label instead:

{% highlight yaml %}
{% raw %}
release: {{ .Release.Name }}
{% endraw %}
{% endhighlight %}



## Add an upgrade message

Codefresh allows you to display a meaningful description for each release in the release history. This message
can help show the main reason behind each release, or any other message that is convenient for you.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/helm-commit-message.png" 
url="/images/deployments/helm/helm-commit-message.png"
alt="Helm release message" 
caption="Helm release message" 
max-width="70%"
%}

You can set this message for your Helm release in three ways:

1. When you manually install a Helm release from the [Helm charts screen]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/#install-a-chart-from-your-helm-repository), there is a field for this message.
1. Set the property `commit_message` inside the [notes.txt](https://helm.sh/docs/chart_template_guide/notes_files/){:target="\_blank"} file of your chart.
1. By providing an environment variable called `COMMIT_MESSAGE` within your [Helm pipeline step]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/).


## Roll back a Helm release

You can rollback to a previous revision of a release in the History tab.

1. Click the Helm release for which to perform a rollback, and then click the **History** tab.
1. To rollback to a specific release, click **Rollback** in the row.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/rollback.png" 
url="/images/deployments/helm/rollback.png"
alt="Rolling back to a previous release" 
caption="Rolling back to a previous release" 
max-width="50%"
%}

>It takes time to complete rollback for a release, and the change in the cluster is not instantly updated in the Codefresh UI. If you also use a [custom rollback pipeline](#overriding-default-helm-actions-for-releases), the delay between the cluster update and the UI refresh is even longer. 

## Helm UI actions

From the main release screen, you have some additional actions.

Select the row with the desired chart, and:  
* Issue a [Helm test](https://helm.sh/docs/topics/chart_tests/){:target="\_blank"} by clicking on the 'Run Test' button.
* Delete a release by clicking on the 'Delete' button.  
  For deletion options, see the [Helm delete documentation](https://helm.sh/docs/helm/helm_uninstall/){:target="\_blank"}. For example, *purge* removes the revision from the release history. 

## Helm deployment badge <!--how to add badge ask where is the badge icon-->

Similar to a [build badge]({{site.baseurl}}/docs/pipelines/configuration/build-status/#using-the-build-badge), you can also get a deployment badge for a Helm release.  

1. In the Codefresh UI, from the DevOps Insights section in the sidebar, select [**Helm Releases**](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"}. 
1. In the row with the Helm release for which to add a deployment badge, click the **Settings** (gear) icon.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/helm-badge.png" 
url="/images/deployments/helm/helm-badge.png"
alt="Helm Deployment badge" 
caption="Helm Deployment badge" 
max-width="60%"
%}

{:start="3"}
1. To get deployment information, click **Badge**.  
  Codefresh provides the Markdown/HTML/Link segment that you can embed in README or other documents to show deployment information.

## Overriding default Helm actions for releases

By default, when you take an action in the UI, Codefresh executes the native Helm command corresponding to that action:

* `helm test` for testing a chart
* `helm rollback` for rollbacks
* `helm delete` or `helm uninstall --keep-history` for delete
* `helm delete --purge ` or `helm uninstall ` for purging a release

You can override these actions for a specific Helm release by defining custom pipelines for each action. This way you can add your extra logic on top of these actions. For example your own Helm uninstall pipeline might also have a notification step that posts a message to a Slack channel after a release is removed.

>Only [Codefresh admin users]({{site.baseurl}}/docs/administration/account-user-management/access-control/#users-and-administrators) can override the default pipelines defined for a Helm release.

1. In the Codefresh UI, from the DevOps Insights section in the sidebar, select [**Helm Releases**](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"}. 
1. In the row with the Helm release for which to override default actions, click the **Settings** (gear) icon.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/override-helm-actions.png" 
url="/images/deployments/helm/override-helm-actions.png"
alt="Changing default Helm actions" 
caption="Changing default Helm actions" 
max-width="50%"
%}

{:start="3"}
1. Select the pipeline to use for the respective actions.

### Environment variables for custom Helm commands 
If you do override any of these actions, the following [environment variables]({{site.baseurl}}/docs/pipelines/variables/) are available in the respective pipeline, so that you can use your own custom Helm command.

**Helm Test pipeline**  
* `CF_HELM_RELEASE`: Name of release
* `CF_HELM_KUBE_CONTEXT`: `kubectl` context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_NAMESPACE`: Namespace where release is stored  
* `CF_HELM_TIMEOUT`: Time in seconds to wait for any individual Kubernetes operation
* `CF_HELM_CLEANUP`: Delete test pods upon completion



**Helm Rollback pipeline**  
* `CF_HELM_VERSION`: Helm version, ex.: 3.0.1, 2.7.0
* `CF_HELM_RELEASE`: Name of release on cluster
* `CF_HELM_REVISION`: Revision to use for rollback
* `CF_HELM_KUBE_CONTEXT`: `kubectl` context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_NAMESPACE`: Namespace where release is stored 


**Helm Delete pipeline**    
* `CF_HELM_PURGE`: Boolean, delete release from store
* `CF_HELM_RELEASE`: Name of release
* `CF_HELM_TIMEOUT`: Time in seconds to wait for any individual Kubernetes operation
* `CF_HELM_HOOKS`: Prevent hooks from running during install
* `CF_HELM_KUBE_CONTEXT`: `kubectl` context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_VERSION`: Helm version, ex.: 3.0.1, 2.7.0
* `CF_HELM_NAMESPACE`: Namespace where release is stored


## Related articles
[Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)  
[Helm charts and repositories]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/)  
[Using a managed Helm repository]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/)  
[Promoting Helm Environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion)  