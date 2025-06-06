---
title: PingID SSO via SAML
description: Setting up PingID SSO via SAML
group: single-sign-on
sub_group: saml
redirect_from:
 - /docs/single-sign-on/saml/saml-pingid/
toc: true
---

Set up SSO for PingID using SAML in Codefresh.
>**NOTE**  
  The configuration described here is for PingID SSO and not PingID Federate. The steps can be used as a general guide for Ping Federate. 

For a general overview on SAML, see [Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/).

>**NOTE**  
  If you do not see SAML in the SSO list, please create a support ticket to enable SAML for your account.

Setting up SAML SSO for PingID includes:
1. Configuring SSO settings for PingID via SAML in Codefresh
1. Configuring SSO settings for Codefresh in PingID
1. Completing SSO configuration for PingID in Codefresh


## Step 1: Configure SSO settings for PingID via SAML in Codefresh

Configure SSO for PingID via SAML in Codefresh. The Assertion URL is automatically generated when you add the integration.

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. From the sidebar, select **Single Sign-On**.  
1. Click **Add single-sign-on**, select **SAML**, and then click **Next**.
1. Enter the connection details: 
  * **Display Name**: Any arbitrary name for this integration.
  * **IDP Entry**: Type in any character. You will enter the correct value from PingID in the final step.
  * **Application Certificate**: Type in any character. You will enter the correct value from PingID in the final step.
  * **Provider**: Leave empty. 
1. Click **Add**.
  The SAML integration for PingID is added and appears in the list of SSOs. 
1. In the Single Sign-On page, click the **Edit** icon for the PingID SAML integration you created.
1. Copy the **Assertion URL** (client ID) that was automatically generated when you added the integration. 
1. Continue with [Step 2: Configure SSO settings for Codefresh in PingID](#step-2-configure-sso-settings-for-codefresh-in-pingid).


## Step 2: Configure SSO settings for Codefresh in PingID


1. Log in to PingID and select the **Environment**.
1. Select **Connections > Applications**.
1. To add Codefresh as a new application, click **+**.
1. Enter the **Application Name** and **Description**.
1. Select **SAML Application** and then click **Configure**.
1. Select **Manually Enter** and define the following:
    - **ACS URL**: The Assertion URL you copied from Codefresh.
    - **Entity ID**: `g.codefresh.io`.
1. Click **Save**.
1. Go to the **Configuration** tab.
1. Download the X509 Certificate or Metadata.
1. Click **Attribute Mappings**, and add the following mappings
    - **email**:Email address
    - **firstName**: Given name
    - **lastName**: Family name

    >**NOTE**    
      For PingID Federate, you must add the following mapping: NameID <- Email Address

1. Toggle the **Enable** option to on to make the application available.
1. Continue with [Step 3: Complete SSO configuration for PingID in Codefresh](#step-3-complete-sso-configuration-for-pingid-in-codefresh).


## Step 3: Complete SSO configuration for PingID in Codefresh
As the final step in configuring SSO for PingID, add the IDP Entry and Certificate values from PingID.

1. **IDP Entry**: The IDP URL from the SSO tab in Jump Cloud.
1. **Application Certificate**: Copy and paste the content between `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` from the certificate you downloaded into the field. You can also include the BEGIN and END lines. 
    >**NOTE**    
      You will get a warning when editing the Certificate section.
1. Click **Save**.

You have completed SSO integration for PingID via SAML in Codefresh.


## Test SSO Connection

Now test the SSO with a test user in a different browser or in a private/incognito tab to make sure the integration works as it should.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon. 
1. From the sidebar, select **Users & Teams**.   
1. Locate a test user, and from the SSO list, select the integration name to enable SSO for that user.
1. In a different browser or private/incognito browser window use the Corporate option to log in.

## Related articles
[About Federated Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/)  
[Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/)  