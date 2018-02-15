---
layout: docs
title: "Unit Tests with Redis"
description: ""
group: configure-ci-cd-pipeline
sub_group: unit-tests
redirect_from:
  - /docs/python-redis
toc: true
---

Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `Python, Redis` to build an application which will eventually become a distributable Docker image. 

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_prj:
    type: build
    dockerfile: Dockerfile
    image_name: web
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}

  build_test:
    type: build
    dockerfile: Dockerfile.test
    image_name: test
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}

  unit_test:
    type: composition
    composition:
      version: '2'
      services:
        web:
          image: {% raw %}${{build_prj}}{% endraw %}
          links:
            - redis
          ports:
            - 80
        redis:
          image: redis
    composition_candidates:
      test:
        image: {% raw %}${{build_test}}{% endraw %}
{% endhighlight %} 
  
<div class="bd-callout bd-callout-info" markdown="1">
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/example_python_redis){:target="_blank"} in Github.
</div>

In this test script, we wait for `web` service and `database` is ready for testing

  `script.sh`
{% highlight sh %}
#!bin/bash

wait_for_db() {
  nslookup redis
  if ! nc -z redis 6379; then
    echo "Waiting for db..."
    sleep 2
    wait_for_db
  fi
}

wait_for_web() {
  nslookup web
  if ! nc -z web 80; then
    echo "Waiting for web..."
    sleep 2
    wait_for_web
  fi
}

wait_for_db
wait_for_web

if curl web | grep -q '<b>Visits:</b> '; then
  echo "Tests passed!"
  exit 0
else
  echo "Tests failed!"
  exit 1
fi
{% endhighlight %} 
  
## Expected result

{% include image.html lightbox="true" file="/images/6a3d9d1-codefresh_unit_test_redis.png" url="/images/6a3d9d1-codefresh_unit_test_redis.png" alt="Codefresh unit test Redis" max-width="65%" %}
