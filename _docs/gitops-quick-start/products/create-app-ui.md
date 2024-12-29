---
title: "Quick start: Creating applications"
description: "Create Argo CD applications in Codefresh"
group: gitops-quick-start
toc: true
redirect_from:
  - docs/quick-start/gitops-quick-start/create-app-ui/
---

We've created two of the three core entities essential for GitOps promotions: [Environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/) and [products]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/).  
In this quick start, we'll create applications—the fundamental building blocks of software delivery.  
The ultimate goal is to deploy and maintain these applications efficiently, ensuring they run reliably in production.

In Codefresh, applications are Argo CD applications that represent the Kubernetes resources deployed and managed through GitOps principles. 
* By linking applications to Git Sources, you have a centralized location from which to manage multiple manifests. 
* By associating applications with products, you get an organizational layer that simplifies tracking and managing deployments throughout the software delivery lifecycle.

For detailed information, see [Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).


## Key features of applications in Codefresh


* **GitOps-driven management**  
  Codefresh leverages Argo CD to ensure applications always align with their Git repository definitions, allowing declarative management and version control.

* **Flexible creation methods**  
  Create applications in the Codefresh UI, imported from an existing Argo CD instance, defined programmatically using YAML, or in our intuitive Form modes.



## Create your first application
We'll create an application with only the required settings for this quick start. We'll also connect the application to the product we created in the previous quick start. 

Use the Form editor or code directly in YAML. Switch between the two as you prefer. 

##### Step-by-step
1. In the Codefresh UI, from the sidebar, select **GitOps Apps**.
1. Click **Add Application** on the top-right.
1. In the Add Application panel, add definitions for the application:
  * **Application name**: `demo-trioapp-dev` for the quick start.  
    We added `-dev` to the application name to differentiate it from other applications we'll create.
  * **Runtime**: The runtime to associate with the application, `demo-runtime` for the quick start.  
  * **Name for YAML file**: The name of the application's configuration manifest, assigned on commit to Git. By default, the manifest is assigned the application name.  
    You can click the Edit icon and change the name if you want to.

  >**NOTE**  
  You cannot change the application definitions once you continue to the Configuration settings.

{% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/apps/qs-create-app-definitions.png" 
   url="/images/quick-start/apps/qs-create-app-definitions.png" 
   alt="Applications quick start: Application definitions" 
   caption="Applications quick start: Application definitions"
   max-width="50%" 
   %} 

{:start="4"}
1. Click **Next** to go to the Configuration tab. 
  By default you are in Form mode. You can toggle between Form and YAML modes as you define the application's configuration settings.
1. Define the **General** settings for the application: 
  * **Product**: From the list of products, select the product to which to connect this application, `demo-trio-gitsource` for the quick start.
  * **Repository URL**: The URL to the repo in Git where you created the YAML resource files for the application.
  * **Revision**: The branch in Git with the resource files.
  * **Path**: The folder in Git with the resource files.
  * **Namespace**: For the quick start, we'll define a namespace for the application, entitled `demo-dev`. 
  * **Auto-create namespace**: If you defined a namespace, select this option to ensure that the namespace is created if it doesn't exist. 
  * **Sync Policy**: Change to **Automatic** if needed, and select **Prune resources** to automatically remove unused resources.

 
{% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/apps/qs-create-app-configuration.png" 
   url="/images/quick-start/apps/qs-create-app-configuration.png" 
   alt="Applications quick start: Configuration > General settings" 
   caption="Applications quick start: Configuration > General settings"
   max-width="70%" 
   %} 


{:start="6"}
1. Retain the default **Advanced Settings**.  
  The only setting to note here is that we are creating a Helm application.
1. To commit all changes, select **Commit**.  
  The Commit form is displayed with the application's definitions on the left, and the read-only version of the manifest with the configuration settings you defined on the right.
1. Select the **Git Source** to which to commit the application's manifest.  
  For the quick start, we have one Git Source which we created earlier, the `demo-trio-gitsource`.

{% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/apps/qs-create-app-commit-changes.png" 
   url="/images/quick-start/apps/qs-create-app-commit-changes.png" 
   alt="Applications quick start: Commit to Git Source" 
   caption="Applications quick start: Commit to Git Source"
   max-width="60%" 
   %} 

{:start="9"} 
1. Add a commit message and then click **Commit** at the bottom-right of the panel.  
  You are directed to the GitOps Apps dashboard.  
  You may have to wait for a few seconds until the application is synced to the cluster for it to be displayed in the dashboard.

{% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/apps/qs-create-app-success.png" 
   url="/images/quick-start/apps/qs-create-app-success.png" 
   alt="Applications quick start: New application in GitOps Apps dashboard" 
   caption="Applications quick start: New application in GitOps Apps dashboard"
   max-width="60%" 
   %} 

## Create additional applications
Follow the steps in [Create your first application](#create-your-first-application) to create more applications.  

One of the requirements for promotions in GitOps is to have an application in each of the environments you want to target in your promotion lifecyle.  
For the quick start, since we created three environments, we'll add two more applications: `demo-trioapp-qa` and `demo-trioapp-prod`.
Remember to select the product for each of the applications.

Here's a view of the GitOps Apps dashboard with all the three applications linked to their Git Source.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/apps/qs-create-app-apps-in-dashboard.png" 
   url="/images/quick-start/apps/qs-create-app-apps-in-dashboard.png" 
   alt="Applications quick start: GitOps Apps dashboard with `trio-demoapp` applications" 
   caption="Applications quick start: GitOps Apps dashboard with `trio-demoapp` applications"
   max-width="60%" 
   %} 


## View changes in Environments dashboard

Let's return to the Environments dashboard to see how the new apps we created are displayed in it.
 
* From the sidebar, select **Environments**.


Each environment displays the product `demo-trioapp`.
Mouse over the product name in any environment to see the associated application.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/environments-products/env-with-assigned-apps.png" 
   url="/images/quick-start/environments-products/env-with-assigned-apps.png" 
   alt="Applications quick start: Environments with products" 
   caption="Applications quick start: Environments with products"
   max-width="70%" 
   %} 

## View changes in Product Dashboard

Let's also visit the Product Dashboard now that we have created applications and assigned them to the `demo-trioapp` product.
 
* From the sidebar, select **Products**, and then click the product, `demo-trioapp`.
 
Here's an example of the Product Dashboard for `demo-trioapp` with the applications we created for the quick start.



{% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/environments-products/product-dashboard-view.png" 
	url="/images/quick-start/environments-products/product-dashboard-view.png" 
	alt="Applications quick start: Product Dashboard with product's applications" 
	caption="Applications quick start: Product Dashboard with product's applications"
  max-width="60%" 
%}

## What's next
Explore the Product Dashboard to uncover insights about your product and its applications.

[Quick start: Exploring the Product Dashboard]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-dashboard/)
