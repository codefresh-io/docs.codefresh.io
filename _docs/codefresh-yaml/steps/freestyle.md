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
  volumes:
    - ./relative-dir-under-cf-volume1:/absolute-dir-in-container1
    - ./relative-dir-under-cf-volume2:/absolute-dir-in-container2
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
| `volumes` | One or more volumes for the container. All volumes must be mounted from the existing shared volume (see details below) |Optional 
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
## Custom volumes


If you are familiar with [Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) you should know that all freestyle steps automatically share a volume mounted at `/codefresh/volume` which can be used to transfer data (e.g. dependencies and test results) from each step to the next.

**This volume is automatically mounted by Codefresh and needs no configuration at all**. All you have to do to access it, is reading/writing the `/codefresh/volume` folder from your application. This folder also [includes by default the source code]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#cloning-the-source-code) of the git repository connected to the pipeline (at the `/codefresh/volume/<repo_name>` subfolder)

You can use the `volumes` property to create your own custom volumes that can be mounted in different folders. **For security reasons however all source volume data (i.e. the "host" folder) still need to be bound with `/codefresh/volume` or any of its subdirectories**:

Attempting to mount a folder outside of `/codefresh/volume` will result in an error.

### Simple volume example

Let's assume that your application expects to find a configuration folder at `/config`. The folder however that contains the needed files in GIT is under `my-app-repo/my-sample-config`. When the application is checked out the files actually reside at `/codefresh/volume/my-app-repo/my-sample-config`. 

You can still run your application without any code changes by doing the following bind:

```yaml
title: Running my application with custom volume
image: my-docker-app:latest
  volumes:
    - ./my-app-repo/my-sample-config:/config # host path is relative to /codefresh/volume
```

Now the `my-docker-app` application will run and find all its needed files at `/config`.

Notice that we use a relative path here but even if you used an absolute one (`/my-app/my-sample-config`) the result would be the same because Codefresh does not allow you to bind anything outside the shared Codefresh volume.

### Injecting custom folders in a running container 

Here is another example pipeline with two steps. The first one creates a custom config file in the shared Codefresh volume (that is always available) at `/codefresh/volume/my-config`. The second step reads the config file at a different folder in `/my-own-config-folder-injected`.

```yaml
version: '1.0'
steps:
  CreateCustomConfiguration:
    title: Creating configuration
    image: alpine
    commands:
    - mkdir -p /codefresh/volume/my-config
    - echo "foo=bar" > /codefresh/volume/my-config/custom.txt
    - ls /codefresh/volume/my-config
  InjectConfiguration:
    title: Reading configuration
    image: alpine
    commands:
    - ls /codefresh/volume/my-config # Codefresh default volume shared between all steps
    - ls /my-own-config-folder-injected # Special volume just for this container
    - cat /my-own-config-folder-injected/custom.txt
    volumes:
    - ./my-config:/my-own-config-folder-injected
   
```
When the second steps runs the `custom.txt` is available both at `/codefresh/volume/my-config` (the shared volume of all steps) as well as the `/my-own-config-folder-injected` which was mounted specifically for this step.

