---
title: "Integration Tests Example"
description: "Launching separate App and test containers"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/run-integration-tests/
toc: true
---
In this example we will see a Java/Tomcat project that is using JUnit for unit tests and Spock for integration tests. For the integration test phase we will launch both the application and the tests in order to run the integration tests against a real web instance (i.e. without mocking).

{% include image.html 
lightbox="true" 
file="/images/examples/integration-tests/integration-tests.png"
url="/images/examples/integration-tests/integration-tests.png"
alt="Integration tests with Codefresh"
caption="Integration tests with Codefresh"
max-width="90%"
%}

The integration tests will look at the application instance at `app:8080`.

## The example Java/Tomcat/Spring project

You can see the example project at [https://github.com/codefreshdemo/cf-example-integration-tests](https://github.com/codefreshdemo/cf-example-integration-tests). The repository contains the Java source code and some integration tests.

You can play with it locally by using Docker compose to launch both the application and the tests. 

## Create a pipeline with separate integration tests

Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - prepare
  - build
  - test
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "codefreshdemo/cf-example-integration-tests"
    revision: "master"
    git: github
    stage: prepare
  build_app_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-spring-app"
    tag: "master"
    dockerfile: "Dockerfile"
    stage: build
  build_test_image:
    title: "Building Docker Test Image"
    type: "build"
    image_name: "my-junit-spock-tests"
    tag: "master"
    dockerfile: "Dockerfile.testing"
    stage: test
  run_integration_tests:
    title: "Running integration tests"
    stage: test
    image: '${{build_test_image}}'
    commands:
      # Tomcat is certainly up at this point
      - mvn verify -Dserver.host=app
    services:
      composition:
        app:
          image: '${{build_app_image}}'
          ports:
            - 8080
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: byrnedo/alpine-curl
        commands:
          - "curl http://app:8080/wizard/"

{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. [Builds a Docker image]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) with only Tomcat and the application WAR
1. Builds a helper image that contains the source code and Maven so that it can run integration tests.
1. Runs the `mvn verify` command in the helper image while launching a [service container]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) with the Tomcat/Java image

Notice that we also use the `readiness` property in the testing phase so that we can verify that the application
is actually up, before running the tests.

## What to read next

- [Service Containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
- [Integration Tests with Postgres]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-postgres/)
- [Integration Tests with MySQL]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/)
- [Integration Tests with Mongo]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mongo/)
- [Integration Tests with Redis]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-redis/)