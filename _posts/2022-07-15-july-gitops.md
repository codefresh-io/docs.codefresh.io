---
title: "GitOps Release Notes: July 2022"
description: "Changelog and Release Notes for GitOps"
---

## Features & enhancements

### Hosted GitOps

Codefresh has launched Hosted GitOps, our newest offering, a hosted and managed version of Argo CD.  

From application analytics, to application creation, rollout, and deployment, you get the best of both worlds: Argo CD with Codefresh's advanced functionalities and features for CD operations.
What it also means is easy set up and zero maintenance overhead.

Read on for a summary of what you get with Hosted GitOps.  

**Hosted runtime**  
Hosted GitOps supports hosted runtimes. The runtime is hosted on a Codefresh cluster and managed by Codefresh. Codefresh guides you through the three-step process of setting up your hosted environment. Read more in [Hosted runtime](#hosted-runtime).  

**Dashboards for visibility and traceability**  
Here's a recap of Codefresh dashboards, including a brand new dashboard dedicated to DORA metrics:

* Home: GitOps Dashboard: For global analytics and system-wide deployment highlights, start with the GitOps Dashboard.  
* DORA metrics: A _new_ dashboard for DORA metrics and DevOps quantification. Read more in [DORA metrics](#dora-metrics).  
* Applications dashboard: Easily track deployments and visualize rollouts across clusters and runtimes in the Applications dashboard.  

**Application lifecycle management**  
Manage the entire application lifecycle directly in Codefresh, from creating, editing, and deleting applications.  
Define all application settings in a single location through the intuitive Form mode or directly in YAML, and commit all changes to Git.  

Synchronize applications manually when needed. Read more in [On-demand app synchronization](#on-demand-app-synchronization).  

**Integrations for image enrichment**
With Hosted GitOps, you can integrate your CI tools with Codefresh for image enrichment. Read more in [Integrations for image enrichment](#integrations-for-image-enrichment)

### Hosted runtime

Hosted GitOps supports a GitHub-based SaaS runtime, hosted on a Codefresh cluster, and managed by Codefresh.  
Setting up your hosted environment takes just a few clicks. All you need is a Codefresh account, a Git account, and a Kubernetes cluster to which to deploy your applications.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-hosted-initial-view.png"
 url="/images/whats-new/rel-notes-jul22-hosted-initial-view.png"
 alt="Hosted runtime setup"
 caption="Hosted runtime setup"
    max-width="80%"
%}

Codefresh guides you through the simple three-step process of provisioning your hosted runtime.  From that point, Codefresh handles administration and maintenance of the hosted runtime, including version and security updates.  

See [Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).

### DORA metrics

DORA metrics have become integral to enterprises wanting to quantify DevOps performance, and Codefresh has out-of-the-box support for it.  

The DORA dashboard in Codefresh goes beyond quantification, with features such as the Totals bar displaying key metrics, filters that allow you to pinpoint just which applications or runtimes are contributing to problematic metrics, show metrics for starred applications, and the ability to set a different view granularity for each DORA metric.  

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-dora-metrics.png"
 url="/images/whats-new/rel-notes-jul22-dora-metrics.png"
 alt="DORA metrics"
 caption="DORA metrics"
    max-width="60%"
%}

See [DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/).

### Integrations for image enrichment

If you have our Hosted GitOps for CD and a different tool for CI, you can continue to enrich images, retaining your CI tools. Allow Codefresh to retrieve and report the image information in your deployments by connecting your CI tools to Codefresh. Connect CI tools, issue tracking tools, container registries, and more.

This release introduces our integration offering, starting with:

* GitHub Actions, Jenkins, and Codefresh Classic for CI
* Jira for issue tracking
* Docker Hub, Quay, JFrog Artifactory for container registries

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-github-action-settings.png"
 url="/images/whats-new/rel-notes-jul22-github-action-settings.png"
 alt="Image enrichment with GitHub Actions integration"
 caption="Image enrichment with GitHub Actions integration"
    max-width="60%"
%}

 We are continually expanding the range of integrations, so stay tuned for release announcements on new integrations.  

Codefresh encrypts the credentials for every integration you create, and stores them securely as Kubernetes Sealed Secrets, ensuring that the integration flow is completely GitOps-compatible. Pipelines reference the integration by the integration name instead of integration credentials. Codefresh retrieves enrichment information using the encrypted Kubernetes secrets.  

See [Image enrichment with integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).

### Edit and delete applications

Application management has become easier as you can now edit and delete applications directly in Codefresh.  

Update General and Advanced settings for application. Go directly to the Configuration tab for the application by selecting Edit in the Applications dashboard.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-edit-app-option.png"
 url="/images/whats-new/rel-notes-jul22-edit-app-option.png"
 alt="Edit application option"
 caption="Edit application option"
max-width="80%"
%}

The Delete application option is available when you select an application.
Codefresh warns you of the implication of deleting the selected application in the Delete form based on the Prune resource setting.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-delete-app.png"
 url="/images/whats-new/rel-notes-jul22-delete-app.png"
 alt="Delete application"
 caption="Delete application"
max-width="50%"
%}

See [Edit application definitions]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-application-definitions) and [Delete an application]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-an-application).

### On-demand app synchronization

Manually synchronize applications whenever needed directly from Codefresh. The synchronize option is a significant enhancement to the application lifecycle management options that we already support in Codefresh.  

The set of options for application synchronization are identical to that of Argo CD. For usability, they are grouped into two sets: Revision and Additional Options.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-sync-app.png"
 url="/images/whats-new/rel-notes-jul22-sync-app.png"
 alt="Synchronize application"
 caption="Synchronize application"
    max-width="60%"
%}

### Activate access for Codefresh support

User Settings include an option to allow Codefresh support personnel account access for troubleshooting purposes. The option is disabled by default. When enabled, access is always coordinated and approved, and all actions are audited.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-account-access.png"
 url="/images/whats-new/rel-notes-jul22-account-access.png"
 alt="Enable account access"
 caption="Enable account access"
    max-width="80%"
%}

See [Enable access for Codefresh support]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#enable-access-for-codefresh-support).

### View logs by container

When viewing logs for applications and workflows, you can now select the container for which to display them.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-jul22-log-container.png"
 url="/images/whats-new/rel-notes-jul22-log-container.png"
 alt="View logs by container"
 caption="View logs by container"
    max-width="50%"
%}

## Bug fixes

### Runtimes

* Unable to remove managed cluster on failure to add shared configuration repository.
* Maximum character limit not validated in cluster names.
* Failure when downloading logs for all runtime components.
* New cluster automatically assigned Unknown status.
* Sealed secret remains in cluster after uninstalling runtime.
* Unable to view rollouts on managed cluster.  

### Applications

* Resources without namespaces (such as cluster role) do not open in Current State.
* Sync state icon frozen when syncing the application.
* Application created with the same name as deleted application displayed as new deployment.
* No error when creating an application with the same name as an existing application.
* Applications dashboard does not display an application with incorrect Source.
* Applications dashboard does not display the Jira issue for Docker image.
* Sync policy appears as Manual though set to automatic.
* Sync error message partially cut off.
* Application release does not always return binaryId, and repositoryName for transition images.
* Application name not displayed in sync errors.

### Images

* Registry filter used with other filters returns wrong results.
* Find query for image applications.

### Other

* Unable to view, access, and add SSO integrations.
* Failure on sealing key management check.
* Argo Workflows Dashboard: Most active pipelines and Delivery Pipelines displayed not aligned with the Time filter.
* Incorrect sorting for workflow and pipeline lists.
