---
layout: docs
title: "Launch-Composition"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/launch-composition-2
toc: true
---
The launch composition step provides the ability to launch long term running environment that can live outside the context of the running flow.
You can use this step to automate your environment creation through codefresh.yaml file instead of manually launching an environment from the ui.

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

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                             | Required/Optional/Default |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                 | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                             | Optional                  |
| `working_directory`                        | The directory in which to search for the composition file. It can be an explicit path in the container's file system, or a variable that references another step. <br> The default is {% raw %}`${{main_clone}}`{% endraw %}.           | Default                   |
| `composition`                              | The composition you want to run. It can be an inline YAML definition, a path to a composition file on the file system, or the logical name of a composition stored in the Codefresh system.                                             | Required                  |
| `environment_name`                         | The environment name that will be given. In case a previous environment exists with the same name, it will first be terminated. The default value will the be the name/path provided in the 'composition' field.                        | Default                   |
| `composition_variables`                    | A set of environment variables to substitute in the composition.                                                                                                                                                                        | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                | Default                   |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step.<br>You can find more information in the [[Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                              | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).                                                                                                           | Optional                  |
| entry_point                                | The name of main service                                                                                                                                                                                                                | Optional                 |
