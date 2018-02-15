---
layout: docs
title: "Git-Clone"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/git-clone
toc: true
---
Clones a Git repository to the filesystem.
<div class="bd-callout bd-callout-warning" markdown="1">
This step is not required and is added automatically for the main repository.
</div> 

  `YAML`
{% highlight yaml %}
step_name:
  type: git-clone
  title: Step Title
  description: Step description
  working_directory: /path
  repo: github.com/owner/repo
  revision: abcdef12345
  credentials:
    username: subject
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
{% endhighlight %}

{: .table .table-bordered .table-hover}
| Field                                      | Description                                                                                                                                                                                                                        | Required/Optional/Default |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `title`                                    | The free-text display name of the step.                                                                                                                                                                                            | Optional                  |
| `description`                              | A basic, free-text description of the step.                                                                                                                                                                                        | Optional                  |
| `working_directory`                        | The directory to which the repository is cloned. It can be an explicit path in the container's file system, or a variable that references another step. The default value is {% raw %}`${{main_clone}}`{% endraw %}.                | Default                   |
| `repo`                                     | URL of the Git repository you are cloning.                                                                                                                                                                                         | Required                  |
| `revision`                                 | The revision of the repository you are checking out. It can be a revision has or a branch name. The default value is `master`.                                                                                                     | Default                   |
| `credentials`                              | Credentials to access the repository, if it requires authentication. It can an object containing `username` and `password` fields.                                                                                                 | Optional                  |
| `fail_fast`                                | If a step fails and the process is halted. The default value is `true`.                                                                                                                                                            | Default                   |
| `when`                                     | Define a set of conditions that need to be satisfied in order to execute this step. You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                            | Optional                  |
| `on_success`, `on_fail` and `on_finish`    | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).                                                                                                    | Optional                  |

**Exported resources:**
-  Working Directory

{{site.data.callout.callout_info}}
If you want to extend the git-clone step you can use the freestyle step. Example how to do it you can find [here]({{ site.baseurl }}/docs/yaml-examples/examples/git-clone-private-repository-using-freestyle-step/) 
{{site.data.callout.end}}
