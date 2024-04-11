---
title: "GitOps Products"
description: "Create Products to group and manage interrelated Argo CD applications environments"
group: dashboards
toc: true
---






>**NOTE**  
This feature is currently in Beta.

Explore the power of Products for Argo CD applications in Codefresh GitOps. 

Products introduce a new dimension to managing Argo CD applications, enabling you to group different yet interconnected applications for comprehensive management and deployment.

The Products dashboard serves as a centralized location for viewing and managing complex applications within their deployment environments. 



##### What is a Product in Codefresh GitOps?
In Codefresh GitOps, a Product is a custom entity that allows you to group interconnected Argo CD applications, providing a cohesive view as the applications progress through the development and deployment lifecyle.  

Consider a practical scenario of numerous applications connected to billing or payment. Instead of monitoring each application separately, creating a Product enables you to track and manage them collectively.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="70%" 
%}

Read more on the world's first dashboard for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/)[](gitops-environments.md){:target="\_blank"}.

##### What are the benefits of Products?  

* Application grouping  
  Easily group and connect interrelated Argo CD applications through Products. Assign applications to logical Products for a consolidated perspective. For example, streamline all billing applications within the Billing Product. 

* Bridging applications and Environments  
  By creating Products and linking applications to them, the Products dashboard efficiently bridges the gap between applications and their respective Environments. Easily track which applications are deployed in specific Environments and monitor their journey through them.

* Unified insights   
  Beyond traditional sync and Git hash deployment, the Products dashboard offers real-time insights by syncing with the software lifecycle of applications. 
  Insights from issue-tracking systems, for example, provide information on promoted features and their inclusion in each release. Project and product managers can gain a clear understanding of deployed changes without relying solely on developer input.

##### How do you view applications by Product?  
In just two simple steps:

1. [Create the Product](#create-products)  
  Begin by creating a Product, and assigning a meaningful name based on your use case.

1. [Connect applications to the Product](#assigning-applications-to-products)  
  Bring your applications into the picture. Link applications to the Products you've created to create the associations you need. 

Codefresh seamlessly identifies and organizes the applications in the correct [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/).

The diagram illustrates how Argo CD applications connected to a Product are grouped by that Product and organized by Environments. It also shows applications not assigned to any Product.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by Products and organized by Environments" 
	caption="Argo CD applications grouped by Products and organized by Environments"
  max-width="70%" 
%}

You can then [work with Products](#working-with-products), and with [applications in Products](#working-with-applications-in-products).

## Understanding the role of Environments for Products

In the Products dashboard, the visibility of applications is closely tied to the definition and mapping of Environments. 

It's important to note that Products will not display any applications in these scenarios:

* No Environments defined
  If you have not created Environments in Codefresh, the Products dashboard will not display any applications, even when applications are assigned to Products. 

* Unmapped application cluster-namespace
  Even if Environments are defined, applications are not displayed within Products if their cluster-namespace is not mapped to any existing Environment. 

In summary, Environments play a crucial role in determining the visibility and organization 


## Create Products
Create a Product with a unique name and define the annotations through which to connect related Argo CD applications to it.

##### Before you begin
* Create one or more [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-gitops-environments) for applications

##### How to
1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for your Product, which is also unique in the cluster. 
    1. **Connect Applications**: The applications to associate with this Product by adding the default or custom annotation to the application manifest.  
      *  To use the default annotation, copy and paste it into the application's manifest.
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
1. Click **Add**. 
   The Product is displayed in the Products dashboard. 




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


As with Codefresh's dashbaords, filters allow you to customize the Products dashboard view by Product Name, Application, or by Environment. 

Here are some key features of the Products dashboard.

### Collapsed & expanded views
{::nomarkdown}<ul><li><b>Collapsed view</b>: The default view, displays the Product name alongside the Environments with the number of applications in each Environment.<br> The options on the right allow you to manage Product.  </li><li><b>Expanded view</b>: The expanded view displays the applications in the Product organized by their Environments.</li></ul>{:/} 

### Managing Products**
Mouse over the row with the Product to display possible actions:
{::nomarkdown}<ul><li><img src="../../../images/icons/edit.png?display=inline-block"> <b>Edit</b>: Edit the Product's settings. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li><li><img src="../../../images/icons/settings.png?display=inline-block"> <b>Manage Applications</b>: Manually assign unassigned applications to environments in the Products dashboard. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#manually-assign-applications-to-products">Manually assign applications to Products</a>.</li><li><img src="../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Remove the Product from the Products dashboard, unassigning any manually-assigned applications. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li></ul>{:/} |


### Explore applications in Product
Clicking on a Product name navigates you to a detailed view of its applications. Each application provides essential information such as sync and health status, deployment, and rollout details. 
 
In addition, the application version and enriched image information are especially useful.


##### Application version
* Version information, currently supported for Helm-based applications, identifies the specific release of the application in different Environments.
* Clicking the version displays the application's dependencies, enabling comparison across different applications.

See [View and compare deployed versions for dependencies](#view-and-compare-deployed-versions-for-dependencies).

##### Pod/Git/Feature information
* The Products dashboard correlates sync information with other parts of the software lifecycle, such as issue-tracking systems.
* Switch between Pods, Git, and Features views to gain insights beyond development, including source code commits, affected services, commit authorship, and incorporated features in releases. 

See [Application lifecycle insights with pods, Git and features](#application-lifecycle-insights-with-pods-git-feature-views).


##### Manage applications
Manage individual applications without navigating away from the Products dashboard. The actions available mirror those in the GitOps Apps dashboard. 




## Working with Products


### Assigning applications to Products
Manually assign an application directly from the Products dashboard, or by adding an annotation to the application's manifest.

#### Manually assign applications to Products
Manually assign an application to a Product directly from the Products dashboard. 

This is one of two methods for assigning applications to Products. The other method involves adding annotations to the application's manifest, as described in [Use annotations to connect applications to Products](#use-annotations-to-connect-applications-to-products).


1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. If needed, search for the application, or use the Application and Environment filters.
1. Do one of the following:
  * Click the name of the Product for which to assign applications, and then click **Manage Applications**.
  * Mouse over the row with the Product to which to assign the application, and click {::nomarkdown}<img src="../../../images/icons/settings.png?display=inline-block">{:/}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-apps-option.png" 
	url="/images/gitops-products/assign-apps-option.png" 
	alt="Options to manually assign applications to Product" 
	caption="Options to manually assign applications to Product"
  max-width="60%" 
%}

{:start="3"}
1. In the list of **Unassigned apps** on the left, if you have created Environments, select the **Environment** by which to filter unassigned applications, or in the search field, type a part of the application name.

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
  If you have defined an Environment for the application, Codefresh adds it to the Environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-to-env.png" 
	url="/images/gitops-products/assign-app-to-env.png" 
	alt="Application assigned to Product in defined Environment" 
	caption="Application assigned to Product in defined Environment"
  max-width="60%" 
%}


#### Use annotations to connect applications to Products
Connect an application to a Product declaratively by adding the default or custom annotation to the application's manifest.
The annotation is defined as part of the Product's settings.

This is one of two methods for assigning applications to Products. The other method is to manually assign them from the Products dashboard, as described in [Manually assigning applications to Prodcuts](#manually-assign-applications-to-products).

1. Copy the Product's annotation:
  1. In the Codefresh UI, from Ops in the sidebar, select **Products**.
  1. Mouse over the row with the Product name, and then select **Edit** {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
  1. In the Edit Product form, copy the annotation to add to the application's manifest and close the form.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/copy-annotation.png" 
	url="/images/gitops-products/copy-annotation.png" 
	alt="Copy annotation for Product" 
	caption="Copy annotation for Product"
  max-width="60%" 
%}

{:start="2"}
1. Add the annotation to the application's manifest:
  1. From Ops in the sidebar, select **GitOps Apps**.
  1. Select the application to which to add the annotation.
  1. Click the **Configuration** tab and switch to **YAML** format.
  1. Add the annotation as in the example below.

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

If you return to the GitOps Products dashboard and expand the Product, you'll now see the application as part of the Product.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-with-annotation.png" 
	url="/images/gitops-products/assign-app-with-annotation.png" 
	alt="Application assigned to Product through annotation" 
	caption="Application assigned to Product through annotation"
  max-width="60%" 
%}

### Unassigning applications from Products
Depending on how you assigned the application to the Product, unassign it either directly from the Products dashboard or by removing the annotation from its manifest.


##### Unassign application from the GitOps Product dashboard
Unassign an application manually assigned to a Product directly from the GitOps Products dashboard. 

A disabled icon indicates that the application is connected through an annotation. 

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Mouse over the row with the Product from which to unassign the application, and click **Manage Apps**.
1. In the card with the application to unassign, click {::nomarkdown}<img src="../../../images/icons/unassign-app.png?display=inline-block">{:/}.  
  You can see that the Unassign icon is dsiabled for the `guestbook-app-prod`.

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

##### Unassign application by removing annotation
1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Select the Product with the application to unassign.
1. In the card with the application to unassign, click the application name, and then click **Go to Full View**.
1. Click the **Configuration** tab and switch to YAML view.
1. Remove the annotation from the application's manifest.



### Resolve conflicts for application assigned to multiple Products
Resolve conflicts when the same application is assigned to more than one Product. Unassign the application from any one of the Products.

When Codefresh detects an application assigned to two different Products, it alerts you of the same through a popup in the UI.
This conflict typically occurs when you manually assign an application to a Product from the Unassigned list, and then add an annotation to the same application's manifest connecting it to a different Product.



### Edit/delete Products
Edit settings for an existing Product or delete the Product from the Products dashboard.

* **Edit**: Update settings for the Product, including the name of the Product, and the annotations defined for it. 
* **Delete**: Delete a Product from the Products dashboard. Deleting a Product unassigns all the applications manually assigned to it in the Products dashboard. If the application is connected through an annotation, the annotation is not deleted.

##### How to
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

## Working with applications in Products
Selecting a Product displays the applications assigned to that Product, organized by the Environments defined for them.

{{site.data.callout.callout_tip}}
**TIP**  
**Products, applications, and Environments**  
Applications assigned to Products are only valid in the context of the Environment to which they belong.  
If you haven't created an Environment, or if the applications in the Product are not in the cluster or namespace mapped to existing Environments, selecting the Product displays an empty page. 
{{site.data.callout.end}}

### View and compare deployed versions for dependencies
View the dependencies included with each application, and compare versions of the application and dependencies deployed in different Environments. Track the progress of the applications, understand the changes made, and ensure that customers are using the latest or most appropriate release.

**Table and YAML views**
* Table: Compare more than two applications.
* YAML: Compare up to two applications.

**Dependency chart versions**
* List the charts (dependencies) deployed with the application and the release version for each
* Compare versions of dependencies in the different applications
* Show a concise view of the 



##### How to
1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Expand the Product with the applications you want to view/compare. 
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
1. To compare different applications, enable **Compare**.
1. Click within the field **Select applications to compare**, and select the applications.
    When selecting up to two applications, you can switch between YAML and Table views.  
	When selecting more than two applications, the comparison view automatically switches to the **Table** view.
<!--- add here new screenshot and also step describing what is Summary View> -->  

### Unified insights with Pod, Git, Feature views  
Navigate seamlessly between Kubernetes (Pods), version control (Git), and issue-tracking (Features) views of the applications assigned to the selected Product.

From the same location, get the information you need as a stakeholder, be it technical details on the deployment, information on the latest commit that caused the deployment, or features included in releases.  



#### Pods
Deployment, Rollout, and Promotion information for the application.
* Deployments: Source image, new image and tag, replicas for each deployment
* Rollouts: The services rolled out, the type of rollout, the result of the rollout, promote/pause rollout action
* Promotion: The change that resulted in the promotion, with details on who committed the change, and the commit hash
* Cluster and Namespace the application is deployed to

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
Version control information to track changes, code history, and collaboration, showing the evolution of the application's codebase.  

Useful for project managers and developers to trace: 
* PR (pull request) history
* Committer and commit information
* Promotion
* Cluster and Namespace the application is deployed to

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
Issue-tracking information linking features with their deployment.
* Bug/feature request and description
* User to whom the bug/feature request is assigned
* Status of the bug/feature request
* Promotion information
* Cluster and Namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/features-view.png" 
	url="/images/gitops-products/features-view.png" 
	alt="Products: Features view of application" 
	caption="Products: Features view of application"
  max-width="60%" 
%}





### View deployment (Timeline) history for applications
Review the deployments for a specific application in the Products dashboard. 

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. In the Environment column with the application you require, click the application name to view deployment history.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-timeline-view.png" 
	url="/images/gitops-environments/app-timeline-view.png" 
	alt="View deployment history for application from Environments dashboard" 
	caption="View deployment history for application from Environments dashboard"
  max-width="60%" 
%}
1. To view all the application’s tabs, including the Current State, Configuration, and others, click the link to **Full View** at the top of the deployment view.


### Manage applications in Products
Manage applications grouped within a Product through each application's context menu, that includes manual sync, refresh, and other options.

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

## Troubleshooting Products

Here are a few tips to troubleshoot issues you may encounter 

### Applications not displayed for Product
You have created the Product but not assigned or connected any applications to it.

You must assign every application to the Product, either directly in the Products dashboard or through an annotation in the application's manifest.  
See [Assigning applications to Products](#assigning-applications-to-products).

### Applications assigned to Products not displayed 

##### Issue
Applications assigned to a Product are not displayed in the Products dashboard.

##### Possible cause
One of the following:
* No Environments created
* Application does not exist in the clusters-namespaces mapped to existing Environments.

##### Possible solution
Applications assigned to Products are only relevant in the context of the Environments they are defined in.
Either create an Environment or add the cluster-namespace defined for the application to the existing Environment's definition.

**Create an Environment**
Create one as described in ???.


**Add application's destination settings to Environment definition**
1. Update Environment settings:
   * In the Codefresh UI, from the Ops in the sidebar, select **Environments**.
     In the example below, there are two Environments defined: `test` and `prod`. There are no applications in the `test` Environment.
   
   {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/trble-env-without-apps.png" 
	url="/images/gitops-products/trble-env-without-apps.png" 
	alt="Defined Environment without applications" 
	caption="Defined Environment without applications"
  max-width="70%" 
  %}
   
   * Mouse over the toolbar for the Environment and click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
   * Check the **Clusters and Namespaces** mapped to the Environment.
    In the example, the namespace `dev` is mapped to this Environment.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/trble-edit-env-settings.png" 
	url="/images/gitops-products/trble-edit-env-settings.png" 
	alt="Example: Environment settings" 
	caption="Example: Environment settings"
  max-width="70%" 
  %} 
  * Add the namespace defined for the application to the Environment settings.
{:start="2"}
1. Go back to the Products dashboard.
  You will now see your application in the Product and in the correct Environment.
<!--- add screenshot -->
## Related articles
[GitOps Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)   
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)