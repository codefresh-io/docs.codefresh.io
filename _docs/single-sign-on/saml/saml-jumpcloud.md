---
title: JumpCloud (SAML)
description: Setting Up JumpCloud via SAML
group: single-sign-on
sub_group: saml
toc: true
---

## Setup Instructions

Below describes how to set up JumpCloud for Single Sign-On with Codefresh using SAML.  If you do not have the SAML option, please create a support ticket enable SAML for the account.
### In Codefresh

1. Go to Account settings > Single Sign On
1. Select Add Single Sign On > SAML
1. We need to create an Entry with temp info since we need Codefresh information first for JumpCloud
    - **Display Name**: Name you want
    - **IDP Entry**: type in any character
    - **Application Cert**: type in any character
1. Save
1. Click Edit, and we will come back for the information

### In JumpCloud

1. Go to the SSO Section
1. Click the Green +
1. Select Custom SAML
1. Add a Display Label (can be what you want)
1. Click the SSO Tab
    1. **IDP Entity ID**: On the Codefresh side, this is the Client Name
        - Example: gujNGnhXTSmK
        - Make sure there is no space in front when copy and pasting
    1. **SP Entity ID**: g.codefresh.io
    1. **ACS URL**: On the Codefresh side, this is the Assertion URL
        - Also known as the callback URL
    1. **Login URL**: On the Codefresh side, this is the Assertion URL without the /callback
    1. **IDP URL**: Can add a custom name at the end or leave it as default
    1. **Attributes**: add the following
        - **email**: email
        - **firstName**: firstname
        - **lastName**: lastname
    1. Activate
    1. Continue
1. Once saved, you will get a notification on the top right to download the Certificate. Download the Certificate

### Back In Codefresh

1. We are going to fill in the fields with the JumpCloud Information
1. **IDP Entry**: this will be the IDP URL from the SSO Tab in Jump Cloud
1. **Application Certificate**: Copy and paste the information from the Certificate we downloaded.
    - **Note**: you will get a warning when editing the Certificate section
    - You can use with or without the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` as long the Certificate data is there
1. Click Save

## Test SSO Connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure it is working

1. Go to Account Settings > User & Teams
1. Locate a test user
1. On the SSO Column, select the SSO name to enable SSO for the user
1. In a different browser or private/incognito browser window use the Corporate option to log in
