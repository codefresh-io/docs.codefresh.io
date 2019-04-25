---
title: "Steps"
description: "Learn the types of Pipeline steps"
group: codefresh-yaml
redirect_from:
  - /docs/steps/
toc: true
---

Codefresh [pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/) are composed of a series of steps. 

You can create your own pipelines by writing a  [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file that describes your pipeline. This file can then be version controlled on its own (pipeline as code).

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/stages/complex-pipeline.png" 
url="/images/codefresh-yaml/stages/complex-pipeline.png"
alt="Pipeline steps" 
caption="Pipeline steps"
max-width="80%"
%}

## Built-in steps

The steps offered by Codefresh are:

* [Git clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
* [Freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
* [Build]({{site.baseurl}}/docs/codefresh-yaml/steps/build-1/)
* [Push]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/)
* [Composition]({{site.baseurl}}/docs/codefresh-yaml/steps/composition-1/)
* [Launch test environment]({{site.baseurl}}/docs/codefresh-yaml/steps/launch-composition-2/)
* [Deploy]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/)
* [Approval]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/)

**Git clone** steps allow you to checkout code in your pipeline from any internal or external repository. Existing accounts that still use repositories instead of [projects]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-concepts) have an implicit clone step in the pipelines. 

**Freestyle** steps are the cornerstone of Codefresh pipelines. They allow you to run any command within the context of a Docker container. A lot of Codefresh optimizations such as the [shared docker volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) are designed specifically for freestyle steps.
Freestyle steps are a secure replacement for `docker run` commands.

**Build** steps are the main way where you get access to the Docker daemon (Docker as a service) in Codefresh pipelines. Build steps take as input any Dockerfile and run it on the cloud in a similar manner to what you do on your workstation. Build steps automatically push the result to the [internal Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/) (no need for docker login commands). Codefresh also comes with a global Docker cache that automatically gets attached to all build nodes. Build steps are a secure replacement for `docker build` commands.

**Push** steps allow you to push and tag your docker images (created by the build step) in any [external Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). Push steps are *not* needed at all if you work with only the internal Codefresh registry. Push steps are a secure replacement for the `docker tag` and `docker push` commands.

**Composition** steps allow you to run multiple services together in the Codefresh infrastructure and execute unit tests or other commands against them. They are discarded once a pipeline finishes. Composition steps are a secure replacement for `docker-compose` definitions.

**Launch test environment** steps behave similar to compositions, but they persist after the pipeline ends. This is a great way to create preview environment from your pull requests and send to colleagues.

**Deploy steps** allow to [perform Kubernetes deployments]({{site.baseurl}}/docs/deploy-to-kubernetes/deployment-options-to-kubernetes/) in a declarative manner. They embody the Continuous Deployment aspect of Codefresh.

**Approval steps** allow you to pause pipelines, and wait for human intervention before resuming. They allow you to embrace the concepts of Continuous Delivery.

>Note that Codefresh also supports [parallel workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) as well as running pipelines [locally on your workstation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/running-pipelines-locally/).

## Step directory

In the case of freestyle steps we also offer a [plugin marketplace](https://steps.codefresh.io/) with several existing plugins for popular integrations.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/plugin-directory.png" 
url="/images/pipeline/plugin-directory.png"
alt="Codefresh steps directory" 
caption="Codefresh steps directory" 
max-width="80%" 
%}

## What to read next

* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
* [Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build-1/)
* [Push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/)

