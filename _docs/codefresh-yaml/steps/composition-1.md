---
title: "Composition"
description: "Run a Docker container with its dependencies in Codefresh infrastructure"
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/composition-1/
toc: true
---
The composition step runs a Docker Composition as a means to execute finite commands in a more complex interaction of services.

## Motivation for Compositions

The primary purpose of compositions is to run integration tests or any kind of tests that require multiple services for their execution.

The syntax offered by Codefresh closely follows the syntax for [Docker-compose](https://docs.docker.com/compose/overview/) files, so if you already know how Docker compose works, you will be immediately familiar with Codefresh compositions.

> Codefresh understands Docker compose versions [2.0](https://docs.docker.com/compose/compose-file/compose-file-v2/) and [3.0](https://docs.docker.com/compose/compose-file/), but not point releases (such as 2.1)

The big difference between the two, is that Codefresh is distinguishing between two kinds of services

* Composition Services
* Composition Candidates

Composition services are helper services that are needed for the tests to run. These can be a database, a queue, a cache, or the back-end docker image of your application.

Composition candidates are special services that will execute the tests. Codefresh will monitor their execution and fail the build if they do not succeed. Almost always composition candidates are Docker images that contain unit/integration tests or other kinds of tests (e.g. performance)

You need at least one composition service and one candidate for the composition step.


## Composition step syntax

Here is an example of a composition. There is one composition service (PostgreSQL database) and one candidate (tests executed with gulp)

The most important part is the `command` line that executes the tests. If it fails, then the whole composition step will fail.



  `YAML`
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

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                              | Required/Optional/Default |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                  | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                              | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `working_directory`                        | The directory in which to search for the composition file. It can be an explicit path in the container's file system, or a variable that references another step.<br> The default is {% raw %}`${{main_clone}}`{% endraw %}.               | Default                   |
| `composition`                              | The composition you want to run. It can be an inline YAML definition, a path to a composition file on the file system, or the logical name of a composition stored in the Codefresh system. We support most features of [Docker compose version 2.0](https://docs.docker.com/compose/compose-file/compose-file-v2/) and [3.0](https://docs.docker.com/compose/compose-file/)                                            | Required                  |
| `composition_candidates`                   | The definition of the service to monitor. Each candidate has a **single** `command` parameter that decides what will be tested.                                                                                                                                                                                              | Required                  |
| `environment`                              | environment that will be accessible to the container                                                                                                                                                                                     | Optional                  |
| `composition_variables`                    | A set of environment variables to substitute in the composition. Notice that these variables are docker-compose variables and **NOT** environment variables                                                                                                                                                                         | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                 | Default                   |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                               | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).                                                                                                            | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

## Composition versus Composition Candidates

For Codefresh to determine if the step and operations were successfully executed, you must specify at least one `composition_candidate`.

A `composition_candidate` is a single service component of the normal Docker composition that is monitored for a successful exit code, and determines the outcome of the step. During runtime, the `composition_candidate` is merged into the specified `composition`, and is monitored for successful execution.

The critical part of each candidate is the `command` parameter. This takes [a single command](https://docs.docker.com/compose/compose-file/#command) that will
be executed inside the Docker container of the candidate and will decide if the whole composition is successful or not. Only one command is allowed (similar to Docker compose). If you wish to test multiple commands you need to connect them with `&&`.

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
We can add the following composition step to our `codefresh.yml` file, and define the composition step so that `test_service` always uses the latest image that was built.

  `YAML`
{% highlight yaml %}
run_tests:
  type: composition
  composition: test_composition
  composition_candidates:
    test_service:
      image: {% raw %}${{build_step}}{% endraw %}
{% endhighlight %}

In the above example, both `composition` and `composition_candidates` define a service named `test_service`. After merging these definitions, `test_service` will maintain the `command` that was defined in the original composition, but will refer to the image built by the step named `build_step`.

## Composition variables versus environment variables

Docker compose supports [two kinds of variables in its syntax](https://docs.docker.com/compose/environment-variables/).

* There are environment variables that are used in the docker-compose file itself (`${VAR}` syntax)
* There are environment variables that are passed in containers (`environment:` yaml group)

Codefresh supports both kinds, but notice that variables mentioned in the 
`composition_variables` yaml group refer to the *first* kind. Any variables defined there are **NOT** passed automatically to containers (use the `environment` yaml group for that purpose).

This can be illustrated with the following example:

  `codefresh.yml`
{% highlight yaml %}
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
{% endhighlight %}

If you run the composition you will see that the `printenv` command shows the following:

```
test_service_1  | FIRST_KEY=VALUE
```

The `FIRST_KEY` variable which is defined explicitly in the `environment` yaml part is correctly passed to the alpine container. The `ANOTHER_KEY` is not visible in the container at all.

You should use the `composition_variables` yaml group for variables that you wish to reuse in other parts of your composition using the `${ANOTHER_KEY}` syntax.

## What to read next

* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/)
* [Introduction to pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)