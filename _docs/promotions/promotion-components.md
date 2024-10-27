---
title: "Promotion building blocks"
description: "Explore entities and their roles in the promotion process"
group: promotions
toc: true
---

If you are new to promotions in GitOps, you may find it useful to review the entities involved in the promotion process, and their roles.  
There are the core entities that define the structure of your development deployment lifecyles, and promotion-specific entities, each dedicated to a different aspect of the promotion process.  

## Promotion building blocks

A promotion sequence comprises several building blocks, optional and required, each serving a specific role in the promotion and deployment process.
The table describes the core and promotion-specific entities.

<table border="1" width="100%">
  <tr>
    <th width="20%">Entity</th>
    <th width="50%">Role in promotions</th>
    <th width="10%">Created by</th>
    <th width="20%">Learn more</th>
  </tr>
  
  <tr>
    <td colspan="4"><strong>Core entities</strong><br><em>These entities define the structure of your deployment.</em></td>
  </tr>
  
  <tr>
    <td><strong>Environments (Required)</strong></td>
    <td>Environments are where your applications live and promotions happen. Typically, environments reflect your software lifecycle and deployment stages. You need at least two environments:
      <ul>
        <li><strong>Trigger environment</strong>: Where a change starts the promotion flow, initiated by a manual commit or pull request.</li>
        <li><strong>Target environments</strong>: The environments where changes are promoted after the trigger environment.</li>
      </ul>
    </td>
    <td>Users</td>
    <td><a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/">Environments</a></td>
  </tr>
  
  <tr>
    <td><strong>Product (Required)</strong></td>
    <td>A Product in Codefresh GitOps groups related applications into a single entity. This simplifies promotions by allowing you to promote applications within the product across different environments, rather than promotion each application manually.</td>
    <td>Users</td>
    <td><a href="https://codefresh.io/docs/docs/products/about-products/">Products</a></td>
  </tr>
  
  <tr>
    <td><strong>Applications</strong></td>
    <td>Applications are the core units around which promotions revolve. Each Argo CD application  can be promoted individually or as part of a product.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/deployments/gitops/create-application/">Creating applications</a></td>
  </tr>
  
  <tr>
    <td colspan="4"><strong>Promotion Building Blocks</strong><br><em>These entities are specific to promotions and define promotions are orchestrated, what gets promoted, and under what conditions.</em></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Flows</strong></td>
    <td>Promotion flows orchestrate the movement of applications through environments, ensuring a controlled and automated promotion process for applications within the same product.</td>
    <td>Account administrators</td>
    <td><a href="https://codefresh.io/docs.docs/promotions/promotion-flow/">Creating Promotion Flows</a></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Settings</strong></td>
    <td>Promotion settings specify what gets promoted across environments. With products, these settings can be defined within the product’s configuration, either inline exclusive to the product, or a reusable promotion template.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/products/configure-product-settings/">Promotion settings for products</a></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Policy</strong></td>
    <td>A Promotion Policy outlines the actions taken when changes are promoted. It ensures that the target environment is ready for promotion, with workflows to validate the environment both before and after the promotion action, like commits or pull requests.</td>
    <td>Account administrators</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/promotion-policy/">Promotion Policies</a></td>
  </tr>
</table>





## Promotion entities and GitOps Runtimes

Most of the core and promotion-specific entities are stored as Custom Resource Definitions (CRDs) in the Shared Configuration Repository of the GitOps Runtime designated as the [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes). 
If you have more than one Configuration Runtime, Codefresh automatically consolidates the settings into a single set of promotion manifests.

{: .table .table-bordered .table-hover}
| Entity             | Location              | Token
| --------------    | --------------           |---------|
| Environments           |N/A | None  |
| Product                |`isc/resources/configuration/products` | Git user token |
| Applications           |Git Source associated with Runtime | Git user token |
| Promotion Flow         |`isc/configuration/promotion-flows`| Git user token |
| Promotion Policy       |`isc/configuration/promotion-policies`| Git user token |
| Promotion Workflows    |`isc/resources/all-runtimes-all-clusters/promotion-workflows` |Git user token |
| Promotion Template     |`isc/configuration/promotion-templates`| N/A |



## Related articles
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
[Promotion sequences]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product promotions]({{site.baseurl}}/docs/promotions/product-releases/)  



