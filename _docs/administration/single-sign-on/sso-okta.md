---
title: "Okta"
description: "Setting Up Okta Single Sign-On (SSO)"
group: administration
sub_group: single-sign-on
redirect_from:
  - /docs/enterprise/single-sign-on/sso-okta/
toc: true
---

In this page, we will see the process of setting up Okta SSO with Codefresh. For the general instructions on SSO setup,
see the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/).

## Setting Okta as an Identity provider

1. Log in to your Okta account, or create an account if you don't have one.
1. In the general Okta dashboard, to go to the Okta Admin Dashboard, click *Admin*. 

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image1.png" 
url="/images/administration/sso/okta/image1.png"
alt="Okta Dashboard"
caption="Okta Dashboard"
max-width="80%"
%}

{:start="3"}
1. Using the list of shortcuts at the left-hand side of the screen, select *Applications*.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image2.png" 
url="/images/administration/sso/okta/image2.png"
alt="Okta Applications"
caption="Okta Applications"
max-width="82%"
%}

{:start="4"}
1. In the *Applications* page, select *Create App Integration*.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image3.png" 
url="/images/administration/sso/okta/image3.png"
alt="Create new application"
caption="Create new application"
max-width="80%"
%}

{:start="5"}
1. In the *Create a New Application Integration* pop-up window, select OIDC - OpenID Connect as the *Sign on method* and Web Application as the *Application Type*. Click Next to proceed.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image4.png" 
url="/images/administration/sso/okta/image4.png"
alt="Choose Sign-on method"
caption="Choose Sign-on method"
max-width="90%"
%}

{:start="6"}
1. You will now create your OIDC integration. On the *General Settings* page, provide the following:

* App Integration name (e.g. Codefresh)
* Logo (optional). Feel free to download and add this [picture]({{site.baseurl}}/images/administration/sso/okta/codefresh-logo.png)
* Sign-in redirect URI: `https://g.codefresh.io/api/auth/<your_codefresh_client_name>/callback`.
  You will extract your Codefresh client name a bit later in the process, so we’ll need to come back to this and update it again - for now please use a temp value such as `https://g.codefresh.io/api/auth/temp/callback`


{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image5.png" 
url="/images/administration/sso/okta/image5.png"
alt="OpenID integration"
caption="OpenID integration"
max-width="90%"
%}

{:start="6"}
1. Click *Save* to proceed.

## Configure Okta integration in Codefresh
Configure the integration settings for Okta in the Codefresh UI and get the value of the Client name on saving the settings.


1. In the Codefresh UI, go to the [SSO Settings](https://g.codefresh.io/account-admin/sso) page, and select *Okta*.
1. Enter the following:

* *Display Name* - shown as application name in OKTA.
* *Client ID* - your OKTA application client ID (see below).
* *Client secret* - your OKTA application client secret (see below).
* *Client Host* - your OKTA organization url (e.g `https://<company>.okta.com`). Do not copy it from the admin view (e.g. `https://<company>-admin.okta.com`) because it will not work.
* *Access Token* (optional) - OKTA API token that will be used to sync groups and users from OKTA to Codefresh. The token can be generated in OKTA by going to the Security tab -> API -> Tokens (see below). Read-only access permissions are needed.
* *App ID* - your Codefresh application ID in your OKTA organization that will be used to sync groups and users from OKTA to Codefresh. This ID can be taken by navigating to your Codefresh APP in OKTA and copying it from the URL (see below).

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image6.png" 
url="/images/administration/sso/okta/image6.png"
alt="Client ID and secret"
caption="Client ID and secret"
max-width="70%"
%}

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image7.png" 
url="/images/administration/sso/okta/image7.png"
alt="Access token"
caption="Access token"
max-width="80%"
%}

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image8.png" 
url="/images/administration/sso/okta/image8.png"
alt="App ID"
caption="App ID"
max-width="80%"
%}

{:start="3"}
1. Once you save the Identity provider, Codefresh assigns a client-name to it which identifies the SSO configuration.
Note it down.

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/image9.png" 
url="/images/administration/sso/okta/image9.png"
alt="Client name"
caption="Client name"
max-width="90%"
%}

## Add the client name to the Okta application settings
Copy the Client Name generated on saving the Okta configuration settings, and update the Okta application settings.

1. Return to your OKTA Application General Settings, and update the following configurations with the client name generated by Codefresh:

* Login redirect URIs - `https://g.codefresh.io/api/auth/<your_codefresh_client_name>/callback`
* Initiate login URI - `https://g.codefresh.io/api/auth/<your_codefresh_client_name>`

This concludes the SSO setup for Okta. 

## How Okta syncing works

It is important to notice that [syncing with Okta]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#syncing-of-teams-after-initial-sso-setup)
only affects teams/groups, and not individuals/persons.

You can assign an Okta application in both groups and individual people. Codefresh will only sync people that are inside teams. Newly created people in Okta that are *not* assigned to a team will **NOT** be synced to Codefresh. You should assign them to a team first, and then they will be synced as part of the team.

### Syncing of teams after initial SSO setup

There are two ways that you can set up automatic syncing of teams.

First, you can create a Codefresh pipeline that runs the CLI command `codefresh synchronize teams my-okta-client-name -t okta` as explained in the [pipeline sync page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#syncing-of-teams-after-initial-sso-setup).

Alternatively, you can set up completely automated syncing by enabling the auto-sync toggle found in the top right of the integration:

{% include image.html 
lightbox="true" 
file="/images/administration/sso/okta/auto-group-sync.png" 
url="/images/administration/sso/okta/auto-group-sync.png"
alt="Automatic team syncing"
caption="Automatic team syncing"
max-width="50%"
%}

If you enable this, every 12 hours Codefresh will sync teams on its own without the need of a pipeline. 

## What to read next

See the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider) on how to test the integration, activate SSO for collaborators and create sync jobs.

