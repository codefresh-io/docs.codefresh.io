---
title: "Composition"
description: "Run a Docker container with its dependencies inside a pipeline"
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/composition-1/
  - /docs/codefresh-yaml/steps/composition-1/  
toc: true
---
The composition step runs a Docker Composition as a means to execute finite commands in a more complex interaction of services.

>Note that while composition steps are still supported, the recommended way to run integrations tests going forward is with [service containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/).

## Motivation for Compositions

The primary purpose of compositions is to run tests that require multiple services for their execution (often known as integration tests).

The syntax offered by Codefresh closely follows the syntax for [Docker-compose](https://docs.docker.com/compose/overview/) files, but is technically not 100% the same (there are some important differences).  However, if you are already familiar with Docker compose, you will be immediately familiar with Codefresh compositions.

> Codefresh only understands Docker compose versions [2](https://docs.docker.com/compose/compose-file/compose-file-v2/) and [3](https://docs.docker.com/compose/compose-file/), but not point releases such as 2.1.

The big difference between the Codefresh and Docker compose is that Codefresh is distinguishes between two kinds of services:

* Composition Services
* Composition Candidates

**Composition Services** are helper services that are needed for the tests to run. These can be a database, a queue, a cache, or the backend docker image of your application -- these closely parallel the services that you might define in Docker compose.

**Composition Candidates** are special services that will execute the tests. Codefresh will monitor their execution and the build will fail if they do not succeed. Composition candidates are almost always Docker images that contain unit/integration tests or other kinds of tests (e.g. performance)

You need at least one composition service and one candidate for the composition step.


## Usage

Here is an example of a composition step. Note that there is one composition service (PostgreSQL database, named `db`) and one composition candidate (tests executed with gulp)

The most important part is the `command` line that executes the tests: `command: gulp integration_test`. If it fails, then the whole composition step will fail.



  `codefresh.yml`
{% highlight yaml %}
step_name:
  type: composition
  title: Step Title
  description: Free text description
  working_directory: {% raw %}${{a_clone_step}}{% endraw %}
  composition:
    version: '2'
    services:
      db:
        image: postgres
  composition_candidates:
    test_service:
      image: {% raw %}${{build_step}}{% endraw %}
      command: gulp integration_test
      working_dir: /app
      environment:
        - key=value
  composition_variables:
    - key=value
  fail_fast: false
  when:
    condition:
      all:
        notFeatureBranch: 'match("{% raw %}${{CF_BRANCH}}{% endraw %}", "/FB-/", true) == false'
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
  retry:
    ...  
{% endhighlight %}

## Caveats on sharing a docker-compose.yml

Although Codefresh's composition syntax closely follows the syntax used in `docker-compose.yml` files, it is not 100% the same.  If you are using `docker-compose.yml` locally, you may experience some problems if you try to have Codefresh reference the file (by passing it as an argument to `compose`, e.g. `compose: docker-compose.yml`).  

One subtle difference is that Docker compose will interpolate environment variables that are quoted in single-braces, e.g. `${DATABASE_URL}`, whereas Codefresh interpolates variables that are quoted in double-braces, e.g. {% raw %}`${{DATABASE_URL}}`{% endraw %}.  So if your `docker-compose.yml` file relies on the parsing of ENV variables, it may not be a good candidate for sharing with Codefresh.

## Fields

The following describes the fields available in a step of type `composition`

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                              | Required/Optional/Default |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                  | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                              | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `working_directory`                        | The directory in which to search for the composition file. It can be an explicit path in the container's file system, or a variable that references another step. The default is {% raw %}`${{main_clone}}`{% endraw %}. Note that this is completely different from `working_dir` which is on the service level.             | Default                   |
| `composition`                              | The composition you want to run. This can be an inline YAML definition or a path to a composition file on the file system, e.g. `docker-compose.yml`, or the logical name of a composition stored in the Codefresh system. We support most features of [Docker compose version 2.0](https://docs.docker.com/compose/compose-file/compose-file-v2/) and [3.0](https://docs.docker.com/compose/compose-file/)                                            | Required                  |
| `version`                              | Version for docker compose. Use `2` or `3`                                          | Required                  |
| `composition_candidates`                   | The definition of the service to monitor. Each candidate has a **single** `command` parameter that decides what will be tested.                                                                                                                                                                                              | Required                  |
| `environment` (service level)                             | environment that will be accessible to the container                                                                                                                                                                                     | Optional                  |
| `working_dir` (service level)                             | defines the working directory that will be used in a service before running a command. By default it is defined by the docker image that is used by the service.                                                                                                                             | Optional                  |
| `registry_contexts`                                 | Advanced property for resolving Docker images when [working with multiple registries with the same domain]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain)                            | Optional                  |
| `volumes` (service level)                             | Extra volumes for individual services. Used for transferring information between your steps. Explained in detail later in this page.                                                                                                                             | Optional                  |
| `composition_variables`                    | A set of environment variables to substitute in the composition. Notice that these variables are docker-compose variables and **NOT** environment variables                                                                                                                                                                         | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                 | Default                   |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                               | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).                                                                                                            | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

## Composition versus Composition Candidates

For Codefresh to determine if the step and operations were successfully executed, you must specify at least one `composition_candidate`.

A `composition_candidate` is a single service component of the normal Docker composition that is monitored for a successful exit code and determines the outcome of the step. During runtime, the `composition_candidate` is merged into the specified `composition`and is monitored for successful execution.

The critical part of each candidate is the `command` parameter. This takes [a single command](https://docs.docker.com/compose/compose-file/#command) that will
be executed inside the Docker container of the candidate and will decide if the whole composition is successful or not. Only one command is allowed (similar to Docker compose). If you wish to test multiple commands you need to connect them with `&&` like this.

{% highlight yaml %}
 composition_candidates:
  my_unit_tests:
    image: node
    command: bash -c "sleep 60 && pwd && npm run test"
{% endhighlight %}


## Working directories in a composition

By default, all services that take part in a composition will use as working directory the one defined by the respective image. If you want to change that, you need to use the `working_dir` parameter at the service level.

Here is an example:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_composition:
    type: composition
    title: Sample composition
    composition:
      version: '2'
      services:
        my_service:
          image: alpine
          command: 'pwd'
          working_dir: /tmp
    composition_candidates:
      my_test_service:
        image: python
        working_dir: /root
        command: 'pwd'
{% endhighlight %}

If you run this composition, you will see in the logs that the alpine image will use `/tmp` as a working directory and the python one will use `/root`

```
my_service_1       | /tmp
my_test_service_1  | /root
```

## Composition networking

The networking in Codefresh compositions works just like normal Docker-compose. Each service is assigned a hostname that matches
its name and is accessible by other services.

Here is an example

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build_step:
    type: build
    image_name: my-node-app
    dockerfile: Dockerfile
    tag: ${{CF_BRANCH}}
  my_db_tests:
    type: composition
    composition:
        version: '2'
        services:
          db:
            image: mysql:latest
            ports:
              - 3306
            environment:
              MYSQL_ROOT_PASSWORD: admin
              MYSQL_USER: my_user
              MYSQL_PASSWORD: admin
              MYSQL_DATABASE: nodejs
    composition_candidates:
        test:
          image: ${{build_step}}
          links:
            - db
          command: bash -c 'sleep 30 && MYSQL_ROOT_PASSWORD=admin MYSQL_USER=my_user MYSQL_HOST=db MYSQL_PASSWORD=admin MYSQL_DATABASE=nodejs npm test'
{% endraw %}
{% endhighlight %}

In this composition the MySql instance will be available at host `db:3306` accessible from the node image. When the node tests run, they will be pointed to that host and port combination to access it.

Notice also that like docker compose the order that the services are launched is not guaranteed. A quick way to solve this issue
is with a sleep statement like shown above. This will make sure that the database is truly up before the tests run.

A better approach would be to use solutions such as [wait-for-it](https://github.com/vishnubob/wait-for-it) which are much more robust. Here is an example:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build_image:
    type: build
    description: Building the image...
    image_name: my-spring-boot-app
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}
  build_image_with_tests:
    type: build
    description: Building the Test image...
    image_name: maven-integration-tests
    dockerfile: Dockerfile.testing
  integration_tests:
    type: composition
    title: Launching QA environment
    description: Temporary test environment
    composition:
      version: '2'
      services:
        app:
          image: ${{build_image}}
          ports:
           - 8080
    composition_candidates:
      test_service: 
        image: ${{build_image_with_tests}}
        links:
          - app
        command: bash -c '/usr/bin/wait-for-it.sh -t 20 app:8080 -- mvn verify -Dserver.host=app'
{% endraw %}
{% endhighlight %}

In this composition a Java application is launched at `app:8080` and then a second image is used for integration tests that target that URL (passed as a parameter to Maven).

The `wait-for-it.sh` script will make sure that the Java application is truly up before the tests are started. Notice that in the example above the script is included in the testing image (created by `Dockerfile.testing`)

## Using public Docker images in a composition

It is important to notice that Docker images used in a composition (both as services and candidates) will be looked from your connected registries first before looking at Dockerhub:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  my_composition:
    type: composition
    title: Sample composition
    composition:
      version: '2'
      services:
        my_service:
          image: mysql
          ports:
            - 3306
    composition_candidates:
      my_test_service:
        image: alpine
        working_dir: /root
        command: 'pwd'

{% endraw %}
{% endhighlight %}

In the example above if you already have two images in your private registries named `mysql` and `alpine`, then *THEY* will be used instead of the respective images in Dockerhub.

You can see which images are used in the logs of the builds:

```
Running composition step: Sample composition                                                                                              
Pulling kostisazureregistry.azurecr.io/mysql@sha256:1ee5515fed3dae4f13d0f7320e600a38522fd7e510b225e68421e1f90                      
Pulling kostisazureregistry.azurecr.io/alpine@sha256:eddb7866364ec96861a7eb83ae7977b3efb98e8e978c1c9277262d327                     
```

     
## Accessing your project folder from a composition

By default, the services of a composition run in a completely isolated manner. There are several scenarios however where you wish to access your Git files such as:

* Using test data that is available in the project folder
* Preloading a database with a data script found in Git
* Running integration tests and then using their [results for reporting]({{site.baseurl}}/docs/testing/test-reports/)

The Codefresh [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) is automatically mounted in [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) but **NOT** in compositions. You have to mount it yourself if you use that functionality.

Here is an example where the shared volume is mounted in a composition -- `'${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}'` is listed under `volumes`:


`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  create_test_data_step: 
    title: Creating dummy data
    image: alpine
    commands:
      - echo "Writing in shared volume" > /codefresh/volume/sample_text.txt 
  my_sample_composition:
    type: composition
    title: Composition with volume
    composition:
      version: '2'
      services:
        my_sample_service:
          image: node
          volumes:
            - '${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}'
          working_dir: '${{CF_VOLUME_PATH}}'
          command: bash -c "pwd && cat sample_text.txt"
    composition_candidates:
      my_unit_tests:
        image: python
        volumes:
          - '${{CF_VOLUME_NAME}}:${{CF_VOLUME_PATH}}'
        working_dir: '${{CF_VOLUME_PATH}}'
        command: bash -c "pwd && echo 'Finished tests' > test_result.txt"
  read_test_data_step:
    title: Reading dummy data
    image: alpine
    commands:
      - ls -l /codefresh/volume
      - cat /codefresh/volume/test_result.txt 
{% endraw %}
{% endhighlight %}

In this pipeline:

1. The first freestyle step writes a simple test file in the shared volume.
1. The composition starts and both services (`my_sample_service` and `my_unit_tests`) attach the same volume.
1. The sample service reads from the shared volume (i.e. using test data that was created before).
1. The sample unit test service writes to the shared volume (emulating test results).
1. The last freestyle step reads the file that was written by the composition.

Therefore, in this pipeline you can see both ways of data sharing, bringing files into a composition and getting results out of it. Notice that we need to mount the shared volume only in the composition services. The freestyle steps automatically mount `/codefresh/volume` on their own.


>Note: In order to mount the shared volume in one of your composition services, you must mount it in the `composition_candidate` also. It is not compulsory to mount the shared volume in all services of a composition. Only those that actually use it for file transfer, should mount it.


## Composition variables versus environment variables

Docker compose supports [two kinds of variables in its syntax](https://docs.docker.com/compose/environment-variables/):

* There are environment variables that are used in the docker-compose file itself (`${VAR}` syntax).
* There are environment variables that are passed in containers (`environment:` yaml group).

Codefresh supports both kinds, but notice that variables mentioned in the 
`composition_variables` yaml group refer to the *first* kind. Any variables defined there are **NOT** passed automatically to containers (use the `environment` yaml group for that purpose).

This can be illustrated with the following example:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  comp1:
    type: composition
    title: Composition example 1
    description: Free text description
    composition:
      version: '2'
      services:
        db:
          image: alpine
    composition_candidates:
      test_service:
        image: alpine
        command: printenv
        environment:
          - FIRST_KEY=VALUE
    composition_variables:
      - ANOTHER_KEY=ANOTHER_VALUE
{% endraw %}
{% endhighlight %}

If you run the compositio,n you will see that the `printenv` command shows the following:

```
test_service_1  | FIRST_KEY=VALUE
```

The `FIRST_KEY` variable which is defined explicitly in the `environment` yaml part is correctly passed to the alpine container. The `ANOTHER_KEY` is not visible in the container at all.

You should use the `composition_variables` yaml group for variables that you wish to reuse in other parts of your composition using the `${ANOTHER_KEY}` syntax.

## Merging services

If the `composition` already contains a service with the same name as the `composition_candidate`, the two service definitions are combined, with preference given to the `composition_candidate`'s definition.

For example, we create a new Codefresh composition named 'test_composition':

  `test-composition.yml`
{% highlight yaml %}
version: '2'
  services:
    db:
      image: postgres
    test_service:
      image: myuser/mytestservice:latest
      command: gulp integration_test
{% endhighlight %}

Now we want to reuse this composition during our build for testing purposes.
We can add the following composition step to our `codefresh.yml` file and define the composition step so that `test_service` always uses the latest image that was built.

  `YAML`
{% highlight yaml %}
run_tests:
  type: composition
  composition: test_composition
  composition_candidates:
    test_service:
      image: {% raw %}${{build_step}}{% endraw %}
{% endhighlight %}

In the above example, both `composition` and `composition_candidates` define a service named `test_service`. After merging these definitions, `test_service` will maintain the `command` that was defined in the original composition but will refer to the image built by the step named `build_step`.

## What to read next

* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/)
* [Introduction to pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Integration tests]({{site.baseurl}}/docs/testing/integration-tests/)
