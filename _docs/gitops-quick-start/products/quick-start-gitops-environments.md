---
title: "Quick start: Creating Environments"
description: "Explore how environments empower application promotion and deployment"
group: gitops-quick-start
toc: true
---

In the previous quick start, you [created a Git Source]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/) for the GitOps Runtime.  

## In this quick start - environments
In this quick start, we'll create three different environments: `dev`, `qa`, and `prod`. These environments represent the typical stages in the software development lifecycle (SDLC): development, testing, and production, where your applications will eventually be made available to users.
These environments represent typical stages in the software development lifecycle (SDLC), and are essential for managing and promoting applications effectively.

We’ll:
* Map these environments to a cluster, typically the one where the GitOps Runtime is installed. 
* Define namespaces within the cluster to which to deploy the applications which we'll create later, based on their stage. This separation enables independent testing, deployment, and promotion.



## Environments in GitOps
Environments are essential for managing the lifecycle of your applications as they move from development to production. Whether it’s a testing environment, a staging area, or production itself, each environment serves a unique purpose in the software delivery process. 

In the context of **promotions with Codefresh GitOps**, environments aren’t just configurations—they’re actionable entities. They give you an intuitive way to organize, track, and promote applications, ensuring consistency and clarity across your delivery lifecycle.  
Environments are tightly integrated with GitOps principles, ensuring that your infrastructure and applications are always in sync with declarative configurations stored in Git.

 {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	url="/images/gitops-environments/argo-apps-organized-into-envs.png" 
	alt="Quick start: Representation of an Environment in Codefresh GitOps"
	caption="Quick start: Representation of an Environment in Codefresh GitOps"
  max-width="60%" 
%} 

For detailed information, see [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/).

## Why create environments? 

Environments are key to managing and promoting applications effectively.  
They give you a structured, intuitive way to answer the question: _What’s running where?_

Here are just a few of the reasons you’ll want to use environments in Codefresh:

* **Mirror your SDLC**  
  Environments are designed to mirror your software development life cycle (SDLC). By aligning applications with their development stages, environments offer a clear and contextual view of the entire application lifecycle, as it moves from development to production.

* **Simplify promotions**  
  Environments make promoting applications between stages seamless. By organizing applications into environments, you always know what’s ready for the next stage, reducing confusion and ensuring consistency.

*  **Effortless creation**  
  Creating an environment in Codefresh is simple. Just provide a unique name, and map clusters and namespaces. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/environments-example.png" 
	url="/images/quick-start/environments-products/environments-example.png" 
	alt="Quick start: Environments in Codefresh GitOps"
	caption="Quick start: Environments in Codefresh GitOps"
  max-width="60%" 
%} 
 

## Create an environment
Let's go ahead and create an environment. 

Environments mirror the deployment lifecycle of your software, so create as many as you need to match your process.
Common examples include `development`, `qa`, `staging`, and `production`, but you can customize environments to fit your needs. There's no cap on the number of environments you can create.  

For this quick start, we'll create three environments, `dev`, `qa`, and `prod` to which we'll create and deploy three different applications for promotion and deployment.

1. In the Codefresh UI, from the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
	  For the quick start, we'll use `dev`.
    1. **Kind**: The purpose of the environment. Select **Non-production** where typically development, testing, and staging versions of applications are deployed.  
	  The **Kind** property is used to also define rules for promotions and ABAC (Attribute Based Access Control) permissions.
    1. **Tags**: Leave this empty for the quick start.
    1. **Clusters and Namespaces**: Single or multiple clusters, namespaces, or cluster-namespace pairs, to map to the environment.
        To include all namespaces in a cluster, leave the Namespace empty. 
        For the quick start, we'll map the environment to the `in-cluster` which corresponds to the cluster where we installed the GitOps Runtime, and the `demo-dev` namespace. The namespace is associated with the `dev` environment, and the `demo` applications we'll add later on.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/environment-add.png" 
	url="/images/quick-start/environments-products/environment-add.png" 
	alt="Environments quick start: Create an Environment" 
	caption="Environments quick start: Create an Environment"
  max-width="50%" 
%} 

{:start="3"}  
1. Click **Add**.  
  The environment is displayed in the Environments dashboard. 
1. Repeat _step 1_ through _step 3_ to create the two other environments: `qa` and `prod`.  
  For the quick start, we'll map these environments again to the `in-cluster`. And to the namespaces, `demo-qa` and `demo-prod` respectively, for the `demo` apps we'll create. 

Here's an example of the Environments dashboard with the three environments.
The environments are automatically populated with the applications in the clusters and namespaces mapped to them.  
At this point, as we haven't created any applications, all environments are empty.

{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/envs-no-apps.png" 
	url="/images/quick-start/environments-products/envs-no-apps.png" 
	alt="Environments quick start: Newly created environments without applications" 
	caption="Environments quick start: Newly created environments without applications"
  max-width="60%" 
%} 

## What's next
You’re probably eager to dive into applications. Before we do that let's create another entity that simplifies and supercharges applications: Products.


[Quick start: Creating products]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/)