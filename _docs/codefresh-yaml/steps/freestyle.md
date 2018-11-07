---
title: "Freestyle"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/freestyle/
toc: true
---
The Freestyle step is designed so you can execute a series of commands in a container.
Select an image to start a container, then you can specify a working directory, and commands.
If you do not specify a working directory or commands, the step runs the organic commands specified by the image.

{: .blockquote}
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
  cmd:
    - arg1
    - arg2
  environment:
    - key=value
  entry_point:
    - cmd
    - arg1
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
  retry:
    ...  
{% endraw %}
{% endhighlight %}

**Fields:**

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                                                                                                                                                                 | Required/Optional/Default |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                                                                                                                                                     | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                                                                                                                                                                 | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#grouping-steps-with-pipeline-stages) for more information.                                                                                                                                                                                          | Optional                  |
| `image`                                    | The image from which the executable container is created. It can be an explicit ID of a Docker image, or a variable that references a **Build** or **Push** step.                                                                                                                                                                                                           | Required                  |
| `working_directory`                        | The directory from which the commands are executed. It can be an explicit path in the container's file system, or a variable that references another step. The default `working_directory` is the cloned repository directory and not the working directory specified by the image. If you need to use the default working directory of the image use `IMAGE_WORK_DIR`.     | Default                   |
| `commands`                                 | One or more commands to execute in a shell in the container, as array of strings.                                                                                                                                                                                                                                                                                                                                        | Optional                  |
| `cmd`                                 | docker CMD arguments to use along with the container entrypoint. can be string or array of strings.                                                                                                                                                                                                                                                                                                                                       | Optional                  |
| `entry_point`                                 | override the default container entrypoint. can be string or array of strings.                                                                                                                                                                                                                                                                                                                                      | Optional                  |
| `environment`                              | A set of environment variables for the container.                                                                                                                                                                                                                                                                                                                           | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                                                                                                                                                    | Default                   |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                                                                                                                                                                     | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).                                                                                                                                                                                                                                             | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

**Exported resources:**
- Working Directory.

## Entry point

When using the original container entrypoint, you can use the `cmd` field to specify additional agruments to be used with the entrypoint. This can be a string, or an array of strings. For example:  

```yaml
image: mwendler/cowsay
cmd:
  - "Hello"
```

is equivalent to running `docker run mwendler/cowsay Hello` which is equivalent to running `cowsay Hello` inside the container.


You can override the container's default entrypoint using the `entry_point` field. This can be a string, or an array of strings. For example:

```yaml

image: mwendler/cowsay
   entry_point:
     - echo
     - Hello 
```

## Commands

When you use the `commands` field, it will override the container original `entrypoint` and will execute the commands in a shell inside the container.    
The provided commands are concatenated into a single command using the shell's `;` operator, and are run using the default shell `/bin/sh` as an entry point.  
Additional settings that are set only when using commands are `set -e`, and the `cf_export` utility.

### Commands and Entry point

If you want to retain the original entrypoint, do not use the `commands` field.  

However, this example:

```yaml
image: mwendler/cowsay
commands:
  - "Hello"
```

will cause and error because the engine will attempt to run the command `Hello` in a shell inside the container, and the command `Hello` is not a valid command.  
In order to use the `commands` form with an `entrypoint` enabled container, you can add the commands from the entrypoint to the list of commands, like so:

```yaml
image: mwendler/cowsay
commands:
  - cowsay "Hello"
```

