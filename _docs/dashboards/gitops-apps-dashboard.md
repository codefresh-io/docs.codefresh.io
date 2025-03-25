---
title: "GitOps Apps dashboard"
description: "Explore Argo CD applications in the GitOps Apps dashboard"
redirect_from:
  - /docs/deployments/gitops/gitops-apps-dashboard/
toc: true
---


The GitOps Apps dashboard is a central hub for managing Argo CD applications and Argo Rollouts across all clusters in your enterprise.  
It provides a unified interface for:
* Creating and managing applications
* Monitoring deployments with enriched CI/CD data
* Gaining full traceability and visibility into progressive delivery

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard"
caption="GitOps Apps dashboard"
max-width="70%"
%}



## View modes for GitOps Apps dashboard 

When you navigate to the GitOps Apps dashboard, the dashboard displays the Argo CD applications you have created and deployed, sorted by the most recent deployments.  
The applications are displayed in List view (the default). You can switch to Card view mode if needed. 


### List view
The List view shows applications in a hierarchical structure, making it easy to understand parent-child relationships. This view provides structural context for multi-level applications.


{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard: List view"
caption="GitOps Apps dashboard: List view"
max-width="70%"
%}

### Card View
The Card view presents a flat list of applications without hierarchy. It provides a quick overview but does not display relationships between applications.

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-card-view.png"
url="/images/applications/app-dashboard-card-view.png"
alt="GitOps Apps dashboard: Card view"
caption="GitOps Apps dashboard: Card view"
max-width="60%"
%}

## Application types in the GitOps Apps dashboard

The GitOps Apps dashboard displays the different types of Argo CD applications, each rendered based on its structure. 
Applications are tagged to indicate their type in the hierarchy.

##### Standalone Argo CD applications
Standalone applications are displayed individually, with or without their parent Git Source applications.

{% include
image.html
lightbox="true"
file="/images/applications/dashboard/app-view-standalone-apps.png"
url="/images/applications/dashboard/app-view-standalone-apps.png"
alt="Standalone applications in GitOps Apps dashboard"
caption="Standalone applications in GitOps Apps dashboard"
max-width="60%"
%}

##### Dynamically generated application sets
ApplicationSets include multiple applications dynamically generated based on a predefined configuration. 
In the GitOps Apps dashboard, the generated applications are displayed nested within the parent.

{% include
image.html
lightbox="true"
file="/images/applications/dashboard/app-view-appset.png"
url="/images/applications/dashboard/app-view-appset.png"
alt="ApplicationSet in GitOps Apps dashboard"
caption="ApplicationSet in GitOps Apps dashboard"
max-width="60%"
%}

##### Applications with multiple sources
Multisource applications pull configurations from multiple repositories or sources.  
In the GitOps Apps dashboard, the number of sources are displayed next to the **Sources** label.

{% include
image.html
lightbox="true"
file="/images/applications/dashboard/app-view-multisource-apps.png"
url="/images/applications/dashboard/app-view-multisource-apps.png"
alt="Multisource application in GitOps Apps dashboard"
caption="Multisource application in GitOps Apps dashboard"
max-width="60%"
%}

##### Git Source applications
Applications created in Codefresh are committed to a Git repository that stores the manifests. Codefresh manages the Git Source itself as an application. Git Sources are essential for viewing configuration settings of all application types, and managing standalone and multisource applications.  
See [Git Sources in Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/).



## GitOps Apps dashboard application information 
Here's a description of the information and actions in the GitOps Apps dashboard.

{: .table .table-bordered .table-hover}
| Item                     | Description            |  
| --------------         | --------------           |  
|**Application filters**       | Filter by a range of attributes to customize what you see in the dashboard. {::nomarkdown}  <ul><li>Application health<br>A snapshot that displays a breakdown of the deployed applications by their health status.<br>Click a status to filter by applications that match it.<br>Codefresh tracks Argo CD's set of health statuses. See <a href="https://codefresh.io/docs/docs/deployments/gitops/monitor-applications/#health-status-for-application-resources">Health status</a>, and Argo CD's official documentation on <a href="https://argo-cd.readthedocs.io/en/stable/operator-manual/health" target=”_blank”>Health sets</a>.</li><li>Application attributes<br>Attribute filters support multi-selection, and results are based on an OR relationship within the same filter with multiple options, and an AND relationship between filters.<br>Clicking <b>More Filters</b> gives you options to filter by Health status, Cluster names, Namespace, and Type. <br><ul><li>Application Type: Can be any of the following<ul><li>Applications: Standalone applications. See the official documentation on <a href="https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#applications" target=”_blank”>Applications</a>.</li><li>ApplicationSet: Applications created using the ApplicationSet Custom Resource (CR) template. An ApplicationSet can generate single or multiple applications. See the official documentation on <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/application-set" target=”_blank”>Generating Applications with ApplicationSet</a>.</li><li>Git Source: Applications created by Codefresh that includes other applications and CI resources. See <a href="https://codefresh.io/docs/docs/installation/gitops/git-sources/">Git Sources</a>.</li></ul></li></li><li>Labels:The K8s labels defined for the applications. The list displays labels of <i>all</i> the applications, even if you have applied filters.<br>To see the available labels, select <b>Add</b>, and then select the required label and one or more values. <br>To filter by the labels, select <b>Add</b> and then <b>Apply</b>.<br> See the official documentation on <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/labels" target=”_blank”>Labels and selectors</a>.</li></ul></ul>{:/}|
|{::nomarkdown}<img src="../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Star applications as favorites to filter them later.{::nomarkdown}<br>Select the <img src="../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star the application as a favorite.<br><br>To filter by favorite applications, on the filters bar, select <img src="../../../images/icons/icon-fav-starred.png?display=inline-block">.<br>{:/} {% if page.collection != site.gitops_collection %}TIP: You can filter starred (favorite) applications also in the [DORA metrics dashboard]({{site.baseurl}}/docs/dashboards/dora-metrics/#metrics-for-favorite-applications).{% endif %}  |
|**Application actions**| Options to monitor/manage applications through the application's context menu. {::nomarkdown}<ul><li>Quick view<br>A comprehensive read-only view of the deployment and definition information for the application.</li>{:/}See [Monitor deployments for selected Argo CD application]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#monitoring-application-deployments).{::nomarkdown}<li>Synchronize/Sync: Manually synchronize the application.</li>{:/}See [Manually sync applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-sync-an-argo-cd-application).{::nomarkdown}<li>Edit: Modify application definitions.</li>{:/}See [Edit application definitions]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-argo-cd-application-definitions).{::nomarkdown}<li>Refresh and Hard Refresh: Always available in the application's toolbar. <ul><li>Refresh: Retrieve desired (Git) state, compare with the live (cluster) state, and refresh the application to sync with the desired state.</li><li>Hard Refresh: Refresh the application to sync with the Git state, while removing the cache.</li></ul>{:/}See [Refresh/hard refresh GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/#refreshhard-refresh-argo-cd-applications). |

## Related articles
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/)  
[Managing Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/)  
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)    
[Products dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
{% if page.collection != site.gitops_collection %}[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/){% endif %}  
