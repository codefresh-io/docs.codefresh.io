---
title: "ARM Support"
description: "Use Docker containers on ARM architecture"
group: incubation
toc: true
---
  
Codefresh is offering initial support for building Docker images for the ARM architecture. ARM support
is only available to Enterprise customers.

## Enabling ARM support

To run ARM pipelines in Codefresh, [open a free account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) and then [contact sales](https://codefresh.io/contact-sales/) in order to enable ARM support.

Once approved, you will get access to a new runtime environment installed on an ARM cluster. This means that you will be able to run both ARM and Linux/x86 builds from the same Codefresh account by choosing the appropriate [pipeline settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings).

## Using ARM builders in Codefresh

Once ARM support is enabled for your account, there is no other special requirement to start building ARM images.

Just read the normal Codefresh documentation:

* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Creating a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Working with Docker registries]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/)
* [On demand environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/)


The only important thing to notice is to make sure that the base Docker images you use are ARM-compiled.

Most popular Docker images (e.g. Alpine) already offer ARM support so all your builds should work right away.

{% include 
image.html 
lightbox="true" 
file="/images/incubation/arm-support/arm-support.png" 
url="/images/incubation/arm-support/arm-support.png"
alt="Checking for ARM images in Dockerhub" 
caption="Checking for ARM images in Dockerhub"
max-width="60%"
%}

Dockerhub has a lot of public images that are offered in multiple architectures.
You will get errors only if you use a less popular image that has no ARM support.



## Example for an ARM build

The [Python sample application](https://github.com/codefresh-contrib/python-flask-sample-app) used in the [quick start guide]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/) is based on an official Docker image that already has ARM support.

Create a pipeline for it with the following YAML content:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: 'Cloning main repository...'
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    git: github
  MyArmDockerImage:
    title: Building Docker ARM Image
    type: build
    image_name: python-flask-sampleapp-arm
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    image: ${{MyArmDockerImage}}
    commands: 
      - uname -a
      - python setup.py test
{% endraw %}
{% endhighlight %}

This pipeline creates a Docker image for a python application and then runs unit tests inside it.

It contains three [steps]({{site.baseurl}}/docs/codefresh-yaml/steps/):

1. A [clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) that checks out code from the Git repository.
1. A [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) that reads a Dockerfile and creates a Docker image.
1. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that runs unit tests.

The logs verify that this is an ARM image:

{% include 
image.html 
lightbox="true" 
file="/images/incubation/arm-support/logs-arm.png" 
url="/images/incubation/arm-support/logs-arm.png"
alt="Running Unit tests" 
caption="Running Unit tests"
max-width="60%"
%}

Once the pipeline is finished you will see the Docker image stored in the [default Docker Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/#the-default-registry):

{% include 
image.html 
lightbox="true" 
file="/images/incubation/arm-support/arm-images.png" 
url="/images/incubation/arm-support/arm-images.png"
alt="Private Registry for ARM docker images" 
caption="Private Registry for ARM docker images"
max-width="60%"
%}

You can also launch it as a [demo environment]({{site.baseurl}}/docs/getting-started/on-demand-environments/).

{% include 
image.html 
lightbox="true" 
file="/images/incubation/arm-support/arm-environment.png" 
url="/images/incubation/arm-support/arm-environment.png"
alt="Launching Docker ARM images" 
caption="Launching Docker ARM images"
max-width="60%"
%}

In summary, the workflow for ARM images is exactly the same as the usual Linux/x86 images.

## What to read next

* [Windows container support]({{site.baseurl}}/docs/incubation/windows-beta/)
* [MacOSX and iOS builds]({{site.baseurl}}/docs/incubation/osx-ios-builds/)

