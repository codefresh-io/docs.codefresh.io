---
layout: docs
title: "Clone private repository using freestyle step"
description: ""
group: yaml-examples
sub_group: examples
permalink: /:path/git-clone-private-repository-using-freestyle-step/
redirect_from:
  - /docs/git-clone-private-repository-using-freestyle-step
toc: true
---
Using this repository we'll help you get up to speed with basic functionality such as: building Docker images and extend the git-clone step.

This project uses Node Js to build an application which will eventually become a distributable Docker image.
If you want to extend the step [```git-clone```]({{ site.baseurl }}/docs/codefresh-yaml/steps/git-clone/) you can use the [```freestyle step```]({{ site.baseurl }}/docs/codefresh-yaml/steps/freestyle/)

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
git_clone_private_repo:
      image: codefreshio/git-image:latest
      working_directory: {% raw %}${{main_clone}}{% endraw %}
      commands:
        - bash -c 'rm -rf /codefresh/volume/{repo_name}/'
        - git clone https://{username}:{password}@github.com/**/**.git /codefresh/volume/{repo_name}
        - bash -c 'cd /codefresh/volume/{repo_name}/ && git checkout {branch_name} && git branch && git status'
        - ls -l /codefresh/volume/{repo_name}
{% endhighlight %}

You can try the example bellow just replace the following variables

{: .table .table-bordered .table-hover}
| Variable                                     | Description                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| {% raw %}```${{REPO_NAME}}```{% endraw %}    | Repository name                                                                                   |
| {% raw %}```${{USERNAME}}```{% endraw %}     | Username from your private repository                                                             |
| {% raw %}```${{PASSWORD}}```{% endraw %}     | Password from you private repository                                                              |
| {% raw %}```${{BRANCH_NAME}}```{% endraw %}  | This branch name will be used for git checkout {% raw %}```${{BRANCH_NAME}}```{% endraw %}        |

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-extend-git-clone-step){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
