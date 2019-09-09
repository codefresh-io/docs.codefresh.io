---
title: "Integration Tests with Redis"
description: "Launching a Redis service container"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/python-redis/
  - /docs/testing/unit-tests/unit-tests-with-redis/   
toc: true
---

In this example we will see a Python project that is using Redis for storing a web counter. For the integration test phase we will launch both the application and an instance of Redis in order to run a simple integration test.

{% include image.html 
lightbox="true" 
file="/images/examples/integration-tests/redis-integration-tests.png"
url="/images/examples/integration-tests/redis-integration-tests.png"
alt="Redis integration tests with Codefresh"
caption="Redis integration tests with Codefresh"
max-width="90%"
%}

The application will be launched with a hostname `web` while Redis will be at `redis:6379`.

## The example Python project

You can see the example project at [https://github.com/codefreshdemo/example_python_redis](https://github.com/codefreshdemo/example_python_redis). The repository contains the Python source code and a test script.

You can play with it locally by using Docker compose to launch both the application and the Redis datastore. 

## Create a pipeline with Redis integration tests

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
    repo: "codefreshdemo/example_python_redis"
    revision: "master"
    git: github
    stage: prepare
  build_app_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "python-redis-app"
    tag: "latest"
    dockerfile: "Dockerfile"
    stage: build
  build_test_image:
    title: "Building Docker Test Image"
    type: "build"
    image_name: "python-redis-app-tests"
    tag: "latest"
    dockerfile: "Dockerfile.test"
    stage: test
  run_integration_tests:
    title: "Running integration tests"
    stage: test
    image: '${{build_test_image}}'
    commands:
      # Redis and app are certainly up at this point
      - sh ./test.sh
    services:
      composition:
        redis:
          image: redis:latest
          ports:
            - 6379
        web:
          image: '${{build_app_image}}'
          ports:
            - 80
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: '${{build_test_image}}'
        commands:
          - "nslookup redis"
          - "nslookup web"
          - "nc -z redis 6379"
          - "nc -z web 80"
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. [Builds a Docker image]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) with the application itself
1. Builds a helper image that contains `nc` and `curl` that will be used for the integration tests
1. Runs the test script while launching two [service containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) (one for the app and one for Redis)

Notice that we also use the `readiness` property in the testing phase so that we can verify that both the application
as well as Redis are up, before running the tests.

## The integration test script

The integration test is very simple. It just uses `curl` to hit the Python endpoint and `grep` to check for a well known string.

  `test.sh`
{% highlight sh %}
#!bin/bash

if curl web | grep -q '<b>Visits:</b> '; then
  echo "Tests passed!"
  exit 0
else
  echo "Tests failed!"
  exit 1
fi
{% endhighlight %} 

Notice that we use the helper image both for running the test (because of `curl`) and for testing the readiness (because of `nc`). In a more complex application these could be two completely different images.

## What to read next

- [Service Containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
- [Integration Tests with Postgres]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-postgres/)
- [Integration Tests with MySQL]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/)
- [Integration Tests with Mongo]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mongo/)
