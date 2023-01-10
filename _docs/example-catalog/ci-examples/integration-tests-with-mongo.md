---
title: "Integration Tests with Mongo"
description: "Launching a MongoDB service container"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/nodejsmongo/
  - /docs/testing/unit-tests/unit-tests-with-mongo/   
toc: true
---

In this example, we will see a NodeJS project that uses MongoDB for data storage. For the integration test phase we will launch an instance of MongoDB in order to run a set of [Mocha tests](https://mochajs.org/){:target="\_blank"}.

{% include image.html 
lightbox="true" 
file="/images/examples/integration-tests/mongodb-integration-tests.png"
url="/images/examples/integration-tests/mongodb-integration-tests.png"
alt="MongoDB integration tests with Codefresh"
caption="MongoDB integration tests with Codefresh"
max-width="90%"
%}

The Mocha tests are looking for a MongoDB connection at `mongo:27017`.

## The example NodeJS project

You can see the example project at [https://github.com/codefreshdemo/example_nodejs_mongo](https://github.com/codefreshdemo/example_nodejs_mongo){:target="\_blank"}. The repository contains the NodeJS source code and the Mocha tests.

You can play with it locally by using Docker compose to launch both the application and the MongoDB datastore. 

## Create a pipeline with MongoDB integration tests

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
    repo: "codefreshdemo/example_nodejs_mongo"
    revision: "master"
    git: github
    stage: prepare
  build_app_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "node-mongo-app"
    tag: "master"
    dockerfile: "Dockerfile"
    stage: build
  run_integration_tests:
    title: "Running integration tests"
    stage: test
    image: '${{build_app_image}}'
    environment:
      - MONGO_PORT=27017    
    commands:
      # MongoDB is certainly up at this point
        - cd /src
        - npm test
    services:
      composition:
        mongo:
          image: mongo:latest
          ports:
            - 27017             
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: '${{build_app_image}}'
        commands:
          - "nslookup mongo"   
          - "nc -z mongo 27017"
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
1. Builds a Docker image with the application source code as well as the Mocha tests through a [build step]({{site.baseurl}}/docs/pipelines/steps/build/).
1. Runs Mocha tests while launching a [service container]({{site.baseurl}}/docs/pipelines/service-containers/) for an active MongoDB instance

Notice that we also use the `readiness` property in the testing phase so that we can verify MongoDB is ready and listening, before running the tests.

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Integration test example]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integration-tests/)  
[Integration Tests with Postgres]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/)  
[Integration Tests with MySQL]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mysql/)  
[Integration Tests with Redis]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-redis/)  




