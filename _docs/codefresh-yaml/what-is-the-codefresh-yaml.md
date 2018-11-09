---
title: "Introduction"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/codefresh-yaml/
  - /docs/what-is-the-codefresh-yaml
  - /docs/what-is-the-codefresh-yaml/
toc: true
---

Codefresh offers its own built-in format for creating pipelines. The pipeline specification is
based on the YAML syntax allowing you to describe your pipelines in a completely declarative manner.

Using Codefresh yaml is the recommended way to [create pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).

## Simple example for codefresh.yml

Here is a very minimal example:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  build_image:
    type: build
    description: Building the image...
    image-name: myuser/myservice
    tag: develop # {% raw %}${{CF_BRANCH}}{% endraw %}

  perform_tests:
    image: node:5
    working_directory: {% raw %}${{main_clone}}{% endraw %}
    description: Performing unit tests...
    commands:
      - npm install gulp -g 
      - npm install
      - gulp unit_test
{% endhighlight %}

It contains two [steps]({{site.baseurl}}/docs/codefresh-yaml/steps/), one named *build_image* that creates a docker image, and another one called *perform_tests* that runs unit test with `gulp`.

If you want to know more about how steps work in Codefresh make sure to read [the introduction to Pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/) first, before moving on.

## Basic skeleton of a codefresh.yml file.

You can customize your build environment (pipeline) by using the Codefresh YAML file, ```codefresh.yml```. Codefresh uses the build specifications in the ```codefresh.yml``` file to execute your build. The ```codefresh.yml``` can be basic, or include intricate build specifications.

A YAML file is comprised of a series of steps that are executed in the order in which they are specified.

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'

steps:
  step-name:
    [step-contents]
  another-step:
    [step-contents]
  the-very-last-step:
    [step-contents]
{% endhighlight %}
 
You must define a step type for each step. Each step uses Docker images and containers as facilitators for execution. For example, the [**Freestyle**]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step spins up a container and executes the specified shell commands from the YAML file. 

Each step produces a resource, which you can reference in other steps, and are executed in real-time. For example, a [**Freestyle**]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step can reference an image that was produced by a [**Build**]({{site.baseurl}}/docs/codefresh-yaml/steps/build-1/) step. This allows you to chain steps together, and create highly-customized builds.

<div class="bd-callout bd-callout-info" markdown="1">
##### Variables

Steps chaining and referencing is possible due to implementation of variables in yml file - read more on relevant [section]({{site.baseurl}}/docs/codefresh-yaml/variables/)
</div>

{: .table .table-bordered .table-hover}
| Step Type                                                                                                         | Description                                    |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [Build]({{site.baseurl}}/docs/codefresh-yaml/steps/build-1/)                            | Builds a Docker image.                         |
| [Push]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/)                              | Pushes a Docker image to a Docker registry.    |
| [Git Clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)                      | That step not required and added automatically |
| [Composition]({{site.baseurl}}/docs/codefresh-yaml/steps/composition-1/)                | Start a finite Docker Composition.             |
| [Launch Composition]({{site.baseurl}}/docs/codefresh-yaml/steps/launch-composition-2/)  | Start a long term Docker composition           |
| [Freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)                      | Execute one or more shell commands.            |

To build your pipeline using a ```codefresh.yml``` file, in the General Settings section, toggle the ```Use YML build``` option to the **ON** position.

{% include image.html lightbox="true" file="/images/5c37025-Screen_Shot_2017-10-16_at_9.50.48_PM.png" url="/images/5c37025-Screen_Shot_2017-10-16_at_9.50.48_PM.png" alt="pipeline definition options" caption="Switching between the legacy build engine and the YAML build engine" max-width="40%" %}

## Execution flow

By default Codefresh will execute all steps in the yaml file and instantly fail the build, if any step
presents an error. To change this behavior add the `fail_fast:false` property in any step that you wish to be ignored
in case of errors. 

For example, if you have a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that runs integration tests, and you don't want the whole pipeline
to fail if any of the tests fail, add the `fail_fast` line to that step:

  
{% highlight yaml %}
perform_tests:
    image: node:9
    description: Running integration tests
    fail_fast: false
    commands:
      - gulp integration_test
{% endhighlight %}

Now the pipeline will continue to run even if the step `perform_tests` fails.

Notice also that by default Codefresh pipelines run in *sequential mode*. All steps will be executed one after
the other and in the same order as included in the `codefresh.yml` file.

If you wish to use parallel steps in your pipelines, see the [parallel steps]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) page.

## Retrying a step

Sometimes you want to retry a step that has a problem. Network hiccups, transient failures and flaky test environments are common problems that prevent pipelines from working in a predictable manner.

Codefresh allows you to retry any of your steps with the built-in syntax:

  `yaml`
{% highlight yaml %}
{% raw %}
step-name:
    [step-contents]
    retry:
      maxAttempts: 5
      delay: 5
      exponentialFactor: 2
{% endraw %}
{% endhighlight %}

The `retry:` block has the following parameters:

  * `maxAttempts` defines how many times this step will run again if there are execution errors. Default is 1.
  * `delay` is the number of seconds to wait before each attempt. Default is 5 seconds
  * `exponentialFactor` defines how many times the delay should be multiplied by itself after each attempt. default is 1

All parameters are optional. The exponentialFactor works like this:
* exponentialFactor=1, delay=5 => each time wait 5 seconds before trying again, no matter the number of attempts
* exponentialFactor=2, delay=5 => first retry will have a delay of 25 seconds, third will have 125 and so on


Here is a full example:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-own-app
    retry:
      maxAttempts: 2
  MyUnitTests:
    title: Running Unit tests
    image: ${{MyAppDockerImage}}
    commands:
    - ./my_unit_tests.sh
    retry:
      maxAttempts: 3
      delay: 5
  PushingToRegistry:
    type: push
    title: Pushing To Registry
    candidate: ${{MyAppDockerImage}}
    tag: '${{CF_BRANCH}}'
    retry:
      maxAttempts: 3
      delay: 3
      exponentialFactor: 2
{% endraw %}      
{% endhighlight %}

Notice that Codefresh also provides the following variables that allow you change your script/applications according to the retry attempts:

* `CF_CURRENT_ATTEMPT` contains the number of current retry attempt
* `CF_MAX_ATTEMPTS` contains all the number of total attempts defined

The retry mechanism is available for all kinds of [steps]({{site.baseurl}}/docs/codefresh-yaml/steps/).



## Grouping steps with pipeline stages

By default all pipeline steps are shown one after the other.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/yaml/linear-view.png" 
url="/images/pipeline/yaml/linear-view.png"
alt="Default pipeline view" 
caption="Default pipeline view"
max-width="50%"
%}

This view works ok for small pipelines, but for a big number of steps it is better to group them into pipeline *stages* like shown below:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/yaml/example.png" 
url="/images/pipeline/yaml/example.png"
alt="Different pipeline stages" 
caption="Different pipeline stages"
max-width="80%"
%}

The number of stages (i.e columns) and their titles is completely configurable. 
To enable this view you need to make two modifications at the `codefresh.yml` file:

Here is the skeleton:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
stages:
 - [stage-name-1]
 - [stage-name-2]

steps:
  step-name:
    [step-contents]
    stage: [name-of-stage]
  another-step:
    [step-contents]
    stage: [name-of-stage]
  the-very-last-step:
    [step-contents]
    stage: [name-of-stage]
{% endhighlight %}

As you can see the modifications needed are:

1. List all the stage names at the root of the pipeline file
1. Use the `stage` property on each step to assign it to a stage.

>This updated pipeline view is only a nice way to visualize the pipeline. It does not affect the order of step execution. Steps will still execute in the same order listed in the `codefresh.yml` file. If you wish to use parallel execution and advanced workflows see the [parallel steps]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) page.

Here is a more concrete example that you can use as a starting point:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
stages:
 - prepare
 - test
 - build
 - scan
 - integration
 - deploy
steps:
    step1:
        stage: 'prepare'
        image: node
        commands:
            - 'echo "Hello Step 1!"'
    step2:
       image: node
       stage: 'prepare'
       commands:
            - 'echo "Hello Step 2!"'
    step3:
        image: node
        stage: 'test'
        commands:
            - 'echo "Hello Step 3!"'
    step4:
        image: node
        stage: 'build'
        commands:
            - 'echo "Hello Step 4!"'
    step5:
        image: node
        stage: 'scan'
        commands:
            - 'echo "Hello Step 5!"'
    step6:
        image: node
        stage: 'scan'
        commands:
            - 'echo "Hello Step 6!"'
    step7:
        image: node
        stage: 'integration'
        commands:
            - 'echo "Hello Step 7!"'        
    step8:
        image: node
        stage: 'deploy'
        commands:
            - 'echo "Hello Step 8!"'    
    step9:
        image: node
        stage: 'deploy'
        commands:
            - 'echo "Hello Step 9!"'    
{% endhighlight %}

If you run the pipeline you will see this view

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/yaml/complex.png" 
url="/images/pipeline/yaml/complex.png"
alt="Complex Pipeline view" 
caption="Complex Pipeline view"
max-width="80%"
%}

Remember that the assignment of a step to a stage is happening only for graphical grouping purposes. It does
not affect the way your steps run. All steps will still run in the same order mentioned in the `codefresh.yml` file.

Also notice if you enable this view a stage called *default* will show all build steps that are not explicitly assigned to a stage.


## Using YAML anchors to avoid repetition

Codefresh also supports yaml anchors, references and extends. These allow you to keep
your pipeline [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

For example, let's say that you have two freestyle steps:

1. The first one fills a MySQL server with data
1. The second one runs integration tests that use the MySQL server

Here is the respective pipeline:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  preLoadDatabase:
    title: Loading Data
    image: alpine
    commands:
      - printenv
      - echo "Loading DB"
    environment: &my_common_envs
      - MYSQL_HOST=mysql
      - MYSQL_USER=user
      - MYSQL_PASS=password
      - MYSQL_PORT=3351  
  runTests:
    title: Integration tests
    image: alpine
    commands:
      - printenv
      - echo "Running tests"
    environment: *my_common_envs  # Same MYSQL_HOST, MYSQL_USER etc.
{% endhighlight %}   

Instead of repeating the same environment variables in both steps, we can create them once and then just reference them in the second step with the `*` character.

You also extend steps like below:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  deploy_to_k8_staging: &my_basic_deployment
    title: deploying to cluster
    type: deploy
    kind: kubernetes 
    cluster:  myStagingCluster
    namespace: sales
    service: my-python-app
  deploy_to_k8_prod: 
    <<: *my_basic_deployment
    cluster:  myProdCluster # only cluster differs, everything else is the same

{% endhighlight %}  

Here we deploy to two kubernetes clusters. The first step defines the staging deployment.
For the second step, we extend the first one and only change the name of the cluster
to point to production. Everything else (i.e. namespace and service ) are exactly the same.


## What to read next

* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/)
* [Advanced workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)







