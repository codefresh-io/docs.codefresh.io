---
layout: docs
title: "Build an Image with the Dockerfile in Root Directory"
description: ""
group: yaml-examples
sub_group: examples
permalink: /:path/build-an-image-dockerfile-in-root-directory/
redirect_from:
  - /docs/build-an-image-dockerfile-in-root-directory
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: building Docker images.

This project uses `Node JS` to build an application which will eventually become a distributable Docker image.

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_image:
    title: Building Image
    type: build
    #Important: rename this image to to a valid repository in your registry. For example: myUserName/vote
    image_name: codefresh/example
    #The directory should be relative to git repository that is used for cloning
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    #Dockerfile location should be relative to the working directory
    dockerfile: Dockerfile
{% endhighlight %}

For more information about the steps and fields in the ```codefresh.yml``` file, [see]({{ site.baseurl }}/docs/codefresh-yaml/steps/build-1/).

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-yml-example-build-dockerfile-inroot){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
