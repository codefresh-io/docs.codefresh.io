---
layout: docs
title: "Djanga"
description: ""
excerpt: ""
group: learn-by-example
sub_group: python
redirect_from:
  - /docs/djanga
  - /docs/python/djanga
  - /docs/python/djanga/
toc: true
---
Using this repository we’ll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

This project uses `Python` and `Django` to build an application which will eventually become a distributable Docker image.
 
## Looking around
In the root of this repository you’ll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let’s quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'

steps:
   test_the_code:
     image: python:slim
     commands:
       - python -m unittest composeexample.utils
     
   build_the_image:
     type: build
     image_name: codefreshdemo/djanga
   
   launch_the_composition:
     type: launch-composition
     composition: docker-compose.yml
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/cf-example-python-djanga){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
