---
title: "Environments dashboard"
description: "Create environments to track SDLC for Argo CD applications"
group: dashboards
toc: true
---


## Environments dashboard
The **Environments** dashboard introduces a new dimension to the developer and deployment experience with Argo CD applications in Codefresh.

Within Codefresh's suite of dashboards, such as the GitOps Overview and GitOps Apps, you gain valuable insights into application deployments and configurations. These views focus on individual applications, lacking the broader context of their interconnections, if any.

The Environments dashboard fills this gap by providing a holistic perspective on applications based on their software development and deployment lifecycles. It offers a centralized view of products and their applications as they progress through various promotions, placing them within the broader context of their development journey.

The Environments dashboard in Codefresh gives you a real-time view of your applications across all environments. It provides insights into deployment status, promotions, and version history—helping teams track changes and make informed decisions. With built-in filtering and detailed environment data, you can quickly assess the state of your applications and streamline troubleshooting.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/environments-dashboard.png" 
	url="/images/gitops-environments/environments-dashboard.png" 
	alt="GitOps Environments dashboard" 
	caption="GitOps Environments dashboard"
  max-width="60%" 
%}
Read more on the world's first dashboard for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.



## Environments dashboard information


The table describes the information displayed and the actions available in the Environments dashboard.

{: .table .table-bordered .table-hover}
| Item             | Description              | 
| --------------    | --------------           |
|**Filters**              | Predefined filters to customize the Environment dashboard view by Product or Application. | 
|{::nomarkdown}<img src="../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Star an application to mark it as a favorite and easily locate applications of interest.{::nomarkdown}<br>Select the <img src="../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star as a favorite.<br><br>To filter by favorites, on the filters bar, click <img src="../../../images/icons/icon-fav-starred.png?display=inline-block">. {:/} |
|**Environments**              | Organized in color-coded columns to differentiate between non-production environments (gray) and production environments (blue).{::nomarkdown}<ul><li>The column title represents the name of the Environment. Mouse over displays the options available to manage environments. See <a href="https://codefresh.io/docs/docs/environments/create-manage-environments/">Create and manage environments</a>.</li><li>Quick filter for applications within Environment: The top row displays breakdown of applications by health statuses. Clicking a status filters the applications accordingly.</li><li>Each Environment is populated with the applications in the cluster-namespace pairs mapped to it. <br>An empty environment indicates that there are no applications in the cluster-namespaces mapped to it. <br>**Unassigned Apps** show applications not assigned to any Product.</li></ul>{:/}  |
|**Detailed/Compact views**              | Switch between views to get information on applications that populate an Environment.{::nomarkdown}<ul><li><b>Compact</b>: Default view presenting a flat list of applications with the version, health, and sync status for each.<br> <img src="../../../images/gitops-environments/app-compact-view-mode.png?display=inline-block" width="60%"></li><li><b>Detailed</b>: Displays a record for each application including assigned Product, commit information, and cluster-namespace deployment details.<br>If not assigned to a Product, the application name is used.<img src="../../../images/gitops-environments/app-detailed-view-mode.png?display=inline-block" width="60%">.</li><li>Application version: Available for Helm-based applications, indicating the specific release in different environments. Clicking the version displays additional information and options.</li></ul>{:/}In both view modes, every Product/application has a context-menu with quick access to promotion options and frequently performed actions, such as Synchronize and Refresh. See [Manage products and applications in environments]({{site.baseurl}}/docs/environments/manage-apps-in-environments/). |






## Related articles
[Create and manage environments]({{site.baseurl}}/docs/environments/create-manage-environments/)  
[Manage products and applications in environments]({{site.baseurl}}/docs/environments/manage-apps-in-environments/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
{% if page.collection != site.gitops_collection %}[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/){% endif %}  


