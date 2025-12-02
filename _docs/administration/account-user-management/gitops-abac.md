---
title: "Access control for GitOps"
description: "Restrict access to GitOps entities through ABAC"
toc: true
---

Control access to entities in GitOps through ABAC (Attribute-Based Access Control). ABAC allows fine-grained access to application entities through the use of rules.  
Define ABAC for applications, products, and promotion entities, in the Codefresh UI or programmatically via Terraform.<br>
For more information on ABAC, see [ABAC on Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control){:target="\_blank"}. 


Rules define the *who*, *what*, and *where* to control access through the following elements:
* **Entities**  
  The entity for which to create the rule.  
    * [Applications](#applications-actions--attributes)
    * [Environments](#environments-actions--attributes)
    * [Products](#products-actions--attributes)

* **Teams**  
  Teams control the _who_ part of the rule. See [Adding users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/). 

* **Actions**  
  Actions control the _what_ part of the rule. You need to select at least one action per entity. Available actions differ based on the selected entity.

* **Attributes**  
  Attributes control the _where_ part of the rule. They include standard Kubernetes (clusters, namespaces, and labels), and Codefresh-specific attributes(Runtimes and Git Sources). The attributes which are available depend on the selected entity.<br>
  Adding attributes, either individually or in combination, allow more fine-grained access control to enforce the _where_ policies for teams and actions. <br>Single attributes are useful to grant or deny access based on a specific property. Combinations of attributes help enforce more complex access control. 


## Create an access rule for GitOps entities via Codefresh UI
For each rule, you must select or define the:
* Entity for which to create the rule
* Team or teams the rule applies to, with at least one team being mandatory 
* Action or actions permitted for the entity, with at least one action being mandatory
* Attribute or attributes determining where access is permitted

<br>

##### Before you begin
* Review:
  * [Applications](#applications-actions--attributes)
  * [Environments](#environments-actions--attributes)
  * [Products](#products-actions--attributes)


##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. On the sidebar, from Access & Collaboration, select **GitOps Permissions**.
1. To create a rule, click **Add** and define the following:
  *  **Entity**: One of the following: {::nomarkdown} <ul><li>GitOps Applications</li><li>Promotion Flows</li><li>Products</li><li>Environments</li></ul>{:/}
  * **Team**: The team or teams to which to give access to the selected entity. 
  * **Actions**: The actions to permit based on those available for the selected entity.
  * **Attributes**: One more attributes based on those available for the selected entity.
1. To confirm, click **Add** once again. 

  {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/access-control/gitops/gitops-add-rule.png" 
   url="/images/administration/access-control/gitops/gitops-add-rule.png" 
   alt="Add rule for application entities" 
   caption="Add rule for application entities"
   max-width="50%" 
  %}

The rule you added for the entity is displayed in the GitOps Permissions page. Edit or delete the rule by clicking the respective icons.

## Create an access rule for GitOps entities programmatically via Terraform
You can also create rules enforcing ABAC for GitOps via Terraform. 
See the documentation for [codefresh_abac_rules](https://registry.terraform.io/providers/codefresh-io/codefresh/latest/docs/resources/abac_rules){:target="\_blank"}.


## Applications


### Applications: Actions & Attributes

{: .table .table-bordered .table-hover}
| Applications              | Description            | 
|----------------------------|-----------------------| 
|**Actions**                 | {::nomarkdown}<ul><li><b>View</b>: Allow users to view applications in the GitOps Apps, Products, and Environments dashboards.<br>Navigating to a restricted application in any dashboard displays a no application found error.<br><div style="background-color: #3d7c84; padding: 16px; margin: 8px 0; border-radius: 4px; font-size: 1em; color: black"><strong style="display: block; margin-bottom: 4px; color: darkred">Note:</strong><span>App <b>View</b> permission for abac is not supported (under development). For now app <b>View</b> permission is based on git read permission to the git repo where the Argo app is defined.</span></div></li><li><b>Refresh</b>: Allow users to manually regular refresh or hard refresh. The Refresh action is automatically disabled on selecting the Sync action which takes precedence. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#refreshhard-refresh-applications">Refresh/Hard Refresh applications</a>.</li><li><b>Sync</b>: Allow users to manually sync an application on-demand, and define the options for manual sync.<br>Selecting Sync automatically disables the Refresh action as Sync takes precedence over it. <br> See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manually-synchronize-an-application">Manually synchronize an application</a>.</li><li><b>Terminate Sync</b>: Allow users to manually stop an ongoing sync for an application. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#terminate-on-going-application-sync">Terminate on-going application sync</a></li><li><b>Perform application rollback</b>: Allow users to rollback the current release of an application to a previous deployment version or release in Codefresh. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#rollback-argo-cd-applications">Rollback Argo CD applications</a>.</li><li><b>View pod logs</b>: Allow users to view logs for pod resources of an application in the Current State tab. <br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/applications-dashboard/#logs-for-application-resources">Logs for application resources</a>.</li><li><b>Pause rollout</b> and <b>Resume rollout</b>: Allow users to pause an ongoing rollout and resume a paused rollout either directly from the Timeline tab of the application, or through the controls in the Rollout Player. <br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#pauseresume-ongoing-rollouts">Pause/resume ongoing rollouts</a> and <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Managing an ongoing rollout with the Rollout Player</a>.</li><li><b>Promote full rollout</b>: Allow users to use the Promote Full button in the Rollout Player to skip the remaining steps in the rollout and promote to deployment. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Managing an ongoing rollout with the Rollout Player</a>.</li><li><b>Skip current step in rollout</b>: Allow users to use the Skip Step button in the Rollout Player to skip executing the current step in the rollout. <br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Managing an ongoing rollout with the Rollout Player</a>.</li><li><b>Abort rollout</b>: Allow users to use the Abort button in the Rollout Player to terminate the current  rollout. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Managing an ongoing rollout with the Rollout Player</a>.</li><li><b>Retry rollout</b>: Allow users to use the Retry button in the Rollout Player to restart an aborted rollout from the beginning. Available only when a rollout was aborted. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Managing an ongoing rollout with the Rollout Player</a>.</li><li><b>Delete resource</b>: Allow users to delete an application resource from the Current State tab. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#delete-an-application">Delete an application</a>.</li></ul>{:/}  | 
|**Attributes** |Allow access to application entities on a cluster or within a namespace through a single attribute or a combination of attributes.<br>You can also add multiple instances of the same attribute with different values. {::nomarkdown} <ul><li><b>Cluster</b>: Allow access to all application entities in the cluster, regardless of the namespace, Runtime, and Git Sources of specific applications.</li><li><b>Namespace</b>: Allow access to application entities only within the namespace. If users have multiple accounts on different clusters with the same namespace, they can access applications in all those namespaces.</li><li><b>Runtime</b>: Allow access to application entities associated with the defined Runtime.</li><li><b>Git Source</b>: Allow access to application entities only in the defined Git Source. A Git Source is always associated with a Runtime.</li><li><b>Label</b>: Allow access only to application entities that share the same label. For example, add multiple Label attributes with different values to sync application entities.</li><!---<li><b>Product</b>: Allow access to application entities associated with the product. For details on associating applications with products, see <a href="https://codefresh.io/docs/docs/products/assign-applications/">Assigning applications to products</a>.</li>--></ul>{:/} |


### Examples of rules for application entities

#### Rule: Cluster-based access to all actions
This rule grants the DevOps team permission to perform all actions for application entities on the production cluster, regardless of namespaces, Runtimes, Git Sources, and labels.

**Rule elements**
* Team: `DevOps`
* Actions: `All`
* Attributes: `Cluster: production-cluster`



#### Rule: Cluster- and namespace-based access to all actions
This rule grants two different teams permissions to perform all actions for application entities deployed on a specific cluster but within a specific namespace.

**Rule elements**
* Teams: `Product`, `Docs`
* Actions: `All`
* Attributes: 
  * `Cluster: development`
  * `Namespace: product-sandbox`


#### Rule: Namespace- and label-based access to specific actions 
This rule grants the Support team permission to manually sync application entities or manually terminate on-going syncs for application entities deployed in a specific namespace, but only for those entities that share the same label. 

**Rule elements**  
* Team: `Customer Support`
* Actions: `Sync`, `Terminate Sync`
* Attributes: 
  * `Namespace: poc`
  * `Label: customer=AcmePoc`

#### Rule: Product-based access to application
This rule grants the Quality team permission to all actions on application entities associated with a specific product within a specific namespace. 

**Rule elements**  
* Team: `quality`
* Actions: All
* Attributes: 
  * `Namespace: poc`
  * `Product: billing-new`

## Environments

### Environments: Actions & attributes

{: .table .table-bordered .table-hover}
| Environments              | Description            | 
|----------------------------|-----------------------| 
| **Actions**  |**Promote to this environment**: Allows the following actions: {::nomarkdown}<ul><li>Manually trigger a Promotion Flow. See <a href="https://codefresh.io/docs/docs/promotions/trigger-promotions/#manually-trigger-promotion-flows">Manually trigger a Promotion Flow</a>.</li><li>Use the Promote option in the Product or Environments dashboard to manually promote an application to the desired environment through the desired Promotion Flow. See <a href="https://codefresh.io/docs/docs/promotions/trigger-promotions/#manually-promote-products-to-specific-environments">Manually promote to specific environments</a>.</li><li>Drag-and-drop an application from one environment to another and trigger promotion. See <a href="https://codefresh.io/docs/docs/promotions/trigger-promotions/#manually-trigger-promotions-through-drag-n-drop">Manually trigger promotions through drag-n-drop</a>.</li></ul>{:/} |
|**Attributes** |{::nomarkdown} <ul><li><b>Environment Name</b>: Allow users to promote to all environments that match the name or names. For example, allows users in team <code class="highlighter-rouge">Dev</code> to promote to <code class="highlighter-rouge">dev</code> and <code class="highlighter-rouge">staging</code> environments only.</li><li><b>Environment Kind</b>: Allow users to promote to only the specified type of environment, either <code class="highlighter-rouge">production</code> or <code class="highlighter-rouge">non-production</code>. </li></ul>{:/} |

### Examples of rules for environment entities

#### Rule: Restrict manual promotions by environment type
This rule restricts manual promotion privileges in production environments minimizing the risk of unauthorized promotions in sensitive environments.

**Rule elements**  
* Team: `DevOps`
* Attributes: 
  * `ENVIRONMENT_KIND: Production`

#### Rule: Restrict manual promotions to specific environments
This rule restricts manual promotion privileges to specific environments, for example, testing environments, for controlled testing. 

**Rule elements**  
* Team: `Qa`, `DevOps`
* Attributes: 
  * `ENVIRONMENT_NAME`: `staging`, `integration`


#### Rule: Restrict manual promotions to specific pre-prod environments
This rule grants broader manual promotion privileges to specific non-production environments. 

**Rule elements**  
* Team: `Dev`, `Qa`, 
* Attributes: 
  * `ENVIRONMENT_KIND`: `Non-production`  
  * `ENVIRONMENT_NAME`: `dev`, `testing`, `pre-prod`






## Products

### Products: Actions & attributes

{: .table .table-bordered .table-hover}
| Products              | Description            |
|----------------------------|-----------------------| 
|**Actions**             |{::nomarkdown}<ul><li><b>Trigger promotion</b>: Allow users to manually trigger a Promotion Flow. See <a href="https://codefresh.io/docs/docs/promotions/trigger-promotions/#manually-trigger-promotion-flows">Manually trigger a Promotion Flow</a>.</li><li><b>Retry failed release</b>: Allow users to restart a failed release from the point of failure. See <a href="https://codefresh.io/docs/docs/promotions/product-releases/#retry-a-failed-release">Retry a failed release</a>.</li></ul>{:/} |
|**Attributes** |{::nomarkdown} <ul><li><b>Label</b>: Allow users to trigger promotions or to retry failed releases only for products that match the specified labels. For example, allow users in team <code class="highlighter-rouge">DevOps</code> to promote products with the label <code class="highlighter-rouge">hotfix</code>. See <a href="https://codefresh.io/docs/docs/products/configure-product-settings/#configure-labels">Configuring labels in Product Settings</a> </li><li><b>Product Name</b>: Allow users to trigger promotions or to retry failed releases only for products that match the specified names. For example, allow users in team <code class="highlighter-rouge">Dev</code> to promote products with the name <code class="highlighter-rouge">Marvel</code>. </li></ul>{:/} |


### Examples of rules for product entities

#### Rule: Trigger promotions and retry releases for products by labels
This rule grants manual promotion and retry release privileges for all products with the specified label to all teams. For example, test and try product deployment to non-customer-facing environments.

**Rule elements**  
* Team: `Dev`, `Qa`, `Product`, `Apollo` 
* Actions: `Trigger promotion`, `Retry release`
* Attributes: 
  * `LABEL`: `internal-use-only`  

#### Rule: Trigger promotions by specific products
This rule grants manual promotion and retry release privileges for all products with the specified label to all teams. For example, test and try product deployment to non-customer-facing environments.

**Rule elements**  
* Team: `Dev`, `Qa`, `Product`, `Apollo` 
* Actions: `Trigger promotion`, `Retry release`
* Attributes: 
  * `LABEL`: `internal-use-only`  


#### Rule: Trigger promotions by labels & specific products
This rule grants manual promotion and retry release privileges for all products to fast-track promotions and deployments for critical issue resolution.

**Rule elements**  
* Team: `DevOps` 
* Actions: `Trigger promotion`, `Retry release`
* Attributes: 
  * `LABEL`: `hotfix`  


#### Rule: Trigger promotions by specific products
This rule grants manual promotion privileges to specific products that match a specific state in their development and deployment lifecycle, or any other requirement.

**Rule elements**  
* Team: `DevOps` 
* Actions: `Trigger promotion`
* Attributes: 
  * `PRODUCT_NAME`: `promotions-beta`, `multi-region-deploy`




## Promotion Flows

### Promotion Flows: Actions & attributes

{: .table .table-bordered .table-hover}
| Promotion Flows            | Description            |
|----------------------------|-----------------------| 
|**Actions**  | **Trigger promotion flow**: Allow users to manually trigger a Promotion Flow. See <a href="https://codefresh.io/docs/docs/promotions/trigger-promotions/#manually-promote-products-to-multiple-environments-by-promotion-flow">Manually trigger a Promotion Flow</a>.|
|**Attributes** | **Label**: Allow users to trigger promotions for Promotion Flows that match the specified label in the YAML manifest.  |





## Related articles
[Codefresh Provider for Terraform](https://registry.terraform.io/providers/codefresh-io/codefresh/latest/docs){:target="\_blank"}   
