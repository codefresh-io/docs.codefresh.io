---
title: "React example with Yarn"
description: "Create Docker images for React applications"
group: learn-by-example
sub_group: nodejs
toc: true
---

Codefresh can work with React projects as with any [Node.js project]({{site.baseurl}}/docs/learn-by-example/nodejs/).

## The example React project

You can see the example project at [https://github.com/codefresh-contrib/react-sample-app](https://github.com/codefresh-contrib/react-sample-app). The repository contains a React starter project with the following tasks:

* `yarn test` runs unit tests
* `yarn start` to start the application locally
* `yarn build` to create a production deployment

Once launched the application presents a simple page at localhost:3000. 

## React and Docker (multi-stage builds)

The easiest way to build a React.JS application is with [multi-stage builds](https://blog.docker.com/2017/07/multi-stage-builds/). With multi-stage builds a Docker build can use one base image for packaging/unit tests and a different one that will hold the runtime of the application. This makes the final image more secure and smaller in size (as it does not contain any development/debugging tools).

In the case of React, you can use a base image that has Node and all testing utilities, while the final image has your server (e.g. nginx) with the static content and nothing else.

The example project is actually using multi-stage builds by default.

Here is the multi-stage Dockerfile:

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM node:8.16 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
{% endraw %}
{% endhighlight %}

This docker build does the following:

1. Starts from the Node/Yarn image
1. Copies the dependencies inside the container
1. Copies the source code and creates all static files
1. Discards the Node.js image with all the Javascript libraries.
1. Starts again from the nginx image and copies **static build result** created before

The resulting is very small, as it contains only packaged/minified files.

### Create a CI pipeline for React.js (Docker build)

Creating a CI/CD pipeline for React is very easy, because Codefresh can run any [node image](https://hub.docker.com/_/node/) that you wish. 

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/nodejs/react-pipeline-docker.png" 
url="/images/learn-by-example/nodejs/react-pipeline-docker.png" 
alt="Creating a Docker image for react.js"
caption="Creating a Docker image for react.js"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefresh-contrib/gradle-sample-app/blob/master/codefresh.yml) that creates the Docker image after checking out the code.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - test
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/react-sample-app'
    revision: master
    git: github
  MyUnitTests:
    title: Unit test
    stage: test
    image: node:8.16
    commands:
      - yarn install
      - yarn test
    environment:
      - CI=true
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: build
    image_name: react-sample-app
    working_directory: ./
    tag: 'with-nginx'
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

This pipeline clones the source code, runs unit tests and finally creates a Docker image. Codefresh is automatically caching
Docker layers (it uses the Docker image of a previous build as a cache for the next) and therefore builds will become
much faster after the first one finishes.


## Building a React.Js application without Docker

If your application is not dockerized yet, you can still create a pipeline that runs any command that you would run locally. You can also choose which Node version is used for each step of the pipeline by defining a different docker image for each step.


{% include image.html 
lightbox="true" 
file="/images/learn-by-example/nodejs/react-pipeline-build.png" 
url="/images/learn-by-example/nodejs/react-pipeline-build.png" 
alt="Building a Reach.js application"
caption="Building a Reach.js application"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefresh-contrib/react-sample-app/blob/master/codefresh-only-build.yml) that creates a production deployment of all files.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - test
  - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/react-sample-app'
    revision: master
    git: github
  MyUnitTests:
    title: Unit test
    stage: test
    image: node:11.0
    commands:
      - yarn install
      - yarn test
    environment:
      - CI=true
  MyReactBuild:
    title: Packaging application
    stage: build
    image: node:8.16
    commands:
      - yarn build
{% endraw %}
{% endhighlight %}

Notice that for demonstration purposes we uses node 11 for the tests, and node 8 for the packaging. Normally you should use the same version of node/Yarn for all your steps, but Codefresh pipelines are flexible on version of tools.

Even when you don't create a Docker image, Codefresh still caches your workspace volume. This means that `node_modules` are downloaded only once. All subsequent builds will be much faster.

## What to read next

* [Node examples]({{site.baseurl}}/docs/learn-by-example/nodejs/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [How pipelines work]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)