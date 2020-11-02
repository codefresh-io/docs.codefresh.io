---
title: "Hooks"
description: "Execute commands before/after each pipeline or step"
group: codefresh-yaml
toc: true
---

Pipeline hooks allow you to run specific actions at the end and the beginning of the pipeline as well as before/after a step.

## Pipeline hooks

Codefresh allows you to run a specific step before each pipeline as well as after it has finished. Each hook is similar to a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) as you need to define:

1. A Docker image that will be used to run specific commands
1. One or more commands to run within the context of that Docker image.

For simple commands we suggest you use a small image such as `alpine`, but any Docker image can be used in hooks.

### Running a step at the end of the pipeline

You can easily run a step at the end of pipeline, that will execute even if one of the steps have failed (and thus the pipeline is stopped in middle):

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

In the example above we define a hook for the whole pipeline that will run a step (the `exec` keyword) inside `alpine:3.9` and will simply execute an `echo` command. Because we have used the `on_finish` keyword, this step will execute even if the whole pipeline fails.

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

Apart from the `on_finish` keyword you can also use `on_success` and `on_fail` if you want the step to only execute according to a specific result of the pipeline. It is also possible to use multiple hooks at the same time:

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

Note that if you have multiple hooks like the example above, the `on_finish` segment will always execute after any `on_success`/`on_fail` segments (if they are applicable).


### Running a step at the start of the pipeline

Similar to the end of the pipeline, you can also execute a step in the beginning of the pipeline with the `on_elected` keyword:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks: 
 on_elected:
   exec:
     image: alpine:3.9
     commands:
       - echo "Creating an adhoc test environment"
 on_finish:
   exec:
     image: alpine:3.9
     commands:
       - echo "Destroying test environment"
steps:
  step1:
    title: "Step 1"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Running Integration tests on test environment"
  step2:
    title: "Step 2"
    type: "freestyle" 
    image: node:10-buster
    commands:
      - echo "Running acceptance tests on test environment"

{% endraw %}
{% endhighlight %}

All pipeline hooks will be shown in the "initializing process" logs:

 {% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/hooks/before-pipeline.png" 
url="/images/codefresh-yaml/hooks/before-pipeline.png" 
alt="Hooks before a pipeline" 
caption="Hooks before a pipeline" 
max-width="80%" 
%}

It is possible to define all possible hooks (`on_elected`, `on_finish`, `on_success`, `on_fail`) in a single pipeline, if this is required by your development process.

## Step hooks

Hooks can also be defined for individual steps inside a pipeline. This capability allows for more granular control on defining prepare/cleanup phases for specific steps. 

The syntax for step hooks is the same as pipeline hooks (`on_elected`, `on_finish`, `on_success`, `on_fail`), you just need to put the respective segment under a step instead of the root of the pipeline.

For example, this pipeline will always run a cleanup step after integration tests (even if the tests themselves fail).

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  step1:
    title: "Compile application"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Building application"
  step2:
    title: "Unit testing"
    type: "freestyle" 
    image: node:10-buster
    commands:
      - echo "Running unit tests"
    hooks:
      on_finish:
        exec:
          image: alpine:3.9
          commands:
          - echo "Create test report"
  step3:
    title: "Uploading artifact"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Upload to artifactory"
{% endraw %}
{% endhighlight %}


Logs for steps hooks are shown in the log window of the step itself.

 {% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/hooks/step-after.png" 
url="/images/codefresh-yaml/hooks/step-after.png" 
alt="Hooks before a pipeline" 
caption="Hooks before a pipeline" 
max-width="80%" 
%}

As with pipeline hooks, it is possible to define multiple hook conditions for each step.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  step1:
    title: "Compile application"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Building application"
  step2:
    title: "Security scanning"
    type: "freestyle" 
    image: node:10-buster
    commands:
      - echo "Running Security scan"
    hooks:
      on_elected:
        exec:
          image: alpine:3.9
          commands:
          - echo "Authenticating to security scanning service"    
      on_finish:
        exec:
          image: alpine:3.9
          commands:
          - echo "Uploading security scan report"
      on_fail:
        exec:
          image: alpine:3.9
          commands:
          - echo "Sending slack notification"          

{% endraw %}
{% endhighlight %}

The order of events in the example above is the following.

1. The `on_elected` segment executes first (authentication)
1. The step itself executes (the security scan)
1. The `on_fail` segment executes (only if the step throws an error code)
1. The `on_finish` segment always executes at the end


## Controlling errors inside pipeline/step hooks

By default if a step fails within a pipeline, the whole pipeline will stop and be marked as failed. This is also true for `on_elected` segments as well. If they fail, then the whole pipeline will fail (regardless of the position of the segment in a pipeline or step).

For example the following pipeline will fail right away, because the pipeline hook fails at the beginning.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks: 
 on_elected:
   exec:
     image: alpine:3.9
     commands:
       - echo "failing on purpose"
       - exit 1 
steps:
  step1:
    title: "Step 1"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Running Integration tests on test environment"
{% endraw %}
{% endhighlight %}

You can change this behavior by using the existing [fail_fast property]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#execution-flow) inside an `on_elected` hook.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks: 
 on_elected:
   exec:
     image: alpine:3.9
     fail_fast: false
     commands:
       - echo "failing on purpose"
       - exit 1 
steps:
  step1:
    title: "Step 1"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Running Integration tests on test environment"
{% endraw %}
{% endhighlight %}

This pipeline will now execute successfully and `step1` will still run as normal, because we have used the `fail_fast` property. You can also use the `fail_fast` property on step hooks as well:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  step1:
    title: "Step 1"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Running Integration tests on test environment"
    hooks: 
     on_elected:
       exec:
         image: alpine:3.9
         fail_fast: false
         commands:
         - echo "failing on purpose"
         - exit 1 
{% endraw %}
{% endhighlight %}


>Notice that the `fail_fast` property is only available for `on_elected` hooks. The other types of hooks (`on_finish`, `on_success`, `on_fail`) do not affect the outcome of the pipeline in any way. Even if they fail, the pipeline will continue running to completion. This behavior is not configurable.


## Using multiple steps for hooks

In all the previous examples, each hook was a single step running on a single Docker image. You can also define multiple steps for each hook. This is possible by inserting an extra `steps` keyword inside the hook and listing multiple Docker images under it:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks: 
 on_finish:
   steps:
     mycleanup:
       image: alpine:3.9
       commands:
         - echo "echo cleanup step"
     mynotification:
       image: cloudposse/slack-notifier
       commands:
         - echo "Notify slack"
steps:
  step1:
    title: "Step 1"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Running Integration tests on test environment"
{% endraw %}
{% endhighlight %}

By default all steps in a single hook segment are executed one after the other. But you can also run them in [parallel]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/#inserting-parallel-steps-in-a-sequential-pipeline):

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  step1:
    title: "Compile application"
    type: "freestyle"
    image: node:10-buster
    commands:
      - echo "Building application"
  step2:
    title: "Unit testing"
    type: "freestyle" 
    image: node:10-buster
    commands:
      - echo "Running Integration tests"
      - exit 1 
    hooks:
      on_fail:
        mode: parallel
        steps:
          upload-my-artifact:
            image: maven:3.5.2-jdk-8-alpine
            commands:
            - echo "uploading artifact" 
          my-report:
            image: alpine:3.9
            commands:
            - echo "creating test report" 
{% endraw %}
{% endhighlight %}

You can use multiple steps in a hook in both the pipeline and the step level. 


## Using annotations and labels in hooks

The hook syntax can also be used as a unified interface for encompassing the existing syntax of [build annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/) and [metadata]({{site.baseurl}}/docs/codefresh-yaml/docker-image-metadata/).

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks: 
 on_elected:
   exec:
     image: alpine:3.9
     commands:
       - echo "Creating an adhoc test environment"
   annotations:
     set:
        - entity_type: build
          annotations:
          - my_annotation_example1: 10.45
          - my_string_annotation: Hello World
steps:
  clone:
    title: Cloning source code
    type: git-clone
    arguments:
      repo: 'codefresh-contrib/golang-sample-app'
      revision: master
  build-image:
    type: build
    image_name: my-golang-image
    working_directory: '${{clone}}'
    tag: master
    hooks:
      on_success:
        exec:
          image: alpine:3.9
          commands:
            - echo "Scanning docker image"
        metadata: # setting metadata
          set:
           - '${{build-image.imageId}}':
               - status: 'Success'       
{% endraw %}
{% endhighlight %}

Note however, that if you decide to use annotations and metadata inside hooks, you cannot mix and max the old syntax with the new syntax.

The following pipeline is **NOT** valid:

`invalid-codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
 test:
   image: alpine
   on_success: # you cannot use old style together with hooks
     annotations:
       set:
         - entity_type: build
           annotations:
             - status: 'success'
   commands:
     - echo block
   hooks:
     on_success:
       annotations:
         set:
           - entity_type: build
             annotations:
               - status: 'success'  
{% endraw %}
{% endhighlight %}

The pipeline is not correct, because the first segment of annotations is directly under `on_success` (the old syntax), while the second segment is under `hooks/on_success` (the new syntax).


## Syntactic sugar syntax

To simplify the syntax for hooks, the following simplifications are also offered:

If you do not want to use metadata or annotations in your hook the keyword `exec` can be omitted:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks:
 on_finish:  # no exec keyword
   image: notifications:master
   commands:
     - ./send_workflow_finished.js
steps:
 build:
   type: build
   image_name: my_image
   tag: master
   hooks:
     on_fail: # no exec keyword
       image: notifications:master
       commands:
         - ./send_build_failed.js
{% endraw %}
{% endhighlight %}


If you do not want to specify the Docker image you can simply omit it. Codefresh will use the `alpine` image in that case to run the hook:


 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks:
 on_elected: 
  exec: # no image keyword - alpine image will be used
    - cf_export IMAGE_NAME=test
steps:
 build:
   type: build
   image_name: my_image
   tag: master
   hooks:
     on_success: # no image keyword - alpine image will be used
       exec:
         - echo ${IMAGE_NAME} was built successfully
       annotations:
         set:
           - entity_type: build
             annotations:
               - status: 'Success'
{% endraw %}
{% endhighlight %}


 If you don't use metadata or annotations, you can also completely remove the `exec` keyword and just mention the commands you want to run (`alpine` image will be used by default):

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
hooks:
 on_elected:  # no exec/image keyword - alpine image will be used
   - cf_export IMAGE_NAME=test
steps:
 build:
   type: build
   image_name: my_image
   tag: master
   hooks:
     on_success: # no exec/image keyword - alpine image will be used
       - echo ${IMAGE_NAME} was built successfully
{% endraw %}
{% endhighlight %}


## Variable Interpolation in hook segments

[Codefresh variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) are **not** interpolated inside the main hook segments.

The following will NOT work:

{% highlight yaml %}
{% raw %}
hooks:
  on_finish:
    exec:
      image: alpine:latest
      commands:
      - echo $CF_BUILD_ID
{% endraw %}
{% endhighlight %}    

However, you can use interpolations inside the `environment` block. The following WILL work:


{% highlight yaml %}
{% raw %}
hooks:
  on_finish:
    exec:
      image: alpine:latest
      environment:
      - "WCF_BUILD_ID=$CF_BUILD_ID"
      commands:
      -  echo ${WCF_BUILD_ID}
{% endraw %}
{% endhighlight %}  

In other words, interpolation in the 'environment' block works just fine. And you can use the environment variables set there in the commands block.

There is one MAJOR caveat. This only works for variables present when the build starts. It does NOT work for any variables created or modified in the pipeline _while it runs_. So basically the `CF_*` variables and anything sent in by the pipeline or trigger settings will work as expected, but custom variables created with `cf_export` will not work.


## Limitations of pipeline/step hooks

With the current implementation of hooks, the following limitations are present:

* The [debugger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/debugging-pipelines/) cannot inspect commands inside hook segments
* Hooks are not supported for [parallel steps]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)
* You cannot use [Codefresh plugins]({{site.baseurl}}/docs/codefresh-yaml/steps/#creating-your-own-step) inside hook segments



## What to read next

* [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/)
* [Condition Expression Syntax]({{site.baseurl}}/docs/codefresh-yaml/condition-expression-syntax/)
* [Working Directories]({{site.baseurl}}/docs/codefresh-yaml/working-directories/)
* [Annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/)


