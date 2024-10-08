---
title: "Release Notes: December 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements


### Pipelines: New `strict_fail_fast` to control pipelines
You’re probably familiar with the `fail_fast` flag available for steps in Codefresh pipelines. The flag determines the pipeline’s behavior when there is a step failure. Accordingly, when set to `false`, the pipeline continues execution and returns a Build status of `Build completed successfully`.
But what if you want to indicate that a step failed in the Build status even when the pipeline completes execution? Enter our new `strict_fail_fast` flag! Now, you can indicate that the step failed execution by simply adding `strict_fail_fast` to the step and setting it to `true`. After the pipeline completes execution, the Build status is designated as Failed.

```yaml
step_name:
  type: git-clone
  title: Step Title
  description: Step description
  ...
  credentials:
    ...
  fail_fast: false
  strict_fail_fast: true
  when:
    branch:
      ignore: [ develop ]
  on_success:
    ...
  on_fail:
    ...
  on_finish:
    ...
  retry:
    ...  
  ...
```
For details, check out the **Fields** table in the documentation for the different step types, as in the [`git-clone` step]({{site.baseurl}}/docs/pipelines/steps/git-clone/) for example. 



### GitOps: Diff View for out-of-sync applications
We’re thrilled to introduce a significant enhancement simplifying troubleshooting Argo CD applications within Codefresh.
With our new Diff View feature, you can instantly view the differences between the current and the desired states of out-of-sync applications.
The Diff View option displays all the updated resources within the application, allowing you to easily pinpoint changes and swiftly identify the root cause of the sync failure.

If you have selected an application, the Diff View option is available in the context menu at the top right of the page. The option is enabled whenever the application is out-of-sync. 

>**NOTE**  
Diff View for application resources is supported from Runtime v1.0.38 and higher. <!--- To enable this feature, you need to turn on the `appDiffView` feature flag.  -->

For details, see [Analyze out-of-sync applications with Diff View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#analyze-out-of-sync-applications-with-diff-view).

## Bug fixes

**General**  
* Empty page on selecting Account settings in UI for some accounts with Classic and GitOps modules. 
* **Home** dashboard does not load analytics data for some accounts. 

**Pipelines**  
* Values of encrypted variables Cron triggers are corrupted in database when updating pipelines.
* ‘Error: Failed to retrieve file’ on listing branches when setting up trigger or in **Use YAML from repository**. 
* Build fails when restarting pipeline from Failed with Approval step.
* Labels for DIND and ENGINE pods missing from Helm chart. 
* Debug Console toolbar not displayed in Debug mode for PRO accounts. 
* Unable to upload more than 100 Allure reports from Codefresh.
* “No such file or directory” error in Test History/Trends page for Allure test reports. 


<br>

**GitOps**  
* Plug-in information missing in Form and YAML views of Application manifest. 
* **Promote Full** options in Rollout Player and Current State enabled for user without **Promote full rollout** permission for Argo CD applications.
* Missing Git Runtime tokens in Personal Access Token page.





