---
title: "About GitOps Runtimes"
description: " Install Hybrid GitOps Runtimes on K8s clusters"
toc: true
---


## About GitOps Runtimes
Managing applications at scale requires efficient tools and practices. Codefresh's GitOps Runtime is a hybrid solution powered by Argo CD and Argo Rollouts, designed to streamline GitOps operations and simplify application management across environments.

### What is a GitOps Runtime?
The GitOps Runtime is a specialized component installed within your cluster, acting as a bridge between your infrastructure and the Codefresh platform. It integrates seamlessly with Argo CD, a leading tool for continuous delivery, and Argo Rollouts for advanced deployment strategies.

This Runtime forms the foundation of your GitOps operations, enabling centralized control and visibility across multiple Argo CD instances.
By leveraging the Runtime, teams can efficiently orchestrate deployments, monitor environments, and ensure consistency across applications. To better understand how the Runtime manages key aspects like Git token usage and shared config repos, see [GitOps Runtime concepts]({{site.baseurl}}/docs/installation/gitops/runtime-concepts/).

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="70%"
%}


### How GitOps Runtimes simplify scalable deployments
Enterprises using Argo CD for deployments often face significant challenges when scaling operations across clusters and environments. These include managing multiple Argo CD instances with limited visibility, and ensuring consistent configurations and updates.

The GitOps Runtime solves these challenges by providing a single pane of glass for all GitOps activities. It connects your cluster to the Codefresh platform simplifying operations even in highly complex environments, providing:
* A unified interface for managing all GitOps operations.
* Centralized administration of multiple Argo CD instances, eliminating the complexity of scattered deployments.
* Streamlined flows for continuous updates and application lifecycle management.

See [Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).

### Core capabilities and benefits of GitOps Runtimes
The GitOps Runtime provides a robust suite of features to manage applications across clusters effectively:

* **Single pane of glass visibility**  
  Manage all Argo CD instances through a unified control plane, ensuring full visibility into Runtimes and their configurations.
  View all installed Runtimes on the GitOps Runtimes page, complete with the information and actions needed for efficient management.

* **Effortless maintenance**  
  Receive real-time notifications about updates directly in the Runtimes page. Access changelogs to make transparent and informed upgrade decisions.

* **Flexible scalability**  
  Eliminate the challenges of maintaining multiple Argo CD instances. Easily add or reduce Argo CD instances by managing connected clusters through the Runtime.

* **Faster security remediations**  
  Leverage timely security patches, provided as part of Codefresh’s active maintenance of Argo CD. Security fixes in the forked version are made available ahead of the community version to enhance protection.

* **Streamlined lifecycle management**  
  Simplify continuous updates, ensuring that applications are consistently deployed and maintained across environments.

* **Centralized administration**  
  Consolidate control of user permissions, auditing, and other administrative tasks into a single location, independent of Argo CD instance locations.



## Installation options for GitOps Runtimes
You can install the Hybrid GitOps Runtime via Helm using one of two options, tailored to specific scenarios:

* **Clean-cluster installation without Argo CD**  
  Use this option to deploy the GitOps Runtime on a cluster that does not already have Argo CD installed.
  The cluster must not contain any Argo Project components.
  The installation process will deploy the required Argo Project components, including Argo CD, as part of the setup.  
  See [Install GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).


* **Cluster installation with Community Argo CD**  
  Use this option to extend an existing cluster that has a Community Argo CD instance by adding GitOps Runtime capabilities.  
  To prevent naming and tracking conflicts between the Community Argo CD instance and the GitOps Runtime-managed resources, you need additional configuration.  
  See [Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/).

## Multiple GitOps Runtimes in account
Within the same account, you can install one Hybrid GitOps Runtime per cluster.  
To install additional Hybrid GitOps Runtimes in the same account, each Runtime must be installed on a different cluster. Every Runtime within the same account must have a unique name.

See [Installing additional GitOps Runtimes from the Codefresh UI]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation#install-additional-gitops-runtimes-in-account), or using [Terraform]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#install-gitops-runtime-via-terraform) to install Runtimes.

<!--- ## Hosted GitOps
The SaaS version of GitOps, Hosted GitOps has Argo CD installed in the Codefresh cluster.

Hosted GitOps Runtime is installed and provisioned in a Codefresh cluster, and managed by Codefresh.  
Hosted environments are full-cloud environments, where all updates and improvements are managed by Codefresh, with zero-maintenance overhead for you as the customer.  
Currently, you can add one Hosted GitOps Runtime per account.
For the architecture, see [Hosted GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).

  
{% include
 image.html
 lightbox="true"
 file="/images/runtime/hosted-gitops-initial-view.png"
 url="/images/runtime/hosted-gitops-initial-view.png"
 alt="Hosted GitOps runtime setup"
 caption="Hosted GitOps runtime setup"
    max-width="80%"
%} 

  For more information on how to set up the hosted environment, including provisioning hosted runtimes, see [Set up Hosted GitOps]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).  

## Hybrid GitOps
The hybrid version of GitOps, has Argo CD installed in the customer's cluster.    
Hybrid GitOps is installed in the customer's cluster, and managed by the customer.  

The Hybrid GitOps Runtime is optimal for organizations with security constraints, wanting to manage CI/CD operations within their premises. Hybrid GitOps strikes the perfect balance between security, flexibility, and ease of use. Codefresh maintains and manages most aspects of the platform, apart from installing and upgrading Hybrid GitOps Runtimes which are managed by the customer.  

Hybrid GitOps Runtime installation includes a forked version of the Argo Project with its components: Argo CD, Argo Rollouts, Argo Workflows and Argo Events.

-->




## Hosted vs.Hybrid GitOps 

>**NOTE**  
We have deprecated Hosted GitOps Runtimes which are no longer supported.  
The comparison below is provided for historical reference only.

The table below highlights the main differences between Hosted and Hybrid GitOps.

{: .table .table-bordered .table-hover}
| GitOps Functionality           |Feature             |  Hosted                    | Hybrid |
| --------------          | --------------     |---------------             | --------------- |
| Runtime                 | Installation       | Provisioned by Codefresh   | Provisioned by customer       |
|                         | Runtime cluster    | Managed by Codefresh       | Managed by customer       |
|                         | Number per account | One Runtime                | Multiple Runtimes, one per cluster            |
|                         | External cluster   | Managed by customer        | Managed by customer         |
|                         | Upgrade            | Managed by Codefresh       | Managed by customer |
|                         | Uninstall          | Managed by customer        | Managed by customer |
| Argo CD                 |                    | Codefresh cluster          | Customer cluster  |
| CI Ops                  |Delivery Pipelines |Not supported               | Supported  |
|                         |Workflows           | Not supported              | Supported  |
|                         |Workflow Templates  | Not supported              | Supported  |
| CD  Ops                 |Applications        | Supported: see below for details                  | Supported: see below for details |
|                         |                    |Deployment supported only on managed clusters | Deployment supported on both in-cluster and managed clusters|
|                         |                     |Self-healing interval: 90 seconds<br>See [Argo CD automatic self-healing](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/#automatic-self-healing){:target="\_blank"}| Self-healing interval:  5 seconds (Argo CD default)<br>See [Argo CD automatic self-healing](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/#automatic-self-healing){:target="\_blank"}|
|                         |Image enrichment    | Supported                  | Supported  |
|                         | Rollouts           | Supported                  |  Supported  |
|Integrations             |                    | Supported                  | Supported  |
|Dashboards               |Home                | Hosted Runtime and deployments|Runtimes, deployments, Delivery Pipelines |
|                         |DORA metrics        | Supported                 |Supported        |
|                         |Applications        | Supported                 |Supported        |  




