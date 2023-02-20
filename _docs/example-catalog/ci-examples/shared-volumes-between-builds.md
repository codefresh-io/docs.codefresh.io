---
title: "Share data between pipeline steps"
description: "How to cache folders between steps and builds"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/yaml-examples/examples/shared-volumes-between-builds/
  - /docs/shared-volumes-between-builds/
toc: true
---

Codefresh creates a [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) in each pipeline that is automatically shared with all freestyle steps.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/codefresh-volume.png" 
url="/images/pipeline/introduction/codefresh-volume.png"
alt="Codefresh volume" 
caption="All steps share the same volume" 
max-width="90%" 
%}

This volume exists at `/codefresh/volume` by default. Simply copy files there to have them available to all Codefresh steps (as well as subsequent builds of the same pipeline).

>The [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) deletes any files **not** specified in `.gitignore`. To cache a folder that exists in your project directory (such as `node_modules`), you must also add it to `.gitignore`

## Using the shared volume

You can see the example project at [https://github.com/codefreshdemo/cf-example-shared-volumes-between-builds](https://github.com/codefreshdemo/cf-example-shared-volumes-between-builds){:target="\_blank"}. The repository contains a simple application, a Dockerfile, and an example pipeline that saves/reads a dummy file to the Codefresh volume.


Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "build"
  - "shared-volume"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefreshdemo/cf-example-shared-volumes-between-builds"
    revision: "master"
    stage: "clone"

  build_image:
    title: "Building image"
    type: "build"
    image_name: "sample-app"
    working_directory: "${{clone}}"
    tag: "demo"
    dockerfile: "Dockerfile"
    stage: "build"
  
  copy_to_shared_volume:
    title: "Copy file to shared volume"
    type: "freestyle" 
    image: alpine:3.9 
    working_directory: "${{clone}}"
    commands:
      - ls -l /codefresh/volume/
      - cp ./artifact/artifact.example /codefresh/volume/artifact.example
    stage: "shared-volume"
    
  list_shared_volume:
    title: "List shared volume files"
    type: "freestyle" 
    image: alpine:3.9 
    working_directory: "${{clone}}"
    commands:
      - pwd
      - ls -l /codefresh/volume
    stage: "shared-volume"
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
1. Builds a docker image through a [build step]({{site.baseurl}}/docs/pipelines/steps/build/).
1. Copies the file `artifact.example` to the volume through a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).
1. Reads the contents of the volume through a different freestyle step.

If you run the pipeline, you will see the file contents in the fourth step:

{% include 
image.html 
lightbox="true" 
file="/images/examples/shared-workspace/volume-list.png" 
url="/images/examples/shared-workspace/volume-list.png"
alt="Listing volume contents" 
caption="Listing volume contents" 
max-width="80%" 
%}


If you run the pipeline a second time, you will see the dummy file in all steps, as the volume is automatically cached for subsequent builds as well.


## Caching build dependencies and Docker layers

Read more about caching build dependencies in [caching in pipelines]({{site.baseurl}}/docs/pipelines/pipeline-caching/), and in this [blog post](https://codefresh.io/blog/caching-build-dependencies-codefresh-volumes/){:target="\_blank"}.



## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
