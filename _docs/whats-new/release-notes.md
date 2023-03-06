---
title: "Release Notes"
description: "New features, enhancements, and bug fixes"
group: whats-new
toc: true
---

Welcome to Codefresh Release Notes for February, which is our first edition of release notes including Codefresh pipelines and Codefresh GitOps!


## Features & Enhancements

### CI/CD: Slack integration notification for builds terminated by system
Notifications for failed builds are equally, if not more important, than those for successful builds. Getting notifications for system-terminated builds is crucial, as it indicates that the build was stopped because of pipeline policy and may require immediate attention. You can quickly investigate the issue and take corrective action if necessary.


We added a new option to our Slack integration to notify you whenever builds are terminated by the system. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-slack-failed-notification.png"
 url="/images/whats-new/rel-notes-feb23-slack-failed-notification.png"
 alt="Slack notification option for system-terminated builds"
 caption="Slack notification option for system-terminated builds"
 max-width="50%"
%}

Here's an example of the notification you would receive in Slack.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-terminate-build-slack-example.png"
 url="/images/whats-new/rel-notes-feb23-terminate-build-slack-example.png"
 alt="Example Slack notification for system-terminated builds"
 caption="Slack notification for system-terminated builds"
 max-width="50%"
%}


### CI/CD: Multiple Helm contexts for pipelines
With support for multiple Helm registry contexts in the same pipeline, dependencies in any of the imported Helm registry contexts in the Helm chart are automatically authenticated and added.
For the Helm `install` and `push` actions, you can select the primary Helm registry context for the command.
For details, see [Import Helm configurations into your pipeline definition]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/#step-4-optional-import-helm-configurations-into-your-pipeline-definition) and [Action modes]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/#helm-step-action-modes).

### CI/CD: Multiple cache sources for pipeline builds

Docker has support for specifying external cache sources for builds. We added the `cache-from` argument to our `build` step allowing you to specify additional cache sources and speed up the build process. Multiple cache sources are useful when your primary cache source is unavailable or slow.

Here's an example of `cache-from` with `buildkit`:

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
    buildkit: true
    build_arguments:
    - BUILDKIT_INLINE_CACHE=1
    cache_from:
    - my-registry/my-app-image:${{CF_BRANCH}}
    - my-registry/my-app-image:master
{% endraw %}         
{% endhighlight %}

For details, see [`cache_from` in `build` step fields]({{site.baseurl}}/docs/pipelines/steps/build/#fields).

### Control thresholds for memory usage warning banner
Remember the banner that alerted you whenever the memory usage for a pipeline build exceeded 70 or 90%?
You can now decide the usage threshold at which to display the banner. Increasing the threshold helps avoid premature warnings for pipelines that do not consume a lot of memory, while decreasing it for resource-intensive pipelines helps avoid build failures. 

As part of the account-level configuration settings for pipelines (**Toolbar Settings > Pipeline Settings**), you can decide to display the banner when memory usage exceeds 70%, 90% (as before), or the actual limit of 100% (new option). 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-build-memory-warning.png"
 url="/images/whats-new/rel-notes-feb23-build-memory-warning.png"
 alt="Options for memory usage limit warning banner"
 caption="Options for memory usage limit warning banner"
 max-width="50%"
%}

Users can then override the memory-usage threshold for individual pipelines.
See [Memory usage warning for pipeline builds]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#memory-usage-warning-for-pipeline-builds).

### CI/CD: New flow for Cloud Builds for pipelines
Previously, all Codefresh accounts had access to a SaaS runtime environment to run pipelines. However, this is no longer the case. Account administrators can request SaaS runtime environments by clicking **Enable Cloud Builds** in Codefresh. This action triggers an email request to Codefresh, and you should receive a response within 24 hours.


### GitOps: Upgrade to Argo CD 2.6
We have upgraded the Argo CD version for our GitOps module to v2.6. 
For details, see [Argo CD Releases](https://github.com/argoproj/argo-cd/releases){:target="\_build"}.

### Usability enhancements
Saves time and ease of use in  your =interactions in Codefresh.  

* **CI/CD: Prompt to switch accounts**  
  To avoid confusion, when you are signed into more than one Codefresh account, you are prompted to either switch to the active account or return to the previous one. 

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-switch-accnt-prompt.png"
 url="/images/whats-new/rel-notes-feb23-switch-accnt-prompt.png"
 alt="Switch active account prompt"
 caption="Switch active account prompt"
 max-width="50%"
%}

* **CI/CD: Case-insensitive search for Pipelines and Pipeline List view**
  Search is now easier as queries are case-insensitive. 

* **GitOps: Terminate Sync now in application header**
We moved the **Terminate Sync** button from the Sync details drawer to the application header making it easy to terminate problematic sync operations if you need to. 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-terminate-sync-app-header.png"
 url="/images/whats-new/rel-notes-feb23-terminate-sync-app-header.png"
 alt="Terminate sync option in Application Header"
 caption="Terminate sync option in Application Header"
 max-width="50%"
%}

See [Application header]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#get-status-from-application-header) in [Monitoring GitOps applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/).



## Bug fixes

### CI/CD
- Large number of logs affect Build performance - Roi CR-17088
- `CF_HELM_SET` variable  printed as [object Object].
- " Doumentation on time zones removed from [CRON Expression Format](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md/){:target="\_blank"}
- Variables added via pipeline hooks not rendered for build annotations.
- Build does not fail on error for `when` condition.
- Clicking a badge in Pipeline > General Settings results in an error.
- When cloning pipelines, **Copy YAML from** drop-down does not display all pipelines in project, if project has more than 100 pipelines.  
- Running pipeline locally results in error: " checkAvailabilityWithRetry error: ..., connect EACCES /var/run/docker.sock .. " 
- Tooltips not displayed on hover over Usage Report columns.
- Codefresh run --local leaves behind engine containers after each run.
- (On-premises only) Liveness probe failures on cf-api pods
- (On-premises only) Tooltip on hover over build/project names in the Builds page, shows _topbar.title_ instead of the build/project name.


### GitOps
- Trying to recover runtime results in "invalid memory address or nil pointer reference" error.
- Rollout rollback failure when rollout namespace is different from application namespace.
- Clicking native Argo Workflows link displays empty screen. 