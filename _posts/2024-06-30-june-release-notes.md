---
title: "Release Notes: June 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### Pipelines: Build status reporting per trigger event
We are excited to introduce a new feature: build status reporting per trigger event. This feature is currently supported for Bitbucket Cloud. 

**How does it work?**  
Statuses for builds with the same pipeline ID triggered by different events are reported separately, based on the trigger ID and trigger event.
For example, builds triggered by a commit event and by a pull request (PR) event for the same pipeline are reported individually.

**Enhanced safety**  
This feature enhances safety as it helps prevent PRs from being merged while a commit-triggered build for the same pipeline is still in progress.



### Pipelines: Gerrit topic variable mapping  

We have introduced a new system variable: `CF_GERRIT_CHANGE_TOPIC`. This variable maps directly to Gerrit’s `topic` variable, which groups related changes together in Gerrit, for better organization and management.

With `CF_GERRIT_CHANGE_TOPIC` in Codefresh pipelines, based on the topic’s context, you can:
* Dynamically manage and execute steps .
* Conditionally trigger specific actions or entire pipelines.

For details, see [System variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/#system-variables).

### Pipelines: Automatic account switching for pipeline builds

Another usability enhancement for a seamless experience when navigating between accounts.  

When accessing pipeline builds from an account different to the one you're logged into, Codefresh automatically switches you to the correct account. This means no more prompts and having to manually select the account.

<!--- To support this enhancement, you need to enable the `autoBuildSwitchAccount` Feature Flag.-->


 

### GitOps: GitOps Runtimes as Configuration Runtimes
We added new functionality for GitOps Runtimes. Starting with Runtime v0.1.49, you can now designate a Hosted or any Hybrid GitOps Runtime as a Configuration Runtime.
Configuration Runtimes handle platform-level resources that are runtime-agnostic, such as those for GitOps Products.

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/june24/rel-notes-june-24-set-as-config-runtime.png"
  url="/images/whats-new/june24/rel-notes-june-24-set-as-config-runtime.png"
  alt="Set GitOps Runtime as Configuration Runtime"
  caption="Set GitOps Runtime as Configuration Runtime"
  max-width="60%"
%}


Key features to note:
* Redundancy  
  Designate single or multiple GitOps Runtimes as Configuration Runtimes. Codefresh ensures that resources are not duplicated even when there are multiple Configuration Runtimes.
* Ease of use  
  Set and unset a Configuration Runtime with just a click in the UI or a quick edit in your `values.yaml` file.

For details, see [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes).






## Bug fixes


##### Pipelines 
* `404: repo not found` error for pipelines using Helm charts.
* Some repositories not displayed in **Repository** list when creating trigger for Bitbucket server.  
* Rule for Pipeline permissions by pipeline `tags` overrides rule for pipeline permissions by projects with `All tags`.
* When defining triggers, Select Branch search does not display branch names including slashes. 


##### GitOps 
* Invalid Git user (personal access) token message displayed at frequent intervals.
* Argo Rollouts Reporter missing from destination cluster error even when Argo Rollouts is installed. 
* Multi-container pods display `a container name must be specified for pod....` message without option to select a specific container.
* In GitOps Apps dashboard, breadcrumbs for app of apps display child applications in the path.
