---
title: "Quick start: Promotions in Codefresh GitOps"
description: "Explore basic & advanced promotion scenarios"
group: gitops-quick-start
toc: true
---



A successful promotion sequence relies on several key components that together govern and orchestrate the promotion flow across environments. Promotions orchestrate the flow of changes across environments, ensuring controlled and validated deployments. 

The series of quick starts on promotions guide you through the different scenarios, from basic to advanced.


## Core entities for all promotion scenarios
Every promotion scenario relies on three foundational entities:

* **Applications**  
  Represent deployable services or microservices.

* **Products**  
  Group and manage related applications, enabling consistent configuration and visibility.

* **Environments**
  Define where changes are promoted, representing distinct deployment stages like development, staging, or production.

These entities form the basis of your deployment structure. With them in place, you can initiate basic promotions, such as moving changes between environments using a simple drag-and-drop method.

To enable more advanced deployment strategies, promotions have additional unique entities:

* **Promotion Flows**
  After setting up the basics, orchestrate promotion across multiple environments. 
  Use our Promotion Flow entity to create complex, multi-environment deployment strategies.

* **Promotion Workflows**  
  Introduce gates in the promotion process through Promotion Workflows, another entity unique to promotions in GitOps.  
  Through Promotion Workflows, you can create and implement any type of tests to validate readiness, enforce compliance, mitigate risks, and confirm performance. By incorporating gates, Promotion Workflows provide structured, repeatable validation points throughout your promotion sequence, giving you confidence in every deployment.

Explore these quick starts on promotions:
* [Drag-and-drop promotions]({{site.baseurl}}/docs/gitops-quick-start/promotions/drag-and-drop/)  
* [Multi-environment sequential promotion]({{site.baseurl}}/docs/gitops-quick-start/promotions/multi-env-sequential-flow/)  
* [Multi-environment promotion with gates]({{site.baseurl}}/docs/gitops-quick-start/promotions/policy-multi-env-promotion/)  
* [Multi-environment promotion with parallel environments]({{site.baseurl}}/docs/gitops-quick-start/promotions/parallel-multi-env-promotion/)  
* [Multi-environment promotion with dependencies]({{site.baseurl}}/docs/gitops-quick-start/promotions/dependency-multi-env-promotion/)





<!--- ## Related articles add inline to the different topics as needed
[Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/)  
[Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Promotion Flow]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/)  
[Promotion Policy]({{site.baseurl}}/docs/promotions/configuration/promotion-policy/)  
[Promotion Workflow]({{site.baseurl}}/docs/promotions/configuration/promotion-workflow/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  -->