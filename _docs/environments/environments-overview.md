---
title: "About environments"
description: "Create environments reflecting SDLC and track applications"
group: environments
toc: true
---



## Environments in Codefresh GitOps
An environment in Codefresh GitOps is a logical grouping of one or more Kubernetes clusters and namespaces, representing a deployment context for your Argo CD applications. Environments provide visibility into all Argo CD applications deployed within these clusters and namespaces, enabling teams to track application states at a glance.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/environments-dashboard.png" 
	url="/images/gitops-environments/environments-dashboard.png" 
	alt="Environments dashboard" 
	caption="Environments dashboard"
  max-width="60%" 
%}

Structuring environments around your software development life cycle (SDLC)—such as development, staging, and production-helps you track and manage deployments as they transition between stages.  
Explore the [Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/) to understand how Codefresh GitOps consolidates this information.  

#####  Benefits of environments

* **Aligns with your SDLC**  
  Environments mirror your SDLC, linking applications to their development and deployment stages. This structured view simplifies lifecycle management for applications from initial development to production releases.

* **Unified visibility across deployments**  
  Codefresh GitOps consolidates all applications deployed to an environment’s clusters and namespaces, providing a centralized view. Teams can quickly see where applications are running, improving transparency and troubleshooting.

* **Flexible and scalable**  
  * Create environments by defining a name and associating it with Kubernetes clusters and namespaces.
  * Scale seamlessly by adding new environments or expanding existing ones with additional clusters or namespaces.
  * Create environments even before deploying applications to support future planning and infrastructure readiness.

See [Create and manage environments]({{site.baseurl}}/docs/environments/create-manage-environments/).

## How environments interact with products and applications

The diagram illustrates how Argo CD applications are organized within environments.

{% include
image.html
lightbox="true"
file="/images/gitops-environments/argo-apps-organized-into-envs.png"
url="/images/gitops-environments/argo-apps-organized-into-envs.png"
alt="Argo CD applications organized in environments"
caption="Argo CD applications organized in environments"
max-width="70%"
%}

* **Environments and products**  
  Products bridge applications and environments, enabling you to manage applications across multiple environments.

* **Applications in environments**  
  Every Argo CD application deployed to an environment’s clusters and namespaces is automatically displayed in that environment. This allows you to track deployments, application versions, and current states.  

* **Promotions between environments**  
  Promotions in Codefresh GitOps are fully integrated into your deployment workflow, ensuring controlled and predictable application progression.
  You can promote applications and products between environments manually or through automated Promotion Flows directly from the Environments dashboard.


See [Manage products and applications in environments]({{site.baseurl}}/docs/environments/manage-apps-in-environments/).


