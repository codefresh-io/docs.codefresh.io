---
title: "Unit Testing"
description: "How to run Unit tests in Codefresh pipelines"
group: testing
redirect_from:
  - /docs/unit-tests/
toc: true
---
With Codefresh, you can easily set your unit tests to run on every build.
There are several ways to run unit tests within a Codefresh pipeline.

>For the purposes of this guide, "unit tests" are the tests that use only the source code of the application and nothing else. If you are interested in running tests with external services (such as databases) then see the page about [integration tests]({{site.baseurl}}/docs/testing/integration-tests/).

Different companies have different types of unit tests and in several cases the type of programming language also affects when/what tests are run. Codefresh supports all test frameworks (including mocking frameworks) for all popular programming languages.

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
  max-width="90%"
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

This technique is best used for a very small subset of unit tests that check the overall well being of a Docker image. The bulk of the tests should be executed outside the Docker build process as we will see in the next sections:

## Running Unit tests using an external Docker image

## Running Unit tests with the Application Docker image

## Running Unit tests with a dynamic Docker image

## Creating Test reports






## Run Unit Tests from the Codefresh UI
1. Click **Pipelines** (gear icon) on your service.
{% include image.html lightbox="true" file="/images/a3236fd-2016-10-14_13-28-57.png" url="/images/a3236fd-2016-10-14_13-28-57.png" alt="Add repository" max-width="40%" %}
2. Define your unit test script.
{% include image.html lightbox="true" file="/images/e70a039-2016-10-14_13-35-42.png" url="/images/e70a039-2016-10-14_13-35-42.png" alt="Add repository" max-width="40%" %}
<div class="bd-callout bd-callout-warning" markdown="1">
##### IMPORTANT:

Make sure your testing frameworks are installed in your service Docker image. For full documentation on Dockerfile commands, visit the [Docker documentation](https://docs.docker.com/engine/reference/builder/).
</div>

3.  Click **Save** and **Build** the project.

## **What to do next**: 
Expand the **Running Unit Tests** section to view the actions taken during the test.
{% include image.html lightbox="true" file="/images/2b48af2-2016-10-14_13-46-53.png" url="/images/2b48af2-2016-10-14_13-46-53.png" alt="Add repository" max-width="40%" %}

## Run unit tests using the codefresh.yml file

{:.text-secondary}
### What is a YAML file?
For more information about the ```codefresh.yml``` file, click [here]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

{:start="1"}
1. Add a unit-test step to your ```codefresh.yml``` file.

  Example: `codefresh.yml`
{% highlight yaml %}
version: '1.0'

steps:
  build-prj-name:
    type: build
    description: codefresh example
    image-name: codefreshexamples/expressangular
    dockerfile: Dockerfile
    tag: latest
  unit-tests:
    image: node:latest # image that contains installed tools for performing test commands
    commands:
      - echo $(date)
{% endhighlight %}

{:start="2"} 
2. In your pipeline switch to the **Use YML build**
{% include image.html lightbox="true" file="/images/dd47675-codefresh_yml_build.png" url="/images/dd47675-codefresh_yml_build.png" alt="Codefresh YML Build" max-width="40%" %}

{:start="3"}
3. Click **Save** and **Build**
{% include image.html lightbox="true" file="/images/eca7ebb-2016-10-14_14-10-09.png" url="/images/eca7ebb-2016-10-14_14-10-09.png" alt="Codefresh YML Build" max-width="40%" %}

{:.text-secondary}
### **What to do next**: 
Expand the **Running Unit Tests** section to view the actions taken during the test.

## Run tests with composition
A **Composition** is a number of containers that define a micro-services based application. For example, it can include all services, or a sub-subset of services.

{:start="1"}
1. Select the `Run tests with composition` check box.
{% include image.html lightbox="true" file="/images/d4b5997-6c54eef-2016-10-13_20-09-41.png" url="/images/d4b5997-6c54eef-2016-10-13_20-09-41.png" alt="Codefresh YML Build" max-width="40%" %}

{:start="2"}
2. Select a composition.
{% include image.html lightbox="true" file="/images/fde5fc0-acce127-2016-10-13_20-15-53.png" url="/images/fde5fc0-acce127-2016-10-13_20-15-53.png" alt="Codefresh YML Build" max-width="40%" %}

{:start="3"}
3. There are two ways to run with composition: 
   *    **Attach to Composition** - The image will be attached to the composition as a new service named `cf_unit_test` and the script will run inside it.
   *    **Replace service** - Choose a candidate service from your composition which Codefresh will use to run your unit tests on. Notice that the image of that candidate will be replaced with the built image from the previous step and the command will be overridden by the unit test script. 

{% include image.html lightbox="true" file="/images/5052f19-image4.png" url="/images/5052f19-image4.png" alt="Selecting the Replace Service option" caption="Selecting the Replace Service option" max-width="40%" %}

{:start="4"}
4. In Pipelines your service click **Save** and build your project.

##### **Result**: In the log of process “Unit tests”, we can see which actions the test makes.
