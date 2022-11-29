---
title: "Setting up SAML2 Federated Single Sign-On (SSO)"
description: ""
group: administration
sub_group: single-sign-on
redirect_from:
  - /docs/sso/sso-setup-saml2/
  - /docs/enterprise/single-sign-on/sso-setup-saml2/
toc: true
---

As Identity Providers (IdPs) come in all shapes and sizes, this topic discusses in general what you must do to configure Federated SSO for SAML. 
  As you will see in the description below, the person in your organization responsible for managing your IdP will need to interact with Codefresh support to successfully set up a trust between your IdP and Codefresh as an SP.

{:.text-secondary}
## Before you set up Federated SSO
  1. Have your account set up with Codefresh enterprise plan.
  2. Ensure you have a working SAML 2.0 compliant identity provider (IdP).
  3. Identify someone in your organization who is familiar with configuring and managing your organization's IdP.
  4. Ensure that your IdP's system clock is synchronized with a reliable time source. If it's not, tokens generated will be unusable and SSO will fail.

{:.text-secondary}
### Summary of Federated SSO setup

{% include image.html
  lightbox="true"
  file="/images/sso-flow.png"
  url="/images/sso-flow.png"
  alt="sso-flow.png"
  max-width="100%"
%}

{:.text-secondary}
### SAML attributes

Codefresh expects the following user attributes to be passed through SAML between your IdP and Codefresh SP:
  - User email address
  - User first name
  - User last name
  - User full name
  - User unique ID that isn't subject to change in your identity management environment

{:.text-secondary}
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
  This generally includes defining settings in Codefresh and in the IdP.  
  Codefresh supports SAML SSO for the following:
  * [JumpCloud]({{site.baseurl}}/docs/administration/single-sign-on/saml/saml-jumpcloud)
  * [Okta]({{site.baseurl}}/docs/administration/single-sign-on/saml/saml-okta)
  * [OneLogin]({{site.baseurl}}/docs/administration/single-sign-on/saml/saml-onelogin)
  * [PingID](({{site.baseurl}}/docs/administration/single-sign-on/saml/saml-pingid)

  Notes for SSO via SAML:  
  **SSO settings**  

  * Assertion URL  
    The Assertion URL which is the Service Provider SSO endpoint, also referred to as the Callback URL or Client ID, is generated _after_ you create the integration.

  * Provider  
    Currently, we support GSuite for SAML. If you are using a different provider, leave this field empty.  
    For GSuite, you can define the sync settings, Admin Email and the JSON Keyfile.
    For instructions, see [Google SSO]({{site.baseurl}}/docs/administration/single-sign-on/sso-google/#synchronize-teams-with-the-codefresh-cli).

  > These settings are for the SaaS version of Codefresh. For an on-premises setup, use the URLs that match your installation.

1. Test integration   
  Codefresh offers an option to test each integration.

1. Set an IdP as the default provider

1. Set the SSO for each user

> Codefresh has an internal cache for SSO configuration, and it can take up to five minutes for your changes to take effect.




* [Selecting SSO method for collaborators]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#selecting-sso-method-for-collaborators) -->





   
   
 

  
