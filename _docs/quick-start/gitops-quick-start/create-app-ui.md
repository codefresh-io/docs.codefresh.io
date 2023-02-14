---
title: "Create an application"
description: ""
group: getting-started
sub-group: gitops-quick-start
toc: true
---

Let's start by creating a simple application, the `codefresh-guestbook` application in the Codefresh UI.  
We'll create the application without resources and then define/add resources in the next step.  


For detailed information, see [Create an application]({{site.baseurl}}/docs/deployment/create-application).


**How to**  


1. In the Codefresh UI, from Ops in the sidebar, select [GitOps Apps](https://g.codefresh.io/2.0/applications-dashboard?sort=desc-lastUpdated){:target="\_blank"} dashboard.
1. Select **Add Application** on the top-right.
1. In the Add Application panel, add definitions for the application:
  * **Application name**: `codefresh-guestbook` for the quick start.
  * **Runtime**: The runtime to associate with the application, `hosted-runtime` for the quick start.  
  * **Name for YAML file**: The name of the application's configuration manifest, assigned on commit to Git. By default, the manifest is assigned the application name.  
    You can click the Edit icon and change the name, if needed.

  >You cannot change the application definitions once you continue to the Configuration settings.

{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/cdops-add-app-settings.png" 
   url="/images/getting-started/quick-start/cdops-add-app-settings.png" 
   alt="Add Application panel" 
   caption="Add Application panel"
   max-width="50%" 
   %} 

{:start="4"}
1. Select **Next** to go to the Configuration tab.  
  By default you are in Form mode. You can toggle between the Form and YAML modes as you define the application's configuration settings.
1. Define the **General** settings for the application: 
  * **Repository URL**: The URL to the repo in Git where you created the YAML resource files for the application.
  * **Revision**: The branch in Git with the resource files.
  * **Path**: The folder in Git with the resource files.
  * **Namespace**: Optional. For the quick start, we'll create a namespace for the application, entitled `quick-start`. 
  * **Sync Policy**: Change to **Automatic**, and select **Prune resources** to automatically remove unused resources.
  * **Sync Options**: If you defined a namespace, select **Auto-create namespace** to ensure that the namespace is created if it doesn't exist. 
 
{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/cdops-add-app-configuration.png" 
   url="/images/getting-started/quick-start/cdops-add-app-configuration.png" 
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
   file="/images/getting-started/quick-start/cdops-add-app-commit.png" 
   url="/images/getting-started/quick-start/cdops-add-app-commit.png" 
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
   file="/images/getting-started/quick-start/cdops-add-app-dashboard.png" 
   url="/images/getting-started/quick-start/cdops-add-app-dashboard.png" 
   alt="Application dashboard with new application" 
   caption="Application dashboard with new application"
   max-width="70%" 
   %} 

{:start="10"}
1. Select the application. The Current State tab does not display any resources as we have not created any resources for the application. 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/cdops-app-empty-current-state.png" 
   url="/images/getting-started/quick-start/cdops-app-empty-current-state.png" 
   alt="Empty Current State for new application" 
   caption="Empty Current State for new application"
   max-width="70%" 
   %}
  

In the next task, you will create and commit resources for the `codefresh-guestbook` application and deploy the application. 


### What to do next
[Create and commit resources for application]({{site.baseurl}}/docs/getting-started/quick-start/create-app-specs/)
