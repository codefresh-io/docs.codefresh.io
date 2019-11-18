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
| Docker registry caching  | Automatic |  Pipeline build steps | Works only for the [integrated Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/)|
| Traditional build caching  | Automatic/manual |  Pipeline [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) | See notes for [parallel builds]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)|

All these caching mechanisms are enabled by default and you can [freely disable them]({{site.baseurl}}/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/) if you encounter any issues with caching. 

Let's see these caches in order and how to use them effectively.

## Distributed Docker image caching

This is the simplest mode of caching available. All Codefresh steps are in [fact docker images]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/). Once a pipeline runs for the first time, Codefresh will pull all required images from their registries (either public or private) and will cache them for the next build:


{% include image.html
lightbox="true"
file="/images/pipeline/caching/image-caching.png"
url="/images/pipeline/caching/image-caching.png"
alt="Caching pipeline steps"
caption="Caching pipeline steps"
max-width="60%"
%}

The next time the pipeline runs all images wil be fetched from cache. This includes built-in steps (e.g the [clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)), custom steps from [the marketplace](https://codefresh.io/steps/) or your own [dynamic pipeline steps]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#creating-docker-images-dynamically-as-build-tools).

This cache mechanism is completely automatic and is not user configurable. Some ways that you can affect it are:

* If you use well known images in your pipeline (such as `alpine`, `node`, `maven` etc) they have more probabilities to be already cached by the Codefresh platform
* Use specific tags for your images (e.g. `alpine:3.9.2` and `maven:3-jdk-11-openj9`) instead of generic ones (e.g `alpine:latest` and `node:buster`) that change all the time
* Using small images in the pipeline will make caching/restoring of pipeline steps much faster.


You can see in the build logs if the images of your steps are found in cache or not. Here is an example of a cache hit:

{% include image.html
lightbox="true"
file="/images/pipeline/caching/image-cache-hit.png"
url="/images/pipeline/caching/image-cache-hit.png"
alt="Docker image cache hit"
caption="Docker image cache hit"
max-width="50%"
%}

and a cache miss:

{% include image.html
lightbox="true"
file="/images/pipeline/caching/image-cache-miss.png"
url="/images/pipeline/caching/image-cache-miss.png"
alt="Docker image cache miss"
caption="Docker image cache miss"
max-width="50%"
%}




## Distributed Docker layer caching

This type of caching is **only** applicable to [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) and mimics the ways docker layer caching behaves locally on your workstation.

When you build images locally docker will cache intermediate layers making future builds much faster. You can see when caches are used in your build logs.

{% highlight shell %}
{% raw %}
> docker build . -t my-app
Sending build context to Docker daemon  81.92kB
Step 1/10 : FROM golang:1.12-alpine
 ---> 6a17089e5a3a
Step 2/10 : RUN apk add --no-cache git
 ---> Using cache
 ---> 7b65bc6a6690
Step 3/10 : WORKDIR /app/go-sample-app
 ---> Using cache
 ---> 8755d1490fe2
Step 4/10 : COPY go.mod .
 ---> Using cache
 ---> 476d868ceddd
Step 5/10 : COPY go.sum .
 ---> Using cache
 ---> 3239097e9bde
[...]
{% endraw %}
{% endhighlight %}

In a distributed build environment however things work much differently as each build node has its own cache. If you run a pipeline on one node and then run a second build on another node everything will be downloaded again because (normally) build nodes don't share any cache.

IMAGE here

Codefresh is one of the few CI/CD solutions that has a *distributed* docker layer cache. This makes layer caching available to all build nodes. It doesn't matter any more which build node runs which pipeline as all of them are equal regarding their caching capabilities.

IMAGE here

You can see if this cache is used in your [pipeline logs]({{site.baseurl}}/docs/codefresh-yaml/steps/build/):

{% include image.html
lightbox="true"
file="/images/pipeline/caching/distributed-docker-layer-cache.png"
url="/images/pipeline/caching/distributed-docker-layer-cache.png"
alt="Docker layer caching regardless of build node"
caption="Docker layer caching regardless of build node"
max-width="60%"
%}

Codefresh will also automatically pass the `--cache-from` directive to docker builds with the previous successful build artifacts:

{% include image.html
lightbox="true"
file="/images/pipeline/caching/cache-from.png"
url="/images/pipeline/caching/cache-from.png"
alt="Distributed version of `--cache-from`"
caption="Distributed version of `--cache-from`"
max-width="60%"
%}

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

{% include image.html
lightbox="true"
file="/images/pipeline/caching/skip-build.png"
url="/images/pipeline/caching/skip-build.png"
alt="Skipping a previously built Docker image"
caption="Skipping a previously built Docker image"
max-width="60%"
%}

This is a very effective way to cut down the amount of time needed by pipelines but it obviously works only for Docker images that don't change often (help images, plugins, build tools etc.) as the deployment docker images will always be different when a new git commit happens in the source code.

You can take advantage of this mechanism by [not mixing deployment docker images with development docker images](https://codefresh.io/containers/docker-anti-patterns/). The former will change all the time, while the latter should be recreated less often.

## Traditional build caching

If you have read the [introduction to pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines) page you will already be familiar with the shared volume that is automatically mounted on all pipeline steps. This is volume is not only use for data exchange of steps within the same pipeline, but is also stored/fetched for each subsequent build as well.

IMAGE here

This means that unlike other CI solutions where you have to manually describe what folder you wish to cache, in Codefresh **everything that exists in `/codefresh/volume` and its subfolders is automatically cached between different builds** of the same pipeline. The volume mounting and caching/restoring process is completely automatic. You don't need any configuration about it. 
The choice that you have is which files to place on the volume. For example, Node.js uses the folder `node_modules` for its dependencies which are placed under the project folder [which is automatically placed under the volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#cloning-the-source-code). So all contents of `node_modules` will be cached by default.

The simplest way to see this caching mechanism in action is this pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  write_sample_file:
    title: Writing to shared volume
    image: alpine
    commands:
     - date >> /codefresh/volume/sample.txt
  read_sample_file:
    title: Reading from shared volume
    image: alpine
    commands:
     - cat /codefresh/volume/sample.txt
{% endraw %}
{% endhighlight %}

If you run this pipeline multiple times you will see multiple entries in the file `sample.txt`.

{% include image.html 
lightbox="true" 
file="/images/pipeline/caching/codefresh-shared-volume.png" 
url="/images/pipeline/caching/codefresh-shared-volume.png" 
alt="Shared volume after 3 builds of the same pipeline"
caption="Shared volume after 3 builds of the same pipeline"
max-width="60%" 
%}

Notice also the complete lack of `volume` directives. The volume is mounted and cached/restored by Codefresh with no configuration on your part.

Some important points on this caching mechanism:

* The volume is handled and managed by Codefresh in a completely transparent manner. You **DO NOT** need any `volume` directives in your pipelines to take advantage of it. The volume is even present in [service containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) for integration tests.
* On each build the [clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) will purge/delete everything that is not placed in `.gitignore`. So make sure that your `.gitignore` files contains all the things that you want to see cached (e.g. `node_modules`)
* The volume is different for each pipeline **AND** for each Git branch. Different pipelines have completely different volumes. Different Git branches of the same pipeline have completely different volumes as well. This is by design as a branch called `develop` will probably need different dependency libraries from a branch called `production`.
* The volume is **NOT available** in [build steps]({{site.baseurl}}/docs/codefresh-yaml/steps/build/). This is not a Codefresh limitation. Docker itself [does not allow volumes during builds](https://github.com/moby/moby/issues/14080). There is no folder `/codefresh/volume` inside a Dockerfile for you to access.
* This is the only caching mechanism that is not related to Docker images. So if you compile/package a traditional application with Codefresh it is the only way to get faster builds

### Caching folders which are outside your project folder

By default if you checkout a Git project named `foo`, the source code [is placed under]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#cloning-the-source-code) `/codefresh/volume/foo`. This means that with zero configuration the following things are cached:

* your source code of `foo` project
* all dependencies under the project folder (e.g. `foo/node_modules`)
* all project logs, test results that are inside the project module.

Everything else found in external folders is NOT cached by default. So if you have things in folders such as `/root`, `/tmp/`, `/home/`, `/var/` that you need to cache you need to manually copy them to the volume.

In practice, this means that you need to look at the documentation of your build system and test framework and make sure that all folders you want cached are placed under the Codefresh volume. This is a typical pattern with Java applications.

 * For Maven use `mvn -Dmaven.repo.local=/codefresh/volume/m2_repository package` as shown in the [example]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/).
 * For Gradle use `gradle -g /codefresh/volume/.gradle -Dmaven.repo.local=/codefresh/volume/m2` as explained in the [example]({{site.baseurl}}/docs/learn-by-example/java/gradle/).
 * For SBT use `-Dsbt.ivy.home=/codefresh/volume/ivy_cache`.

 This is only needed for traditional applications that are not dockerized. If you already use Docker containers the previous caching mechanisms are already enough.

### Issues with parallel builds and parallel pipelines

Parallel steps inside the same pipeline use the same volume. Codefresh [does not perform any conflict detection in that case]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/#shared-codefresh-volume-and-race-conditions). 

Also notice that if you make too many commits very fast (triggering a second build while the previous one is still running), Codefresh will allocate a brand new volume for the subsequent builds.

IMAGE here

This will force all builds to start with a clean shared volume, resulting in longer build times. Be sure to set your [build termination settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings) correctly.

## Codefresh cache size and eviction policy

If you use the SAAS version of Codefresh, then you don't have any control of cache policies.
The SAAS version is fully controlled by Codefresh personnel and the cache policies in place might clear caches more sooner than you think.

If you run a pipeline very infrequently it is possible to suffer many cache misses. If you also use obsure Docker images you might see them downloaded again and again.

If you run the [hybrid or on-prem versions]({{site.baseurl}}/docs/enterprise/installation-security/) of Codefresh, then your system administrator is responsible for fine-tuning the cache settings.

## What to read next

* [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Parallel pipelines]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)
