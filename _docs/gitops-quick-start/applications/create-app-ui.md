---
title: "Create Argo CD applications"
description: ""
group: gitops-quick-start
toc: true
---

After creating environments, let's see how to create an Argo CD application in the Codefresh UI.  
We'll create the application without resources, and then define/add resources in the next step.  


For detailed information, see [Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).

## Notes on applications

## Create your first application
1. In the Codefresh UI, from the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard?sort=desc-lastUpdated){:target="\_blank"} dashboard.
1. Click **Add Application** on the top-right.
1. In the Add Application panel, add definitions for the application:
  * **Application name**: `demo-trioapp-dev` for the quick start.  
    You can see the `-dev` suffix in the application name
  * **Runtime**: The runtime to associate with the application, `demo-runtime` for the quick start.  
  * **Name for YAML file**: The name of the application's configuration manifest, assigned on commit to Git. By default, the manifest is assigned the application name.  
    You can click the Edit icon and change the name, if needed.

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
  * **Namespace**: For the quick start, we'll define a namespace for the application, entitled `demo-ta-dev`. 
  * **Auto-create namespace**: If you defined a namespace, select to ensure that the namespace is created if it doesn't exist. 
  * **Sync Policy**: Change to **Automatic**, and select **Prune resources** to automatically remove unused resources.

 
{% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/cdops-add-app-configuration.png" 
   url="/images/quick-start/gitops/cdops-add-app-configuration.png" 
   alt="Add Application Quick Start: General settings" 
   caption="Add Application Quick Start: General settings"
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
   alt="Add Application Quick Start: Commit to Git" 
   caption="Add Application Quick Start: Commit to Git"
   max-width="70%" 
   %} 

{:start="9"} 
1. Add a commit message and then select **Commit** at the bottom-right of the panel.  
  You are directed to the [GitOps Apps dashboard](https://g.codefresh.io/2.0/applications-dashboard?sort=desc-lastUpdated){:target="\_blank"}.  
  You may have to wait for a few seconds until the application is synced to the cluster.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/apps-new-app-in-dashboard.png" 
   url="/images/quick-start/gitops/apps-new-app-in-dashboard.png" 
   alt="GitOps Apps dashboard with new application" 
   caption="GitOps Apps dashboard with new application"
   max-width="60%" 
   %} 



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
   alt=GitOps Apps dashboard with three new applications" 
   caption="GitOps Apps dashboard three new applications"
   max-width="70%" 
   %} 

<!--- In the next task, you will create and commit resources for the `codefresh-guestbook` application and deploy the application. -->

## View Environments dashboard

Let's go back or return to the Environments dashboard to see how the new apps we created are displayed in it.
 
 From the sidebar, select Environments.

  {% include 
   image.html 
   lightbox="true" 
   file="/images/quick-start/gitops/cdops-add-app-dashboard.png" 
   url="images/quick-start/gitops/cdops-add-app-dashboard.png" 
   alt=GitOps Apps dashboard with three new applications" 
   caption="GitOps Apps dashboard three new applications"
   max-width="70%" 
   %} 

 You can see that the environments are empty and each has one unassigned app.
 If you click on the up arrow, it moves the application up to the top.
 And if you click the icon next to the app name, if informs you that the app is not associated with any product.

 In the next task, we'll create a product and connect these applications to it. 

### What to do next
[Create and commit resources for application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs/)
