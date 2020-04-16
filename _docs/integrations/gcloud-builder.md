---
title: "Google Cloud Builder"
description: "Using the Google Cloud builder to create Docker images"
group: integrations

toc: true
---

dfdfdf


## Prerequisites

sdsd

## How it works

Codefresh offers a github-action-to-codefresh step converter. This converter has two functions

1. When you create your pipeline it will analyze the Github action and try to find what arguments it requires. You must then fill the values needed by yourself
1. When the pipeline runs, it will automatically find the Dockerfile of the Github action, build it and make available the docker image in any subsequent step in the same pipeline.

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
file="/images/integrations/github-actions/snyk-action-arguments.png" 
url="/images/integrations/github-actions/snyk-action-arguments.png"
max-width="70%"
caption="Using the Snyk Github action"
alt="Using the Snyk Github action"
%}

This YAML snippet is a template and you need to fill the `env` block under the `arguments` block:
The required environment variables are specific to each Github action so check the documentation of the action itself.


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
1. Take the resulting image and insert it as Codefresh step
1. Pass the environment variables as arguments to the Github action
1. Run the `cmd` command

If you have issues please contact us (or open a support ticket) and let us know which Github action you are trying to use and what is the URL of the Codefresh build that fails.


## What to read next

- [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) 
- [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) 
- [Plugin marketplace](https://codefresh.io/steps/) 




