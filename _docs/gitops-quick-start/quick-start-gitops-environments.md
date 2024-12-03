---
title: "Quick start: Environments in GitOps"
description: "Explore how environments empower application development and deployment "
group: quick-start
toc: true
---

For application engineers, environments are essential to managing the lifecycle of applications as they move from development to production. Whether it’s a testing environment, a staging area, or production itself, each environment serves a unique purpose in the software delivery process. 

With Codefresh GitOps promotions, environments are not just configurations—they are actionable entities that streamline deployments and ensure consistency across your software lifecycle.

In Codefresh, environments provide a structured way to organize and manage products, applications, and promotion workflows. Environments are tightly integrated with GitOps principles, ensuring that your infrastructure and applications are always in sync with declarative configurations stored in Git.

SCREENSHOT OF ENVIRONMENTS
For detailed information on all tasks and features, see [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/)

## Why would you want to create environments? 

Here are some key benefits of environments:

* **Mirror your SDLC**  
  Environments are designed to mirror your software development life cycle (SDLC). By aligning applications with their development stages, environments offer a clear and contextual view of the entire application lifecycle, as it moves from development to production.

*  **Effortless creation**  
  Creating an environment in Codefresh is straightforward and intuitive. All you need is a unique name, and the Kubernetes clusters and namespaces to associate with the environment. 

* **Simplified promotions**  
  Promote products and applications between .

* **Simple scalability and maintenance**  
  Environments are equally simple to scale and maintain as they are to create. Whether expanding infrastructure or adapting to evolving project requirements, scaling is as simple as adding more environments, or adding more clusters or namespaces to existing environments. 

  For flexibility, Codefresh allows you to also add environments without deploying any applications to them.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	url="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	alt="Quick start: Representation of an Environment in Codefresh GitOps"
	caption="Quick start: Representation of an Environment in Codefresh GitOps"
  max-width="60%" 
%} 


## Create an Environment
First, you'll need to set up an environment. Environments mirror the deployment lifecycle of your software, so create as many as you need to match your process.

Typically, organizations use environments like `development`, `qa`, `staging`, and `production`, but you can customize these to suit your needs. There's no cap on the number of environments you can set up.  

For this quick start, we'll set up three environments, `dev`, `qa`, and `prod`.


1. In the Codefresh UI, from the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
	  For the quick start, we'll use `dev`.
    1. **Kind**: The purpose of the environment. Select **Non-production** where typically development, testing, staging versions of applications are deployed.  
	  Just a heads up that we will use the **Kind** property to define permissions for ABAC (Attribute Based Access Control).
    1. **Tags**: Leave this empty for the quick start.
    1. **Clusters and Namespaces**: Single or multiple cluster, namespace, or cluster-namespace pairs to map to the environment.
        To include all namespaces in a cluster, leave the Namespace empty. 
        For the quick start, we'll add the `in-cluster` and the `demo-ta-dev` namespace.
	    The environment is populated by all the applications deployed to the mapped clusters and namespaces.    

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/environment-add.png" 
	url="/images/quick-start/environments-products/environment-add.png" 
	alt="Quick start: Create an Environment" 
	caption="Quick start: Create an Environment"
  max-width="60%" 
%} 

{:start="3"}  
1. Click **Add**.  
  The environment is displayed in the Environments dashboard. 
1. Repeat _step 1_ through _step 3_ to create the two other environments: `qa` and `prod`.

SCREENSHOT

## What to do next
Explore Products