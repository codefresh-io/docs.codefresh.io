---
title: "Compile and release a Go application"
description: "Using Codefresh pipelines"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/learn-by-example/golang/goreleaser/
toc: true
---

[Goreleaser](https://github.com/goreleaser/goreleaser){:target="\_blank"} is a helper utility that allows you to easily create the following for Go applications:

* Binary packages for each OS/arch
* Archives
* GitHub releases
* Docker images
* Snap/RPM/deb/Homebrew


Codefresh can also create Docker images on its own, but Goreleaser is still useful for the binary artifact creation capability.


## Run Goreleaser with docker

You can see the example project at [https://github.com/codefresh-contrib/goreleaser-sample-app](https://github.com/codefresh-contrib/goreleaser-sample-app){:target="\_blank"}. The repository contains a simple Golang web application with a [goreleaser configuration](https://github.com/codefresh-contrib/goreleaser-sample-app/blob/master/.goreleaser.yml){:target="\_blank"}.


There is already a [Docker image for Goreleaser](https://hub.docker.com/r/goreleaser/goreleaser/){:target="\_blank"} so it is very easy to use it in Codefresh pipeline.
In the most simple case you case run goreleaser in a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).

 `YAML`
{% highlight yaml %}
{% raw %}
  ReleaseMyApp:
    title: Creating packages
    stage: release
    image: 'goreleaser/goreleaser'
    commands:
      - goreleaser --snapshot --skip-publish --rm-dist
{% endraw %}
{% endhighlight %}

More typically however you also need to provide a GitHub token so that GitHub releases are also available. There are two ways to do that.


## Create a CI pipeline that compiles/releases Go

In most cases you want to just reuse the Git integration already defined in Codefresh.
This [pipeline](https://github.com/codefresh-contrib/goreleaser-sample-app/blob/master/codefresh.yml){:target="\_blank"} is using the GitHub token from [Git integration]({{site.baseurl}}/docs/integrations/git-providers/) in order to allow GitHub access.

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
  - release
steps:
  main_clone:
    title: 'Cloning main repository...'
    type: git-clone
    repo: '${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}'
    revision: '${{CF_REVISION}}'
    stage: prepare
  BuildMyApp:
    title: Compiling go code
    stage: build
    image: 'golang:1.12'
    commands:
      - go build
  GetGitToken:
    title: Reading GitHub token
    stage: release
    image: codefresh/cli
    commands:
      - cf_export GITHUB_TOKEN=$(codefresh get context github-1 --decrypt -o yaml | yq -y .spec.data.auth.password)     
  ReleaseMyApp:
    title: Creating packages
    stage: release
    image: 'goreleaser/goreleaser'
    commands:
      - goreleaser --rm-dist 
{% endraw %}
{% endhighlight %}

Note that GoReleaser [requires a GitHub API token](https://goreleaser.com/environment/){:target="\_blank"} (`GITHUB_TOKEN`) with the `repo` scope to deploy artifacts to GitHub.
Here we use [cf_export]({{site.baseurl}}/docs/pipelines/variables/#exporting-environment-variables-from-a-freestyle-step) and the [codefresh CLI](https://codefresh-io.github.io/cli/){:target="\_blank"} in order to ask Codefresh about the existing token (that was used in git integrations). In your case you need to change `github-1` with the name of your [GitHub integration]({{site.baseurl}}/docs/integrations/git-providers/).

It also possible to pass a GITHUB_TOKEN directly in the pipeline, if you don't want to re-use the existing one. This is an alternative way of allowing Goreleaser to create GitHub releases.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/golang/github-token.png" 
url="/images/learn-by-example/golang/github-token.png" 
alt="Passing a specific github token in the pipeline" 
caption="Passing a specific github token in the pipeline" 
max-width="70%" 
%}

You could also store the token in [shared configuration]({{site.baseurl}}/docs/pipelines/shared-configuration/).
Regardless of the way you choose to pass the GitHub token, the final step is to make sure that your pipeline is only executed for tag events.


{% include image.html 
lightbox="true" 
file="/images/learn-by-example/golang/tags-only-trigger.png" 
url="/images/learn-by-example/golang/tags-only-trigger.png" 
alt="Run pipeline only on tag creation" 
caption="Run pipeline only on tag creation" 
max-width="80%" 
%}

This means that this pipeline will not run on normal commits. It is also possible to use [step conditionals]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/) for more complex cases.

## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  