---
title: "Quick start: Creating a Git Source"
description: "Create a Git Source to store application manifests"
group: gitops-quick-start
toc: true
---

In this quick start, we'll focus on creating a Git Source for the GitOps Runtime we installed in the previous quick start. 

##### Why create a Git Source?
A Git Source is a unique entity for use with GitOps Runtimes in Codefresh.  
The Git Source connects to a Git repository within your organization, serving as an easy way to manage the deployment and configuration of Argo CD applications on clusters.  

The Git repository referenced by the Git Source stores application manifests and other resources which are always synced to the cluster. You can manage the Git Source itself as an Argo CD application.

We'll first create a Git repository for the Git Source and then create t



## Create a Git Source
Create the Git Source for the Runtime installed earlier to reference the Git repo corresponding to the Git Source. 
You can automatically create the repo at the same time as the Git Source.

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
	alt="Create Git Source" 
	caption="Create Git Source"
    max-width="60%" 
%}


{:start="4"}
1. Click **+ Create Git Source**.

Here's the example of the Git repo in GitHub for the Git Source. 

  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/runtimes/qs-runtime-gitsource-repo.png" 
	url="/images/quick-start/runtimes/qs-runtime-gitsource-repo.png" 
	alt="Git repo for Git Source" 
	caption="Git repo for Git Source"
    max-width="60%" 
%}

## What's next
You are now all set to create applications. Before we dive into the world of applications, let's create an environment.
Environments mimic your software development lifecycle and allow to track your applications.

[Quick start: Creating Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)

