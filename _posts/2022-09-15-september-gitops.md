---
title: "September 2022 - GitOps"
description: "Changelog and Release Notes For GitOps"
---

## Features & enhancements

### Enriched application header

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

### Refresh and hard refresh to manage applications

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

### Click resume indefinitely paused rollouts

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

### Custom path for application resources

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

### Events tab for applications

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

## Bug fixes

### Runtimes

* Incorrect status for Hosted runtime when app-proxy is unreachable.
* Git provider not registered for hosted runtimes with Git Sources defined in the shared configuration repo.
* Authentication failure between platform and app proxy.
* Adding cluster to a runtime shows an error even when the cluster is added to the runtime.
* Duplicate dates in Activity Log notifications.
* Argo CD fails to connect to K8s 1.24 clusters.
* After uninstalling a runtime, argo-rollouts and rollout-reporter files remain for managed cluster remain in shared configuration repo.
* Deleted managed cluster shows as Unknown.

### Applications

* Health status does not change to progressing when previously degraded.
* Wrong git source reference
* Git Source applications in the Applications dashboard not reflected in the Runtimes > Git Source tab.
* Switching from YAML to form view after changing fields does not update validations.
* App details drawer crashes when application does not have resources.
* Missing namespace for resources.
* Full Screen does not work in Safari.
* Recreating an application with the same name as that of a deleted application displays incorrect data for rollouts in the Timeline tab.
* In the Timeline tab, data for a new release with long sync duration is assigned to the previous release.
