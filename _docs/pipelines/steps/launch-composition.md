---
title: "Launch-Composition step"
description: "Create a test environment with its dependencies in Codefresh infrastructure"
group: pipelines
sub_group: steps
redirect_from:
  - /docs/codefresh-yaml/steps/launch-composition/
  - /docs/launch-composition-2/
  - /docs/codefresh-yaml/steps/launch-composition-2/
toc: true
---
The Launch Composition step provides the ability to launch long term running environments that can live outside the context of a running pipeline.
You can use this step to automate your test environment creation through a codefresh.yml file instead of manually launching an environment from the UI.

>**NOTE**  
`launch-composition` creates a permanent test environment that keeps running even after a pipeline has finished. If you just want temporary test environments that run *only while* a pipeline is running, see [service containers]({{site.baseurl}}/docs/pipelines/service-containers/) and the documentation page for [integration tests]({{site.baseurl}}/docs/testing/integration-tests/).

## Usage

  `ui defined composition`
{% highlight yaml %}
step_name:
  title: Step Title
  type: launch-composition
  composition: 'ui_defined_composition_name'
  environment_name: 'environment name'
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
{% endhighlight %}

  `inline composition`
{% highlight yaml %}
step_name:
  type: launch-composition
  composition:
    version: '2'
    services:
      app:
        image: owner/app:latest
      db:
        image: mongo
  environment_name: 'environment name'
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
  retry:
    ...  
{% endhighlight %}

  `from file composition`
{% highlight yaml %}
step_name:
  type: launch-composition
  working_directory: ${{a_clone_step}}
  composition: './path/to/docker-compose.yaml'
  environment_name: 'environment name'
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
{% endhighlight %}

## Fields

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                             | Required/Optional/Default |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                 | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                             | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/pipelines/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `working_directory`                        | The directory in which to search for the composition file. It can be an explicit path in the container's file system, or a variable that references another step. <br> The default is {% raw %}`${{main_clone}}`{% endraw %}.           | Default                   |
| `composition`                              | The composition you want to run. It can be an inline YAML definition, a path to a composition file on the file system, or the logical name of a composition stored in the Codefresh system.                                             | Required                  |
| `environment_name`                         | The environment name that will be given. In case a previous environment exists with the same name, it will first be terminated. The default value will the be the name/path provided in the 'composition' field.                        | Default                   |
| `composition_variables`                    | A set of environment variables to substitute in the composition.                                                                                                                                                                        | Optional                  |
|`timeout`   | The maximum duration permitted to complete step execution in seconds (`s`), minutes (`m`), or hours (`h`), after which to automatically terminate step execution. For example, `timeout: 1.5h`. <br>The timeout supports integers and floating numbers, and can be set to a maximum of 2147483647ms (approximately 24.8 days). <br><br>If defined and set to either `0s/m/h` or `null`, the timeout is ignored and step execution is not terminated.<br>See [Add a timeout to terminate step execution](#add-a-timeout-to-terminate-step-execution). |Optional|
| `fail_fast`                              | Determines pipeline execution behavior in case of step failure. {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>: The default, terminates pipeline execution upon step failure. The Build status returns `Failed to execute`.</li><li><code class="highlighter-rouge">false</code>: Continues pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Build completed successfully</code>. <br>To change the Build status, set <code class="highlighter-rouge">strict_fail_fast</code> to <code class="highlighter-rouge">true</code>.</li></ul>{:/}| Optional  |
| `strict_fail_fast`   |Specifies how to report the Build status when `fail_fast` is set to `false`.<br>**NOTE**:<br>Requires Runner chart upgrade to v6.3.9 or higher.<br><br>You can set the Build status reporting behavior at the root-level or at the step-level for the pipeline.{::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>:<ul><li>When set at the <i>root-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the <i>step-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> and <code class="highlighter-rouge">strict_fail_fast=true</code> fails to execute.</li></ul></li><li><code class="highlighter-rouge">false</code>:<ul><li>When set at the <i>root-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the <i>step-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li></ul></li></ul>{:/}<br>**NOTES**:<br>`strict_fail_fast` does not impact the Build status reported for parallel steps with `fail_fast` enabled. Even if a child step fails, the parallel step itself is considered successful. See also [Handling error conditions in a pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/#handling-error-conditions-in-a-pipeline).| Optional                  |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step.<br>You can find more information in the [conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) article.                              | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [post-step operations]({{site.baseurl}}/docs/pipelines/post-step-operations/).                                                                                                           | Optional                  |
| entry_point                                | The name of main service                                                                                                                                                                                                                | Optional                 |
| `retry`   | Define retry behavior as described in [retrying a step]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

## Add a timeout to terminate step execution
To prevent steps from running beyond a specific duration if so required, you can add the `timeout` flag to the step.  
When defined: 
* The `timeout` is activated at the beginning of the step, before the step pulls images.
* When the step's execution duration exceeds the duration defined for the `timeout`, the step is automatically terminated. 

>**NOTE**  
To define timeouts for parallel steps, see [Adding timeouts for parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/#add-timeouts-for-parallel-steps).

Here's an example of the `timeout` field in the step:

  `ui defined composition`
{% highlight yaml %}
step_name:
  title: Step Title
  type: launch-composition
  composition: 'ui_defined_composition_name'
  environment_name: 'environment name'
  timeout: 45m
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
{% endhighlight %}

  `inline composition`
{% highlight yaml %}
step_name:
  type: launch-composition
  timeout: 45m
  composition:
    version: '2'
    services:
      app:
        image: owner/app:latest
      db:
        image: mongo
  environment_name: 'environment name'
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
  retry:
    ...  
{% endhighlight %}

  `from file composition`
{% highlight yaml %}
step_name:
  type: launch-composition
  working_directory: ${{a_clone_step}}
  composition: './path/to/docker-compose.yaml'
  environment_name: 'environment name'
  timeout: 45m
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
{% endhighlight %}


##### Timeout info in logs
Timeout information is displayed in the logs, as in the example below. 

{% include image.html
lightbox="true"
file="/images/steps/timeout-messages-in-logs.png"
url="/images/steps/timeout-messages-in-logs.png"
caption="Step termination due to timeout in logs"
alt="Step termination due to timeout in logs"
max-width="60%"
%}

## Related articles
[On-demand environment quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/on-demand-environments/)  
[Launch Composition example]({{site.baseurl}}/docs/example-catalog/ci-examples/launch-composition/)  
[Integration testing]({{site.baseurl}}/docs/testing/integration-tests/)  
[Service containers in pipelines]({{site.baseurl}}/docs/pipelines/service-containers/)