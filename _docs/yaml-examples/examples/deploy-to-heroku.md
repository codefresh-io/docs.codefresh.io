---
title: "Deploy to to Heroku"
description: "Deploying your application or image to Heroku"
group: yaml-examples
sub_group: examples
toc: true
---

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A [free Heroku account](https://signup.heroku.com)

## The Example Django Application

You can find the example project on [Github](https://github.com/codefresh-contrib/heroku-python-django-sample-app).

The repository contains a Django starter project with the following commands:

- `pip install -r requirements.txt` to  install dependencies.
- `python -m unittest composeexample.utils` runs unit tests.
- `python manage.py runserver 0.0.0.0:8000` to start the application locally.

Once launched the application presents the Django starter page at localhost:8000.

## Pipeline Example #1: Deploying Source Code to Heroku Using the Codefresh Heroku Plugin

### Prerequisites

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

Note that you need to change the environment variables under the `deploy` step to your respective values.  You can do this directly in the YAML itself, or through the Codefresh UI.  Navigate to the in-line editor, and to the right you will find a tab lebeled **Variables**.

{% include image.html 
lightbox="true" 
file="/images/examples/deployments/heroku-deployer-variables.png" 
url="/images/examples/deployments/heroku-deployer-variables.png" 
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
3. A freestyle step that deploys the application to Heroku using the heroku-deployer plugin from the [Step Marketplace]()

## Pipeline Example #2: Deploy a Docker Image to Heroku

This example differs from the plugin usage, as it will deploy a built Docker image to Heroku.

## Prerequisites

- A empty repository already created in Heroku using the `heroku create <IMAGE_NAME>` command
- A Heroku registry [connected to Codefresh]({{site.baseurl}}/docs/docker-registries/external-docker-registries/other-registries/#heroku-registries)

### Create the Pipeline 

This pipeline will have four stages: clone, build, test, and push.

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




## What to Read Next

- [Git-clone Step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
