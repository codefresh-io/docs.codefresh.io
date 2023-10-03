---
title: "Global settings for pipelines"
description: "Configure settings for pipeline templates, YAML sources and build behavior for all pipelines in account"
group: pipelines
sub_group: configuration
redirect_from:
  - /docs/administration/pipeline-settings/
toc: true
---


As a Codefresh account administrator, you can define global settings for all the pipelines in the account. Users can still override some settings for individual pipelines.

{: .table .table-bordered .table-hover}
| Account-level pipeline setting  | Description   |
| ------------------------| ---------------- |
|[Pause pipeline executions](#pause-pipeline-executions)| Define if users can pause builds for new and existing pipelines in the account.  |
|[New pipeline creation options](#new-pipeline-creation-options)| Define if users can new pipelines from templates or by cloning existing pipelines.  |
|[Configure pipeline scopes](#configure-pipeline-scopes)| Control access to endpoints exposed by the pipeline.  |
|[Auto-create projects for teams](#auto-create-projects-for-teams)| Enabled by default, automatically creates projects when adding teams to the account.   |
|[Enabling cluster-contexts for pipelines](#enabling-cluster-contexts-for-pipelines)| Define if users can select the clusters to which the pipeline has access. |
|[Enabling cluster-contexts for pipelines](#enabling-cluster-contexts-for-pipelines)| Enable/disable sources for pipeline YAMLs.   |
|[Memory usage warning for pipeline builds](#memory-usage-warning-for-pipeline-builds)| Enable alerts when pipelines reach/exceed the threshold. |
|[Advanced pipeline options](#advanced-pipeline-options)| Configure options for build approval and pipeline volumes. |
|[Default behavior for build step](#default-behavior-for-build-step)| Configure push image options for build steps.  |


## Access global pipeline settings
Global settings for pipelines are set for the account and inherited by all pipelines in the account. 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Configuration in the sidebar, select [**Pipeline Settings**](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"}. 




## Pause pipeline executions

Pause builds for pipelines at the account level, for example, during maintenance.  

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

## New pipeline creation options

Here you can define if users can [create pipelines]({{site.baseurl}}/docs/pipelines/pipelines/#creating-a-pipeline) from existing pipelines or from scratch: 

* Create pipelines from a [pipeline template]({{site.baseurl}}/docs/pipelines/pipelines/#using-pipeline-templates).<br>
  Enabling this option allows users to select a pipeline marked as a template as the source for the new pipeline.   
  Templates are simply pipelines “marked” as templates. There is no technical difference between templates and actual pipelines.

* Clone existing pipeline<br>
  Enabling this option allows users to create a pipeline by cloning an existing pipeline. Cloning an existing pipelines also copies its triggers and associated parameters.

## Configure pipeline scopes
Define the account-level scopes for resources, inherited by all pipelines in the account, through full access, read/write access, or CRUD permissions. <!--- For a description of the available scopes, see [API scopes]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#api-scopes). --> 

  {% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/pipeline-scopes-setting.png"
url="/images/pipeline/pipeline-settings/pipeline-scopes-setting.png"
alt="Scopes for pipelines"
caption="Scopes for pipelines"
max-width="60%"
%}

>**TIP**:
 As a Codefresh administrator, you can override the account-level scopes for a specific pipeline by [configuring custom scopes]({{site.baseurl}}/docs/pipelines/pipelines/#scopes). The custom scopes are inherited by all the builds for that pipeline. 



## Auto-create projects for teams
Enabled by default, auto-create projects for teams, automatically creates projects whenever you create teams in your account. It also creates access-control rules for the same team to projects and pipeline, simplifying setup and saving time.

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

> Once created, there is no synchronization between the project and the team. Modifying or deleting the team has no impact on the project and its tags.

**What are the benefits?**  
As you can see, this option both simplifies and strengthens access-control:

* Use the Project rule automatically created for the team to grant access to additional projects simply by assigning the same tag to the other projects.
* Avoids the need to create rules per pipeline for the same project. The Pipeline rule automatically created for the team, automatically grants the same permissions to all pipelines in the same project. New pipelines in the project automatically inherit these permissions.
* Easily grant the same permissions to other teams for the same pipelines by creating Pipeline rules for the teams with the same project tags.


## Enabling cluster-contexts for pipelines
By default, all pipelines in the account can access all clusters integrated with Codefresh. Restrict pipeline access to clusters by enabling cluster-injection for individual pipelines in the account.

Selectively restricting access to clusters for a pipeline:  
* Enhances security by restricting access to users from different teams. 
* Reduces the overall duration of the build by shortening the initialization phase.
  Codefresh authenticates the credentials of every cluster that the pipeline accesses during the initialization phase. This action affects build duration for accounts with large numbers of clusters. 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Configuration in the sidebar, select [**Pipeline Settings**](https://g.codefresh.io/account-admin/account-conf/pipeline-settings){:target="\_blank"}. 
1. Toggle **Kubernetes cluster context pipeline injection** to ON.

{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/pipeline-inject-cluster-accnt-setting.png"
url="/images/pipeline/pipeline-settings/pipeline-inject-cluster-accnt-setting.png"
alt="Enabling cluster contexts for injection into pipelines"
caption="Enabling cluster contexts for injection into pipelines"
max-width="60%"
%}

You can then select specific clusters for individual pipelines, through the **Kubernetes cluster** option in the [Pipeline's Policies section]({{site.baseurl}}/docs/pipelines/pipelines/#policies).




## Configure sources for pipeline YAMLs

Here you can restrict the sources of pipeline YAML that users can select. The options are:

* Enable/Disable the [inline editor]({{site.baseurl}}/docs/pipelines/pipelines/#using-the-inline-pipeline-editor) where YAML is stored in Codefresh SaaS
* Enable/disable pipeline YAML from connected Git repositories
* Enable/disable pipeline YAML from [external URLs]({{site.baseurl}}/docs/pipelines/pipelines/#loading-codefreshyml-from-version-control)

You need to allow at least one of these options so that users can create new pipelines. We suggest leaving the first option enabled when users are still learning about Codefresh and want to experiment. 

## Memory usage warning for pipeline builds
Select the memory-usage threshold for pipeline builds at which to display alerts. <br>
Memory-usage thresholds for pipeline builds are useful to both avoid premature and unnecessary warnings, and get timely warnings to avoid build failures, as needed.


Accounts with pipelines that do not consume a lot of memory can have higher thresholds, or even the maximum threshold, as they are unikely to hit available memory limits.  
Resource-intensive pipelines on the contrary require lower thresholds for timely warnings to prevent build failures. 90% is recommended for such pipelines.

> Since Codefresh displays the banner alert when the build memory _exceeds_ the selected threshold, setting the threshold at 100%, means that the pipeline has already failed when you see the alert banner.

{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/global-memory-warning.png"
url="/images/pipeline/pipeline-settings/global-memory-warning.png"
alt="Memory usage thresholds for pipeline builds"
caption="Memory usage thresholds for pipeline builds"
max-width="60%"
%}

The selected threshold applies to all pipelines in the account. Users can always override it for individual pipelines. See [Runtime settings]({{site.baseurl}}/docs/pipelines/pipelines/#runtime).


## Advanced pipeline options

Here you can set the defaults for advanced pipeline behavior. The options are:

* [Keep or discard]({{site.baseurl}}/docs/pipelines/steps/approval/#keeping-the-shared-volume-after-an-approval) the volume when a pipeline is entering approval state
* Whether pipelines in approval state [count or not against concurrency]({{site.baseurl}}/docs/pipelines/steps/approval/#define-concurrency-limits)
* Define the [Service Account]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/#setting-up-ecr-integration---service-account) for Amazon ECR integration.
* Set the default registry from which to pull images for all _public_ Public Marketplace Steps. You can select any [Docker Registry]({{site.baseurl}}/docs/integrations/docker-registries/) integration setup in Codefresh.
  * Example: Public Marketplace Step image is defined to use Docker Hub. If you select a `quay.io` integration, all Public Marketplace Step images are pulled from `quay.io` instead of Docker Hub.
  > The default registry selected for Public Marketplace steps is _ignored_ in all built-in pipeline steps: `git-clone`, `freestyle`, `build`, `push`, `composition`, `launch test environment`, `deploy`, and `approval`. For detailed information on built-in steps, see [Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/).
    The selected registry affects only custom or typed steps.

Note that the first option affects pipeline resources and/or billing in the case of SaaS pricing. It will also affect users of existing pipelines that depend on this behavior. It is best to enable/disable this option only once at the beginning.

## Default behavior for build step

Here you can decide if the build step will push images or not according to your organization’s needs. The options are:

1. Users need to decide if an image will be pushed or not after it is built
2. All built images are automatically pushed to the default registry
3. All built images are NOT pushed anywhere by default

Note that this behavior is simply a convenience feature for legacy pipelines. Users can still use a [push step]({{site.baseurl}}/docs/pipelines/steps/push/) in a pipeline and always push an image to a registry regardless of what was chosen in the build step.

## Related articles
[Creating Pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Git Integration]({{site.baseurl}}/docs/integrations/git-providers/)  
