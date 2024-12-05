---
title: "Quick start: Environments in GitOps"
description: "Explore how environments empower application development and deployment "
group: quick-start
toc: true
---

Environments are essential for managing the lifecycle of your applications as they move from development to production. Whether it’s a testing environment, a staging area, or production itself, each environment serves a unique purpose in the software delivery process. 

With **Codefresh GitOps promotions**, environments aren’t just configurations—they’re actionable entities. They give you an intuitive way to organize, track, and promote applications, ensuring consistency and clarity across your delivery lifecycle.

In Codefresh, environments are tightly integrated with GitOps principles, ensuring that your infrastructure and applications are always in sync with declarative configurations stored in Git.

SCREENSHOT OF ENVIRONMENTS
For detailed information, see [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/)

## Why create environments? 

Environments are key to managing and promoting applications effectively.  
They give you a structured, intuitive way to answer the question: _What’s running where?_

Here’s why you’ll want to use environments in Codefresh:

* **Mirror your SDLC**  
  Environments are designed to mirror your software development life cycle (SDLC). By aligning applications with their development stages, environments offer a clear and contextual view of the entire application lifecycle, as it moves from development to production.

* **Simplify promotions**
  Environments make promoting applications between stages seamless. By organizing applications into environments, you always know what’s ready for the next stage, reducing confusion and ensuring consistency.

*  **Effortless creation**  
  Creating an environment in Codefresh is simple. Just provide a unique name, and map clusters and namespacest. 

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
First, let's create an environment. 

Environments mirror the deployment lifecycle of your software, so create as many as you need to match your process.
Common examples include `development`, `qa`, `staging`, and `production`, but you can customize them to fit your needs. There's no cap on the number of environments you can create.  

For this quick start, we'll set up three environments, `dev`, `qa`, and `prod`.

##### Step-by-step
1. In the Codefresh UI, from the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
	  For the quick start, we'll use `dev`.
    1. **Kind**: The purpose of the environment. Select **Non-production** where typically development, testing, and staging versions of applications are deployed.  
	  The **Kind** property is used to also define rules for promotions and ABAC (Attribute Based Access Control) permissions .
    1. **Tags**: Leave this empty for the quick start.
    1. **Clusters and Namespaces**: Single or multiple cluster, namespace, or cluster-namespace pairs to map to the environment.
        To include all namespaces in a cluster, leave the Namespace empty. 
        For the quick start, we'll add the `in-cluster` and the `demo-ta-dev` namespace.

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
  For the quick start, both environments are mapped to `in-cluster`, and to namespaces, `demo-qa` and `demo-prod` respectively.

Here's an example of the Environments dashboard with the three environments.
The environments are automatically populated with the applications in the clusters and namespaces mapped to them.  
At this point, all environments are empty since we haven't created any applications.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/envs-no-apps.png" 
	url="/images/quick-start/environments-products/envs-no-apps.png" 
	alt="Quick start: Newly created environments without applications" 
	caption="Quick start: Newly created environments without applications"
  max-width="60%" 
%} 

Next, we'll create a product.
You’re probably eager to dive into applications, but we'll start products first, and explore how products simplify managing your applications and their lifecycle. 

## What to do next
Explore Products