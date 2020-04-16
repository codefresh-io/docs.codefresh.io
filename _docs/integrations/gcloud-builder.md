---
title: "Google Cloud Builder"
description: "Using the Google Cloud builder to create Docker images"
group: integrations

toc: true
---

Google Cloud builder is an online service that allows you to build Docker images using the Google infrastructure and also push them to the Google Cloud registry.

You can also use Cloud builder in a Codefresh pipeline in place of the [normal build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/). This way you can take advantage of the Cloud builder in your Codefresh pipelines, but still push to other registries that are connected to Codefresh (and not just GCR).


## Prerequisites

In order to use the Cloud builder service in your Codefresh pipeline you need

1. A free Dockerhub account and [Dockerhub connected to Codefresh]({{site.baseurl}}/docs/docker-registries/external-docker-registries/docker-hub/).
1. A Google Cloud subscription and a [service account for the Cloud builder service](https://cloud.google.com/cloud-build/docs/securing-builds/set-service-account-permissions).

Save your service account as a JSON file and make sure you select at least the [following roles](https://cloud.google.com/container-registry/docs/access-control):

* Cloud storage Admin
* Storage Admin
* Storage Object Viewer
* Storage Object Creator

You will use this JSON file either in the usual way of integration a [Google Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/google-container-registry/) in Codefresh or directly in a pipeline as we will see later.

## How it works

The Google Cloud builder integration/authentication can be used in the following ways:

1. Authentication will be retrieved from the GCR integration in your Codefresh account, and the resulting Docker image will also be pushed to GCR
1. Authentication will be retrieved from the GCR integration in your Codefresh account but the resulting Docker image will be pushed to any other [external registry connected to Codefresh]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
1. Authentication will be defined in the pipeline itself, and the resulting image can be pushed to any registry connected to Codefresh

In the first two cases, you will enter your service account file centrally in the GCR integration screen and then any pipeline can authenticate to Google Cloud builder without any further configuration.

{% 
	include image.html 
	lightbox="true" 
	file="/images/artifacts/registry/add-gcr-registry.png" 
	url="/images/220c472-add-gcr-new.png" 
	alt="Using the JSON service account in Codefresh" 
	caption="Using the JSON service account in Codefresh"
	max-width="50%" 
%}



## Pushing to GCR using Google Cloud builder

In the most straightforward scenario you want to create a Docker image with Google Cloud builder and also push to GCR.

{% include image.html 
lightbox="true" 
file="/images/integrations/gcloud-builder/snyk-action-arguments.png" 
url="/images/integrations/gcloud-builder/snyk-action-arguments.png"
max-width="70%"
caption="Using Google cloud builder in Codefresh"
alt="Using Google cloud builder in Codefresh"
%}

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/golang-sample-app'
    revision: master
    git: github
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-golang-image
    working_directory: ./
    tag: from-cloud-build
    registry: gcr
    dockerfile: Dockerfile.multistage
    provider:
      type: gcb
      arguments:
        cache:
          repo: "my-golang-image-cache/kaniko-cache"
          ttl: "10h"
{% endraw %}            
{% endhighlight %}



[

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




