---
title: "GitOps value proposition"
description: "Unveiling the value proposition of Codefresh GitOps"
group: getting-started
toc: true
---

Discover how Codefresh's GitOps offering revolutionizes application development and deployment with streamlined operations and unified visibility. 

Let us take you through the key features and benefits....



## GitOps Apps dashboard: Command center for application management

As a one-stop shop for Argo CD and Argo Rollouts, the GitOps Apps dashboard is where you create, monitor, and manage Argo CD applications.
The GitOps Apps dashboard tackles the challenge of keeping track of your applications and their deployments, whatever the frequency and scale, across all clusters in your enterprise. 

DevOps engineers get a consolidated bird's-eye view of the applications under their care.  Flexible view formats, a wide range of filters, progressive delivery views, and enriched CI and CD information, provide full traceability and visibility of deployments. 

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard: List view"
caption="GitOps Apps dashboard: List view"
max-width="70%"
%}

Let's touch on the main features and functionality in the GitOps Apps dashboard.

### Global application view
When you get to the GitOps Apps dashboard, you see all applications in your account, across clusters and namespaces. 

#### Flexible viewing options
View applications in List or Card views, and tailor the information displayed to just what you need with our customizable filters. 

The Card view is similar to Argo CD's application view, presenting applications in a flat list.
The List view displays the hierarchical structure of your applications.

Whichever the view format, a wide range of filters, application- and attribute-based, allow you to customize the data presented.
* Application-based filters such as the Health status filter brings you a snapshot of deployed applications by their health statuses. Clicking a status filters by applications that match the status. 
* Attribute-based filters include Application Type, Clusters, Namespaces and more. 

SCREENSHOT

Read more in 

#### Warning & error alerts 
The Warnings/Errors button on the toolbar allows you to stay on top of issues with instant alerts for problematic applications. Whether it's Argo CD-generated errors or custom warnings from Codefresh.

SCREENSHOT

#### Convenient access to frequently-used actions


* **Effortless application management**  
  Need to take action for a specific application? Do so directly from the global application view in the GitOps Apps dashboard.  
  The context menu of every application provides quick access to commonly-used options, such as diff views, manual sync, edit, refresh, and delete.

* **Discrepancy detection with Diff View**  
  Spot disparities between desired and live states with the Diff View option in the application's context menu, again directly from the GitOps Apps dashboard. Get a visual representation of discrepancies between the desired and live states for out-of-sync applications to troubleshoot issues more effectively.

SCREENSHOT

###  Drill-down application views
Dive deeper into individual applications to explore resource states, deployment history, configuration, and more. We have dedicated tabs for every aspect of application management.


Here are the highlights.

#### Always-on information in Application Header
The Application Header provides at-a-glance information on health and sync statuses, auto-sync enabled/disabled indications, plus handy links to repositories. 
No matter which tab you navigate to, the Application Header is displayed for always-on access to crucial information.  


SCREENSHOT

#### Live monitoring of app resources in Current State 
The Current State tab, which is where you get to when you drill down to an app, keep track of application resources, manifests, and logs.

* **Tree vs List views**   
  Here too, we have flexible view formats, as hierarchical Tree, or flat List views.  
  The Tree view is optimal when you have complex deployments with multiple clusters and large numbers of resources.


* **Resource inventory**   
  The Resource inventory, in the bottom-left of the Tree view is a unique feature.
  It summarizes the aggregated count for each resource type in the application, with `out-of-sync` items for that resource type if any,  numbered in red.  

  The Resource inventory acts as a click-filter. Selecting any resource type, filters the Current State by that resource type and sync status.
  These filters are automatically applied to the default filter list for both Tree and List views. 

* **Quick actions**  
  Every resource comes with its own context menu, offering options for quick actions. 


#### Manifest optimization
Optimize definitions for an application through the Configuration tab, in Form or YAML formats.  


SCREENSHOT

#### Deployment history

Monitor ongoing and historical deployments for an application. 
The Timeline tab displays all the deployments for the selected application, with the Current Release deployment record at the top, followed by the list of Previous Releases.  
SCREENSHOT

## DORA Metrics: Unlock performance insights

DORA metrics is ubiquitous in the world of DevOps as a software lifecycle improvement tool for engineers and managers.  
Codefresh has out-of-the-box support for DORA metrics, and our DORA Metrics dashboard provides enterprise-wide visibility into performance.
 
TBD

[Read more]({{site.baseurl}}/docs/dashboards/dora-metrics/).


## Images dashboard: Streamlined container views for applications
The Images Dashboard streamlines container management for DevOps teams and infrastructure administrators by providing a centralized hub for monitoring and managing container images. 
TBD

[Read more]({{site.baseurl}}/docs/dashboards/images/).

## Environments & Products: Next-generation development and deployment
The GitOps Apps dashboard presents a comprehensive view of your applications, allowing you to drill down into their resources, deployment timelines, and more for insights. 

These insights are crucial for individual applications. What is also crucial for DevOps engineers and managers are insights for these applications in the wider context of their development and deployment lifecycle. This is exactly what Codefresh GitOps offers through Enviroments and Products, the next-generation paradigm for deployment and development. 


In Codefresh GitOps:

An Environment consolidates information for all Argo CD applications deployed to  clusters and namespaces, allowing you to easily track what's deployed where at any given moment.

A Product allows you to group interconnected Argo CD applications, providing a cohesive view of these applications as they progress through the development and deployment lifecyle.  Consider any practical scenario of numerous separate but interrelated applications, such as user management or billing. Instead of monitoring and managing each application separately, creating a Product enables you to track and manage them collectively.

Products act as a bridge between applications and their respective Environments. By linking applications to Products, you can easily track their deployment across different Environments, providing clarity and control over your deployment pipelines.
 
### Creating Environments & Products

Similar to the GitOps Apps dashboard, we have the Environments and Products dashboards where you create, view, and manage Environments, Products, and applications.

Creating Environments and Products is straightforward and intuitive:
* For Environments, all you need is a unique name, and the Kubernetes clusters and namespaces to associate with the Environment to "catch" deployed applications. [Read more]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-environments).
* Creating a Product is equally straightforward. You can create Products from the UI, or declaratively through simple annotations in application manifests. [Read more]({{site.baseurl}}/docs/dashboards/gitops-products/#assigning-applications-to-products).


Let's review key highlights for the Environments & Products dashboards. 
 

### Environments & Products: App versions and dependencies 
A unique feature common to both Environments and Products is the release version of applications.  Helm-based applications display the release version of the application, the _app version_ as defined in the Helm chart, identifying the specific release versions in the different Environments.
Displayed prominently for each application, this information is invaluable to easily track what's actually deployed across Environments. 

Clicking the version displays the application’s dependencies and their versions, and allows you to compare them across deployments in different Environments.  
You can easily see which version is deployed where. The comparison view is useful for troubleshooting to identify if the version that works in `dev` is the same as the version with the problem in `staging`.

We are working to also support this feature for non-Helm applications as well.

[Read more]({{site.baseurl}}/docs/dashboards/gitops-products/#view-and-compare-deployed-versions-for-dependencies).

### Environments & Products: Quick actions for applications
Take action for applications without navigating from wherever you are, Environments or Products. Manage applications through each application's context menu, including manual sync, refresh, and other frequently used options. These options are identical to those available for individual applications in the GitOps Apps dashboard.

[Read more]({{site.baseurl}}/docs/dashboards/gitops-products/#manage-applications-in-products).


### Environments: Applications by Health status
In every Environment, a toolbar displays the number of applications categorized by health status. Clicking on a status filters the displayed applications accordingly.


### Products: Real-time insights with integrated views
The Products dashboard offers three distinct views: Pods, Git, and Features. Beyond the standard technical details and Git hash information, these enriched views provide real-time insights into the changes in the application repo, deployment details, code changes, and feature tracking. 

Whether you're a developer tracking the latest commits or a project manager monitoring feature releases, these integrated views offer valuable insights tailored to your role.

[Read more]({{site.baseurl}}/docs/dashboards/gitops-products/#integrated-insights-with-pod-git-feature-views).


## GitOps Runtimes: Superior visibility and simplified operations

Enterprises leveraging Argo CD for deployments often face the complexity of managing deployments at scale.  
Codefresh GitOps offers native support for Argo CD, while serving as an active maintainer of the open source community version. 

Our GitOps Runtime solves these issues with unique benefits. A wizard guides you through the steps required to install the GitOps Runtime. The installation includes a forked version of the Argo Project with its components: Argo CD, Argo Rollouts, Argo Workflows and Argo Events.
[Read more]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

In summary:
* Every GitOps Runtime is an Argo CD instance. 
* Every GitOps Runtime can connect to and manage any number of external clusters.
* All GitOps Runtimes are managed and synchronized by a single control plane.

And these are the benefits: 

* **Single pane of glass visibility**  
  All Argo CD instances in Codefresh being managed through a single control plane means full visibility for all Runtimes.
  Installed Runtimes are displayed in the GitOps Runtimes page with all the information you need on the Runtime, and actions to manage it.  
  The Topology view is particularly useful for Runtime and cluster topology in the same location.
  SCREENSHOT

  The single pane of glass visibility extends also to the Argo CD applications associated with these Runtimes, removing the pain of fragmented views between different Argo CD instances. All applications are displayed in the GitOps Apps dashboard regardless of the clusters on which they are deployed. There's no need to track applications across clusters manually.

* **Effortless maintenance** 
  The Version column of the Runtime notifies whenever a new version is available, providing  a link to the complete changelog for informed decisions on upgrades.
  
* **Flexibile scalability**  
  Single control plane management eliminates the challenge of maintaining multiple Argo CD instances. You can install any number of Argo CD instances and the Runtime handles the logistics.
  
  Scaling down on Argo CD instances is equally straightforward: by connecting additional remote clusters to an existing GitOps Runtime, you can reduce the number of Argo CD instances.

* **Faster security remediations**
  As an active maintainer of Argo CD, Codefresh ensures timely fixes for security vulnerabilities in our forked version, before rollout to the community version. 

* **Centralized administration**
  Enterprise-level administrative functionality for user, permission, and audit management is centralized, and Argo CD agnostic.

[Read more]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/).







