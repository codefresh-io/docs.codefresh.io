---
layout: docs
title: "Run Unit Tests with composition"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/run-unit-tests-with-composition
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `Node Js` to build an application which will eventually become a distributable Docker image.
You can use the [**composition**]({{ site.baseurl }}/docs/codefresh-yaml/steps/composition-1/) step to run unit tests with a composition. The most common use case is to run unit tests on your code.

## Looking around

In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_step:
    type: build
    image_name: codefreshio/yaml-example-unit-test-compose
    dockerfile: Dockerfile
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}

  unit_test:
    type: composition
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    composition:
        version: '2'
        services:
          db:
            image: mysql:latest
            ports:
              - 3306
            environment:
              MYSQL_ROOT_PASSWORD: admin
              MYSQL_USER: my_user
              MYSQL_PASSWORD: admin
              MYSQL_DATABASE: nodejs
    composition_candidates:
        test:
          image: {% raw %}${{build_step}}{% endraw %}
          links:
            - db
            command: bash -c 'sleep 30 && MYSQL_ROOT_PASSWORD=admin MYSQL_USER=my_user MYSQL_HOST=db MYSQL_PASSWORD=admin MYSQL_DATABASE=nodejs npm test'
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-unit-tests-with-composition){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
