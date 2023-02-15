---
title: "Building your app"
description: "Compile and package traditional (non-Docker) artifacts"
group: ci-cd-guides
redirect_from:
  - /docs/ci-cd-guides/packaging-compilation/
toc: true
---

When you use Codefresh for continuous integration (CI), one of the most basic tasks is compiling and packaging applications. Though Codefresh has native support for Docker artifacts, it still works great with traditional (non-Dockerized) applications that don't use a Dockerfile for the actual build.

>If your application is deployed as a Docker image, see [building Docker images]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/) instead.

## Using supporting Docker images in CI/CD environment

Unlike other CI solutions that you might be familiar with, Codefresh build nodes are very simple. They have only Docker installed and nothing else. 

When you run a Codefresh pipeline, you choose the Docker images to be used in the CI/CD environment. Once the pipeline runs, the Docker images are automatically launched by Codefresh, and you have access to all the tools the images contain. When the pipeline completes its run, all Docker images used for the pipeline are discarded, and the build machine reverts to its original state.

Even if your application is not itself packaged as a Docker image, Codefresh pipelines are always "Docker-based" in the sense that Docker is used for the tools that take part in the pipeline.

This approach has a lot of advantages:

 * No maintenance effort for build nodes, as they only have Docker and nothing else.
 * You can use any tool in your pipeline that you want without actually installing it first.
 * All public Docker images in Docker Hub are potential pipeline steps.
 * You can use different versions of the same tool in the same pipeline.
 * It is very easy to upgrade a tool to a new version (just change the tag of the Docker container used)

Notice also that unlike some other CI solutions:

1. You can use multiple Docker images in the same pipeline, even if they contain the same tool, with no version conflicts
1. As Docker images in Codefresh pipelines have no special requirements, you can use *any* private or public Docker image.

All [pipeline steps]({{site.baseurl}}/docs/pipelines/steps/) in Codefresh are in fact Docker images.


## Choosing programming tools as Docker images

In practice, this means that if you have a Node application, you need to use a [Node image]({{site.baseurl}}/docs/example-catalog/#ci-examples) to package your application, a [Maven image]({{site.baseurl}}/docs/example-catalog/ci-examples/spring-boot-2/) if you are working with Java, a [Python]({{site.baseurl}}/docs/example-catalog/ci-examples/python/) image for Python applications, and so on.  

You launch the image using the Codefresh freestyle step. Here is an example for Node:

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

This pipeline downloads the `node:11` image to the Codefresh build machine, launches it, and passes it to your source code. It then runs the commands `npm install` and `npm run test`. The result is that your source code can be packaged without actually installing Node.js on the build machine beforehand.

You can mix and match different images in the same pipeline. Let's say for example that you have a single repository that contains a front-end in Node.js and a back-end in Java. You can easily create a pipeline that deals with both:

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

This pipeline compiles the Java code under the `back-end` folder, and the Javascript Web application found in the `front-end` folder. Both Docker images have access to the same workspace via [the shared Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps).

To get up and running with Codefresh as quickly as possible, you can simply search DockerHub for an existing image that uses the tool you need. Top-level DockerHub images are curated by the Docker team and are considered safe. So most popular programming languages already have a Docker image that you can use in your pipeline.

Of course, you can also [create your private Docker image or use any existing image]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/) from a private or public registry. In that case, you need to write the full name of the image used.  
If you use an image from GCR (Google Container Registry), or another private registry, you would specify it as in the example below. 

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_bazel_app:
    title: Running a Bazel build
    image: gcr.io/my-registry/bazel
    commands:
     - bazel build //:MyProject
  my_e2e_tests:
    title: Running Mocha Test
    image: my-azure-registry.azurecr.io/kostis-codefresh/my-jasmine-runner:1.0.1 
    commands:
     - jasmine init
{% endhighlight %}

In this pipeline, Docker images have a full prefix, so they are pulled by the respective registry instead of DockerHub.

In this manner, you can run any tool in any Codefresh pipeline as long as it is offered in a Docker image. This means that Codefresh pipelines can work with any programming language and any tool that you can use on your workstation.

Unlike other CI solutions, you don't need to wait for the Codefresh team to add "native support" for your favorite tool in a Codefresh pipeline. You can simply package it in a Docker image yourself and use it straight away.


## Using multiple Docker images in a single pipeline

Unlike other CI solutions, there is no limit on the number of Docker images that you can use in a single pipeline. Also, all Docker images included in the same pipeline have access to the same project workspace via the [shared Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps).  
This means that you have maximum flexibility on what tools you use in a single project.  

As an example, let's see a pipeline that uses four different images for a single project.


`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    arguments:
      repo: my-user/my-app
      revision: master
      git: github
  package_my_code:
    title: Compile application
    image: 'maven:3.5.2-jdk-8-alpine'
    commands:
     - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository package   
  run_sonar:
    title: Quality Analysis
    image: sonarsource/sonar-scanner-cli
    commands:
     - sonar-scanner
    environment:
     - SONAR_HOST_URL=http://foo.acme:9000     
  create_bucket:
    title: Creating bucket in AWS
    image: hashicorp/terraform:0.12.0
    commands:
      - terraform init
      - terraform apply -auto-approve   
  upload_file:
    title: Uploading Jar file
    image: mesosphere/aws-cli
    commands:
     - aws s3 sync ./target/app.jar s3://my-bucket/my-jar --delete        
{% endhighlight %}

This pipeline does the following:

1. Checks out source code
1. Packages a Jar file (from the source code)
1. Runs Sonar analysis (taking into account both source code and compiled classes)
1. Creates a storage bucket in AWS (Amazon Web Services)
1. Uploads the JAR that was packaged in the bucket

Notice how all Docker images use the same workspace without any extra configuration on your part.

## Using different tool versions in the same pipeline 

The corollary to Docker-based pipelines is that you can use the same tool but with a different version in the **same** pipeline.
As an example, here is a pipeline that runs both Python 2.x and Python 3.x, and it just works.

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  get_deps:
    title: Getting dependencies
    image: python:3.6-slim
    commands:
     - pip install -r requirements.txt
  run_my_tests:
    title: Running Unit Test
    image: python:2 
    commands:
     - pip install pytest
     - pytest
{% endhighlight %}

You can easily choose the specific version that matches each of your projects.   

<br />

Here is another example where two different applications use Node.js 11 and Node.js 9 in the same pipeline.

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
      - npm install
  PackageMyNode2App:
    title: Packaging Node application 2
    stage: packaging
    image: node:9.3.0-slim
    working_directory: ./legacy-project
    commands:
      - echo "My Node version is"
      - node --version
      - npm install  
{% endhighlight %}

> These versions are per pipeline. So each team can use the versions they need for their projects without affecting the other teams.

So one team in your company might use Terraform 0.10 in their pipelines:


{% highlight yaml %}
  PlanWithTerraform:
    image: hashicorp/terraform:0.10.0
    title: Deploying Terraform plan
    stage: deploy
    commands:
      - terraform plan
{% endhighlight %}

Another team can use Terraform 0.12 just by changing the YAML of their `codefresh.yml`:

{% highlight yaml %}
  DeployWithTerraform:
    image: hashicorp/terraform:0.12.0
    title: Deploying Terraform plan
    stage: deploy
    commands:
      - terraform apply -auto-approve 
{% endhighlight %}


To summarize, you can easily use any version of any programming tool in a Codefresh pipeline without the fear of breaking 
another unrelated pipeline.


## Related articles
[Introduction to Codefresh pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
[Creating Codefresh pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  






