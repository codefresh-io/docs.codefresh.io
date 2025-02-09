---
title: "Create Products"
description: "Create Products and tailor settings to optimize them"
group: products
toc: true
---



A Product in Codefresh is a logical grouping of related Argo CD applications that provides context, versioning, and lifecycle management across environments. Unlike standalone applications in Argo CD, products establish relationships between applications, making it easier to track deployments, manage promotions, and maintain consistency. See [About Products]({{site.baseurl}}/docs/products/about-products/).

There are two ways to create a product in GitOps:
* When creating or editing an [application]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#products)<br>
  You can create a product while setting up an application.

* From the [Products page](#create-products)<br>
  Create and manage products directly, then assign applications to them, as described in this article.



## Understanding the role of Environments for Products

When you drill down into specific products in the Product Dashboard, application visibility is closely tied to how you defined and mapped environments. 

Note that products will not display any applications in these scenarios:

* No environments defined  
  If you have not created environments in Codefresh, the Product Dashboard will not display any applications, even if you have assigned applications to products.  


* Unmapped cluster-namespace  
  Even if environments are defined, applications are not displayed within products if the corresponding clusters or namespaces they are not deployed to are not mapped to any existing environment. 




## Create Products 
Create a product from the Product page.  

To create a product for a new or an existing application, see [Configuring applications]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#products).

##### Before you begin
* Create one or more [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-gitops-environments)

##### How to
1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for your Product, which is also unique in the cluster. 
    1. **Connect Applications**: The applications to associate with this Product. 
      Copy and paste the annotation into the application's manifest.
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
   The Product is displayed on the Product page, and on drill down, in the Product Dashboard. 


## Related articles
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)  
[Assigning applications to Products]({{site.baseurl}}/docs/products/assign-applications/)   
[Selecting Promotion Flows for Products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Tracking Product releases]({{site.baseurl}}/docs/promotions/releases/)  