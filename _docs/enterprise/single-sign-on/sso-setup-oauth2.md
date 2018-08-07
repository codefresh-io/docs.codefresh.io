---
title: "Setting Up OpenID Connect Federated Single Sign-On (SSO)"
description: ""
group: enterprise
sub_group: single-sign-on
redirect_from:
  - /docs/sso/sso-setup-oauth2/
toc: true
---

Codefresh natively supports login using Github, Bitbucket and Gitlab using OpenID Connect (OAUTH 2.0) protocol. This guide will review how to add additional SSO integrations based on OAUTH 2.0 as part of Codefresh Enterprise plan.

  
## Prerequisites

In order to add successfully an identity provider in Codefresh you need to do some preparatory work with both Codefresh and the provider.

1. You need to inform your Identify provider that it will provide SSO services to Codefresh
1. You need to setup Codefresh and point it to your identity provider.

The first procedure differs according to you Identity provider, but the second one is common for all providers.

Note that SSO is only available to Enterprise customers. Please [contact sales](https://codefresh.io/contact-sales/) in order to enable it for your Codefresh account.


## Identity provider options

Codefresh currently supports

  * Azure 
  * Okta
  * Auth0

You can setup each provider

 1. At the [Codefresh customer level]({{ site.baseurl }}/docs/enterprise/ent-account-mng/) 
 1. At the Codefresh account level 
 1. At both levels. Integrations that were created from the customer level can only be edited or removed by the customer administrator from that customer management view. The Account administrator won’t be able to edit those.

The specific way depends on your own organization and how you have chosen to give Codefresh access to your users.

To access the SSO configuration at the account level.

1.  Click on your avatar at the top right of the GUI and select *Account settings*
1. In the new screen, select *Single Sign-on* from the left sidebar

To access the SSO configuration at the customer level

1. Click on your avatar at the top right of the GUI and select any customer from the *Customers* subsection
1. In the new screen, select *Single Sign-on* from the left sidebar

In both cases you will arrive to the following screen

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/add-sso-dropdown.png" 
url="/images/enterprise/sso/add-sso-dropdown.png"
alt="SSO provider settings"
caption="SSO provider settings"
max-width="70%"
%}

To connect an identity provider click the *add single-sign-on* button and select your provider from the drop-down menu.


## Codefresh SSO setup

Regardless of the Identity provider that you have chosen, the Codefresh setup is the same for all of them. You need to provide

* A name for your Identity provider
* The host that contains the provider
* An ID that will be used for the connection
* A secret associated with the ID

To obtain the ID/Secret you need to follow a different procedure for each provider


### Setting Azure as an Identity provider

To setup Azure Active Directory for SSO

1. Create a new application in Azure AD

Login to *Microsoft Azure* and choose *Azure Active Directory* from the sidebar.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step01.png" 
url="/images/enterprise/sso/azure-step01.png"
alt="Azure Active Directory"
caption="Azure Active Directory"
max-width="70%"
%}

Then under *MANAGE*, select *App registrations*.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step02.png" 
url="/images/enterprise/sso/azure-step02.png"
alt="Azure App Registrations"
caption="Azure App Registrations"
max-width="70%"
%}

Then click on the *+ ADD button* to add a new application.

Enter a name for the application (e.g. *Codefresh*), select *Web app/API* as the Application Type, and for Sign-on URL enter `https://g.codefresh.io`

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step03.png" 
url="/images/enterprise/sso/azure-step03.png"
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
file="/images/enterprise/sso/azure-step04.png" 
url="/images/enterprise/sso/azure-step04.png"
alt="Azure App Permissions"
caption="Azure App Permissions"
max-width="70%"
%}

Then click on *Windows Azure Active Directory* to change the access levels.


{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step05.png" 
url="/images/enterprise/sso/azure-step05.png"
alt="Azure App Change Permissions"
caption="Azure App Change Permissions"
max-width="70%"
%}

The next step is to modify permissions for the app. Under *DELEGATED PERMISSIONS* check next to *Sign in and read user profile* and *Read directory data*. Finally click the *Save* button.

{:start="3"}
1. Create the key

Next you will need to create a key which will be used as the Client Secret in Codefresh connection. Click on *Keys* from the *Settings* menu.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step06.png" 
url="/images/enterprise/sso/azure-step06.png"
alt="Change keys"
caption="Change keys"
max-width="70%"
%}

Enter a name for the key and choose the desired duration.

**Note:**. If you choose an expiring key, make sure to record the expiration date in your calendar, as you will need to renew the key (get a new one) before that day in order to ensure users don't experience a service interruption.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step07.png" 
url="/images/enterprise/sso/azure-step07.png"
alt="Create key"
caption="Create key"
max-width="70%"
%}

Click on *Save* and the key will be displayed. **Make sure to copy the value of this key before leaving this screen**, otherwise you may need to create a new key. This value will need to be provided to Codefresh securely.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step08.png" 
url="/images/enterprise/sso/azure-step08.png"
alt="Create key"
caption="Create key"
max-width="70%"
%}

{:start="4"}
1. Configure reply URLs

Next you need to ensure that your Codefresh callback URL is listed in allowed reply URLs for the created application. Navigate to *Azure Active Directory* -> *Apps registrations* and select your app. Then click *Settings -> Reply URLs* and add:

```
https://codefresh-login.auth0.com/login/callback
```

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step09.png" 
url="/images/enterprise/sso/azure-step09.png"
alt="Reply URLs"
caption="Reply URLs"
max-width="70%"
%}

{:start="5"}
1. Send the following data to Codefresh:

* The application ID in Azure AD (shown below)
* The key value from step 3
* Your Microsoft Azure AD Domain
* Email domains that are authorized to use this connection

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure-step10.png" 
url="/images/enterprise/sso/azure-step10.png"
alt="Application ID"
caption="Application ID"
max-width="70%"
%}

### Setting Auth0 as an Identity provider

Coming soon...

### Setting Okta as an Identity provider

Coming soon...
