---
title: "Create products"
description: "Create products and tailor settings to optimize them"
group: products
toc: true
---



A product in Codefresh is a logical grouping of related Argo CD applications that provides context, versioning, and lifecycle management across environments. Unlike standalone applications in Argo CD, products establish relationships between applications, making it easier to track deployments, manage promotions, and maintain consistency. See [About Products]({{site.baseurl}}/docs/products/about-products/).

There are two ways to create a product in Codefresh GitOps:
* When creating or editing an [application]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#products)<br>
  You can create a product while creating an application.

* From the [Products page](#create-products)<br>
  Create and manage products directly, then assign applications to them, as described in this article.



## Understanding the role of environments for products

When you drill down into specific products in the Product Dashboard, application visibility depends on how you defined and mapped environments. 

Products will not display applications in these cases:

* **No environments defined**  
  If you have not created environments, the Product Dashboard does not display any applications, even if you have assigned applications to the product.  


* **Unmapped cluster-namespac**e  
  If the cluster or namespace the application is deployed to is not mapped to an environment, the application is notdisplayed in the Product Dashboard. 




## Create products 
Create a product from the Products page.  

To create a product for a new or an existing application, see [Configuring applications]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#products).

##### Before you begin
* Create one or more [environments]({{site.baseurl}}/docs/environments/create-manage-environments/#create-environments)

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
[Assigning Promotion Flows and triggers to products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Tracking Product releases]({{site.baseurl}}/docs/promotions/product-releases/)  