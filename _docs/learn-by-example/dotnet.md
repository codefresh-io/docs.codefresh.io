---
title: "C# on .NET Core"
description: "How to build a C# project in Codefresh"
group: learn-by-example
toc: true
---

Codefresh can work with any .NET core application very easily as there are official [Docker images from Microsoft](https://hub.docker.com/_/microsoft-dotnet-core).

## The example C# project

You can see the example project at [https://github.com/dotnet-architecture/eShopOnWeb](https://github.com/dotnet-architecture/eShopOnWeb). The repository contains a C# Web project with 3 kinds of tests. It has different tags for each version of .NET Core and has 

* a `docker-compose.yml` file for local development
* a `tests` directory with all types of tests
* a Dockerfile at `/src/Web`

There are also previous releases at [https://github.com/dotnet-architecture/eShopOnWeb/releases](https://github.com/dotnet-architecture/eShopOnWeb/releases).

### Create a CI pipeline for C# applications

Creating a CI/CD pipeline for C# is very easy, because Codefresh can run any SDK image version that you wish. 

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/dotnet/dotnetcore-pipeline.png" 
url="/images/learn-by-example/dotnet/dotnetcore-pipeline.png" 
alt="Compiling a C# application in a pipeline"
caption="Compiling a C# application in a pipeline"
max-width="80%" 
%}

Here is the full pipeline that compiles the application after checking out the code.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - test
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: checkout
    type: git-clone
    repo: 'dotnet-architecture/eShopOnWeb'
    revision: 'netcore3.0'
    git: github-1
  my_unit_tests:
    title: Unit tests
    stage: test
    image: mcr.microsoft.com/dotnet/core/sdk:3.0
    working_directory: './tests/UnitTests/'
    commands:
      - dotnet test
  my_integration_tests:
    title: Integration tests
    stage: test
    image: mcr.microsoft.com/dotnet/core/sdk:3.0
    working_directory: './tests/IntegrationTests/'
    commands:
      - dotnet test 
  my_functional_tests:
    title: Fuctional tests
    stage: test
    image: mcr.microsoft.com/dotnet/core/sdk:3.0
    working_directory: './tests/FunctionalTests/'
    commands:
      - dotnet test 
  my_app_docker_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: dotnetcore-eshop
    working_directory: ./
    tag: latest
    dockerfile: src/Web/Dockerfile      
{% endraw %}
{% endhighlight %}

This pipeline:

1. clones the source code
1. Uses the official `mcr.microsoft.com/dotnet/core/sdk:3.0` image to run unit/integration/functional tests in 3 different folders
1. Builds the application docker image using the root folder as Docker context but with the Dockerfile located at `./src/Web`

You can see the resulting image in the [image dashboard]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#viewing-docker-images):

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/dotnet/dotnetcore-image.png" 
url="/images/learn-by-example/dotnet/dotnetcore-image.png" 
alt="Building a .NET core docker image"
caption="Building a .NET core docker image"
max-width="80%" 
%}




## What to read next

* [C/C++ examples]({{site.baseurl}}/docs/learn-by-example/cc/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)






