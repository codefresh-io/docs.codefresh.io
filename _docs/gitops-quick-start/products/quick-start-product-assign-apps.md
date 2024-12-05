---
title: "Quick start: Assigning applications to products"
description: "Connect applications to products manually or declaratively"
group: quick-start
toc: true
---

This quick start covers how to assign applications to products, to group and better manage related applications.

Codefresh offers two methods for assigning applications to products:
* **Manual assignment from **Product > Settings****
  Assign applications to a product with a single click in the UI.  
  This method is quick and does not require a commit action, making it ideal for testing or trying out assignments. However, it’s not recommended as the primary approach for GitOps promotions.

  
* **Declarative assignment through annotations**  
  Add an annotation with the product name to the application's manifest. 
  If the product doesn’t already exist, Codefresh automatically creates it for you. If you have created the product, the annotation is also created at the same time.  
  This method is fully GitOps-compatible, and recommended as the go-to approach for managing applications in GitOps environments.
  

Use either method, as you prefer. The quick start guides you through both. 

## Manually assign application to products
Here we'll manually assign the application `demo-trioapp-dev` to the Product `demo-trioapp` through Product > Settings. 

##### Step-by-step
1. If you are already in the Product Dashboard, click **Settings**.  
  The General section shows the annotation below Connect Applications.
1. Click **Manage Applications**.  
  The list of **Unassigned apps** includes the applications, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`.

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
1. From the list of **Unassigned apps**, click {::nomarkdown}<img src="../../../../images/icons/runtime-topology-add-cluster.png?display=inline-block">{:/} next to the application to assign, `demo-trioapp-dev` in this example.


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
  Codefresh assigns the application to the product in the environment defined for it.



## Add an annotation to connect application to product
Here, we'll connect an application to a product declaratively by adding an annotation to the application's manifest.  
The annotation is automatically created when you create the product, and is available in Product > Settings.

##### Step-by-step
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
    1. Select the application to which to add the annotation, such as `demo-trioapp-prod` for the quick start.
    1. Click the **Configuration** tab and switch to **YAML** mode.
    1. Add the annotation as in the example below.
    1. Commit the changes to save them.

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
1. Return to the Product Dashboard for `demo-trioapp`.
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

## Next
Connect the third application, `demo-trioapp-qa` to the product `demo-trioapp` using either method.

Once you have created a product and connected its applications, proceed to explore the Product Dashboard, focussing on the key insights it offers for promotions and deployments.

## Continue with 
Exploring the product dashboard 