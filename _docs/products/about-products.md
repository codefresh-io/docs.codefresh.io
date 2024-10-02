---
title: "About Products"
description: "Create Products to group and deploy applications"
group: products
toc: true
---



>**NOTE**  
This feature is currently in Beta.

Explore the power of Products for Argo CD applications and deployments in Codefresh GitOps. 

Managing complex applications across multiple environments is a common challenge faced by developers and platform engineers. The diverse nature of applications and the variety of environments they deploy to can lead to fragmented management and deployment processes.
In Codefresh GitOps, Products serve as a strategic layer that bridges this gap. Products group different yet interconnected applications based on their similarities and dependencies. 
By grouping applications, Products enhance Environments, allowing complete visibility for efficient deployment across them.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="70%" 
%}

Read more on the first dashboard for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.


>**NOTE**  
In the documentation, both Product (capitalized) and product (lowercase) refer to the same entity in Codefresh GitOps. They are used interchangeably for readability and consistency across the text.

## What is a Product in Codefresh GitOps?
In Codefresh GitOps, a Product is a custom entity that allows you to group interconnected Argo CD applications, providing a cohesive view of the applications as they progress through the development and deployment lifecycle.  

Consider a practical scenario of numerous applications connected to billing or payment. Instead of monitoring and promoting each application separately, creating a Product for this enables you to track and manage them collectively.

The diagram illustrates how Argo CD applications connected to a Product are grouped by that product and organized by environments. It also shows applications not assigned to any Product.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by Products and organized by Environments" 
	caption="Argo CD applications grouped by Products and organized by Environments"
  max-width="70%" 
%}

## Benefits of Products
* **Unified application management**  
  Managing complex Argo CD applications across multiple environments can be challenging.  
  By grouping similar Argo CD applications into a unit, Products allow you to also efficiently manage them cohesively.

* **Bridging applications and environments**  
  Products act as a bridge between applications and their respective environments. By linking applications to Products, you can easily track their deployment across different environments, providing clarity and control over your deployment pipelines.

* **Deployment visibility**
  Deploying a Product generates a release that provides a comprehensive view of the entire deployment process. This includes visualization of Promotion Workflows across all environments, and detailed insights into issue tracking, Git activity, and other actions that led to the deployment, giving developers and stakeholders a clear understanding of the process.

* **Effortless creation**  
  As with Environments, creating a Product is equally straightforward. You can create Products from the UI, or declaratively through annotations in your application manifests.

* **Real-time insights with integrated views**  
  The Product Dashboard offers three distinct views-Pods, Git, and Features. These views provide real-time insights into the changes in the application repo, deployment details, code changes, and feature tracking. Whether you're a developer tracking the latest commits or a project manager monitoring feature releases, these integrated views offer valuable insights tailored to your role.



## Work with Products & applications

We have made it simple to work with Products and applications in environments. 

##### Create
Begin by [Creating a Product]({{site.baseurl}}/docs/products/create-product/). 



##### View
Once you create a product, you can see it in the Products page. Select the Product to drill down into the [Product Dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/). The Product Dashboard offers a clear view of its applications in their respective environments, with additional information on the application. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by products and organized in environments" 
	caption="Argo CD applications grouped by products and organized in environments"
  max-width="70%" 
%}


##### Configure

Once you create a Product, everything else you need to define for the Product, including its applications and promotion definitions are available in the Product Settings tab.

  * [Assigning applications to the Product]({{site.baseurl}}/docs/products/assign-applications/)  
    Bring your applications into the picture by linking them to the product. 

  * [Configuring promotion settings]({{site.baseurl}}/docs/products/configure-product-settings/)  
    Fine-tune the promotion process by configuring the version source and specifying the attributes that should be promoted within applications in the product. This ensures that the correct versions and components are consistently promoted through each stage of deployment.

  * [Configuring promotion flows and triggers]({{site.baseurl}}/docs/products/promotion-flow-triggers/)
    Select specific Promotion Flows that match the Product, and customize the conditions that trigger each of these flows, automating and controlling when and how applications in the product are promoted.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/product-settings-general.png" 
	url="/images/gitops-products/settings/product-settings-general.png" 
	alt="Product Settings tab to connect applications and configure promotion settings" 
	caption="Product Settings tab to connect applications and configure promotion settings"
  max-width="70%" 
%}

##### Monitor  
[Monitor and track]({{site.baseurl}}/docs/promotions/releases) the Product's ongoing and historical promotions and deployments in the Releases tab.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/releases/product-releases-tab.png" 
	url="/images/gitops-products/releases/product-releases-tab.png" 
	alt="Product Release tab to monitor promotions" 
	caption="Product Release tab to monitor promotions"
  max-width="70%" 
%}


For how-to instructions, see [Configure product settings]({{site.baseurl}}/docs/products/configure-product-settings/).