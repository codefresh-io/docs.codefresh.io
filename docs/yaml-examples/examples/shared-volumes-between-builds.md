---
layout: docs
title: "Shared volumes between builds"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/shared-volumes-between-builds
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: building Docker images and use the shared volumes feature.

This project uses Node Js to build an application which will eventually become a distributable Docker image.
If you want to save something data in shared volume you can do it using [```freestyle```]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/) step. You will be able to get access to this volume in another build.

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
freestyle_step:
    image: {% raw %}${{build_prj}}{% endraw %}
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    fail_fast: false
    commands:
      - cp path/to/file /codefresh/volume/filename
{% endhighlight %}

##### Caching build dependencies

More information about caching build dependencies you can find [HERE](https://codefresh.io/blog/caching-build-dependencies-codefresh-volumes/){:target="_blank"} 
{{site.data.callout.end}}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-shared-volumes-between-builds){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}
The way the volume is shared between builds is that upon build completion we create an image of the volume state to be used in the next builds. If you run 2 builds in parallel from the same pipeline and at the same time, each will use the same last volume image but it’ll run separately on both. The volume image you’ll get upon completion is the state of the build that finished last. 
{{site.data.callout.end}}

