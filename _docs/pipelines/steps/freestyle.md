---
title: "Freestyle"
description: "Run commands inside a Docker container"
group: pipelines
sub_group: steps
toc: true
---
The Freestyle step is designed so you can execute a series of commands in a container. Freestyle steps
are the bread and butter of [Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/).

## Purpose of freestyle steps

In Codefresh, docker containers are first-class citizens
and special typed steps are offered for the most usual docker commands. Freestyle steps are a secure replacement for `docker run` commands.


Therefore, this command on your local workstation:

```
docker run python:3.6.4-alpine3.6 pip install .
```

will become in Codefresh the following freestyle step.

```yaml
CollectAllMyDeps:
  title: Install dependencies
  image: python:3.6.4-alpine3.6
  commands:
    - pip install .
```


Select an image to start a container, then you can specify a working directory, and commands.
If you do not specify a working directory or commands, the step runs the organic commands specified by the image.
In all freestyle steps Codefresh automatically [uses a shared docker volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) that contains your git source code.

## Usage

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
  shell: sh  
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

## Fields

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                                                                                                                                                                 | Required/Optional/Default |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                                                                                                                                                     | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                                                                                                                                                                 | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/pipelines/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `image`                                    | The image from which the executable container is created. It can be an explicit ID of a Docker image, or a variable that references a **Build** or **Push** step.                                                                                                                                                                                                           | Required                  |
| `working_directory`                        | The directory from which the commands are executed. It can be an explicit path in the container's file system, or a variable that references another step. The default `working_directory` is the cloned repository directory and not the working directory specified by the image. If you need to use the default working directory of the image use `IMAGE_WORK_DIR`.     | Default                   |
| `commands`                                 | One or more commands to execute in a shell in the container, as array of strings.                                                                                                                                                                                                                                                                                                                                        | Optional                  |
| `cmd`                                 | docker CMD arguments to use along with the container entry point. can be string or array of strings.                                                                                                                                                                                                                                                                                                                                       | Optional                  |
| `entry_point`                                 | Override the default container entry point. can be string or array of strings.                                                                                                                                                                                                                                                                                                                                      | Optional                  |
| `shell`                                    | Explicitly set the executing shell to bash or sh. If not set the default will be sh. Note the `bash` option requires that you specify an `image` that includes `/bin/bash`; many images do not.                                                                                                                                                                                                                                                                                                                                     | Optional                  |
| `environment`                              | A set of environment variables for the container.                                                                                                                                                                                                                                                                                                                           | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                                                                                                                                                    | Default                   |
| `registry_context`                                 | Advanced property for resolving Docker images when [working with multiple registries with the same domain]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain)                            | Optional                  |
| `volumes` | One or more volumes for the container. All volumes must be mounted from the existing shared volume (see details below) |Optional 
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) article.                                                                                                                                                                     | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/pipelines/post-step-operations/).                                                                                                                                                                                                                                             | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

**Exported resources:**
- Working Directory.

## Examples

Here are some full pipelines with freestyle steps. Notice that in all cases the pipelines are connected to [git repositories]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-creation-modes)
so the source code is already checked out and available to all pipeline steps.

**Creating a [JAR file]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/):**

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_jar_compilation:
    title: Compile/Unit test
    image: maven:3.5.2-jdk-8-alpine
    commands:
     - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository package
{% endhighlight %}

Note how we [cache Maven dependencies]({{site.baseurl}}/docs/example-catalog/ci-examples/java/spring-boot-2/#caching-the-maven-dependencies) using the internal Codefresh Volume.

**Running unit tests in [Node.JS]({{site.baseurl}}/docs/example-catalog/ci-examples/nodejs/):**

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_node_app:
    title: Running unit tests
    image: node:11
    commands:
     - npm install
     - npm run test
{% endhighlight %}

**Packaging a [GO application]({{site.baseurl}}/docs/example-catalog/ci-examples/golang-hello-world/):**

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  my_go_app:
    title: Compiling GO code
    image: golang:1.7.1
    commands:
     - go get github.com/example-user/example-repo
     - go build
{% endhighlight %}

**Performing a [blue/green deployment](https://github.com/codefresh-io/k8s-blue-green-deployment):** 

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  blueGreenDeploy:
    title: Deploying new version
    image: codefresh/k8s-blue-green:master
    environment:
      - SERVICE_NAME=my-demo-app
      - DEPLOYMENT_NAME=my-demo-app
      - NEW_VERSION=${{CF_SHORT_REVISION}}
      - HEALTH_SECONDS=60
      - NAMESPACE=colors
      - KUBE_CONTEXT=myDemoAKSCluster
{% endraw %}      
{% endhighlight %}

## Dynamic freestyle steps

Codefresh has the unique ability to allow you to run freestyle steps in the context of a docker image
created on the same pipeline. This means that you can dynamically [create docker images]({{site.baseurl}}/docs/pipelines/steps/build/) on demand within the pipeline
that needs them.

Creating a custom docker image with extra tools (Terraform and Ansible)

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  CreateMyCustomImage:
    title: Creating custom Docker image
    type: build
    dockerfile: tf_and_ansible.Dockerfile
    image_name: my-iac-tools-container
  UseMyCustomImage:
    title: Running IAC tools
    image: ${{CreateMyCustomImage}}
    commands:
      - terraform --version
      - ansible --version  
{% endraw %} 
{% endhighlight %}

Here the `UseMyCustomImage` freestyle step is running in the [context]({{site.baseurl}}/docs/pipelines/variables/#context-related-variables) of the Docker image that was created in the previous step.
In fact, a very common pattern that you will see in Codefresh pipelines is the executions of [unit tests]({{site.baseurl}}/docs/testing/unit-tests/) in the image that was created in a build step:

`codefresh.yml`
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

Here the `MyAppDockerImage` step is creating a custom docker image. That image is used to run the `MyUnitTests` step.
This pattern works very well for cases where testing tools are already part of the image (usually with dynamic languages).
In other case you can have a second Dockerfile in your application that is designed explicitly to hold all your testing tools.

## Entry point 

When using the original container entry point, you can use the `cmd` field to specify additional arguments to be used with the entry point. This can be a string, or an array of strings. For example:  

```yaml
image: mwendler/cowsay
cmd:
  - "Hello"
```

is equivalent to running `docker run mwendler/cowsay Hello` which is equivalent to running `cowsay Hello` inside the container.


You can override the container's default entry point using the `entry_point` field. This can be a string, or an array of strings. For example:

```yaml

image: mwendler/cowsay
entry_point:
  - echo
  - Hello 
```

## Commands

When you use the `commands` field, it will override the container original `entry_point` and will execute the commands in a shell inside the container.    
The provided commands are concatenated into a single command using the shell's `;` operator, and are run using the default shell `/bin/sh` as an entry point.  
Additional settings that are set only when using commands are `set -e`, and the [`cf_export`]({{site.baseurl}}/docs/pipelines/variables/#using-cf_export-command) utility.

> Using complex commands in the freestyle step requires use of [YAML block scalars](http://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines).

### Commands and Entry point

If you want to retain the original entry point, do not use the `commands` field.  

However, this example:

```yaml
image: mwendler/cowsay
commands:
  - "Hello"
```

will cause and error because the engine will attempt to run the command `Hello` in a shell inside the container, and the command `Hello` is not a valid command.  
In order to use the `commands` form with an `entrypoint` enabled container, you can add the commands from the entry point to the list of commands, like so:

```yaml
image: mwendler/cowsay
commands:
  - cowsay "Hello"
```

## Custom volumes

If you are familiar with [Codefresh pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) you should know that all freestyle steps automatically share a [volume](https://docs.docker.com/storage/) mounted at `/codefresh/volume` which can be used to transfer data (e.g. dependencies and test results) from each step to the next.

**This volume is automatically mounted by Codefresh and needs no configuration at all**. All you have to do to access it, is read/write the `/codefresh/volume` folder from your application. This folder also [includes by default the source code]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#cloning-the-source-code) of the git repository connected to the pipeline (at the `/codefresh/volume/<repo_name>` subfolder)

You can use the `volumes` property to create your own custom volumes that can be mounted in different folders. **For security reasons however all source volume data (i.e. the "host" folder) still needs to be bound with `/codefresh/volume` or any of its subdirectories**:

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

When the second steps runs, the `custom.txt` file is available both at `/codefresh/volume/my-config` (the shared volume of all steps) as well as the `/my-own-config-folder-injected` folder which was mounted specifically for this step.


## More freestyle steps

You can use in a freestyle step any Docker image available in a public repository such as Dockerhub. This makes the integration of Codefresh and various cloud tools very easy.

Codefresh also offers a plugin directory at [http://codefresh.io/steps/](http://codefresh.io/steps/) created specifically for CI/CD operations.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/plugin-directory.png" 
url="/images/pipeline/plugin-directory.png"
alt="Codefresh steps directory" 
caption="Codefresh steps directory" 
max-width="80%" 
%}


## Related articles
[Introduction to Pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)  
[Pipeline steps]({{site.baseurl}}/docs/pipelines/steps/)  

