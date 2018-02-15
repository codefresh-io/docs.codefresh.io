---
layout: docs
title: "Shared volumes of service from composition step for other yml steps"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/shared-volumes-of-service-from-composition-step-for-other-yml-steps
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: building Docker images and use the shared volumes feature.

This project uses Node Js to build an application which will eventually become a distributable Docker image.
If you want to share volumes of service in composition step for other yml steps you can use the variable {% raw %}```${{CF_VOLUME}}```{% endraw %}. It will refer to the volume that was generated for the specific flow. Can be used in conjunction with a composition to provide access to your cloned repository.

{{site.data.callout.callout_info}}
##### Caching build dependencies

More information about caching build dependencies you can find
[**HERE**](https://codefresh.io/blog/caching-build-dependencies-codefresh-volumes/){:target="_blank"} 
{{site.data.callout.end}}

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
step_file_generation:
  type: composition
  composition:
    version: '2'
    services:
      service1:
        volumes:
          - {% raw %}${{CF_VOLUME}}{% endraw %}:/codefresh/volume
        image: {% raw %}${{build_step}}{% endraw %}
        command: bash -c "echo hello > /codefresh/volume/myfile.txt"
    volumes:
      {% raw %}${{CF_VOLUME}}{% endraw %}:
        external: true
  composition_candidates:
    test:
      image: {% raw %}${{build_step}}{% endraw %}
      command: echo hello
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-shared-volumes-composition-step){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}
The way the volume is shared between builds is that upon build completion we create an image of the volume state to be used in the next builds. If you run 2 builds in parallel from the same pipeline and at the same time, each will use the same last volume image but it’ll run separately on both. The volume image you’ll get upon completion is the state of the build that finished last.
{{site.data.callout.end}}

