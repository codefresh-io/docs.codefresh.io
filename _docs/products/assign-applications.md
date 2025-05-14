---
title: "Assigning applications to products"
description: "Manually or declaratively connect applications to products"
group: products
toc: true
---

After creating a product, the next step is to assign applications to it.
Assigning applications to a product groups these applications into a single cohesive entity, making it easier to manage promotions and deployments.

## Methods for assigning applications
There are three methods of assigning applications to a product: during application creation, through declarative or manual assignment.

### Assignment during application creation
When creating an application, in the Configuration tab, select an existing product or create a new one.
* Codefresh automatically adds the annotation to the application’s manifest.
* The annotation is committed and saved in Git as part of the application definition.
* This method is also declarative and GitOps-compatible.

See [Products in application configuration]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#products).

### Declarative assignment
Defines an annotation with the product name in the application's manifest. If the product doesn’t exist, Codefresh GitOps automatically creates it for you. 
* The annotation is committed and saved in Git as part of the application definition.   
* This method is fully GitOps-compatible and ensures consistency across environments.   
  
For how-to instructions, see [Connect applications to products with annotations]({{site.baseurl}}/docs/products/configure-product-settings/#connect-applications-to-product-with-annotations).

### Manual assignment
Assign applications to a product directly in Product Settings with a one-click action. Recommended for testing purposes and not as the preferred method. 
* Manual assignment does not require a commit action. 
* Applications assigned this way are not stored in the product's resource definition.  
 
For how-to instructions, see [Manually assign unassigned applications]({{site.baseurl}}/docs/products/configure-product-settings/#manually-assign-unassigned-applications).

## Unassigning applications
You can always unassign an application from a product:
* **Declaratively assigned applications** by removing the annotation from the application's manifest.
* **Manually assigned applications** by unassigning them through [Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/#unassign-manually-assigned-applications).


## Related articles
[Assigning Promotion Flows and triggers to products to products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Configuring version and promotable properties for Products]({{site.baseurl}}/docs/products/promotion-version-properties/)  
[Tracking Product releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Product Dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/)  
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)   