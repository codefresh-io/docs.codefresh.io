---
title: "Azure SSO via OIDC"
description: "Set up Azure SSO for OIDC"
redirect_from:
  - /docs/enterprise/single-sign-on/sso-azure/
  - /docs/single-sign-on/oidc/oidc-azure/
toc: true
---

For a general overview of OIDC, see [Setting up OIDC Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/oidc/).  

Set up OIDC SSO for Azure in Codefresh by:  
1. Registering the Codefresh application in Azure
1. Configuring permissions for the Codefresh application in Azure
1. Creating the Client secret in Azure
1. Completing SSO configuration for Azure in Codefresh
1. Configuring redirect URIs in Azure

## Prerequisites

Make sure that your user in Azure who creates the application is assigned either of these roles:  
- **Application Administrator**  
- **Global Administrator**  

If the user who creates the Azure application is not assigned to either of these roles, you cannot sync teams from Azure to Codefresh.

## Step 1: Register the Codefresh application in Azure

To set up Microsoft Entra ID for SSO, first register a new application in Azure.

1. Log in to the **Azure Portal**, and from the sidebar, select **Microsoft Entra ID**.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/01-micosoft-entra-id.png"
url="/images/administration/sso/azure/01-micosoft-entra-id.png"
alt="Microsoft Entra ID"
caption="Microsoft Entra ID"
max-width="70%"
%}

{:start="2"}
1. From the sidebar, select **App registrations**, and then click **+ New registration** on the top.
1. Enter a name for the application, for example, `Codefresh`, and retain the default values for all other settings.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/02-new-app-registration.png"
url="/images/administration/sso/azure/02-new-app-registration.png"
alt="Enter a name and the register application"
caption="Enter a name and the register application"
max-width="70%"
%}

{:start="4"}
1. To apply your changes, click **Register**. The application is created and registered in Microsoft Entra ID.

## Step 2: Configure permissions for the application in Azure

Once the application has been created and registered, configure the required permissions.

1. Open the application, and from the sidebar, select **API permissions**
1. Configure the following:
   - Click **+ Add a permission**.
   - From **Request API Permissions**, in the **Microsoft APIs** tab, select **Microsoft Graph**.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/03-microsoft-graph.png"
url="/images/administration/sso/azure/03-microsoft-graph.png"
alt="Select Microsoft Graph"
caption="Select Microsoft Graph"
max-width="70%"
%}

{:start="3"}
1. Click **Application permissions** on the left.
   - Add `Group > Read.All`
   - Add `User > Read.All`
1. Next add **Delegated permissions** on the right
   - Add `User > Read.All`

    >**NOTE**  
    The `User.Read (Delegated)` permission is added by default.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/04-full-api-permissions.png"
url="/images/administration/sso/azure/04-full-api-permissions.png"
alt="Full permissions for Microsoft Graph."
caption="Full permissions for Microsoft Graph"
max-width="70%"
%}

{:start="5"}
1. Click **Add Permissions**.
1. Click **Grant admin consent for Default Directory** on the bar.

## Step 3: Create client secret in Azure

Create a client secret for the application. You will need to provide it when you set up SSO for Azure in Codefresh.

1. From the sidebar, select **Certificates & secrets**, and then click **+ New client secret**.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/05-client-secret.png"
url="/images/administration/sso/azure/05-client-secret.png"
alt="Create client secret"
caption="Create client secret"
max-width="70%"
%}

{:start="2"}

1. Optional. Add a meaningful description for the client secret, and either retain the default expiry date or define a custom one.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/06-create-client-secret.png"
url="/images/administration/sso/azure/06-create-client-secret.png"
alt="Description for client secret"
caption="Description for client secret"
max-width="70%"
%}

  {{site.data.callout.callout_tip}}
  **TIP**  
  Make a note of the expiry date in your calendar to renew the key before the expiry date and prevent service interruptions.
  {{site.data.callout.end}}

{:start="3"}

1. Click **Add**.  
1. **Copy the secret Value**, as you will need to provide it on setting up Azure SSO in Codefresh.

## Step 4: Configure SSO settings for Azure in Codefresh

Configure SSO for Azure in the Codefresh UI.

### Before You Begin

- Have your client secret handy
- Go to **Microsoft Entra ID > Enterprise Applications** and select the app you created, and note down these **Properties: Application ID and Object ID**

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/07-enterprise-app-object-ids.png"
url="/images/administration/sso/azure/07-enterprise-app-object-ids.png"
alt="Application and Object IDs under Enterprise Applications"
caption="Application and Object IDs under Enterprise Applications"
max-width="70%"
%}

### How to

1. In the Codefresh UI, click the **Settings** icon (gear) on the top right.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.
1. Click **Add Single Sign-On**, and select **Azure**, and click **Next**.
1. Enter the following:
   - **Client Name**: For auto-generation, leave empty. Codefresh generates the client name once you save the settings.
   - **Display Name**: Meaningful name for the SSO provider. This can be the name shown in Azure.
   - **Application ID**: The Application ID from your Enterprise Application Properties in Microsoft Entra ID.
   - **Client Secret**: The key value you copied when you created the client secret in Azure.
   - **Tenant**: `mycompany.onmicrosoft.com` or the ID of `0example1-0000-0aa0-a00a-1example0`
     - Required for Synchronizing Teams
     - can be found under **Microsoft Entra ID** overview page
   - **Object ID**: The Object ID from your Enterprise Application Properties in Microsoft Entra ID.
   - **Auto Sync users and teams to Codefresh**: Select to automatically sync user accounts in Microsoft Entra ID to your Codefresh account. Optionally, define the time interval, in hours, at which to sync, from 1 to 24. If you don’t specify an interval, the sync is every 12 hours.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/08-azure-sso-settings.png"
url="/images/administration/sso/azure/08-azure-sso-settings.png"
alt="SSO settings for Azure in Codefresh"
caption="SSO settings for Azure in Codefresh"
max-width="70%"
%}

{:start="5"}

1. Click **Save**.
1. Copy the **Client Name** that is dispalyed in the UI

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/09-client-name.png"
url="/images/administration/sso/azure/09-client-name.png"
alt="Example of Codefresh-generated Client Name for Azure"
caption="Example of Codefresh-generated Client Name for Azure"
max-width="50%"
%}

## Step 5: Configure redirect URIs in Azure

As the final step, add the Codefresh callback URL to the allowed reply URLs for the created application in Azure.

1. Go to **Microsoft Entra ID > Apps registrations**, and select the application you registered for SSO.
1. From the sidebar, select **Authentication**.
1. Below **Platform Configuration**, click **Add a platform** and then select **Web**.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/10-config-platform.png"
url="/images/administration/sso/azure/10-config-platform.png"
alt="Select Web configuration settings"
caption="Select Web configuration settings"
max-width="70%"
%}

{:start="4"}

1. In the Configure Web form, do the following:
   - In the **Redirect URIs** field, enter the redirect URI in the format below:  
    `https://g.codefresh.io/api/auth/<your_codefresh_sso_client_name>/callback`  
    where:  
    `<your_codefresh_sso_client_name>` is the Client Name shown in the SSO configuration, either defined by you or created by Codefresh.  
   - Select **ID tokens**.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/11-web-configs.png"
url="/images/administration/sso/azure/11-web-configs.png"
alt="Web configuration settings"
caption="Web configuration settings"
max-width="70%"
%}

## Step 6: (Optional) Configure for Azure Initiated Login

1. Go to **Microsoft Entra ID > Apps registrations**, and select the application you registered for SSO.
1. From the sidebar, select **Branding & properties**
1. In the **Home page URL** field, insert the following `https://g.codefresh.io/api/auth/<your_codefresh_sso_client_name>`

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/12-home-page-url.png"
url="/images/administration/sso/azure/12-home-page-url.png"
alt="Web configuration settings"
caption="Web configuration settings"
max-width="70%"
%}

{:start="4"}

1. Go to **Microsoft Entra ID > Enterprise Applications**, and select the application you registered for SSO.
1. Under Properties, toggle **Visible to users** to yes.
1. Now the app can be added to a Collection for My Apps page for Azure Initiated Login.

## Related articles

[About Federated Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/administration/single-sign-on/team-sync/)  
