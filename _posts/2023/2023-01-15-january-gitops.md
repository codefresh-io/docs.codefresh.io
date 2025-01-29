---
title: "GitOps Release Notes: January 2023"
description: "Changelog and Release Notes for GitOps"
---

## Features & enhancements

### SSH for runtimes

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

### Artifact visualization in Argo Workflows

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

### Manual rollback for rollouts

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

### Application enhancements

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

### Argo Project enhancements

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

* **Argo CD upgrade**  
  We have upgraded Argo CD version to 2.5. Read more on what this version includes in the [official documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/upgrading/2.4-2.5/){:target="\_blank"}.  

* **Argo Rollouts upgrade**  
  We have upgraded our Argo Rollouts version to 1.4rc-1. Read more this version of Argo Rollouts in their [official blog](https://blog.argoproj.io/argo-rollouts-1-4-release-8275a0d364be){:target="\_blank"}.

## Bug fixes

### Runtimes

* Hybrid runtime installation fails when Git repo definition includes subdirectory.
* Unable to add GKE Autopilot Cluster to Hosted runtime.
* Argo-hub pipeline does not work with PR from forked repo.
* Runtime fails to install after autopilot-bootstrap with a non-default branch.

### Workflows and applications

* Workflow state not updated on clicking Retry.
* `jsonBody` displayed as an unknown field in AnalysisTemplate.
* Incorrect data in Home and DORA dashboards.
* Cron event inconsistency.
