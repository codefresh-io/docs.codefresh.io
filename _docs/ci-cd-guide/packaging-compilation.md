---
title: "Basic Packaging/Compilation"
description: "Learn how to compile and package traditional (non-Docker) artifacts"
group: ci-cd-guide


toc: true
---

When you use Codefresh for Continuous Integration, one of the most basic tasks is compiling and packaging applications. Even though Codefresh has native support for Docker artifacts, it still works great with traditional (non-dockerized) applications that don't use a Dockerfile for the actual build.

## Using Docker as a CI/CD environment

Unlike other CI solutions that you might be familiar with, Codefresh builders are very simple. They have only Docker installed and nothing else. When you run a Codefresh pipeline you choose a Docker image that will be used as a CI/CD environment. Once the pipeline runs, the Docker image is automatically launched by Codefresh and thus you have access to all the tools that it contains. Once the pipeline finishes, all Docker images that were used for the pipeline are discarded and the build machine reverts back to the original state.

This approach has a lot of advantages:

 * There is no maintenance effort for build nodes. They only have Docker and nothing else.
 * You can use any tool in your pipeline that you want without actually installing it first
 * All public Docker images in Dockerhub are potential pipeline steps
 * You can use different versions of the same tool in the same pipeline
 * It is very easy to upgrade a tool to a new version (just change the tag of the Docker container used)

### Choosing programming tools as Docker images

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

This pipeline will download the `node:11` image on the Codefresh build machine, launch it and pass it your source code. Then it will run the commands `npm install` and `npm run test`. The result is that your source code can be packaged without actually installing Node.js on the build machine beforehand.

You can mix and max different images on the same pipeline. Let's say for example that you have a single repository that contains a front-end in Node.js and a back-end in Java. You can easily create a pipeline that deals with both:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_node_app:
    title: Packaging front end
    image: node:11
    working_directory: ./front-end
    commands:
     - npm install
     - npm run test
  my_jar_compilation:
    title: Packaging back end
    image: maven:3.5.2-jdk-8-alpine
    working_directory: ./back-end
    commands:
     - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository package   
{% endhighlight %}

This pipeline will compile the Java code under the `back-end` folder and the Javascript Web application found in the `front-end` folder.

Therefore if you want to use Codefresh as fast as possible you can simply search Dockerhub for an existing image that uses the tool that you need. Top level Dockerhub images are curated by the Docker team and are considered safe. So for most popular programming languages there is already a Docker image that you can use in your pipeline.

Of course you can also create your private docker image or use any existing image from a private or public Registry. In that case you need to write the full name to the image used. For example if you use an image from GCR or the Codefresh private registry you mention it like this:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_bazel_app:
    title: Running a Bazel build
    image: gcr.io/my-registry/bazel
    commands:
     - bazel build //:MyProject
  my_jar_compilation:
    title: Running Mocha Test
    image: r.cfcr.io/kostis-codefresh/my-jasmine-runner:1.0.1 
    commands:
     - jasmine init
{% endhighlight %}

In this pipeline Docker images have a full prefix, so they are pulled by the respective registry instead of Dockerhub.
In this manner you can run any tool in any Codefresh pipeline as long as it is offered in a Docker images. This means that Codefresh pipelines can work with any programming language and any tool that you can use on your workstation.

Unlike other CI solutions, you don't need to wait for the Codefresh team to add "native support" for your favorite tool in a Codefresh pipeline. You can simply package it in a Docker image yourself and use it straight away.

### Multiple tool versions

The corollary to docker based pipelines is that you can use the same tool but with a different version in the **same** pipeline.
As an example here is a pipeline that runs both Python 2.x and Python 3.x in the same pipeline and it just works.

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_bazel_app:
    title: Running a Bazel build
    image: gcr.io/my-registry/bazel
    commands:
     - bazel build //:MyProject
  my_jar_compilation:
    title: Running Mocha Test
    image: r.cfcr.io/kostis-codefresh/my-jasmine-runner:1.0.1 
    commands:
     - jasmine init
{% endhighlight %}

This means that you can easily choose the specific version that matches each of your projects. Here is another example
where two different applications use Node.js 11 and Node.js 9 in the same pipeline.

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
stages:
 - packaging
 - deploying
steps:
  PackageMyNode1App:
    title: Packaging Node application 1
    stage: packaging
    image: node:11.1
    working_directory: ./brand-new-project
    commands:
      - echo "My Node version is"
      - node --version
      #- npm install
  PackageMyNode2App:
    title: Packaging Node application 2
    stage: packaging
    image: node:9.3.0-slim
    working_directory: ./legacy-project
    commands:
      - echo "My Node version is"
      - node --version
      #- npm install  
{% endhighlight %}

Notice that these versions are per pipeline. So you can have each team using the versions they like for their projects
without affecting each other.

So one team in your company might use terraform 0.10 in their pipelines


{% highlight yaml %}
  PlanWithTerraform:
    image: hashicorp/terraform:0.10.0
    title: Deploying Terraform plan
    stage: deploy
    commands:
      - terraform plan
{% endhighlight %}

...while another team is using terraform 0.12 just by changing the YAML of their codefresh.yml

{% highlight yaml %}
  DeployWithTerraform:
    image: hashicorp/terraform:0.12.0
    title: Deploying Terraform plan
    stage: deploy
    commands:
      - terraform apply -auto-approve 
{% endhighlight %}


In summary, it is very easy to use any version of any programming tool in a Codefresh pipeline without the fear of breaking 
another unrelated pipeline.

{% comment %} 

## Sharing data in pipelines

### Using the shared volume

### Build caching

### Uploading and Downloading artifacts

## Creating reusable steps

### Reusing steps in a pipeline

### Reusing steps in a team

### Reusing open-source steps

{% endcomment %}




## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





