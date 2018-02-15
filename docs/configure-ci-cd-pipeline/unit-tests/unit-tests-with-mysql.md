---
layout: docs
title: "Unit Tests with MySQL"
description: ""
group: configure-ci-cd-pipeline
sub_group: unit-tests
redirect_from:
  - /docs/nodejsmysql
toc: true
---

Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `Node.js, MySQL` to build an application which will eventually become a distributable Docker image.

## Looking around
In the root of this repository, you'll find a file named `codefresh.yml`, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_step:
    type: build
    image_name: codefreshio/example-nodejs-mysql
    dockerfile: Dockerfile
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}

  unit_test:
    type: composition
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    composition: ./docker-compose.yml
    composition_candidates:
      test:
        image: {% raw %}${{build_step}}{% endraw %}
        links:
          - db
        command: bash -c '/usr/src/app/test-script.sh'
        environment:
          - MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
          - MYSQL_USER=$MYSQL_USER
          - MYSQL_PASSWORD=$MYSQL_PASSWORD
          - MYSQL_DATABASE=$MYSQL_DATABASE
          - MYSQL_HOST=$MYSQL_HOST
    composition_variables:
      - MYSQL_ROOT_PASSWORD=admin
      - MYSQL_USER=my_user
      - MYSQL_PASSWORD=admin
      - MYSQL_DATABASE=nodejs
      - MYSQL_HOST=db
{% endhighlight %} 

In this test script, we wait for `mysql` is ready, then we can run the tests

  `script.sh`
{% highlight sh %}
#!/usr/bin/env bash
wait_for_db() {
  nslookup db
  if ! nc -z db 3306; then
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

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-unit-tests-with-composition){:target="_blank"} in Github.
</div>

## Expected result

{% include image.html lightbox="true" file="/images/7afb3f6-codefresh_example_mysql.png" url="/images/7afb3f6-codefresh_example_mysql.png" alt="Codefresh unit test MySQL" max-width="65%" %}
