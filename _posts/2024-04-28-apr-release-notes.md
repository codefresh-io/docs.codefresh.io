---
title: "Release Notes: April 2024"
description: "Release Notes for Codefresh Pipelines and GitOps"
---
## Features & enhancements

### Pipelines: Explore build relationships with Build Tree
Introducing Build Tree for easy rendering of relationships between pipeline builds!
Seamlessly visualize complex parent-child-sibling relationships within the context of your selected build, simplifying pipeline monitoring and management.

{% include
  image.html
  lightbox=“true”
  file=“/images/whats-new/mar24/rel-notes-mar24-build-tree-view.png”
  url=“/images/whats-new/mar24/rel-notes-mar24-build-tree-view.png”
  alt=“Build Tree view for pipeline builds”
  caption=“Build Tree view for pipeline builds”
  max-width=“60%”
%}

In addition to the effortless visualization, other key benefits include:
* The selected build as an anchor reference point to linked builds, indicated by the **Current** tag assigned to it.
* Updated status for every build, with failed steps listed for quick alerting.
* Quick access to essential actions without navigating away from the Build Tree, through the build’s context menu.
* Single-click access to the individual build view for detailed insights.

For details, see [Visualize build relationships for pipelines]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#visualize-build-relationships-for-pipeline).

### Command Bar: More quick actions

* **Integrated link to `app-proxy` logs**
  We've introduced App-proxy logs as a new navigation item. You can now type `App-proxy logs` to access a list of GitOps Runtimes. From there, simply select a Runtime to view its app-proxy logs in the online terminal. 
* Added a link to Runtimes in the navigation bsr [CR-21227]
* **GitOps Runtimes** & **GitOps Permissions for admins**
  Codefresh administrators can:
  * Search for GitOps Runtimes.
  * Search for GitOps Permissions and click it to go directly to the Permissions page.
* **Run pipeline**  
  Added an action to run a pipeline [CR-21226]

### Monthly credit consumption usage by pipelines
We added a new table below the Credit Consumption chart, **Usage per month**.  
This table provides build and credit comsumption metrics by pipelines for the selected month. 

{% include
  image.html
  lightbox=“true”
  file=“/images/whats-new/apr24/rel-notes-apr-24-credit-usage-by-pipeline.png”
  url=“/images/whats-new/apr24/rel-notes-apr-24-credit-usage-by-pipeline.png”
  alt=“Credit Consumption: Usage per month by pipelines”
  caption=“Credit Consumption: Usage per month by pipelines”
  max-width=“60%”
%}

### Entity names set to lowercase in breadcrumbs
As a small but significant usability improvement, entity names are now consistently displayed in lowercase within the breadcrumbs.

## Bug fixes

##### General
* Discrepancy between number of active committers and that displayed in Usage tab (CR-22776)

##### Pipelines 
<!--- * (On-premises only) Builds fail with message "Build was terminated because of prolonged inactivity" for v2.1 and higher. (CR-23444 vadim kharin)-->
* ??https://codefresh-io.atlassian.net/browse/CR-23033 - Zhenya
<!--- * (On-premiess only) "Codefresh is unable to reach your Kubernetes cluster, please check if there is a connection issue" error when selecting **Account settings > Pipeline integrations > Kubernetes**. (CR-22998 Vadim Kharin) -->
* Incorrect Credits utilization: Credits Remaining versus Estimated Depletion. (CR-22977 Bohdan Pysarenko)
* `TimeoutError: Connection to server has timed out` error during trigger creation when listing repositories for **YAML from repository settings**.(CR-22941 - VadimKharin)
* 500 error for BitBucket webhooks including deleted branches. 
https://codefresh-io.atlassian.net/browse/CR-22639 Andrii
* Queue-time metric reported to Datadog from Codefresh includes the duration of pending-approval steps.
* Build failure for pipeline including mixture of regular and `buildx` parallel build steps.
* Builds for Gerrit in Codefresh triggered twice.
* CPU utilization for a pipeline build incorrectly displayed in the Metrics tab as 100% instead of the actual usage.



##### GitOps 
* Deleting a managed cluster from a GitOps Runtime results in an empty list of clusters for the same Runtime. (CR-23479 Daniel Maizel) 
* `Slow loading...` message when selecting GitOps Apps option from sidebar. (CR-23126 Victor Plakyda) 
* Applications tab in GitOps Apps dashboard displays `Unknown` status for Argo CD applications. (CR-23096 - Vadim Kharin)
* Application status in Codefresh UI displayed as Unknown when logs show app healthy
* In GitOps Apps dashboard, selecting **More filters** shows truncated Kubernetes **Label** names. (CR-22526 - Bogdan Volynets)
, 











