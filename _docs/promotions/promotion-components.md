---
title: "Promotion building blocks"
description: "Explore entities and their roles in the promotion process"
group: promotions
toc: true
---

If you are new to promotions in GitOps, you may find it useful to review the entities involved in the promotion process, and their roles.  
There are the core entities that define the structure of your development deployment lifecyles, and promotion-specific entities, which are advanced entities each dedicated to a different aspect of the promotion process. 

For a complete end-to-end continuous delivery with Codefresh GitOps promotions, see [Promotions: End-to-end guide]({{site.baseurl}}/docs/promotions/create-promotion-sequence/). 

## Building blocks

A promotion sequence comprises several building blocks, optional and required, each serving a specific role in the promotion and deployment process.
The table describes the core and promotion-specific entities.



{::nomarkdown}
<table border="1" width="100%">
  <tr style="background-color: #3f7d84; color: white;">
    <th width="20%">Entity</th>
    <th width="50%">Role in promotions</th>
    <th width="10%">Created by</th>
    <th width="20%">Learn more</th>
  </tr>

  <tr>
    <td colspan="4"><strong>Core entities</strong><br>These entities define the structure of your deployment.<br>Core entities support standard promotion flows, allowing you to trigger promotions that cover typical deployment scenarios. You can initiate manual promotions between two environments using drag-and-drop and other options. See <a href="https://codefresh.io/docs/docs/promotions/promotion-scenarios/">Promotion tutorials</a>.</td>
  </tr>
      <td><strong>Applications (Required)</strong></td>
    <td>Applications are the core units around which promotions revolve. Each Argo CD application  can be promoted individually or as part of a product.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/deployments/gitops/create-application/">Creating applications</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/applications.png" style="max-width: 100%; height: 30%;">
  </tr>  
  <tr>
    <td><strong>Product (Required)</strong></td>
    <td>A Product in Codefresh GitOps groups related applications into a single entity. This simplifies promotions by allowing you to promote applications within the product across different environments, rather than promotion each application manually.</td>
    <td>Users</td>
    <td><a href="https://codefresh.io/docs/docs/products/about-products/">Products</a></td>
  </tr>
    <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/products.png" style="max-width: 100%; height: 30%;">
  </tr>
  <tr>
    <td><strong>Environments (Required)</strong></td>
    <td>Environments are where your applications live and promotions happen. Typically, environments reflect your software lifecycle and deployment stages.<br>
      You need at least two environments:
      <ul>
        <li><strong>Trigger environment</strong>: Where a change starts the promotion flow, initiated by a manual commit or pull request.</li>
        <li><strong>Target environments</strong>: The environments where changes are promoted after the trigger environment.</li>
      </ul>
    </td>
    <td>Users</td>
    <td><a href="https://codefresh.io/docs/docs/dashboards/gitops-environments/">Environments</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/environments.png" style="max-width: 100%; height: 30%;">
  </tr>
  
  <tr>
    <td colspan="4"><strong>Promotion building blocks</strong><br>These entities are purpose-built for promotions and support advanced scenarios by enabling complex, multi-environment promotion flows with precise definitions and control. Promotion building blocks allow you to orchestrate multi-environment promotion processes, define exactly what gets promoted, and set specific conditions for each promotion. For example, you can quickly set up automated promotion flows, integrate tests and policies, and enforce governance over each promotion stage, giving you total control over how promotions are executed across your environments.</td>
  </tr>
  
  <tr>
    <td><strong>Promotion Flows</strong></td>
    <td>Promotion flows orchestrate the movement of applications through environments, ensuring a controlled and automated promotion process for applications within the same product.</td>
    <td>Account administrators</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/promotion-flow/">Creating Promotion Flows</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/promotion-flow.png" style="max-width: 100%; height: 30%;">
  </tr>
  <tr>
    <td><strong>Promotion Settings</strong></td>
    <td>Promotion settings specify what gets promoted across environments. With products, these settings can be defined within the product’s configuration, either inline exclusive to the product, or as a reusable promotion template.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/products/configure-product-settings/">Promotion settings for products</a></td>
  </tr>
    <tr>
    <td><strong>Promotion Workflows</strong></td>
    <td>A Promotion Workflow is an Argo Workflow which runs tests and validations that match the requirements of the promotion lifecycle. They can run smoke tests, rollback mechanisms, database validation checks, or performance tests.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/configuration/promotion-workflow/">Promotion Workflows</a></td>
  </tr>
  <tr>
    <td><strong>Promotion Policy</strong></td>
    <td>A Promotion Policy outlines the actions taken when changes are promoted. It combines workflows that test and validate the environment, with the promotion action, like commits or pull requests.</td>
    <td>Account administrators</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/configuration/promotion-policy/">Promotion Policies</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="4"><img src="../../../images/gitops-promotions/components/promotion-policy.png" style="max-width: 100%; height: auto;"">
  </tr>
</table>

{:/}



## Promotion entities and GitOps Runtimes

Most of the core and promotion-specific entities are stored as Custom Resource Definitions (CRDs) in the Shared Configuration Repository of the GitOps Runtime designated as the [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#designating-configuration-runtimes). 
If you have more than one Configuration Runtime, Codefresh automatically consolidates the settings into a single set of promotion manifests.

>**NOTE**  
In the documentation, we use Shared Configuration Repository or Shared Config Repo for clarity.  
In code samples and internal references, it is represented as `isc`.


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
[Promotions: End-to-end guide]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Triggering promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  



