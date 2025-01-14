---
title: "GitOps Runtime essentials"
description: "Review concepts and components key to GitOps Runtimes"
group: gitops-runtimes
toc: true
---

<!--- add a branner - new topic consolidating concepts and components scattered in installation topics -->

The GitOps Runtime is the cornerstone of Codefresh’s GitOps solution, enabling seamless integration between your clusters, Git repositories, and deployment pipelines. 

Beyond its core functionality, the Runtime introduces several key concepts and components that enhance flexibility, scalability, and control in managing GitOps processes. This article explores these concepts and components, including the secure usage of Git tokens and the role of the Shared configuration Repository needed during Runtime installation, and the roles of Git sources and external clusters in Runtimes. 



## Git tokens in Runtimes 

As a GitOps platform, Codefresh needs to create and access your Git repositories to both store runtime configuration settings for the account, and allow Argo CD to sync Kubernetes resources and templates from the different repositories to your cluster.  

We use Git personal access tokens for this: one for Runtimes, and another for each user. 

>**IMPORTANT**  
At all times, _both tokens are always securely stored on your cluster_ and never stored locally on our platform. 

* **Git Runtime token**  
  The Git Runtime token is a Git access token required during the Runtime installation. It is typically associated with a service or robot account and managed by the account administrator.      
  It is used to create a Git repository to store configuration settings shared across all Runtimes in the account, such as Helm charts and values files. It also enables Argo CD to clone the Git repos, pull changes, and sync to the K8s cluster.

* **Git user token**  
  The Git user token is also a Git access token, unique to each user in the account. It is created after Runtime installation and managed individually by each user. Enables users to manage Git repositories and authorize Git operations or actions directly from the UI or CLI.

Read more on [Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/).



## Shared Configuration Repository in Runtimes
A Codefresh account with <!--- a Hosted or -->a Hybrid GitOps Runtime can store configuration manifests for account-level resources in a Git repository. This repository, the Shared Configuration Repository, can be shared with other GitOps Runtimes in the same account, avoiding the need to create and maintain different configuration manifests for every GitOps Runtime. At the same time, you also have the flexibility to store resources unique to specific Runtimes without affecting other Runtimes. 

The Shared Configuration Repository (internally `ISO`/`iso`) is created on installing the first Hybrid GitOps Runtime in the account.
Codefresh identifies the Git provider from the URL of the Shared Configuration Repo, and for cloud providers, automatically populates the Git Provider and the API URL fields.

You can define the Shared Config Repo using only the repository URL, or add the path, reference a branch, or both:

For information on the type of manifests and the structure, see [Shared Configuration Repository]({{site.baseurl}}/docs/gitops-runtime/shared-configuration/).

## Git Sources in Runtimes
A Git Source is a unique entity created for use with GitOps Runtimes in Codefresh. 
The Git Source connects to a Git repository within your organization, to easily manage the deployment and configuration of multiple Argo CD applications on clusters.

You can add a Git Source as part of the Runtime installation, after installation whenever required. The same Runtime can have multiple Git Sources.

The Git repository referenced by the Git Source stores application manifests and other resources which are always synced to the cluster. Codefresh manages the Git Source itself as an Argo CD application.

For information on the different types of Git Sources, their settings and usage, see [Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/git-sources/).

## External clusters in Runtimes
GitOps Runtimes allow you to extend your application deployments to external clusters, enabling centralized management without requiring Argo CD installations on each cluster. 

Once you have installed a GitOps Runtime, you can register external clusters as managed clusters and seamlessly deploy applications to them.
A managed cluster is any Kubernetes cluster registered with a GitOps Runtime. Once added, the cluster is treated like any other managed Kubernetes resource.
You can monitor its health and synchronization status, deploy applications directly to the cluster, and remove the cluster when no longer needed.

For information on adding managed clusters and managing them, see [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/gitops-runtime/managed-cluster/).

## Related articles
[Runtime architecture]({{site.baseurl}}/docs/gitops-runtime/runtime-architecture/)  
[System requirements & prerequsites]({{site.baseurl}}/docs/gitops-runtime/runtime-system-requirements/)  
[Ingress controller configuration]({{site.baseurl}}/docs/gitops-runtime/runtime-ingress-configuration/)   
[Install GitOps Runtime]({{site.baseurl}}/docs/gitops-runtime/hybrid-gitops-helm-installation/)  
[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side/)  