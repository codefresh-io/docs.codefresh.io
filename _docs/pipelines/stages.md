---
title: "Grouping steps into stages"
description: "Group steps in pipelines for better visualization"
group: pipelines
redirect_from:
  - /docs/pipelines/stages/
  - /docs/codefresh-yaml/stages/
toc: true
---

With Codefresh you can [create really complex pipelines]({{site.baseurl}}/docs/pipelines/pipelines/) with any number of steps. 

To better visualize the pipeline, you can group several steps into a single _stage_. The _stage_ with the group of steps is displayed as a separate column in the [pipeline view]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/stages/complex-pipeline.png" 
url="/images/pipeline/codefresh-yaml/stages/complex-pipeline.png"
alt="Complex pipeline" 
caption="Complex pipeline"
max-width="70%"
%}

In this example, the pipeline has four stages.

## Assigning steps to a stage

Stages are completely optional, and for really small pipelines they are not needed at all.
By default, all pipeline steps are shown one after the other.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/stages/linear-view.png" 
url="/images/pipeline/codefresh-yaml/stages/linear-view.png"
alt="Default pipeline view" 
caption="Default pipeline view"
max-width="50%"
%}

This view works ok for small pipelines, but for a big number of steps it is better to group them into pipeline *stages* like shown below:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/stages/example.png" 
url="/images/pipeline/codefresh-yaml/stages/example.png"
alt="Different pipeline stages" 
caption="Different pipeline stages"
max-width="80%"
%}

The number of stages (i.e columns) and their titles is completely configurable. 
To enable this view, you need to make two modifications at the `codefresh.yml` file:

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

1. To list all the stage names at the root of the pipeline file 
1. To use the `stage` property on each step to assign it to a stage

>This updated pipeline view affects only the visualization of the pipeline. It does not affect the order of step execution. Steps are still executed in the same order as listed in the `codefresh.yml` file.   
  If you wish to use parallel execution and advanced workflows see the [parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/) page.


## Example pipeline with several stages

Here is a more concrete example that you can use as a starting point:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
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
{% endraw %}                
{% endhighlight %}

If you run the pipeline you will see this view

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/stages/complex.png" 
url="/images/pipeline/codefresh-yaml/stages/complex.png"
alt="Complex Pipeline view" 
caption="Complex Pipeline view"
max-width="80%"
%}

Remember that the assignment of a step to a stage is happening only for graphical grouping purposes. It does
not affect the way your steps run. All steps will still run in the same order mentioned in the `codefresh.yml` file.

Also notice if you enable this view a stage called *default* will show all build steps that are not explicitly assigned to a stage.

## Using spaces in stage names

If you wish to have spaces in stage names you need to quote them like this:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
- 'my build phase'
- 'my test phase'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    stage: 'my build phase'
    type: build
    image_name: my-app
    dockerfile: Dockerfile
  MyUnitTests:
    title: Unit testing
    stage: 'my test phase'
    image: ${{MyAppDockerImage}}
    commands: 
    - npm run test
{% endraw %}
{% endhighlight %}


## Related articles
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Parallel workflows]({{site.baseurl}}/docs/pipelines/advanced-workflows/)
