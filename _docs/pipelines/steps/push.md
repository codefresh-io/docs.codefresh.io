---
title: "Push step"
description: "Pushing Docker images from your pipeline"
group: pipelines
sub_group: steps
redirect_from:
  - /docs/push-1/
  - /docs/codefresh-yaml/steps/push-1/ 
  - /docs/codefresh-yaml/steps/push/ 
toc: true
---

>**NOTE**  
If you use only the default Docker registry of your account this step is optional as all successful Codefresh pipelines automatically push the Docker image they create in the default Docker registry. No further configuration is needed to achieve this behavior.


Push a built image to a remote Docker registry with one or more tags. Supports standard Docker registries and ECR.

Notice that when you use [any external registry]({{site.baseurl}}/docs/integrations/docker-registries/), you need to comply to the naming pattern used by that registry, otherwise the build step will fail. For example, if your Codefresh image is tagged as `foo_username/my_image` but your Dockerhub account is `bar_username` then the build will fail and you need to customize the push step to use `bar_username` instead. This is a limitation of external registries such as Dockerhub.

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
  strict_fail_fast: true
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
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/pipelines/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `candidate`                                | The identifier of the image to push to the remote Docker registry. It can be an explicit identifier of an image to push, or a variable that references a `Build` step.          | Required                  |
| `tag`                                      | The tag under which to push the image. Use either this or `tags`.<br> The default is `latest`.                                                             | Default                   |
| `region`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials. The names of the regions for which to perform cross-region replication. The names of the source region and the destination region name must be defined in separate steps.                                                                                                                                                                                | Optional                  |
| `role_arn`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials. The role with the required permissions to use to pull the image. For example, `arn:aws:iam::<account-id>:role/<role-name>`                                                                                                                                                                          | Required                  |
| `aws_session_name`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials.  The name of the AWS session. If not defined, `default-session-name` is used.                                                                                                                                                                        | Default                  |
| `aws_duration_seconds`                               | Relevant only for [Amazon ECR]({{site.baseurl}}/docs/integrations/docker-registries/amazon-ec2-container-registry/) integrations using either service accounts or explicit credentials.  The length of time, in seconds, for which the role credentials are considered valid, and must be between `900-3600` seconds. If not defined, the duration is set to the default of `3600` seconds.                                                                                                                                                                        | Default                  |
| `tags`                                     | Multiple tags under which to push the image. Use either this or `tag`. This is an array, so should be of the following style: <br> {::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span><br><span class="pi">-</span> <span class="s">tag1</span><br><span class="pi">-</span> <span class="s">tag2</span><br><span class="pi">-</span> <span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}{% endraw %}</span><br><span class="pi">-</span> <span class="s">tag4</span></code></pre></figure>{:/}or<br>{::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span> <span class="pi">[</span> <span class="s1">'</span><span class="s">tag1'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag2'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED_LOWER_CASE}}{% endraw %}'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag4'</span> <span class="pi">]</span></code></pre></figure>{:/}                                            | Default                   |
| `image_name`                               | The tagged image name that will be used The default value will be the same image name as of the candidate.                                                                      | Default                   |
| `registry`                                 | The registry logical name of one of the inserted registries from the integration view. <br>The default value will be your default registry [if you have more than one]({{site.baseurl}}/docs/integrations/docker-registries/).                                     | Default                   |
| `registry_context`                                 | Advanced property for resolving Docker images when [working with multiple registries with the same domain]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/#working-with-multiple-registries-with-the-same-domain)                            | Optional                  |
|`timeout`   | The maximum duration permitted to complete step execution in seconds (`s`), minutes (`m`), or hours (`h`), after which to automatically terminate step execution. For example, `timeout: 1.5h`. <br>The timeout supports integers and floating numbers, and can be set to a maximum of 2147483647ms (approximately 24.8 days). <br><br>If defined and set to either `0s/m/h` or `null`, the timeout is ignored and step execution is not terminated.<br>See [Add a timeout to terminate step execution](#add-a-timeout-to-terminate-step-execution). |Optional|
| `fail_fast`                              | Determines pipeline execution behavior in case of step failure. {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>: The default, terminates pipeline execution upon step failure. The Build status returns `Failed to execute`.</li><li><code class="highlighter-rouge">false</code>: Continues pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Build completed successfully</code>. <br>To change the Build status, set <code class="highlighter-rouge">strict_fail_fast</code> to <code class="highlighter-rouge">true</code>.</li></ul>{:/}| Optional  |
| `strict_fail_fast`   |Specifies how to report the Build status when `fail_fast` is set to `false`.<br>**NOTE**:<br>Requires Runner chart upgrade to v6.3.9 or higher.<br><br>You can set the Build status reporting behavior at the root-level or at the step-level for the pipeline.{::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>:<ul><li>When set at the <i>root-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the <i>step-level</i>, returns a Build status of failed when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> and <code class="highlighter-rouge">strict_fail_fast=true</code> fails to execute.</li></ul></li><li><code class="highlighter-rouge">false</code>:<ul><li>When set at the <i>root-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li><li>When set at the <i>step-level</i>, returns a Build status of successful when any step in the pipeline with <code class="highlighter-rouge">fail_fast=false</code> fails to execute.</li></ul></li></ul>{:/}<br>**NOTES**:<br>`strict_fail_fast` does not impact the Build status reported for parallel steps with `fail_fast` enabled. Even if a child step fails, the parallel step itself is considered successful. See also [Handling error conditions in a pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/#handling-error-conditions-in-a-pipeline).| Optional                  |
| `when`                                     | Define a set of conditions which need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) article.          | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [post-step operations]({{site.baseurl}}/docs/pipelines/post-step-operations/).                                                                               | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

## Add a timeout to terminate step execution
To prevent steps from running beyond a specific duration if so required, you can add the `timeout` flag to the step.  
When defined: 
* The `timeout` is activated at the beginning of the step, before the step pulls images.
* When the step's execution duration exceeds the duration defined for the `timeout`, the step is automatically terminated. 

>**NOTE**  
To define timeouts for parallel steps, see [Adding timeouts for parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/#add-timeouts-for-parallel-steps).

Here's an example of the `timeout` field in the step:

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
  timeout: 45m
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

## Examples

### Push an image to a registry connected with the integration 
Push an image to a registry connected with the integration [integration name]({{site.baseurl}}/docs/integrations/docker-registries/) of  `myazureregistry`.

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

### Push an image as the name of the branch in the external registry
Push an image as the name of the branch in the external registry and also use a different image than the default. The same image will also by pushed as `latest` in the internal Codefresh registry (with the default name of `my-app-image`).

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


### Push an image with multiple tags

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

Push an image with multiple tags to multiple Docker registries in [parallel]({{site.baseurl}}/docs/pipelines/advanced-workflows/).
Both registries are connected first as [Docker registry integrations]({{site.baseurl}}/docs/integrations/docker-registries/).


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

>**NOTE**  
  This method of pushing images is offered as a workaround. The suggested way is to use the [central Codefresh integration for registries]({{site.baseurl}}/docs/integrations/docker-registries/) as explained in the previous section.

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
| Field                        | Description                          | Required/Optional/Default                       |
| ---------------------------- | ------------------------------------ | ----------------------------------------------- |
| `title`                     | The free-text display name of the step.         | Optional                               |
| `description`               | A basic, free-text description of the step.     | Optional                                        |
| `provider`                  | The type of Docker registry provider. Can currently be either `docker` for a standard Docker registry, or `ecr` for the [Amazon EC2 Container Registry (ECR)](https://aws.amazon.com/ecr/){:target="\_blank"}.  | Optional <br> *Default value*: `docker`         |
| `candidate`                 | The identifier of the image to push to the remote Docker registry. It can be an explicit identifier of an image to push, or a variable that references a `Build` step.  | Required                                        |
| `tag`                       | The tag under which to push the image. Use either this or `tags`. <br>The default is `latest`.  | Default  |
| `tags`                        | Multiple tags under which to push the image. Use either this or 'tag'. <br>This is an array, so should be of the following style:<br> {::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span><br><span class="pi">-</span> <span class="s">tag1</span><br><span class="pi">-</span> <span class="s">tag2</span><br><span class="pi">-</span> <span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}</span><br><span class="pi">-</span> <span class="s">tag4</span></code></pre></figure>{:/}or<br>{::nomarkdown}<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml"><span class="na">tags</span><span class="pi">:</span> <span class="pi">[</span> <span class="s1">'</span><span class="s">tag1'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag2'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">{% raw %}${{CF_BRANCH_TAG_NORMALIZED}}{% endraw %}'</span><span class="pi">,</span> <span class="s1">'</span><span class="s">tag4'</span> <span class="pi">]</span></code></pre></figure>{:/}  | Default                                         |
| `image_name`  | The tagged image name that will be used. The default value will be the same image name as of the candidate.  | Default                                         |
| `registry`  | The host address where the registry is located. The default is the registry configured in your Codefresh account, or Dockerhub.   | Default <br>**Ignored when provider is** `ecr`  |
| `credentials`                              | Credentials to access the registry if it requires authentication. It can be a has object containing `username` and `password` fields. The default is the credentials configured in your Codefresh account.  | Optional <br>**Ignored when provider is** `ecr` |
| `accessKeyId`         | Your AWS access key. | Optional <br>**Ignored when provider is** `docker`  |
| `secretAccessKey`      | Your AWS secret access key.   | Optional <br>**Ignored when provider is** `docker`  |
| `region`               | The region where the ECR registry is accessible.   | Optional <br>**Ignored when provider is** `docker`  |
| `fail_fast`            | If a step fails, and the process is halted. The default value is `true`. |Default |
| `when`                | Define a set of conditions which need to be satisfied in order to execute this step. <br>You can find more information in [Conditional Execution of Steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps. | Optional |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [post-step operations]({{site.baseurl}}/docs/pipelines/post-step-operations/).| Optional                                       |
                                       
### Exported resources
- Image ID.

## Related articles
[Docker registry integrations]({{site.baseurl}}/docs/integrations/docker-registries/)   
[Custom Image annotations]({{site.baseurl}}/docs/pipelines/docker-image-metadata/)   
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/) 