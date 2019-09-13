---
title: "Integration Tests"
description: "How to launch additional services in Codefresh pipelines"
group: testing
redirect_from:
  - /docs/integration-tests/
  - /docs/integration-test-script/
  - /docs/testing/run-unit-test-with-db-composition/
toc: true
---

Simple [unit tests]({{site.baseurl}}/docs/testing/unit-tests/) that rely only on the source code of the application, are very easy to execute in Codefresh, using only [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/). For integration tests however, you usually need to launch either the application itself or one or more external services (such as a database).


Codefresh offers two ways of launching sidecar containers (similar to Docker compose) within the pipeline:

1. [Compositions]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/) is the old (but still supported) way
1. [Service containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) is the new and more flexible way.

For brand new pipelines we suggest you use service containers. They are much more flexible than compositions in 3 major areas

1. You can guarantee the order of service launch and their dependencies (a feature that is not even offered by vanilla docker-compose)
1. You can use a special docker image to preload data to a database or otherwise initialize a service before tests are run
1. The service containers can be attached on the whole pipeline instead of individual steps 
1. The Codefresh [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) is auto-mounted on freestyle steps (unlike compositions) making file access very easy (i.e. so that you can execute your tests from the Git repository that was cloned).

>Notice that this page explains how to run additional services that are automatically discarded once the pipeline is finished. If you are interested in temporary test environments see the [preview environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/) page.


## How integration tests work in Codefresh

Service containers work similar to docker-compose. A set of containers are launched on the same network with configurable hostnames and ports. Once they are up, you decide what to do with a freestyle step what is part of the network as well. In the most typical pipeline you can use your existing test framework (regardless of programming language) in the same manner as you would run your tests locally.

A best practice is to make sure that the hostnames used by your integration tests to access external services are not hard-coded. Even though with Codefresh you can decide the name of hostnames used in the pipeline (i.e. the hostname of a MySQL or Redis instance), in the long run it is better if you can choose that information freely without having the limitation of what is mentioned in the source code.

Also make sure that your tests do **NOT** use `localhost` for an API endpoint. This technique does not work with docker-compose and will not work with Codefresh either.

>Notices that the services you launch in a Codefresh pipeline, consume resources (memory/CPU) from the pipeline running environment. The more services you launch the less resources you have for the actual pipeline. We also suggest that you do **NOT** use service containers for running load testing or performance testing. 


### Running integration tests directly from source code

The simplest way to run integration tests is to check out the source code of your tests and launch the services that they need.

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/from-source-code.png"
  url="/images/testing/integration-testing/from-source-code.png"
  alt="Testing directly from source code"
  caption="Testing directly from source code"
  max-width="70%"
%}

This is a very popular way of running integration tests, but not the most flexible one. It works only when your tests have very low requirements on their testing environment. It also doesn't make a clear distinction on source code that gets shipped to production with source code that is used only for testing.Make sure that you don't fall into the slippery slope of shipping testing tools with your docker container.  

Here is the respective pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-npm-example"
    revision: "master"
    git: github
  my_tests:
    image: 'node:11'
    title: "Download Deps"
    commands:
      - 'npm install'
  my_tests:
    image: 'node:11'
    title: "Integration tests"
    commands:
      - 'npm test'
    services:
      composition:
        my_redis_service:
          image: 'redis:latest'
          ports:
            - 6379
{% endraw %}      
{% endhighlight %}

We suggest using this technique only if your application is not dockerized yet (i.e. you don't deploy it with a Docker image to production). 


See more examples with [MySQL]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/) or [Postgres]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-postgres/).

### Running tests after launching the application

A better approach (that mimics what happens in reality) is to actually launch your application as a Docker image and then run tests against it. Of course this approach is only possible if you have adopted containers as deployment artifacts:

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/to-app.png"
  url="/images/testing/integration-testing/to-app.png"
  alt="Launching the application to be tested"
  caption="Launching the application to be tested"
  max-width="70%"
%}

This technique is only limited by your pipeline resources. If you have not adopted microservices, it might be difficult to launch a huge monolith as part of a Codefresh pipeline (remember that service containers use the same resources as the pipeline). But for simple applications this way ensures that your tests actually hit the running application.

Here is the respective pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-java-example"
    revision: "master"
    git: github
  build_app_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-java-app"
    tag: "master"
    dockerfile: "Dockerfile"
  my_tests:
    image: 'maven:3.5.2-jdk-8-alpine'
    title: "Integration tests"
    commands:
      - 'mvn -Dmaven.repo.local=/codefresh/volume/m2_repository integration-test'
    services:
      composition:
        my_postgres:
          image: 'postgres:11.5'
          ports:
            - 5432
        app:
          image: '${{build_app_image}}'
          ports:
            - 8080      
{% endraw %}      
{% endhighlight %}


See more examples with [launching the application]({{site.baseurl}}/docs/yaml-examples/examples/run-integration-tests/) or [Postgres]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-postgres/).


### Using a custom test image

In all the previous examples the tests were running in a public Dockerhub that has the programming language/framework that your tests require. In more complex cases, you might need to create your own Docker image that contains exactly the tools that you wish. 

In this case you can create a special Docker image that will be used just for testing and nothing else.

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/special-image.png"
  url="/images/testing/integration-testing/special-image.png"
  alt="Using a dedicated testing image"
  caption="Using a dedicated testing image"
  max-width="70%"
%}

It is very easy to create a test image as part of a pipeline and then reference it for integration tests.
Here is the pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-app-example"
    revision: "master"
    git: github
  build_app_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-web-app"
    tag: "master"
    dockerfile: "Dockerfile"    
  build_test_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-test-image"
    tag: "master"
    dockerfile: "Dockerfile.testing"
  my_tests:
    image: '${{build_test_image}}'
    title: "Integration tests"
    commands:
      - 'sh ./my-tests.sh'
    services:
      composition:
        my_postgres:
          image: 'postgres:11.5'
          ports:
            - 5432
        app:
          image: '${{build_app_image}}'
          ports:
            - 8080      
{% endraw %}      
{% endhighlight %}

This is the recommended way to run integration tests in Codefresh. It creates a clear distinction on source code that gets shipped to production with source code that is needed only for tests. It also allows you to define exactly how the test environment looks like (maybe you need multiple or exotic testing tools that are not available in dockerhub).

See more examples with using a separate testing image [for the application]]({{site.baseurl}}/docs/yaml-examples/examples/run-integration-tests/) or [a MySQL instance]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/). 

### Multiple services tree

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/complex-tests.png"
  url="/images/testing/integration-testing/complex-tests.png"
  alt="Microservice testing"
  caption="Microservice testing"
  max-width="70%"
%}


## Service scope (all pipeline or none)


{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/single-scope.png"
  url="/images/testing/integration-testing/single-scope.png"
  alt="Service containers for individual steps"
  caption="Service containers for individual steps"
  max-width="60%"
%}

{%
  include image.html
  lightbox="true"
  file="/images/testing/integration-testing/multi-scope.png"
  url="/images/testing/integration-testing/multi-scope.png"
  alt="Service containers for the whole pipeline"
  caption="Service containers for the whole pipeline"
  max-width="60%"
%}

## Reuse compositions.