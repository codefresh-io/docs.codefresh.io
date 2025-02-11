---
title: "GitOps Products"
description: "Create Products to group and manage interrelated Argo CD applications environments"
group: dashboards
toc: true
---




Explore the power of Products for Argo CD applications in Codefresh GitOps. 

Managing complex applications across multiple environments is a common challenge faced by developers and platform engineers. The diverse nature of applications and the variety of environments they deploy to can lead to fragmented management and deployment processes.

In Codefresh GitOps, Products serve as a strategic layer that bridges this gap. Products group different yet interconnected applications based on their similarities and dependencies. 


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products (expanded view)" 
	caption="GitOps Products (expanded view)"
  max-width="70%" 
%}

Read more on the first of their kind dashboards for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank"}.

This article focuses on the Product Dashboard and the insights you can gain from it. 

For detailed information on creating products and how to work with them, see [About Products]({{site.baseurl}}/docs/products/about-products/) and [Creating products]({{site.baseurl}}/docs/products/create-product/).

>**NOTE**  
In the documentation, both Product (capitalized) and product (lowercase) refer to the same entity in Codefresh GitOps. They are used interchangeably for readability and consistency.

## Products page

Here's an example of the Product page with the list of all the products.


{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/expanded-view.png" 
	url="/images/gitops-products/expanded-view.png" 
	alt="GitOps Products (expanded view)" 
	caption="GitOps Products (expanded view)"
  max-width="60%" 
%}


 

Here are some key features of the Products page:

### Collapsed & expanded views
* **Collapsed view**: The default view, displays the Product name alongside the Environments with the number of applications in each environment.<br> The options on the right allow you to manage products.  
* **Expanded view**: The expanded view displays the applications in the product organized by their Environments.

### Product management options
Mouse over the row with the product to display possible actions:
{::nomarkdown}<ul><li><img src="../../../images/icons/edit.png?display=inline-block"> <b>Edit</b>: Takes you to Product > Settings tab where you can configure . See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li><li><img src="../../../images/icons/settings.png?display=inline-block"> <b>Manage Applications</b>: Manually assign unassigned applications to environments in the Products dashboard. See <a href="https://codefresh.io/docs/docs/products/assign-applications">Manually assign applications to Products</a>.</li><li><img src="../../../images/icons/trash.png?display=inline-block"> <b>Delete</b>: Remove the Product from the Products dashboard, unassigning any manually-assigned applications. See <a href="https://codefresh.io/docs/docs/dashboards/gitops-products/#editdelete-product">Edit/delete Product</a>.</li></ul>{:/} 




## Product Dashboard
Clicking a Product name navigates you to the Product Dashboard for the selected product with a detailed view of its applications. It also includes integrated insights into Git and issue-tracking systems and how they relate to deployments. 
 

##### Application release version
* Version information, currently supported for Helm-based applications, identifies the specific release of the application in different environments.
* Clicking the version displays the application's dependencies, enabling comparison across different applications.

##### Integrated Pod/Git/Feature information
* The Products dashboard correlates sync information with other parts of the software lifecycle, such as issue-tracking systems.
* Switch between Pods, Git, and Features views to gain insights beyond development, including source code commits, affected services, commit authorship, and incorporated features in releases. 

See [Integrated insights with pod, Git and feature views](#integrated-insights-with-pod-git-feature-views).


##### Manage applications
Manage individual applications without navigating away from the Product Dashboard. The actions available mirror those in the GitOps Apps dashboard. 


## Integrated insights with Pod, Git, Feature views  
Navigate seamlessly between Kubernetes (Pods), [version] control (Git), and issue-tracking (Features) views for the Product to get consolidated data from the same location.



### Pods
Deployment, Rollout, and Promotion information for the application.
* Deployments: Source image, new image and tag, replicas for each deployment
* Rollouts: The services rolled out, the type of rollout, the result of the rollout, promote/pause rollout action
* Promotion: The change that resulted in the promotion, with details on who committed the change, and the commit hash
* Cluster and Namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/product-dashboard.png" 
	url="/images/gitops-products/product-dashboard.png" 
	alt="Product Dashboard: Pod view with deployments" 
	caption="Product Dashboard: Pod view with deployments"
  max-width="60%" 
%}

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/pod-view-rollouts.png" 
	url="/images/gitops-products/pod-view-rollouts.png" 
	alt="Product Dashboard: Pod view with Rollouts" 
	caption="Product Dashboard: Pod view with Rollouts"
  max-width="60%" 
%}

### Git
Codefresh retrieves the data here directly _from the application repository_, not the GitOps repository. You can trace the complete commit history of the application’s repo, up to the commit that initiated the build and deployed the new version.  

History of individual commits with deep links to source control.  

Useful for project managers and developers to trace: 
* PR (pull request) history
* Committer and commit information
* Promotion
* Cluster and Namespace the application is deployed to

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/product-dashboard-git-view.png" 
	url="/images/gitops-products/product-dashboard-git-view.png" 
	alt="Product Dashboard: Git view" 
	caption="Product Dashboard: Git view"
  max-width="60%" 
%}

### Features
Connect commits to the application repo to tickets in your issue-tracking tool or system. This integration enhances traceability and context, enabling you to monitor the deployment’s impact by tying deployed features to specific feature requests or bug fixes.
* Gain insights into deployment specifics
* Review all commits leading up to the latest one that triggered the deployment
* Align deployed features with related feature requests

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/product-dashboard-features.png" 
	url="/images/gitops-products/product-dashboard-features.png" 
	alt="Product Dashboard: Features view" 
	caption="Product Dashboard: Features view"
  max-width="60%" 
%}

<!---



### View deployment (Timeline) history for applications
Review the deployments for a specific application in the Products dashboard. 

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the Product with the application for which to take action.
1. In the Product Dashboard, go to the environment with the application.
1. Click the context menu and then select **Application info > Timeline** to view deployment history.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/app-timeline-view.png" 
	url="/images/gitops-environments/app-timeline-view.png" 
	alt="View deployment history for application from Products dashboard" 
	caption="View deployment history for application from Products dashboard"
  max-width="60%" 
%}
1. To view all the application’s tabs, including the Current State, Configuration, and others, click the link to **Full View** at the top.


### Manage applications in products
Manage applications grouped within a product through each application's context menu, that includes manual sync, refresh, and other options.

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Select the Product with the application for which to take action.
1. In the Product Dashboard, go to the environment with the application.
1. Click the context menu to the right of the application, and select the option:

  * [Quick View]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#view-deployment-configuration-info-for-selected-argo-cd-application): View deployment, definition, and event information for the selected application in the same location.
  * [Diff View]({{site.baseurl}}/docs/deployments/gitops/monitor-applications/#analyze-out-of-sync-applications-in-diff-view): Analyze out of sync applications. This option is disabled when applications are synced.
  * [Synchronize]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-synchronize-an-argo-cd-application): Manually synchronize the application to expedite Git-to-cluster sync. 
  * [Refresh/Hard Refresh]({{site.baseurl}}/docs/deployments/gitops/manage-application/#refreshhard-refresh-argo-cd-applications): As an alternative to manually syncing an application, either sync the application with the desired state in Git (refresh), or sync the application with the desired state Git while removing the cache (hard refresh).
  * [Edit]({{site.baseurl}}/docs/deployments/gitops/manage-application/#edit-argo-cd-application-definitions): Update General or Advanced configuration settings for the application.
  * [Delete]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-argo-cd-applications): Delete the application from Codefresh.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/app-context-menu-in-product.png" 
	url="/images/gitops-products/app-context-menu-in-product.png" 
	alt="Context menu with actions to manage applications within Products" 
	caption="Context menu with actions to manage applications within Products"
  max-width="60%" 
%}

## Troubleshooting Products

Here are a few tips to troubleshoot issues you may encounter 

### Applications not displayed for Product
You have created the Product but not assigned or connected any applications to it.

You must assign every application to the Product, either directly in the Products dashboard or through an annotation in the application's manifest.  
See [Assigning applications to Products](#assigning-applications-to-products).

### Applications assigned to products not displayed 

##### Issue
Applications assigned to a product are not displayed in the Product Dashboard.

##### Possible cause
One of the following:
* No environments created
* Application does not exist in the clusters-namespaces mapped to existing environments.

##### Possible solution
Applications assigned to products are only relevant in the context of the environments they are defined in.
Either create an environment, or add the cluster-namespace defined for the application to the existing environment's definition.

**Step 1: Create an Environment**  
* If required, [Create an Environment]({{site.baseurl}}/docs/dashboards/gitops-environments/#create-environments).


**Step 2: Add application's destination settings to Environment definition** 
1. In the Codefresh UI, from the sidebar, select **Environments**.  
  In the example below, there are two environments defined: `test` and `prod`. There are no applications in the `test` environment.
   
   {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/trble-env-without-apps.png" 
	url="/images/gitops-products/trble-env-without-apps.png" 
	alt="Defined environment without applications" 
	caption="Defined environment without applications"
  max-width="60%" 
  %}

{:start="2"}  
1. Mouse over the toolbar for the Environment and click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
1. Check the **Clusters and Namespaces** mapped to the environment.  
  In the example, the namespace `dev` is mapped to this environment.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/trble-edit-env-settings.png" 
	url="/images/gitops-products/trble-edit-env-settings.png" 
	alt="Example: Environment settings" 
	caption="Example: Environment settings"
  max-width="60%" 
  %} 

{:start="4"}  
1. Add the namespace defined for the application to the Environment settings.
1. Go back to the Product Dashboard.  
  You will now see your application in the product and in the correct environment.
-->

## Related articles
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application/)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  
[Home dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)   
