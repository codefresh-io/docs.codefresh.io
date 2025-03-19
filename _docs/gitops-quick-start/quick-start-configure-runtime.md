---
title: "Quick start: Configuring a GitOps Runtime"
description: "Configure the GitOps Runtime for smooth operations"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/gitops-quick-start/create-git-source/
---



## Configure GitOps Runtime quick start
This quick start guides you through configuring the GitOps Runtime after installing it to ensure successful GitOps operations.  

You can configure the Runtime immediately after installation using the Configuration and Management steps in the Runtime Installation Wizard.

Configuration includes:
* [Configuring Git credentials](#configure-git-credentials-for-runtime)
* [Configuring the Runtime as an Argo Application](#configure-runtime-as-argo-application)
* [Adding a Git source](#add-git-source-to-runtime)

For detailed information, see [Configuring the GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/runtime-configuration/).


## Configure Git credentials for Runtime
Git credentials for the Runtime include defining two Git tokens: 
* **Git Runtime token** (mandatory): Provided during installation, typically associated with a service or robot account.
* **Git user token**: Unique to each user, required after installation for every Runtime the user has access to.

To simplify setup, you can use the Git Runtime token as the Git user token, as long as it includes the necessary scopes for user access.


## Configure Runtime as Argo application
Configuring the GitOps Runtime as an Argo Application allows you to:
* View Runtime components
* Monitor health and sync statuses
* Ensure Git remains the single source of truth for the Runtime

To configure, click **Configure as Argo Application**. Codefresh will automatically handle the setup—no additional action required. 


## Add Git Source to Runtime

A Git Source is a unique entity that connects a Git repository to a GitOps Runtime.  
The repository contains application manifests and other resources, which are continuously synced to the cluster. You can manage the Git Source itself as an Argo CD application.

### Git Source settings
Here are the settings you can use for the Git Source.
* **Git Source Name**: A name for the Git Source, `demo-trio-gitsource` for the quick start to tie in with set of applications we'll create later.
* **Type**: Retain **Standard Git Source**.
* **Source**: 
  * Select **Create a new repository** to automatically create the repository in GitHub if it doesn't exist.
  * **Repository**: Enter the full path to the repository, including the `.git` extension.  
	For the quick start, we'll define `https://github.com/codefresh-sandbox/demo-git-source.git`.
  * **Branch**: `main`.  
Leave all other settings as is.

## What's next
Now that the GitOps Runtime is installed and configured, you are probably eager to dive into the world of applications in GitOps.
And that's what we'll continue with:

[Quick start: Creating Products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)


