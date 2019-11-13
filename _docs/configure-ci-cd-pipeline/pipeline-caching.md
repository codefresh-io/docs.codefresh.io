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

### How to use it

## Distributed Docker layer caching

https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
https://www.docker.com/blog/intro-guide-to-dockerfile-best-practices/

### How to use it

## Docker registry caching

### How to use it

## Traditional build caching

### How to use it

## Disabling caching mechanisms

## What to read next


* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines)
