---
title: "Hooks"
description: "Execute commands before/after each pipeline or step"
group: codefresh-yaml
toc: true
---

Pipeline hooks allow you to run specific actions at end and the beginning of the pipeline as well as before/after a step

## Pipeline hooks

Codefresh allows you to run a specific step before each pipeline as well as after it has finished. Each hook is similar to a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) as you need to define:

1. A Docker image that will be used to run specific commands
1. One or more commands to run within the context of that docker image.

For simple commands we suggest you use a small image such as alpine, but any Docker image can be used in hooks.

### Running a step at the end of the pipeline

You can easily run a step at end of pipeline, that will execute even if one of the steps have failed

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks: 
 on_finish:
   exec:
     image: alpine:3.9
     commands:
       - echo "cleanup after end of pipeline"

steps:
  step1:
    title: "Step 1"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Hello world"
  step2:
    title: "Step 2"
    type: "freestyle" 
    image: node:10-buster
    commands:
      - echo "There was an error"
      - exit 1   
{% endraw %}
{% endhighlight %}

In the example above we define a hook for the whole pipeline that will run a step (the `exec` keyword) inside `alpine:3.9` and will simply execute an `echo` command. Because we have used the `on_finish` keyword, this step will execute even if the pipeline fails.

This scenario is very common if you have a cleanup step or a notification step that you always want to run at the end of the pipeline. You will see the cleanup logs in the top pipeline step.

 {% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/hooks/cleanup-step.png" 
url="/images/codefresh-yaml/hooks/cleanup-step.png" 
alt="Running a cleanup step" 
caption="Running a cleanup step" 
max-width="80%" 
%}

Apart from the `on_finish` keyword you can also use `on_success` and `on_fail` if you want the step to only execute according to a specific workflow. It is also possible to use multiple hooks.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks: 
 on_finish:
   exec:
     image: alpine:3.9
     commands:
       - echo "cleanup after end of pipeline"
 on_success:
   exec:
     image: alpine:3.9
     commands:
       - echo "Send a notification only if pipeline was successful"
 on_fail:
   exec:
     image: alpine:3.9
     commands:
       - echo "Send a notification only if pipeline has failed"       

steps:
  step1:
    title: "Step 1"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Hello world"
  step2:
    title: "Step 2"
    type: "freestyle" 
    image: node:10-buster
    commands:
      - echo "There was an error"
      - exit 1 #Comment this line out to see how hooks change

{% endraw %}
{% endhighlight %}





### Running a step at the start of the pipeline

## Step hooks

## Using annotations and labels in hooks

## What to read next

* [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/)
* [Condition Expression Syntax]({{site.baseurl}}/docs/codefresh-yaml/condition-expression-syntax/)
* [Working Directories]({{site.baseurl}}/docs/codefresh-yaml/working-directories/)
* [Annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/)


