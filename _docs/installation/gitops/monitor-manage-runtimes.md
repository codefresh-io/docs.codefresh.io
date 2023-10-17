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

View Runtime components and information in [List or Topology view formats](/#gitops-runtime-views), to manage and monitor them.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="80%"
%}



<!--- Manage and monitor provisioned GitOps Runtimes:
* [Add managed clusters to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)
* [Add and manage Git Sources for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)
* [Configure SSH for GitOps runtimes](#configure-ssh-for-gitops-runtimes)
* [(Hybrid GitOps) Configure Deep Links to applications/resources](#hybrid-gitops-configure-deep-links-to-applications--resources)
* [Reset shared configuration repository for GitOps Runtimes](#reset-shared-configuration-repository-for-gitops-runtimes)
* [(Hybrid GitOps) Upgrade GitOps Runtimes](#hybrid-gitops-upgrade-gitops-runtimes)
* [Remove GitOps Runtimes](#hybrid-gitops-remove-gitops-runtimes)
* [Uninstall GitOps Runtimes](#uninstall-gitops-runtimes)
* [Update Git credentials for GitOps Runtimes](#update-git-credentials-for-gitops-runtimes)
* [View/download logs to troubleshoot Runtimes](#viewdownload-logs-to-troubleshoot-runtimes)
* [(Hybrid GitOps - Legacy only) Restoring provisioned Runtimes](#hybrid-gitops-restoring-provisioned-runtimes)
* [(Hybrid GitOps) Troubleshoot communication problems](#hybrid-gitops-troubleshoot-communication-problems)
* [(Hybrid GitOps) View notifications in Activity Log](#hybrid-gitops-view-notifications-in-activity-log) -->


> **TIP**:
>Unless specified otherwise, all options are common to both types of GitOps Runtimes. If an option is valid only for Hybrid GitOps, it is indicated as such.

>**WARNING**:
Do not change the ArgoCD password by logging into the ArgoCD UI with the `argocd-initial-admin-secret`.
Changing the ArgoCD password can result in system instability, and disrupt the proper functioning of the Codefresh platform.




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
|**Name**| The name of the provisioned GitOps Runtime.<br>Hybrid GitOps Runtimes installed with Helm show the status as either Online (green dot) or Offline (red dot).  |
|**Type**| The type of GitOps Runtime provisioned, and can be either **Hosted**, **Helm**, or **CLI** for legacy Hybrid GitOps Runtimes.  |
|**Cluster/Namespace**| The K8s API server endpoint, as well as the namespace with the cluster. |
|**Modules**| The modules installed based on the type of provisioned Runtime. Hybrid GitOps (both Helm and CLI) Runtimes include CI and CD Ops modules. Hosted runtimes include CD Ops.   |
|**Managed Cluster**| The number of managed clusters, if any, registered with the GitOps Runtime. To view list of managed clusters, click the runtime name, and then the **Managed Clusters** tab.  To work with managed clusters, see [Adding external clusters to runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).|
|**Version**| The version of the Runtime currently installed (CLI installations), including the version of the Helm chart (Helm installations) . **Update Available!** indicates there are newer versions of the Runtime or Helm chart. To see all the commits, mouse over **Update Available!**, and select **View Complete Change Log**.
|**Last Updated**| The most recent update information from the runtime to the Codefresh platform. Updates are sent to the platform typically every few minutes. Longer update intervals may indicate networking issues.|
|**Sync Status**| The sync status of the GitOps Runtime. The sync status is displayed only when you have completed installation and configured the GitOps Runtime as an Argo Application. {::nomarkdown}<ul><li> <img src="../../../../images/icons/runtime-synced.png"  display=inline-block> <b>Synced</b></li> <li><img src="../../../../images/icons/runtime-syncing.png"  display=inline-block> <b>Syncing</b>.</li><li><img src="../../../../images/icons/runtime-out-of-sync.png"  display=inline-block> <b>Out-of-sync</b>.</li><li><b>N/A</b>: Codefresh could not get the sync status. This could be because the Runtime is not configured as an Argo application.</li><li><b>Complete Installation</b>: Git credentials are not configured for the Runtime. Click the three-dot context menu and select <b>Update Git Runtime Credentials</b>. See [Update Git credentials for GitOps Runtimes](#update-git-credentials-for-gitops-runtimes).</li>  </ul> {:/} |
|**Actions** | The possible actions to manage the selected runtime.{::nomarkdown}<ul><li> <b>Upgrade</b>: Upgrade to the latest version. See <a href="https://codefresh.io/docs/docs/installation/gitops/monitor-manage-runtimes/#upgrade-gitops-runtimes">Upgrade GitOps Runtimes</a></li> <li><b>Download All Logs</b>: Valid only for _legacy_ Hybrid GitOps Runtimes.<br>Download logs for the Runtime or for its components. See <a href="https://codefresh.io/docs/docs/installation/gitops/monitor-manage-runtimes/#viewdownload-logs-to-troubleshoot-gitops-runtimes">View/download logs for GitOps Runtimes</a></li><li><b>Update Git Runtime Credentials</b>: Update Git token for Runtime. See </li><li><b>Remove Runtime</b>: Available only when the runtime is Offline. <br>Remove the runtime from Codefresh. The runtime remains on the cluster. See <a href="https://codefresh.io/docs/docs/installation/gitops/monitor-manage-runtimes/#remove-gitops-runtimes">Remove GitOps Runtimes</a>. </li><li><b>Uninstall Runtime</b>: Uninstall the runtime from the cluster on which it is provisioned. See <a href="https://codefresh.io/docs/docs/installation/gitops/monitor-manage-runtimes/#uninstall-gitops-runtimes">Uninstall GitOps Runtimes</a></li> </ul> {:/}


### Topology view

A hierachical visualization of the provisioned GitOps Runtimes. The Topology view makes it easy to identify key information such as versions, health and sync status, for both the provisioned Runtime and the clusters managed by it.
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

Here is a description of the information in the Topology view.

{: .table .table-bordered .table-hover}
| Topology View Item      | Description   |
| ------------------------| ---------------- |
|**Runtime**             | ![](../../../../images/icons/runtime-topology-name.png?display=inline-block) the provisioned Runtime. <br>Hybrid Runtimes display the name of the K8s API server endpoint with the cluster. <br>Hosted Runtimes display 'Codefresh hosted'.  |
|**Cluster**              | The local, and managed clusters if any, for the Runtime. {::nomarkdown}<ul><li><img src="../../../../images/icons/runtime-topology-in-cluster.png" display=inline-block/> indicates the local cluster, always displayed as `in-cluster`. The in-cluster server URL is always set to `https://kubernetes.default.svc/`.</li><li><img src="../../../../images/icons/runtime-topology-managed-cluster.png" display=inline-block/> indicates a managed cluster.</li> <li> <img src="../../../../images/icons/runtime-topology-add-cluster.png" display=inline-block/> select to add a new managed cluster.</li></ul> {:/} To view cluster components, select the cluster. To add and work with managed clusters, see [Add external clusters to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster). |
|**Health/Sync status** |The health and sync status of the Runtime or cluster. {::nomarkdown}<ul><li><img src="../../../../images/icons/error.png" display="inline-block"> indicates health or sync errors in the Runtime, or a managed cluster if one was added to the runtime.</br> The runtime or cluster node is bordered in red and the name is colored red.</li> <li><img src="../../../../images/icons/cf-sync-status.png" display=inline-block/> indicates that the Runtime is being synced to the cluster on which it is provisioned.</li></ul> {:/} |
|**Search and View options** | {::nomarkdown}<ul><li>Find a Runtime or its clusters by typing part of the Runtime/cluster name, and then navigate to the entries found. </li> <li>Topology view options: Resize to window, zoom in, zoom out, full screen view.</li></ul> {:/}|

## (Helm Hybrid GitOps) Upgrade GitOps Runtimes

Upgrade provisioned Hybrid GitOps Runtimes to install critical security updates, get new functionality, and the latest versions of all components.
The upgrade procedure differs depending on whether the GitOps Runtime has been configured as an Argo CD application or not:
* Argo CD GitOps Runtimes: For Runtimes configured as Argo CD applications, you need to manually update the version in the Helm chart located in the Shared Configuration Repository.
* Non-Argo CD GitOps Runtimes: Run the upgrade command.  

If you have managed clusters for Hybrid GitOps Runtimes, upgrading the Runtime automatically updates runtime components within the managed cluster as well.

>The `Update Available! Notification` in the List View's Version column indicates that a newer version of the Runtime, Helm chart, or both are available.


1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View** or to the **Topology View**.
1. **List view**:
    1. To see all the commits to the Runtime, in the Version column, mouse over **Update Available!**, and select **View Complete Change Log**.
    1. Do one of the following:
        * To the right of the row with the Runtime to upgrade, click the context menu and select **Upgrade**.
        * Click the Runtime name, and then click **Upgrade** on the top-right.

  {% include
    image.html
  lightbox="true"
  file="/images/runtime/runtime-list-view-upgrade.png"
  url="/images/runtime/runtime-list-view-upgrade.png"
  alt="List View: Upgrade runtime option"
  caption="List View: Upgrade runtime option"
  max-width="80%"
  %}

  **Topology view**:
  Click the Runtime cluster, and from the panel, click the context menu, and then select **Upgrade Runtime**.
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtiime-topology-upgrade.png"
 url="/images/runtime/runtiime-topology-upgrade.png"
 alt="Topology View: Upgrade runtime option"
 caption="Topology View: Upgrade runtime option"
  max-width="50%"
%}

{:start="5"}
1. Do one of the following depending on whether you have configured the Runtime as an Argo CD Application or not:
  * Argo CDGitOps Runtimes:Continue from step _6_.
  * Non-Argo CD GitOps Runtimes: Continue from step _7_.
1. For GitOps Runtimes, do the following:
    1. In your Shared Configuration Repository, go to `resources/<runtime_name>/chart`
       where, `<runtime_name>` is the name of the Hybrid GitOps Runtime to upgrade.
    1. In the `chart.yaml`, change the version number in both `.version` and `.dependencies.version`.
    1. Commit the change, and push to your Git server.
```yaml
apiVersion: v2
appVersion: 1.0.0
description: Codefresh gitops runtime umbrella chart
name: codefresh-gitops-runtime
version: <version>
dependencies:
  - name: gitops-runtime
    repository: https://chartmuseum.codefresh.io/gitops-runtime
    version: <version>
```
1. For non-GitOps Runtimes, do the following:
    1. Copy and run the upgrade command:
        `RELEASE_NAME=$(helm ls -n codefresh-gitops-runtime -q) && helm upgrade ${RELEASE_NAME} -n codefresh-gitops-runtime`
    1. To exit the upgrade panel, click **Close**.

## Update Git credentials for GitOps Runtimes

Provisioned GitOps Runtimes require valid Git Runtime tokens at all times to authenticate and authorize the Runtime.
The Git Runtime token differs from the Git user token which is a personal access token unique to each user. As such, you can use the same Git Runtime token for multiple Runtimes.

>**TIP**:
Git credentials are synced to the Shared Configuration Repository defined during installation. If you change your Git credentials, the Git account must match that of the Shared repo. For example, if the Shared repo is defined as `http://github.com/my-org/isc.git` and the Git provider is defined  as `bitbucket`, the update will fail.

**When to update**
If your Git Runtime token is valid, you can update it at any time by deleting the existing token and replacing it with a new token.

Otherwise, you have to update Git tokens in the following situations:
* **Complete Installation** status displayed in Sync column for Runtime<br>
  You have installed the Runtime but need to update the Git credentials to complete the installation.
* Invalid, revoked, or expired tokens<br>
  Codefresh automatically flags Runtimes with such tokens. It is mandatory to update the Git tokens to continue working with the platform.

**Update methods**<br>
The methods for updating any Git token are the same regardless of the reason for the update:
* OAuth2 authorization, if your admin has registered an OAuth Application for Codefresh.
* Git access token authentication, by generating a Git Runtime token in your Git provider account with the correct scopes.
  You can update your Git Runtime token in the UI or through the CLI.

### Update Git Runtime credentials in Codefresh UI

**Before you begin**
* To authenticate through a Git Runtime token, make sure your token is valid and has [the required scopes]({{site.baseurl}}//docs/reference/git-tokens/#git-runtime-token-scopes)

**How to**
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View**.
1. Do one of the following:
  * To the right of the row with the Runtime to update, click the context menu and select **Update Git Runtime Credentials**.
  * Click the Runtime name, click the context-menu on the top-right, and then select **Update Git Runtime Credentials**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/update-git-runtime-token.png"
 url="/images/runtime/update-git-runtime-token.png"
 alt="Update Git Runtime credentials"
 caption="Update Git Runtime credentials"
  max-width="60%"
%}

{:start="5"}
1. Do one of the following:
  * If your admin has set up OAuth access, click **Authorize Access to Git Provider**. Go to _step 6_.
  * Alternatively, authenticate with an access token from your Git provider. Go to _step 7_.

{:start="6"}
1. For OAuth2 authorization:
  >**NOTE**:
  >If the application is not registered, you get an error. Contact your admin for help.

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

{:start="7"}
1. For Git token authentication, paste the generated token in the **Git runtime token** field.
1. Click **Update Credentials**.

### Update Git Runtime token through CLI
If you are using Git Runtime tokens for authentication, you can also update them through the Codefresh CLI.

* Run:
  `cf config update-gitops-settings --shared-config-repo <repo_url> [--git-provider <git-provider>] [--git-api-url <git-api-url>]`

  where:
  * `<repo_url>` is required, and is the URL of the Shared Configuration Repository, and must match the Git provider.
  * `--git-provider` is optional for cloud providers as Codefresh identifies the provider through the Shared repo URL. Required for on-premises providers, and can be one of the following:
      * GitHub and GitHub Enterprise: `github`
      * GitLab Cloud and GitLab Server: `gitlab`
      * Bitbucket Cloud: `bitbucket`
      * Bitbucket Server: `bitbucket-server`
  * `--git-api-url` is optional for all Git providers, including on-premises repo clones.



## Configure SSH for GitOps Runtimes
By default, Git repositories use the HTTPS protocol. You can also use SSH to connect Git repositories by entering the SSH private key.

>**NOTE**:
When SSH is configured for a GitOps Runtime, when creating/editing Git-Source applications, you can select HTTPS OR SSH as the protocol to connect to the Git repository. See [Repository URL in Application Source definitions]({{site.baseurl}}/docs/deployments/gitops/create-application/#source).

**SSH keys**
For more information on generating SSH private keys, see the official documentation:
* [GitHub](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent){:target="\_blank"}
* [GitLab](https://docs.gitlab.com/ee/ssh/#generating-a-new-ssh-key-pair){:target="\_blank"}
* [Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html){:target="\_blank"}
* [Azure](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page){:target="\_blank"}
* [Gerrit](http://ec2-52-87-125-161.compute-1.amazonaws.com:8080/Documentation/user-upload.html#ssh){:target="\_blank"}


**Before you begin**
Copy the SSH private key for your Git provider


**How to**
1. In the Codefresh UI, make sure you are in [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. From the **List View**, select the runtime for which to configure SSH.
1. From the context menu with the additional actions on the top-right, select **Update Git Runtime Credentials**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/update-git-runtime-token.png"
 url="/images/runtime/update-git-runtime-token.png"
 alt="Update Git runtime credentials"
 caption="Update Git runtime credentials"
  max-width="60%"
%}

{:start="4"}
1. Expand **Connect Repo using SSH**, and then paste the raw SSH private key into the field.

{% include
 image.html
 lightbox="true"
 file="/images/runtime/configure-ssh-for-runtimes.png"
 url="/images/runtime/configure-ssh-for-runtimes.png"
 alt="Update Git runtime credentials"
 caption="Update Git runtime credentials"
  max-width="40%"
%}

{:start="5"}
1. Click **Update Credentials**.

## Reset Shared Configuration Repository for GitOps Runtimes
Codefresh creates and validates the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration) when you install the first Hybrid or Hosted GitOps Runtime for your account, and uses it for all GitOps Runtimes you add to the same account.

The Shared Configuration Repo is created in your Git provider account. You can reset the repo defined for your account under the following conditions:

* **Incorrect/missing URL**  
  Mandatory when Codefresh notifies you through the UI that the Shared Configuration Repo URL is either incorrect or missing.

    * Incorrect URL  
      The Shared Config Repo details provided during installation in Account Setup are incorrect. Codefresh could not connect to the Shared Repo with the details provided.
    * Undefined URL<br>
      You installed the GitOps Runtime through a script or an automated mechanism without providing the URL to the Shared Configuration Repository.


    {% include
 image.html
 lightbox="true"
 file="/images/runtime/shared-config-repo-missing.png"
 url="/images/runtime/shared-config-repo-missing.png"
 alt="Notification for missing/incorrect Shared Configuration Repository"
 caption="Notification for missing/incorrect Shared Configuration Repository"
  max-width="100%"
%}

* **No active Runtimes**  
  If Codefresh has already validated the existing Shared Configuration Repository, meaning that at least one GitOps Runtime successfully connected to it, you _cannot change_ the Shared Configuration Repo URL.
  To do so, you must contact Codefresh Support.

  Otherwise, you can reset the Shared Config Repo URL only _after uninstalling all the GitOps Runtimes in your account_. This option is useful when moving from a temporary account, for example, a POV account, to your organization's official account to reset the URL.

<!--- ### Reset Shared Config Repo via UI
You can reset the Shared Config Repo via the Codefresh UI when you see the notification that the URL is either incorrect or missing.

**Before you begin**

Verify that you have [authorized access to the Codefresh app's organizations]({{site.baseurl}}/docs/administration/account-user-management/hosted-authorize-orgs/)


1. Click **Update**.
1. In **Add Shared Configuration Repo**, enter your Git username and the URL at which to create the repo.
1. From the list of **Git Organizations**, select the Git organization for the Codefresh application.

### Reset Shared Config Repo via CLI 
You can reset the Shared Configuration Repo via the CLI when:
* You receive the notification that the URL is incorrect or missing
* There are no active GitOps Runtimes in your account.
   To reset the URL for an account with existing GitOps Runtimes, you must [uninstall](#uninstall-gitops-runtimes) all the Runtimes.

-->

**Before you begin**
* Make sure you have no active GitOps Runtimes in your account

**How to**


1. Run `cf config update-gitops-settings --shared-config-repo <shared_repo_url>`
  where:
  `<shared_repo_url>` is the new URL for the Shared Configuration Repository.
1. When prompted, select the Git provider.
1. Confirm to create the Shared Configuration Repo. 

## (Hybrid GitOps) Configure Deep Links to applications & resources

Deep Links is an Argo CD feature that redirects users to third-party applications/platforms by surfacing links to the same in Argo CD projects, applications, and resources. Read all about it in [Argo CD Deep Links](https://argo-cd.readthedocs.io/en/stable/operator-manual/deep_links/){:target="\_blank"}.

In Codefresh, you can configure deep links to third-party applications/platforms in the `argocd-cm` ConfigMap, located in the repo where you installed the Hybrid GitOps Runtime.
When configured, deep links are displayed in the application's Current State tab in Tree view. See [Working with resources in Tree View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#working-with-resources-in-tree-view).

>Deep link configuration in Codefresh requires Runtime v0.1.27 or higher.



1. Go to the `<hybrid-gitops-installation-repo>/bootstrap/argo-cd/kustomization.yaml`.
1. Configure deep links as in the example below.

```yaml
...
configMapGenerator:
- name: argocd-cm
  behavior: merge
  literals:
  - |
    resource.links:=- url: https://<mycompany>.splunk.com
        title: Splunk
        description: jf
        icon.class: "fa-book"
  - |
    application.links=- url: https://<mycompany>.splunk.com
        title: Splunk
        description: jf
        icon.class: "fa-book"
```

where:

* `<location>:=- url:` defines where the link is displayed and the target URL to link to:
  * `location` can be `application.links` (Application) or `resource.links` (Resource). Codefresh does not show Argo CD projects.
  * `url` is the target URL in the format `https://<url>.com`, for example, `https://codefresh.io.splunk.com`.
* `title`is the display name for the link, as will appear in the UI. For example, `Splunk`.
* `description`is optional, and presents additional info on the link.
* `icon-class` is optional, and is the font-awesome icon class displayed to the left of the `title`.

Argo CD also supports `if` conditional statements to control when the deep links are displayed. When omitted, configured deep links are always displayed.<br>
For more details, read [Configuring Deep Links in Argo CD](https://argo-cd.readthedocs.io/en/stable/operator-manual/deep_links/#configuring-deep-links){:target="\_blank"}.



## (Helm Hybrid GitOps) Remove GitOps Runtimes
Remove Helm GitOps Runtimes that are offline from the Codefresh UI. The Runtime is not removed from the cluster.

>The Remove option is available in List View, and is enabled only when a Helm Runtime is offline.


1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View** or to the **Topology View**.
1. Do one of the following:
      * To the right of the row with the Runtime to remove, click the context menu and select **Remove**.
      * Click the Runtime name, click the context-menu on the top-right, and then select **Remove**.

<!--- {% include
 image.html
 lightbox="true"
 file="/images/runtime/uninstall-location.png"
 url="/images/runtime/uninstall-location.png"
 alt="List View: Uninstall runtime option"
 caption="List View: Uninstall runtime option"
  max-width="30%"
%}

**Topology view**:
  Click the Runtime cluster, and from the panel, click the context menu, and then select **Remove**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-topology-uninstall.png"
 url="/images/runtime/runtime-topology-uninstall.png"
 alt="Topology View: Uninstall runtime option"
 caption="Topology View: Uninstall runtime option"
  max-width="30%"
%} -->

{:start="5"}
1. Click **Remove** to confirm.


## Uninstall GitOps Runtimes

Uninstall provisioned GitOps Runtimes that are not in use.

Uninstalling a GitOps Runtime permanently removes:
* The Runtime from the cluster it is provisioned on
* The Git Sources and managed clusters associated with it

<br>

**How to**

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Switch to either the **List View** or to the **Topology View**.
1. **List view**:
    * Do one of the following:
      * To the right of the row with the Runtime to upgrade, click the context menu and select **Uninstall**.
      * Click the Runtime name, click the context-menu on the top-right, and then select **Uninstall**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/uninstall-location.png"
 url="/images/runtime/uninstall-location.png"
 alt="List View: Uninstall runtime option"
 caption="List View: Uninstall runtime option"
  max-width="80%"
%}

  **Topology view**:
  * Click the Runtime cluster, and from the panel, click the context menu, and then select **Uninstall**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-topology-uninstall.png"
 url="/images/runtime/runtime-topology-uninstall.png"
 alt="Topology View: Uninstall runtime option"
 caption="Topology View: Uninstall runtime option"
  max-width="30%"
%}

{:start="5"}

1. Copy and run the uninstall command:

  `RELEASE_NAME=$(helm ls -n codefresh-gitops-runtime -q) && helm uninstall ${RELEASE_NAME} -n codefresh-gitops-runtime`

{:start="6"}

1. Click **Close** to exit the upgrade panel.



## (Helm GitOps) Download logs for GitOps Runtimes
Download logs for the GitOps Runtime from the Kubernetes cluster.

<!--- 
Download the logs for a completed GitOps Runtime installation.<br>
The Runtime log is downloaded as a `.tar.gz` file, which contains the individual log files for each runtime component.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, expand Runtimes in the sidebar, and select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. If needed, switch to **List View**, and then select the runtime for which to download logs.
1. From the context menu, select **Download All Logs**.
  The log file is downloaded to the Downloads folder or the folder designated for downloads, with the filename, `<runtime-name>.tar.gz`. For example, `codefreshv2-production2.tar.gz`.

  {% include
	image.html
	lightbox="true"
	file="/images/runtime/helm-download-all-logs.png"
	url="/images/runtime/helm-download-all-logs.png"
	alt="Download all logs for installed GitOps Runtime"
	caption="Download all logs for installed GitOps Runtime"
    max-width="60%"
%}

## (Legacy CLI Hybrid GitOps) View/download logs for GitOps Runtimes
Logs are available for completed Runtimes, both for the runtime and for individual runtime components. Download log files for offline viewing and analysis, or view online logs for a Runtime component, and download if needed for offline analysis. Online logs support free-text search, search-result navigation, and line-wrap for enhanced readability.

Log files include events from the date of the application launch, with the newest events listed first.

<br>

### Download logs for GitOps Runtimes
Download the log file for a Runtime. The Runtime log is downloaded as a `.tar.gz` file, which contains the individual log files for each runtime component.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, expand Runtimes in the sidebar, and select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. If needed, switch to **List View**, and then select the runtime for which to download logs.
1. From the context menu, select **Download All Logs**.
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

### View/download logs for Runtime components
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


-->


## (Legacy CLI Hybrid GitOps) Restoring provisioned GitOps Runtimes

In case of cluster failure, restore the provisioned Hybrid GitOps Runtime from the existing runtime installation repository.
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

### Restore a Hybrid GitOps Runtime
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

### Ingress example
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

## (Hybrid GitOps) Troubleshoot communication problems

You have a communication problem if you see either of these notifications:
_Unable to communicate with a `runtime_name`_
OR
 _Unable to communicate with two or more runtimes_

Refer to our [troubleshooting section]({{site.baseurl}}/docs/kb/articles/runtime-issues/#unable-to-communicate-with-runtime-name-or-two-or-more-runtimes) for a list of possible causes and the corresponding corrective actions.


## (Hybrid GitOps) View notifications in Activity Log

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



## Related articles
[Add Git Sources to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Add external clusters to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)


