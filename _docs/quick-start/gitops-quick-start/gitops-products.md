---
title: "Quick start: Environments & Products in Codefresh GitOps"
description: "Understand and leverage power of Codefresh's Environment and Product entities for applications"
group: quick-start
toc: true
---


If you have been working with Codefresh GitOps, you must be familiar working with Argo CD applications in Codefresh.


This quick start introduces Environments and Products in Codefresh GitOps and  as the next dimensions to empower Argo CD application development and deployment in Codefresh.

We'll walk through creating an Environment and a Product, assign Argo CD applications to the Product, and end by reviewing key insights on the applications in the Product.

## About Environments & Products

**What is an Environment in Codefresh?**  
As a developer, you must be familair with the role of environments in the lifecyle of applications. 
In Codefresh GitOps, an Environment is a custom entity, identified by a unique name, comprising one or more pairs of clusters and namespaces. Once defined, an Environment is automatically populated by the applications deployed to it. 

**What is a Product in Codefresh?**  
A Product unifies different but interrelated Argo CD applications as a cohesive entity as they move through different Environments.
The Argo CD applications grouped within a Product generally has the same software but different versions as they are deployed in diverse Environments.


 
## Create an Environment
The first task is to create an Environment.
There is no limit on the number of Environments you can create.

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your GitOps Environment, which is meaningful in the context of your development and deployment cycle. 
	  For the quick start, we'll use `dev`.
    1. **Kind**: The purpose of this GitOps Environment. Select **Non-production** where development, testing, staging versions of applications are deployed.
    1. **Tags**: Leave empty.
    1. **Clusters and Namespaces**: Single or multiple cluster-namespace pairs to map to the GitOps Environment. 
	  For the quick start, we'll add the `in-cluster` and the `demo-ta-dev` namespace to map to `dev`.

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
After creating an Environment, the next step is to create Products to group Argo CD applications.

### Identify applications in GitOps Apps dashboard

In the GitOps Apps dashboard, identify the applications you want to group as a Product.
Look for different versions of the same software deployed in different Environments, utilizing similar microservices and dependencies. 
These are the applications ideal for grouping and monitoring as a Product.

For instance, consider three versions of the `demo-trioapp`application: `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`. We'll group these into a Product. 


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/envionments-products/products-gitops-apps.png" 
url="/images/quick-start/envionments-products/products-gitops-apps.png" 
alt="Argo CD applications in GitOps Apps dashboard" 
caption="Argo CD applications in GitOps Apps dashboard" 
max-width="70%" 
%}


### Create the `demo-trioapps` Product
Once you identify the applications, create the Product.
A Product requires a unique name, and optionally an annotation to connect different Argo CD applications.

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
   You'll notice that the Product currently has no assigned applications.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-no-apps-assigned.png" 
	url="/images/quick-start/envionments-products/products-no-apps-assigned.png" 
	alt="New Product with no applications" 
	caption="New Product with no applications"
  max-width="60%" 
%}

## Assign applications to Product `demo-trioapp` 
We'll now assign applications to the `demo-trioapp` Product.

Codefresh offers two methods:
* Manual assignment from the Products dashboard
* Adding an annotation to the application's manifest

### Manually assign application to a Product
Here we'll manually assign the application `demo-trioapp-dev` to the `demo-trioapps` Product from the Products dashboard. 


1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Expand the new Product, `demo-trioapp` in our case. 
1. Click **Manage Applications**.
  On the left, you'll see the list of **Unassigned apps**, including `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`.

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
1. From the list of **Unassigned apps**, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/} next to the application name, `demo-trioapp-dev` in our case.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/envionments-products/products-manually-assign-apps.png" 
	url="/images/quick-start/envionments-products/products-manually-assign-apps.png" 
	alt="Manually assign apps to Product" 
	caption="Manually assign apps to Product"
  max-width="60%" 
%}
 
1. To confirm, click **Save**. 
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
Now, let's connect an application to a Product by adding an annotation to the application's manifest.
For the quick start, we'll use the default annotation Codefresh generated when you created the Product to connect `demo-trioapp-prod`.

1. If needed, copy the Product's annotation.
  If not, continue from _Step 2_.
  1. In the Products dashboard, mouse over the row with the Product name, and then select **Edit** {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
  1. Copy the annotation and close the form.

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
  1. Select the application to which to add the annotation, `demo-trioapp-prod` for the quick start.
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
  Both applications are now displayed as part of the Product.

{% include 
	image.html 
	lightbox="true"
	file="/images/quick-start/envionments-products/products-gitops-apps.png" 
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

The Products dashboard showcases the Products created, whether or not applications are connected. <br>
Clicking a Product provides detailed information on its applications.  

For this quick start, we'll focus on two key features: application versions and contextual insights.

### Application version information
Helm-based applications show the release version of the application. This is the version of the Helm chart identifying the specific release version of the application in the different Environments. 

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

1. In the same panel, enable **Compare**.
1. Click within the field **Select applications to compare**, and select the applications.
  * For up to two applications, switch between YAML and Table views.  
  * For more than two applications, the comparison view switches to **Table** automatically.

In this quick start, dependency versions across all three applications.



### Contextual insights for applications 
Selecting a Product in the Products dashboard, show three tabs on the right: **Pods**, **Git**, and **Features**. 
These tabs offer Kubernetes (Pods), version control (Git), and issue-tracking (Features) insights on the Product's applications.

From this central location:
* Understand deployment technicalities
* Identify the latest commit triggering the deployment
* Identify deployed features
* Monitor deployment timelines

If you are a project or product manager, these unique insights on the real-time status of features and their deployment progress help prioritize and align with project goals.


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


You have completed 




