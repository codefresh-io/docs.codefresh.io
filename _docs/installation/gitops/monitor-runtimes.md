---
title: "Monitoring GitOps Runtimes"
description: "Explore List and Topology view for GitOps Runtimes"
toc: true
---
## Monitoring GitOps Runtimes

This article describes the options and actions to monitor GitOps Runtimes after installation through the List and Topology view formats.   
For options on managing GitOps Runtimes, see [Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/).

## GitOps Runtime views

The **Runtimes** page displays the provisioned GitOps Runtimes in your account.

View Runtime components and information in List or Topology view formats to monitor them.
* List view: The default view, displays the list of provisioned Runtimes, the clusters managed by them, and Git Sources associated with them.
* Topology view: Displays a hierarchical view of Runtimes and the clusters managed by them, with health and sync status of each cluster.




{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="80%"
%}


{% if page.collection != site.gitops_collection %}
{{site.data.callout.callout_warning}}
**WARNING**  
Do not change the Argo CD password by logging into the Argo CD UI with the `argocd-initial-admin-secret`.
Changing the Argo CD password can result in system instability, and disrupt the proper functioning of the Codefresh platform.
{{site.data.callout.end}}
{% endif %}




## GitOps Runtimes List view

The List view is a grid-view of the provisioned Runtimes.

Here is an example of the List view for runtimes.
{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="70%"
%}

Here is a description of the information and options in the List View.

{: .table .table-bordered .table-hover}
| List View Item|  Description   |
| --------------          | ---------------- |
|**Name**| The name of the provisioned GitOps Runtime.<br>Hybrid GitOps Runtimes installed with Helm show the status as either Online (green dot) or Offline (red dot).  |
|**Type**| The type of GitOps Runtime provisioned, and is **Helm**.<br>**Config Runtime** indicates that the Runtime has been designated to store platform resources. See [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime). |
|**Cluster/Namespace**| The K8s API server endpoint, as well as the namespace with the cluster. |
|**Modules**| The modules installed based on the type of provisioned Runtime. Hybrid GitOps Runtimes include CI and CD Ops modules.  |
|**Managed Cluster**| The number of managed clusters, if any, registered with the GitOps Runtime. To view list of managed clusters, click the runtime name, and then the **Managed Clusters** tab.  To work with managed clusters, see [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).|
|**Version**| The version of the Runtime currently installed, and the version of the Helm chart in parentheses. <br><br>**Update Available!** indicates there are newer versions of the Runtime, Helm chart, or both. <br>To see all the commits and changes for the version, mouse over **Update Available!**, and select **View Complete Change Log**. <br> See:<br>[Upgrade GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#upgrade-gitops-runtimes)<br>[View changelogs for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#view-changelogs-for-gitops-runtimes)<br>[Rollback GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#rollback-gitops-runtimes) |
|**Last Updated**| The most recent update information from the runtime to the Codefresh platform. Updates are sent to the platform typically every few minutes. Longer update intervals may indicate networking issues.|
|**Sync Status**| The sync status of the GitOps Runtime. The sync status is displayed only when you have completed installation and configured the GitOps Runtime as an Argo CD Application. {::nomarkdown}<ul><li> {% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/runtime-synced.png"  display=inline-block>{%  endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/runtime-synced.png"  display=inline-block>{% endif %} <b>Synced</b></li> <li>{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/runtime-syncing.png"  display=inline-block>{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/runtime-syncing.png"  display=inline-block>{% endif %} <b>Syncing</b>.</li><li>{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/runtime-out-of-sync.png"  display=inline-block>{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/runtime-out-of-sync.png"  display=inline-block>{% endif %} <b>Out-of-sync</b>.</li><li><b>N/A</b>: Codefresh could not get the sync status. This could be because the Runtime is not configured as an Argo CD Application.</li><li><b>Complete Installation</b>: Git credentials are not configured for the Runtime. Click the three-dot context menu and select <b>Update Git Runtime Credentials</b>. See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#update-git-credentials-for-gitops-runtimes">Update Git credentials for GitOps Runtimes</a>.</li>  </ul> {:/} |
|**Actions** | The possible actions to manage the selected runtime.{::nomarkdown}<ul><li> <b>Set as Configuration Runtime</b>: Designate the selected Runtime to store platform resources which are runtime-agnostic. See <a href="https://codefresh.io/docs/docs/installation/gitops/configuration-runtime">Designating Configuration Runtimes</a>.</li><li><b>Upgrade</b>: Upgrade to the latest version. See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#upgrade-gitops-runtimes">Upgrade GitOps Runtimes</a>.</li><li><b>Download All Logs</b>:Download logs for the Runtime or for its components. See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#viewdownload-logs-for-gitops-runtimes">View/download logs for GitOps Runtimes</a>.</li><li><b>Update Git Runtime Credentials</b>: Update Git token for Runtime. See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#update-git-credentials-for-gitops-runtimes">Update Git credentials for GitOps Runtimes</a>.</li><li><b>Runtimes as applications</b>: Options to view and monitor GitOps Runtimes as applications in the Current State tab of the GitOps Apps dashboard. For details on monitoring appplication resources, see <a href="https://codefresh.io/docs/docs/deployments/gitops/applications-dashboard/#monitoring-resources-for-selected-argo-cd-application">Monitoring resources for Argo CD applications</a>.<ul><li><b>Runtime Application</b>: Available only when the GitOps Runtime is configured as an Argo CD application. For configuration steps, see <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#configure-runtime-as-argo-cd-application">Configuring GitOps Runtime as an Argo CD application</a>.</li><li><b>Runtime ISC Application</b>: Available when a Hybrid GitOps Runtime is installed. Displays the resources of the Shared Configuration Repository (referred to internally as <code class="highlighter-rouge">ISC/isc</code>).</li><li><b>Runtime Resources Application</b>: Available when a Hybrid GitOps Runtime is installed. Displays the resources in the local cluster (in-cluster).</li></ul></li><li><b>Delete Runtime</b>: Available only when the Hybrid GitOps Runtime is Offline. <br>Delete the GitOps Runtime from the Codefresh platform, retaining it on the cluster. See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#delete-gitops-runtimes">Delete GitOps Runtimes</a>. </li><li><b>Uninstall Runtime</b>: Uninstall the runtime from the cluster on which it is provisioned. See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#uninstall-gitops-runtimes">Uninstall GitOps Runtimes</a>.</li> </ul> {:/}|



## GitOps Runtimes Topology view

A hierarchical visualization of the provisioned GitOps Runtimes, the Topology view makes it easy to identify key information such as versions, health and sync status, for both the provisioned Runtime and the clusters managed by it.
Here is an example of the Topology view for GitOps Runtimes.
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-topology-view.png"
 url="/images/runtime/runtime-topology-view.png"
 alt="Runtime Topology View"
 caption="Runtime Topology View"
  max-width="60%"
%}

Here is a description of the information and options in the Topology view.

{: .table .table-bordered .table-hover}
| Topology View Item      | Description   |
| ------------------------| ---------------- |
|**Runtime**             | !{::nomarkdown}{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/runtime-topology-name.png" display=inline-block/>{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/runtime-topology-name.png" display=inline-block/>{% endif %} the provisioned Runtime. {:/}<br>Hybrid Runtimes display the name of the K8s API server endpoint with the cluster. <!--- <br>Hosted Runtimes display 'Codefresh hosted'. --> |
|**Cluster**              | The local, and managed clusters if any, for the Runtime. {::nomarkdown}<ul><li>{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/runtime-topology-in-cluster.png" display=inline-block/>{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/runtime-topology-in-cluster.png" display=inline-block/>{% endif %}indicates the local cluster, always displayed as `in-cluster`. The in-cluster server URL is always set to `https://kubernetes.default.svc/`.</li><li>{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/runtime-topology-managed-cluster.png" display=inline-block/>{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/runtime-topology-managed-cluster.png" display=inline-block/>{% endif %} indicates a managed cluster.</li> <li>{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/runtime-topology-add-cluster.png" display=inline-block/>{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/runtime-topology-add-cluster.png" display=inline-block/>{% endif %} select to add a new managed cluster.</li></ul> {:/} To view cluster components, select the cluster. To add and work with managed clusters, see [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/). |
|**Health/Sync status** |The health and sync status of the Runtime or cluster. {::nomarkdown}<ul><li>{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/error.png" display="inline-block">{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/error.png" display="inline-block">{% endif %} indicates health or sync errors in the Runtime, or a managed cluster if one was added to the runtime.</br> The runtime or cluster node is bordered in red and the name is colored red.</li> <li>{% if page.collection != site.gitops_collection %}<img src="../../../../images/icons/cf-sync-status.png" display=inline-block/>{% endif %}{% if page.collection == site.gitops_collection %}<img src="../../../images/icons/cf-sync-status.png" display=inline-block/>{% endif %}indicates that the Runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |
|**Search and View options** | {::nomarkdown}<ul><li>Find a Runtime or its clusters by typing part of the Runtime/cluster name, and then navigate to the entries found. </li> <li>Topology view options: Resize to window, zoom in, zoom out, full screen view.</li></ul> {:/}|

## Related articles
[Managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/)  
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)