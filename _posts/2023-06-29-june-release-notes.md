---
title: "Release Notes: June 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements


### Global Search & Navigation
Boost your Codefresh experience with our latest feature, Global Search & Navigation! Be it navigation, actions such as switching accounts, or finding entities such as projects or pipelines, Global Search & Navigation lets you get to what and where you need without extra clicks.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/june23/rel-notes-june23-command-bar.png" 
url="/images/whats-new/june23/rel-notes-june23-command-bar.png" 
alt="Global Search & Navigation in Codefresh" 
caption="Global Search & Navigation in Codefresh" 
max-width="60%" 
%}

**Search & find**  
With Global Search & Navigation, you can easily monitor and find resources in your projects and pipelines, with frequently used entities organized into categories for quick search. Easily find a specific project, or pipeline, or browse them all.
We’ll be adding applications to our entity list, so stay tuned for the announcement.

In addition, Global Search & Navigation pulls up links to relevant information from our documentation that may be useful within your current context, making it even easier to find what you need.

**Switch accounts**  
Global Search & Navigation allows you to switch accounts without needing to navigate to your avatar drop-down menu in the toolbar. Simply search for the account, select the Switch Account action, and then choose the account you wish to switch to.

**Keyboard shortcuts**  
We have also added keyboard shortcuts to save time and get things done even faster. You can quickly bring up Global Search & Navigation, and get to the entities you need in Projects and Pipelines.


For details, see [Global Search & Navigation]({{site.baseurl}}/docs/getting-started/command-bar/).


### Gerrit as Git provider for Pipelines and GitOps
We are excited to announce the integration of Gerrit, the open-source web-based code review tool for Git repositories, with Codefresh. 

**Gerrit and Codefresh Pipelines**  
By integrating Gerrit as a Git provider for Codefresh Pipelines, you can leverage its capabilities to trigger builds and tests automatically whenever a new change is pushed to Git repositories hosted in Gerrit. The integration allows you to closely monitor the status of builds and tests within the Gerrit environment itself, providing you with a comprehensive view of your development process.
With Codefresh’s `CF_PULL_REQUEST` group of environment variables, you can achieve similar functionality to Gerrit’s `Changes` directly within Codefresh.

For details, see [Pipeline integrations - Git providers]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).

**Gerrit and Codefresh GitOps**   
By configuring Gerrit as the primary Git provider for your Hosted GitOps Runtime, you can integrate Gerrit information into your third-party CI tools or platforms for image enrichment and reporting in Codefresh.  
If you are interested in using Gerrit for Hybrid GitOps Runtimes, please contact us.

For details, see [GitOps Gerrit Git provider integration]({{site.baseurl}}/docs/gitops-integrations/gerrit-integration/).

### Pipelines: Pipeline Dashboard enhancements
Review the latest enhancements in the Pipelines Dashboard.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/june23/rel-notes-june23-pipeline-dashboard-updates.png" 
url="/images/whats-new/june23/rel-notes-june23-pipeline-dashboard-updates.png" 
alt="Favorites filter and Last Update in Pipelines Dashboard" 
caption="Favorites filter and Last Update in Pipelines Dashboard" 
max-width="60%" 
%}

**Filter by favorite pipelines**  
The Pipelines Dashboard now has a Favorites filter. If you starred any projects or pipelines as favorites, you can easily view your favorite pipelines, both by projects or individual pipelines.

**Recent update indication**  
The Last Update timestamp on the top right of the Pipelines Dashboard, refreshes automatically to show you the exact time the data was retrieved.

**Full path display for pipelines in filter**  
Now, on mouse over a pipeline name in the Pipelines filter list, the tooltip displays the name of the project to which the pipeline belongs and the name of the pipeline. Previously, it was challenging to identify the correct pipeline, when multiple pipelines shared the same name across different projects. 

For details, see [Pipelines Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/#pipelines-dashboard).

### Pipelines: New icons for pipeline build statuses
Pipeline builds have new status icons. With distinct icons for each status, you can easily differentiate between builds, bringing clarity and saving time. Previously, both terminated and failed builds had the same icon for example, causing confusion.

Here are the icons and the build statuses they represent:  
* **Running**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-running.png" display=inline-block/> {:/}
* **Completed**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-successful.png" display=inline-block/> {:/}
* **Delayed**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-delayed.png" display=inline-block/> {:/}
* **Pending approval**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-pending-approval.png" display=inline-block/> {:/}
* **Denied approval**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-denied.png" display=inline-block/> {:/}
* **Terminating**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-terminating.png" display=inline-block/> {:/}
* **Terminated**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-terminated.png" display=inline-block/> {:/}
* **Failed**: {::nomarkdown}<img src="../../../../../images/whats-new/june23/pipeline-build-failed-error.png" display=inline-block/> {:/}

For details, see [Viewing status for pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-status-for-pipeline-builds).

### GitOps: Helm-based Hybrid Runtimes
As part of our ongoing commitment to improving efficiency and simplifying installations, we have transitioned from the previous CLI-based installation method to native Kubernetes installation using Helm charts. This change simplifies the installation process and aligns with industry-standard practices for Kubernetes deployments. 

**Helm installation for Hybrid GitOps**  
  Moving forward, we are deprecating the CLI-based installation method for Hybrid GitOps Runtimes. Helm provides better control and ensures compatibility, enabling you to seamlessly manage GitOps Runtimes deployments across various clusters.  
  For details, see [Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

<!--- 
* On-Premises version of Codefresh GitOps Runtime  
  We also introduced an on-premises version of the GitOps Runtime, allowing you to deploy and manage your Codefresh infrastructure within your private network.  
  The on-premises version gives you greater control over your environment, ensuring data security and compliance while leveraging the powerful features and integrations of Codefresh GitOps and Argo CD.  
  For details, see [On-premises GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/on-prem-gitops-runtime-install/).
-->

## Bug fixes
**General**  
* Unable to add users to Codefresh via team sync for Okta.


**Pipelines**  
* Pipeline builds terminate with error message: `Pipeline could not be executed because retry attempts limit has been exceeded...`.
* Discrepancy in list of builds returned when running `GET {{baseUrl/workflow?pipeline=[pipeline-id]}}` query. 
* Shallow clone for a specific revision with `depth` argument results in error: `pathspec 'test' did not match any file(s) known to git`.
* Composition stops randomly with error: `Could not get status for container <container-name>`.
* Cross-account ECR pull in `freestyle` step fails with `(HTTP code 500) server error...`. 
* In the Builds page, steps are grayed out, and the Output tab for a step displays `loading` instead of the step logs.
* Creating a Git trigger for a repo name containing spaces fails with error: `Failed to create trigger...fails to match the required pattern...`.
* Unable to set `requiredAvailableStorage` programmatically for Hybrid Pipeline Runtimes. 
* 404 errors on clicking documentation links in Build > Triggers.

**GitOps**  
* Unable to delete Argo CD application from Git Source.
* Same application shows different statuses in the **Home > GitOps Dashboard** and in the **GitOps Apps** dashboard.
* Images not displayed in Images dashboard for GitLab Git provider (Denis)
* (On premises) Rollouts Reporter for managed cluster uses SaaS instead of on-premises URL.




