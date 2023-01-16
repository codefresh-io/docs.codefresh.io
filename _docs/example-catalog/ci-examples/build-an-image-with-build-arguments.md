---
title: "Build an Image with build arguments"
description: "Use Docker arguments in Codefresh pipelines"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/build-an-image-with-build-arguments/
toc: true
---

Building a Docker image that requires build arguments is very easy with Codefresh pipelines.

The source code of the repository is at [https://github.com/codefreshdemo/cf-example-build-arguments](https://github.com/codefreshdemo/cf-example-build-arguments){:target="\_blank"}. Feel free to fork it if you want to follow along.

If you don't have a Codefresh account already, you can easily create a free one from the [sign-up page]({{site.baseurl}}/docs/administration/account-user-management/create-a-codefresh-account/).

## Using Docker build arguments

The example application is a very simple NodeJS application with the following DYouockerfile:

`Dockerfile`
{% highlight docker %}
{% raw %}
ARG NODE_VERSION
FROM node:$NODE_VERSION

ARG APP_DIR

RUN mkdir -p $APP_DIR

WORKDIR $APP_DIR

COPY package.json .
RUN npm install --silent
COPY . .
EXPOSE 3000

ENV PORT 3000

CMD [ "npm", "start" ]
{% endraw %}
{% endhighlight %}

This Dockerfile expects two [build arguments](https://docs.docker.com/engine/reference/builder/#/arg){:target="\_blank"}:

* `NODE_VERSION` is the version of Node image to use as base 
* `APP_DIR` is the source directory to be used inside the container

## Building a Dockerfile passing values for build arguments

When you build an image locally on your workstation, you can define build arguments with the `--build-arg` syntax:

```
docker build . -t my-node-app --build-arg NODE_VERSION=8 --build-arg APP_DIR=/usr/src/app
```

You can get the same result within a Codefresh pipeline:


  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefreshdemo/cf-example-build-arguments'
    revision: 'master'
    git: github
  build_my_app:
    title: Building Node.Js Docker Image
    type: build
    image_name: my-app
    working_directory: '.'
    tag: 'master'
    dockerfile: Dockerfile
    build_arguments:
      - NODE_VERSION=8
      - APP_DIR=/usr/src/app
{% endraw %}
{% endhighlight %}

This pipeline checks out the source code of the repository and then builds the Dockerfile by passing the values `8` and `/usr/src/app` to the two arguments.

{% include image.html 
lightbox="true" 
file="/images/examples/docker-build/docker-build-arguments.png" 
url="/images/examples/docker-build/docker-build-arguments.png" 
alt="Using Docker build arguments in a pipeline"
caption="Using Docker build arguments in a pipeline"
max-width="100%" 
%}

## Using Codefresh variables as build arguments

In the previous pipeline, the Docker build arguments are defined in the pipeline itself, but you can also use [pipeline variables]({{site.baseurl}}/docs/pipelines/pipelines/#creating-new-pipelines), [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/), or any other standard mechanism you already have in place.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefreshdemo/cf-example-build-arguments'
    revision: 'master'
    git: github
  build_my_app:
    title: Building Node.Js Docker Image
    type: build
    image_name: my-app
    working_directory: '.'
    tag: 'master'
    dockerfile: Dockerfile
    build_arguments:
      - NODE_VERSION=${{NODE_VERSION_FROM_SHARED_CONFIG}}
      - APP_DIR=${{APP_DIR_PIPELINE_VARIABLE}}
{% endraw %}
{% endhighlight %}

In this case, you can also use any of the built-in [Codefresh variables]({{site.baseurl}}/docs/pipelines/variables/).



## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Build step in pipelines]({{site.baseurl}}/docs/pipelines/steps/build/)  
[Build an Image with the Dockerfile in root directory]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-with-the-dockerfile-in-root-directory/)  
[Build an Image by specifying the Dockerfile location]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-specify-dockerfile-location)  
[Build an Image from a different Git repository]({{site.baseurl}}/docs/example-catalog/ci-examples/build-an-image-from-a-different-git-repository)  
[Build and push an Image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image)  
