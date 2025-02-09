---
title: "Account and user management"
description: "Add teams, users, and configure access control"
group: administration
toc: true
---

Codefresh has comprehensive support for all aspects of administration for organizations<!---in both on-premises and SaaS environments-->.  

Review:

{% if page.collection != site.gitops_collection %}
* [Add users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/) 
* Configure access control for [pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/) and for [GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)
* Configure access control for [GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)
* [Configure Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/)
* Get [audit logs]({{site.baseurl}}/docs/administration/account-user-management/audit/) for runtimes (hosted or private)
* Learn [which IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/) are used for SaaS runtimes

For on-premises environments, see [On-premises account and user setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/).
{% endif %}

{% if page.collection == site.gitops_collection %}
* [Add users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/) 
* Configure access control for [GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)
* [Configure Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/)  
{% endif %}