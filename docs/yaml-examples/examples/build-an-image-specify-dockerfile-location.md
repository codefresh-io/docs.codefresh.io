---
layout: docs
title: "Build an Image - Specify Dockerfile Location"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/build-an-image-specify-dockerfile-location
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: building Docker images.

This project uses `Node JS` to build an application which will eventually become a distributable Docker image.

If your Dockerfile is not maintained in the root directory of your repository, you can specify its location relative to the root directory using the ```dockerfile``` attribute.

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_the_image:
    type: build
    description: Builds my service
    dockerfile: dockerfiles/Dockerfile.prod
    image_name: myuser/myservice
    tag: develop # {% raw %}${{CF_BRANCH}}{% endraw %}
{% endhighlight %}

For more information about the steps for the ```build-the-image``` command, click [HERE]({{ site.baseurl }}/docs/codefresh-yaml/steps/build-1/).

{{site.data.callout.callout_info}}
If you need to specify path to build context, you can do it through `working_directory` like in example below.\nBuild context is where we can find your Dockerfile as well as running commands. Your Dockerfile must be relative to this directory. 
{{site.data.callout.end}}

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_the_image:
    type: build
    description: Builds my service
    dockerfile: Dockerfile
    working_directory: {% raw %}${{main_clone}}{% endraw %}/path_build_context
    image_name: myuser/myservice
    tag: develop # {% raw %}${{CF_BRANCH}}{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example
Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-dockerfile-other-location){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
