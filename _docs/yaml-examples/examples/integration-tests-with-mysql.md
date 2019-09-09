---
title: "Integration Tests with MySQL"
description: "Launching a MySQL service container"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/nodejsmysql/
  - /docs/testing/unit-tests/unit-tests-with-mysql/
  - /docs/setup-unit-tests/
  - /docs/testing/unit-tests/unit-tests-with-composition/
  - /docs/run-unit-tests-with-composition/
  - /docs/unit-tests-with-database/
  - /docs/testing/unit-tests/unit-tests-with-database/
  - /docs/yaml-examples/examples/integration-tests-with-database/             
toc: true
---

In this example we will see a NodeJS project that is using MySQL for data storage. For the integration test phase we will launch an instance of MySQL in order to run a simple integration test.

{% include image.html 
lightbox="true" 
file="/images/examples/integration-tests/mysql-integration-tests.png"
url="/images/examples/integration-tests/mysql-integration-tests.png"
alt="MySQL integration tests with Codefresh"
caption="MySQL integration tests with Codefresh"
max-width="90%"
%}

The Integration tests are looking for a MySQL connection at `test_mysql_db:3306`.

## The example NodeJS project

You can see the example project at [https://github.com/codefreshdemo/cf-example-unit-tests-with-composition](https://github.com/codefreshdemo/cf-example-unit-tests-with-composition). The repository contains the NodeJS source code and the simple integration test.

You can play with it locally by using Docker compose to launch both the application and the MySQL Database. 

## Create a pipeline with MySQL integration tests

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
    repo: "codefreshdemo/cf-example-unit-tests-with-composition"
    revision: "master"
    git: github
    stage: prepare
  build_test_image:
    title: "Building Test Docker Image"
    type: "build"
    image_name: "mysql-tests"
    tag: "master"
    dockerfile: "Dockerfile"
    stage: build
  run_integration_tests:
    title: "Running integration tests"
    stage: test
    image: '${{build_test_image}}'
    environment: &test_mysql_vars
      - MYSQL_ROOT_PASSWORD=admin
      - MYSQL_USER=my_user
      - MYSQL_PASSWORD=admin
      - MYSQL_DATABASE=nodejs
      - MYSQL_HOST=test_mysql_db
    commands:
      # MySQL is certainly up at this point
         - cd /usr/src/app
         - npm test
    services:
      composition:
        test_mysql_db:
          image: mysql:5.7
          ports:
            - 3306
          environment: *test_mysql_vars # Same MYSQL_HOST, MYSQL_USER etc.
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: '${{build_test_image}}'
        commands:
          - "nslookup test_mysql_db"   
          - "nc -z test_mysql_db 3306"
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/).
1. [Builds a Docker image]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) with the integration test.
1. Runs the tests while launching a [service container]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) for an active MySQL instance passing the required environment variables (that match what the test is expecting).

Notice that both the DB as well as the tests share a set of variables (`MYSQL_PASSWORD`, `MYSQL_USER` etc.) and thus we use [YAML anchors]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#using-yaml-anchors-to-avoid-repetition) to avoid duplication.

Notice that we also use the `readiness` property in the testing phase so that we can verify MySQL is ready and listening, before running the tests.

## What to read next

- [Service Containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
- [Integration Tests with Postgres]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-postgres/)
- [Integration Tests with Redis]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-redis/)
- [Integration Tests with Mongo]({{site.baseurl}}/docs/yaml-examples/examples/integration-tests-with-mongo/)


