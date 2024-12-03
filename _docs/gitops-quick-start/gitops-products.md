---
title: "Quick start: Products in Codefresh GitOps"
description: "Explore how products contribute to and boost application deployment and promotions"
group: quick-start
toc: true
---


We have created two of the three core entities in the context of GitOps promotions: Environments and applications.
Now we'll create the third core entity, Product, which bridges the gap between environments and applications, and also boosts the power of applications.

Let's see how.



## What do you get from Products?



{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Quick start: Representation of a Product in Codefresh GitOps" 
	caption="Quick start: Representation of a Product in Codefresh GitOps"
  max-width="60%" 
%} 


Streamlined Application Deployment and Promotion

Products in Codefresh GitOps simplify and enhance the deployment and promotion process across multiple environments. By providing a central configuration point for applications, Products integrate seamlessly with your GitOps workflows, ensuring smooth transitions from development to production.

* **Unified application deployment and promotion**  
  Managing complex Argo CD applications across multiple environments can be challenging.  
  By grouping similar Argo CD applications into a unit, products allow you to also efficiently manage them cohesively.

* **Bridging applications and environments**  
  Products act as a bridge between applications and their respective environments. By linking applications to products, you can easily track their deployment across different environments, providing clarity and control.

* **Effortless creation**  
  As with environments, creating a product is equally straightforward. You can create products from the UI, declaratively through annotations in application manifests, or when creating applications.



## Create your first product
A product requires a unique name, and an annotation through which to connect the different applications.
You can create a product directly from the Environments dashboard or from the sidebar. 

##### Before you begin
* Make sure you have [created at least one environment](#create-an-environment)

##### How to

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for the Product, `demo-trioapp` for the quick start.
    1. **Connect Applications**: The automatically created annotation associated with this product, used to connect the different applications to it. In our case. `codefresh.io/product: demo-trioapp`. 
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
   The Product is displayed in the Products page. 
1. Click the product name to see the dashboard for the individual product.  
   You'll notice that the product currently has no applications assigned to it.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-no-apps-assigned.png" 
	url="/images/quick-start/environments-products/products-no-apps-assigned.png" 
	alt="Quick start: Product with no applications" 
	caption="Quick start: Product with no applications"
  max-width="60%" 
%}

## Assign applications to Product `demo-trioapp` 
The next step is to assign applications to the product you created, `demo-trioapp` in our case for the quick start.

Codefresh offers two methods:
* Manual assignment from **Product > Settings**
  This method is a single-click action for quick assignment from the UI. Unlike other UI actions, manual assignment does not require a commit action.  
  Recommended for trying and testing rather than as the go-to method.
  
* Declarative assignment through annotations  
  This method defines an annotation with the product name in the application's manifest.
  If the product doesn't exist, Codefresh automatically creates one for you.  
  Recommended as the go-to method as it is fully GitOps-compatible.  

### Manually assign application to a Product
Here we'll manually assign the application `demo-trioapp-dev` to the Product `demo-trioapp` through Product > Settings. 


1. If you are already in the Product Dashboard, click **Settings**.  
  The General section shows the annotation below Connect Applications.
1. Click **Manage Applications**.  
  The list of **Unassigned apps** includes the three applications we created, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-unassigned-apps.png" 
	url="/images/quick-start/environments-products/products-unassigned-apps.png" 
	alt="Quick start: Product `demo-trioapps` with unassigned applications" 
	caption="Quick start: Product `demo-trioapps` with unassigned applications"
  max-width="60%" 
%}

{:start="4"}
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

{:start="5"}
1. To confirm, click **Save**.  
  Codefresh adds the application to the environment defined for it.



### Add annotation to connect application to product
Now, let's connect an application to a product declaratively, by adding an annotation to the application's manifest.
The annotation is automatically created when you create the product, and is available in Product > Settings.

1. In **Product > Settings**, click **General**.  
1. Copy the annotation displayed below Connect Applications.


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
    1. From the sidebar, select **GitOps Apps**.
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
1. Return to the Product Dashboard for `demo-trioapp` in our case.
  Both applications are now displayed as part of the Product.

{% include 
	image.html 
	lightbox="true"
	file="/images/quick-start/environments-products/products-dashboard-apps.png" 
	url="/images/quick-start/environments-products/products-dashboard-apps.png" 
	alt="Quick start: `demo-trioapp-dev` and `demo-trioapp-prod` assigned to product" 
	caption="Quick start: `demo-trioapp-dev` and `demo-trioapp-prod` assigned to product"
  max-width="60%" 
%}





### Explore the Products dashboard

Here's an example of the Product Dashboard with all three applications we created for the quick start.
Note that we have also assigned `demo-trioapp-qa` to the product


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="60%" 
%}



For this quick start, we'll focus on two key features: release versions and integrated insights into applications.

### Release version
Helm-based applications show the release version of the application. The release version is retrieved from the source file that you define.  For detailed information, see [Configuring versions for applications]({{site.baseurl}}/docs/products/promotion-version-properties/#configuring-versions-for-promoted-applications).




You can also:
* View the application's dependencies and their versions
  This is useful to identify which version is deployed where.
* Compare release versions of the dependencies across deployments in different environments
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


<!--- ##### Compare deployed versions across applications
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
-->
### Integrated insights into product's applications 

Products offer more than just standard Git commit or hash information by providing enriched insights into your applications.

When you select a product, the Product Dashboard displays three tabs on the right: **Pods**, **Git**, and **Features**. These tabs consolidate Kubernetes (Pods), version control (Git), and issue-tracking (Features) data into a single location. 

#### Pods

The Pods tab is the tab in focus by default.  
Here's a view of the Pods tab with Rollout information. 

#### Git
In the Git tab, you gain direct insights from the application repository, not the GitOps repository. This allows you to trace the complete commit history of the application's repo up to the commit that initiated the build and deployed the new version. Commit history includes  history of individual commits with deep links to source control.

#### Features
The Features tab allows you to connect these commits with tickets in your issue-tracking tool or system. This integration enhances traceability and context, enabling you to monitor the deployment's impact by tying deployed features to specific feature requests or bug fixes.

From this unified view, you can:
* Gain insights into deployment specifics
* Review all commits leading up to the latest one that triggered the deployment
* Align deployed features with related feature requests
* Effectively track deployment timelines 

**Why are these insights crucial?**  
When troubleshooting issues in production, having access to such comprehensive information is invaluable. You can pinpoint what occurred, when it happened, who made the change, and which feature or bug was addressed, streamlining your debugging process.


#### Requirement: Connect your CI platforms/tools to GitOps
To view integrated information from Git and issue-tracking systems in the Product Dashboard, you need to tie your CI system with your CD system. If you have CI platforms/tools already in place, be it Codefresh pipelines, GitHub Actions, or Jenkins, you can integrate them with Codefresh GitOps. The same applies to issue-tracking tools like Jira.

For an overview of the process, see [Image enrichments with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).





