---
title: "Ruby"
description: "How to build a Ruby On Rails project in Codefresh"
group: learn-by-example
toc: true
---
Ruby on Rails is a very popular development framework that combines ease of use and a great amount of programming languages. In Codefresh, ROR projects behave like any other web application. You can easily build them, run [integration tests]({{site.baseurl}}/docs/testing/integration-tests/) and launch them on [demo environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/).

The example application is located at [https://github.com/codefresh-contrib/ruby-on-rails-sample-app](https://github.com/codefresh-contrib/ruby-on-rails-sample-app).


 
## Dockerize your Ruby on Rails project

The first step should be to write a [Dockerfile](https://github.com/codefresh-contrib/ruby-on-rails-sample-app/blob/master/Dockerfile) for your Rails project. As an example we will use the following:



`Dockerfile`
{% highlight docker %}
FROM ruby:2.3.1-slim

RUN apt-get update && \
    apt-get install -y build-essential libcurl4-openssl-dev libxml2-dev libsqlite3-dev libpq-dev nodejs postgresql-client sqlite3 --no-install-recommends && \ 
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

ENV APP_PATH /usr/src/app

RUN mkdir -p $APP_PATH

COPY Gemfile $APP_PATH
COPY Gemfile.lock $APP_PATH

WORKDIR $APP_PATH

RUN bundle install

COPY . $APP_PATH

ENV RAILS_ENV development

RUN bin/rake db:migrate 

RUN bin/rake assets:precompile

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]

{% endhighlight %}

Notice the order of commands and especially the fact that we copy the `Gemfile` on its own first, so that we take advantage of the Docker layer caching.

>Codefresh also supports multi-stage docker builds. You can use one parent docker image for preparing your gem modules and another one for actually deployment the application.

Once you have a Dockerfile, [creating a pipeline in Codefresh]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) is very easy either from the GUI or with the yaml syntax.

## Simple pipeline with Docker image and unit tests

A very simple pipeline is one that has only two steps:

1. We build the docker image
1. We run the tests inside the docker image that was just build

Here is the example [codefresh.yml](https://github.com/codefresh-contrib/ruby-on-rails-sample-app/blob/master/codefresh.yml) file.


`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: ruby-on-rails-sample-app
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    dockerfile: Dockerfile
  RunningUnitTests:
    title: Running Unit Tests
    image: '${{BuildingDockerImage}}'
    commands: 
      - rails db:migrate
      - rails test
{% endraw %}
{% endhighlight %}

The first step is a [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build-1/) named `BuildingDockerImage`. It reads the Dockerfile and creates a Docker image out of it. The second step is a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) called `RunningUnitTests`. It uses the image mentioned in the first step and executes custom commands inside it.


## Inspecting your Docker image

All Codefresh accounts come with a [built-in Docker registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/). Codefresh automatically pushes the last successful image of a pipeline to this internal registry.

You can see all your latest Docker artifacts by selecting *Images* from the left sidebar


{% include image.html 
lightbox="true" 
file="/images/learn-by-example/ruby/images.png" 
url="/images/learn-by-example/ruby/images.png" 
alt="Codefresh built-in Registry" 
caption="Codefresh built-in Registry" 
max-width="80%" 
%}

You can click on the image and get extra details. One of the tabs contains a visual explanation of the layers contained in the image. This view can be helpful when you are trying to make your Docker images smaller (which is a recommended practice)

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/ruby/layers.png" 
url="/images/learn-by-example/ruby/layers.png" 
alt="Ruby On Rails image filesystem layers" 
caption="Ruby On Rails Image filesystem layers" 
max-width="70%" 
%}

In Codefresh you can also use any other [external registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) such as Dockerhub, Azure, Google etc.


## Previewing the Ruby on Rails application in a Demo environment

Codefresh has the unique capability of launching Docker images within its infrastructure for a quick demonstration (e.g. to customers and colleagues). 

In the example Rails repository the default development "environment" is self-contained (it uses sqlite for a database). This makes it very easy to preview.

Launch the environment by clicking at the rocket icon in the images view.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/ruby/launch.png" 
url="/images/learn-by-example/ruby/launch.png" 
alt="Launching a demo environment" 
caption="Launching a demo environment" 
max-width="50%" 
%}

A new build will start. Once it is complete your new environment will be created. You can inspect it by clicking in the *Docker Swarm* menu on the left sidebar and then clicking *Environments*.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/ruby/environment.png" 
url="/images/learn-by-example/ruby/environment.png" 
alt="Inspecting a demo environment" 
caption="Inspecting a demo environment" 
max-width="70%" 
%}

Click the *Open App* icon on the right and your browser will open a new tab with the environment. 

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/ruby/preview.png" 
url="/images/learn-by-example/ruby/preview.png" 
alt="Previewing a demo environment" 
caption="Previewing a demo environment" 
max-width="50%" 
%}


You can share this link with other people in your team.

>Demo environments are not intended for production purposes. Use them only for quick feedback. They also shut-down automatically after a period of inactivity.



## What to read next

* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [On demand environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/)
* [Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)


