---
title: "Codefresh On-premises Release Notes"
description: "New features, bug fixes, feature flags for on-premises releases"
toc: true
---

Welcome to the release notes for our on-premises release versions, starting with our latest release, version 2.0.3.

## On-premises version 2.1

### Features & enhancements
<br><br>

#### Upgrading to v2.1
This major release includes new services and changes to existing services.  
Before running the upgrade, read the details [here](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#to-2-1-0){:target="\_blank"}.

<br><br>

#### Gerrit as Git provider for Pipelines and GitOps
We are excited to announce the integration of Gerrit, the open-source web-based code review tool for Git repositories, with Codefresh. 

**Gerrit and Codefresh Pipelines**  
By integrating Gerrit as a Git provider for Codefresh Pipelines, you can leverage its capabilities to trigger builds and tests automatically whenever a new change is pushed to Git repositories hosted in Gerrit. The integration allows you to closely monitor the status of builds and tests within the Gerrit environment itself, providing you with a comprehensive view of your development process.
With Codefresh’s `CF_PULL_REQUEST` group of environment variables, you can achieve similar functionality to Gerrit’s `Changes` directly within Codefresh.

For details, see [Pipeline integrations - Git providers]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).

**Gerrit and Codefresh GitOps**   
By configuring Gerrit as the primary Git provider for your Hosted GitOps Runtime, you can integrate Gerrit information into your third-party CI tools or platforms for image enrichment and reporting in Codefresh.  
If you are interested in using Gerrit for Hybrid GitOps Runtimes, please contact us.

For details, see [GitOps Gerrit Git provider integration]({{site.baseurl}}/docs/gitops-integrations/gerrit-integration/).

<br><br>

#### Multi-account sync for Okta with OIDC

Check out the latest enhancements to the integration settings for Okta with OIDC: Multi-account sync and automatic deletion of users removed during sync from Codefresh.

**Multi-account sync**  
Following the successful implementation of just-in-time provisioning support for Okta, we are taking it a step further by introducing multi-account sync for OIDC-Okta. This feature enables you to synchronize multiple Codefresh accounts in Okta simultaneously in Codefresh, ensuring a seamless SSO setup for enterprise customers.

With multi-account sync, you can easily select additional Codefresh accounts to sync with your Okta OIDC account in Codefresh. Codefresh validates admin privileges and access for each of the selected accounts, guaranteeing secure and reliable authentication. 

You have the flexibility to sync users in multiple ways: through the UI's `Auto-group sync`, performing on-demand synchronization through the CLI, or integrating sync into a Codefresh pipeline using the CLI synchronize command.

**Delete users removed during sync**  
We added an option to further streamline Okta SSO account and user management in Codefresh. You can now easily remove individual users who are deactivated in Okta from both the current account in Codefresh and any additional accounts defined in your current account.  
The Users list is updated accordingly, ensuring that both the Teams and Users lists are always organized.


 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/july23/rel-notes-july23-okta-new-settings.png" 
url="/images/whats-new/july23/rel-notes-july23-okta-new-settings.png" 
alt="Multi-account sync and remove deactivated users for Okta OIDC" 
caption="Multi-account sync and remove deactivated users for Okta OIDC" 
max-width="50%" 
%}

For details, see [Configure OIDC SSO settings for Okta in Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/oidc/oidc-okta/#how-to). 

<br><br>

#### Codefresh & OpenShift 

For details, see Deploying [Codefresh with OpenShift](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#installing-on-openshift){:target="\_blank"}.

<br><br>

#### Pipelines: Access control for endpoints 
With this feature, Codefresh admins gain enhanced control over the security of their pipelines by being able to restrict access to specific endpoint scopes.
Scopes are defined at the account level, ensuring a consistent security baseline for all pipelines. These predefined scopes are inherited by every pipeline, which Codefresh admins can override for individual pipelines when necessary.  
To enable this, you need to turn on the `pipelineScopes` feature flag. 

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/aug23/rel-notes-aug23-pipeline-scopes-setting.png" 
url="/images/whats-new/aug23/rel-notes-aug23-pipeline-scopes-setting.png" 
alt="Configure scopes for pipeline" 
caption="Configure scopes for pipeline" 
max-width="60%" 
%}

For details, see [Configure scopes for pipelines]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#configure-pipeline-scopes).

<br><br>

#### Pipelines: Enhanced version of Cron triggers

We have extended the capabilities of Cron triggers within Codefresh pipelines for a more powerful implementation. The new functionality is available as a Beta version. 

Cron triggers can now simulate Git events to enrich pipelines with repository details, include environment variables, and custom settings for caching, volume reuse, and notifications. The new settings are supported in the Codefresh UI and in the pipeline specifications.
To enable this, you need to turn on the `cronTriggersInPipelineSpec` feature flag. 


{% include 
image.html 
lightbox="true" 
file="/images/whats-new/aug23/rel-notes-aug23-cron-settings-tab.png" 
url="/images/whats-new/aug23/rel-notes-aug23-cron-settings-tab.png" 
alt="Extended settings for Cron triggers" 
caption="Extended settings for Cron triggers" 
max-width="60%" 
%}

These additional settings are optional, so you can continue to use just the timer component of the Cron trigger.

Legacy versions of Cron triggers are flagged in the Codefresh UI and include an option to migrate them to the new version.

For details, see [Cron (timer)triggers]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/) and [Cron trigger specifications]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers).

<br><br>

#### Pipelines: Pipeline Dashboard enhancements
Review the latest enhancements in the Pipelines Dashboard.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/june23/rel-notes-june23-pipeline-dashboard-updates.png" 
url="/images/whats-new/june23/rel-notes-june23-pipeline-dashboard-updates.png" 
alt="Favorites filter and Last Update in Pipelines Dashboard" 
caption="Favorites filter and Last Update in Pipelines Dashboard" 
max-width="60%" 
%}

**Filter by favorite pipelines**  
The Pipelines Dashboard now has a Favorites filter. If you starred any projects or pipelines as favorites, you can easily view your favorite pipelines, both by projects or individual pipelines.

**Recent update indication**  
The Last Update timestamp on the top right of the Pipelines Dashboard, refreshes automatically to show you the exact time the data was retrieved.

**Full path display for pipelines in filter**  

Previously, in the Pipelines filter, it was challenging to identify the correct pipeline, when multiple pipelines shared the same name across different projects. 
Now, when you mouse over a pipeline name in the list, the tooltip displays the full path, including the name of the project to which the pipeline belongs, 
followed by the name of the pipeline. 

For details, see [Pipelines Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/#pipelines-dashboard).

<br><br>

#### Pipelines: New icons for pipeline build statuses
Pipeline builds have new status icons. With distinct icons for each status, you can easily differentiate between builds, bringing clarity and saving time. Previously, both terminated and failed builds had the same icon for example, causing confusion.

Here are the icons and the build statuses they represent:  
* **Running**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-running.png" display=inline-block/> {:/}
* **Completed**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-successful.png" display=inline-block/> {:/}
* **Delayed**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-delayed.png" display=inline-block/> {:/}
* **Pending approval**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-pending-approval.png" display=inline-block/> {:/}
* **Denied approval**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-denied.png" display=inline-block/> {:/}
* **Terminating**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-terminating.png" display=inline-block/> {:/}
* **Terminated**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-terminated.png" display=inline-block/> {:/}
* **Failed**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-failed-error.png" display=inline-block/> {:/}

For details, see [Viewing status for pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-status-for-pipeline-builds).

<br><br>

#### Pipelines: Configure limit for project's pipelines
The `PROJECT_PIPELINES_LIMIT` variable allows to you set a limit for the number of pipelines in a project.  
Capping the number of pipelines in a project prevents projects from becoming unwieldy and cluttered, and makes it easier to view the pipelines belonging to a project. 
  
For details, see [Pipeline limit in projects](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#projects-pipelines-limit){:target="\_blank"}.


<br><br>

#### GitOps: ABAC for GitOps applications
In this release, we bring the power of ABAC for access control to GitOps for the first time as a Beta version. You can define fine-grained access to GitOps application entities. Similar to ABAC for pipelines, access is controlled through the use of rules, created by defining teams, actions, and attributes.  
To enable this, you need to turn on the `abacHermesTriggers` feature flag. 

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/aug23/rel-notes-aug23-gitops-add-rule.png" 
url="/images/whats-new/aug23/rel-notes-aug23-gitops-add-rule.png" 
alt="Access control for GitOps application entities" 
caption="Access control for GitOps application entities" 
max-width="60%" 
%}

For details, see [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/).

<br><br>

#### GitOps: Application Groups in GitOps Apps dashboard

Introducing a new view in the GitOps Apps dashboard, the Group view!  
The Group view for GitOps applications is a simple and efficient way to streamline application deployment monitoring within your enterprise.    
To enable this, you need to turn on the `gitopsAppGroups` feature flag. 

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/aug23/rel-notes-aug23-app-group-page.png" 
url="/images/whats-new/aug23/rel-notes-aug23-app-group-page.png" 
alt="Application Groups in GitOps Apps dashboard" 
caption="Application Groups in GitOps Apps dashboard" 
max-width="60%" 
%}

With App Groups, you can effortlessly focus on specific app deployments, as it consolidates deployment information for all applications within the group in the same view. This feature eliminates the need to navigate between the different applications for information on them.
Tailor groupings according to the unique requirements of your organization and applications. 

Codefresh also adds the Group name as an annotation to the application manifest for easy organization and management. 

For details, see [Application Groups for GitOps applications]({{site.baseurl}}/docs/deployments/gitops/gitops-app-groups/).

#### GitOps: Customize session cookie
For GitOps app-proxy, when disabling concurrent sessions for `cf-api` through `DISABLE_CONCURRENT_SESSIONS`=`true`, the `CF_UUID_COOKIE_DOMAIN` environment variable allows you to customize the domain for the session cookie. For example, `.mydomain.com`. 
 
For details, see [Customize session cookie](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#enable-session-cookie){:target="\_blank"}.

### Bug fixes


**General**
* Unable to add users to Codefresh via team sync for Okta.
* Auto-sync option not available for Azure SSO. yes
* 404 errors on clicking documentation links in Build > Triggers.
* For Azure, auto-sync operations removes groups that were previously synced.



**Pipelines**  
* Pipeline builds terminate with error message: `Pipeline could not be executed because retry attempts limit has been exceeded...`.
* Shallow clone for a specific revision with `depth` argument results in error: `pathspec 'test' did not match any file(s) known to git`.
* Pipeline resuming execution after approval shows previously executed steps as skipped in Codefresh UI.
* Cross-account ECR pull in `freestyle` step fails with `(HTTP code 500) server error...`.
* Unable to add Hybrid Runner and run builds in Version 2.0.1. 
* Pipeline trigger for BitBucket server does not fire on commit.
* Creating a Git trigger for a repo name containing spaces fails with error: `Failed to create trigger...fails to match the required pattern...`.
* Discrepancy in list of builds returned when running `GET {{baseUrl/workflow?pipeline=[pipeline-id]}}` query.
* Composition stops randomly with error: `Could not get status for container <container-name>`. 
* Image enrichment with GitHub Actions fails with message: `EventSourceError: Request-URI Too Large`.
* In Pipelines dashboard (Home Dashboard), for a renamed pipeline, the Pipeline filter displays the original name instead of the new name. 
* In the Pipelines page, the context-menu for the last pipeline in the list does not display all available actions.
* **Save** button remains disabled when modifying an External Resource in Pipeline > Settings. 
* Unable to set `requiredAvailableStorage` programmatically for Hybrid Pipeline Runtimes.
* Commit message passed through the system variable `CF_COMMIT_MESSAGE` is truncated and does not include the full content.
* Prefix for Docker registries omitted when using a custom Docker registry as a Public Marketplace Registry. 
* Invited users prompted for phone number during sign-up.


 

**GitOps** 
* **Save** button remains disabled when modifying fields for an existing Git Source.
* `UNAUTHORIZED_ERROR token is not valid` error for graphql API call. 
* Unable to create Git Sources both from the Codefesh CLI and UI with Bitbucket Server.
* Rollouts Reporter for managed cluster uses SaaS instead of on-premises URL.
* Commits to a second application in the same repository as another application, marks the Rollout for the first application as terminated in the UI when it actually continues execution.


### Feature Flags

The table below describes the new Feature Flags in the Codefresh On-Premises release v2.1.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `accountInfoCopyButton`  | When enabled (the default), the account ID is added to the URL. When sharing the URL with the account information, recipients can seamlessly switch accounts.                                                     | TRUE         |
| `pipelineScopes`      | When enabled, enables Codefresh administrators to configure the API scopes for pipelines at account level. All pipelines in the account inherit these scopes. Codefresh administrators can also override these scopes for individual pipelines.<br>See [Pipelines: Access control for endpoints](#pipelines-access-control-for-endpoints) in this article.                                | FALSE         |
| `disableInviteWelcomeMail`     | When enabled, does not send the Welcome email to users invited to an account.                                          | FALSE         |
| `abacHermesTriggers`       | When enabled, restricts access to the legacy version of Cron triggers for users without permissions to edit pipelines.| FALSE  |
| `cronTriggersInPipelineSpec`         | When enabled, allows users to define Cron triggers in the pipeline YAMLs as a `spec.cronTriggers` array, instead of using a separate API.<br>See [Pipelines: Enhanced version of Cron triggers](#pipelines-enhanced-version-of-cron-triggers) in this article.  | FALSE         |
| `accessibilityContrast` | When enabled, displays a widget in ?? to control the contrast.    | FALSE         |
| `gitopsAppGroups`       | When enabled, allows users to group GitOps applications by annotations, and view these applications in the Groups tab of the GitOps Apps dashboard. <br>See [GitOps: Application Groups in GitOps Apps dashboard](#gitops-application-groups-in-gitops-apps-dashboard) in this article. | FALSE   |



## On-premises version 2.0.3 
Welcome to our newest On-Premises release, version 2.0.3!  This major release is finally here, and it’s packed with an array of exciting usability enhancements, new features, and improvements. We listened carefully to your feedback, and worked to incorporate your suggestions into this release. 

On-premises v2.0.3 comes with the exciting addition of Codefresh GitOps! Set up and deploy applications/infrastructure using Git as the single source of truth. Read the details later in this document.


### Features & enhancements

<br>

#### Upgrading to v2.0.3
In this major release, we have deprecated the `kcfi` installer.  Codefresh on-premises is now installed with Helm. 
The `config.yaml` is not compatible for Helm-based installation. To use `config.yaml` in the Helm chart, you need to remove some sections and update others.  

Before running the upgrade, read the details [here](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#upgrading){:target="\_blank"}.

<br>

#### GitOps in Codefresh On-Premises
This version includes support for On-Premises GitOps, including an on-premises version of GitOps Runtimes.  
With GitOps, Git repositories are the source-control systems that declaratively describe applications and infrastructure using code. The continuous integration and continuous delivery processes synchronize these changes with live environments, making sure that the production state always matches the desired state in Git.

Codefresh is the easiest way to get started with GitOps and Argo CD. Codefresh leverages Argo components to have the entire desired state applied from Git to your Kubernetes cluster, and then reported back to Codefresh.

For details, see [Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/) and [On-premises GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/on-prem-gitops-runtime-install).

<br>

#### Enabling the new Codefresh experience
After installing/upgrading to version 2.0.3, Codefresh admins can **Enable the new Codefresh experience** through the Account Information option.

The new experience exposes new functionality such as [Universal Search and Navigation](#universal-search--navigation), and the [Pipelines Dashboard](#pipelines-dashboard).

Get up to speed with the navigation improvements in the new Codefresh experience. 
See the [navigation quick reference]({{site.baseurl}}/docs/new-codefresh/menu-navigation/#classic--new-navigation) for a detailed breakdown of the navigation options. Navigations options are categorized by user options (accessed by clicking your Avatar in the toolbar), account-level administration and configuration, and features and functionality.

<br>

##### System Type in Accounts
Codefresh admins can now switch between Classic only and the unified version with both Classic and GitOps.

The **Accounts** table has a new column, System Type, that allows you to select the module for the account, as Classic or ProjectOne.

##### Settings in toolbar
We added a new **Settings** icon to the toolbar to simplify account-level management for Codefresh administrators. With the **Settings** icon always available, Codefresh admins have single-click access to account-level options and settings whenever you need.

<br>

#### Global Search & Navigation
Boost your Codefresh experience with our latest feature, Global Search & Navigation! Always available in the toolbar, Global Search & Navigation lets you get to what and where you need to in Codefresh while staying where you are.

**Search & find**  
With Global Search & Navigation, you can easily monitor and find resources in your projects, pipelines, and builds, with frequently used entities organized into categories for quick search. Easily find a specific project, pipeline, or build, or browse them all.
In addition, Global Search & Navigation pulls up links to relevant information from our documentation that may be useful within your current context, making it even easier to find what you need.

**Switch accounts**  
You can also switch accounts in Codefresh with Global Search & Navigation, without needing to navigate to your avatar drop-down menu. Simply search for the account, select the Switch Account action, and then choose the account you wish to switch to.
We are always adding more options, so stay tuned for announcements.

<br>

#### Pipelines Dashboard
This release introduces the much-awaited Pipelines Dashboard!  The dashboard, dedicated to pipelines and pipeline metrics, is a new experience of pipeline visibility and monitoring.
Clicking Home Dashboard located at the top of the sidebar displays the Pipelines Dashboard.
If you're currently using both GitOps and Pipelines, the Pipelines Dashboard is displayed below the GitOps and Argo Workflow dashboards.

Use the Pipelines dashboard to:
* Identify pipelines with low performance, both in terms of number of executions and execution duration
* Review the performance of a specific pipeline or project
* Compare KPIs to previous time periods to track progress
* Ensure you are meeting your SLA with your customers*

The Pipelines dashboard requires new services and databases, as listed [here](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#-new-services){:target="\_blank"}.

For details, see [Pipelines Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/#pipelines-dashboard) in the Home Dashboard.

<br>

#### Annotations for builds
We are happy to introduce two enhancements to annotations for pipeline builds! It’s now easier than ever to find the builds you’re looking for, and customize your build views.
First, you can configure an annotation as the build's display annotation, from among the available annotations. Why would you do this? When configured, the annotation is displayed for the build in the Builds page, making it easy to see which builds share common properties like target environments.  
For details, see [Configure display annotation for builds]({{site.baseurl}}/docs/pipelines/annotations/#configure-annotation-to-display-for-build).

Second, you can filter builds by annotations. Filter builds by any annotation added for the build, whether it’s a display annotation or any other annotation with the Annotation filter in the Builds page.  Note that filtering builds by annotations applies only to those builds created after upgrading to v2.0.3.  
For details, see [Applying filters to build views]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view).

<br>

#### Project-based ABAC
We are excited to announce project-level Attribute-Based Access Control (ABAC) in this release. 
ABAC for projects saves a lot of effort without compromising security as now you can control access to both project and to pipeline entities based on project tags.


* Project access to teams with project-tags  
  Now you can decide which teams have access to which projects, and at which level. By adding tags to projects, you can define rules for different teams that can create, update, delete, and view projects.  
  Also, read the next feature description, _Auto-create projects for teams_.

  **Migrating existing accounts**   
   If you have existing accounts with team-based access control for projects, you can either migrate all accounts or a specific account, as described in [Project ABAC migration](https://github.com/codefresh-io/project-abac-migration){:target="\_blank"}.

* Pipeline access to teams with project-tags  
  You can define access to pipelines on the basis of the projects that house the pipelines. Instead of tagging each pipeline, you can add tags to the project, and define rules that determine which teams can access the pipelines which share the project tags. 
  Builds now honor the permissions of the pipelines. Users without access to the pipeline, will also not have access to its builds. This also means fewer email notifications, as these are only sent for builds that users have access to.

For details, see [ABAC for entities with tags and rules]({{site.baseurl}}/docs/administration/account-user-management/access-control/#abac-for-entities-with-tags-and-rules).

<br>

#### Auto-create projects for teams
Simplify access control and setup with `Auto-create projects for teams`. Enabled by default, this global pipeline setting automatically creates projects whenever you create teams in your account.
In addition to automatically creating a project for the team, it also automatically creates a Project rule, and a Pipeline rule for the same team, with basic permissions.

For details, see [Auto-create projects for teams]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams).

<br>

#### Selective restart for failed build steps
We added the Restart from a failed step as an option to the pipeline's Policy settings, which you can enable/disable per pipeline.
Previously, this option was available for all pipelines in the Builds page. Now, you can make it available according to the requirements of the specific pipeline. When disabled in the pipeline's settings, it is also disabled for that pipeline in the Builds page.

Why did we make this selective per pipeline? 
Because restarting from a failed step is not always the answer to the problem, especially as the pipelines restarts with the same state as before.
If you have a failed Helm promotion step, and you updated the image, you would want the pipeline to use the new image. With the Restart option, the pipeline resumes execution at the same state as at the point of failure, never uses the updated image, and continues to fail. 

For details, see [Policy settings for pipelines]({{site.baseurl}}/docs/pipelines/pipelines/#policies) and [Restarting pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restarting-the-pipeline).

<br>

#### Multi-platform builds in Codefresh
Build and push Docker images, including multi-platform images in Codefresh with **BuildX**.

We extended the capabilities of our `build` step with the new `buildx` field. Leverage Docker’s support for multi-architecture/multi-platform support right here in Codefresh. Build an image once and reuse it on multiple architectures/platforms.
We also support custom `buildx` configurations with QEMU and Builder, giving you all the options you may need.

For details, see [Build step field descriptions]({{site.baseurl}}/docs/pipelines/steps/build/#fields).

<br>

#### On-demand encryption for build run variables
Manual build runs allow you to create new and modify existing variables. You can now encrypt sensitive variables on-demand, adding an extra layer of security.

For details, see [Encrypt variables for pipeline build runs]{{site.baseurl}}/docs/pipelines/variables/#encrypt-variables-for-pipeline-build-runs).

<br>

#### Mask variables in cf_export 
On the subject of variables, in our latest enhancement to `cf_export` in pipelines, we added support to mask exported variables.  
You can now use the `--mask` argument to mask any sensitive variables that you export. The values of these variables are replaced with asterisks in the build logs. This ensures that sensitive information is never exposed, helping to keep your builds and pipelines secure. 

For details, see [Masking variables within `cf_export`]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-within-cf_export).

<br>

#### Datadog integration enhancements
We enhanced our integration with Datadog to report additional information from Codefresh pipelines in Datadog.
The new information should make it even easier to monitor and analyze Codefresh pipelines in Datadog:
* For manually triggered pipelines, the name of the user who initiated the pipeline.
* The Resumed field, if the pipeline was resumed after manual approval.
* The Parameters field with user-defined variables and Git parameters.
* Error messages for pipelines with errors.

For details, see [Datadog pipeline integration]({{site.baseurl}}/docs/integrations/datadog/).

<br>

#### Custom certificates 
Codefresh allows configuring custom certificates for Pipelines. You can use your own trusted SSL/TLS certificates for secure communication between Codefresh and external services.

For details, see [Configure custom TLS certificates]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem/#configure-custom-certs-for-volumes-and-containers).

<br>

#### TLS and MTLS for Redis
Codefresh On-Premises  supports both TLS (Transport Layer Security) and MTLS (Mutual TLS) for Redis. 
This enhancement provides enhanced security and encryption capabilities for Redis data communication with Codefresh in on-premises environments. Administrators can customize the level of security according to their requirements.
Using TLS and MTLS for Redis communication requires additional configuration. 

For details, see [Redis with TLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#external-redis){:target="\_blank"} and [Redis with MTLS](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh/2.0.0-alpha.13#external-redis-with-mtls){:target="\_blank"}.  

<br>

#### Preferred date and time format selection
US and international users can  select their preferred format for date and time in the Codefresh UI. With this latest enhancement, you can now choose between US and international date formats, as well as 24 or 12-hour time formats, to best suit your needs. 

Simply navigate to **User Settings** and select your preferred format.

For details, see [Customize date and time formats]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#customize-date-and-time-formats).

<br>

#### SAML SSO Okta: auto-sync teams and auto-activate users 
Just-in-time (JIT) user provisioning is becoming increasingly  important for IT administrators. The auto-sync and activate-user options when setting up SAML SSO settings for Okta are designed to achieve this without any manual intervention.
* **Auto-Sync** allows you to automatically sync users and teams provisioned in Okta with Codefresh at intervals you define. 
* **Auto-Activate** creates and activates personal accounts for synced users in Codefresh, without the need to send an email invite and have the user click on the link.

Both options streamline the  SSO setup for SAML Okta in Codefresh, saving valuable time.  

For details, see [Configure SSO settings for SAML Okta in Codefresh]({{site.baseurl}}/docs/single-sign-on/saml/saml-okta/#step-2-configure-sso-settings-for-codefresh-in-oktadefresh).

<br>

#### Runtime environment override for GitOps pipeline integrations
A GitOps pipeline integration uses the default runtime environment. After creating a GitOps pipeline integration, you can now override its runtime environment.
Codefresh uses the runtime environment for system actions such as Rollback.

<br>

#### New layout for Helm Boards
Helm Boards now display information in a horizontal layout. The new layout prevents fields with long names from overlapping with each other.

<br>

#### Builds view improvements 
We are pleased to announce infrastructure changes that have significantly improved the responsiveness of the Builds page. You will now experience much faster response times when working with projects that have a large number of pipelines. 

### Bug Fixes
* 200 error for inactive webhook triggers.
* Liveness probe failures on cf-api pods.
* Tooltip on hover over build/project names in the Builds page, shows topbar.title instead of the build/project name.
* Opening build deleted by retention policy shows pop-up for switching accounts: Build is from a different account: <account>. To view this build, you must switch accounts.
* Unable to edit Inline YAML when returning to the Workflow tab and switching from Use YAML from repository to Inline YAML.
* Modifying an encrypted variable for a manual build,  decrypts and displays the variable in plain text.
* Removing a trigger from a Git repository, also deletes the associated webhook in Git with other trigger dependencies.
* Git trigger filters allows filtering by deleted branch causing builds to fail.
* In full-screen view mode, the pipeline list panel on the left overlaps the pipeline YAML.
* Incorrect start time for builds in offline logs.
* Enabling `forbidDecrypt` Feature Flag breaks github-release step.
* UI logs not available with on-premises release version 1.3.9.
* Creating account via Terraform results in plugin error.
* Inconsistent formats for date and time across Codefresh UI.
* Modified files filter option for Git trigger events  missing  for Bitbucket Server.
* Selecting Import from text/Import from file/Add shared configuration from the context menu in Workflows tab  Variables does not open the corresponding panel.
* Overrides for pipeline-level variables during manual build run not displayed correctly in Build Variable list .
* Null namespaces result in failure to load Codefresh UI.

### Feature Flags

The table below describes the Feature Flags in the Codefresh On-Premises release v 2.0.3.

{: .table .table-bordered .table-hover}
| Feature Flag       | Description                                               | Default Value |
| -----------        | --------------------------------------------------------- | ------------------------- |
| `parallelKubectlOperations`  | When enabled, allows running multiple kubectl commands in parallel steps. For example, parallel Helm install steps, or parallel deploy steps.                                                     | FALSE         |
| `gitOpsIntegrationEdit`      | When enabled, allows overriding the runtime environment of an existing GitOps pipeline integration. Codefresh uses the runtime environment for different system actions.                                | FALSE         |
| `disableActionBtnByAbac`     | When ABAC is enabled for the user and the user does not have permissions for the action, disables Create/Edit/Delete action buttons for projects and pipelines.                                          | FALSE         |
| `showBuildAnnotations`       | When enabled, allows users to:{::nomarkdown}<ul><li>Configure a display annotation for a pipeline build in the pipeline’s YAML. The build’s display annotation is then displayed in the build entry’s row (Pipelines > Builds).</li><li>Filter by any annotation assigned to builds. </li></ul>{:/}See [Annotations for builds](#annotations-for-builds) in this article.| FALSE         |
| `filterMailsByAbac `         | When enabled and ABAC permissions are defined for projects, sends email notifications on builds only for those pipelines to which the user has access. <br>See [Project-based ABAC](#project-based-abac) in this article.    | FALSE         |
| `syncClassicAnnotationsToGitOps` | When enabled, displays annotations assigned to entities in the Annotations area of the Images dashboard. The following annotation types are displayed: {::nomarkdown}<ul><li>String</li><li>Boolean</li><li>Link</li><li>Percentage</li><li>Number</li></ul>. {:/} **NOTE**: This feature flag does not impact Issue and Git (PR)-based annotations. These are displayed in the Issue and Git areas .     | FALSE         |
| `gitopsArgoCdRollback`       | When enabled, allows users to rollback to a previously deployed version of an active GitOps application.                                                                                            | FALSE         |
| `commandbar`                 | When enabled, activates Codefresh Universal Search & Navigation. Displayed in the top-left of the toolbar, allows users to find and navigate to project/pipeline/build entities, switch accounts, and more. See [Global Search & Navigation](#global-search--navigation) in this article. | FALSE         |
| `gerritIntegration`          | When enabled, allows configuring Git integrations with Gerrit for Codefresh pipelines.                                                                                                                | FALSE         |
| `abacProject`     | When enabled, allows admins to define rule-based access to projects for teams by project tags.<br>**IMPORTANT**: Before enabling this feature flag, make sure to read [Project ABAC migration](https://github.com/codefresh-io/project-abac-migration){:target="\_blank"}.<br>See [Project-based ABAC](#project-based-abac) in this article. | FALSE         |
| `abacRuleRelatedResource`     | When enabled, allows admins to define rule-based access to pipelines for teams by project tags.<br>See [Project-based ABAC](#project-based-abac) in this article. | FALSE         |
| `workflowAbacByPipeline`     | When enabled, builds will not be visible to users who don’t have access to the corresponding pipelines.<br>See [Project-based ABAC](#project-based-abac) in this article. | FALSE         |
|`filterMailsByAbac` |When enabled, together with `workflowAbacByPipeline`, email notifications are not sent for users without access to the builds. <br>See [Project-based ABAC](#project-based-abac) in this article. |FALSE











