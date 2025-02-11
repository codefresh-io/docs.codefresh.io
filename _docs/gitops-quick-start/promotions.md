---
title: "Quick start: Promotions in Codefresh GitOps"
description: "Explore basic & advanced promotion scenarios"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/
---


Promotions orchestrate the flow of changes for applications across environments, ensuring controlled and validated deployments. 
A successful promotion sequence relies on several key components that together govern and orchestrate the promotion flow across environments. 

In this series of quick starts, you'll explore different promotion scenarios, from basic to advanced. To implement these promotion flows, you will need to create and manage additional environments and applications, building on the foundational entities you've already set up in previous quick starts.

## Core entities for all promotion scenarios
Every promotion scenario relies on three foundational entities:

* **Applications**  
  Represent deployable services or microservices.

* **Products**  
  Group and manage related applications, enabling consistent configuration and visibility.

* **Environments**
  Define where changes are promoted, representing distinct deployment stages like development, staging, or production.

These entities form the basis of your deployment structure. With them in place, you can initiate basic promotions, such as moving changes between environments using a simple drag-and-drop method.

## Promotion-specific entities
To enable more advanced deployment strategies, promotions require additional unique entities:

* **Promotion Flows**
  Enable promotion orchestration for applications across multiple environments.  
  In these quick starts, you'll use the Flow Builder to create promotion flows with parallel environments, and with dependencies across environments, allowing for more complex deployment strategies.

* **Promotion Workflows**  
  Introduce gates in the promotion process through Promotion Workflows, another entity unique to promotions in GitOps.  
  Through Promotion Workflows you can create and implement any type of tests to validate readiness, enforce compliance, mitigate risks, and confirm performance. While this series of quick starts does not currently cover Promotion Workflows, there are workflow examples to guide you in implementing tests to validate readiness, enforce compliance, mitigate risks, and confirm performance.<!--- By incorporating gates, Promotion Workflows provide structured, repeatable validation points throughout your promotion sequence, giving you confidence in every deployment.  -->

## Follow-along Git repository
The manifests and resources for the additional applications required for these promotion scenarios are available in the follow-along GitHub repository.

## Quick start guides for promotions
Explore these quick starts on promotions:
* [Drag-and-drop promotions]({{site.baseurl}}/docs/gitops-quick-start/drag-and-drop/)  
* [Multi-environment sequential promotion]({{site.baseurl}}/docs/gitops-quick-start/multi-env-sequential-flow/)  
* [Multi-environment promotion with gates]({{site.baseurl}}/docs/gitops-quick-start/policy-multi-env-promotion/)  
* [Multi-environment promotion with parallel environments]({{site.baseurl}}/docs/gitops-quick-start/parallel-multi-env-promotion/)  
* [Multi-environment promotion with dependencies]({{site.baseurl}}/docs/gitops-quick-start/dependency-multi-env-promotion/)

