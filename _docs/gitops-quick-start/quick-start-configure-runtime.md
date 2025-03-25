---
title: "Quick start: Configuring a GitOps Runtime"
description: "Configure the GitOps Runtime for smooth operations"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/gitops-quick-start/create-git-source/
---



## Configure GitOps Runtime quick start
This quick start guides you through configuring the GitOps Runtime after installing it to enable GitOps workflows.    
Configure the Runtime immediately after installation using the Configuration and Management steps in the Runtime Installation Wizard.

Configuration includes:
* [Configuring Git credentials](#configure-git-credentials-for-runtime)
* [Configuring the Runtime as an Argo CD Application](#configure-runtime-as-argo-cd-application)
* [Adding a Git source](#add-git-source-to-runtime)

For detailed information, see [Configuring the GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/runtime-configuration/).


## Configure Git credentials for Runtime
Git credentials for the Runtime require two Git tokens: 
* **Git Runtime token** (mandatory): Provided during installation, typically associated with a service or robot account.
* **Git user token**: Unique to each user, required after installation for every Runtime the user has access to.

To simplify setup, use the Git Runtime token also as the Git user token if it has the necessary scopes.


## Configure Runtime as Argo CD application
Configuring the GitOps Runtime as an Argo CD Application enables:
* Visibility into Runtime components
* Monitoring health and sync statuses
* Enforcement of Git as the single source of truth

To configure, click **Configure as Argo CD Application**. Codefresh will automatically handle the setup—no further action required. 


## Add Git Source to Runtime

A Git Source is a unique entity that connects a Git repository to a GitOps Runtime.  
The repository contains application manifests and other resources which continuously sync to the cluster. You can manage the Git Source itself as an Argo CD application.

### Git Source settings
Define these settings for the Git Source:
* **Git Source Name**: A name for the Git Source, `demo-trio-gitsource` for the quick start to tie in with set of applications we'll create later.
* **Type**: Retain **Standard Git Source**.
* **Source**: 
  * Select **Create a new repository** to automatically create the repository in GitHub if it doesn't exist.
  * **Repository**: Enter the full path to the repository, including the `.git` extension.  
	For the quick start, we'll define `https://github.com/codefresh-sandbox/demo-git-source.git`.
  * **Branch**: `main`.  
Leave all other settings as is.

## What's next
Now that the GitOps Runtime is installed and configured, you are ready to create applications.

[Quick start: Creating products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)


