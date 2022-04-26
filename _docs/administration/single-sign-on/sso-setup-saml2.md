---
title: "Setting Up SAML2 Federated Single Sign-On (SSO)"
description: ""
group: administration
sub_group: single-sign-on
redirect_from:
  - /docs/sso/sso-setup-saml2/
  - /docs/enterprise/single-sign-on/sso-setup-saml2/
toc: true
---

Codefresh natively supports login using GitHub, Bitbucket and GitLab using the OpenID Connect (OAUTH 2.0) protocol. You can add new SSO integrations based on OAUTH 2.0 as part of Codefresh  Enterprise plan.

As Identity Providers (IdPs) come in all shapes and sizes, the following topic discusses in general what you must do to configure Federated SSO. 
  As you will see in the description below, the person in your organization responsible for managing your IdP will need to interact with Codefresh support team to successfully set up a trust between your IdP and Codefresh SP.

{:.text-secondary}
### Before you set up Federated SSO
  1. Have your account set up with Codefresh enterprise plan.
  2. Ensure you have a working SAML 2.0 compliant identity provider (IdP).
  3. Identify someone in your organization who is familiar with configuring and managing your organization's IdP.
  4. Ensure that your IdP's system clock is synchronized with a reliable time source. If it's not, tokens generated will be unusable and SSO will fail.

{:.text-secondary}
### Summary of Federated SSO setup

{% include image.html
  lightbox="true"
  file="/images/sso-flow.png"
  url="/images/sso-flow.png"
  alt="sso-flow.png"
  max-width="100%"
%}

{:.text-secondary}
### SAML attributes

Codefresh expects the following user attributes to be passed through SAML between your IdP and Codefresh SP:
  - User email address
  - User first name
  - User last name
  - User full name
  - User unique ID that isn't subject to change in your identity management environment

{:.text-secondary}
## How does the connection process work?

  {% include image.html
lightbox="true"
file="/images/sso-diagram.png"
url="/images/sso-diagram.png"
alt="sso-diagram.png"
max-width="100%"
  %}

Once Federated SSO has been configured, the process works as follows:

<div class="bd-callout bd-callout-info" markdown="1">

  Steps 2 to 7 occur in the background and are transparent to the user.
</div>

1. A user logs in to CDSP
2. The user is redirected to Codefresh Service Provider (SP) to initiate SSO
3. The user’s browser is then redirected to the customer IdP
4. Once authenticated by the corporate side, a SAML token is sent to the user’s browser
5. The SAML assertion is then forwarded to Codefresh SP
6. If you are a valid Codefresh user for this SSO connection, an SSO token is returned to the user’s browser
7. The user’s browser then returns a token to Codefresh and access is granted for your account

### Configure SAML SSO settings in Codefresh 

1. In Codefresh, select **Account settings**.
1. From the sidebar expand **Collaboration**, and select **Single Sign-on**.
  OR
  Go directly to [https://g.codefresh.io/account-admin/sso](https://g.codefresh.io/account-admin/sso))


  {% include image.html 
  lightbox="true" 
file="/images/administration/sso/add-sso-dropdown.png" 
url="/images/administration/sso/add-sso-dropdown.png"
alt="SSO provider settings"
caption="SSO provider settings"
max-width="70%"
%}

{:start="3"}
1. Select **Add single-sign-on**, and then select **SAML**.
1. Enter the following:

  * **Client Name**: For auto-generation, leave empty. Codefresh generates the client name once you save the settings. 
  * **Display Name**: The name you want to give to this integration.
  * **IDP Entry**: The SSO endpoint of your Identity Provider. For Azure SAML, for example, this is the Login URL.
  * **Application Certificate**: The security certificate of your Identity Provider. Paste the value directly in the field. Do not convert to base64 or any other encoding by hand. (For Azure SAML, this will be Certificate (Base64) and the value needed is between the -----BEGIN ... and -----END... from the downloaded cert)
  * **Assertion URL**: `https://g.codefresh.io/api/auth/<your_codefresh_client_name>/callback​`  
    where ​<your_codefresh_client_name>​ is he client name that is automatically generated when saving the SSO settings.
  * **Auto Sync users and teams to Codefresh**: Supported for Google/GSuite SAML integration. Select to automatically sync user accounts in to your Codefresh account. Optionally, define the time interval at which to sync, in hours, from 1 to 24. If you don't specify an interval, the sync interval is every 12 hours.
1. Select **Save**, and note down the `Client Name` that is generated.


### Configure IdP settings for Codefresh as a Service Provider
In the settings of your Identity Provider, create a new Service Provider and provide the following:

  * **Service Provider SSO Endpoint**: Assertion consumer service URL - `https://g.codefresh.io/api/auth/<your_codefresh_client_name>/callback`
  * **Service Provider Entity ID**: `g.codefresh.io`

The mandatory fields needed for SAML assertions are:
1. firstName: User's first name
1. lastName: User's last name
1. email: User's email

To configure users sync for SAML IDP, do the following:

1. Select a G Suite provider
1. Enable Auto Sync users and teams to Codefresh
1. Set JSON Keyfile, Admin Email and Sync interval

The instructions for getting the JSON Keyfile, and Admin Email are the same as for [Google SSO]({{site.baseurl}}/docs/administration/single-sign-on/sso-google/#synchronize-teams-with-the-codefresh-cli).

>Note
  These settings are for the SaaS version of Codefresh. For an on-premises setup, use the URLs that match your installation.

Once everything is finished, you [should test the integration]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider). Once it's working, proceed to the next steps that are:

* [Selecting SSO method for collaborators]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#selecting-sso-method-for-collaborators)

>Notice that Codefresh has an internal cache for SSO configurations and it might take up to five minutes for your changes to take effect.

## OneLogin SAML Setup

1. In OneLogin, go to the [Applications](https://cfsupport.onelogin.com/apps) Section.
1. Select 'Add App' on the top right.
1. Search for 'SAML Custom Connector' (advanced) and select it.
1. Add a Display Name (the rest is optional) and Save.
1. View the SSO Section.
1. Open a New Tab and go to the [Single Sign-On](https://g.codefresh.io/account-admin/sso) settings in Codefresh.
1. In Codefresh, select SAML for the Add Single Sign-On. 
  * Display Name = any arbitrary name you want to give in this integration.
  * IDP Entry = SAML 2.0 Endpoint (HTTP) from the SSO section in OneLogin. 
  * Application Certificate = X.509 Certificate from the SSO section in OneLogin. 
  * Click View Details (preferable open in a new tab).
  * Under X.509 Certificate, click the copy button.
  * Paste the contents into the Application Certificate.
  * Remove the -----BEGIN CERTIFICATE----- and -----END CERTIFICATE-----.
  * Save.
1. Click edit on the SAML integration we created. 
  * Copy the Assertion URL
1. In OneLogin, view the Configuration section. 
  * Audience (EntityID) = g.codefresh.io
  * Recipient = Assertion URL
  * ACS (Consumer) URL Validator= Assertion URL but in Regex form. View OneLogin's [Setup Page](https://onelogin.service-now.com/support?id=kb_article&sys_id=c89fefdadb2310503de43e043996195a&kb_category=93e869b0db185340d5505eea4b961934) for more info.
  * ACS (Consumer) URL = Assertion URL
  * Login URL = https://g.codefresh.io/login
  * SAML Initiator = Service Provider
  * Save
1. In OneLogin, Go the [Users](https://cfsupport.onelogin.com/users) page.
  * Select the User
  * Go to Applications Section
  * Click the **+** to add
  * Select the SAML App (will show the Display Name from step 7)
  * Click Continue
  * Make sure NameID value = email address
  * Save

> Once the configuration is complete, please test the integration before enabling the SSO for all users.

   
   
 

  
