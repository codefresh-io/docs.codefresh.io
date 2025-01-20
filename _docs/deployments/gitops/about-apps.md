---
title: "About applications in GitOps"
description: "Unique features for Argo CD applications in Codefresh GitOps"
toc: true
---






## GitOps applications
Applications in the GitOps context represent a declarative definition of infrastructure and services stored in Git repositories. These configurations ensure that the desired state of your system is always versioned, auditable, and easily recoverable in case of failure.

##### Argo CD applications
In Argo CD, an application is a core concept representing a logical grouping of Kubernetes manifests. These manifests define what resources to deploy, where to deploy them and how to synchronize the live state with the desired state stored in Git.  
Argo CD automates synchronization, ensuring deployments remain consistent and preventing configuration drift. For example, an application that passes testing in the staging environment but encounters issues in production can be quickly traced and adjusted, thanks to Git as the single source of truth. This traceability ensures auditability and operational efficiency across environments.

##### Argo CD applications with Codefresh GitOps
Codefresh GitOps builds on the foundation of Argo CD applications, adding unique capabilities that enhance context, deployment workflows, and lifecycle management.  

With Codefresh, you can:
Create full-featured, completely GitOps-compliant Argo CD applications in Form or YAML modes. The application manifest is generated, committed to Git, and synced to your cluster.
View the different types applications and how they are structured wuth these applications and their resources Application manifests are auto-generated, committed to Git, and synchronized to your Kubernetes clusters, ensuring complete compliance with GitOps principles.

See []

## Codefresh GitOps features for integrating applications

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

This approach simplifies complex deployments by enabling you to:
* Coordinate related applications across environments.
* Manage promotions at the product level for a unified view of application performance and health. 

See [About Products]({{site.baseurl}}/docs/products/about-products/).

##### Promotions and Argo CD applications
Promotions are a critical part of application delivery in Codefresh GitOps.  

{% include
image.html
lightbox="true"
file="/images/applications/overview-promotions.png"
url="/images/applications/overview-promotions.png"
alt="Promotions in Codefresh GitOps"
caption="Promotions in Codefresh GitOps"
max-width="60%"
%}

They streamline deployment processes by:
* Automating application delivery across environments and products
* Enforcing environment-specific checks, such as compliance and performance validations
* Governing promotions with policy-based gates, ensuring only approved changes move forward
* Simplifying multi-environment promotions, reducing manual effort and operational risks

See [About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/).

## Dashboards for insights
The Product and Environment dashboards provide enterprise-wide visibility into your applications in the context of their current deployment. 

Other key dashboards with critical insights into applications include the GitOps Apps and DORA dashboards.

##### GitOps Apps dashboard
The go-to dashboard to view how your applications are structured, create individual applications, manage configuration settings, monitor resources, and historical deployments for applications.

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard"
caption="GitOps Apps dashboard"
max-width="60%"
%}


##### DORA dashboard
Track metrics like lead time for changes and deployment frequency.

{% include
image.html
lightbox="true"
file="/images/reporting/dora-metrics.png"
url="/images/reporting/dora-metrics.png"
alt="DORA metrics dashboard"
caption="DORA metrics dashboard"
max-width="80%"
%}


<!--- ## Getting started with applications  -->




