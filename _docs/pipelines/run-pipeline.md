---
title: "Manually running pipeline builds"
description: "Manually trigger a pipeline build"
group: pipelines
toc: true
---

In Codefresh, you have the flexibility to control when your pipeline builds execute, offering both automated and manual options. 
While pipeline builds through [automated triggers]({{site.baseurl}}/docs/pipelines/triggers/) are usually the norm, ensuring a swift and continuous integration process, manual builds allows you to initiate a build at your discretion.

Manually running the build for a pipeline allows you to override build settings for the pipeline. On-demand builds are useful for one-off jobs that do not require repetition for example, or to verify changes or when the pipeline build has not been automated as yet. See [Manual build run settings](#manual-build-run-settings).  

In addition, with the manual build run option, you can share build settings with colleagues who have access to the same account without running the build. See [Share build run settings](#share-build-run-settings). 

When run, the manually-triggered build is added to the Builds page for [monitoring and management]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/) like any other build.



## Manual build run settings
Here is an example of the build settings available for a manual build run. 

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/manual-run/trigger-dialog.png" 
url="/images/pipeline/manual-run/trigger-dialog.png"
alt="Trigger settings for manual build run" 
caption="Trigger settings for manual build run"
max-width="50%"
%}

The table below describes the settings in the Triggers page. 

{: .table .table-bordered .table-hover}
| Manual build run setting | Description            |  
| --------------        | --------------         |  
|**Simulate trigger from**      | The trigger to simulate for the manual run of the pipeline. All the triggers defined for the pipeline are available.|
|**Select branch**      | The branch on which to run the build on.|
|**Build variables**       | The variables to use for this build. All the variables defined for the pipeline are displayed. You can modify the values of existing variables or manually add one or more new variables. Clicking the Lock icon, encrpts the variable.    |
|**Advanced options**        | Select the options to override the behavior for the manual run. <br>{::nomarkdown}<ul><li><b>Ignore Docker engine cache for build</b>: When selected, ignores the local Docker engine cache. Selecting this option may slow down your build. See <a href="https://codefresh.io/docs/docs/kb/articles/disabling-codefresh-caching-mechanisms/">Docker engine cache</a>.</li><li><b>Ignore Codefresh cache optimizations for build</b>: When selected, ignores the last build's cache. Selecting this option may slow down your build. See <a href="https://codefresh.io/docs/docs/kb/articles/disabling-codefresh-caching-mechanisms/">Last build cache</a>.</li><li><b>Reset pipeline volume</b>:</li>Useful for troubleshooting a build that hangs on the first step.  See <a href="https://codefresh.io/docs/docs/kb/articles/restoring-data-from-pre-existing-image-hangs-on/">Hangs on restoring data from pre-existing image</a>.</li><li><b>Report notification on pipeline execution</b>: When selected, sends <a href="https://codefresh.io/docs/docs/integrations/notifications/slack-integration/">Slack notifications</a>, in addition to status updates to your Git provider</li></ul>{:/}|
|**Runtime Environment**        |{::nomarkdown}<ul><li><b>Use regular settings</b>: Use the <a href="https://codefresh.io/docs/docs/pipelines/pipelines/#pipeline-settings">settings</a> defined at the pipeline level.</li><li>Override settings</b>:Override the settings for the manual build run, and select the Runtime Environment and OS, the CPI and Memory resource allocation, and the Minimum disk space required for the build. See <a href="https://codefresh.io/docs/docs/pipelines/triggers/git-triggers/#set-minimum-disk-space-for-build-volume-by-trigger">Set minimum disk space for build volume by trigger</a>.</li></ul>{:/} |
|**Share run configuration**      | Copies the modified or new settings defined for the current run, except for encrypted variables, and generates a URL with the settings appended as query parameters. You can then share the URL with colleagues who have access to the same account. See [Sharing manual build run settings](#sharing-manual-build-run-settings).
|**Debug** | Runs the pipeline in debug mode where you can add breakpoints and use the debug terminal. See [Debugging pipelines]({{site.baseurl}}/docs/pipelines/debugging-pipelines/). |
|**Run** | Triggers a build with the current settings and takes you to the Builds page where you can monitor the pipeline. See [Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/). |



## Share build run settings 
>**NOTE**  
This feature is currently in Beta.

Override settings for a pipeline build and share them with colleagues who have access to the same account.    
This option is useful to pre-populate build settings without having to redefine the same manually every time. For example, share build settings to test automation for integration with third-party tools, or to trigger pipelines in specific scenarios.  

When sharing settings, you can simulate a different trigger, select a different branch, modify existing or add new build variables, and modify the build behavior.  
Codefresh generates a URL with the modified and new settings appended as query parameters, while excluding encrypted variables to not compromise security. Shared build settings also do not include the Runtime environment settings defined for the pipeline if any.  

The URL opens the Trigger page with the sections expanded to indicate updated/new settings. For easy identification, new or modified Build Variables are highlighted. 

1. In the Pipelines page, click **Run** either to the right of the pipeline, or in the Workflows tab of the pipeline.
1. Update settings as required.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/manual-run/share-run-configuration.png" 
url="/images/pipeline/manual-run/share-run-configuration.png"
alt="Sharing build configuration" 
caption="Sharing build configuration"
max-width="50%"
%}

{:start="3"}
1. Click **Share Run Configuration**.
  Codefresh generates a URL with the new settings appended as query parameters.
  
    >**NOTE**  
    Encrypted variables are excluded from the generated URL.

{:start="4"}
1. Paste the URL in your browser.
  The browser opens the Trigger page with all sections with updates automatically expanded.  
  You can see in the example below that the encrypted variable in step 2 has not been copied.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/manual-run/share-run-config-result.png" 
url="/images/pipeline/manual-run/share-run-config-result.png"
alt="Result of shared build configuration" 
caption="Result of shared build configuration"
max-width="50%"
%}

## Data retention for pipeline builds and logs
Codefresh retains build and log data for pipelines for a period of six months, for both on-premises and SaaS installation configurations. 

For on-premises, for configuration details, see [Retention policy for builds and logs in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#retention-policy-for-builds-and-logs){:target="\_blank"}.

## Note on Cloud Builds for Codefresh pipelines

Cloud Builds for Codefresh pipelines are disabled for all accounts by default. 
Account admins can request Codefresh to enable Cloud Builds for an account. There is no manual action required except to click on the Enable Cloud Builds button as shown below. The timeframe for the response is up to 24 hours.<br>

{% include image.html
  lightbox="true"
  file="/images/installation/enable-cloud-builds-request.png"
  url="/images/installation/enable-cloud-builds-request.png"
  caption="Enable Cloud Builds for pipelines"
  alt="Enable Cloud Builds for pipelines"
  max-width="70%"
    %} 

As an account admin, you can then grant access to users or have the users explicitly request access to a runtime environment to run pipelines. 

If you [create a free account]({{site.baseurl}}/docs/quick-start/create-codefresh-account/), to run pipelines, you need to configure [Build Runtime settings]({{site.baseurl}}/docs/pipelines/pipelines/#build-runtime) with a Hybrid Runner runtime environment.  

## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/)  
[Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/)  
[Debugging pipelines]({{site.baseurl}}/docs/pipelines/debugging-pipelines/)  
[Running pipelines locally]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/)  
