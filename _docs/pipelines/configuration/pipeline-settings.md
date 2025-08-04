---
title: "Account-level settings for pipelines"
description: "Configure settings pipelines at the account-level"
group: pipelines
sub_group: configuration
redirect_from:
  - /docs/administration/pipeline-settings/
toc: true
---


As a Codefresh account administrator, you can define global settings for pipelines which are inherited by all new pipelines created in the account.  
Users can still override specific settings for individual pipelines.

## Account-level pipeline settings

{: .table .table-bordered .table-hover}
|Pipeline functionality| Account-level setting  | Description   |
| ------------------------| ---------------- |------------------|
|Project|[Auto-create projects for teams](#auto-create-projects-for-teams)| Enabled by default, automatically creates projects when adding teams to the account. |
|Create |[Pipeline creation options](#pipeline-creation-options)| Define if users can new pipelines from templates or by cloning existing pipelines.  |
| |[Allowed sources for pipeline YAMLs](#allowed-sources-for-pipeline-yamls)| Enable/disable sources for pipeline YAMLs.   |
|Scopes |[Pipeline scopes](#pipeline-scopes)| Control access to endpoints exposed by the pipeline.  |
| |[Kubernetes cluster-contexts for pipelines](#kubernetes-cluster-contexts-for-pipelines)| Define if users can select the clusters to which the pipeline has access. |
|Build |[Pausing build executions](#pausing-build-executions)| Define if users can pause builds for new and existing pipelines in the account.  |
| |[Restarting from failed steps](#restarting-from-failed-steps) | Enable option to restart pipelines from failed steps instead of from the beginning.|
| |[Memory usage warning for pipeline builds](#memory-usage-warning-for-pipeline-builds)| Enable alerts when pipelines reach/exceed the threshold. |
| |[Default behavior for build step](#default-behavior-for-build-step)| Configure push image options for build steps.  |
| |[Default behavior for pending-approval step](#default-behavior-for-pending-approval-step) | Determine if pending-approval steps require manual action. |
|Security |[OIDC Setting](#oidc-setting) |Define the expiration time of ID tokens issued to pipelines using OIDC authentication. |
|Other|[Advanced options for pipelines](#advanced-options-for-pipelines)| Configure options for build approval and pipeline volumes. |
|Argo Workflows |Enable pipelines with Argo Workflows | Create pipelines based on Argo Workflows. |



## Configure account-level settings for pipelines
Configure default settings for all pipelines in the account. 

##### Before you begin
* Review [account-level pipeline settings](#account-level-pipeline-settings)

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Configuration in the sidebar, select [**Pipeline Settings**](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"}. 

## Auto-create projects for teams
Enabled by default, auto-create projects for teams, automatically creates projects whenever you create teams in your account.  
It also creates access-control rules for the same team to projects and pipelines, simplifying setup and saving time.

  {% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/auto-create-projects-setting.png"
url="/images/pipeline/pipeline-settings/auto-create-projects-setting.png"
alt="Auto-create projects for teams"
caption="Auto-create projects for teams"
max-width="60%"
%}

### What does auto-create project do?
When you create a team, the auto-create project option:
* Creates a _project_ with the same name as the team, and a _tag_ for the project, also with the team name
  
  {% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/auto-create-project-results.png"
url="/images/pipeline/pipeline-settings/auto-create-project-results.png"
alt="Auto-created project with same name and tag as the team"
caption="Auto-created project with same name and tag as the team"
max-width="60%"
%}

* Creates a _Project rule_ for the team with Read access to this project, and other projects with the same project tag 

{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/auto-create-project-rule.png"
url="/images/pipeline/pipeline-settings/auto-create-project-rule.png"
alt="Auto-created rule for Project entity"
caption="Auto-created rule for Project entity"
max-width="60%"
%}

* Creates a _Pipeline rule_ for the team, with all privileges, excluding Debug

{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/auto-create-project-pipeline-rule.png"
url="/images/pipeline/pipeline-settings/auto-create-project-pipeline-rule.png"
alt="Auto-created rule for Pipeline entity"
caption="Auto-created rule for Pipeline entity"
max-width="60%"
%}

>**NOTE**  
Once created, there is no synchronization between the project and the team. Modifying or deleting the team has no impact on the project and its tags.

**What are the benefits?**  
As you can see, this option both simplifies and strengthens access-control:

* Using the Project rule automatically created for the team to grants access to additional projects simply by assigning the same tag to the other projects.
* Avoids the need to create rules per pipeline for the same project. The Pipeline rule automatically created for the team, automatically grants the same permissions to all pipelines in the same project. New pipelines in the project automatically inherit these permissions.
* Easily grant the same permissions to other teams for the same pipelines by creating Pipeline rules for the teams with the same project tags.

## Pipeline creation options

Define if users can create pipelines from pipeline templates or by cloning existing pipelines. See [Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/#creating-a-pipeline).

* Pipeline templates  
  Enabling this option allows users to select a pipeline tagged as a template as the source of the new pipeline. Templates are simply pipelines “marked” as templates. There is no technical difference between templates and actual pipelines.  
  See [create pipelines from a pipeline template]({{site.baseurl}}/docs/pipelines/pipelines/#using-pipeline-templates).
 
* Cloning existing pipeline<br>
  Enabling this option allows users to create a pipeline by cloning an existing pipeline. Cloning an existing pipelines also copies its triggers and other parameters.


## Allowed sources for pipeline YAMLs

If required, restrict the sources from which users can create or upload YAML files for a pipeline workflow.

The options are:
* **Inline YAML**: Enable/disable the [inline editor]({{site.baseurl}}/docs/pipelines/pipelines/#using-the-inline-pipeline-editor) where YAML is stored in Codefresh SaaS
* **YAML from repository**: Enable/disable pipeline uploading YAMLs from connected Git repositories
* **YAML from external URLs**: Enable/disable loading YAMLs for pipelines from [external URLs]({{site.baseurl}}/docs/pipelines/pipelines/#loading-codefreshyml-from-version-control)


>**NOTE**  
You must allow at least one of these options so that users can create new pipelines.  
We suggest selecting the **Inline YAML** option when users are still learning about Codefresh and want to experiment. 

## Pipeline scopes
Define the account-level scopes for resources, inherited by all pipelines in the account, through full access, read/write access, or CRUD permissions. <!--- For a description of the available scopes, see [API scopes]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#api-scopes). --> 

  {% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/pipeline-scopes-setting.png"
url="/images/pipeline/pipeline-settings/pipeline-scopes-setting.png"
alt="Scopes for pipelines"
caption="Scopes for pipelines"
max-width="60%"
%}

{{site.data.callout.callout_tip}}
**TIP**  
As a Codefresh administrator, you can override the account-level scopes for a specific pipeline by [configuring custom scopes]({{site.baseurl}}/docs/pipelines/pipelines/#scopes). The custom scopes are inherited by all the builds for that pipeline. 
{{site.data.callout.end}}


## Kubernetes cluster-contexts for pipelines
By default, all pipelines in the account can access all clusters integrated with Codefresh. Restrict pipeline access to clusters by enabling cluster-injection for individual pipelines in the account.

Selectively restricting access to clusters for a pipeline:  
* Enhances security by restricting access to users from different teams. 
* Reduces the overall duration of the build by shortening the initialization phase.
  Codefresh authenticates the credentials of every cluster that the pipeline accesses during the initialization phase. This action affects build duration for accounts with large numbers of clusters. 


{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/pipeline-inject-cluster-accnt-setting.png"
url="/images/pipeline/pipeline-settings/pipeline-inject-cluster-accnt-setting.png"
alt="Enabling cluster contexts for injection into pipelines"
caption="Enabling cluster contexts for injection into pipelines"
max-width="60%"
%}

You can then select specific clusters for individual pipelines, through the **Kubernetes cluster** option in the [Pipeline's Policies section]({{site.baseurl}}/docs/pipelines/pipelines/#policies).



## Pausing build executions

Pause builds for all pipelines in the account. Pausing pipeline builds at the account level is useful for example during maintenance.  

* **Pause build execution** is disabled by default.  
* When enabled:  
  * New pipelines in the account are paused immediately. 
  * Existing pipelines with running builds are paused only after the builds have completed execution.  
* Paused pipelines are set to status Pending, and remain in this status until **Pause build execution** is manually disabled for the account.

{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/pause-pipeline-enabled.png"
url="/images/pipeline/pipeline-settings/pause-pipeline-enabled.png"
alt="Pause Build Execution pipeline setting enabled"
caption="Pause Build Execution pipeline setting enabled"
max-width="60%"
%}

## Restarting from failed steps
Enable or disable restarting pipelines directly from the failed step for all pipelines in the account. The setting affects the restart options displayed in the [Builds view]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#restart-pipeline-from-builds-view) and [step view]({{site.baseurl}}docs/pipelines/monitoring-pipelines/#restart-from-step-view). 

* When **enabled**, allows users to restart the pipeline directly from the specific step that failed. 
* When **disabled**, allows users to restart the pipeline from the beginning.

Individual pipeline are set to use the account's setting by default, but users can override this setting to enable/disable failed step restart for the specific pipeline. See [Pipeline settings - Policies]({{site.baseurl}}/docs/docs/pipelines/pipelines/#policies).

## Memory usage warning for pipeline builds
Select the memory-usage threshold for pipeline builds at which to display alerts. <br>
Memory-usage thresholds for pipeline builds are useful to both avoid premature and unnecessary warnings, and get timely warnings to avoid build failures, as needed.

Accounts with pipelines that do not consume a lot of memory can have higher thresholds, or even the maximum threshold, as they are unikely to hit available memory limits.  
Resource-intensive pipelines on the contrary require lower thresholds for timely warnings to prevent build failures. 90% is recommended for such pipelines.

{{site.data.callout.callout_tip}}
**TIP**   
As Codefresh displays the banner alert when the build memory _exceeds_ the selected threshold, setting the threshold at 100% means that the pipeline has already failed when you see the alert banner.
{{site.data.callout.end}}

{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/global-memory-warning.png"
url="/images/pipeline/pipeline-settings/global-memory-warning.png"
alt="Memory usage thresholds for pipeline builds"
caption="Memory usage thresholds for pipeline builds"
max-width="60%"
%}

The selected threshold applies to all pipelines in the account. Users can always override it for individual pipelines. See [Runtime settings]({{site.baseurl}}/docs/pipelines/pipelines/#runtime).

## Default behavior for `build` steps

According to your organization’s needs, configure if and how the [`build` step]({{site.baseurl}}/docs/pipelines/steps/build/) pushes built images. 

The options are:
* Explicitly define in the `build` step if to push the built image to the registry or not
* Automatically push _all built images_ to the default registry
* _Do NOT push built images_ anywhere by default

{{site.data.callout.callout_tip}}
**TIP**  
This behavior is simply a convenience feature for legacy pipelines.  
Users can still use a [`push` step]({{site.baseurl}}/docs/pipelines/steps/push/) to always push an image to a registry regardless of what was chosen in the `build` step.
{{site.data.callout.end}}

## Default behavior for `pending-approval` step
Configure if manual confirmation is required after clicking the Approve or Reject buttons for [pending-approval steps]({{site.baseurl}}/docs/pipelines/steps/approval/). When required, a confirmation prompt is displayed on clicking Approve or Reject.  
* **None**: No manual intervention required on clicking either Approve or Reject. 
* **All**: Require manual intervention for both Approve and Reject.
* **Approve only**: Require manual intervention only after Approve.
* **Reject only**: Require manual intervention only after Reject.

## OIDC Setting
Specifies the expiration time (in seconds) for ID tokens issued to pipelines using OIDC authentication. The default value is 300 seconds (5 minutes). You can set a value up to a maximum of 3600 seconds (1 hour). This setting allows you to control how long the token remains valid when authenticating with external systems via OIDC.

## Advanced options for pipelines

Configure the default settings that define advanced behavior for pipelines.


* **Manage shared volumes for builds pending approval**  
  Define if to [retain or discard]({{site.baseurl}}/docs/pipelines/steps/approval/#keeping-the-shared-volume-after-an-approval) the volume when a pipeline build is pending approval.
  
  >**NOTE**  
    This option _affects pipeline resources and/or billing in the case of SaaS pricing_.  
    It will also affect users of existing pipelines that depend on this behavior.  
    Once you either enable or disable this option for an account, we recommend leaving it unchanged.

* **Concurrency policy for builds pending approval**  
  Determines whether pipeline builds pending approval are [included or excluded from the concurrency count]({{site.baseurl}}/docs/pipelines/steps/approval/#define-concurrency-limits).

* **Service account credentials for Amazon ECR authentication**  
  Define the [Service Account]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/#setting-up-ecr-integration---service-account) to optionally use for authentication in Amazon ECR integrations.

* **Public Marketplace Registry**  
  Set the default registry from which to pull images for all _Public Marketplace Steps_.  
  You can select any [Docker Registry]({{site.baseurl}}/docs/integrations/docker-registries/) integration that has been set up in Codefresh.
  
  Example: Public Marketplace Step image is defined to use Docker Hub. If you select a `quay.io` integration as the Public Marketplace Registry, all Public Marketplace Step images are pulled from `quay.io` instead of from Docker Hub.
  
  > **NOTE**  
    The selected registry affects only custom or typed steps.<br>  
    The default registry selected for Public Marketplace steps is _ignored_ in all built-in pipeline steps: `git-clone`, `freestyle`, `build`, `push`, `composition`, `launch test environment`, `deploy`, and `approval`. For detailed information on built-in steps, see [Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/).
    

## Related articles
[Creating Pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Git integration]({{site.baseurl}}/docs/integrations/git-providers/)  
