---
title: "Share service volumes in composition steps"
description: "How to share data in compositions"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/shared-volumes-of-service-from-composition-step-for-other-yml-steps/
toc: true
---
Using this repository, we'll help you get up to speed with basic functionality such as building Docker images and using the shared volumes.

This project uses Node Js to build an application which will eventually become a distributable Docker image.
To share volumes of service in composition step for other yml steps you can use the variable {% raw %}```${{CF_VOLUME_NAME}}```{% endraw %}. It will refer to the volume that was generated for the specific flow. Can be used in conjunction with a composition to provide access to your cloned repository.

>Read more about caching build dependencies our [blog](https://codefresh.io/blog/caching-build-dependencies-codefresh-volumes/){:target="_blank"}.

## Looking around
In the root of this repository you'll find a file named `codefresh.yml`, this is our build descriptor that describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
step_file_generation:
  type: composition
  composition:
    version: '2'
    services:
      service1:
        volumes:
          - {% raw %}${{CF_VOLUME_NAME}}{% endraw %}:/codefresh/volume
        image: {% raw %}${{build_step}}{% endraw %}
        command: bash -c "echo hello > /codefresh/volume/myfile.txt"
  composition_candidates:
    test:
      image: {% raw %}${{build_step}}{% endraw %}
      command: echo hello
{% endhighlight %}

>Example  
 Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-shared-volumes-composition-step){:target="_blank"} in GitHub, and follow the instructions there. 

The way the volume is shared between builds is that upon build completion we create an image of the volume state to be used in the next builds. If you run 2 builds in parallel from the same pipeline and at the same time, each will use the same last volume image, but it’ll run separately on both. The volume image you’ll get upon completion is the state of the build that finished last.


## Related articles
[CI pipeline examples]({{site.baseurl}}/docs/example-catalog/#ci-examples)  
