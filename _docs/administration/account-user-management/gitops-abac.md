---
title: "Access control for GitOps"
description: "Restrict access to GitOps entities through ABAC"
toc: true
---

Control access to application entities in GitOps through ABAC (Attribute-Based Access Control). ABAC allows fine-grained access to application entities through the use of rules.  
For more information on ABAC, see [ABAC on Wikipedia](https://en.wikipedia.org/wiki/Attribute-based_access_control){:target="\_blank"}. 


Rules define the *who*, *what*, and *where*  control access to GitOps applications, through the following elements. 
* Teams
  Teams control the _who_ part of the rule. 

* Actions
  Actions control the  _what_ part of the rule. You can multi-select actions. 

* Attributes
  Attributes control the _where_ part of the rule. Attributes are a combination of standard Kubernetes attributes and Codefresh-specific attributes and metadata. You have clusters, namespaves, and labels as Kubernetes attributes, and Runtimes and Git Source attributes which are unique to Codefresh.
  Attribute-based access is hierarhcical and ranges from the highest-level in the hierarchry with the greatest scope to the lowest-level metadata with the least most restircted in scope.
  By suing attrutes at different hiearchies in combination you can provide just the control you need.



## Creating a rule
For each rule, you must select or define at least one element:
* The team or teams the rule applies to 
* The action or actions permitted for the entity
* The attribute or attributes determining where access is permitted

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. On the sidebar, from Access & Collaboration, select [**GitOps Permissions**](https://g.codefresh.io/account-admin/permissions/teams){:target="\_blank"}.
1. To create a rule, click **Add** and define the **Teams**, **Actions**, and **Attributes** for the rule.
1. To confirm, click **Add** once again. 

The rule you added for the entity is displayed in the GitOps Permissions page. Edit or delete the rule by clicking the respective icons.

## GitOps Applications rule elements

{: .table .table-bordered .table-hover}
| Rule Element              | Description            |  
| --------------         | --------------           |  
|Teams                   | The team or teams to which to give access to the Application Entity.|
|Actions                 | The actions permitted for the application entity, and can be any or all of the following: {::nomarkdown} <ul><li><b>Refresh</b>: Allow users to manually regular refresh or hard refresh. The Refresh action is automatically disabled on selecting the Sync action which takes precedence. See [Refresh/Hard Refresh applications]({{site.baseurl}}/ddocs/deployments/gitops/manage-application/#refreshhard-refresh-applications).</li><li><b>Sync</b>: Allow users to manually sync an application on-demand, and define the options for manual sync.<br>Selecting Sync automatically disables the Refresh action as Sync takes precedence over it. <br> See [Manually synchronize an application]({{site.baseurl}}/docs/deployments/gitops/manage-application/#manually-synchronize-an-application).</li><li><b>Terminate Sync</b>: Allow users to manually stop an ongoing sync for an application. See [Terminate on-going application sync]({{site.baseurl}}/docs/deployments/gitops/manage-application/#terminate-on-going-application-sync)</li><li><b>View pod logs</b>: Not implemented yet</li><li><b>Delete</b>: Allow users to delete an application from Codefresh. For more information, see [Delete an application]({{site.baseurl}}/docs/deployments/gitops/manage-application/#delete-an-application).</li></ul>{:/} |
 


