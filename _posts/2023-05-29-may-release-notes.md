---
title: "Release Notes: May 2023"
description: "Release Notes for Codefresh Pipelines and GitOps"
---


## Features & enhancements

### Home Dashboard

We are excited to introduce the new Home Dashboard, providind a unified and comprehensive view of critical dashboards across the enterprise. When logging in to Codefresh, you will now see the Home Dashboard at the top of the sidebar.

The Home Dashboard includes the familiar GitOps and Argo Workflow dashboards, and a           brand-new Pipelines dashboard. This new dashboard, designed for pipeline visibility and monitoring, offers an enhanced experience for tracking pipeline performance.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/may23/rel-notes-may23-home-dashboard-all.png" 
url="/images/whats-new/may23/rel-notes-may23-home-dashboard-all.png" 
alt="Home Dashboard" 
caption="Home Dashboard" 
max-width="80%" 
%}

The Home Dashboard includes:

* GitOps & Argo Workflows Dashboards  

  Formerly known as the GitOps Overview dashboard, it has been renamed and integrated into the Home Dashboard.
  Displays a global overview of GitOps Runtimes, clusters managed by the Runtimes, deployment history, and most active applications. 

   The Argo Workflows dashboard displays aggregated metrics on Argo Workflows and Delivery Pipelines to identify trends.

* Pipelines Dashboard   
  If you have both GitOps and Pipelines, the Pipelines Dashboard is displayed below the GitOps and Argo Workflows dashboards.  
  
  Use the Pipelines dashboard to:
  * Identify pipelines with low performance, both in terms of number of executions and execution duration
  * Review the performance of a specific pipeline or project
  * Compare KPIs (key performance indicators) to previous time periods for progress tracking
  * Ensure you are meeting your SLA with your customers

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may23/rel-notes-may23-home-dashboard-pipelines.png" 
url="/images/whats-new/may23/rel-notes-may23-home-dashboard-pipelines.png" 
alt="Pipelines Dashboard" 
caption="Pipelines Dashboard" 
max-width="60%" 
%}


For details, see [Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/).

### Pipelines: Variable encryption and masking for increased security

Increase security with these enhancements to variables in pipelines.

* **On-demand encryption for build run variables**    
  Manual build runs allow you to create new and modify existing variables. You can now encrypt sensitive variables  on-demand, adding an extra layer of security. 

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may23/rel-notes-may23-encrypt-build-variable.png" 
url="/images/whats-new/may23/rel-notes-may23-encrypt-build-variable.png" 
alt="Encrypt variables in build run" 
caption="Encrypt variables in build run" 
max-width="60%" 
%}

  For details, see [Encrypt variables for pipeline build runs]({{site.baseurl}}/docs/pipelines/variables/#encrypt-variables-for-pipeline-build-runs).

* **Mask variables in `cf_export`**   
  On the subject of variables, in our latest enhancement to `cf_export` in pipelines, we added support to mask exported variables, helping to keep your builds and pipelines secure.   
  You can now use the `--mask` argument to mask any sensitive variables that you export. The values of these variables are replaced with asterisks in the build logs, ensuring that sensitive information is never exposed. 

  For details, see [Masking variables within cf_export]({{site.baseurl}}/docs/pipelines/variables/#masking-variables-within-cf_export).


### Pipelines: New layout for Helm Boards
Helm Boards now display information in a horizontal layout. The new layout prevents fields with long names from overlapping with each other.

### Pipelines: Automated build deletion
Set the desired time-to-live (TTL) for your builds to automatically remove older builds and free up valuable storage resources in your build environments. Fewer builds also make it easier to navigate to and find relevant builds for monitoring and troubleshooting.

Take advantage of the `TTL_RETENTION_POLICY_IS_ENABLED` and `TTL_RETENTION_POLICY_IN_DAYS` environment variables in `cf-api` to effortlessly configure automated build deletion. 

For details, see [Configure build retention policy for pipelines]({{site.baseurl}}/docs/pipelines/configuration/build-retention-policy/).


### Preferred date and time format selection
US and international users can select their preferred format for date and time in the Codefresh UI. With this latest enhancement, you can now choose between US and international date formats, as well as 24 or 12-hour time formats, to best suit your needs. 
Simply navigate to **User Settings** and select your preferred format. 

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may23/rel-notes-may23-date-time-format.png" 
url="/images/whats-new/may23/rel-notes-may23-date-time-format.png" 
alt="Date and time formats" 
caption="Date and time formats"
max-width="70%" 
%}

For details, see [Customize date and time formats]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#customize-date-and-time-formats).

### SAML SSO Okta: auto-sync teams and auto-activate users 
Just-in-time (JIT) user provisioning is becoming increasingly important for IT administrators. The **auto-sync** and **activate-user** options when setting up SAML SSO settings for Okta are designed to achieve this without any manual intervention.
* **Auto-Sync** allows you to automatically sync users and teams provisioned in Okta with Codefresh at intervals you define. 
* **Auto-Activate** creates and activates personal accounts for synced users in Codefresh, without the need to send an email invite and have the user click on the link.

Both options streamline SSO setup for SAML Okta in Codefresh, saving you valuable time. 

{% include 
image.html 
lightbox="true" 
file="/images/whats-new/may23/rel-notes-may23-saml-okta.png" 
url="/images/whats-new/may23/rel-notes-may23-saml-okta.png" 
alt="Sync settings in Codefresh for SAML Okta" 
caption="Sync settings in Codefresh for SAML Okta" 
max-width="60%" 
%}

For details, see [Step 1: Configure SSO settings for Okta via SAML in Codefresh]({{site.baseurl}}/docs/single-sign-on/saml/saml-okta/#step-2-configure-sso-settings-for-codefresh-in-okta).
 


## Bug fixes

**General**
* When syncing teams with Azure, invited users do not receive invite emails while they are added to Codefresh.

**Pipelines**  
* Build logs are delayed or are missing.
* Builds remain in status `Pending`.
* Build failure when passing base64 encoded values in `codefresh/cli:latest` image. 
* Build failure for child pipelines with Codefresh CLI version 0.83.1.
* Broken Docker image for `codefresh/kubectl:latest` (version 1.27.1).
* Missing data for selected time frame when filtering Pipelines Dashboard by specific pipelines.
* Codefresh UI not loaded when null namespaces are present.
* Error on filtering builds by Annotations containing percentage values in the Builds page.
* Overrides for pipeline-level variables during manual build run not displayed correctly in Build Variable list.
* `jq: error (at <stdin>:1): Cannot iterate over null (null)` error for `trivy-scan` step when Common Vulnerabilities and Exposures (CVE) is empty. 
* (On-premises only) Offline logs missing for freestyle step in version 1.4.4

**GitOps**  
* Empty Dockerfile tab when enriching image for GitLab CI.
* Commiting edits to annotations for applications in Codefresh UI removes the annotations.
* Existing Git Source for Hosted GitOps Runtime is removed on adding a new Git Source. 