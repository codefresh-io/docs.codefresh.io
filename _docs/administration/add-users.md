---
title: "Manage users"
description: "Add other Codefresh users to your account"
group: administration
toc: true
---

If you have a Codefresh account, you can add any number of users to collaborate on repositories, workflows, and pipelines. Adding a user requires assiging a role, and optionally an SSO provider. 

**Role**: Defines the user's access level, and is by default set to User. The Administrator role has full access to account settings. 
For guidelines on access control, see [Access control]({{site.baseurl}}/docs/administration/access-control/).  

**SSO**: If you have SSO, select the provider and then configure required settings. For an overview of SSO, see [Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/).

### Add a user  
1. In Codefresh, click **Account Settings**.
1. From the sidebar, select [Collaboration]((https://g.codefresh.io/2.0/account-settings/users){:target="\_blank"}).  
   {% include
   image.html
   lightbox="true"
   file="/images/administration/users/users-list.png"
   url="/images/administration/users/users-list.png"
   alt="Users list"
   caption="Users list"
   max-width="100%"
   %}
{:start="3"} 
1. Select **Users**, and then select **+ [Add User]**.
   {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/users/invite-user.png" 
   url="/images/administration/users/invite-user.png" 
   alt="Add new user" 
   caption="Add new user"
   max-width="100%" 
   %}
    1. Type the **User's email address**.  
    1. **Assign a role**, by selecting either **User** or **Administrator**.  
    1. If SSO is configured for the account, **Select SSO provider**, and then configure the settings.  
       * [SAML2]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-saml2.md) 
       * [OpenID Connect]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2.md) 
       * [Auth0]({{site.baseurl}}/docs/administration/single-sign-on/sso-auth0.md) 
       * [Azure]({{site.baseurl}}/docs/administration/single-sign-on/sso-azure.md)  
       * [Google]({{site.baseurl}}/docs/administration/single-sign-on/sso-google.md)
       * [LDAP]({{site.baseurl}}/docs/administration/single-sign-on/sso-ldap.md)
       * [Okta]({{site.baseurl}}/docs/administration/single-sign-on/sso-okta.md)
       * [OneLogin]({{site.baseurl}}/docs/administration/single-sign-on/sso-onelogin.md)


The user receives an email invitation, and the Users page is updated with information on the user. 
The Status column shows Invite sent until the user accepts the invitation, when the user account is created. For the duration that the invitation is pending, you can resend the invitation, by clicking Resend invite.

### Troubleshoot add users
[User is prompted to enter an organization name](https://support.codefresh.io/hc/en-us/articles/360020177959-User-is-prompted-to-enter-an-organization-name)  
[Account invitation not permitting login](https://support.codefresh.io/hc/en-us/articles/360015251000-Account-invitation-not-permitting-login)

