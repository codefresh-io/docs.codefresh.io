---
title: "Quick start: Creating Environments"
description: "Explore how environments empower application promotion and deployment"
group: gitops-quick-start
toc: true
---


## Environments quick start
In this quick start, we'll create three different environments: `dev`, `qa`, and `prod`.  
These environments map to the typical stages of the software development lifecycle (SDLC), and will help in promoting changes in your applications. 

When creating the environments, we’ll:
* Map them to a cluster, typically the one where the GitOps Runtime is installed. 
* Define namespaces within the cluster for each environment, ensuring clear separation between development, testing, and promotion.


  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/environments-example.png" 
	url="/images/quick-start/environments-products/environments-example.png" 
	alt="Quick start: Environments in Codefresh GitOps"
	caption="Quick start: Environments in Codefresh GitOps"
  max-width="60%" 
%} 

##### Why create environments? 

Environments are key to managing and promoting applications effectively.  
They give you a structured, intuitive way to answer the question: _What’s running where?_

Environments help you:
* **Mirror your SDLC**: Align applications with their development stages, providing clarity and structure.
* **Simplify promotions**: Easily move applications through stages, ensuring consistency.

For detailed information, see [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/).


## Prerequisites
* GitOps Runtime installed, as described in [Quick start: Installing a Hybrid GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
 

## Create an environment
Let's go ahead and create an environment. Setting up environments is as simple as mapping the environment to one or more clusters and namespaces.

For this quick start, we’ll create three environments: `dev`, `qa`, and `prod` on the cluster where you installed the GitOps Runtime.
We’ll map the environments to the `in-cluster` and associate each with a different namespace, to which we will deploy the demo applications that we’ll add later.


1. In the Codefresh UI, from the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
	  For the first environment, we'll use `dev`.
    1. **Kind**: The purpose of the environment. Select **Non-production** where typically development, testing, and staging versions of applications are deployed.  
	  The Kind property is used to also define rules for promotions and ABAC (Attribute Based Access Control) permissions.
    1. **Tags**: Leave this empty for the quick start.
    1. **Clusters and Namespaces**: Map the environment to the cluster with the GitOps Runtime.  
        For the quick start, we'll map the environment to the `in-cluster`, and the `demo-dev` namespace. The namespace is associated with the `dev` environment, and the `demo` applications we'll add later on.

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