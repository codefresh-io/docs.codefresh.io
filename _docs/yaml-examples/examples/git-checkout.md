---
title: "Checking out Git repositories"
description: "Using the Codefresh native GIT integration"
group: yaml-examples
sub_group: examples
toc: true
---

Codefresh has native support for GIT repositories and Git triggers. First you need to setup a [GIT integration]({{site.baseurl}}/docs/integrations/git-providers/) (Your administrator might also have done this for you already).

{% include image.html 
lightbox="true" 
file="/images/integrations/git/git-integrations.png" 
url="/images/integrations/git/git-integrations.png"
alt="GIT integrations"
caption="GIT integrations"
max-width="70%"
%}

You can add new integration for any cloud provider or even [on-premise]({{site.baseurl}}/docs/enterprise/behind-the-firewall/) ones. By default you will also have a provider setup if you used one for Codefresh signup (Github, Gitlab or Bitbucket).

For each Git Integration, make sure that you note down its name, as you will use in your pipeline inside a [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step.


## Cloning a specific repository

The simplest way to clone using your git provider is by specifying the exact repository details.
Here is a pipeline that clones a git repository and creates a Docker image from a Dockerfile:


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
        git: github-1
    myDockerImage:
        title: 'BuildingDockerImage'
        type: build
        image_name: my-app-image
        tag: from-master-branch
{% endraw %}
{% endhighlight %}

This syntax is very simple to use, but has the disadvantage that ties your pipeline to a specific repository. This makes
the pipeline impossible to re-use among different micro-services (that are built in a similar manner).

## Cloning the triggered repository (recommended)

The proper way to use git-clone steps is to make them trigger specific. Instead of hard-coding the git repository that is checked-out, it is best to checkout the same one that [triggered the pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/). This is what you want in most scenarios anyway.

This can be achieved by using Codefresh [variables]({{site.baseurl}}/docs/codefresh-yaml/variables/) to refer to the trigger.
Here is the same pipeline as before, written in a generic way:

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
        git: github-1
    myDockerImage:
        title: 'BuildingDockerImage'
        type: build
        image_name: my-app-image
        tag: ${{CF_BRANCH_TAG_NORMALIZED}}
{% endraw %}
{% endhighlight %}

The big advantage of this pipeline is that it can be reused for *ALL* your projects the follow the same pattern of having a Dockerfile in the root of the git repository.

{% include image.html 
lightbox="true" 
file="/images/examples/checkout/simulate-trigger.png" 
url="/images/examples/checkout/simulate-trigger.png"
alt="Simulating a GIT trigger"
caption="Simulating a GIT trigger"
max-width="60%"
%}


## Working in the cloned directory



## Cloning multiple repositories


## What to read next

* [Git integrations]({{site.baseurl}}/docs/integrations/git-providers/)
* [Git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/)
* [Git Clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
* [Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build-1/)