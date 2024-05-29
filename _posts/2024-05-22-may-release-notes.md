---
title: "Release Notes: June 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements



### General: Custom auto-sync intervals for SSO

Previously, integration with different SSO providers allowed automatic user and team synchronization with Codefresh at fixed hourly intervals.

With our latest update, you can now customize the auto-sync intervals to better suit your organization’s needs.  
The new options allow you to set the sync frequency in minutes or hours. Alternatively, you can enable auto-sync without defining a specific interval, and Codefresh will automatically perform the sync every 12 hours. 

SCREENSHOT

This flexibility ensures more timely updates and improved efficiency in user and team management.

For details, see [Syncing teams in IdPs with Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/#syncing-teams-in-idps-with-codefresh).

### General: New platform IP addresses

We are preparing for an upgrade to our production cluster. While the upgrade is still a couple of months away, here's an early heads up about changes in IP addresses.

We've added new platform IP addresses as listed below:
* 54.86.228.102
* 54.221.236.3  
* 54.235.42.99
* 23.21.197.195
* 34.238.37.0
* 107.22.212.247

Please make sure to add them at the earliest to your allowed list. You can also find these IPs listed in Codefresh docs.

For details, see [Codefresh IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/).

### Pipelines: More GitHub triggers with Pull Request review events

We have expanded the list of supported triggers for GitHub to include Pull Request review events.   
These additional triggers enhance the functionality of your CI pipelines in Codefresh. 

The new supported triggers in Codefresh are:
* Pull Request Review approved (`pull_request.review_approved`)
* Pull Request Review commented (`pull_request.review_commented`)
* Pull Request Review changes requested (`pull_request.review_requested`)

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may24/rel-notes-may-24-gitub-pr-approved-triggers.png" 
url="/images/whats-new/may24/rel-notes-may-24-gitub-pr-approved-triggers.png" 
alt="New Pull Request review triggers for GitHub" 
caption="New Pull Request review triggers for GitHub" 
max-width="50%" 
%}

For details, see [GitHub trigger events]({{site.baseurl}}/docs/docs/pipelines/triggers/git-triggers/#github-trigger-events).

### GitOps: Rollout enhancements 

* **Templated arguments in AnalysisTemplates**  
Codefresh now supports templated arguments declared in AnalysisTemplates for metric configurations in AnalysisRuns. 

* **Rollout Player**  
To make Rollouts easier to manage, we added the Abort and Retry buttons to the Rollout Player. These options were previously available for the Rollout resource in the Current State tab.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may24/rel-notes-may24-rollout-player.png" 
url="/images/whats-new/may24/rel-notes-may24-rollout-player.png" 
alt="Abort & Retry in Rollout Player" 
caption="Abort & Retry in Rollout Player" 
max-width="50%" 
%}

For details, see [Manage rollouts for Argo CD application deployments]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manage-rollouts-for-argo-cd-application-deployments).




### Usability enhancements

##### GitOps: Breadcrumbs
We have improved the implementation of breadcrumbs for a smoother navigation experience.

**Sibling display and navigation**    
The end of the path now shows all sibling items if available.  
Clicking the dropdown displays all siblings, and clicking an item navigates directly to it.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may24/rel-notes-may24-breadcrumbs-siblings.png" 
url="/images/whats-new/may24/rel-notes-may24-breadcrumbs-siblings.png" 
alt="Viewing and navigating to siblings in breadcrumbs" 
caption="Viewing and navigating to siblings in breadcrumbs" 
max-width="50%" 
%}

**Clean copy**  
Clicking any item in the breadcrumb path now selects only that specific item, not the entire path, and also copies that item.  



##### GitOps: Shared Configuration Repo in Organization Information
As a usability enhancement, we have made it easier to locate the Shared Configuration Repository used by GitOps Runtimes. 

You can now find the link to your Shared Configuration Repository directly in the Organization Information page.

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may24/rel-notes-may24-shared-config-repo-org-page.png" 
url="/images/whats-new/may24/rel-notes-may24-shared-config-repo-org-page.png" 
alt="Link to Shared Configuration Repository in Organization Information" 
caption="Link to Shared Configuration Repository in Organization Information" 
max-width="50%" 
%}







## Bug fixes


##### Pipelines 
* Changing LOGGER_LEVEL variable does not impact verbosity of engine logs. 
* For Gerrit, username of build initiator not displayed.
* Usability issues when selecting clone pipeline option from UI. 



##### GitOps 
* GitOps UI does not show logs for pods. (CR-23578 - Victor)
* Results for Analysis metrics not displayed in Rollout when using arguments from AnalysisTemplates. 

