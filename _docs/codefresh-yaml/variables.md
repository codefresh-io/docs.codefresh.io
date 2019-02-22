---
title: "Variables"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/variables/
toc: true
---
Codefresh provides a set of predefined variables automatically in each build, that you can use to parameterize the way your pipeline works. You can also define your own variables. Some common examples of predefined variables include:

* `CF_BRANCH` is the git branch that was used for this pipeline
* `CF_REVISION` is the git hash that was used for this pipeline
* `CF_BUILD_URL` is the url of the pipeline build 

## Using Codefresh variables in your pipelines

There are two ways to use a Codefresh variable in your pipelines.

1. By default all variables will be exposed as UNIX environment variables in all freestyle steps
1. Variables can be used within the `codefresh.yml` itself with the syntax {% raw %}`${{MY_VARIABLE_EXAMPLE}}`{% endraw %}.

For example you can print out the branch as an environment variable like this:

`YAML`
{% highlight yaml %}
{% raw %}
MyOwnStep:
  title: Variable example
  image: alpine
  commands: 
    - echo $CF_BUILD_ID 
    - echo $CF_BRANCH_TAG_NORMALIZED 
{% endraw %}
{% endhighlight %}

In the example above we are using simple `echo` commands, but any program or script that reads environment variables could also read them in the same manner.

Using variables directly in yaml properties can be done like this:

`YAML`
{% highlight yaml %}
{% raw %}
MyAppDockerImage:
  title: Building Docker Image
  type: build
  image_name: my-own-app
  tag: ${{CF_BRANCH_TAG_NORMALIZED}}
{% endraw %}
{% endhighlight %}

You can also concatenate variables:

`YAML`
{% highlight yaml %}
{% raw %}
MyAppDockerImage:
  title: Building Docker Image
  type: build
  image_name: my-own-app
  tag: ${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}
{% endraw %}
{% endhighlight %}

This will create docker images with tags such as:

```
master-df6a04c
develop-ba1cd68
feature-vb145dh
```


Notice that this syntax is specific to Codefresh and is **only** available within the Codefresh YAML file itself. If you want to write scripts or programs that use the Codefresh variables, you need to make them aware of the environment variable form.


## System Provided Variables

All system provided variables will also be automatically injected to any freestyle step as environment variables.

{: .table .table-bordered .table-hover}
| Variable                                          | Description                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| {% raw %}`${{CF_REPO_OWNER}} `{% endraw %}        | Repository owner.                                                                                                                                                                                                          |
| {% raw %}`${{CF_REPO_NAME}}`{% endraw %}          | Repository name. |
| {% raw %}`${{CF_BRANCH}}`{% endraw %}             | Branch name (or Tag depending on the payload json) of the Git repository of the main pipeline, at the time of execution. <br/>You can also use {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} to get the branch name normalized. It will be without any chars that are illegal in case the branch name were to be used as the Docker image tag name. |
| {% raw %}`${{CF_BASE_BRANCH}}`{% endraw %}      | The base branch used during creation of Tag |
| {% raw %}`${{CF_PULL_REQUEST_ACTION}}`{% endraw %}      | The pull request action |
| {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %}      | The pull request target branch |
| {% raw %}`${{CF_PULL_REQUEST_NUMBER}}`{% endraw %}      | The pull request number |
| {% raw %}`${{CF_PULL_REQUEST_ID}}`{% endraw %}      | The pull request id |
| {% raw %}`${{CF_PULL_REQUEST_LABELS}}`{% endraw %}      | The labels of pull request (Github and Gitlab only) |
| {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %}      | Commit author.                                                                                              |
| {% raw %}`${{CF_BUILD_INITIATOR}}`{% endraw %}      | The person (username) that started the build. If the build was started by a Git webhook (e.g. from a Pull request) it will hold the webhook user. Notice that if a build is restarted manually it will always hold the username of the person that restarted it.                                                                                                                                                                                                                                                                                    |
| {% raw %}`${{CF_ACCOUNT}}`{% endraw %}         | Codefresh account for this build |
| {% raw %}`${{CF_COMMIT_URL}}`{% endraw %}         | Commit url.                                                                                                                                                                                                                                                                                       |
| {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %}     | Commit message of the git repository revision, at the time of execution.<br/> The messages quotes are escaped (i.e. ' is not \', " is now \").                                                                                                                                                         |
| {% raw %}`${{CF_REVISION}}`{% endraw %}           | Revision of the Git repository of the main pipeline, at the time of execution. <br/> You can also use {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %}  to get the abbreviated 7-character revision hash, as used in git. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %}                 |
| {% raw %}`${{CF_VOLUME_NAME}}`{% endraw %}        | Refers to the [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) between [freestyle steps]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/). Normally you only need to define this in [compositions]({{site.baseurl}}/docs/codefresh-yaml/steps/composition-1/). In freestyle steps, it is automatically present without any extra configuration.   |
| {% raw %}`${{CF_VOLUME_PATH}}`{% endraw %}        | Refers to the mounted path of the [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) inside a Freestyle container. In the current implementation it expands to `/codefresh/volume`.                                                                                                                                                                                                              |
| {% raw %}`${{CF_BUILD_TRIGGER}}`{% endraw %}      | Will be an indication of the current build was triggered: *build: The build was triggered from the build button* webhook: The build was triggered from a control version webhook                                                                                                                  |
| {% raw %}`${{CF_BUILD_ID}}`{% endraw %}           | The build id. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_BUILD_ID}}`{% endraw %}                                                                                                                                                                                                |
| {% raw %}`${{CF_BUILD_TIMESTAMP}}`{% endraw %}    | The timestamp the build was created. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_BUILD_TIMESTAMP}}`{% endraw %}                                                                                                                                                                   |
| {% raw %}`${{CF_BUILD_URL}}`{% endraw %}          | The URL to the build in Codefresh                                                                                                                                                                                                                                                                 |
| {% raw %}`${{CF_URL}}`{% endraw %}          | The URL of Codefresh system                                                                                                                                                                                                                                                                 |
| {% raw %}`${{CF_KUBECONFIG_PATH}}`{% endraw %}    | Path to injected kubeconfig if at least one Kubernetes cluster [is configured]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/). You can easily run [custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/) since it is automatically setup by Codefresh in all pipelines.                                                                                                                                                                                                                                                                   |
| Any variable specified in the pipeline settings   | For example, if you configure the pipeline settings with a variable named PORT, you can put the variable in your YAML build descriptor as {% raw %}`${{PORT}}`{% endraw %}.                                                                                                                                              |

## Context Related Variables
Context related variables are created dynamically during the workflow execution and according to the used steps.

{: .table .table-bordered .table-hover}
| Variable                                          | Description                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Working Directories**                           | For example, you can set the working directory of step `A` with a variable named after a previously executed step, step `B`. Therefore, setting step `A` with {% raw %}`working-directory:${{B}}`{% endraw %} means that step `A` executes in the same working directory as step `B`.                |
| **Images**                                        | You can set the candidate field of the push step with a variable named after a previously executed build step. Since the details of a created image are not necessarily known ahead of time, the variable can create an association to an optionally dynamic image name. Therefore, setting push step `A` with {% raw %}`candidate:${{B}}`{% endraw %} means that step `A` will push the image build buy step `B`.                |

A very common pattern in Codefresh pipelines, is to create a Docker image in one step, and then run a command on its container in the next step (e.g. run unit tests):

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-own-app
  MyUnitTests:
    title: Running Unit tests
    image: ${{MyAppDockerImage}}
    commands: 
      - ./my-unit-tests.sh
{% endraw %}
{% endhighlight %}

In the example above you can see the `MyAppDockerImage` variable that denotes a Docker image created dynamically within this single pipeline. In the second step we use it as a Docker context in order to run unit tests.


## Github Release Variables

Github allows you to create [releases](https://help.github.com/articles/creating-releases/) for marking specific git tags for general availability.

You can set a [trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) for Github releases. When a Github release happens the following variables are also available:



{: .table .table-bordered .table-hover}
| Variable        | Description                                            |
| --------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_RELEASE_NAME}}`{% endraw %}     | Github release title   |
| {% raw %}`${{CF_RELEASE_TAG}}`{% endraw %}      | GIT tag version   |
| {% raw %}`${{CF_RELEASE_ID}}`{% endraw %}       | Internal ID for this release   |
| {% raw %}`${{CF_PRERELEASE_FLAG}}`{% endraw %}  | true if the release if marked as non-production ready, false if it is ready for production   |

## User Provided Variables

User provided variables can be defined at 4 levels:
1. Freestyle step definition: using the `environment` field.
1. Pipeline execution: after clicking the "Build" button, open the "Advanced options" section.
1. Pipeline definition: under "Environment variables" section in the pipeline view.
1. [Shared Configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/): defined under your account settings, and used using the "Import from shared configuration" button under the "Environment Variables" section in the pipeline view.

The options are listed in order of importance, so in case of multiple variables defined at different location with the same name, the order of overriding will be as listed here.

## Exporting environment variables from a freestyle step

Steps defined inside steps are scoped to the step they were created in (even if you used the `export` command). In order to allow using variables across steps, we provide a shared file that facilitates variables importing and exporting. There are two ways to add variables to this file:

### Using cf_export command
Inside every freestyle step there's a command called `cf_export` that allows you to export variables across steps (by writing to the shared variables file).

You can either:
- explicitly state a VAR=VAL pair  
- state the name of an existing environment variable (like EXISTING_VAR).

{% highlight yaml %}
version: '1.0'
steps:
  freestyle-step-1:
    description: Freestyle step..
    title: Free styling
    image: alpine:latest
    commands:
      - cf_export VAR1=VALUE1 VAR2=VALUE2 EXISTING_VAR

  freestyle-step-2:
    description: Freestyle step..
    title: Free styling 2
    image: {% raw %}${{VAR1}}{% endraw %}
    commands:
      - echo $VAR2
      - curl http://$EXISTING_VAR/index.php
{% endhighlight %}
 
### Directly writing to the file

For more advanced use cases, you can write directly to the shared file.

The variables file will be available inside the freestyle container in the following path: **`{% raw %}${{CF_VOLUME_PATH}}{% endraw %}/env_vars_to_export`** 

{% highlight yaml %}
version: '1.0'
steps:
  freestyle-step-1:
    description: Freestyle step..
    title: Free styling
    image: alpine:latest
    commands:
      - echo VAR1=192.168.0.1 >> {% raw %}${{CF_VOLUME_PATH}}{% endraw %}/env_vars_to_export
          
  freestyle-step-2:
    description: Freestyle step..
    title: Free styling 2
    image: {% raw %}${{hey}}{% endraw %}
    commands:
      - curl http://$VAR1/index.php
{% endhighlight %}

## Escape Characters
When passing special characters through environmental variables `\` can be used as an escape character. For example if you were passing a cassandra connection string you might do something like `Points\=hostname\;Port\=16376\;Username\=user\;Password\=password`

This will safely escape `;` and `=`.

## What to read next

* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Codefresh Conditionals]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/)
* [Expression Syntax]({{site.baseurl}}/docs/codefresh-yaml/expression-condition-syntax/)
