---
layout: docs
title: "Unit Tests with Postgres"
description: ""
group: configure-ci-cd-pipeline
sub_group: unit-tests
redirect_from:
  - /docs/unit-tests-with-postgres
toc: true
---

Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `Node.js, Postgres` to build an application which will eventually become a distributable Docker image.

## Looking around
In the root of this repository, you'll find a file named `codefresh.yml`, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_step:
    type: build
    image_name: codefreshio/example-nodejs-postgress
    dockerfile: Dockerfile
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}

  unit_test:
    type: composition
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    composition:
      version: '2'
      services:
        postgres:
          image: postgres:latest
          environment:
            - POSTGRES_USER=$POSTGRES_USER
            - POSTGRES_PASSWORD=$POSTGRES_PASSWORD
            - POSTGRES_DB=$POSTGRES_DB
    composition_candidates:
      test:
        image: {% raw %}${{build_step}}{% endraw %}
        links:
          - postgres
        command: bash -c '/usr/src/app/test-script.sh'
        environment:
          - POSTGRES_USER=$POSTGRES_USER
          - POSTGRES_PASSWORD=$POSTGRES_PASSWORD
          - POSTGRES_DB=$POSTGRES_DB
    composition_variables:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=todo
{% endhighlight %} 

In this test script, we wait for  `postgres` is ready, then we can run the test

  `script.sh`
{% highlight sh %}
#!/usr/bin/env bash
wait_for_db() {
  nslookup postgres
  if ! nc -z postgres 5432; then
    echo "Waiting for db..."
    sleep 2
    wait_for_db
  fi
}

wait_for_db

cd /usr/src/app
npm install
npm test
{% endhighlight %} 

<div class="bd-callout bd-callout-info" markdown="1">
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/example_nodejs_postgres){:target="_blank"} in Github.
</div>

## Expected result

{% include image.html lightbox="true" file="/images/84e92ab-codefresh_example_postgres.png" url="/images/84e92ab-codefresh_example_postgres.png" alt="Codefresh unit test Postgres" max-width="65%" %}
