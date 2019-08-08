---
title: "Basic Packaging/Compilation"
description: "Learn how to compile and package traditional (non-Docker) artifacts"
group: ci-cd-guide


toc: true
---

When you use Codefresh for Continuous Integration, one of the most basic tasks is compiling and packaging applications. Even though Codefresh has native support for Docker artifacts it still works great with traditional (non-dockerized) applications that don't use a Dockerfile for the actual build.

## How Codefresh builders work

Unlike other CI solutions that might be familiar with Codefresh builders are very simple. They have only Docker installed and nothing else. When you run a Codefresh pipeline you choose a Docker image that will be used as an environment. Once the pipelne runs, the docker images is automatically launched by Codefresh and thus you have access to all the tools that it contains. Once the pipeline finishes all Docker images that were used for the pipeline are discarded and the build node reverts back to the original state. 

This approach has a lot of advantages:

 * There is no maintenance effort for build nodes. They only have docker and nothing else.
 * You can use any tools in your pipeline that without installing it first
 * All public Docker images in Dockerhub are potential build steps
 * You can use different versions of the same tool in the same pipeline
 * It is very easy to upgrade a tool to a new version (just change the docker container used)

### Choosing tools as Docker images

In practice this means that if you have a Node application, you need to use a Node image to package your application, a Maven image if you are working with a Java, a Python image for python applications and so on. You launch the image using the Codefresh freestyle step. Here is an example for Node:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_node_app:
    title: Running unit tests
    image: node:11
    commands:
     - npm install
     - npm run test
{% endhighlight %}

This pipeline will download the node:11 images on the Codefresh builder, launch it and pass it your source code. Then 



### Multiple tool versions

## Sharing data in pipelines

### Using the shared volume

### Build caching

### Uploading and Downloading artifacts

## Creating reusable steps

### Reusing steps in a pipeline

### Reusing steps in a team

### Reusing open-source steps




## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





