---
title: "Managing GitOps Runtimes"
description: "Options to manage your GitOps Runtimes"
redirect_from:
  - /docs/installation/gitops/monitor-manage-runtimes.md
toc: true
---







## Configure Runtime as Argo CD application

Configure the Hybrid GitOps Runtime as an Argo CD Application.  This is usually done when installing the Runtime. 
You can configure the Runtime when needed after installation.

Configuring the Runtime as an Argo CD application, allows you to: 
* View the Runtime components, monitor health and sync statuses, and ensure that GitOps is the single source of truth for the Runtime.
* View and its resources, services, and deployment history in the GitOps Apps dashboard through the **Runtime Application** option in the Runtime's context menu



##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. Switch to the **List View**.
1. Select the Hybrid GitOps Runtime to configure as an Argo CD application.
1. In the Runtime Component tab, in **3: Configure runtime as an Argo Application**, click **Configure**.


  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/config-as-argo-app-post-install.png" 
      url="/images/runtime/helm/config-as-argo-app-post-install.png" 
      alt="Configuring GitOps Runtime as an Argo CD Application" 
      caption="Configuring GitOps Runtime as an Argo CD Application"
      max-width="60%" 
   %}

The Runtime's context menu now includes the **Runtime Application** option, which when selected takes you to the Current State tab in the GitOps Apps dashboard. 

 {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/runtime-application-option-context-menu.png" 
      url="/images/runtime/helm/runtime-application-option-context-menu.png" 
      alt="Runtime Application option to view and monitor resources" 
      caption="Runtime Application option to view and monitor resources"
      max-width="60%" 
   %}

## Upgrade GitOps Runtimes

Upgrade provisioned Hybrid GitOps Runtimes to install critical security updates, new functionality, and the latest versions of all components. 

>**NOTE**  
For details on Argo CD versions and their compatible Kubernetes versions, see [Argo CD versioning information](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/overview/){:target="\_block"} and [Kubernetes tested versions](https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/#tested-versions){:target="\_block"}. 

**Changelog for new versions**  
Codefresh alerts you to newer versions of Runtimes, through `Update Available! Notification` in the List View's Version column. A new version of the GtiOps Runtime includes a link to the changelog, detailing the changes in that version.  
See also [View changelogs for GitOps Runtimes](#view-changelogs-for-gitops-runtimes).

**Upgrade procedure**   
The upgrade procedure differs slightly depending on whether the GitOps Runtime has been configured as an Argo CD application or not:<br>
* For Runtimes configured as Argo CD applications, you need to manually update the version in the Helm chart located in the Shared Configuration Repository.
* For other Runtimes, run the upgrade command.

{{site.data.callout.callout_tip}}
**TIP**  
If you have managed clusters for Hybrid GitOps Runtimes, upgrading the Runtime automatically updates runtime components within the managed cluster as well.
{{site.data.callout.end}}

##### How to
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. To upgrade in **List view**, move to the **Version** column, and do the following:
    1. To see the changes in the new version of the Runtime, mouse over **Update Available!**, and click **View Complete Change Log**.
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

{:start="4"}
1. To upgrade in **Topology view**:
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
  * Runtimes configured as Argo CD applications: Continue from _step 6_.
  * Runtimes _not configured_ as Argo CD applications: Continue from _step 7_.
1. For Runtimes configured as Argo CD applications, do the following:
    1. In your Shared Configuration Repository, go to `resources/<runtime_name>/chart`  
       where:  
      `<runtime_name>` is the name of the Hybrid GitOps Runtime to upgrade.
    1. In `chart.yaml`, change the version number in both `.version` and `.dependencies.version`.
    1. Commit the change, and push to your Git server.
```yaml
apiVersion: v2
appVersion: 1.0.0
description: Codefresh gitops runtime umbrella chart
name: codefresh-gitops-runtime
version: <version>
dependencies:
  - name: gitops-runtime
    repository: oci://quay.io/codefresh
    version: <version>
```
1. For Runtimes _not configured as Argo CD applications_, do the following:
    1. Copy and run the upgrade command:  
        `RELEASE_NAME=$(helm ls -n codefresh-gitops-runtime -q) && helm upgrade ${RELEASE_NAME} -n codefresh-gitops-runtime`
    1. To exit the upgrade panel, click **Close**.

## View changelogs for GitOps Runtimes
Each version of a GitOps Runtime includes a changelog detailing the changes in that release. 
Changelogs are available in ArtifactHub and GitHub

##### Changelog for latest Runtime release in Codefresh
In the GitOps Runtimes List view, the Version column displays the version currently installed.  

Whenever there is a newer version of the Runtime, Helm chart, or both, the **Update Available!** notification appears in the same column.  
Mouse over shows a link to the changelog for that version on GitHub.  
The example below shows the changelog for the **Latest** release of the GitOps Runtime.

{% include
 image.html
 lightbox="true"
 file="/images/runtime/helm/runtime-changelog.png"
 url="/images/runtime/helm/runtime-changelog.png"
 alt="Example of changelog for GitOps Runtime on GitHub"
 caption="Example of changelog for GitOps Runtime on GitHub"
  max-width="60%"
%}


##### Changelogs for all Runtime releases
Changelogs for all versions, including historical versions, are available on ArtifactHub and GitHub.

* [GitHub](https://github.com/codefresh-io/gitops-runtime-helm/releases){:target="\_blank"}
* [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-gitops-runtime/gitops-runtime#prerequisites){:target="\_blank"}  
  On the right, select the chart version, and then click **Changelog** above.
  
  {% include
 image.html
 lightbox="true"
 file="/images/runtime/helm/runtime-changelog-artifacthub.png"
 url="/images/runtime/helm/runtime-changelog-artifacthub.png"
 alt="Accessing changelog for GitOps Runtime on ArtifactHub"
 caption="Accessing changelog for GitOps Runtime on ArtifactHub"
  max-width="50%"
%}

## Enable precise sync detection for monorepo apps
Enable the ACR Controller in GitOps Runtimes to precisely detect sync operations that triggered deployments for applications in monorepo setups.

When enabled, the ACR Controller:
* Identifies and tracks application-specific changes by analyzing the application’s source path.
* Compares revisions to identify the specific sync operation that triggered the promotion or deployment.
* Automatically adds the `.app.status.operationState.operation.sync.changeRevision` to application manifests. 

To trigger and customize notifications for the identified revision, update the notification controller and configure the notification template accordingly.

##### How to

{::nomarkdown}
<ol>
  <li>If needed, upgrade your Runtime to version 0.13.0 or higher.</li>
  <li>In the Runtime's <code class="highlighter-rouge">values.yaml</code>, enable the ACR controller by adding the following to the <code class="highlighter-rouge">argo-cd</code> section:
    <pre><code>argo-cd:
  acrController:
    enabled: true
</code></pre>
  </li>
  <li>In the notification controller, switch the revision being used to <code class="highlighter-rouge">.app.status.operationState.operation.sync.changeRevision</code>.<br>
    Here's an example with the new notification trigger:<br>
   {% highlight yaml %}
    {% raw %}
    trigger.on-deployed: |
      - description: Application is synced and healthy. Triggered once per commit.
        when: app.status.health.status == 'Healthy' and app.status.operationState != nil and app.status.operationState.operation.sync.changeRevision != nil and app.status.operationState.phase in ['Succeeded']
        oncePer: app.status.operationState.operation.sync.changeRevision
        send:
          - app-deployed
  {% endraw %}
  {% endhighlight %}
  </li>
  <li>
    Configure the notification template to report the <code class="highlighter-rouge">changeRevision</code>, as in the example below:
    {% highlight yaml %}
    {% raw %}
    message: "Author: {{(call .repo.GetCommitMetadata .app.status.operationState.operation.sync.changeRevision).Author}}, message: {{(call .repo.GetCommitMetadata .app.status.operationState.operation.sync.changeRevision).Message}}"
    {% endraw %}
     {% endhighlight %}
  </li>
  <li>
    If you don't receive notifications, see <a href="https://codefresh.io/docs/docs/deployments/gitops/troubleshooting-gitops-apps/#not-receiving-application-scoped-sync-notifications-with-acr-controller">Not receiving application-scoped sync notifications with ACR Controller</a>.
  </li>
</ol>
{:/}






## Rollback GitOps Runtimes
After upgrading a GitOps Runtime, roll back to the previous or a specific version of the Runtime.  
The rollback procedure differs slightly depending on whether the GitOps Runtime has been configured as an Argo CD application or not.

##### Rollback GitOps Runtimes configured as Argo CD applications
Manually change the version in the Helm chart (`chart.yaml`) located in the Shared Configuration Repository.

1. In your Shared Configuration Repository, go to:  
  `resources/<runtime_name>/chart`  
  where:  
  `<runtime_name>` is the name of the Hybrid GitOps Runtime to upgrade.
1. In `chart.yaml`, change the version number in both `.version` and `.dependencies.version`.
1. Commit the change, and push to your Git server.

##### Rollback other GitOps Runtimes  
Rollback GitOps Runtimes not configured as Argo CD applications using Helm commands such as `rollback` or `upgrade`.

If you need details, see the documentation on [Helm commands](https://helm.sh/docs/helm/helm_init/){:target="\_blank"}.



## Update Git credentials for GitOps Runtimes

Provisioned GitOps Runtimes require valid Git Runtime tokens at all times to authenticate and authorize the Runtime.
The Git Runtime token differs from the Git user token which is a personal access token unique to each user. As such, you can use the same Git Runtime token for multiple Runtimes.

{{site.data.callout.callout_tip}}
**TIP**  
Git credentials are synced to the Shared Configuration Repository defined during installation. If you change your Git credentials, the Git account must match that of the Shared repo. For example, if the Shared repo is defined as `http://github.com/my-org/isc.git` and the Git provider is defined  as `bitbucket`, the update will fail.
{{site.data.callout.end}}


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
* To authenticate through a Git Runtime token, make sure your token is valid and has the [required scopes]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-token-scopes)

**How to**
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. Switch to the **List View**.
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
  >**NOTE**  
  If the application is not registered, you get an error. Contact your admin for help.

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

>**NOTE**  
When SSH is configured for a GitOps Runtime, when creating/editing Git-Source applications, you can select HTTPS OR SSH as the protocol to connect to the Git repository. See [Repository URL in Application Source definitions]({{site.baseurl}}/docs/deployments/gitops/create-application/#source).

**SSH keys**
For more information on generating SSH private keys, see the official documentation:
* [GitHub](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent){:target="\_blank"}
* [GitLab](https://docs.gitlab.com/ee/user/ssh.html){:target="\_blank"}
* [Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html){:target="\_blank"}
* [Azure](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page){:target="\_blank"}
* [Gerrit](https://gerrit-review.googlesource.com/Documentation/user-upload.html#ssh){:target="\_blank"}


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

## View/download logs for GitOps Runtimes
Logs are available for installed GitOps Runtimes, both for the Runtime and for individual Runtime components. Download log files for offline viewing and analysis, or view online logs for a Runtime component and download if needed for offline analysis. Online logs support free-text search, search-result navigation, and line-wrap for enhanced readability.

Log files include events from the date of the application launch, with the newest events listed first.



### Download logs for GitOps Runtimes
Download the log file for a GitOps Runtime. The Runtime log is downloaded as a `.tar.gz` file, which contains the individual log files for each runtime component.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. If needed, switch to **List View**, and then select the runtime for which to download logs.
1. From the context menu, select **Download All Logs**.
  The log file is downloaded to the Downloads folder or the folder designated for downloads, with the filename, `<runtime-name>.tar.gz`. For example, `codefreshv2-production2.tar.gz`.

### View/download logs for Runtime components
View online logs for any Runtime component, and if needed, download the log file for offline viewing and analysis.

>**NOTE**  
Downloading logs for Runtime components is supported from Runtime v0.1.39 and higher.

Online logs show up to 1000 of the most recent events (lines), updated in real time. Downloaded logs include all the events, from the date and time of application launch to the date and time of download.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. If needed, switch to **List View**, and then select the Runtime.
1. In the Runtime Components tab, from the context menu of the required component, select **View Logs**.

  {% include
	image.html
	lightbox="true"
	file="/images/runtime/runtime-logs-view-component.png"
	url="/images/runtime/runtime-logs-view-component.png"
	alt="View log option for individual runtime component"
	caption="View log option for individual runtime component"
    max-width="60%"
%}


{:start="5"}
1. Do the following:
  * To search for any string, type the free-text to search for, and click the next and previous buttons to navigate between the search results.
  * To switch on line-wrap for readability, click **Wrap**.

  {% include
	image.html
	lightbox="true"
	file="/images/runtime/runtime-logs-screen-view.png"
	url="/images/runtime/runtime-logs-screen-view.png"
	alt="Online log example for runtime component"
	caption="Online log example for runtime component"
    max-width="60%"
%}

{:start="6"}
1. To download the log, click **Download**.
  The file is downloaded as `<component-name>.log`.

## Reset Shared Configuration Repository for GitOps Runtimes
When you install the first Hybrid <!--- or Hosted--> GitOps Runtime for your account, as part of the setup, Codefresh creates the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) in your Git provider account and validates the URL. The Shared Configuration Repo is used for all GitOps Runtimes you add to the same account.

As a Codefresh admin, you can reset the repo defined for your account if the URL is either incorrect or missing, or if there are no active GitOps Runtimes. See [Reset Shared Configuration Repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration/#reset-shared-configuration-repo).



## Configure Deep Links to applications & resources

Deep Links is an Argo CD feature that redirects users to third-party applications/platforms by surfacing links to the same in Argo CD projects, applications, and resources. Read all about it in [Argo CD Deep Links](https://argo-cd.readthedocs.io/en/stable/operator-manual/deep_links/){:target="\_blank"}.

In Codefresh, you can configure deep links to third-party applications/platforms in the `argocd-cm` ConfigMap, located in the repo where you installed the Hybrid GitOps Runtime.
When configured, deep links are displayed in the application's Current State tab in Tree view. See [Working with resources in Tree View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#working-with-resources-in-tree-view).

>**NOTE**  
Deep link configuration in Codefresh requires Runtime v0.1.27 or higher.



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



## Delete GitOps Runtimes
Delete Helm GitOps Runtimes which are offline from the Codefresh platform. The Runtime is _not removed from the cluster_.

To remove the GitOps Runtime from the Codefresh platform and from the cluster, [uninstall the Runtime](#uninstall-gitops-runtimes).

{{site.data.callout.callout_tip}}
**TIP**  
The Delete option is available in List View, and is enabled only when a Helm Runtime is offline.
{{site.data.callout.end}}

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. Switch to the **List View**.
1. To the right of the row with the Runtime to delete, click the context menu and select **Delete**.
1. Type the name of the Runtime and click **Delete** to confirm.
<!---Click the Runtime name, click the context-menu on the top-right, and then select **Remove**. -->



## Uninstall GitOps Runtimes

Uninstall provisioned GitOps Runtimes that are not in use.

Uninstalling a GitOps Runtime permanently removes:
* The Runtime from the Codefresh platform and from the cluster it is provisioned on
* The Git Sources and managed clusters associated with it

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **GitOps Runtimes**.
1. Switch to either the **List View** or to the **Topology View**.
1. To uninstall from the **List view**, do one of the following:
  * To the right of the row with the Runtime to uninstall, click the context menu and select **Uninstall**.
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


{:start="5"}
1. To uninstall from the **Topology view**, click the Runtime cluster, and from the panel, click the context menu, and then select **Uninstall**.

  {% include
 image.html
 lightbox="true"
 file="/images/runtime/runtime-topology-uninstall.png"
 url="/images/runtime/runtime-topology-uninstall.png"
 alt="Topology View: Uninstall runtime option"
 caption="Topology View: Uninstall runtime option"
  max-width="30%"
%}

{:start="6"}
1. Copy and run the uninstall command:  
  `RELEASE_NAME=$(helm ls -n codefresh-gitops-runtime -q) && helm uninstall ${RELEASE_NAME} -n codefresh-gitops-runtime`

{:start="7"}
1. Click **Close** to exit.








## Troubleshoot communication problems

You have a communication problem if you see either of these notifications:
_Unable to communicate with a `runtime_name`_
OR
 _Unable to communicate with two or more runtimes_

Refer to our [troubleshooting section]({{site.baseurl}}/docs/kb/articles/runtime-issues/#unable-to-communicate-with-runtime-name-or-two-or-more-runtimes) for a list of possible causes and the corresponding corrective actions.


## View notifications in Activity Log

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
[Monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-runtimes/)  
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)


