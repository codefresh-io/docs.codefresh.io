---
title: "OneLogin (OIDC)"
description: "Setting Up OneLogin Single Sign-On (SSO)"
group: single-sign-on
sub_group: oidc
toc: true
---

In this page we will see the process of setting up OneLogin SSO with Codefresh. For the general instructions of SSO setup
see the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/).

## Setting OneLogin as an Identity provider

To setup OneLogin for SSO do the following:

## Step 1: Configure app on the OneLogin dashboard

Log in to the [OneLogin Administration Dashboard](https://www.onelogin.com/), and click Apps > Add Apps.

{% include image.html
lightbox="true"
file="/images/administration/sso/onelogin/step1.png"
url="/images/administration/sso/onelogin/step1.png"
alt="OneLogin Dashboard"
caption="OneLogin Dashboard"
max-width="40%"
%}

Find the OpenId Connect App from the search field.

{% include image.html
lightbox="true"
file="/images/administration/sso/onelogin/step2.png"
url="/images/administration/sso/onelogin/step2.png"
alt="Locating the OpenId Connect App"
caption="Locating the OpenId Connect App"
max-width="100%"
%}

Setup a Codefresh application

{% include image.html
lightbox="true"
file="/images/administration/sso/onelogin/step3.png"
url="/images/administration/sso/onelogin/step3.png"
alt="Adding a new application"
caption="Adding a new application"
max-width="90%"
%}

Open the SSO tab to get the Client ID and client Secret

{% include image.html
lightbox="true"
file="/images/administration/sso/onelogin/step4-post.png"
url="/images/administration/sso/onelogin/step4-post.png"
alt="Copying the values of Client ID and Secret"
caption="Copying the values of Client ID and Secret"
max-width="90%"
%}

Make sure that *Application Type* is set to `Web` and *Token endpoint Authentication* is set to `POST`.

Note down the values as they will be used in the next section.

## Step 2: Configure OneLogin app with Codefresh service provider settings

Go back into Codefresh and choose OneLogin at the [SSO Settings](https://g.codefresh.io/account-admin/sso)

{% include image.html
lightbox="true"
file="/images/administration/sso/onelogin/step5.png"
url="/images/administration/sso/onelogin/step5.png"
alt="Choosing OneLogin for Auth"
caption="Choosing OneLogin for Auth"
max-width="20%"
%}

In the configuration screen fill in the following:

* `DISPLAY NAME` - Friendly SSO name (arbitrary)
* `CLIENT ID` - Use the value you got from the previous section
* `CLIENT SECRET` - Use the value you got from the previous section
* `DOMAIN` - domain to be used for authentication (optional, only for users that must connect via a custom domain)
* `API CLIEND ID` - Used for [team sync]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#syncing-of-teams-after-initial-sso-setup) only. See the [official documentation](https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials) for details
* `API CLIENT SECRET` - Used for [team sync]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#syncing-of-teams-after-initial-sso-setup) only. See the [official documentation](https://developers.onelogin.com/api-docs/1/getting-started/working-with-api-credentials) for details

{% include image.html
lightbox="true"
file="/images/administration/sso/onelogin/codefresh-settings.png"
url="/images/administration/sso/onelogin/codefresh-settings.png"
alt="Entering Codefresh Settings"
caption="Entering Codefresh Settings"
max-width="90%"
%}

After clicking SAVE you’ll see the generated Client Name:

{% include image.html
lightbox="true"
file="/images/administration/sso/onelogin/step7.png"
url="/images/administration/sso/onelogin/step7.png"
alt="Getting the auto-generated Client Name"
caption="Getting the auto-generated Client Name"
max-width="90%"
%}

Note this down.

## Step 3: Setup Login and Redirect URI's

Go back to the OneLogin dashboard.

Use the Client Name from the previous section to generate the Login Url and Redirect URI’s

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

This concludes the SSO setup for OneLogin.

## What to read next

See the [overview page]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider) on how to test the integration, activate SSO for collaborators and create sync jobs.
