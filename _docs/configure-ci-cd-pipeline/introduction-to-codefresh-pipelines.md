---
title: "Introduction to Codefresh pipelines"
description: "Understand how Codefresh pipelines work"
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/introduction-to-codefresh-pipelines/
  - /docs/configure-ci-cd-pipeline/
toc: true
---


The central component of the Codefresh Platform are pipelines. Pipelines are workflows that contain individual steps.
Each step is responsible for a specific action in the process. Pipelines can be used to 

* compile and package code
* build Docker images
* push Docker images (either to an [external Registry]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/) or the [built-in Codefresh registry]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/))
* deploy applications/artifacts to VMs, Kubernetes clusters, FTP sites, S3 buckets etc.
* run unit tests, integration tests, acceptance tests etc.
* any custom action that you define

## Why Codefresh is different

Codefresh offers two unique characteristics in pipelines that serve as the cornerstone of the build/deploy process

1. All [steps]({{ site.baseurl }}/docs/codefresh-yaml/steps/) in Codefresh pipelines are executed inside a Docker container of your choosing
1. All steps in Codefresh share the same "workspace" in the form of a shared Docker volume

### Using Docker containers as build tooling

Unlike traditional solutions, Codefresh was built from the ground up to have full Docker support. All Codefresh pipelines
deal with Docker images, either using them as runtime tools or creating them as deployment artifacts. 
Everything that happens in Codefresh uses a Docker image behind the scenes.

It is important that you understand how to take advantage of Docker-based pipelines as they are much more powerful than
traditional VM solutions. The capability to define your own tooling cannot be understated. It is the fastest way to take
full control of your build tools and to upgrade them easily.

With traditional VM-based build solutions you are constrained on the build and deployment tools provided by the vendor.
If for example you need a new version of Node/Java/Python other than the one that is provided on the build slave, you have to wait for your vendor to add it. If you need to use a special tool (e.g terraform, gcloud) and the vendor does
not support it you are out of luck.

With Codefresh you don't care about what is installed in the runners that execute your builds. They can run *any* Docker image of your choosing. You are free to update the version of the image used at any given time.

Here is an example:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/steps-example1.png" 
url="/images/pipeline/introduction/steps-example1.png"
alt="Codefresh steps example 1" 
caption="Pipeline with 3 steps" 
max-width="70%" 
%}


1. The first step runs under the context of a Node image that prepares the application and runs unit tests.
1. The second step uses an image with s3 command line tools and uploads the test resuls to a bucket that holds test reports
1. The helm step creates a Helm chart and pushes it to a Helm repository

You don't need to contact Codefresh and ask them to add the s3 executable on the build runners. You just use a premade Docker image that contains it. The version used for Node is defined by you and if you wish to upgrade to another version
you simply change the definition of the pipeline.


Here is another example:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/steps-example2.png" 
url="/images/pipeline/introduction/steps-example2.png"
alt="Codefresh steps example 2" 
caption="Pipeline with 4 steps" 
max-width="70%" 
%}

1. The first step runs under the context of a Maven image that compiles the code and creates an executable
1. The second step uses a Docker image that contains terraform and creates a single ECS instance in AWS
1. The third step uses a custom Docker image that deploys to the ECS container that was just created
1. The last step uploads the Maven reports that were created in step 1 to an FTP site.

You should now start seeing the endless possibilities. You can mix and match any Docker image (either a public one
or your own) to use a build context in your step. This makes Codefresh a future-proof solution for all build tools
that exist now and all of them that will appear in the future. As long as there is a Docker image for a tool, Codefresh
can use it in a pipeline without any extra configuration.

### Sharing the workspace between build steps

We have seen in the previous section that Codefresh can use Docker images as the context of a build step. The second
important point to understand regarding Codefresh pipelines is that the default workspace of each step is shared between all steps in a pipeline.

This happens via a Docker volume which is attached to all Docker containers that represent each step. This volume is
always available at `/codefresh/volume` and is used as the parent folder where the project is cloned.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/codefresh-volume.png" 
url="/images/pipeline/introduction/codefresh-volume.png"
alt="Codefresh volume" 
caption="All steps share the same volume" 
max-width="90%" 
%}

Anything is that is placed on this volume will be available to all steps of the pipeline (as well as to subsequent executions of the same pipeline as we will see later).

Again, this places Codefresh ahead of traditional solutions that execute build steps in a completely isolated manner. 
In traditional VM-based builds, using artifacts produced from one step to another, is a complicated process as one 
must declare which artifact folders should be re-used. Artifact re-use sometimes happens with compression/uncompression 
of the respective folder resulting in really slow builds if a project is very big.

Codefresh does not need to bother the user with artifact reuse across steps. *Anything* that is placed in the shared codefresh volume will automatically be available to the next steps in the pipeline without any extra configuration.

Example 1

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/codefresh-volume-example1.png" 
url="/images/pipeline/introduction/codefresh-volume-example1.png"
alt="Codefresh volume example 1" 
caption="Re-using Node Modules" 
max-width="90%" 
%}

1. The first step runs `npm install` and downloads all libraries in `node_modules`
1. The second step runs `npm test`. The folder `node_modules` is still present from the previous step

Example 2

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/codefresh-volume-example2.png" 
url="/images/pipeline/introduction/codefresh-volume-example2.png"
alt="Codefresh volume example 2" 
caption="Re-using Test reports" 
max-width="90%" 
%}

1. The first step runs `mvn test` and produces some test reports in `target/surefire-reports`
1. The next step uploads these reports using FTP to an external site


The common volume shared among build steps makes it very easy to create pipelines that work in a gradual manner
where any step in the pipeline is using artifacts produced by a previous one.

You can also use [environment variables]({{ site.baseurl }}/docs/codefresh-yaml/variables/) to share information between steps. All predefined environment variables
are available to all steps, and each individual step can use `cf_export` to inject dynamically during the build process
extra environment variables.


## Working with Codefresh pipelines

Now that we know the basics we can see how you can take advantage of Docker-based pipelines in order 
to build and deploy your projects.


### Cloning the source code

Even though you can define your own [git-clone step]({{ site.baseurl }}/docs/codefresh-yaml/steps/git-clone/) as the first step in a Pipeline, Codefresh does it automatically for you when you have connected a Git repository to your pipeline.

Codefresh uses the shared volume as the parent folder of the project. So if your pipeline is connected to a git repo that contains `my-project` the following will happen:

* `/codefresh/volume` is the shared directory for all steps
* `/codefresh/volume/my-project` is where the source code exists. This is also the current working directory
* any other directory (e.g. `/bin`, `/var`, `/opt`) depends on the current container image that is used as build context

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/checkout.png" 
url="/images/pipeline/introduction/checkout.png"
alt="Codefresh checkout folder" 
caption="Codefresh checkout folder"
max-width="80%" 
%}

There are three important points to consider regarding these folders.

First, the [working directory]({{ site.baseurl }}/docs/codefresh-yaml/working-directories/) of each step is by default the project folder (e.g. `/codefresh/volume/my-project`). Therefore
your build step can run commands exactly as you would run them locally (e.g. `npm install, pip install, mvn package, bundle install`).

Secondly, notice that the project folder is placed on the codefresh volume, so by default it is also available to all other steps. The code that you checkout in the beginning, as well as all other files that are created on it, will
be available to all steps. Once you create `node_modules`, or any other folder that exists inside the project folder, it will automatically persist for all other steps.

Finally `/codefresh/volume` is an internal folder name and you should use  `{% raw %}${{CF_VOLUME}}{% endraw %}` in your codefresh.yml file
if you really want to reference this folder. You can also reference your project folder as {% raw %}${{main_clone}}{% endraw %} if you need it.

### Working with Docker inside a Codefresh pipeline

We have already seen that Codefresh pipelines are based on Docker images and that each step runs inside the context of a Docker container. You might be wondering how you can run directly Docker commands inside a Codefresh pipeline.

The answer is that you don't. Even though in the future Codefresh might allow for Docker-in-Docker capabilities, at the moment this is not supported. Any scripts that you already have that run Docker commands on their own will need to be adapted to Codefresh pipelines.

Usually you want to run a docker command for four reasons

1. To build a Docker image
1. To push a Docker image
1. To run a Docker container
1. To run a docker-compose setup

For all these situations Codefresh gives you special pipeline steps that perform the respective action. These are:

1. The [build step]({{ site.baseurl }}/docs/codefresh-yaml/steps/build-1/)
1. The [push step]({{ site.baseurl }}/docs/codefresh-yaml/steps/push-1/)
1. The [compositions step]({{ site.baseurl }} /docs/codefresh-yaml/steps/composition-1/)

To actually run a docker container you just use the [freestyle step]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/). The commands you define in a freestyle step run automatically in a Docker container that is attached to that step once the pipeline executes.

Therefore this command on your local workstation:

```
docker run python:3.6.4-alpine3.6 pip install .
```

will become in Codefresh

```
CollectAllMyDeps:
  title: Install dependencies
  image: python:3.6.4-alpine3.6
  commands:
    - pip install .
```


### Creating Docker images dynamically as build tools


Now we reach one of the most powerful features of Codefresh pipelines. We have already seen that [freestyle pipeline steps]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/) are just a series of commands that run inside the context of a Docker container. In most cases the images used
for the freestyle steps are known in advance and come from public (e.g. Dockerhub) or [private Docker registries]({{ site.baseurl }}/docs/docker-registries/external-docker-registries/).

Codefresh is one the few CI/CD solutions that not only offers a [built-in Docker registry]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/)
 accessible to all pipelines
but also allows you to **build docker images on demand in the same pipeline where they are required**.

This means that you can create a special Docker image in an early step inside a Codefresh pipeline and then reference it in a later step in the same pipeline.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/dynamic-docker-builds.png" 
url="/images/pipeline/introduction/dynamic-docker-builds.png"
alt="Codefresh dynamic docker builds" 
caption="Creating dynamically Docker images as build steps"
max-width="90%" 
%}

Let's say for example that you are moving a legacy application to Codefresh which is deployed using a special Python script. Your main application is a Ruby-On-Rails app. Both applications exist in the same git repository (we mention this for simplicity reasons, Codefresh also supports checking out code from multiple repositories).

You can create a single pipeline with Codefresh that does the following:

1. Checks out the code
1. Creates a Docker image based on Python for the deployment tool
1. Uploads the Python tool Docker image to the internal registry
1. Builds the Ruby application using a freestyle step with the R-O-R image from Dockerhub
1. Deploys the Ruby application by running the Python based deployment tool image (after pulling it first)

This concept is ground-breaking as it allows you to automatically update your build tools that are used in any pipeline.
Even though you could manually create the Docker images yourself before-hand, it is better to completely automate them
inside the pipeline they are actually needed. This ensures that both the application and its tooling are always at the latest version.

### How caching works in Codefresh

Making your builds as fast a possible is an on-going goal for a sound CI/CD solution. Quick builds allow for short 
feedback development cycles which is always a desiranble trait for locating bugs early in the process.

Codefresh can help you with caching in 3 ways

1. The Docker daemon used in a pipeline caches all layers by default (exactly as you would build images in your local workstation)
1. The last image that was successfully built in a pipeline will be used in the next run of the pipeline (`--cache-from`)
further reducing the build times
1. The shared Codefresh volume is also persisted at the end of a build and restored at the beginning of the next. Therefore any folders that are contained in it (such as `node_modules`) will automatically be available to the next pipeline.

All these caching mechanisms are enabled by default and you can [freely disable them]({{ site.baseurl }}/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/) if you encounter any issues with caching.


You can also use the internal Docker registry explicitly by pushing intermediate Docker images and reusing them in future pipelines either as a base image in another Dockerfile or as a freestyle step.

For example, if you have 4 Node projects that share a similar codebase, you could create a Docker image that contains the folder `node_modules` common to all 4 of them, push it to the internal Codefresh registry and then use it in freestyle steps for building those projects. 

### Calling other pipelines

It is also possible to chain multiple Pipelines together in Codefresh. To accomplish this, Codefresh offers
a special Docker image that contains the [Codefresh CLI](https://codefresh-io.github.io/cli/) and allows you to trigger another pipeline using its name.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/introduction/call-pipeline.png" 
url="/images/pipeline/introduction/call-pipeline.png"
alt="Codefresh call pipeline" 
caption="Calling another pipeline"
max-width="80%" 
%}

Notice that each Pipeline in Codefresh is completely isolated from the other. They use a different Docker volume so the build context of each one cannot access files from the other. This may change in the future, but for the time being
you should know that only steps within the same pipeline can share artifacts.

## What to read next

* [Codefresh YAML]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{ site.baseurl }}/docs/codefresh-yaml/steps/)
* [Internal Docker Registry]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/)
* [YAML Examples]({{ site.baseurl }}/docs/yaml-examples/examples/)


