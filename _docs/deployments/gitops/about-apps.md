---
title: "About applications in GitOps"
description: "Unique features for Argo CD applications in Codefresh GitOps"
toc: true
---






## GitOps applications
In GitOps, applications define infrastructure and services declaratively in Git repositories. These configurations ensure that your system’s desired state is always versioned, auditable, and recoverable in case of failure.

### Argo CD applications
In Argo CD, an application is a core concept, representing a logical grouping of Kubernetes manifests. These manifests define what resources to deploy, where to deploy them, and how to synchronize the live state on the cluster with the desired state stored in Git.  
Argo CD automates synchronization, ensuring deployments remain consistent and preventing configuration drift through Git as the single source of truth. 

### Argo CD applications with Codefresh GitOps

Codefresh GitOps integrates natively with Argo CD, allowing you to create, configure, and manage fully GitOps-compliant applications directly within the platform.   

Codefresh automates:
* Generating application manifests
* Committing them to Git
* Synchronizing them with Kubernetes clusters

##### Seamless visibility across Argo CD applications
When you install the GitOps Runtime and connect your clusters, all Argo CD applications—across all clusters and namespaces—are automatically displayed in the GitOps Apps dashboard. No manual action is required. This centralized view provides unparalleled visibility, simplifying monitoring, troubleshooting, and scaling deployments.

##### Argo CD application types in Codefresh GitOps
* **Standard Argo CD applications**: Full support for creation, configuration, and management.
* **ApplicationSets**: View and monitor resources and configuration.
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
The GitOps Apps dashboard is the central hub for viewing, creating, and managing Argo CD applications.  

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="GitOps Apps dashboard"
caption="GitOps Apps dashboard"
max-width="60%"
%}

This dashboard provides a high-level overview of all applications, their types, and their structure. From here, you can drill down into individual applications for detailed insights into deployments, resources, and configuration settings. 

Key actions include:
* Creating new Argo CD applications
* Managing application configuration settings
* Monitoring application resources
* Viewing deployment history
* Rolling back application releases


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

Codefresh provides a holistic view of environments where product applications are deployed, along with insights into commits, contributors, and deployed features. This approach simplifies complex deployments by enabling you to:
* Coordinate related applications across environments
* Manage promotions at the product level for a unified view of application performance and health 

See [About Products]({{site.baseurl}}/docs/products/about-products/).

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

Codefresh offers multiple promotion methods, ranging from manual drag-and-drop to Promotion Flows, which integrate seamlessly with environments and products to:
* Promote changes across multiple environments
* Coordinate promotions across multiple applications within a product

See [About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/).

{% if page.collection != site.gitops_collection %}
## DORA for DevOps metrics
The Product and Environment dashboards provide enterprise-wide visibility into your applications in the context of their current deployment.  
Another key dashboard with critical insights into applications is the DORA dashboard, which tracks DevOps performance metrics like lead time for changes and deployment frequency.

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



