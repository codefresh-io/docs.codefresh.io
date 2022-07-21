---
title: "OpenID Connect"
description: "Setting Up OpenID Connect Federated Single Sign-On (SSO)"
group: single-sign-on
toc: true
---

Codefresh natively supports login using GitHub, Bitbucket and GitLab using the OpenID Connect (OAUTH 2.0) protocol. This guide will review how to add  SSO integrations based on OAUTH 2.0 as part of Codefresh Enterprise plan.

## Prerequisites

In order to add successfully an identity Provider in Codefresh you need to do some preparatory work with both Codefresh and the provider.

1. You need to inform your Identify provider that it will provide SSO services to Codefresh
1. You need to set up Codefresh and point it to your Identity Provider.

The first procedure differs according to you Identity Provider, but the second one is common for all providers.

Note that SSO is only available to Enterprise customers. Please [contact sales](https://codefresh.io/contact-sales/) in order to enable it for your Codefresh account.

## Identity Provider options

Codefresh currently supports

* Auth0
* Azure
* Google
* Okta
* OneLogin

To access the SSO configuration at the account level.

1. Click on your avatar at the top right of the GUI and select *Account settings*.
1. In the new screen, select *Single Sign-on* from the left sidebar.

{% include image.html
lightbox="true"
file="/images/administration/sso/add-sso-dropdown.png"
url="/images/administration/sso/add-sso-dropdown.png"
alt="SSO provider settings"
caption="SSO provider settings"
max-width="70%"
%}

{:start="3"}
1. To connect an Identity Provider, click the *add single-sign-on* button and select your provider from the drop-down menu.

## Codefresh SSO setup

Regardless of the Identity Provider that you have chosen, the setup in Codefresh is similar for all of them. You need to provide several fields to Codefresh to activate SSO. The common ones are:

* *Display Name* - A name for your Identity Provider
* *Client ID* - An ID that will be used for the connection
* *Client Secret* - A secret associated with the ID

Some providers also need additional fields which are specific to that provider.

The process to obtain the values for these fields depends on the individual Identity Provider. In the following
sections we will outline the details for each one.

### Setting Auth0 as an Identity provider

See the [Auth0 instructions]({{site.baseurl}}/docs/single-sign-on/oidc/oidc-auth0/).

### Setting Azure as an Identity provider

See the [Azure instructions]({{site.baseurl}}/docs/single-sign-on/oidc/oidc-azure/).

### Setting Google as an Identity provider

See the [Google instructions]({{site.baseurl}}/docs/single-sign-on/oidc/oidc-google/).

### Setting Okta as an Identity Provider

See the [Okta instructions]({{site.baseurl}}/docs/single-sign-on/oidc/oidc-okta/).

### Setting OneLogin as an Identity Provider

See the [OneLogin instructions]({{site.baseurl}}/docs/single-sign-on/oidc/oidc-onelogin/).

## Testing your Identity provider

Once you set up the Identity Provider, do the following

1. Go to the collaborators screen by clicking on *People* on the left sidebar (under User Management).
1. Add an active user that will be used for testing. We recommend you use your own user.
1. Change Login method by selecting your Auth provider from the SSO drop-down.

    {% include image.html
    lightbox="true"
    file="/images/administration/sso/collaborators.png"
    url="/images/administration/sso/collaborators.png"
    alt="Adding collaborators"
    caption="Adding collaborators"
    max-width="70%"
    %}

1. Keep the current browser session open, and log in via Corporate SSO in an incognito tab (or another browser).

    {% include image.html
    lightbox="true"
    file="/images/administration/sso/sign-with-sso.png"
    url="/images/administration/sso/sign-with-sso.png"
    alt="Sign-in with SSO"
    caption="Sign-in with SSO"
    max-width="50%"
    %}

1. If everything works, add more users.

> Before enabling SSO for all users, you **MUST** make sure that it is working for the test user, because if SSO is enabled for a user, Codefresh blocks logins through other IDPs for this user and only the enabled SSO is allowed. If the selected SSO method does not work for some reason, users will be locked out of Codefresh.

## Selecting SSO method for collaborators

To add users and select their SSO method, go to *Collaborators* from the left sidebar. Then add the email or Codefresh username of a user.

In addition to their role you can now select the SSO method they will use

{% include image.html
lightbox="true"
file="/images/administration/sso/select-user-sso.png"
url="/images/administration/sso/select-user-sso.png"
alt="Selecting SSO method"
caption="Selecting SSO method"
max-width="50%"
%}

**SSO login for new and existing users**  
If you have multiple SSO providers configured, you can select a different provider for each user if so required.  

* New users   
  SSO login is **not configured** by default for new users, added either manually or via team synchronization.  
  To enable SSO login for a new user, you must _explicitly select_ the SSO provider for the new user.  

* Existing users  
  If SSO login is already configured for an existing user and you add a new identity provider, to change the SSO method to the new provider, you must _explicitly select_ the provider for the user. 


## Setting a default provider

If you have multiple SSO providers set you can hover your mouse on the top right of the SSO screen
and setup one of them as the default provider.

{% include image.html
lightbox="true"
file="/images/administration/sso/default-sso.png"
url="/images/administration/sso/default-sso.png"
alt="Default SSO provider"
caption="Default SSO provider"
max-width="90%"
%}

If a default sso provider is set then:

1. This SSO method will be automatically assigned to all new invited users
1. All new users will receive an email with an invite link that points them directly to the login page of that SSO provider

## Syncing of teams after initial SSO setup

Once the initial setup is done, you can also sync your teams between Codefresh and the Identity provider.
You can do this via the [Codefresh Cli](https://codefresh-io.github.io/cli/) and specifically the [sync command](https://codefresh-io.github.io/cli/teams/synchronize-teams/).

For example, to sync you azure teams you can execute

```bash
codefresh synchronize teams my-client-name -t azure
```

You can find the client-name from the SSO UI.

{% include image.html
lightbox="true"
file="/images/administration/sso/azure/client-name.png"
url="/images/administration/sso/azure/client-name.png"
alt="SSO Client Name"
caption="SSO Client Name"
max-width="40%"
%}

Even though you can run this command manually it makes more sense to run it periodically as a job. And the obvious
way to perform this, is with a Codefresh pipeline. The CLI can be used as a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/).

You can create a git repository with a [codefresh.yml]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/) file with the following contents:

`YAML`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  syncMyTeams:
    title: syncTeams
    image: codefresh/cli
    commands:
      - 'codefresh synchronize teams my-client-name -t azure'
{% endraw %}
{% endhighlight %}

To fully automate this pipeline you should set a [cron trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/cron-triggers/) for this pipeline. The cron-trigger will be responsible for running this pipeline (and therefore synchronizing the teams) in a fully automated manner.

This way you can synchronize your teams every day/week/hour depending on you cron trigger setup.
