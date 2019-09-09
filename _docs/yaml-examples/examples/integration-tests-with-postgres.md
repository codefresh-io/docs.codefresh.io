---
title: "Integration Tests with Postgres"
description: "Launching a PostgreSQL service container"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/unit-tests-with-postgres/
  - /docs/testing/unit-tests/unit-tests-with-postgres/   
toc: true
---

In this example we will see a NodeJS project that is using PostgreSQL for data storage. For the integration test phase we will launch an instance of PostgreSQL in order to run a simple integration test.

{% include image.html 
lightbox="true" 
file="/images/examples/integration-tests/postgresql-integration-tests.png"
url="/images/examples/integration-tests/postgresql-integration-tests.png"
alt="PostgreSQL integration tests with Codefresh"
caption="PostgreSQL integration tests with Codefresh"
max-width="90%"
%}

The Integration tests are looking for a PostgreSQL connection at `postgres:5432`.

## The example NodeJS project

You can see the example project at [https://github.com/codefreshdemo/example_nodejs_postgres](https://github.com/codefreshdemo/example_nodejs_postgres). The repository contains the NodeJS source code and the simple integration test.

You can play with it locally by using Docker compose to launch both the application and the PostgreSQL Database. 

## Create a pipeline with PostgreSQL integration tests

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
    repo: "codefreshdemo/example_nodejs_postgres"
    revision: "master"
    git: github
    stage: prepare
  run_integration_tests:
    title: "Running integration tests"
    stage: test
    image: node:6.9.1
    environment: &test_postgresql_vars
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=todo
    commands:
      # PostgreSQL is certainly up at this point
         - npm install -g gulp
         - npm install
         - npm test
    services:
      composition:
        postgres:
          image: postgres:11.5
          ports:
            - 5432
          environment: *test_postgresql_vars # Same POSTGRES_USER, POSTGRES_PASSWORD etc.
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: postgres:11.5
        commands:
          - "pg_isready -h postgres"   

{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/).
1. Runs the tests while launching a [service container]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) for an active PostgreSQL instance passing the required environment variables (that match what the test is expecting).

Notice that both the DB as well as the tests share a set of variables (`POSTGRES_USER`, `POSTGRES_PASSWORD` etc.) and thus we use [YAML anchors]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#using-yaml-anchors-to-avoid-repetition) to avoid duplication.

Notice that we also use the `readiness` property in the testing phase so that we can verify PostgreSQL is ready and listening, before running the tests.

## What to read next

- [Service Containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
- [Integration Tests with MySQL]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mysql/)
- [Integration Tests with Redis]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-redis/)
- [Integration Tests with Mongo]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mongo/)



