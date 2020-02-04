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

Also notice that since Github actions are created by the community, it is your responsibility to filter and curate any Github actions that you wish to use in Codefresh pipelines. If for example you use a Github action, and then it is removed by its creator, the Codefresh pipeline that uses it will break as well.

> We suggest you first use a Github action in a Github workflow, in order to understand its requirements, before you use it in a Codefresh pipeline.

## How it works

Codefresh offers a github-action-to-codefresh step converter. This converter has two functions

1. When you create your pipeline it will analyze the Github action and try to find what arguments it requires. You must then fill the values needed by yourself
1. When the pipeline runs, it will automatically find the Dockerfile of the Github action, build it, push it in the Docker registry that you specify and then use it as a standard Codefresh step.

All this process is automatic. You just need to make sure that all arguments/inputs of the Github action as provided using [pipeline variables]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines), [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) or any other standard mechanism you already use in Codefresh.

## Inserting a Github action in Codefresh pipeline

[Create a Codefresh pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines) by visiting the pipeline editor. On the right hand panel in the step tab, search for `actions`.

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-action-step-browser.png" 
url="/images/integrations/github-actions/github-action-step-browser.png"
max-width="50%"
caption="Step browser"
alt="Step browser"
%}

From the result choose the *Github actions* step with the green check mark. From the dialog that will appear you will see a browser for Github actions. Scroll down to find the Github action that you want to use or enter a keyword to filter the list

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/select-github-action.png" 
url="/images/integrations/github-actions/select-github-action.png"
max-width="70%"
caption="Select Github action"
alt="Select Github action"
%}

Then click on the Github action that you want to use in your pipeline. On the right hand side Codefresh will present that [YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)  step that you need to insert in your pipeline. 

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/snyk-arguments.png" 
url="/images/integrations/github-actions/snyk-arguments.png"
max-width="70%"
caption="Using the Snyk Github action"
alt="Using the Snyk Github action"
%}

This YAML snippet is a template and the following need to be filled under the `arguments` block:

* `env` - a list of arguments. They are specific to each Github action so check the documentation of the action itself
* `registry` - the name of a [registry connected to Codefresh]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). You can find the names in your [integrations page](https://g.codefresh.io/account-admin/account-conf/integration/registry)
* `registry_repo` - the repository/account that you wish to use in the registry for storing the Github action. In the case of Dockerhub it is your Dockerhub username, for the Codefresh registry it is your Codefresh username and so on.

In the example above we are using the Snyk Github action. By visiting the [documentation page](https://github.com/marketplace/actions/snyk-cli-action) we find that this action expects a `SNYK_TOKEN` as input.

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
      registry: dockerhub
      registry_repo: codefreshplugins  
{% endraw %}            
{% endhighlight %}

The `cmd` property is specific to each Github action and in the case of Snyk we say we want to scan an alpine image for security issues.



## Running a Codefresh pipeline with Github actions


You can run the pipeline as any other Codefresh pipeline.

{% include image.html 
lightbox="true" 
file="/images/integrations/github-actions/github-action-pipeline.png" 
url="/images/integrations/github-actions/github-action-pipeline.png"
max-width="80%"
caption="Using Github actions in a Codefresh pipeline"
alt="Using Github actions in a Codefresh pipeline"
%}


Once the pipeline reaches the Github action step, the converter will do automatically the following

1. Find the Dockerfile of the Github action
1. Build the Dockerfile
1. Push the resulting image to the connected Codefresh registry
1. Take the resulting image and insert it as Codefresh step
1. Pass the environment variables as arguments to the Github action
1. Run the `cmd` command

If you have issues please contact us (or open a support ticket) and let us know which Github action you are trying to use and what is the URL of the Codefresh build that fails.


## What to read next

- [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) 
- [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) 
- [Plugin marketplace](https://codefresh.io/steps/) 




