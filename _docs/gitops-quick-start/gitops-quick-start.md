---
title: "GitOps quick starts"
description: "Walkthroughs from start to deployment"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/
---

## GitOps quick starts: From start to deployment 
Codefresh GitOps simplifies software delivery with automation, consistency, and scalability. These quick start guides provide step-by-step instructions to help you quickly set up, manage, and promote applications with Codefresh GitOps.

Each quick start is standalone, so you can explore specific topics as needed. However, for maximum value, the quick starts are designed to build upon each other, taking you on a journey from setup to seamless application promotion across environments.

The journey begins with setting up your account and installing the GitOps Runtime. From there, you’ll define environments, products, and applications, leading to deploying and promoting applications effectively across multiple environments.

We've provided a GitHub repository with all the applications and resources used in the quick starts. You can follow along directly or fork the repository to create and manage your own applications.



## Essential setup

* [Creating a Codefresh account]({{site.baseurl}}/docs/gitops-quick-start/create-codefresh-account/)  
  Start by creating your Codefresh account.

* [Installing a GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-install-runtime/)  
  Review system requirements and prerequisites and install the GitOps Runtime.

* [Configuring a GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-configure-runtime/)    
  Configure the GitOps Runtime for successful operation.


## Creating GitOps entities for promotions
* [Creating products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)   
  Create Argo CD applications, the product to link them to, and configure their source repositories, manifests, and deployment paths.

* [Creating environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)  
  Define and manage environments such as development and production, enabling structured application deployments across different stages.

* [Creating Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/quick-start-promotion-workflow/)   
  Automate pre- and post-promotion actions during GitOps promotions in environments, ensuring quality, security, and compliance at each stage.


## Promoting applications

Promote and deploy changes in applications across environments.
Start with simple manual promotion, then automate with Promotion Flows—evolving from simple sequential promotions to advanced ones with environment dependencies.

* [Simple drag-and-drop promotion]({{site.baseurl}}/docs/gitops-quick-start/drag-and-drop/)  
  Manually promote a product between two environments.
* [Simple Promotion Flow with multiple environments]({{site.baseurl}}/docs/gitops-quick-start/multi-env-sequential-flow/)  
  Automate promotions across multiple environments sequentially using a simple Promotion Flow.
* [Advanced Promotion Flow with Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/policy-multi-env-promotion/)  
  Control promotion behavior for environments using Promotion Workflows within a Promotion Flow.
* [Advanced Promotion Flow with environment dependencies]({{site.baseurl}}/docs/gitops-quick-start/dependency-multi-env-promotion/)  
  Run promotions with defined dependencies between environments using an advanced Promotion Flow.


  

## Example Git repository

To support learning through these quick starts, we’ve created an [example GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"} containing the application manifests and resources used in the quick starts.

The repository is structured to help you follow along with the guides:
* `argocd-app-manifests`: Manifests with the configuration definitions of all the Argo CD applications used in the quick starts.
* `demo-applications`: Supporting files and resources required for these applications.

You can either:
* Clone the repository to follow along with the examples.
* Fork the repository to customize and create your own applications and resources.



