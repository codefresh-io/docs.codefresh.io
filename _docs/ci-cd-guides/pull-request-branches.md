---
title: "Pull Requests and Branches"
description: "Learn how to handle builds for Pull requests or other branches"
group: ci-cd-guides
toc: true
---

Codefresh has native support for working with different branches and building pull requests. In particular it has a very rich trigger model that allows you to handle specific events (such as opening a pull request or adding a comment).

The possible actions can be seen on the trigger dialog of your pipeline:

{% include image.html
lightbox="true"
file="/images/pipeline/triggers/add-git-trigger.png"
url="/images/pipeline/triggers/add-git-trigger.png"
alt="Adding GIT Trigger"
max-width="50%"
%}

Notice however that Codefresh capabilities are always based on what your Git provider is offering. If your GIT provider does not support webhooks for specific events, then these will not be available in the trigger dialog.


## Building branches automatically


By default Codefresh will connect to your Git provider and do the following:

1. Auto-build every new commit that happens in master or any other branch
2. Auto-build every new branch when it is created

You can change the default behavior so that it matches your own workflow using extra [GIT Triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/).

You don't have to do anything special to setup this communication between Codefresh and your Git provider. It was setup automatically for you when you connected your Codefresh account to your Git provider.

Codefresh also creates for you a default GIT trigger the first time you create a project.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/triggers/default-git-trigger.png" 
url="/images/pipeline/triggers/default-git-trigger.png" 
alt="Default GIT trigger" 
caption="Default GIT trigger" 
max-width="50%" 
%}


If you create a new branch in your repository Codefresh will automatically build it (and also store the resulting Docker image). 


```
git checkout -b another-branch
[..make changes...]
git commit -a -m "My changes"
git push -u origin another-branch
```


The build will clearly define its source branch:

{% include image.html 
lightbox="true" 
file="/images/guides/auto-branch-build.png" 
url="/images/guides/auto-branch-build.png" 
alt="Building automatically new branches" 
caption="Building automatically new branches"
max-width="100%" 
%}


When you commit to a Pull Request, not only Codefresh will auto-build it, but you will also see the build request in the GitHub UI as well:

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-test-pr/auto-build-pr.png" 
url="/images/getting-started/quick-start-test-pr/auto-build-pr.png" 
alt="Pull Request Status" 
caption="Pull Request Status (click image to enlarge)" 
max-width="50%" 
%}

## Building specific branches manually

Sometimes you want to run an ad-hoc build on a specific branch without actually committing anything. You can do that in the [run dialog of a pipeline]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#creating-new-pipelines) by selecting a branch from the drop down menu.

{% include image.html 
lightbox="true" 
file="/images/guides/build-specific-branch.png" 
url="/images/guides/build-specific-branch.png" 
alt="Building a specific branch" 
caption="Building a specific branch"
max-width="50%" 
%}

From the same dialog you can also choose a specific trigger to "emulate" for this branch, if you have connected multiple triggers on the same pipeline.

## Restricting which branches to build

While the auto-build nature of Codefresh for all branches, is what you want most times, for larger projects you might wish to restrict pipeline running only on specific branches.

This is performed by filling [the branch field]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#pull-request-target-branch-and-branch) in the trigger dialog with a regular expression.

{% include image.html 
lightbox="true" 
file="/images/guides/restrict-branch.png" 
url="/images/guides/restrict-branch.png" 
alt="Restrict a pipeline to a single branch" 
caption="Restrict a pipeline to a single branch"
max-width="50%" 
%}

The trigger above will only be activated for the `production` branch, so if a developer creates another new branch this pipeline will not run for it. Remember also that this field is actually a regular expression so you can restrict a pipeline to a specific naming pattern (i.e. a group of branch names).

Another popular filtering mechanism is to keep the auto-build nature of Codefresh, but enable/disable specific pipeline steps according to the branch being built. This is performed by using [step conditionals]({{site.baseurl}}/docs/codefresh-yaml/conditional-execution-of-steps/). Here is an example

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - prepare
  - build
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    stage: prepare
    type: git-clone
    repo: 'codefresh-contrib/spring-boot-2-sample-app'
    revision: master
    git: github     
  build_app_image:
    title: Building Docker Image
    type: build
    stage: build
    image_name: spring-boot-2-sample-app
    working_directory: ./
    tag: 'multi-stage'
    dockerfile: Dockerfile
  deploy_production:
    title: Deploying to production
    type: deploy
    stage: deploy
    kind: kubernetes
    cluster: 'my-prod-cluster' 
    namespace: default
    service: my-prod-app
    candidate:
      image: '${{build_app_image}}'
      registry: 'dockerhub'
    when:
      branch:
        only:
          - master  
  deploy_staging:
    title: Deploying to staging
    type: deploy
    stage: deploy
    kind: kubernetes
    cluster: 'my-staging-cluster' 
    namespace: development
    service: my-staging-app
    candidate:
      image: '${{build_app_image}}'
      registry: 'dockerhub'
    when:
      branch:
        only:
          - /^JIRA-FEATURE-.*/i      
{% endraw %}
{% endhighlight %}


This pipeline will execute for **ALL** branches and pull requests, but:

1. If the branch is `master` it will deploy the docker image to the production cluster and namespace `default`
1. If the branch starts with `JIRA-FEATURE-` (e.g. JIRA-FEATURE-1234, JIRA-FEATURE-testing, JIRA-FEATURE-fixbbug), it will deploy to a staging cluster to namespace `development`
1. In all other cases of branches or pull request it will just build the docker image without deploying it anywhere

You can see that if a developer creates an unrelated branch (that doesn't match the expected name), no deployment will take place:

{% include image.html 
lightbox="true" 
file="/images/guides/branch-step-condition.png" 
url="/images/guides/branch-step-condition.png" 
alt="Restrict pipeline steps according to branch" 
caption="Restrict pipeline steps according to branch"
max-width="80%" 
%}

This is a more granular way to control how your branch affects your pipeline.

>Notice that we recommend you follow the first method of having multiple simple pipelines with different branch expressions in the trigger dialog, instead of having a single complex pipeline that is using step conditionals. Remember that in Codefresh you can create as many pipeline as you want for a single project instead of being limiter to 1 pipeline per project.

## Handling Pull Request events

PR event, open

Pr sync


## Trunk based development

deploy on master

PR-open, PR-sync

## Git-flow

## Create your own workflow






## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)





