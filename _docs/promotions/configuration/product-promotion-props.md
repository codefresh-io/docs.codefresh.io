---
title: "Configure product promotion settings & flows"
description: "Configure key settings for the product to optimize promotion"
group: promotions
toc: true
---



Before or after configuring specialized promotion entities such as Promotion Flows, Policies, and Workflows, note that there are product-specific settings crucial to effective, reliable promotions, regardless of the method you use or intend to use.

If you've created products, make sure you have configured the following settings for a consistent promotion experience.

## Defining source for product versions and properties

##### Product version for promotion
The product version specifies the source of the version you want to promote. By defining the source for retrieving the version, you gain control over what is promoted at each stage.

**Why is it important?**
Setting a source for the version ensures that each promotion action consistently targets the correct version of your product's applications.  
This minimizes potential issues due to version discrepancies, maintains application integrity, and provides a traceable version history. 

##### Product properties for promotion
Product properties allow you to specify the files and precise attributes—such as tags, version numbers, or other application attributes—that should be promoted across environments.

**Why is it important?**
Configuring these properties combines precision with automation, enabling promotions that consistently meet your defined requirements.
Defining properties to be promoted for products ensures accuracy and enforces deployment standards that simplify cross-environment promotions.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/product/product-promotion-settings.png" 
url="/images/gitops-promotions/product/product-promotion-settings.png"
alt="Product Settings: Version and properties" 
caption="Product Settings: Version and properties"
max-width="60%"
%}

For details, see [Configuring app version and promotable properties]({{site.baseurl}}/docs/products/promotion-version-properties).

## Assigning a Promotion Flow and defining its triggers

If you’ve already created Promotion Flows, you can assign them to products and set up the triggers that initiate these flows based on specific conditions.

Assigning Promotion Flows to a product and configuring their triggers optimizes the automation of your promotion process, reducing manual input and increasing response efficiency. Triggered promotions allow you to promote changes in alignment with pre-defined pipeline conditions, such as matching commit messages or specific code changes. This alignment minimizes human error, ensures promotions happen at the correct time, and maintains a structured, policy-driven workflow.


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
