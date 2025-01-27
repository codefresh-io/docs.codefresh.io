---
title: "About applications in GitOps"
description: "Unique features for Argo CD applications in Codefresh GitOps"
toc: true
---






## GitOps applications
In the GitOps context, applications represent a declarative definition of infrastructure and services stored in Git repositories. These configurations ensure that the desired state of your system is always versioned, auditable, and easily recoverable in case of failure.

##### Argo CD applications
In Argo CD, an application is a core concept, representing a logical grouping of Kubernetes manifests. These manifests define what resources to deploy, where to deploy them, and how to synchronize the live state on the cluster with the desired state stored in Git.  
Argo CD automates synchronization, ensuring deployments remain consistent and preventing configuration drift through Git as the single source of truth. 

##### Argo CD applications with Codefresh GitOps
Codefresh GitOps is fully integrated with and builds on the foundation of Argo CD applications, adding unique capabilities that provide context and lifecycle management.  

{% include
image.html
lightbox="true"
file="/images/applications/dashboard/app-view.png"
url="/images/applications/dashboard/app-view.png"
alt="Argo CD applications in Codefresh GitOps"
caption="Argo CD applications in Codefresh GitOps"
max-width="60%"
%}

* **Automated integration with Argo CD**: When you install the GitOps Runtime and connect your clusters, all Argo CD applications across those clusters are displayed in the GitOps Apps dashboard, with no manual action required from you. 

* **Create and manage**: You can create fully GitOps-compliant standalone Argo CD applications directly in the platform, with full functionality to monitor, configure, and manage them. Application manifests are automatically generated on commit to Git and synchronized with your Kubernetes clusters. This tight integration ensures every deployment adheres to GitOps principles.

* **Application types**: The GitOps Apps dashboard displays ApplicationSets<!--- and multi-source applications-->, and the ability to view and monitor their resources. At this time, we do not support creating these in Codefresh.

* **Unique GitOps features**: Features such as products for grouping relating applications, environments to align them with specific stages in your software lifecyle, and promotion mechanisms for deployment make application delivery transparent and efficient. Read more details in the sections that follow.



## GitOps Apps dashboard
The GitOps Apps dashboard is your central hub for viewing, creating, and managing Argo CD applications.  

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard"
caption="GitOps Apps dashboard"
max-width="60%"
%}

This dashboard provides a comprehensive view of your applications, their type, and structure, making it an essential starting point for managing them. From this high-level view, you can deep dive into detailed insights, including deployments, resources, configuration settings, and other critical aspects of individual applications:
* Create new Argo CD applications
* View and manage application configuration settings
* Monitor application resources
* View deployment history
* Rollback application releases


## GitOps features for integrating applications

##### Environments and Argo CD applications
Environments represent stages in your software delivery process, such as testing, staging, or production.  

{% include
image.html
lightbox="true"
file="/images/applications/overview-environments.png"
url="/images/applications/overview-environments.png"
alt="Environments in Codefresh GitOps"
caption="Environments in Codefresh GitOps"
max-width="60%"
%}

By associating applications with environments, you gain:
* Clear visibility into which applications are deployed in which environment
* A structured progression for applications as they move through your development lifecycle

See [Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/).

##### Products and Argo CD applications
Products group related applications, providing context for managing and deploying multiple applications as cohesive units. 

{% include
image.html
lightbox="true"
file="/images/applications/overview-products.png"
url="/images/applications/overview-products.png"
alt="Products in Codefresh GitOps"
caption="Products in Codefresh GitOps"
max-width="60%"
%}

Codefresh seamlessly collates the environments where each application in the product is deployed, along with insights into commits, contributors, and features deployed across versions.
This approach simplifies complex deployments by enabling you to:
* Coordinate related applications across environments
* Manage promotions at the product level for a unified view of application performance and health 

See [About Products]({{site.baseurl}}/docs/products/about-products/).

##### Promotions and Argo CD applications
Promotions are a key feature in Codefresh GitOps, simplifying the software development lifecyle and deployment of applications in production.


{% include
image.html
lightbox="true"
file="/images/applications/overview-promotions.png"
url="/images/applications/overview-promotions.png"
alt="Promotions in Codefresh GitOps"
caption="Promotions in Codefresh GitOps"
max-width="60%"
%}

Codefresh offers multiple promotion methods, ranging from manual drag-and-drop to Promotion Flows, which integrate seamlessly with environments and products, enabling you to:
* Promote changes across multiple environments in sequence or in parallel.
* Coordinate promotions across multiple applications grouped in a product.

See [About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/).

## DORA for DevOps metrics
As mentioned, we have the Product and Environment dashboards for enterprise-wide visibility into your applications in the context of their current deployment.  
Another key dashboard with critical insights into applications is the DORA dashboard, which tracks DevOps metrics like lead time for changes and deployment frequency.

{% include
image.html
lightbox="true"
file="/images/reporting/dora-metrics.png"
url="/images/reporting/dora-metrics.png"
alt="DORA metrics dashboard"
caption="DORA metrics dashboard"
max-width="80%"
%}

See [DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/).

## Getting started with applications
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Managing Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/)  



