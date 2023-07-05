---
title: "Keycloak SSO via OIDC"
description: "Set up Keycloak SSO for OIDC"
redirect_from:
  - /docs/single-sign-on/oidc/oidc-keycloak/
toc: true
---
Set up SSO for Keycloak using OIDC.
For a general overview on OIDC, see [Setting up OIDC Federated SSO]({{site.baseurl}}/docs/single-sign-on/oidc).  

Set up OIDC SSO for Keycloak in Codefresh by:
1. Creating a client in Keycloak
1. Configuring SSO settings for Keycloak in Codefresh
1. Configuring redirect URIs in Keycloak

>**IMPORTANT**:  
 >KeycloakServer changed `/auth` endpoint from version 17.0.0. Currently, Codefresh does not support Keycloak version 17.0.0 or higher.  
 >As a workaround, start KeycloakServer with this parameter:  `--http-relative-path=/auth/`.


## Step 1: Create Client in Keycloak

Create a Keycloak client for Codefresh.

1. Log in to Keycloak.
1. Select the Realm, and from the sidebar, select **Clients**.
1. Click **Create Client**, and the **Clients list** tab.
1. Define the General Settings: 
    1. From the **Client type** drop-down, select **OpenID Connect**. 
    1. In the **Client ID** field, enter `g.codefresh.io`.  
    1. In the **Name** field, enter a display name for the client, for example, `Codefresh`.   
    1. Click **Next**. 
    
    {% include image.html 
       lightbox="true" 
       file="/images/sso/keycloak/create-client-general-settings.png" 
       url="/images/sso/keycloak/create-client-general-settings.png"
       alt="General Settings for Codefresh client in Keycloak"
       caption="General Settings for Codefresh client in Keycloak"
       max-width="70%"
       %}

{:start="5"}    
1.  Define the Capablity config settings:
    1. Toggle **Client authentication** to ON.
    1. Click **Save**.
    
        {% include image.html 
       lightbox="true" 
       file="/images/sso/keycloak/create-client-capability-config-settings.png" 
       url="/images/sso/keycloak/create-client-capability-config-settings.png"
       alt="Capablity config settings for Codefresh client in Keycloak"
       caption="Capablity config settings for Codefresh client in Keycloak"
       max-width="70%"
       %}

{:start="6"}
1. Copy and paste the following:
    1. Go back to Settings.
    1. From the General Settings tab, copy the **Client ID** to your machine.
    1. Click the **Credentials** tab, and copy and paste the **Client secret** to your machine. 
    1. From the sidebar, select **Realm Settings**, and copy and paste the **Realm ID**. 
  You will need the Client ID, Client Secret, and Realm ID to configure SSO for Keycloak in Codefresh.
1. Continue with [Step 2: Configure SSO settings for Keycloak in Codefresh](#step-2-configure-sso-settings-for-keycloak-in-codefresh).

## Step 2: Configure SSO settings for Keycloak in Codefresh
<br>

**Before you begin**  
* Make sure you have:
  * The **Client ID**, **Client Secret**, and **Realm ID** from Keycloak in Step 1

**How to**  

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.
1. Click **+ Add Single Sign-On**, select **Keycloak**, and then click **Next**.
1. Enter the following: 
  * **Client Name**: For auto-generation, leave empty. Codefresh generates the client name once you save the settings.  
  * **Display Name**: Meaningful name that identifies the integration with this SSO provider.
  * **Client ID**: The Client ID for Codefresh you copied from Keycloak.  
  * **Client Secret**: The Client Secret for Codefresh you also copied from Keycloak. 
  * **Host**: The Keycloak URL.
  * **Realm**: Optional. The Realm ID for Codefresh you copied from Keycloak.

 {% include image.html 
 lightbox="true" 
 file="/images/sso/keycloak/sso-keycloak-settings-codefresh.png" 
  url="/images/sso/keycloak/sso-keycloak-settings-codefresh.png"
  alt="SSO settings for Keycloak in Codefresh"
  caption="SSO settings for Keycloak in Codefresh"
  max-width="40%"
  %}

{:start="5"}
1. Click **Add**. Codefresh creates Keycloak as an identity provider, with the auto-generated Client Name. 

  {% include image.html 
  lightbox="true" 
  file="/images/sso/keycloak/keycloak-auto-generated-client-name.png" 
  url="/images/sso/keycloak/keycloak-auto-generated-client-name.png"
  alt="Getting the auto-generated Client Name"
  caption="Getting the auto-generated Client Name"
  max-width="90%"
  %}

{:start="6"}
1. Note down the Client Name, as you need it to set the redirect URI in Keycloak.
1. Continue with [Step 3: Set up Redirect URI in Keycloak](#step-3-set-up-redirect-uri-in-keycloak).

## Step 3: Set up Redirect URI in Keycloak
1. Log in again to Keycloak. 
1. From the sidebar, select **Clients** and then select **Codefresh** from the Clients List.
1. Click the **Settings** tab, and then define the **Access Settings**:
    1. In the **Root URL** and **Home URL** fields, enter `https://g.codefresh.io`.
    1. In the **Valid redirect URIs** field, enter `https://g.codefresh.io/api/auth/<your_codefresh_client_name>/callback`  
       where: `<your_codefresh_client_name>` is the Client Name auto-generated by Codefresh, for example, `https://g.codefresh.io/api/auth/ruUtQOzX4T0D/callback`.

    1. Click **Save**.
  

You have now completed SSO setup for Keycloak via OIDC.

## Sync teams via CLI
Sync users and teams through the [CLI]({{site.baseurl}}/docs/single-sign-on/team-sync/#cli-synchronize-teams).

## Related articles
[Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/single-sign-on/single-sign-on/)  
[Setting up OIDC Federated SSO]({{site.baseurl}}/docs/single-sign-on/oidc)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/single-sign-on/team-sync)  