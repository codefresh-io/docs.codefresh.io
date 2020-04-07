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

You can find the example application on [Github](https://github.com/codefresh-contrib/scala-hello-world-app). 

There are two pipeline examples provided in this tutorial:

- Multi-stage Docker build
- Single stage Docker Build 
 
## Example Pipeline #1: Single stage Docker Build

This example uses a single stage Docker build. The pipeline will have three stages:

- A stage for cloning 
- A stage for packaging
- A stage for building

{% include image.html 
lightbox="true" 
file="/images/examples/scala/single-stage-pipeline.png" 
url="/images/examples/scala/single-stage-pipeline.png" 
alt="Codefresh UI pipeline view"
caption="Codefresh UI pipeline view"
max-width="100%" 
%}

Here is the Dockerfile used for this example:

`Dockerfile-single-stage`
```shell 
FROM openjdk:8-jre-alpine3.9 

COPY . . 

CMD ["java", "-cp", "target/scala-2.12/*.jar:scala-library-2.12.2.jar", "HelloWorld"]
```

And here is the pipeline.  You can copy and paste it in the inline YAML editor in the UI:

  `codefresh-single-stage.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"

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
      repo:   codefresh-contrib/scala-hello-world-app  
      revision: master
  package:
    title: Packaging application...
    type: freestyle
    stage: package
    working_directory: ./scala-hello-world-app
    arguments:
      image: hseeberger/scala-sbt:11.0.6_1.3.9_2.13.1
      commands:
        - sbt -Dsbt.ivy.home=/codefresh/volume/ivy_cache clean compile package 
        - cp /codefresh/volume/ivy_cache/cache/org.scala-lang/scala-library/jars/scala-library-2.12.2.jar . 
  build_image:
    title: Building Docker image...
    type: build
    working_directory: ${{clone}}
    stage: build
    arguments:
      image_name: codefresh/scala-sample-app
      tag: 1.0.0
      dockerfile: Dockerfile-single-stage
{% endraw %}
{% endhighlight %}

The above pipeline does the following:

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that uses an SBT image that packages the application (note how `sbt.ivy.home` is set to an arbitrarily named directory that is part of the codefresh volume).  This ensures we cache dependencies to [speed up builds]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/#caching-the-maven-dependencies), similar to Maven.
3. The last step, `build_image`, is a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) that builds a Docker image using the Dockerfile provided in the repository.

## Example Pipeline #2: Multi-stage Docker Build

This example uses a multi stage Docker build. The pipeline will have only two stages this time, as packaging of the app is handled in the Dockerfile itself:

- A stage for cloning 
- A stage for building

{% include image.html 
lightbox="true" 
file="/images/examples/scala/multi-stage-pipeline.png" 
url="/images/examples/scala/multi-stage-pipeline.png" 
alt="Codefresh UI pipeline view"
caption="Codefresh UI pipeline view"
max-width="100%" 
%}

Here, you will find the multi-stage Dockerfile, copying over only the jars we need:

`Dockerfile-multi-stage`

```shell
# first stage

FROM hseeberger/scala-sbt:11.0.6_1.3.9_2.13.1 AS build

COPY ./ ./

RUN sbt compile clean package

# second stage

FROM openjdk:8-jre-alpine3.9 

COPY --from=build /root/target/scala-2.12/*.jar /scala-hello-world-sample-app.jar
COPY --from=build /root/.ivy2/cache/org.scala-lang/scala-library/jars/scala-library-2.12.2.jar /scala-library-2.12.2.jar

CMD ["java", "-cp", "scala-hello-world-sample-app.jar:scala-library-2.12.2.jar", "HelloWorld"]
```
Here is the pipeline, you can copy and paste it into the inline YAML editor:

`codefresh-multi-stage.yml`

{% highlight yaml %}
{% raw %}
version: "1.0"

stages:
  - clone
  - build

steps:
  clone:
    title: Cloning repository...
    type: git-clone
    stage: clone
    arguments:
      repo:   codefresh-contrib/scala-hello-world-app  
      revision: master
  build_image:
    title: Building Docker image...
    type: build
    working_directory: ${{clone}}
    stage: build
    arguments:
      image_name: codefresh/scala-hello-world-app
      tag: 1.0.0
      dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that builds our code into a Docker image using the Dockerfile present in the repository


## What to Read Next

- [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
- [Git-clone Step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
