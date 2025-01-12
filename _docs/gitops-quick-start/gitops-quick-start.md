---
title: "GitOps quick starts"
description: "Walkthroughs from start to deployment"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/
---

Codefresh GitOps simplifies application delivery with automation, consistency, and scalability. With these quick start guides, you can go from zero to deployment-ready in just a few steps. Each guide provides a structured walkthrough to help you fully leverage Codefresh GitOps for deploying and managing your applications.

The quick-start journey begins with setting up your account and installing the GitOps Runtime. From there, you’ll define environments, products, and applications, culminating in promoting applications seamlessly across environments.  
We’ve created a public repository on GitHub containing all the applications and resources used in these quick starts. You can follow along with the repo or fork it to create and manage your own applications.




## Quick starts: From start to deployment
 and concludes with promotions for applications. Each quick start builds on the last, equipping you with the knowledge and tools to confidently promote and deploy applications in production environments.


### Essential setup

* [Creating an Account]({{site.baseurl}}/docs/gitops-quick-start/create-codefresh-account/)  
  Get started by setting up your Codefresh account.

* [Installing a GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/gitops-runtimes/)    
  Install the GitOps Runtime, the single pane of glass component that bridges Git repositories, Kubernetes clusters, applications, and other GitOps entities.


### Creating GitOps entities for promotions
* [Creating environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/)  
  Define and manage environments such as development and production, enabling structured application deployments across different stages.

* [Creating products]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/)  
  Organize related applications under a single product, for better context and control of deployments.

* [Creating applications]({{site.baseurl}}/docs/gitops-quick-start/products/create-app-ui/)   
  Add applications to your product and configure their source repositories, manifests, and deployment paths.

### Promoting applications
* [Promoting products and applications]({{site.baseurl}}/docs/gitops-quick-start/promotions/)   
  Deploy, validate, and promote changes in applications across environments using automated promotion flows.

## Public Git repository

To support learning through these quick starts, we’ve created a [public GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"} containing the application manifests and resources used in the quick starts.

The repository is structured to help you follow along with the guides:
* `argocd-app-manifests`: Manifests with the configuration definitions of all the Argo CD applications used in the quick starts.
* `demo-applications`: Supporting files and resources required for these applications.

You can:
* Clone the repository to follow along with the examples.
* Fork the repository to customize and create your own applications and resources.



