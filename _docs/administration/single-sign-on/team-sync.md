---
title: Common configuration for SSO providers
description: "Set up team sync, default SSO provider for accounts"
redirect_from:
  - /docs/single-sign-on/team-sync/
toc: true
---

Once you create an SSO provider account in Codefresh, you can:
* Automatically or manually sync the teams created in your Identity Provider (IdP) with Codefresh
* Set a default SSO provider for your account
* Override the account-level SSO provider for specific users


## Syncing teams in IdPs with Codefresh
Team sync synchronizes all users and teams provisioned in the SSO provider with Codefresh. 

In Codefresh you can sync users and teams either automatically or manually:
* Automatically, in the Codefresh UI if the option is supported for your SSO provider 
* Manually, either on-demand through the Codefresh CLI, or through a Codefresh pipeline

<!---
### Multi-account team-sync in Codefresh for SSO providers
SSO providers can sync users from multiple accounts, in addition to the primary account associated with the specific SSO integration.
This functionality benfits enterprises that manage multiple accounts for a single customer, as it streamlines the sync process through a single operation. 
If a customer has dev and prod accounts in Codefresh, they can set up an SSO integration for one of the accounts, and then specificy the ID of the second account to sync.

Codefresh validates if the user has access to the accounts specified, and during team-sync retrieives the accounts and invites users in teams/groups for those accounts.


-->
### Team-sync support for SSO providers
The table lists the SSO providers supported and the team-sync option available for them.

{: .table .table-bordered .table-hover}
| Protocol   | SSO provider              | Team-sync    | |  
|            |                  | Automated    | Manual|  
| ---------- | --------------   |--------------|-------|
|**OIDC**    | Auth0            | -             | -    |
|            | Azure            | ✅            | ✅    |
|            | Google           | -             | ✅    |
|            | Keycloak         | -             | ✅   |
|            | Okta             | ✅            | ✅  |
|            | OneLogin         | -             | ✅    |
|**LDAP**    |                  | -             | ✅ |
|**SAML**    | GSuite           | ✅            | ✅ |  
|            | JumpCloud        | -             |- |
|            | Okta             | ✅            |  ✅ |
|            | OneLogin         | -             |- |
|            | PingID           | -             |- |



### Automated team-sync in Codefresh UI

The automated team-sync option is only available in the Codefresh UI.  

##### Flow for automated team-sync

1. Codefresh syncs users and groups through the SSO API, and grants SSO permissions for each invited user during sync.
1. You set up the SSO provider in Codefresh, and select one or both options for automated team-sync:
    * If only the **Auto-sync users and teams** option is selected, Codefresh automatically triggers a sync at the interval defined. On first-time sign-in, the invited user needs to enter additional information such as First Name, Last Name, Country.
    * If the **Activate user** option is also selected (when available), on first-time sign-in, the invited user is automatically authenticated without having to enter additional information.  




### Manual team-sync via CLI 

Manually synchronize users and teams provisioned in your SSO provider account, on-demand, through the Codefresh CLI with the [`synchronize teams`](https://codefresh-io.github.io/cli/teams/synchronize-teams/){:target="\_blank"} command.


>**NOTE**    
Make sure that there are no [domain restrictions on the email address]({{site.baseurl}}/docs/administration/account-user-management/add-users/#define-session-timeouts-and-domain-restrictions-for-user-accounts).

As an example, you can sync your Azure teams with the CLI: 

```shell
codefresh synchronize teams <my-client-name> -t azure
```
where:  
`<my-client-name>` is the Client Name/Assertion URL/Callback URL that is automatically generated by Codefresh when you save the SSO configuration for your provider.


{% include 
image.html
lightbox="true"
file="/images/administration/sso/azure/09-client-name.png"
url="/images/administration/sso/azure/09-client-name.png"
alt="SSO Client Name"
caption="SSO Client Name"
max-width="40%"
%}


{% if page.collection != site.gitops_collection %}
### Manual team-sync with Codefresh pipelines

As an alternative to manually syncing teams on demand via the Codefresh CLI, you can manually sync teams using Codefresh pipelines. 

>**NOTE**    
Make sure that there are no [domain restrictions on the email address]({{site.baseurl}}/docs/administration/account-user-management/add-users/#define-session-timeouts-and-domain-restrictions-for-user-accounts).

A pipeline makes it possible to run team-sync periodically as a job. You can use the CLI as a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/), as in the example below.
You can create a Git repository with a [codefresh.yml]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/) file with the following content:

```yaml
version: '1.0'
steps:
  syncMyTeams:
    title: syncTeams
    image: codefresh/cli
    commands:
      - 'codefresh synchronize teams my-client-name -t azure'
```

To fully automate the pipeline, you can set a [Csron trigger]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/) for it. Depending on how you set up your Cron trigger, you can synchronize your teams every day/week/hour. 



### Sync GitHub organization teams to Codefresh

As an admin, you may want to sync your GitHub Organization Teams with your Codefresh account. At the same time, you do not want to set up an SSO provider and have the users use any login provider they choose.

The Personal Access Token (PAT) from a user will sync ALL Organizations and ALL Teams to which the user has access. It is recommended to use a "machine" account to access the one organization you need.

1. Create a PAT that has access to read organizations and teams
1. Install and configure the Codefresh CLI

    `codefresh synchronize teams github -t github --tk $GHTOKEN`

1. The sync will invite all users except for those that have private email settings turned on.

Once the initial sync happens, you can set up a cron trigger pipeline to run the command on a schedule.

{% endif %}

## Set a default SSO provider for account

If you have multiple SSO providers, you can set one of them as the default provider for your account. 
Setting a default provider assigns the selected SSO provider automatically to all new users in the account. The link in the email invitation takes them directly to the login page of that SSO provider.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Single Sign-On**.
1. From the list, select the SSO account to set as default and click the **Edit** icon on the right.
1. Scroll down and select **Set as default**. 
  The Single Sign-on page shows the SSO provider tagged as the default.

{% include 
image.html
lightbox="true"
file="/images/administration/sso/default-sso.png"
url="/images/administration/sso/default-sso.png"
alt="Set default SSO provider for account"
caption="Set default SSO provider for account"
max-width="50%"
%}

  

{% include 
image.html
lightbox="true"
file="/images/administration/sso/sso-list-with-default.png"
url="/images/administration/sso/sso-list-with-default.png"
alt="Single Sign-on list showing the default SSO provider"
caption="Single Sign-on list showing the default SSO provider"
max-width="80%"
%}


## Select SSO provider for individual users

You can override the default SSO provider if set for the account, with a different SSO provider for specific users if so required.  
* **New users**   
  If you have an SSO provider selected as the default, that provider is automatically assigned to new users, added either manually or via team synchronization. 
  You can change the SSO provider later. 

* **Existing users**  
  SSO login is not configured by default for existing users. You must _explicitly select_ the SSO provider for existing users.  
  If SSO login is already configured for an existing user, and you add a new identity provider, to change the SSO login to the new provider, you must _select_ the new provider for the user. 

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Users & Teams**.   
1. For the user, select the SSO provider from the SSO list.

{% include 
image.html
lightbox="true"
file="/images/administration/sso/select-user-sso.png"
url="/images/administration/sso/select-user-sso.png"
alt="Selecting a different SSO provider for specific user"
caption="Selecting a different SSO provider for specific user"
max-width="70%"
%}

## Related articles
[Setting up OIDC Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/oidc/)  
[Setting up SAML2 Federated SSO]({{site.baseurl}}/docs/administration/single-sign-on/saml/)  
[LDAP Single Sign-On (SSO)]({{site.baseurl}}/docs/administration/single-sign-on/ldap/)  



