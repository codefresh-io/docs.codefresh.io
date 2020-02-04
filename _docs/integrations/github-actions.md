---
title: "Github actions in Codefresh pipelines"
description: "Using the Github action converter"
group: integrations

toc: true
---

[Github actions](https://github.com/features/actions) are a set of reusable workflows that can be composed to create automation sequences for Github projects. Github actions are supported natively with Github, but you can also use them in Codefresh pipelines by automatically converting them to [Codefresh pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/).


{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-actions-marketplace.png" 
url="/images/integrations/github-actions/github-actions-marketplace.png"
max-width="60%"
caption="Github Actions Marketplace"
alt="Github Actions Marketplace"
%}

By using Github actions in your marketplace you have the following benefits:

 * access to a vast catalog of reusable pipeline components
 * the ability to use Github actions with any provider, as Codefresh supports [Bitbucket, Gitlab, Azure Git etc.]({{site.baseurl}}/docs/integrations/git-providers/)


## Prerequisites

In order to use a Github action in Codefresh you need to make sure that the following apply:

1. The [Github action](https://github.com/marketplace?type=actions) you have selected is Docker based and has a self-contained and valid Dockerfile
1. You have read the documentation of the Github action and know what arguments/input it requires
1. You have at least one Docker registry connected to your Codefresh account. (You can use the [built-in Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) as well)

Also notice that since the Github actions are created by community, it is your responsibility to filter and curate any Github actions that you wish to Codefresh pipelines. If for example you use a Github action, that is removed by its creator, the Codefresh pipeline that uses it will break as well.

> We suggest you first use a Github action in a Github workflow, in order to understand its requirements, before you use it in a Codefresh pipeline.

## How it works

Codefresh offers a github-action-to-codefresh step converter. This converter has two functions

1. When you create your pipeline it will analyze the Github action and try to find what arguments it requires. You must then fill the values needed by yourself
1. When the pipeline runs, it automatically will find the Dockerfile of the Github action, build it, push it in the Docker registry that you specify and then use it as a standard Codefresh step.

All this process is automatic. You just need to make sure that all arguments/inputs of the Github action as provided using [pipeline variables]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines), [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) or any other standard mechanism you already use in Codefresh.

## Inserting a Github action in Codefresh pipeline

## Troubleshooting


version: '1.0'
stages:
  - stage1
steps:
  snyk-cli-action:
    title: snyk
    description: snyk
    type: github-action-executor
    arguments:
      url: 'https://github.com/marketplace/actions/snyk-cli-action'
      envs: 
        - SNYK_TOKEN: '208e9e80-6a22-4894-9b35-05d5865d31b8'
      cache: true
      debug: true
      cmd: test alpine@latest
      registry: dockerhub
      registry_repo: codefreshplugins

https://github.com/marketplace/actions/snyk-cli-action






## What to read next

- [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) 
- [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) 
- [Plugin marketplace](https://codefresh.io/steps/) 




