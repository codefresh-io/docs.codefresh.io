---
title: "Quick start: Creating a Git Source"
description: "Add a Git Source to Runtimes to store application manifests"
group: gitops-quick-start
toc: true
---

In this quick start, we'll focus on creating a Git Source for the GitOps Runtime we installed in the previous quick start. 

##### Why create a Git Source?
A Git Source is a unique entity for use with GitOps Runtimes in Codefresh.  
The Git Source connects to a Git repository within your organization, serving as an easy way to manage the deployment and configuration of Argo CD applications on clusters.  

The Git repository referenced by the Git Source stores application manifests and other resources which are always synced to the cluster. You can manage the Git Source itself as an Argo CD application.

For details, see [Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/gitops-quick-start/products/). 



## Create a Git Source
Create the Git Source for the Runtime installed earlier to reference the Git repo corresponding to the Git Source. 
You can automatically create the repo at the same time as the Git Source.

##### Step-by-step
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select **GitOps Runtimes**.
1. In the List View, select the Runtime you installed earlier, and then click the **Git Sources** tab.  
1. Click **Create Git Source**, and in the Create Git Source panel, define the settings for the Git Source.  
    * **Git Source Name**: A name for the Git Source, `demo-trio-gitsource` for the quick start to tie in with set of applications we'll create later.
    * **Type**: Retain **Standard Git Source**.
    * **Source**: 
      * Select **Create a new repository** to automatically create the repository in GitHub.
      * **Repository**: Enter the full path to the repository, including the `.git` extension. For the quick start, we'll define `https://github.com/codefresh-sandbox/demo-git-source.git`.
      * **Branch**: `main`.
  Leave all other settings as is.



  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/runtimes/qs-runtime-create-gitsource.png" 
	url="/images/quick-start/runtimes/qs-runtime-create-gitsource.png" 
	alt="Runtime quick start: Create Git Source" 
	caption="Runtime quick start: Create Git Source"
    max-width="60%" 
%}


{:start="5"}
1. Click **+ Create**.

Here's an example of the Git repository referenced in GitHub by the Git source.

  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/runtimes/qs-runtime-gitsource-repo.png" 
	url="/images/quick-start/runtimes/qs-runtime-gitsource-repo.png" 
	alt="Runtime quick start: Git repo for Git Source" 
	caption="Runtime quick start: Git repo for Git Source"
    max-width="60%" 
%}

## What's next
With a Git Source setup, you are now ready to create applications. Before diving into application creation, let’s focus on two key entities essential for promoting and deploying applications: Environments and Products.

* Environments represent stages in your software development lifecycle, providing a structured way to track and manage your applications.
* Products group related applications under a single entity, enabling better organization, visibility, and control when promoting changes and deploying applications.

Let’s continue by creating environments.

[Quick start: Creating Environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/)

