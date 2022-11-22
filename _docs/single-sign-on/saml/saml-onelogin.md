---
title: OneLogin (SAML)
description: Setting Up OneLogin via SAML
group: single-sign-on
sub_group: saml
toc: true
---

## Setup Instructions

Below describes how to set up OneLogin for Single Sign-On with Codefresh using SAML.  If you do not have the SAML option, please create a support ticket enable SAML for the account.

### In OneLogin

1. Go to the Applications Section.
1. Select **Add App** on the top right.
1. Search for **SAML Custom Connector (advanced)** and select it.
1. Add a Display Name (the rest is optional) and Save.
1. View the SSO Section.
1. Open a new Tab

### In Codefresh

1. Go to Account settings > Single Sign On
1. Select Add Single Sign On > SAML
1. Enter the Following Information
    - **Display Name**: any arbitrary name you want to give in this integration.
    - **IDP Entry**: SAML 2.0 Endpoint (HTTP) from the SSO section in OneLogin.
    - **Application Certificate**: X.509 Certificate from the SSO section in OneLogin.
      - You can use with or without the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` as long the Certificate data is there
1. Save
1. Click edit on the SAML integration we created.
1. Copy the Assertion URL

### Back In OneLogin

1. View the Configuration Page
1. Fill in the following
    - **Audience (EntityID)**: `g.codefresh.io`
    - **Recipient**: Assertion URL
    - **ACS (Consumer) URL Validator**: Assertion URL but in Regex form. View OneLogin’s [Setup Page](https://onelogin.service-now.com/support?id=kb_article&sys_id=c89fefdadb2310503de43e043996195a&kb_category=93e869b0db185340d5505eea4b961934) for more info.
    - **ACS (Consumer) URL**: Assertion URL
    - **Login URL**: `https://g.codefresh.io/login` or the Assertion URL without the /callback
    - **SAML Initiator**: Service Provider
1. Save

> When adding users to the SAML App in OneLogin, make sure the NameID field is equal to the email address.

## Test SSO Connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure it is working

1. Go to Account Settings > User & Teams
1. Locate a test user
1. On the SSO Column, select the SSO name to enable SSO for the user
1. In a different browser or private/incognito browser window use the Corporate option to log in
