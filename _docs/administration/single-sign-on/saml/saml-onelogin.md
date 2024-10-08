---
title: OneLogin SSO via SAML
description: Setting Up OneLogin via SAML
redirect_from:
  - /docs/single-sign-on/saml/saml-onelogin/
toc: true
---

Set up SSO for OneLogin using SAML in Codefresh.
For a general overview on SAML, see [Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/).

>**NOTE**  
  If you do not see SAML in the SSO list, please create a support ticket to enable SAML for your account.


Setting up SAML SSO for OneLogin includes:
1. Adding the Codefresh application in OneLogin
1. Configuring SSO settings for OneLogin via SAML in Codefresh
1. Configuring SSO settings for Codefresh in OneLogin

## Step 1: Add Codefresh application in OneLogin

1. From the OneLogin toolbar, **Applications** section,and then select **Add App** on the top right.
1. Search for **SAML Custom Connector (advanced)** and select it.
1. Add a **Display Name**. Leave the other settings which are optional. 
1. Click **Save**.
1. From the sidebar, select **SSO** and keep the tab open.
1. Continue with [Step 2: Configure SSO settings for OneLogin via SAML in Codefresh](#step-2-configure-sso-settings-for-onelogin-via-saml-in-codefresh).

## Step 2: Configure SSO settings for OneLogin via SAML in Codefresh

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.
1. Click **Add single-sign-on**, select **SAML**, and then click **Next**.
1. Enter the connection details: 
  * **Display Name**: Any arbitrary name for this integration.
  * **IDP Entry**: SAML 2.0 Endpoint (HTTP) from the SSO section in OneLogin.
  * **Application Certificate**: X.509 Certificate from the SSO section in OneLogin.  
    Do the following: 
    {::nomarkdown}<ul><li>Click and open <b>View Details</b>, preferably in a new tab.</li><li>Under X.509 Certificate, click <b>Copy</b>.</li><li>Paste the content into the Application Certificate.</li><li>Remove the lines, <code class="highlighter-rouge">-----BEGIN CERTIFICATE-----</code> and <code class="highlighter-rouge">-----END CERTIFICATE-----</code>. </li> </ul>{:/} 
  * **Provider**: Leave empty. 
1. Click **Add**.
  The SAML integration for OneLogin is added and appears in the list of SSOs. 
1. In the Single Sign-On page, click the **Edit** icon for the OneLogin SAML integration you created.
1. Copy the **Assertion URL** (client ID) that was automatically generated when you added the integration. 
1. Continue with [Step 3: Configure SSO settings for Codefresh in OneLogin](#step-3-configure-sso-settings-for-codefresh-in-onelogin).

## Step 3: Configure SSO settings for Codefresh in OneLogin

1. Return to OneLogin, and from the sidebar, select **Configuration**. 
1. Enter the following:
  * **Audience** (EntityID): `g.codefresh.io`.
  * **Recipient**: The Assertion URL you copied in the previous step.
  * **ACS (Consumer) URL Validator**: The Assertion URL in Regex format. For more info on this, view OneLogin's [Setup Page](https://onelogin.service-now.com/support?id=kb_article&sys_id=c89fefdadb2310503de43e043996195a&kb_category=93e869b0db185340d5505eea4b961934){:target="\_blank"}.
  * **ACS (Consumer) URL**: The Assertion URL.
  * **Login URL**: `https://g.codefresh.io/login`
  * **SAML Initiator**: Service Provider.
  * Click **Save**.
1. In OneLogin, go to the [Users](https://cfsupport.onelogin.com/users) page, and do the following:
  * Select the User.
  * Go to **Applications**, and click **+**.
  * Select the SAML App with the Display Name you entered in Codefresh.
  * Click **Continue**.
  * Make sure the **NameID** is set to the email address.
  * Click **Save**.

You have completed SSO integration for OneLogin via SAML.



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
