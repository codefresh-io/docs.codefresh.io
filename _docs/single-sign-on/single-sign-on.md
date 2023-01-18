---
title: "Federated Single Sign-On (SSO) overview"
description: ""
group: single-sign-on
redirect_from:
  - /docs/single-sign-on/sso-overview/
  - /docs/sso/federated-sso-overview/
  - /docs/enterprise/single-sign-on/
toc: true
---
  
  Customers in our **enterprise plan** can log in to Codefresh using Federated Single Sign-On (SSO). To learn more, please [contact sales](https://codefresh.io/contact-sales/){:target="\_blank"}. 

  Federated identity management enables the cross organizational exchange of identity information across internet domains, without migrating credential information or consolidating several security domains. With federation, customers can authenticate with their corporate credentials to gain access to Codefresh.  

  To set up Federated SSO, your identity management organization must use either of the following:

  - **A Security Assertion Markup Language 2.0 (SAML 2.0)** compliant Identity Provider (IdP),  configured to communicate with the Codefresh Service Provider (SP). For example, ADFS, Auth0, Okta and Ping Identity. 
  
  - **OpenID Connect (OAuth 2.0)** identity management. For example, Google, GitHub, Bitbucket and GitLab.
  
Asserting the identity of the user to Codefresh ensures seamless SSO from a browser.

A SAML2-based federated system comprises:

  - **Identity Provider (IdP)**: The identity provider belongs to the corporation that manages accounts for a large number of users who need secure internet access to the services or web-based applications of another organization. In our case, it's the customer's organization that requires access to Codefresh.
    - The IdP manages the corporate users, and integrates with Identity Management systems in the customer's organization responsible for authentication. The Identity Management systems integrate with authentication providers such as LDAP or AD(Active Directory).
    - All user authentication is carried out via Identity Management systems integrated with the IdP.
    - For successfully authenticated users, the IdP sends a SAML assertion to the Codefresh service provider that enables the user to access Codefresh.

  - **Service Provider (SP)**: The service provider belongs to the SaaS provider who wants to provide access to their web applications and services.
    - The SP trusts a corporate IdP to manage users and the authentication process.
    - The SP does not manage an organization’s users, but it trusts the IdP to manage user authentication.

  A trust must be set up between the customer IdP and Codefresh as an SP. Once the trust has been set up, and a user has been authenticated via the IdP using corporate credentials, the user can access the Codefresh platform.


## Why use Federated SSO

Using federated SSO significantly simplifies cross-domain user management as follows:
  
* You use your corporate credentials to access the Codefresh platform. This means that you can access all your systems with a single password.
* There is no need to migrate identity information or consolidate between the two security domains.
* Corporate credentials aren't exposed to the SaaS provider.


## Related articles
[Setting Up SAML2 Federated Single Sign-On (SSO)]({{site.baseurl}}/docs/single-sign-on/saml)  
[Setting Up OpenID Connect Federated Single Sign-On]({{site.baseurl}}/docs/single-sign-on/oidc)    
