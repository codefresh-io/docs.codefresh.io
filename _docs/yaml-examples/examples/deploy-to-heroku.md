---
title: "Deploy to to Heroku"
description: "Deploying your application or image to Heroku"
group: yaml-examples
sub_group: examples
toc: true
---

Heroku is a container-based cloud PaaS software that allows you to deploy, run, and manage your applications.  Built on top of AWS, it supports Ruby, Node.js, Java, Python, Clojure, Scala, Go and PHP.

This tutorial will cover two examples, depending on your use case. If you are not using containers, your use case is covered using the Codefresh heroku-deployer plugin ([Example #1]({{site.baseurl}}docs/yaml-examples/examples/deploy-to-heroku/#pipeline-example-1-deploying-source-code-to-heroku-using-the-codefresh-heroku-plugin)). If you are using containers, you can achieve deployment by using a combination of build, push, and freestyle steps ([Example #2]({{site.baseurl}}http://localhost:3131/docs/yaml-examples/examples/deploy-to-heroku/#pipeline-example-2-deploy-a-docker-image-to-heroku)).

## The Example Django Application

You can find the example project on [Github](https://github.com/codefresh-contrib/heroku-python-django-sample-app).

The repository contains a Django starter project with the following commands:

- `pip install -r requirements.txt` to  install dependencies.
- `python -m unittest composeexample.utils` runs unit tests.
- `python manage.py runserver 0.0.0.0:8000` to start the application locally.

Once launched the application presents the Django starter page at localhost:8000.

## Pipeline Example #1: Deploying Source Code to Heroku Using the Codefresh Heroku Plugin

### Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A [free Heroku account](https://signup.heroku.com)
- A Heroku API token (you can find this under **Account Settings** and then scrolling down, you will find the API Key)

### Create the Pipeline 

This pipeline will have three stages: clone, test, and deploy.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/heroku-deployer-pipeline.png" 
url="/images/examples/deployments/heroku-deployer-pipeline.png" 
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor of the Codefresh UI.  It will automatically clone the project for you.

Note that you need to change the environment variables in the deploy stage to your respective values.  You can do this directly [in the YAML itself]({{site.baseurl}}/docs/how-to-guides/migrating-from-travis-ci/#environment-variables), or through the Codefresh UI.  Navigate to the in-line editor, and to the right you will find a tab lebeled **Variables**.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/heroku-deployer-variables2.png" 
url="/images/examples/deployments/heroku-deployer-variables2.png" 
alt="Codefresh UI Pipeline Variables View"
caption="Codefresh UI Pipeline Variables View"
max-width="100%" 
%}

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
 - clone
 - test
 - deploy
steps:
  clone:
    title: "Cloning main repository..."
    stage: "clone"
    type: "git-clone"
    arguments:
      repo: "codefresh-contrib/heroku-python-django-sample-app"
      revision: "master"
      git: "github"
  run_unit_tests:
     title: "Running unit tests..."
     stage: "test"
     type: "freestyle"
     working_directory: "${{clone}}"
     arguments:
       image: "python:3.6-slim"
       commands:
         - "pip install -r requirements.txt --cache-dir=/codefresh/volume/pip-cache"
         - "python -m unittest composeexample.utils"
  deploy_to_heroku:
    title: "Deploying to Heroku..."
    stage: "deploy"
    type: "heroku-deployer"
    arguments:
      APP_NAME: $APP_NAME
      EMAIL: $EMAIL
      API_TOKEN: $API_TOKEN
{% endraw %}
{% endhighlight %}

The above pipeline does the following:

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that installs dependencies and runs the unit tests
3. A freestyle step that deploys the application to Heroku using the heroku-deployer plugin from the [Step Marketplace](https://codefresh.io/steps/step/heroku-deployer)

## Pipeline Example #2: Deploy a Docker Image to Heroku

This example differs from the plugin usage, as it will deploy a built Docker image to Heroku.

Note that you need to change the environment variables to your respective values.  You can do this directly [in the YAML itself]({{site.baseurl}}/docs/how-to-guides/migrating-from-travis-ci/#environment-variables), or through the Codefresh UI.  Navigate to the in-line editor, and to the right you will find a tab lebeled **Variables**.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/heroku-deployer-variables.png" 
url="/images/examples/deployments/heroku-deployer-variables.png" 
alt="Codefresh UI Pipeline Variables View"
caption="Codefresh UI Pipeline Variables View"
max-width="100%" 
%}

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A [free Heroku account](https://signup.heroku.com)
- An empty repository already created in Heroku using the `heroku create <IMAGE_NAME>` command
- A Heroku registry [connected to Codefresh]({{site.baseurl}}/docs/docker-registries/external-docker-registries/other-registries/#heroku-registries)
- A Heroku API token (you can find this under **Account Settings** and then scrolling down, you will find the API Key)

### Create the Pipeline 

This pipeline will have five stages: clone, build, test, push, and release.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/heroku-vanilla-push-pipeline.png" 
url="/images/examples/deployments/heroku-vanilla-push-pipeline.png" 
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor of the Codefresh UI.  It will automatically clone the project for you.

`codefresh-heroku-push-image.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
version: '1.0'
stages:
 - clone
 - build
 - test
 - push
 - release
steps:
  clone:
    title: "Cloning main repository..."
    stage: "clone"
    type: "git-clone"
    arguments:
      repo: "codefresh-contrib/heroku-python-django-sample-app"
      revision: "master"
      git: "github"
  build:
    title: "Building Docker Image..."
    stage: "build"
    type: "build"
    working_directory: "./heroku-python-django-sample-app"
    arguments: 
      image_name: "${{IMAGE_NAME}}"
      tag: "master"
      dockerfile: "Dockerfile"
  run_unit_tests:
     title: "Running unit tests..."
     stage: "test"
     type: "freestyle"
     working_directory: "./heroku-python-django-sample-app"
     arguments:
       image: '${{build}}'
       commands:
         - "python -m unittest composeexample.utils"
  push_image:
    title: "Pushing image to Heroku..."
    stage: "push"
    type: "push"
    arguments:
      candidate: '${{build}}'
      image_name: "${{IMAGE_NAME}}/web"
      registry: "heroku"
  release_image:
    title: "Releasing image..."
    stage: "release"
    type: "freestyle"
    arguments:
      image: "nazarcodefresh/heroku-cli:alpine"
      commands:
        - >-
          printf "machine api.heroku.com\n  login $EMAIL\n  password
          $API_TOKEN\nmachine git.heroku.com\n  login $EMAIL\n  password
          $API_TOKEN\n" > ~/.netrc
        - "heroku container:release --app $IMAGE_NAME web"
{% endraw %}
{% endhighlight %}

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that builds our Docker image
3. A freestyle step that runs unit tests on our Docker image
3. A [push]({{site.baseurl}}/docs/codefresh-yaml/steps/push/) step that pushes to the Heroku registry
4. A freestyle step that releases the Docker image


## What to Read Next

- [Git-clone Step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
- [Push Step]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)
