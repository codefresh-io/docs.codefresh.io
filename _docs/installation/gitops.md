---
title: "GitOps Runtimes"
description: " Create and deploy Argo CD applications with GitOps Runtimes"
group: installation
redirect_from:
  - /docs/installation/gitops/
toc: true
---


Enterprises leveraging Argo CD for deployments often face the complexity of managing deployments at scale.  
Codefresh GitOps offers native support for Argo CD, while serving as an active maintainer of the open source community version.  
Our GitOps Runtime solves these issues with unique benefits.


<!--- GitOps Runtimes come in two options:
* Hosted Runtimes with Argo CD installed within the Codefresh cluster (see [Hosted GitOps](#hosted-gitops))
* Hybrid Runtimes with Argo CD installed within the customer's cluster (see [Hybrid GitOps](#hybrid-gitops)) -->

Explore the [benefits](#benefits-of-gitops-runtimes) of GitOps Runtimes, and [compare their features/functionality](#hosted-vshybrid-gitops).




## Benefits of GitOps Runtimes

* **Single pane of glass visibility**  
  All Argo CD instances in Codefresh are managed through a single control plane, which means full visibility for all Runtimes.
  Installed Runtimes are displayed in the GitOps Runtimes page with all the information you need on the Runtime, and actions to manage it.  

* **Effortless maintenance** 
  In the Runtimes page, the Version column notifies whenever a new version is available for the Runtime, providing a link to the complete changelog for full transparency when making decisions on upgrades.
  
* **Flexibile scalability**  
  Single control plane management eliminates the challenge of maintaining multiple Argo CD instances. You can install any number of Argo CD instances and the Runtime will handle the logistics.
  
  Scaling down on Argo CD instances is equally straightforward: by connecting additional remote clusters to an existing GitOps Runtime, you can reduce the number of Argo CD instances.

* **Faster security remediations**
  As an active maintainer of Argo CD, Codefresh ensures timely fixes for security vulnerabilities in our forked version, before rollout to the community version. 

* **Centralized administration**
  Administrative functionality for user, permission, and audit management is centralized and Argo CD agnostic.


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

  For more information on how to set up the hosted environment, including provisioning hosted runtimes, see [Set up Hosted GitOps]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).  -->

## Hybrid GitOps
The hybrid version of GitOps, has Argo CD installed in the customer's cluster.    
Hybrid GitOps is installed in the customer's cluster, and managed by the customer.  

The Hybrid GitOps Runtime is optimal for organizations with security constraints, wanting to manage CI/CD operations within their premises. Hybrid GitOps strikes the perfect balance between security, flexibility, and ease of use. Codefresh maintains and manages most aspects of the platform, apart from installing and upgrading Hybrid GitOps Runtimes which are managed by the customer.  

Hybrid GitOps Runtime installation includes a forked version of the Argo Project with its components: Argo CD, Argo Rollouts, Argo Workflows and Argo Events.




 
{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="70%"
%}

  For more information on Hybrid GitOps Runtimes, see [Hybrid GitOps Runtime requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#minimum-system-requirements) and [Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).  



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


## Related articles
[Codefresh Runner for pipelines]({{site.baseurl}}/docs/installation/runner/)  
[Codefresh pricing](https://codefresh.io/pricing/){:target="\_blank"}  
[Codefresh features](https://codefresh.io/features/){:target="\_blank"}  



