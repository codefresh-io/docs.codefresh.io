---
title: "Pull Requests and Branches"
description: "Learn how to handle builds for Pull requests or other branches"
group: ci-cd-guides
toc: true
---

Codefresh has native support for working with different branches and building pull requests. In particular, it has a very rich trigger model that allows you to handle specific events (such as opening a pull request or adding a comment).

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

Codefresh also creates for you a default Git trigger the first time you create a project.

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
file="/images/guides/branches-pull-requests/auto-branch-build.png"
url="/images/guides/branches-pull-requests/auto-branch-build.png"
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
file="/images/guides/branches-pull-requests/build-specific-branch.png"
url="/images/guides/branches-pull-requests/build-specific-branch.png"
alt="Building a specific branch"
caption="Building a specific branch"
max-width="50%"
%}

From the same dialog, you can also choose a specific trigger to "emulate" for this branch if you have connected multiple triggers on the same pipeline.

## Restricting which branches to build

The auto-build nature of Codefresh for all branches, is what you want most times. For larger projects you might wish to restrict pipelines running only on specific branches.

This is performed by filling [the branch field]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#pull-request-target-branch-and-branch) in the trigger dialog with a regular expression.

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/restrict-branch.png"
url="/images/guides/branches-pull-requests/restrict-branch.png"
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

1. If the branch is `master` it will deploy the Docker image to the production cluster and namespace `default`
1. If the branch starts with `JIRA-FEATURE-` (e.g. JIRA-FEATURE-1234, JIRA-FEATURE-testing, JIRA-FEATURE-fixbbug), it will deploy to a staging cluster to namespace `development`
1. In all other cases of branches or pull requests it will just build the Docker image without deploying it anywhere

You can see that if a developer creates an unrelated branch (that doesn't match the expected name), no deployment will take place:

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/branch-step-condition.png"
url="/images/guides/branches-pull-requests/branch-step-condition.png"
alt="Restrict pipeline steps according to branch"
caption="Restrict pipeline steps according to branch"
max-width="80%"
%}

This is a more granular way to control how your branch affects your pipeline.

>Notice that we recommend you follow the first method of having multiple simple pipelines with different branch expressions in the trigger dialog, instead of having a single complex pipeline that is using step conditionals. Remember that in Codefresh you can create as many pipeline as you want for a single project instead of being limited to 1 pipeline per project.

## Handling Pull Request events

The big power of Codefresh becomes evident when you realize that you can have extra pipelines that respond to specific Pull Request events. For example, you can have a specific pipeline that runs **only** when a Pull Request is opened for the first time or when a Pull Request is closed.

You can see all supported Pull Request events in the trigger dialog.

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/choosing-pr-events.png"
url="/images/guides/branches-pull-requests/choosing-pr-events.png"
alt="Choosing PR events for a pipeline"
caption="Choosing PR events for a pipeline"
max-width="80%"
%}

>Remember that the events shown are those supported by your Git provider. Not all Git providers support all possible Pull request events.

You can select multiple Pull Request events for a single pipeline, or have multiple pipelines that respond to individual Pull Request events. There is no right or wrong answer as it mostly depends on how your team is handling Pull Requests

The most useful events are:

* Pull Request open
* Pull Request sync (when a commit happens to a PR)
* Pull Request closed 
* Comment added on Pull Request

There is also the shortcut checkbox for *any PR event* if you don't care about which specific event happened.

## Trunk based development

One of the most popular git workflows is [Trunk Based development](https://trunkbaseddevelopment.com/) with short lived feature branches. 

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/trunk-based-development.png"
url="/images/guides/branches-pull-requests/trunk-based-development.png"
alt="Trunk Based development"
caption="Trunk Based Development"
max-width="100%"
%}

In this process, the master branch is always ready for production. The feature branches are created from master and can have several commits before being merged back to master.

This process can be easily created in Codefresh with two separate pipelines

* The "main" pipeline that deploys master to the production environment
* The feature pipeline that checks each feature as it is developed (and optionally deploys it to a staging environment)

As an example here is a minimal pipeline for the master branch:

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/production-pipeline.png"
url="/images/guides/branches-pull-requests/production-pipeline.png"
alt="Pipeline that deploys to production"
caption="Pipeline that deploys to production"
max-width="100%"
%}

The pipeline:

1. Checks out the source code
1. Builds a Docker image
1. Creates and Stores a Helm chart
1. Deploys the chart to Kubernetes

The pipeline for feature branches is different:

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/feature-pipeline.png"
url="/images/guides/branches-pull-requests/feature-pipeline.png"
alt="Pipeline for feature branches"
caption="Pipeline for feature branches"
max-width="100%"
%}

For each feature branch:

1. We checkout the code
1. Run linters on the source code
1. Build the Docker image
1. Run some unit tests to verify the Docker image (possible with [service containers]({{site.baseurl}}/docs/codefresh-yaml/service-containers/))

To implement trunk-based development we create two triggers for these pipelines. For the production pipeline we just make sure that the trigger is only launched when commits land on master (and only there).

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/trigger-for-production-pipeline.png"
url="/images/guides/branches-pull-requests/trigger-for-production-pipeline.png"
alt="Trigger for production pipeline"
caption="Trigger for production pipeline"
max-width="50%"
%}

For the feature branch pipeline we check the events for:

* Pull Request Open
* Pull Request Sync (when a commit happens on the PR)

For the [branch specifications]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#pull-request-target-branch-and-branch) we make sure that we look only for Pull Requests that are targeted **AT** `master`.

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/trigger-for-features.png"
url="/images/guides/branches-pull-requests/trigger-for-features.png"
alt="Trigger for pull request pipeline"
caption="Trigger for pull request pipeline"
max-width="50%"
%}

With this configuration, the whole process is as follows:

1. A developer creates a new branch from master. Nothing really happens at this point
1. The developer opens a new Pull Request for this branch. The feature pipeline runs (because of the PR open checkbox)
1. The developer commits one or more times on the branch. The feature pipeline runs again for each commit (because of the PR sync checkbox)
1. The developer commits the branch back to master. The main pipeline runs and deploys to production.

You can fine-tune this workflow according to your needs. For example, you might also specify a naming pattern on the branches for the Pull Requested (e.g. feature-xxx) to further restrict which branches are considered ready for production.

> Notice that we didn't need to handle the PR close/merge events. As soon as a Pull Request is merged back to master, the GIT provider sends anyway an event that a commit has happened in master, which means that the main production pipeline will take care of releasing the contents of master.

## Git-flow

[Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) is another popular management process for git branches. For brevity reasons, we will not list all the details for all branch types, but it should be obvious that you can recreate all aspects of Git flow with Codefresh triggers.

For example to run a pipeline only for pull requests from branches named `feature-XXX` that will be merged back to `develop` branch, you can create a trigger like this:

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/git-flow-feature-trigger.png"
url="/images/guides/branches-pull-requests/git-flow-feature-trigger.png"
alt="Git flow feature branch trigger"
caption="Git flow feature branch trigger"
max-width="50%"
%}

To launch a pipeline that will only run when a commit happens on a release branch named `release-XXX` you can create a trigger like this:

{% include image.html
lightbox="true"
file="/images/guides/branches-pull-requests/git-flow-release-pipeline-trigger.png"
url="/images/guides/branches-pull-requests/git-flow-release-pipeline-trigger.png"
alt="Git flow release branch trigger"
caption="Git flow release branch trigger"
max-width="50%"
%}

In a similar manner, you can create the triggers for all other branch types in Git flow.

## Create your own workflow

Trunk-based development and Git-flow are only some examples of what a Git workflow can look like. Your organization might follow a completely different process. Using the basic building blocks of Codefresh triggers (branch field PR checkboxes etc) you should be able to model your own workflow according to your own pipelines.

## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Git Triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/)
* [YAML Examples]({{site.baseurl}}/docs/yaml-examples/examples/)
* [Preview environments]({{site.baseurl}}/docs/ci-cd-guides/preview-environments/)





