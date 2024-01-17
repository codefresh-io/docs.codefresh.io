---
title: "Manually running pipeline builds"
description: "Manually trigger a pipeline build"
group: pipelines
toc: true
---

In Codefresh, you have the flexibility to control when your pipeline builds execute, offering both automated and manual options. 
While pipeline builds through [automated triggers] ensure a swift and continuous integration process, manual builds allows you to initiate a build at your discretion.

Manually running the build for a pipeline allows you to override build settings for the pipeline to try out specific scenarios, share build settings with colleagues who have access to the same account, or run the build in debug mode to verify changes. See [Manual build run settings](#manual-build-run-settings) and [Share build run settings](#share-build-run-settings).

The manually-triggered build is added to the Builds page where you can [monitor and manage])({{site.baseurl}}/docs/pipelines/monitoring-pipelines/) it as any other build.



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
|**Select branch**      | The branch on which to to run the build on.|
|**Build variables**       | The variables to use for this build. All the variables defined for the pipeline are displayed. You can modify the values of existing variables or manually add one or more new variables. Clicking the Lock icon, encrpts the variable.    |
|**Advanced options**        | Select the options to override the behavior for the manual run. <br>{::nomarkdown}<ul><li><b>Ignore Docker engine cache for build</b>: When selected, ignores the local Docker engine cache. Selecting this option may slow down your build. See <a href="https://codefresh.io/docs/docs/kb/articles/disabling-codefresh-caching-mechanisms">Docker engine cache</a></li><li><b>Ignore Codefresh cache optimizations for build</b>: When selected, ignores the last build's cache. Selecting this option may slow down your build. See <a href="https://codefresh.io/docs/docs/kb/articles/disabling-codefresh-caching-mechanisms">Last build cache</a>.</li><li><b>Reset pipeline volume</b>:</li>Useful for troubleshooting a build that hangs on the first step.  See <a href="https://codefresh.io/docs/docs/kb/articles/restoring-data-from-pre-existing-image-hangs-on/" target="_blank">Hangs on restoring data from pre-existing image</a>.</li><li><b>Report notification on pipeline execution</b>: When selected, sends <a href="https://codefresh.io/docs/docs/integrations/notifications/slack-integration/" target="_blank">Slack notifications</a>, in addition to status updates to your Git provider</li></ul>{:/}|
|**Runtime Environment**        |{::nomarkdown}<ul><li><b>Use regular settings</b>: Use the <a href="https://codefresh.io/docs/docs/pipelines/pipelines/#pipeline-settings">settings</a> defined at the pipeline level.</li><li>Override settings</b>:Override the settings for the manual build run, and select the Runtime Environment and OS, the CPI and Memory resource allocation, and the Minimum disk space required for the build. See <a href="https://codefresh.io/docs/docs/pipelines/triggers/git-triggers/#set-minimum-disk-space-for-build-volume-by-trigger">Set minimum disk space for build volume by trigger<a/>.</li></ul>{:/} |
|**Share run configuration**      | Copies the modified or new settings defined for the current run, except for encrypted variables, and generates a URL with the settings appended as query parameters. You can then share the URL with colleagues who have access to the same account. See [Sharing manual build run settings](#sharing-manual-build-run-settings).
|**Debug** | Runs the pipeline in debug mode where you can add breakpoints and use the debug terminal. See [Debugging pipelines]({{site.baseurl}}/docs/pipelines/debugging-pipelines/). |
|**Run** | Triggers a build with the current settings and takes you to the Builds page where you monitor the pipeline run. See [Monitoring pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/). |



## Share build run settings 
>**NOTE**  
This feature is currently in Beta.

Override settings for a pipeline build and share them with colleagues who have access to the same account.    
This option is useful to pre-populate build settings to test automation for integration with third-party tools, or to trigger pipelines in specific scenarios without the need to redefine the same manually each time.  

You can simulate a different trigger, select a different branch, modify existing or add new  build variables, and modify the build behavior. Codefresh generates a URL with the modified and new settings appended as query parameters, while excluding encrypted variables to not compromise security. Shared settings also do not include the Runtime environment settings defined for the pipeline if any.  

The URL opens the Trigger page with the sections expanded to indicate updated/new settings. New or modified Build Variables are highlighted for easy identification. 

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
alt="Sharing build configuration" 
caption="Sharing build configuration"
max-width="50%"
%}

## Related articles
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Steps in pipelines]({{site.baseurl}}/docs/pipelines/steps/)  
[Triggers in pipelines]({{site.baseurl}}/docs/pipelines/triggers/)  
[Variables in pipelines]({{site.baseurl}}/docs/pipelines/variables/)  
[Debugging pipelines]({{site.baseurl}}/docs/pipelines/debugging-pipelines/)  
[Running pipelines locally]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/)  
