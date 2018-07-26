---
title: "Setting Up SAML2 Federated Single Sign-On (SSO)"
description: ""
group: enterprise
sub_group: single-sign-on
redirect_from:
  - /docs/sso/sso-setup-saml2/
toc: true
---

  As IdPs come in all shapes and sizes, the following topic discusses in general what you must do to configure Federated SSO. 
  As you will see in the description below, the person in your organization responsible for managing your IdP will need to interact with Codefresh support team to successfully set up a trust between your IdP and Codefresh SP.

{:.text-secondary}
## Before you set up Federated SSO:
  1. Have your account set up with Codefresh enterprise plan
  2. Ensure you have a working SAML 2.0 compliant Identity Provider (IdP).
  3. Identify someone in your organization who is familiar with configuring and managing your organization's IdP.
  4. Ensure that your IdP's system clock is synchronized with a reliable time source. If it is not, tokens generated will be unusable and SSO will fail.

{:.text-secondary}
## Summary of Federated SSO Setup

{% include image.html
  lightbox="true"
  file="/images/sso-flow.png"
  url="/images/sso-flow.png"
  alt="sso-flow.png"
  max-width="100%"
%}

{:.text-secondary}
## SAML Attributes

Codefresh expects the following user attributes to be passed through SAML between your Idp and Codefresh SP:
  - User email address
  - User first name
  - User last name
  - User full name
  - User unique id that isn't subject to change in your identity management environment

{:.text-secondary}
## How does the connection process works?

  {% include image.html
lightbox="true"
file="/images/sso-diagram.png"
url="/images/sso-diagram.png"
alt="sso-diagram.png"
max-width="100%"
  %}

Once Federated SSO has been configured, the process works as follows:

<div class="bd-callout bd-callout-info" markdown="1">
  Note

  Steps 2 to 7 happen in the background, and are transparent to the user.
</div>

1. A user logs in to Codefresh and enters their email
2. The user is redirected to Codefresh Service Provider (SP) to initiate SSO.
3. The user’s browser is then redirected to the customer IdP.
4. Once authenticated by the corporate side, a SAML token is sent to the user’s browser.
5. The SAML assertion is then forwarded to Codefresh SP.
6. If you are a valid Codefresh user for this SSO connection, an SSO token is returned to the user’s browser.
7. The user’s browser then returns a token to Codefresh and access is granted for your account.
