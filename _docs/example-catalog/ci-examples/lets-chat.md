---
title: "Let's Chat example"
description: "Create Docker images for Node/Express.js applications"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/lets-chat/
toc: true
---

Let’s Chat is self-hosted chat app for small to big teams.

## The example Node.JS project

You can see the example project at [https://github.com/codefreshdemo/demochat](https://github.com/codefreshdemo/demochat){:target="\_blank"}. The repository contains the source code of the project along with two Dockerfiles (one for unit tests) and various docker-compose configurations

The project requires a Mongo Database to work and by default it uses port 5000 for its web interface.

## Create a CI pipeline for Node.js 

Creating a CI/CD pipeline for NodeJS is very easy, because Codefresh has built-in steps for creating Docker images and running commands with containers.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/nodejs/nodejs-pipeline.png" 
url="/images/learn-by-example/nodejs/nodejs-pipeline.png" 
alt="Building and testing a Node.js application"
caption="Building and testing a Node.js application"
max-width="100%" 
%}

Here is the [full pipeline](https://github.com/codefreshdemo/demochat/blob/master/codefresh.yml){:target="\_blank"} that creates the Docker image after checking out the code.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
  - "clone"
  - "unit"
  - "build"
  - "integration"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "codefreshdemo/demochat"
    revision: "master"
    stage: "clone"

  build_dev_image:
    title: "Building Dev image"
    type: "build"
    image_name: "codefreshdemo/demochat"
    working_directory: "${{clone}}"
    tag: "dev"
    dockerfile: "Dockerfile.dev"
    stage: "unit"

  test:
    title: "Running test"
    type: "freestyle" 
    image: ${{build_dev_image}} 
    working_directory: /root/demochat
    commands:
      - 'npm run test'
    stage: "unit"
  
  build_image:
    title: "Building App image"
    type: "build"
    image_name: "codefreshdemo/demochat"
    working_directory: "${{clone}}"
    tag: "dev"
    dockerfile: "Dockerfile"
    stage: "build"
    
  integration_step:
    type: composition
    stage: 'integration'
    composition:
      version: '2'
      services:
        app:
          image: ${{build_image}}
          links:
            - mongo
          ports:
            - 5000
        mongo:
          image: mongo
    composition-candidates:
      main:
        image: nhoag/curl
        command: bash -c "sleep 30 && curl http://app:5000/" | echo 'works'    

{% endraw %}
{% endhighlight %}

> Note that you should change `codefreshdemo` in the clone step with your own Github account if you fork the repository. Also in both build steps you should change `codefreshdemo/demochat` with your own image name that is compliant to your Dockerhub account or other connected registry.

This pipeline has 4 [stages]({{site.baseurl}}/docs/pipelines/stages/) and performs the following:

 1. Clones the source code using the [git-clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/) step
 1. Builds a Docker image for unit tests with the [build step]({{site.baseurl}}/docs/pipelines/steps/build/)
 1. Runs [unit tests]({{site.baseurl}}/docs/testing/unit-tests/) in the Docker image that was just created with a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/)
 1. Building a Docker image for the final application
 1. Runs [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) using a [composition step]({{site.baseurl}}/docs/pipelines/steps/composition/)

If you run the pipeline multiple times, you will also see the [Codefresh caching mechanisms]({{site.baseurl}}/docs/pipelines/pipeline-caching/) in action for faster build times.

## Related articles
[Voting app example]({{site.baseurl}}/docs/example-catalog/ci-examples/voting-app/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  



