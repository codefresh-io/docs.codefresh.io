---
title: "Configuring promotion concurrency policy"
description: "Queue or terminate releases for concurrent product promotions"
group: products
toc: true
---

## Promotion concurrency

When multiple promotions are triggered for a product, multiple releases can occur at the same time or concurrently.  
**Promotion concurrency** defines how these promotions are handled to ensure a structured, controlled process instead of overlapping or conflicting deployments.
By managing concurrency per product, teams can prevent deployment conflicts, reduce rollback risks, and maintain stability, aligning with Software Development Life Cycle (SDLC) best practices.

## Why use promotion concurrency?
* **Improved reliability**: Ensures that each release completes before the next one begins, preventing conflicts and incomplete deployments.
* **Operational consistency**: Ensures that ongoing releases are not abruptly terminated, preserving deployment stability.

## How promotion concurrency works
When a promotion starts for a product, it follows one of two concurrency policies:

### Queue releases (default)
With this policy, new releases are queued and wait until the ongoing release completes execution.
* If a release is already in progress, the new release enters a PENDING state.
* The new release starts automatically once all previous releases reach a final state, successful, failed, terminated, or error.
* The default queue limit for pending releases is 50 releases, ensuring promotions do not accumulate indefinitely.
* If the release queue exceeds this limit, older releases are terminated in order from first to last (configurable).

### Terminate releases
The second concurrency policy is to terminate releases. With this policy, when a new release is created, the ongoing release is automatically terminated.  
* Refine this policy to only terminate an ongoing release running the same Promotion Flow instead of all active releases for the product.

Managing queue limits
Automated releases generate a backlog of 60 promotions.
Since the queue limit is 50, the system automatically terminates older releases (FIFO order) to maintain the limit.




Example Scenarios
Scenario 1: Standard Queued Promotions (Default Behavior)
A product has a promotion in progress for version v1.2.0.
A new promotion for version v1.3.0 is triggered while v1.2.0 is still deploying.
The v1.3.0 release enters a PENDING state until v1.2.0 reaches a final status (successful, failed, terminated).
Once v1.2.0 completes, v1.3.0 automatically starts its promotion.

Scenario 2: Terminating Active Releases for Faster Iteration
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