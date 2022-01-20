---
title: "Setting Up OpenID Connect Federated Single Sign-On (SSO)"
description: ""
group: administration
sub_group: single-sign-on
redirect_from:
  - /docs/sso/sso-setup-oauth2/
  - /docs/enterprise/single-sign-on/sso-setup-oauth2/
toc: true
---

CSDP (Codefresh Software Development Platform) natively supports login using GitHub, Bitbucket and GitLab using the OpenID Connect (OAUTH 2.0) protocol. You can add new SSO integrations based on OAUTH 2.0 as part of the CSDP Enterprise plan.

  
### Prerequisites

To successfully add an identity provider in CSDP, you must configure settings both for the identity provider and in CSDP.
You need to:

1. Configure your identity provider to provide SSO services to Codefresh. The configuration differs per identity provider.
1. Set up Codefresh to point to your identity provider, common for all identity providers.

> SSO is only available to Enterprise customers. Please [contact sales](https://codefresh.io/contact-sales/) in order to enable it for your Codefresh account.

### SSO configuration using OAuth2

SSO configuration in CSDP is similar regardless of the identity provider selected. These settings are common to all providers:

* **Display Name**: The name of your identity provider 
* **Client ID**: The ID used for the connection
* **Client Secret**: The secret associated with the ID

For detailed information on how to configure SSO for your identity provider, see the following: 

[Azure]({{site.baseurl}}/docs/administration/single-sign-on/sso-azure/)  
[Google]({{site.baseurl}}/docs/administration/single-sign-on/sso-google/)  
[Okta]({{site.baseurl}}/docs/administration/single-sign-on/sso-okta/)
[OneLogin]({{site.baseurl}}/docs/administration/single-sign-on/sso-onelogin/).


### Test SSO with your identity provider

Once you configure SSO for your identity provider, do the following:
1. On the sidebar, below **User Management**, select **People**.
1. Add an active user for testing purposes. We recommend you use your own user.
1. Change Login method by selecting your Auth provider in the SSO drop-down.
   
  {% include image.html 
lightbox="true" 
file="/images/administration/sso/collaborators.png" 
url="/images/administration/sso/collaborators.png"
alt="Adding collaborators"
caption="Adding collaborators"
max-width="30%"
%}

{:start="3"}
1. Keep the current browser session open, and log in via Corporate SSO in an incognito tab (or another browser).
    
  {% include image.html 
lightbox="true" 
file="/images/administration/sso/sign-with-sso.png" 
url="/images/administration/sso/sign-with-sso.png"
alt="Sign-in with SSO"
caption="Sign-in with SSO"
max-width="50%"
%}

{:start="4"}
1. If everything works as expected, add more users.

>Before enabling SSO for all users, you **MUST** make sure that it works for the test user. Once SSO is enabled for a user, Codefresh blocks logins through other IDPs for this user, and only allows login through the enabled SSO. If the selected SSO method does not work for some reason, the user is locked out of Codefresh.


## Select SSO method for collaborators

To add users and select their SSO method, from the sidebar, select **Collaborators**. Then add the user's email or Codefresh username.   
In addition to their role, you can now select the SSO method to use:

  {% include image.html 
lightbox="true" 
file="/images/administration/sso/select-user-sso.png" 
url="/images/administration/sso/select-user-sso.png"
alt="Selecting SSO method"
caption="Selecting SSO method"
max-width="50%"
%}

>Users who are added either manually or via synchronization (described in the next section) are by default **NOT set** to login via SSO. Remember to explicitly select the SSO method for each one. If you have multiple SSO configurations, you can use a different SSO method for each user.

### Define a default identity provider

If you have multiple identity providers for SSO, you can define one of them as your default provider.  
When you define a default provider:
* The SSO method is automatically selected for all newly invited users
* All new users receive an email with an invite link that points directly to the login page of that SSO provider


1. Mouse over the top-right of the SSO screen

 {% include image.html 
lightbox="true" 
file="/images/administration/sso/default-sso.png" 
url="/images/administration/sso/default-sso.png"
alt="Default SSO provider"
caption="Default SSO provider"
max-width="90%"
%}

### Sync teams after initial SSO setup

Once the initial setup is done, you can also sync your teams between Codefresh and the identity provider.
You can do this via the [Codefresh Cli](https://codefresh-io.github.io/cli/), using the [sync command](https://codefresh-io.github.io/cli/teams/synchronize-teams/).

For example, to sync you azure teams you can execute:

```
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

Even though you can run this command manually, it makes more sense to run it periodically as a job. And the obvious
way to perform this is with a Codefresh pipeline. The CLI can be used as a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/).

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

To fully automate this pipeline, set a [cron trigger]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/cron-triggers/) for this pipeline. The cron-trigger is responsible for running this pipeline, (and therefore synchronizing the teams), in a fully automated manner. 
This way you can synchronize your teams every day/week/hour depending on you cron trigger setup.

