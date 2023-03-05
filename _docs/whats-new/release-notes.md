---
title: "Release Notes"
description: "New features, enhancements, and bug fixes"
group: whats-new
toc: true
---

Welcome to Codefresh Release Notes for February, which is our first edition of release notes including Codefresh pipelines and Codefresh GitOps!




## Features & Enhancements

### CI/CD: Slack integration notification for builds terminated by system
Notifications for failed builds is generally, as, if not more, important than those for successful builds. Getting notifications for system-terminated builds is crucial, as it indicates that the build was stopped because of pipeline policy and may require immediate attention. By receiving notifications for system-terminated builds, you can quickly investigate the issue and take corrective action if necessary.


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

Docker has support for specifying external cache source for builds. We added the `cache-from` argument to our `build` step allowing you to specify additional cache sources and speed up the build process. Multiple cache sources are useful when your primary cache source is unavailable or slow.

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

### User-defined threshold for memory usage limit warning
Remember the banner that alerted you whenever the memory usage for a pipeline build exceeded 90%? 
Instead of a fixed usage limit for banner display, you can decide when to display the warning to make it as non-intrusive as possible.
As part of the pipeline account-level configuration settings (**Toolbar Settings > Pipeline Settings**), you can decide to display the banner when memory usage exceeds 70% (new option), 90% (as before), or the actual limit of 100% (also, a new option). 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-build-memory-warning.png"
 url="/images/whats-new/rel-notes-feb23-build-memory-warning.png"
 alt="Options for memory usage limit warning banner"
 caption="Options for memory usage limit warning banner"
 max-width="50%"
%}



### Usability enhancements
Saves time and ease of use in  your =interactions in Codefresh.  

* **CI/CD: Prompt to switch accounts**  
  To avoid confusion, we alert you when you are signed into more than one Codefresh account. You are prompted to either switch to the active account or return to the previous one. 

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
  Search is now easier as queries are case-sensitive. 

* **GitOps: Terminate Sync now in Application Header**
We moved the **Terminate Sync** button from the Sync details drawer to the Application Header making it easy to terminate problematic sync operations if you need to. 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-terminate-sync-app-header.png"
 url="/images/whats-new/rel-notes-feb23-terminate-sync-app-header.png"
 alt="Terminate sync option in Application Header"
 caption="Terminate sync option in Application Header"
 max-width="50%"
%}

### CI/CD: New flow for Cloud Builds for pipelines
In previous versions, you could run pipelines in the SaaS runtime environment that was available by default for all Codefresh accounts. 
From this version, you need to install the Codefresh Runner to create a runtime environment. 
Cloud Builds can be enabled on request by account administrators.  will anser you in up to 24 hours.








### GitOps: Upgrade to Argo CD 2.6
We have upgraded the Argo CD version for our GitOps module to v2.6. 
For details, see [Argo CD Releases](https://github.com/argoproj/argo-cd/releases){:target="\_build"}.




### [Epic OnPrem] FR: Add search to Chart Version drop box of Install Helm Chart modal window
#### Use helm-diff plugin in cfstep-helm image



## Bug fixes

### CI/CD
- After terminating build and killing engine, `dind` pods remain alive for 30+ before SIGTERM.
- Large number of logs affect Build performance - Roi CR-17088
- Codefresh Runner engine unable to communicate with dind container. CR-14602
- `CF_HELM_SET` variable  printed as [object Object]: CR-4232
- " Doumentation on time zones removed from [CRON Expression Format](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md/){:target="\_blank"}

- Variables added via pipeline hooks not rendered for build annotations.
- Build does not fail on error for `when` condition (CR-16925)
- Clicking a badge in Pipeline > General Settings results in error.
- When cloning pipelines, **Copy YAML from** drop-down does not display all pipelines in project, if project has more than 100 pipelines.
- Lack of Codefresh context prevents Classic CLI to set a new one (CR-15884)
- Running pipeline locally results in error: " checkAvailabilityWithRetry error: ..., connect EACCES /var/run/docker.sock .. " (CR-13455)
- Hover over Usage Report columns does not display tooltips.(CR-17181)
- Codefresh run --local leaves behind engine containers after each run (CR-16913)
- (On-premises only) Liveness probe failures on cf-api pods
- (On-premises only) Tooltip on hover over build/project names in the Builds page, shows _topbar.title_ instead of the build/project name.


- Regression: Unable to edit email invitation for user who does not have an actiuve account
- Internal: Codefresh pipelines: Argocd-server unable to send events when golang channel is flooded
- Internal: failed to render logs

### GitOps
- Trying to recover runtime results in "invalid memory address or nil pointer dereference" error.
- Rollout rollback failure when rollout namespace is different from application namespace. (CR-17317)
- Clicking native Argo Workflows link displays empty screen. 