---
title: "Create and manage Environments"
description: "Create and manage Environments to track SDLC for Argo CD applications"
group: environments
toc: true
---

## Creating and managing Environments
Environments provide a structured way to manage applications across different stages of development and deployment. By defining environments, teams can control how applications are deployed, promoted, and tested. Codefresh environments integrate with products and applications, enabling visibility and governance over deployments. 

This article describes how to create and manage environment.

## Create Environments
Create one or more Environments corresponding to any stage in your development and deployment lifecycle.  
Define the configuration of the Environment through a unique name, it's intended usage, and any number of clusters and namespaces. 
Environments are automatically populated with the applications deployed in the clusters and namespaces mapped to them.


1. In the Codefresh UI, from the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your GitOps Environment, which is meaningful in the context of your development and deployment cycle. 
    1. **Kind**: The purpose of this GitOps Environment, and can be either **Production** where the live versions of the applications are deployed,  or **Non-production** where development, testing, staging versions are deployed.
    <!--- 1. **Tags**: Any metadata providing additional context and information about the GitOps Environment, used for filtering and organization purposes.  -->
    1. **Clusters and Namespaces**: Single or multiple clusters and namespaces in any combination to map to the GitOps Environment.  
	  To include all namespaces in a cluster, leave Namespaces empty. Adding a cluster with one or more namespaces populates the Environment with all the applications deployed in the namespaces. <!--- When selecting namespaces in a cluster, use `*` as a wildcard for pattern-based matching. For example, you can use `prod-*` to add all namespaces with names starting with `prod-`. -->

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/create-environment.png" 
	url="/images/gitops-environments/create-environment.png" 
	alt="Create a GitOps Environment" 
	caption="Create a GitOps Environment"
  max-width="60%" 
%} 

{:start="3"}  
1. Click **Add**. The Environment is displayed in the Environments dashboard. 







## Managing Environments

Once you create an Environment, it is displayed in the Environments dashboard.
The Environments dashboard consolidates in one location the Environments defined for the account along with the products and applications that belong to each Environment. 


### Reorder Environments with drag-and-drop
Change the order of the Environments displayed in the Environments dashboard to suit your requirements through simple drag and drop. By default, environments are displayed in the same order in which they are created.

For example, if you have two non-production and one production Environment for your e-commerce application, you can order them to display first the non-production and then the production environments to reflect the corresponding stages.

1. In the Codefresh UI, from the sidebar, select **Environments**.
1. Mouse over the column with the environment to move.
1. Click {::nomarkdown}<img src="../../../images/icons/move-environments.png?display=inline-block">{:/} and drag the column to the required location.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/reorder-environments.png" 
	url="/images/gitops-environments/reorder-environments.png" 
	alt="Drag and drop to move Environments" 
	caption="Drag and drop to move Environments"
  max-width="60%" 
%}
 
### Edit Environments
Update an environment's configuration settings when required. You can change all settings for an environment, including the name.

You may need to edit an environment's settings when you add new infrastructure or deploy applications. In this case, you can add the new cluster and namespace, or only the namespace to the environment's definition.  

1. In the Codefresh UI, from the sidebar, select **Environments**.
1. Mouse over the column with the Environment to edit, and click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
1. Edit the settings as required. 


### Delete Environments
Delete unused or legacy environments to avoid clutter. Deleting an environment removes it from the Environments dashboard. The underlying resources or configuration, including the applications remain intact. 

1. In the Codefresh UI, from the sidebar, select **Environments**.
1. Mouse over the column with the environment to delete.
1. Click {::nomarkdown}<img src="../../../images/icons/trash.png?display=inline-block">{:/}, type the name of the environment to confirm **Delete**.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/delete-environment.png" 
	url="/images/gitops-environments/delete-environment.png" 
	alt="Delete a GitOps Environment" 
	caption="Delete a GitOps Environment"
  max-width="60%" 
%}




## Related articles
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Manage Products and applications in Environments]({{site.baseurl}}/docs/environments/manage-apps-in-environments/)  
[About Environments]({{site.baseurl}}/docs/environments/environments-overview/)  


