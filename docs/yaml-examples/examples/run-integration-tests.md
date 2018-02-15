---
layout: docs
title: "Run Integration Tests"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/run-integration-tests
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `Node Js` to build an application which will eventually become a distributable Docker image.
You can use the [**composition**]({{ site.baseurl }}/docs/codefresh-yaml/steps/composition-1/) step to run a complex interaction of services. For example, run integration tests on an already built image.

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_the_image:
    type: build
    image_name: myuser/myservice
    tag: develop
  
  integration_test:
    type: composition
    composition:
      version: '2'
      services:
        db:
          image: postgres
    composition_candidates:
      test:
        image: {% raw %}${{build_the_image}}{% endraw %} # image that will be tested
        command: gulp integration_test # your test command
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-integration-tests){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
