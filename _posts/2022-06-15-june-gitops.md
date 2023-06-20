---
title: "GitOps Release Notes: June 2022"
description: "Changelog and Release Notes for GitOps"
---

## Features & enhancements

### Shared configuration for runtimes

Define configuration settings for a runtime once, and reuse the configuration settings for multiple runtimes in the same account. Reduce time needed to define  and maintain configuration settings for every runtime separately.  

After defining the repository in which to store configuration settings, you can reference the repository, selectively from specific runtimes, or from all runtimes, and  share the configuration.  

Older versions of hybrid runtimes without the shared repository must be upgraded to the latest version  to  leverage the  shared configuration, specifically for integrations with CI platforms and tools.  

For details, see [Shared runtime configuration repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).

### Logs for runtime components

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

For details, see [View/download runtime logs]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#viewdownload-logs-to-troubleshoot-gitops-runtimes).

### OAuth2 authentication

OAuth (Open Authorization) 2.0 has become an industry standard for online authorization. Codefresh supports connections to your Git provider using OAuth2. Codefresh integrates with Git to sync repositories to your clusters, implement Git-based actions when creating resources such as Delivery Pipelines, and to enrich Images with valuable information.  

Codefresh provides a default, predefined OAuth2 application for every runtime. As an account administrator in Codefresh, you can optionally create an OAuth2 Application in GitHub and set up authentication within Codefresh. Users in Codefresh can then authorize access to GitHub with OAuth2, instead of with a personal access token.  

For details, see [Set up OAuth2 authentication]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup/).

### Application resources in Tree view

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

#### Progressive discovery

By the very nature of its design, the Tree View allows progressive discovery. View all resources at once, or start with a parent resource, and expand it to view siblings and children to understand how they are connected.  

#### Resource filters

The filters in the List view are available also in the Tree view. These global filters help narrow the scope of the resources displayed, by kind, health status, and sync state. The filters set in either the List or Tree vies are retained when navigating between them.

#### Resource search and find

The Search option lets you locate resources by searching for any part of the resource name. Similar to the filters, search results are also retained when navigating between Tree and List views.  
For quick search, use the Find option to locate and navigate to required resources.  

#### Resource inventory

At the bottom-left, the resource inventory summarizes your deployment in numbers per resource kind. Syncing and Out-of-Sync resources for each kind are bucketed separately, for visibility, and for quick access to filter resources by these states.

#### Resource manifest and logs

In addition to the metadata on mouse-over for a resource, clicking a resource shows its manifests and logs based on the resource type. View and compare the Desired and Live states for managed resources in Git repositories.  
Another usability enhancement is the ability to share resource details by copying the URL and sending it to others in your organization for collaborative review.  

Logs are displayed if the resource has logs:  

* For online viewing, you have free-text search and line-wrap functionalities.
* For offline viewing and analysis, you can download the complete log into a text file.

For details, see [Monitor application resources in Current State]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitor-resources-for-selected-application).

### Application rollout visualization

In addition to installing Argo Rollouts in your cluster, visualize Argo Rollout history and progress directly in the Applications (deployment) dashboard. Visualize rollouts from multiple clusters and runtimes in a single centralized location through the Deployment tab.

#### Rollout progress

Ongoing rollouts show the progress of the rollout in the real time. Completed rollouts show the switch to the new version according to the deployment strategy.

{% include
 image.html
 lightbox="true"
 file="/images/whats-new/rel-notes-june22-rollout-in-progress.png"
 url="/images/whats-new/rel-notes-june22-rollout-in-progress.png"
 caption="Application Rollout: Progress visualization"
   max-width="60%"
  %}

#### Rollout steps

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

For details, see [Monitor deployments for application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitor-rollouts-by-deployment).

### Nested workflows

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

For details, see [Nested workflows]({{site.baseurl}}/docs/workflows/nested-workflows/).

## Bug fixes

### Runtimes

* Encrypted Git integration remains when uninstalling runtime through the CLI, and decryption through app-proxy fails.
* Rollback occurs during installation via CLI.
* Runtime ignores –Demo resources=false flag install confirmation.
* Installation via CLI stops when demo resources are not installed even when –demo -resources flag is set to false.
* No errors during installation via CLI when flags are incorrectly located.
* Runtime name with health or sync errors not highlighted in Codefresh UI.

### Images

* Empty pages on changing filters in page two or higher.  
* Broken link for an image not in logged-in user account.
* Images view not updated with current application with rollout resource.

### Applications

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

### Pipelines

* Selecting an existing Workflow Template creates a new Workflow Template.
* Incorrect line numbers for pipeline template in Form mode.
