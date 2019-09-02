---
title: "Codefresh YAML"
description: "How to define Codefresh pipelines in a declarative manner"
group: codefresh-yaml
redirect_from:
  - /docs/codefresh-yaml/
  - /docs/what-is-the-codefresh-yaml
  - /docs/what-is-the-codefresh-yaml/
  - /docs/codefresh-yaml/working-directories/
  - /docs/working-directories/  
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
 
You must define a step type for each step. Each step uses Docker images and containers as facilitators for execution. For example, the [**Freestyle**]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step spins up a container and executes the specified shell commands from the YAML file. 

The step names should be unique within the same pipeline. This mainly affects the visualization of the pipeline when it runs.

Each step produces a resource, which you can reference in other steps, and are executed in real-time. For example, a [**Freestyle**]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) step can reference an image that was produced by a [**Build**]({{site.baseurl}}/docs/codefresh-yaml/steps/build/) step. This allows you to chain steps together and create highly-customized builds.

<div class="bd-callout bd-callout-info" markdown="1">
##### Variables

Steps chaining and referencing is possible due to implementation of variables in yml file - read more on relevant [section]({{site.baseurl}}/docs/codefresh-yaml/variables/)
</div>

{: .table .table-bordered .table-hover}
| Step Type                                                                                                         | Description                                    |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [Freestyle]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)                      | Executes one or more shell commands in a container similar to `docker run`.            |
| [Build]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)                            | Builds a Docker image like `docker build`.                         |
| [Push]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)                              | Pushes a Docker image to a Docker registry similar to `docker tag` and `docker push`. |
| [Git Clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)                      | Overrides the default git clone behavior. |
| [Composition]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/)                | Starts a Docker Composition like `docker-compose`. Discarded once pipelines finishes.             |
| [Launch Composition]({{site.baseurl}}/docs/codefresh-yaml/steps/launch-composition/)  | Starts a long term Docker composition that stays up after the end of the pipeline.        |
| [Deploy]({{site.baseurl}}/docs/codefresh-yaml/steps/deploy/)  | Deploys to Kubernetes clusters.         |
| [Approval]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/)  | Pauses a pipeline and waits for human intervention.          |


For more information on creating your own step, see the [steps page]({{site.baseurl}}/docs/codefresh-yaml/steps/).

## Yaml validation

If you are editing Codefresh yaml within the Codefresh GUI, the editor will automatically highlight errors as they happen.

This allows you to make quick edits (and possibly run some builds) straight from the GUI. Once you are happy with your pipeline you should commit it to your repository as `codefresh.yml` (pipeline as code).

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/inline-editor.png" 
url="/images/codefresh-yaml/inline-editor.png"
alt="Graphical Inline Yaml Editor" 
caption="Graphical Inline Yaml Editor"
max-width="50%"
%}

You can also validate the pipeline yaml outside of the UI by using the [Codefresh CLI](https://codefresh-io.github.io/cli/). The CLI has a [validate parameter](https://codefresh-io.github.io/cli/validation/) that can check one or more files for syntax errors

{% highlight shell %}
{% raw %}
$codefresh validate codefresh.yml
Yaml not valid:
  - "invalid-property" is not allowed
{% endraw %}
{% endhighlight %}

For more information on where the YAML file can be stored see the [creating pipelines page]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).

## Execution flow

By default, Codefresh will execute all steps in the yaml file and instantly fail the build, if any step
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

## Working directories

In the context of a step, a working directory can be of the following type:

{: .table .table-bordered .table-hover}
| Working Directory                                                                                                                             | Description                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Empty                                                                                                                                         | Defaults to the [Codefresh volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) (found at `/codefresh/volume`). If there is a [git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) with the special name `main_clone` then the default working directory is now the [project folder]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#cloning-the-source-code) that was checked out.                                               |
| Variable that contains the ID of a [Git-Clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step          | Runs the step within the cloned directory. If you name your clone step as `main_clone` then all subsequent pipeline steps will automatically use that cloned directory as working directory.                                                                                                                                                                                        |
| Variable that contains the ID of any other step                                                                                               | Runs the step within the same working directory that the specified was executed. This option is not available for for [**Git-Clone**]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)  steps.     |
| Absolute filesystem path                                                                                                                      | Treated as is within the container.                                                                                                                                                                                               |
| Relative filesystem path                                                                                                                      | Treated as relative path from the cloned directory of the service                                                                                                                                                                 |
| 'IMAGE_WORK_DIR'                                                                                                                              | When using a freestyle step, by default the working directory will be the cloned directory of the service. Use this value in-order to use the image working directory for example:<br> `working_directory: IMAGE_WORK_DIR`         |

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

The retry mechanism is available for all kinds of [steps]({{site.baseurl}}/docs/codefresh-yaml/steps/).

## Using extra Services in a pipeline

Sometimes you wish to run sidecar containers in a pipeline that offer additional services for your builds. The most common scenario is launching services such as databases in order to accommodate integration tests. Or you might wish to launch the application itself in order to run integration tests **against** it as part of the pipeline.

Codefresh includes a handy mechanism (based on Docker compose) that can help you run sidecar containers along your main pipeline. Here is a very simple example.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_database
  composition:
    my-redis-db-host:
      image: redis:latest
      ports:
        - 6379     
steps:
  my_integration_tests:
    image: my-app-image
    title: Running integration tests
    commands:
      - npm run test
    services:
      - my_database
{% endraw %}      
{% endhighlight %}

This pipeline will run integration tests during the freestype step called `my_integration_tests` and at that point a Redis instance will be available at hostname `my-redis-db-host` and port 6479.

### Launching multiple sidecar containers

Like Docker compose it is possible to launch multiple services this way. For example let's say that a Java application needs both Redis and MongoDB during integration tests. Here is the respective pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_extra_services
  composition:
    my-redis-db-host:
      image: redis:latest
      ports:
        - 6379   
    my-mongo-db-host:
      image: mongo:latest
      ports:
        - 27017 
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-java-app"
    git: github
    revision: "master"
  my_tests:
    image: maven:3.5.2-jdk-8-alpine
    title: "Running Integration tests"
    commands:
      - 'mvn integration-test'
{% endraw %}      
{% endhighlight %}

The Redis instance will be available through the networks at `my-redis-db-host:6379` while the MongoDB instance will run at `my-mongo-db-host:27017`.

Instead of mentioning all your services directly in the YAML file you might also reuse an existing composition you have already defined in Codefresh by mentioning it by name.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_extra_services
  composition: redis_and_mongo
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-java-app"
    revision: "master"
    git: github
  my_tests:
    image: maven:3.5.2-jdk-8-alpine
    title: "Unit tests"
    commands:
      - 'mvn integration-test'
{% endraw %}      
{% endhighlight %}

This pipeline mentions an existing composition called `redis_and_mongo`:

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/existing-composition.png" 
url="/images/codefresh-yaml/existing-composition.png"
alt="Using an existing composition" 
caption="Using an existing composition"
max-width="70%"
%}

This makes very easy to reuse compositions that you have already defined for other reasons in the Codefresh UI

### Running services for the duration of the pipeline

Notice that unlike compositions, the services defined in the root of the pipeline yaml are present for the **whole** pipeline duration. They are available in all pipeline steps. This can be seen in the following example:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
services:
  name: my_database
  composition:
    my-redis-db-host:
      image: redis:latest
      ports:
        - 6379
steps:
  my_first_step:
    image: alpine:latest
    title: Storing Redis data
    commands:
      - apk --update add redis
      - redis-cli -u redis://my-redis-db-host:6379 -n 0 LPUSH mylist "hello world"  
      - echo finished
    services:
      - my_database
  my_second_step:
    image: alpine:latest
    commands:
      - echo "Another step in the middle of the pipeline"    
  my_third_step:
    image: alpine:latest
    title: Reading Redis data
    commands:
      - apk --update add redis
      - redis-cli -u redis://my-redis-db-host:6379 -n 0 LPOP mylist 
    services:
      - my_database      
{% endraw %}      
{% endhighlight %}

This pipeline:

1. Starts a single Redis instance
1. Saves some data in the first step on the pipeline
1. Runs an unrelated step (that itself is not using the redis instace)
1. Reads the data saved in the third steps

If you run this pipeline you will see that that data read in the third step of the pipeline was the same one as the data saved in the first step.

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/redis-example.png" 
url="/images/codefresh-yaml/redis-example.png"
alt="Redis read/write example" 
caption="Redis read/write example"
max-width="90%"
%}

This means that you can easily use the extra services in different steps of a single pipeline, without relaunching them each time (which is what happens with composition steps).

### Using sidecar services in specific steps

It is important to understand that any services you launch in a pipeline, are sharing its memory. If for example your pipeline has 4GBs of memory and your service (e.g. a mongdb instance) consumes 1GB, then you only have 3GB available for the actual pipeline.

It is therefore possible to a assign a service to a specific step if you don't wish to have it running for the duration of the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-java-example"
    revision: "master"
    git: github
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-java-app"
    dockerfile: "Dockerfile"
    tag: latest
  my_unit_tests:
    image: '${{build_image}}'
    title: "Unit tests"
    commands:
      - 'echo start testing my app'
    services:
      composition:
        my_redis_service:
          image: 'redis:latest'
          ports:
            - 6379
  my_integration_tests:
    image: '${{build_image}}'
    title: "Integration tests"
    commands:
      - 'echo start testing my app'
    services:
      composition:
        my_mongo_Service:
          image: 'mongo:latest'
          ports:
            - 27017  
{% endraw %}      
{% endhighlight %}

In this pipeline, the Redis instance is only launched during the Unit test step, while the MongoDB service is activate only during integration tests. 


### Launching a custom service

So far all the examples of extra services used predefined docker images (i.e. Redis and Mongo). You are free however to launch any custom docker image you have already created or even the main application of the pipeline.

This happens by mentioning a build step as a service image. Here is an example:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-back-end"
    revision: "master"
    git: github
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-backend-app"
    tag: latest
    dockerfile: "Dockerfile"
  run_integration_tests:
    title: Test backend
    image: 'my-front-end:latest'
    commands:
      - 'curl my_backend_app:8080'
      - 'echo Backend is up. Starting tests'
      - npm run integration-test
    services:
      composition:
        my_backend_app:
          image: '${{build_image}}'
          ports:
            - 8080
{% endraw %}      
{% endhighlight %}

Here a Dockerfile for a backedn application is built on the spot and then is launched as sidecar container in the next step (with a hostname of `my_backend_app`). Notice that the `image` property in the sidecar service actually refers to a [Codefresh variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) that holds the name of the build step.

We then run a `curl` command against the sidecar container to verify the correct health of the application. This is a great way to run integration tests against multilple microservices.


### Checking readiness of a service

When you launch multiple services in your pipelines, you don't know exactly when they will start. Maybe they will be ready once you expect them, but maybe they take too long to start. For example if you use a MySQL database in your integration tests, your integration tests need to know that the database is actually up before trying to use it.

This is the same issue that is present in [vanilla Docker compose](https://docs.docker.com/compose/startup-order/). You can use solutions such as [wait-for-it](https://github.com/vishnubob/wait-for-it) to overcome this limitation, but Codefresh offers a better way in the form of *service readiness*.

With a readiness block you can guarantee that a sidecar service will be actually up before the pipeline will continue. Here is an example:


 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-back-end"
    revision: "master"
    git: github
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-backend-app"
    tag: latest
    dockerfile: "Dockerfile"
  run_integration_tests:
    title: Test backend
    image: 'my-front-end:latest'
    commands:
      # Backend is certainly up at this point.
      - npm run integration-test
    services:
      composition:
        my_backend_app:
          image: '${{build_image}}'
          ports:
            - 8080
      readiness:
        image: 'byrnedo/alpine-curl'
        timeoutSeconds: 30
        commands:
          - "curl my_backend_app:8080"       
{% endraw %}      
{% endhighlight %}


This is an improvement over the previous example because the healthcheck of the back-end is managed by Codefresh. The added `readiness` block makes sure that the back-end service is actually up before the integration tests start by using a `curl` command to check that `my_backend_app:8080` is up and running. Codefresh will run the commands defined in the `readiness` in a loop until they succeed. You are free to use any of your favorite commands there (ping, curl, nc etc) that check one or more services. We also define a timeout for the healthcheck. The `readiness` block supports the following options:

* `periodSeconds`: How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.
* `timeoutSeconds`: Number of seconds after which the probe times out. Defaults to 10 seconds. Minimum value is 1.
* `successThreshold`: Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for readiness. Minimum value is 1.
* `failureThreshold`: failureThreshold times before giving up. In case of readiness probe the Pod will be marked Unready. Defaults to 3. Minimum value is 1

If you know already how [Kubernetes readiness probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/) work, then these settings will be very familiar to you.

Here is another example where we use the `pg_isready` command to make sure that a PostgreSQL database is ready to accept connections
before we run the integration tests.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "kostis-codefresh/my-rails-app"
    revision: "master"
  build_image:
    title: "Building Docker Image"
    type: "build"
    image_name: "my-rails-app"
    tag: "latest"
    dockerfile: "Dockerfile"
  run_integration_tests:
    image: '${{build_image}}'
    commands:
      # PostgreSQL is certainly up at this point
      - rails db:migrate
      - rails test
    services:
      composition:
        my_postgresql_db:
          image: postgres:latest
          ports:
            - 5432 
      readiness:
        timeoutSeconds: 30
        periodSeconds: 15
        image: 'postgres:latest'
        commands:
          - "pg_isready -h my_postgresql_db"   
{% endraw %}      
{% endhighlight %}

In summary `readiness` make sure that your services are actually up before you use them in a Codefresh pipeline.

## Using YAML anchors to avoid repetition

Codefresh also supports yaml anchors, references and extends. These allow you to keep
your pipeline [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

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


## What to read next

* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/)
* [Advanced workflows]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)







