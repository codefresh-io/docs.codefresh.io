---
title: "GitHub Actions pipeline integration"
description: "Using the GitHub action converter in Codefresh pipelines"
group: integrations
redirect_from:
  - /docs/integrations/github-actions/
toc: true
---

[GitHub Actions](https://github.com/features/actions){:target="\_blank"} are a set of reusable workflows that can be composed to create automation sequences for GitHub projects. GitHub Actions are supported natively with GitHub, but you can also use them in Codefresh pipelines by automatically converting them to [Codefresh pipeline steps]({{site.baseurl}}/docs/pipelines/steps/).


{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-actions-marketplace.png" 
url="/images/integrations/github-actions/github-actions-marketplace.png"
max-width="60%"
caption="GitHub Actions Marketplace"
alt="GitHub Actions Marketplace"
%}

By using GitHub Actions in your marketplace, you have the following benefits:  
* Access to a vast catalog of reusable pipeline components
* Ability to use GitHub Actions with any provider, as Codefresh supports [Bitbucket, GitLab, Azure Git etc.]({{site.baseurl}}/docs/integrations/git-providers/)


## Prerequisites

To use a GitHub Action in Codefresh you need to make sure that the following apply:

1. The [GitHub action](https://github.com/marketplace?type=actions){:target="\_blank"} you have selected is Docker-based and has a self-contained and valid Dockerfile
1. You have read the documentation of the GitHub Action and know what arguments/input it requires


>Tip:  
  Since GitHub Actions are created by the community, it is your responsibility to filter and curate any GitHub Action you wish to use in Codefresh pipelines. If for example you use a GitHub Action that is then removed by its owner, the Codefresh pipeline that uses it will break as well.  
  We suggest you first use a GitHub Action in a GitHub workflow in order to understand its requirements, before you use it in a Codefresh pipeline.

## How it works

Codefresh offers a `github-action-to-codefresh` step converter.  
This converter has two functions:

1. When you create your pipeline it will analyze the GitHub Action and find what arguments it requires.  
  You must then define the values needed by yourself.
1. When the pipeline runs, it automatically finds the Dockerfile of the GitHub Action, builds it, and makes available the Docker image in any subsequent step in the same pipeline.

All this process is automatic. You just need to make sure that all arguments/inputs of the GitHub Action are provided using [pipeline variables]({{site.baseurl}}/docs/pipelines/pipelines/#creating-a-pipeline), [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/), or any other standard mechanism you already use in Codefresh.

## Inserting a GitHub Action in Codefresh pipeline

1. [Create a Codefresh pipeline]({{site.baseurl}}/docs/pipelines/pipelines/#creating-a-pipeline) by visiting the pipeline editor. 
1. In the **Steps** tab on the right-hand side,  search for `actions` and select **GitHub Actions**.

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-action-step-browser.png" 
url="/images/integrations/github-actions/github-action-step-browser.png"
max-width="50%"
caption="Step browser"
alt="Step browser"
%}

{:start="3"}
1. Scroll down to find the GitHub Action that you want to use or enter a keyword to filter the list.

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/select-github-action.png" 
url="/images/integrations/github-actions/select-github-action.png"
max-width="70%"
caption="Select GitHub action"
alt="Select GitHub action"
%}

{:start="4"}
1. Click on the GitHub Action you want to use in your pipeline.  
   Codefresh displays the [YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) for the action on the right. This is the step that you need to insert in your pipeline. 

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/snyk-action-arguments.png" 
url="/images/integrations/github-actions/snyk-action-arguments.png"
max-width="70%"
caption="Using the Snyk GitHub action"
alt="Using the Snyk GitHub action"
%}

  The YAML snippet is a template, and you need to fill the `env` block below the `arguments` block.  
  The required environment variables are specific to each GitHub Action, so check the documentation of the action itself.  
    

  In the example above, we use the Snyk GitHub Action. By visiting the [documentation page](https://github.com/marketplace/actions/snyk-cli-action){:target="\_blank"}, we find that this action expects a `SNYK_TOKEN` as input.

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


Once the pipeline reaches the GitHub Action step, the converter automatically does the following:

1. Finds the Dockerfile of the GitHub Action
1. Builds the Dockerfile
1. Takes the resulting image and inserts it as Codefresh step
1. Passes the environment variables as arguments to the GitHub Action
1. Runs the `cmd` command

If you have issues, please contact us or open a support ticket, and let us know which GitHub Action you are trying to use and the URL of the Codefresh build that fails.


## Related articles
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Plugin marketplace](https://codefresh.io/steps/){:target="\_blank"}  





