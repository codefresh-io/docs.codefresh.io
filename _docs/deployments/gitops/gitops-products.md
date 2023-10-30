---
title: "Products dashboard"
description: ""
group: dashboards
toc: true
---

The Products dashboard is a way to view Argo CD applications in Codefresh 

Products are a way to group Argo CD applications in Codefresh, and the Products dashboard offers a unified view of these applications in across environments different environments. It offers cons

How do you view applications by product?
Create a product

Connect an application to a product

View information for product and its applications

Dive into a unified view of app insights , all in the Products dashboard.
Products connect your applications across different environments for streamlined management.

## Argo CD applications & environments in Product
Products  to envitonments in that the show the applications connected to them by the environments in which thse applications are deployed.

Products connect your applications across different environments for streamlined viewing and management.

## Create products
Create a product with a unique name and define the annotations by which to connect different Argo CD applications to a product.

## Products dashboard

Here's an example of the Products dashboard.
 TO BE CHANGED
{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/environments-dashboard.png" 
	url="/images/gitops-environments/environments-dashboard.png" 
	alt="GitOps Environment dashboard" 
	caption="GitOps Environment dashboard"
  max-width="60%" 
%}

The table describes the information displayed in the Products dashboard.

{: .table .table-bordered .table-hover}
| Item             | Description              | 
| --------------    | --------------           |
|**Filters**              | Predefined filters that allow you to customize the Products dashboard view by Product Name, Application, or by Environment. | 
|**Default & expanded views**              | . {::nomarkdown}<ul><li><b>Collapsed view</b>: The default view displays the product name alongside the environments with the number of applications in each environment. <br> <img src="../../../../images/gitops-products/collapsed-view.png?display=inline-block" width="70%"></li><li><b>Expanded view</b>: The expanded view displays the applications by their environments. <br><img src="../../../../images/gitops-products/expanded-view.png?display=inline-block" width="70%">.</li></ul>{:/}|
|**Actions**| In both the collapsed and expanded views, mouse over the row with the product to see possible actions:{::nomarkdown}<ul><li><img src="../../../../images/icons/edit.png?display=inline-block"> <b>Edit</b>: Edit the product's settings.</li><li><img src="../../../../images/icons/settings.png?display=inline-block"> <b>Manage Applications</b>: Manually assign unassigned applications to environments in the Products dashboard. See <a href="https://codefresh.io/docs/docs/deployments/gitops/gitops-products/#manually-assign-applications-to-products">Manually assign applications to products</a>.</li><li><img src="../../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Delete product from the Products dashboard. Deleting a product removes the product name from the Products dashboard, and unassigns the applications manually assigned to the product in the Products dashboard.</li></ul>{:/} |

## Working with Products

## Assign applications to products
There are two ways to assign/connect an application to a Product:
1. Products dashboard: Manually assign the application to the product through a single-click
1. Application manifest: Add the product annotation to the application's manifest 





### Manually assign applications to products
Manually assign an application to a product directly from the Products dashboard. This is an alternative to connecting an application to a product through an annotation in the application's manifest. 

Search for the application by the name of the application, cluster, or namespace mapped for the product. When assigned to a product, based on its defined environment, the application is automatically added to the column with the correct environment.


1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Do one of the following:
  * Click the name of the product for which to assign applications, and then click **Manage Apps** on the top right.
  * Mouse over the row with the product name and click {::nomarkdown}<img src="../../../../images/icons/trash.png?display=inline-block">{:/}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-apps-option.png" 
	url="/images/gitops-products/assign-apps-option.png" 
	alt="Option to assign applications to product" 
	caption="Option to assign applications to product"
  max-width="60%" 
%}

{:start="3"}
1. Below the list of **Unassigned apps**, select the **Environment** by which to filter unassigned applications, or type a part of the application name in the search field.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-apps-in-product.png" 
	url="/images/gitops-products/unassigned-apps-in-product.png" 
	alt="Unassigned applications in product" 
	caption="Unassigned applications in product"
  max-width="60%" 
%}

{:start="4"}
1. To assign the application, click {::nomarkdown}<img src="../../../../images/icons/runtime-topology-in-cluster.png?display=inline-block">{:/}.  
1. To confirm the assignment, click **Save**. 
  The application is added to the environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-apps-in-product.png" 
	url="/images/gitops-products/unassigned-apps-in-product.png" 
	alt="Unassigned applications in product" 
	caption="Unassigned applications in product"
  max-width="60%" 
%}


### Use annotations to connect applications to products
Assign an application to a product by adding the default or custom annotation to the application's manifest.
The annotation is the default or any custom annotation you defined for the product when you created it.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Mouse over the row with the product name, and then click {::nomarkdown}<img src="../../../../images/icons/edit.png?display=inline-block">{:/}.
1. In the Edit Product form, copy the annotation to add to the application's manifest.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-apps-in-product.png" 
	url="/images/gitops-products/unassigned-apps-in-product.png" 
	alt="Unassigned applications in product" 
	caption="Unassigned applications in product"
  max-width="60%" 
%}

{:start="4"}
1. Expand the product.
1. From the application's context menu, select **Edit**.
1. In the **Configuration** tab, switch to the **YAML** format and add the annotation.
1. Commit to save the changes.

### Unassign an application from a Product
Unassign an application from a Product directly from the Products dashboard. This is a quick option for applications manually assigned to Products from the Products dashboard.

>**TIP:**  
If you used annotations to connect applications to Products, remove the annotation from the application manifest to unassign the application.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Do one of the following:
  * Mouse over the row with the product from which to unassign the application.
  * Select the product with the application to unassign and click **Manage Apps**.
1. In the card with the application to unassign, click {::nomarkdown}<img src="../../../../images/icons/unassign-app.png?display=inline-block">{:/}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassign-app-from-product.png" 
	url="/images/gitops-products/unassign-app-from-product.png" 
	alt="Unassign application from product" 
	caption="Unassign application from product"
  max-width="60%" 
%}


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

### Edit/delete Product
Edit settings for an existing Product, or delete the Product from the Products dashboard.

Edit all settings including the name of the product.
Delete a product from the Products dashboard. Deleting a Product unassigns all the applications manually assigned to it in the Products dashboard. 
For applications connected through annotations in the manifests, the annotations are not deleted.

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
  max-width="60%" 
%}

{:start="4"}
1. Edit settings or follow the instructions to delete the Product.

## Work with applications in Products 
 The actions to manage applications are similar to those available in the Environments dasboard. 

In addition, the Product das

### Explore application views for products
Switch between Kubernetes (Pods), version control (Git) and issue-tracking (Features) views of the applications assigned to the selected Product.  

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
Displays version control information to track changes, code history, and collaboration, showing the evolution of the application's codebase:
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
Displays issue-tracking information that correlates software features with their deployment, showing which features are included in a release:
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

### Manage applications for products within environments
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