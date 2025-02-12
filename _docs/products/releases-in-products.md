---
title: "Releases for Products"
description: "Monitor deployments after promotion"
group: products
toc: true
---

## Releases for Products
The Releases feature for products visualizes the product’s deployment lifecycle as it moves through different environments during promotions.

A release is automatically created whenever a promotion is triggered, capturing the state of the product and its applications at that point in time. This allows you to monitor, visualize, and analyze changes from the initial trigger to the final deployment, providing valuable insights for all stakeholders.

The Releases tab for a product displays the list of historical and ongoing releases. 

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-promotions/releases/releases-list.png" 
	url="/images/gitops-promotions/releases/releases-list.png" 
	alt="Product Releases" 
	caption="Product Releases"
  max-width="50%" 
%}

##### Release visualization
Drilling down into a specific release shows how promotions were orchestrated across environments through Promotion Workflows. The Release Notes compile all the changes leading up to the release.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-promotions/releases/release-terminated.png" 
	url="/images/gitops-promotions/releases/release-terminated.png" 
	alt="Deployment visualization" 
	caption="Deployment visualization"
  max-width="50%" 
%}

##### Tracking releases in Git
Commit status checks in Git include status checks for promotions in releases. This means that you can track promotion progress and identify issues directly from Git. If more details are needed, you can always click **Details** to take you to the Releases view for investigation.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/releases/release-status-in-git.png" 
	url="/images/gitops-products/releases/release-status-in-git.png" 
	alt="Promotion status updates in Git" 
	caption="Promotion status updates in Git"
  max-width="50%" 
%}

For detailed information, see [Tracking Product Releases]({{site.baseurl}}/docs/promotions/product-releases/).


## Related articles
[Assigning applications to Products]({{site.baseurl}}/docs/products/assign-applications/)   
[Selecting Promotion Flows for Products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)   