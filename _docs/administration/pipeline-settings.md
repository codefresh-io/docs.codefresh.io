---
title: "Pipeline Settings"
description: ""
group: administration
toc: true
---

On this page, you can define global parameters for the whole Codefresh account regarding pipeline options. Users can still override some of these options for individual pipelines.

## Template Section

Here you can define global template behavior. The options are:

* Enable [pipeline templates]({{site.baseurl}}/docs/docs/configure-ci-cd-pipeline/pipelines/#using-pipeline-templates) for users. If this is enabled some pipelines can be marked as templates and users can still select them when creating a new pipeline. 
* Decide if users can clone an existing pipeline (along with its triggers and associated parameters) when [creating a new pipeline]({{site.baseurl}}/docs/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines).

Note that templates are simply normal pipelines “marked” as a template. There is no technical difference between templates and actual pipelines.

## Pipeline YAML Section

Here you can restrict the sources of pipeline YAML that users can select. The options are:

* Enable/Disable the [inline editor]({{site.baseurl}}/docs/docs/configure-ci-cd-pipeline/pipelines/#using-the-inline-pipeline-editor) where YAML is stored in Codefresh SaaS
* Enable/disable pipeline YAML from connected Git repositories
* Enable/disable pipeline YAML from [external URLs]({{site.baseurl}}/docs/docs/configure-ci-cd-pipeline/pipelines/#loading-codefreshyml-from-version-control)

You need to allow at least one of these options so that users can create new pipelines. We suggest leaving the first option enabled when users are still learning about Codefresh and want to experiment. 

## Advanced Pipeline Options

Here you can set the defaults for advanced pipeline behavior. The options are:

* [Keep or discard]({{site.baseurl}}/docs/docs/codefresh-yaml/steps/approval/#keeping-the-shared-volume-after-an-approval) the volume when a pipeline is entering approval state
* Whether pipelines in approval state [count or not against concurrency]({{site.baseurl}}/docs/docs/codefresh-yaml/steps/approval/#define-concurrency-limits)

Note that the first option affects pipeline resources and/or billing in the case of SaaS pricing. It will also affect users of existing pipelines that depend on this behavior. It is best to enable/disable this option only once at the beginning.

## Default Behavior for Build Step

Here you can decide if the build step will push images or not according to your organization’s needs. The options are:

1. Users need to decide if an image will be pushed or not after it is built
2. All built images are automatically pushed to the default registry
3. All built images are NOT pushed anywhere by default

Note that this behavior is simply a convenience feature for legacy pipelines. Users can still use a [push step]({{site.baseurl}}/docs/docs/codefresh-yaml/steps/push/) in a pipeline and always push an image to a registry regardless of what was chosen in the build step.

## What to read next

* [Creating Pipelines]({{site.baseurl}}/docs/docs/configure-ci-cd-pipeline/pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Git Integration]({{site.baseurl}}/docs/docs/integrations/git-providers/)
