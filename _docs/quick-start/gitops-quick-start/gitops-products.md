---
title: "Quick start: Environments & Products in Codefresh GitOps"
description: "Understand and leverage power of Codefresh's Environment and Product entities for applications"
group: quick-start
toc: true
---


If you've been working with Codefresh GitOps, you're likely familiar with managing Argo CD applications in Codefresh — from creating them to monitoring deployments and resources.

! Our Environments and Products feature takes your software development and deployment game to a whole new level!  
It makes them easier to manage, more transparent, and more accessible, enhancing your software development and deployment processes.

In this quick start, we'll introduce you to the concept and purpose of Environments and Products.  
We'll then delve into how to work with them to streamline and empower your software development lifecycle.

For detailed information, see [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/) and [Products]({{site.baseurl}}/docs/dashboards/gitops-products/).  



Hey there, DevOps enthusiast! If you've been diving into Codefresh GitOps, you're probably already pretty comfy with Argo CD applications in Codefresh. From creating apps to keeping an eye on resources and deployments, you've got it down.

But guess what? It's time to level up! Our Environments and Products feature takes your software development and deployment game to a whole new level. We're talking easier workflows, total transparency, and making the whole process more accessible than ever.

First up, we'll break down what Environments and Products are all about, and why they're game-changers for your software development lifecycle. Ready to empower your DevOps journey? Let's dive in!

For all the nitty-gritty details,
## About Environments & Products



**What is an Environment in Codefresh?**  
As a developer, you must be familair with the role of environments in the lifecyle of applications. 
In Codefresh GitOps, an Environment is a custom entity, identified by a unique name, comprising one or more pairs of clusters and namespaces. Once defined, an Environment is automatically populated by the applications deployed to it. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	url="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	alt="Quick start: Representation of an Environment in Codefresh GitOps"
	caption="Quick start: Representation of an Environment in Codefresh GitOps"
  max-width="60%" 
%} 


**What is a Product in Codefresh?**  
A Product unifies different but interrelated Argo CD applications as a cohesive entity as they move through different Environments.
The Argo CD applications grouped within a Product generally has the same software but different versions as they are deployed in diverse Environments.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Quick start: Representation of a Product in Codefresh GitOps" 
	caption="Quick start: Representation of a Product in Codefresh GitOps"
  max-width="60%" 
%} 

You have a fairly good idea of where we are going with these, so let's continue with some key tasks and functionality, starting with Environments.
 
## Create an Environment
The first task is to create an Environment. Your Environment is meant to replicate the deployment lifecycle of your software, so feel free to create one or more of them accordingly. 

You would find these Environments in most organizationss: `development`, `qa`, `staging`, and `production`. There is no limit on the number of Environments you can create.  
For the purpose of this quick start, we'll create a single Environment.

1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your GitOps Environment, which is meaningful in the context of your development and deployment cycle. 
	  For the quick start, we'll use `dev`.
    1. **Kind**: The purpose of this GitOps Environment. Select **Non-production** where development, testing, staging versions of applications are deployed.  
	Just a heads up that the Kind (**Production** and **Non-production**) will be used when defining policies and ABAC for 
    1. **Tags**: Leave this empty for the quick start.
    1. **Clusters and Namespaces**: Single or multiple cluster/namespace/cluster-namespace pairs to map to the GitOps Environment.
	  The Environment is populated by all the applications deployed to the mapped clusters and namespaces.  
	  To include all namespaces in a cluster, leave the Namespace empty.   
	  For the quick start, we'll add the `in-cluster` and the `demo-ta-dev` namespace to map to `dev`.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/environment-add.png" 
	url="/images/quick-start/environments-products/environment-add.png" 
	alt="Quick start: Create an Environment" 
	caption="Quick start: Create an Environment"
  max-width="60%" 
%} 

{:start="3"}  
1. Click **Add**.  
  The environment is displayed in the Environments dashboard. 

## Create & work with Products
After creating at least one Environment, we can start creating Products, connecting Argo CD applications to it, and concluding with key insights in the Products dashboard.


### Identify applications in GitOps Apps dashboard

Let's first identify the applications you want to group as a Product in the GitOps Apps dashboard.
Look for different versions of the same software deployed in different Environments, utilizing similar microservices and dependencies. 
These are the applications ideal for grouping and monitoring as a Product.

For instance, consider three versions of the `demo-trioapp` application: `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`. We'll group these into a Product. 


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/environments-products/products-gitops-apps.png" 
url="/images/quick-start/environments-products/products-gitops-apps.png" 
alt="Argo CD applications in GitOps Apps dashboard" 
caption="Argo CD applications in GitOps Apps dashboard" 
max-width="70%" 
%}


### Create the `demo-trioapps` Product
Once you identify the applications, create the Product.
A Product requires a unique name, and optionally an annotation to connect the different Argo CD applications.

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
    1. **Tags**: Leave this empty for the quick start.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-create.png" 
	url="/images/quick-start/environments-products/products-create.png" 
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
	file="/images/quick-start/environments-products/products-no-apps-assigned.png" 
	url="/images/quick-start/environments-products/products-no-apps-assigned.png" 
	alt="Quick start: New Product with no applications" 
	caption="Quick start: New Product with no applications"
  max-width="60%" 
%}

## Assign applications to Product `demo-trioapp` 
The next step is to assign applications to the Product you created, `demo-trioapp` in our case for the quick start.

Codefresh offers two methods:
* Manual assignment from the Products dashboard
  This method is a single-click action quick assignment from the UI. Unlike other UI actions, manual assignment does not require a commit action.  
  Recommended for trying and testing rather than as the go-to method.
  
* Declarative assignment through annotations
  This method defines an annotation with the Product name in the application manifest.
  If the Product doesn't exist, Codefresh automatically creates one for you.  
  Recommended as the go-to method as it is fully GitOps-compatible.  

### Manually assign application to a Product
Here we'll manually assign the application `demo-trioapp-dev` to the `demo-trioapps` Product from the Products dashboard. 


1. In the Codefresh UI, from the Ops in the sidebar, select **Products**.
1. Expand the new Product, `demo-trioapp` in our case. 
1. Click **Manage Applications**.  
  On the left, you'll see the list of **Unassigned apps**, including `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-unassigned-apps.png" 
	url="/images/quick-start/environments-products/products-unassigned-apps.png" 
	alt="Quick start: `demo-trioapps` Product with unassigned applications" 
	caption="Quick start: `demo-trioapps` Product with unassigned applications"
  max-width="60%" 
%}

{:start="3"}
1. From the list of **Unassigned apps**, click {::nomarkdown}<img src="../../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/} next to the application to assign, `demo-trioapp-dev` in our case.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-manually-assign-apps.png" 
	url="/images/quick-start/environments-products/products-manually-assign-apps.png" 
	alt="Quick start: Manually assign `demo-trioapp-dev` to Product" 
	caption="Quick start: Manually assign `demo-trioapp-dev` to Product"
  max-width="60%" 
%}

{:start="4"}
1. To confirm, click **Save**.  
  Codefresh adds the application to the Environment defined for it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-manually-assigned-app.png" 
	url="/images/quick-start/environments-products/products-manually-assigned-app.png" 
	alt="Quick start: `demo-trioapp-dev` assigned to Product in defined Environment" 
	caption="Quick start: `demo-trioapp-dev` assigned to Product in defined Environment"
  max-width="60%" 
%}


### Add annotation to connect application to Product
Now, let's connect an application to a Product declaratively, by adding an annotation to the application's manifest.
For the quick start, we'll use the default annotation Codefresh generated when we created the Product, to connect `demo-trioapp-prod`.

1. If needed, copy the Product's annotation.
  If not, continue from _Step 2_.
    1. In the Products dashboard, mouse over the row with the Product name, and then select **Edit** {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
    1. Copy the annotation and close the form.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-copy-annotation.png" 
	url="/images/quick-start/environments-products/products-copy-annotation.png" 
	alt="Quick start: Copy annotation from Product" 
	caption="Quick start: Copy annotation from Product"
  max-width="50%" 
%}

{:start="2"}
1. Add the annotation to the application's manifest:
    1. From Ops in the sidebar, select **GitOps Apps**.
    1. Select the application to which to add the annotation, `demo-trioapp-prod` for the quick start.
    1. Click the **Configuration** tab and switch to **YAML** format.
    1. Add the annotation as in the example below.
    1. Commit to save the changes.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-add-annotation-manifest.png" 
	url="/images/quick-start/environments-products/products-add-annotation-manifest.png" 
	alt="Quick start: Add annotation to `demo-trioapp-prod` manifest" 
	caption="Quick start: Add annotation to `demo-trioapp-prod` manifest"
  max-width="60%" 
%}

{:start="3"}
1. Return to the Products dashboard and select the Product, `demo-trioapp` in our case.
  Both applications are now displayed as part of the Product.

{% include 
	image.html 
	lightbox="true"
	file="/images/quick-start/environments-products/products-dashboard-apps.png" 
	url="/images/quick-start/environments-products/products-dashboard-apps.png" 
	alt="Quick start: `demo-trioapp-dev` and `demo-trioapp-prod` assigned to Product" 
	caption="Quick start: `demo-trioapp-dev` and `demo-trioapp-prod` assigned to Product"
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

The Products dashboard showcases the Products created, whether or not applications are connected.   
Clicking a Product provides detailed information on its applications.  

For this quick start, we'll focus on two key features: release versions and contextual insights.

### Release versions
Helm-based applications show the release version of the application. This is the version of the Helm chart identifying the specific release version in the different Environments. 

You can:
* View the application's dependencies and their versions
  This is useful to identify which version is deployed where.
* Compare release versions of the dependencies across deployments in different Environments
  This is useful for troubleshooting as you can identify if the version that works in dev is the same as the version with the problem in staging.


##### View dependencies
1. Click the version to display the application's dependencies.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-app-version-number.png" 
	url="/images/quick-start/environments-products/products-app-version-number.png" 
	alt="Quick start: Helm chart version for application" 
	caption="Quick start: Helm chart version for application"
  max-width="60%" 
%}


##### Compare deployed versions across applications
Compare the dependency versions in the different applications associated with the Product.

1. In the same panel, enable **Compare**.
1. Click within the field **Select applications to compare**, and select the applications.
  * For up to two applications, switch between **YAML** and **Table** views.  
  * For more than two applications, the comparison view automatically switches to **Table**.

In this quick start, dependency versions are identical across all three applications.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-app-version-compare.png" 
	url="/images/quick-start/environments-products/products-app-version-compare.png" 
	alt="Quick start: Dependency versions across applications" 
	caption="Quick start: Dependency versions across applications"
  max-width="60%" 
%}

### Contextual insights for applications 

Products offer more than just standard Git commit or hash information; they provide enriched insights into your applications.

When you select a Product in the Products dashboard, three tabs appear on the right: **Pods**, **Git**, and **Features**. These tabs consolidate Kubernetes (Pods), version control (Git), and issue-tracking (Features) data into a single location.

##### Git
In the Git tab, you gain direct insights from the application repository, not the GitOps repository. This allows you to trace the complete commit history of the application's repo up to the commit that initiated the build and deployed the new version. View detailed history of individual commits and deep links to source control.

##### Features
The Features tab allows you to connect these commits seamlessly with tickets in your issue-tracking tool or system. This integration enhances traceability and context, enabling you to monitor the deployment's impact by tying deployed features to specific feature requests or bug fixes.

From this unified view, you can:
* Gain insights into deployment specifics
* Review all commits leading up to the latest one that triggered the deployment
* Align deployed features with related feature requests
* Track deployment timelines effectively



**Why are these insights crucial?**
When troubleshooting issues in production, having access to this comprehensive information is invaluable. You can pinpoint what occurred, when it happened, who made the change, and which feature or bug was addressed, streamlining your debugging process.



#### Connect your CI platforms/tools to GitOps 
If you have CI platforms/tools already in place, be it Codefresh pipelines, GitHub Actions, or Jenkins, you can integrate them with Codefresh GitOps.
The same applies to issue-tracking systems like Jira.
For an overview of the setup process, see [Image enrichments with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).


Once set up, Codefresh takes care of the heavy lifting and retrieves the information.
You can view this information in the Products dashboard when selecting a Product, as detailed below, and also in our[Images dashboard]({{site.baseurl}}/docs/dashboards/images/).


#### Pods

When you select a Product, the Pods tab is the tab in focus by default.  
Here's a view of the Pods tab with Rollout information. 


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/pod-view-rollouts.png" 
	url="/images/gitops-products/pod-view-rollouts.png" 
	alt="Quick start: Pod view of application with Rollouts" 
	caption="Quick start: Pod view of application with Rollouts"
  max-width="60%" 
%}

#### Git


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/product-git-info.png" 
	url="/images/quick-start/environments-products/product-git-info.png" 
	alt="Products: Git view of applications" 
	caption="Products: Git view of applications"
  max-width="60%" 
%}

#### Features


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/product-features-info.png" 
	url="/images/quick-start/environments-products/product-features-info.png" 
	alt="Quick start: Features view of applications" 
	caption="Quick start: Features view of applications"
  max-width="60%" 
%}



Explore and try out more of our functionality in Environments and Products.



