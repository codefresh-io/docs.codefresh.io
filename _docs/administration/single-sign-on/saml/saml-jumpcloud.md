---
title: JumpCloud SSO via SAML
description: Set up JumpCloud via SAML
redirect_from:
  - /docs/single-sign-on/saml/saml-jumpcloud/
toc: true
---

Set up SSO for JumpCloud using SAML.
For a general overview on SAML, see [Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/).

>**NOTE**  
  If you do not see SAML in the SSO list, please create a support ticket to enable SAML for your account.

Set up SAML SSO for JumpCloud by:
1. Configuring SSO settings for JumpCloud via SAML in Codefresh
1. Configuring SSO settings for Codefresh in JumpCloud
1. Completing SSO configuration for JumpCloud in Codefresh

## Step 1: Configure SSO settings for JumpCloud via SAML in Codefresh

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.  
1. Click **Add single-sign-on**, select **SAML**, and then click **Next**.
1. Enter the connection details: 
  * **Display Name**: Any arbitrary name for this integration.
  * **IDP Entry**: Type in any character for now. You will enter the correct value from JumpCloud in the final step.
  * **Application Certificate**: You will enter the correct value from JumpCloud in the final step.
  * **Provider**: Leave empty. 
1. Click **Add**.
  The SAML integration for JumpCloud is added and appears in the list of SSOs. 
1. In the Single Sign-On page, click the **Edit** icon for the JumpCloud SAML integration you created.
1. Copy the **Assertion URL** (client ID) that was automatically generated when you added the integration. 
1. Continue with [Step 2: Configure SSO settings for Codefresh in JumpCloud](#step-2-configure-sso-settings-for-codefresh-in-jumpcloud).

## Step 2: Configure SSO settings for Codefresh in JumpCloud


1. In JumpCloud, go to **User Authentication > SSO**.
1. To configure Codefresh as a new application, click **+**.
1. Select **Custom SAML**.
1. Add a **Display Label** for the application you will create.
1. Click the **SSO** tab, and enter the following:
    1. **IDP Entity ID**: Enter the user-defined or generated Client Name from Codefresh. For example, `gujNGnhXTSmK`.
        {{site.data.callout.callout_tip}}
        **TIP**  
        Make sure there no spaces before the name when copying and pasting.
        {{site.data.callout.end}}
        
    1. **SP Entity ID**: `g.codefresh.io`.
    1. **ACS URL**: Enter the Assertion URL (Callback URL) generated in Codefresh.
    1. **Login URL**: Enter the Assertion URL without the `/callback`.
    1. **IDP URL**: Add a custom name or leave the default. You will need the value to complete the SSO configuration in Codefresh.
    1. **Attributes**: Add the following:
        - **email**: email
        - **firstName**: firstname
        - **lastName**: lastname
    1. Click **Activate** and **Continue**.
1. When you get a notification on the top right to download the Certificate, download the Certificate.
1. Continue with [Step 3: Complete SSO configuration for JumpCloud in Codefresh](#step-3-complete-sso-configuration-for-jumpcloud-in-codefresh).

## Step 3: Complete SSO configuration for JumpCloud in Codefresh
As the final step in configuring SSO for JumpCloud, add the IDP Entry and Certificate values from JumpCloud.
 
1. **IDP Entry**: The IDP URL from the SSO tab in Jump Cloud.
1. **Application Certificate**: Copy and paste the content between the `-----BEGIN CERTIFICATE-----` and  `-----END CERTIFICATE-----` lines, from the certificate you downloaded into the field. 
    >**NOTE**    
      You will get a warning when editing the Certificate section.
1. Click **Save**.

You have completed SSO integration for JumpCloud via SAML in Codefresh.

## Test SSO Connection

Now test the SSO with a test user in a different browser or private/incognito browser to make sure the integration works as it should.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From the sidebar, below Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.   
1. Locate a test user, and from the SSO list, select the integration name to enable SSO for that user.
1. In a different browser or private/incognito browser window use the Corporate option to log in.

## Related articles
[Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/administration/single-sign-on/)  
[Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/)  