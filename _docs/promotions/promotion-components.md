






The table describes the entities involved in the promotion process, starting with the core entities and those entities wh

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
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td><strong>Product (Optional)</strong></td>
    <td>A Product in GitOps groups related applications into a single entity. This simplifies promotions by allowing you to promote the entire Product and all its applications across different environments, rather than managing applications individually.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td><strong>Applications</strong></td>
    <td>Applications are the core units around which promotions revolve. Each application can be promoted individually or as part of a product.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td colspan="4"><strong>Promotion Building Blocks</strong><br><em>These entities define how promotions are orchestrated, what gets promoted, and under what conditions.</em></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Flows</strong></td>
    <td>Promotion flows orchestrate the movement of applications through environments, ensuring a controlled and automated promotion process.</td>
    <td>Account administrators</td>
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Settings</strong></td>
    <td>Promotion settings specify what gets promoted across environments. If using a Product, these settings can be defined within the Product’s configuration or in a YAML CRD.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Policy</strong></td>
    <td>A Promotion Policy outlines the actions taken when changes are promoted. It ensures that the target environment is ready for promotion, with workflows to validate the environment both before and after the promotion action, like commits or pull requests.</td>
    <td>Account administrators</td>
    <td><a href="#">Link</a></td>
  </tr>
</table>

## Promotion entites and GitOps Runtimes

All promotion entities are stored as part of GitOps Runtimes in the Shared Configuration Repository. Depending on wheyjr are required across all runtimes and clusters or specific runtimes and clusters.

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

## Promotion entities & creation modes

UI form YAML

## Promotion sequence guide 
prereq
GitOps runtime as configuration runtime
Admin permissios

1. Create environments

1. Create product


1. Create applications

1. Create promotion workflows

1. Create promotion templates

1. Create promotion policy

1. Create promotion flow

1. Configure settings for product

1. Trigger promotion flow

1. Track deployment for product

## Promotion process
What happens when a promotion flow is triggerred automatically?
Manually through drag-n-drop



