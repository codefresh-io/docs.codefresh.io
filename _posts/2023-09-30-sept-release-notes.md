---
title: "Release Notes: September 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Pipelines: OpenID Connect integration
Introducing OIDC (OpenID Connect) for Codefresh pipelines! Boost pipeline security and streamline access control with OIDC. Instead of referencing static credentials stored in Codefresh for your cloud provider, allow pipelines to authenticate and authorize actions through short-lived ID tokens. 

Configure Codefresh as an OIDC provider with your preferred cloud provider, and let Codefresh handle ID token acquisition, and then add the actions to perform on the cloud provider in the pipeline.

Key benefits:
* Enhanced security  
  You no longer need to define, store, and manage cloud-provider credentials in Codefresh. 
  Obtain ID tokens from the cloud provider when needed. The ID tokens remain valid only for the duration of the workflow build and automatically expire upon completion.

* Ease of use  
  Once the OIDC provider configuration is completed, obtaining the ID token is seamless.  
  Our dedicated Marketplace step, the `obtain-oidc-id-token` step, when added to the pipeline, gets the ID token, without additional configuration or parameters on your part.

For details, see [OpenID Connect for Codefresh pipelines]({{site.baseurl}}/docs/integrations/oidc-pipelines).

### Pipelines: Enhanced RBAC with AND logic for tags

We are excited to introduce a powerful enhancement to Codefresh pipelines: AND logic for rules in RBAC permissions. Now, you have even more control and precision when it comes to managing permissions for entities.

Up until this point, we've been all about OR logic, allowing you to define rules with a choice of **Any of these** tags. But we recognize that you need to be more specific in certain scenarios, and that's where AND logic comes into play.  
With AND logic, you can require **All of these** tags to be present, providing a level of granularity to tighten security and ensure that only the right people have access to entities.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/sep23/rel-notes-sep23-classic-and-policies.png" 
url="/images/whats-new/sep23/rel-notes-sep23-classic-and-policies.png" 
alt="Rules with OR/AND logic for tags" 
caption="Rules with OR/AND logic for tags" 
max-width="40%" 
%}

For details, see [ABAC for entities with tags and rules]({{site.baseurl}}/docs/administration/account-user-management/access-control/#abac-for-entities-with-tags-and-rules).

#### Pipelines: Supercharged Cron triggers

Welcome to v2.0 for Cron triggers! We have extended the capabilities of Cron triggers within Codefresh pipelines for a more powerful implementation.  The new version is currently in Beta.

In the Cron Interval settings, you can now add a name for the Cron trigger. 

Cron triggers can also simulate Git events to enrich pipelines with repository details, include environment variables, and custom settings for caching, volume reuse, and notifications. The new options are supported in the Codefresh UI (Advanced Settings), and also in the pipeline YAML specifications for declarative setup. 



{% include 
image.html 
lightbox="true" 
file="/images/whats-new/sep23/rel-notes-sep23-cron-settings-tab.png" 
url="/images/whats-new/sep23/rel-notes-sep23-cron-settings-tab.png" 
alt="Extended settings for Cron triggers" 
caption="Extended settings for Cron triggers" 
max-width="40%" 
%}

These additional settings are optional, so you can continue to use just the timer component of the Cron trigger.

Legacy versions of Cron triggers are flagged in the Codefresh UI, and include a one-click option to migrate them to the new version.

For details, see [Cron (timer)triggers]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/) and [Cron trigger specifications]({{site.baseurl}}/docs/integrations/codefresh-api/#cron-triggers).

### Pipelines: Helm installation for Runner
We have completely overhauled the installation process for the Codefresh Runner. Now, Runner installation is completely Helm-based, making it streamlined and easier to manage.  

Helm has become the default installation method for the Codefresh Runner. This change has implications for the installation options from previous versions. 
* CLI installation is considered legacy, and will not be actively maintained going forward
* For existing Helm installations with chart version 3.x or higher, we recommend migrating to the new chart version for the Runner

The new Helm installation for the Runner is described in [Chart Configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#chart-configuration){:target="\_blank"} on ArtifactHub.

Refer also to [Codefresh Runner installation]({{site.baseurl}}/docs/installation/codefresh-runner/) in the documentation.

<br><br>

### Pipelines: Superior performance and UX with new terminal emulator
We have introduced a new terminal emulator for a superior user experience, featuring fast scrolling, online rendering for large logs, enhanced accessibility support, and more...

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/sep23/rel-notes-sep23-new-terminal.png" 
url="/images/whats-new/sep23/rel-notes-sep23-new-terminal.png" 
alt="New terminal emulator" 
caption="New terminal emulator" 
max-width="40%" 
%}

The new terminal emulator provides: 
* Improved performance through GPU acceleration
* Convenient online viewing for log files, including large logs with up to 100,000 lines, avoiding the need to download the file
* Faster navigation with improved mouse support
* Improved search functionality
* Accessibility support with Screen Reader Mode

<br><br>

### GitOps: ABAC for GitOps applications
We are excited to bring the power of ABAC for access control to the GitOps platform!  
Create rules and policies that enforce the security that your organization requires, combining authorized users (teams), fine-grained control over entities (applications and rollbacks), support for a wide range of actions (sync, pause/resume rollbacks, and more), and the flexibility of attribute combinations (cluster, namespace, and more)!

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/sep23/rel-notes-sep23-gitops-add-rule.png" 
url="/images/whats-new/sep23/rel-notes-sep23-gitops-add-rule.png" 
alt="Access control for GitOps application entities" 
caption="Access control for GitOps application entities" 
max-width="40%" 
%}

**Authorized users**  
Ensure that only authorized teams can perform critical actions on applications and rollback entities.

**Fine-grained control for actions on Applications and Rollbacks**  
GitOps ABAC supports an extensive range of actions to cater to all stages of application and rollout entities. 

**Flexibility and granularity through attribute combinations**  
You have the power to combine a wide variety of attributes to create highly specific access control rules. You're no longer limited to single attributes; instead, you can compose rules using multiple attributes, allowing for precise control. 

For example, you can grant access to the `production` environment only to specific teams, allow rollbacks for applications only within the `finance` namespace, or deny sync access to applications in a different namespace.

For details, see [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/).

<br><br>

### GitOps: Argo Events upgrade


## Bug fixes

**General**  
* Build step fails with "Failed to update your new image" error.
* Missing examples for steps in Codefresh Step Marketplace.
* Link to Cron expression formats in Cron trigger documentation article goes to private repository which cannot be accessed externally.

<br>

**Pipelines**  
* Random 500 error when using fetch for Codefresh-managed Helm repo.
* Builds fail intermittently with `ESOCKETTIMEDOUT` error when pulling image for caching.
* DinD pod does not use Service Account (SA) defined in Runner.
* In **Use YAML from repository** screen, selecting a new Git integration without selecting a branch results in "undefined is not an object (evaluating '(0,v.first)(this.branchData.selectedItem).displayName')" error. 
* In **Use YAML from repository** screen, selecting a new Git integration resets all custom settings, including PATH TO YAML.
* “Internal server error” displayed when creating a pipeline with project-level permissions though pipeline is created.
* Frequent timeouts when pushing to Codefresh Helm repo via Helm step. 
* Tooltips in Build and Memory usage metric graphs display "Invalid date".
* (On-premises only) After upgrade to v2.0.9, Test reports screen does not display all elements.
* (On-premises only) Page keeps on loading indefinitely when switching active account from a ProjectOne account to a Classic one.


<br>


**GitOps**  
* For a paused step, sometimes `rolloutStepStatus` graphQL call returns Passed instead of Active.
* In the Timeline tab, on-going deployments do not display link to Rollout Player. 
* Slow scrolling in terminal for online build logs.
