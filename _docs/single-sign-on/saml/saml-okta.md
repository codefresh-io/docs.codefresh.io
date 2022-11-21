---
title: Okta (SAML)
description: Setting Up Okta via SAML
group: single-sign-on
sub_group: saml
toc: true
---

## Setup Instructions

Below describes how to set up Okta for Single Sing On with Codefresh using SAML.  If you do not have the SAML option, please create a support ticket enable SAML for the account account.

### In Codefresh

1. Go to Account Settings > Single Sign On
1. Select Add Single Sign On > SAML
1. We need to create an Entry with temp info since we need Codefresh information first for Okta
    - **Display Name**: Name you want to call the integration
    - **IDP Entry**: type in any character
    - **Application Cert**: type in any character
1. Save
1. Click Edit, and we will come back for the information

### In Okta

1. Navigate to Applications
1. Select Create App Integration > SAML2.0
1. Next
1. General Settings
    - Fill in the Name and any other settings you want
    - Next
1. Configure SAML
    - **Single Sign On URL**: The Assertion URL / Callback URL in Codefresh
    - **Audiance URL**: `g.codefresh.io`
    - **Name ID Format**: `EmailAddress`
    - Attribute Statements
        - Leave "Name Format" as Unspecified
        - **firstName**: `user.firstName`
        - **lastName**: `user.lastName`
        - **email**: `user.email`
    - Next
1. Feedback
    - Fill this out if showing
    - Finish
1. Sign On Tab
    - Select **View SAML Setup Instructions** on the right hand side
    - Keep this open as we need it for Codefresh

### Back in Codefresh

1. We are going to fill in the fields with the Okta Inforamtion
1. **IDP Entry**: Identity Provider Single Sign-On URL in Okta
1. **Application Certificate**: The X.509 Certificate
    - **Note**: you will get a warning when editing the Certificate section
    - Inclucde the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`
1. Save

## Test SSO Connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure it is working.

1. Go to Account Settings > User & Teams
1. Locate a test user
1. On the SSO Column, select the SSO name to enable SSO for the user
1. In a different browser or private/incognito browser window use the Corporate SSO option to log in
