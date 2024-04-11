---
title: "GitOps Products quick start"
description: ""
group: quick-start
toc: true
---



After creating Environments for your Argo CD applications, let's continue and explore the concept of Products. See how Environments combined with Products empower superior and seamless management and deployment of Argo CD applications.

## About Products and the Products dashboard

What is a Product in Codefresh GitOps?


What is the Products dashboard?

 




## Create a Product
We'll start by creating a Product, view the Products dashboard after creating a Prodic  to which we can assign apploications.
The 
Create a Product with a unique name and define the annotations through which to connect related Argo CD applications to it.

##### Before you begin
* Complete creating Environments

##### How to
1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for your Product, which is also unique in the cluster. For the quick start, we'll define the Product name as `trio-apps.`
    1. **Connect Applications**: The applications to associate with this Product by adding the default or custom annotation to the application manifest.  
      For the quick start, we'll use the default annotation that Codefresh automatically generates based on the Product's name,  ???.
    1. Leave the **Tags** field empty. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/create-product.png" 
	url="/images/gitops-products/create-product.png" 
	alt="Quick start: Add Product" 
	caption="Quick start: Add Product"
  max-width="60%" 
%}

{:start="4"}
1. Click **Add**. 
   The Product is displayed in the Products dashboard. 

   SCREENSHOT
1. Click the Product name to view details.
   As you can see, the Product does not have any applications.


## Assign applications to Products
After creating a Product, the next step is to assign or connect applications to it.

There are two ways to assign applications to a Product in Codefresh:
* Manually assign an application directly from the Products dashboard
* Add an annotation to the application's manifest

### Manually assign an application to a Product
We'll use the manual method and assign an application to a Product directly from the Products dashboard. 

##### Before you begin
* Decide w


1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Click the name of the Product for which to assign applications, and then click **Manage Applications**.
  For the quick start, we'll click **trio-app**.
  You'll see the list of Unassigned applications on the left


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
1. From the list of **Unassigned apps** on the left, click {::nomarkdown}<img src="../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/} next to the application name. 
   

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/unassigned-apps-in-product.png" 
	url="/images/gitops-products/unassigned-apps-in-product.png" 
	alt="Unassigned applications in Product" 
	caption="Unassigned applications in Product"
  max-width="60%" 
%}

 
1. To confirm the assignment, click **Save**. 
  Codefresh adds the application to the Environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-to-env.png" 
	url="/images/gitops-products/assign-app-to-env.png" 
	alt="Application assigned to Product in defined Environment" 
	caption="Application assigned to Product in defined Environment"
  max-width="60%" 
%}


### Use annotations to connect applications to Products
We'll now try the second method, to declaratively connect an application to a Product declaratively by adding an annotation to the application's manifest.
We'll add the default annotation Codefresh generated or created when you added the Product.



1. If needed, copy the Product's annotation.
  If not, continue from Step 2.
  1. In the Products dashboard, mouse over the row with the Product name, and then select **Edit** {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
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
  1. Select the application to which to add the annotation. For the quick start, the `trio-prod-app`.
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

If you return to the GitOps Products dashboard and select the Product, trio-app in our case, you'll see both applications as part of the Product.
SCREENSHOT SHOWING TWO TRIO APPS - DEV AND PROD
{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/assign-app-with-annotation.png" 
	url="/images/gitops-products/assign-app-with-annotation.png" 
	alt="Application assigned to Product through annotation" 
	caption="Application assigned to Product through annotation"
  max-width="60%" 
%}




## Explore the Products dashboard

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

In the quick start, we'll focus on a couple of key features: application versions and enriched insights.

### Version information
Helm-based applications display the release version of the application in the Environment. This is the version of the Helm chart identifying the specific release version of the application in the different environments. 

You can:
View the application's dependencies and their versions
Compare release versions of the dependencies across deployments in different Environments

##### View application dependencies
Click the version to display the application's dependencies.

SCREESHOT WITH APP DEPENDENCIES

##### View and compare deployed versions for applications and dependencies
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









### Enriched insights into applications 
To the right, you can see three tabs entitled Pods, Git, and Features. 

Switch between these tabs for Kubernetes (Pods), version control (Git), and issue-tracking (Features) information on the applications assigned to the selected Product.

From a single location:
Identify technical details on the deployment
Get information on the latest commit that caused the deployment
Identify which features are deployed in production
Track deployment timelines  

These real-time insights into the status of features and their deployment progress are useful to project and product managers to informed decisions, prioritize tasks effectively, and ensure alignment with project objectives.


#### Pods

REPLACE SCREENSHOTS IF NEEDED
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

REPLACE SCREENSHOTS IF NEEDED
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

REPLACE SCREENSHOTS IF NEEDED

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/features-view.png" 
	url="/images/gitops-products/features-view.png" 
	alt="Products: Features view of application" 
	caption="Products: Features view of application"
  max-width="60%" 
%}







