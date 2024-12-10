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

```shell
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

```yaml
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
    - owner/image-name:$CF_BRANCH
    - owner/image-name:main
  cache_to:
    - owner/image-name:$CF_BRANCH
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
```

## Fields

The default behavior of the `build` step is defined a

<!-- markdownlint-disable MD033 -->

{: .table .table-bordered .table-hover}
| Field       | Description         | Required/Optional/Default |
| ----------- | ---------------------  | ------------------------- |
| `title`     | The free-text display name of the step.                 | Optional                  |
| `description` | A basic, free-text description of the step.           | Optional                  |
| `stage`     | Parent group of this step. For more information, see [Stages in pipelines]({{site.baseurl}}/docs/pipelines/stages/).  | Optional  |
| `working_directory`  | The directory in which the build command is executed. It can be an explicit path in the container's file system, or a variable that references another step. <br>The default is {% raw %} `${{main_clone}}` {% endraw %}. Note that the `working_directory` when defined changes only the Docker build context. It is unrelated to the `WORKDIR` in the Dockerile. | Default                   |
| `dockerfile`    | The path to the `Dockerfile` from which the image is built. The default is `Dockerfile`.   | Default       |
| `image_name` | The name of the image that is built.     | Required                  |
| `region`     | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials. <br>The names of the regions for which to perform cross-region replication. The names of the source region and the destination region name must be defined in separate steps.  | Optional   |
| `role_arn`     | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials. <br>The Amazon Resource Name (ARN) of the IAM role to be assumed to push the built image to the ECR repository, in the format `arn:aws:iam::<cross-account-id>:role/<role-name>`, where:<br>`<account-id>` is the ID of the AWS account where the ECR repository is hosted. <br>`<role-name>` is the specified role with the required permissions within this account to access and manage the ECR repository.  | Required     |
| `tag`       | The single tag to assign to the built image. To assign multiple tags, use `tags` (see below). <br>The default tag is the name of the branch or revision that is built. | Default     |
| `tags`      | Multiple tags to assign to the built image. {::nomarkdown} <br>To assign a single tag, use <code class="highlighter-rouge">tag</code> (see above). <br> This is an array, and should conform to the following syntax: <br><code class="highlighter-rouge">tags:<br>- tag1<br>- tag2<br>- {% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}<br>- tag4</code><br><br>OR<br><code class="highlighter-rouge">tags: [ 'tag1', 'tag2', '{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}'{% endraw %}, 'tag4' ]</code>{:/} |Optional|
| `cache_from`   | The list of cache sources to use as Docker cache when building the image.  Every source in the list is passed to the build command using the `--cache-from` flag. See [Docker documentation](https://docs.docker.com/engine/reference/commandline/buildx_build/#cache-from){:target="\_blank"} for more info.                     | Optional                   |
| `cache_to`   | The list of external destinations such as container registries to which to export the build cache.  Every cache destination in the list is passed to the build command using the `--cache-to` flag. See [Docker documentation](https://docs.docker.com/engine/reference/commandline/buildx_build/#cache-to){:target="\_blank"} for more info.                     | Optional                   |
| `registry`   | The name of the registry to which to push the built image. You can define any registry that is integrated with Codefresh. <br>When not defined, and you have multiple registry contexts, Codefresh uses the one set as the [default registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).                     | Optional                   |
| `registry_contexts`   | Advanced property for resolving Docker images when [working with multiple registries with the same domain]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain). When defined, pulls the image from the specified context. <br> NOTE: When using `buildx` to build and push multi-platform images, `registry_contexts` cannot be assigned a different registry from the same domain as the target registry defined for `registry`, as Docker does not support being logged in to multiple Docker registries that share the same domain at the same time.  | Optional                  |
|`disable_push`   | Defines if to automatically push the built image to the registry or not. When set to `false`, the default, the image is automatically pushed to the registry.<br>This setting overrides the default behavior set at the account leve. See [Default behavior for buld steps]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#default-behavior-for-build-steps). <br><br>NOTE: Because of [Docker's limitation on loading multi-platform images](https://github.com/docker/buildx/issues/59){:target="\_blank"} to the local Docker instance, unless the built image is pushed as part of the `build` step, you cannot reference the same image in subsequent steps using the {% raw %}`${{build_step_name}}`{% endraw %} variable. | Optional                   |
|`tag_policy`     | The case-transformation policy for the tag name. <br>`original`pushes the tag name as is, without changing it. <br>`lowercase`, the default, automatically converts the tag name to lowercase. <br><br>Tags in mixed case are pushed as `image_name:<tagname>` when set to the default value.    | Default                   |
| `no_cache`      | Defines if to enable or disable Docker engine cache for the build.  When set to `false`, the default, enables Docker engine cache. To disable, set to `true`. See [more info]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/).        | Optional                  |
| `no_cf_cache`   | Defines if to enable or disable Codefresh build optimization for the build. When set to `false`, the default, enables Codefresh build optimization. See [more info]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/). |                                                                          |
| `build_arguments`   | The set of [Docker build arguments](https://docs.docker.com/engine/reference/commandline/build/#set-build-time-variables-build-arg){:target="\_blank"} to pass to the build process.   | Optional                  |
| `target`  | The target stage at which to stop the build in a multistage build. | Optional                  |
|`timeout`   | The maximum duration permitted to complete step execution in seconds (`s`), minutes (`m`), or hours (`h`), after which to automatically terminate step execution. For example, `timeout: 1.5h`. <br>The timeout supports integers and floating numbers, and can be set to a maximum of 2147483647ms (approximately 24.8 days). <br><br>If defined and set to either `0s/m/h` or `null`, the timeout is ignored and step execution is not terminated.<br>See [Add a timeout to terminate step execution](#add-a-timeout-to-terminate-step-execution). |Optional|
| `fail_fast`                              | Determines pipeline execution behavior in case of step failure. {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>: The default, terminates pipeline execution upon step failure. The Build status returns `Failed to execute`.</li><li><code class="highlighter-rouge">false</code>: Continues pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Build completed successfully</code>. <br>To change the Build status, set <code class="highlighter-rouge">strict_fail_fast</code> to <code class="highlighter-rouge">true</code>.</li></ul>{:/}| Optional  |
| `strict_fail_fast`   |Specifies how to report the Build status when `fail_fast` is set to `false`.<br>**NOTE**:<br>Requires Runner chart upgrade to v6.3.9 or higher.<br><br>You can set the Build status reporting behavior at the root-level or at the step-level for the pipeline.{::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>:<ul><li>When set at the  <i>root-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the  <i>step-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> and <code class="highlighter-rouge">strict_fail_fast=true</code> fails to execute.</li></ul></li><li><code class="highlighter-rouge">false</code>:<ul><li>When set at the  <i>root-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the  <i>step-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li></ul></li></ul>{:/}<br>**NOTES**:<br>`strict_fail_fast` does not impact the Build status reported for parallel steps with `fail_fast` enabled. Even if a child step fails, the parallel step itself is considered successful. See also [Handling error conditions in a pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/#handling-error-conditions-in-a-pipeline).| Optional                  |
| `when`       | The set of conditions that need to be satisfied in order to execute this step.<br>For more information, see [Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) .   | Optional |
| `metadata`   | Annotate the built image with [key-value metadata]({{site.baseurl}}/docs/pipelines/docker-image-metadata/).  | Optional   |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-step operations]({{site.baseurl}}/docs/pipelines/post-step-operations/).      | Optional                  |
| `retry`   | Define retry behavior for the build step, as described in [Retrying a step]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#retrying-a-step).  | Optional                  |
| `buildkit`  | When set to `true`, enables [Buildkit](#buildkit-support) and all of its enhancements. When using `buildkit` with `cache_from`, to allow the built image to be used as cache for future images, you must  specify `BUILDKIT_INLINE_CACHE=1` in the build_arguments. See [more info](https://docs.docker.com/engine/reference/commandline/buildx_build/#cache-to){:target="\_blank"}| Optional   |
| `ssh`  | Available when using [Buildkit](#buildkit-support) for ssh keys. See [more info](https://docs.docker.com/engine/reference/commandline/buildx_build/#ssh){:target="\_blank"}| Optional   |
| `secrets`  | Available when using [Buildkit](#buildkit-support) for secret mounting. See [more info](https://docs.docker.com/engine/reference/commandline/buildx_build/#secret){:target="\_blank"}| Optional   |
| `platform`  | The [target platform or platforms](https://docs.docker.com/build/building/multi-platform/){:target="\_blank"} to which to push the image. For example, `linux/amd64`. To target multiple platforms, separate them with commas, as in `linux/amd64,linux/arm64`. <br>NOTE: To use this property, you must enable `buildx`. | Optional   |
| `buildx`  |Build and push Docker images, including multi-platform images, with <a href="https://github.com/docker/buildx" target="_blank">Buildx</a>. Disabled by default. {::nomarkdown}<ul><li>To enable with default configuration, set to <code class="highlighter-rouge">true</code>. You do not have to add any other parameters.</li>When set to <code class="highlighter-rouge">true</code>, caching is disabled.</li><li>To enable with custom configuration, set to an object with custom configuration. With custom configuration, you can configure settings for <code class="highlighter-rouge">qemu</code> and <code class="highlighter-rouge">builder</code>.<ul><li><code class="highlighter-rouge">qemu</code><ul><li><code class="highlighter-rouge">image</code>: The image to use to install the <a href="https://github.com/qemu/qemu" target="_blank">QEMU</a> static binaries. If not specified, uses the <code class="highlighter-rouge">tonistiigi/binfmt</code> Docker image, and installs the binaries from the <code class="highlighter-rouge">tonistiigi/binfmt:latest</code> Docker image. {:/} <br>To use additional trusted QEMU images, see [Defining trusted QEMU images](#defining-trusted-qemu-images).{::nomarkdown}</li><li><code class="highlighter-rouge">platforms</code>: The binaries of platform emulators to install with the Docker image defined for <code class="highlighter-rouge">image</code>. The default value is <code class="highlighter-rouge">all</code>.</li></ul><li><code class="highlighter-rouge">builder</code>: <ul><li><code class="highlighter-rouge">driver</code>: The builder driver to use. By default, uses <code class="highlighter-rouge">docker-container</code>  <a href="https://docs.docker.com/build/building/drivers/docker-container" target="_blank">driver</a> to build multi-platform images and export cache using a <a href="https://github.com/moby/buildkitBuildKit" target="_blank">BuildKit</a> container.<li><code class="highlighter-rouge">driver_opts</code>: Additional driver-specific configuration options to customize the driver. For example, <code class="highlighter-rouge">image=moby/buildkit:master</code>.</li></ul></li></ul>{:/} | Optional   |





<!-- markdownlint-enable MD033 -->

### Exported resources

- [Working Directory]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#working-directories)
- Image ID, which you can use to [annotate images]({{site.baseurl}}/docs/pipelines/docker-image-metadata/)

## Build image step examples

### Add a timeout to terminate step execution

To prevent steps from running beyond a specific duration if so required, you can add the `timeout` flag to the step.  
When defined:

- The `timeout` is activated at the beginning of the step, before the step pulls images.
- When the step's execution duration exceeds the duration defined for the `timeout`, the step is automatically terminated.

>**NOTE**  
To define timeouts for parallel steps, see [Adding timeouts for parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/#add-timeouts-for-parallel-steps).

Here's an example of the `timeout` field in the step:

`YAML`

```yaml
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
    - owner/image-name:$CF_BRANCH
    - owner/image-name:main
  cache_to:
    - owner/image-name:$CF_BRANCH
  target: stage1
  no_cache: false
  no_cf_cache: false
  tag_policy: original
  timeout: 45m
  fail_fast: false
  strict_fail_fast: true
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
```

**Timeout info in logs**  
Timeout information is displayed in the logs, as in the example below.

{% include image.html
lightbox="true"
file="/images/steps/timeout-messages-in-logs.png"
url="/images/steps/timeout-messages-in-logs.png"
caption="Step termination due to timeout in logs"
alt="Step termination due to timeout in logs"
max-width="60%"
%}

### Using Dockerfile in root project folder

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
```

### Using different Dockerfile and specific version tag

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
```

### Using different Dockerfile and pushing multiple tags to default registry

`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

### Automatically push to registry with name `my-registry`

For information on registries, see [Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries/).

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
    registry: my-registry
```

### Two images in two different folders using Codefresh variables as tags

For information on Codefresh variables, see [Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/).

`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

### Using `cache_from` with `buildkit`

`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

### Using `cache_from` and `cache_to` with `buildx`

`codefresh.yml`
{% raw %}

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    type: build
    image_name: my-app-image
    dockerfile: my-custom.Dockerfile
    tag: 1.0.1
    buildx:
      builder:
        driver: docker-container
    cache_from:
    - type=registry,ref=my-registry/my-app-image:${{CF_BRANCH}}
    - type=registry,ref=my-registry/my-app-image:master
    cache_to:
    - type=registry,mode=max,oci-mediatypes=true,image-manifest=true,compression=zstd,ref=my-registry/my-app-image:${{CF_BRANCH}}
```

{% endraw %}

### Multi-platform images with `platform` and `buildx`

Docker images can support multiple platforms and architectures, meaning that you can create an image once, and reuse the same image on different platforms. Docker automatically selects the image that matches the target OS and architecture.  

For more on the architectures supported, see the [Docker Official Images README](https://github.com/docker-library/official-images#architectures-other-than-amd64){:target="\_blank"}. For more on multi-platform images in Docker, see the official [documentation](https://docs.docker.com/build/building/multi-platform/){:target="\_blank"}.  

<!--QEMU with BuildX is useful for:  
* Multi-architecture builds: Build applications for multiple architectures at the same time, useful for building container images that need to support multiple architectures.
* Cross-platform testing: Test applications on different platforms, such as ARM, AMD, without having to own the physical hardware to save time and resources.
* Container image testing: Test container images for compatibility with different architectures and platforms, to ensure that the container image works when deployed to different environments. -->

> **NOTE**  
> Caching is disabled when `buildx` is set to `true`.

#### Build image for ARM

`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

#### Build image for multiple platforms

`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

#### Build image for multiple platforms with custom `buildx` configuration

`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

For faster builds, you can also build Docker images in [parallel]({{site.baseurl}}/docs/pipelines/advanced-workflows/).

### Inline Dockerfile

If your project does not already have a Dockerfile, you can also define one within the pipeline:

`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

Use this technique only as a last resort. It is better if the Dockerfile exists as an actual file in source control.



## Signing container images with Sigstore

Signing container images created and distributed by pipelines and verifying their authenticity is essential for maintaining software security.  
Sigstore, a trusted authority for signing container images, offers two methods to secure images: **key-based signing**, the traditional method, and **keyless signing**, a new method using the OpenID Connect (OIDC) protocol.

* **Key-based signing**  
  Key-based signing relies on private-public key pairs to authenticate and verify container images. It comes with inherent security and maintenance challenges in managing the key pairs. 

* **Keyless signing**  
  Keyless signing is now the _default_ method due to significant advantages:
    * No long-term key management: No need to generate, store, or rotate private keys. 
    * Improved security: Reduces the risk of key theft or misuse, by eliminating the need for long-term private keys.
    * Simplified automation: Ideal for CI/CD pipelines, as OIDC tokens are automatically retrieved and used for signing, with no manual intervention.

Codefresh supports both both key-based and keyless signing to secure container images generated by pipelines.

##### How Codefresh handles container image signing
Codefresh removes the complexity of setting up and managing both key-based and keyless signing by integrating the necessary components directly into the pipeline's `build` step. This automation enables you to sign container images with minimal configuration, simplifying the entire signing process.

See [Keyless signing for container images](#keyless-signing-for-container-images) and [Key-based signing for container images](#key-based-signing-for-container-images).




### Keyless signing for container images

Keyless signing in Codefresh utilizes the Codefresh OIDC provider during the artifact signing process. This integration simplifies authentication and ensures the integrity of the signing process by embedding claims within the signature. For detailed information on how to integrate Codefresh as an OIDC provider, see [OIDC for pipelines]({{site.baseurl}}/docs/integrations/oidc-pipelines/). 


#### Benefits of Codefresh OIDC Provider for keyless signing


* **Secure authentication**  
  Codefresh acting as the OIDC provider for keyless signing eliminates the need for long-term private keys. By using the OIDC protocol, Codefresh securely authenticates the pipeline at runtime, ensuring that only authorized pipelines can sign the artifacts.

* **Claims identifying pipeline and build**  
  The Codefresh OIDC provider generates claims that uniquely identify both the pipeline and the build in the token issued for signing. These claims are automatically embedded in the OIDC token and passed to the signing process, ensuring that each container image's signature is tied to a specific build in a specific pipeline.

* **Robust verification process using claims**  
  The claims provided by the Codefresh OIDC provider are used in the signature for a robust verification process. When verifying signed container images, external systems can use the embedded claims to confirm the origin and authenticity of the artifact, ensuring that the image was signed by a trusted pipeline and build. 



#### Keyless signing: components and roles

The table below outlines the key components involved in keyless signing and their roles.  


For detailed information, including keyless-signing architecture, [read our blog](https://codefresh.io/blog/securing-containers-oidc/){:target="\_blank"}.

{: .table .table-bordered .table-hover}
| Component         | Description                                   | Responsible party |
| ------------------------------------------                          | ---------------------------------------------- | 
| **OIDC provider**          | The organization creating the container images must act an OIDC provider. <br> Codefresh is an official OIDC provider, setting up an integration with Codefresh provides added benefits for keyless signing. See [Benefits of Codefresh OIDC Provider for keyless signing](#benefits-of-codefresh-oidc-provider-for-keyless-signing).    | Customer|
| **ID token**  | An ID token is created for the OIDC provider to authenticate and authorize pipeline actions. <br>Codefresh automatically retrieves the ID token through the `obtain-oidc-id-token` step, with no manual action required.       | Codefresh|
| **ID token verification**  | A certificate authority verifies the ID token against the OIDC provider, and issues a short-lived cryptographic certificate based on the ID token.        | [Fulcio](https://docs.sigstore.dev/certificate_authority/overview/){:target="\_blank"}|
| **Image signing** | Codefresh integrates with Cosign to sign the container image. <br>Simply add the `cosign: sign: true` attribute to your pipeline's `build` step.  | [Cosign](https://docs.sigstore.dev/signing/quickstart/){:target="\_blank"}|
| **Authenticity verification**  | The certificate (public key) along with the signature/digest is stored in an append-only transparency log. Any external organization can verify the authenticity of the signed container image.<br>For details on image verification, see [Verifying artifacts signed with Codefresh pipelines]({{site.baseurl}}/docs/security/pipelines-verify-cf-artifacts/).        | [Rekor](https://docs.sigstore.dev/logging/overview/){:target="\_blank"}|

#### Adding keyless signing to your pipeline

To enable keyless signing, add the following attribute to your pipeline's `build` step:


```yaml
cosign: 
  sign: true
```
Codefresh retrieves the OIDC token, invokes Cosign, and securely signs the container image without the need for additional setup.

Here's an example of a `build` step with this attribute:

```yaml
scenario_multiplatform_keyless_sign:
  type: "build"
  stage: "multiplatform-keyless"
  image_name: ${{PUBLIC_IMAGE_NAME}}
  tag: "${{CF_BRANCH_TAG_NORMALIZED}}-scenario_multiplatform_keyless_sign"
  ...
  cosign:
    sign: true
  ...
```

### Key-based signing for container images

Key-based signing uses a private key to sign container images. There are two options for key-based signing:
* Signing without a password: The private key is used directly to sign the image.
* Signing with a password/passphrase: The private key is first unlocked using a passphrase for additional security.
 

##### Adding key-based signing to your pipeline

To enable key-based signing, add the following to your pipeline's `build` step:


```yaml
cosign: 
  sign: true
  options: 
    key: "${{CF_VOLUME_PATH}}/${{CF_BUILD_ID}}-with-pass.key"
    key-pass: "test-password"  # only for password-based signing 
```
where:
* `cosign: sign: true` indicates that the Cosign will sign the container image generated by the pipeline.
* `options.key` is path to the private key used for signing.
* `options.key-pass` is required only for password-based signing, and is the password or passphrase for unlocking the private key.

>**NOTE**  
`options` can include any Cosign-supported command. 


##### Example: Key-based signing with empty password

```yaml
# key-based signing with empty password

scenario_simple_key_nopass_sign:
  type: "build"
  ...
    cosign:
      sign: true
      options:
        key: "${{CF_VOLUME_PATH}}/${{CF_BUILD_ID}}.key"
  ...
```

##### Example: Key-based signing with non-empty password

```yaml            
# key-based signing with non-empty password
scenario_simple_key_pass_sign:
  type: "build"
  ...
    cosign:
      sign: true
      options:
        key: "${{CF_VOLUME_PATH}}/${{CF_BUILD_ID}}-with-pass.key"
        key-pass: "test-password"
  ...
```


## Automatic pushing

All images built successfully with the build step are automatically pushed to the default Docker registry defined for your account. This behavior is completely automatic and happens without any extra configuration on your part. To disable this, add the `disable_push` property set to `true` to your build step. Remember that if you are using `buildx`, you cannot set the `disable_push` property to `true`.

>**NOTE**  
The [push step]({{site.baseurl}}/docs/pipelines/steps/push/) in Codefresh is optional, and is only needed if you want to push to [external Docker registries]({{site.baseurl}}/docs/integrations/docker-registries/).

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

- Improved build output logs
- Mounting of external secrets that will never be stored in the image
- Access to SSH keys and sockets from within the Dockerfile
- Use cache and bind-mounts at build time

These capabilities are offered as extra arguments in the `build` step, and using any of them will automatically enable `buildkit`. You can utilize the different mount-options for the Dockerfile instruction `RUN` as long as `buildkit` is enabled for your build step. Mounts of type [`cache`](https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/experimental.md#example-cache-go-packages){:target="\_blank"} work out of the box and are persisted between pipeline runs.

The simplest way to use `buildkit` is by enabling it explicitly:

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    buildkit: true
```

<!---- `Buildkit` is also automatically enabled if you use any of its features  such as the `progress` property: -->

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image      
```

<!--- commenting out as not supported currently. When supported add this line to the code snippet above and remove comments: type: build
    progress: ttyPossible values for `progress` are `tty` and `plain`.  -->

For secrets, you can either mention them in a single line:

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    secrets:
      - id=secret1,src=./my-secret-file1.txt
      - id=secret2,src=./my-secret-file2.txt
```

or multiple lines:

`codefresh.yml`

```yaml
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
```

For the SSH connection you can either use the default:

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    ssh: default
```

or define different keys:

`codefresh.yml`

```yaml
version: '1.0'
steps:
  BuildMyImage:
    title: Building My Docker image
    image_name: my-app-image
    type: build
    ssh:
      - github=~/.ssh/github_rsa
      - bitbucket=~/.ssh/bitbucket_rsa
```

You might want to use an environment variable to store and retrieve an SSH key. This can be achieved by converting your SSH key into a one-line string:

```shell
tr '\n' ',' < /path/to/id_rsa
```

Copy the output and place it an [environment variable]({{site.baseurl}}/docs/pipelines/variables/#user-provided-variables). To make the SSH key availabe to the `build` step, you can write it to the Codefresh volume:
`codefresh.yml`
{% raw %}

```yaml
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
```

{% endraw %}

You can combine all options (`ssh`, <!--- `progress`,--> `secrets`) in a single build step if desired.

## Defining trusted QEMU images
The `build` step supports other QEMU images in addition to the default image.  
To add these images, you must first define them as trusted images in your `values.yaml` file, in `runtime.engine.env.TRUSTED_QEMU_IMAGES`.  

* Each image must include the full image name. 
* Images from non-Docker Hub repositories must also include the repository name in addition to the image name. 
* Image tags are optional.  

>**NOTE**  
This functionality is supported from Helm chart version **7.1.6**.  
If the Runtime is already installed, don't forget to run `helm upgrade` to apply the changes to the deployed release. 

##### Example
The example below defines two trusted QEMU images, the first from GitHub Container Registry, specifying the repository and image name, and the second from Docker Hub without the `docker.io` prefix.

```yaml
...
runtime:
  engine:
    env:
      TRUSTED_QEMU_IMAGES: "ghcr.io/example/qemu-image,qemu-user-static"
...
```

## Related articles
[Default behavior for build steps]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#default-behavior-for-build-steps)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)
