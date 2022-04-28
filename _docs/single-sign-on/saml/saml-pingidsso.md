---
title: PingID SSO (SAML)
description: Setting Up PingID SSO via SAML
group: single-sign-on
sub_group: saml
toc: true
---

Below describes how to set up PingID SSO for Single Sing On with Codefresh using SAML.  If you do not have the SAML option, please create a support ticket to enable SAML for the account.

> Note: This is for PingID SSO and not PingID Federate.  Steps can be used as a general guide for Ping Federate.

## Instructions

### In Codefresh

1. Navigate to Account Settings > Single Sign-On
1. Select Add Single Sign-on > SAML
1. Fill in the following:
    - **Display Name**: Whatever you want to call the integration
    - **IDP Entry**: enter fake data
    - **Application Certificate**: enter fake data
1. Click Save as we need the information to be generated first before continuing.
1. Click Edit
1. Copy the Assertion URL that is now displayed

### In PingID SSO

1. Log into PingID and select the Environment
1. Go to connections > Applications
1. Click the + to add an application
1. The name and description are to be whatever you want.
1. Select SAML Application
1. Click Configure
1. Select Manually Enter
    - ACS URL: the Assertion URL we copied from Codefresh
    - Entity ID: g.codefresh.io
1. Click Save
1. Go to the Configuration Tab
1. Download X509 Certificate or Metadata
1. Click on Attribute Mappings
1. Add the following mappings
    - email <- Email Address
    - firstName <- Given Name
    - lastName <- Family Name
1. Toggle the Enable option to make this app available

> Note: For PingID Federate you will need to add the follwing mapping: NameID <- Email Address

### Back In Codefresh

1. We are going to fill in the fields with the PingID SSO Information
1. **IDP Entry**: this will be the will be the Single Signon Service URL in PingID SSO
1. **Application Certificate**: Copy and paste the information for the Certificate
    - **Note**: you will get a warning when editing the Certificate section
    - You can use with or without the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` as long the Certificate data is there
1. Click Save

## Test SSO Connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure it is working

1. Go to Account Settings > User & Teams
1. Locate a test user
1. On the SSO Column, select the SSO name to enable SSO for the user
1. In a different browser or private/incognito browser window use the Corporate option to log in
