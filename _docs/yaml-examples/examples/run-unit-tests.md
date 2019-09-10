---
title: "Run Unit Tests"
description: "Running unit tests in Codefresh pipelines"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/run-unit-tests/
toc: true
---

As we have explained in the [Unit tests page]({{site.baseurl}}/docs/testing/unit-tests/) Codefresh supports several ways of running unit tests. The most usual scenarios are using an existing Dockerhub image (common with compiled languages such as Java and Go) or using the application image itself (common with languages such as Javascript/Python/Ruby/PHP).

In this example we will see both ways using two different applications in a single pipeline.

{% include image.html 
lightbox="true" 
file="/images/examples/unit-tests/unit-tests-pipeline.png"
url="/images/examples/unit-tests/unit-tests-pipeline.png"
alt="Unit tests with Codefresh"
caption="Unit tests with Codefresh"
max-width="90%"
%}

In the first case we will run unit tests *before* creating the application docker image, while in the second case we will run unit tests
*inside* the application Docker image.

## The example Python/Go project

You can see the example project at [https://github.com/codefreshdemo/cf-example-unit-test](https://github.com/codefreshdemo/cf-example-unit-test). The repository contains two applications (Python and Go) with their respective unit tests.

You can play with it locally by using Docker commands to package the applications.

## Create a pipeline with Unit tests

Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - 'Microservice A'
  - 'Microservice B'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefreshdemo/cf-example-unit-test'
    revision: 'master'
    git: github
    stage: prepare
  run_my_tests_before_build:
    title: Running Unit tests directly
    stage: 'Microservice A'
    image: golang:1.12
    working_directory: './golang-app-A'
    commands:
      - go test -v
  build_after_my_tests:
    title: Building Go Docker Image
    type: build
    stage: 'Microservice A'
    image_name: my-go-image
    working_directory: './golang-app-A'
    tag: 'master'
    dockerfile: Dockerfile
  build_before_my_tests:
    title: Building Python Docker Image
    type: build
    stage: 'Microservice B'
    image_name: my-python-image
    working_directory: './python-app-B'
    tag: 'master'
    dockerfile: Dockerfile
  run_my_tests_inside_image:
    title: Running Unit tests inside App image
    stage: 'Microservice B'
    image: ${{build_before_my_tests}}
    working_directory: '/app'
    commands:
      - python setup.py test   
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. Runs unit test for the GO application using the Dockerhub image `golang:1.12`
1. [Builds the Docker image]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) for the Go application
1. Builds the Docker image for the Python application
1. Runs unit tests for the Python application using as runtime context the application image that was just created.


Notice that in the second case the tests run in the context of `build_before_my_tests` which is the name of the step that creates the Docker image for Python. See [context variables]({{site.baseurl}}/docs/codefresh-yaml/variables/#context-related-variables) for more information on this technique.

We generally recommend the first approach, so that your production Docker image does not contain any unit testing libraries or frameworks, but there is no right or wrong choice regarding the way you run unit tests. 

## What to read next

- [Unit tests]({{site.baseurl}}/docs/testing/unit-tests/)
- [Integration test example]({{site.baseurl}}/docs/yaml-examples/examples/run-integration-tests/)
- [Service Containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
- [Freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/)

