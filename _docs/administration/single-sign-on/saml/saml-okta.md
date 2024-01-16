---
title: Okta SSO via SAML
description: Setting up Okta via SAML
redirect_from:
  - /docs/single-sign-on/saml/saml-okta/
toc: true
---

Set up SSO for OKta using SAML.
For a general overview on SAML, see [Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/).

>**NOTE**  
  If you do not see SAML in the SSO list, please create a support ticket to enable SAML for your account.

Setting up SAML SSO for Okta includes:
1. Configuring SSO settings for Okta via SAML in Codefresh
1. Configuring SSO settings for Codefresh in JumpCloud
1. Completing SSO configuration for JumpCloud in Codefresh

## Step 1: Configure SSO settings for Okta via SAML in Codefresh
Create a SAML account for Okta in Codefresh  to create an integration for Codefresh in Okta.


SAML SSO settings for Okta include auto-syncing teams and groups in OKta with Codefresh, and automatically activating new users synced to Codefresh.

{{site.data.callout.callout_tip}}
**TIP**  
  Use the auto-sync and activate user options for Just in Time (JIT) Provisioning.
{{site.data.callout.end}}

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.   
1. Click **Add single-sign-on**, select **SAML**, and then click **Next**.
1. Enter the connection details: 
  * **Display Name**: Any name you want for the integration.
  * **IDP Entry**: Type in any character. You will enter the correct value from Okta in the final step.
  * **Application Certificate**: You will enter the correct value from Okta in the final step.
  * **Provider**: Select **Okta**. 
  * **Auto-sync users and teams to Codefresh**: Optional. When selected, automatically syncs teams or groups in Okta to Codefresh, every 12 hours by default. You can define a different sync interval in **Sync interval**.
      >**NOTE**    
      Though you can assign an Okta application to both groups and individual users, Codefresh _only syncs users who are part of teams_.<br>  
      New users in Okta, _not_ assigned to a team, are **NOT** synced with Codefresh. You should first assign the user to a team for the sync to work.
  * **Activate user after sync**: Optional. When selected, Codefresh automatically invites and activates new users added during the automated sync, without waiting for the users to accept the invitations.
  * **Access Token**: Optional. The OKTA API token that you generated in Okta, used to sync groups and their users from OKTA to Codefresh. 
  * **Client Host**: The OKTA organization URL, for example, `https://<company>.okta.com`.   
  * **Application ID**: The Codefresh application ID in your OKTA organization, that will be used to sync groups and user from OKTA to Codefresh. 
1. Click **Add**.
  The SAML integration for Okta is added and appears in the list of SSOs. 
1. In the Single Sign-On page, click the **Edit** icon for the Okta SAML integration you created.
1. Copy the **Assertion URL** (client ID) that was automatically generated when you added the integration. 
1. Continue with [Step 2: Configure SSO settings for Codefresh in Okta](#step-2-configure-sso-settings-for-codefresh-in-okta).

## Step 2: Configure SSO settings for Codefresh in Okta

1. Navigate to **Applications**.
1. Select **Create App Integration > SAML2.0**, and click **Next**.
1. General Settings:
    - Fill in the Name and any other settings you need.
    - Click **Next**.
1. Configure SAML:
    - **Single Sign On URL**:     
    - **ACS URL**: Enter the Assertion URL (Callback URL) generated in Codefresh.
    - **Audience URL**: `g.codefresh.io`
    - **Name ID Format**: `EmailAddress`
    - Attribute Statements
        - Leave **Name Format** as Unspecified
        - **firstName**: `user.firstName`
        - **lastName**: `user.lastName`
        - **email**: `user.email`
    - Click **Next**.
1. Feedback:
    - If displayed, complete the form.
    - Click **Finish**.
1. Sign On Tab:
    - Select **View SAML Setup Instructions** on the right.
    - Keep the page open as you will need it to complete the setup for Okta in Codefresh.
1. Continue with [Step 3: Configure SSO settings for Codefresh in Okta](#step-3-complete-sso-configuration-for-okta-in-codefresh).


## Step 3: Complete SSO configuration for Okta in Codefresh
Complete SSO setup for Okta via SAML in Codefresh. 

1. **IDP Entry**: The IDP URL from the SSO tab in Okta.
1. **Application Certificate**: Copy and paste the content between `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` from the certificate you downloaded into the field. You can also include the BEGIN and END lines. 
    >**NOTE**  
      You will get a warning when editing the Certificate section.
1. Click **Save**.

You have completed SSO integration for OKta via SAML in Codefresh.

## Test SSO connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure the integration works as it should.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From the sidebar, below Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.   
1. Locate a test user, and from the SSO list, select the integration name to enable SSO for that user.
1. In a different browser or private/incognito browser window use the Corporate option to log in.

## Related articles
[Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/administration/single-sign-on/)  
[Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/administration/single-sign-on/team-sync)  