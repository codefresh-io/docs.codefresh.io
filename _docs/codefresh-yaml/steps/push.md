---
title: "Push step"
description: "Pushing Docker images from your pipeline"
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/push-1/
  - /docs/codefresh-yaml/steps/push-1/ 
toc: true
---

{{site.data.callout.callout_info}}

If you use only the default Docker registry of your account this step is optional as all successful Codefresh pipelines automatically push the Docker image they create in the default Docker registry. No further configuration is needed to achieve this behavior.
{{site.data.callout.end}}

Push a built image to a remote Docker registry with one or more tags. Supports standard Docker registries and ECR.

Notice that when you use [any external registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/), you need to comply to the naming pattern used by that registry, otherwise the build step will fail. For example, if your Codefresh image is tagged as `foo_username/my_image` but your Dockerhub account is `bar_username` then the build will fail and you need to customize the push step to use `bar_username` instead. This is a limitation of external registries such as Dockerhub.

## Usage

  `YAML`
{% highlight yaml %}
step_name:
  type: push
  title: Step Title
  description: Free text description
  candidate: {% raw %}${{build_step_name}}{% endraw %}
  tag: latest
  image_name: codefresh/app
  registry: my-registry
  fail_fast: false
  when:
    branch:
      only: 
        - /FB-/i
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
| Field                                      | Description                                                                                                                                                                     | Required/Optional/Default |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                         | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                     | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `candidate`                                | The identifier of the image to push to the remote Docker registry. It can be an explicit identifier of an image to push, or a variable that references a `Build` step.          | Required                  |
| `tag`                                      | The tag under which to push the image. Use either this or `tags`.<br> The default is `latest`.                                                             | Default                   |
| `region`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials. The names of the regions for which to perform cross-region replication. The names of the source region and the destination region name must be defined in separate steps.                                                                                                                                                                                | Optional                  |
| `role_arn`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials. The role with the required permissions to use to pull the image. For example, `arn:aws:iam::<account-id>:role/<role-name>                                                                                                                                                                          | Required                  |
| `aws_session_name`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials.  The name of the AWS session. If not defined, `default-session-name` is used.                                                                                                                                                                        | Default                  |
| `aws_duration_seconds`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials.  The length of time, in seconds, for which the role credentials are considered valid, and must be between `900-3600` seconds. If not defined, the duration is set to the default of `3600` seconds.                                                                                                                                                                        | Default                  |
| `tags`                                     | Multiple tags under which to push the image. Use either this or `tag`. This is an array, so should be of the following style: <br> {::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span><br><span class="pi">-</span> <span class="s">tag1</span><br><span class="pi">-</span> <span class="s">tag2</span><br><span class="pi">-</span> <span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}{% endraw %}</span><br><span class="pi">-</span> <span class="s">tag4</span></code></pre></figure>{:/}or<br>{::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span> <span class="pi">[</span> <span class="s1">'</span><span class="s">tag1'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag2'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}{% endraw %}'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag4'</span> <span class="pi">]</span></code></pre></figure>{:/}                                            | Default                   |
| `image_name`                               | The tagged image name that will be used The default value will be the same image name as of the candidate.                                                                      | Default                   |
| `registry`                                 | The registry logical name of one of the inserted registries from the integration view. <br>The default value will be your default registry [if you have more than one]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).                                     | Default                   |
| `registry_context`                                 | Advanced property for resolving Docker images when [working with multiple registries with the same domain]({{site.baseurl}}/docs/docker-registries/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain)                            | Optional                  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                        | Default                   |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) article.          | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).                                                                               | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

## Examples

Push an image to a registry connected with the [integration name]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) of  `myazureregistry`.

`codefresh.yml`
{% highlight yaml %} 
{% raw %}
version: '1.0'
stages:
- 'my build phase'
- 'my push phase'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    stage: 'my build phase'
    type: build
    image_name: my-app-image
    dockerfile: Dockerfile
  pushToMyRegistry:
    stage: 'my push phase'
    type: push
    title: Pushing to a registry
    candidate: ${{MyAppDockerImage}}
    tag: ${{CF_SHORT_REVISION}}
    registry: myazureregistry 
{% endraw %}
{% endhighlight %}

Push an image as the name of the branch in the [external registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) and also use a different image than the default. The same image will also by pushed as `latest` in the internal Codefresh registry (with the default name of `my-app-image`).

`codefresh.yml`
{% highlight yaml %} 
{% raw %}
version: '1.0'
stages:
- 'my build phase'
- 'my push phase'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    stage: 'my build phase'
    type: build
    image_name: my-app-image
    dockerfile: Dockerfile
    tag: latest
  pushToMyRegistry:
    stage: 'my push phase'
    type: push
    title: Pushing to a registry
    candidate: ${{MyAppDockerImage}}
    tag: ${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}
    registry: myazureregistry
    image_name: my-user-name/a-different-image-name 
{% endraw %}
{% endhighlight %}


Push an image with multiple tags.

`codefresh.yml`
{% highlight yaml %} 
{% raw %}
version: '1.0'
stages:
- 'my build phase'
- 'my push phase'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    stage: 'my build phase'
    type: build
    image_name: my-app-image
    dockerfile: Dockerfile
  pushToMyRegistry:
    stage: 'my push phase'
    type: push
    title: Pushing to a registry
    candidate: ${{MyAppDockerImage}}
    tags: 
    - ${{CF_SHORT_REVISION}}
    - latest
    - 2.0.0
    registry: myazureregistry 
{% endraw %}
{% endhighlight %}

Push an image with multiple tags to multiple Docker registries in [parallel]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/).
Both registries are connected first in the [integrations page]({{site.baseurl}}/docs/docker-registries/external-docker-registries/).


`codefresh.yml`
{% highlight yaml %} 
{% raw %}
version: '1.0'
stages:
- 'my build phase'
- 'my push phase'
steps:
  MyAppDockerImage:
    title: Building Docker Image
    stage: 'my build phase'
    type: build
    image_name: my-app-image
    dockerfile: Dockerfile
  PushingToRegistries:
    type: parallel
    stage: 'push'
    steps:
      PushingToGoogleRegistry:
        type: push
        title: Pushing To Google Registry
        candidate: ${{MyAppDockerImage}}
        tags: 
        - ${{CF_BUILD_ID}}
        - latest
        - production
        registry: gcr
      PushingToDockerRegistry:
        type: push
        title: Pushing To Dockerhub Registry
        candidate: ${{MyAppDockerImage}}
        tag: '${{CF_SHORT_REVISION}}'
        image_name: my-docker-hub-username/my-app-name
        registry: dockerhub 
{% endraw %}
{% endhighlight %}


## Using passed credentials without pre-saving them

This option enables you to push your images without pre-saving the credentials in Codefresh's registry integration view.

>Note that this method of pushing images is offered as a workaround. The suggested way is to use the [central Codefresh integration for registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) as explained in the previous section.

  `YAML`
{% highlight yaml %}
step_name:
  type: push
  title: Step Title
  description: Free text description
  candidate: {% raw %}${{build_step_name}}{% endraw %}
  tags: [ latest, {% raw %}${{CF_BRANCH}}{% endraw %} ]
  image_name: codefresh/app
  registry: dtr.host.com
  credentials:
    username: subject
    password: credentials
  fail_fast: false
  when:
    branch:
      only: 
        - /FB-/i
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
{% endhighlight %}

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Required/Optional/Default                       |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Optional                                        |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Optional                                        |
| `provider`                                 | The type of Docker registry provider. Can currently be either `docker` for a standard Docker registry, or `ecr` for the [Amazon EC2 Container Registry (ECR)](https://aws.amazon.com/ecr/).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Optional <br> *Default value*: `docker`         |
| `candidate`                                | The identifier of the image to push to the remote Docker registry. It can be an explicit identifier of an image to push, or a variable that references a `Build` step.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Required                                        |
| `tag`                                      | The tag under which to push the image. Use either this or `tags`. <br>The default is `latest`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Default                                         |
| `tags`                                     | Multiple tags under which to push the image. Use either this or 'tag'. <br>This is an array, so should be of the following style:<br> {::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span><br><span class="pi">-</span> <span class="s">tag1</span><br><span class="pi">-</span> <span class="s">tag2</span><br><span class="pi">-</span> <span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}</span><br><span class="pi">-</span> <span class="s">tag4</span></code></pre></figure>{:/}or<br>{::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span> <span class="pi">[</span> <span class="s1">'</span><span class="s">tag1'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag2'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag4'</span> <span class="pi">]</span></code></pre></figure>{:/}            | Default                                         |
| `image_name`                               | The tagged image name that will be used. The default value will be the same image name as of the candidate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Default                                         |
| `registry`                                 | The host address where the registry is located. The default is the registry configured in your Codefresh account, or Dockerhub.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Default <br>**Ignored when provider is** `ecr`  |
| `credentials`                              | Credentials to access the registry if it requires authentication. It can be a has object containing `username` and `password` fields. The default is the credentials configured in your Codefresh account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Optional <br>**Ignored when provider is** `ecr` |
| `accessKeyId`                              | Your AWS access key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Optional <br>**Ignored when provider is** `docker`  |
| `secretAccessKey`                          | Your AWS secret access key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Optional <br>**Ignored when provider is** `docker`  |
| `region`                                   | The region where the ECR registry is accessible.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Optional <br>**Ignored when provider is** `docker`  |
| `fail_fast`                                | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default                                        |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step. <br>You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Optional                                       |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Optional                                       |
                                       
**Exported resources:**
- Image ID.

## What to read next
- [External Registry integrations]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) 
- [Custom Image annotations]({{site.baseurl}}/docs/docker-registries/metadata-annotations/) 
- [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) 