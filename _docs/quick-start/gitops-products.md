---
title: "Quick start: Environments & Products in Codefresh GitOps"
description: "Understand and leverage power of Codefresh's Environment and Product entities for applications"
group: quick-start
toc: true
---


If you have been working with Codefresh GitOps, you must be familiar working with Argo CD applications in Codefresh.


This quick start introduces Environments and Products in Codefresh GitOps as the next dimensions to empower Argo CD application development and deployment in Codefresh.

## About Environments & Products

**What is an Environment in Codefresh?**  
As a developer, you must be familair with the role of environments in the lifecyle of applications. 
In Codefresh GitOps, an Environment is a custom entity, identified by a unique name, comprising one or more pairs of clusters and namespaces. Once defined, an Environment is automatically populated by the applications deployed to it. 

**What is a Product in Codefresh?**  
A Product unifies individual but interrelated Argo CD applications as a cohesive entity as they move through different Environments.
The Argo CD applications grouped within a Product generally has the same software but different versions as they are deployed in diverse Environments.


 
## Create an Environment
The first task is to create an Environment.
You can create as many Environments as you need to, 

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your GitOps Environment, which is meaningful in the context of your development and deployment cycle. 
	  For the quick start, we'll use `dev`.
    1. **Kind**: The purpose of this GitOps Environment. Select **Non-production** where development, testing, staging versions of applications are deployed.

    1. **Tags**: Leave empty.
    1. **Clusters and Namespaces**: Single or multiple cluster-namespace pairs to map to the GitOps Environment. 
	  For the quick start, we'll add the `in-cluster` and the `demo-ta-dev` namespace.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/environment-add.png" 
	url="/images/quick-start/envionments-products/environment-add.png" 
	alt="Quick start: Create an Environment" 
	caption="Quick start: Create an Environment"
  max-width="60%" 
%} 

{:start="3"}  
1. Click **Add**.  
  The environment is displayed in the Environments dashboard. 

## Create & work with Products

### Identify applications in GitOps Apps dashboard

In the GitOps Apps dashboard, identify the applications you want to group as a Product.
Look for different versions of the same software deployed in different Environments, using more or less the same microservices with similar dependencies. 
These are the applications you would want to group and monitor as a Product.

In the example below, we have three versions of the `demo-trioapp`application: `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod` for which we'll create a Product. 


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/envionments-products/products-gitops-apps.png" 
url="/images/quick-start/envionments-products/products-gitops-apps.png" 
alt="Argo CD applications in GitOps Apps dashboard" 
caption="Argo CD applications in GitOps Apps dashboard" 
max-width="70%" 
%}


### Create `demo-trioapps` Product
Once you know which applications you want to group as a Product, create the Product.
A Product requires a unique name, and optionally an annotation using which you can connect different Argo CD applications to it.

##### Before you begin
* Make sure you have [created at least one Environment](#create-an-environment)

##### How to

1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for the Product, `demo-trioapps` for the quick start.
    1. **Connect Applications**: The annotation to associate with this Product and use to connect different applications to it.  
	  For the quick start, we'll use the default annotation automatically created, `codefresh.io/product: demo-trioapps`. 
	1. Copy the annotation to the clipboard.
    1. **Tags**: For the quick start, leave empty.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-create.png" 
	url="/images/quick-start/envionments-products/products-create.png" 
	alt="Create Product" 
	caption="Create Product"
  max-width="60%" 
%}

{:start="4"}
1. Click **Add**.
   The Product is displayed in the Products dashboard. 
1. Click the Product name to view details.
   As you can see, the Product does not have any applications.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-no-apps-assigned.png" 
	url="/images/quick-start/envionments-products/products-no-apps-assigned.png" 
	alt="New Product with no applications" 
	caption="New Product with no applications"
  max-width="60%" 
%}

## Assign `demo-trio-app` applications to `demo-trioapp` Product
The next step after creating a Product, is to assign or connect applications to it.

There are two ways to assign applications to a Product in Codefresh:
* Manually assign an application directly from the Products dashboard
* Add an annotation to the application's manifest

### Manually assign an application to a Product
We'll use the manual method to assign the application `demo-trioapp-dev` to the `demo-trioapps` Product directly from the Products dashboard. 


1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Expand the new Product, `demo-trioapp` in our case. 
1. Click **Manage Applications**.
  The list of **Unassigned apps** are displayed on the left.
  You can see that the `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod` applications are not assigned to the Product `demo-trioapp`.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-no-apps-assigned.png" 
	url="/images/quick-start/envionments-products/products-no-apps-assigned.png" 
	alt="Product with unassigned applications" 
	caption="Product with unassigned applications"
  max-width="60%" 
%}

{:start="3"}
1. From the list of **Unassigned apps**, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/} next to the application name.  
  For the quick start, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/}next to `demo-trioapp-dev`.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-manually-assign-apps.png" 
	url="/images/quick-start/envionments-products/products-manually-assign-apps.png" 
	alt="Manually assign apps to Product" 
	caption="Manually assign apps to Product"
  max-width="60%" 
%}
 
1. To confirm the assignment, click **Save**. 
  Codefresh adds the application to the Environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-manually-assigned-app.png" 
	url="/images/quick-start/envionments-products/products-manually-assigned-app.png" 
	alt="Application assigned to Product in defined Environment" 
	caption="Application assigned to Product in defined Environment"
  max-width="60%" 
%}


### Add annotation to connect application to Product
We'll now try the second method, and connect an application to a Product declaratively, by adding an annotation to the application's manifest.

For the quick start, we'll use the default annotation Codefresh generated when you created the Product.

1. If needed, copy the Product's annotation.
  If not, continue from _Step 2_.
  1. In the Products dashboard, mouse over the row with the Product name, and then select **Edit** {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
  1. In the Edit Product form, copy the annotation and close the form.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-copy-annotation.png" 
	url="/images/quick-start/envionments-products/products-copy-annotation.png" 
	alt="Copy annotation from Product" 
	caption="Copy annotation from Product"
  max-width="60%" 
%}

{:start="2"}
1. Add the annotation to the application's manifest:
  1. From Ops in the sidebar, select **GitOps Apps**.
  1. Select the application to which to add the annotation. For the quick start, we'll add it to `demo-trioapp-prod`.
  1. Click the **Configuration** tab and switch to **YAML** format.
  1. Add the annotation as in the example below.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-add-annotation-manifest.png" 
	url="/images/quick-start/envionments-products/products-add-annotation-manifest.png" 
	alt="Add annotation to application manifest" 
	caption="Add annotation to application manifest"
  max-width="60%" 
%}

  {:start="5"}
  1. Commit to save the changes.

{:start="3"}
1. Return to the Products dashboard and select the Product, `demo-trioapp` in our case.
  Both applications are displayed as part of the Product.

{% include 
	image.html 
	lightboimages/quick-start/envionments-products/products-gitops-apps.png" 
	url="/images/quick-start/envionments-products/products-gitops-apps.png" 
	alt="Applications assigned to Product" 
	caption="Applications assigned to Product"
  max-width="60%" 
%}




### Explore the Products dashboard

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

The Products dashboard displays the Products created, with or without the applications connected to each Product. <br>
Clicking a Product shows detailed information on its applications.  

In the quick start, we'll focus on these key features: application versions and enriched insights.

### Application version information
Helm-based applications display the release version of the application in the Environment. This is the version of the Helm chart identifying the specific release version of the application in the different environments. 

You can:
* View the application's dependencies and their versions
* Compare release versions of the dependencies across deployments in different Environments

##### View application dependencies
1. Click the version to display the application's dependencies.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-app-version-number.png" 
	url="/images/quick-start/envionments-products/products-app-version-number.png" 
	alt="Helm chart version for application" 
	caption="Helm chart version for application"
  max-width="60%" 
%}


##### Compare deployed versions for applications
Compare the dependency versions in the different applications associated with the Product.

1. In the same panel, to compare different applications, enable **Compare**.
1. Click within the field **Select applications to compare**, and select the applications.
  * When selecting up to two applications, you can switch between YAML and Table views.  
  * When selecting more than two applications, the comparison view automatically switches to the **Table** view.

For the quick start, the versions for the dependencies are identical in all the three applications.
Notice that the quick start also includes the `demo-trioapp-qa` application.



### Contextual insights for applications 
When you select a Product from the Products dashboard, on the right, you can see three tabs entitled **Pods**, **Git**, and **Features**. 

These tabs give you additional Kubernetes (Pods), version control (Git), and issue-tracking (Features) information on the applications assigned to the selected Product.

From a single location:
* Identify technical details on the deployment
* Get information on the latest commit that caused the deployment
* Identify which features are deployed in production
* Track deployment timelines  

These real-time insights into the status of features and their deployment progress are useful to project and product managers to informed decisions, prioritize tasks effectively, and ensure alignment with project objectives.


#### Pods

When you select a Product, the Pods tab is the tab in focus by default.   
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


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/product-git-info.png" 
	url="/images/quick-start/envionments-products/product-git-info.png" 
	alt="Products: Git view of applications" 
	caption="Products: Git view of applications"
  max-width="60%" 
%}

#### Features


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/product-features-info.png" 
	url="/images/quick-start/envionments-products/product-features-info.png" 
	alt="Products: Features view of applications" 
	caption="Products: Features view of applications"
  max-width="60%" 
%}







