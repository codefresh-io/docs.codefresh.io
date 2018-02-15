---
layout: docs
title: "Variables"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/variables
toc: true
---
Variables in the YAML follow this format: {% raw %}`${{VAR_NAME}}`{% endraw %}.
The flow provides three forms of variable substitution:
- system provided: substituted during the workflow compilation phase.
- context related: substituted in real time during the workflow execution.
- custom user provided: created and substituted in real time during the workflow execution

## System Provided Variables

All system provided variables will also be automatically injected to any freestyle step.

{: .table .table-bordered .table-hover}
| Variable                                          | Description                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| {% raw %}`${{CF_REPO_OWNER}} `{% endraw %}        | Repository owner.                                                                                                                                                                                                          |
| {% raw %}`${{CF_REPO_NAME}}`{% endraw %}          | Repository name. |
| {% raw %}`${{CF_BRANCH}}`{% endraw %}             | Branch name of the Git repository of the main pipeline, at the time of execution. <br/>You can also use {% raw %}`${{CF_BRANCH_TAG_NORMALIZED}}`{% endraw %} to get the branch name normalized. It will be without any chars that are illegal in case the branch name were to be used as the Docker image tag name. |
| {% raw %}`${{CF_COMMIT_AUTHOR}}`{% endraw %}      | Commit author.                                                                                                                                                                                                                                                                                    |
| {% raw %}`${{CF_COMMIT_URL}}`{% endraw %}         | Commit url.                                                                                                                                                                                                                                                                                       |
| {% raw %}`${{CF_COMMIT_MESSAGE}}`{% endraw %}     | Commit message of the git repository revision, at the time of execution.<br/> The messages quotes are escaped (i.e. ' is not \', " is now \").                                                                                                                                                         |
| {% raw %}`${{CF_REVISION}}`{% endraw %}           | Revision of the Git repository of the main pipeline, at the time of execution. <br/> You can also use {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %}  to get the abbreviated 7-character revision hash, as used in git. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_SHORT_REVISION}}`{% endraw %}                 |
| {% raw %}`${{CF_VOLUME_NAME}}`{% endraw %}        | Will refer to the volume that was generated for the specific flow. Can be used in conjunction with a composition to provide access to your cloned repository.For example:test-server:  volumes: {% raw %}`- ${{CF_VOLUME}}:/cloned/repo`{% endraw %}                                                                   |
| {% raw %}`${{CF_VOLUME_PATH}}`{% endraw %}        | Will refer to the mounted path of the workflow volume inside a Freestyle container.                                                                                                                                                                                                               |
| {% raw %}`${{CF_BUILD_TRIGGER}}`{% endraw %}      | Will be an indication of the current build was triggered: *build: The build was triggered from the build button * webhook: The build was triggered from a control version webhook                                                                                                                  |
| {% raw %}`${{CF_BUILD_ID}}`{% endraw %}           | The build id. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_BUILD_ID}}`{% endraw %}                                                                                                                                                                                                |
| {% raw %}`${{CF_BUILD_TIMESTAMP}}`{% endraw %}    | The timestamp the build was created. Note: use this variable as string with quotes to tag the image {% raw %}`${{CF_BUILD_TIMESTAMP}}`{% endraw %}                                                                                                                                                                   |
| {% raw %}`${{CF_BUILD_URL}}`{% endraw %}          | The URL to the build in Codefresh                                                                                                                                                                                                                                                                 |
| {% raw %}`${{CF_KUBECONFIG_PATH}}`{% endraw %}    | Path to kubeconfig if exist                                                                                                                                                                                                                                                                       |
| Any variable specified in the pipeline settings   | For example, if you configure the pipeline settings with a variable named PORT, you can put the variable in your YAML build descriptor as {% raw %}`${{PORT}}`{% endraw %}.                                                                                                                                              |

## Context Related Variables
Context related variables are created dynamically during the workflow execution and according to the used steps.

{: .table .table-bordered .table-hover}
| Variable                                          | Description                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Working Directories**                           | For example, you can set the working directory of step `A` with a variable named after a previously executed step, step `B`. Therefore, setting step `A` with {% raw %}`working-directory:${{B}}`{% endraw %} means that step `A` executes in the same working directory as step `B`.                |
| **Images**                                        | You can set the candidate field of the push step with a variable named after a previously executed build step. Since the details of a created image are not necessarily known ahead of time, the variable can create an association to an optionally dynamic image name. Therefore, setting push step `A` with {% raw %}`candidate:${{B}}`{% endraw %} means that step `A` will push the image build buy step `B`.                |

## Custom User Provided Variables
Custom variables can be created during the workflow execution inside of a freestyle step.
Once a variable has been created it will:
- automatically be injected into any future freestyle step.
- automatically be used as composition variables for composition steps.
- will be used for substitutions in the yaml file just like the `system provided` variables are used in the compilation phase.

Custom variables are wiped clean on every pipeline execution, but are not modified as the steps progress.

<div class="bd-callout bd-callout-info" markdown="1">
##### Exporting environment variables from a freestyle step

In case you want to export environment variables from an existing step this is the way to do it
</div>

Codefresh exposes a file for each freestyle step that custom variables can be registered to.
There are two ways to add variables to this file

## Custom Variables Option a: Using cf_export cli
In case your freestyle step has sh installed, you can use our prepared cli that will enable you to easily add new variables.

You can either:
- explicitly state a VAR=VAL pair  
- state the name of an existing environment variable (like EXISTING_VAR).

  `Using the bash utility`
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
 
## Custom Variables Options b: Manually appending to the file
Appending variables manually can be useful in more complicated scenarios.

The variables file will be exposed inside the freestyle container in the following path: **`{% raw %}${{CF_VOLUME_PATH}}{% endraw %}/env_vars_to_export`** 

You can use this technique to even inject a file with multiple variables.

  `manually appending`
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
