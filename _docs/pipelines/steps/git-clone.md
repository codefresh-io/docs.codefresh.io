---
title: "Git-clone step"
description: "Check out code in your pipelines"
group: pipelines
sub_group: steps
redirect_from:
  - /docs/git-clone/
  - /docs/codefresh-yaml/steps/git-clone/
toc: true
---
Clones a Git repository to the filesystem.

A pipeline can have any number of Git clone steps (even none). You can check out code from any private or public repository. Cloning a repository is not constrained to the trigger of a pipeline. You can trigger a pipeline from a commit that happened on Git repository A while the pipeline is checking out code from Git Repository B.

<!--- >Notice that if you are an existing customer before May 2019, Codefresh will automatically checkout the code from a [connected Git repository]({{site.baseurl}}/docs/integrations/git-providers/) when a pipeline is created on that repository. In this case an implicit Git clone step is included in your pipeline. You can still override it with your own git clone step as explained in this page.  -->

## Usage

  `YAML`
{% highlight yaml %}
step_name:
  type: git-clone
  title: Step Title
  description: Step description
  working_directory: /path
  repo: owner/repo
  git: my-git-provider
  revision: abcdef12345'
  use_proxy: false
  credentials:
    username: user
    password: credentials
  fail_fast: false
  strict_fail_fast: true
  when:
    branch:
      ignore: [ develop ]
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
| Field               | Description                                                | Required/Optional/Default |
| ------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`             | The free-text display name of the step.                    | Optional                  |
| `description`       | A basic, free-text description of the step.                | Optional                  |
| `stage`             | Parent group of this step. See [using stages]({{site.baseurl}}/docs/pipelines/stages/) for more information.    | Optional                  |
| `working_directory`  | The directory to which the repository is cloned. It can be an explicit path in the container's file system, or a variable that references another step. The default value is {% raw %}`${{main_clone}}`{% endraw %}, but note that the default will only be used if you name your step `main_clone`.  See the example on [working inside the cloned directory]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/#working-inside-the-cloned-directory) for more information.                | Default                   |
| `git` | The name of the [Git integration]({{site.baseurl}}/docs/integrations/git-providers/) you want to use. If left empty, Codefresh will attempt to use the git provider that was used during account sign-up. Note that this might have unexpected results if you are changing your Git integrations.| Required| 
| `repo`            | The path of the repository without the domain name in the form of `my_username/ my_repo`. {::nomarkdown} <br>Note: To clone a GitHub wiki, specify the full URL of the wiki,{:/} for example, `"https://github.com/wikis/examples.wiki"`.  | Required                  |
| `revision`        | The revision of the repository you are checking out. It can be a revision hash or a branch name. The default value is the branch you have specified in your Git provider (e.g `master` or `main`).   | Default    |
| `depth`    |  The number of commits to pull from the repo to create a shallow clone. Creating a shallow clone truncates the history to the number of commits specified, instead of pulling the entire history. | Optional      |
| `use_proxy`    | If set to true the Git clone process will honor `HTTP_PROXY` and `HTTPS_PROXY` variables if present for [working via a proxy](#using-git-behind-a-proxy). Default value is `false`.      | Default                   |
| `credentials`  | Credentials to access the repository, if it requires authentication. It can an object containing `username` and `password` fields. Credentials are optional if you are using the [built-in Git integrations]({{site.baseurl}}/docs/integrations/git-providers/) .            | Optional                  |
|`timeout`   | The maximum duration permitted to complete step execution in seconds (`s`), minutes (`m`), or hours (`h`), after which to automatically terminate step execution. For example, `timeout: 1.5h`. <br>The timeout supports integers and floating numbers, and can be set to a maximum of 2147483647ms (approximately 24.8 days). <br><br>If defined and set to either `0s/m/h` or `null`, the timeout is ignored and step execution is not terminated.<br>See [Add a timeout to terminate step execution](#add-a-timeout-to-terminate-step-execution). |Optional|
| `fail_fast`                              | Determines pipeline execution behavior in case of step failure. {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>: The default, terminates pipeline execution upon step failure. The Build status returns `Failed to execute`.</li><li><code class="highlighter-rouge">false</code>: Continues pipeline execution upon step failure. The Build status returns <code class="highlighter-rouge">Build completed successfully</code>. <br>To change the Build status, set <code class="highlighter-rouge">strict_fail_fast</code> to <code class="highlighter-rouge">true</code>.</li></ul>{:/}| Optional  |
| `strict_fail_fast`                              | Specifies how to report the Build status `fail_fast` is set to `false`. {::nomarkdown}<ul><li><code class="highlighter-rouge">true</code>:  Returns a Build status of failed on step failure.</li> <li><code class="highlighter-rouge">false</code>: Returns a Build status of successful regardless of step failures.</li></ul>{:/}**NOTE**: <code class="highlighter-rouge">strict_fail_fast</code> does not impact the Build status reported for parallel steps with <code class="highlighter-rouge">fail_fast</code> enabled. Even if a child step fails, the parallel step itself is considered successful. See also [Handling error conditions in a pipeline]({{site.baseurl}}/docs/pipelines/advanced-workflows/#handling-error-conditions-in-a-pipeline).| Optional                  |
| `when`      | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional execution of steps]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) article.   | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/pipelines/post-step-operations/).   | Optional   |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#retrying-a-step).  | Optional                  |

**Exported resources:**
-  Working Directory

{{site.data.callout.callout_info}}
**NOTE**  
If you want to extend the git-clone step you can use the freestyle step. Example how to do it you can find [here]({{site.baseurl}}/docs/example-catalog/ci-examples/git-clone-private-repository-using-freestyle-step/).
{{site.data.callout.end}}

## Basic clone step (project-based pipeline)

The easiest way to use a Git clone step is to use your default Git provider as configured in [built-in Git integrations]({{site.baseurl}}/docs/integrations/git-providers/).

Here is an example of a pipeline that will automatically check out the repository that triggered it (i.e. a commit happened on that repository).

>**NOTE**  
  The name of the clone step is `main_clone`. This will automatically set the working directory of all other steps that follow it **inside** the folder of the project that was checked out. This only applies to [built-in]({{site.baseurl}}/docs/pipelines/steps/#built-in-steps) Codefresh steps and not [custom plugins]({{site.baseurl}}/docs/pipelines/steps/#creating-a-typed-codefresh-plugin). This is normally what you want for a pipeline that only checks out a single project. If you use any other name apart from `main_clone` the working directory for all subsequent steps will not be affected and it will default on the [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) which is the [parent folder]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#cloning-the-source-code) of checkouts.



`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    main_clone:
        title: 'Cloning main repository...'
        type: git-clone
        repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
        revision: '${{CF_REVISION}}'
        git: my-git-provider
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}

The CF values will be automatically filled by Codefresh from the Git trigger. See [Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/) for more details.

## Choosing a specific Git provider (project-based pipeline)

If you don't want to use the default Git provider, you can explicitly set the provider by using the same name as in the integration shown in [the Git integrations page]({{site.baseurl}}/docs/integrations/git-providers/).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/steps/example-git-providers.png" 
url="/images/pipeline/codefresh-yaml/steps/example-git-providers.png"
alt="Example Git integrations" 
caption="Example Git integrations"
max-width="40%"
%}

Here is an example for an integration with the GitLab provider already connected:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    main_clone:
        title: 'Cloning main repository...'
        type: git-clone
        repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
        revision: '${{CF_REVISION}}'
        git: my-gitlab
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}

## Check out a specific repository/revision (project based pipeline)

If you want to check out a specific git repository regardless of what repository actually created the trigger,
you can just define all values in a non-static manner. For example, if you want your pipeline to always check out Git repository `foo` even when the trigger happened from repository `bar` you can define the checkout step as below:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    main_clone:
        title: 'Cloning main repository...'
        type: git-clone
        repo: 'my-github-username/foo'
        revision: '${{CF_REVISION}}'
        git: my-github-integration
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}

In a similar manner you can also define that the pipeline will always check out master, regardless of the commit that actually triggered it.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    main_clone:
        title: 'Cloning main repository...'
        type: git-clone
        repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
        revision: 'master'
        git: my-git-provider
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}

## Check out code using the Codefresh Runner

If you are using the [Codefresh runner]({{site.baseurl}}/docs/installation/codefresh-runner/), you need to use
the fully qualified path of the Git repository:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    main_clone:
        title: 'Cloning main repository...'
        type: git-clone
        repo: https://github-internal.example.com/my-username/my-app
        revision: '${{CF_REVISION}}'
        git: my-internal-git-provider
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}

For more details, see [Checking out code from a private Git repository]({{site.baseurl}}/docs/installation/behind-the-firewall/#checking-out-code-from-a-private-git-repository).


## Check out multiple Git repositories

It is very easy to check out additional repositories in a single pipeline by adding more `git-clone` steps.
In that case you should use different names for the steps (instead of `main_clone`) as this will make the working
folder for all steps the [shared volume]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps).

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    my_first_checkout:
        title: 'Cloning first repository...'
        type: git-clone
        repo: 'my-gitlab-username/foo'
        revision: '${{CF_REVISION}}'
        git: my-gitlab-integration
    my_second_checkout:
        title: 'Cloning second repository...'
        type: git-clone
        repo: 'my-github-username/bar'
        revision: '${{CF_REVISION}}'
        git: my-github-integration
    PrintFileList:
        title: 'Listing files'
        image: alpine:latest
        commands:
            - 'ls -l'
{% endraw %}
{% endhighlight %}


## Skip or customize default clone (repository-based pipeline) 

If you have existing pipelines connected to repositories (only for Codefresh accounts created before May 2019)
a `git-clone` step is transparently added to Git attached pipelines without you having to explicitly add a step into the pipeline. This is a convenience to enable easy CI pipelines.  
If you do not require Git cloning, or you would like to customize the implicit Git cloning behavior, you can choose to skip the automatically added `git-clone` step.

There are 2 ways to do that:

1. Add a pipeline environment variable called `CF_SKIP_MAIN_CLONE` with value of `true`.

-or-

2. Add a step with key `main_clone` to your pipeline. This step can be of any type and can do any action. This step will override the default clone implementation. For example:

```yaml
version: '1.0'
steps:
  main_clone:
    title: Checking out code
    image: alpine/git:latest
    commands:
      - git clone ...
  another_step:
    ...
```

## Add a timeout to terminate step execution
To prevent steps from running beyond a specific duration if so required, you can add the `timeout` flag to the step.  
When defined: 
* The `timeout` is activated at the beginning of the step, before the step pulls images.
* When the step's execution duration exceeds the duration defined for the `timeout`, the step is automatically terminated. 

>**NOTE**  
To define timeouts for parallel steps, see [Adding timeouts for parallel steps]({{site.baseurl}}/docs/pipelines/advanced-workflows/#add-timeouts-for-parallel-steps).

Here's an example of the `timeout` field in the step:

{% highlight yaml %}
{% raw %}
step_name:
  type: git-clone
  title: Step Title
  description: Step description
  working_directory: /path
  repo: owner/repo
  git: my-git-provider
  revision: abcdef12345'
  use_proxy: false
  timeout: 45m
  credentials:
    username: user
    password: credentials
  fail_fast: false
  when:
    branch:
      ignore: [ develop ]
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

## Reuse a Git token from Codefresh integrations

You also have the capability to use one of your existing [Git integrations]({{site.baseurl}}/docs/integrations/git-providers/)
as an authentication mechanism.

The Codefresh CLI can read one of the connected [Git authentication contexts](https://codefresh-io.github.io/cli/contexts/get-context/){:target="\_blank"} and use that token for a custom clone step.

Here is an example for GitHub:


```yaml
version: '1.0'
steps:
  get_git_token:
    title: Reading GitHub token
    image: codefresh/cli
    commands:
      - cf_export GITHUB_TOKEN=$(codefresh get context github --decrypt -o yaml | yq -r .spec.data.auth.password)
  main_clone:
    title: Checking out code
    image: alpine/git:latest
    commands:
      - git clone https://my-github-username:$GITHUB_TOKEN@github.com/my-github-username/my-repo.git
  another_step:
    ...
```

## Working with Git submodules

To check out a Git project including its submodules, you can use the [Codefresh submodule plugin](https://github.com/codefresh-io/plugins/tree/master/plugins/gitsubmodules){:target="\_blank"}. This plugin is already offered as a public docker image at [Docke Hub](https://hub.docker.com/r/codefresh/cfstep-gitsubmodules/tags){:target="\_blank"}.

To use this module in your pipeline, add a new step like the one shown below.

```yaml
version: '1.0'
steps:
  updateSubmodules:
    image: codefresh/cfstep-gitsubmodules
    environment:
      - GITHUB_TOKEN=<github_token>
      - CF_SUBMODULE_SYNC=<boolean to determine if modules should be synced>
      - CF_SUBMODULE_UPDATE_RECURSIVE=<boolean to determine if modules should be recursively updated>
```      

The GitHub token can be either defined in the pipeline on its own as an environment variable, or fetched from
the existing [Git integration]({{site.baseurl}}/docs/integrations/git-providers/) as shown in the previous section.

Here is full pipeline example:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - checkout
  - prepare   
  - build
steps:
  clone:
    title: Cloning the repository
    type: git-clone
    stage: checkout
    arguments:
      repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
      git: github
      revision: '${{CF_REVISION}}'  

  updateSubmodules:
    image: codefresh/cfstep-gitsubmodules
    stage: prepare
    working_directory: '${{clone}}'
    environment:
      - GITHUB_TOKEN=${{MY_GITHUB_TOKEN}}  
  docker_build:
    title: Building docker image
    type: build
    stage: build
    working_directory: '${{clone}}/k8s/docker'
    tag: current
    disable_push: true
    image_name: 'my-docker-image'

{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the main source code
1. Updates submodules
1. Creates a docker image


## Use an SSH key with Git

It is also possible to use an SSH key with Git. When [creating your pipeline]({{site.baseurl}}/docs/pipelines/pipelines/), add your SSH key as an encrypted 
environment variable after processing it with `tr`:

```
cat ~/.ssh/my_ssh_key_file | tr '\n' ','
```


Then in the pipeline use it like this:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Checking out code
    image: alpine/git:latest
    commands:
      - mkdir -p ~/.ssh
      - echo "${SSH_KEY}" | tr \'"${SPLIT_CHAR}"\' '\n' > ~/.ssh/id_rsa
      - chmod 600 ~/.ssh/id_rsa
      - git clone git@github.com:my-github-username/my-repo.git
      # can also use go get or other similar command that uses git internally
  another_step:
    ...
{% endraw %}
{% endhighlight %}

## Using Git behind a proxy

If you use the [Codefresh Runner]({{site.baseurl}}/docs/installation/codefresh-runner/)  and need to use a network proxy in your clone step you need to set the [variables]({{site.baseurl}}/docs/pipelines/variables/) `HTTP_PROXY` and/or `HTTPS_PROXY` in the pipeline
and then activate the property `use_proxy: true` in the clone step. Example:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "https://github.com/my-github-user/my-repo/"
    revision: "master"
    use_proxy: true
    git: my-git-provider
{% endraw %}
{% endhighlight %}

For setting the values of the proxy variables you can use any of the supported methods for defining variables such as [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/).


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/steps/proxy-variables.png" 
url="/images/pipeline/codefresh-yaml/steps/proxy-variables.png"
alt="Pipeline variable" 
caption="Pipeline variable"
max-width="40%"
%}

For more details, see the [behind the firewall page]({{site.baseurl}}/docs/installation/behind-the-firewall/).


## Related articles
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)   
[YAML steps]({{site.baseurl}}/docs/pipelines/steps/)   
[Custom Git Commands]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout-custom/)  






