---
title: "Release Notes: December 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements


### Pipelines: New `strict_fail_fast` to control pipelines
You’re probably familiar with the `fail_fast` flag available for steps in Codefresh pipelines. The flag determines the pipeline’s behavior when there is a step failure. Accordingly, when set to `false`, the pipeline continues execution and returns a Build status of `Build completed successfully`.
But what if you want to indicate step failures in the Build status even when the pipeline completes execution? Enter our new `strict_fail_fast` flag! Now, even after the pipeline completes execution, you can designate a Build status of Failed to indicate step failures. Simply set `strict_fail_fast` to `true`.

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
For details, check out the **Fields** table in the step documentation, as in the [`git-clone` step]({{site.baseurl}}/docs//pipelines/steps/git-clone/) for example. 



### GitOps: Diff View for out-of-sync applications
We’re thrilled to introduce a significant enhancement simplifying troubleshooting Argo CD applications within Codefresh.
With our new Diff View feature, you can instantly view the differences between the current state and the desired configuration of out-of-sync applications.
The Diff View option displays all the updated resources within the application, allowing you to easily pinpoint changes and swiftly identify the root cause of the sync failure.

The option is always available in the application’s context menu in the GitOps Apps dashboard, and is enabled whenever the application is out-of-sync. If you have already selected an application, the Diff View option is available in the context menu at the top right of the page.
>Diff View for application resources is supported Runtime v1.0.38 and higher. To enable this feature, you need to turn on the `appDiffView` feature flag.

## Bug fixes

**General**  
* (On-premises only)_PayloadTooLargeError_ on selecting **Accounts** in **Admin Panel**. (CR-21125 Denis)
* Failed POSTs to https://g.codefresh.io/2.0/api/events (CR-20952 Ilia)
* (On-premises) "INTERNAL_SERVER_ERROR" and "response.status is not a function" errors in some accounts. (CR-20324 - Denis)




<br>

**Pipelines**  

* Labels for DIND and ENGINE pods missing from Helm chart. (CR-21739 - Idan)
* Debug Console toolbar not displayed in Debug mode. (CR-21736 - Oleg)
* Builds gettings terminated at Initializing process state (CR-21680 - Eti - Regression?)
* Cron triggers with the same names as existing secrets or variables are overridden and not saved (CR-21494 - Olek)
* Unable to upload more than 100 Allure reports from Codefresh.
* ‘Error: Failed to retrieve file’ on listing branches when setting up trigger or in **Use YAML from repository**. 
* Build fails when restarting pipeline from Failed with Approval step. (CR-19833 - Eti)
??* “No such file or directory” error in Test History/Trends page for Allure test reports. 
* Trigger options for pipelines (no_cache, no_cf_cache ..) in Terraform Provider incorrectly defined as strings instead of Boolean values. (CR-7468 Pasha)
* (On-premises only) _Conflict Context already exists_ error when creating Vault secret store integrations if Shared Configuration  with the same name exists in the account (CR-5779 Zhenya)
* Notifications not send for builds triggereed by Cron timers. (CR-3927 Franscisco)



<br>


**GitOps**  
* AnalysisRun not terminated on clicking **Skip** in the Rollout Player. (CR-21364 - Olek) 
* **Promote Full** options in Rollout Player and Current State enabled for user without **Promote full rollout** permission for Argo CD applications. (CR-21308 - Victor) 
* Audit logs does not record manual user actions performed in Rollout Player. (CR-21295 - Andriii only from runtime 0.1.38)
* Missing Git Runtime tokens in Personal Access Token page.
* Plug-in information missing in Form and YAML views of Application manifest. (CR-20884 Bogdan Volynets)




