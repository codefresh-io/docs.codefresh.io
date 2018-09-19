---
title: "Ruby"
description: "How to build a Ruby On Rails project in Codefresh"
group: learn-by-example
toc: true
---
Ruby on Rails is a very popular development framework that combines ease of use and a great amount of programming languages. In Codefresh, ROR projects behave like any other web application. You can easily build them, run [integration tests]({{site.baseurl}}/docs/configure-ci-cd-pipeline/integration-tests/) and launch them on [demo environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/).

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

>Codefresh also supports multi-stage docker builds. So you can use one parent docker image for preparing your gem modules and another one for actually deployment the application.

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

## What to read next

* [Introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [On demand environments]({{site.baseurl}}/docs/getting-started/on-demand-environments/)
* [Integration tests]({{site.baseurl}}/docs/configure-ci-cd-pipeline/integration-tests/)


