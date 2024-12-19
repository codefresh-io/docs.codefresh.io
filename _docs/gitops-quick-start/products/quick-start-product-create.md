---
title: "Quick start: Creating products"
description: "Create products to group and manage related applications"
group: quick-start
toc: true
---


We created Environments, one of the three core entities essential for GitOps promotions. Now, it’s time to create another core entity: Products. 

Products not only bridge the gap between environments and applications but also amplify the capabilities of your applications by grouping and managing them as cohesive units.

* If you clicked **Create Product** from the Environments page in the previous quick start, you can continue with defining the settings for the new product. 
* If not, follow the steps in this quick start and create your first product. 

## Create your first product
A product requires a unique name, and an annotation through which to connect the different applications.

##### Before you begin
* Make sure you have at least [one environment]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)  


##### Step-by-step

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for the Product, `demo-trioapp` for the quick start.
    1. **Connect Applications**: The automatically created annotation associated with this product, used to connect the different applications to it. In our case, `codefresh.io/product: demo-trioapp`. 
    1. **Tags**: Leave this empty for the quick start.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-create.png" 
	url="/images/quick-start/environments-products/products-create.png" 
	alt="Products quick start: Create product" 
	caption="Products quick start: Create product"
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
	alt="Products quick start: Product with no applications" 
	caption="Products quick start: Product with no applications"
  max-width="60%" 
%}



## What's next
After creating two of the three core entities for GitOps promotions, environments and products, we are ready to launch into applications.

[Quick start: Creating applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)

