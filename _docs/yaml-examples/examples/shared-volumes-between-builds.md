---
title: "Shared volumes between builds"
description: "How to copy data from one pipeline step to the next"
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/shared-volumes-between-builds/
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: building Docker images and use the shared volume feature.

## The shared volume

Codefresh creates a [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) in each pipeline that is automatically shared on all freestyle steps.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/codefresh-volume.png" 
url="/images/pipeline/introduction/codefresh-volume.png"
alt="Codefresh volume" 
caption="All steps share the same volume" 
max-width="90%" 
%}

This volume exists at `/codefresh/volume` by default. You can simply copy files there to have them available in all Codefresh steps (as well as subsequent builds of the same pipeline)

>Notice that the [git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) will delete any files **not** mentioned in `.gitignore`. Therefore if you want to cache a folder that exists in your project directory (such as `node_modules`) you also need to add it to `.gitignore`


## Looking around

This project uses Node Js to build an application which will eventually become a distributable Docker image.
If you want to save something data in shared volume you can do it using [freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step. You will be able to get access to this volume in another build.

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

#### Caching build dependencies

More information about caching build dependencies you can find [in this blog post](https://codefresh.io/blog/caching-build-dependencies-codefresh-volumes/){:target="_blank"}.

#### Example Source code

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-shared-volumes-between-builds){:target="_blank"} in Github and follow the instructions there. 


>The way the volume is shared between builds is that upon build completion we create an image of the volume state to be used in the next builds. If you run 2 builds in parallel from the same pipeline and at the same time, each will use the same last volume image but it’ll run separately on both. The volume image you’ll get upon completion is the state of the build that finished last. 


## What to read next

* [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)


