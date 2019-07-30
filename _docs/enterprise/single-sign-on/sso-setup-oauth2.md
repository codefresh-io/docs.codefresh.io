---
title: "Setting Up OpenID Connect Federated Single Sign-On (SSO)"
description: ""
group: enterprise
sub_group: single-sign-on
redirect_from:
  - /docs/sso/sso-setup-oauth2/
toc: true
---

Codefresh natively supports login using GitHub, Bitbucket and Gitlab using OpenID Connect (OAUTH 2.0) protocol. This guide will review how to add additional SSO integrations based on OAUTH 2.0 as part of Codefresh Enterprise plan.

  
## Prerequisites

In order to add successfully an identity Provider in Codefresh you need to do some preparatory work with both Codefresh and the provider.

1. You need to inform your Identify provider that it will provide SSO services to Codefresh
1. You need to setup Codefresh and point it to your Identity Provider.

The first procedure differs according to you Identity Provider, but the second one is common for all providers.

Note that SSO is only available to Enterprise customers. Please [contact sales](https://codefresh.io/contact-sales/) in order to enable it for your Codefresh account.


## Identity Provider options

Codefresh currently supports

  * Auth0
  * Azure 
  * Okta
  * OneLogin

You can setup each provider

 1. At the [Codefresh customer level]({{site.baseurl}}/docs/enterprise/ent-account-mng/) 
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

To connect an Identity Provider, click the *add single-sign-on* button and select your provider from the drop-down menu.


## Codefresh SSO setup

Regardless of the Identity Provider that you have chosen, the Codefresh setup is the similar for all of them. You need to provide several fields to Codefresh to activate SSO. The common ones are:

* *Display Name* - A name for your Identity Provider 
* *Client ID* - An ID that will be used for the connection
* *Client Secret* - A secret associated with the ID

Some providers also need
additional fields which are specific to that provider. 

The process to obtain the values for these fields depends on the individual Identity Provider. In the following
sections we will outline the details for each one.

### Setting Auth0 as an Identity provider

See the [Auth0 instructions]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-auth0/). 

### Setting Azure as an Identity provider

See the [Azure instructions]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-azure/). 


### Setting Okta as an Identity Provider

See the [Okta instructions]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-okta/). 

### Setting OneLogin as an Identity Provider

See the [OneLogin instructions]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-onelogin/).


## Testing your Identity provider

Once you setup the Identity Provider, do the following

1. Go to the collaborators screen by clicking on *People* on the left sidebar (under User Management)
1. Add an active user that will be used for testing. We recommend you use your own user
 


{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/collaborators.png" 
url="/images/enterprise/sso/collaborators.png"
alt="Adding collaborators"
caption="Adding collaborators"
max-width="70%"
%}


{:start="3"}
1. Keep the current browser session open, and login via Corporate SSO in an incognito tab (or another browser).



{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/sign-with-sso.png" 
url="/images/enterprise/sso/sign-with-sso.png"
alt="Sign-in with SSO"
caption="Sign-in with SSO"
max-width="50%"
%}

{:start="4"}
1. If everything works ok add more users

## Selecting SSO method for collaborators

To add users and select their SSO method, go to *Collaborators* from the left sidebar. Then add the email or Codefresh username of a user. 

In addition to their role you can now select the SSO method they will use


{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/select-user-sso.png" 
url="/images/enterprise/sso/select-user-sso.png"
alt="Selecting SSO method"
caption="Selecting SSO method"
max-width="50%"
%}

>Notice that users that are added either manually or via synchronization (described in the next section) are by default **NOT set** to login via SSO. Remember to select the SSO method for each one.

It possible to use a different SSO method for each user (if you have multiple SSO configurations). 


## Syncing of teams after initial SSO setup

Once the initial setup is done, you can also sync your teams between Codefresh and the Identity provider.
You can do this via the [Codefresh Cli](https://codefresh-io.github.io/cli/) and specifically the [sync command](https://codefresh-io.github.io/cli/teams/synchronize-teams/).

>Note that currently teams/groups that contain spaces in their names are *not* synced. We will soon fix this limitation.

For example, to sync you azure teams you can execute

```
codefresh synchronize teams my-client-name -t azure

```

You can find the client-name from the SSO UI.

{% include image.html 
lightbox="true" 
file="/images/enterprise/sso/azure/client-name.png" 
url="/images/enterprise/sso/azure/client-name.png"
alt="SSO Client Name"
caption="SSO Client Name"
max-width="50%"
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

