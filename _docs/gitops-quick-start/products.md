---
title: "Quick start: Environments, products and applications in Codefresh GitOps"
description: "Explore how to create and work with entities to promote and deploy applications"
group: gitops-quick-start
redirect_from:
  - /docs/quick-start/gitops-quick-start/gitops-products/
toc: true
---


In GitOps-driven promotions with Codefresh, environments, products, and applications are the foundational entities that enable seamless deployment and lifecycle management. These quick starts guide you through creating and managing these entities to ensure structured and efficient application delivery.

* **Environments** represent the various stages in your software delivery process, such as testing, staging, or production. Each environment serves a specific purpose, ensuring visibility into applications as they progress through development before reaching production.  
For details, see [Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/).

* **Products** bridge the gap between environments and applications. By grouping and managing applications as cohesive units, products simplify coordination, enhance organization, and amplify your ability to manage complex deployments.  
For details, see [About Products]({{site.baseurl}}/docs/products/about-products/).

* **Applications** are the core building blocks of your software delivery process. They represent the deployable artifacts, services, or microservices that power your business. Managing applications effectively is essential for ensuring reliability and efficiency in production.  
For details, see [Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).

## Follow-along Git repository
To make the quick starts as seamless as possible, we’ve created a [public GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/argocd-app-manifests){:target="\_blank"} with all the applications and resources featured in the guides. 

The repository is structured to help you follow along with the guides:
* `argocd-app-manifests`: Folder with manifests all the Argo CD applications used in the quick starts.
* `demo-applications`: Folder with the files and resources required for these applications.

## Quick start guides for environments, products, and applications

To get started with environments, products, and applications, explore these quick starts:  
[Quick start: Creating environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/)  
[Quick start: Creating products]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/)  
[Quick start: Creating applications]({{site.baseurl}}/docs/gitops-quick-start/products/create-app-ui/)  
[Quick start: Exploring the Product Dashboard]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-dashboard/)  



















