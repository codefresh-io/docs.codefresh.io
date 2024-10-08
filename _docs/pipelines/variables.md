---
title: "Variables in pipelines"
description: ""
group: pipelines
redirect_from:
  - /docs/variables/
  - /docs/codefresh-yaml/variables/
toc: true
---
Variables in pipelines allow you to parameterize the way your pipeline works. Codefresh provides a set of system variables, and the capability to define custom variables.

* [System variables](#system-variables) are predefined variables prefixed with `CF`.  
  System variables are automatically included in every pipeline build. Here are some examples of system variables.  
  * `CF_BRANCH` is the Git branch that was used for this pipeline.
  * `CF_REVISION` is the Git hash that was used for this pipeline.
  * `CF_BUILD_URL` is the url of the pipeline build.

* [User-defined variables](#user-defined-variables) are custom variables which you create.  
  You can create user-defined variables for different entities in Codefresh, such as projects, pipelines and steps, with or without a default value. You can also import variables you may have already defined.

Codefresh supports [two syntaxes](#using-codefresh-variables-in-pipelines) for variables: the UNIX syntax, and a proprietary syntax for use in YAML files.

## Using Codefresh variables in pipelines

There are two ways to use a Codefresh variable in your pipelines:

1. Expose as UNIX environment variables
  This is the default method. All variables in all [`freestyle`]({{site.baseurl}}/docs/pipelines/steps/freestyle/) steps are exposed as UNIX environment variables. For example, `$MY_VARIABLE_EXAMPLE`.
1. Directly in YAML properties  
   This format, specific to Codefresh, can be used in in YAML properties with the syntax {% raw %}`${{MY_VARIABLE_EXAMPLE}}`{% endraw %}.

{{site.data.callout.callout_tip}}
**TIP**  
If you are unsure about which format to use, feel free to use the Codefresh-specific format with the {% raw %}`${{MY_VARIABLE_EXAMPLE}}`{% endraw %} everywhere.  
This is the Codefresh specific format and should function in all sections of `codefresh.yml`.
{{site.data.callout.end}}

### Example: Print out the branch as an environment variable

In this example, we use simple `echo` commands, but any program or script that reads environment variables can also read them in the same manner.

`YAML`
{% raw %}

```yaml
MyOwnStep:
  title: Variable example
  image: alpine
  commands:
    - echo $CF_BUILD_ID
    - echo $CF_BRANCH_TAG_NORMALIZED
```

{% endraw %}

### Example: Use directly in YAML properties

`YAML`
{% raw %}

```yaml
MyAppDockerImage:
  title: Building Docker Image
  type: build
  image_name: my-own-app
  tag: ${{CF_BRANCH_TAG_NORMALIZED}}
```

{% endraw %}

### Example: Concatenating variables

`YAML`
{% raw %}

```yaml
MyAppDockerImage:
  title: Building Docker Image
  type: build
  image_name: my-own-app
  tag: ${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}
```

{% endraw %}

The concatenation above creates Docker images with tags such as:

```text
master-df6a04c
develop-ba1cd68
feature-vb145dh
```

> **NOTE**  
> This syntax is specific to Codefresh, and is **only** available within the Codefresh YAML file itself.  
> To write scripts or programs that use Codefresh variables, you need to make them aware of the environment variable form.

## System variables

System variables are automatically injected to any freestyle step as environment variables.

The values of Git-based system variables, such as `CF_BRANCH`, `CF_COMMIT_MESSAGE`, `CF_REVISION` etc. are retrieved directly from the Git provider you use, and therefore have the same limitations of that provider.

For example, GitLab sends less information in Pull Request (PR) events than normal pushes, and Bitbucket sends only the short hash of a commit in PR events. We suggest you read the documentation of your Git provider first to understand what information is available for every Git event.

Gerrit for example, has `change-Id` and `Changes` that you can map to `CF_PULL_REQUEST` variables, such as `CF_PULL_REQUEST_ID` and more.

The table below describes the system variables.

<!-- markdownlint-disable MD033 -->

{: .table .table-bordered .table-hover}
| Variable                                          | Description |
| ------------------------------------------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_REPO_OWNER}}`{% endraw %}        | The repository owner.  |
| {% raw %}`${{CF_REPO_NAME}}`{% endraw %}          | The repository name. |
| {% raw %}`${{CF_BRANCH}}`{% endraw %}             | The branch name or tag (depending on the payload JSON) of the Git repository associated with the main pipeline at the time of execution.<br>- To utilize the normalized version of the branch name, use {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %}. This variable ensures that special characters are removed, resulting in a branch name without any characters that are illegal for use as a Docker image tag name.<br>- For a normalized version in lowercase, you can use {% raw %}`${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}`{% endraw %}.|
| {% raw %}`${{CF_BASE_BRANCH}}`{% endraw %}      | The base branch from which the tag is created. |
| {% raw %}`${{CF_PULL_REQUEST_ACTION}}`{% endraw %}      | The PR (Pull Request) action with values based on the Git provider.<br>- [GitHub](https://developer.github.com/webhooks/){:target="\_blank"}<br>-[GitLab](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html)<br>-[Bitbucket](https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html){:target="\_blank"}  |
| {% raw %}`${{CF_PULL_REQUEST_ID}}`{% endraw %}      | The ID of the Pull Request (PR).<br>For Gerrit, use this in place of `changeId`.   |
| {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %}      | The target branch of the PR. <br>For Gerrit, use this in place of `Change target branch name`. |
| {% raw %}`${{CF_PULL_REQUEST_NUMBER}}`{% endraw %}      | The PR (Pull Request) number. |
| {% raw %}`${{CF_PULL_REQUEST_LABELS}}`{% endraw %}      | For GitHub and GitLab, the labels assigned to the PRs.<br>For Gerrit, the `change hashtags`. |
| {% raw %}`${{CF_PULL_REQUEST_COMMENT}}`{% endraw %}      | The comment added to the PR.<br>For Gerrit, use this in place of `Change message`.  |
| {% raw %}`${{CF_PULL_REQUEST_COMMENT_AUTHOR}}`{% endraw %}      | The user who added the comment to the PRt.<br>For Gerrit, use this in place of `Change author`.  |
| {% raw %}`${{CF_GERRIT_CHANGE_TOPIC}}`{% endraw %}      | The topic associated with the Gerrit change.  |
| {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %}      | The name of the user who authored the commit.        |
| {% raw %}`${{CF_BUILD_INITIATOR}}`{% endraw %}      | The username of the user who initiated the build.<br> If the build is initiated by a Git webhook, as for example from a PR, this variable returns the webhook user.<br>If the build is restarted manually, the variable always returns the username of the person who restarted the build.  |
| {% raw %}`${{CF_ACCOUNT}}`{% endraw %}         | The Codefresh account for this build. |
| {% raw %}`${{CF_COMMIT_URL}}`{% endraw %}         | The commit URL.  |
| {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %}     | The commit message of the Git repository revision at the time of execution.<br/> Only quotes in the message are escaped (`'` is escaped `\'` and `"` is escaped as `\"`).<br>To get the title of the pull request, use {% raw %}`${{CF_PULL_REQUEST_TITLE}}`{% endraw %}.  |
| {% raw %}`${{CF_COMMIT_MESSAGE_ESCAPED}}`{% endraw %}     | The commit message of the Git repository revision at the time of execution with special characters _escaped_. <br> To get the escaped title of the pull request, use {% raw %}`${{CF_PULL_REQUEST_TITLE_ESCAPED}}`{% endraw %}. |
| {% raw %}`${{CF_PULL_REQUEST_TITLE}}`{% endraw %}     | The _unescaped_ title of the pull request that triggered the pipeline build.<br/> To escape special characters, use {% raw %}`${{CF_PULL_REQUEST_TITLE_ESCAPED}}`{% endraw %}. |
| {% raw %}`${{CF_PULL_REQUEST_TITLE_ESCAPED}}`{% endraw %}     | The title of the pull request that triggered the pipeline build, with special characters _escaped_. <br>To not escape special characters, use {% raw %}`${{CF_PULL_REQUEST_TITLE}}`{% endraw %}. |
| {% raw %}`${{CF_REVISION}}`{% endraw %}  | The revision of the Git repository of the main pipeline, at the time of execution. <br/> To get the abbreviated 7-character revision hash as used in Git, use {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %}. <br>**NOTE**: To tag the image as a string with quotes, use {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %} .                |
| {% raw %}`${{CF_VOLUME_NAME}}`{% endraw %}        | The [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) defined in [compositions]({{site.baseurl}}/docs/pipelines/steps/composition/).    |
| {% raw %}`${{CF_VOLUME_PATH}}`{% endraw %}        | The mounted path of the [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) within a freestyle container. In the current implementation it expands to `/codefresh/volume`. |
| {% raw %}`${{CF_BUILD_TRIGGER}}`{% endraw %}      | The indication of how the current build was triggered:{::nomarkdown} <ul><li><code class="highlighter-rouge">build</code>: The build was triggered by clicking the Build button</li><li><code class="highlighter-rouge">webhook</code>: The build was triggered from a control version webhook.</ul>{:/} |
| {% raw %}`${{CF_BUILD_ID}}`{% endraw %}           | The build ID. <br>**NOTE**: To use this variable as a string to tag the image, enclose it in quotes, {% raw %}`"${{CF_BUILD_ID}}"`{% endraw %}. |
| {% raw %}`${{CF_BUILD_TIMESTAMP}}`{% endraw %}    | The timestamp when the build was created.<br>**NOTE**: To use this variable as a string to tag the image, enclose it in quotes, {% raw %}`"${{CF_BUILD_TIMESTAMP}}"`{% endraw %}.  |
| {% raw %}`${{CF_BUILD_URL}}`{% endraw %}          | The URL to the build in Codefresh.  |
| {% raw %}`${{CF_PIPELINE_NAME}}`{% endraw %}      | The full path of the pipeline, including the project to which it is assigned, if any, as in "project/pipeline". |
|  {% raw %}`${{CF_STEP_NAME}}`{% endraw %}      | The name of the step, for example, "MyUnitTests". |
| {% raw %}`${{CF_URL}}`{% endraw %}          | The URL of the Codefresh platform.  |
| {% raw %}`${{CF_OUTPUT_URL}}`{% endraw %}          | Display link to an external URL on step execution. For example, display the link to a parent-build from the child-build.<br>See [Export external link with CF_OUTPUT_URL](#exporting-external-link-with-cf_output_url) in this article. |
| {% raw %}`${{CI}}`{% endraw %}          | The value is always `true`.  |
| {% raw %}`${{CF_KUBECONFIG_PATH}}`{% endraw %}    | Path to injected `kubeconfig` if at least one Kubernetes cluster is [configured]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster). You can easily run [custom kubectl commands]({{site.baseurl}}/docs/deployments/kubernetes/custom-kubectl-commands/) since it is automatically set up by Codefresh in all pipelines. |

<!-- markdownlint-enable MD033 -->

### Context-related variables

Context-related variables are system variables created dynamically during the workflow execution, according to the steps used in the pipeline.

{: .table .table-bordered .table-hover}
| Variable              | Description   |
| ------------------- | ------------------------------------------------------ |
| **Working Directories**   | For example, you can set the working directory of step `A` with a variable named after a previously executed step, step `B`. Therefore, setting step `A` with {% raw %}`working-directory:${{B}}`{% endraw %} means that step `A` executes in the same working directory as step `B`.                |
| **Images**               | You can set the candidate field of the `push` step with a variable named after a previously executed `build` step. Since the details of the created image are not necessarily known ahead of time, the variable can create an association to an optionally dynamic image name. Therefore, setting push step `A` with {% raw %}`candidate:${{B}}`{% endraw %} means that step `A` will push the image built by step `B`. Note that this capability works only for `candidate` and `image` fields in Codefresh steps.               |

A very common pattern in Codefresh pipelines, is to create a Docker image in one step, and then run a command on its container in the next step (e.g. run [unit tests]({{site.baseurl}}/docs/testing/unit-tests/)):

`YAML`
{% raw %}

```yaml
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
```

{% endraw %}

In the example above, you can see the `MyAppDockerImage` variable that denotes a Docker image created dynamically within this single pipeline. In the second step we use it as a Docker context in order to run unit tests. See also the [unit testing example app]({{site.baseurl}}/docs/example-catalog/ci-examples/run-unit-tests/).

### Step variables

Every [step]({{site.baseurl}}/docs/pipelines/steps/) in a Codefresh pipeline also exposes several built-in variables. You can access them via the global `steps` parent variable.

Each step creates a variable based on the name of the step. You can then use the members of each variable for status conditions such as: `steps.MyUnitTests.result == 'error'` for a step called `MyUnitTests`.

To access variables that have non-standard names with only alphanumeric and underscore (_) characters, use the Variable() function.

#### Step-member variables

Variables that are created by steps can have members. The members depend on the step type.  
For example, if you have a build step named `myBuildStep`, you can get the ID of the docker image that is created, with {% raw %}`echo ${{steps.myBuildStep.imageId}}`{% endraw %}.

<!-- markdownlint-disable MD033 -->

{: .table .table-bordered .table-hover}
| Step Type              | Members      |
| ----------------------- | -------------------------------------- |
| All step types   | {::nomarkdown}<ul><li>name</li><li>type</li><li>description</li><li>workingDirectory</li><li>result</li></ul>{:/} |
| [Freestyle]({{site.baseurl}}/docs/pipelines/steps/freestyle/)        | -   |
| [Composition]({{site.baseurl}}/docs/pipelines/steps/composition/)    | -   |
| [Build]({{site.baseurl}}/docs/pipelines/steps/build/)  | {::nomarkdown}<ul><li>imageName</li><li>imageTagName</li><li>imageId</li></ul>{:/} |
| [Git-clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/) | {::nomarkdown}<ul><li>revision</li><li>repo</li></ul>{:/} |
| [Push]({{site.baseurl}}/docs/pipelines/steps/push/) | {::nomarkdown}<ul><li>registry</li><li>imageId</li><li>imageRepoDigest</li></ul>{:/}  |
| [Approval]({{site.baseurl}}/docs/pipelines/steps/approval/)  | {::nomarkdown}<ul><li>authEntity.name</li><li>authEntity.type</li></ul>{:/} |

<!-- markdownlint-enable MD033 -->

### GitHub release variables

GitHub allows you to create [releases](https://help.github.com/articles/creating-releases/){:target="\_blank"} to mark specific Git tags for general availability.

You can set a [trigger]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) for GitHub releases. When there is a GitHub release, the following variables are also available:

<!-- markdownlint-disable MD033 -->

{: .table .table-bordered .table-hover}
| Variable        | Description                                            |
| --------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_RELEASE_NAME}}`{% endraw %}     | The GitHub release title.   |
| {% raw %}`${{CF_RELEASE_TAG}}`{% endraw %}      | The Git tag version.   |
| {% raw %}`${{CF_RELEASE_ID}}`{% endraw %}       | The internal ID for the release.   |
| {% raw %}`${{CF_PRERELEASE_FLAG}}`{% endraw %}  | Indicates if the release is production-ready or not.<br>`true`: The release is marked as non-production ready.<br>`false`: The release is ready for production.   |

<!-- markdownlint-enable MD033 -->

### GitHub Pull Request variables

The table lists the variables available when a PR (Pull Request) is closed in GitHub.

<!-- markdownlint-disable MD033 -->

{: .table .table-bordered .table-hover}
| Variable        | Description                                            |
| --------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_PULL_REQUEST_MERGED}}`{% endraw %}     | Set to:<br>`true`: The PR was merged to base branch.<br>`false`: The PR was not merged.    |
| {% raw %}`${{CF_PULL_REQUEST_HEAD_BRANCH}}`{% endraw %}      |The head branch of the PR, which is the branch to be merged to master.|
| {% raw %}`${{CF_PULL_REQUEST_MERGED_COMMIT_SHA}}`{% endraw %}       | The commit SHA on the base branch after the PR was merged. In most cases it will be the master. |
| {% raw %}`${{CF_PULL_REQUEST_HEAD_COMMIT_SHA}}`{% endraw %}  | The commit SHA on the head branch, which is the branch to push to master.  |

<!-- markdownlint-enable MD033 -->

### Gerrit changeId & change message variables

Gerrit has no explicit concept of PRs as in other version control systems to map trigger event payloads to builds. Instead, Gerrit uses `Changes` which serves a similar purpose and functionality as PRs. You can achieve the same functionality in Codefresh with our `CF_PULL_REQUEST` group of environment variables.

<!-- markdownlint-disable MD033 -->

{: .table .table-bordered .table-hover}
| Variable        | Description                                            |
| --------------- | ------------------------------------------------------ |
| {% raw %}`${{CF_PULL_REQUEST_ID}}`{% endraw %}             | The change identified by the `change-Id`.   |
| {% raw %}`${{CF_PULL_REQUEST_TARGET}}`{% endraw %}         | The target branch of the pull request. <br>For Gerrit, use this in place of `Change target branch name`. |
| {% raw %}`${{CF_PULL_REQUEST_COMMENT}}`{% endraw %}        | The comment added to the pull request.<br>For Gerrit, use this in place of `Change message`.  |
| {% raw %}`${{CF_PULL_REQUEST_COMMENT_AUTHOR}}`{% endraw %} | The user who added the comment to the pull request.<br>For Gerrit, use this in place of `Change author`.  |

<!-- markdownlint-enable MD033 -->

## User-defined variables

User-defined variables are custom variables you add to Codefresh entities such as projects, pipelines, build triggers, and manual build runs.  
You create such variables manually or by importing predefined variables from files (see [How to](#create-user-defined-variables)). You can also create empty variables, without any values.

### Empty user-defined variables

Codefresh allows you to add variables with just the key definitions, without values. The values are automatically populated during pipeline execution or defined manually.
You can add empty variables to:

* Projects
* Pipelines
* Build triggers

> **NOTE**  
> Encryption is not supported for empty variables.

### Import user-defined variables in bulk

Add custom variables in bulk by pasting them into the text editor or by importing them from a file.  

* Import from text  
  This is a quick option to add variables defined locally or in specific environments to a pipeline.
  You simply copy the set of variables and paste them into the text editor.

* Import from file  
  Importing from a file is useful when you have a file containing the predefined variables.

### Order of precedence for user-defined variables

In Codefresh, becuase you can add user-defined variables to different entities, variable definitions are available at levels.

If the variable with the same name is defined at multiple levels, the override rules are based on the priority of the variable. Variables at levels with higher priority override those at levels with lower priority.

For example if a pipeline variable is defined both within a project, and as an execution parameter of a specific build, the final result will be the value of the variable defined as a build parameter. The project-level variable is ignored.

Listed below are the different levels for user-defined variables in order of priority, from the highest to the lowest.

1. Steps
   * `export` command  
     Within the current step using [`export`](http://linuxcommand.org/lc3_man_pages/exporth.html){:target="\_blank"}, or in any **subsequent** step using [cf_export](#exporting-variables-with-cf_export) commands.
   * [`freestyle`]({{site.baseurl}}/docs/pipelines/steps/freestyle/#examples) steps with `environment` field.
  
    > **NOTE**  
    > Step-level variables with `export` take precedence over freestyle-step variables with `environment`.
1. Builds
   * Within a specific build execution from the Codefresh UI or from the [CLI]({{site.baseurl}}/docs/integrations/codefresh-api/#example---triggering-pipelines).
1. Pipeline
1. [Shared-configurations]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/)
1. Projects

The variables are injected into pipelines from different sources and at different levels. To view the variables actually used by a specific build of the pipeline, see [Viewing variables in pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-variables-in-pipeline-builds).

### Create user-defined variables

Create user-defined variables by selecting the target entity and then adding the variables.

#### Step 1: Select entity to which to add variables

You can create user-defined variables for projects, pipelines, build runs, and steps.

* **Projects**  
  In the row with the Project to which to add variables, click the **Settings** icon, and then click the **Variables** tab.

  {% include
  image.html
  lightbox="true"
  file="/images/pipeline/variables/project-variables.png"
  url="/images/pipeline/variables/project-variables.png"
  alt="Adding user-defined variables to projects"
  caption="Adding user-defined variables to projects"
  max-width="60%"
  %}

* **Pipelines**  
  * In the row with the Pipeline to which to add variables, click the **Settings** icon.
  * On the right, click **Variables**.

    {% include
    image.html
    lightbox="true"
    file="/images/pipeline/variables/pipeline-variables.png"
    url="/images/pipeline/variables/pipeline-variables.png"
    alt="Adding user-defined variables to pipelines"
    caption="Adding user-defined variables to pipelines"
    max-width="60%"
    %}

* **Steps**
  * Select the pipeline.
  * In the **Workflow** tab, add the variable with the correct syntax to the step as required.

* **Builds**
  * From the Builds page, in the Pipelines column, click the pipeline name.
  * Click **Run**.
  * Expand Build Variables.

    {% include
    image.html
    lightbox="true"
    file="/images/pipeline/variables/build-variables.png"
    url="/images/pipeline/variables/build-variables.png"
    alt="Adding user-defined variables to build runs"
    caption="Adding user-defined variables to build runs"
    max-width="60%"
    %}

#### Step 2: Add variables

Add variables manually by defining them as key-value pairs, or by importing them from files.

When adding variables, manually or through import, you can add/include empty variables, that is add only the key for the variable and leave the value empty to be dynamically or manually populated.
Apart from empty variables, you can also encrypt sensitive variables for reasons of security.

1. To manually add variables, click **Add Variable**.
    * To add the variable with its default value, enter the key-value pair.  
    * To add an empty variable without a default value, simply type the key.

{% include
image.html
lightbox="true"
file="/images/pipeline/variables/example-empty-variable.png"
url="/images/pipeline/variables/example-empty-variable.png"
alt="Example of empty variable in project"
caption="Example of empty variable in project"
max-width="60%"
%}

{:start="2"}
1. (Applies only to projects and pipelines) To import by copy and paste, click **Import from Text**:
  * Copy the set of variables to add.
  * Paste into the text editor.
  * Click **Import**
{:start="3"}
1. (Applies only to projects and pipelines) To import them from a file, click **Import from File**:
  * Browse to the file to import, and then click **Import**.

<!-- markdownlint-disable MD033 -->
{:start="4"}
1. Click **Save**.
1. To encrypt the variables (not supported for empty variables), click {::nomarkdown}<img src="../../../images/icons/encrypt.png"  display=inline-block alt="lock icon"> <b>Encrypt</b>{:/}, and confirm.

<!-- markdownlint-enable MD033 -->

## Exporting environment variables from a freestyle step

Steps defined within steps are scoped to the step within which they were created, even when using the `export` command.  
To use variables across steps, we provide a shared file through which you can import and export variables.

There are two ways to add variables to the shared file:

* Using the `cf_export` command
* Writing directly to the file

### Exporting variables with `cf_export`

Within every freestyle step, the `cf_export` command allows you to export variables across steps by writing to the shared variables file.  

> **NOTE**  
> Variables exported through `cf_export` override those at the pipeline-level.

You can either:

* Explicitly state a VAR=VAL pair  
* State the name of an existing *exported* environment variable, for example, `EXISTING_VAR`

{% raw %}

```yaml
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
```

{% endraw %}

By default, `cf_export` variables work only on *subsequent* steps, meaning the steps that follow the step in which the variable is defined.  
To export a variable both to the current step and to all the remaining steps, do the following:

```shell
export MY_VAR='example' # Makes MY_VAR available in this step only
cf_export MY_VAR='example' # Makes MY_VAR available also to all steps after this one
```

There is nothing really magical about `cf_export`. It is a normal script. You can see its contents on your own by entering the command `cat /codefresh/volume/cf_export` on any [Codefresh freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/) inside a pipeline.

#### `cf_export` syntax

`cf_export` has the same syntax as the [bash export command](https://www.gnu.org/software/bash/manual/html_node/Environment.html){:target="\_blank"}.
This means that when you use `cf_export`, you **don't** need to add dollar signs for the variable that is created/assigned.

```shell
cf_export $MY_VAR # Don't do this
cf_export MY_VAR # Correct syntax
```

#### Masking variables within `cf_export`

Mask variables within `cf_export` by defining the `--mask` flag.  
Values of masked variables in `cf_export` commands are replaced with asterisks in the build logs. This helps to ensure that sensitive information is not exposed also in the variables list, in addition to the logs.

Here is an example with standard and masked versions of the same variable in `cf_export` commands.

{% raw %}

```yaml
version: '1.0'
steps:
  freestyle-step:
    description: Freestyle step..
    title: Free styling
    image: alpine:latest
    commands:
      - export EXISTING_VAR=some-value

      - cf_export VAR1=alpine:latest VAR2=VALUE2 EXISTING_VAR --mask #masked version
```

{% endraw %}

#### Multi-line variables with `cf_export`

When exporting a multi-line variable using `cf_export`, to prevent truncation, encode it in `base64`.

{% raw %}

```yaml
version: "1.0"
steps:
  assign:
    image: alpine
    commands:
      - apk add --update coreutils
      - export TEST=`echo "line1" && echo "line2" && echo "line3"`
      - echo $TEST
      - cf_export TEST=`echo $TEST | base64 -w 0`
  test:
    image: alpine
    commands:
      - echo $TEST
      - echo `echo $TEST | base64 -d`
```

{% endraw %}

### Directly writing to the file

For more advanced use cases, you can write directly to the shared variable file that Codefresh reads to understand which variables need to be available to all steps.

This file has a simple format where each line is a variable, and its value in the form of `VARIABLE=VALUE`.  
The `cf_export` command mentioned in the previous section is just a shorthand for writing on this file.

The variables file is available inside freestyle steps in the following path: **`{% raw %}${{CF_VOLUME_PATH}}{% endraw %}/env_vars_to_export`**.

{% raw %}

```yaml
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
```

{% endraw %}

Use this technique if you have complex expressions that have issues with the `cf_export` command.

## Exporting external link with `CF_OUTPUT_URL`

Use the `CF_OUTPUT_URL` variable to export any external in the form of a URL.

This variable can be useful to output the URL of the parent pipeline, and navigate from the child to the parent build.  Remember that Codefresh has native support to trigger child builds from parent builds, and to navigate from the parent to the child build through the `codefresh-run` plugin ([link](https://codefresh.io/steps/step/codefresh-run)).  

### Add `CF_OUTPUT_URL` with `cf_export`

Simply add a step to the child build with an in-step link to the parent build. The URL link to the parent build is displayed as part of the step details in the Builds page.  

Create a link to the parent-build using `cf_export` and `CF_OUTPUT_URL`.

### Example step in child build to output link to parent

Add the following step at the beginning of the pipeline.

> **NOTE**  
> The name of the variable exported by `cf_export` must have the format `<name|key_of_step>_CF_OUTPUT_URL`. It's value is the URL of the parent build to link to.

{% raw %}

```yaml
    steps:
      ...
      linkToParentBuild:
        image: codefresh/cli
        commands:
          - export parentBuildId=$(codefresh get annotation build ${{CF_BUILD_ID}} cf_predecessor -o json | jq -r '.value')
          - cf_export linkToParentBuild_CF_OUTPUT_URL="${{CF_URL}}/build/${parentBuildId}"
      ...
```

{% endraw %}

In the Builds page, the step details of the child build displays the **Output URL** which is the link to the parent build, as in the image below.

{% include
image.html
lightbox="true"
file="/images/troubleshooting/how-to-navigate-to-parent-build-from-child-build.png"
url="/images/troubleshooting/how-to-navigate-to-parent-build-from-child-build.png"
alt="Output URL link"
caption="Output URL link"
max-width="60%"
%}

## Masking variables in logs

Codefresh has the built-in capability to automatically mask encyrpted variables in logs. In build logs, the values of encrypted variables are replaced with asterisks.

{% include
image.html
lightbox="true"
file="/images/pipeline/codefresh-yaml/variables/masked-variables.png"
url="/images/pipeline/codefresh-yaml/variables/masked-variables.png"
alt="Masked variables"
caption="Masked variables"
max-width="80%"
%}

The variables can be defined in any of the usual ways Codefresh offers, such as [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/) or [within the pipeline]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-settings):

{% include
image.html
lightbox="true"
file="/images/pipeline/codefresh-yaml/variables/encrypted-variables.png"
url="/images/pipeline/codefresh-yaml/variables/encrypted-variables.png"
alt="Encrypted variables"
caption="Encrypted variables"
max-width="60%"
%}

> **NOTE**
> This feature is currently available only in Enterprise accounts.

<!--- ## Encrypting variables in pipelines
Encrypt sensitive variables when you first define them, or edit them. Encrypt variable values that are already defined or to be automatically populated, in projects, pipelines, and builds.   
For manual pipeline build runs, encrypt the new or existing build-specific variables. 

* Select the entity with the variables to encrypt.
  * (Project- and pipeline-level variables): To encrypt the variable, click the lock icon and click **OK** to confirm.
  * (Build-level variables) To encrypt the variable, click {::nomarkdown}<img src="../../../images/icons/encrypt.png"  display=inline-block> <b>Encrypt</b>{:/}, and confirm. 

{% include
image.html
lightbox="true"
file="/images/pipeline/variables/encrypt-build-variable.png"
url="/images/pipeline/variables/encrypt-build-variable.png"
alt="Encrypt variables for build run"
caption="Encrypt variables for build run"
max-width="50%"
%}
-->

## Escape special characters in variables

When passing special characters through environment variables, use `\` as an escape character.  
For example, to pass a Cassandra connection string, you might do something like `Points\=hostname\;Port\=16376\;Username\=user\;Password\=password`.

This will safely escape `;` and `=`.

## Related articles

[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/)  
