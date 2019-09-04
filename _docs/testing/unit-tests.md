---
title: "Unit Testing"
description: "How to run Unit tests in Codefresh pipelines"
group: testing
redirect_from:
  - /docs/unit-tests/
toc: true
---
With Codefresh, you can easily run  unit tests for every commit or pull request.


>For the purposes of this guide, "unit tests" are the tests that use only the source code of the application and nothing else. If you are interested in running tests with external services (such as databases) then see the page about [integration tests]({{site.baseurl}}/docs/testing/integration-tests/).

Different companies have different types of unit tests and in several cases the type of programming language also affects when/what tests are run. Codefresh supports all test frameworks (including mocking frameworks) for all popular programming languages.

In this page we will see 4 ways of running unit tests in Codefresh:

1. Running unit tests in a dockerfile (recommended only for smoke tests)
1. Running unit tests with an external image (best for traditional applications)
1. Running unit tests in the application image (not recommended, but very popular)
1. Running unit tests using a special testing image (the recommended solution)



## Running Unit tests as part of a Docker build

A handy way to quickly test a Docker image, is by placing one or more smoke tests in the Dockerfile itself. The unit
tests then execute when the image is built, and if they fail the image is not even created. Here is an example:

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM python:3.6.4-alpine3.6

ENV FLASK_APP=minitwit
COPY . /app
WORKDIR /app

RUN pip install --editable .
RUN flask initdb

# Unit tests
RUN python setup.py test

EXPOSE 5000
CMD [ "flask", "run", "--host=0.0.0.0" ]
{% endraw %}
{% endhighlight %}

This kind of unit tests are transparent to Codefresh. They will just execute in a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) in the same manner
as if you would build the image on your workstation.

{%
  include image.html
  lightbox="true"
  file="/images/testing/unit-testing/unit-tests-in-dockerfile.png"
  url="/images/testing/unit-testing/unit-tests-in-dockerfile.png"
  alt="Unit tests inside a Dockerfile"
  caption="Unit tests inside a Dockerfile"
  max-width="80%"
%}

A big disadvantage of this unit testing method, is that getting reports out of the docker image is not a straightforward process. On the other hand they are very easy to integrate in any workflow. The Codefresh pipeline simply checks out the code and builds a Dockerfile.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/python-flask-sample-app'
    revision: 'with-tests-in-dockerfile'
    stage: prepare
    git: github
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: build
    image_name: my-app-image
    working_directory: ./
    tag: with-tests-in-dockerfile
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

This technique is best used for a very small subset of unit tests that check the overall well being of a Docker image. The bulk of the tests should be executed outside the Docker build process as we will see in the next sections.

## Running Unit tests using an external Docker image

The recommended way to run unit tests in Codefresh pipelines is to select a Docker image that has all the test tools that you need and define an explicit testing step in your pipeline (usually a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)).

Here is an example where a JDK/Maven image is used to run unit tests:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - test
  - package
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/spring-boot-2-sample-app'
    revision: master
    git: github
  MyUnitTests:
    title: JUnit tests
    stage: test
    image: 'maven:3.5.2-jdk-8-alpine'
    commands:
      - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository test
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: package
    image_name: spring-boot-2-sample-app
    working_directory: ./
    tag: 'non-multi-stage'
    dockerfile: Dockerfile     
{% endraw %}
{% endhighlight %}

The big advantage of this approach is that you can easily replicate your test environment in the Codefresh pipeline by selecting the appropriate image for your tests. You also get a clear overview on the test results. If they fail, the pipeline will automatically stop. You can change this behavior with the [fail_fast]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#execution-flow) property.

{%
  include image.html
  lightbox="true"
  file="/images/testing/unit-testing/unit-tests-with-external-image.png"
  url="/images/testing/unit-testing/unit-tests-with-external-image.png"
  alt="Unit tests with external Docker image"
  caption="Unit tests with external Docker image"
  max-width="80%"
%}

Notice that even if the example above, creates eventually a Docker image, you can still use this way of running unit tests for traditional applications that are not dockerized yet (e.g. VM-based applications).

## Running Unit tests with the Application Docker image

In several cases (especially with dynamic languages) the Docker image that holds the application can also be re-used for unit tests. This is a very common technique for Node, Python and Ruby applications. In this case you can use the [context feature]({{site.baseurl}}/docs/codefresh-yaml/variables/#context-related-variables) of Codefresh to run a unit test step in the image that was created in a previous step:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
  - test
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/python-flask-sample-app'
    revision: 'master'
    git: github
    stage: prepare
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: build
    image_name: my-app-image
    working_directory: ./
    tag: 'master'
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    stage: test
    image: '${{MyAppDockerImage}}'
    commands:
      - python setup.py test     
{% endraw %}
{% endhighlight %}

Notice that here we use a [Codefresh variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) as the value of the `image` property in the last step. This will make the unit test execute in the same docker container that was created in the second step of the pipeline.

{%
  include image.html
  lightbox="true"
  file="/images/testing/unit-testing/unit-tests-with-app-image.png"
  url="/images/testing/unit-testing/unit-tests-with-app-image.png"
  alt="Reusing the app image for unit tests"
  caption="Reusing the app image for unit tests"
  max-width="80%"
%}

This technique is certainly useful, but can be easily abused if you end up shipping testing tools in your production image (which is not recommended). If you find your production images filled with test tools and libraries it is better to use the technique in the next section which uses a different image for tests.


## Running Unit tests with a dynamic Docker image

The ultimate way of running unit tests in Codefresh is by creating a specific image dedicated to unit tests. If Dockerhub doesn't already contain an image that suits you, you should instead create your own.

This means that your application has *two Dockerfiles*. The main one that holds the application as a deployment artifact and a separate one that holds all the unit test libraries and tools that you need. Here is an example:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - 'Test tools'
  - test
  - build
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefreshdemo/demochat'
    revision: 'master'
    git: github
    stage: prepare
  MyUnitTestDockerImage:
    title: Building Test image
    type: build
    stage: 'Test tools'
    image_name: my-test-image
    working_directory: ./
    tag: 'master'
    dockerfile: Dockerfile.dev
  MyUnitTests:
    title: Running Unit tests
    stage: test
    image: '${{MyUnitTestDockerImage}}'
    commands:
      - npm run test
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    stage: build
    image_name: my-app-image
    working_directory: ./
    tag: 'master'
    dockerfile: Dockerfile    
{% endraw %}
{% endhighlight %}

Notice that here we create two Docker images.

1. The first docker image is created from `Dockerfile.dev`
1. Unit tests run in the context of that image (`MyUnitTestDockerImage`)
1. The production application uses another Dockerfile

{%
  include image.html
  lightbox="true"
  file="/images/testing/unit-testing/unit-tests-with-dedicated-image.png"
  url="/images/testing/unit-testing/unit-tests-with-dedicated-image.png"
  alt="Dedicated unit test image"
  caption="Dedicated unit test image"
  max-width="80%"
%}

This is one of the best ways to run unit tests (as well as integration tests) as it allows you to fine tune the test environment while still shipping to production only what is needed.

In the example above we used two different dockerfiles, but you could also use a single dockerfile with multi-stage builds and use the `target` directive to stop the image build process at a previous layer (that has all the testing tools).

## Creating Test reports

All the ways mentioned above for running unit tests (apart of the first one), can also be used for test reporting.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/test-reports/sample-test-report.png" 
url="/images/pipeline/test-reports/sample-test-report.png"
alt="Sample Allure test report" 
caption="Sample Allure test report"
max-width="70%"
%}

Read all about test results and graphs in the [test reports page]({{site.baseurl}}/docs/testing/test-reports/).


## What to read next

* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [On demand environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/)
* [Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)





