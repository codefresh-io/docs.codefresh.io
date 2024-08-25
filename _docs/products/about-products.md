---
title: "About Products"
description: "Create Products to group and deploy applications"
group: products
toc: true
---



>**NOTE**  
This feature is currently in Beta.

Explore the power of Products for Argo CD applications and deployments in Codefresh GitOps. 

Managing complex applications across multiple environments is a common challenge faced by developers and platform engineers. The diverse nature of applications and the variety of environments they deploy to can lead to fragmented management and deployment processes.

In Codefresh GitOps, Products serve as a strategic layer that bridges this gap. Products group different yet interconnected applications based on their similarities and dependencies. 
By grouping applications, Products enhance Environments, allowing complete visibility for efficient deployment across Environments.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products dashboard (expanded view)" 
	caption="GitOps Products dashboard (expanded view)"
  max-width="70%" 
%}

Read more on the world's first dashboard for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.


##### What is a Product in Codefresh GitOps?
In Codefresh GitOps, a Product is a custom entity that allows you to group interconnected Argo CD applications, providing a cohesive view as the applications progress through the development and deployment lifecyle.  

Consider a practical scenario of numerous applications connected to billing or payment. Instead of monitoring each application separately, creating a Product enables you to track and manage them collectively.

The diagram illustrates how Argo CD applications connected to a Product are grouped by that Product and organized by Environments. It also shows applications not assigned to any Product.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/apps-grouped-by-product.png" 
	url="/images/gitops-products/apps-grouped-by-product.png" 
	alt="Argo CD applications grouped by Products and organized by Environments" 
	caption="Argo CD applications grouped by Products and organized by Environments"
  max-width="70%" 
%}

##### Benefits of Products
* **Unified application management**  
  Managing complex Argo CD applications across multiple Environments can be challenging.  
  By grouping similar Argo CD applications into a unit, Products allow you to also efficiently manage them cohesively.

* **Bridging applications and environments**  
  Products act as a bridge between applications and their respective environments. By linking applications to Products, you can easily track their deployment across different environments, providing clarity and control over your deployment pipelines.

* **Deployment visibility**
  Deploying a product generates a release that provides a comprehensive view of the entire deployment process. This includes visualization of Promotion Workflows across all environments, and detailed insights into issue tracking, Git activity, and other actions that led to the deployment, giving developers and stakeholders a clear understanding of the process.

* **Effortless creation**  
  As with Environments, creating a Product is equally straightforward. You can create Products from the UI, or declaratively through annotations in your application manifests.

* **Real-time insights with integrated views**  
  The Products dashboard offers three distinct views - Pods, Git, and Features. These views provide real-time insights into the changes in the application repo, deployment details, code changes, and feature tracking. Whether you're a developer tracking the latest commits or a project manager monitoring feature releases, these integrated views offer valuable insights tailored to your role.




##### How do you view applications by Product?  
In two simple steps:

1. [Create the Product](#create-products)  
  Begin by creating a Product, and assigning a meaningful name based on your use case. You can do this in the UI, or through annotations in app manifests.

1. [Connect applications to the Product](#assigning-applications-to-products)  
  Bring your applications into the picture. Link applications to the Products you've created to create the associations you need. 

Codefresh seamlessly identifies and organizes the applications in the correct [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/).  


##### How do you promote a Product?

By configuring the properties  to bepromotion flows and settings for the product and its applications:

Configure Promotion Flows
Define the steps and criteria for promoting applications in the product through different stages of deployment. Select and customize the conditions to trigger specific flows, automating and controlling when and how applications are promoted.

Promotion Settings
 and specifying the precise attributes to be promoted within applications. This ensures that the right versions and components are consistently advanced through your deployment stages.

By utilizing these configuration options, you can optimize your CI/CD processes and maintain a 


Read more about how to [work with Products](#working-with-products), and with [applications in Products](#working-with-applications-in-products).