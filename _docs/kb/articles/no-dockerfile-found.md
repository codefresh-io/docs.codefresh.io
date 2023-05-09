---
title: "No Dockerfile found"
description: "Failed to fetch the Dockerfile from path"
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: true
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Issue

[Build step]({{site.baseurl}}/docs/pipelines/steps/build/) in your pipeline fails with the error message:  

```shell
Repository does not contain a Dockerfile. Please check the pipeline configuration
```

OR

```shell
Failed to fetch the Dockerfile from path
```

## Possible cause

This issue occurs when you are trying to build a Docker image and the pipeline step cannot find a Dockerfile. It might be helpful to include a dummy step in your pipeline that prints all files in the workspace. This way you can verify what files are available to the pipeline.

`pipeline step`
{% highlight yaml %}
{% raw %}
print_pwd_files:
  title: 'Listing files'
  image: alpine:latest
  commands:
    - 'ls -l'
{% endraw %}
{% endhighlight %}

## Solution

There are two ways to address this error:

### Include clone step with name  `main_clone`

First, make sure that you have at least one [clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) in your pipeline, `main_clone` as the name. This way the current folder is automatically set up in the project folder of the Git repository.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: 'Cloning main repository...'
    type: git-clone
    repo: kostis-codefresh/example_nodejs_postgres
    revision: master
    git: github
  myDockerImage:
    title: 'Building My Docker Image'
    type: build
    dockerfile: Dockerfile
    image_name: my-app-image
    tag: from-master-branch
{% endraw %}
{% endhighlight %}

### Verify target directory of build step

Secondly, if you check out multiple Git repositories or use a different name in your Git clone step, make sure that the build step looks at the correct directory:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  checkoutApp:
    title: 'Cloning a repository...'
    type: git-clone
    repo: kostis-codefresh/trivial-go-web
    revision: master
    git: github
  myDockerImage:
    title: 'Building Docker Image'
    type: build
    dockerfile: Dockerfile
    working_directory: './trivial-go-web'
    image_name: my-app-image
    tag: from-master-branch
{% endraw %}
{% endhighlight %}

Notice that the `working_directory` property of the build step, searches for the Dockefile in the folder named `trivial-go-web` instead of the root folder of the pipeline workspace.

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)  
