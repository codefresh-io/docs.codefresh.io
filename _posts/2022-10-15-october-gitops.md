---
title: "October 2022 - GitOps"
description: "Changelog and Release Notes For GitOps"
---

## Features & enhancements

### Kubernetes version runtime support

We now support Kubernetes server versions 1.21 and higher.

### Request Routing Service for runtimes

We have changed the routing mechanism for hybrid runtimes. URL requests and webhooks are now routed through a new internal routing service instead of through the ingress controller.  

The change is effective from runtime version 0.0.543 and higher. If you already have runtimes installed, this change does not require any action from you, both to upgrade to the new runtime version or retain existing runtimes. Older runtimes continue to use the ingress controller for routing purposes.  

See the description for Request Routing Service in [Hybrid runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

### More Git providers for runtimes

Codefresh runtimes now support GitHub Enterprise, GitLab, and Bitbucket as Git providers, apart from GitHub, which is the default.

When installing the first hybrid or hosted runtime for your account, you can define the Git provider of choice. Because Codefresh creates a configuration repository that is shared with subsequent runtimes in the same account, you cannot change the Git provider for a different runtime in the same account.

Each Git provider requires runtime tokens with specific scopes and has specific installation requirements. Once installed, you can authorize access to the Git provider through OAuth or a personal access token.

Note that GitLab cloud is not supported for hosted runtimes.

See [Git provider and repo flags]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#git-provider-and-repo-flags).

### Turn off notifications for runtimes

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

### Rollout Player for deployments

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

### Context menu for application resources

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

### Other enhancements

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

## Bug fixes

### Runtimes

* 500: Internal Server Error when adding cluster command to hosted runtime.
* Commit SHA link in Activity Log goes to the Home page instead of to the Commit URL for the Git provider.
* Ingress controller errors for cluster even when `skip-ingress` flag is defined.
* Retry mechanism requests cause delay in Git integration checks.
* For hosted runtimes, Git Source is not displayed though the Connect to Git provider step is marked as complete.
* No option to log out on selecting invalid authentication mode.
* Removing a managed cluster does not display any indication in Codefresh UI.
* Up-to-date runtimes display upgrade indication.

### Applications

* Applications deleted in Git displayed as errors, or as Missing in Codefresh.  
* Tagging/untagging favorite application breaks relationship to parent application.
* Application definitions validation for cluster URL that does not exist shows wrong entity type.
* Incorrect number of replicas for previous image in Applications dashboard.
* Mismatch between information reported for cluster and namespace in Applications dashboard and Images.
* Source link in Timeline tab redirects to incorrect branch.
* Missing Health indication for Argo Rollouts in Codefresh UI.

### Delivery Pipelines and workflows

* 100% CPU consumption for workflows with more than 20 nodes.
* Discard Changes button enabled when there are no changes.
