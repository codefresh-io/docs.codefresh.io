---
title: "Auth0 SSO via OIDC"
description: "Set up Auth0 SSO for OIDC"
group: single-sign-on
sub_group: oidc
redirect_from:
  - /docs/enterprise/sso-auth0/
  - /docs/enterprise/single-sign-on/sso-auth0/
toc: true
---

Set up SSO for Auth0 using OIDC.
For a general overview on OIDC, see [Setting up OIDC Federated SSO]({{site.baseurl}}/docs/single-sign-on/oidc).  

Set up OIDC SSO for Auth0 in Codefresh by:
1. Creating an Auth0 application in Auth0
1. Creating the SSO account for Auth0 in Codefresh
1. Definng the SSO settings for the application you created in Auth0

## Step 1: Create an Auth0 application
First create a new application in Auth0.

1. Log in to Auth0.
1. From the sidebar, select **Applications > Applications**, and then click **Create Application**.
1. In the Create application form, do the following:
  * Enter a **Name** for the application.
  * **Choose an application type**: Select **Regular Web Applications**.
  * Click **Create**.

{% include image.html 
lightbox="true"
file="/images/administration/sso/auth0/create-auth0-app.png" 
url="/images/administration/sso/auth0/create-auth0-app.png"
alt="Create Auth0 application"
caption="Create Auth0 application"
max-width="40%"
%}

{:start="4"}
1. In the Auth0 SSO settings, note down the following as you will need them to add the SSO account for Auth0 in Codefresh:
  * **Client ID**
  * **Client secret**
  * **Domain**

{% include image.html 
lightbox="true"
file="/images/administration/sso/auth0/auth0-app-settings.png" 
url="/images/administration/sso/auth0/auth0-app-settings.png"
alt="Auth0 application settings"
caption="Auth0 application settings"
max-width="40%"
%}

{:start="5"}
1. Continue with [Step 2: Create SSO account for Auth0 in Codefresh](#step-2-create-sso-account-for-auth0-in-codefresh).

## Step 2: Create SSO account for Auth0 in Codefresh
After creating an Auth0 application, create an SSO account for OAuth0 in Codefresh. 

1. In the Codefresh UI, from the toolbar click the **Settings** icon.
1. In the sidebar, from Access & Collaboration, select [Single Sign-On](https://g.codefresh.io/2.0/account-settings/single-sign-on){:target="\_blank"}.
1. Click **Add Single Sign-On**. 
1. For the Single Sign-On Service, select **Auth0**, and click **Next**.
1. Define the connection details:
  * **Client Name**: For auto-generation, leave empty. Codefresh generates the client name once you save the account settings.  
  * **Display Name**: Meaningful name that identifies the SSO integration for this provider.
  * **Access Token**: Leave empty. Access tokens are used for team sync which is currently not supported for Auth0.  
  * **Client ID**: The Client ID generated for your Auth0 application.  
  * **Client secret**: The Client Secret also generated for your Auth0 application. 
  * **Domain**: The domain of the Auth0 application.

{% include image.html 
lightbox="true"
file="/images/administration/sso/auth0/codefresh-settings.png"
url="/images/administration/sso/auth0/codefresh-settings.png"
alt="SSO account settings for Auth0 in Codefresh"
caption="SSO account settings for Auth0 in Codefresh"
max-width="40%"
%}

{:start="5"}
1. Click **Save**.
1. Copy the Client Name that is assigned to identify this SSO account. You will have to add it to the Auth0 application.
1. Continue with [Step 3: Define SSO settings in Auth0 application](#step-3-define-sso-settings-in-auth0-application).


## Step 3: Define SSO settings in Auth0 application
As the final step in Auth0 SSO setup, return to Auth0, and then define the Login URI and Callback URL for the Auth0 application you created in  Step 1. 

1. From the sidebar, select **Applications > Applications**.
1. In the **Application Login URL** field, enter `https://g.codefresh.io/login`.
1. In the **Allowed Callback URLs** field, enter `https://g.codefresh.io/api/auth/<codefresh_client_name>/callback`  
  where:  
  `<codefresh_client_name>` is the client name you copied after creating the Auth0 SSO account in Codefresh. 

{% include image.html 
lightbox="true"
file="/images/administration/sso/auth0/sso-settings-in-auth0.png" 
url="/images/administration/sso/auth0/sso-settings-in-auth0.png"
alt="SSO settings for application in Auth0"
caption="SSO settings for application in Auth0"
max-width="50%"
%}

{:start="4"}
1. To confirm the Auth0 SSO settings, click **Save Changes**. 

You have completed SSO setup for Auth0 in Codefresh.

## Related articles
[Federated Single Sign-On (SSO) overview]({{site.baseurl}}/docs/single-sign-on/)  
[Common configuration for SSO providers]({{site.baseurl}}/docs/single-sign-on/team-sync)  




