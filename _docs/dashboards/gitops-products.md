---
title: "GitOps Products"
description: "Create Products for Argo CD applications and view across environments"
group: dashboards
toc: true
---






>**NOTE**:  
This feature is currently in Beta.

Explore the power of GitOps Products for Argo CD applications. 

A Product unifies individual Argo CD applications that share a common element between them. Consider your payment applications organized  by Environments that correspond to the regions they are deployed in. 
With Products, Codefresh allows you to group and track them as a cohesive entity as they move through different Environments. 




{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="70%" 
%}

Read this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/) on the world's first dashboard for GitOps Environments and Products.

##### What are the benefits of GitOps Products?  

* Group applications  
  Group and connect Argo CD applications based on a common element through Products. For example, bring all your billing applications under the **Billing** Product. Assign your applications to logical Products for a consolidated perspective on these applications. 

* Bridge applications and GitOps Environments  
  By creating Products and linking applications to them, the Products dashboard efficiently bridges the gap between applications and their respective Environments. GitOps Products allow you to see how these applications are deployed across the different Environments.

* Enriched insights   
  With GitOps Products, Codefresh brings you critical information beyond sync and Git hash deployment information. The Products dashboard automatically correlates sync information with other important information from the software lifecycle such as the source code commits and the affected services.
  All stakeholders, including product and project managers and not just developers can instantly see the information they need for all the applications in the different Environments.

##### How do you view applications by Product?  
In a simple two-step process:

1. [Create the Product](#create-products)  
  You start by creating a Product, giving it a name that makes sense for your use case. 

1. [Connect applications to the Product](#working-with-products)  
  Bring your applications into the picture. Link your applications to the Products you've created to create the associations you need. 

Codefresh automatically identifies and organizes the applications in the correct [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/).

The diagram illustrates how Argo CD applications connected to a Product are grouped by that Product, and organized by Environment. It also shows applications not assigned to any Product.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by Products and organized by Environments" 
	caption="Argo CD applications grouped by Products and organized by Environments"
  max-width="70%" 
%}




## Create Products
Create a Product with a unique name and define the annotations by which to connect different Argo CD applications to it.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for your Product, which is also unique in the cluster. 
    1. **Connect Applications**: The applications to associate with this Product by adding the default or custom annotation to the application manifest.  
      *  To use the default annotation, copy and paste it into the manifest.
      *  To use a custom annotation, click **Add custom annotation**, and then define the Key-Value for the annotation. Copy and paste it into the manifest.
    1. **Tags**: Any metadata providing additional context and information about the Product, used for filtering and organization purposes.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/create-product.png" 
	url="/images/gitops-products/create-product.png" 
	alt="Add Product" 
	caption="Add Product"
  max-width="60%" 
%}

{:start="4"}
1. Click **Add**. The Product is displayed in the Products dashboard. 



## GitOps Products dashboard

Here's an example of the Products dashboard.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="60%" 
%}

The table describes the information displayed in the Products dashboard.

{: .table .table-bordered .table-hover}
| Item             | Description              | 
| --------------    | --------------           |
|**Search and Filters**              | Predefined filters that allow you to customize the Products dashboard view by Product Name, Application, or by Environment. <br>See [Search/filter applications in Products](#searchfilter-applications-in-products).| 
|**Default & expanded views**              |{::nomarkdown}<ul><li><b>Collapsed view</b>: The default view displays the product name alongside the environments with the number of applications in each environment.</li><li><b>Expanded view</b>: The expanded view displays the applications organized by their environments, including version information.<br>Currently supported for Helm-based applications, the version is the version of the Helm chart identifying the specific release of the application in the different environments. Clicking the version displays additional information and options.<br>See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#identify-application-versions-in-different-environments">Identify application versions in different environments</a>.</li></ul>{:/}|
|**Application views** |Clicking the Product name takes you to the detailed view of its applications with pod, Git, and feature information. See [Explore application views for Products](#explore-application-views-for-products).|
|**Actions**| In both the collapsed and expanded views, mouse over the row with the Product displays possible actions:{::nomarkdown}<ul><li><img src="../../../images/icons/edit.png?display=inline-block"> <b>Edit</b>: Edit the Product's settings. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li><li><img src="../../../images/icons/settings.png?display=inline-block"> <b>Manage Applications</b>: Manually assign unassigned applications to environments in the Products dashboard. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#manually-assign-applications-to-products">Manually assign applications to Products</a>.</li><li><img src="../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Delete Product from the Products dashboard. Deleting a Product removes its name from the Products dashboard, and unassigns the applications manually assigned to it in the Products dashboard. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li></ul>{:/} |

## Working with Products

Once you create a Product, you can assign applications to the Product, unassign applications from a Product, edit the Product's settings, or delete the Product. 


### Manually assign applications to Products
Manually assign an application to a Product directly from the Products dashboard. This is an alternative to assigning applications that are not connected to a Product through annotations in the application's manifest. 

Search for the application by the name of the application, cluster, or namespace mapped for the Product. When assigned to a product, Codefresh identifies and automatically adds it to the column with the correct environment.



1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Do one of the following:
  * Click the name of the Product for which to assign applications, and then click **Manage Apps** on the top right.
  * Mouse over the row with the Product name and click {::nomarkdown}<img src="../../../../images/icons/trash.png?display=inline-block">{:/}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-apps-option.png" 
	url="/images/gitops-products/assign-apps-option.png" 
	alt="Option to assign applications to Product" 
	caption="Option to assign applications to Product"
  max-width="60%" 
%}

{:start="3"}
1. Below the list of **Unassigned apps**, select the **Environment** by which to filter unassigned applications, or type a part of the application name in the search field.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-apps-in-product.png" 
	url="/images/gitops-products/unassigned-apps-in-product.png" 
	alt="Unassigned applications in Product" 
	caption="Unassigned applications in Product"
  max-width="60%" 
%}

{:start="4"}
1. To assign the application, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/}.  
1. To confirm the assignment, click **Save**. 
  Codefresh adds the application to the environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-to-env.png" 
	url="/images/gitops-products/assign-app-to-env.png" 
	alt="Application assigned to Product" 
	caption="Application assigned to Product"
  max-width="60%" 
%}


### Use annotations to connect applications to Products
Connect an application to a Product by adding the default or custom annotation to the application's manifest.
The annotation is defined as part of the Product's settings when creating Products.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Mouse over the row with the Product name, and then click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
1. In the Edit Product form, copy the annotation to add to the application's manifest.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/copy-annotation.png" 
	url="/images/gitops-products/copy-annotation.png" 
	alt="Copy annotation for Product" 
	caption="Copy annotation for Product"
  max-width="60%" 
%}

{:start="4"}
1. Expand the Product.
1. From the application's context menu, select **Edit**.
1. In the **Configuration** tab, switch to the **YAML** format and add the annotation.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/add-annotation-app-manifest.png" 
	url="/images/gitops-products/add-annotation-app-manifest.png" 
	alt="Add annotation to application manifest" 
	caption="Add annotation to application manifest"
  max-width="60%" 
%}

{:start="7"}
1. Commit to save the changes.

### Unassign an application from a Product
Unassign an application from a Product directly from the Products dashboard. This is a quick option for applications manually assigned to Products from the Products dashboard.

>**TIP:**  
If you used annotations to connect applications to Products, to unassign the application, remove the annotation from the application manifest.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Do one of the following:
  * Mouse over the row with the Product from which to unassign the application.
  * Select the Product with the application to unassign and click **Manage Apps**.
1. In the card with the application to unassign, click {::nomarkdown}<img src="../../../images/icons/unassign-app.png?display=inline-block">{:/}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassign-app-from-product.png" 
	url="/images/gitops-products/unassign-app-from-product.png" 
	alt="Unassign application from Product" 
	caption="Unassign application from Product"
  max-width="60%" 
%}

{:start="4"}
1. To confirm, click **Save**.
  The application reappears in the list of Unassigned applications. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-app-example.png" 
	url="/images/gitops-products/unassigned-app-example.png" 
	alt="Unassigned application in list" 
	caption="Unassigned application in list"
  max-width="60%" 
%}

### Resolve conflicts for application assigned to multiple Products
Resolve conflicts when the same application is assigned to more than one Product. Unassign the application from any one of the Products.

When Codefresh detects an application assigned to two different Products, it alerts you of the same through a popup in the UI.
This conflict typically occurs when you manually assign an application to a Product from the Unassigned list, and then add an annotation to the same application's manifest connecting it to a different Product.



### Edit/delete Product
Edit settings for an existing Product, or delete the Product from the Products dashboard.

Edit all settings including the name of the Product.

Delete a Product from the Products dashboard. Deleting a Product unassigns all the applications manually assigned to it in the Products dashboard. 
For applications connected through annotations in their manifests, the annotations are not deleted.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. From the Products dashboard, select the Product to edit or delete.
1. From the context menu on the right, select the required option.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/edit-delete-product.png" 
	url="/images/gitops-products/edit-delete-product.png" 
	alt="Edit/delete Product" 
	caption="Edit/delete Product"
  max-width="80%" 
%}

{:start="4"}
1. Edit settings, or follow the instructions to delete the Product.

## Working with applications in a Product
Selecting a Product displays the applications assigned to that Product organized by environments, and provides different options to view and manage them.  

The actions to manage applications in a Product are similar to those available in the Environments dashboard.  
In addition, the Product-applications view offers a different a set of filters, and the ability to switch between views with different aspects of information.

### Search/filter applications in Products
For the selected Product, search for a specific application, or locate the applications of interest through filters.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/product-app-view-filters.png" 
	url="/images/gitops-products/product-app-view-filters.png" 
	alt="Product view: Search/filter applications" 
	caption="Product view: Search/filter applications"
  max-width="60%" 
%}

##### Search  
Search by free-text to locate the applications you need.

##### Filters
* Image name: The image created for the application.
* Committer: The user who committed the change. 
* Jira ticket: The bug or feature request that initiated the change.


### Explore application views in Products
Switch between Kubernetes (Pods), version control (Git) and issue-tracking (Features) views of the applications assigned to the selected Product. Identify the technical details on the deployment, the latest commit, and feature details important to the different stakeholders. 

Instead of switching between different systems to get answers to common questions that you have as a project or product manager, you can get your answers for  all the applications in the Product through the different view modes. 



#### Pods
Displays Deployment, Rollout, and Promotion information for the application:
* Deployments: Source image, new image and tag, replicas for each deployment
* Rollouts: Type of rollout, health, promote/pause rollout action
* Promotion details: Reason, user who committed the change, and the commit hash
* Cluster and namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/pod-view-deployments.png" 
	url="/images/gitops-products/pod-view-deployments.png" 
	alt="Products: Pod view of application with Deployments" 
	caption="Products: Pod view of application with Deployments"
  max-width="60%" 
%}

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/pod-view-rollouts.png" 
	url="/images/gitops-products/pod-view-rollouts.png" 
	alt="Products: Pod view of application with Rollouts" 
	caption="Products: Pod view of application with Rollouts"
  max-width="60%" 
%}

#### Git
Displays version control information to track changes, code history, and collaboration, showing the evolution of the application's codebase. Useful for project managers and developers to trace: 
* Pull request history
* Committer information
* Commit message
* Promotion information
* Cluster and namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/git-view.png" 
	url="/images/gitops-products/git-view.png" 
	alt="Products: Git view of application" 
	caption="Products: Git view of application"
  max-width="60%" 
%}

#### Features
Displays issue-tracking information that correlates software features with their deployment, showing which features are included in a release. Useful for project/product managers to identify which feature is in production and when it was released into production.
* Bug/feature request and description
* User to whom the bug/feature request is assigned
* Status of the bug/feature request
* Promotion information
* Cluster and namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/features-view.png" 
	url="/images/gitops-products/features-view.png" 
	alt="Products: Features view of application" 
	caption="Products: Features view of application"
  max-width="60%" 
%}



### Identify application versions in different Environments
Identify the version of the application deployed in different Environments to track the progress of the applications, understand the changes made, and ensure that customers are using the latest or most appropriate release.

Codefresh does more than just show you the version of the application currently deployed in an Environment. Our UI provides intuitive diff views of Environments. 
You can:  
* View the charts (dependencies) deployed with the application and the release for each
* Compare dependency versions with applications in different environments

##### How to
1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Click the version number of the application.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/version-info.png" 
	url="/images/gitops-environments/version-info.png" 
	alt="Helm chart version for application" 
	caption="Helm chart version for application"
  max-width="60%" 
%}

{:start="3"}
1. Switch been **Table** and **YAML** views to see the dependencies and their versions.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/version-table-yaml-view.png" 
	url="/images/gitops-environments/version-table-yaml-view.png" 
	alt="Table and YAML views of chart dependencies" 
	caption="Table and YAML views of chart dependencies"
  max-width="60%" 
%}




### Compare dependency versions and diffs across Environments

Compare the versions of dependencies dependency in the same application across different Environments. View detailed or summarized diffs for Helm charts, values, and Kubernetes resource definitions between an application in two Environments.  

* The tabular view displays a complete list of all dependencies and their versions across more than two Environments.  
* The YAML view displays a diff between two Environments.

##### How to
1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. Click the version number of the application.
1. To compare the versions of dependencies in the selected application  across different Environments, enable **Compare**.
1. Select the Environments with the applications to compare to. 
1. To compare the versions of the dependencies for the applications in the selected Environments, switch to **Table** view.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/app-dependency-list.png" 
	url="/images/gitops-products/app-dependency-list.png" 
	alt="App dependencies and versions" 
	caption="App dependencies and versions"
  max-width="60%" 
%}

{:start="6"}
1. To see the actual diffs between the applications, switch to **YAML** view, and then toggle between **Full**/**Compact** views.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/version-compare-apps.png" 
	url="/images/gitops-environments/version-compare-apps.png" 
	alt="Compare versions for dependencies in different Environments" 
	caption="Compare versions for dependencies in different Environments"
  max-width="60%" 
%}



### View deployment (Timeline) history for applications
Review the deployments for an application. Clicking the application name takes you to the familiar Timeline tab in the GitOps Apps dashboard with the deployment history for the application. See [Monitor deployments for selected Argo CD application]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#monitor-deployments-for-selected-argo-cd-application).
 
1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
1. In the Environment column with the application, click the application name to view deployment history.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-timeline-view.png" 
	url="/images/gitops-environments/app-timeline-view.png" 
	alt="View deployment history for Argo CD application from GitOps Environments" 
	caption="View deployment history for Argo CD application from GitOps Environments"
  max-width="60%" 
%}

{:start="3"}
1. To view all the application's tabs, including the Current State, Configuration, and others, click the link to **Full View** at the top of the deployment view.

### Manage applications in Products
Manage applications from within Products through the application's context menu, including manual sync, refresh, and other options.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Select the Product with the application for which to take action.
1. Click the context menu to the right of the application, and select the option:
  * [Quick View]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/#view-deployment-configuration-info-for-selected-argo-cd-application): View deployment, definition, and event information for the selected application in the same location.
  * [Synchronize]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-synchronize-an-argo-cd-application): Manually synchronize the application to expedite Git-to-cluster sync. 
  * [Edit]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-argo-cd-application-definitions): Update General or Advanced configuration settings for the application.
  * [Refresh/Hard Refresh]({{site.baseurl}}/docs/deployments/gitops/manage-application/#refreshhard-refresh-argo-cd-applications): As an alternative to manually syncing an application, either sync the application with the desired state in Git (refresh), or sync the application with the desired state Git while removing the cache (hard refresh). 
  * [Delete]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-argo-cd-applications): Delete the application from Codefresh.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/app-context-menu-in-product.png" 
	url="/images/gitops-products/app-context-menu-in-product.png" 
	alt="Context menu with actions for Argo CD applications within Products" 
	caption="Context menu with actions for Argo CD applications within Products"
  max-width="60%" 
%}

## Related information
[GitOps Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)   
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)