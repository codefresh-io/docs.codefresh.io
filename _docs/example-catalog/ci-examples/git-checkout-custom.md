---
title: "Using custom Git commands"
description: "Manually clone Git repositories"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/git-clone-private-repository-using-freestyle-step/
  - /docs/example-catalog/ci-examples/git-clone-private-repository-using-freestyle-step/
toc: true
---

>Manually running Git commands is an advanced technique. For most use cases you should use the [native Git checkout]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/) offered by Codefresh.

For complex cloning, you can still use custom clone commands in a freestyle step. In this case,
you lose the native Codefresh integration such as Git authentication and automatic workdir setup. Use custom clone commands only as a last resort.


## Cloning with the Git executable

It is very easy to run custom Git commands in a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/). Pass any parameters to the Git clone step as you would pass them on your local workstation.

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

Notice the `rm` command before the clone step. This makes sure that every time the pipeline runs, the `git clone` step is implemented in an empty directory. Otherwise the `git clone` command will fail (Git will refuse to clone on an existing directory).

You can enter your own Git username/password or [reuse the credentials]({{site.baseurl}}/docs/pipelines/steps/git-clone/#reuse-a-git-token-from-codefresh-integrations) from the Codefresh integration.

## Manually running Git commands

Once you understand that you can manually run Git commands in Codefresh pipelines, it is easy to see that any Git workflow is possible.
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

If there are any errors with the merge, the pipeline fails automatically. Codefresh automatically stops any pipeline that shows an error in a step.

## Other forms of cloning

There is nothing special about running Git it in a freestyle step. In fact, you can check out code with any other command that you would run locally in your terminal.

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

For more examples, such as using SSH keys and working with Git submodules, see the [Git-clone]({{site.baseurl}}/docs/pipelines/steps/git-clone/) step.


## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Native Git checkout]({{site.baseurl}}/docs/example-catalog/ci-examples/git-checkout/)  
[Native Git integration]({{site.baseurl}}/docs/integrations/git-providers/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)

