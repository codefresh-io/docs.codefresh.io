---
title: "Customizing promotion settings for Products"
description: "Select promotion flows, triggers, and more to tailor promotion settings for product"
group: promotions
redirect-from: 
 - /docs/promotions/configuration/
 - /docs/promotions/entities/
toc: true
---


## Promotion Settings for products

Promotion settings for products define how and when product are promoted across environments. They determine which promotion sequences are valid, the triggers that initiate them, and the exact changes that should be promoted. These settings ensure consistent, accurate, and reliable delivery of updates while aligning with your deployment strategy.

By automating promotion settings, you reduce manual effort, minimize errors, and promote changes under the right conditions.



### What promotion settings can you configure for products?

* [Product version for promotion](#product-version-for-promotion)  
  Define the source for retrieving the product’s version.

* [Product properties for promotion](#product-properties-for-promotion)  
  Specify the files and attributes to promote across environments.

* [Concurrent promotion behavior](#concurrent-promotion-behavior-for-product)  
  Define what happens when multiple promotions are triggered for the same product.

* [Promotion Flows and triggers](#assigning-promotion-flows-and-triggers)  
  Assign one or more predefined Promotion Flows and configure the conditions under which each is triggered.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/product/product-promotion-settings.png" 
url="/images/gitops-promotions/product/product-promotion-settings.png"
alt="Product Settings: Version and properties for promotion" 
caption="Product Settings: Version and properties for promotion"
max-width="60%"
%}



## Product version for promotion

The product version defines the source from which the application version is retrieved and promoted.

#### Why is this important?

Defining the version source ensures that each promotion consistently targets the correct version, reducing the risk of mismatches, maintaining application integrity, and providing a traceable version history.

> **NOTE**  
The Environments, Product, and GitOps Apps dashboards display product versions **only for Helm-based applications**. For other types, versions are not displayed—even if configured.

#### Version Attribute

The version is defined using a JSON path expression, relative to the `spec.source.repoURL` and `spec.source.path` attributes in the application's manifest.
Review [examples of version attributes]({{site.baseurl}}/docs/products/promotion-version-properties/#examples-of-version-attributes).

For details, see [Configuring versions for promoted applications]({{site.baseurl}}/docs/products/promotion-version-properties/).


## Product properties for promotion

Define which files or specific attributes—such as tags, version numbers, or other application attributes—should be promoted along with the product.

##### Why is this important?

It enables precise, automated promotions across environments while enforcing deployment standards. This ensures consistency and simplifies cross-environment updates.

##### Property attributes

You can define multiple files or nested attributes using JSON path expressions.
Review [examples of promotable properties]({{site.baseurl}}/docs/products/promotion-version-properties/#examples-of-properties-for-promotion).

For details, see [Configuring properties for promotion across applications]({{site.baseurl}}/docs/products/promotion-version-properties/#configuring-properties-for-promotion-across-applications).






## Concurrent promotion behavior for product

Promotion flows can be triggered either automatically or manually, which may lead to multiple promotions being activated for the same product.  
Manage this by configuring the behavior for concurrent promotions.


##### Available settings

* **Queue new promotions**  
  The new promotion will wait until the current one completes before starting.

* **Terminate active promotion**  
  The current promotion will be stopped immediately, and the new promotion will begin.

For details, see [Configuring promotion concurrency for products]({{site.baseurl}}/docs/products/promotion-concurrency/).


## Assigning Promotion Flows and triggers

Assign predefined Promotion Flows to a product and configure the triggers that initiate each flow based on specific conditions.

#### Why is this important?

Assigning flows and defining their triggers ensures that changes are promoted under the right conditions, reduces manual work improving automation for a more reliable promotion process.

{% include
 image.html
 lightbox="true"
 file="/images/gitops-promotions/product/product-promotion-flow-triggers.png"
 url="/images/gitops-promotions/product/product-promotion-flow-triggers.png"
 alt="Product Settings: Promotion Flows & triggers"
 caption="Product Settings: Promotion Flows & triggers"
 max-width="50%"
%}



## Related articles
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)  
[Create products]({{site.baseurl}}/docs/products/create-product/)  
