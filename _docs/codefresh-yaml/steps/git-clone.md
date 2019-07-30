---
title: "Git-Clone"
description: "Checkout code in your pipelines"
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/git-clone/
toc: true
---
Clones a Git repository to the filesystem.

A pipeline can have any number of git clone steps (even none). You can checkout code from any private or public repository. Cloning a repository is not constrained to the trigger of a pipeline. You can trigger a pipeline from a commit that happened on Git repository A while the pipeline is checking out code from Git Repository B.

>Notice that if you are an existing customer before May 2019, Codefresh will automatically checkout the code from a [connected git repository]({{site.baseurl}}/docs/integrations/git-providers/) when a pipeline is created on that repository. In this case an implicit git clone step is included in your pipeline. You can still override it with your own git clone step as explained in this page

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
  revision: abcdef12345
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
{% endhighlight %}

## Fields

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                        | Required/Optional/Default |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                            | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                        | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `working_directory`                        | The directory to which the repository is cloned. It can be an explicit path in the container's file system, or a variable that references another step. The default value is {% raw %}`${{main_clone}}`{% endraw %}.                | Default                   |
| `git` | The name of the [git integration]({{site.baseurl}}/docs/integrations/git-providers/) you want to use. If left empty, Codefresh will attempt to use the git provider that was used during account sign-up. Note that this might have unexpected results if you are changing your Git integrations.| Required| 
| `repo`                                     | path of the repository without the domain name in the form of `my_username/my_repo`                                                                                                                                                                                       | Required                  |
| `revision`                                 | The revision of the repository you are checking out. It can be a revision hash or a branch name. The default value is `master`.                                                                                                     | Default                   |
| `credentials`                              | Credentials to access the repository, if it requires authentication. It can an object containing `username` and `password` fields. Credentials are optional if you are using the [built-in git integrations]({{site.baseurl}}/docs/integrations/git-providers/) .                                                                                             | Optional                  |
| `fail_fast`                                | If a step fails and the process is halted. The default value is `true`.                                                                                                                                                            | Default                   |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional Execution of Steps]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                            | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).                                                                                                    | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

**Exported resources:**
-  Working Directory

{{site.data.callout.callout_info}}
If you want to extend the git-clone step you can use the freestyle step. Example how to do it you can find [here]({{site.baseurl}}/docs/yaml-examples/examples/git-clone-private-repository-using-freestyle-step/) 
{{site.data.callout.end}}

## Basic clone step (project-based pipeline)

The easiest way to use a git clone step is to use your default git provider as configured in [built-in git integrations]({{site.baseurl}}/docs/integrations/git-providers/).

Here is an example of a pipeline that will automatically check out the repository that triggered it (i.e. a commit happened on that repository).

>Notice that the name of the clone step is `main_clone`. This will automatically set the working directory of all other steps that follow it **inside** the folder of the project that was checked out. This is normally what you want for a pipeline that only checks out a single project. If you use any other name apart from `main_clone` the working directory for all subsequent steps will not be affected and it will default on the [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) which is the [parent folder]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#cloning-the-source-code) of checkouts.



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

The CF values will be automatically filled by Codefresh from the git trigger. See the [variables page]({{site.baseurl}}/docs/codefresh-yaml/variables/) for more details.

## Choosing a specific git provider (project-based pipeline)

If you don't want to use the default git provider you can explicitly set the provider by using the same name of the integration as it is shown in [the git integrations page]({{site.baseurl}}/docs/integrations/git-providers/).

{% include 
image.html 
lightbox="true" 
file="/images/codefresh-yaml/steps/example-git-providers.png" 
url="/images/codefresh-yaml/steps/example-git-providers.png"
alt="Example git integrations" 
caption="Example git integrations"
max-width="40%"
%}

Here is an example for an integration with the Gitlab provider already connected:

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

## Checkout a specific repository/revision (project based pipeline)

If you want to check out a specific git repository regardless of what repository actually created the trigger
you can just define all values in a non-static manner. For example, if you want your pipeline to always checkout git repository `foo` even when the trigger happened from repository `bar` you can define the checkout step as below:

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

In a similar manner you can also define that the pipeline will always checkout master, regardless of the commit that actually triggered it.

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

## Checking multiple git repositories

It is very easy to checkout additional repositories in a single pipeline by adding more `git-clone` steps.
In that case you should use different names for the steps (instead of `main_clone`) as this will make the working
folder for all steps the [shared volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps).

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
a git clone step is transparently added to git attached pipelines without you having to explicitly add a step into the pipeline. This is a convenience to enable easy CI pipelines.  
If you do not require git cloning, or you would like to customize the implicit git cloning behavior, you can choose to skip the automatically added git clone step.

There are 2 ways to do that:

1. Add a pipeline environment variable called `CF_SKIP_MAIN_CLONE` with value of `true`.

-or-

{:start="2"}
2. Add a step with key `main_clone` to your pipeline. This step can be of any type and can do any action. This step will override the default clone implementation. for example:

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

## Reuse a Git token from Codefresh integrations

You also have the capability to use one of your existing [git integrations]({{site.baseurl}}/docs/integrations/git-providers/)
as an authentication mechanism.

The [Codefresh CLI](https://codefresh-io.github.io/cli/) can read one of the connected [git authentication contexts](https://codefresh-io.github.io/cli/contexts/get-context/) and use that token for a custom clone step.

Here is an example for GitHub


```yaml
version: '1.0'
steps:
  get_git_token:
    title: Reading Github token
    image: codefresh/cli
    commands:
      - cf_export GITHUB_TOKEN=$(codefresh get context github --decrypt -o yaml | yq -y .spec.data.auth.password)
  main_clone:
    title: Checking out code
    image: alpine/git:latest
    commands:
      - git clone https://my-github-username:$GITHUB_TOKEN@github.com/my-github-username/my-repo.git
  another_step:
    ...
```

## Working with GIT submodules

To checkout a git project including its submodules you can use the [Codefresh submodule plugin](https://github.com/codefresh-io/plugins/tree/master/plugins/gitsubmodules). This plugin is already offered as a public docker image at [Dockerhub](https://hub.docker.com/r/codefresh/cfstep-gitsubmodules/tags).

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
the existing [GIT integration]({{site.baseurl}}/docs/integrations/git-providers/) as shown in the previous section.


## Use an SSH key with Git

It is also possible to use an SSH key with git. When [creating your pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) add your SSH key as an encrypted 
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

## What to read next

- [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) 
- [Git integrations]({{site.baseurl}}/docs/integrations/git-providers/) 
- [YAML steps]({{site.baseurl}}/docs/codefresh-yaml/steps/) 






