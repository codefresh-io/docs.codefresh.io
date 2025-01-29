---
title: "Account and user management"
description: "Add teams, users, and configure access control"
group: administration
toc: true
---

Codefresh has comprehensive support for all aspects of administration for organizations<!---in both on-premises and SaaS environments-->.  

Review:

* [Add users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/) 

{% if page.url contains '/docs/' %}
* Configure access control for [pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/) and for [GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)
{ % endif %}

{% if page.url contains '/argohub/' %}
* Configure access control for [GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)
{ % endif %}

* [Configure Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/)

{% if page.url contains '/docs/' %}
* Get [audit logs]({{site.baseurl}}/docs/administration/account-user-management/audit/) for runtimes (hosted or private)
* Learn [which IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/) are used for SAAS runtimes

For on-premises environments, see [On-premises account and user setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/).
{ % endif %} 