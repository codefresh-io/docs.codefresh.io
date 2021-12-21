---
title: "GitOps approach"
description: ""
group: getting-started
toc: true
---

<b>Note:</b> Kubernetes is also knows as k8s, letter 'k' followed by 8 letters followed by letter 's'. We will use those two interchangeably in the documentation.
## GitOps

Codefresh Software Development Platform (CSDP) is built entirely around the concept of GitOps, a set of best practices where the entire code delivery process is controlled via Git, including infrastructure and application definition as code and automation to complete updates and rollbacks
To fully understand the benefits of CSDP, let's have a sort recap of GitOps, and how it can help:

### Infrastructure as code, the entire system described declaratively 
  Infrastructure as code is a modern approach that "declaratively" describes the state of a system as Code, while having that single source of truth applied to an end-system. The end-system in most cases are modern cloud native tools. <br>
  Declarative means that configuration is guaranteed by a set of facts instead of by a set of instructions. With your end-system's declarations versioned in Git, you have a single source of truth. You can then both easily deploy and roll back your end-system, according to the state changes in Git. And even more important, if and when disaster strikes, you can also reproduce your cluster’s infrastructure reliably and quickly. <br>
  <b>GitOps is just a specific case of infrastructure as code where the end system is a Kubernetes cluster.</b><br>

### Desired system state versioned in Git
  With the declaration of your system stored in a version control system, and serving as your canonical source of truth, you have a single place from which everything is derived and driven. Now not only your application code is in Git, but also all the information required to install and manage them like service definition, deployment information, ....<br>  
  Developers can continue with the familiar and convenient approaches they are already using for their applicative code. In addition, Git  makes complicated tasks like collaboration (via pull requests), security (via signed commits), permissions (repository permissions), and rollback as trivial as they can get.


### Use dedicated tools to implement transfer of desired state into the end-system
  Once the state of your end-system is declared and kept under version control, there needs to be a tool and process to apply the updated desired state into the end system. <br>
  One of the tools for implementing infrastructure as code in the realm of DevOps is [Terraform](https://www.terraform.io/), for example. <br>
  While you can implement GitOps (infrastructure as code for kubernetes), using a battle-ready tool like Terraform which has a plugin system that also supports kubernetes, k8s has many nuances that differ from  a traditional sync process to a cloud system or some other standard REST API end-system. <br>
  To address the specific use cases of kubernetes, there are new tools dedicated to implementing GitOps (infrastructure as code for k8s), such as [ArgoCD](https://github.com/argoproj/argo-cd).

  
