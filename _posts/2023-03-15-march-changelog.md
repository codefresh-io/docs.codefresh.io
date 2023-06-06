---
title: "Release Notes: March 2023"
description: "Changelog and Release Notes for Codefresh Pipelines and GitOps"
---

## Features & Enhancements

### Pipelines: Selective restart for failed build steps

We added the **Restart from a failed step** as an option to the pipeline's Policy settings, which you can enable/disable per pipeline.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-mar23-restart-failed.png"
 url="/images/whats-new/rel-notes-mar23-restart-failed.png"
 alt="Restart from failed step option in Pipeline settings"
 caption="Restart from failed step option in Pipeline settings"
 max-width="50%"
%}

Previously, this option was available for all pipelines in the Builds page. Now, you can make it available according to the requirements of the specific pipeline. When disabled in the pipeline's settings, it is also disabled for that pipeline in the Builds page.

Why did we make this selective per pipeline?  
Because restarting from a failed step is not always the answer to the problem, especially as the pipelines restarts with the same state as before.

If you have a failed Helm promotion step, and you updated the image, you would want the pipeline to use the new image. With the Restart option, the pipeline resumes execution at the same state as at the point of failure, never uses the updated image, and continues to fail.  

For details, see [Policy settings for pipelines]({{site.baseurl}}/docs/pipelines/pipelines/#policies) and [Restarting pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restarting-the-pipeline).

### Pipelines: Datadog integration enhancements

We enhanced our integration with Datadog to report additional information from Codefresh pipelines in Datadog.

The new information should make it even easier to monitor and analyze Codefresh pipelines in Datadog:

* For manually triggered pipelines, the name of the user who initiated the pipeline.
* The Resumed field, if the pipeline was resumed after manual approval.
* The Parameters field with user-defined variables and Git parameters.
* Error messages for pipelines with errors.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-mar23-datadog.png"
 url="/images/whats-new/rel-notes-mar23-datadog.png"
 alt="Codefresh pipeline parameters in Datadog"
 caption="Codefresh pipeline parameters in Datadog"
 max-width="50%"
%}

See [Datadog pipeline integration]({{site.baseurl}}/docs/integrations/datadog/).

### Pipelines: Override runtime environment for GitOps pipeline integrations

A GitOps pipeline integration uses the default runtime environment. After creating a GitOps pipeline integration, you can now override its runtime environment.
Codefresh uses the runtime environment for system actions such as Rollback.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-mar23-classic-gitops-runtime-env.png"
 url="/images/whats-new/rel-notes-mar23-classic-gitops-runtime-env.png"
 alt="Selecting runtime environment for GitOps pipeline integration"
 caption="Selecting runtime environment for GitOps pipeline integration"
 max-width="50%"
%}

### GitOps: Deep links to applications

Codefresh supports adding Deep Links to third-party applications/platforms. Deep Links is an Argo CD feature that allows you to configure deep links to any third-party application/platform such as Splunk for example, to quickly redirect users to these applications/platforms.

When configured, the Current State Tree view displays the linked-to applications in the resource's context menu.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-mar23-deep-links.png"
 url="/images/whats-new/rel-notes-mar23-deep-links.png"
 alt="Deep Links in application resource's context menu"
 caption="Deep Links in application resource's context menu"
 max-width="50%"
%}

For details, see [Configuring Deep Links to applications/resources for Hybrid GitOps]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#hybrid-gitops-configure-deep-links-to-applications--resources).

### GitOps: Runtime name and namespace decoupled

We removed the dependency between the runtime name and namespace for Hybrid GitOps runtimes.
From CLI version v0.1.41, and runtime version: v0.1.27, you can have different names for runtimes and namespaces.

### GitOps Apps dashboard usability enhancements

* **New icons for health status**  
  The color-coded borders around application resources that indicated their health status were not the most intuitive and easy to identify.  
  We listened to your feedback, and replaced them with a set of icons affixed to the resource type:

  {::nomarkdown}<img src="../../../../../images/icons/current-state-healthy.png" display=inline-block"> Healthy, <img src="../../../../../images/icons/current-state-progressing.png" display=inline-block"> Progressing, <img src="../../../../../images/icons/current-state-suspended.png" display=inline-block"> Suspended, <img src="../../../../../images/icons/current-state-missing.png" display=inline-block"> Missing, <img src="../../../../../images/icons/current-state-degraded.png" display=inline-block/> Degraded, and <img src="../../../../../images/icons/current-state-unknown.png" display=inline-block/> Unknown.
  {:/}

* **Filter by K8s labels**  
  Also in the GitOps Apps dashboard, you can filter applications by Kubernetes labels.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-mar23-label-filters-apps.png"
 url="/images/whats-new/rel-notes-mar23-label-filters-apps.png"
 alt="Filter applications by Kubernetes labels"
 caption="Filter applications by Kubernetes labels"
 max-width="40%"
%}

See [Monitoring GitOps applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/).  

## Bug fixes

### Pipelines

* Triggers for inactive webhooks return 200.
* In full-screen view mode, the pipeline list panel on the left overlaps the pipeline YAML.
* Unable to override image used for `cf-runtime-lv-monitor Daemonset` in the Runner Helm chart. 
* Adding an annotation with the same name as an existing annotation, replaces the existing annotation instead of showing an error.
* CVE in `cf-runtime-volume-cleanup` .
* Builds terminated on prolonged inactivity.
* Opening build deleted by retention policy shows pop-up for switching accounts: `Build is from a different account: <account>. To view this build, you must switch accounts`.
* Unable to edit Inline YAML when returning to the Workflow tab and switching from `Use YAML from repository` to `Inline YAML`. 
* Parallel steps with kubectl-related operations result in `error: open /codefresh/volume/sensitive/.kube/config.lock: file exists`.
* Step member variables not supported in parallel steps.
* Runtime monitor start failure after upgrading to EKS 1.21.
* For Bitbucker Server, Commit trigger that deleted branches results in failed builds.
* `image-enricher` step breaks with error `Failed to assign pull request 9531 to your image ... reason Cannot read property 'map' of undefined`.
* (On-premises only) Enabling `forbidDecrypt` Feature Flag breaks `github-release` step.
* (On-premises only) UI logs not available with on-premises release version 1.3.9.
* (On-premises only) Creating account via Terraform results in plugin error.

### GitOps

* Rollout not set to Paused on inconclusive analysis run.
* Rollout metrics not displayed for steps in the Rollout player.
* Expanded analysis step in Rollout Player minimizes automatically.
* Adding a Helm application with two or more `values` files results in missing value errors.
* Unable to return to account in GitOps module after impersonating a user.
* Invalid specification for default Git integration.
