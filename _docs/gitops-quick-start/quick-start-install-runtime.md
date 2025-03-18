---
title: "Quick start: Installing a GitOps Runtime"
description: "Install the Helm-based GitOps Runtime"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/runtime/
  - /docs/gitops-quick-start/verify-requirements/
  - /docs/gitops-quick-start/runtime/
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

The main architectural difference is whether the Argo CD instance is either external to the Runtime or included within the Runtime.
For an architectural overview, see [Runtime installation modes and architecture](#runtime-installation-modes-and-architecture). 



## Quick start assumptions
This quick start assumes that you are:
* Installing the first GitOps Runtime in your Codefresh account.
* Using tunnel-based access mode.  
  GitOps Runtimes support tunnel-based and ingress-based access modes.  
  This quick start uses the default tunnel-based mode, which does not require an ingress controller.
  For details, see Runtime access modes and architecture(({{site.baseurl}}/docs/installation/gitops/runtime-architecture/#runtime-access-modes-and-architecture).
{% if page.collection != site.gitops_collection %}
* Using GitHub as the Git provider.
{% endif %}


## Runtime system requirements
Before installing the GitOps Runtime, ensure your environment meets the [system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/).

## Runtime prerequisites
Review and complete the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/#prerequisites-summary-1) to prepare your environment for the selected installation mode.

## Installing with an existing Argo CD instance (default)
To install the GitOps Runtime using an existing Argo CD instance, follow the steps in the installation wizard.  
For detailed information, see [Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).

## Installing with a new Argo CD instance
To install the GitOps Runtime using a new Argo CD instance, follow the steps in the installation wizard.  
For detailed information, see [Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).



## What’s next?
After installation, configure the GitOps Runtime to ensure correct operation.

[Quick start: Configuring a GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-configure-runtime/)


