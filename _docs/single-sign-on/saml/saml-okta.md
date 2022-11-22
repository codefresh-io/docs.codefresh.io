---
title: Okta (SAML)
description: Setting Up Okta via SAML
group: single-sign-on
sub_group: saml
toc: true
---

## Set up SSO for Okta with SAML
Below describes how to set up Okta for Single Sign-On with Codefresh using SAML.  
>If you do not have the SAML option, please create a support ticket enable SAML for the account.

### Create a SAML account in Codefresh
Create a SAML account in Codefresh to get the required information to create an integration for Codefresh in Okta.

1. Go to **Account Settings > Single Sign-On**.
1. Click **Add Single Sign On**, and select **SAML**.
1. Define the following:
    - **Display Name**: Any name you want to call the integration.
    - **IDP Entry**: Type in any character.
    - **Application Cert**: Type in any character.
1. Click **Save**, and then **Edit** so you can copy the information.

### Configure settings SAML for Codefresh in Okta

1. Navigate to **Applications**.
1. Select **Create App Integration > SAML2.0**, and click **Next**.
1. General Settings:
    - Fill in the Name and any other settings you want
    - Click **Next**.
1. Configure SAML:
    - **Single Sign On URL**: The Assertion URL / Callback URL in Codefresh
    - **Audience URL**: `g.codefresh.io`
    - **Name ID Format**: `EmailAddress`
    - Attribute Statements
        - Leave "Name Format" as Unspecified
        - **firstName**: `user.firstName`
        - **lastName**: `user.lastName`
        - **email**: `user.email`
    - Click **Next**.
1. Feedback
    - Fill this out if showing
    - Finish
1. Sign On Tab
    - Select **View SAML Setup Instructions** on the right hand side
    - Keep this open as we need it to complete the setup for Okta in Codefresh.

### Configure SSO settings for OKta in Codefresh

Complete SSO setup for Okta via SMAL in Codefresh. 

1. **IDP Entry**: Identity Provider Single Sign-On URL in Okta.
1. **Application Certificate**: The X.509 Certificate
    - **Note**: you will get a warning when editing the Certificate section
    - Include the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----`
1. Click **Save**.

## Test SSO Connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure it is working.

1. Go to Account Settings > User & Teams.
1. Locate a test user.
1. On the SSO Column, select the SSO name to enable SSO for the user.
1. In a different browser or private/incognito browser window use the Corporate SSO option to log in.
