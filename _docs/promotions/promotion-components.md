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
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/">Environments</a></td>
  </tr>
  
  <tr>
    <td><strong>Product (Optional)</strong></td>
    <td>A Product in Codefresh GitOps groups related applications into a single entity. This simplifies promotions by allowing you to promote the entire Product and all its applications across different environments, rather than managing applications individually.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/products/about-products/">Products</a></td>
  </tr>
  
  <tr>
    <td><strong>Applications</strong></td>
    <td>Applications are the core units around which promotions revolve. Each application can be promoted individually or as part of a product.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/deployments/gitops/create-application/">Creating applications</a></td>
  </tr>
  
  <tr>
    <td colspan="4"><strong>Promotion Building Blocks</strong><br><em>These entities define how promotions are orchestrated, what gets promoted, and under what conditions.</em></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Flows</strong></td>
    <td>Promotion flows orchestrate the movement of applications through environments, ensuring a controlled and automated promotion process.</td>
    <td>Account administrators</td>
    <td><a href="https://codefresh.io/docs.docs/promotions/promotion-flow/">Creating Promotion Flows</a></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Settings</strong></td>
    <td>Promotion settings specify what gets promoted across environments. With products, these settings can be defined within the Product’s configuration or in a YAML CRD.</td>
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





## Promotion entites and GitOps Runtimes

All promotion entities are stored as manifests in the Shared Configuration Repository of the GitOps Runtime designated as the Configuration Runtime.  
If you have more than one Configuration Runtime, Codefresh automatically consolidates the settings into a single set of promotion manifests.

{: .table .table-bordered .table-hover}
| Entity             | Location              | Toekn
| --------------    | --------------           |
| Environments      |- | |
| Product           |user-isc/resources/configuration/products | |
| Applications      |Git Source associated with Runtime | |
| Promotion Workflows      |isc/resources/all-runtimes-all-clusters/promotion-workflows |should be covered by ABAC, and commit done via Runtime Token.reason for having to be stored in the ISC is that is needs to be in all clusters and run |
| Promotion Template      |isc/configuration/promotion-templates| |
| Promotion Policy      |isc/configuration/promotion-policies| |
| Promotion Flow      |isc/configuration/promotion-flows| |


## Related articles
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
[Promotion sequences]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Trigger promotions]({{site.baseurl}}docs/promotions/trigger-promotions/)



