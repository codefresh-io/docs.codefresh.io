---
title: "About Products"
description: "Create Products to group and deploy applications"
group: products
toc: true
---




## Products in Codefresh GitOps
Harness the power of **Products** in Codefresh GitOps to streamline the management and deployment of Argo CD applications. 

A Product groups related Argo CD applications, providing a unified perspective as the applications progress through different stages of development and deployment. By defining relationships between applications across multiple environments, Products introduce an organizational layer providing context that help manage application releases as a cohesive unit.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-products/product-overview-pic.png" 
url="/images/gitops-products/product-overview-pic.png"
alt="Products and Product Dashboard in GitOps" 
caption="Products and Product Dashboard in GitOps"
max-width="70%"
%}

{::nomarkdown}<img src=../../../../images/icons/video-play-blue-small-5x?display=inline-block">{:/} **Explore Product Basics**](https://www.youtube.com/watch?v=m3wE4OfV9xE)


##### Boosting application management with Products
Products enhance and simplify application management by enabling controlled promotions, version tracking, and environment-specific configurations.  
Since an application can exist in multiple environments, grouping them within a Product helps compare versions, track changes, and maintain consistency.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-products/apps-grouped-by-product.png" 
url="/images/gitops-products/apps-grouped-by-product.png"
alt="Argo CD applications grouped by products organized by environments" 
caption="Argo CD applications grouped by products organized by environments"
max-width="60%"
%}

Explore the [Product Dashboard]({{site.baseurl}}/docs/dashboards/gitops-products/) for real-time visibility into deployments, Git changes, and environment status.  
Read more about the dashboard in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.


### Key benefits 
* **Unified application management**  
  Grouping interconnected applications simplifies management and streamlines deployments across environments.

* **Aapplication-environment linking**  
  Products bridge the gap between applications and environments, providing clarity and control over the deployment lifecyle.

* **Deployment visibility**
  Product promotions generate releases visualizing how promotions are orchestrated across environments, with insights into issue tracking, Git activity, and other actions that led to the promotion.

* **Effortless creation**  
  Create products through the UI orr declaratively using annotations in application manifests.

* **Real-time insights with integrated views**  
  The Product Dashboard consolidates information on Pods, Git changes, and feature activity, tailored to developers and other stakeholders.


## Creating and configuring Products

There are two ways to create a Product in Codefresh GitOps:

* From within an application
* From the Products page 

After [creating products]({{site.baseurl}}/docs/products/create-product/), assign applications, streamline their promotions, and gain visibility across environments.
See [Assigning applications to the product]({{site.baseurl}}/docs/products/assign-applications/).

## Promotion settings and promotions for Products

Promotion settings for a product define what changes can be advanced and under what conditions, ensuring that each promotion aligns with your deployment strategy.  
These settings provide control over:
* **Version source for applications**: Specify where application versions originate to maintain consistency across environments.
* **Promotable properties in applications**: Define precisely which settings are carried forward during a promotion.
* **Promotion Flows**: Assign the Promotion Flows most relevant to the Product, and configure the conditions that trigger each flow.  
See [Application version and promotable properties]({{site.baseurl}}/docs/products/promotion-version-properties/) and [Promotion flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/).

Promote a product manually to a specific environment or automate promotions across multiple environments using Promotion Flows.   
See [Triggering promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/).


{% include 
image.html 
lightbox="true" 
file="/images/gitops-products/promotion-settings-configure.png"
url="/images/gitops-products/promotion-settings-configure.png"
alt="Promotion settings for products" 
caption="Promotion settings for products"
max-width="60%"
%}

{::nomarkdown}<img src=../../../../images/icons/video-play-icon-blue-small.png?display=inline-block ">{:/} [**Dive into Promotion Settings for Products**](https://www.youtube.com/watch?v=AjFhoja8TjY){:target="\_blank"}

{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue-small.png?display=inline-block "><span><a href="https://www.youtube.com/watch?v=AjFhoja8TjY">Dive into Promotion Settings for Products</a></span>{:/}

{::nomarkdown}<img src=../../../../images/icons/video-play-icon-blue.png?display=inline-block">{:/} [**Dive into Promotion Settings for Products**](https://www.youtube.com/watch?v=AjFhoja8TjY){:target="\_blank"}

## Tracing Product promotions through Releases
Whenever a Product is promoted, Codefresh GitOps generates a Release, capturing the promotion orchestration across environments. The Releases tab of the product lists both ongoing and completed releases, from where you can monitor specific releases.  
See [Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases).

{% include 
image.html 
lightbox="true" 
file="/images/gitops-products/releases/product-releases-tab.png" 
url="/images/gitops-products/releases/product-releases-tab.png"
alt="Monitoring product promotions in Releases tab" 
caption="Monitoring product promotions in Releases tab"
max-width="60%"
%}

>**NOTE**  
In the documentation, both Product (capitalized) and product (lowercase) refer to the same entity in Codefresh GitOps. They are used interchangeably for readability and consistency.


