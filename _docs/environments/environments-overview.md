---
title: "About Environments"
description: "Create Environments reflecting SDLC and track applications"
group: environments
toc: true
---



## Environments in Codefresh GitOps
An environment in Codefresh is a logical grouping of one or more Kubernetes clusters and namespaces, representing a deployment context for your applications. Environments provide visibility into all Argo CD applications deployed within these clusters and namespaces, enabling teams to track application states at a glance.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/environments-dashboard.png" 
	url="/images/gitops-environments/environments-dashboard.png" 
	alt="GitOps Environments dashboard" 
	caption="GitOps Environments dashboard"
  max-width="60%" 
%}

By structuring environments around your software development life cycle (SDLC)—such as development, staging, and production, you can intuitively track and manage transitions and deployments between different stages.  
Explore the [Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/) to understand how Codefresh pulls in all the information.  

#####  Benefits of Environments

* **Aligns with your SDLC**  
  Environments mirror your SDLC, aligning applications with their development and deployment stages. This provides a structured view of the entire application lifecycle, from initial development to production releases.

* **Unified visibility across deployments**  
  Codefresh consolidates all applications deployed to an Environment’s clusters and namespaces, offering a centralized perspective. Teams can quickly see what is running where, improving operational transparency and troubleshooting.

* **Flexible and scalable**  
  * Easily create environments by defining a name and associating it with Kubernetes clusters and namespaces.
  * Scale seamlessly by adding new environments or expanding existing ones with additional clusters or namespaces.
  * Define environments even before deploying applications to support future planning and infrastructure readiness.

See [Create and manage Environments]({{site.baseurl}}/docs/environments/create-manage-environments/).

## How Environments interact with Products and applications

The diagram illustrates how Argo CD applications are organized within environments.

{% include
image.html
lightbox="true"
file="/images/gitops-environments/argo-apps-organized-into-envs.png"
url="/images/gitops-environments/argo-apps-organized-into-envs.png"
alt="Argo CD applications organized in GitOps Environments"
caption="Argo CD applications organized in GitOps Environments"
max-width="70%"
%}

* **Environments and Products**  
  Products add another dimension to the experience by bridging applications and environments. With products, you can organize applications across multiple environments.  

* **Applications in Environments**  
  Every Argo CD application deployed to an environment’s clusters and namespaces is automatically displayed in that environment. This enables tracking of deployments, application versions, and their current states in each environment.  

* **Promotions between Environments**  
  Promotions in Codefresh are fully integrated into your deployment workflow, ensuring controlled and predictable application progression.
  You can trigger promotions for products and application between environments directly from the Environments dashboard, manually or through automated Promotion Flows. 


See [Manage Products and applications in Environments]({{site.baseurl}}/docs/environments/manage-apps-in-environments/).


