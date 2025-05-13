---
title: "About GitOps Runtimes"
description: "Install Hybrid GitOps Runtimes on K8s clusters"
toc: true
---


## About GitOps Runtimes
Managing applications at scale requires efficient tools and practices. Codefresh's GitOps Runtime is a hybrid solution powered by Argo CD and Argo Rollouts, designed to streamline GitOps operations and simplify application management across environments.

##### What is a GitOps Runtime?
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

##### Why use a GitOps Runtimes?  
Scaling GitOps across multiple clusters and environments can be complex, especially when managing multiple Argo CD instances.  
Codefresh GitOps Runtimes simplify this by providing:  
* **Unified visibility**: Manage all GitOps operations from a single control plane.  
* **Centralized administration**: Streamline user access and security policies across all environments.  
* **Simplified scalability**: Easily add or remove Argo CD instances while maintaining consistency across clusters.  
* **Effortless updates and security patches**: Get real-time update notifications and early access to security fixes.  

## Installation modes for GitOps Runtimes
Codefresh gives you flexible options to install GitOps Runtimes. If you have an existing Argo CD instance, the Runtime can integrate with it seamlessly. If not, you can install a new Argo CD instance managed by Codefresh. Choose the option that best fits your infrastructure. See [Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).  

##### Installation with existing Argo CD instance
Already using Argo CD? Easily integrate it with Codefresh GitOps while keeping your current setup unchanged.  

* Works with your existing Argo CD configuration  
* Adds visibility, deployment tracking, and deeper integration with Codefresh environments, products, and promotions 
* Supports different authentication mechanisms and security settings  
See [Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).

##### Installation with new Argo CD instance
No Argo CD yet?  Deploy a new, fully managed instance of Argo CD with the GitOps Runtime.  
* Ideal for clean setups 
* Codefresh manages Argo CD’s lifecycle, including upgrades and maintenance

See [Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-new-argo-cd/).

You can install one GitOps Runtime per cluster. To add more, each Runtime must be on a separate cluster and have a unique name.  

<iframe width="560" height="315" src="https://www.youtube.com/embed/vtCoi3-Rt6w?si=EqlKsiRtdIGcZLaX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


{% if page.collection != site.gitops_collection %}

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


{% endif %}

