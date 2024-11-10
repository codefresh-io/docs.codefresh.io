---
title: "Create Products"
description: "Create products, connect applications, and configure promotion settings"
group: products
toc: true
---



Create a product with a unique name and connect related Argo CD applications to it.



## Understanding the role of environments for products

When you drill down into specific products in the Product Dashboard, application visibility is closely tied to the definition and mapping of Environments. 

Note that products will not display any applications in these scenarios:

* No environments defined  
  If you have not created environments in Codefresh, the Product Dashboard will not display any applications, even if you have assigned applications to products. 

* Unmapped cluster-namespace  
  Even if environments are defined, applications are not displayed within products if the corresponding clusters or namespaces are not mapped to any existing environment. 


## Create Products

##### Before you begin
* Create one or more [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-gitops-environments) for applications

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
   The Product is displayed in the Product page, and on drill down in the Product Dashboard. 


## Related articles
[Configuring Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)  
[Assigning applications to products]({{site.baseurl}}/docs/products/assign-applications/)   
[Configuring promotion flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Tracking product releases]({{site.baseurl}}/docs/promotions/releases/)  