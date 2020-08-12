---
title: "Using Custom Git commands"
description: "Clone manually git repositories"
group: yaml-examples
sub_group: git
redirect_from:
  - /docs/git-clone-private-repository-using-freestyle-step/
  - /docs/yaml-examples/examples/git-clone-private-repository-using-freestyle-step/
toc: true
---

>Notice that running git commands manually is an advanced technique. For most use cases you should use the [Native Git checkout]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/) offered by Codefresh.

If you want to do complex cloning, you can still use custom clone commands in a freestyle step. Notice however that in this case
you lose the native Codefresh integration such as git authentication and automatic workdir setup. Use custom clone commands only as a last resort.


## Cloning with the git executable

It is very easy to run custom git commands in a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/). Pass any parameters to the git clone step as you would pass them on your local workstation.

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  myCustomClone:
    title: Performing swallow clone
    image: alpine/git:latest
    commands:
      - rm -rf ruby-on-rails-sample-app
      - git clone --depth 1 https://github.com/codefresh-contrib/ruby-on-rails-sample-app.git
  PrintFileList:
    title: 'Listing files'
    image: alpine:latest
    working_directory: './ruby-on-rails-sample-app'
    commands:
      - 'ls -l'     
{% endraw %}
{% endhighlight %}

Notice the `rm` command before the clone step. This makes sure that every time the pipeline will run the `git clone` step will happen in an empty directory. Otherwise the `git clone` command will fail (git will refuse to clone on an existing directory).

You can enter your own git username/password or [reuse the credentials]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/#reuse-a-git-token-from-codefresh-integrations) from the Codefresh integration.

## Running Git commands manually

Once you understand that you can run manually git commands in Codefresh pipelines, it is easy to see that any git workflow is possible.
Here is an example where an application is packaged in a Docker container, after merging `master` to a specific branch. 

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  myCustomClone:
    title: Performing swallow clone
    image: alpine/git:latest
    commands:
      - rm -rf example_nodejs_postgres
      - git clone https://github.com/kostis-codefresh/example_nodejs_postgres
      - cd example_nodejs_postgres
      - git checkout experiment1
      - git merge master
      - git status
  myDockerImage:
    title: 'BuildingDockerImage'
    type: build
    dockerfile: Dockerfile
    working_directory: './example_nodejs_postgres'
    image_name: my-app-image
    tag: from-master-branch      
{% endraw %}
{% endhighlight %}

If there are any errors with the merge the pipeline will automatically fail. Codefresh will automatically stop any pipeline that shows an error in a step.

## Other forms of cloning

There is nothing special about running GIT it in a freestyle step. In fact, you can checkout code with any other command that you would run locally in your terminal.

Here is an example with Golang.

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  myCustomClone:
    title: Download example
    image: golang:1.11-alpine
    commands:
      - apk add --no-cache git
      - go get github.com/golang/example/hello
{% endraw %}
{% endhighlight %}

If you run this pipeline you will see git used as part of the `go get` mechanism.

More examples such as using SSH keys and working with GIT submodules can be found in the [clone step documentation]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/).


## What to read next

* [Native Git checkout]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/)
* [Native Git integration]({{site.baseurl}}/docs/integrations/git-providers/)
* [Freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
* [Git Clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
