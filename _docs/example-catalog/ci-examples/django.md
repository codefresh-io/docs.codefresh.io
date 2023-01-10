---
title: "Python Django example"
description: "Create Docker images for Python applications"
excerpt: ""
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/django/
  - /docs/python/django/
toc: true
---
Codefresh can work with Python projects using any of the popular frameworks. In this page we will see Django. For a Flask example see the [quick start guide]({{site.baseurl}}/docs/getting-started/create-a-basic-pipeline/).

## The example Django project

You can see the example project at [https://github.com/codefreshdemo/cf-example-python-django](https://github.com/codefreshdemo/cf-example-python-django){:target="\_blank"}. The repository contains a Django starter project with the following commands:

* `pip install -r requirements.txt` install dependencies.
* `python -m unittest composeexample.utils` runs unit tests.
* `python manage.py runserver 0.0.0.0:8000` to start the application locally.


Once launched the application presents the Django starter page at localhost:8000. 

## Django and Docker 

The easiest way to build a Django application is with a Dockerfile that contains everything. This is very convenient as the Docker image can contain everything you need (i.e. app plus test frameworks) inside a pipeline.


Here is the Dockerfile:

 `Dockerfile`
{% highlight docker %}
{% raw %}
FROM python:3.6-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN pip install --upgrade pip
COPY requirements.txt /code/

RUN pip install -r requirements.txt
COPY . /code/

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
{% endraw %}
{% endhighlight %}

This docker build does the following:

1. Starts from the Python image
1. Sets some environment variables 
1. Copies the dependencies file inside the container
1. Upgrades pip and installs all dependencies
1. Copies the rest of the source code
1. Starts the Django app

You can build this image locally on your workstation and then launch it to test the application.

### Create a CI pipeline for Python/Django

Creating a CI/CD pipeline for Django is very easy if you already have the Dockerfile with all required dependencies.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/python/python-build-test.png" 
url="/images/learn-by-example/python/python-build-test.png" 
alt="Creating a Docker image for Python"
caption="Creating a Docker image for Python"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefresh-contrib/gradle-sample-app/blob/master/codefresh.yml){:target="\_blank"} that creates the Docker image after checking out the code.

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
    stage: prepare
    type: git-clone
    repo: 'codefreshdemo/cf-example-python-django'
    revision: master
    git: github
  build_my_image:
    title: Building Docker Image
    stage: build
    type: build
    image_name: my-django-image
    working_directory: ./
    tag: master
    dockerfile: Dockerfile
  test_my_image:
     title: Running unit tests
     stage: test
     image: '${{build_my_image}}'
     commands:
       - python -m unittest composeexample.utils     
{% endraw %}
{% endhighlight %}

This pipeline clones the source code, creates a Docker image and then uses the same image to run unit tests. Codefresh is automatically caching
Docker layers (it uses the Docker image of a previous build as a cache for the next) and therefore builds will become
much faster after the first one finishes.


### Running tests before building the docker image

Sometimes if you have a complex application you might want to run integration tests (or other Python commands), *before* building the Docker image. This scenario is also supported natively by Codefresh.


{% include image.html 
lightbox="true" 
file="/images/learn-by-example/python/python-test-build.png" 
url="/images/learn-by-example/python/python-test-build.png" 
alt="Building the image after tests have run"
caption="Building the image after tests have run"
max-width="80%" 
%}

Here is the [full pipeline](https://github.com/codefreshdemo/cf-example-python-django/blob/master/codefresh-build-after-test.yml){:target="\_blank"} builds the docker image after tests have already executed.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
 - prepare
 - test
 - build
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefreshdemo/cf-example-python-django'
    revision: master
    git: github
  test_the_code:
     title: Run unit tests
     stage: test
     image: python:3.6-slim
     commands:
       - pip install -r requirements.txt --cache-dir=/codefresh/volume/pip-cache 
       - python -m unittest composeexample.utils    
  build_my_image:
    title: Building Docker Image
    stage: build
    type: build
    image_name: my-django-image
    working_directory: ./
    tag: full
    dockerfile: Dockerfile
{% endraw %}
{% endhighlight %}

Codefresh is smart enough that [caches automatically]({{site.baseurl}}/docs/pipelines/pipeline-caching/) for us the workspace of a build (`/codefresh/volume`). This works great for build tools that keep their cache in the project folder, but not for pip which keeps its cache externally (e.g. `~/.cache/pip`). By changing the location of the Pip cache on the project folder (the `pip-cache` name is arbitrary) we make sure that Codefresh will cache automatically the Pip libraries resulting in much faster builds.

## Related articles
[Python examples]({{site.baseurl}}/docs/example-catalog/ci-examples/python/)  
[Codefresh YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  