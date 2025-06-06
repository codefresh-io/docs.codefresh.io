---
title: "ARM support"
description: "Use Docker containers on ARM architecture"
redirect_from:
  - /docs/incubation/arm-support/
toc: true
---
  
Codefresh supports building Docker images for ARM architecture.  
ARM support is only available to Enterprise customers.

## Enabling ARM support

To run ARM pipelines in Codefresh:
* [Open a free account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/)
* [Contact sales](https://codefresh.io/contact-us/){:target="\_blank"} to enable ARM support

Once approved, you will get access to a new runtime environment installed on an ARM cluster. You can run both ARM and Linux/x86 builds from the same Codefresh account by choosing the appropriate [pipeline settings]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings).

## Using ARM builders in Codefresh

Once ARM support is enabled for your account, there is no other special requirement to start building ARM images.

Just read the Codefresh documentation:

* [Introduction to Pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)
* [Creating a Pipeline]({{site.baseurl}}/docs/pipelines/pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)
* [Working with Docker registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)
* [On demand environments]({{site.baseurl}}/docs/quick-start/ci-quick-start/on-demand-environments/)


>**NOTE**  
Make sure that the base Docker images you use are ARM-compiled.

Most popular Docker images (i.e., Alpine) already offer ARM support so all your builds should work right away.

{% include 
image.html 
lightbox="true" 
file="/images/incubation/arm-support/arm-support.png" 
url="/images/incubation/arm-support/arm-support.png"
alt="Checking for ARM images in Dockerhub" 
caption="Checking for ARM images in Dockerhub"
max-width="60%"
%}

Dockerhub has many public images that are offered in multiple architectures.
You will get errors only if you use a less popular image that has no ARM support.



## Example for an ARM build

The [Python sample application](https://github.com/codefresh-contrib/python-flask-sample-app){:target="\_blank"} used in the [quick start guide]({{site.baseurl}}/docs/quick-start/ci-quick-start/create-ci-pipeline/) is based on an official Docker image that already has ARM support.

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

1. A [clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) that checks out code from the Git repository.
1. A [build step]({{site.baseurl}}/docs/pipelines/steps/build/) that reads a Dockerfile and creates a Docker image.
1. A [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) that runs unit tests.

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

Once the pipeline completes execution, you will see the Docker image stored in the [default Docker Registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/#the-default-registry):

{% include 
image.html 
lightbox="true" 
file="/images/incubation/arm-support/arm-images.png" 
url="/images/incubation/arm-support/arm-images.png"
alt="Private Registry for ARM docker images" 
caption="Private Registry for ARM docker images"
max-width="60%"
%}

You can also launch it as a [demo environment]({{site.baseurl}}/docs/quick-start/ci-quick-start/on-demand-environments/).

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

## Related articles
[Codefresh Runner installation]({{site.baseurl}}/docs/installation/runner/install-codefresh-runner/)  

