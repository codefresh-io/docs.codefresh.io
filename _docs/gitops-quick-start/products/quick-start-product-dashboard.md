---
title: "Quick start: Exploring the Product Dashboard"
description: "Gain insights into applications, versions, and deployment details"
group: gitops-quick-start
toc: true
---

In the previous quick start, we created applications and assigned them to the product.  

Let's explore the Product Dashboard to see how these come together. The dashboard offers a consolidated view of your product's applications in their environments, including release versions, dependencies, and integrated insights from Kubernetes, Git, and issue-tracking tools. 



Here's an example of the Product Dashboard with the applications we created for the quick start.



{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/product-dashboard-view.png" 
	url="/iimages/quick-start/environments-products/product-dashboard-view.png" 
	alt="Product Dashboard quick start: Explore Product Dashboard" 
	caption="Product Dashboard quick start: Explore Product Dashboard"
  max-width="60%" 
%}



For this quick start, we'll focus on two key features: release versions and integrated insights into applications.

## Identifying release versions in product applications

The release version displayed for each application signifies the specific version of the application that is currently deployed. This version is retrieved from the source file you defined during configuration.

**Why is this important?**
Knowing the release version at a glance helps you quickly identify which version of an application is deployed in each environment. This is crucial for ensuring consistency, troubleshooting, and managing deployments effectively.

In the example below, `dev` has a different version of the application compared to `qa` and `prod`.  


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/product-dashboard-view.png" 
	url="/images/quick-start/environments-products/product-dashboard-view.png" 
	alt="Product Dashboard quick start: Release versions of application/product in environments" 
	caption="Product Dashboard quick start: Release versions of application/product in environments"
  max-width="60%" 
%}

You can use the integrated insights in the Product Dashboard—such as Git commit history and feature tracking—to evaluate the changes. Based on this information, you can decide whether to promote the changes and the version across environments.
The next set of quick starts will guide you through promotions. 

Additionally, you can:

* **View application dependencies and their versions**  
  This helps trace which versions of dependencies are included in a particular deployment.
* **Compare dependency versions across environments**
  For example, you can verify whether the version deployed in a staging environment matches the one in production, which is useful for identifying inconsistencies or issues in specific environments.


### View dependencies
1. Click the version to display the application's dependencies.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-app-version-number.png" 
	url="/images/quick-start/environments-products/products-app-version-number.png" 
	alt="Products quick start: Versions for application dependencies" 
	caption="Products quick start: Versions for application dependencies"
  max-width="60%" 
%}


### Compare deployed versions across applications
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
	alt="Products quick start: Dependency versions across applications" 
	caption="Products quick start: Dependency versions across applications"
  max-width="60%" 
%}

## Integrated insights into product's applications 

Products offer enriched insights into your applications, more than just standard Git commit or hash information.
The Product Dashboard consolidates Kubernetes, version control, and issue-tracking data into one location, providing a holistic view of your product's state.

When you select a product, the Product Dashboard displays three tabs on the right: **Pods**, **Git**, and **Features**. These tabs consolidate Kubernetes (Pods), version control (Git), and issue-tracking (Features) data into a single location. 

**Why are these insights crucial?**  
When troubleshooting issues in production, having access to such comprehensive information is invaluable. You can pinpoint what occurred, when it happened, who made the change, and which feature or bug was addressed, streamlining your debugging process.

From this unified view, you can:
* Gain insights into deployment specifics
* Review all commits leading up to the latest one that triggered the deployment
* Align deployed features with related feature requests
* Effectively track deployment timelines 

### Tabs overview

##### Pods
Shows live Kubernetes data, including pod status and health.

##### Git
Provides _direct insights from the application's source repository, including the complete commit history up to the commit that initiated the build and deployed the new version, and deep links to source control.

##### Features
Maps commits to tickets in your issue-tracking tool, offering traceability for deployed features or bug fixes. 


### Requirement: Integrate CI platforms/tools
For the Git and Features tabs to work seamlessly, ensure your CI/CD systems are integrated. If you have CI platforms/tools already in place, be it Codefresh pipelines, GitHub Actions, or Jenkins, you can integrate them with Codefresh GitOps. The same applies to issue-tracking tools like Jira.

For setup instructions, see [Image enrichments with GitOps integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).

## What's next?
We'll dive into how to promote changes and deploy applications across environments, using the entities you've created and worked with—environments, products, and applications. Read [Quick start: Promotions in Codefresh GitOps]({{site.baseurl}}/docs/gitops-quick-start/promotions/) for an overview.

Let's move on to the first quick start on promotions to see this in action.

[Quick start: Drag-and-drop promotion]({{site.baseurl}}/docs/gitops-quick-start/promotions/drag-and-drop/)

