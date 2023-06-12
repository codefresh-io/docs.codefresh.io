---
title: "Build step"
description: "Building Docker images in Codefresh pipelines"
group: pipelines
sub_group: steps
redirect_from:
  - /docs/build-1/
  - /docs/codefresh-yaml/steps/build-1/
  - /docs/codefresh-yaml/steps/build/  
toc: true
---
Use Docker to build an image and store it in Codefresh or push it to an external registry.  Create multi-platform images with BuildX and QEMU (Quick EMUlator).  
In Codefresh, Docker containers are first-class citizens, and we offer special typed steps for the most frequently used Docker commands through our `build` step. 


## Purpose of build steps
Build steps are a secure replacement for `docker build` commands.  


Therefore, this command on your local workstation:

```
docker build . -t my-app-image:1.0.1
```

is converted in Codefresh into the following build step:

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
  platform: 'linux/arm64'
  buildx: true
  build_arguments:
    - key=value
  cache_from:
    - owner/image-name:${{CF_BRANCH}}
    - owner/image-name:main
  target: stage1
  no_cache: false
  no_cf_cache: false
  tag_policy: original
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
| Field       | Description                                                                                         | Required/Optional/Default |
| ----------- | ---------------------------------------------------------                                           | ------------------------- |
| `title`     | The free-text display name of the step.                                                             | Optional                  |
| `description` | A basic, free-text description of the step.                                                       | Optional                  |
| `stage`     | Parent group of this step. For more information, see [Stages in pipelines]({{site.baseurl}}/docs/pipelines/stages/).             | Optional                  |
| `working_directory`  | The directory in which the build command is executed. It can be an explicit path in the container's file system, or a variable that references another step. <br>The default is {% raw %} `${{main_clone}}` {% endraw %}. Note that the `working_directory` when defined changes only the Docker build context. It is unrelated to the `WORKDIR` in the Dockerile. | Default                   |
| `dockerfile`    | The path to the `Dockerfile` from which the image is built. The default is `Dockerfile`.          | Default                   |
| `image_name` | The name of the image that is built.                                                                 | Required                  |
| `region`     | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials. The names of the regions for which to perform cross-region replication. The names of the source region and the destination region name must be defined in separate steps.                                                          | Optional                  |
| `tag`       | The single tag to assign to the built image. To assign multiple tags, use `tags` (see below). <br>The default tag is the name of the branch or revision that is built. | Default     |
| `tags`      | Multiple tags to assign to the built image. {::nomarkdown} <br>To assign a single tag, use <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">tag</span> (see above). <br> This is an array, and should conform to the following syntax: <br><span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">tags:<br>- tag1<br>- tag2<br>- {% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}<br>- tag4</span><br><br>OR<br><span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">tags: [ 'tag1', 'tag2', '{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}'{% endraw %}, 'tag4' ]</span>{:/} |Optional|
| `cache_from`   | The list of cache sources to use as Docker cache when building the image.  Every source in the list is passed to the build command using the `--cache-from` flag. See [Docker documentation](https://docs.docker.com/engine/reference/commandline/buildx_build/#cache-from){:target="\_blank"} for more info.                     | Optional                   |
| `registry`   | The name of the registry to which to push the built image. You can define any registry that is integrated with Codefresh. <br>When not defined, and you have multiple registry contexts, Codefresh uses the one set as the [default registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).                     | Optional                   |
| `registry_contexts`   | Advanced property for resolving Docker images when [working with multiple registries with the same domain]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain). When defined, pulls the image from the specified context. <br> NOTE: When using `buildx` to build and push multi-platform images, `registry_contexts` cannot be assigned a different registry from the same domain as the target registry defined for `registry`, as Docker does not support being logged in to multiple Docker registries that share the same domain at the same time.  | Optional                  |
|`disable_push`   | Defines if to automatically push the built image to the registry or not. When set to `false`, the default, the image is automatically pushed to the registry.  <br><br>NOTE: Because of [Docker's limitation on loading multi-platform images](https://github.com/docker/buildx/issues/59){:target="\_blank"} to the local Docker instance, unless the built image is pushed as part of the `build` step, you cannot reference the same image in subsequent steps using the {% raw %}`${{build_step_name}}`{% endraw %} variable. | Optional                   | 
|`tag_policy`     | The case-transformation policy for the tag name. <br>`original`pushes the tag name as is, without changing it. <br>`lowercase`, the default, automatically converts the tag name to lowercase. <br><br>Tags in mixed case are pushed as `image_name:<tagname>` when set to the default value.    | Default                   | 
| `no_cache`      | Defines if to enable or disable Docker engine cache for the build.  When set to `false`, the default, enables Docker engine cache. To disable, set to `true`. See [more info]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/).        | Optional                  |
| `no_cf_cache`   | Defines if to enable or disable Codefresh build optimization for the build. When set to `false`, the default, enables Codefresh build optimization. See [more info]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/). |                                                                          |
| `build_arguments`   | The set of [Docker build arguments](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables-build-arg){:target="\_blank"} to pass to the build process.   | Optional                  |
| `target`  | The target stage at which to stop the build in a multistage build. | Optional                  |
| `fail_fast`  | Define the build behavior on step failure. When set to `true`, the default, ff a step fails, the build is stopped as well. To continue the build on step failure, set to `false`. | Default     |
| `when`       | The set of conditions that need to be satisfied in order to execute this step.<br>For more information, see [Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) .   | Optional |
| `metadata`   | Annotate the built image with [key-value metadata]({{site.baseurl}}/docs/pipelines/docker-image-metadata/).  | Optional   |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-step operations]({{site.baseurl}}/docs/pipelines/post-step-operations/).      | Optional                  |
| `retry`   | Define retry behavior for the build step, as described in [Retrying a step]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#retrying-a-step).  | Optional                  |
| `buildkit`  | When set to `true`, enables [Buildkit](#buildkit-support) and all of its enhancements. When using `buildkit` with `cache_from`, to allow the built image to be used as cache for future images, you must  specify `BUILDKIT_INLINE_CACHE=1` in the build_arguments. See [more info](https://docs.docker.com/engine/reference/commandline/buildx_build/#cache-to){:target="\_blank"}| Optional   | 
| `platform`  | The [target platform or platforms](https://docs.docker.com/build/building/multi-platform/){:target="\_blank"} to which to push the image. For example, `linux/amd64`. To target multiple platforms, separate them with commas, as in `linux/amd64,linux/arm64`. <br>NOTE: To use this property, you must enable `buildx`. | Optional   | 
| `buildx`  |Build and push Docker images, including multi-platform images, with <a href="https://github.com/docker/buildx" target="_blank">Buildx</a>. Disabled by default. {::nomarkdown}<ul><li>To enable with default configuration, set to <code class="highlighter-rouge">true</code>. You do not have to add any other parameters.</li><li>To enable with custom configuration, set to an object with custom configuration. With custom configuration, you can configure settings for <code class="highlighter-rouge">qemu</code> and <code class="highlighter-rouge">builder</code>.<ul><li><code class="highlighter-rouge">qemu</code><ul><li><code class="highlighter-rouge">image</code>: The Docker image to use to install the <a href="https://github.com/qemu/qemu" target="_blank">QEMU</a> static binaries. Currently, Codefresh supports the <code class="highlighter-rouge">tonistiigi/binfmt</code> Docker image. <br>By default, installs the binaries from the <code class="highlighter-rouge">tonistiigi/binfmt:latest</code> Docker image. </li><li><code class="highlighter-rouge">platforms</code>: The binaries of platform emulators to install with the Docker image defined for <code class="highlighter-rouge">image</code>. The default value is <code class="highlighter-rouge">all</code>.</li></ul><li><code class="highlighter-rouge">builder</code>: <ul><li><code class="highlighter-rouge">driver</code>: The builder driver to use. By default, uses <code class="highlighter-rouge">docker-container</code>  <a href="https://docs.docker.com/build/building/drivers/docker-container" target="_blank">driver</a> to build multi-platform images and export cache using a <a href="https://github.com/moby/buildkitBuildKit" target="_blank">BuildKit</a> container.<li><code class="highlighter-rouge">driver_opts</code>: Additional driver-specific configuration options to customize the driver. For example, <code class="highlighter-rouge">image=moby/buildkit:master</code>.</li></ul></li></ul>{:/} | Optional   | 


### Exported resources
- [Working Directory]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#working-directories)
- Image ID, which you can use to [annotate images]({{site.baseurl}}/docs/pipelines/docker-image-metadata/)

## Build image step examples

### Using Dockerfile in root project folder

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
{% endhighlight %}

### Using different Dockerfile and specific version tag

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
{% endhighlight %}

### Using different Dockerfile and pushing multiple tags to default registry

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tags:
      - latest
      - ${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}
      - v1.1
{% endraw %}        
{% endhighlight %}

### Automatically push to registry with name `my-registry`

For information on registries, see [Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries/).

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
    registry: my-registry
{% endhighlight %}

### Two images in two different folders using Codefresh variables as tags

For information on Codefresh variables, see [Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/).

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildNodeImage:
    title: Building My Node app
    type: build    
    image_name: my-department/my-team/my-node-image
    dockerfile: Dockerfile
    working_directory: ./project1
    tag: ${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}
  BuildGoImage:
    title: Building My Go app
    type: build    
    image_name: my-company/my-go-image
    dockerfile: Dockerfile
    working_directory: ./project2
    tag: ${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}
{% endraw %}         
{% endhighlight %}


### Using `cache_from` with `buildkit`

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
    buildkit: true
    build_arguments:
    - BUILDKIT_INLINE_CACHE=1
    cache_from:
    - my-registry/my-app-image:${{CF_BRANCH}}
    - my-registry/my-app-image:master
{% endraw %}         
{% endhighlight %}

### Multi-platform images with `platform` and `buildx` 
Docker images can support multiple platforms and architectures, meaning that you can create an image once, and reuse the same image on different platforms. Docker automatically selects the image that matches the target OS and architecture.  

For more on the architectures supported, see the [Docker Official Images README](https://github.com/docker-library/official-images#architectures-other-than-amd64){:target="\_blank"}. For more on multi-platform images in Docker, see the official [documentation](https://docs.docker.com/build/building/multi-platform/){:target="\_blank"}.  

<!--QEMU with BuildX is useful for:  
* Multi-architecture builds: Build applications for multiple architectures at the same time, useful for building container images that need to support multiple architectures.
* Cross-platform testing: Test applications on different platforms, such as ARM, AMD, without having to own the physical hardware to save time and resources.
* Container image testing: Test container images for compatibility with different architectures and platforms, to ensure that the container image works when deployed to different environments. -->


#### Build image for ARM

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    working_directory: '${{clone}}'
    image_name: my-app-image
    tag: latest
    platform: 'linux/arm64'
    buildx: true
{% endraw %}         
{% endhighlight %}

#### Build image for multiple platforms

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    working_directory: '${{clone}}'
    image_name: my-app-image
    tag: latest
    platform: 'linux/amd64,linux/arm64'
    buildx: true
{% endraw %}         
{% endhighlight %}

#### Build image for multiple platforms with custom `buildx` configuration

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    working_directory: '${{clone}}'
    image_name: my-app-image
    tag: latest
    platform: 'linux/amd64,linux/arm64'
    buildx:
      qemu:
        # image used for installing QEMU static binaries to provide cross-platform emulator support
        image: 'tonistiigi/binfmt:latest' # default
      builder:
        # driver to use to create the builder instance 
        driver: 'docker-container' # default
{% endraw %}         
{% endhighlight %}

For faster builds, you can also build Docker images in [parallel]({{site.baseurl}}/docs/pipelines/advanced-workflows/).

### Inline Dockerfile

If your project does not already have a Dockerfile, you can also define one within the pipeline:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  BuildingDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-own-go-app
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}'
    dockerfile:
      content: |-
       # ---
       # Go Builder Image
       FROM golang:1.8-alpine AS builder
       # set build arguments: GitHub user and repository
       ARG GH_USER
       ARG GH_REPO
       # Create and set working directory
       RUN mkdir -p /go/src/github.com/$GH_USER/$GH_REPO
       # copy file from builder image
       COPY --from=builder /go/src/github.com/$GH_USER/$GH_REPO/dist/myapp
       /usr/bin/myapp
       CMD ["myapp", "--help"]
{% endraw %}         
{% endhighlight %}

Use this technique only as a last resort. It is better if the Dockerfile exists as an actual file in source control.


## Automatic pushing

All images built successfully with the build step are automatically pushed to the default Docker registry defined for your account. This behavior is completely automatic and happens without any extra configuration on your part. To disable this, add the `disable_push` property set to `true` to your build step. Remember that if you are using `buildx`, you cannot set the `disable_push` property to `true`. 

>The [push step]({{site.baseurl}}/docs/pipelines/steps/push/) in Codefresh is optional, and is only needed if you want to push to [external Docker registries]({{site.baseurl}}/docs/integrations/docker-registries/). 

{% 
  include image.html 
  lightbox="true" 
  file="/images/pipeline/codefresh-yaml/steps/codefresh-registry-list.png" 
  url="/images/pipeline/codefresh-yaml/steps/codefresh-registry-list.png" 
  alt="Docker Images pushed automatically" 
  caption="Docker Images pushed automatically" 
  max-width="80%" 
%}


## Buildkit support

Codefresh also allows you to use [buildkit](https://github.com/moby/buildkit){:target="\_blank"} with all its [enhancements](https://docs.docker.com/develop/develop-images/build_enhancements/){:target="\_blank"} and [experimental features](https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/experimental.md#experimental-syntaxes){:target="\_blank"}.

Using `buildkit` you can get:

* Improved build output logs
* Mounting of external secrets that will never be stored in the image
* Access to SSH keys and sockets from within the Dockerfile
* Use cache and bind-mounts at build time

These capabilities are offered as extra arguments in the `build` step, and using any of them will automatically enable `buildkit`. You can utilize the different mount-options for the Dockerfile instruction `RUN` as long as `buildkit` is enabled for your build step. Mounts of type [`cache`](https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/experimental.md#example-cache-go-packages){:target="\_blank"} work out of the box and are persisted between pipeline runs.

The simplest way to use `buildkit` is by enabling it explicitly:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    buildkit: true
{% endhighlight %}

`Buildkit` is also automatically enabled if you use any of its features such as the `progress` property:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    progress: tty
{% endhighlight %}

Possible values for `progress` are `tty` and `plain`. 

For secrets, you can either mention them in a single line:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    secrets:
      - id=secret1,src=./my-secret-file1.txt
      - id=secret2,src=./my-secret-file2.txt
{% endhighlight %}

or multiple lines:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    secrets:
      - id: secret1
        src: ./my-secret-file1.txt
      - id: secret2
        src: ./my-secret-file2.txt
{% endhighlight %}

For the SSH connection you can either use the default:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    ssh: default
{% endhighlight %}


or define different keys:

`codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    ssh:
      - github=~/.ssh/github_rsa
      - bitbucket=~/.ssh/bitbucket_rsa
{% endhighlight %}

You might want to use an environment variable to store and retrieve an SSH key. This can be achieved by converting your SSH key into a one-line string:
```
tr '\n' ',' < /path/to/id_rsa
```

Copy the output and place it an [environment variable]({{site.baseurl}}/docs/pipelines/variables/#user-provided-variables). To make the SSH key availabe to the `build` step, you can write it to the Codefresh volume:
`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  SetupSshKeys:
    title: Setting up ssh key
    image: alpine:latest
    commands:
      - mkdir /codefresh/volume/keys
      - echo "${SSH_KEY}" | tr  ',' '\n' > /codefresh/volume/keys/github_rsa

  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    tag: latest
    ssh:
      - github=/codefresh/volume/keys/github_rsa
{% endraw %}
{% endhighlight %}


You can combine all options (`ssh`, `progress`, `secrets`) in a single build step if desired.



## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)
