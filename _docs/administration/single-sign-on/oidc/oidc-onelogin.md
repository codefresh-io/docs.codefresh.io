---
title: "OneLogin SSO via OIDC"
description: "Set up OneLogin SSO for OIDC "
redirect_from:
  - /docs/enterprise/single-sign-on/sso-onelogin/
  - /docs/single-sign-on/oidc/oidc-onelogin/
toc: true
---

Set up SSO for OneLogin using OIDC.  
For a general overview on OIDC, see [Setting up OIDC Federated SSO]({{site.baseurl}}/docs/single-sign-on/oidc).  

Set up OIDC SSO for OneLogin in Codefresh by:
1. Setting up OneLogin as an IdP 
1. Configuring SSO settings for OneLogin in Codefresh
1. Configuring URIs in Okta

## Step 1: Set up OneLogin as an identity provider for Codefresh
Configure the application in the OneLogin dashboard.

1. Log in to the [OneLogin Administration Dashboard](https://www.onelogin.com/){:target="\_blank"}, and select **Apps > Add Apps**.
    
    {% include image.html 
    lightbox="true" 
    file="/images/sso/onelogin/step1.png" 
    url="/images/sso/onelogin/step1.png"
    alt="OneLogin Dashboard"
    caption="OneLogin Dashboard"
    max-width="50%"
    %}
  
{:start="2"}  
1. Find **OpenId Connect (OIDC)** app using the search field.
    
   {% include image.html 
    lightbox="true" 
    file="/images/sso/onelogin/step2.png" 
    url="/images/sso/onelogin/step2.png"
    alt="Locating the OpenId Connect App"
    caption="Locating the OpenId Connect App"
    max-width="50%"
    %}

{:start="3"} 
1. Set up a Codefresh application.
    
    {% include image.html 
    lightbox="true" 
    file="/images/sso/onelogin/step3.png" 
    url="/images/sso/onelogin/step3.png"
    alt="Adding a new application"
    caption="Adding a new application"
    max-width="50%"
    %}

{:start="4"} 
1. From the sidebar, select **SSO** and copy the **Client ID** and the **Client Secret**.  
     Set **Application Type** to **Web**, and **Token endpoint Authentication** to **POST**.
    
    {% include image.html 
    lightbox="true" 
    file="/images/sso/onelogin/step4-post.png" 
    url="/images/sso/onelogin/step4-post.png"
    alt="Copying the values of Client ID and Secret"
    caption="Copying the values of Client ID and Secret"
    max-width="50%"
    %}

{:start="5"} 
1. Continue with [Step 2: Configure SSO for OneLogin in Codefresh](#step-2-configure-sso-for-onelogin-in-codefresh). 

## Step 2: Configure SSO for OneLogin in Codefresh

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.
1. Select **+ Add Single Sign-On** and then select **OneLogin**.  

    {% include image.html 
  lightbox="true" 
  file="/images/sso/onelogin/sso-codefresh-settings.png" 
  url="/images/sso/onelogin/sso-codefresh-settings.png"
  alt="SSO settings for OneLogin in Codefresh"
  caption="SSO settings for OneLogin in Codefresh"
  max-width="50%"
  %}

{:start="4"}
1. Enter the following:
  * **Client Name**: For auto-generation, leave empty. Codefresh generates the client name once you save the settings.
  * **Display Name**: Friendly SSO name (arbitrary).  
  * **Client ID**: The Client ID you copied from OneLogin.
  * **Client Secret**: The Client Secret you copied from OneLogin.
  * **Domain**: Optional. The domain to be used for authentication, only for users who must connect via a custom domain.
  * **API CLIENT ID** and **API CLIENT SECRET**: Relevant only if **Auto Sync users and teams to Codefresh** is selected. For details, see the [official documentation](https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials){:target="\_blank"}.
  * **Auto Sync users and teams to Codefresh**: Select to automatically sync user accounts in Azure AD to your Codefresh account. Optionally, define the time interval, in hours, at which to sync, from 1 to 24. If you don’t specify an interval, the sync is every 12 hours.

{:start="5"}
1. Select **+ Add**. Codefresh generates the client name.  Note this down.
  
   {% include image.html 
  lightbox="true" 
  file="/images/sso/onelogin/step7.png" 
  url="/images/sso/onelogin/step7.png"
  alt="Getting the auto-generated Client Name"
  caption="Getting the auto-generated Client Name"
  max-width="100%"
  %}

{:start="6"}
1. Continue with [Step 3: Set up login and redirect URIs in OneLogin](#step-3-set-up-login-and-redirect-uris-in-onelogin).

## Step 3: Set up login and redirect URIs in OneLogin

Go back to the OneLogin dashboard.

Use the Client Name from the previous section to generate the Login URL and Redirect URIs:

* Example Client Name: `t0nlUJoqQlDv`
* Example Login Url: `https://g.codefresh.io/api/auth/t0nlUJoqQlDv`
* Example Redirect URI: `https://g.codefresh.io/api/auth/t0nlUJoqQlDv/callback`

{% include image.html 
lightbox="true" 
file="/images/sso/onelogin/step8.png" 
url="/images/sso/onelogin/step8.png"
alt="Login and Redirect URI"
caption="Login and Redirect URI"
max-width="50%"
%}

You have now completed SSO setup for OneLogin via OIDC. 

## Related articles
[Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/single-sign-on/single-sign-on/)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/single-sign-on/team-sync)  