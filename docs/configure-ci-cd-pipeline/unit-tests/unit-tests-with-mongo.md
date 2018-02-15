---
layout: docs
title: "Unit Tests with Mongo"
description: ""
group: configure-ci-cd-pipeline
sub_group: unit-tests
redirect_from:
  - /docs/nodejsmongo
toc: true
---

Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `Node.js, Mongo` to build an application which will eventually become a distributable Docker image.

## Looking around

In the root of this repository, you'll find a file named `codefresh.yml`, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_step:
    type: build
    image_name: codefreshio/example_nodejs_mongo
    dockerfile: Dockerfile
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}

  unit_test:
    type: composition
    working_directory: {% raw %}${{build_step}}{% endraw %}
    composition:
      version: '2'
      services:
        mongo:
          image: mongo
    composition_candidates:
      test:
        image: {% raw %}${{build_step}}{% endraw %}
        links:
          - mongo
        command: bash -c "/src/test-script.sh"
        environment:
          - MONGO_PORT=27017
{% endhighlight %} 

In this test script, we wait for  `mongo` is ready, then we can run the tests

  `script.sh`
{% highlight sh %}
#!/usr/bin/env bash
wait_for_db() {
  nslookup mongo
  if ! nc -z mongo 27017; then
    echo "Waiting for db..."
    sleep 2
    wait_for_db
  fi
}

wait_for_db

export MONGO_PORT=27017

cd /src
npm install
npm install -g mocha
npm test
{% endhighlight %} 

<div class="bd-callout bd-callout-info" markdown="1">
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/example_nodejs_mongo){:target="_blank"} in Github.
</div>

## Expected result

{% include image.html lightbox="true" file="/images/5033cde-codefresh_unit_test_mongo.png" url="/images/5033cde-codefresh_unit_test_mongo.png" alt="Codefresh unit test Mongo" max-width="65%" %}
