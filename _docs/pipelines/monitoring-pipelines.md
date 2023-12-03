---
title: "Monitoring pipelines"
description: "Viewing your builds and logs"
group: pipelines
redirect_from:
  - /docs/configure-ci-cd-pipeline/monitoring-pipelines/
toc: true
---


View activity for Codefresh pipelines in the **Builds** tab. 
* Global build view: The default view, displays builds for all pipelines for all projects across your organization.
* Project build view: Selecting a project displays the builds for the pipelines in the project.
 
As a user, you can see builds from all pipelines you have access to. If your permissions do not include access to specific pipelines, you will not see builds from those pipelines. 

The Builds page for a pipeline displays by default all builds sorted from the most recent to the oldest. To narrow the list, you can use the date range filter, and additional filters at the top of the page.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/builds-dashboard.png" 
url="/images/pipeline/monitoring/builds-dashboard.png"
alt="Pipeline Activity in Codefresh" 
caption="Pipeline activity"
max-width="80%"
%}

In addition, the [Pipelines Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/#pipelines-dashboard) serves as a centralized location to track pipelines performance by KPIs. 


## Concurrency recommendation per Runtime Environment

Concurrency limits control the number of simultaneous builds for Codefresh pipelines. Concurrency limits are set at both the account and specific pipeline levels. 

**Balancing concurrency and performance**
While a single Runtime Environment technically supports concurrent build executions in the hundreds, it is essential to be aware of the actual number of concurrent builds that are initiated at the same point in time. To prevent potential slowdowns due to extremely large build-bursts, we recommend capping the number of concurrent builds initiated for a Runtime Environment to a maximum of 500.



## Starring projects and pipelines as favorites

Mark frequently used or high-priority pipelines as favorites in the Projects and Pipelines pages. This allows for easy and quick access to important projects or pipelines.  

Favorites serve as predefined filters in the Pipelines Dashboard, enabling you to track and analyze their performance.  
When you star a project or pipeline as a favorite, the Favorite filter in the Pipelines Dashboard icon changes from {::nomarkdown}<img src="../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/} to {::nomarkdown}<img src="../../../images/icons/icon-fav-starred.png?display=inline-block">.{:/} Click on it to filter by favorite projects and pipelines. 

## Viewing status for pipeline builds

Each build's status is displayed beneath the build details, identifiable by a distinct icon. Refer to the table below for a description of the various statuses associated with pipeline builds.


{: .table .table-bordered .table-hover}
| Pipeline Build Status Icon &nbsp; &nbsp; &nbsp;   | Description   |
| ------------------------| ---------------- |
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-running.png" display=inline-block/> {:/}| Pipeline build is currently running. |
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-successful.png" display=inline-block/> {:/}| Pipeline build completed successfully.  |
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-delayed.png" display=inline-block/> {:/}| Pipeline build run has been delayed as there are no free builders. <br>A build can be delayed for a maximum of seven days. Each account can have up to a 1000 delayed builds at any time. <br>{::nomarkdown}<b>NOTE</b>: <ul><li>Builds that are delayed for more than seven days are terminated with a _Delay time limit exceeded_ reason. </li><li>If the total number of delayed builds for an account exceed 1000, older builds are terminated with a <i>Maximum delayed workflows exceeded</i> reason.</li></ul>{:/}|
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-pending-approval.png" display=inline-block/> {:/}| Pipeline build is pending approval. |
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-denied.png" display=inline-block/> {:/}| Pipeline build pending approval has been denied approval. |
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-terminating.png" display=inline-block/> {:/}| Pipeline build is gracefully terminating execution.|
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-terminated.png" display=inline-block/> {:/}| Pipeline build execution has been manually or automatically terminated. |
|{::nomarkdown}<img src="../../../images/icons/pipeline-build-failed-error.png" display=inline-block/> {:/}| Pipeline build execution has failed because of errors. |


### Applying filters on the build view

The **Add Filters** option allows you to filter the list of builds by additional criteria, including build status.

At the most basic level, you can filter by status, choosing between Running/Pending/Delayed builds.  


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

* **Pipeline**: Any of the pipelines available.
* **BoardId**: The name of the Helm board
* **Provider** : The [Git provider]({{site.baseurl}}/docs/integrations/git-providers/).
* **Repository**: Git repository with the [trigger]({{site.baseurl}}/docs/pipelines/triggers/).
* **Type**: Build (user-initiated), or system (auto-initiated), see [launch a test environment]({{site.baseurl}}/docs/quick-start/ci-quick-start/on-demand-environments/#launch-a-docker-image-using-codefresh).
* **Branch**: Any of the available branches from the attached Git trigger.
* **Committer**: The user who made the commit that triggered the build.
* **Environment**: The [environment]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/) affected by the build.
* **Status**: Success, error, in-progress, pending, terminated etc. A Pending status can also indicate that [pipeline build execution has been paused]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#pause-pipeline-executions) for the account.
* **Trigger type**: The type of trigger that caused the build to run.
* **Git event**: For [Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/), the exact event that triggered the build.
* **Trigger-name**: The name of the trigger that triggered the build.
* **Annotations**: The build [annotations]({{site.baseurl}}/docs/pipelines/annotations/) to filter by, defined as key=value pairs. You can filter the same annotation by multiple values. 


Notice that all filters are multiple-choice so you can select multiple values for each filter category.
At any given point you can see all the active filters at the top of the page the screen.

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

To the right, you have the date range options:

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
- View or add [annotations]({{site.baseurl}}/docs/pipelines/annotations/)
- View the images produced (and consequently launch an on-demand [test environment]({{site.baseurl}}/docs/quick-start/ci-quick-start/on-demand-environments/#launch-a-docker-image-using-codefresh)

Notice that if you restart a pipeline it will trigger with the exact settings it *originally* had. So 
if this was a manual trigger where you [disabled caching]({{site.baseurl}}/docs/kb/articles/disabling-codefresh-caching-mechanisms/) or changed the [notification options](#monitoring-pipelines-that-check-pull-requests), the new
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

These are Codefresh built-in steps and will appear for most builds (you can also create a pipeline that doesn't clone a git repository by default). The rest of the step names depend on your `codefresh.yml` (or the default step names provided by Codefresh). The different columns take the names from the defined [pipeline stages]({{site.baseurl}}/docs/pipelines/stages/).

### Viewing status for pipeline steps

Monitor the status of the steps in the pipeline as they are executed.

{: .table .table-bordered .table-hover}
| Step Status Icon        | Description   |
| ------------------------| ---------------- |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-success.png" display=inline-block/> {:/}| Pipeline step completed successfully.  |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-approved.png" display=inline-block/> {:/}| Pipeline step pending approval has been approved, either manually or automatically. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-denied.png" display=inline-block/> {:/}| Pipeline step pending approval has been denied approval. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-running.png" display=inline-block/> {:/}| Pipeline step currently running. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-running-debug.png" display=inline-block/> {:/}| Pipeline step running in debug mode. See [Debugging pipelines]({{site.baseurl}}/docs/pipelines/debugging-pipelines/) for more information. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-terminating.png" display=inline-block/> {:/}| Pipeline step gracefully terminating execution.  |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-terminated.png" display=inline-block/> {:/}| Pipeline step execution has been manually or automatically terminated. |
|{::nomarkdown}<img src="../../../images/pipeline/monitoring/step-status-error.png" display=inline-block/> {:/}| Pipeline step execution has been terminated because of error. |



### Viewing/downloading logs for builds and build steps

View logs for running and completed builds and download them in HTML or text formats.  
You can view logs online, for the entire build or for single or specific steps in the build. Similarly, you can download the logs for the entire build, or for single or specific steps.  
The Filter Logs option is useful to view and manage logs, especially for large builds as there is a max size limit for logs. You can also search logs.

You can also [share logs](#sharing-log-urls-for-pipeline-builds) with other users logged in to the same account.

>**NOTE**:  
  The max log size for the entire build is 100MB, and 20MB per step. The system stops generating logs once the build size exceeds the maximum permitted. 
  For large builds, it is easier to filter the logs by single or multiple steps, and then view/download them.

1. In the **Builds** page, select a build. 
1. To view logs online for the selected build, click **Output** in the lower part of the Build page.
1. Optional. Select **Filter Logs** and then select the step or steps for which view/download logs.  
  Logs are displayed for the selected steps.
1. From either the context menu on the top-right of the toolbar or from the Output pane, select **Download as HTML** or **Download as text**.
  The log file is downloaded with the build ID as the filename, including also the step name if the log is for a single step, in the format `<build-id-<step-name>'.

  {% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-logs.png" 
url="/images/pipeline/monitoring/build-logs.png"
alt="Build log in Codefresh" 
caption="Build log in Codefresh"
max-width="60%"
%}

### Sharing log URLs for pipeline builds
Resolve issues in pipeline builds more efficiently and quickly by sharing relevant log segments with your colleagues.  
Select the part of the log and share the generated URL with members logged in to the same account. The URL opens to the exact location in the build log that you selected.

>**IMPORTANT**:  
This functionality requires timestamps for build logs which will be enabled for all Codefresh accounts. Enabling timestamps in logs can affect any automation you may have created based on log outputs without timestamps. To opt out of timestamps in logs, please contact Codefresh Support.  

This functionality will be available to all customers starting December 14.
  


>**NOTE**:  
Users with whom you share the logs must be logged in to the same account.

**Before you begin**
* Make sure build logs have timestamps

**How to**
1. In the **Builds** page, select a build. 
1. To view logs online for the selected build, click **Output** in the lower part of the Build page.
1. Select the log lines you want to share.
1. Click **Share** in the top-right corner.

   {% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/share-logs-select-lines.png" 
url="/images/pipeline/monitoring/share-logs-select-lines.png"
alt="Sharing build logs" 
caption="Sharing build logs" 
max-width="60%"
%}

{:start="5"}
1. In the pop-up that appears, click **Copy to clipboard**.
1. Share the URL with users logged in to the same account.  
  On accessing the link, the browser opens the Builds page, with the shared section highlighted in the build log.  

   {% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/share-logs-view-shared.png" 
url="/images/pipeline/monitoring/share-logs-view-shared.png"
alt="Shared build logs" 
caption="Shared build logs" 
max-width="60%"
%}

### Viewing variables in pipeline builds

Variables, both system (environment) and custom (user-defined), are injected into pipelines from different sources and at different levels.  
The variables actually used by a specific build of the pipeline varies according to the events that triggered the pipeline.    
Select a build to view all its variables, and identify their source, and overrides if any.  

1. In the **Builds** page, either select the build and then open the context-menu, or open the context-menu on the right of the build entry. 
1. Select **Variables**.
   
   {% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-variables-view-option.png" 
url="/images/pipeline/monitoring/build-variables-view-option.png"
alt="Variables option in context menu of build entry" 
caption="Variables option in context menu of build entry"
max-width="70%"
%}

{:start="3"}
1. If required, click the Sort icon for the group to sort in alphabetical order.
1. To copy the group's variables to the clipboard, click the Copy icon. 


Here's an example of the list of variables for a pipeline build.  

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/build-variables-list.png" 
url="/images/pipeline/monitoring/build-variables-list.png"
alt="List of variables in selected build" 
caption="List of variables in selected build"
max-width="50%"
%}

The variables are grouped by granularity, starting with the global project-level variables and ending with the trigger-level variables with the highest granularity:
* Project
* Shared configuration
* Pipeline
* Trigger  

A variable with a strikethrough indicates an override by the same variable in a lower-level group. For rules on precedence and overrides for variables in builds, see [Variables]({{site.baseurl}}/docs/pipelines/variables/).  

>Notes:  
  * Variables exported across steps with `cf_export` are not identified as `cf-exported` variables in the list.  
  * Secret-type variables are always masked.

  

### Reviewing the YAML for the pipeline

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

Codefresh offers several metrics for the pipeline, and for steps in the pipeline, that allow you to get a better overview of the resources
consumed by your pipeline.

**Pipeline metrics**  

At the most basic level, Codefresh displays quick metrics while the pipeline is running that include
memory consumed and size of logs:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/quick-pipeline-metrics.png" 
url="/images/pipeline/monitoring/quick-pipeline-metrics.png"
alt="Metrics for running pipeline" 
caption="Metrics for running pipeline"
max-width="70%"
%}

* To view memory and disk usage for running or completed pipeline builds, click the **Metrics** tab at the bottom of the Build page.

  * Memory usage: View memory usage (Y-axis) by time (X-axis) for the duration of the build. 
  * Disk usage: View disk usage (Y-axis) by time (X-axis) for the duration of the build. The red line is set at 90% of the maximum disk space.   
    To see the precise usage at different points in time, mouse over the dots.   
    Viewing the actual disk usage for a build during its run allows you to better gauge and define the [minimum disk space required for the build volume]({{site.baseurl}}/docs/pipelines/pipelines/#build-runtime).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/pipeline-metrics.png" 
url="/images/pipeline/monitoring/pipeline-metrics.png"
alt="Detailed metrics for pipelines" 
caption="Detailed metrics for pipelines"
max-width="70%"
%}


**Pipeline-step metrics**  
For step-specific metrics, first select the step, and then click the **Metrics** tab.
Step metrics are available for memory and CPU usage (not disk space).


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

You can restart a failed pipeline either from the beginning or from a failed step.

* Restart from beginning  
  Restarts the pipeline with the **same** state as in its original execution, including the original Git commit. 
  >To restart the pipeline with a _new_ state, use the **Run** button in the [pipeline editor]({{site.baseurl}}/docs/pipelines/pipelines/#using-the-inline-pipeline-editor), and select any of the available [triggers]({{site.baseurl}}/docs/pipelines/triggers/).

* Restart from failed step  
  Restarts the pipeline from the step that failed in the previous execution. Similar to restarting from the beginning, restarting from a failed step also restarts the pipeline with the same state at that point in time, including the original Git commit. You can restart from the Builds page or directly from the specific step that failed.


  
    >The option to restart from a failed step is available only when **Permit restart pipeline from failed step** is enabled in the pipeline's settings. See [Restart pipeline option in Policies]({{site.baseurl}}/docs/pipelines/pipelines/#policies).<br>  
       If your pipeline has some flaky steps, you can also use the [retry syntax]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/#retrying-a-step) in your YAML instead of restarting them manually each time they fail.

**Restart pipeline from Builds view**

* In the row with the pipeline to restart, click **Restart**, and then select the required option.
  >Disabled **From Failed Steps** indicates that the option is not enabled for the pipeline.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/restart-pipeline.png" 
url="/images/pipeline/monitoring/restart-pipeline.png"
alt="Builds view: Restart a pipeline" 
caption="Restart a pipeline"
max-width="70%"
%}

**Restart from step view**
* Click the pipeline to view its steps. 
* Go to the failed step, right-click and then select **Restart from this step**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/monitoring/restart-failed.png" 
url="/images/pipeline/monitoring/restart-failed.png"
alt="Step view: Restart from failed step" 
caption="Step view: Restart from failed step"
max-width="70%"
%}



## Monitoring pipelines outside the Codefresh UI

You don't always have to be in the Codefresh UI in order to monitor the status of your builds. 


### Monitoring pipelines that check Pull Requests

One of the most
important roles of a CI platform is to automatically update the status of a GIT Pull request with the result
of the respective build.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/quick-start-test-pr/auto-build-pr.png" 
url="/images/quick-start/quick-start-test-pr/auto-build-pr.png" 
alt="Pull Request Status" 
caption="Pull Request Status" 
max-width="50%" 
%}

If you have set up a [Git trigger]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) in Codefresh, then by default this happens automatically without any other configuration
for all automated commits from webhooks.

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

The same behavior is also available to the [Codefresh CLI](https://codefresh-io.github.io/cli/pipelines/run-pipeline/){:target="\_blank"}. In that case use the parameter `--enable-notifications`
to specify if manually triggering a build will also change the GIT status.

For open source projects you also have the ability to [trigger builds from external forks]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/#support-for-building-pull-requests-from-forks).

### Viewing pipeline status from text/html files

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

See the [build badges page]({{site.baseurl}}/docs/pipelines/configuration/build-status/) for more information.


## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Test reports]({{site.baseurl}}/docs/testing/test-reports/)  
[Status badges]({{site.baseurl}}/docs/pipelines/configuration/build-status/)
