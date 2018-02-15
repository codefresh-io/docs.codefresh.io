---
layout: docs
title: "Build an Image with Build Arguments"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/build-an-image-with-build-arguments
toc: true
---

Using this repository we'll help you get up to speed with basic functionality such as: building Docker images with build arguments.
The ```build-arguments``` field uses the same logic as ARG in Dockerfile. For more information, see [description of ARG](https://docs.docker.com/engine/reference/builder/#/arg){:target="_blank"} 

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file.

  `codefresh.yml`
{% highlight yaml %}
stepname:
  type: build
  description: Free text description
  dockerfile: path/to/Dockerfile
  image_name: owner/new-image-name
  tag: develop
  build_arguments:
    - key=value
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-build-arguments){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
