---
title: "Variables in pipelines"
description: ""
group: pipelines
redirect_from:
  - /docs/variables/
toc: true
---
Codefresh provides a set of predefined variables automatically in each build, that you can use to parameterize the way your pipeline works. You can also define your own variables. Some common examples of predefined variables include:

* `CF_BRANCH` is the Git branch that was used for this pipeline.
* `CF_REVISION` is the Git hash that was used for this pipeline.
* `CF_BUILD_URL` is the url of the pipeline build.

## Using Codefresh variables in your pipelines

There are two ways to use a Codefresh variable in your pipelines:

1. By default all variables will be exposed as UNIX environment variables in all freestyle steps as `$MY_VARIABLE_EXAMPLE`.
1. Variables can be used in YAML properties with the syntax {% raw %}`${{MY_VARIABLE_EXAMPLE}}`{% endraw %}.

> If you are unsure about which form you need to use, feel free to use {% raw %}`${{MY_VARIABLE_EXAMPLE}}`{% endraw %} everywhere. This is the Codefresh specific form and should function in all sections of `codefresh.yml`. 

For example, you can print out the branch as an environment variable like this:

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


## System variables

System variables are automatically injected to any freestyle step as environment variables.

> It is important to understand that all Git related variables such `CF_BRANCH`, `CF_COMMIT_MESSAGE`, `CF_REVISION` etc. are coming directly from the Git provider you use and have the same limitations of that provider. For example GitLab is sending less information in pull request events than normal pushes, and Bitbucket sends only the short hash of a commit in pull request events. We suggest you read the documentation of your Git provider first to understand what information is available for every Git event

{: .table .table-bordered .table-hover}
| Variable                                          | Description |
| ------------------------------------------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_REPO_OWNER}} `{% endraw %}        | Repository owner.  |
| {% raw %}`${{CF_REPO_NAME}}`{% endraw %}          | Repository name. |
| {% raw %}`${{CF_BRANCH}}`{% endraw %}             | Branch name (or Tag depending on the payload json) of the Git repository of the main pipeline, at the time of execution. <br/>You can also use {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} to get the branch name normalized. It will be without any chars that are illegal in case the branch name were to be used as the Docker image tag name. You can also use {% raw %}`${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}`{% endraw %} to force lowercase. |
| {% raw %}`${{CF_BASE_BRANCH}}`{% endraw %}      | The base branch used during creation of Tag |
| {% raw %}`${{CF_PULL_REQUEST_ACTION}}`{% endraw %}      | The pull request action. Values are those defined by your Git provider such as [GitHub](https://developer.github.com/webhooks/), [GitLab](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html), [Bitbucket](https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html) etc. |
| {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %}      | The pull request target branch |
| {% raw %}`${{CF_PULL_REQUEST_NUMBER}}`{% endraw %}      | The pull request number |
| {% raw %}`${{CF_PULL_REQUEST_ID}}`{% endraw %}      | The pull request id |
| {% raw %}`${{CF_PULL_REQUEST_LABELS}}`{% endraw %}      | The labels of pull request (GitHub and GitLab only) |
| {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %}      | Commit author.                                                                                              |
| {% raw %}`${{CF_BUILD_INITIATOR}}`{% endraw %}      | The person (username) that started the build. If the build was started by a Git webhook (e.g. from a Pull request) it will hold the webhook user. Notice that if a build is restarted manually it will always hold the username of the person that restarted it.  |
| {% raw %}`${{CF_ACCOUNT}}`{% endraw %}         | Codefresh account for this build |
| {% raw %}`${{CF_COMMIT_URL}}`{% endraw %}         | Commit url.  |
| {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %}     | Commit message of the Git repository revision, at the time of execution.<br/> The messages quotes are escaped (i.e. ' is not \', " is now \"). |
| {% raw %}`${{CF_COMMIT_MESSAGE_ESCAPED}}`{% endraw %}     | Commit message of the Git repository revision, at the time of execution.<br/> Special characters are escaped.  |
| {% raw %}`${{CF_REVISION}}`{% endraw %}           | Revision of the Git repository of the main pipeline, at the time of execution. <br/> You can also use {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %}  to get the abbreviated 7-character revision hash, as used in Git. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %}                 |
| {% raw %}`${{CF_VOLUME_NAME}}`{% endraw %}        | Refers to the [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) between [freestyle steps]({{site.baseurl}}/docs/pipelines/steps/freestyle/). Normally you only need to define this in [compositions]({{site.baseurl}}/docs/pipelines/steps/composition/). In freestyle steps, it is automatically present without any extra configuration.   |
| {% raw %}`${{CF_VOLUME_PATH}}`{% endraw %}        | Refers to the mounted path of the [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) inside a Freestyle container. In the current implementation it expands to `/codefresh/volume`. |
| {% raw %}`${{CF_BUILD_TRIGGER}}`{% endraw %}      | Will be an indication of the current build was triggered: *build: The build was triggered from the build button* webhook: The build was triggered from a control version webhook |
| {% raw %}`${{CF_BUILD_ID}}`{% endraw %}           | The build id. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_BUILD_ID}}`{% endraw %} |
| {% raw %}`${{CF_BUILD_TIMESTAMP}}`{% endraw %}    | The timestamp the build was created. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_BUILD_TIMESTAMP}}`{% endraw %}  |
| {% raw %}`${{CF_BUILD_URL}}`{% endraw %}          | The URL to the build in Codefresh  |
| {% raw %}`${{CF_PIPELINE_NAME}}`{% endraw %}      | The full path of the pipeline, i.e. "project/pipeline" |
|  {% raw %}`${{CF_STEP_NAME}}`{% endraw %}      | the name of the step, i.e. "MyUnitTests" |
| {% raw %}`${{CF_URL}}`{% endraw %}          | The URL of Codefresh system  |
| {% raw %}`${{CI}}`{% endraw %}          | The value is always `true`  |
| {% raw %}`${{CF_KUBECONFIG_PATH}}`{% endraw %}    | Path to injected kubeconfig if at least one Kubernetes cluster [is configured]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/). You can easily run [custom kubectl commands]({{site.baseurl}}/docs/deploy-to-kubernetes/custom-kubectl-commands/) since it is automatically setup by Codefresh in all pipelines. |
| Any variable specified in the pipeline settings   | For example, if you configure the pipeline settings with a variable named PORT, you can put the variable in your YAML build descriptor as {% raw %}`${{PORT}}`{% endraw %}.  |

## Context-related Variables
Context-related variables are created dynamically during the workflow execution and according to the used steps.

{: .table .table-bordered .table-hover}
| Variable                                          | Description   |
| ------------------------------------------------- | ------------------------------------------------------ |
| **Working Directories**                           | For example, you can set the working directory of step `A` with a variable named after a previously executed step, step `B`. Therefore, setting step `A` with {% raw %}`working-directory:${{B}}`{% endraw %} means that step `A` executes in the same working directory as step `B`.                |
| **Images**                                        | You can set the candidate field of the push step with a variable named after a previously executed build step. Since the details of a created image are not necessarily known ahead of time, the variable can create an association to an optionally dynamic image name. Therefore, setting push step `A` with {% raw %}`candidate:${{B}}`{% endraw %} means that step `A` will push the image built by step `B`. Note that this capability works only for `candidate` and `image` fields in Codefresh steps.               |

A very common pattern in Codefresh pipelines, is to create a Docker image in one step, and then run a command on its container in the next step (e.g. run [unit tests]({{site.baseurl}}/docs/testing/unit-tests/)):

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

In the example above you can see the `MyAppDockerImage` variable that denotes a Docker image created dynamically within this single pipeline. In the second step we use it as a Docker context in order to run unit tests. See also the [unit testing example app]({{site.baseurl}}/docs/yaml-examples/examples/run-unit-tests/).

## Step variables

Every [step]({{site.baseurl}}/docs/pipelines/steps/) in a Codefresh pipeline also exposes several built-in variables. You can access them via the global `steps` parent variable.

 * Each step  creates a variable based on the name of the step. You can then use the members of each variable for status conditions such as: `steps.MyUnitTests.result == 'error'` for a step called `MyUnitTests`.
  * To access variables that have a non-standard (i.e. only alphanumeric and _ characters) names, use the Variable() function.

### Step Member variables

Variables that are created by steps can have members. The members depend on the step type. For example if you have a build step named `myBuildStep` you can get the ID of the docker image that gets created with {% raw %}`echo ${{steps.myBuildStep.imageId}}`{% endraw %}

{: .table .table-bordered .table-hover}
| Step Type              | Members      |
| ----------------------- | -------------------------------------- |
| All step types           | {::nomarkdown}<ul><li>name</li><li>type</li><li>description</li><li>workingDirectory</li><li>result</li></ul>{:/}  
| [**Freestyle**]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)        | -                                                                                                                                                                              |
| [**Composition**]({{site.baseurl}}/docs/codefresh-yaml/steps/composition/)        | -                                                                                                                                                                              |
| [**Build**]({{site.baseurl}}/docs/codefresh-yaml/steps/build/)             | {::nomarkdown}<ul><li>imageName</li><li>imageTagName</li><li>imageId</li></ul>{:/}                                                                            |
| [**Git-clone**]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)       | {::nomarkdown}<ul><li>revision</li><li>repo</li></ul>{:/}                                                                                  |
| [**Push**]({{site.baseurl}}/docs/codefresh-yaml/steps/push/)               | {::nomarkdown}<ul><li>registry</li><li>imageId</li><li>imageRepoDigest</li></ul>{:/}                                                                 |
| [**Approval**]({{site.baseurl}}/docs/codefresh-yaml/steps/approval/)               | {::nomarkdown}<ul><li>authEntity.name</li><li>authEntity.type</li></ul>{:/}                                                                 |



## GitHub release variables

GitHub allows you to create [releases](https://help.github.com/articles/creating-releases/) for marking specific Git tags for general availability.

You can set a [trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) for GitHub releases. When a GitHub release happens, the following variables are also available:



{: .table .table-bordered .table-hover}
| Variable        | Description                                            |
| --------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_RELEASE_NAME}}`{% endraw %}     | GitHub release title   |
| {% raw %}`${{CF_RELEASE_TAG}}`{% endraw %}      | Git tag version   |
| {% raw %}`${{CF_RELEASE_ID}}`{% endraw %}       | Internal ID for this release   |
| {% raw %}`${{CF_PRERELEASE_FLAG}}`{% endraw %}  | true if the release if marked as non-production ready, false if it is ready for production   |

## GitHub Pull Request variables

When a pull request is closed in GitHub, the following variables are also available

{: .table .table-bordered .table-hover}
| Variable        | Description                                            |
| --------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_PULL_REQUEST_MERGED}}`{% endraw %}     | true if the pull request was merged to base branch    |
| {% raw %}`${{CF_PULL_REQUEST_HEAD_BRANCH}}`{% endraw %}      | the head branch of the PR (the branch that we want to merge to master)  |
| {% raw %}`${{CF_PULL_REQUEST_MERGED_COMMIT_SHA}}`{% endraw %}       | the commit SHA on the base branch after the pull request was merged (in most cases it will be master)   |
| {% raw %}`${{CF_PULL_REQUEST_HEAD_COMMIT_SHA}}`{% endraw %}  | the commit SHA on the head branch (the branch that we want to push)  |

## User-defined variables

User variables can be defined at 6 levels:

1. Manually within a step using the [export](http://linuxcommand.org/lc3_man_pages/exporth.html) command or in any **subsequent** step with the [cf_export]({{site.baseurl}}/docs/codefresh-yaml/variables/#using-cf_export-command) command
1. [Freestyle Step Definition]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/#examples) (using the `environment` field)
1. Specific build Execution (after clicking the "Build" button open the "Build Variables" section, or use the [CLI]({{site.baseurl}}/docs/integrations/codefresh-api/#example---triggering-pipelines))
1. Pipeline Definition (under "Environment variables" section in the [pipeline view]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines))
1. [Shared Configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) (defined under your account settings, and used using the "Import from shared configuration" button under the "Environment Variables" section in the pipeline view)
1. Variables defined on the Project level (Under the variables tab on any project view)

The options are listed in order of priority (from the most important to the least important), so in case of multiple variables defined at different locations with the same name, the order of overriding will be as listed here.

For example if a pipeline variable is defined both in project level and as an execution parameter of a specific build, then the final result will be the value defined as a build parameter and the project level variable will not take effect. 

## Exporting environment variables from a freestyle step

Steps defined inside steps are scoped to the step they were created in (even if you used the `export` command). In order to allow using variables across steps, we provide a shared file that facilitates variables importing and exporting. There are two ways to add variables to this file:

### Using cf_export command
Within every freestyle step, the `cf_export` command allows you to export variables across steps (by writing to the shared variables file).  

> The variables exported with cf_export overrides those at the pipeline-level.

You can either:
- Explicitly state a VAR=VAL pair  
- State the name of an existing *exported* environment variable (like EXISTING_VAR).

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  freestyle-step-1:
    description: Freestyle step..
    title: Free styling
    image: alpine:latest
    commands:
      # Normal export will only work in a single step
      - export EXISTING_VAR=www.example.com

      # CF export will now work in all other subsequent steps
      - cf_export VAR1=alpine:latest VAR2=VALUE2 EXISTING_VAR

  freestyle-step-2:
    description: Freestyle step..
    title: Free styling 2
    image: ${{VAR1}}
    commands:
      - echo $VAR2
      - echo http://$EXISTING_VAR/index.php
{% endraw %}
{% endhighlight %}

Notice that `cf_export` has the same syntax structure as the [bash export command](https://www.gnu.org/software/bash/manual/html_node/Environment.html). This means that when you use it you **don't** need any dollar signs for the variable created/assigned.

```
cf_export $MY_VAR # Don't do this
cf_export MY_VAR # Correct syntax
```

Also notice that `cf_export` works on *subsequent* steps only. If you want to export a variable right away in the present step and all the rest of the steps you need to do the following:

```
export MY_VAR='example' # Will make MY_VAR available in this step only
cf_export MY_VAR='example' # Will also make MY_VAR available to all steps after this one
```

There is nothing really magic about `cf_export`. It is a normal script. You can see its contents on your own by entering the command `cat /codefresh/volume/cf_export` on any [Codefresh freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) inside a pipeline. 

For more information on its limitations see the [troubleshooting page]({{site.baseurl}}/docs/troubleshooting/common-issues/cf-export-limitations/).


 
### Directly writing to the file

For more advanced use cases, you can write directly to the shared variable file that Codefresh reads to understand which variables need to be available to all steps. This file has a simple format where each line is a variable and its value in the form of `VARIABLE=VALUE`. The `cf_export` command mentioned in the previous section is just a shorthand for writing on this file.

The variables file is available inside freestyle steps in the following path: **`{% raw %}${{CF_VOLUME_PATH}}{% endraw %}/env_vars_to_export`** 

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  freestyle-step-1:
    description: Freestyle step..
    title: Free styling
    image: alpine:latest
    commands:
      - echo VAR1=192.168.0.1 >> ${{CF_VOLUME_PATH}}/env_vars_to_export
      - echo hey=alpine:3.9 >> ${{CF_VOLUME_PATH}}/env_vars_to_export
          
  freestyle-step-2:
    description: Freestyle step..
    title: Free styling 2
    image: ${{hey}}
    commands:
      - echo http://$VAR1/index.php
{% endraw %}      
{% endhighlight %}

Use this technique if you have complex expressions that have issues with the `cf_export` command.

## Masking variables in logs

Codefresh has the built-in capabililty to automatically mask variables in logs if they are encrypted. The values of encrypted variables will be replaced with asterisks in build logs.

{% include
image.html
lightbox="true"
file="/images/pipeline/codefresh-yaml/variables/masked-variables.png"
url="/images/pipeline/codefresh-yaml/variables/masked-variables.png"
alt="Masked variables"
caption="Masked variables"
max-width="80%"
%}

The variables can be defined in any of the usual ways Codefresh offers such as [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) or [within the pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#pipeline-settings):

{% include
image.html
lightbox="true"
file="/images/pipeline/codefresh-yaml/variables/encrypted-variables.png"
url="/images/pipeline/codefresh-yaml/variables/encrypted-variables.png"
alt="Encrypted variables"
caption="Encrypted variables"
max-width="60%"
%}

>Notice that this feature is currently available only in Enterprise accounts.


## Escape characters
When passing special characters through environmental variables `\` can be used as an escape character. For example if you were passing a cassandra connection string you might do something like `Points\=hostname\;Port\=16376\;Username\=user\;Password\=password`

This will safely escape `;` and `=`.

## Related articles
[Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)  
[Codefresh Conditionals]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/)  
