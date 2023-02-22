---
title: "Fan-out-fan-in pipeline"
description: "Use parallel mode to fan-in and fan-out your step dependencies"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/yaml-examples/examples/fan-in-fan-out/
toc: true
---

In pipelines, the concept of fan-in/fan-out is depicted in the diagram below.  This pipeline offers parallel sub-flows within the same pipeline.  Fan-out refers to spreading a task to multiple destinations in parallel, and fan-in is the opposite, where we spread multiple tasks to the same destination.

{% include image.html 
lightbox="true" 
file="/images/examples/unit-tests/parallel-pipeline-examples.png" 
url="/images/examples/unit-tests/parallel-pipeline-examples.png" 
alt="parallel pipeline diagraam"
caption="Parallel Mode Diagram"
max-width="100%" 
%}

As you can see in the diagram, Step1 fans out to Step2 and Step4 (which run in parallel), while Step3 and Step4 fan-in to Step5.

You can achieve parallelism in your Codefresh pipelines by using the following:

- Simple parallel jobs ([inserting parallel steps into a sequential pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/#inserting-parallel-steps-in-a-sequential-pipeline))
- [Full parallel mode]({{site.baseurl}}/docs/pipelines/advanced-workflows/#parallel-pipeline-mode)
- Fan-out/fan-in parallel pipelines, as described in this article

## Prerequisites

- A [Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/)

## Example project

You can find the example Spring boot application on [GitHub](https://github.com/codefresh-contrib/fan-out-fan-in-sample-app.git){:target="\_blank"}.  It is a simple Hello World application with several different types of tests we will use to run using Codefresh's parallel mode.

## Create the pipeline

Our pipeline will have five stages: setup, start, web-tests, smoke, and end:

{% include image.html 
lightbox="true" 
file="/images/examples/unit-tests/fan-in-fan-out-pipeline.png" 
url="/images/examples/unit-tests/fan-in-fan-out-pipeline.png" 
alt="fan-in-fan-out UI pipeline view"
caption="Codefresh UI Pipeline View"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor in the Codefresh UI.  It will automatically clone the project for you.

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

>Note the special use of `mode: parallel` declared at the root of our yaml.  This syntax makes the pipeline use the full parallel mode. 
The order of your build steps doesn't matter in this case, each step is executed according to its [condition]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/).

- Step1 (unit tests) fans out to Step2 and Step4 (web tests), which run in parallel
- Step3 (smoke tests) does not execute until Step2 is completed
- Step3 and Step4 fan in to the final step, Step5 (integration tests)

This pipeline does the following:

1. Clones the main repository through a [Git-clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
2. Builds the cloned source code into a Docker image through a [build step]({{site.baseurl}}/docs/pipelines/steps/build/).
3. Runs [freestyle steps]({{site.baseurl}}/docs/pipelines/steps/freestyle/) that:
  - Run unit tests according to their respective @Tags
  - Use the image built in the second step as a [service container]({{site.baseurl}}/docs/pipelines/service-containers/)
 
## Related articles
[CI pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Parallel pipeline mode]({{site.baseurl}}/docs/pipelines/advanced-workflows/#parallel-pipeline-mode)  

