---
title: "Federated Single Sign-On (SSO) Overview"
description: ""
group: sso
permalink: /:collection/sso/federated-sso-overview/
toc: true
---
  
  Customers in our **enterprise plan** (please [contact sales](https://codefresh.io/contact-sales/) to learn more) can log in to Codefresh using Federated Single Sign-On (SSO).

  Federated identity management enables the cross organizational exchange of identity information across Internet domains, without migrating credential information or consolidating several security domains. With federation, Codefresh customers can authenticate with their corporate credentials to gain access to Codefresh.  
  This means that you will be able to access your Codefresh account by signing with your corporate credentials. 
  
  To set up Federated SSO, your organization identity management must use either of the following:

  - **A security Assertion Markup Language 2.0 (SAML 2.0)** compliant Identity Provider (IdP) that is configured to communicate with Codefresh Service Provider (SP). For example, ADFS, Auth0, Okta and Ping Identity. 
  
  - **OpenID Connect (OAuth 2.0)** identity mangement. For example, Google, Github, Bitbucket and Gitlab.
  
  This enables seamless SSO from a browser, by asserting the identity of the user to Codefresh.

A SAML2 based federated system comprises the following main components:

  - **Identity Provider (IdP)** – The identity provider belongs in the corporation that manages accounts for a large number of users who need secure Internet access to the services or Web- based applications of another organization. In our case a customer's organization that requires access to Codefresh.
    - The IdP manages the corporate users, and integrates with Identity Management systems in the customers organization responsible for authentication. The Identity Management systems will integrate with authentication providers such as LDAP or AD.
    - All user authentication is carried out via Identity Management systems integrated with the IdP
    - For successfully authenticated users, the IdP sends a SAML assertion to Codefresh service provider that enables the user to access Codefresh.

  - **Service Provider (SP)** – An SP belongs in the SaaS provider that wants to provide access to its web applications and services.
    - The SP trusts a corporate IdP to manage users and the authentication process.
    - The SP does not manage an organization’s users, but it trusts the IdP to manage user authentication.

  A trust must be set up between the customer IdP and Codefresh SP. Once a trust has been set up and a user has been authenticated via the IdP using corporate credentials, the user can access Codefresh.

{:.text-secondary}
## Why use Federated SSO

Using federated SSO significantly simplifies cross-domain user management as follows:
  
  - You use your corporate credentials to access Codefresh.That means you can access all your systems with one password.
  - There is no need to migrate identity information or consolidate between the two security domains.
  - Corporate credentials aren't exposed to the SaaS provider.
  
