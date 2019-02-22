---
title: "Git-Clone"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/git-clone/
toc: true
---
Clones a Git repository to the filesystem.

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



{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                        | Required/Optional/Default |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                            | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                        | Optional                  |
| `stage`                              | Parent group of this step. See [using stages]({{site.baseurl}}/docs/codefresh-yaml/stages/) for more information.                                                                                                                                                                                          | Optional                  |
| `working_directory`                        | The directory to which the repository is cloned. It can be an explicit path in the container's file system, or a variable that references another step. The default value is {% raw %}`${{main_clone}}`{% endraw %}.                | Default                   |
| `git` | The name of the [git integration]({{site.baseurl}}/docs/integrations/git-providers/) you want to use. You can also use `CF-default` as a value for the default git provider that was used during Codefresh sign-up | Required| 
| `repo`                                     | path of the repository without the domain name in the form of `my_username/my_repo`                                                                                                                                                                                       | Required                  |
| `revision`                                 | The revision of the repository you are checking out. It can be a revision hash or a branch name. The default value is `master`.                                                                                                     | Default                   |
| `credentials`                              | Credentials to access the repository, if it requires authentication. It can an object containing `username` and `password` fields.                                                                                                 | Optional                  |
| `fail_fast`                                | If a step fails and the process is halted. The default value is `true`.                                                                                                                                                            | Default                   |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                            | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).                                                                                                    | Optional                  |
| `retry`   | Define retry behavior as described in [Retrying a step]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step).                                                                               | Optional                  |

**Exported resources:**
-  Working Directory

{{site.data.callout.callout_info}}
If you want to extend the git-clone step you can use the freestyle step. Example how to do it you can find [here]({{site.baseurl}}/docs/yaml-examples/examples/git-clone-private-repository-using-freestyle-step/) 
{{site.data.callout.end}}

## Skip or customize default clone

A git clone step is transparently added to git attached pipelines without you having to explicitly add a step into the pipeline. This is a convenience to enable easy CI pipelines.  
If you do not require git cloning, or you would like to customize the implicit git cloning behaviour, you can choose to skip the automatically added git clone step.

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

### Reuse a Git token from Codefresh integrations

If you customize the git clone step, you also have the capability to use one of your existing [git integrations]({{site.baseurl}}/docs/integrations/git-providers/)
as an authentication mechanism.

The [Codefresh CLI](https://codefresh-io.github.io/cli/) can read one of the connected [git authentication contexts](https://codefresh-io.github.io/cli/contexts/get-context/) and use that token for a custom clone step.

Here is an example for Github

```yaml
version: '1.0'
steps:
  get_git_token
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

### Use an SSH key with Git

It is also possible to use an SSH key with git. When [creating your pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) add your SSH key as an encrypted 
environment variable after processing it with `tr`:

```
cat ~/.ssh/my_ssh_key_file | tr '\n' ','
```


Then in pipeline use it like this:

```yaml
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
```







