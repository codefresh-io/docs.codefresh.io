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
file="/images/pipeline/monitoring/builds-dashboard.png" 
url="/images/pipeline/monitoring/builds-dashboard.png"
alt="Pipeline Activity in Codefresh" 
caption="Pipeline activity"
max-width="80%"
%}

By default, it shows all builds that is happening in Codefresh. To narrow the list you can use the filters on the top
of the screen.

### Applying filters on the build view

Directly above the list you can find several filters.

At the most basic level you can choose between

 * *Running* builds that are currently executing
 * *Pending* builds which are queued and waiting to start
 * *Delayed* builds which cannot run yet, because there are no free pipeline builders.  
   A build can be delayed for a maximum of seven days, and each account can have up to 1000 delayed builds at any time.    
    * Builds that are delayed for more than seven days are terminated with a _Delay time limit exceeded_ reason.  
    * If the total number of delayed builds exceed 1000, older builds are terminated with a _Maximum delayed workflows exceeded_ reason.

 * *All* builds regardless of running stage (this is the default)

You can further filter the builds by choosing the various filter types that specify the build job.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-filtering.png" 
url="/images/pipeline/monitoring/build-filtering.png"
alt="Pipeline filters in Codefresh" 
caption="Available filters"
max-width="50%"
%}

The available filters are:

* *Pipeline* - any of the pipelines available.
* *Provider* - type of [Git provider]({{site.baseurl}}/docs/integrations/git-providers/).
* *Repository* - Git repository from the attached [trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/).
* *Type* - build, [launch a test environment]({{site.baseurl}}/docs/getting-started/on-demand-environments/#launching-a-docker-image-using-codefresh).
* *Branch* - any of the available branches from the attached Git trigger.
* *Committer* - person that made the commit that triggered the build.
* *Environment* - which [environment]({{site.baseurl}}/docs/deploy-to-kubernetes/environment-dashboard/) was affected.
* *Status* - success, error, in-progress, pending, terminated etc. A Pending status can also indicate that [pipeline build execution has been paused]({{site.baseurl}}/docs/administration/pipeline-settings/#pause-pipeline-executions) for the account.
* *Trigger type* - what type of trigger was responsible for this build
* *Git event* - in the case of [git triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/) the exact event

Notice that all filters are multiple-choice so you can select multiple values for each filter category.
At any given point you can see all the active filters on top of the screen.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/possible-filters.png" 
url="/images/pipeline/monitoring/possible-filters.png"
alt="Pipeline filters in Codefresh" 
caption="Active filters"
max-width="50%"
%}

You can easily remove active filters, by clicking on them and adding/removing values.

On the right hand side you can also find a filtering toolbar with time options:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-filter-date.png" 
url="/images/pipeline/monitoring/build-filter-date.png"
alt="Filtering options for time" 
caption="Filtering options for time"
max-width="60%"
%}

You can combine all previously mentioned filters with the time based filters.

### Creating build views

Once you have a set of filters that you use regularly, you can save them as a custom *Build View* by clicking the *Save as View* button
and providing a name.

Now you can select at the top of the window any of the available build views to automatically filter results according to the respective sets of filters.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-view-selection.png" 
url="/images/pipeline/monitoring/build-view-selection.png"
alt="Build View selection" 
caption="Build View selection (click to enlarge)"
max-width="50%"
%}

You can delete existing build-views by clicking on the *manage views* button.
You can change the filters of an existing build view by making a new filter selection and then saving the view with an existing name (effectively overwriting it).


### Build details


For each individual build you can see several details such as the git hash, the person who made the commit, the pipeline that was triggered as well as how much time it took. For each event type you will also see additional context related information.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-details-entry.png" 
url="/images/pipeline/monitoring/build-details-entry.png"
alt="build details in Codefresh" 
caption="Build details"
max-width="100%"
%}
 
Child builds triggered by other builds are identified in the Event column by the icon {::nomarkdown}<img src="../../../images/pipeline/monitoring/icon-child-build.png" display=inline-block/> {:/}.  
The Parent Build column shows the link to the parent build. Mouse over to see the tooltip with information on the parent build. The tooltip includes links to the parent build, repo, branch, commit message, and the ability to filter by repo and branch.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/child-parent-build-info.png" 
url="/images/pipeline/monitoring/child-parent-build-info.png"
alt="Child build in Builds list" 
caption="Child build in Builds list"
max-width="70%"
%}

There are also extra options if you click the small "3-dot" menu button on the right. For a particular build, you can:

- View the logs 
- View the YAML
- View or add [annotations]({{site.baseurl}}/docs/codefresh-yaml/annotations/)
- View the images produced (and consequently launch an on-demand [test environment]({{site.baseurl}}/docs/getting-started/on-demand-environments/#launching-a-docker-image-using-codefresh))

Notice that if you restart a pipeline it will trigger with the exact settings it *originally* had. So 
if this was a manual trigger where you [disabled caching]({{site.baseurl}}/docs/troubleshooting/common-issues/disabling-codefresh-caching-mechanisms/) or changed the [notification options](#monitoring-pipelines-that-check-pull-requests), the new
execution will still honor those settings (even if you have changed them for later builds).

An extra button for test reports will be visible if you are using the [test report feature]({{site.baseurl}}/docs/testing/test-reports/) of Codefresh.


## Viewing details for an individual pipeline build

If you click on any individual pipeline build, you will enter the pipeline build information screen.
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

### Viewing status for pipeline steps

Monitor the status of the steps in the pipeline as they are executed.

{: .table .table-bordered .table-hover}
| Step Status Icon        | Description   |
| ------------------------| ---------------- |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-success.png" display=inline-block/> {:/}| Pipeline step completed successfully.  |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-approved.png" display=inline-block/> {:/}| Pipeline step pending approval has been approved, either manually or automatically. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-denied.png" display=inline-block/> {:/}| Pipeline step pending approval has been denied approval. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-running.png" display=inline-block/> {:/}| Pipeline step currently running. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-running-debug.png" display=inline-block/> {:/}| Pipeline step running in debug mode. See [Debugging pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/debugging-pipelines/) for more information. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-terminating.png" display=inline-block/> {:/}| Pipeline step gracefully terminating execution.  |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-terminated.png" display=inline-block/> {:/}| Pipeline step execution has been manually or automatically terminated. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-error.png" display=inline-block/> {:/}| Pipeline step execution has been terminated because of error. |


### Viewing/downloading logs for pipeline and pipeline steps

View logs for running and completed builds and download them in HTML or text formats.  
You can view logs online, for the entire build or for single or specific steps in the build. Similarly, you can download the logs for the entire build, or for single or specific steps.  
The Filter Logs option is useful to view and manage logs, especially for large builds as there is a max size limit for logs. You can also search logs.

>Note:  
  The max log size for the entire build is 100MB, and 20MB per step. The system stops generating logs once the build size is exceeded. 
  For large builds, it is easier to filter the logs by single or multiple steps, and then view/download them.

  {% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-logs.png" 
url="/images/pipeline/monitoring/build-logs.png"
alt="Build log in Codefresh" 
caption="Build log in Codefresh"
max-width="60%"
%}


1. In the **Builds** page, select a build. 
1. To view logs online for the selected build, click **Output** in the lower part of the Build page.
1. Optional. Select **Filter Logs** and then select the step or steps for which view/download logs.  
  Logs are displayed for the selected steps.
1. From either the context menu on the top-right of the toolbar or from the Output pane, select **Download as HTML** or **Download as text**.
  The log file is downloaded with the build ID as the filename, including also the step name if the log is for a single step, in the format `<build-id-<step-name>'.

### Viewing variables in pipeline builds

Variables, both system (environment) and custom (user-defined), are injected into pipelines from different sources and at different levels.   
The variables actually used by a specific build of the pipeline varies according to the specific events that triggered the pipeline.  
View all the variables used within a selected build, and identify their sources, and overrides if any.  

Here's an example of the list of variables for a build.
   {% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-variables-list.png" 
url="/images/pipeline/monitoring/build-variables-list.png"
alt="List of variables in selected build" 
caption="List of variables in selected build"
max-width="50%"
%}

The variables are grouped based on the level at which there were defined, in descending order of granularity:
* Project
* Shared configuration
* Pipeline
* Trigger

>Notes:  
  * The order of precedence for variables in builds is from the Trigger (most important) to the Project (least important). If there are two or more custom variables with the same name, the lower-level custom variable always overrides the higher-level one, even when they have different values. For example, if `test_var` is defined for both the project and the trigger, the build takes the trigger-level variable.  
  See [Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/).  
  * Variables exported across steps with `cf_export` are not identified as `cf-exported` variables.  
  * Secret-type variables are always masked.

1. In the **Builds** page, either select the build and then open the context-menu, or open the context-menu on the right of the build entry. 
1. Select **Variables**.
   
   {% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-variables-view-option.png" 
url="/images/pipeline/monitoring/build-variables-view-option.png"
alt="Variables option in context menu of build entry" 
caption="Variables option in context menu of build entry"
max-width="60%"
%}

{:start="3"}
1. If required, click the Sort icon for the group to sort in alphabetical order.
1. To copy the group's variables to the clipboard, click the Copy icon. 


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

If you want to see the yaml for the whole pipeline, 
- Click the *YAML* tab on the bottom left corner without selecting a step first or
- Select the three dots next to the "RESTART" button on the top-right, and click on *Show YAML*

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

>It is important to note that "Restart from beginning" will restart a pipeline with the **same** state that it had in its original execution (including the original git commit). If you want to execute a pipeline again with a new state instead, you need to use the *Run* button in the [pipeline editor]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#using-the-inline-pipeline-editor) and selecting any of the available [triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/).



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

>Notice again that restarting a pipeline from a failed step means restarting the pipeline with the **same** state that it had at the point in time (including the original git commit).

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

The same behavior is also available to the [Codefresh CLI](https://codefresh-io.github.io/cli/pipelines/run-pipeline/). In that case use the parameter `--enable-notifications`
to specify if manually triggering a build will also change the GIT status.

For open source projects you also have the ability to [trigger builds from external forks]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#support-for-building-pull-requests-from-forks).

### Viewing Pipeline status from text/html files

Codefresh also supports build badges that allow you to show the
status of a Pipeline in Text files or web pages.

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
