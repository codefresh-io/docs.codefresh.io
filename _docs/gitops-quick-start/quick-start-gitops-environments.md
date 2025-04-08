---
title: "Quick start: Creating environments"
description: "Explore how environments empower application promotion and deployment"
group: gitops-quick-start
toc: true
---


## Environments quick start
In this quick start, we'll create different environments that map to the typical stages of the software development lifecycle (SDLC). Environments provide structure for organizing applications and managing promotions.

We'll do the following:
* Create three different environments, `dev`, `qa`, and `prod`.
* Map them to a cluster, typically the one where the GitOps Runtime is installed. 
* Define namespaces within the cluster for each environment, ensuring clear separation between development, testing, and production.  

Products and their applications are displayed in the environments, providing visibility into where each version is deployed.



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
They provide a structured, intuitive way to answer the question: _What’s running where?_

Environments help you:
* **Mirror your SDLC**: Align applications with their development stages, providing clarity and structure.
* **Simplify promotions**: Easily move applications through stages, ensuring consistency.

For detailed information, see [Environments]({{site.baseurl}}/docs/environments/environments-overview/).


## Requirements
* [GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-install-runtime/)
* [Products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/) 
 

## Create an environment
Let's go ahead and create an environment. Setting up environments is as simple as mapping the environment to one or more clusters and namespaces.

For this quick start, we’ll create three environments: `dev`, `qa`, and `prod` on the cluster where you installed the GitOps Runtime.
We’ll map the environments to `in-cluster`, associate each with a different namespace, to which we'll promote the applications.

##### Step-by-step
1. In the Codefresh UI, from the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
	  For the first environment, we'll use `dev`.
    1. **Kind**: The purpose of the environment. Select **Non-production** where typically development, testing, and staging versions of applications are deployed.  
	  The Kind property also defines the rules for promotions and ABAC (Attribute Based Access Control) permissions.
    <!--- 1. **Tags**: Leave this empty for the quick start.  -->
    1. **Clusters and Namespaces**: Map the environment to the cluster with the GitOps Runtime.  
        For the quick start, we'll map the environment to the `in-cluster` and the `demo-dev` namespace. The namespace is associated with the `dev` environment, and the `demo` applications we'll add later on.

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
  For the quick start, we'll again map these environments to `in-cluster` and associate them with the `demo-qa` and `demo-prod` namespaces respectively, for the `demo` apps we created earlier. 

## View Environments dashboard

Check the Environments dashboard to see how the environments are populated with the applications you created.
Here's an example of the Environments dashboard with the three environments, and the products and their applications in the clusters and namespaces mapped to them.
 
1. From the sidebar, select **Environments**.
  Each environment displays the product you created. For example, `demo-trioapp`.
1. Mouse over the product name in each environment to see the associated applications. For example, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/environments-products/env-with-assigned-apps.png" 
   url="/images/quick-start/environments-products/env-with-assigned-apps.png" 
   alt="Applications quick start: Environments with products and applications" 
   caption="Applications quick start: Environments with products and applications"
   max-width="70%" 
   %} 



## What's next
Now that you've set up environments, we'll focus on another key entity in GitOps promotions which enhances the promotion process—Promotion Workflows.  
Promotion Workflows are used in automated promotion flows to enforce quality, security, and compliance requirements at each stage of the promotion.

[Quick start: Creating Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/quick-start-promotion-workflow/)

