---
layout: docs
title: "Freestyle Beta"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/freestyle-beta
  - /docs/freestyle-beta
toc: true
old_url: /docs/freestyle-beta
was_hidden: true
---
The Freestyle step is designed so you can execute a series of commands in a container.
Select an image to start a container, then you can specify a working directory, and commands.
If you do not specify a working directory or commands, the step runs the organic commands specified by the image.

> Using complex commands in the untyped step requires use of [YAML block scalars](http://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines).

  `YAML`
{% highlight yaml %}
{% raw %}
step_name:
  title: Step Title
  description: Step description
  image: image/id
  working_directory: ${{step_id}}
  commands:
    - bash-command1
    - bash-command2
  entry_point:
    - sh
    - -c
    - command
  environment:
    - key=value
  fail_fast: false
  when:
    branch:
      only: [ master ]
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
{% endraw %}
{% endhighlight %}

**Fields:**

{: .table .table-bordered .table-hover}
| Field                                   | Description                                                                                                                                                                                                                                                                                                                                                                    | Required/Optional/Default |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------|
| `title`                                 | The free-text display name of the step.                                                                                                                                                                                                                                                                                                                                        | Optional                  |
| `description`                           | A basic, free-text description of the step.                                                                                                                                                                                                                                                                                                                                    | Optional                  |
| `image`                                 | The image from which the executable container is created. It can be an explicit ID of a Docker image, or a variable that references a **Build** or **Push** step.                                                                                                                                                                                                              | Required                  |
| `working_directory`                     | The directory from which the commands are executed.  It can be an explicit path in the container's file system, or a variable that references another step.<br>The default `working_directory` is the cloned repository directory and not the working directory specified by the image.<br>If you need to use the default working directory of the image use `IMAGE_WORK_DIR`. | Default                   |
| `commands`                              | One or more bash commands to execute.                                                                                                                                                                                                                                                                                                                                          | Optional                  |
| `entry_point`                           | An alternative [Docker Container Entrypoint](https://docs.docker.com/engine/reference/builder/#/entrypoint). <br>Can be a string or an array of strings.                                                                                                                                                                                                                       | Optional                  |
| `environment`                           | A set of environment variables for the container.                                                                                                                                                                                                                                                                                                                              | Optional                  |
| `fail_fast`                             | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                                                                                                                                                       | Default                   |
| `when`                                  | Define a set of conditions that need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                                                                                                          | Optional                  |
| `on_success`, `on_fail` and `on_finish` | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).                                                                                                                                                                                      | Optional                  |

**Exported resources:**
- Working Directory.
