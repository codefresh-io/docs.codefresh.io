---
title: "Release Notes: June 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---

## Features & enhancements

### Codefresh New Experience
Unveiling the Codefresh New Experience, bringing you new navigation, features, and functionality, with seamless access to both Codefresh Pipelines and Codefresh GitOps.  
As a Codefresh admin, you can enable the Codefresh New Experience for a specific account. You also have the flexibility to switch back to the previous version of Codefresh at any time.

Here are a few highlights:
* Pipelines Dashboard: Our Home dashboard includes a dedicated Pipelines Dashboard to easily monitor pipeline metrics and performance to gain insights and optimize pipeline definitions. Read [more](#pipelines-dashboard) later in this article. 
* Images Dashboard: We have redesigned the Images dashboard with a new layout, grouping images by repository.
* Global Search & Navigation: Quickly locate specific features or functionalities in Codefresh while staying where you are. Read [more](#global-search--navigation) below.
* Enhanced navigation: Navigation options are categorized by user options (accessed by clicking your Avatar in the toolbar), account-level administration and configuration, and features and functionality.

For details, see [The Codefresh New Experience]({{site.baseurl}}/docs/new-codefresh/enable-new-experience/).

### Global Search & Navigation
Boost your Codefresh experience with our latest feature, Global Search & Navigation! Be it navigation, actions such as switching accounts, or finding entities such as pipelines or builds, Global Search & Navigation lets you get to what and where you need without extra clicks.

**Search & find**  
With Global Search & Navigation, you can easily monitor and find resources in your projects, pipelines, and builds, with frequently used entities organized into categories for quick search. Easily find a specific project, pipeline, or build, or browse them all.

In addition, Global Search & Navigation pulls up links to relevant information from our documentation that may be useful within your current context, making it even easier to find what you need.

**Switch accounts**
Global Search & Navigation allows you to switch accounts without needing to navigate to your avatar drop-down menu in the toolbar. Simply search for the account, select the Switch Account action, and then choose the account you wish to switch to.

**Keyboard shortcuts**  
We have keyboard shortcuts to bring up Global Search & Navigation, and get to the entities you need in Projects, Pipelines, and Builds even quicker.


For details, see [Global Search & Navigation]({{site.baseurl}}/docs/getting-started/command-bar/).


### Gerrit as Git provider for Pipelines and GitOps
We are excited to announce the integration of Gerrit, the popular open-source web-based code review tool for Git repositories, with Codefresh. This integration brings powerful code review capabilities, access controls, and  automation to both Codefresh pipelines and Codefresh GitOps.

**Gerrit and Codefresh Pipelines**  
By integrating Gerrit as a Git provider for Codefresh Pipelines, you can leverage its capabilities to trigger builds and tests automatically whenever a new change is pushed to Git repositories hosted in Gerrit. This integration allows you to closely monitor the status of builds and tests within the Gerrit environment itself, providing you with a comprehensive view of your development process.
With Codefresh’s `CF_PULL_REQUEST` group of environment variables, you can achieve similar functionality to Gerrit’s `Changes` directly within Codefresh.

For details, see [Pipeline integrations - Git providers]({{site.baseurl}}/docs/integrations/git-providers/#gerrit).

**Gerrit and Codefresh GitOps**   
By configuring Gerrit as the primary Git provider for your Hosted GitOps Runtime, you can integrate Gerrit information into your third-party CI tools or platforms for image enrichment and reporting in Codefresh.

For details, see [GitOps Gerrit Git provider integration]({{site.baseurl}}/docs/gitops-integrations/gerrit-integration/).


### Pipelines Dashboard
This release introduces the much-awaited Pipelines Dashboard!  The dashboard, dedicated to Codefresh pipelines and pipeline metrics, is a new experience of pipeline visibility and monitoring.
Clicking Home Dashboard located at the top of the sidebar displays the Pipelines Dashboard.
If you're currently using both GitOps and Pipelines, the Pipelines Dashboard is displayed below the GitOps and Argo Workflow dashboards.

Use the Pipelines dashboard to:
* Identify pipelines with low performance, both in terms of number of executions and execution duration
* Review the performance of a specific pipeline or project
* Compare KPIs to previous time periods to track progress
* Ensure you are meeting your SLA with your customers*

For details, see [Pipelines Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/#pipelines-dashboard) in the Home Dashboard.

### Pipelines: New icons for pipeline build statuses
We are excited to announce that we have new status icons for pipeline builds. With distinct icons for each status, you can now easily differentiate between builds, bringing clarity and saving time. Previously, both terminated and failed builds had the same icon for example, causing confusion.

Here are the icons and the build statuses they represent:  
* **Running**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-running.png" display=inline-block/> {:/}
* **Completed**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-successful.png" display=inline-block/> {:/}
* **Delayed**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-delayed.png" display=inline-block/> {:/}
* **Pending approval**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-pending-approval.png" display=inline-block/> {:/}
* **Denied approval**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-denied.png" display=inline-block/> {:/}
* **Terminating**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-terminating.png" display=inline-block/> {:/}
* **Terminated**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-terminated.png" display=inline-block/> {:/}
* **Failed**: {::nomarkdown}<img src="../../../images/icons/pipeline-build-failed-error.png" display=inline-block/> {:/}

For details, see [Viewing status for pipeline builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#viewing-status-for-pipeline-builds).

### GitOps: Helm-based Hybrid & On-premises Runtimes
As part of our ongoing commitment to improving efficiency and simplifying installations, we have transitioned from the previous Kustomize-based installation method to a native Kubernetes installation using Helm charts. This change simplifies the installation process and aligns with industry-standard practices for Kubernetes deployments. 


* CLI deprecation for Hybrid GitOps  
  Moving forward, we are deprecating the CLI-based installation method for Hybrid GitOps Runtimes. Helm provides better control and ensures compatibility, enabling you to seamlessly manage GitOps Runtimes deployments across various clusters.  
  For details, see [Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

* On-Premises version of Codefresh GitOps Runtime  
  We are also excited to introduce an on-premises version of the GitOps Runtime, allowing you to deploy and manage your Codefresh infrastructure within your private network.  
  The on-premises version gives you greater control over your environment, ensuring data security and compliance while leveraging the powerful features and integrations of Codefresh GitOps and Argo CD.  
  For details, see [On-premises GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/on-prem-gitops-runtime-install/).



## Bug fixes
**General**  
On-premises ony Codefresh Runner installation fails with Component existed with status code 1 error. (Mikhail)
Unable to add users to Codefresh via team sync for Okta.


**Pipelines**  
* Log in to Codefresh results in error: `Failed to authenticate the user. Please try again in a few minutes` OR `token is not valid because it was revoked`.
* Git operations in pipeline build fails on authentication leading to build failures (Pipeline build fails due to  uilds Git operations in JSON web token decode failure results Git operations failure in builds).
* ??Security vulnerability with private key of Codefresh GitHub App.
* Pipeline builds terminate with error message: `Pipeline could be executed because retry attempts limit has been exceeded...`. (Soifer)
* Discrepancy in builds returned when running `GET {{baseUrl/workflow?pipeline=[pipeline-id]}}`query and applying same filter in Codefresh UI . (Olek)
* Shallow clone for a specific branch with `depth` argument results in error: `pathspec 'test' did not match any file(s) known to git`. (Eti)
* Composition stops randomly with error:`Could not get status for container <container-name>`.
* Cross-account ECR pull in `freestyle` step fails with `(HTTP code 500) server error...`. (Maizel)
* 404 errors on clicking documentation links in Build > Triggers.
* In the Builds page, Output tab for a step displays `loading` instead of the step logs. (Sasha)
* Creating a Git trigger for a repo name containing spaces fails with error: `Failed to create trigger...fails to match the required pattern...`.
* Unable to set `requiredAvailableStorage` programmatically for Hybrid Pipeline Runtimes. (Yoni Koren)


**GitOps**  
* Failure to clone large repo.
* Health status for Hosted GitOps Runtime is DEGRADED, while applications for the same Runtime are Healthy.
* (On premises) Rollouts Reporter for managed cluster uses SaaS instead of on-premises URL.
* Inconsistent status for same application in the Home > GitOps Dashboard and in the GitOps Apps dashboard. (Olek)
* Images not displayed in Images dashboard for GitLab Git provider (Denis)




