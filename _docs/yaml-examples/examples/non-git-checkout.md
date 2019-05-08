---
title: "Checking out from other Source Control systems"
description: "Work with non-git repositories"
group: yaml-examples
sub_group: examples
toc: true
---

Codefresh has [Native Git support]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/) but you can still use any other version control system such as SVN, CVS, hg, etc.

The only requirement is that you find or create a Docker image that contains the client for that source control system and then use a 
[freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) to run it.

## Checking out Subversion code

There is already a public [Docker image with the svn client](https://hub.docker.com/r/jgsqware/svn-client/), so it is very easy to run it in a Codefresh pipeline.

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  myCustomCheckout:
    title: Performing SVN checkout
    image: jgsqware/svn-client
    commands:
      - pwd
      - rm -rf audacity-svn
      - svn checkout https://svn.code.sf.net/p/audacity/svn/ audacity-svn
  PrintFileList:
    title: 'Listing files'
    image: alpine:latest
    commands:
      - 'ls -l /codefresh/volume/'     
{% endraw %}
{% endhighlight %}

Notice the `rm` command before the clone step. This makes sure that everytime the pipeline will run the `svn checkout` step will happen in an empty directory. 



## Checking out Mercurial or CVS Code

It is very simple to use any other Source control system in a Codefresh pipeline. The easiest way is to just call the respective executable.

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  myHgStep:
    title: Using HG
    image: alpine:latest
    commands:
      - apk add --no-cache mercurial
      - hg --version
  myCvsStep:
    title: Using CVS 
    image: alpine:latest
    commands:
      - apk add --no-cache cvs
      - cvs --version
{% endraw %}
{% endhighlight %}

A much faster way is to create your own Dockerfile that includes the client you need and then mention that image directly in the freestyle step.


## Checking out Perforce code

Codefresh has created a [Perforce plugin](https://hub.docker.com/r/codefresh/cf-p4-plugin/tags) which packs the p4 client into a Docker image in order to be used from Codefresh pipelines:

{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  myCustomCheckout:
    title: Performing Perforce checkout
    image: codefresh/cf-p4-plugin:latest
    commands:
      - mkdir -p /codefresh/volume/p4repo/ 
      - p4 client -o | grep -v '#' | sed  '/Root:/c\Root:/codefresh/volume/p4repo/' | p4 client -i
      - cd /codefresh/volume/p4repo/ && p4 rec
      - 'ls -la'
    environment:
      - P4PORT=serveradress:serverport
      - P4CLIENT=clientname
      - P4USER=username
      - P4PASSWD=password
{% endraw %}
{% endhighlight %}

The environments variables should be defined in [Codefresh shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/).


## What to read next

* [Native Git checkout]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout/)
* [Running custom git commands]({{site.baseurl}}/docs/yaml-examples/examples/git-checkout-custom/)
* [Freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
* [Git Clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
