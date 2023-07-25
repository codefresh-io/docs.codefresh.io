---
title: "Access control for GitOps"
description: "Restrict access to GitOps entities through ABAC"
toc: true
---

Control access to entities in GitOps through ABAC (Attribute-Based Access Control). ABAC allows fine-grained access to application entities through the use of rules.  
For GitOps, you can currently define ABAC for application entities in the Codefresh UI or programmatically via Terraform.
For more information on ABAC, see [ABAC on Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control){:target="\_blank"}. 


Rules define the *who*, *what*, and *where*  control access to GitOps applications, through the following elements. 
* Teams  
  Teams control the _who_ part of the rule. 

* Actions  
  Actions control the _what_ part of the rule. You need to select at least one action. 

* Attributes  
  Attributes control the _where_ part of the rule.  
  Attributes are a combination of standard Kubernetes and Codefresh-specific attributes. You have Kubernetes attributes such as clusters, namespaces, and labels, and attributes unique to Codefresh such as Runtimes and Git Sources.


## Creating a rule in Codefresh UI
For each rule, you must select or define:
* The team or teams the rule applies to, with at least one team being mandatory 
* The action or actions permitted for the entity, with at least one action being mandatory
* The attribute or attributes determining where access is permitted

**How to**

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. On the sidebar, from Access & Collaboration, select [**GitOps Permissions**](https://g.codefresh.io/account-admin/permissions/teams){:target="\_blank"}.
1. To create a rule, click **Add** and define the **Teams**, **Actions**, and **Attributes** for the rule.
1. To confirm, click **Add** once again. 

The rule you added for the entity is displayed in the GitOps Permissions page. Edit or delete the rule by clicking the respective icons.

## Creating a rule programmatically via Terraform
You can also create rules enforcing ABAC for GitOps via Terraform. 
See the documentation for [codefresh_abac_rules](https://registry.terraform.io/providers/codefresh-io/codefresh/latest/docs/resources/abac_rules){:target="\_blank"}.



## GitOps Applications rule elements

{: .table .table-bordered .table-hover}
| Rule Element              | Description            |  
| --------------         | --------------           |  
|Teams                   | The team or teams to which to give access to the Application Entity. See [Adding users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/).|
|Actions                 | The actions permitted for the application entity, and can be any or all of the following: {::nomarkdown} <ul><li><b>Refresh</b>: Allow users to manually regular refresh or hard refresh. The Refresh action is automatically disabled on selecting the Sync action which takes precedence. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#refreshhard-refresh-applications">Refresh/Hard Refresh applications</a>.</li><li><b>Sync</b>: Allow users to manually sync an application on-demand, and define the options for manual sync.<br>Selecting Sync automatically disables the Refresh action as Sync takes precedence over it. <br> See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manually-synchronize-an-application">Manually synchronize an application</a>.</li><li><b>Terminate Sync</b>: Allow users to manually stop an ongoing sync for an application. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#terminate-on-going-application-sync">Terminate on-going application sync</a></li><li><b>View pod logs</b>: Not implemented yet</li>li><b>Rollback application</b>: Allow users to rollback the current release of an application to a previous deployment version or release in Codefresh. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#rollback-gitops-applications">Rollback GitOps applications</a>.</li><li><b>Pause rollout</b> and <b>Resume rollout</b>: Allow users to pause an ongoing rollout directly from the Timeline tab of the application. <br>Allow users to resume a paused rollout directly from the Timeline tab. <br>See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#pauseresume-ongoing-rollouts">Pause/resume ongoing rollouts</a>.</li><li><b>Promote full rollout</b>: Allow users to use the Promote Full button in the Rollout Player to skip the remaining steps in the rollout and promote to deployment. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Managing an ongoing rollout with the Rollout Player</a>.</li><li><li><b>Skip current step in rollout</b>: Allow users to use the Skip Step button in the Rollout Player to skip executing the current step in the rollout. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#manage-an-ongoing-rollout-with-the-rollout-player">Managing an ongoing rollout with the Rollout Player</a>.</li><b>Delete resource</b>: Allow users to delete an application resource from the Current State tab. See <a href="https://codefresh.io/docs/docs/deployments/gitops/manage-application/#delete-an-application">Delete an application</a>.</li></ul>{:/} |
|Attributes |Adding attributes, either individually or in combination, allow more fine-grained access control to enforce the _where_ policies for teams and actions. <br>Single attributes are useful to grant or deny access based on a specific property. For example, allow access to application entities on a cluster or within a namespace. <br>Combinations of attributes help enforce more complex access control. For example, require both a Runtime and a Label attribute to grant access to an application entity.<br>You can also add multiple instances of the same attribute with different values. For example, multiple Label attibutes with different values to sync application entities.{::nomarkdown} <ul><li><b>Cluster</b>: Allow access to all application entities in the cluster, regardless of the namespace, Runtime, and Git Sources of specific applications.</li><li><b>Namespace</b>: Allow access to application entities only within the namespace. If users have multiple accounts on different clusters with the same namespace, they can access applications in all those namespaces.</li><li><b>Runtime</b>: Allow access to application entities associated with the defined Runtime.</li><li><b>Git Source</b>: Allow access to application entities only in the defined Git Source. A Git Source is always associated with a Runtime.</li><li><b>Label</b>: Allow access only to application entities that share the same label.</li></ul>{:/} |





## Examples of rules for application entities

### Rule: Cluster-based access to all actions
This rule grants the DevOps team permission to perform all actions for application entities on the production cluster, regardless of namespaces, Runtimes, Git Sources and labels.

**Rule elements**
* Team: `DevOps`
* Actions: `All`
* Attributes: `Cluster: production-cluster`



### Rule: Cluster- and namespace-based access to all actions
This rule grants two different teams permissions to perform all actions for application entities deployed on a specific cluster but within a specific namespace.

**Rule elements**
* Teams: `Product`, `Docs`
* Actions: `All`
* Attributes: 
  * `Cluster: development`
  * `Namespace: product-sandbox`


### Rule: Namespace- and label-based access to specific actions 
This rule grants the Support team permission to manually sync application entities or manually terminate on-going syncs for application entities deployed in a specific namespace, but only for those entities that share the same label. 

**Rule elements**  
* Team: `Customer Support`
* Actions: `Sync`, `Terminate Sync`
* Attributes: 
  * `Namespace: poc`
  * `Label: customer=AcmePoc`


## Related articles
[Codefresh Provider for Terraform](https://registry.terraform.io/providers/codefresh-io/codefresh/latest/docs){:target="\_blank"}   
[Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/)