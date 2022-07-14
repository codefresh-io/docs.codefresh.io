---
title: "Installation environments"
description: ""
group: runtime
toc: true
---

Codefresh supports two installation environments:

* **Hosted** environments, where the runtime is hosted in and managed by Codefresh.  
  Hosted enviroments are full-cloud environments, where all updates and improvements are managed by Codefresh, with zero-maintenance overhead for you as the customer.  

  For more information on how to set up the hosted environment, including provisioning hosted runtimes, see [Set up Hosted GitOps]({{site.baseurl}}/docs/incubation/hosted-runtime/).  

* **Hybrid** environments, where the runtime is installed in the customer's premises, and managed by the customer.  
  Hybrid environments are ideal for organizations that want their source code within their premises, or have other security constraints. Hybrid installations strike the perfect balance between security, flexibility, and ease of use. As the customer, you are responsible for installing and upgrading runtimes, while Codefresh continues to maintain most aspects of the platform.  
  For more information on hybrid environments, see [Hybrid runtime requirements]({{site.baseurl}}/docs/runtime/requirements/) and [Installling hybrid runtimes]({{site.baseurl}}/docs/runtime/installation/).  
  
### Hosted vs.hybrid environments

The table below highlights the main differences between hosted and hybrid environments.

{: .table .table-bordered .table-hover}
| Functionality           |Feature             |  Hosted                    | Hybrid |
| --------------          | --------------     |---------------             | --------------- |
| Runtime                 | Installation       | Provisioned by Codefresh   | Provisioned by customer       |
|                         | Runtime cluster    | Managed by Codefresh       | Managed by customer       |
|                         | Number per account | One runtime                | Multiple runtimes            |
|                         | External cluster   | Managed by customer        | Managed by customer         |
|                         | Upgrade            | Managed by Codefresh       | Managed by customer |
|                         | Uninstall          | Managed by customer        | Managed by customer |
| CI Ops                  | Delivery Pipelines |Not supported               | Supported  |
|                         |Workflows           | Not supported              | Supported  |
|                         |Workflow Templates  | Not supported              | Supported  |
| CD  Ops                 |Applications        | Supported                  | Supported |
|                         |Image enrichment    | Supported                  | Supported  |
|                         | Rollouts           | Supported                  |  Supported  |
|Integrations             |                    | Supported                  | Supported  |
|Dashboards               |Home Analytics      | Hosted runtime and deployments|Runtimes, deployments, Delivery Pipelines |
|                         |DORA metrics        | Supported                 |Supported        |
|                         |Applications        | Supported                 |Supported        |