---
title: "Pipeline caching"
description: "Faster builds with Codefresh caching"
group: configure-ci-cd-pipeline
toc: true
redirect_from:
  - /docs/troubleshooting/common-issues/debugging-codefresh-builds-locally/
  - /docs/troubleshooting/common-issues/access-and-debug-the-pipeline-volume-image/
---
  
One of the unique features of Codefresh is the multitude of caching systems that take part in a pipeline and in particular the caching mechanisms targeted specifically at Docker builds. Most types of caching are completely automatic and require zero configuration in order to activate. Caching is a built-in feature in all Codefresh accounts regardless of pricing tier (even free accounts).

## Types of caching

Here is a quick overview of all types of caching used in a Codefresh pipeline:

{: .table .table-bordered .table-hover}
| Caching mechanism          | Activation              | Used in                   | Comments |
| -------------- | ---------------------------- |-------------------------| -------------------------|
| Distributed Docker step caching       | Automatic | All pipeline [steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) | |
| Distributed Docker layer caching  | Automatic |  Pipeline [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) | Mimics local Docker layer cache|
| Caching from previous built image  | Automatic |  Pipeline build steps | Distributed version of `--cache-from`|
| Docker registry caching  | Automatic |  Pipeline build steps | Works only for [integrated Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/)|
| Traditional build caching  | Automatic/manual |  Pipeline [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) | See notes for [parallel builds]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)|

Let's see these caches in order and how to use them effectively.

## Distributed Docker image caching

This is the simplest mode of caching available. All Codefresh steps are in [fact docker images]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/). Once a pipeline runs for the first time, Codefresh will pull all required images from their registries (either public or private) and will cache them for the next build

IMAGE here

The next time the pipeline runs all images wil be fetched from cache. This includes built-in steps (e.g the [clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)), custom steps from [the marketplace](https://codefresh.io/steps/) or your own [dynamic pipeline steps]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#creating-docker-images-dynamically-as-build-tools).

This cache mechanism is completely automatic and invisible to you. Some ways that you can affect it are:

* If you use well known images in your pipeline (such as `alpine`, `node`,`mvn` etc) they have more probabilities to be already cached by the Codefresh platform
* Using small images in the pipeline will make caching/restoring of pipeline steps much faster.


## Distributed Docker layer caching

This type of caching is **only** applicable to [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) and mimics the ways docker layer caching behaves locally on your workstation.

When you build images locally docker will cache intermediate layers making future builds much faster. You can see when caches are used in your build logs.

CODE HERE

In a distributed build environment however things work much differently as each build node has its own cache. If you run a pipeline on one node and then run a second build on another node everything will be downloaded again because (normally) build nodes don't share any cache.

IMAGE here

Codefresh is one of the few CI/CD solutions that has a *distributed* docker layer cache. This makes layer caching available to all build nodes. It doesn't matter any more which build node runs which pipeline as all of them are equal regarding their caching capabilities.

IMAGE here

You can see if this cache is used in your [pipeline logs]({{site.baseurl}}/docs/codefresh-yaml/steps/build/):

IMAGE here

Codefresh will also automatically pass the `--cache-from` directive to docker builds with the previous successful build artifacts:

IMAGE here

To take advantage of this build cache just follow the official Docker guidelines and best practices such as

* Download dependencies in a separate docker layer
* Put layers that will not change frequently at the top of dockerfile (e.g. OS libs)
* Put thing that will change frequently at the bottom of the dockerfile (e.g. source code)
* Don't use side effects in Dockerfiles

Basically if your Dockerfile is already optimized on your local workstation, it should also be optimized for Codefresh. More information can be found in the official documentation:

* [https://www.docker.com/blog/intro-guide-to-dockerfile-best-practices/](https://www.docker.com/blog/intro-guide-to-dockerfile-best-practices/)
* [https://docs.docker.com/develop/develop-images/dockerfile_best-practices/](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## Docker registry caching

This is a caching mechanism unique to Codefresh and applicable only for [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) when the [private Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) is used.

Codefresh will check the internal Docker registry *before* a build step and if the exact same image is found (using the image hash), it will skip the build step completely:

IMAGE here.

This is a very effective way to cut down the amount of time needed by pipelines but it obviously works only for Docker images that don't change often (help images, plugins, build tools etc.) as the deployment docker images will always be different when a new git commit happens in the source code.

You can take advantage of this mechanism by [not mixing deployment docker images with development docker images](https://codefresh.io/containers/docker-anti-patterns/). The former will change all the time, while the latter should be recreated less often.

## Traditional build caching

### How to use it

## Disabling caching mechanisms

## What to read next

* [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)

