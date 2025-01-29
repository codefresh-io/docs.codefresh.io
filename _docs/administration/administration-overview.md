---
title: "About administration in Codefresh"
description: "Add teams, users, configure access control, and SSO"
group: administration
toc: true
---




Effective administration ensures secure and efficient management of your organization's processes. This overview highlights key administrative tasks to help maintain a well-organized and secure environment.

##### Account and user management

Administration begins with setting up a Codefresh account to access platform features. 

Account administrators can then:
* Add users and teams to collaborate on work processes
* Create service accounts to manage automated processes and integrations 
See [Account and user management]({{site.baseurl}}/docs/administration/account-user-management/).

##### Access control

{% if page.url contains '/docs/' %}
* **CI pipelines**  
  Implement role-based access control (RBAC) and attribute-based access control (ABAC) to restrict access to pipelines. Define roles, assign tags, and create rules to manage permissions effectively.  
  See [Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/).
* **GitOps**  
  Set up access control mechanisms for GitOps entities and processes to ensure secure operations.
  See [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/).

{% endif %}

{% if page.url contains '/argohub/' %}
Set up access control mechanisms for GitOps entities and processes to ensure secure operations.  
See [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/).
{% endif %}

##### Single Sign-On (SSO) integration
Integrate Single Sign-On (SSO) to centralize user authentication and enhance security. The platform supports various SSO providers, including OpenID Connect and SAML.  
See [About Federated Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/).



{% if page.url contains '/docs/' %}
##### Auditing and monitoring
Maintain a comprehensive audit log of user activities to track changes, ensure compliance, and enhance security.
See [Auditing actions in Codefresh]({{site.baseurl}}/docs/administration/account-user-management/audit/).
{% endif %}


##### Personal user settings
Users in a Codefresh account can personalize settings such as notifications and manage their API keys.

{% if page.url contains '/argohub/' %}
They can also securely manage Git Personal Access Tokens (PATs) to control access to repositories, and protect sensitive information.
{% endif %}
See [User settings]({{site.baseurl}}/=/docs/administration/user-self-management/).