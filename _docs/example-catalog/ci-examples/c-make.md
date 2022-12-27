---
title: "Compile and test a C application"
description: "Using Codefresh pipelines"
group: example-catalog
sub_group: ci-examples
toc: true
---

Codefresh can work with any C/C++ application very easily as both `gcc` and `g++` are already offered in Dockerhub. There is also another example available with [C++ and cmake]({{site.baseurl}}/docs/example-catalog/ci-examples/cpp-cmake).

## The example C project

You can see the example project at [https://github.com/codefresh-contrib/c-sample-app](https://github.com/codefresh-contrib/c-sample-app){:target="\_blank"}. The repository contains a C starter project with a `Makefile` and several targets:

* `make` compiles the code.
* `make test` runs unit tests
* `make clean` removes artifacts and binaries.

There are also extra targets for `tags` and `etags`.

## Create a CI pipeline for C applications

Creating a CI/CD pipeline for C is very easy, because Codefresh can run any [gcc image](https://hub.docker.com/_/gcc/){:target="\_blank"} that you wish. Gcc docker images already contain the `make` utility. 

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/cc/c-make-pipeline.png" 
url="/images/learn-by-example/cc/c-make-pipeline.png" 
alt="Compiling a C application in a pipeline"
caption="Compiling a C application in a pipeline"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefresh-contrib/c-sample-app/blob/master/codefresh.yml){:target="\_blank"} that compiles the application after checking out the code.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: checkout
    type: git-clone
    repo: 'codefresh-contrib/c-sample-app'
    revision: master
    git: github
  compile_my_sources:
    title: Compile
    stage: build
    image: gcc
    commands:
      - make
  run_my_tests:
    title: Test
    stage: build
    image: gcc
    commands:
      - make test   
{% endraw %}
{% endhighlight %}

This pipeline clones the source code, compiles the code and runs unit tests. In all cases we use the public Docker image of Gcc that also contains `make`.


## Related articles
[C++ example]({{site.baseurl}}/docs/example-catalog/ci-examples/cpp-cmake/)  
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)