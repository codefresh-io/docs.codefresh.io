---
title: "Create and manage environments"
description: "Create and manage environments to track SDLC for Argo CD applications"
group: environments
toc: true
---

## Creating and managing environments
Environments provide a structured way to manage Argo CD applications across different stages of development and deployment. By defining environments, teams can control how applications are deployed, tested, and promoted. Environments in Codefresh GitOps integrate with products and applications, providing visibility and governance over deployments.

This article describes how to create and manage environments.

## Create environments
Create one or more environments corresponding to stages in your development and deployment lifecycle.  
Define an environment with a unique name,  intended usage, and any number of clusters and namespaces. 
Environments are automatically populated with the applications deployed in the clusters and namespaces mapped to them.


1. In the Codefresh UI, from the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
    1. **Name**: A unique name for your GitOps Environment, which is meaningful in the context of your development and deployment cycle. 
    1. **Kind**: The purpose of this GitOps Environment, and can be either **Production** for live deployments,  or **Non-production** for development, testing, or staging.
    <!--- 1. **Tags**: Any metadata providing additional context and information about the GitOps Environment, used for filtering and organization purposes.  -->
    1. **Clusters and Namespaces**: Single or multiple clusters and namespaces to map to the environment in any combination.  
	  To include all namespaces in a cluster, leave the **Namespaces** field empty.  
	  Adding a cluster with one or more namespaces automatically populates the environment with applications deployed in those namespaces. <!--- When selecting namespaces in a cluster, use `*` as a wildcard for pattern-based matching. For example, you can use `prod-*` to add all namespaces with names starting with `prod-`. -->

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/create-environment.png" 
	url="/images/gitops-environments/create-environment.png" 
	alt="Create an environment in Codefresh GitOps" 
	caption="Create an environment in Codefresh GitOps"
  max-width="60%" 
%} 

{:start="3"}  
1. Click **Add**. The environment is displayed in the Environments dashboard. 







## Managing environments

Once created, environments appear in the Environments dashboard, which consolidates all environments, along with the products and applications associated with them.


### Reorder environments with drag-and-drop
Change the order of the environments in the Environments dashboard through simple drag and drop. By default, environments are displayed in the order they were created.

For example, if you have two non-production and one production environment for an e-commerce application, you can reorder them to reflect their progression: non-production environments first, followed by production.

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
 
### Edit environments
Update an environment's settings as needed. You can change all settings for an environment, including the name.

For example, if you add new infrastructure or deploy additional applications, update the environment by adding the relevant cluster or namespace. 

1. In the Codefresh UI, from the sidebar, select **Environments**.
1. Mouse over the column with the environment to edit, and click {::nomarkdown}<img src="../../../images/icons/edit.png?display=inline-block">{:/}.
1. Edit the settings as required. 


### Delete environments
Remove unused or legacy environments to keep your dashboard organized. Deleting an environment removes it from the Environments dashboard, but does not delete underlying resources, configurations, or applications.

1. In the Codefresh UI, from the sidebar, select **Environments**.
1. Mouse over the column with the environment to delete.
1. Click {::nomarkdown}<img src="../../../images/icons/trash.png?display=inline-block">{:/}, type the name of the environment to confirm **Delete**.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-environments/delete-environment.png" 
	url="/images/gitops-environments/delete-environment.png" 
	alt="Delete an environment" 
	caption="Delete an GitOps environment"
  max-width="60%" 
%}




## Related articles
[Environments dashboard]({{site.baseurl}}/docs/dashboards/gitops-environments/)  
[Manage products and applications in environments]({{site.baseurl}}/docs/environments/manage-apps-in-environments/)  
[About environments]({{site.baseurl}}/docs/environments/environments-overview/)  


