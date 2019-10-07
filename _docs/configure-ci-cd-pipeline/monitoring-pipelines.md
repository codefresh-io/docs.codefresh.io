---
title: "Monitoring pipelines"
description: "Viewing your builds and logs"
group: configure-ci-cd-pipeline
toc: true
---


All pipeline activity in Codefresh can be viewed on the *Builds* tab. 
There is one global view from the left-side menu that shows builds for all projects
across your organization and a project-based view from the settings inside an individual project.

Both views have the same controls and filters.

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
max-width="60%"
%}

By default, it shows all builds that happening in Codefresh. To narrow the list you can use the filters on the top
of the screen.

### Applying filters on the build view

Directly above the list you can find several filters.

At the most basic level you can choose between

 * *Running* builds that are currently executing
 * *Pending* builds which are queued and waiting to start
 * *Delayed* builds which cannot run yet, because there are not free pipeline builders
 * *All* builds regardless of running stage (this is the default)

You can further filter the builds by choosing the various filter types that specify the build job.

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

* *Pipeline* - any of the pipelines available.
* *Provider* - type of [Git provider]({{site.baseurl}}/docs/integrations/git-providers/).
* *Repository* - Git repository from the attached [trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/).
* *Type* - build, [launch a test environment]({{site.baseurl}}/docs/getting-started/on-demand-environments/#launching-a-docker-image-using-codefresh).
* *Branch* - any of the available branches from the attached Git trigger.
* *Committer* - person that made the commit that triggered the build.
* *Status* - success, error, in-progress, pending, terminated etc.


Notice that all filters are multiple-choice so you can select multiple values for each filter category.
At any given point you can see all the active filters on top of the screen.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/possible-filters.png" 
url="/images/pipeline/monitoring/possible-filters.png"
alt="Pipeline filters in Codefresh" 
caption="Active filters (click to enlarge)"
max-width="40%"
%}

You can easily remove active filters, by clicking on them and adding/removing values.

### Creating build views

Once you have a set of filters that you use regularly, you can save them as a custom *Build View* by clicking the *Save as View* button
and providing a name.

Now you can select at the top of the window any of the available build views to automatically filter results according to the respective set of filters.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-view-selection.png" 
url="/images/pipeline/monitoring/build-view-selection.png"
alt="Build View selection" 
caption="Build View selection (click to enlarge)"
max-width="40%"
%}

You can delete existing build-views by clicking on the *manage views* button.
You can change the filters of an existing build view by making a new filter selection and then saving the view with an existing name (effectively overwriting it).


### Build details


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

There are also two extra options if you click the small "3-dot" menu button on the right. You can rebuild a pipeline or launch a [test environment]({{site.baseurl}}/docs/getting-started/on-demand-environments/#launching-a-docker-image-using-codefresh) from the resulting Docker image.

Notice that if you restart a pipeline it will trigger with the exact settings it originally had. So 
if this was a manual trigger where you [disabled caching]({{site.baseurl}}/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/) or changed the [notification options](#monitoring-pipelines-that-check-pull-requests), the new
execution will still honor those settings (even if you have changed them for later builds).

An extra button for test reports will be visible if you are using the [test report feature]({{site.baseurl}}/docs/testing/test-reports/) of Codefresh.


## Viewing details for an individual pipeline build

If you click on any individual pipeline you will enter the pipeline build information screen.
From here you can see more details for a build such as the logs, running time and resource metrics.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/pipeline-view.png" 
url="/images/pipeline/monitoring/pipeline-view.png"
alt="Pipeline view" 
caption="Pipeline view"
max-width="80%"
%}

Each section in this screen corresponds to each pipeline step. There are two special steps:

* *Initializing Process* 
* *Cloning Main Repository*

These are Codefresh built-in steps and will appear for most builds (you can also create a pipeline that doesn't clone a git repository by default). The rest of the step names depend on your `codefresh.yml` (or the default step names provided by Codefresh). The different columns take the names from the defined [pipeline stages]({{site.baseurl}}/docs/codefresh-yaml/stages/).

### Viewing logs from pipeline steps

Click on each step in order to see the respective log.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-logs.png" 
url="/images/pipeline/monitoring/build-logs.png"
alt="step details in Codefresh" 
caption="Step details (click to enlarge)"
max-width="80%"
%}


You can copy the step logs with the *copy to clipboard* button at the top left corner of the log window.
You can also search the logs by clicking at magnifying glass icon at the top right corner in the log window.

### Reviewing the yaml for the pipeline

From the step details you can also click on the yaml tab to see the yaml segment for that individual step:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/yaml-from-step.png" 
url="/images/pipeline/monitoring/yaml-from-step.png"
alt="Step Yaml" 
caption="Step Yaml"
max-width="60%"
%}

If you want to see the yaml for the whole pipeline, click the *YAML* tab on the bottom left corner without selecting a step first.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/view-pipeline-yaml.png" 
url="/images/pipeline/monitoring/view-pipeline-yaml.png"
alt="Pipeline Yaml" 
caption="Pipeline Yaml"
max-width="60%"
%}

In both cases you can copy to clipboard the yaml shown using the button at the top left corner.

### Viewing pipeline metrics

Codefresh offers several metrics for pipeline steps that allow you to get a better overview on the resources
consumed by your pipeline.

At the most basic level Codefresh will show some quick metrics while the pipeline is running that include
memory consumed and size of logs:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/quick-pipeline-metrics.png" 
url="/images/pipeline/monitoring/quick-pipeline-metrics.png"
alt="Pipeline running metrics" 
caption="Pipeline running metrics"
max-width="70%"
%}

You can then get the memory usage for the whole pipeline by clicking on the metrics tab at the bottom of the screen.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/pipeline-metrics.png" 
url="/images/pipeline/monitoring/pipeline-metrics.png"
alt="Pipeline detailed metrics" 
caption="Pipeline detailed metrics"
max-width="70%"
%}


If you click on an individual step before clicking the *Metrics* tab you will get metrics for that specific step only.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/step-metrics.png" 
url="/images/pipeline/monitoring/step-metrics.png"
alt="Step metrics" 
caption="Step metrics"
max-width="70%"
%}


### Restarting the pipeline 

You can choose to restart any pipeline by clicking the button at the top right corner.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/restart-pipeline.png" 
url="/images/pipeline/monitoring/restart-pipeline.png"
alt="Restart a pipeline" 
caption="Restart a pipeline"
max-width="70%"
%}

If the pipeline has failed, you can choose to restart it only from the failed step and onwards.

You can also restart from a failed step right from the graphical view:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/restart-failed.png" 
url="/images/pipeline/monitoring/restart-failed.png"
alt="Restart from a failed step" 
caption="Restart from a failed step"
max-width="70%"
%}

>Notice that in all cases *Restart* means restarting the pipeline with the exact state that it had at the point in time (including the original git commit).

If your pipeline has some flaky steps, you can also use the [retry syntax]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/#retrying-a-step) in your yaml instead of restarting them manually each time they fail.


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

If you have setup a [GIT trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) in Codefresh then by default this happens automatically without any other configuration
for all automated commits (that are coming from webhooks).

If you start a build manually then by default the git status will **not** be updated (i.e. the result of the pipeline
will not affect the status of Pull request)

If you don't want this behavior to happen, you can enable the git status update checkbox when you launch a pipeline.

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

For open source projects you also have the ability to [trigger builds from external forks]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#support-for-building-pull-requests-from-forks).

### Viewing Pipeline status from text/html files

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

See the [build badges page]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/) for more information.


## What to read next

* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Pipeline steps]({{site.baseurl}}/docs/codefresh-yaml/steps/)
* [Test report]({{site.baseurl}}/docs/configure-ci-cd-pipeline/test-reports/)
* [Status badges]({{site.baseurl}}/docs/configure-ci-cd-pipeline/build-status/)










