

Unveiling the value proposition of Codefresh GitOps

top-dpwn from the top





## GitOps Apps dashboard: Command center for application management

As a one-stop shop for Argo CD and Argo Rollouts, the GitOps Apps dashboard is where you create and manage Argo CD applications.
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

### Global application views

#### Flexible viewing options
View applications in List or Card views, and tailor the information displayed to just what you need with our customizable filters. 

The Card view is similar to Argo CD's application view, presenting applications in a flat list.
The List view displays the hierarchical structure of your applications.


Whichever the view format, a wide range of filters, application- and attribute-based, allow you to customize the data presented.
* Application-based filters such as the Health status filter brings you a snapshot of deployed applications by their health statuses. Clicking a status filters by applications that match the status. 
* Attribute-based filters include Application Type, Clusters, Namespaces and more. 

SCREENSHOT

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


Here are a few highlights.

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

## DORA Metrics dashboard: Unlock performance insights

DORA metrics is ubiquitous in the world of DevOps as a software lifecycle improvement tool for engineers and managers.  
Codefresh has out-of-the-box support for DORA metrics, and our DORA Metrics dashboard provides enterprise-wide visibility into performance.
 
*  Tagging applications as favorites in the GitOps Apps dashboard and cthe performance of those applications and metrics in the DORA metrics dashboard.  

* The Totals snapshot distills key metrics for quick recap and  failure rate and to a 

Correlate inshts from the GitOps Apps dashboard with DORA metrics for data drvien insighst and 

Platform managers
By monitoring DORA metrics, platform managers can gain insights into team efficiency, identify areas for improvement, and track the impact of process changes over time. This data-driven approach enables organizations to optimize their software delivery pipelines and achieve higher levels of performance and productivity.

DevOps engineers benefit from actionable insights into their development processes, empowering them to identify areas for optimization and enhance collaboration.rs
 gain valuable visibility into team efficiency and effectiveness, enabling data-driven decision-making and fostering a culture of continuous improvement. 


For example, a significant increase in deployment lead time for an application in the GitOps Apps Dashboard can lead you to discover that spike in the lead time spike coincides with an uptick in deployment frequency and a higher change failure rate, as indicated by our DORA Metrics dashboard. This correlation suggests that efforts to increase deployment velocity may have inadvertently introduced instability into the deployment process.


## Images dashboard: Streamlined container views for applications
The Images Dashboard streamlines container management for DevOps teams and infrastructure administrators by providing a centralized hub for monitoring and managing container images. 
TBD


## GitOps Runtimes: Unified visibility and simplified 

Enterprises using Argo CD for deployments often come up against the complexity of using Argo CD at scale.  
Codefresh GitOps has native support for Argo CD, and we are also an active maintainer of the open source community version of Argo CD. 

Installing Codefresh GitOps through the GitOps Runtime installs a forked version of the Argo Project with its components: Argo CD, Argo Rollouts, Argo Workflows and Argo Events.

* Every GitOps Runtime is an Argo CD instance. 
* Every GitOps Runtime can connect to and manage any number of external clusters.
* All GitOps Runtimes are managed and synchronized by a single control plane.

Here are a few key benefits of GitOps Runtimes over Argo CD instances for deployment:

* **Scalability**  
  Single control plane management eliminates the challenge of scaling and maintaining multiple Argo CD instances. 
  
  Scaling down on Argo CD instances is equally straightforward: by connecting additional remote clusters to an existing GitOps Runtime, you can reduce the number of Argo CD instances.


* **Single pane of glass visibility**  
  All Argo CD instances in Codefresh being managed through a single control plane means full visibility for all Runtimes and clusters.  Runtime and cluster topology can be viewed in the same location.
  SCREENSHOT

  The single pane of glass visibility extends also to the Argo CD applications associated with these Runtimes, removing the pain of fragmented views between Argo CD instances. All applications are displayed in the GitOps Apps dashboard regardless of the clusters on which they are deployed. There's no need to track applications across clusters manually.

  SCREENSHOT

* **Centralized administration**
  Enterprise-level administrative functionality for user, permission, and audit management is centralized, and Argo CD agnostic.










