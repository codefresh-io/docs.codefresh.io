---
title: "Azure"
description: "Setting Up Azure Single Sign-On (SSO)"
group: enterprise
sub_group: single-sign-on
toc: true
---

In this page we will see the process of setting up Azure SSO with Codefresh. For the general instructions of SSO setup
see the [overview page]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/).

## Setting Azure as an Identity provider

To setup Azure Active Directory for SSO

1. Create a new application in Azure AD

Login to *Microsoft Azure* and choose *Azure Active Directory* from the sidebar.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step01.png" 
url="/images/enterprise/sso/azure/azure-step01.png"
alt="Azure Active Directory"
caption="Azure Active Directory"
max-width="70%"
%}

Then under *MANAGE*, select *App registrations*.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step02.png" 
url="/images/enterprise/sso/azure/azure-step02.png"
alt="Azure App Registrations"
caption="Azure App Registrations"
max-width="70%"
%}

Then click on the *+ ADD button* to add a new application.

Enter a name for the application (e.g. *Codefresh*), select *Web app/API* as the Application Type, and for Sign-on URL enter `https://g.codefresh.io`

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step03.png" 
url="/images/enterprise/sso/azure/azure-step03.png"
alt="Azure App Registration create"
caption="Azure App Registration create"
max-width="70%"
%}


{:start="2"}
1. Configure the permissions

Once the application has been created, you will have to configure the permissions. Click on the name of the application to open the *Settings* section.

Click *Required permissions*.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step04.png" 
url="/images/enterprise/sso/azure/azure-step04.png"
alt="Azure App Permissions"
caption="Azure App Permissions"
max-width="70%"
%}

Then click on *Windows Azure Active Directory* to change the access levels.


{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step05.png" 
url="/images/enterprise/sso/azure/azure-step05.png"
alt="Azure App Change Permissions"
caption="Azure App Change Permissions"
max-width="70%"
%}

The next step is to modify permissions for the app. Under *DELEGATED PERMISSIONS* check next to *Sign in and read user profile* and *Read directory data*. Finally click the *Save* button.

You should also add the "Microsoft Graph" as an API and make sure that Read directory data is enabled for both Application and Delegated permissions. 
{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/graph-permissions.png" 
url="/images/enterprise/sso/azure/graph-permissions.png"
alt="Microsoft Graph API permissions"
caption="Microsoft Graph API permissions"
max-width="70%"
%}

Remember to click the *Save* button once finished. Afterwards please click on the *Grant permissions* button from the bar above.


{:start="3"}
1. Create the key

Next you will need to create a key which will be used as the Client Secret in Codefresh connection. Click on *Keys* from the *Settings* menu.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step06.png" 
url="/images/enterprise/sso/azure/azure-step06.png"
alt="Change keys"
caption="Change keys"
max-width="70%"
%}

Enter a name for the key and choose the desired duration.

**Note:**. If you choose an expiring key, make sure to record the expiration date in your calendar, as you will need to renew the key (get a new one) before that day in order to ensure users don't experience a service interruption.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step07.png" 
url="/images/enterprise/sso/azure/azure-step07.png"
alt="Create key"
caption="Create key"
max-width="70%"
%}

Click on *Save* and the key will be displayed. **Make sure to copy the value of this key before leaving this screen**, otherwise you may need to create a new key. This value will need to be provided to Codefresh securely.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step08.png" 
url="/images/enterprise/sso/azure/azure-step08.png"
alt="Create key"
caption="Create key"
max-width="70%"
%}


{:start="4"}
1. Go back to the SSO settings screen described in the first part of this guide inside the Codefresh GUI.

You need to enter the following:

* *Display Name* - Shown as display name in Azure
* *client id* - your Azure Application ID (see below)
* *client secret* - the key from step 3
* *tenant* - `<Your Microsoft Azure AD Domain>.onmicrosoft.com`
* *Object ID* - your Azure Object ID (see below)


{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step10.png" 
url="/images/enterprise/sso/azure/azure-step10.png"
alt="Application ID"
caption="Application ID"
max-width="70%"
%}

Once you save the Identity provider, Codefresh will assign a `client-name` to it which identifies the SSO configuration.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/client-name.png" 
url="/images/enterprise/sso/azure/client-name.png"
alt="SSO Client Name"
caption="SSO Client Name"
max-width="50%"
%}

{:start="5"}
1. Configure reply URLs

As a last step you need to ensure that your Codefresh callback URL is listed in allowed reply URLs for the created application. Navigate to *Azure Active Directory* -> *Apps registrations* and select your app. Then click *Settings -> Reply URLs* and add:

```
https://g.codefresh.io/api/auth/<your_codefresh_sso_client_name>/callback

```

where `<your_codefresh_sso_client_name>` is the client name shown in the SSO configuration.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/azure-step09.png" 
url="/images/enterprise/sso/azure/azure-step09.png"
alt="Reply URLs"
caption="Reply URLs"
max-width="70%"
%}

This concludes the SSO setup for Azure. 

## What to read next

See the [overview page]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider) on how to test the integration, activate SSO for collaborators and create sync jobs.