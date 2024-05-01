---
title: "Release Notes: April 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### General: More power to Global Search & Navigation

We're excited to announce major enhancements adding to the power and ease of our Global Search & Navigation: 

* **Actions through Search**
  Execute actions using search or keyboard shortcuts:
  * Run a pipeline: Search to navigate to a specific pipeline and then press `R` and `N` to trigger that pipeline.
  * Refresh an application: Search for the application you need, and press `R` and `F` to instantly refresh the application.
  * Sync an application: Within an application, use `S` and `Y` shortcut keys to open the sync dialog.

* **Quick navigation**

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/apr24/rel-notes-apr24-app-proxy-logs.png" 
url="/images/whats-new/apr24/rel-notes-apr24-app-proxy-logs.png" 
alt="Global Search & Navigation: app-proxy logs" 
caption="Global Search & Navigation: app-proxy logs" 
max-width="60%" 
%}


* **Integrated link to `app-proxy` logs**
  We've introduced App-proxy logs as a new navigation item. You can now type `App-proxy logs` to access a list of GitOps Runtimes. From there, simply select a Runtime to view its app-proxy logs in the online terminal. 
* **GitOps Runtimes for admins** 
  Type `GitOps Runtimes` and click to go directly to the GitOps Runtimes page. 
* **GitOps Permissions for admins**
  Type `GitOps Permissions` and click it to go directly to the Permissions page.

### Pipelines: Explore build relationships with Build Tree
Introducing Build Tree for easy rendering of relationships between pipeline builds!
Seamlessly visualize complex parent-child-sibling relationships within the context of your selected build, simplifying pipeline monitoring and management.

 {% include 
image.html 
lightbox="true" 
file="/images/whats-new/apr24/rel-notes-apr24-build-tree-view.png" 
url="/images/whats-new/apr24/rel-notes-apr24-build-tree-view.png" 
alt="Pipeline builds: Build Tree view" 
caption="Pipeline builds: Build Tree view" 
max-width="60%" 
%}


In addition to the effortless visualization, other key benefits include:
* The selected build as an anchor reference point to linked builds, indicated by the **Current** tag assigned to it.
* Updated status for every build, with failed steps listed for quick alerting.
* Quick access to essential actions without navigating away from the Build Tree, through the build’s context menu.
* Single-click access to the individual build view for detailed insights.

For details, see [Visualize build relationships for pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#visualize-build-relationships-for-pipeline).



### Pipelines: Monthly credit consumption usage by pipelines
We added a **Usage per month** table below the Credit Consumption chart.  
This table provides build and credit consumption metrics by pipelines for the selected month. 

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/apr24/rel-notes-apr-24-credit-usage-by-pipeline.png"
  url=“/images/whats-new/apr24/rel-notes-apr-24-credit-usage-by-pipeline.png"
  alt="Credit Consumption: Usage per month by pipelines"
  caption="Credit Consumption: Usage per month by pipelines"
  max-width="60%"
%}

### Pipelines: More Pull Request events support for GitHub
Our integration with GitHub events is now even stronger with the addition of more types of Pull Request (PR) event triggers.

You can now trigger builds for the following PR events:
* Pull Request review approved
* Pull Request review changes requested
* Pull Request review commented

{% include
  image.html
  lightbox="true"
  file="/images/whats-new/apr24/rel-notes-apr24-github-pr-events.png"
  url="/images/whats-new/apr24/rel-notes-apr24-github-pr-events.png"
  alt="New Pull Request events for GitHub in Codefresh"
  caption="New Pull Request events for GitHub in Codefresh"
  max-width="60%"
%}

For details, see [Git triggers for pipelines]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/).

### Usability: Entity names set to lowercase in breadcrumbs
A small but significant usability improvement, entity names are now consistently displayed in lowercase within the breadcrumbs.



## Bug fixes

##### General
* Discrepancy between number of active committers and that displayed in Usage tab (CR-22776)

##### Pipelines 
* Incorrect Credits utilization: Credits Remaining versus Estimated Depletion. 
* Azure repos with **YAML from repository settings** throws  `TimeoutError: Connection to server has timed out` error during trigger creation when listing repositories.
* 500 error for BitBucket webhooks including deleted branches. 
* Queue-time metric reported to Datadog from Codefresh includes the duration of pending-approval steps.
* Build failure for pipeline including mixture of regular and `buildx` parallel build steps.
* Builds for Gerrit in Codefresh triggered twice.
* CPU utilization for a pipeline build incorrectly displayed in the Metrics tab as 100% instead of the actual usage.
* `error URL using bad/illegal format or missing URL` for `git-commit` steps when password includes special characters.


##### GitOps 
* Deleting a managed cluster from a GitOps Runtime results in an empty list of clusters for the same Runtime.  
* `Slow loading...` message when selecting GitOps Apps option from sidebar.  
* GitOps Apps dashboard > Applications tab displays `Unknown` status for Argo CD applications. 
* In GitOps Apps dashboard, selecting **More filters** shows truncated Kubernetes **Label** names. 