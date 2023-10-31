---
title: "GitOps Products"
description: ""
group: dashboards
toc: true
---



Products are a way to group Argo CD applications in Codefresh. The Products dashboard offers a unified view of your application landscape within various environments. 


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="60%" 
%}

**What are the benefits of Products?**  

* Group applications  
  Assign and connect applications to logical Products for a more consolidated perspective on application management. For example, connect all billing applications to the Billing product.

* Bridge applications and environments  
  By creating Products and linking applications, the Products dashboard efficiently bridges the gap between applications and their respective environments. 

* Unified insights
  The streamlined view of application status and deployment across different environments simplifies decision-making and troubleshooting.


**How do you view applications by Product?**  
The flow to view applications by Products involves two steps:  
* Create the Product
* Connect applications to the Product

The applications in a Product are organized by the [environments]({{site.baseurl}}/docs/dashboards/gitops-environments/) they belong to.



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

<!--- screenshot TBD -->

{:start="4"}
1. Click **Add**. The Product is displayed in the Products dashboard. 

## Products dashboard

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
|**Filters**              | Predefined filters that allow you to customize the Products dashboard view by Product Name, Application, or by Environment. | 
|**Default & expanded views**              |{::nomarkdown}<ul><li><b>Collapsed view</b>: The default view displays the product name alongside the environments with the number of applications in each environment.</li><li><b>Expanded view</b>: The expanded view displays the applications by their environments..</li></ul>{:/}|
|**Actions**| In both the collapsed and expanded views, mouse over the row with the product to see possible actions:{::nomarkdown}<ul><li><img src="../../../images/icons/edit.png?display=inline-block"> <b>Edit</b>: Edit the product's settings.</li><li><img src="../../../images/icons/settings.png?display=inline-block"> <b>Manage Applications</b>: Manually assign unassigned applications to environments in the Products dashboard. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#manually-assign-applications-to-products">Manually assign applications to products</a>.</li><li><img src="../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Delete product from the Products dashboard. Deleting a product removes the product name from the Products dashboard, and unassigns the applications manually assigned to the product in the Products dashboard.</li></ul>{:/} |

## Working with Products

Once you create a Product, you can assign applications to the Product, unassign applications, edit the Product's settings, or delete the Product . 


### Manually assign applications to products
Manually assign an application to a product directly from the Products dashboard. This is an alternative to assigning applications that are not connected to a product through annotations in the application's manifest. 

Search for the application by the name of the application, cluster, or namespace mapped for the product. When assigned to a product, the application is automatically added to the column with the correct environment.


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
1. To assign the application, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/}.  
1. To confirm the assignment, click **Save**. 
  The application is added to the environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-to-env.png" 
	url="/images/gitops-products/assign-app-to-env.png" 
	alt="Application assigned to Product" 
	caption="Application assigned to Product"
  max-width="60%" 
%}


### Use annotations to connect applications to products
Connect an application to a product by adding the default or custom annotation to the application's manifest.
The annotation is defined as part of the Product's settings when creating Products.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Mouse over the row with the product name, and then click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
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
1. Expand the Product.
1. From the application's context menu, select **Edit**.
1. In the **Configuration** tab, switch to the **YAML** format and add the annotation.
1. Commit to save the changes.

### Unassign an application from a Product
Unassign an application from a Product directly from the Products dashboard. This is a quick option for applications manually assigned to Products from the Products dashboard.

>**TIP:**  
If you used annotations to connect applications to Products, to unassign the application, remove the annotation from the application manifest.

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Do one of the following:
  * Mouse over the row with the product from which to unassign the application.
  * Select the product with the application to unassign and click **Manage Apps**.
1. In the card with the application to unassign, click {::nomarkdown}<img src="../../../images/icons/unassign-app.png?display=inline-block">{:/}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassign-app-from-product.png" 
	url="/images/gitops-products/unassign-app-from-product.png" 
	alt="Unassign application from product" 
	caption="Unassign application from product"
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

### Edit/delete Product
Edit settings for an existing Product, or delete the Product from the Products dashboard.

Edit all settings including the name of the product.

Delete a product from the Products dashboard. Deleting a Product unassigns all the applications manually assigned to it in the Products dashboard. 
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
  max-width="60%" 
%}

{:start="4"}
1. Edit settings, or follow the instructions to delete the Product.

## Working with applications in a Product
Selecting a Product displays the applications assigned to that Product organized by environments, and provides different options to view and manage them.  

The actions to manage applications in a Product are similar to those available in the Environments dashboard.  
In addition, the Product-applications view offers a different a set of filters, and the ability to switch between views different aspects of information.

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

**Search**  
Search by free-text to locate the applications you need.

**Filters**  
* Image name: The image created for the application.
* Committer: The user who committed the change. 
* Jira ticket: The bug or feature request that initiated the change.


### Explore application views for Products
Switch between Kubernetes (Pods), version control (Git) and issue-tracking (Features) views of the applications assigned to the selected Product.  
<br>
<br>

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

## Related information
[GitOps Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)