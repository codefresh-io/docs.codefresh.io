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

  `Text`
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

>This updated pipeline view is only a nice way to visualize the pipeline. It does not affect the order of step execution. Steps will still execute in the same order listed in the `codefresh.yml` file.

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







