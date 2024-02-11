---
title: "GitOps Runtimes"
description: " Create and deploy Argo CD applications with GitOps Runtimes"
group: installation
redirect_from:
  - /docs/installation/gitops/
toc: true
---




GitOps Runtimes are available also supports SaaS and hybrid installation options: 


## Hosted GitOps
The SaaS version of GitOps, Hosted GitOps has Argo CD installed in the Codefresh cluster.
Hosted GitOps Runtime is installed and provisioned in a Codefresh cluster, and managed by Codefresh.  
Hosted environments are full-cloud environments, where all updates and improvements are managed by Codefresh, with zero-maintenance overhead for you as the customer.  
Currently, you can add one Hosted GitOps Runtime per account.
For the architecture, see [Hosted GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/).

  
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

 
{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="70%"
%}

  For more information on Hybrid GitOps, see [Hybrid GitOps Runtime requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#minimum-system-requirements) and  [Hybrid GitOps Runtime Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).  


## Hosted vs.Hybrid GitOps

The table below highlights the main differences between Hosted and Hybrid GitOps.

{: .table .table-bordered .table-hover}
| GitOps Functionality           |Feature             |  Hosted                    | Hybrid |
| --------------          | --------------     |---------------             | --------------- |
| Runtime                 | Installation       | Provisioned by Codefresh   | Provisioned by customer       |
|                         | Runtime cluster    | Managed by Codefresh       | Managed by customer       |
|                         | Number per account | One runtime                | Multiple runtimes, one per cluster            |
|                         | External cluster   | Managed by customer        | Managed by customer         |
|                         | Upgrade            | Managed by Codefresh       | Managed by customer |
|                         | Uninstall          | Managed by customer        | Managed by customer |
| Argo CD                 |                    | Codefresh cluster          | Customer cluster  |
| CI Ops                  | Delivery Pipelines |Not supported               | Supported  |
|                         |Workflows           | Not supported              | Supported  |
|                         |Workflow Templates  | Not supported              | Supported  |
| CD  Ops                 |Applications        | Supported                  | Supported |
|                         |Image enrichment    | Supported                  | Supported  |
|                         | Rollouts           | Supported                  |  Supported  |
|Integrations             |                    | Supported                  | Supported  |
|Dashboards               |Home                | Hosted runtime and deployments|Runtimes, deployments, Delivery Pipelines |
|                         |DORA metrics        | Supported                 |Supported        |
|                         |Applications        | Supported                 |Supported        |


## Related articles
[Codefresh Runner for pipelines]({{site.baseurl}}/docs/installation/runner/)  
[Codefresh pricing](https://codefresh.io/pricing/){:target="\_blank"}  
[Codefresh features](https://codefresh.io/features/){:target="\_blank"}  



