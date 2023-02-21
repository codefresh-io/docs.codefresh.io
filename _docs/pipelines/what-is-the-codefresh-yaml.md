---
title: "Pipeline definitions YAML"
description: "How to define Codefresh pipelines in a declarative manner"
group: pipelines
redirect_from:
  - /docs/pipelines/what-is-the-codefresh-yaml/
  - /docs/codefresh-yaml/
  - /docs/what-is-the-codefresh-yaml
  - /docs/what-is-the-codefresh-yaml/
  - /docs/codefresh-yaml/working-directories/
  - /docs/working-directories/  
  - /docs/codefresh-yaml/what-is-the-codefresh-yaml/
toc: true
---

Codefresh offers its own built-in format for creating pipelines. The pipeline specification is
based on the YAML syntax allowing you to describe your pipelines in a completely declarative manner.

Using Codefresh YAML is the recommended way to [create pipelines]({{site.baseurl}}/docs/pipelines/pipelines/).

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

It contains two [steps]({{site.baseurl}}/docs/pipelines/steps/), one named *build_image* that creates a docker image, and another one called *perform_tests* that runs unit test with `gulp`.

If you want to know more about how steps work in Codefresh make sure to read [the introduction to pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/) first, before moving on.

## Basic pipeline syntax

You can customize your build environment (pipeline) by using the Codefresh YAML file, ```codefresh.yml```. Codefresh uses the build specifications in the ```codefresh.yml``` file to execute your build. The ```codefresh.yml``` can be basic or it can include intricate build specifications.

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
 
You must define a step type for each step, unless you are using a `freestyle` step. Each step uses Docker images and containers as facilitators for execution. For example, the **Freestyle** step spins up a container and executes the specified shell commands from the YAML file. 

The step names should be unique within the same pipeline. This mainly affects the visualization of the pipeline when it runs.

Each step produces a resource, which you can [reference](https://github.com/codefresh-contrib/python-flask-sample-app/blob/master/codefresh.yml#L23){:target="\_blank"} in other steps, and are executed in real-time. For example, a `freestyle` step can reference an image that was produced by a `build`({{site.baseurl}}/docs/pipelines/steps/build/) step. This allows you to chain steps together and create highly-customized builds.


##### Variables

Steps chaining and referencing is possible due to implementation of variables in the YAML file - read more on relevant [section]({{site.baseurl}}/docs/pipelines/variables/).


{: .table .table-bordered .table-hover}
| Step Type                                                                                                         | Description                                    |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [Freestyle]({{site.baseurl}}/docs/pipelines/steps/freestyle/)                      | Executes one or more shell commands in a container similar to `docker run`.            |
| [Build]({{site.baseurl}}/docs/pipelines/steps/build/)                            | Builds a Docker image like `docker build`.                         |
| [Push]({{site.baseurl}}/docs/pipelines/steps/push/)                              | Pushes a Docker image to an external registry similar to `docker tag` and `docker push`. |
| [Git Clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/)                      | Overrides the default git clone behavior. |
| [Composition]({{site.baseurl}}/docs/pipelines/steps/composition/)                | Starts a Docker Composition like `docker-compose`. Discarded once pipelines finishes.             |
| [Launch Composition]({{site.baseurl}}/docs/pipelines/steps/launch-composition/)  | Starts a long term Docker composition that stays up after the end of the pipeline.        |
| [Deploy]({{site.baseurl}}/docs/pipelines/steps/deploy/)  | Deploys to Kubernetes clusters.         |
| [Approval]({{site.baseurl}}/docs/pipelines/steps/approval/)  | Pauses a pipeline and waits for human intervention.          |


For more information on creating your own step, see the [Steps in piplines]({{site.baseurl}}/docs/pipelines/steps/).

You can also see the [complete YAML specification]({{site.baseurl}}/docs/integrations/codefresh-api/#full-pipeline-specification) supported for pipelines. Note however that several fields are only accessible by using the [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api) or [CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} .

## YAML validation

If you are editing Codefresh yaml within the Codefresh UI, the editor will automatically highlight errors as they happen.

This allows you to make quick edits (and possibly run some builds) straight from the GUI. Once you are happy with your pipeline you should commit it to your repository as `codefresh.yml` (pipeline as code).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/inline-editor.png" 
url="/images/pipeline/codefresh-yaml/inline-editor.png"
alt="Graphical Inline Yaml Editor" 
caption="Graphical Inline Yaml Editor"
max-width="50%"
%}

You can also validate the pipeline yaml outside of the UI by using the Codefresh CLI. The CLI has a [validate parameter](https://codefresh-io.github.io/cli/validation/){:target="\_blank"}  that can check one or more files for syntax errors.

{% highlight shell %}
{% raw %}
$ codefresh validate codefresh.yml
Yaml not valid:
  - "invalid-property" is not allowed
{% endraw %}
{% endhighlight %}


For more information on where the YAML file can be stored, see [creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/).


## Execution flow

By default, Codefresh will execute all steps in the yaml file and instantly fail the build, if any step
presents an error. To change this behavior add the `fail_fast:false` property in any step that you wish to be ignored
in case of errors. 

For example, if you have a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) that runs integration tests, and you don't want the whole pipeline
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

If you wish to use parallel steps in your pipelines, see the [parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/) page.

## Working directories

In the context of a step, a working directory can be of the following type:

{: .table .table-bordered .table-hover}
| Working Directory   | Description      |
| --------------------- | -------------------------------------------- |
| Empty                 | Defaults to the [Codefresh volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) (found at `/codefresh/volume`). If there is a [git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) with the special name `main_clone` then the default working directory for built-in steps is now the [project folder]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#cloning-the-source-code) that was checked out - this only applies to [built-in]({{site.baseurl}}/docs/pipelines/steps/#built-in-steps) Codefresh steps and not [custom plugins]({{site.baseurl}}/docs/pipelines/steps/#creating-a-typed-codefresh-plugin).                                              |
| Variable that contains the ID of a [Git-Clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/) step    | Runs the step within the cloned directory.    |
| Variable that contains the ID of any other step  | Runs the step within the same working directory that the specified was executed. This option is not available for for [**Git-Clone**]({{site.baseurl}}/docs/pipelines/steps/git-clone/)  steps.     |
| Absolute filesystem path  | Treated as is within the container.  |
| Relative filesystem path   | Treated as relative path from the cloned directory of the service  |
| 'IMAGE_WORK_DIR' | Use this value in order to use the image working directory for example:<br> `working_directory: IMAGE_WORK_DIR`         |


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

  * `maxAttempts` defines how many times this step will run again if there are execution errors (default is 1 and the Max. is 10).
  * `delay` is the number of seconds to wait before each attempt (default is 5 seconds and the Max. is 60 seconds).
  * `exponentialFactor` defines how many times the delay should be multiplied by itself after each attempt (default is 1 and Max. is 5).

All parameters are optional. The exponentialFactor works like this:
* exponentialFactor=1, delay=5 => each time wait 5 seconds before trying again, no matter the number of attempts.
* exponentialFactor=2, delay=5 => first retry will have a delay of 25 seconds, third will have 125 and so on.


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

* `CF_CURRENT_ATTEMPT` contains the number of current retry attempt.
* `CF_MAX_ATTEMPTS` contains all the number of total attempts defined.

The retry mechanism is available for all kinds of [steps]({{site.baseurl}}/docs/pipelines/steps/).

## Escaping strings

If you want to use strings inside your pipeline that create conflicts with the Codefresh syntax parser (for example they are YAML themselves) you need
to escape them using multi-line strings with the `>-` and `|-` characters.

The following pipeline is not parsed correctly because the echo command is using the yaml `:` character

{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  test:
    title: "Running test"
    type: "freestyle" 
    image: "alpine:3.9" 
    commands:
      - echo hello: world
{% endraw %}      
{% endhighlight %}

You can fix this issue by using a multi-line YAML string:

{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  test:
    title: "Running test"
    type: "freestyle" 
    image: "alpine:3.9" 
    commands:
      - |-
        echo hello: world
{% endraw %}      
{% endhighlight %}

The `|-` character keeps the line breaks of the text (but removes the last one). Use the `>-` character if you want to convert line breaks to spaces.
For more information see the [YAML specification](https://yaml.org/spec/1.2/spec.html){:target="\_blank"}.

## Using YAML anchors to avoid repetition

Codefresh also supports yaml anchors, references and extends. These allow you to keep
your pipeline [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself){:target="\_blank"}.

For example, let's say that you have two freestyle steps:

1. The first one fills a MySQL server with data.
1. The second one runs integration tests that use the MySQL server.

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

You also define anchors at the top of the pipeline in the special `indicators` block:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'

indicators:
 - environment: &my_common_envs
      - MYSQL_HOST=mysql
      - MYSQL_USER=user
      - MYSQL_PASS=password
      - MYSQL_PORT=3351
 
steps:
  preLoadDatabase:
    title: Loading Data
    image: alpine
    commands:
      - printenv
      - echo "Loading DB"
    environment: *my_common_envs # Same MYSQL_HOST, MYSQL_USER etc.
  runTests:
    title: Integration tests
    image: alpine
    commands:
      - printenv
      - echo "Running tests"
    environment: *my_common_envs  # Same MYSQL_HOST, MYSQL_USER etc.

{% endhighlight %}  


Finally. you also extend steps like below:

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
to point to production. Everything else (i.e. namespace and service) are exactly the same.


## Related articles
[Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/)  
[Advanced workflows]({{site.baseurl}}/docs/pipelines/advanced-workflows/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[CI/CD YAML examples]({{site.baseurl}}/docs/example-catalog/examples/)  







