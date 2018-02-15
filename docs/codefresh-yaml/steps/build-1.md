---
layout: docs
title: "Build"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/build-1
toc: true
---
Use Docker to build an image and store it in Codefresh.

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
{% endhighlight %}

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                          | Required/Optional/Default |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                              | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                          | Optional                  |
| `working_directory`                        | The directory in which the build command is executed. It can be an explicit path in the container's file system, or a variable that references another step. <br>The default is {% raw %} `${{main_clone}}` {% endraw %}.            | Default                   |
| `dockerfile`                               | The path to the `Dockerfile` from which the image is built. The default is `Dockerfile`.                                                                                                                                             | Default                   |
| `image_name`                               | The name for the image you build.                                                                                                                                                                                                    | Required                  |
| `tag`                                      | The tag that is assigned to the image you build. <br>The default is the name of the branch or revision that is built.                                                                                                                | Default                   |
| `no_cache`                                 | Do not use cache when building the image                                                                                                                                                                                             | Optional                  |
| `build_arguments`                          | A set of [Docker build arguments](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables-build-arg) to pass to the build process.                                                                      | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                             | Default                   |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                           | Optional                  |
| `metadata`                                 | Annotate the built image with [key-value metadata]({{ site.baseurl }}/docs/codefresh-yaml/metadata-annotations/).                                                                                                                             | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).                                                                                                      | Optional                  |

**Exported resources:**
- Working Directory
- Image ID
