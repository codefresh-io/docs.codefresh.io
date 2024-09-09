



Promotion flows are not tied to any specific product or technology stack, making them versatile tools for managing deployments across various platforms. They can be applied to:
Consistency: Automates repetitive tasks, ensuring uniformity across deployments.
Efficiency: Reduces manual effort and accelerates the deployment process.
Control: Allows precise control over the conditions under which changes are promoted.
Visibility: Provides clear insights into the progress and status of changes across environments.
Contribution to Deployments
Promotion flows streamline the process of moving code changes through different stages, such as testing, staging, and production. By defining specific criteria for promotion, they help maintain the integrity of the software and reduce the likelihood of introducing bugs into production.

## Flow Builder vs. YAML
You can create Promotion Workflows through the Flow Builder, a graphical interface, or through a YAML Custom Resource Definition (CRD). You can switch seamlessly between both when creating Promotion Flows.


## Sequential vs. parallel promotions

Promotion Flows can be designed to run sequentially or in parallel to suit the unique requirements of any deployment process.

Sequential flows
Sequential flows are linear, where changes are promoted from the previous to the next environment in the order in which they are defined.
This is the more common and traditional kind of Promotion Flow where you start the flow from the development environment as the trigger environment, and then promote to the testing, staging, and finally to the production environments.

Parallel flows
In a parallel flow, changes are promoted across multiple environments simultaneously. This promotion logic groups environments to create promotions after multiple environments are healthy. 




## Promotion building blocks

A promotion sequence comprises several building blocks, optional and required, each serving a specific role in the promotion and deployment process.
Before creating promotion flows or sequences it is advisable to understand the role of these building blocks.


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
    <td>A Product in Codefresh GitOps groups related applications into a single entity. This simplifies promotions by allowing you to promote the entire Product and all its applications across different environments, rather than managing applications individually.</td>
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




Inter-environment dependencies
  In both sequential and parallel flows, adding a new environment automatically establishes a dependency on the previous environment. This ensures that changes are promoted in a controlled manner.

  For parallel flows, you can add multiple environments as simultaneous dependencies on new environments. This means that the changes from the previous environment are first promoted concurrently to each of the dependent environments, and only when successfully deployed across all environments are they promoted to the next environment in the flow.







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

## Promotion entities & creation modes

UI form YAML










## Promotion process
What happens when a promotion flow is triggerred automatically?
Manually through drag-n-drop



