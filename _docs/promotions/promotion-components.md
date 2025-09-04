---
title: "Promotion building blocks"
description: "Explore entities and their roles in the promotion process"
group: promotions
toc: true
---

>**Promotions is currently in development**  
This feature is still under active development and we've identified some issues with its resilience and reliability, particularly with recovery from cluster and network problems. We are currently upgrading our architecture to resolve these known issues and add self-healing capabilities.
We don't recommend using Promotions for mission-critical or production deployments at this time.

## Promotion components
If you are new to promotions in GitOps, understanding the key entities involved in the promotion process helps clarify their roles.

Codefresh GitOps promotions rely on:
* **Core entities** that define your deployment lifecycle structure
* **Promotion-specific entities** that enhance control and automation for advanced flows

For an end-to-end guide on continuous delivery with Codefresh GitOps, see [Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/). 

## Promotion building blocks and roles

A promotion comprises several entities, some optional and some required, that define its behavior.

The table below summarizes the core entities and promotion-specific entities, outlining their roles in the promotion process.
For details on current limitations when working with promotions, see [Promotion limitations]({{site.baseurl}}/docs/promotions/promotion-limitations/).

### Core entities for promotions
These entities define the structure of your deployment.<br>They support standard promotion flows, enabling typical deployment scenarios such as promotions between two environments. See our [quick starts on promotions]({{site.baseurl}}/docs/gitops-quick-start/gitops-quick-start/#promoting-applications).

{::nomarkdown}
<table border="1" width="100%">
  <tr style="background-color: #3f7d84; color: white;">
    <th width="20%">Entity</th>
    <th width="50%">Role in promotions</th>
    <th width="10%">Created by</th>
    <th width="20%">Learn more</th>
  </tr>
  <tr>
    <td><strong>Applications (Required)</strong></td>
    <td>The core units of promotions. Each Argo CD application can be promoted individually or as part of a product.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/deployments/gitops/create-application/">Creating applications</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/applications.png" style="max-width: 100%; height: 30%;">
  </tr>  
  <tr>
    <td><strong>Product (Required)</strong></td>
    <td>Groups related applications into a single entitysimplifying promotions by allowing batch promotion instead of promoting each application manually.</td>
    <td>Users</td>
    <td><a href="https://codefresh.io/docs/docs/products/about-products/">Products</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/products.png" style="max-width: 100%; height: 30%;">
  </tr>
  <tr>
    <td><strong>Environments (Required)</strong></td>
    <td>Define where your applications live and promotions occur. Typically, environments mirror your software lifecycle.<br>
      You need at least two environments:
      <ul>
        <li><strong>Trigger environment</strong>: Where a change starts the promotion, initiated by a manual commit or pull request.</li>
        <li><strong>Target environments</strong>: Where changes are promoted after the trigger environment.</li>
      </ul>
    </td>
    <td>Users</td>
    <td><a href="https://codefresh.io/docs/docs/environments/environments-overview/">Environments</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/environments.png" style="max-width: 100%; height: 30%;">
  </tr>
</table>
{:/}

### Promotion-specific entities
These entities provide additional control and automation, enabling advanced multi-environment promotion flows with precise definitions. They allow teams to define what gets promoted, when, and under what conditions.

{::nomarkdown}
<table border="1" width="100%">
  <tr style="background-color: #3f7d84; color: white;">
    <th width="20%">Entity</th>
    <th width="50%">Role in promotions</th>
    <th width="10%">Created by</th>
    <th width="20%">Learn more</th>
  </tr>
  <tr>
    <td><strong>Promotion Flows</strong></td>
    <td>Automate and orchestrate the movement of applications through environments within the same product.</td>
    <td>Account administrators</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/promotion-flow/">Creating Promotion Flows</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="3"><img src="../../../images/gitops-promotions/components/promotion-flow.png" style="max-width: 100%; height: 30%;">
  </tr>
  <tr>
    <td><strong>Promotion Settings</strong></td>
    <td>Define what gets promoted across environments. Settings can be inline, exclusive to a product, or reusable across multiple products as  as a promotion template.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/products/configure-product-settings/">Promotion settings for products</a></td>
  </tr>
  <tr>
    <td><strong>Promotion Workflow</strong></td>
    <td>An Argo Workflow which runs tests and validations during promotion for each application within an environment. Promotion Workflows can include smoke tests, rollback mechanisms, database validation checks, performance checks, and more.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/promotion-workflow/">Promotion Workflows</a></td>
  </tr>
  <tr>
    <td><strong>Promotion hooks</strong></td>
    <td>Promotion hooks are configured in Promotion Workflows to run at the start or end of a product release, or at the start or end of promotions in environments. Promotion hooks can include notifications and actions such as sending Slack messages or custom issue-tracking information based on the status of the promotion for release or environment.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/promotion-hooks/">Promotion Workflows</a></td>
  </tr>
  <tr>
    <td><strong>Promotion Policy</strong></td>
    <td>Defines promotion behavior for environments by combining Promotion Workflows (tests and validations), with the promotion action such as commits or pull requests.</td>
    <td>Account administrators</td>
    <td><a href="https://codefresh.io/docs/docs/promotions/promotion-policy/">Promotion Policies</a></td>
  </tr>
  <tr>
    <td></td>
    <td colspan="4"><img src="../../../images/gitops-promotions/components/promotion-policy.png" style="max-width: 100%; height: auto;"">
  </tr>
</table>

{:/}



## Promotion entities and GitOps Runtimes

Most promotion-related entities are stored as Custom Resource Definitions (CRDs) in the Shared Configuration Repository of the GitOps Runtime designated as the [Configuration Runtime]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/). 
If you have multiple Configuration Runtimes, Codefresh consolidates the settings into a single set of promotion manifests.

>**NOTE**  
The documentation uses Shared Configuration Repository or Shared Config Repo for clarity.  
Code samples and internal references use `isc`.


{: .table .table-bordered .table-hover}
| Entity             | Location              | Token
| --------------    | --------------           |---------|
| Environments           |N/A | None  |
| Product                |`isc/resources/configuration/products` | Git user token |
| Applications           |Git Source associated with Runtime | Git user token |
| Promotion Flow         |`isc/resources/configuration/promotion-flows`| Git user token |
| Promotion Policy       |`isc/resources/configuration/promotion-policies`| Git user token |
| Promotion Workflows    |`isc/resources/control-planes/promotion-workflows` |Git user token |
| Promotion Template     |`isc/resources/configuration/promotion-templates`| N/A |



## Related articles
[About promotions]({{site.baseurl}}/docs/promotions/promotions-overview/)  
[Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Triggering promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  



