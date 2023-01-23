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
* Set the default registry where all Public Marketplace Step images are pulled from. Registries listed are from the [Docker Registry]({{site.baseurl}}/docs/integrations/docker-registries/) integration page.
  * Example: Public Marketplace Step image is defined to use Docker Hub. If you select a quay.io integration, all Public Marketplace Step images will be pulled from quay.io instead of Docker Hub.
  * Note: This does not affect Freestyle Steps.

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
