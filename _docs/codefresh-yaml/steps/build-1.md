---
title: "Build"
description: "Building Docker images in Codefresh pipelines"
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/build-1/
toc: true
---
Use Docker to build an image and store it in Codefresh.

## Purpose of build steps

In Codefresh, docker containers are first-class citizens
and special typed steps are offered for the most usual docker commands. Build steps are a secure replacement for `docker build` commands.


Therefore this command on your local workstation:

```
docker build . -t my-app-image:1.0.1
```

will become in Codefresh the following build step.

```yaml
BuildMyImage:
  title: Building My Docker image
  type: build
  image_name: my-app-image
  tag: 1.0.1
```

## Usage

  `YAML`
{% highlight yaml %}
step_name:
  type: build
  title: Step Title
  description: Free text description
  working_directory: {% raw %}${{clone_step_name}}{% endraw %}
  dockerfile: path/to/Dockerfile
  image_name: owner/new-image-name
  tag: develop
  build_arguments:
    - key=value
  target: stage1
  no_cache: false
  no_cf_cache: false
  fail_fast: false
  metadata:
    set:
      - qa: pending
  when:
    condition:
      all:
        noDetectedSkipCI: "includes('{% raw %}${{CF_COMMIT_MESSAGE}}{% endraw %}', '[skip ci]') == false"
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
  retry:
    ...
{% endhighlight %}

## Fields

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                          | Required/Optional/Default |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                              | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                          | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `working_directory`                        | The directory in which the build command is executed. It can be an explicit path in the container's file system, or a variable that references another step. <br>The default is {% raw %} `${{main_clone}}` {% endraw %}.            | Default                   |
| `dockerfile`                               | The path to the `Dockerfile` from which the image is built. The default is `Dockerfile`.                                                                                                                                             | Default                   |
| `image_name`                               | The name for the image you build.                                                                                                                                                                                                    | Required                  |
| `tag`                                      | The tag that is assigned to the image you build. <br>The default is the name of the branch or revision that is built.                                                                                                                | Default                   |
| `no_cache`                                 | Disable Docker engine cache for the build [more info](https://codefresh.io/docs/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/)                                                                                                                                                                                             | Optional                  |
| `no_cf_cache`                                 | Disable Codefresh build optimization for the build [more info](https://codefresh.io/docs/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/) 
| `build_arguments`                          | A set of [Docker build arguments](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables-build-arg) to pass to the build process.                                                                      | Optional                  |
| `target`                          | target stage in a multistage build (build will run until this stage)                                                                      | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                             | Default                   |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                           | Optional                  |
| `metadata`                                 | Annotate the built image with [key-value metadata]({{ site.baseurl }}/docs/docker-registries/metadata-annotations/).                                                                                                                             | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).                                                                                                      | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

**Exported resources:**
- Working Directory
- Image ID

## Examples

Build an image using a Dockerfile in the root project folder:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
{% endhighlight %}

Build an image using a different Dockerfile and a specific version tag

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
{% endhighlight %}

Build two images in two different folders using [Codefresh variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) as tags.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildNodeImage:
    title: Building My Node app
    image_name: my-department/my-team/my-node-image
    dockerfile: Dockerfile
    working_directory: ./project1
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}
  BuildGoImage:
    title: Building My Go app
    image_name: my-company/my-go-image
    dockerfile: Dockerfile
    working_directory: ./project2
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}
{% endraw %}         
{% endhighlight %}

It also possible to build Docker images in [parallel]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/) for faster builds.


## Automatic pushing

All images built successfully with the build step, will be automatically pushed to the [internal Codefresh registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/). This behavior is completely automatic and happens without any extra configuration on your part. 

>Notice that the [push step]({{site.baseurl}}/docs/codefresh-yaml/steps/push-1/) in Codefresh is optional and is only needed for [external Docker registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). 

{% 
  include image.html 
  lightbox="true" 
  file="/images/artifacts/cfcr/codefresh-registry-list.png" 
  url="/images/artifacts/cfcr/codefresh-registry-list.png" 
  alt="Docker Images pushed automatically" 
  caption="Docker Images pushed automatically" 
  max-width="80%" 
%}

## What to read next

* [Codefresh Registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline Steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)