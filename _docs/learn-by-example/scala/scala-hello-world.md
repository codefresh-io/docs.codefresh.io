---
title: "Scala: Hello World"
description: "Use Scala and Codefresh to clone, package, and build a Docker image"
excerpt: ""
group: learn-by-example
sub_group: scala
redirect_from:
  - /docs/scala-hello-world/
toc: true
---

So, you’ve decided to try Codefresh? Welcome on board!

We’ll help you get up to speed with basic functionality such as: compiling, building Docker images and launching.

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)

## The Example Scala Application

This project uses `Scala` to build an application which will eventually become a distributable Docker image.

You can find the example application on [Github](https://github.com/codefresh-contrib/scala-sample-app).  
 
## Create the Pipeline

In the root of this repository, you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

This pipeline will have three stages:

- A stage for cloning 
- A stage for packaging
- A stage for building

{% include image.html 
lightbox="true" 
file="/images/examples/scala/pipeline.png" 
url="/images/examples/scala/pipeline.png" 
alt="Codefresh UI pipeline view"
caption="Codefresh UI pipeline view"
max-width="100%" 
%}



  `codefresh.yml`
{% highlight yaml %}
{% raw %}
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/yaml-examples/examples/

version: "1.0"
# Stages can help you organize your steps in stages
stages:
  - clone
  - package
  - build

steps:
  clone:
    title: Cloning repository...
    type: git-clone
    stage: clone
    arguments:
      repo:  codefresh-contrib/scala-sample-app 
      revision: master
      
  generate_dockerfile:
      title: Compiling source and generating Dockerfile...
      image: noamt/pre-cached-sbt
      working_directory: ${{clone}}
      stage: package
      arguments:
        commands:
          - sbt -Dsbt.ivy.home=/codefresh/volume/ivy_cache -mem 4096 clean compile package
          - sbt docker:stage

  build_image:
    title: Building Docker image...
    type: build
    working_directory: ${{clone}}/service/target/docker/stage
    stage: build
    arguments:
      image_name: codefresh/scala-sample-app
      tag: 1.0.0
      dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

The above pipeline does the following:

1. A [git-clone]({{$site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]($$site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that uses an SBT image that:
   - Packages the application (note how `sbt.ivy.home` is set to an arbitrarily named directory that is part of the codefresh volume).  This ensures we cache dependencies to [speed up builds]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/#caching-the-maven-dependencies), similar to Maven.
   - Generates a Dockerfile
3. The last step, `build_image`, is a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) that builds a Docker image using the Dockerfile we generated in the previous step.

## What to Read Next

- [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
- [Git-clone Step]({{$site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]($$site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
