---
title: "Assigning applications to Products"
description: "Manually or declaratively connect applications to Products"
group: products
toc: true
---

After creating products, the next step is to assign applications to it.
Assigning applications to products groups these applications into a single cohesive entity, enabling efficient management for promotions and deployments.

There are two methods of assigning applications to a product:

* Declarative assignment 
  Defines an annotation with the Product name in the application's manifest. If the Product doesn’t exist, Codefresh automatically creates it for you.  
  The annotation is committed and saved in Git as part of the application definition.   
  Fully GitOps-compatible, this is the preferred method.   
  For how-to instructions, see [Connect applications to products with annotations]({{site.baseurl}}/docs/products/configure-product-settings/#connect-applications-to-product-with-annotations).

* Manual assignment  
  A one-click action for quick assignment within Product Settings.  
  Unlike other UI actions, manual assignment does not require a commit action. Applications assigned to a product are not stored in the product's resource definition.  
  Recommended for testing purposes and not as the preferred method.  
  For how-to instructions, see [Manually assign unassigned applications]({{site.baseurl}}/docs/products/configure-product-settings/#manually-assign-unassigned-applications).

You can always unassign an application from a product, for declaratively assigned applications by removing the annotation, and for manually assigned applications, by removing them through [Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/#unassign-manually-assigned-applications).


## Related articles
[Selecting Promotion Flows for Products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/promotion-version-properties/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Product Dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)  
[Creating products]({{site.baseurl}}/docs/products/create-product/)   