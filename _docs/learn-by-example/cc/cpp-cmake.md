---
title: "Compile and test a C++ application"
description: "Using Codefresh pipelines"
group: learn-by-example
sub_group: cc
toc: true
---

Codefresh can work with any C/C++ application very easily as both `gcc` and `g++` are already offered in Dockerhub. There is also another example available with [C and make]({{site.baseurl}}/docs/learn-by-example/cc/c-make).

## The example C++ project

You can see the example project at [https://github.com/codefresh-contrib/cpp-sample-app](https://github.com/codefresh-contrib/cpp-sample-app). The repository contains a C++ starter project with a `CMakeLists.txt` file:

* `cmake .` creates the makefiles.
* `make test` runs unit tests
* `make` compiles the code

The project is also using the [boost testing libraries](https://www.boost.org/).

## Cmake, g++ and Docker 

Creating a CI/CD pipeline for C is very easy, because Codefresh can run any [gcc image](https://hub.docker.com/_/gcc/) that you wish. Gcc docker images already contain the `make` utility but not the the `cmake` one. Therefore we will first create a Dockerfile that has `g++`, cmake and the boost libraries. You can follow the same pattern for other development tools that you use.


Here is the Dockerfile:

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM gcc:9.2

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y cmake libgtest-dev libboost-test-dev && rm -rf /var/lib/apt/lists/* 

CMD ["cmake"]

{% endraw %}
{% endhighlight %}

This docker build does the following:

1. Starts from the GCC image
1. Installs cmake and boost
1. Sets cmake as the default command

### Create a CI pipeline for C++ applications

We can now use the custom Docker image in order to compile/test the C++ application:

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/cc/cpp-cmake-pipeline.png" 
url="/images/learn-by-example/cc/cpp-cmake-pipeline.png" 
alt="Compiling a C++ application in a pipeline"
caption="Compiling a C++ application in a pipeline"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefresh-contrib/cpp-sample-app/blob/master/codefresh.yml) that compiles the application after checking out the code.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - prepare
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: checkout
    type: git-clone
    repo: 'codefresh-contrib/cpp-sample-app'
    revision: master
    git: github
  build_dev_image:
    title: Building Dev Image
    stage: prepare
    type: build
    image_name: cmake
    working_directory: ./dev/
    tag: 'latest'
    dockerfile: Dockerfile
  create_makefiles:
    title: Create Makefiles
    stage: prepare
    image: ${{build_dev_image}}
    commands:
      - cmake .
  compile_my_sources:
    title: Compile
    stage: build
    image: ${{build_dev_image}}
    commands:
      - make
  run_my_tests:
    title: Test
    stage: build
    image: ${{build_dev_image}}
    commands:
      - make test     
{% endraw %}
{% endhighlight %}

This pipeline:

1. clones the source code
1. Creates a development docker image that has g++, cmake and boost
1. Runs cmake on the source code to create the make files
1. Compiles the source code
1. Runs unit tests

You can add additional tools in the pipeline by extending the Dockerfile mentioned in the previous section. You can also
change the version of Gcc/g++ by starting from a different public or private Docker image.


## What to read next

* [C example]({{site.baseurl}}/docs/learn-by-example/cc/c-make/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)