---
title: "Building Docker images"
description: "Learn how to create Docker images from Dockerfiles"
group: ci-cd-guides
toc: true
---

Codefresh has first-class Docker build support. You can build Docker images in your pipeline in a declarative manner using the [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/).

>If your application is not deployed as a Docker image then see the [basic compilation/packaging guide]({{site.baseurl}}/docs/ci-cd-guides/packaging-compilation/) instead.

Building a Dockerfile in a pipeline, works in the same way as building the Dockerfile locally on your workstation. Your Dockerfile should be valid and follow all the best practices such as:


* Dockerfiles should be self-contained
* You should not have actions with side effects inside Dockerfiles
* You should have a proper `.dockerignore` file to minimize the Docker context size
* Dockerfile directives should be placed according to best caching practices.

For more details see also the [Docker caching guide]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/#distributed-docker-layer-caching).
 At the very least you should understand and use [Docker multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/) (although Codefresh supports all kinds of Dockerfiles natively). Basically, if your Dockerfile is already optimized on your local workstation, it should also be optimized for Codefresh.

Codefresh is using the standard docker daemon (or optionally Buildkit) behind the scenes, so if your Dockerfile has issues when you try to build it locally, it will have the same issues in a pipeline.

## Docker packaging strategies

There are many ways to create a Dockerfile and most organizations typically follow a different path depending on the type of application they package. Brand new applications are very easy to package into multi-stage Dockerfiles, while legacy/existing applications are adapted to dockerfiles that package an existing artifact.

We suggest spending some more time and creating multi-stage builds for all applications (even legacy ones). Explaining all virtues of multi-stage docker builds is outside the scope of this page but in summary, multi-stage builds:

1. Are self-contained and self-describable
1. Result in very small Docker image
1. Can be easily built by all project stakeholder (even non-developers)
1. Are very easy to understand and maintain
1. Do not require a development environment (apart from the source code itself)
1. Can be packaged with very simple pipelines (not only in Codefresh but in other CI systems as well)

Multi-stage builds are also essential in organization that employ multiple programming languages. The ease of building a docker image by anybody without the need for JDK/Node/Python/etc. cannot be overstated.

## Production-ready Docker images with multi-stage builds

If you have a multi-stage Dockerfile, then the respective pipeline in Codefresh is straightforward. You only need two pipeline steps

1. A clone step to checkout the source code
1. A build step to create the docker image.

For example here is a [Java dockerfile]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/#spring-boot-2-and-docker-multi-stage-builds):

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
COPY pom.xml /tmp/
RUN mvn -B dependency:go-offline -f /tmp/pom.xml -s /usr/share/maven/ref/settings-docker.xml
COPY src /tmp/src/
WORKDIR /tmp/
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package

FROM java:8-jre-alpine

EXPOSE 8080

RUN mkdir /app
COPY --from=MAVEN_TOOL_CHAIN /tmp/target/*.jar /app/spring-boot-application.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/spring-boot-application.jar"]

{% endraw %}
{% endhighlight %}

The Codefresh pipeline that builds this Dockerfile is the following:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/spring-boot-2-sample-app'
    revision: master
    git: github     
  build_app_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: spring-boot-2-sample-app
    working_directory: ./
    tag: 'multi-stage'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

The beauty of this pipeline is that it is *exactly the same* for all multistage Dockerfiles regarding of the programming language that you use. So even if the Dockerfile was packaging a Node or Go application, the pipeline is oblivious to it.

{% include image.html 
lightbox="true" 
file="/images/guides/multi-stage-pipeline.png" 
url="/images/guides/multi-stage-pipeline.png" 
alt="Multi-stage Docker builds" 
caption="Multi-stage Docker builds"
max-width="100%" 
%}

You can find multi-stage build examples for other programming languages in the [example section]({{site.baseurl}}/docs/yaml-examples/examples/).


## Creating self-contained Docker images 

Even though multi-stage Dockerfile are the optimal way to build Docker images, Codefresh stil supports "plain" Dockerfiles which do not have multiple stages.

As an example, this Dockerfile for a Python application is created from a single parent image (although we use the slim variant to make the final image size smaller).

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM python:3.6-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN pip install --upgrade pip
COPY requirements.txt /code/

RUN pip install -r requirements.txt
COPY . /code/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
{% endraw %}
{% endhighlight %}


This Dockerfile can be built in the same way as a multi-stage one. We still need two pipeline steps, one to checkout the code and another to build the Docker image.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
 - prepare
 - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefreshdemo/cf-example-python-django'
    revision: master
    git: github  
  build_my_image:
    title: Building Docker Image
    stage: build
    type: build
    image_name: my-django-image
    working_directory: ./
    tag: master
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}    

The pipeline is similar to the previous one, so you can handle multi-stage and non-multistage builds in the same manner in Codefresh pipelines.

{% include image.html 
lightbox="true" 
file="/images/guides/non-multi-stage-pipeline.png" 
url="/images/guides/non-multi-stage-pipeline.png" 
alt="Non Multi-stage Docker builds" 
caption="Non Multi-stage Docker builds"
max-width="100%" 
%}

It is important however to note that the Dockerfile is still self-contained. It depends only on the source code of the application and all instructions needed to package the code are included in the Dockerfile itself.



## Packaging existing artifacts in Docker images



>Notice that even though this is a very popular way to create Dockerfiles, and Codefresh supports it, we do **NOT** recommend to write Dockerfiles like this.

## Avoiding non-standard Dockerfiles

## Pushing Docker images

## Running Docker images




## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





