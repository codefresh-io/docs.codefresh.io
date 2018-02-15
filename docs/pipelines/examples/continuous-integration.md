---
layout: docs
title: "Continuous integration"
description: ""
group: pipelines
sub_group: pipeline-examples
# hack/workaround for sub elements, because parent has permalink
permalink: /docs/pipelines/pipeline-examples/build-and-test/
redirect_from:
  - /docs/build-and-test
toc: true
---
You can optionally add the unit test to the pipeline. The unit test is a bash-like script that will run in the root of the repository, inside the Docker container, using any testing tool that supports your framework. You can either configure your unit test script within the pipeline configuration page itself. In this example, we will show how to add it within the pipeline configuration page.

{{site.data.callout.callout_info}}
Fork this example to try it. [https://github.com/codefreshdemo/demochat](https://github.com/codefreshdemo/demochat){:target="_blank"}
{{site.data.callout.end}}

## To add a unit test:

{:start="1"} 
1. Go to the **Pipelines** of the forked repository.

{:start="2"}
2. For `Repo's Dockerfile` specify the `Dockerfile.dev`

{:start="3"}
3. In the **Workflow** section (at the middle of the **Pipelines** screen), in the **Unit Test Script** command line box, type `npm run test`.

{% include 
image.html 
lightbox="true" 
file="/images/0d72e36-codefresh_build_test.png" 
url="/images/0d72e36-codefresh_build_test.png"
alt="codefresh_build_test.png" 
max-width="40%"
caption="Build and Unit Test"
%}

{:start="4"}
4. Click `Save` and `Build` with branch `master`

## Test Results

{% include 
image.html 
lightbox="true" 
file="/images/c15144c-codefresh_result_screen.png" 
url="/images/c15144c-codefresh_result_screen.png"
alt="codefresh_result_screen.png" 
max-width="40%"
caption="Test Results"
%}

## Unit Tests with composition
Sometimes running unit tests require some additional services such as a Database (Mongo, MySql, Postgres etc) or third-party components like Redis, Memcache, etc.
Codefresh provides you an easy way to do this by using a Codefresh pipeline and docker-compose.
To run Unit Tests with a DB or other services you can create a composition and run your unit tests as part of it.

Go to [Unit Tests]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/)  to learn more about how to use it. Also, see how to run unit tests with composition: 
- [Unit Tests with Composition]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-composition/) 
- [Unit Test with Database]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/unit-tests/unit-tests-with-database/)

## What's next?
- [Build and Push to Docker registry]({{ site.baseurl }}/docs/pipelines/examples/build-and-push-to-docker-registry/) 
- [Build and Deploy to Kubernetes]({{ site.baseurl }}/docs/pipelines/examples/build-and-deploy-to-kubernetes/)
