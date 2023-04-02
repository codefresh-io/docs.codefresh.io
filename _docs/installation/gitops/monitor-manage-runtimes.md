---
title: "Managing & monitoring GitOps Runtimes"
description: "Optimize GitOps Runtimes"
group: runtime
sub_group: gitops
redirect_from:
  - /monitor-manage-runtimes/
  - /monitor-manage-runtimes  
toc: true
---


The **Runtimes** page displays the provisioned GitOps Runtimes in your account, both Hybrid, and the Hosted Runtime if you have one.  

View Runtime components and information in List or Topology view formats to manage and monitor them.   

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="70%"
%}

Manage provisioned GitOps Runtimes: 
* [Add managed clusters to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)
* [Add and manage Git Sources for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)
* [Upgrade GitOps CLI]({{site.baseurl}}/docs/installation/gitops/upgrade-gitops-cli/)
* Upgrade Hybrid GitOps Runtimes
* Uninstall GitOps Runtimes
<!---* [Migrate ingress-less hybrid runtimes](#hybrid-migrate-ingress-less-runtimes)--> 


Monitor provisioned GitOps Runtimes for security, health, and sync errors:

* (Hybrid and Hosted) View/download logs for Runtimes and for Runtime components
* (Hybrid) Restore provisioned Runtimes
* (Hybrid) Configure browsers to allow access to insecure Runtimes
* (Hybrid) Monitor notifications in the Activity Log


> Unless specified otherwise, all options are common to both types of GitOps Runtimes. If an option is valid only for Hybrid GitOps, it is indicated as such.


## GitOps Runtime views

View provisioned GitOps Runtimes in List or Topology view formats.  

* List view: The default view, displays the list of provisioned Runtimes, the clusters managed by them, and Git Sources associated with them.
* Topology view: Displays a hierarchical view of Runtimes and the clusters managed by them, with health and sync status of each cluster.

### List view

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

Here is a description of the information in the List View.

{: .table .table-bordered .table-hover}
| List View Item|  Description   |
| --------------          | ---------------- |
|**Name**| The name of the provisioned GitOps Runtime.  |
|**Type**| The type of GitOps Runtime provisioned, and can be **Hybrid** or **Hosted**.  |
|**Cluster/Namespace**| The K8s API server endpoint, as well as the namespace with the cluster. |
|**Modules**| The modules installed based on the type of provisioned Runtime. Hybrid Runtimes include CI amnd CD Ops modules. Hosted runtimes include CD Ops.   |
|**Managed Cluster**| The number of managed clusters if any, for the runtime. To view list of managed clusters, select the runtime, and then the **Managed Clusters** tab.  To work with managed clusters, see [Adding external clusters to runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).|
|**Version**| The version of the runtime currently installed. **Update Available!** indicates there are later versions of the runtime. To see all the commits to the runtime, mouse over **Update Available!**, and select **View Complete Change Log**.
|**Last Updated**| The most recent update information from the runtime to the Codefresh platform. Updates are sent to the platform typically every few minutes. Longer update intervals may indicate networking issues.|
|**Sync Status**| The health and sync status of the runtime or cluster.  {::nomarkdown}<br><ul><li> <img src="../../../../images/icons/error.png"  display=inline-block> indicates health or sync errors in the runtime, or a managed cluster if one was added to the runtime.</br> The runtime name is colored red.</li> <li><img src="../../../../images/icons/cf-sync-status.png"  display=inline-block> indicates that the runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |

### Topology view

A hierachical visualization of the provisioned Runtimes. The Topology view makes it easy to identify key information such as versions, health and sync status, for both the provisioned Runtime and the clusters managed by it.  
Here is an example of the Topology view for Runtimes.
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-topology-view.png"
 url="/images/runtime/runtime-topology-view.png"
 alt="Runtime Topology View"
 caption="Runtime Topology View"
  max-width="60%"
%}

Here is a description of the information in the Topology view.

{: .table .table-bordered .table-hover}
| Topology View Item      | Description   |
| ------------------------| ---------------- |
|**Runtime**             | ![](../../../../images/icons/codefresh-runtime.png?display=inline-block) the provisioned Runtime. Hybrid Runtimes display the name of the K8s API server endpoint with the cluster. Hosted Runtimes display 'hosted'.  |
|**Cluster**              | The local, and managed clusters if any, for the Runtime. {::nomarkdown}<ul><li><img src="../../../../images/icons/local-cluster.png" display=inline-block/> indicates the local cluster, always displayed as `in-cluster`. The in-cluster server URL is always set to `https://kubernetes.default.svc/`.</li><li><img src="../../../../images/icons/managed-cluster.png" display=inline-block/> indicates a managed cluster.</li> <li> <img src="../../../../images/icons/add-cluster.png" display=inline-block/> select to add a new managed cluster.</li></ul> {:/} To view cluster components, select the cluster. To add and work with managed clusters, see [Adding external clusters to runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster). |
|**Health/Sync status** |The health and sync status of the Runtime or cluster. {::nomarkdown}<ul><li><img src="../../../../images/icons/error.png" display="inline-block"> indicates health or sync errors in the Runtime, or a managed cluster if one was added to the runtime.</br> The runtime or cluster node is bordered in red and the name is colored red.</li> <li><img src="../../../../images/icons/cf-sync-status.png" display=inline-block/> indicates that the Runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |
|**Search and View options** | {::nomarkdown}<ul><li>Find a Runtime or its clusters by typing part of the Runtime/cluster name, and then navigate to the entries found. </li> <li>Topology view options: Resize to window, zoom in, zoom out, full screen view.</li></ul> {:/}|

## Managing provisioned GitOps Runtimes
* [Reset shared configuration repository for GitOps Runtimes](#reset-shared-configuration-repository-for-gitops-runtimes)
* [(Hybrid GitOps) Upgrade provisioned Runtimes](#hybrid-gitops-upgrade-provisioned-runtimes)
* [Uninstall provisioned GitOps Runtimes](#uninstall-provisioned-gitops-runtimes)
* [Update Git tokens for GitOps Runtimes](#update-git-tokens-for-runtimes)

### Reset shared configuration repository for GitOps Runtimes
Codefresh creates the [shared configuration repository]({{site.baseurl}}/docs/reference/shared-configuration) when you install the first hybrid or hosted GitOps runtime for your account, and uses it for all runtimes you add to the same account.

If needed, you can reset the location of the shared configuration repository in your account and re-initialize it. For example, when moving from evaluation to production.  
Uninstall all the existing runtimes in your account, and then run the reset command. On the next installation, Codefresh re-initializes the shared configuration repo.

**Before you begin**   
[Uninstall every runtime in the account](#uninstall-provisioned-gitops-runtimes)

**How to**  
* Run:  
  `cf config --reset-shared-config-repo`


### (Hybrid GitOps) Upgrade provisioned Runtimes

Upgrade provisioned Hybrid Runtimes to install critical security updates or the latest versions of all components. Upgrade a provisioned Hybrid Runtime by running a silent upgrade or through the GitOps CLI wizard.  
If you have managed clusters for Hybrid GitOps, upgrading the Runtime automatically updates runtime components within the managed cluster as well.

> When there are security updates, the UI displays the alert, _At least one runtime requires a security update_. The Version column displays an _Update Required!_ notification.  

> If you have older Hybrid Runtime versions, upgrade to manually define or create the shared configuration repo for your account. See [Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/).


**Before you begin**  
For both silent or CLI-wizard based upgrades, make sure you have:  

* The latest version of the Codefresh CLI   
* A valid Git token with [the required scopes]({{site.baseurl}}/docs/reference/git-tokens) 

**Silent upgrade**  

* Pass the mandatory flags in the upgrade command:  

  `cf runtime upgrade <runtime-name> --git-token <git-token> --silent`
  where:  
  `<git-token>` is a valid Git token with the correct scopes.

**CLI wizard-based upgrade**

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, expand Runtimes in the sidebar, and select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View** or to the **Topology View**.  
1. **List view**:  
  * Select the Runtime name.
  * To see all the commits to the Runtime, in the Version column, mouse over **Update Available!**, and select **View Complete Change Log**.
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
  Select the Runtime cluster, and from the panel, select the three dots and then select **Upgrade Runtime**.
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

1. If you have already installed the GitOps CLI, in the Install Upgrades panel, copy the upgrade command.

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





<!---### (Hybrid) Migrate ingress-less runtimes
To migrate an ingress-less runtime to an ingress-based one, you must uninstall the ingress-less runtime and then install a runtime with an ingress controller. 
You can retain the installation repo used to install the ingress-less runtime. Though empty after uninstalling the ingress-less The new installation creates the new manifests in this re


>Before uninstalling the ingress-less runtime, you can save specific patches in a temporary location or retrieve the same from the Git history, and re-apply them after installing the ingress-based runtime.

**Before you begin**  
* Make sure the ingress controller for the new runtime meets [requirements and is configured as needed]({{site.baseurl}}/docs/runtime/requirements/)

**How to**  
1. Uninstall the ingress-less runtime, as described in [Uninstall provisioned runtimes](#uninstall-provisioned-runtimes) in this article.
2. Install the new ingress-based runtime, as described in [Install hybrid runtimes]({{site.baseurl}}/docs/runtime/installation/).

--->
### Uninstall provisioned GitOps Runtimes

Uninstall provisioned GitOps Runtimes that are not in use, through a silent uninstall or through the GitOps CLI wizard.  
> Uninstalling a Runtime removes the Git Sources and managed clusters associated with it.

**Before you begin**  
For both types of uninstalls, make sure you have:  

* The latest version of the GitOps CLI
* A valid runtime Git token
* The Kube context from which to uninstall the provisioned Runtime

**Silent uninstall**  
Pass the mandatory flags in the uninstall command:  
  `cf runtime uninstall <runtime-name> --git-token <git-token> --silent`  
  where:  
  `--git-token` is a valid runtime token with the `repo` and `admin-repo.hook` scopes.  

**GitOps CLI wizard uninstall**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View** or to the **Topology View**.
1. **List view**: To the right of the runtime to delete, select the three dots and then select **Uninstall**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/uninstall-location.png"
 url="/images/runtime/uninstall-location.png"
 alt="List View: Uninstall runtime option"
 caption="List View: Uninstall runtime option"
  max-width="30%"
%}

**Topology view**: Select the Runtime node, and from the panel, select the three dots and then select **Uninstall Runtime**.
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

1. If you already have the latest version of the GitOps CLI, in the Uninstall Codefresh Runtime panel, copy the uninstall command.

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
1. Select the Kube context from which to uninstall the Runtime, and then confirm the uninstall.
1. If you get errors, run the uninstall command again, with the `--force` flag.



### Update Git tokens for Runtimes

Provisioned Runtimes require valid Git tokens at all times to authenticate Git actions by you as a user.  
>These tokens are specific to the user, and the same can be used for multiple runtimes.

There are two different situations when you need to update Git tokens:  
* Invalid, revoked, or expired tokens: Codefresh automatically flags Runtimes with such tokens. It is mandatory to update the Git tokens to continue working with the platform. 
* Valid tokens: Optional. You may want to update Git tokens, even valid ones, by deleting the existing token and replacing it with a new token.

The methods for updating any Git token are the same regardless of the reason for the update:  
* OAuth2 authorization, if your admin has registered an OAuth Application for Codefresh
* Git access token authentication, by generating a personal access token in your Git provider account with the correct scopes

**Before you begin**  
* To authenticate through a Git access token, make sure your token is valid and has [the required scopes]({{site.baseurl}}/docs/reference/git-tokens) 

**How to**
1. Do one of the following:
  * If you see a notification in the Codefresh UI about invalid Runtime tokens,  click **[Update Token]**.
    The GitOps Runtimes page shows runtimes with invalid tokens prefixed by the key icon. Mouse over shows invalid token.
  * To update an existing token, go to [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Select the GitOps Runtime for which to update the Git token.
1. From the context menu at the right, select **Update Git Runtime Credentials**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/update-git-runtime-token.png"
 url="/images/runtime/update-git-runtime-token.png"
 alt="Update Git runtime token option"
 caption="Update Git runtime token option"
  max-width="40%"
%}

{:start="4"}
1. Do one of the following: 
  * If your admin has set up OAuth access, click **Authorize Access to Git Provider**. Go to _step 5_.
  * Alternatively, authenticate with an access token from your Git provider. Go to _step 6_.

{:start="5"}  
1. For OAuth2 authorization:
  > If the application is not registered, you get an error. Contact your admin for help.  
  * Enter your credentials, and select **Sign In**.
  * If required, as for example if two-factor authentication is configured, complete the verification. 

    {% include 
      image.html 
      lightbox="true" 
      file="/images/administration/user-settings/oauth-user-authentication.png" 
      url="/images/administration/user-settings/oauth-user-authentication.png" 
      alt="Authorizing access with OAuth2" 
      caption="Authorizing access with OAuth2"
      max-width="30%" 
   %}

{:start="6"} 
1. For Git token authentication, expand **Advanced authorization options**, and then paste the generated token in the **Git runtime token** field.

1. Click **Update Token**.

## Monitoring GitOps Runtimes
* [View/download logs to troubleshoot Runtimes](#viewdownload-logs-to-troubleshoot-runtimes)
* [(Hybrid GitOps) Restoring provisioned Runtimes](#hybrid-gitops-restoring-provisioned-runtimes)
* [(Hybrid GitOps) Troubleshoot communication problems](#hybrid-gitops-troubleshoot-communication-problems)
* [(Hybrid GitOps) View notifications in Activity Log](#hybrid-gitops-view-notifications-in-activity-log)
* [(Hybrid GitOps) Troubleshoot health and sync errors for Runtimes](#hybrid-gitops-troubleshoot-health-and-sync-errors-for-runtimes)

### View/download logs to troubleshoot GitOps Runtimes
Logs are available for completed Runtimes, both for the runtime and for individual runtime components. Download log files for offline viewing and analysis, or view online logs for a Runtime component, and download if needed for offline analysis. Online logs support free-text search, search-result navigation, and line-wrap for enhanced readability.  

Log files include events from the date of the application launch, with the newest events listed first. 

{::nomarkdown}
<br><br>
{:/}

#### Download logs for GitOps Runtimes
Download the log file for a Runtime. The Runtime log is downloaded as a `.tar.gz` file, which contains the individual log files for each runtime component. 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, expand Runtimes in the sidebar, and select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. If needed, switch to **List View**, and then select the runtime for which to download logs.
1.  From the context menu, select **Download All Logs**.  
  The log file is downloaded to the Downloads folder or the folder designated for downloads, with the filename, `<runtime-name>.tar.gz`. For example, `codefreshv2-production2.tar.gz`.


  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-download-all.png" 
	url="/images/runtime/runtime-logs-download-all.png" 
	alt="Download logs for selected runtime" 
	caption="Download logs for selected runtime"
    max-width="40%" 
%}


{:start="4"}
1. To view the log files of the individual components, unzip the file.  
  Here is an example of the folder with the individual logs.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-folder-view.png" 
	url="/images/runtime/runtime-logs-folder-view.png" 
	alt="Individual log files in folder" 
	caption="Individual log files in folder"
    max-width="50%" 
%}

{:start="5"}
1. Open a log file with the text editor of your choice.

{::nomarkdown}
<br><br>
{:/}

#### View/download logs for Runtime components
View online logs for any Runtime component, and if needed, download the log file for offline viewing and analysis.  

Online logs show up to 1000 of the most recent events (lines), updated in real time. Downloaded logs include all the events, from the application launch to the date and time of download. 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, expand Runtimes in the sidebar, and select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. If needed, switch to **List View**, and then select the Runtime.
1. Select the Runtime component and then select **View Logs**. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-view-component.png" 
	url="/images/runtime/runtime-logs-view-component.png" 
	alt="View log option for individual runtime component" 
	caption="View log option for individual runtime component"
    max-width="40%" 
%}


{:start="4"}
1. Do the following:
  * Search by free-text for any string, and click the next and previous buttons to navigate between the search results.
  * To switch on line-wrap for readability, click **Wrap**.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/runtime-logs-screen-view.png" 
	url="/images/runtime/runtime-logs-screen-view.png" 
	alt="Online log example for runtime component" 
	caption="Online log example for runtime component"
    max-width="50%" 
%}

{:start="5"}
1. To download the log, click **Download**.  
  The file is downloaded as `<component-name>.log`.

### (Hybrid GitOps) Restoring provisioned Runtimes

In case of cluster failure, restore the provisioned Hybrid Runtime from the existing runtime installation repository.  
For partial or complete cluster failures, you can restore the Runtime to either the failed cluster or to a different cluster.  
Restoring the provisioned Runtime reinstalls it, leveraging the resources in the existing Runtime repo.

Restoring the runtime:
* Applies `argo-cd` from the installation manifests in your repo to your cluster
* Associates `argo-cd` with the existing installation repo
* Applies the Runtime and `argo-cd` secrets to the cluster
* Updates the Runtime config map (`<runtime-name>.yaml` in the `bootstrap` directory) with the new cluster configuration for these fields:  
  `cluster`  
  `ingressClassName`  
  `ingressController`  
  `ingressHost` 

{::nomarkdown}
<br><br>
{:/}

#### Restore a Hybrid Runtime
Reinstall the Hybrid Runtime from the existing installation repository to restore it to the same or a different cluster.  

**Before you begin**

* Have the following information handy: 
  > All values must be the identical to the Runtime to be restored. 
  * Runtime name
  * Repository URL
  * Codefresh context
  * Kube context: Required if you are restoring to the same cluster

**How to**

1. Run:  
  `cf runtime install --from-repo`
1. Provide the relevant values when prompted.
1. If you are performing the runtime recovery in a different cluster, verify the ingress resource configuration for `app-proxy`, `workflows`, and `default-git-source`.  
  If the health status remains as `Progressing`, do the following:
  
    * In the Runtime installation repo, check if the `ingress.yaml` files for the `app-proxy` and `workflows` are configured with the correct `host` and `ingressClassName`:  

      `apps/app-proxy/overlays/<runtime-name>/ingress.yaml`  
      `apps/workflows/overlays/<runtime-name>/ingress.yaml`  

    * In the Git Source repository, check the `host` and `ingressClassName` in `cdp-default-git-source.ingress.yaml`: 

       `resources_<runtime-name>/cdp-default-git-source.ingress.yaml`  
    
    See the [example](#ingress-example) below. 

{:start="4"}
1. If you have managed clusters registered to the hybrid runtime you are restoring, reconnect them.  
  Run the command and follow the instructions in the wizard:  
  `cf cluster add`

1. Verify that you have a registered Git integration:  
  `cf integration git list --runtime <runtime-name>`  

1. If needed, create a new Git integration:  
  `cf integration git add default --runtime <runtime-name> --provider github --api-url https://api.github.com` 

{::nomarkdown}
<br><br>
{:/}

#### Ingress example
This is an example of the `ingress.yaml` for `workflows`.

 ```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    ingress.kubernetes.io/protocol: https
    ingress.kubernetes.io/rewrite-target: /$2
    nginx.ingress.kubernetes.io/backend-protocol: https
    nginx.ingress.kubernetes.io/rewrite-target: /$2
  creationTimestamp: null
  name: runtime-name-workflows-ingress
  namespace: runtime-name
spec:
  ingressClassName: nginx
  rules:
  - host: your-ingress-host.com
    http:
      paths:
      - backend:
          service:
            name: argo-server
            port:
              number: 2746
        path: /workflows(/|$)(.*)
        pathType: ImplementationSpecific
status:
  loadBalancer: {}
```


### (Hybrid GitOps) Troubleshoot communication problems

A notification _Unable to communicate with a <runtime_name>_ or _Unable to communicate with two or more runtimes_ indicates a communication problem.

Refer to our [troubleshooting section]({{site.baseurl}}/docs/troubleshooting/runtime-issues/#unable-to-communicate-with-runtime-name-or-two-or-more-runtimes) for a list of possible causes and the corresponding corrective actions. 


### (Hybrid GitOps) View notifications in Activity Log

The Activity Log is a quick way to monitor notifications for Runtime events such as upgrades. A pull-down panel in the Codefresh toolbar, the Activity Log shows ongoing, success, and error notifications, sorted by date, starting with today's date.

1. In the Codefresh UI, on the top-right of the toolbar, select  **Activity Log**.
1. To see notifications for provisioned Runtimes, filter by **Runtime**.


  <!--- ask dev for help -->
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

### (Hybrid GitOps) Troubleshoot health and sync errors for Runtimes
The ![](/images/icons/error.png?display=inline-block) icon with the Runtime in red indicates either health or sync errors.

**Health errors**  
Health errors are generated by Argo CD and by Codefresh for Runtime components.

**Sync errors**  
Runtimes with sync errors display an **Out of sync** status in Sync Status column. They are related to discrepancies between the desired and actual state of a Runtime component or one of the Git sources associated with the Runtime.  

**View errors**  
For both views, select the Runtime, and then select **Errors Detected**.  
Here is an example of health errors for a Runtime.
  <!--- ask dev for help -->
    {% include image.html 
  lightbox="true"
  file="/images/runtime/runtime-health-sync-errors.png"
  url="/images/runtime/runtime-health-sync-errors.png"
  alt="Health errors for runtime example"
  caption="Health errors for runtime example"
  max-width="30%"
  %}


## Related articles
[Add Git Sources to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Add external clusters to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  
[Shared configuration repo for GitOps Runtimes]({{site.baseurl}}/docs/reference/shared-configuration)  


