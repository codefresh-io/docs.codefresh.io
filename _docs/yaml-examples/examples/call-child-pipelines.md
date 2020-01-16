---
title: "Calling a CD pipeline from a CI pipeline"
description: "Learn how to call children pipelines from a parent pipeline"
group: yaml-examples
sub_group: examples
toc: true
---

In Codefresh you can easily create nested pipelines by calling other pipelines from within an existing pipeline. This is easily accomplished with the [codefresh-run plugin](https://codefresh.io/steps/step/codefresh-run) that allows you to launch another pipeline and optionally wait for its completion.

{% include image.html
lightbox="true"
file="/images/examples/nested-pipelines/call-other-pipeline.png"
url="/images/examples/nested-pipelines/call-other-pipeline.png"
alt="Parent and child pipelines"
caption="Parent and child pipelines"
max-width="80%"
%}

A very common pattern in Codefresh is to have a parent pipeline responsible for Continuous Integration (packaging code) that calls a child pipeline for Continuous Delivery (taking care of deployment).

## The example Project

You can see the example project at [https://github.com/codefresh-contrib/call-child-pipeline-sample-app](https://github.com/codefresh-contrib/call-child-pipeline-sample-app). The repository contains a NodeJs app as well as 3 pipelines (one parent and two children).

## Create a pipeline that calls other pipelines

Here is the definition of the parent pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - package
  - deploy
steps:
  main_clone:
    title: 'Cloning main repository...'
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    git: github
    stage: prepare
  read_my_app_version:
    title: Reading Application version
    stage: prepare
    image: node:latest
    commands:
      - export PACKAGE_VERSION=$(node -p "require('./package.json').version")
      - cf_export PACKAGE_VERSION
  build_my_docker_image:
    title: 'Building My Docker Image'
    stage: package
    type: build
    dockerfile: Dockerfile
    image_name: my-app-image
    tag: ${{PACKAGE_VERSION}}
  call_qa_pipeline:
    title: Deploy to QA
    stage: deploy
    type: codefresh-run
    arguments:
      PIPELINE_ID: child-pipelines/qa-pipeline
      VARIABLE:
        - CF_BRANCH=${{CF_BRANCH}}
        - CF_REVISION=${{CF_REVISION}}
        - APP_VERSION=${{PACKAGE_VERSION}}
    when:
      branch:
        only:
          - develop      
  call_prod_pipeline:
    title: Deploy to Prod
    stage: deploy
    type: codefresh-run
    arguments:
      PIPELINE_ID: child-pipelines/prod-pipeline
      VARIABLE:
        - CF_BRANCH=${{CF_BRANCH}}
        - CF_REVISION=${{CF_REVISION}}
        - APP_VERSION=${{PACKAGE_VERSION}}
    when:
      branch:
        only:
          - /^release.*/i     
    

{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code with a [Git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
1. Uses [cf_export]({{site.baseurl}}/docs/codefresh-yaml/variables/#exporting-environment-variables-from-a-freestyle-step) to create a variable that contains the Application version as specified in `package.json`.
1. Builds a docker image tagged with the Application version using a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)
1. Optionally runs the downstream QA pipeline if the branch is named `develop`. It also passes several environment variables to the child pipeline (including the Application version)
1. Optionally runs the downstream Prod pipeline if the branch name starts with `release`. It also passes several environment variables to the child pipeline (including the Application version)

The last two steps use [pipeline conditionals]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) to decide if they will run or not.

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [Pipeline plugins](https://codefresh.io/steps/)