---
title: "Quick start: Creating products"
description: "Create products to group and manage related applications"
group: gitops-quick-start
toc: true
---


In the previous quick start we [created environments],  

## Products quick start

In this quick start, we'll create a product, `demo-trioapp`, named for the three applications we'll create later. These applications will represent distinct stages in the development lifecycle.  
Grouping the applications into a single product will simplify their management and promotions across the `dev`, `qa`, and `prod` environments we created in the previous quick start.

## Products in GitOps

Products are one of the three core entities essential for GitOps promotions, bridging the gap between environments and applications. They also amplify the capabilities of applications by grouping and managing them as cohesive units.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Products quick start: Representation of a product in Codefresh GitOps" 
	caption="Products quick start: Representation of a product in Codefresh GitOps"
  max-width="60%" 
%} 

For detailed information, see [Products]({{site.baseurl}}/docs/products/about-products/).

##### Why create products?

Here are a few reasons why you would want to create products to manage your applications.

* **Bridging applications and environments**: By grouping related applications within a product, you ensure visibility and control over their deployment paths, keeping all components in sync as they move through environments together.

* **Unified application promotion and deployment**: Managing multiple individual Argo CD applications across various environments can be complex. Products streamline this process by grouping related applications, enabling more efficient and cohesive management and promotion.



## Requirements
* [GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/)


## Create your first product
Creating a product is as simple as creating an environment. You can do so directly from the UI, declaratively by annotating application manifests, or even when creating applications themselves.

A product requires a unique name, and an annotation through which to connect the different applications.
The annotation is automatically created using the product name. For the purposes of this quick start, we'll name the product `demo-trioapp`.


##### Step-by-step

1. In the Codefresh UI, from the sidebar, select **Products**, and click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for the Product, `demo-trioapp` for the quick start.
    1. **Connect Applications**: Displays the annotation associated with this product that is automatically created, and used to connect the different applications to it. In our case, `codefresh.io/product: demo-trioapp`. 
    1. **Tags**: Leave this empty for the quick start.


{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/products-create.png" 
	url="/images/quick-start/environments-products/products-create.png" 
	alt="Products quick start: Create product" 
	caption="Products quick start: Create product"
  max-width="50%" 
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
After creating two of the three core entities for GitOps promotions, environments and products, we are ready to dive into applications.

[Quick start: Creating applications]({{site.baseurl}}/docs/gitops-quick-start/products/create-app-ui/)

