---
title: "Release Notes: May 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements



#### Gerrit topic variable mapping  

We have introduced a new system variable: `CF_GERRIT_CHANGE_TOPIC`. This variable maps directly to Gerrit’s `topic` variable, which groups related changes together in Gerrit, for better organization and management.

With `CF_GERRIT_CHANGE_TOPIC` in Codefresh pipelines, based on the topic’s context, you can:
* Dynamically manage and execute steps .
* Conditionally trigger specific actions or entire pipelines.

For details, see [System variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/#system-variables).

#### Pipelines: Automatic account switching for pipeline builds

Another usability enhancement for a seamless experience when navigating between accounts.  

When accessing pipeline builds from an account different to the one you're logged into, Codefresh automatically switches you to the correct account. This means no more prompts and having to manually select the account.

<!--- To support this enhancement, you need to enable the `autoBuildSwitchAccount` Feature Flag.-->



#### GitOps: GitOps Runtimes as Configuration Runtimes
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


#### Usability enhancements

##### Project name for pipelines in Builds page
Mouse over the Pipeline column for a build displays the Project name in addition to the name of the Pipeline.

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/june24/project-name-in-builds.png"
  url="/images/whats-new/june24/project-name-in-builds.png"
  alt="Builds page: Project and Pipeline for a build"
  caption="Builds page: Project and Pipeline for a build"
  max-width="60%"
%}




## Bug fixes


##### Pipelines 
* Changing LOGGER_LEVEL variable does not impact verbosity of engine logs. 
* For Gerrit, username of build initiator not displayed.
* Usability issues when selecting clone pipeline option from UI. 



##### GitOps 
* GitOps UI does not show logs for pods. 
* Results for Analysis metrics not displayed in Rollout when using arguments from AnalysisTemplates. 
