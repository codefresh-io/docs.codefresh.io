---
title: "Release Notes: June 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### Pipelines: ABAC for Runtimes


### Pipelines: Custom auto-sync intervals for SSO

Previously, SSO integration with different SSO providers allowed automatic user and team synchronization with Codefresh at fixed hourly intervals.

With our latest update, you can now customize the auto-sync intervals to better suit your organization’s needs.  
The new options allow you to set the sync frequency in minutes or hours. Alternatively, you can enable auto-sync without defining a specific interval, and Codefresh will automatically perform the sycn every 12 hours. 

This flexibility ensures more timely updates and improved efficiency in user and team management.

For details, see [Syncing teams in IdPs with Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/#syncing-teams-in-idps-with-codefresh).


### Pipelines: More GitHub triggers with Pull Request review events


We have expanded the list of supported triggers for GitHub to include detailed Pull Request review events.   
These additional triggers enhance the functionality of your CI pipelines in Codefresh. 

The new supported triggers in Codefresh are:
* Pull Request Review approved (`pull_request.review_approved`)
* Pull Request Review commented (`pull_request.review_commented`)
* Pull Request Review changes requested (`pull_request.review_requested`)

For details, see [GitHub trigger events]({{site.baseurl}}/docs/docs/pipelines/triggers/git-triggers/#github-trigger-events).



### Usability enhancements

GitOps: Shared Configuration Repo in Ogranizaion Information

Product search in Global Search & Navigation

GitOps: Breadcrumbs

### GitOps: Abort & Retry in Rollout Player 





## Bug fixes


##### Pipelines 
* Changing LOGGER_LEVEL variable does not impact verbosity of engine logs. (CR-23577 Zhenya)
* For Gerrit, username of build initiator not displayed.
* Usability issues when selecting clone pipeline option from UI. (CR-9850 - Aliksander)



##### GitOps 
* 500 error on deleting old cluster context. (CR-23715 Alex - maybe internal)
* GitOps UI does not show logs for pods (CR-23578 - Victor)
* Codefresh UI unable to display Rollout analysis results not displayed in GitOps Apps > Timeline tab (CR-22990 - Oleksander)
* AnalysisRuns does not display results (CR-21682 Oleksander)

