






The table describes the entities involved in the promotion process, starting with the core entities, followed by the dedicated promotion-specific entities

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
        <li><strong>Target environments</strong>: The environments to which changes are promoted from the trigger environment.</li>
      </ul>
    </td>
    <td>Users with ABAC permissions</td>
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td><strong>Product (Optional)</strong></td>
    <td>By grouping related applications, products simplify promotions by allowing you to promote the entire product and all its applications across different environments.</td>
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
    <td colspan="4"><strong>Promotion entities </strong><br><em>These dedicated entities are the building blocks of promotions, defining how promotions are orchestrated, what gets promoted, and under what conditions.</em></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Flows</strong></td>
    <td>Promotion Flows orchestrate the movement of applications in products through environments, ensuring a controlled and automated promotion process.</td>
    <td>Account administrators</td>
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Settings</strong></td>
    <td>Promotion Settings specify what gets promoted across environments. If using a product, these settings can be defined within the product’s configuration or in a YAML CRD.</td>
    <td>Users with ABAC permissions</td>
    <td><a href="#">Link</a></td>
  </tr>
  
  <tr>
    <td><strong>Promotion Policy</strong></td>
    <td>Promotion Policies outline the actions taken when changes are promoted for products or by environments. The Promotion Policy ensures that the target environment is ready for promotion, with workflows to validate the environment both before and after the promotion action, like commits or pull requests.</td>
    <td>Account administrators</td>
    <td><a href="#">Link</a></td>
  </tr>
</table>

## Promotion entites and GitOps Runtimes

All promotion entities are stored as CRDs in the Shared Configuration Repository of the GitOps Runtime designated as the Configuration Runtime. If you have more than one Configuration Runtime, Codefresh automatically consolidates the settings into a single set of promotion CRDs.

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

## Create a promotion sequence 
The guide provides the steps required to create a promotion sequence. Follow the steps in the order in which they are listed. Each step is followed by a brief description of its purpose and objective in the promotion sequence. For detailed information, click the step title.


### Prerequisites
1. Configuration Runtime 
   At least one GitOps Runtime must be designated as the Cofiguration Runtime to store the settings of the different promotion entities.  
   If no GitOps Runtime has been designated as such, Codefresh assigns one of the existing Runtimes.
 
1. Admin permissions  
  Only account admins can create promotion entities such as Promotion Policies and Promotion Flows.

1. User permissions
  Users need the required ABAC permissions to create Promotion Workflows and configure product settings.

### How to
1. Create environments
  Environments define the starting and the end points of promotions.  
  For a promotion sequence, you need at least two environments: the trigger environment, which is the source of the changes to promote, and the target environment, to which the changes need to be promoted. 
  
1. Create applications
  Applications represent the components or services to promote and deploy. They are the smallest unit of deployment within a promotion sequence. 
  Create a Argo CD application in Form or YAML mode. 

1. Create products
  Products connect related applications and group them as a single entity. Being able to apply promotion settings at the level of the product, across multiple applications simplifies promotion flows and management.  

  Create a product and connect related applications to it, either manually or declaratively. 


1. Create workflows
  Promotion Workflows consist of steps to validate and verify readiness of target environments in the promotion sequence.
  Create Promotion Workflows tailored to different environments, and integrate them into Promotion Policies to enforce checks before and after promotions.

1. Configure properties to be promoted
  Promotion Templates define which files and attributes within those files to promote across the applications in the product.  
  Instead of doing a manual diff and deciding which changes to promote, or promoting entire applications, configure the precise changes to promote, ensuring consistency and reducing errors.

1. Create validations for environments
  Promotion Policies define the rules that validate the target environments before and after changes are promoted, along with the action that promotes the changes. These Policies ensure that promotions do not break or destabilize environments.  
  Create a Promotion Policy by product or type of environment, specifying the promotion action (mandatory), and any Promotion Workflows to run before and after the promotion action (optional).

1. Create flows for promotions
  Promotion Flows orchestrate the sequence of actions that move changes through the deifned environments.  
  Create a Promotion Flow to integrate environments, products and applications, promotion workflows, and policies, ensuring that changes are promoted in a controlled and predictable manner.
  

1. Configure promotion settings for product
  After setting up the core entities and building blocks, configure settings for your product.  
  These settings can include the attributes to be promoted across the product's applications (Promotion Templates), the promotion flows valid for the product and flow-specific trigger conditions (Promotion Flows).

1. Trigger promotion flow  
  Implement the changes to initiate the promotion sequence.  
  The change, made to an application in the trigger environment, starts the process of moving changes from the trigger environment through the defined sequence of environments, following the defined Promotion Policies and Settings.  
  
  If the flow is not triggered automatically through the trigger conditions, or trigger a Flow manually by clicking the Trigger button, or by dragging and dropping a single application with the changes to a different environment.


1. Track deployment for product
  Monitor the deployment progress for the product as it moves through the promotion sequence.  
  Use the Releases feature to track and ensure successful deployments across environments.








## Promotion process
What happens when a promotion flow is triggerred automatically?
Manually through drag-n-drop



