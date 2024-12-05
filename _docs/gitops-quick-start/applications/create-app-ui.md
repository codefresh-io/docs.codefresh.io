---
title: "Create Argo CD applications"
description: ""
group: gitops-quick-start
toc: true
---

At the core of what you create are applications—the fundamental building blocks of software delivery. 
The ultimate goal is to deploy and maintain these applications efficiently, ensuring they run reliably in production.

In Codefresh, applications are Argo CD applications that represent the Kubernetes resources deployed and managed through GitOps principles. 
By associating applications with environments or products, Codefresh adds an organizational layer that simplifies tracking and managing deployments throughout the software delivery lifecycle.


After creating environments, let's see how to create an Argo CD application in the Codefresh UI.  
We'll create the application without resources, and then define/add resources in the next step.  


## Key features of applications in Codefresh


* **GitOps-driven management**
  Codefresh leverages Argo CD to ensure applications always align with their Git repository definitions, allowing declarative management and version control.

* **Flexible creation methods**
  Create applications in Applications can be created manually in the Codefresh UI, imported from an existing Argo CD instance, or defined programmatically using YAML manifests.







For detailed information, see [Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).



## Create your first application
We'll create an application with only the required settings for this quick start.
Use the Form editor or code directly in YAML. Switch between the two as you prefer. 

##### Step-by-step
1. In the Codefresh UI, from the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard?sort=desc-lastUpdated){:target="\_blank"} dashboard.
1. Click **Add Application** on the top-right.
1. In the Add Application panel, add definitions for the application:
  * **Application name**: `demo-trioapp-dev` for the quick start.  
    We addeded the `-dev` to the application name to differentiate it from other applications we'll create.
  * **Runtime**: The runtime to associate with the application, `demo-runtime` for the quick start.  
  * **Name for YAML file**: The name of the application's configuration manifest, assigned on commit to Git. By default, the manifest is assigned the application name.  
    You can click the Edit icon and change the name, if you want to.

  >**NOTE**  
  You cannot change the application definitions once you continue to the Configuration settings.

{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/cdops-add-app-settings.png" 
   url="/images/getting-started/quick-start/cdops-add-app-settings.png" 
   alt="Add Application" 
   caption="Add Application"
   max-width="50%" 
   %} 

{:start="4"}
1. Select **Next** to go to the Configuration tab.  
  By default you are in Form mode. You can toggle between Form and YAML modes as you define the application's configuration settings.
1. Define the **General** settings for the application: 
  * **Repository URL**: The URL to the repo in Git where you created the YAML resource files for the application.
  * **Revision**: The branch in Git with the resource files.
  * **Path**: The folder in Git with the resource files.
  * **Namespace**: For the quick start, we'll define a namespace for the application, entitled `demo-dev`. 
  * **Auto-create namespace**: If you defined a namespace, select this to ensure that the namespace is created if it doesn't exist. 
  * **Sync Policy**: Change to **Automatic**, and select **Prune resources** to automatically remove unused resources.

 
{% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/cdops-add-app-configuration.png" 
   url="/images/quick-start/gitops/cdops-add-app-configuration.png" 
   alt="Create application quick start: General settings" 
   caption="Create application Quick Start: General settings"
   max-width="70%" 
   %} 


{:start="6"}
1. Retain the default **Advanced Settings**.  
1. To commit all your changes, select **Commit**.  
  The Commit form is displayed with the application's definitions on the left, and the read-only version of the manifest with the configuration settings you defined on the right.
1. Select the **Git Source** to which to commit.

{% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/cdops-add-app-commit.png" 
   url="/images/quick-start/gitops/cdops-add-app-commit.png" 
   alt="Create application quick start: Commit to Git Source" 
   caption="Create application quick start: Commit to Git Source"
   max-width="70%" 
   %} 

{:start="9"} 
1. Add a commit message and then select **Commit** at the bottom-right of the panel.  
  You are directed to the [GitOps Apps dashboard](https://g.codefresh.io/2.0/applications-dashboard?sort=desc-lastUpdated){:target="\_blank"}.  
  You may have to wait for a few seconds until the application is synced to the cluster.



## Create additional applications
Follow the steps in [Create your first application](#create-your-first-application) to add more applications.  
For the quick start, since we created three environments, we'll add two more applications: `demo-trioapp-qa` and `demo-trioapp-prod`.

One of the requirements for GitOps promotions is to have an application in each of the environments you want to target in your promotion lifecyle. 

Here's a view of the GitOps Apps dashboard with all the three applications connected to the Git Source.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/cdops-add-app-dashboard.png" 
   url="images/quick-start/gitops/cdops-add-app-dashboard.png" 
   alt="Create application quick start: GitOps Apps dashboard with new applications" 
   caption="Create application quick start: GitOps Apps dashboard with new applications"
   max-width="60%" 
   %} 

<!--- In the next task, you will create and commit resources for the `codefresh-guestbook` application and deploy the application. -->

## View changes in Environments dashboard

Let's go back to the Environments dashboard to see how the new apps we created are displayed in it.
 
* From the sidebar, select **Environments**.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/cdops-add-app-dashboard.png" 
   url="/images/quick-start/gitops/cdops-add-app-dashboard.png" 
   alt="Create application quick start: GitOps Apps dashboard with new applications" 
   caption="Create application quick start: GitOps Apps dashboard with new applications"
   max-width="60%" 
   %} 

The environments are still empty, with one difference: The Unassigned Apps counter shows one unassigned app for each environment.
 
If you click on the up arrow next to Unassigned apps in any environment, it moves the application up to the top.  
And if you click the icon next to the app name, the message informs you that the app is not associated with any product.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/environments-products/env-with-unassigned-apps.png" 
   url="/images/quick-start/environments-products/env-with-unassigned-apps.png" 
   alt="Create application quick start: Environment with app not linked to product" 
   caption="Create application quick start: Environment with app not linked to product"
   max-width="70%" 
   %} 

And that is exactly what we'll do in the next quick start. We'll explore the concept of products in Codefresh GitOps, how they boost the power of your app, simplifying promotion and deployment. 

### What to do next
[Create products]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs/)
