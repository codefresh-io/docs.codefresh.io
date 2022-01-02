---
title: "OneLogin Single Sign-On (SSO)"
description: " "
group: administration
sub_group: single-sign-on
redirect_from:
  - /docs/enterprise/single-sign-on/sso-onelogin/
toc: true
---

In this page we will see the process of setting up OneLogin SSO with Codefresh. For the general instructions of SSO setup
see the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/).


## Set up OneLogin as an Identity provider


1. Configure app on the OneLogin dashboard:
  {:start="1"}
  1. Log in to the [OneLogin Administration Dashboard](https://www.onelogin.com/), and select **Apps > Add Apps**.
    
    {% include image.html 
    lightbox="true" 
    file="/images/administration/sso/onelogin/step1.png" 
    url="/images/administration/sso/onelogin/step1.png"
    alt="OneLogin Dashboard"
    caption="OneLogin Dashboard"
    max-width="40%"
    %}
  {:start="2"}  
  1. Find **OpenId Connect (OIDC)** app using the search field.
    
   {% include image.html 
    lightbox="true" 
    file="/images/administration/sso/onelogin/step2.png" 
    url="/images/administration/sso/onelogin/step2.png"
    alt="Locating the OpenId Connect App"
    caption="Locating the OpenId Connect App"
    max-width="100%"
    %}
  {:start="3"}
  1. Setup a Codefresh application.
    
    {% include image.html 
    lightbox="true" 
    file="/images/administration/sso/onelogin/step3.png" 
    url="/images/administration/sso/onelogin/step3.png"
    alt="Adding a new application"
    caption="Adding a new application"
    max-width="90%"
    %}
  {:start="4"} 
  1. From the sidebar, select **SSO** and copy the **Client ID** and the **Client Secret**.  
     Set **Application Type** to **Web**, and **Token endpoint Authentication** to **POST**.
    
    {% include image.html 
    lightbox="true" 
    file="/images/administration/sso/onelogin/step4-post.png" 
    url="/images/administration/sso/onelogin/step4-post.png"
    alt="Copying the values of Client ID and Secret"
    caption="Copying the values of Client ID and Secret"
    max-width="90%"
    %}

### Configure SSO for OneLogin in CSDP

1. In CSDP, go to [SSO Settings](https://g.codefresh.io/account-admin/sso), and select **OneLogin**.
  
    {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/onelogin/step5.png" 
  url="/images/administration/sso/onelogin/step5.png"
  alt="Select OneLogin for SSO"
  caption="Select OneLogin for SSO"
  max-width="20%"
  %}

{:start="2"}
1. Enter the following:
  * **CLIENT NAME**: For auto-generation, leave empty. CSDP generates the client name once you save the settings.
  * **DISPLAY NAME**: Friendly SSO name (arbitrary).  
  * **CLIENT ID**: The Client ID you copied from OneLogin.
  * **CLIENT SECRET**: The Client Secret you copied from OneLogin.
  * **DOMAIN**: Optional. The domain to be used for authentication, only for users who must connect via a custom domain.
  * **API CLIENT ID** and **API CLIENT SECRET**: Used for [team sync]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#syncing-of-teams-after-initial-sso-setup) only. For details, see the [official documentation](https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials).
   
   {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/onelogin/codefresh-settings.png" 
  url="/images/administration/sso/onelogin/codefresh-settings.png"
  alt="CSDP SSO settings for OneLogin"
  caption="CSDP SSO settings for OneLogin"
  max-width="90%"
  %}

{:start="3"}
1. Select **Save**. Codefresh generates the client name.  Note this down.
  
   {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/onelogin/step7.png" 
  url="/images/administration/sso/onelogin/step7.png"
  alt="Getting the auto-generated Client Name"
  caption="Getting the auto-generated Client Name"
  max-width="90%"
  %}

 

### Set up login and redirect URIs

Go back to the OneLogin dashboard.

Use the Client Name from the previous section to generate the Login URL and Redirect URIs:

* Example Client Name: `t0nlUJoqQlDv`
* Example Login Url: `https://g.codefresh.io/api/auth/t0nlUJoqQlDv`
* Example Redirect URI: `https://g.codefresh.io/api/auth/t0nlUJoqQlDv/callback`

{% include image.html 
lightbox="true" 
file="/images/administration/sso/onelogin/step8.png" 
url="/images/administration/sso/onelogin/step8.png"
alt="Login and Redirect URI"
caption="Login and Redirect URI"
max-width="90%"
%}

You have now completed SSO setup for OneLogin. 

#### What to read next
See the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider) on how to test the integration, activate SSO for collaborators and create sync jobs.