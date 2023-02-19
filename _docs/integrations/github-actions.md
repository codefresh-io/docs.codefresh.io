---
title: "GitHub Actions in Codefresh Pipelines"
description: "Using the GitHub action converter"
group: integrations

toc: true
---

[GitHub Actions](https://github.com/features/actions) are a set of reusable workflows that can be composed to create automation sequences for GitHub projects. GitHub Actions are supported natively with GitHub, but you can also use them in Codefresh pipelines by automatically converting them to [Codefresh pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/).


{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-actions-marketplace.png" 
url="/images/integrations/github-actions/github-actions-marketplace.png"
max-width="60%"
caption="GitHub Actions Marketplace"
alt="GitHub Actions Marketplace"
%}

By using GitHub Actions in your marketplace you have the following benefits:

 * access to a vast catalog of reusable pipeline components
 * the ability to use GitHub actions with any provider, as Codefresh supports [Bitbucket, GitLab, Azure Git etc.]({{site.baseurl}}/docs/integrations/git-providers/)


## Prerequisites

In order to use a GitHub action in Codefresh you need to make sure that the following apply:

1. The [GitHub action](https://github.com/marketplace?type=actions) you have selected is Docker based and has a self-contained and valid Dockerfile
1. You have read the documentation of the GitHub action and know what arguments/input it requires


Also notice that since GitHub Actions are created by the community, it is your responsibility to filter and curate any GitHub actions that you wish to use in Codefresh pipelines. If for example you use a GitHub action, and then it is removed by its creator, the Codefresh pipeline that uses it will break as well.

> We suggest you first use a GitHub action in a GitHub workflow, in order to understand its requirements, before you use it in a Codefresh pipeline.

## How it works

Codefresh offers a github-action-to-codefresh step converter. This converter has two functions

1. When you create your pipeline it will analyze the GitHub action and try to find what arguments it requires. You must then fill the values needed by yourself
1. When the pipeline runs, it will automatically find the Dockerfile of the GitHub action, build it and make available the docker image in any subsequent step in the same pipeline.

All this process is automatic. You just need to make sure that all arguments/inputs of the GitHub action as provided using [pipeline variables]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines), [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) or any other standard mechanism you already use in Codefresh.

## Inserting a GitHub action in Codefresh pipeline

[Create a Codefresh pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines) by visiting the pipeline editor. On the right hand panel in the step tab, search for `actions`.

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-action-step-browser.png" 
url="/images/integrations/github-actions/github-action-step-browser.png"
max-width="50%"
caption="Step browser"
alt="Step browser"
%}

From the result choose the *GitHub Actions* step with the green check mark. From the dialog that will appear you will see a browser for GitHub actions. Scroll down to find the GitHub action that you want to use or enter a keyword to filter the list

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/select-github-action.png" 
url="/images/integrations/github-actions/select-github-action.png"
max-width="70%"
caption="Select GitHub action"
alt="Select GitHub action"
%}

Then click on the GitHub action that you want to use in your pipeline. On the right hand side Codefresh will present that [YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)  step that you need to insert in your pipeline. 

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/snyk-action-arguments.png" 
url="/images/integrations/github-actions/snyk-action-arguments.png"
max-width="70%"
caption="Using the Snyk GitHub action"
alt="Using the Snyk GitHub action"
%}

This YAML snippet is a template and you need to fill the `env` block under the `arguments` block:
The required environment variables are specific to each GitHub action so check the documentation of the action itself.


In the example above we are using the Snyk GitHub action. By visiting the [documentation page](https://github.com/marketplace/actions/snyk-cli-action) we find that this action expects a `SNYK_TOKEN` as input.

We therefore add the token as a pipeline variable:

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/environment-variables.png" 
url="/images/integrations/github-actions/environment-variables.png"
max-width="60%"
caption="Pipeline variables"
alt="Pipeline variables"
%}

Here is the final pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  snyk-cli-action:
    title: snyk
    description: snyk
    type: github-action-executor
    arguments:
      url: 'https://github.com/marketplace/actions/snyk-cli-action'
      envs: 
        - SNYK_TOKEN: '${{SNYK_TOKEN}}'
      cmd: test alpine@latest
{% endraw %}            
{% endhighlight %}

The `cmd` property is specific to each GitHub action and in the case of Snyk we say we want to scan an alpine image for security issues.



## Running a Codefresh pipeline with GitHub Actions


You can run the pipeline as any other Codefresh pipeline.

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-action-pipeline.png" 
url="/images/integrations/github-actions/github-action-pipeline.png"
max-width="80%"
caption="Using GitHub Actions in a Codefresh pipeline"
alt="Using GitHub Actions in a Codefresh pipeline"
%}


Once the pipeline reaches the GitHub action step, the converter will do automatically the following

1. Find the Dockerfile of the GitHub action
1. Build the Dockerfile
1. Take the resulting image and insert it as Codefresh step
1. Pass the environment variables as arguments to the GitHub action
1. Run the `cmd` command

If you have issues please contact us (or open a support ticket) and let us know which GitHub action you are trying to use and what is the URL of the Codefresh build that fails.


## What to read next

- [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) 
- [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) 
- [Plugin marketplace](https://codefresh.io/steps/) 




