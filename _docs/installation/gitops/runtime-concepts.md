---
title: "GitOps Runtime concepts"
description: "Review concepts and components key to GitOps Runtimes"
toc: true
---

<!--- add a banner - new topic consolidating concepts and components scattered in installation topics -->

The GitOps Runtime is the cornerstone of Codefresh’s GitOps solution, enabling seamless integration between your clusters, Git repositories, and applications. 

Beyond its core functionality, the Runtime introduces several key concepts and components that enhance flexibility, scalability, and control in managing GitOps processes. This article explores these concepts and components, including the secure usage of Git tokens, the role of the Shared configuration Repository, and the roles of Git sources and external clusters in Runtimes. 


## Multiple Runtimes in account
In the same account, you can install multiple GitOps Runtimes, provided each Runtime:
* Is installed on a different cluster
* Has a unique name

The Runtime installation command provides a default name (`codefresh`) for the Runtime. When installing additional Runtimesm make sure you use different names. This naming requirement prevents conflicts and ensures seamless operation across your clusters.


## Git tokens in Runtimes 

As a GitOps platform, Codefresh needs to create and access your Git repositories to both store Runtime configuration settings for the account, and allow Argo CD to sync Kubernetes resources and templates from the different repositories to your cluster.  

We use Git personal access tokens for this: one for Runtimes, and another for each user. 

>**IMPORTANT**  
At all times, _both tokens are securely stored on your cluster_ and never stored locally on our platform. 

* **Git Runtime token**  
  The Git Runtime token is a Git personal access token required during Runtime installation. It is typically associated with a service or robot account and managed by the account administrator.      
  The Git Runtime token is used to create a Git repository to store configuration settings shared across all Runtimes in the account, such as Helm charts and values files. It also enables Argo CD to clone the Git repos, pull and sync changes to the K8s cluster.

* **Git user token**  
  The Git user token is also a Git personal access token, _unique to each user in the account_. It is created after Runtime installation and managed individually by each user. Enables users to manage Git repositories and authorize Git operations or actions directly from the UI or CLI.

For information on how the differences between the two and required scopes, see [Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/).



## Shared Configuration Repository in Runtimes
A Codefresh account with <!--- a Hosted or -->a GitOps Runtime can store configuration manifests for account-level resources in a Git repository. This repository, the Shared Configuration Repository, can be shared with other GitOps Runtimes in the same account, avoiding the need to create and maintain different configuration manifests for every GitOps Runtime. At the same time, you also have the flexibility to store resources unique to specific Runtimes in this repository without affecting other Runtimes. 

The Shared Configuration Repository (internally `ISO`/`iso`), is created on installing the first GitOps Runtime in the account.
During installation, you need to provide the URL to the Git repository defined as the Shared Configuration Repo, using only the repository URL, or by adding the path, reference a branch, or both.
Codefresh identifies the Git provider from the URL provided, and for cloud providers, automatically populates the Git Provider and the API URL fields.

Watch this video for an overview: 
{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Shared Configuration Repository](https://www.youtube.com/watch?v=7WNoNZ58IzU){:target="\_blank"}

For detailed information, see [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).



## Configuration Runtimes
A Configuration Runtime is a GitOps Runtime designated to manage platform-level resources that are not tied to a specific Runtime. These resources, essential for features like products and promotions in GitOps ensure smooth platform operations.  

Codefresh automatically designates the first GitOps Runtime in your account as the Configuration Runtime. When designated, Codefresh creates a folder entitled `configuration` within `resources` in the Shared Configuration Repository to store product and promotion configuration settings.  
You can designate any Runtime as a Configuration Runtime through the UI or the `values.yaml` file. 

For information on how to designate Configuration Runtimes, see [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/).

## Git Sources in Runtimes
A Git Source is a unique entity created for use with GitOps Runtimes in Codefresh. 
The Git Source connects to a Git repository within your organization, and stores application manifests and other resources which are always synced to the cluster. Git Sources help to easily manage the deployment and configuration of multiple Argo CD applications on clusters. 

You can add a Git Source as part of the Runtime installation, or after installation whenever required. The same Runtime can have multiple Git Sources. Codefresh manages the Git Source itself as an Argo CD application.

Watch this video for an overview:
{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Git Sources in Runtimes](https://www.youtube.com/watch?v=StKxdCcOIQc&t=2s){:target="\_blank"} 


For detailed information, see [Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/).

## External clusters in Runtimes
GitOps Runtimes allow you to extend your application deployments to external clusters, enabling centralized management without requiring Argo CD installations on each cluster. 

Once you have installed a GitOps Runtime, you can register external clusters as managed clusters and seamlessly deploy applications to them.
A managed cluster is any Kubernetes cluster registered with a GitOps Runtime. Once added, the cluster is treated like any other managed Kubernetes resource.
You can monitor its health and synchronization status, deploy applications directly to the cluster, and remove the cluster when no longer needed.

For information on adding managed clusters and managing them, see [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).

## Related articles
[Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/)  
[System requirements & prerequsites]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/)  
[Ingress controller configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/)   
[Install GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/)  