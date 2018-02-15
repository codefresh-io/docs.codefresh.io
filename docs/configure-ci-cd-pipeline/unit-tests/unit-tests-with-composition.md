---
layout: docs
title: "Unit Tests with Composition"
description: ""
group: configure-ci-cd-pipeline
sub_group: unit-tests
redirect_from:
  - /docs/setup-unit-tests
toc: true
---

Sometimes running unit tests require some additional services such as a Database (Mongo, MySql, Postgres etc) or third-party components like Redis, Memcache, etc.

Codefresh provides you an easy way to do this by using a Codefresh pipeline and docker-compose.

To run Unit Tests with a DB or other services you can create a composition and run your unit tests as part of it. 

Simple, right?

<div class="bd-callout bd-callout-info" markdown="1">
##### Example repository

Fork this [__repository__](https://github.com/codefreshdemo/cf-example-unit-tests-with-composition){:target="_blank"} in Github to continue
</div>

## How to do it using option \"Replace Service\"

{:start="1"}
1. Navigate to added example repository, select relevant pipeline and put in your test script in Unit Tests Section. For this example, your unit test script will be something like that. Just copy and paste this script to Unit Test Script section.

    `script.sh`
  {% highlight sh %}
  wait_for_db() {
    nslookup db
    if ! nc -z db 3306; then
      echo "Waiting for db..."
      sleep 5
      wait_for_db
    fi
  }
  
  wait_for_db
  
  export MYSQL_ROOT_PASSWORD=admin
  export MYSQL_USER=my_user
  export MYSQL_HOST=db
  export MYSQL_PASSWORD=admin
  export MYSQL_DATABASE=nodejs
  
  npm test
  {% endhighlight %}

{:start="2"}
2. Go to composition module and create a new composition just press ("+"), the wizard will propose a few options. The most useful is to create a new one or add `docker-compose.yml` from your repository.

  `docker-compose.yml`
{% highlight yaml %}
version: '2'
services:
  db:
    image: mysql:latest
    ports:
      - 3306
    environment:
      - MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
      - MYSQL_USER=$MYSQL_USER
      - MYSQL_PASSWORD=$MYSQL_PASSWORD
      - MYSQL_DATABASE=$MYSQL_DATABASE
  test:
    image: owner/test:tag
    links:
      - db
    command: bash -c '/usr/src/app/test-script.sh'
    environment:
      - MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
      - MYSQL_USER=$MYSQL_USER
      - MYSQL_PASSWORD=$MYSQL_PASSWORD
      - MYSQL_DATABASE=$MYSQL_DATABASE
      - MYSQL_HOST=$MYSQL_HOST
{% endhighlight %}

{:start="3"} 
3. In your composition, put the relevant component. For example, mysql and save with a relevant name.

{:start="4"}
4. Go to back to pipelines of this repository.

{:start="5"}
5. Select the `Run tests with composition` option and choose the created composition you wish to run your image in while running the Unit Tests.

{:start="6"}
6. Choose the option `Replace Service` and select which service in the composition will be replaced by the image built by this pipeline.
{% include image.html lightbox="true" file="/images/2346ab1-codefresh_replace_service.png" url="/images/2346ab1-codefresh_replace_service.png" alt="Codefresh replace service" max-width="40%" %}

{:start="7"}
6. __Save__ and __Build__ this pipeline.

### See examples of unit tests with databases
- [Unit Tests with Redis]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-redis/)
- [Unit Tests with Postgres]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-postgres/)
- [Unit Tests with MySQL]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-mysql/)
- [Unit Tests with Mongo]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-mongo/)
