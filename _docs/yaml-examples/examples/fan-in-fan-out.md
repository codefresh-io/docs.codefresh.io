---
title: "Fan-in-fan-out Pipeline"
description: "Use parallel mode to fan-in and fan-out your step dependencies"
group: yaml-examples
sub_group: examples
toc: true
---

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)

## The Example Project

You can find the example Spring boot application on [Github](https://github.com/codefresh-contrib/fan-out-fan-in-sample-app.git).  It is a simple Hello World application that has several different types of tests we will be using to run using Codefresh's parallel mode.

## Create the Pipeline

Our pipeline will have five stages: setup, start, web-tests, smoke, and end:

{% include image.html 
lightbox="true" 
file="/images/examples/unit-tests/fan-in-fan-out-pipeline.png" 
url="/images/examples/unit-tests/fan-in-fan-out-pipeline.png" 
alt="fan-in-fan-out UI pipeline view"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

This pipeline offers parallel sub-flows in a single pipeline, as shown in the following diagram:

{% include image.html 
lightbox="true" 
file="/images/examples/unit-tests/parallel-pipeline-examples.png" 
url="/images/examples/unit-tests/parallel-pipeline-examples.png" 
alt="parallel pipeline diagraam"
caption="Parallel Mode Diagram"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor of the Codefresh UI.  It will automatically clone the project for you.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
mode: parallel
stages:
- setup
- start
- web-tests
- smoke
- end
steps:
  Clone: 
    title: Cloning main repository...
    stage: setup
    type: git-clone
    arguments:
      repo: codefresh-contrib/fan-out-fan-in-sample-app
      git: github
      revision: master
  Build_image:
    title: Building Docker Image...
    type: build
    stage: setup
    working_directory: ${{Clone}}
    arguments:
      image_name: spring-backend
      tag: latest
      dockerfile: Dockerfile 
      when:
        steps:
        - name: Clone
          on:
          - success 
  Step1:
    title: Running unit tests...
    stage: start
    working_directory: ${{Clone}}/complete
    arguments:
      image: maven:3.5.2-jdk-8-alpine
      commands:
        - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -Dgroups="unit" test
      when:
        steps:
        - name: Build_image
          on:
          - success
    services:
      composition:
        spring_backend:
          image: ${{Build_image}}
          ports:
            - 8080
  Step2:
    title: Running web mock test...
    stage: web-tests
    working_directory: ${{Clone}}/complete
    arguments:
      image: maven:3.5.2-jdk-8-alpine
      commands:
        - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -Dgroups="web-mock" test
      when:
            steps:
            - name: Step1
              on:
              - success
      services:
          composition:
            spring_backend:
              image: ${{Build_image}}
              ports:
                - 8080
  Step3:
    title: Running smoke test...
    stage: smoke
    working_directory: ${{Clone}}/complete
    arguments:
      image: maven:3.5.2-jdk-8-alpine
      commands:
        - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -Dgroups="smoke" test
      when:
        steps:
          - name: Step2
            on:
            - success
      services:
          composition:
            spring_backend:
              image: ${{Build_image}}
              ports:
                - 8080           
  Step4:
    title: Running web layer tests...
    stage: web-tests
    working_directory: ${{Clone}}/complete
    arguments:
      image: maven:3.5.2-jdk-8-alpine
      commands:
        - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -Dgroups="web-layer" test
      when:
        steps:
          - name: Step1
            on:
            - success
      services:
          composition:
            spring_backend:
              image: ${{Build_image}}
              ports:
                - 8080
  Step5:
    title: Running integration tests...
    stage: end
    working_directory: ${{Clone}}/complete
    arguments:
      image: maven:3.5.2-jdk-8-alpine
      commands:
        - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -Dgroups="integration" test
      when:
        steps:
          - name: Step3
            on:
            - success
          - name: Step4
            on:
            - success
      services:
          composition:
            spring_backend:
              image: ${{Build_image}}
              ports:
                - 8080
{% endraw %}
{% endhighlight %}

Note the special use of `mode: parallel` declared at the root of our yaml.  This syntax makes the pipeline use the full parallel mode. 
The order of your build steps doesn't matter in this case, each step is executed according to its [conditionals](https://codefresh.io/docs/docs/codefresh-yaml/conditional-execution-of-steps/).

- Step1 (unit tests) fans out to Step2 and Step4 (web tests), which run in parallel
- Step3 (smoke tests) does not execute until Step2 is completed
- Step3 and Step4 fan in to the final step, Step5 (integration tests)

This pipeline consists of the following:

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) that builds the cloned source code into a Docker image
3. 5 [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that:
  - Runs unit tests according to their respective @Tags
  - Uses the image built in the second step as a [Service container]({{site.baseurl}}/docs/codefresh-yaml/service-containers/)
 
## What to Read Next
 
 - [Git-clone Step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
 - [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
 - [Service Containers]({{site.baseurl}}//docs/codefresh-yaml/service-containers/) 
 - [Parallel Mode]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/#parallel-pipeline-mode)
