---
title: "Configuring promotion flows and triggers"
description: "Configure flows and triggers to orchestrate product promotions through Promotion Flows"
group: products
toc: true
---


Through Promotion Flows for Products, you can automate and control the promotion of applications from one environment to another. Promotion Flows define the steps and criteria for moving applications through different stages of deployment. 

You can select multiple Promotion Flows for a product, and customize the conditions for triggering each of the selected flows to automate and control how applications are promoted.


##### Benefits of configuring Promotion Flows


* Multiple flows
  Configure multiple Promotion Flows to orchestrate promotions for the product in accordance with the deployment requirements.
  Promotion Flows are predefined by account administrators for the account. If the Flow you require is not available, contact your administrator.  


* Custom trigger conditions
  Define specific trigger conditions for each Promotion Flow to tailor automated promotion based on the product’s unique deployment requirements.  
  For example, configure the trigger to launch the hotfix flow whenever a commit message contains the phrase `hotfix`.
 

* Prioritization
  Order the Promotion Flows in the list to define the priority you need.

For how to instructions on configuring Promotion Flows, see [Configure Promotion Flows]({{site.baseurl}}docs/products/manage-products/configure-product-settings/#configure-promotion-flows).


##  Promotion Flow CRD

As with other GitOps entities, you can configure Promotion Flows in either Form or YAML modes. Once configured and committed, these settings are saved as a CRD (Custom Resource Definition) entitled Promotion Flow within the GitOps Runtime selected as the Configuration Runtime. This allows for a declarative and consistent approach to defining orchestration criteria across environments.

If you are more comfortable configuring directly in YAML, refer to our ???? Promotion Flow CRD for the syntax requirements and descriptions.
The table blow describes the settings you can configure 

## Examples of trigger conditions for Promotion Flows

Trigger conditions allow you to determine when and how to trigger the Promotion Flows for the product.

Let's review a few flows and the trigger conditions you would configure for these.


### Hotfix Promotion Flow

The Hotfix flow is designed for urgent fixes that need to be deployed quickly, typically to address critical bugs.



 **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `commitMessage`  |
| **Operator**          | `In`            |
| **Values**           | `hotfix` `patch`  |

The Hotfix flow is triggered when the `commit message` contains either `hotfix` or `patch`. This ensures that only critical changes labeled as hotfixes or patches trigger the flow.


### Feature branch Promotion Flow

The Feature branch flow is designed for promoting new features from development to testing/staging environments.



 **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `gitRevision`  |
| **Operator**          | `In`          |
| **Values**           | `feature/*`   |

The Feature branch flow is triggered when the Git revision matches a feature branch pattern (`feature/*`). This ensures that only feature branches are promoted to the testing environment. 

### Multi-region Promotion Flow
The Multi-region flow is designed to first deploy to multiple regions, servinv as staging environments for example, for validation before the final deployment to production.


 **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `gitRevision`  |
| **Operator**          | `In`          |
| **Values**           | `staging-*`   |


The Multi-region flow is triggered when the Git revision matches a staging branch pattern, for example, `staging-west`, `staging-east`.  
After successfully deploying in these regions, the flow can then proceed to deploy in the production environment.


### Production-exclusion Promotion Flow
The Production-exclusion flow is designed to ensure that certain changes, such as experimental features or work-in-progress branches, are not deployed to the production environment.



 **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `commitMessage`  |
| **Operator**          | `NotIn`          |
| **Values**           | `wip` `do-not-deploy` `experimental`  |


The Production-exclusion flow is triggered _only_ when the commit message does not contain `wip`, `experimental`, or `do-not-deploy`. This ensures that changes labeled with these terms are excluded from being promoted to production, preventing unfinished or unstable features from being deployed. 

### Rollback Promotion Flow

The Rollback flow is designed to rollback changes when an issue is detected in production.



 **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `commitMessage`  |
| **Operator**          | `In`          |
| **Values**           | `revert` `rollback`  |


The Rollback flow is triggered when the commit message contains `revert` or `rollback`, ensuring that the flow is only triggered for rollback operations.




## Related articles
[Assigning applications to products]({{site.baseurl}}/docs/products/manage-products/assign-applications/)   
[Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/manage-products/promotion-version-properties/)  
[Tracking deployments for products]({{site.baseurl}}/docs/products/product-releases/)  
[Creating products]({{site.baseurl}}/docs/products/create-product/)   




