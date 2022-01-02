---
title: "Azure Single Sign-On (SSO)"
description: " "
group: administration
sub_group: single-sign-on
redirect_from:
  - /docs/enterprise/single-sign-on/sso-azure/
toc: true
---

Setting up SSO for Azure in CSDP, requires you to register CSDP in Azure AD with the required permissions and the client secret, configure the SSO settings in CSDP, and then define the Client ID in Azure AD.  
For general instructions on SSO setup, see the [overview]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/).

### Prerequisites
* Azure user roles: *Application Administrator* or *Global Administrator* roles.  
  These roles are required after the SSO integration is complete to [sync teams from Azure to Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#syncing-of-teams-after-initial-sso-setup).


### Register CSDP in Azure AD
Register the CSDP application in Azure AD.

1.  Log in to **Azure Portal**, and from the sidebar, select **Azure Active Directory**.
  
  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/1-azure-service.png" 
  url="/images/administration/sso/azure/1-azure-service.png"
  alt="Azure Active Directory"
  caption="Azure Active Directory"
  max-width="70%"
  %}

{:start="2"}
1. From the sidebar, select **App registrations**.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/2-app-registrations.png" 
  url="/images/administration/sso/azure/2-app-registrations.png"
  alt="Azure App Registrations"
  caption="Azure App Registrations"
  max-width="70%"
  %}

{:start="3"}
1. To add the new application, select **+ New registration**.  
   Enter a name for the application, e.g. Codefresh, and for all other options, retain default settings.

   {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/3-register-an-app.png" 
  url="/images/administration/sso/azure/3-register-an-app.png"
  alt="Azure App Registration creation"
  caption="Azure App Registration creation"
  max-width="70%"
  %}
{:start="4"}
1. To apply your changes, select **Register**. The application is now registered in Azure AD. 


### Configure permissions for CSDP

After registering CSDP, configure the permissions. 

1. Select the application name to open **Settings**.
1. Select **API permissions**.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/5-api-permissions.png" 
  url="/images/administration/sso/azure/5-api-permissions.png"
  alt="Azure App API Permissions"
  caption="Azure App API Permissions"
  max-width="70%"
  %}
{:start="3"}
1. To change access levels, select **Add a permission**.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/6-request-api-permissions.png" 
  url="/images/administration/sso/azure/6-request-api-permissions.png"
  alt="Azure App Change Permissions"
  caption="Azure App Change Permissions"
  max-width="70%"
  %}
{:start="4"}
1. Find and select **Azure Active Directory Graph**.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/7-request-api-permissions.png" 
  url="/images/administration/sso/azure/7-request-api-permissions.png"
  alt="Azure Active Directory Graph entry"
  caption="Azure Active Directory Graph entry"
  max-width="70%"
  %}
{:start="5"}
1. Select **Application permissions**, and select the following permissions:  
  * `Directory.Read.All`
  * `Group.Read.All`
  * `User.Read.All`

   >Note:  
    User.Read for the type of delegated is required. This permission is usually added by default. 

{:start="6"}
1. Select **Apply Permissions**.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/ApplicationPermissions.png" 
  url="/images/administration/sso/azure/ApplicationPermissions.png"
  alt="API Permissions"
  caption="API Permissions"
  max-width="70%"
  %}

{:start="7"}
1. From the bar on the top, select **Grant admin consent**.

### Create Client Secret

1. From the sidebar, select **Certificates & secrets**.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/9-Create-secret-page.png" 
  url="/images/administration/sso/azure/9-Create-secret-page.png"
  alt="Change keys"
  caption="Change keys"
  max-width="70%"
  %}
{:start="2"}
1. Select **New Client secret**, and add a description (arbitrary name).

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/10-Add-client-secret.png" 
  url="/images/administration/sso/azure/10-Add-client-secret.png"
  alt="Add a client secret"
  caption="Add a client secret"
  max-width="70%"
  %}
{:start="3"}
1. Select the desired duration.
  >**Important:** If you select a key with an expiration date, record the expiration date in your calendar. Remember to renew the key before the expiration date to ensure that users don't experience a service interruption.
1. To display the key, select **Add**.
1. Copy the value of the key as you will need this when you configure the SSO settings for Azure in CSDP.

### Configure SSO for Azure in CSDP

1. In CSDP, go to the SSO settings screen, as described in the [first part of this guide]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/#identity-provider-options).
1. Enter the following, using the information in the overview page of your application registration:
  
  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/ObjectId.png" 
  url="/images/administration/sso/azure/ObjectId.png"
  alt="SSO settings for Azure in CSDP"
  caption="SSO settings for Azure in CSDP"
  max-width="70%"
  %}

  * **Client Name**: For auto-generation, leave empty. CSDP generates the client name once you save the settings. CSDP automatically assigns a `client-name` to it which identifies the SSO configuration.
  * **Display Name**: The display name in Azure
  * **Application ID**: The Application ID in Azure
  * **Client secret**: The key value you copied when you created the client secret in Azure
  * **Tenant**: `<Your Microsoft Azure AD Domain>.onmicrosoft.com`
  * **Object ID**: Your Azure Service Principal Object ID (from Enterprise Application configuration) 
  * **Auto Sync users and teams to Codefresh**: Select to automatically sync user accounts in Azure AD to your CSDP account. Optionally, define the time interval at which to sync, in hours, from 1 to 24. If you don't specify an interval, the sync interval is every 12 hours.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/client-name.png" 
  url="/images/administration/sso/azure/client-name.png"
  alt="SSO Client Name"
  caption="SSO Client Name"
  max-width="50%"
  %}
  You need this value when you configure the reply URL in the Azure portal.

### Configure reply URLs
This is the final step in SSO setup for Azure. Add the CSDP callback URL to the allowed reply URLs for the created application in Azure AD. 
1. Go to **Azure Active Directory > Apps registrations**, and select your app. 
1. Select **Add a Redirect URI**, and define:

  ```
  https://g.codefresh.io/api/auth/<your_codefresh_sso_client_name>/callback

  ```

  where: `<your_codefresh_sso_client_name>` is the Client Name in the SSO configuration, either defined by you or created by CSDP. 
  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/12-set-reply-URL.png" 
  url="/images/administration/sso/azure/12-set-reply-URL.png"
  alt="Reply URLs"
  caption="Reply URLs"
  max-width="70%"
  %}
{:start="3"}
1. On the same page, scroll down and select **ID tokens**.

  {% include image.html 
  lightbox="true" 
  file="/images/administration/sso/azure/13-Enable-ID-Tokens.png" 
  url="/images/administration/sso/azure/13-Enable-ID-Tokens.png"
  alt="Reply URLs"
  caption="Reply URLs"
  max-width="70%"
  %}

You have now completed the SSO setup for Azure. 

##### What to read next
See the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider) on how to test the integration, activate SSO for collaborators and create sync jobs.
