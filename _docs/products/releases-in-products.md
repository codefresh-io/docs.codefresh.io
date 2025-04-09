---
title: "Releases for products"
description: "Monitor promotions for products"
group: products
toc: true
---

## Product Releases
The **Releases** feature provides visibility into a product’s deployment lifecycle as it moves through different environments during promotions.

A release is automatically created when a promotion is triggered, capturing the product and its application states at that moment. It allows you to monitor, visualize, and analyze changes from the initial trigger to final deployment, providing valuable insights for all stakeholders.

The Releases tab for a product lists both historical and ongoing releases.

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
Drilling into a specific release shows how promotions were orchestrated across environments using Promotion Workflows. The Release Notes compile all the changes leading up to the release.

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
Git commit status checks include promotion updates, allowing you to track progress and identify issues directly from Git. Clicking **Details** in Git takes you to the **Releases** view in Codefresh GitOps for further investigation.



{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/releases/release-status-in-git.png" 
	url="/images/gitops-products/releases/release-status-in-git.png" 
	alt="Promotion status updates in Git" 
	caption="Promotion status updates in Git"
  max-width="50%" 
%}

For detailed information, see [Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/).


## Related articles
[Assigning applications to Products]({{site.baseurl}}/docs/products/assign-applications/)   
[Assigning Promotion Flows and triggers to products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)   