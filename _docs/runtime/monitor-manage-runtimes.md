---
title: "Management"
description: ""
group: runtime
toc: true
---


The **Runtimes** page displays the runtimes deployed across your environment, which you can view in List or Topology view formats.
Work in the view mode of your choice to monitor and manage runtimes. 

### Runtime views
View provisioned runtimes in List or Topology view formats.  
* List view: The default view, displays the list of runtimes, the clusters managed by them, and Git Sources.  
* Topology view: Displays a hierarchical view of runtimes and the clusters managed by them, with health and sync status of each cluster. 

To manage and monitor runtimes, see:  
* [Runtime management](#runtime-management)
* [Runtime monitoring](#runtime-monitoring)

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
  max-width="30%" 
%}

Here is a description of the information in the List View. 


{: .table .table-bordered .table-hover}
| List View Item|  Description   |
| --------------          | ---------------- |
|**Name**| The name of the provisioned Codefresh runtime.  |
|**Cluster/Namespace**| The K8s API server endpoint, as well as the namespace with the cluster. |
|**Managed Cluster**| The number of managed clusters if any, for the runtime. To view list of managed clusters, select the runtime, and then the **Managed Clusters** tab.  To work with managed clusters, see [Runtime Management](#runtime-management) in this article.| 
|**Version**| The version of the runtime currently installed. **Update Available!** indicates there are later versions of the runtime. To see all the commits to the runtime, mouse over **Update Available!**, and select **View Complete Change Log**.
|**Last Updated**| The most recent update information from the runtime to the Codefresh platform. Updates are sent to the platform typically every few minutes. Longer update intervals may indicate networking issues.|
|**Sync Status**| The health and sync status of the runtime or cluster.  {::nomarkdown}<br><ul><li> <img src="../../../images/icons/error.png"  display=inline-block> indicates health or sync errors in the runtime, or a managed cluster if one was added to the runtime.</br> The runtime name is colored red.</li> <li><img src="../../../images/icons/cf-sync-status.png"  display=inline-block> indicates that the runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |



#### Topology view
The runtime hierarchy visualization in the Topology view makes it easy to identify key information such as versions, health and sync status, for both the runtime and the clusters managed by it.  
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
|**Runtime**             | ![](../../../images/icons/codefresh-runtime.png?display=inline-block) the provisioned Codefresh runtime. Below is the name of the K8s API server endpoint with the cluster.  |
|**Cluster**              | The local, and managed clusters if any, for the runtime. {::nomarkdown}<ul><li><img src="../../../images/icons/local-cluster.png" display=inline-block/> indicates the local cluster, always displayed as `in-cluster`. The in-cluster server URL is always set to `https://kubernetes.default.svc/`.</li><li><img src="../../../images/icons/managed-cluster.png" display=inline-block/> indicates a managed cluster.</li> <li> <img src="../../../images/icons/add-cluster.png" display=inline-block/> select to add a new managed cluster.</li></ul> {:/} To view cluster components, select the cluster. To add and work with managed clusters, see [Add and manage external clusters]({{site.baseurl}}/docs/runtime/managed-cluster). | 
|**Health/Sync status** |The health and sync status of the runtime or cluster. {::nomarkdown}<ul><li><img src="../../../images/icons/error.png" display="inline-block"> indicates health or sync errors in the runtime, or a managed cluster if one was added to the runtime.</br> The runtime or cluster node is bordered in red and the name is colored red.</li> <li><img src="../../../images/icons/cf-sync-status.png" display=inline-block/> indicates that the runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |
|**Search and View options** | {::nomarkdown}<ul><li>Find a runtime or its clusters by typing part of the runtime/cluster name, and then navigate to the entries found. </li> <li>Topology view options: Resize to window, zoom in, zoom out, full screen view.</li></ul> {:/}|

 
### Runtime management
Work in either the List or Topology views to manage runtimes:
* Add managed clusters to runtimes (see [Managed Clusters]({{site.baseurl}}/docs/runtime/managed-cluster/))
* Manage Git Sources associated with runtimes (see [Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/))
* Upgrade runtimes
* Uninstall runtimes

#### Upgrade runtimes
Upgrade existing runtimes to install critical security updates or to install the latest version of all components. Upgrade by running a silent upgrade or through the CLI wizard.  

> When there are security updates, the UI displays the alert, _At least one runtime requires a security update_. The Version column displays an _Update Required!_ notification.  

>   If you have managed clusters for the runtime, upgrading the runtime automatically updates runtime components within the managed cluster as well.

**Before you begin**  
For both types of upgrades, make sure you have:  

* The latest version of the Codefresh CLI 
* A valid runtime Git token 

**Silent upgrade**  

* Pass the mandatory flags in the upgrade command:  

  `cf runtime upgrade <runtime-name> --git-token <git-token> --silent`   
  where:  
  `<git-token>` is a valid runtime token with the `repo` and `admin-repo.hook` scopes.   

**CLI wizard-based upgrade**   

1. In the Codefresh UI, make sure you are in the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page.
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
1. In your terminal, paste the command, and update the Git token value.
1. Confirm to start the upgrade.
 


#### Uninstall runtimes
Uninstall Codefresh runtimes that are not in use.  Uninstall a runtime by running a silent uninstall, or through the CLI wizard.  
> Uninstalling a runtime removes the Git Sources and managed clusters associated with the runtime.

**Before you begin**  
For both types of uninstalls, make sure you have:  

* The latest version of the Codefresh CLI 
* A valid runtime Git token 
* The Kube context from which to uninstall the runtime

**Silent uninstall**  
Pass the mandatory flags in the uninstall command:  
  `cf runtime uninstall <runtime-name> --context <kube-context> --git-token <git-token> --silent`  
  where:  
  `--context` is the Kube context from which to uninstall the runtime. If not passed, uninstalls the runtime from the current Kube context.  
  `--git-token` is a valid runtime token with the `repo` and `admin-repo.hook` scopes.  

**How to uninstall with the CLI wizard**  

1. In the Codefresh UI, make sure you are in the [Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page.
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

### Runtime monitoring
Monitor runtimes for security, and health and sync errors: 
* Configure browsers to allow access to insecure runtimes
* Monitor notifications in the Activity Log 
  
#### How to configure browser to allow insecure runtimes
If at least one of your runtimes was installed in insecure mode (without an SSL certificate for the ingress controller from a CA), the UI alerts you that _At least one runtime was installed in insecure mode_.
{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-insecure-alert.png" 
	url="/images/runtime/runtime-insecure-alert.png" 
	alt="Insecure runtime installation alert" 
	caption="Insecure runtime installation alert"
  max-width="100%" 
%} 

All you need to do is to configure the browser to trust the URL and receive content.

1. Select **View Runtimes** to the right of the alert.  
  You are taken to the Runtimes page, where you can see insecure runtimes tagged as **Allow Insecure**.
  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-insecure-steps.png" 
	url="/images/runtime/runtime-insecure-steps.png" 
	alt="Insecure runtimes in Runtime page" 
	caption="Insecure runtimes in Runtime page"
  max-width="40%" 
%} 
{:start="2"}
1. For _every_ insecure runtime, select **Allow Insecure**, and when the browser prompts you to allow access, do as relevant:
  * Chrome: Click **Advanced** and then **Proceed to site**.
  * Firefox: Click **Advanced** and then **Accept the risk and continue**.
  * Safari: Click **Show Certificate**, and then select **Always allow content from site**.
  * Edge: Click **Advanced**, and then select **Continue to site(unsafe)**.

#### How to view runtime notifications in Activity Log
The Activity Log is a quick way to monitor notifications for runtime events such as upgrades. A pull-down panel in the Codefresh toolbar, the Activity Log shows ongoing, success, and error notifications, sorted by date, starting with today's date. 

1. In the Codefresh UI, on the top-right of the toolbar, select ![](/images/pipeline/monitoring/pipeline-activity-log-toolbar.png?display=inline-block) **Activity Log**.
1. To see runtime notifications, filter by **Runtime**.

  {% include image.html 
  lightbox="true" 
  file="/images/runtime/runtime-activity-log.png" 
  url="/images/runtime/runtime-activity-log.png"
  alt="Activity Log filtered by Runtime events"
  caption="Activity Log filtered by Runtime events"
  max-width="30%"
  %}

{:start="3"}
1. To see more information on an error, select the **+** sign.

#### Troubleshoot health and sync errors 
The ![](/images/icons/error.png?display=inline-block) icon with the runtime in red indicates either health or sync errors. 

**Health errors**  
Health errors are generated by Argo CD and by Codefresh for runtime components. 


**Sync errors**  
Runtimes with sync errors display an **Out of sync** status in Sync Status column. They are related to discrepancies between the desired and actual state of a runtime component or one of the Git sources associated with the runtime.  

**View errors**  
For both views, select the runtime, and then select **Errors Detected**.  
Here is an example of health errors for a runtime.

    {% include image.html 
  lightbox="true" 
  file="/images/runtime/runtime-health-sync-errors.png" 
  url="/images/runtime/runtime-health-sync-errors.png"
  alt="Health errors for runtime example"
  caption="Health errors for runtime example"
  max-width="30%"
  %}

### What to read next
[Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/)  
[Managed clusters]({{site.baseurl}}/docs/runtime/managed-cluster/)