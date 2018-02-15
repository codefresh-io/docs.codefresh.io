---
layout: docs
title: "Build an Image from a Different Git Repository"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/build-an-image-from-a-different-git-repository
toc: true
---

Using this repository we'll help you figure out with properties of [**_git-clone_**]({{ site.baseurl }}/docs/codefresh-yaml/steps/git-clone/) step.

## Looking around
In the root of this repository you'll find a file named `codefresh.yml`, this is our [build descriptor]({{ site.baseurl }}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) and it describes the different steps that comprise our process.
Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
version: '1.0'
steps:
  clone_a_repo:
    type: git-clone
    repo: https://github.com/{% raw %}${{REPO_OWNER}}{% endraw %}/{% raw %}${{REPO_NAME}}{% endraw %}.git
    credentials:
      username: {% raw %}${{GITHUB_USERNAME}}{% endraw %}
      password: {% raw %}${{GITHUB_PASSWORD}}{% endraw %}
  
  build_the_image:
    type: build
    working-directory: {% raw %}${{clone_a_repo}}{% endraw %}
    image-name: myuser/myservice
    tag: {% raw %}${{CF_BRANCH}}{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [**repository**](https://github.com/codefreshdemo/cf-example-build-dif-git-repo){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}

{:.text-secondary}
### Using This Example

To use this example:

* Fork this repository to your own [INSERT_SCM_SYSTEM (git, bitbucket)] account.
* Log in to Codefresh using your [INSERT_SCM_SYSTEM (git, bitbucket)] account.
* Click the `Add Service` button.
* Select the forked repository.
* Select the `I have a Codefresh.yml file` option.
* Complete the wizard.
* Rejoice!

## Git-clone step with github token
**How to generate the github token**

Go to the page [__Personal access tokens__](https://github.com/settings/tokens)
Generate and configure the access for personal token
Configuration in Codefresh:

We assume you already forked this repo and create a service for it

1. Open the service and add new pipeline
2. Switch to Use YML build
3. Change the YML File Location to be ./codefresh.git.clone.example.yml
4. Under Environment variables fill the next variables:
 - GIT_TOKEN your personal access token that you generated on github
 - REPO_OWNER owner of repository that you want to clone
 - REPO_NAME name of repository that you want to clone
 - BRANCH branch of repo

  `codefresh.yml`
{% highlight yaml %}
git_clone:
    type: git-clone
    description: "Step description"
    repo: https://{% raw %}${{GIT_TOKEN}}{% endraw %}@github.com/{% raw %}${{REPO_OWNER}}{% endraw %}/{% raw %}${{REPO_NAME}}{% endraw %}.git
    revision: {% raw %}${{BRANCH}}{% endraw %}
{% endhighlight %}
 
Instead of hard-coding the credentials, you can provide the environment variables

{% include 
image.html 
lightbox="true" 
file="/images/80140af-git-clone-pipeline.png" 
url="/images/80140af-git-clone-pipeline.png"
alt="git-clone-pipeline.png" 
max-width="30%" 
%}
