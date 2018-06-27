---
title: "Monitoring pipelines"
description: "Viewing your builds and logs"
group: configure-ci-cd-pipeline
toc: true
---


All pipeline activity in Codefresh can be viewed on the *Builds* tab. 
There is one global view from the left-side menu that shows builds for all projects
across your organization and a project-based view from the settings inside an individual project.

Both views has the same controls and filters..

## Viewing pipeline status

Each screen contains all builds sorted from the most recent to the oldest. The first time you visit
the screen there are no filters defined.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/builds.png" 
url="/images/pipeline/monitoring/builds.png"
alt="Pipeline Activity in Codefresh" 
caption="Pipeline activity (click to enlarge)"
max-width="80%"
%}

By default it shows all builds that happening in Codefresh. To narrow the list you can use the filters on the top
of the screen.

### Applying filters on the build view

Directly above the list you can find several filters.

At the most basic level you can choose between

 * *Running* builds that are currently executing
 * *Pending* builds which are queued and waiting to start
 * *All* builds regardless of running stage (this is the default)

You can further filter the builds by choosing the various filter types that specify the build job

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/filtering.png" 
url="/images/pipeline/monitoring/filtering.png"
alt="Pipeline filters in Codefresh" 
caption="Available filters (click to enlarge)"
max-width="40%"
%}

The available filters are:

* *Repositories* - any of the linked repositories
* *Branches* - any of the available branches
* *Committers* - person that made the commit that triggered the build
* *Status* - success, error, in-progress, pending, terminated
* *Type* - build, [launch a test environment]({{ site.baseurl }}/docs/getting-started/on-demand-environments/#launching-a-docker-image-using-codefresh)


Notice that all filters are multiple-choice so you can select multiple values for each filter category.
At any given point you can see all the active filters on top of the screen.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/possible-filters.png" 
url="/images/pipeline/monitoring/possible-filters.png"
alt="Pipeline filters in Codefresh" 
caption="Active filters (click to enlarge)"
max-width="80%"
%}

You can easily remove active filters, by clicking on them and adding/removing values.


For each individual build you can see several details such as the git hash, the person that made the commit, the pipeline that was triggered as well as how much time it took. On the right side you can see the docker images that belong to this pipeline, the `codefresh.yml` file that was executed behind the scenes as well as the logs (explained later on).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-details.png" 
url="/images/pipeline/monitoring/build-details.png"
alt="build details in Codefresh" 
caption="Build details (click to enlarge)"
max-width="80%"
%}

There are also two extra options if you click the small "3-dot" menu button on the right. You can rebuild a pipeline or launch a [test environment]({{ site.baseurl }}/docs/getting-started/on-demand-environments/#launching-a-docker-image-using-codefresh) from the resulting Docker image.


## Viewing logs from an individual pipeline

If you click on any individual pipeline you will see a screen that shows the logs of each individual step.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-logs.png" 
url="/images/pipeline/monitoring/build-logs.png"
alt="step details in Codefresh" 
caption="Step details (click to enlarge)"
max-width="80%"
%}

Each section in this screen corresponds to each pipeline step. The first two steps

* *Initializing Process*
* *Cloning main repository*

are Codefresh built-in steps and will appear for most builds (you can create a pipeline that doesn't clone a git repository by default). The rest of the step names depend on your `codefresh.yml` (or the default step names provided by Codefresh)


For each individual step you can see the running time as well the respective logs. You can expand each individual section
by clicking on its name and copy its logs with the *copy to clipboard* at the bottom.

## Monitoring Pipelines outside the Codefresh UI

You don't always have to be in the Codefresh UI in order to monitor the status of your builds. 


### Monitoring Pipelines that check Pull requests

One of the most
important roles of a CI platform is to automatically update the status of a GIT Pull request with the result
of the respective build.

{% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-test-pr/auto-build-pr.png" 
url="/images/getting-started/quick-start-test-pr/auto-build-pr.png" 
alt="Pull Request Status" 
caption="Pull Request Status (click image to enlarge)" 
max-width="50%" 
%}





If you have setup a [GIT trigger]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) in Codefresh then by default this happens automatically without any other configuration
for all automated commits (that are coming from webhooks).

If you start a build manually then by default the git status will **not** be updated (i.e. the result of the pipeline
will not affect the status of Pull request)

If you don't want this behavior to happen you can enable the git status update checkbox when you launch a pipeline.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/report-notification-checkbox.png" 
url="/images/pipeline/monitoring/report-notification-checkbox.png" 
alt="Update git status for pipelines triggered manually " 
caption="Update git status for pipelines triggered manually (click image to enlarge)" 
max-width="50%" 
%}

This way the pipeline status *will* change the build status even with manual builds.

The same behavior is also available to the [Codefresh CLI](https://codefresh-io.github.io/cli/). In that case use the parameter `--enable-notifications`
to specify if manually triggering a build will also change the GIT status.

### Viewing Pipelines status from text/html files

Codefresh also supports build badges that allow you to show the
status of Pipeline in Text files or web pages.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-badge.png" 
url="/images/pipeline/monitoring/build-badge.png" 
alt="Codefresh build badges" 
caption="Codefresh build badges" 
max-width="100%" 
%}

See the [build badges page]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/build-status/) for more information.










