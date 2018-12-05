---
title: "OneLogin"
description: "Setting Up OneLogin Federated Single Sign-On (SSO)"
group: enterprise
sub_group: single-sign-on
toc: true
---

In this page we will see the process of setting up Okta SSO with Codefresh. For the general instructions of SSO setup
see the [overview page]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/).


## Setting OneLogin as an Identity provider

To setup OneLogin for SSO do the following:

### Step 1: Configure app on the OneLogin dashboard

Log in to the [OneLogin Administration Dashboard](https://www.onelogin.com/), and click Apps > Add Apps.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/onelogin/image1.png" 
url="/images/enterprise/sso/onelogin/image1.png"
alt="OneLogin Dashboard"
caption="OneLogin Dashboard"
max-width="70%"
%}

Search for *saml*, and select SAML Test Connector (IdP w/attr).

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/onelogin/image2.png" 
url="/images/enterprise/sso/onelogin/image2.png"
alt="Selecting SAML"
caption="Selecting SAML"
max-width="70%"
%}

Change the Display Name of your app. Click *SAVE*.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/onelogin/image3.png" 
url="/images/enterprise/sso/onelogin/image3.png"
alt="Changing the display name"
caption="Changing the display name"
max-width="70%"
%}

Go to the SSO tab, and copy the values for SAML 2.0 Endpoint (HTTP) and SLO Endpoint (HTTP). Click on the View Details link at the X.509 Certificate field.


{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/onelogin/image4.png" 
url="/images/enterprise/sso/onelogin/image4.png"
alt="Copying the values"
caption="Copying the values"
max-width="70%"
%}

Download the X.509 certificate `onelogin.pem`.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/onelogin/image5.png" 
url="/images/enterprise/sso/onelogin/image5.png"
alt="Downloading the certificate"
caption="Downloading the certificate"
max-width="70%"
%}

At this point, you will take the information you just collected and send to Codefresh:

* SAML 2.0 Endpoint (HTTP)
* SLO Endpoint (HTTP)
* Certificate PEM file

### Step 2: Configure OneLogin app with Codefresh service provider settings

On the app configuration tab configure the following:

* Audience - `urn:auth0:codefresh-login:frontline`
* Recipient - `https://codefresh-login.auth0.com/login/callback?connection=frontline`
* ACS (Consumer) URL Validator - `[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)`
* ACS (Consumer) URL - `https://codefresh-login.auth0.com/login/callback?connection=frontline`

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/onelogin/image6.png" 
url="/images/enterprise/sso/onelogin/image6.png"
alt="Entering Codefresh Settings"
caption="Entering Codefresh Settings"
max-width="70%"
%}

This concludes the SSO setup for OneLogin. 

## What to read next

See the [overview page]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/#testing-your-identity-provider) on how to test the integration, activate SSO for collaborators and create sync jobs.