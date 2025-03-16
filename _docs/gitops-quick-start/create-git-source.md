---
title: "Quick start: Creating a Git Source"
description: "Add a Git Source to Runtimes to store application manifests"
group: gitops-quick-start
toc: true
---

In this quick start, we'll focus on creating a Git Source for the GitOps Runtime you installed.


##### Why create a Git Source?
A Git Source is a unique entity for use with GitOps Runtimes in Codefresh.  
The Git Source connects to a Git repository within your organization. The Git repository referenced by the Git Source stores application manifests and other resources which are always synced to the cluster. You can manage the Git Source itself as an Argo CD application.

For details, see [Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/). 

## Requirements
* [GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)


## Create a Git Source
Create the Git Source for the Runtime installed to reference the Git repo corresponding to the Git Source.  
If you don't have a repo, you can automatically create it at the same time as the Git Source.

<!---
{{site.data.callout.callout_tip}}
If you plan to use our example Git repository with the application manifests, ensure that you point the Git source to this [repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/argocd-app-manifests){target="\_blank"} during setup.
{{site.data.callout.end}}
-->
##### Step-by-step
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select **GitOps Runtimes**.
1. In the List View, select the Runtime you installed earlier, and then click the **Git Sources** tab.  
1. Click **Create Git Source**, and in the Create Git Source panel, define the settings for the Git Source.  
    * **Git Source Name**: A name for the Git Source, `demo-trio-gitsource` for the quick start to tie in with set of applications we'll create later.
    * **Type**: Retain **Standard Git Source**.
    * **Source**: 
      * Select **Create a new repository** to automatically create the repository in GitHub if it doesn't exist.
      * **Repository**: Enter the full path to the repository, including the `.git` extension.  
	    <!--- To use our public repository, define `https://github.com/codefresh-sandbox/codefresh-quickstart-demo.git`.  -->
		For the quick start, we'll define `https://github.com/codefresh-sandbox/demo-git-source.git`.
      * **Branch**: `main`.  
  Leave all other settings as is.



  {% include 
	image.html 
	lightbox="true" 
	file="/images/quick-start/runtimes/qs-runtime-create-gitsource.png" 
	url="/images/quick-start/runtimes/qs-runtime-create-gitsource.png" 
	alt="Runtime quick start: Create Git Source" 
	caption="Runtime quick start: Create Git Source"
    max-width="50%" 
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
With a Git Source set up, you are now ready to create applications. 
You’re probably eager to dive into applications, and that's what we'll do in the next quick start. 

[Quick start: Creating Products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)







