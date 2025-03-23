---
title: "About applications in GitOps"
description: "Unique features for Argo CD applications in Codefresh GitOps"
toc: true
---






## Codefresh GitOps applications
In Codefresh GitOps, applications define infrastructure and services declaratively in Git repositories. These configurations ensure that your system’s desired state is always versioned, auditable, and recoverable in case of failure.

### Argo CD applications
In Argo CD, an application is a core concept, representing a logical grouping of Kubernetes manifests. These manifests define what resources to deploy, where to deploy them, and how to synchronize the live state on the cluster with the desired state  in Git.  
Argo CD automates synchronization, ensuring deployments remain consistent and preventing configuration drift through Git as the single source of truth. 

>**NOTE**  
All applications in Codefresh GitOps are Argo CD applications. The terms _Argo CD application_ and _application_ are used interchangeably in the documentation.

### Argo CD applications in Codefresh GitOps

Codefresh GitOps integrates natively with Argo CD, allowing you to create, configure, and manage GitOps-compliant applications directly within the platform.   

Codefresh automates: 
* Generating application manifests
* Committing them to Git
* Synchronizing them with Kubernetes clusters

##### Seamless visibility across Argo CD applications
When you install the GitOps Runtime and connect your clusters, all Argo CD applications—across all clusters and namespaces—are automatically displayed in the GitOps Apps dashboard. No manual action is required. This centralized view provides unparalleled visibility, simplifying monitoring, troubleshooting, and scaling deployments.

### Argo CD application types in Codefresh GitOps
Codefresh supports multiple types of Argo CD applications, ensuring visibility and management for each.  
The level of support varies based on application type:

* **Standard Argo CD applications**: Full lifecyle support: Create, configure, manage, promote, and monitor deployments.
* **ApplicationSets**: View and monitor resources and configuration, with with insights into deployment status.
* **Multi-source applications**: View and monitor resources and configuration.


{% include
image.html
lightbox="true"
file="/images/applications/dashboard/app-view.png"
url="/images/applications/dashboard/app-view.png"
alt="Argo CD applications in Codefresh GitOps"
caption="Argo CD applications in Codefresh GitOps"
max-width="60%"
%}











## GitOps Apps dashboard
The GitOps Apps dashboard provides a centralized view of all Argo CD applications across clusters and namespaces. This visibility simplifies monitoring, troubleshooting, and scaling deployments.

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard"
caption="GitOps Apps dashboard"
max-width="60%"
%}

From the GitOps Apps dashboard, you can:
* Create new Argo CD applications
* Manage application configurations
* Monitor application resources
* View application deployment history
* Roll back application releases

See [GitOps Apps dashboard]({{site.baseurl}}/docs/dashboards/gitops-apps-dashboard/).

## Codefresh GitOps features for integrating applications

##### Environments and Argo CD applications
Environments represent stages in your software delivery cycle, such as testing, staging, or production.  

{% include
image.html
lightbox="true"
file="/images/applications/overview-environments.png"
url="/images/applications/overview-environments.png"
alt="Environments in Codefresh GitOps"
caption="Environments in Codefresh GitOps"
max-width="60%"
%}

Associating applications with environments provides:
* Clear visibility into which applications are deployed in which environment
* A structured progression for applications throughout development

See [About environments]({{site.baseurl}}/docs/environments/environments-overview/).

##### Products and Argo CD applications
Products group related applications, providing context and making it easier to manage and deploy them as cohesive units.. 

{% include
image.html
lightbox="true"
file="/images/applications/overview-products.png"
url="/images/applications/overview-products.png"
alt="Products in Codefresh GitOps"
caption="Products in Codefresh GitOps"
max-width="60%"
%}

With products in Codefresh GitOps, you get:
* A unified view of product deployments across environments
* Insights into commits, contributors, and deployed features
* The ability to coordinate promotions across multiple applications

See [About products]({{site.baseurl}}/docs/products/about-products/).

##### Promotions and Argo CD applications
Codefresh GitOps simplifies promotions, enabling controlled deployments across environments with minimal effort.


{% include
image.html
lightbox="true"
file="/images/applications/overview-promotions.png"
url="/images/applications/overview-promotions.png"
alt="Promotions in Codefresh GitOps"
caption="Promotions in Codefresh GitOps"
max-width="60%"
%}

With promotions in Codefresh GitOps, you can:
* Select different methods to promote applications, from manual drag-and-drop to predefined automated Promotion Flows
* Coordinate promotions across multiple applications within a product
* Promote changes across multiple environments


See [About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/).

{% if page.collection != site.gitops_collection %}
## DORA for DevOps metrics
The Product and Environment dashboards provide enterprise-wide visibility into your applications in the context of their current deployment.  
The **DORA dashboard** tracks key DevOps performance metrics like lead time for changes and deployment frequency.

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
{% endif %}

## Getting started with applications
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/)  
[Managing Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application/)  



