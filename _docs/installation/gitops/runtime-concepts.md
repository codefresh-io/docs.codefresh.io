---
title: "GitOps Runtime concepts"
description: "Review key concepts and components for GitOps Runtimes"
toc: true
---


The GitOps Runtime is the cornerstone of Codefresh’s GitOps solution, enabling seamless integration between your clusters, Git repositories, and applications. 

Beyond its core functionality, the Runtime introduces several key concepts and components that enhance flexibility, scalability, and control in managing GitOps processes. This article explores these concepts and components, including the secure usage of Git tokens, the role of the Shared Configuration Repository, and the roles of Git Sources and external clusters in Runtimes. 

## Multiple Runtimes in account
In the same account, you can install multiple GitOps Runtimes, provided each Runtime:
* Is installed on a different cluster
* Has a unique name


The Runtime installation command provides a default name (`codefresh`) for the Runtime. When installing additional Runtimes, make sure you use different names. This naming requirement prevents conflicts and ensures seamless operation across your clusters.



## Git tokens in Runtimes 

As a GitOps platform, Codefresh needs to create and access your Git repositories to both store Runtime configuration settings for the account, and allow Argo CD to sync Kubernetes resources and templates from the different repositories to your cluster.  

Codefresh uses two Git personal access tokens: one for the Runtime, and one for each user. 
During installation, you can use the same Git token for both the Runtime and as your Git user token.

>**IMPORTANT**  
At all times, _both tokens are securely stored on your cluster_ and never stored locally on our platform. 

* **Git Runtime token**  
  The Git Runtime token is a Git personal access token required during Runtime installation. It is typically associated with a service or robot account and managed by the account administrator.      
  The Git Runtime token is used to create a Git repository to store configuration settings shared across all Runtimes in the account, such as Helm charts and values files. It also enables Argo CD to clone the Git repos, pull and sync changes to the K8s cluster.

* **Git user token**  
  The Git user token is also a Git personal access token, _unique to each user in the account_. It is created after Runtime installation and managed individually by each user. Enables users to manage Git repositories and authorize Git operations or actions directly from the UI or CLI.


For information on the differences between the two types of tokens, and the required scopes for each, see [Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/).



## Shared Configuration Repository in Runtimes
A Codefresh account with a GitOps Runtime can store configuration manifests for account-level resources in a Git repository. This repository, the Shared Configuration Repository, can be shared with other GitOps Runtimes in the same account, avoiding the need to create and maintain different configuration manifests for every GitOps Runtime. At the same time, you also have the flexibility to store resources unique to specific Runtimes in this repository without affecting other Runtimes. 

When you install the first GitOps Runtime in your account, Codefresh automatically creates the Shared Configuration Repository (internally referred to as (internally `ISO`/`iso`).
During installation, you must specify the Git repository URL for the Shared Configuration Repository. You can specify just the repository URL or include additional details such as a specific branch and path.

Watch this video for an overview: 
{::nomarkdown}{% if page.collection != site.gitops_collection %}<img src=../../../../images/icons/video-play-icon-blue.svg?display=inline-block>{% endif %}{% if page.collection == site.gitops_collection %}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{% endif %}{:/} [Shared Configuration Repository](https://www.youtube.com/watch?v=7WNoNZ58IzU){:target="\_blank"}

For detailed information, see [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).



## Configuration Runtimes
A Configuration Runtime is a GitOps Runtime designated to manage platform-level resources shared across all Runtimes in the account. These resources, essential for features like products and promotions in GitOps, ensure smooth platform operations.  

Codefresh automatically designates the first GitOps Runtime in your account as the Configuration Runtime. When designated as such, Codefresh creates a folder entitled `configuration` within `resources` in the Shared Configuration Repository to store product and promotion configuration settings.  
You can designate any Runtime as a Configuration Runtime through the UI or by updating the `values.yaml` file. 

For information on how to designate Configuration Runtimes, see [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/).

## Git Sources in Runtimes
A Git Source is a unique entity created for use with GitOps Runtimes in Codefresh. 
The Git Source connects to a Git repository within your organization, and stores application manifests and other resources which are always synced to the cluster. Git Sources help to easily manage the deployment and configuration of multiple Argo CD applications on clusters. 

You can add a Git Source during Runtime installation or later as needed. A single Runtime can have any number of Git Sources.  
Codefresh manages the Git Source itself as an Argo CD application.

Watch this video for an overview:
{::nomarkdown}{% if page.collection != site.gitops_collection %}<img src=../../../../images/icons/video-play-icon-blue.svg?display=inline-block>{% endif %}{% if page.collection == site.gitops_collection %}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{% endif %}{:/} [Git Sources in Runtimes](https://www.youtube.com/watch?v=StKxdCcOIQc&t=2s){:target="\_blank"} 

For detailed information, see [Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/).

## External clusters in Runtimes
With GitOps Runtimes, you can deploy applications to external clusters without installing Argo CD on each cluster, ensuring centralized management.

After installing a GitOps Runtime, you can register external clusters as managed clusters. A managed cluster is a Kubernetes cluster registered with a GitOps Runtime for centralized application deployment. You can monitor its health and sync status, deploy applications to it, and remove it when no longer needed.

For information on adding clusters and managing them, see [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).

## Related articles
[Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/)  
[Runtime system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/)  
[Runtime prerequisites ]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/)  
[Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)  
[Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
{% if page.collection != site.gitops_collection %}[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/){% endif %}   
