---
title: "Quick start: Installing a GitOps Runtime"
description: "Install the Helm-based GitOps Runtime"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/runtime/
  - /docs/gitops-quick-start/verify-requirements/
  _ /docs/gitops-quick-start/runtime/
---



## Install GitOps Runtime quick start
This quick start walks you through installing the GitOps Runtime in Codefresh.  
It covers system requirements, prerequisites, and installation modes for GitOps Runtimes.


## Runtime installation modes
Codefresh provides two installation options for the GitOps Runtime, depending on your existing Argo CD setup:

* **Install with an existing Argo CD instance (default)**  
  If you already have an Argo CD instance running in your cluster, the GitOps Runtime integrates with it by installing additional Codefresh components alongside Argo CD.  
  This approach ensures seamless integration without modifying your existing deployment. 


* **Install with a new Argo CD instance**
  If your cluster does not have an Argo CD instance, Codefresh can install and configure one for you along with the GitOps Runtime.  
  When using this option, Codefresh installs Argo CD with default configurations, which you can customize later as needed.

The main architectural difference is that the Argo CD instance is either external to the Runtime or included within the Runtime.
For a diagrammatic illustration, review [Runtime installation modes and architecture](#runtime-installation-modes-and-architecture). 



## Quick start assumptions

* **First GitOps Runtime in account**  
  The quick start assumes you are installing the first GitOps Runtime in your Codefresh account. 

* **Tunnel-based access mode**  
  GitOps Runtimes support tunnel-based and ingress-based access modes.    
  For the quick start, we'll use the default tunnel-based access mode, which does not require an ingress controller.   
  For details on access modes, see [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).

{% if page.collection != site.gitops_collection %}
* **GitHub as the Git provider**   
 The quick start uses GitHub as the Git provider.
{% endif %}

## Runtime system requirements
Before installing the GitOps Runtime, ensure your environment meets the [system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/).

## Runtime prerequisites
Review the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/#prerequisites-summary-1) to prepare your environment for the selected installation mode.

## Installing with an existing Argo CD instance (default)
To install the GitOps Runtime using an existing Argo CD instance, follow the steps in the Runtime Installation Wizard.  
For detailed information, see [Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).

## Installing with a new Argo CD instance
To install the GitOps Runtime using a new Argo CD instance, follow the steps in the Runtime Installation Wizard.  
For detailed information, see [Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).



## What’s next?
After completing installation, to ensure correct functioning, we'll configure the GitOps Runtime.

[Quick start: Configuring a GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-configure-runtime/)











## What's next
Let's complete the configuration for the Runtime  a Git Source to which we'll link the applications we'll create later in the quick start series.  

[Quick start: Creating a Git Source]({{site.baseurl}}/docs/gitops-quick-start/create-git-source/)




