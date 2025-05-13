---
title: "Configuring promotion concurrency"
description: "Queue or terminate releases for concurrent product promotions"
group: products
toc: true
---

## Promotion concurrency for products

When multiple promotions are triggered for a product, multiple releases can occur at the same time or concurrently.  
**Promotion concurrency** defines how these promotions are handled to ensure a structured, controlled process instead of overlapping or conflicting deployments.
By managing concurrency per product, teams can prevent deployment conflicts, reduce rollback risks, and maintain stability, aligning with Software Development Life Cycle (SDLC) best practices.




##### Why use promotion concurrency?
Adopt the promotion strategy that best matches the product. Always promote the latest changes for products in development, while enforcing sequential promotions for production environments ensuring that releases to production are not terminated abruptly.

##### Where can you configure promotion concurrency for products? 
In **Product > Settings > Promotion Concurrency**.

{% include
 image.html
 lightbox="true"
 file="/images/gitops-products/settings/promotion-concurrency.png"
 url="/images/gitops-products/settings/promotion-concurrency.png"
 alt="Configure promotion concurrency behavior in Product Settings"
 caption="Configure promotion concurrency behavior in Product Settings"
    max-width="50%"
%} 

## How promotion concurrency works
When a promotion starts for a product, it follows one of two concurrency policies:

### Queue releases (default)
With the queue concurrency policy, new releases are queued and wait for the ongoing release to complete execution.  
* If a release is already in progress, the new release enters a **QUEUED** state.
* The new release starts automatically once all previous releases reach a final state: successful, failed, terminated, or error.
* The default predefined queue limit for pending releases is 50 releases, ensuring releases do not accumulate indefinitely.
* If the release queue exceeds the limit for pending releases, older releases are terminated first.

### Terminate releases
With the terminate concurrency policy, ongoing releases are terminated when a new release is created for the same product and environment.
* If a new release promotes to the same environment as an active release, the active release is automatically terminated to allow the new one to proceed.  
  For example, if the ongoing release is currently promoting to `staging` and the new release also advances to `staging`, the ongoing release is terminated.
* Only one release can be active for a product at any given time.



## Related articles
[Assigning applications to products]({{site.baseurl}}/docs/products/assign-applications/)   
[Configuring promotion flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Configuring Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)  



<!--- ## Example scenarios

### Scenario 1: Standard queued promotion releases (default behavior)
A product has a promotion in progress for version v1.2.0.
A new promotion for version v1.3.0 is triggered while v1.2.0 is still in progress.
The v1.3.0 release enters a PENDING state until v1.2.0 reaches a final status (successful, failed, terminated).
Once v1.2.0 completes, v1.3.0 automatically starts its promotion.

### Scenario 2: Terminating active releases for faster iteration
A promotion for v1.2.0 is currently deploying.
A critical bug fix in v1.3.0 needs to be released immediately.
The user configures concurrency: terminate with policy: promotionFlow, meaning only releases using the same promotion flow are terminated.
The v1.2.0 release stops immediately, and v1.3.0 starts.

Scenario 3: Managing the Queue Size
A team has automated releases that generate a backlog of 60 promotions.
Since the queue limit is 50, the system automatically terminates older releases (FIFO order) to maintain the limit.
The most recent 50 releases remain in the queue, while the 10 oldest ones are removed.
Configuration Options
To control concurrency behavior, users can define settings in their promotion configuration:

-->