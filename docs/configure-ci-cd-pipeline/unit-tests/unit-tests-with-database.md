---
layout: docs
title: "Unit Test with Database"
description: ""
group: configure-ci-cd-pipeline
sub_group: unit-tests
redirect_from:
  - /docs/unit-tests-with-database
toc: true
---
Sometimes running unit tests requires some additional services like a Database (Mongo, MySql, Postgres etc), or third-party components like Redis, Memcache, etc.

Codefresh provides you an easy way to do it by using the Codefresh pipeline and docker-compose.

To run Unit Tests with a DB or other services, you can create a composition and run your unit tests as part of it.
 
<div class="bd-callout bd-callout-info" markdown="1">
##### Example repository

Fork this [__repository__](https://github.com/codefreshdemo/cf-example-unit-tests-with-composition){:target="_blank"} in Github to continue
</div>

## How to do it using option \"Attach to Composition\"

{:start="1"}
1. Navigate to added example repository, select relevant pipeline and put in your test script in Unit Tests Section. For this example, your unit test script will be something like this. Just copy and paste this script to section of Unit Test Script

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

  {% include image.html lightbox="true" file="/images/7605c78-codefresh_unit_test_script.png" url="/images/7605c78-codefresh_unit_test_script.png" alt="Codefresh unit test script" max-width="65%" %}

{:start="2"}
2. Go to composition module and create a new composition just press ("+"), the wizard will propose you a few options. The most useful options is to create a new one or add `docker-compose.yml` from your repository. For this example just copy paste the following `docker-compose.yml`

  `docker-compose.yml`
{% highlight yaml %}
version: '2'
services:
  db:
    image: 'mysql:latest'
    ports:
      - 3306
    environment:
      - MYSQL_ROOT_PASSWORD=admin
      - MYSQL_USER=my_user
      - MYSQL_PASSWORD=admin
      - MYSQL_DATABASE=nodejs
{% endhighlight %}

{:start="3"}
3. Put in the relevant composition component, for example, `mysql` and save with relevant name.

{:start="4"}
4. Go to back to pipelines of this repository

{:start="5"}
5. Select the `Run tests with composition` option and choose the created composition you wish to run your image in while running the Unit Tests.
{% include image.html lightbox="true" file="/images/a0dd7e8-codefresh_unit_test_dropdown-1.png" url="/images/a0dd7e8-codefresh_unit_test_dropdown-1.png" alt="Codefresh unit test dropdown" max-width="40%" %}

{:start="6"}
6. __Save__ and __Build__ this pipeline

### See unit test examples with other databases
- [Unit Tests with Redis]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-redis/) 
- [Unit Tests with Postgres]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-postgres/)
- [Unit Tests with MySQL]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-mysql/)
- [Unit Tests with Mongo]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-mongo/)
