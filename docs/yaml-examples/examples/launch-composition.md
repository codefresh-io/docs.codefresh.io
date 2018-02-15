---
layout: docs
title: "Launch Composition"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/launch-composition-1
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: `building Docker images` and `launching composition`.

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
    image_name: codefresh/example-launch-compose
    #Dockerfile location should be relative to the working directory
    dockerfile: Dockerfile

  launch_composition:
    title: Launch Composition
    type: launch-composition
    composition: docker-compose.yml
    environment_name: 'cf-example-launch-composition'
    entry_point: app
    fail_fast: false
    when:
      branch:
        only:
          - master
{% endhighlight %}

{{site.data.callout.callout_info}}
More about launch_composition step you can read [**here**]({{ site.baseurl }}/docs/codefresh-yaml/steps/launch-composition-2/) 
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}
##### Your environments are limited 
Be aware that the number of environment you can run is limited. When using the same environment name the old one would terminate before launching the the new environment. That way you can control the number of environments running in your account. 
{{site.data.callout.end}}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-launch-composition){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}

{% include image.html lightbox="true" file="/images/5172190-codefresh_launch_composition.png" url="/images/5172190-codefresh_launch_composition.png" alt="codefresh_launch_composition.png" max-width="45%" %}
