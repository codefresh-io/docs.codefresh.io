---
title: "Customizing promotion settings for Products"
description: "Select promotion flows, triggers, and more to tailor promotion settings for product"
group: promotions
redirect-from: 
 - /docs/promotions/configuration/
 - /docs/promotions/entities/
toc: true
---

## Promotion settings for Products

Promotion settings for products define the configurations that determine which promotion sequences are valid based on changes to the product, the conditions under which to initiate them, and the exact changes to promote. These settings ensure consistent, accurate, and reliable delivery of updates across environments.

By automating these configurations, promotion settings by product reduce manual effort, minimize errors, and align with your deployment strategy to ensure that changes are deployed under the right conditions.

##### What promotion settings can you configure for the Product?
* Product version (for Helm-based applications)
* Properties to promote
* Promotion Flows and their triggers

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
The product version specifies the source of the version you want to promote. 


##### Why is it important?
Defining a source for the product version ensures that each promotion action consistently targets the correct version of your product's applications. This minimizes risks associated with version mismatches, maintains application integrity, and provides a traceable version history.


>**NOTE**  
The Environments, Product, and GitOps Apps dashboards display the product version _only for Helm application types_. For other application types, product versions are not displayed versions even when configured.

##### Version attribute
The Version attribute, defined as a JSON path expression, is relative to the `spec.source.repoURL` and `spec.source.path` attributes defined in the source application's configuration manifest.   
Review [examples of version attributes]({{site.baseurl}}/docs/products/promotion-version-properties/#examples-of-version-attributes).

For details, see [Configuring versions for promoted applications]({{site.baseurl}}/docs/products/promotion-version-properties/).


## Product properties for promotion
Product properties specifies the files and precise attributes—such as tags, version numbers, or other application attributes—to promote across environments.

##### Why is it important?
Configuring properties combines precision with automation, ensuring that promotions consistently meet your defined requirements.
Defining properties to be promoted for products simplifies cross-environment promotions, enforces deployment standards, and enables targeted updates.

##### Property attributes
You can define multiple files, or attributes within a file at any level, through JSON path expressions, as properties for promotion. 
Review [examples of promotable properties]({{site.baseurl}}/docs/products/promotion-version-properties/#examples-of-properties-for-promotion).

For details, see [Configuring properties for promotion across applications]({{site.baseurl}}/docs/products/promotion-version-properties/#configuring-properties-for-promotion-across-applications).




## Promotion Flows and triggers

If you’ve already created Promotion Flows, you can assign one or more flows to products and set up the triggers that initiate these flows based on specific conditions.

##### Why is it important?
By assigning Promotion Flows and defining triggers, you reduce manual input, streamline automation, and ensure that changes are promoted in alignment with predefined conditions. This results in a more efficient and reliable promotion process.


{% include
 image.html
 lightbox="true"
 file="/images/gitops-promotions/product/product-promotion-flow-triggers.png"
 url="/images/gitops-promotions/product/product-promotion-flow-triggers.png"
 alt="Product Settings: Promotion Flows & triggers"
 caption="Product Settings: Promotion Flows & triggers"
 max-width="50%"
%}


For details, see [Configuring promotion flows and triggers]({{site.baseurl}}/docs/products/promotion-flow-triggers/).

## Related articles
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)  
[Create products]({{site.baseurl}}/docs/products/create-product/)  
