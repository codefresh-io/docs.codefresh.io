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
Follow this quick start to install the GitOps Runtime in Codefresh.  
It outlines system requirements, prerequisites, and installation modes.


## Runtime installation modes
Choose from two installation options based on your existing Argo CD setup:

* **Install with an existing Argo CD instance (default)**  
  If your cluster already runs Argo CD, the GitOps Runtime integrates with it by installing additional Codefresh components.
  This option integrates seamlessly without modifying your existing deployment.


* **Install with a new Argo CD instance**
  If Argo CD is not installed, Codefresh can deploy and configure it along with the GitOps Runtime.  


The key difference is whether Argo CD instance is either external to the Runtime or installed as part of it.
For an architectural overview, see [Runtime installation modes and architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/#runtime-installation-modes-and-architecture). 



## Quick start assumptions
This quick start assumes you are:
* Installing the first GitOps Runtime in your Codefresh account.
* Using tunnel-based access mode.  
  GitOps Runtimes support both tunnel-based and ingress-based access modes.  
  This quick start follows the default tunnel-based mode, which does not require an ingress controller.
  For details, see [Runtime access modes and architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/#runtime-access-modes-and-architecture).
{% if page.collection != site.gitops_collection %}
* Using GitHub as the Git provider.
{% endif %}


## Runtime system requirements
Before installation, make sure your environment meets the [system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/).

## Runtime prerequisites
Complete the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/#prerequisites-summary) to prepare your environment for the selected installation mode.

## Installing with an existing Argo CD instance (default)
Follow the installation wizard to [install the GitOps Runtime with an existing Argo CD instance]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).

## Installing with a new Argo CD instance
Follow the installation wizard to [install the GitOps Runtime with a new Argo CD instance]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-new-argo-cd/).



## What’s next?
After installation, configure the GitOps Runtime to complete the setup.

[Quick start: Configuring a GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-configure-runtime/)


