---
title: "Azure"
description: "Setting Up Azure Single Sign-On (SSO)"
group: administration
sub_group: single-sign-on
redirect_from:
  - /docs/enterprise/single-sign-on/sso-azure/
toc: true
---

In this page we will see the process of setting up Azure SSO with Codefresh. For the general instructions of SSO setup
see the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/).

## Prerequisites

Make sure that your user in Azure has the *Application Administrator* or *Global Administrator* roles. If the user that creates the Azure application does not belong to either of these roles, you will not be able to [sync teams from Azure to Codefresh]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#syncing-of-teams-after-initial-sso-setup) after the SSO integration is complete.

We strongly suggest that the Azure user who creates the integration is part of *Application Administrator* or *Global Administrator* roles.


## Creating an Application Registration

To setup Azure Active Directory for SSO, you should first create a new application in Azure AD.
Login to *Azure Portal* and choose *Azure Active Directory* from the sidebar.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/1-azure-service.png" 
url="/images/administration/sso/azure/1-azure-service.png"
alt="Azure Active Directory"
caption="Azure Active Directory"
max-width="70%"
%}

Then under the new sidebar, select *App registrations*.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/2-app-registrations.png" 
url="/images/administration/sso/azure/2-app-registrations.png"
alt="Azure App Registrations"
caption="Azure App Registrations"
max-width="70%"
%}

Then click on the *+ New registration* to add a new application.

Enter a name for the application (e.g. *Codefresh*), and leave all other options to default selection.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/3-register-an-app.png" 
url="/images/administration/sso/azure/3-register-an-app.png"
alt="Azure App Registration creation"
caption="Azure App Registration creation"
max-width="70%"
%}

Click the *Register* button to apply your changes. The application registration is now created.



## Configure the Permissions

Once the application has been created, you will have to configure the permissions. Click on the name of the application to open the *Settings* section.

Click *API permissions*.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/5-api-permissions.png" 
url="/images/administration/sso/azure/5-api-permissions.png"
alt="Azure App API Permissions"
caption="Azure App API Permissions"
max-width="70%"
%}

Then click on the *Add a permission* button to change the access levels.


{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/6-request-api-permissions.png" 
url="/images/administration/sso/azure/6-request-api-permissions.png"
alt="Azure App Change Permissions"
caption="Azure App Change Permissions"
max-width="70%"
%}

Find the *Azure Active Directory Graph* entry and click on it.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/7-request-api-permissions.png" 
url="/images/administration/sso/azure/7-request-api-permissions.png"
alt="Azure Active Directory Graph entry"
caption="Azure Active Directory Graph entry"
max-width="70%"
%}

Click *Application* permissions (Delegated permissions are not enough in this case). From the list of permissions choose:

* `Directory.Read.All`
* `Group.Read.All`
* `User.Read.All`

>Note: User.Read for the type of delegated is required. This permission is usually added by default.

Finally click the *Apply Permissions* button.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/ApplicationPermissions.png" 
url="/images/administration/sso/azure/ApplicationPermissions.png"
alt="API Permissions"
caption="API Permissions"
max-width="70%"
%}

 Afterwards please click on the *Grant admin consent* button from the bar above.

## Create Client Secret

Next select *Certificates & secrets* from the left sidebar:

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/9-Create-secret-page.png" 
url="/images/administration/sso/azure/9-Create-secret-page.png"
alt="Change keys"
caption="Change keys"
max-width="70%"
%}

Click on *New Client secret* and add a description (arbitrary name).


{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/10-Add-client-secret.png" 
url="/images/administration/sso/azure/10-Add-client-secret.png"
alt="Add a client secret"
caption="Add a client secret"
max-width="70%"
%}

Choose the desired duration.

**Note:**. If you choose an expiring key, make sure to record the expiration date in your calendar, as you will need to renew the key (get a new one) before that day in order to ensure users don't experience a service interruption.

Click on *Add* and the key will be displayed. **Make sure to copy the value of this key before leaving this screen**, otherwise you may need to create a new key. This value will need to be provided to Codefresh securely.

## Enter details on the Codefresh side

Go back to the SSO settings screen described in the [first part of this guide]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/#identity-provider-options) inside the Codefresh GUI.

You need to enter the following:

* *Display Name* - Shown as display name in Azure (see below)
* *client id* - shown as Application (client) ID in Azure (see below)
* *client secret* - the key value as created in the previous section
* *tenant* - `mycompany.onmicrosoft.com` or the ID of `0example1-0000-0aa0-a00a-1example0`
* *Object ID* - your Azure Service Principal Object ID (from Enterprise Application configuration, see below)
* *Auto Sync users and teams to Codefresh* - Select to automatically sync user accounts in Azure AD to your Codefresh account. Optionally, define the time interval, in hours, at which to sync, from 1 to 24. If you don't specify an interval, the sync is every 12 hours.


Those fields can be seen in the overview page of your application registration:

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/ObjectId.png" 
url="/images/administration/sso/azure/ObjectId.png"
alt="Overview"
caption="Overview"
max-width="70%"
%}

Once you save the Identity provider, Codefresh will assign a `client-name` to it which identifies the SSO configuration.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/client-name.png" 
url="/images/administration/sso/azure/client-name.png"
alt="SSO Client Name"
caption="SSO Client Name"
max-width="50%"
%}

We will need this value in the reply URL setting (back in the Azure portal UI).

## Configure reply URLs

As a last step you need to ensure that your Codefresh callback URL is listed in allowed reply URLs for the created application. Navigate to *Azure Active Directory* -> *Apps registrations* and select your app. Then click *Add a Redirect URI* and fill in:

```
https://g.codefresh.io/api/auth/<your_codefresh_sso_client_name>/callback

```

where `<your_codefresh_sso_client_name>` is the client name shown in the SSO configuration described in the previous section.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/12-set-reply-URL.png" 
url="/images/administration/sso/azure/12-set-reply-URL.png"
alt="Reply URLs"
caption="Reply URLs"
max-width="70%"
%}

Scroll down on the same page and click the *ID tokens* checkbox:

{% include image.html 
lightbox="true" 
file="/images/administration/sso/azure/13-Enable-ID-Tokens.png" 
url="/images/administration/sso/azure/13-Enable-ID-Tokens.png"
alt="Reply URLs"
caption="Reply URLs"
max-width="70%"
%}

This concludes the SSO setup for Azure. 

## What to read next

See the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider) on how to test the integration, activate SSO for collaborators and create sync jobs.
