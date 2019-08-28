---
title: "MacOSX and iOS builds"
description: "Using Codefresh for Mac/iPhone application"
group: incubation
toc: true
---
  
Codefresh is offering alpha support for MacOS and/or iOS as a CI/CD environment. Access to the build environment is possible after invite only. To run MacOS/iOS pipelines in Codefresh, [open a free account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) and then [contact sales](https://codefresh.io/contact-sales/) in order to enable this build environment type.

## Enabling MacOS/iOS support

Once approved, you will get access to a special runtime environment environment that will run your MacOS/iOS builds. To use this environment [create a new pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) and select it in the pipeline settings screen.

IMAGE here

## Building MacOS/iOS application with Codefresh

Once you assign the special MacOS runtime to your pipeline, you can write your [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) as usual, keeping in mind the following points

* The git-clone step is available
* Freestyle steps must use the `freestyle-ssh` type
* The manual approval step is available
* All Docker related pipeline steps build, push, deploy, composition are **NOT** available.
* Parallel steps are supported

As part of the alpha version the nodes that run your MacOS builds are actual nodes (i.e. not containers), so all changes you make there are permanent (unlike docker based builds, where everything runs in an isolated docker container that is discarded after the build has finished).


## Example for an MacOS build

The [Python sample application](https://github.com/codefresh-contrib/python-flask-sample-app) used in the [quick start guide]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/) is based on an official Docker image that already has ARM support.

Create a pipeline for it with the following YAML content:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
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

It contains two [steps]({{site.baseurl}}/docs/codefresh-yaml/steps/):

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

Once the pipeline is finished you will see the Docker image stored in the [Codefresh Registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/):

{% include 
image.html 
lightbox="true" 
file="/images/incubation/arm-support/arm-images.png" 
url="/images/incubation/arm-support/arm-images.png"
alt="Private Registry for ARM docker images" 
caption="Private Registry for ARM docker images"
max-width="60%"
%}

You can also launch it as a [demo environment]({{site.baseurl}}/docs/getting-started/on-demand-environments/)

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
