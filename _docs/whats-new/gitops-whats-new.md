---
title: "What's new in GitOps?"
description: "New features, enhancements, and bug fixes"
group: whats-new
toc: true
---

>From February 2023 we have unified Release Notes for Codefresh Pipelines and Codefresh GitOps. [Check it out]({{site.baseurl}}/docs/whats-new/release-notes/). 

Built on Argo, the world’s most popular and fastest-growing open source software delivery, Codefresh unlocks the full enterprise potential of Argo Workflows, Argo CD, Argo Events, and Argo Rollouts, providing a control-plane for managing them at scale.  

## January 2023

### Features & enhancements

<br />

#### SSH for runtimes
We added the option to configure SSH for runtime accounts, in addition to the default HTTPS. You need the SSH private key for your Git provider, and add it to your Git credentials for the runtime in Codefresh.  Switch to the List view, and select **Update Git Runtime Credentials**. 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-configure-ssh-for-runtimes.png"
 url="/images/whats-new/rel-notes-jan23-configure-ssh-for-runtimes.png"
 alt="SSH for runtime"
 caption="SSH for runtime"
 max-width="50%"
%}

Adding SSH to runtime accounts allows you to also use SSH to connect to Git repositories when creating or editing application definitions. 

For details, see [Configure SSH for runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#configure-ssh-for-runtimes).

#### Artifact visualization in Argo Workflows

Argo Workflows v3.4 introduced artifact visualization in the Argo UI. You can now visualize workflow artifacts in Codefresh through the Artifacts tab in Workflows. You can also download it if you need to. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-workflow-artifact.png"
 url="/images/whats-new/rel-notes-jan23-workflow-artifact.png"
 alt="Artifact visualization for workflow"
 caption="Artifact visualization for workflow"
 max-width="60%"
%}

#### Manual rollback for rollouts

Manually rollback a completed rollout to a previous revision when and if needed. If after a successful analysis run and rollout, your application is not functioning as it should, 
you can rollback to a prior revision from the Rollout's revision history (path [`spec.revisionHistoryLimit`](https://argoproj.github.io/argo-rollouts/features/specification/#rollout-specification){:target="\_blank"}). Manual rollback changes the live state of the rollout resource to the state in the previous commit that you select. 

The rollback is implemented from the Timeline tab by clicking first the rollout name, selecting the revision to rollback to, and finally clicking the **Rollback to** button in the Rollout Player.


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-rollout-rollback.png"
 url="/images/whats-new/rel-notes-jan23-rollout-rollback.png"
 alt="Completed Rollout in Timeline"
 caption="Completed Rollout in Timeline"
 max-width="60%"
%}

Before you approve and commit the rollback, you can view the changes in each revision. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-rollout-rev-select.png"
 url="/images/whats-new/rel-notes-jan23-rollout-rev-select.png"
 alt="Select rollout revision for rollback"
 caption="Select rollout revision for rollback"
 max-width="60%"
%}

#### Application enhancements

* **Indication for disabled auto-sync**  
  Whenever auto-sync is disabled for an application, the application header displays an indication that auto-sync is off. 

  {% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-auto-sync-on-off.png"
 url="/images/whats-new/rel-notes-jan23-auto-sync-on-off.png"
 alt="Auto-sync OFF in application header"
 caption="Auto-sync OFF in application header"
 max-width="60%"
%}

* **Single filter for _Unhealthy_ applications in Applications dashboard**  
  The Health status filter in the Applications dashboard includes an option to filter by all statuses that are not Healthy, at the same time. Instead of having to filter by each status individually, select **Select all Unhealthy statuses** to filter by Degraded, Missing, Progressing, Suspended, Terminated and Unknown statuses. 
  
{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-unhealthy-status-filter.png"
 url="/images/whats-new/rel-notes-jan23-unhealthy-status-filter.png"
 alt="Applications dashboard: Unhealthy status filter"
 caption="Applications dashboard: Unhealthy status filter"
 max-width="60%"
%}

* **SSH URLs for applications**  
  When you create or edit an application, if your runtime has been configured with SSH, you can also define the app's URL as SSH.  
  Select the SSH tab and the URL, and let Codefresh auto-complete the URL definition in the format required for SSH.




* **Filter app resources through Resource Inventory**  
  From this release, all resource types in the Resource Inventory (bottom-left in the Current State > Tree view) are work as filters. Previously, you could filter only by the Out-of-sync resource type.
  
{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-inventory-filter-type.png"
 url="/images/whats-new/rel-notes-jan23-inventory-filter-type.png"
 alt="Current State > Tree View: Filter by resource type"
 caption="Current State > Tree View: Filter by resource type"
 max-width="60%"
%}


#### Argo Project enhancements

* **New Workflow Templates in Codefresh Hub for Argo**  
  We are always working on ways to make your work easier. And in this release, we added several Workflow templates that focus on workflow commands to Codefresh Hub for Argo. Check out the [Terminate, Stop, Suspend, and Resume templates](https://codefresh.io/argohub/workflow-template/argo-workflows){:target="\_blank"}. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jan23-workflow-templates.png"
 url="/images/whats-new/rel-notes-jan23-workflow-templates.png"
 alt="New Workflow Templates in Codefresh Hub for Argo"
 caption="New Workflow Templates in Codefresh Hub for Argo"
 max-width="60%"
%}
*  **Argo CD upgrade**  
  We have upgraded Argo CD version to 2.5. Read more on what this version includes in the [official documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/2.4-2.5/){:target="\_blank"}.  

* **Argo Rollouts upgrade**  
  We have upgraded our Argo Rollouts version to 1.4rc-1. Read more this version of Argo Rollouts in their [official blog](https://blog.argoproj.io/argo-rollouts-1-4-release-8275a0d364be){:target="\_blank"}.


### Bug fixes

**Runtimes**  
* Hybrid runtime installation fails when Git repo definition includes subdirectory.
* Unable to add GKE Autopilot Cluster to Hosted runtime.
* Argo-hub pipeline does not work with PR from forked repo.
* Runtime fails to install after autopilot-bootstrap with a non-default branch. 

**Workflows and applications**  
* Workflow state not updated on clicking Retry.
* `jsonBody` displayed as an unknown field in AnalysisTemplate.
* Incorrect data in Home and DORA dashboards.
* Cron event inconsistency.

## December 2022

### Features & enhancements

<br />


#### GitOps CLI version validation and upgrade
We have enhanced the user experience for CLI upgrades to make it intuitive and simple. No need to constantly check the CLI version to keep up with and get access to new features we are releasing. 
Now the CLI automatically self-checks its version, and if a newer version is available, prints a banner with the notification that a new version is available, also including the upgrade command (`cf upgrade`).

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-dec22-cli-upgrade-banner.png"
 url="/images/whats-new/rel-notes-dec22-cli-upgrade-banner.png"
 alt="Upgrade banner for Codefresh CLI"
 caption="Upgrade banner for Codefresh CLI"
 max-width="60%"
%}

You can upgrade to a specific version, or download the latest version to an output folder to upgrade at your convenience.  

For details, see [Upgrade the Codefresh CLI]({{site.baseurl}}/docs/installation/gitops/upgrade-gitops-cli/).

<br />

#### Tunnel-based as default runtime mode
In the previous release, we introduced the Tunnel-based option for Hybrid GitOps runtimes.
It is now configured as the default runtime mode for Hybrid GitOps. For silent installations, you don't need to specify an access mode. For Wizard-based install, when prompted to select the Access mode, select Tunnel-based. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-dec22-cli-access-mode.png"
 url="/images/whats-new/rel-notes-dec22-cli-access-mode.png"
 alt="Access mode in CLI Wizard"
 caption="Access mode in CLI Wizard"
 max-width="60%"
%}

Access mode selection is relevant only for new runtime installations. Upgrading existing runtimes does not change the access mode for those runtimes.

For details, see [Access mode in Runtime flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#runtime-flags).

<br />

#### Git provider selection in CLI Wizard
When installing the Hybrid GitOps runtime, Codefresh automatically detects the Git provider based on the repository URL provided during the installation.
If Codefresh is unable to detect the Git provider, as for on-premises Git providers, you can now select the Git provider from the list.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-dec22-cli-git-provider-select.png"
 url="/images/whats-new/rel-notes-dec22-cli-git-provider-select.png"
 alt="Git provider selection CLI Wizard"
 caption="Git provider selection CLI Wizard"
 max-width="60%"
%}

<br />

#### Reset shared configuration repo
Codefresh creates the shared configuration repository when you install the first Hybrid or Hosted GitOps runtime for your account, and then uses it for all runtimes you add to the same account.
You may want to re-initialize the shared configuration repository for your account to point to a different runtime environment. For example, when moving from evaluation to production environments.  

You can do so by first uninstalling existing runtimes in your account and then running the reset command. On the next runtime installation, Codefresh re-initializes the shared configuration repo to point to the new location.

>Reset shared configuration repo is supported from CLI v0.1.18 and higher.

For details, see [Reset shared configuration repository]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#reset-shared-configuration-repository-for-gitops-runtimes).

<!--#### Rollout steps in Current State CR-15855
today users can access the rollouts steps only from the timeline view. We want users to be able to see it from the current state view as well, when clicking on a rollout. 
Add a tab to the rollout drawer with the "steps" -->

### Bug fixes

**Runtimes**  
* App-proxy fails to connect if `cfHost` ends with `/`. 
* Missing Codefresh context generates segmentation violation error.
* Unclear error message when upgrading CLI to a version that does not exist.
* Bitbucket returns false in `isValid` field for expired runtime token.
* SIGSEGV on installing runtime with CLI version 01.17. 

**Applications**  
* Image-applications of deleted application not removed from database. 
* Incorrect results when filtering by Cluster in DORA dashboard.
* Incorrect time displayed in Lead Time For Changes in DORA dashboard.
* 'Git Source not found error' when trying to edit an application not based on a Git Source. 
* Modified resource not displayed correctly in Application dashboard > Timeline tab.

**Others**  
* Integrations page remains indefinitely in loading state.
* Filtering Workflow Templates by Git Source does not work.
* Workflow Logs terminal flickers and self-refreshes constantly.





## November 2022

### Features & enhancements

<br />


#### Tunnel-based hybrid runtimes
Simplify installation without compromising on security with our tunnel-based installation option for hybrid runtimes.  

Tunnel-based runtimes use tunneling for communication between the customer cluster and the Codefresh platform, with the customer cluster initiating the tunneling request. Simply add the flag `--access-mode` with `tunnel` as the value and you have your tunnel-based runtime without an ingress controller. 

See:  
* [Tunnel-based runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture)
* [Runtime flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#runtime-flags)
* [Tunnel-based runtime flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#tunnel-based-runtime-flags)

{::nomarkdown}
<br>
{:/}

#### Bitbucket Cloud for hosted runtimes
Hosted runtimes now support Bitbucket Cloud as a Git provider.

{::nomarkdown}
<br>
{:/}

#### Card view for applications
A scannable Card view offers a new layout for applications in the Applications dashboard. 
Quickly scan application information top-down, starting with the health and sync statuses, followed by repo and runtime information, and easy access to the available actions at the bottom of the card. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-nov22-card-view.png"
 url="/images/whats-new/rel-notes-nov22-card-view.png"
 alt="Card view of applications"
 caption="Card view of applications"
 max-width="60%"
%}

{::nomarkdown}
<br>
{:/}

#### More application alerts
We added custom warnings for common scenarios with application deployment to our Errors/Warning panel, that both alert you to the problems and possible actions to resolve them.

**Missing Argo Rollouts controller**  
Applications with rollout resources need Argo Rollouts on the managed cluster to execute rollout instructions and deploy the application.
If the Argo Rollouts controller is missing, you get a warning with the option to install Argo Rollouts on the cluster.  

**Long application sync**  
Application sync can continue indefinitely because of issues with the application that you need to troubleshoot, unrelated to Codefresh.  
A new warning alerts you to sync operations that exceed 30 minutes.  
The View Details option takes you directly to the Sync Results tab with details on the sync job and failed hooks, and the option to terminate the sync, and then troubleshoot the application. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-nov22-app-warnings.png"
 url="/images/whats-new/rel-notes-nov22-app-warnings.png"
 alt="Example of warning for missing Argo Rollouts controller"
 caption="Example of warning for missing Argo Rollouts controller"
 max-width="60%"
%}

See [Identify applications with errors/warnings]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#identify-applications-with-warningserrors).

{::nomarkdown}
<br>
{:/}

#### Hide extraneous resources from Current State views
Streamline Current State views for your application's resources by hiding resources not native to the application.   
The Ignore Extraneous filter allows you to hide resources generated by tools, whose sync status _does not_ affect the sync status of the application. `ConfigMap` and `pods` are examples of such resources.  
Once you add the  `IgnoreExtraneous` annotation to the resource, clicking the Ignore Extraneous filter hides the resource from the Current State views.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-nov-22-ignore-extraneous-annotation.png"
 url="/images/whats-new/rel-notes-nov-22-ignore-extraneous-annotation.png"
 alt="Example of resource with IgnoreExtraneous annotation"
 caption="Example of resource with IgnoreExtraneous annotation"
 max-width="60%"
%}

See [Filters for application resources]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#filters-for-application-resources).
{::nomarkdown}
<br>
{:/}{::nomarkdown}
<br>
{:/}

### Bug fixes

{::nomarkdown}
<br>
{:/}

**Runtimes**  
* "Failed to create default-git-source" error during hybrid runtime installation.
* Self-signed certificates and private root CA (Certificate Authority) not supported for on-premises Git providers.
* Upgrade runtime failure when copying and pasting CLI command from Codfresh UI.
* Runtime installation reports errors as warnings.
* Invalid GitLab token passes validation.
* Status not updated for deleted PAT (Personal Access Token) in User Settings. 
* GitLab repos with multiple levels incorrectly truncated to the first level in Codefresh UI.
* Missing `--provider` flag when creating Git Sources via CLI.
* INTERNAL_SERVER_ERROR when installing a runtime using `--shared-config-repo` flag with GitLab.

{::nomarkdown}
<br>
{:/}

**Applications**    
* Incorrect status for current sync operation.
* No results on applying filters in DORA metrics dashboard.
* Broken links between parent and child applications in Application Set in Applications dashboard > List view.
* Discrepancy between status in health snapshot filter and corresponding list of applications.
* Resources with Missing health status not displayed in Current State.
* "No Git Source with write permissions" error on creating application.
* Deleted applications shown as errors in the Error/Warning panel.
* Wrong commit message in the Timelines tab for Git Source-applications.
* PR (Pull Request) number in the  Timelines tab does not match the commit in the Application header.
* No indication for extended application sync operations.
* Codefresh UI does not sync applications as part of Application Set.
* No option to terminate sync for indefinitely syncing applications. 
* Scrolling up/down in Current State > Tree View causes resource nodes to move off the screen.

{::nomarkdown}
<br>
{:/}

**Delivery Pipelines and workflows**  
* Pipeline failure when there are two or more trigger conditions with the same event. 
* Formatting issues for logs with timestamps.
* Change in Delivery Pipeline manifest overrides current sensor configuration.
* No error message for step with invalid dependency.

{::nomarkdown}
<br>
{:/}

**Others**  
* Safari: Clicking Settings icon on the toolbar does not open Configuration page.
* No option to log out on selecting an incorrect authentication provider.

## October 2022

### Features & enhancements
{::nomarkdown}
<br>
{:/}

#### Kubernetes version runtime support
We now support Kubernetes server versions 1.21 and higher.

{::nomarkdown}
<br>
{:/}

#### Request Routing Service for runtimes
We have changed the routing mechanism for hybrid runtimes. URL requests and webhooks are now routed through a new internal routing service instead of through the ingress controller.  

The change is effective from runtime version 0.0.543 and higher. If you already have runtimes installed, this change does not require any action from you, both to upgrade to the new runtime version or retain existing runtimes. Older runtimes continue to use the ingress controller for routing purposes.  

See the description for Request Routing Service in [Hybrid runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

{::nomarkdown}
<br>
{:/}

#### More Git providers for runtimes
Codefresh runtimes now support GitHub Enterprise, GitLab, and Bitbucket as Git providers, apart from GitHub, which is the default.
 
When installing the first hybrid or hosted runtime for your account, you can define the Git provider of choice. Because Codefresh creates a configuration repository that is shared with subsequent runtimes in the same account, you cannot change the Git provider for a different runtime in the same account. 

Each Git provider requires runtime tokens with specific scopes and has specific installation requirements. Once installed, you can authorize access to the Git provider through OAuth or a personal access token.

Note that GitLab cloud is not supported for hosted runtimes.

See [Git provider and repo flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#git-provider-and-repo-flags).

{::nomarkdown}
<br>
{:/}

#### Turn off notifications for runtimes
Codefresh alerts you to runtimes that are insecure or have invalid or expired Git personal access tokens. You can turn off these notifications selectively for runtimes for which these alerts are less critical, such as non-production runtimes.  

The option is user-specific, and applies only to runtimes in the user's account. 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-oct22-dismiss-runtime-notifications.png"
 url="/images/whats-new/rel-notes-oct22-dismiss-runtime-notifications.png"
 alt="Turn off notifications for selected runtime"
 caption="Turn off notifications for selected runtime"
    max-width="80%"
%}

Runtimes with disabled notifications are prefixed with an icon as in the picture below.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-oct22-dimiss-notifications-indication.png"
 url="/images/whats-new/rel-notes-oct22-dimiss-notifications-indication.png"
 alt="Runtime with disabled notifications"
 caption="Runtime with disabled notifications"
    max-width="80%"
%}

{::nomarkdown}
<br>
{:/}

#### Rollout Player for deployments
Managing ongoing rollouts during a deployment is now simple with the Rollout Player. Clicking the rollout name in Timeline > Updated Services, displays both the visualization of the steps in the rollout and the Rollout Player. With the Rollout Player you can control individual steps in an ongoing rollout and even promote the rollout to a release.
 
{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-oct-22-rollout-player.png"
 url="/images/whats-new/rel-notes-oct-22-rollout-player.png"
 alt="Rollout Player"
 caption="Rollout Player"
    max-width="40%"
%}


The Rollput Player allows you to:
* Resume an indefinitley paused step 
* Forward a step by skipping its execution 
* Promote the rollout to deployment by skipping remaining pause, analysis

{::nomarkdown}
<br>
{:/}

#### Context menu for application resources
We have enhanced the functionality for application resources in the Current State tab with the context menu for resources. The options available differ according to the type of resource.  

<!---As the context menu is fully compatible with open source custom actions, any custom action you add is automatically displayed and available. -->

**On-demand sync for individual application resources**  
Sync is a context menu option available for all resources that track sync status. You can sync individual resources as needed or when out-of-sync without synchronizing or refreshing the application. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-oct-22-sync-context-menu.png"
 url="/images/whats-new/rel-notes-oct-22-sync-context-menu.png"
 alt="Sync option in resource context menu"
 caption="Sync option in resource context menu"
    max-width="50%"
%}  

**Rollout resource actions**  
The context menu for `rollout` resource types have actions to control the rollout. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-oct22-rollout-context-menu.png"
 url="/images/whats-new/rel-notes-oct22-rollout-context-menu.png"
 alt="Context menu options for Rollout resource"
 caption="Context menu options for Rollout resource"
    max-width="50%"
%} 

{::nomarkdown}
<br>
{:/}

#### Other enhancements

**Git Sources as Application Type filter**  
The list of filters for Application Type in the Applications dashboard includes the Git Source filter. Filtering by Git Source shows `Git Source Apps` which are applications created by Codefresh that store definitions of Argo Project resources.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-oct22-app-type-git-source.png"
 url="/images/whats-new/rel-notes-oct22-app-type-git-source.png"
 alt="Git Source as Application Type filter"
 caption="Git Source as Application Type filter"
    max-width="40%"
%}


**Manifests for Analysis Runs**  
Analysis Run now shows the manifest in addition to the run results.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-oct22-analysis-run-manifest.png"
 url="/images/whats-new/rel-notes-oct22-analysis-run-manifest.png"
 alt="Manifest for Analysis Run"
 caption="Manifest for Analysis Run"
    max-width="40%"
%}

{::nomarkdown}
<br>
{:/}

### Bug fixes

{::nomarkdown}
<br>
{:/}

**Runtimes**  

* 500: Internal Server Error when adding cluster command to hosted runtime.
* Commit SHA link in Activity Log goes to the Home page instead of to the Commit URL for the Git provider.
* Ingress controller errors for cluster even when `skip-ingress` flag is defined.
* Retry mechanism requests cause delay in Git integration checks. 
* For hosted runtimes, Git Source is not displayed though the Connect to Git provider step is marked as complete.
* No option to log out on selecting invalid authentication mode.
* Removing a managed cluster does not display any indication in Codefresh UI.
* Up-to-date runtimes display upgrade indication.


{::nomarkdown}
<br>
{:/}

**Applications**  
* Applications deleted in Git displayed as errors, or as Missing in Codefresh.  
* Tagging/untagging favorite application breaks relationship to parent application.
* Application definitions validation for cluster URL that does not exist shows wrong entity type.
* Incorrect number of replicas for previous image in Applications dashboard.
* Mismatch between information reported for cluster and namespace in Applications dashboard and Images.
* Source link in Timeline tab redirects to incorrect branch.
* Missing Health indication for Argo Rollouts in Codefresh UI.

{::nomarkdown}
<br>
{:/}

**Delivery Pipelines and workflows**
* 100% CPU consumption for workflows with more than 20 nodes.
* Discard Changes button enabled when there are no changes. 


## September 2022



### Features & enhancements
{::nomarkdown}
<br>
{:/}

#### Enriched application header
Every application includes a header that highlights key information and links to key aspects of the application. For example, you can see both the current sync state and the result of the previous sync operation, with links to pull-out panels including additional details.


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-sep22-app-header.png"
 url="/images/whats-new/rel-notes-sep22-app-header.png"
 alt="Application header for selected appplication"
 caption="Application header for selected appplication"
    max-width="80%"
%}

#### Refresh and hard refresh to manage applications
Just as you can manually synchronize applications directly in Codefresh, you can now perform Refresh and Hard Refresh for applications. 
In the Applications dashboard, both options are available in the context menu of each application. On selecting an application, you can see these options on the top-right next to the Synchronize button.


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-sep22-refresh-hardrefresh.png"
 url="/images/whats-new/rel-notes-sep22-refresh-hardrefresh.png"
 alt="Refresh/Hard refresh options for selected application"
 caption="Refresh/Hard refresh options for selected application"
    max-width="80%"
%}



#### Click resume indefinitely paused rollouts
Argo Rollouts allows you to pause a rollout indefinitely and resume it manually instead of automatically after a fixed duration. Manually resuming a rollout is generally done through the CLI.   
Codefresh provides you the option of resuming an indefinitely paused rollout directly from the Applications dashboard in Codefresh, with a single click. 

In the Timelines tab of the selected application, an ongoing rollout that is indefinitely paused displays the pause button. Resuming the rollout is as simple as clicking the pause button.


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-sep22-resume-pause.png"
 url="/images/whats-new/rel-notes-sep22-resume-pause.png"
 alt="Resume indefinitley paused rollout"
 caption="Resume indefinitley paused rollout"
    max-width="60%"
%}

####  Custom path for application resources
When creating applications, in addition to changing the name of the manifest, you can now also define the path for the manifest within the Git Source. Use the front slash (/) to add subfolders to the path. The resource is created in the Git Source you select, according to the path you defined. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-sep22-app-yaml-location.png"
 url="/images/whats-new/rel-notes-sep22-app-yaml-location.png"
 alt="Define location for application YAML"
 caption="Define location for application YAML"
    max-width="60%"
%}



#### Events tab for applications
In the previous month's release, we added the Events panel displaying successful and events for the application.
For more visibility and easier access, the same Events tab is now displayed with the Current State, Timeline, Services, and Configuration tabs for the selected application.

 
{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-sep22-events-tab.png"
 url="/images/whats-new/rel-notes-sep22-events-tab.png"
 alt="Events tab for application"
 caption="Events tab for application"
    max-width="60%"
%}


### Bug fixes

{::nomarkdown}
<br>
{:/}

**Runtimes**  
* Incorrect status for Hosted runtime when app-proxy is unreachable. 
* Git provider not registered for hosted runtimes with Git Sources defined in the shared configuration repo. 
* Authentication failure between platform and app proxy. 
* Adding cluster to a runtime shows an error even when the cluster is added to the runtime. 
* Duplicate dates in Activity Log notifications. 
* Argo CD fails to connect to K8s 1.24 clusters.
* After uninstalling a runtime, argo-rollouts and rollout-reporter files remain for managed cluster remain in shared configuration repo.
* Deleted managed cluster shows as Unknown.

{::nomarkdown}
<br>
{:/}

**Applications**  
* Health status does not change to progressing when previously degraded. 
* Wrong git source reference 
* Git Source applications in the Applications dashboard not reflected in the Runtimes > Git Source tab. 
* Switching from YAML to form view after changing fields does not update validations. 
* App details drawer crashes when application does not have resources. 
* Missing namespace for resources.
* Full Screen does not work in Safari.
* Recreating an application with the same name as that of a deleted application displays incorrect data for rollouts in the Timeline tab.
* In the Timeline tab, data for a new release with long sync duration is assigned to the previous release.


## August 2022

### Features & enhancements

#### GitHub Container Registry
In this release, we added support for GitHub Container Registry (GHCR), a popular container registry tool. The settings for GitHub Container registry integration are identical to that of the other container registry integrations: the integration name, the runtimes to share the integration with, and the domain, username, and token.   
You also have the Test Connection option to test credentials before committing the changes.  
Once defined, you can reference the integration by name in the CI platforms. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-github-cr.png"
 url="/images/whats-new/rel-notes-aug22-github-cr.png"
 alt="GitHub Container registry integration"
 caption="GitHub Container registry integration"
    max-width="70%"
%}

See [GitHub Container registry]({{site.baseurl}}/docs/gitops-integrations/container-registries/github-cr/).

#### Labels and annotations for managed clusters
The Codefresh CLI supports labels and annotations for managed clusters.  
When you add a managed cluster in Codefresh, you can optionally add labels and annotations with the  `--labels` and the `--annotations` flags.  Codefresh supports the standard key-value formats for both, with multiple items separated by `,`. K8s rules for labels and annotations are valid here as well.  

See [Add a managed cluster with Codefresh CLI]({{site.baseurl}}/docs/installation/gitops/managed-cluster/#add-a-managed-cluster-with-gitops-cli)and [Add a managed cluster with Kustomize]({{site.baseurl}}/docs/installation/gitops/managed-cluster/#add-a-managed-cluster-with-kustomize).

#### Event information for application resources
View events for application resources directly in Codefresh.  
While the Applications dashboard flags errors in all applications at the global level, the Events tab isolates successful and failed events per resource within an application, useful for resources such as pods. 

Instead of having to navigate to Argo CD to view events for an application resource, clicking the resource in the Current State view in Codefresh displays the Events tab for that resource. Events are displayed in descending order, with the most recent event displayed first. 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-events-tab.png"
 url="/images/whats-new/rel-notes-aug22-events-tab.png"
 alt="Events tab for application in Current State"
 caption="Events tab for application in Current State"
    max-width="60%"
%}

#### Quick View for applications
Similar to the detailed views for application resources, Codefresh offers a detailed view also for the application itself. 
The Quick View for an application, collates definition, deployment, and event information, in the same location. The information is grouped into tabs for intuitive viewing: Summary, Metadata, Parameters,  Sync Options,  Manifest, and Events (as in the picture below).
 
Easily access the Quick View either by selecting Quick View from the application’s context menu in the Applications dashboard, or by clicking the application resource in the Current State view.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-quickview-events.png"
 url="/images/whats-new/rel-notes-aug22-quickview-events.png"
 alt="Application Quick View: Events tab"
 caption="Application Quick View: Events tab"
    max-width="40%"
%}

See [Application Quick View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#view-deployment-and-configuration-info-for-selected-application).



#### Usability enhancements for applications
**Context menu for applications**  
Every application in the Applications dashboard includes a new context menu with access to frequently-used and useful options such as Quick View, synchronize, and edit applications.


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-new-app-nav.png"
 url="/images/whats-new/rel-notes-aug22-new-app-nav.png"
 alt="Tab order on application drilldown"
 caption="Tab order on application drilldown"
    max-width="70%"
%}


**Validations before commit with intuitive error message**  
Codefresh validates Source, Destination, and Advanced Settings such as the Argo CD Project, when you create or update applications,  _before_ committing the changes.  
For easy identification, the section with the error is also highlighted in the Form, not only in the YAML manifest. For example, if the Revision or Path is missing in the General settings, the section is highlighted in red and the message displayed includes details on the possible reasons for the error.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-aug22-app-validation-errors.png"
 url="/images/whats-new/rel-notes-aug22-app-validation-errors.png"
 alt="Validation errors in Form mode for application"
 caption="Validation errors in Form mode for application"
max-width="60%"
%}

#### Miscellaneous changes

{: .table .table-bordered .table-hover}
| Item    | Description     | 
| ----------  |  -------- | 
| `CF_HOST`       | Deprecated from v 0.0.460 and higher in CI integrations. Recommend using `CF_RUNTIME_NAME` instead. See [CI integrations argument reference]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/#ci-integration-argument-reference). | 
| `GHCR_GITHUB_TOKEN_AUTHENTICATION`       | New value for `CF_CONTAINER_REGISTRY_INTEGRATION` argument. Can be selected for GitHub Container (GHCR) registries even when you don’t have a GHCR integration in Codefresh. See [GitHub Action-Codefresh integration settings]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/github-actions/#github-action-gitops-integration-settings).| 



### Bug fixes

**Runtimes**  
* Uninstalling runtime does not remove the integrations shared with the runtimes.
* Uninstalling a hosted or hybrid runtime does not remove it from the shared configuration repository.
* Unable to install Argo Rollouts on clusters with long cluster names. 
* Empty Argo CD logs with "http internal error" in Codefresh.  
* 500 status code on using default GKE/EKS context/cluster names. 

**Applications**  
* Trying to commit an application that already exists results in a commit failure. 

**Images**  
* Filters are not retained on navigating away from the Images dashboard. 

**Pipelines, workflows and Workflow Templates**  

* Workflow Template filter does not work for Git Source. 
* Missing validation for `WORKFLOW_NAME` variable.
* Incorrect sync history date for Workflow Templates.
* Error on detaching predefined filters in pipelines. 

**Integrations**
* Docker Hub integration list appears empty until refreshed even when there are integrations.
* Test Connection option disabled when integration name is not defined.




## July 2022

### Features & enhancements

#### Hosted GitOps
Codefresh has launched Hosted GitOps, our newest offering, a hosted and managed version of Argo CD.  

From application analytics, to application creation, rollout, and deployment, you get the best of both worlds: Argo CD with Codefresh's advanced functionalities and features for CD operations.
What it also means is easy set up and zero maintenance overhead.

Read on for a summary of what you get with Hosted GitOps.  

**Hosted runtime**  
Hosted GitOps supports hosted runtimes. The runtime is hosted on a Codefresh cluster and managed by Codefresh. Codefresh guides you through the three-step process of setting up your hosted environment. Read more in [Hosted runtime](#hosted-runtime).  

**Dashboards for visibility and traceability**  
Here's a recap of Codefresh dashboards, including a brand new dashboard dedicated to DORA metrics:
* GitOps Overview dashboard: For global analytics and system-wide deployment highlights, start with the GitOps Overview dashboard.  
* DORA metrics: A _new_ dashboard for DORA metrics and DevOps quantification. Read more in [DORA metrics](#dora-metrics).  
* Applications dashboard: Easily track deployments and visualize rollouts across clusters and runtimes in the Applications dashboard.  
 
**Application lifecycle management**  
Manage the entire application lifecycle directly in Codefresh, from creating, editing, and deleting applications.  
Define all application settings in a single location through the intuitive Form mode or directly in YAML, and commit all changes to Git.  

Synchronize applications manually when needed. Read more in [On-demand app synchronization](#on-demand-app-synchronization).  

**Integrations for image enrichment**
With Hosted GitOps, you can integrate your CI tools with Codefresh for image enrichment. Read more in [Integrations for image enrichment](#integrations-for-image-enrichment)

{::nomarkdown}
<br>
{:/}

#### Hosted runtime
Hosted GitOps supports a GitHub-based SaaS runtime, hosted on a Codefresh cluster, and managed by Codefresh.  
Setting up your hosted environment takes just a few clicks. All you need is a Codefresh account, a Git account, and a Kubernetes cluster to which to deploy your applications.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-hosted-initial-view.png"
 url="/images/whats-new/rel-notes-jul22-hosted-initial-view.png"
 alt="Hosted runtime setup"
 caption="Hosted runtime setup"
    max-width="80%"
%}

Codefresh guides you through the simple three-step process of provisioning your hosted runtime.  From that point, Codefresh handles administration and maintenance of the hosted runtime, including version and security updates.  

See [Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).

{::nomarkdown}
<br>
{:/}

#### DORA metrics
DORA metrics have become integral to enterprises wanting to quantify DevOps performance, and Codefresh has out-of-the-box support for it.  

The DORA dashboard in Codefresh goes beyond quantification, with features such as the Totals bar displaying key metrics, filters that allow you to pinpoint just which applications or runtimes are contributing to problematic metrics, show metrics for starred applications, and the ability to set a different view granularity for each DORA metric.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-dora-metrics.png"
 url="/images/whats-new/rel-notes-jul22-dora-metrics.png"
 alt="DORA metrics"
 caption="DORA metrics"
    max-width="60%"
%}

See [DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/).

{::nomarkdown}
<br>
{:/}

#### Integrations for image enrichment
If you have our Hosted GitOps for CD and a different tool for CI, you can continue to enrich images, retaining your CI tools. Allow Codefresh to retrieve and report the image information in your deployments by connecting your CI tools to Codefresh. Connect CI tools, issue tracking tools, container registries, and more.


This release introduces our integration offering, starting with: 
* GitHub Actions, Jenkins, and Codefresh Classic for CI 
* Jira for issue tracking
* Docker Hub, Quay, JFrog Artifactory for container registries

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-github-action-settings.png"
 url="/images/whats-new/rel-notes-jul22-github-action-settings.png"
 alt="Image enrichment with GitHub Actions integration"
 caption="Image enrichment with GitHub Actions integration"
    max-width="60%"
%}

 We are continually expanding the range of integrations, so stay tuned for release announcements on new integrations.  

Codefresh encrypts the credentials for every integration you create, and stores them securely as Kubernetes Sealed Secrets, ensuring that the integration flow is completely GitOps-compatible. Pipelines reference the integration by the integration name instead of integration credentials. Codefresh retrieves enrichment information using the encrypted Kubernetes secrets.  

See [Image enrichment with integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).

{::nomarkdown}
<br>
{:/}

#### Edit and delete applications

Application management has become easier as you can now edit and delete applications directly in Codefresh.  

Update General and Advanced settings for application. Go directly to the Configuration tab for the application by selecting Edit in the Applications dashboard.


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-edit-app-option.png"
 url="/images/whats-new/rel-notes-jul22-edit-app-option.png"
 alt="Edit application option"
 caption="Edit application option"
max-width="80%"
%}

The Delete application option is available when you select an application.
Codefresh warns you of the implication of deleting the selected application in the Delete form based on the Prune resource setting. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-delete-app.png"
 url="/images/whats-new/rel-notes-jul22-delete-app.png"
 alt="Delete application"
 caption="Delete application"
max-width="50%"
%}

See [Edit application definitions]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-application-definitions) and [Delete an application]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-an-application).

{::nomarkdown}
<br>
{:/}

#### On-demand app synchronization
Manually synchronize applications whenever needed directly from Codefresh. The synchronize option is a significant enhancement to the application lifecycle management options that we already support in Codefresh.  

The set of options for application synchronization are identical to that of Argo CD. For usability, they are grouped into two sets: Revision and Additional Options. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-sync-app.png"
 url="/images/whats-new/rel-notes-jul22-sync-app.png"
 alt="Synchronize application"
 caption="Synchronize application"
    max-width="60%"
%}

{::nomarkdown}
<br>
{:/}

#### Activate access for Codefresh support
User Settings include an option to allow Codefresh support personnel account access for troubleshooting purposes. The option is disabled by default. When enabled, access is always coordinated and approved, and all actions are audited. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-account-access.png"
 url="/images/whats-new/rel-notes-jul22-account-access.png"
 alt="Enable account access"
 caption="Enable account access"
    max-width="80%"
%}

See [Enable access for Codefresh support]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#enable-access-for-codefresh-support).

{::nomarkdown}
<br>
{:/}

#### View logs by container
When viewing logs for applications and workflows, you can now select the container for which to display them. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-log-container.png"
 url="/images/whats-new/rel-notes-jul22-log-container.png"
 alt="View logs by container"
 caption="View logs by container"
    max-width="50%"
%}

### Bug fixes
**Runtimes**  
* Unable to remove managed cluster on failure to add shared configuration repository.
* Maximum character limit not validated in cluster names.
* Failure when downloading logs for all runtime components.
* New cluster automatically assigned Unknown status.
* Sealed secret remains in cluster after uninstalling runtime.
* Unable to view rollouts on managed cluster.  


**Applications**  

* Resources without namespaces (such as cluster role) do not open in Current State.
* Sync state icon frozen when syncing the application.
* Application created with the same name as deleted application displayed as new deployment.
* No error when creating an application with the same name as an existing application.
* Applications dashboard does not display an application with incorrect Source.
* Applications dashboard does not display the Jira issue for Docker image.
* Sync policy appears as Manual though set to automatic.
* Sync error message partially cut off.
* Application release does not always return binaryId, and repositoryName for transition images.
* Application name not displayed in sync errors.

**Images**  
* Registry filter used with other filters returns wrong results.
* Find query for image applications.


**Other**  

* Unable to view, access, and add SSO integrations.
* Failure on sealing key management check.
* GitOps Overview dashboard: Most active pipelines and Delivery Pipelines displayed not aligned with the Time filter.
* Incorrect sorting for workflow and pipeline lists.	



## June 2022

### Features & enhancements

#### Shared configuration for runtimes
Define configuration settings for a runtime once, and reuse the configuration settings for multiple runtimes in the same account. Reduce time needed to define  and maintain configuration settings for every runtime separately.  

After defining the repository in which to store configuration settings, you can reference the repository, selectively from specific runtimes, or from all runtimes, and  share the configuration.  

Older versions of hybrid runtimes without the shared repository must be upgraded to the latest version  to  leverage the  shared configuration, specifically for integrations with CI platforms and tools.  

For details, see [Shared runtime configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/).

#### Logs for runtime components
View and download logs for runtimes and runtime components. The logs record events from the time of application launch for all resources in the application.  

Download logs for offline viewing and analysis, or view logs per component online, and download as needed:  

* Download all logs: Available for every runtime for download as a single `.tar.gz` file, including the different log files for each runtime component.  
{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-runtime-logs-all.png" 
	url="/images/whats-new/rel-notes-june22-runtime-logs-all.png" 
	alt="Download all logs for a runtime" 
	caption="Download all logs for a runtime"
   max-width="60%" 
  %}
  
* View/download logs per component: Available for every runtime component. View online logs, displaying up to 1000 lines of the most recent events. Locate information with  free-text search, and navigate between search results using the next/previous buttons. Enhance readability by turning on line-wrap when needed. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-runtime-log-screen.png" 
	url="/images/whats-new/rel-notes-june22-runtime-log-screen.png" 
	alt="View logs online for runtime component" 
	caption="View logs online for runtime component"
   max-width="60%" 
  %}

For details, see [View/download runtime logs]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#viewdownload-logs-to-troubleshoot-gitops-runtimes).

#### OAuth2 authentication
OAuth (Open Authorization) 2.0 has become an industry standard for online authorization. Codefresh supports connections to your Git provider using OAuth2. Codefresh integrates with Git to sync repositories to your clusters, implement Git-based actions when creating resources such as Delivery Pipelines, and to enrich Images with valuable information.  

Codefresh provides a default, predefined OAuth2 application for every runtime. As an account administrator in Codefresh, you can optionally create an OAuth2 Application in GitHub and set up authentication within Codefresh. Users in Codefresh can then authorize access to GitHub with OAuth2, instead of with a personal access token.  

For details, see [Set up OAuth2 authentication]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup/).


#### Application resources in Tree view 
The Tree view of the Current State complements the List view of the same in the Applications dashboard. Similar to the List view, the Tree view also displays all the resources deployed for an application, with additional unique features.  

What is unique about the Tree view?  
First, the Tree view simplifies visualization of and tracking resources for any deployment, think complex deployments with hundreds of resources.  Second, it is designed to impart key information for each resource at a glance. Every resource shows its health status (color-coded border), sync state (icon prefixed to name), and metadata on mouse-over. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-tree-view.png" 
	url="/images/whats-new/rel-notes-june22-tree-view.png" 
	alt="Application Current State: Tree view" 
	caption="Application Current State: Tree view"
   max-width="60%" 
  %}


**Progressive discovery**  

By the very nature of its design, the Tree View allows progressive discovery. View all resources at once, or start with a parent resource, and expand it to view siblings and children to understand how they are connected.  

**Resource filters**  

The filters in the List view are available also in the Tree view. These global filters help narrow the scope of the resources displayed, by kind, health status, and sync state. The filters set in either the List or Tree vies are retained when navigating between them.   

**Resource search and find**  

The Search option lets you locate resources by searching for any part of the resource name. Similar to the filters, search results are also retained when navigating between Tree and List views.  
For quick search, use the Find option to locate and navigate to required resources.  

**Resource inventory**  

At the bottom-left, the resource inventory summarizes your deployment in numbers per resource kind. Syncing and Out-of-Sync resources for each kind are bucketed separately, for visibility, and for quick access to filter resources by these states.   

**Resource manifest and logs**  

In addition to the metadata on mouse-over for a resource, clicking a resource shows its manifests and logs based on the resource type. View and compare the Desired and Live states for managed resources in Git repositories.  
Another usability enhancement is the ability to share resource details by copying the URL and sending it to others in your organization for collaborative review.  

Logs are displayed if the resource has logs:  

* For online viewing, you have free-text search and line-wrap functionalities. 
* For offline viewing and analysis, you can download the complete log into a text file.   

For details, see [Monitor application resources in Current State]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitor-resources-for-selected-application).

#### Application rollout visualization 
In addition to installing Argo Rollouts in your cluster, visualize Argo Rollout history and progress directly in the Applications (deployment) dashboard. Visualize rollouts from multiple clusters and runtimes in a single centralized location through the Deployment tab.

**Rollout progress**
Ongoing rollouts show the progress of the rollout in the real time. Completed rollouts show the switch to the new version according to the deployment strategy. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-rollout-in-progress.png" 
	url="/images/whats-new/rel-notes-june22-rollout-in-progress.png" 
	caption="Application Rollout: Progress visualization"
   max-width="60%" 
  %}

**Rollout steps**  

As the rollout occurs, visualize step-by-step progress. Expanding Background Analysis  displays metric queries  and the manifest of the analysis template.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-rollout-analysis.png" 
	url="/images/whats-new/rel-notes-june22-rollout-analysis.png" 
	caption="Application Rollout: Steps visualization"
   max-width="30%" 
  %}

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-rollout-query-metrics.png" 
	url="/images/whats-new/rel-notes-june22-rollout-query-metrics.png" 
	caption="Application Rollout: Query metrics"
   max-width="30%" 
  %}

For details, see [Monitor deployments for application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitor-rollouts-by-deployment).

#### Nested workflows
Add nested workflow functionality to Codefresh pipelines. A nested workflow is a step within the parent workflow that either submits a new workflow, or creates a PR (Pull Request) that runs a different workflow based on the PR result.

Nested workflows run independently of the parent workflow that submitted them. A nested submit workflow has traceability in both directions, from the parent to child, and from the child to the parent. A workflow triggered by a nested PR identifies the PR that triggered it.  

Here’s an example of a parent workflow that submits two nested workflows, and the link back to the parent workflow from one of the child workflows.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-jun22-nested-parent-submit.png" 
	url="/images/whats-new/rel-notes-jun22-nested-parent-submit.png" 
	caption="Parent workflow with two nested submit workflows"
   max-width="60%" 
  %}

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-jun22-nested-child-submit.png" 
	url="/images/whats-new/rel-notes-jun22-nested-child-submit.png" 
	caption="Child submit workflow with link to parent workflow"
   max-width="60%" 
  %}

The Codefresh Hub for Argo has two ready-to-use Workflow Templates that:  

* Submits a workflow
* Creates a PR to run the workflow that tracks the PR  

For details, see [Nested workflows]({{site.baseurl}}/docs/workflows/nested-workflows/).

### Bug fixes
**Runtimes**  

* Encrypted Git integration remains when uninstalling runtime through the CLI, and decryption through app-proxy fails.
* Rollback occurs during installation via CLI. 
* Runtime ignores –Demo resources=false flag install confirmation.
* Installation via CLI stops when demo resources are not installed even when –demo -resources flag is set to false.
* No errors during installation via CLI when flags are incorrectly located.
* Runtime name with health or sync errors not highlighted in Codefresh UI.

**Images**  

* Empty pages on changing filters in page two or higher.  
* Broken link for an image not in logged-in user account.
* Images view not updated with current application with rollout resource.

**Applications**  

* Lock out due to slow application load. 
* Application dashboard remains frozen in Progressing state.
* Application dashboard > Timeline tab:  

  * Default view not restored on removing date range defined in the Timeline tab.
  * Order of deployments in the chart not identical to the list of rollouts.
  * Committer for GitOps change missing in Commit information.
  * Missing commit message for SHA link.
  * Changes to an image tag not reflected.
  * Rollout shows as in progress even after deployment status is healthy.
  * New release in Argo CD not displayed in Codefresh UI when latest release was degraded without previous rollout data.
  * Rollout YAML unavailable when application source is a Helm repo. 
* Applications dashboard > Services tab:  

  * Progressing rollout with manual traffic management returns empty Services list.
* Applications dashboard > Current State
  * Resource tree/list not restored on removing filters.  


**Pipelines**  

* Selecting an existing Workflow Template creates a new Workflow Template.
* Incorrect line numbers for pipeline template in Form mode.


## May 2022

### Features & enhancements

#### Runtime disaster recovery
Runtimes are integral to all CI/CD actions and operations in Codefresh. In this release, we added the capability to restore runtimes in case of cluster failures, either partial or complete.    
All you need is the existing Git repo where you installed the runtime containing the runtime resources. The restore process reinstalls the runtime, leveraging the resources in the existing repo. You can choose to restore the runtime to the failed cluster or to a different cluster.  
For details, see [Restore runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#hybrid-gitops-restoring-provisioned-runtimes).

#### AWS ALB ingress controller
AWS Application Load Balancer (ALB) is now part of our list of supported ingress controllers. 
For details, see [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#aws-alb-ingress-configuration).


#### Labels for runtime namespace
When installing runtimes, the `--namespace-label` flag lets you add labels to the runtime namespace. The labels identify and grant access to the installation network, required with service mesh ingress controllers such as Istio.  
For both CLI-based and silent installations, add the flag followed by one or more labels in `key=value` format. Note that these labels must be identical to those defined in the 'namespace' resource spec.  
For details, see [Runtime flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#runtime-flags).

#### Internal and external ingress hosts 
Codefresh runtimes support defining two ingress hosts, an internal and an external ingress host, for private and public networks. Previously, runtimes supported a single ingress host for both the app-proxy and webhook ingress resources. Internal and external ingress separation allows you to expose the Codefresh app-proxy service only within your private network, while keeping the webhook ingress unchanged.  
* New runtime installations: The `--internal-ingress-host` flag lets you can define an ingress host for communication with the app-proxy. For details, see [Ingress controller flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#ingress-controller-flags).
* Existing runtimes: To add an internal ingress host, you need to commit changes to the installation repository by modifying `app-proxy ingress` and `<runtime-name>.yaml`.   
For details, see _Internal ingress host configuration (optional)_ in [Post-installation configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#optional-internal-ingress-host-configuration-for-existing-hybrid-gitops-runtimes).  

For further customizations, add annotations for internal and external ingress hosts through the `--internal-ingress-annotation` and `--external-ingress-annotation` flags. 

#### oktapreview domain support
You can set up Okta SSO to log into your Okta preview environment. 

#### Git Source enhancements
A common scenario when using Git repositories for CI/CD is to include or exclude specific files or directories in the target repository from the destination repo or cluster. When creating or editing Git Sources in Codefresh, you can now include or exclude folders and files in the target Git repo, using Glob patterns for the same. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-may22-git-source-exclude-include.png" 
	url="/images/whats-new/rel-notes-may22-git-source-exclude-include.png" 
	alt="Include/exclude options in Git Source" 
	caption="Include/exclude options in Git Source"
   max-width="50%" 
  %}

You can also delete Git Sources if needed. Selecting additional actions for a Git Source, displays the Git Source details with the Delete option. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-may22-git-source-delete.png" 
	url="/images/whats-new/rel-notes-may22-git-source-delete.png" 
	alt="Delete Git Source" 
	caption="Delete Git Source"
   max-width="90%" 
  %}

For details, see [Add and manage Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/).

### Bug fixes
**Runtimes** 

* With Istio ingress, app proxy communication with Argo CD fails with `Unexpected token u in JSON error`.
* Adding a managed cluster always commits manifests to the main branch and not to the defined default branch.
* Add managed cluster command fails when ingress host includes `/` suffix.
* Application groups not supported in Current State for older runtime versions.
* Retrieving a list of Git Sources for a runtime via CLI, causes the CLI to crash.
* Uninstalling a runtime does not remove runtime-related secrets from the cluster.

**Applications**   

* Applications deleted from the Argo UI not removed from the Applications dashboard in Codefresh.
* Back button in  Applications > Timeline tab does not work.
* Hierarchy for AppSet application created in Argo CD not rendered correctly in Codefresh.
* Most Active Applications list in the GitOps Overview dashboard is incorrectly sorted.
* Link to CI build on Service in Applications Dashboard is hard-coded to Workflows.
* Add Application wizard creates invalid manifest.
* Removing a resource from an application does not remove it from the application’s Current State list. 
* Deleting an application deletes it from the cluster and the Git repo, but not from the database.
* Creating an application without path results in an error.
* On page reload, deployment chart in Application > Timeline tab does not reflect set filters.
* Resources with changed file names are not reported in Argo CD.
* Unknown state for application sets with targets on external clusters.

**Others** 
* Clicking the Settings icon shows a console error.
* Workflow Templates reported without Git manifests and desired state. 
* Get list of workflows for a pipeline via CLI returns 400 bad request.
* GitHub user without a public email address causes autopilot to crash in app-proxy.
* Within a staging app, regular deployment transition is empty and shows only replicas count.


## March-April 2022

### Features & enhancements 

#### Kubernetes version runtime support
We now support the latest Kubernetes server versions, 1.22 and 1.23. 

#### Ingress controllers
We are continually working on supporting additional Ingress controllers, and this release adds support for:
* Ambassador
* NGINX Enterprise
* Istio
* Traefik

All ingress controllers must be configured to report their status. 
For details, see [System requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements).


#### Argo CD managed cluster support
Argo CD can manage clusters without Argo CD installed on them. Now you have the same functionality in Codefresh, to add, view, and manage remote clusters.  
Admins can add an external cluster to a Codefresh runtime, and register it automatically as a managed cluster. From that point on, you have complete visibility into health and sync status, and options to manage them, including installing Argo Rollouts.  

With managed clusters in Codefresh, you get:
* Streamlined management: All cluster- and cluster-component level operations are managed through the runtime, in a centralized location. You can install new components, uninstall existing components, and remove the cluster from the runtime's managed list. A single click installs Argo Rollouts on the managed cluster.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-argo-rollouts.png" 
	url="/images/whats-new/rel-notes-argo-rollouts.png" 
	alt="Install Argo Rollouts for managed cluster in topology view" 
	caption="Install Argo Rollouts for managed cluster in topology view"
   max-width="70%" 
  %}

* Seamless upgrades: Upgrades to runtimes or to runtime components in the local cluster automatically upgrades those in managed clusters as well.
* Integration with dashboards: Applications dashboards reflect deployment information for applications in all managed clusters. When Argo Rollouts are installed, application rollouts are also reported to the dashboard. 

For details, see [Managed clusters]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).

#### Topology views for runtimes
  
Get a visual representation of the runtimes in your deployments, managed clusters, and cluster components with the Topology view for runtimes. 
Quickly identify key information such as health and sync status, and version.
Add new clusters to or remove existing clusters from runtime management.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-runtime-topology-view.png" 
	url="/images/whats-new/rel-notes-runtime-topology-view.png" 
	alt="Runtime topology view" 
	caption="Runtime topology view"
   max-width="70%" 
  %}

For details, see [Topology view for runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#topology-view).

#### Analytics dashboard
In addition to Delivery Pipelines, the Analytics dashboard shows Runtimes, Managed Clusters, Deployments, and Applications, to give you the complete CI/CD picture with key facts and insights.  

**Usability enhancements**  
  * Global filters are now located at the top of the dashboard.  
  * Resource-specific filters are available for that resource. 
  * A convenient View button takes you to the dedicated resource view for additional analysis.


{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-analytics-dashboard.png" 
	url="/images/whats-new/rel-notes-analytics-dashboard.png" 
	alt="Analytics dashboard" 
	caption="Analytics dashboard"
   max-width="70%" 
  %}

#### Applications dashboard
The Applications dashboard displays the individual deployments across your enterprise.  Here are the main enhancements:  

**Application inventory and status filters**  
  
  The health status snapshot in the Applications dashboard also works as a quick filter. Selecting a status filters applications by that status.    
  Filter criteria that match child applications automatically expands the parent application to show the child applications.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/app-dashboard-status-filter.png" 
	url="/images/whats-new/app-dashboard-status-filter.png" 
	alt="Applications dashboard: Filter by status" 
	caption="Applications dashboard: Filter by status"
  max-width="70%" 
  %}

**Rollouts**  

  Intuitive visualization with the option to open the Images view in a new browser window.  

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-apps-open-image.png" 
	url="/images/whats-new/rel-notes-apps-open-image.png" 
	alt="Applications dashboard: Link to Image view" 
	caption="Applications dashboard: Link to Image view"
  max-width="70%" 
  %}

**Git committers**  
  Hovering over an avatar shows all commits made by that committer.  


**Current state of cluster resources**  
  Hierarchical representation of the resources deployed by this application in the cluster.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-app-current-state.png" 
	url="/images/whats-new/rel-notes-app-current-state.png" 
	alt="Applications dashboard: Current State" 
	caption="Applications dashboard: Current State"
  max-width="70%" 
  %}

#### Workflow Templates
Codefresh provides full-fledged management for the Workflow Template resource, from optimizing existing Workflow Templates, to creating new ones, and testing Workflow Templates before commit. 
 
 {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/wrkflow-template-main.png" 
	url="/images/whats-new/wrkflow-template-main.png" 
	alt="Workflow Templates" 
	caption="Workflow Templates"
  max-width="70%" 
  %}

**Create, test, and optimize Workflow Templates**  
  Create Workflow Templates in three steps. Start by selecting one from the Codefresh Hub for Argo, or start with a blank template form. Customize the Workflow Template, and either run the template to test it or commit to submit it.  

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/wrkflow-template-add.png" 
	url="/images/whats-new/wrkflow-template-add.png" 
	alt="Add Workflow Template panel" 
	caption="Add Workflow Template panel"
  max-width="50%" 
  %}

  For both new and existing Workflow Templates, the **Run** option enables you to test a new template, or changes to an existing template, without needing to first commit the changes. If the Workflow Template has previous iterations, you can view the arguments and values used in those iterations. 

    {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-wrkflow-temp-manifest-run.png" 
	url="/images/whats-new/rel-notes-wrkflow-temp-manifest-run.png" 
	alt="Run option for Workflow Templates" 
	caption="Run option for Workflow Templates"
  max-width="70%" 
  %}

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-wrkflow-temp-run-args-view.png" 
	url="/images/whats-new/rel-notes-wrkflow-temp-run-args-view.png" 
	alt="Run Workflow Template: Arguments list" 
	caption="Run Workflow Template: Arguments list"
  max-width="40%" 
  %}
 
  The Workflows and Delivery Pipelines tabs associated with the selected Workflow Template are displayed in the respective tabs, giving you all the information in the same location.  


**Rename Workflow Template**  
  After creating a Workflow Template, you can rename it by selecting the template and clicking **Rename**.  
  The new name must be unique within the cluster. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-rename-workflow-template.png" 
	url="/images/whats-new/rel-notes-rename-workflow-template.png" 
	alt="Rename Workflow Template" 
	caption="Rename Workflow Template"
  max-width="70%" 
  %}
  

#### Application creation wizard

Create applications that are fully GitOps-compliant from the Codefresh UI. The application manifest is generated, committed to Git, and synced to your cluster. 
When creating the application, you can use the UI forms, or edit the manifest directly.



{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-app-create-settings.png" 
	url="/images/whats-new/rel-notes-app-create-settings.png" 
	alt="Application settings in application creation wizard" 
	caption="Application settings in application creation wizard"
  max-width="70%" 
%}


#### Delivery Pipeline flows 
The Delivery Pipeline flow features several usability and functionality enhancements.

**Seamless integration of Argo Event information with Argo Workflows**  

  Once a workflow is submitted for a Delivery Pipeline, the Workflows tab visualizes the connections between the steps in the workflow.  
  With Argo Event information for the workflow also incorporated into the visualization, you have a unified view of Argo Events and Argo Workflows in one and the same location, the events that triggered the workflow combined with the workflow itself.   

  The Event Source manifest, the event payload, and the Sensor manifest are displayed as pull-out panels, allowing you to easily copy paths for attributes from event payloads, view logs, and download artifacts.  

  This example shows the event payload from Argo Events for the workflow.  
  
{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-event-payload.png" 
	url="/images/whats-new/rel-notes-event-payload.png" 
	alt="Panel with Event Payload in Workflows tab" 
	caption="Panel with Event Payload in Workflows tab"
  max-width="70%" 
%}

  This example shows the sensor manifest from Argo Events for the workflow.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-event-srce-manifest.png" 
	url="/images/whats-new/rel-notes-event-srce-manifest.png" 
	alt="Panel with Sensor manifest in Workflows tab" 
	caption="Panel with Sensor manifest in Workflows tab"
  max-width="70%" 
%}

**Rename trigger resource** 

  Similar to Workflow Templates, you can now change the trigger name of a Delivery Pipeline. The sensor name cannot be changed. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-rename-pipeline-trigger.png" 
	url="/images/whats-new/rel-notes-rename-pipeline-trigger.png" 
	alt="Rename trigger option for Delivery Pipeline" 
	caption="Rename trigger option for Delivery Pipelines"
  max-width="70%" 
%}

**Git repo selection for commits**  

  A dropdown list allows you to select one or more Git repos in the Trigger Conditions tab. Start typing, and use autocomplete to view and select from the available Git repos.

{% include 
   image.html 
   lightbox="true" 
	file="/images/whats-new/rel-notes-git-repo-select.png" 
	url="/images/whats-new/rel-notes-git-repo-select.png" 
	alt="Git repo selection for Delivery Pipelines" 
	caption="Git repo selection for Delivery Pipelines"
  max-width="70%" 
%}


**Errors/warning in manifests synced with the line number in manifest**  

  Clicking the line number next to an error or a warning changes focus to the line in the manifest file with the error or warning.


#### Workflows dashboard enhancements

**Link from workflows to their pipelines**  

  Workflow names in the dashboard are clickable links. Clicking a workflow name takes you directly to the pipeline associated with that workflow.

**New status for active workflows without events**  

Identify workflows that are active but do not have any execution data with the new status filter in the Workflows dashboard. Filtering by Status ‘Unknown’ shows workflows without events for the last hour.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-workflow-unknown-status.png" 
	url="/images/whats-new/rel-notes-workflow-unknown-status.png" 
	alt="Unknown status filter for workflows" 
	caption="Unknown status filter for workflows"
  max-width="50%" 
%}

#### Image reporting with Docker config.json 
You can now also authenticate to a Docker registry using `docker./config.json` to report image information. Note that `config.json` is not currently supported for GCR, ECR, and ACR.  
For more information on the required fields, see [Report image info](https://github.com/codefresh-io/argo-hub/blob/main/workflows/codefresh-csdp/versions/0.0.6/docs/report-image-info.md){:target="\_blank"}.


#### OpenShift 4.8 support 
We now support Red Hat OpenShift 4.8. For detailed information, read their [blog](https://cloud.redhat.com/blog/red-hat-openshift-4.8-is-now-generally-available#:~:text=OpenShift%204.8%20improves%20the%20bare,is%20now%20shipping%20with%20OpenShift){:target="\_blank"}.

### Bug fixes

**Applications dashboard**  

* Inaccurate results when filtering by Application type.
* Cluster shows the address of the Argo CD cluster instead of the target cluster.
* Broken Commit link in Application Preview.
* Filter by favorites does not show ApplicationSets.
* Releases not ordered correctly.
* Missing tags for Application/AppllicationSet. 
* Loop created on changing date in the Applications dashboard. 
* Rollouts in Deployment chart not aligned with the actual order of rollouts.
* Missing current release label.
* Missing commit message
* JIRA annotations not displayed for Images in Docker.io.
* Avatars show up intermittently.
* Incorrect Committers in Applications dashboard.
* Performance issues.

**Images**  

* Duplicate applications in Images repositories with different tags.
* Unmarked deployed images.

**Pipelines**  

* Empty event-sources.
* Missing created/updated/deleted status for resources.
* Event mapping issues.
* Creating a new pipeline with an existing Template shows empty Template tab.

**Upgrade**  

* Agent upgrade overrides configuration in previous release.

**Uninstall**  

* Artifacts in database after uninstalling with `--force` flag.
* Uninstallation issues with newer K8s versions.


