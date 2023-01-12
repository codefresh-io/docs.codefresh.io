---
title: "Setting up SAML2 Federated SSO"
description: "SAML2 Federated Single Sign-On (SSO) setup"
group: single-sign-on
redirect_from:
  - /docs/sso/sso-setup-saml2/
  - /docs/enterprise/single-sign-on/sso-setup-saml2/
toc: true
---

As Identity Providers (IdPs) come in all shapes and sizes, this topic discusses in general what you must do to configure Federated SSO for SAML. 
  As you will see in the description below, the person in your organization responsible for managing your IdP will need to interact with Codefresh support to successfully set up a trust between your IdP and Codefresh as an SP.


## Before you set up Federated SSO
  1. Have your account set up with Codefresh enterprise plan.
  2. Ensure you have a working SAML 2.0 compliant identity provider (IdP).
  3. Identify someone in your organization who is familiar with configuring and managing your organization's IdP.
  4. Ensure that your IdP's system clock is synchronized with a reliable time source. If it's not, tokens generated will be unusable and SSO will fail.


### Summary of Federated SSO setup

{% include image.html
  lightbox="true"
  file="/images/sso-flow.png"
  url="/images/sso-flow.png"
  alt="sso-flow.png"
  max-width="100%"
%}


### SAML attributes

Codefresh expects the following user attributes to be passed through SAML between your IdP and Codefresh SP:
  - User email address
  - User first name
  - User last name
  - User full name
  - User unique ID that isn't subject to change in your identity management environment


### How does the connection process work?

  {% include image.html
lightbox="true"
file="/images/sso-diagram.png"
url="/images/sso-diagram.png"
alt="sso-diagram.png"
max-width="100%"
  %}

Once Federated SSO has been configured, the process works as follows:

<div class="bd-callout bd-callout-info" markdown="1">

  Steps 2 to 7 occur in the background and are transparent to the user.
</div>

1. A user logs in to Codefresh and enters the email address.
2. The user is redirected to the Codefresh Service Provider (SP) to initiate SSO.
3. The user’s browser is then redirected to the customer IdP.
4. Once authenticated by the corporate side, a SAML token is sent to the user’s browser.
5. The SAML assertion is then forwarded to Codefresh SP.
6. If you are a valid Codefresh user for this SSO connection, an SSO token is returned to the user’s browser.
7. The user’s browser then returns a token to Codefresh and access is granted for your account.

## SAML SSO configuration in Codefresh 

Here's what you need to do to configure SSO via SAML in Codefresh:

1. Configure SSO settings for the IdP in Codefresh:  
  This generally includes defining settings both in Codefresh and in the IdP.  
  Codefresh supports SAML SSO for the following:
  * [JumpCloud]({{site.baseurl}}/docs/single-sign-on/saml/saml-jumpcloud)
  * [Okta]({{site.baseurl}}/docs/single-sign-on/saml/saml-okta)
  * [OneLogin]({{site.baseurl}}/docs/single-sign-on/saml/saml-onelogin)
  * [PingID]({{site.baseurl}}/docs/single-sign-on/saml/saml-pingid)

  Notes for SSO via SAML:  
  <br />
  **SSO settings**  

  * Assertion URL  
    The Assertion URL which is the Service Provider SSO endpoint, also referred to as the Callback URL or Client ID, is generated _after_ you create the integration.

  * Provider  
    Currently, we support GSuite for SAML. If you are using a different provider, leave this field empty.  
    For GSuite, you can define the sync settings, Admin Email and the JSON Keyfile.
    For instructions, see [Google SSO]({{site.baseurl}}/docs/single-sign-on/sso-google/#synchronize-teams-with-the-codefresh-cli).

  > These settings are for the SaaS version of Codefresh. For an on-premises setup, use the URLs that match your installation.

{:start="2"}
1. Test integration with the IdP: 
    
    >Before enabling SSO for users, you **MUST** make sure that it is working for the test user. If SSO is enabled for a user, Codefresh blocks logins through other IDPs for this user and only the enabled SSO is allowed. If the selected SSO method does not work for some reason, the user will be locked out of Codefresh.

    1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
    1. From the sidebar, below Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.   
    1. Add an active user to be used for testing. We recommend you use your own user.
    1. Change Login method by selecting your Auth provider from the SSO drop-down.

    {% include image.html
    lightbox="true"
    file="/images/administration/sso/collaborators.png"
    url="/images/administration/sso/collaborators.png"
    alt="Adding collaborators"
    caption="Adding collaborators"
    max-width="70%"
    %}

    {:start="5"}
    1. Keep the current browser session open, and log in via Corporate SSO in an incognito tab (or another browser).

    {% include image.html
    lightbox="true"
    file="/images/administration/sso/sign-with-sso.png"
    url="/images/administration/sso/sign-with-sso.png"
    alt="Sign-in with SSO"
    caption="Sign-in with SSO"
    max-width="50%"
    %}

1. (Optional) [Set a default SSO provider for account]({{site.baseurl}}/docs/single-sign-on/team-sync/#set-a-default-sso-provider-for-account)
  You can select an IdP as the default SSO provider for a Codefresh account. This means that all the new users added to that account will automatically use the selected IdP for signin.
1. (Optional) [Select SSO method for individual users]({{site.baseurl}}/docs/single-sign-on/team-sync/#select-sso-method-for-individual-users)
  You can also select if needed, a different SSO provider for every user or for specific users.

> Codefresh has an internal cache for SSO configuration, and it can take up to five minutes for your changes to take effect.

## Related articles
[Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/single-sign-on)  
[Setting up OIDC Federated SSO]({{site.baseurl}}/docs/single-sign-on/oidc)





   
   
 

  
