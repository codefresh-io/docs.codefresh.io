---
layout: docs
title: "Run Unit Tests"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/run-unit-tests
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses Node Js to build an application which will eventually become a distributable Docker image.
You can use the [**freestyle**]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/) step to execute a series of shell commands. The most common use case is to run unit tests on your code.

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file.

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  test_all_the_code:
    image: node:5
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    commands:
      - npm install gulp -g 
      - npm install
      - gulp unit_test
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-unit-test){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
