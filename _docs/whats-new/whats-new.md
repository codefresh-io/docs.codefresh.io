---
title: "What's new in Codefresh?"
description: ""
group: whats-new
redirect_from:
  - /docs/whats-new/
toc: true
---

We launched the Codefresh platform in February this year. Built on Argo, the world’s most popular and fastest-growing open source software delivery, Codefresh unlocks the full enterprise potential of Argo Workflows, Argo CD, Argo Events, and Argo Rollouts, providing a control-plane for managing them at scale.

This July release is all about Hosted GitOps.

## July 2022

### Features & enhancements

#### Hosted GitOps
Codefresh has launched Hosted GitOps, our newest offering, a hosted and managed version of Argo CD.  

From application analytics, to application creation, rollout, and deployment, you get the best of both worlds: Argo CD with Codefresh's advanced functionalities and features for CD operations.
What it also means is easy set up and zero maintenance overhead.

Read on for a summary of what you get with Hosted GitOps.  

**Hosted runtime**  
Hosted GitOps supports hosted runtimes. The runtime is hosted on a Codefresh cluster and managed by Codefresh. Codefresh guides you through the three-step process of setting up your hosted environment. Read more in [Hosted runtime](#hosted-runtime).  

**Dashboards for visibility and traceability**  
Here's a recap of Codefresh dashboards, including a brand new dashboard dedicated to DORA metrics:
* Home dashboard: For global analytics and system-wide deployment highlights, start with the Home dashboard.  
* DORA metrics: A _new_ dashboard for DORA metrics and DevOps quantification. Read more in [DORA metrics](#dora-metrics).  
* Applications dashboard: Easily track deployments and visualize rollouts across clusters and runtimes in the Applications dashboard.  
 
**Application lifecycle management**  
Manage the entire application lifecycle directly in Codefresh, from creating, editing, and deleting applications.  
Define all application settings in a single location through the intuitive Form mode or directly in YAML, and commit all changes to Git.  

Synchronize applications manually when needed. Read more in [On-demand app synchronization](#on-demand-app-synchronization).  

**Integrations for image enrichment**
With Hosted GitOps, you can integrate your CI tools with Codefresh for image enrichment. Read more in [Integrations for image enrichment](#integrations-for-image-enrichment)

{::nomarkdown}
<br>
{:/}

#### Hosted runtime
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

See [Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/runtime/hosted-runtime/).

{::nomarkdown}
<br>
{:/}

#### DORA metrics
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

See [DORA metrics]({{site.baseurl}}/docs/reporting/dora-metrics/).

{::nomarkdown}
<br>
{:/}

#### Integrations for image enrichment
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

See [Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/).

{::nomarkdown}
<br>
{:/}

#### Edit and delete applications

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

See [Update application configuration]({{site.baseurl}}/docs/deployment/create-application/#update-application-configuration) and [Delete an application]({{site.baseurl}}/docs/deployment/create-application/#delete-an-application).

{::nomarkdown}
<br>
{:/}

#### On-demand app synchronization
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

{::nomarkdown}
<br>
{:/}

#### Activate access for Codefresh support
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

See [Enable access for Codefresh support]({{site.baseurl}}/docs/administration/user-settings/#enable-access-for-codefresh-support).

{::nomarkdown}
<br>
{:/}

#### View logs by container
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

### Bug fixes
**Runtimes**  
* Unable to remove managed cluster on failure to add shared configuration repository.
* Maximum character limit not validated in cluster names.
* Failure when downloading logs for all runtime components.
* New cluster automatically assigned Unknown status.
* Sealed secret remains in cluster after uninstalling runtime.
* Unable to view rollouts on managed cluster.  


**Applications**  

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

**Images**  
* Registry filter used with other filters returns wrong results.
* Find query for image applications.


**Other**  

* Unable to view, access, and add SSO integrations.
* Failure on sealing key management check.
* Home dashboard: Most active pipelines and Delivery Pipelines displayed not aligned with the Time filter.
* Incorrect sorting for workflow and pipeline lists.	



## June 2022

### Features & enhancements

#### Shared configuration for runtimes
Define configuration settings for a runtime once, and reuse the configuration settings for multiple runtimes in the same account. Reduce time needed to define  and maintain configuration settings for every runtime separately.  

After defining the repository in which to store configuration settings, you can reference the repository, selectively from specific runtimes, or from all runtimes, and  share the configuration.  

Older versions of hybrid runtimes without the shared repository must be upgraded to the latest version  to  leverage the  shared configuration, specifically for integrations with CI platforms and tools.  

For details, see [Shared runtime configuration]({{site.baseurl}}/docs/runtime/shared-configuration/).

#### Logs for runtime components
View and download logs for runtimes and runtime components. The logs record events from the time of application launch for all resources in the application.  

Download logs for offline viewing and analysis, or view logs per component online, and download as needed:  

* Download all logs: Available for every runtime for download as a single `.tar.gz` file, including the different log files for each runtime component.  
{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-runtime-logs-all.png" 
	url="/images/whats-new/rel-notes-june22-runtime-logs-all.png" 
	alt="Download all logs for a runtime" 
	caption="Download all logs for a runtime"
   max-width="60%" 
  %}
  
* View/download logs per component: Available for every runtime component. View online logs, displaying up to 1000 lines of the most recent events. Locate information with  free-text search, and navigate between search results using the next/previous buttons. Enhance readability by turning on line-wrap when needed. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-runtime-log-screen.png" 
	url="/images/whats-new/rel-notes-june22-runtime-log-screen.png" 
	alt="View logs online for runtime component" 
	caption="View logs online for runtime component"
   max-width="60%" 
  %}

For details, see [View/download runtime logs]({{site.baseurl}}/docs/runtime/download-runtime-logs/).

#### OAuth2 authentication
OAuth (Open Authorization) 2.0 has become an industry standard for online authorization. Codefresh supports connections to your Git provider using OAuth2. Codefresh integrates with Git to sync repositories to your clusters, implement Git-based actions when creating resources such as Delivery Pipelines, and to enrich Images with valuable information.  

Codefresh provides a default, predefined OAuth2 application for every runtime. As an account administrator in Codefresh, you can optionally create an OAuth2 Application in GitHub and set up authentication within Codefresh. Users in Codefresh can then authorize access to GitHub with OAuth2, instead of with a personal access token.  

For details, see [Set up OAuth2 authentication]({{site.baseurl}}/docs/administration/oauth-setup/).


#### Application resources in Tree view 
The Tree view of the Current State complements the List view of the same in the Applications dashboard. Similar to the List view, the Tree view also displays all the resources deployed for an application, with additional unique features.  

What is unique about the Tree view?  
First, the Tree view simplifies visualization of and tracking resources for any deployment, think complex deployments with hundreds of resources.  Second, it is designed to impart key information for each resource at a glance. Every resource shows its health status (color-coded border), sync state (icon prefixed to name), and metadata on mouse-over. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-tree-view.png" 
	url="/images/whats-new/rel-notes-june22-tree-view.png" 
	alt="Application Current State: Tree view" 
	caption="Application Current State: Tree view"
   max-width="60%" 
  %}


**Progressive discovery**  

By the very nature of its design, the Tree View allows progressive discovery. View all resources at once, or start with a parent resource, and expand it to view siblings and children to understand how they are connected.  

**Resource filters**  

The filters in the List view are available also in the Tree view. These global filters help narrow the scope of the resources displayed, by kind, health status, and sync state. The filters set in either the List or Tree vies are retained when navigating between them.   

**Resource search and find**  

The Search option lets you locate resources by searching for any part of the resource name. Similar to the filters, search results are also retained when navigating between Tree and List views.  
For quick search, use the Find option to locate and navigate to required resources.  

**Resource inventory**  

At the bottom-left, the resource inventory summarizes your deployment in numbers per resource kind. Syncing and Out-of-Sync resources for each kind are bucketed separately, for visibility, and for quick access to filter resources by these states.   

**Resource manifest and logs**  

In addition to the metadata on mouse-over for a resource, clicking a resource shows its manifests and logs based on the resource type. View and compare the Desired and Live states for managed resources in Git repositories.  
Another usability enhancement is the ability to share resource details by copying the URL and sending it to others in your organization for collaborative review.  

Logs are displayed if the resource has logs:  

* For online viewing, you have free-text search and line-wrap functionalities. 
* For offline viewing and analysis, you can download the complete log into a text file.   

For details, see [Current State Tree view]({{site.baseurl}}/docs/deployment/applications-dashboard/#current-state-tree-view).

#### Application rollout visualization 
In addition to installing Argo Rollouts in your cluster, visualize Argo Rollout history and progress directly in the Applications (deployment) dashboard. Visualize rollouts from multiple clusters and runtimes in a single centralized location through the Deployment tab.

**Rollout progress**
Ongoing rollouts show the progress of the rollout in the real time. Completed rollouts show the switch to the new version according to the deployment strategy. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-rollout-in-progress.png" 
	url="/images/whats-new/rel-notes-june22-rollout-in-progress.png" 
	caption="Application Rollout: Progress visualization"
   max-width="60%" 
  %}

**Rollout steps**  

As the rollout occurs, visualize step-by-step progress. Expanding Background Analysis  displays metric queries  and the manifest of the analysis template.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-rollout-analysis.png" 
	url="/images/whats-new/rel-notes-june22-rollout-analysis.png" 
	caption="Application Rollout: Steps visualization"
   max-width="30%" 
  %}

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-june22-rollout-query-metrics.png" 
	url="/images/whats-new/rel-notes-june22-rollout-query-metrics.png" 
	caption="Application Rollout: Query metrics"
   max-width="30%" 
  %}

For details, see [Rollout progress and step visualization]({{site.baseurl}}/docs/deployment/applications-dashboard/#rollout-progress-visualization).

#### Nested workflows
Add nested workflow functionality to Codefresh pipelines. A nested workflow is a step within the parent workflow that either submits a new workflow, or creates a PR (Pull Request) that runs a different workflow based on the PR result.

Nested workflows run independently of the parent workflow that submitted them. A nested submit workflow has traceability in both directions, from the parent to child, and from the child to the parent. A workflow triggered by a nested PR identifies the PR that triggered it.  

Here’s an example of a parent workflow that submits two nested workflows, and the link back to the parent workflow from one of the child workflows.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-jun22-nested-parent-submit.png" 
	url="/images/whats-new/rel-notes-jun22-nested-parent-submit.png" 
	caption="Parent workflow with two nested submit workflows"
   max-width="60%" 
  %}

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-jun22-nested-child-submit.png" 
	url="/images/whats-new/rel-notes-jun22-nested-child-submit.png" 
	caption="Child submit workflow with link to parent workflow"
   max-width="60%" 
  %}

The Codefresh Hub for Argo has two ready-to-use Workflow Templates that:  

* Submits a workflow
* Creates a PR to run the workflow that tracks the PR  

For details, see [Nested workflows]({{site.baseurl}}/docs/pipelines/nested-workflows/).

### Bug fixes
**Runtimes**  

* Encrypted Git integration remains when uninstalling runtime through the CLI, and decryption through app-proxy fails.
* Rollback occurs during installation via CLI. 
* Runtime ignores –Demo resources=false flag install confirmation.
* Installation via CLI stops when demo resources are not installed even when –demo -resources flag is set to false.
* No errors during installation via CLI when flags are incorrectly located.
* Runtime name with health or sync errors not highlighted in Codefresh UI.

**Images**  

* Empty pages on changing filters in page two or higher.  
* Broken link for an image not in logged-in user account.
* Images view not updated with current application with rollout resource.

**Applications**  

* Lock out due to slow application load. 
* Application dashboard remains frozen in Progressing state.
* Application dashboard > Timeline tab:  

  * Default view not restored on removing date range defined in the Timeline tab.
  * Order of deployments in the chart not identical to the list of rollouts.
  * Committer for GitOps change missing in Commit information.
  * Missing commit message for SHA link.
  * Changes to an image tag not reflected.
  * Rollout shows as in progress even after deployment status is healthy.
  * New release in Argo CD not displayed in Codefresh UI when latest release was degraded without previous rollout data.
  * Rollout YAML unavailable when application source is a Helm repo. 
* Applications dashboard > Services tab:  

  * Progressing rollout with manual traffic management returns empty Services list.
* Applications dashboard > Current State
  * Resource tree/list not restored on removing filters.  


**Pipelines**  

* Selecting an existing Workflow Template creates a new Workflow Template.
* Incorrect line numbers for pipeline template in Form mode.


## May 2022

### Features & enhancements

#### Runtime disaster recovery
Runtimes are integral to all CI/CD actions and operations in Codefresh. In this release, we added the capability to restore runtimes in case of cluster failures, either partial or complete.    
All you need is the existing Git repo where you installed the runtime containing the runtime resources. The restore process reinstalls the runtime, leveraging the resources in the existing repo. You can choose to restore the runtime to the failed cluster or to a different cluster.  
For details, see [Restore runtimes]({{site.baseurl}}/docs/runtime/runtime-recovery/).

#### AWS ALB ingress controller
AWS Application Load Balancer (ALB) is now part of our list of supported ingress controllers. 
For details, see Ingress controller requirements in [Requirements]({{site.baseurl}}/docs/runtime/requirements/#ingress-controller), and [Post-installation configuration]({{site.baseurl}}/docs/runtime/installation/#post-installation-configuration).


#### Labels for runtime namespace
When installing runtimes, the `--namespace-label` flag lets you add labels to the runtime namespace. The labels identify and grant access to the installation network, required with service mesh ingress controllers such as Istio.  
For both CLI-based and silent installations, add the flag followed by one or more labels in `key=value` format. Note that these labels must be identical to those defined in the 'namespace' resource spec.  
For details, see [Runtime installation flags]({{site.baseurl}}/docs/runtime/installation/#runtime-installation-flags).

#### Internal and external ingress hosts 
Codefresh runtimes support defining two ingress hosts, an internal and an external ingress host, for private and public networks. Previously, runtimes supported a single ingress host for both the app-proxy and webhook ingress resources. Internal and external ingress separation allows you to expose the Codefresh app-proxy service only within your private network, while keeping the webhook ingress unchanged.  
* New runtime installations: The `--internal-ingress-host` flag lets you can define an ingress host for communication with the app-proxy. For details, see [Runtime installation flags]({{site.baseurl}}/docs/runtime/installation/#runtime-installation-flags).
* Existing runtimes: To add an internal ingress host, you need to commit changes to the installation repository by modifying `app-proxy ingress` and `<runtime-name>.yaml`.   
For details, see _Internal ingress host configuration (optional)_ in [Post-installation configuration]({{site.baseurl}}/docs/runtime/installation#post-installation-configuration).  

For further customizations, add annotations for internal and external ingress hosts through the `--internal-ingress-annotation` and `--external-ingress-annotation` flags. 

#### oktapreview domain support
You can set up Okta SSO to log into your Okta preview environment. 

#### Git Source enhancements
A common scenario when using Git repositories for CI/CD is to include or exclude specific files or directories in the target repository from the destination repo or cluster. When creating or editing Git Sources in Codefresh, you can now include or exclude folders and files in the target Git repo, using Glob patterns for the same. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-may22-git-source-exclude-include.png" 
	url="/images/whats-new/rel-notes-may22-git-source-exclude-include.png" 
	alt="Include/exclude options in Git Source" 
	caption="Include/exclude options in Git Source"
   max-width="50%" 
  %}

You can also delete Git Sources if needed. Selecting additional actions for a Git Source, displays the Git Source details with the Delete option. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-may22-git-source-delete.png" 
	url="/images/whats-new/rel-notes-may22-git-source-delete.png" 
	alt="Delete Git Source" 
	caption="Delete Git Source"
   max-width="90%" 
  %}

For details, see [Add and manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/).

### Bug fixes
**Runtimes** 

* With Istio ingress, app proxy communication with Argo CD fails with `Unexpected token u in JSON error`.
* Adding a managed cluster always commits manifests to the main branch and not to the defined default branch.
* Add managed cluster command fails when ingress host includes `/` suffix.
* Application groups not supported in Current State for older runtime versions.
* Retrieving a list of Git Sources for a runtime via CLI, causes the CLI to crash.
* Uninstalling a runtime does not remove runtime-related secrets from the cluster.

**Applications**   

* Applications deleted from the Argo UI not removed from the Applications dashboard in Codefresh.
* Back button in  Applications > Timeline tab does not work.
* Hierarchy for AppSet application created in Argo CD not rendered correctly in Codefresh.
* Most Active Applications list in the Home dashboard is incorrectly sorted.
* Link to CI build on Service in Applications Dashboard is hard-coded to Workflows.
* Add Application wizard creates invalid manifest.
* Removing a resource from an application does not remove it from the application’s Current State list. 
* Deleting an application deletes it from the cluster and the Git repo, but not from the database.
* Creating an application without path results in an error.
* On page reload, deployment chart in Application > Timeline tab does not reflect set filters.
* Resources with changed file names are not reported in Argo CD.
* Unknown state for application sets with targets on external clusters.

**Others** 
* Clicking the Settings icon shows a console error.
* Workflow Templates reported without Git manifests and desired state. 
* Get list of workflows for a pipeline via CLI returns 400 bad request.
* GitHub user without a public email address causes autopilot to crash in app-proxy.
* Within a staging app, regular deployment transition is empty and shows only replicas count.


## March-April 2022

### Features & enhancements 

#### Kubernetes version runtime support
We now support the latest Kubernetes server versions, 1.22 and 1.23. 

#### Ingress controllers
We are continually working on supporting additional Ingress controllers, and this release adds support for:
* Ambassador
* NGINX Enterprise
* Istio
* Traefik

All ingress controllers must be configured to report their status. 
For details, see [Ingress controller requirements]({{site.baseurl}}/docs/runtime/requirements/#ingress-controller).


#### Argo CD managed cluster support
Argo CD can manage clusters without Argo CD installed on them. Now you have the same functionality in Codefresh, to add, view, and manage remote clusters.  
Admins can add an external cluster to a Codefresh runtime, and register it automatically as a managed cluster. From that point on, you have complete visibility into health and sync status, and options to manage them, including installing Argo Rollouts.  

With managed clusters in Codefresh, you get:
* Streamlined management: All cluster- and cluster-component level operations are managed through the runtime, in a centralized location. You can install new components, uninstall existing components, and remove the cluster from the runtime's managed list. A single click installs Argo Rollouts on the managed cluster.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-argo-rollouts.png" 
	url="/images/whats-new/rel-notes-argo-rollouts.png" 
	alt="Install Argo Rollouts for managed cluster in topology view" 
	caption="Install Argo Rollouts for managed cluster in topology view"
   max-width="70%" 
  %}

* Seamless upgrades: Upgrades to runtimes or to runtime components in the local cluster automatically upgrades those in managed clusters as well.
* Integration with dashboards: Applications dashboards reflect deployment information for applications in all managed clusters. When Argo Rollouts are installed, application rollouts are also reported to the dashboard. 

For details, see [Managed clusters]({{site.baseurl}}/docs/runtime/managed-cluster).

#### Topology views for runtimes
  
Get a visual representation of the runtimes in your deployments, managed clusters, and cluster components with the Topology view for runtimes. 
Quickly identify key information such as health and sync status, and version.
Add new clusters to or remove existing clusters from runtime management.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-runtime-topology-view.png" 
	url="/images/whats-new/rel-notes-runtime-topology-view.png" 
	alt="Runtime topology view" 
	caption="Runtime topology view"
   max-width="70%" 
  %}

For details, see [Topology view for runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/#topology-view).

#### Analytics dashboard
In addition to Delivery Pipelines, the Analytics dashboard shows Runtimes, Managed Clusters, Deployments, and Applications, to give you the complete CI/CD picture with key facts and insights.  

**Usability enhancements**  
  * Global filters are now located at the top of the dashboard.  
  * Resource-specific filters are available for that resource. 
  * A convenient View button takes you to the dedicated resource view for additional analysis.


{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-analytics-dashboard.png" 
	url="/images/whats-new/rel-notes-analytics-dashboard.png" 
	alt="Analytics dashboard" 
	caption="Analytics dashboard"
   max-width="70%" 
  %}

#### Applications dashboard
The Applications dashboard displays the individual deployments across your enterprise.  Here are the main enhancements:  

**Application inventory and status filters**  
  
  The health status snapshot in the Applications dashboard also works as a quick filter. Selecting a status filters applications by that status.    
  Filter criteria that match child applications automatically expands the parent application to show the child applications.

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/app-dashboard-status-filter.png" 
	url="/images/whats-new/app-dashboard-status-filter.png" 
	alt="Applications dashboard: Filter by status" 
	caption="Applications dashboard: Filter by status"
  max-width="70%" 
  %}

**Rollouts**  

  Intuitive visualization with the option to open the Images view in a new browser window.  

   {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-apps-open-image.png" 
	url="/images/whats-new/rel-notes-apps-open-image.png" 
	alt="Applications dashboard: Link to Image view" 
	caption="Applications dashboard: Link to Image view"
  max-width="70%" 
  %}

**Git committers**  
  Hovering over an avatar shows all commits made by that committer.  


**Current state of cluster resources**  
  Hierarchical representation of the resources deployed by this application in the cluster.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-app-current-state.png" 
	url="/images/whats-new/rel-notes-app-current-state.png" 
	alt="Applications dashboard: Current State" 
	caption="Applications dashboard: Current State"
  max-width="70%" 
  %}

#### Workflow Templates
Codefresh provides full-fledged management for the Workflow Template resource, from optimizing existing Workflow Templates, to creating new ones, and testing Workflow Templates before commit. 
 
 {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/wrkflow-template-main.png" 
	url="/images/whats-new/wrkflow-template-main.png" 
	alt="Workflow Templates" 
	caption="Workflow Templates"
  max-width="70%" 
  %}

**Create, test, and optimize Workflow Templates**  
  Create Workflow Templates in three steps. Start by selecting one from the Codefresh Hub for Argo, or start with a blank template form. Customize the Workflow Template, and either run the template to test it or commit to submit it.  

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/wrkflow-template-add.png" 
	url="/images/whats-new/wrkflow-template-add.png" 
	alt="Add Workflow Template panel" 
	caption="Add Workflow Template panel"
  max-width="50%" 
  %}

  For both new and existing Workflow Templates, the **Run** option enables you to test a new template, or changes to an existing template, without needing to first commit the changes. If the Workflow Template has previous iterations, you can view the arguments and values used in those iterations. 

    {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-wrkflow-temp-manifest-run.png" 
	url="/images/whats-new/rel-notes-wrkflow-temp-manifest-run.png" 
	alt="Run option for Workflow Templates" 
	caption="Run option for Workflow Templates"
  max-width="70%" 
  %}

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-wrkflow-temp-run-args-view.png" 
	url="/images/whats-new/rel-notes-wrkflow-temp-run-args-view.png" 
	alt="Run Workflow Template: Arguments list" 
	caption="Run Workflow Template: Arguments list"
  max-width="40%" 
  %}
 
  The Workflows and Delivery Pipelines tabs associated with the selected Workflow Template are displayed in the respective tabs, giving you all the information in the same location.  


**Rename Workflow Template**  
  After creating a Workflow Template, you can rename it by selecting the template and clicking **Rename**.  
  The new name must be unique within the cluster. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-rename-workflow-template.png" 
	url="/images/whats-new/rel-notes-rename-workflow-template.png" 
	alt="Rename Workflow Template" 
	caption="Rename Workflow Template"
  max-width="70%" 
  %}
  

#### Application creation wizard

Create applications that are fully GitOps-compliant from the Codefresh UI. The application manifest is generated, committed to Git, and synced to your cluster. 
When creating the application, you can use the UI forms, or edit the manifest directly.



{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-app-create-settings.png" 
	url="/images/whats-new/rel-notes-app-create-settings.png" 
	alt="Application settings in application creation wizard" 
	caption="Application settings in application creation wizard"
  max-width="70%" 
%}


#### Delivery Pipeline flows 
The Delivery Pipeline flow features several usability and functionality enhancements.

**Seamless integration of Argo Event information with Argo Workflows**  

  Once a workflow is submitted for a Delivery Pipeline, the Workflows tab visualizes the connections between the steps in the workflow.  
  With Argo Event information for the workflow also incorporated into the visualization, you have a unified view of Argo Events and Argo Workflows in one and the same location, the events that triggered the workflow combined with the workflow itself.   

  The Event Source manifest, the event payload, and the Sensor manifest are displayed as pull-out panels, allowing you to easily copy paths for attributes from event payloads, view logs, and download artifacts.  

  This example shows the event payload from Argo Events for the workflow.  
  
{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-event-payload.png" 
	url="/images/whats-new/rel-notes-event-payload.png" 
	alt="Panel with Event Payload in Workflows tab" 
	caption="Panel with Event Payload in Workflows tab"
  max-width="70%" 
%}

  This example shows the sensor manifest from Argo Events for the workflow.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-event-srce-manifest.png" 
	url="/images/whats-new/rel-notes-event-srce-manifest.png" 
	alt="Panel with Sensor manifest in Workflows tab" 
	caption="Panel with Sensor manifest in Workflows tab"
  max-width="70%" 
%}

**Rename trigger resource** 

  Similar to Workflow Templates, you can now change the trigger name of a Delivery Pipeline. The sensor name cannot be changed. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-rename-pipeline-trigger.png" 
	url="/images/whats-new/rel-notes-rename-pipeline-trigger.png" 
	alt="Rename trigger option for Delivery Pipeline" 
	caption="Rename trigger option for Delivery Pipelines"
  max-width="70%" 
%}

**Git repo selection for commits**  

  A dropdown list allows you to select one or more Git repos in the Trigger Conditions tab. Start typing, and use autocomplete to view and select from the available Git repos.

{% include 
   image.html 
   lightbox="true" 
	file="/images/whats-new/rel-notes-git-repo-select.png" 
	url="/images/whats-new/rel-notes-git-repo-select.png" 
	alt="Git repo selection for Delivery Pipelines" 
	caption="Git repo selection for Delivery Pipelines"
  max-width="70%" 
%}


**Errors/warning in manifests synced with the line number in manifest**  

  Clicking the line number next to an error or a warning changes focus to the line in the manifest file with the error or warning.


#### Workflows dashboard enhancements

**Link from workflows to their pipelines**  

  Workflow names in the dashboard are clickable links. Clicking a workflow name takes you directly to the pipeline associated with that workflow.

**New status for active workflows without events**  

Identify workflows that are active but do not have any execution data with the new status filter in the Workflows dashboard. Filtering by Status ‘Unknown’ shows workflows without events for the last hour.

{% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/rel-notes-workflow-unknown-status.png" 
	url="/images/whats-new/rel-notes-workflow-unknown-status.png" 
	alt="Unknown status filter for workflows" 
	caption="Unknown status filter for workflows"
  max-width="50%" 
%}

#### Image reporting with Docker config.json 
You can now also authenticate to a Docker registry using `docker./config.json` to report image information. Note that `config.json` is not currently supported for GCR, ECR, and ACR.  
For more information on the required fields, see [Report image info](https://github.com/codefresh-io/argo-hub/blob/main/workflows/codefresh-csdp/versions/0.0.6/docs/report-image-info.md){:target="\_blank"}.


#### OpenShift 4.8 support 
CSDP supports Red Hat OpenShift 4.8. For detailed information, read their [blog](https://cloud.redhat.com/blog/red-hat-openshift-4.8-is-now-generally-available#:~:text=OpenShift%204.8%20improves%20the%20bare,is%20now%20shipping%20with%20OpenShift){:target="\_blank"}.

### Bug fixes

**Applications dashboard**  

* Inaccurate results when filtering by Application type.
* Cluster shows the address of the Argo CD cluster instead of the target cluster.
* Broken Commit link in Application Preview.
* Filter by favorites does not show ApplicationSets.
* Releases not ordered correctly.
* Missing tags for Application/AppllicationSet. 
* Loop created on changing date in the Applications dashboard. 
* Rollouts in Deployment chart not aligned with the actual order of rollouts.
* Missing current release label.
* Missing commit message
* JIRA annotations not displayed for Images in Docker.io.
* Avatars show up intermittently.
* Incorrect Committers in Applications dashboard.
* Performance issues.

**Images**  

* Duplicate applications in Images repositories with different tags.
* Unmarked deployed images.

**Pipelines**  

* Empty event-sources.
* Missing created/updated/deleted status for resources.
* Event mapping issues.
* Creating a new pipeline with an existing Template shows empty Template tab.

**Upgrade**  

* Agent upgrade overrides configuration in previous release.

**Uninstall**  

* Artifacts in database after uninstalling with `--force` flag.
* Uninstallation issues with newer K8s versions.


