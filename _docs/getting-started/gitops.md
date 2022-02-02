---
title: "GitOps approach"
description: ""
group: getting-started
toc: true
---

> In the documentation, Kubernetes and K8s are used interchangeably.

### GitOps

Codefresh Software Development Platform (CSDP) is built entirely around the concept of GitOps, a set of best practices where the entire code delivery process is controlled via Git, including infrastructure and application definition, and automation to complete updates and rollbacks.  

To fully understand the benefits of CSDP, let's briefly recap GitOps, and how it can help:

#### Infrastructure as code, the entire system described declaratively 
  Infrastructure as code is a modern approach that "declaratively" describes the state of a system as code, while having that single source of truth applied to an end-system. The end-systems in most cases are modern cloud native tools.  

  Declarative means that configuration is guaranteed by a set of facts, instead of by a set of instructions. With your end system's declarations versioned in Git, you have a single source of truth. You can then both easily deploy and roll back your end system according to the state changes in Git. And more important, if and when disaster strikes, you can also reproduce your cluster’s infrastructure reliably and quickly.  

  <b>GitOps is just a specific case of infrastructure as code where the end system is a Kubernetes cluster.</b>

#### Desired system state versioned in Git
  With the declaration of your system stored in a version control system, and serving as your canonical source of truth, you have a single place from which everything is derived and driven. Now not only your application code is in Git, but also all the information required to install and manage your application, including service definition, deployment information, and more.  

  Developers can continue with the familiar and convenient approaches they are already using for their applicative code. In addition, Git makes complicated tasks like collaboration (via pull requests), security (via signed commits), permissions (repository permissions), and rollback, as trivial as they can get.


#### Use dedicated tools to implement transfer of desired state into the end system
  Once the state of your end-system is declared and kept under version control, you need a tool and process to apply the updated desired state into the end system.  

  One of the tools for implementing infrastructure as code in the realm of DevOps is [Terraform](https://www.terraform.io/), for example.  

  While you can implement GitOps (infrastructure as code for Kubernetes), using a battle-ready tool like Terraform which has a plugin system that also supports Kubernetes, K8s has many nuances that differ from a traditional sync process to a cloud system or some other standard REST API end system.   

  To address the specific use cases of Kubernetes, there are new tools dedicated to implementing GitOps (infrastructure as code for k8s), such as [ArgoCD](https://github.com/argoproj/argo-cd).

  
