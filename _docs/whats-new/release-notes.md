---
title: "Release Notes"
description: "New features, enhancements, and bug fixes"
group: whats-new
toc: true
---

Welcome to Codefresh Release Notes for February, which is our first edition of release notes including Codefresh pipelines and Codefresh GitOps!




## Features & Enhancements

### Codefresh pipelines usability enhancements
A tiny enhancement goes a long way for usability! Have a look at what we implemented

* **Prompt to automatically switch accounts**  
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

* **User-configurable memory usage limit for warning**  
  Remember the banner that alerted you whenever the memory usage for a pipeline build exceeded 90%? 
  Instead of a fixed usage limit for banner display, you now have the power to decide when to display the warning to make it as non-intrusive as possible.
  As part of the pipeline account-level configuration settings (**Pipeline Settings**), you can decide to display the banner when memory usage exceeds 70% (new option), 90% (as before), or the actual limit of 100% (also, a new option). 


{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-feb23-build-memory-warning.png"
 url="/images/whats-new/rel-notes-feb23-build-memory-warning.png"
 alt="Options for memory usage limit warning banner"
 caption="Options for memory usage limit warning banner"
 max-width="50%"
%}

* Case-insensitive search for Pipelines and Pipeline List view
  Search is now easier as queries are case-sensitive. 



### CI/CD: Cloud Builds for pipeline creation
We have streamlined the pipeline creation flow for Codefresh pipelines  or more precisely the pipeline run requirements 
To run a pipeline you need at least one runtime environment from a hybedi Runner installation.
Cloud Builds for pipelines are no longer available by default as a COdfresh account admin, you can request one for your accounbt and we will anser you in up to 24 hours.

Non-admin users can send a request for the admin.


### CI/CD: Slack integration notification for builds terminated by system
Notification on failed builds are of course more important than successful ones. Slack integrations in Codefresh include a new option to notify you whenever builds are terminated by the system.

### CI/CD: Multiple Helm contexts for pipelines
With support for multiple Helm registry contexts in the same pipeline, dependencies in any of the imported Helm registry contexts in the Helm chart are automatically authenticated and added.
For the Helm `install` and `push` actions, you can select the primary Helm registry context for the command.
For details, see [Import Helm configurations into your pipeline definition] and [Action modes].

### CI/CD: Multiple cache sources for pipeline builds

We added the `cache-from` argument to our `build` step. `cache-from` allows you to specify additional cache sources to speed up the build process. Multiple cache sources are useful when your primary cache source is unavailable or slow.

Supported cache sources for cache-from in version 2.0 include:

Docker registries (e.g. Docker Hub, Google Container Registry)
HTTP/HTTPS URLs (e.g. a caching proxy server)
To use cache-from, simply include the --cache-from option in your build command and specify the cache source(s) you want to use.

Note that cache-from is currently only supported for Docker-based builds.

### GitOps: Terminate Sync now in Application Header
We moved the Terminate Sync button from the Sync details drawer to the Application header, as in, right next to the Current Sync details.
Instead of having to go to the Sync details to This enhancement improves the visibility and makes this option easy to access and act upon.


### GitOps: Upgrade to Argo CD 2.6
We have upgraded the Argo CD version in Codefresh to v2.6. 




### [Epic OnPrem] FR: Add search to Chart Version drop box of Install Helm Chart modal window
#### Use helm-diff plugin in cfstep-helm image



## Bug fixes

### CI/CD
- (On-premises only) Tooltip on hover over build/project names in the Builds page, shows _topbar.title_ instead of the build/project name.
- Clicking native Argo Workflows link displays empty screen. 
- Regression: Unable to edit email invitation for user who does not have an actiuve account
Security: CVEs in codefresh/agent and codefresh/venona
- Codefresh pipelinesAfter terminating build and killing engine, `dind` pods remain alive for 30+ before SIGTERM.
- Internal: Codefresh pipelines: Argocd-server unable to send events when golang channel is flooded
- Internal: failed to render logs
- Codefresh pipelines: Large number of logs affect Build performance - Roi CR-17088
- " : Codefresh Runner engine unable to communicate with dind container. CR-14602
- ": `CF_HELM_SET` variable  printed as [object Object]: CR-4232
- " Doumentation on time zones removed from [CRON Expression Format](https://github.com/codefresh-io/cronus/blob/master/docs/expression.md/){:target="\_blank"}
- Onpremises pipelines: Liveness probe failures on cf-api pods
- " Variables not rendered for build annotations added via pipeline hooks.
- ": Build does not fail on error for `when` condition (CR-16925)
- ": Click badge in Pipeline > General Settings results in error.
- ": Copy YAML from drop-down does not display all pipelines in in project with more than 100 pipelines when cloning piplines
- " Lack of Codefresh context prevents Classic CLI to set a new one (CR-15884)
-': Running pipeline locally results in " checkAvailabilityWithRetry error: ..., connect EACCES /var/run/docker.sock .. error " (CR-13455)
- ": Tooltips not displayed on Hover over Useage Report columns (CR-17181)
- ": Codefresh run --local leaves behind engine containers after each run (CR-16913)


- GitOps:  "invalid memory address or nil pointer dereference" error when user is trying to recover runtime
- ": rollout rollback not working in 2.5 if rollout located in ns that is different from app ns (CR-17317)