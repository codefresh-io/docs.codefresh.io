---
title: "About products"
description: "Create products to group and deploy applications"
group: products
toc: true
---


Harness the power of **products** to streamline the management and deployment of complex Argo CD applications in Codefresh GitOps. By grouping interconnected applications, products provide enhanced visibility and control as they progress across environments.

Managing diverse applications in dynamic environments often leads to fragmented processess. Products act as a strategic layer, grouping applications with shared dependencies and context to bridge these gaps effectively.

With products, you can enhance your environments in Codefresh GitOps, gaining a unified view of application management and deployment.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/product-overview-pic.png" 
	url="/images/gitops-products/product-overview-pic.png" 
	alt="Products and the Product Dashboard in GitOps" 
	caption="Products and the Product Dashboard in GitOps"
  max-width=60%" 
%}



Explore the [Product Dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/).  
Read more on the first dashboard for environments and products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.


<!--- >>**NOTE**  
In the documentation, both product (capitalized) and product (lowercase) refer to the same entity in Codefresh GitOps. They are used interchangeably for readability and consistency across the text.  -->

## How products work
Products group related Argo CD applications, offering a unified perspective as they transition through stages of development and deployment.

For example, you can group multiple billing-related applications as a product, enabling streamlined management and deployment as a single entity.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by products organized by environments" 
	caption="Argo CD applications grouped by products organized by environments"
  max-width="70%" 
%}

## Benefits of products


* **Unified application management**  
  Grouping interconnected applications simplifies management and streamlines deployments across environments.

* **Aapplication-environment linking**  
  Products bridge the gap between applications and environments, providing clarity and control over the deployment lifecyle.

* **Deployment visibility**
  Product promotions generate releases that visualizes how promotions are orchestrated across environments. Releases also provide detailed insights into issue tracking, Git activity, and other actions that led to the promotion.

* **Effortless creation**  
  As with environments, products are easy to create through the UI, or declaratively using annotations in application manifests.

* **Real-time insights with integrated views**  
  The Product Dashboard integrats views of Pods, Git changes, and feature activity, tailored to developers and other stakeholders.



## Working with products and applications

After [creating products]({{site.baseurl}}/docs/products/create-product/), use its features to cohesively manage applications, streamline their promotions, and gain visibility across environments. 

* **Basic settings for products**  
  * Annotations: Retrieve the annotation created automatically for the product to link applications.
  * Applications: Assign applications to the product .
  [Assign applications to the product]({{site.baseurl}}/docs/products/assign-applications/)

* **Tailored promotion settings**  
  Customize promotion settings to meet product-specific needs:  
  * Specify the *version source for applications*, ensuring consistency across deployments.
  * Define the *attributes in applications* to determine what gets promoted.
  * Select the *promotion flows that match the product and customize the conditions to trigger each of these flows* to automate promotions.
 
{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/promotion-settings-configure.png" 
	url="/images/gitops-products/promotion-settings-configure.png" 
	alt="Promotion settings for product" 
	caption="Promotion settings for product"
  max-width=60%" 
%}

 See [Application version and promotable properties]({{site.baseurl}}/docs/products/promotion-version-properties/) and [Promotion flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/).

* **Manually promote products**
  When needed, manually promote the product to a specific environment, or to multiple environment through Promotion Flows. 
  See [Manually promote to specific environment]({{site.baseurl}}/docs/promotions/trigger-promotions#manually-promote-products-to-specific-environments) and [Manually promote to multiple environments by Promotion Flow]({{site.baseurl}}/docs/promotions/trigger-promotions#manually-promote-products-to-multiple-environments-by-promotion-flow).

* **Track release activity**  
  Use the Releases tab to monitor ongoing and historical promotions.  
  Access detailed logs and insights, including Git activity and issue tracking, for complete visibility into the deployment process.  


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/releases/product-releases-tab.png" 
	url="/images/gitops-products/releases/product-releases-tab.png" 
	alt="Product release activity in Releases tab" 
	caption="Product release activity in Releases tab"
  max-width=60%" 
%}

  See [Tracking product releases]({{site.baseurl}}/docs/promotions/releases).

