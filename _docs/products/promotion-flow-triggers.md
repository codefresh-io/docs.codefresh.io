---
title: "Selecting Promotion Flows for products"
description: "Select Promotion Flows and configure triggers to orchestrate product promotions"
group: products
toc: true
---

## Promotion Flows for products
A Promotion Flow in Codefresh GitOps defines the steps, validations, and conditions required to promote a product and its applications from one environment to another.  

By selecting Promotion Flows for a product you can choose the most relevant flows for its deployment strategy.By configuring trigger conditions for each Flow, you can structure promotions for the product, tailored to its needs, improving deployment consistency and efficiency.

##### Benefits of Promotion Flows with triggers tailored for products

* **Multiple flows per product**  
  Select different Promotion Flows to orchestrate promotions for the product in accordance with the different deployment requirements.For example, you can select both Hotfix and Feature Testing flows to ensure urgent patches and new features follow separate promotion processes.  
  Promotion Flows are predefined by account administrators for the account. If the Flow you require is not available, contact your administrator.  

* **Custom trigger conditions per flow**  
  Define specific trigger conditions for each Promotion Flow to tailor automated promotion based on the product’s unique deployment requirements.  
  For example, configure the trigger to launch the Hotfix flow whenever a commit message contains the phrase `hotfix`.

 
* **Prioritization**  
  Arrange the Promotion Flows in a prioritized order to control the sequence in which they are evaluated and executed.


## Where to configure Promotion Flows and triggers
In **Product > Settings > Promotion Flows**.  
Select one or more Promotion Flows for the product, and then configure custom conditions to trigger each of the flows.  
See also [Product CRD](#promotion-crd).

##### Commit messages & Git revisions
You can monitor changes based on the commit message (`commitMessage`) or the Git revision (`gitRevision`).  
The commit message can include single words, multiple words, or phrases. For example, `hotfix` or `update image to v1.2`. There are no restrictions on commit messages. 



##### Matching operators for filtering commits
Operators define how commit messages or Git revisions are matched:
* `In`: Includes the specified value or any value from a set.
* `NotIn`: Excludes the specified value or any value from a set.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/settings/promotion-flow.png" 
	url="/images/gitops-products/settings/promotion-flow.png" 
	alt="Configure Promotion Flow and triggers in Product Settings" 
	caption="Configure Promotion Flow and triggers in Product Settings"
  max-width="50%" 
%}


For how to instructions on selecting Promotion Flows for products, see [Select Promotion Flows for products]({{site.baseurl}}/docs/products/configure-product-settings/#select-promotion-flows-for-products).


## Examples of trigger conditions for Promotion Flows

Trigger conditions allow you to determine when and how a Promotion Flow is triggered for the product.


### Hotfix Promotion Flow

The Hotfix flow is designed for urgent fixes that need to be deployed quickly, typically to address critical bugs.


{: .table .table-bordered .table-hover}
| **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `commitMessage`  |
| **Operator**          | `In`            |
| **Values**           | `hotfix` `patch`  |

The Hotfix flow triggers when the `commit message` contains either `hotfix` or `patch`, ensuring that only critical changes labeled trigger the flow.

### Commit message-based Promotion Flow

The Commit message based Promotion Flow  triggers the promotion when the message contains a specific phrase. 

{: .table .table-bordered .table-hover}
| **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `commitMessage`  |
| **Operator**         | `In`          |
| **Values**           | `bump Kubernetes version`   |

This type of trigger monitors the commit message and triggers the promotion when the message contains a specific phrase. This is useful when you follow commit conventions like `bump version`, `update dependency` for example.

### Feature branch Promotion Flow

The Feature branch flow is designed for promoting new features from development to testing/staging environments.

{: .table .table-bordered .table-hover}
| **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `gitRevision`  |
| **Operator**          | `In`          |
| **Values**           | `feature/*`   |


This Feature branch flow triggers when the commit message matches the phrase `Bump Kubernetes version`. Any commit message that includes Bump Kubernetes version (exact phrase match) will trigger the promotion.

### Multi-region Promotion Flow
The Multi-region flow is designed to first deploy to several regional environments for validation before final deployment to production.

{: .table .table-bordered .table-hover}
| **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `gitRevision`  |
| **Operator**          | `In`          |
| **Values**           | `staging-*`   |


The Multi-region flow triggers when the Git revision matches a regional branch, for example, `staging-west` or `staging-east`.  
After successful validation, the flow can proceed to deploy to production.


### Production-exclusion Promotion Flow
The Production-exclusion flow is designed to prevent promotion of specific changes, such as experimental features or work-in-progress branches, into the production environment.


{: .table .table-bordered .table-hover}
| **Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `commitMessage`  |
| **Operator**          | `NotIn`          |
| **Values**           | `wip` `do-not-deploy` `experimental`  |


The Production-exclusion flow triggers _only_ when the commit message does not contain terms like `wip`, `experimental`, or `do-not-deploy`, ensuring that unfinished or unstable features are excluded from being deployed to production. 

### Rollback Promotion Flow

The Rollback flow is designed to revert changes when issue are detected in production.


{: .table .table-bordered .table-hover}
|**Trigger condition** | **Setting** |
|----------------------|------------------|
| **Property**         | `commitMessage`  |
| **Operator**          | `In`          |
| **Values**           | `revert` `rollback`  |


The Rollback flow triggers when the commit message contains terms like `revert` or `rollback`, ensuring that the flow is triggered only for rollback operations.

<!---
##  Product YAML

Configure product settings in either Form or YAML modes.  

Once configured and committed, these settings are saved as the `promotion-flow` resource within the Shared Configuration Repository in the GitOps Runtime selected as the Configuration Runtime.  

The path in the Shared Configuration Repo is `<gitops-runtime>/<shared-configuration-repo>/resources/entities/promotion-flows/`.  
See [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/) and [Designating Configuration Runtimes]({{site.baseurl}}/docs/installation/gitops/configuration-runtime/).  

To configure directly in YAML, refer to our [Promotion Flow YAML]({{site.baseurl}}/docs/promotions/yaml/promotion-flow-crd/) for the syntax requirements and descriptions. 

-->

## Related articles
[Assigning applications to products]({{site.baseurl}}/docs/products/assign-applications/)   
[Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/promotion-version-properties/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)   




