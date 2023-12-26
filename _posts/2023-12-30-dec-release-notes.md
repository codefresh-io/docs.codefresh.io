---
title: "Release Notes: December 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements


### Pipelines: New `strict_fail_fast` to control pipelines





## Bug fixes

**General**  
* PayloadTooLargeError on selecting Accounts in Admin Panel. (CR-21125 Denis)
* Failed POSTs to https://g.codefresh.io/2.0/api/events (CR-20952 Ilia)
* (On-premises) "INTERNAL_SERVER_ERROR" and "response.status is not a function" errors in some accounts. (CR-20324 - Denis)




<br>

**Pipelines**  

* Labels for DIND and ENGINE pods missing from Helm chart. (CR-21739 - Idan)
* Debug Console toolbar not displayed in Debug mode. (CR-21736 - Oleg)
Builds gettings terminated at Initializing process state (CR-21680 - Eti - Regression?)
* Cron triggers with the same names as exsiting secrets or variables are overridden and not saved (CR-21494 - Olek)
* Unable to upload more than 100 Allure reports from Codefresh.
* ‘Error: Failed to retrieve file’ on listing branches when setting up trigger or in **Use YAML from repository**. 
* Build fails when restarting pipeline from Failed with Approval step. (CR-19833 - Eti)
??* “No such file or directory” error in Test History/Trends page for Allure test reports. 
* Trigger options for pipelines (no_cache, no_cf_cache ..) in Terraform Provider incorrectly defined as strings instead of Boolean values. (CR-7468 Pasha)
* (On-premises only) Conflict Context already exists error when creating Vault secret store integrations if Shared Configuration  with the same name exists in the account (CR-5779 Zhenya)
* Notifications not send for builds triggereed by Cron timers. (CR-3927 Franscisco)



<br>


**GitOps**  
* AnalysisRun not terminated on clicking **Skip** in the Rollout Player. (CR-21364 - Olek) 
* **Promote Full** options in Rollout Player and Current State enabled for user without **Promote full rollout** permission for Argo CD applications. (CR-21308 - Victor) 
* Audit logs does not record manual user actions performed in Rollout Player. (CR-21295 - Andriii only from runtime 0.1.38)
* Missing Git Runtime tokens in Personal Access Token page.
* Plug-in infomration not missing in Form and YAML views of Application manifest. (CR-20884 Bogdan Volynets)




