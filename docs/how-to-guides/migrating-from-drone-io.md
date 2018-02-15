---
layout: docs
title: "Migrating from Drone.io"
description: ""
group: how-to-guides
redirect_from:
  - /docs/migrating-from-droneio
  - /docs/migrating-from-droneio
toc: true
old_url: /docs/migrating-from-droneio
was_hidden: true
---

So, you’ve decided to try Codefresh? Welcome on board!

We’ll help you get up to speed with basic functionality such as: compiling, testing and building Docker images.

{{site.data.callout.callout_info}}
##### Repository

Fork this  [__repository__](https://github.com/codefreshdemo/demochat){:target="_blank"} to compare the Drone and Codefresh.
{{site.data.callout.end}}

## Looking .drone.yml file
In the root of this repository you'll find a file named `.drone.yml` this is Drone's build descriptor and it describes the different steps that comprise general process (build, publish, notify, etc). Let's quickly review the contents of this file:

  `.drone.yml`
{% highlight yaml %}
{% raw %}
pipeline:
  build:
    image: node:latest
    environment:
      - DEBUG=*
    commands:
      - npm install
      - npm install -g mocha
      - npm install -g istanbul
      - npm install -g gulp
      - npm install -g debug

  publish:
    image: plugins/docker
    repo: demochat
    username: ${DOCKERHUB_USERNAME}
    password: ${DOCKERHUB_PASSWORD}
    tags: [ "latest", "1.0" ]
    when:
      branch: master
      event: push

  slack:
    image: plugins/slack
    webhook: https://hooks.slack.com/services/...
    channel: drone
    username: drone
    template: >
      *{{ build.status }}* <{{ build.link }}|{{ repo.owner }}/{{ repo.name }}#{{ build.commit }}> ({{ build.ref }}) by {{ build.author }}
    when:
      event: [ push, pull_request ]
      status: [ success, failure ]
{% endraw %}
{% endhighlight %}

The screen with processes of drone you can see below

{% include image.html 
lightbox="true" 
file="/images/bf4623d-codefresh_drone_processes.png" 
url="/images/bf4623d-codefresh_drone_processes.png"
alt="codefresh_drone_processes.png"
max-width="40%"
%}

## Looking codefresh.yml file

In this file, we will look at on `build, freestyle, composition` steps to see how to use them to build, test and deploy your repository.
See more details about codefresh.yml steps [_here_]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:

  build_step:
    type: build
    dockerfile: Dockerfile
    image-name: demochat
    tag: ${{CF_BRANCH}}

  unit_tests:
    image: ${{build_step}}
    fail-fast: false
    commands:
      - npm install
      - gulp test

  integration_step:
    type: composition
    composition:
      version: '2'
      services:
        app:
          image: ${{build_step}}
          links:
            - mongo
          ports:
            - 5000
        mongo:
          image: mongo
    composition-candidates:
      main:
        image: nhoag/curl
        command: bash -c "sleep 30 && curl http://app:5000/" | echo 'works'

  deploy_to_ecs:
      image: codefresh/cf-deploy-ecs
      commands:
        - cfecs-update --image-name demochat --image-tag ${{CF_BRANCH}} eu-west-1 demochat-cluster demochat-webapp
      environment:
        - AWS_ACCESS_KEY_ID=${{AWS_ACCESS_KEY_ID}}
        - AWS_SECRET_ACCESS_KEY=${{AWS_SECRET_ACCESS_KEY}}
      when:
        branch:
          only:
            - master
{% endraw %}
{% endhighlight %}

The screen with processes of Codefresh build you can see below

{% include image.html 
lightbox="true" 
file="/images/9c12ebe-codefresh_processes.png" 
url="/images/9c12ebe-codefresh_processes.png"
alt="codefresh_processes.png"
max-width="40%"
%}

## Compare steps of Drone vs Codefresh
Let's take `build` and `publish` steps from `.drone.yml` and create the similar logic using `codefresh.yml` steps.

  `build step of .drone.yml`
{% highlight yaml %}
{% raw %}
  build:
    image: node:latest
    environment:
      - DEBUG=*
    commands:
      - npm install
      - npm install -g mocha
      - npm install -g istanbul
      - npm install -g gulp
      - npm install -g debug
{% endraw %}
{% endhighlight %}

In `build` step of codefresh.yml we just use `Dockerfile` with defined commands to create your docker image.

  `Dockerfile`
{% highlight docker %}
{% raw %}
FROM node:latest
RUN mkdir -p /src
WORKDIR /src
COPY package.json /src/

RUN npm install
RUN npm install -g mocha
RUN npm install -g istanbul
RUN npm install -g gulp
RUN npm install -g debug

COPY . /src
ENV DEBUG=*
CMD ["npm", "start"]
{% endraw %}
{% endhighlight %}

  `build step of codefresh.yml`
{% highlight docker %}
{% raw %}
# codefresh.yml
  build_step:
    type: build
    dockerfile: Dockerfile
    image-name: demochat
    tag: ${{CF_BRANCH}}
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Build step of codefresh.yml

More information about `build` step you can find [_here_]({{ site.baseurl }}/docs/codefresh-yaml/steps/build-1/). 
{{site.data.callout.end}}

The `publish` step of .drone.yml in codefresh.yml can be look like `push` step 

  `build step of codefresh.yml`
{% highlight docker %}
{% raw %}
push_to_dockerhub:
  type: push
  title: Step Title
  description: Free text description
  candidate: ${{build_step}}
  tag: latest
  credentials:
    username: ${DOCKERHUB_USERNAME}
    password: ${DOCKERHUB_PASSWORD}
  fail_fast: false
  when:
    branch:
      only: 
        - master
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Push step of codefresh.yml

More information about `push` step you can find [_here_]({{ site.baseurl }}/docs/codefresh-yaml/steps/push-1/). 
{{site.data.callout.end}}
