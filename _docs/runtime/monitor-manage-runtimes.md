---
title: "Managing provisioned runtimes"
description: ""
group: runtime
toc: true
---


The **Runtimes** page displays the provisioned runtimes in your account, both hybrid, and the hosted runtime if you have one. View runtime components and information in List or Topology view formats. Managed provisioned runtimes in the view mode that suits you.  

> Unless specified otherwise, management options are common to both hybrid and hosted runtimes.

To monitor provisioned runtimes, including recovering runtimes for failed clusters, see [Monitoring provisioned runtimes]({{site.baseurl}}/docs/runtime/monitoring-troubleshooting/).


### Runtime views

View provisioned hybrid and hosted runtimes in List or Topology view formats.  

* List view: The default view, displays the list of provisioned runtimes, the clusters managed by them, and Git Sources.
* Topology view: Displays a hierarchical view of runtimes and the clusters managed by them, with health and sync status of each cluster.

#### List view

The List view is a grid-view of the provisioned runtimes.  

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

Here is a description of the information in the List View.

{: .table .table-bordered .table-hover}
| List View Item|  Description   |
| --------------          | ---------------- |
|**Name**| The name of the provisioned Codefresh runtime.  |
|**Type**| The type of runtime provisioned, and can be **Hybrid** or **Hosted**. Hosted runtimes have the beta flag.  |
|**Cluster/Namespace**| The K8s API server endpoint, as well as the namespace with the cluster. |
|**Modules**| The modules installed based on the type of provisioned runtime. Hybrid runtimes include CI amnd CD Ops modules. Hosted runtimes inlcude CD Ops.   |
|**Managed Cluster**| The number of managed clusters if any, for the runtime. To view list of managed clusters, select the runtime, and then the **Managed Clusters** tab.  To work with managed clusters, see [Runtime Management](#runtime-management) in this article.|
|**Version**| The version of the runtime currently installed. **Update Available!** indicates there are later versions of the runtime. To see all the commits to the runtime, mouse over **Update Available!**, and select **View Complete Change Log**.
|**Last Updated**| The most recent update information from the runtime to the Codefresh platform. Updates are sent to the platform typically every few minutes. Longer update intervals may indicate networking issues.|
|**Sync Status**| The health and sync status of the runtime or cluster.  {::nomarkdown}<br><ul><li> <img src="../../../images/icons/error.png"  display=inline-block> indicates health or sync errors in the runtime, or a managed cluster if one was added to the runtime.</br> The runtime name is colored red.</li> <li><img src="../../../images/icons/cf-sync-status.png"  display=inline-block> indicates that the runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |

#### Topology view

A hierachical visualization of the provisioned runtimes. The Topology view makes it easy to identify key information such as versions, health and sync status, for both the provisioned runtime and the clusters managed by it.  
Here is an example of the Topology view for runtimes.
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-topology-view.png"
 url="/images/runtime/runtime-topology-view.png"
 alt="Runtime Topology View"
 caption="Runtime Topology View"
  max-width="30%"
%}

Here is a description of the information in the Topology view.

{: .table .table-bordered .table-hover}
| Topology View Item      | Description   |
| ------------------------| ---------------- |
|**Runtime**             | ![](../../../images/icons/codefresh-runtime.png?display=inline-block) the provisioned runtime. Hybrid runtimes display the name of the K8s API server endpoint with the cluster. Hosted runtimes display 'hosted'.  |
|**Cluster**              | The local, and managed clusters if any, for the runtime. {::nomarkdown}<ul><li><img src="../../../images/icons/local-cluster.png" display=inline-block/> indicates the local cluster, always displayed as `in-cluster`. The in-cluster server URL is always set to `https://kubernetes.default.svc/`.</li><li><img src="../../../images/icons/managed-cluster.png" display=inline-block/> indicates a managed cluster.</li> <li> <img src="../../../images/icons/add-cluster.png" display=inline-block/> select to add a new managed cluster.</li></ul> {:/} To view cluster components, select the cluster. To add and work with managed clusters, see [Add and manage external clusters]({{site.baseurl}}/docs/runtime/managed-cluster). |
|**Health/Sync status** |The health and sync status of the runtime or cluster. {::nomarkdown}<ul><li><img src="../../../images/icons/error.png" display="inline-block"> indicates health or sync errors in the runtime, or a managed cluster if one was added to the runtime.</br> The runtime or cluster node is bordered in red and the name is colored red.</li> <li><img src="../../../images/icons/cf-sync-status.png" display=inline-block/> indicates that the runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |
|**Search and View options** | {::nomarkdown}<ul><li>Find a runtime or its clusters by typing part of the runtime/cluster name, and then navigate to the entries found. </li> <li>Topology view options: Resize to window, zoom in, zoom out, full screen view.</li></ul> {:/}|

### Hybrid/hosted runtime management

Work in either the List or Topology views to manage provisioned runtimes. If an option is valid only for hybrid runtimes, it is indicated as such.

* Add managed clusters to hybrid or hosted runtimes (see [Adding & managing external clusters]({{site.baseurl}}/docs/runtime/managed-cluster/))
* Add and manage Git Sources associated with hybrid or hosted runtimes (see [Adding & managing Git Sources]({{site.baseurl}}/docs/runtime/git-sources/))
* Upgrade provisioned hybrid runtimes
* Uninstall hybrid or hosted runtimes

#### (Hybrid) Upgrade provisioned runtimes

Upgrade provisioned hybrid runtimes to install critical security updates or to install the latest version of all components. Upgrade a provisioned hybrid runtime by running a silent upgrade or through the CLI wizard.  
If you have managed clusters for the hybrid runtime, upgrading the runtime automatically updates runtime components within the managed cluster as well.

> When there are security updates, the UI displays the alert, _At least one runtime requires a security update_. The Version column displays an _Update Required!_ notification.  

> If you have older runtime versions, upgrade to manually define or create the shared configuration repo for your account. See [Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/).


**Before you begin**  
For both silent or CLI-wizard based upgrades, make sure you have:  

* The latest version of the Codefresh CLI  
  Run `cf version` to see your version and [click here](https://github.com/codefresh-io/cli-v2/releases){:target="\_blank"} to compare with the latest CLI version.  
* A valid runtime Git token

**Silent upgrade**  

* Pass the mandatory flags in the upgrade command:  

  `cf runtime upgrade <runtime-name> --git-token <git-token> --silent`
  where:  
  `<git-token>` is a valid runtime token with the `repo` and `admin-repo.hook` scopes.

**CLI wizard-based upgrade**

1. In the Codefresh UI, make sure you are in [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View** or to the **Topology View**.  
1. **List view**:  
  * Select the runtime name.
  * To see all the commits to the runtime, in the Version column, mouse over **Update Available!**, and select **View Complete Change Log**.
  * On the top-right, select **Upgrade**.
  
  {% include
    image.html
  lightbox="true"
  file="/images/runtime/runtime-list-view-upgrade.png"
  url="/images/runtime/runtime-list-view-upgrade.png"
  alt="List View: Upgrade runtime option"
  caption="List View: Upgrade runtime option"
  max-width="30%"
  %}

  **Topology view**:  
  Select the runtime cluster, and from the panel, select the three dots and then select **Upgrade Runtime**.
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtiime-topology-upgrade.png"
 url="/images/runtime/runtiime-topology-upgrade.png"
 alt="Topology View: Upgrade runtime option"
 caption="Topology View: Upgrade runtime option"
  max-width="30%"
%}

{:start="4"}

1. If you have already installed the Codefresh CLI, in the Install Upgrades panel, copy the upgrade command.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/install-upgrades.png"
 url="/images/runtime/install-upgrades.png"
 alt="Upgrade runtime"
 caption="Upgrade runtime panel"
  max-width="30%"
%}  

{:start="5"}
1. In your terminal, paste the command, and do the following:
  * Update the Git token value.
  * To manually define the shared configuration repo, add the `--shared-config-repo` flag with the path to the repo.
1. Confirm to start the upgrade.

#### Uninstall provisioned runtimes

Uninstall provisioned hybrid and hosted runtimes that are not in use.  Uninstall a runtime by running a silent uninstall, or through the CLI wizard.  
> Uninstalling a runtime removes the Git Sources and managed clusters associated with the runtime.

**Before you begin**  
For both types of uninstalls, make sure you have:  

* The latest version of the Codefresh CLI
* A valid runtime Git token
* The Kube context from which to uninstall the provisioned runtime

**Silent uninstall**  
Pass the mandatory flags in the uninstall command:  
  `cf runtime uninstall <runtime-name> --git-token <git-token> --silent`  
  where:  
  `--git-token` is a valid runtime token with the `repo` and `admin-repo.hook` scopes.  

**How to uninstall with the CLI wizard**  

1. In the Codefresh UI, make sure you are in [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View** or to the **Topology View**.
1. **List view**: On the top-right, select the three dots and then select **Uninstall**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/uninstall-location.png"
 url="/images/runtime/uninstall-location.png"
 alt="List View: Uninstall runtime option"
 caption="List View: Uninstall runtime option"
  max-width="30%"
%}

**Topology view**: Select the runtime node, and from the panel, select the three dots and then select **Uninstall Runtime**.
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-topology-uninstall.png"
 url="/images/runtime/runtime-topology-uninstall.png"
 alt="Topology View: Uninstall runtime option"
 caption="Topology View: Uninstall runtime option"
  max-width="30%"
%}

{:start="4"}

1. If you already have the latest version of the Codefresh CLI, in the Uninstall Codefresh Runtime panel, copy the uninstall command.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/uninstall.png"
 url="/images/runtime/uninstall.png"
 alt="Uninstall Codefresh runtime"
 caption="Uninstall Codefresh runtime"
  max-width="40%"
%}

{:start="5"}

1. In your terminal, paste the command, and update the Git token value.
1. Select the Kube context from which to uninstall the runtime, and then confirm the uninstall.
1. If you get errors, run the uninstall command again, with the `--force` flag.


### Related articles
[(Hybrid) Monitoring provisioned runtimes]({{site.baseurl}}/docs/runtime/monitoring-troubleshooting/)  
[Adding Git Sources to runtimes]({{site.baseurl}}/docs/runtime/git-sources/)  
[Adding managed clusters to runtimes]({{site.baseurl}}/docs/runtime/managed-cluster/)  

