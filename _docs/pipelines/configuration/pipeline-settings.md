---
title: "Global settings for pipelines"
description: "Define global options for pipeline templates, yaml sources and approval behavior"
group: pipelines
sub_group: configuration
redirect_from:
  - /docs/administration/pipeline-settings/
toc: true
---


You can define global parameters for all the pipelines in the account. Users can still override some of these options for individual pipelines.

{% include image.html
lightbox="true"
file="/images/pipeline/pipeline-settings/pipeline-settings-ui.png"
url="/images/pipeline/pipeline-settings/pipeline-settings-ui.png"
alt="Pipeline settings"
caption="Pipeline settings"
max-width="80%"
%}

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
max-width="80%"
%}

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
file="images/pipeline/pipeline-settings/pipeline-inject-cluster-accnt-setting.png"
url="/images/pipeline/pipeline-settings/pipeline-inject-cluster-accnt-setting.png"
alt="Enabling cluster contexts for injection into pipelines"
caption="Enabling cluster contexts for injection into pipelines"
max-width="60%"
%}

You can then select specific clusters for individual pipelines, through the **Kubernetes cluster** option in the [Pipeline's Policies section]({{site.baseurl}}/docs/pipelines/pipelines/#policies).


## Template section

Here you can define global template behavior. The options are:

* Enable [pipeline templates]({{site.baseurl}}/docs/pipelines/pipelines/#using-pipeline-templates) for users. If this is enabled some pipelines can be marked as templates and users can still select them when creating a new pipeline. 
* Decide if users can clone an existing pipeline (along with its triggers and associated parameters) when [creating a new pipeline]({{site.baseurl}}/docs/pipelines/pipelines/#creating-a-pipeline).

Note that templates are simply normal pipelines “marked” as a template. There is no technical difference between templates and actual pipelines.

## Pipeline YAML section

Here you can restrict the sources of pipeline YAML that users can select. The options are:

* Enable/Disable the [inline editor]({{site.baseurl}}/docs/pipelines/pipelines/#using-the-inline-pipeline-editor) where YAML is stored in Codefresh SaaS
* Enable/disable pipeline YAML from connected Git repositories
* Enable/disable pipeline YAML from [external URLs]({{site.baseurl}}/docs/pipelines/pipelines/#loading-codefreshyml-from-version-control)

You need to allow at least one of these options so that users can create new pipelines. We suggest leaving the first option enabled when users are still learning about Codefresh and want to experiment. 

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

## Default Behavior for Build Step

Here you can decide if the build step will push images or not according to your organization’s needs. The options are:

1. Users need to decide if an image will be pushed or not after it is built
2. All built images are automatically pushed to the default registry
3. All built images are NOT pushed anywhere by default

Note that this behavior is simply a convenience feature for legacy pipelines. Users can still use a [push step]({{site.baseurl}}/docs/pipelines/steps/push/) in a pipeline and always push an image to a registry regardless of what was chosen in the build step.

## Related articles
[Creating Pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Git Integration]({{site.baseurl}}/docs/integrations/git-providers/)  
