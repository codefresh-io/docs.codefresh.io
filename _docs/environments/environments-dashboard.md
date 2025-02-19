

## Environments dashboard
Here's an example of the Environments dashboard.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/environments-dashboard.png" 
	url="/images/gitops-environments/environments-dashboard.png" 
	alt="GitOps Environment dashboard" 
	caption="GitOps Environment dashboard"
  max-width="60%" 
%}

The table describes the information displayed in the Environments dashboard.

{: .table .table-bordered .table-hover}
| Item             | Description              | 
| --------------    | --------------           |
|**Filters**              | Predefined filters to customize the Environment dashboard view by Product or Application. | 
|{::nomarkdown}<img src="../../../images/icons/icon-mark-favorite.png?display=inline-block">{:/}| Star an application to mark it as a favorite and easily locate applications of interest.{::nomarkdown}<br>Select the <img src="../../../images/icons/icon-mark-favorite.png?display=inline-block"> to star as a favorite.<br><br>To filter by favorites, on the filters bar, click <img src="../../../images/icons/icon-fav-starred.png?display=inline-block">. {:/} |
|**Detailed/Compact views**              | Switch between views to get information on applications that populate an Environment.{::nomarkdown}<ul><li><b>Compact</b>: Default view presenting a flat list of applications with the version, health, and sync status for each.<br> <img src="../../../images/gitops-environments/app-compact-view-mode.png?display=inline-block" width="60%"></li><li><b>Detailed</b>: Displays a record for each application including assigned Product, commit information, and cluster-namespace deployment details.<br>If not assigned to a Product, the application name is used.<img src="../../../images/gitops-environments/app-detailed-view-mode.png?display=inline-block" width="60%">.</li><li>Application version: Available for Helm-based applications, indicating the specific release in different Environments. Clicking the version displays additional information and options.<br>See <a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/#view-and-compare-deployed-versions-for-dependencies">Identify application versions in different Environments</a>.</li></ul>{:/}In both view modes, every application has a context-menu with quick access to frequently performed actions, such as Synchronize and Refresh. See [Manage applications in Environments](#manage-applications-from-within-environments). |
|**Environments**              | Organized in color-coded columns to differentiate between non-production Environments (gray) and production Environments (blue).{::nomarkdown}<ul><li>The column title represents the name of the Environment. Mouse over displays the options available to manage Environments. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/#working-with-gitops-environments">Working with Environments</a>.</li><li>Quick filter for applications within Environment: The top row displays breakdown of applications by health statuses. Clicking a status filters the applications accordingly.</li><li>Each Environment is populated with the applications in the cluster-namespace pairs mapped to it. <br>An empty Environment indicates that there are no applications in the cluster-namespaces mapped to it. <br>**Unassigned Apps** show applications not assigned to any Product.</li></ul>{:/}  |