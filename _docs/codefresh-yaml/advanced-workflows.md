---
title: "Advanced Workflows with Parallel steps"
description: "Learn how to create complex workflows in Codefresh with step dependencies"
group: codefresh-yaml
toc: true
---

Codefresh is very flexible when it comes to pipeline complexity and depth. You can easily create

 * Sequential pipelines where step order is same as the listing order in yaml (simple)
 * Sequential pipelines that have some parallel parts (intermediate)
 * Parallel pipelines where step order is explicitly defined (advanced)

With the parallel execution mode you can define complex pipelines with fan-in/out configurations capable of matching even the most complicated workflows within an organization.

>Notice that in Codefresh parallel execution is unrelated with [stages]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#grouping-steps-with-pipeline-stages). Stages are only a way to visually organize your pipeline steps. The actual execution is independent from the visual layout in the logs view.

Before going any further make sure that you are familiar with the [basics of Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/).

Codefresh offers two modes of execution

1. Sequential mode (which is the default)
1. Parallel mode

## Sequential execution mode

The sequential mode is very easy to understand and visualize.

In Sequential mode the Codefresh execution engine starts from the first step defined at the top of the `codefresh.yml` file and executes all steps one by one going down to the end of the file. A step is either executed or skipped according to its conditions. The condition for each step is only examined **once**.

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
mode: sequential
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: sample-python-image
    working_directory: ./
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    image: ${{MyAppDockerImage}}
    commands: 
      - python setup.py test
{% endraw %}
{% endhighlight %}

Here we have two steps, one that creates a Docker image and a second one that runs unit tests inside it. The order of execution is the same order of the steps in the YAML file. This means that unit tests will always run after the Docker image creation.

Notice that the line `mode: sequential` is shown only for illustration purposes. Sequential mode is the default, and therefore this line can be omitted.

 
## Inserting parallel steps in a sequential pipeline

You don't have to activate parallel execution mode for the whole pipeline if only a part of it needs to run in parallel. Codefresh allows you insert a parallel phase inside a sequential pipeline with the following syntax

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  my_task1:
    title: My Task 1
    [...] 
  my_parallel_tasks:
    type: parallel
    steps:
      my_task2a:
        title: My Task 2A
        [...]
      my_task2b:
        title: My Task 2B
        [...]
  my_task3:
    title: My Task3
    [...]  
{% endraw %}
{% endhighlight %}


In this case tasks 2A and 2B will run in parallel. 
The step name that defines the parallel phase (`my_parallel_tasks` in the example above), is completely arbitrary. 

The final order of execution will be

1. Task 1
1. Task 2A and Task2B at the same time
1. Task 3

This is the recommended way to start using parallelism in your Codefresh pipelines and it will be enough for most scenarios that require parallelism.

### Example: pushing multiple docker images in parallel

Let's see an example where a Docker image is created and then we push it to more that one registries. This is a perfect candidate for parallelization. Here is the `codefresh.yml`

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
- build
- push
steps:
  MyAppDockerImage:
    title: Building Docker Image
    stage: 'build'
    type: build
    image_name: trivialgoweb
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    dockerfile: Dockerfile
  PushingToRegistries:
    type: parallel
    steps:
      jfrog_PushingTo_jfrog_BintrayRegistry:
        stage: 'push'
        type: push
        title: jfrog_Pushing To Bintray Registry
        candidate: ${{MyAppDockerImage}}
        tag: '${{CF_SHORT_REVISION}}'
        registry: bintray 
      PushingToGoogleRegistry:
        type: push
        stage: 'push'
        title: Pushing To Google Registry
        candidate: ${{MyAppDockerImage}}
        tag: '${{CF_SHORT_REVISION}}'
        registry: gcr
      PushingToDockerRegistry:
        type: push
        stage: 'push'
        title: Pushing To Dockerhub Registry
        candidate: ${{MyAppDockerImage}}
        tag: '${{CF_SHORT_REVISION}}'
        image_name: kkapelon/trivialgoweb
        registry: dockerhub  
{% endraw %}
{% endhighlight %}

The order of execution is the following

1. MyAppDockerImage ([build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build-1/))
1. jfrog_PushingTo_jfrog_BintrayRegistry, PushingToGoogleRegistry, PushingToDockerRegistry ([push steps]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/))

The pipeline view for this yaml file is the following.

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/parallel-push.png" 
url="/images/codefresh-yaml/parallel-push.png"
alt="Parallel Docker push" 
caption="Parallel Docker push"
max-width="80%"
%}

As you can see we have also marked the steps with [stages]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#grouping-steps-with-pipeline-stages) so that we get a visualization that matches the execution.


### Example: running multiple test suites in parallel

All types of steps can by placed inside a parallel phase. Another common use case would be the parallel execution of [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) for unit/integration tests.

Let's say that you have a Docker image with a Python back-end and a Javascript front-end. You could run both types of tests in parallel with the following yaml syntax:

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-full-stack-app
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    dockerfile: Dockerfile
  MyTestingPhases:
    type: parallel
    steps:
      my_back_end_tests:
        title: Running Back end tests
        image: ${{MyAppDockerImage}}
        commands: 
          - python setup.py test
      my_front_end_tests:
        title: Running Front End tests
        image: ${{MyAppDockerImage}}
        commands: 
          - npm test
{% endraw %}
{% endhighlight %}

Running different types of tests (unit/integration/load/acceptance) in parallel is a very common use case for parallelism inside an otherwise sequential pipeline.

### Shared Codefresh volume and race conditions

In any pipeline step, Codefresh automatically attaches a [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) that is used to transfer artifacts between steps. The same volume is also shared between steps that run in parallel.


Here is an example where two parallel steps are writing two files. After they finish execution we list the contents of the project folder.

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  WritingInParallel:
    type: parallel
    steps:
      writing_file_1:
        title: Step1A
        image: alpine
        commands: 
          - echo "Step1A" > first.txt
      writing_file_2:
        title: Step1B
        image: alpine
        commands: 
          - echo "Step1B" > second.txt
  MyListing:
    title: Listing of files
    image: alpine
    commands: 
          - ls    
{% endraw %}
{% endhighlight %}

The results from the `MyListing` step is the following:

```
first.txt   second.txt  
```

This illustrates the side effects for both parallel steps that were executed on the same volume.

>It is therefore your responsibility to make sure that steps that run in parallel place nice with each other. Currently Codefresh performs no conflict detection at all. If there are race conditions between your parallel steps (e.g multiple steps writing at the same files) the final behavior is undefined. It is best to start with a fully sequential pipeline and use parallelism in a gradual manner if you are unsure about the side effects of your steps

## Pipeline parallel mode

To activate parallel mode for the whole pipeline you need to declare it excplitily at the root of the codefresh.yml file:

```
version: '1.0'
mode: parallel
steps:
[...]
```

In Parallel mode, the order of steps inside the `codefresh.yml` is **not** affecting the order of execution at all. The Codefresh engine instead:

1. evaluates all steps conditions *at the same* time
2. executes those that have their requirements met
3. Starts over with the remaining steps

This means that in parallel mode the conditions of a step are evaluated **multiple times** as the Codefresh execution engine is trying to find which steps it should run next. This implication is very important when you try to understand the order of step execution.

### Single Step dependencies

### Multiple Step dependencies

### Example: workflow with multiple parallel phases

### Example: workflow with complex step dependencies

## Handling error conditions in a pipeline



