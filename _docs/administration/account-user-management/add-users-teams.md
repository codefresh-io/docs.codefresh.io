---
title: "Adding users and teams"
description: "Add users and teams to Codefresh accounts"
group: administration
sub_group: account-user-management
redirect_from:
  - /docs/administration/invite-your-team-member/
  - /docs/accounts/
  - /docs/accounts/invite-your-team-member/
  - /docs/administration/invite-your-team-member/
  - /docs/administration/account-user-management/add-users/
toc: true
---

Once you have created a Codefresh account, you can add any number of users to collaborate on repositories, entities, and processes.  

{% if page.collection != site.gitops_collection %}
For Codefresh on-premises, see [On-premises account & user setup]({{site.baseurl}}/docs/installation/on-premises/on-prem-configuration/).
{% endif %}

You can then create teams to group users who share a common denominator, such as the same permissions, access to the same functionality, or roles. Teams make it easy for administrators to both define and manage items shared by multiple users in an organization.

## Users in Codefresh

Adding a user to an account requires assigning a role to define access to account resources, and optionally, selecting an SSO provider for the user:

* **Email address**: The user's company email address.
* **Role**: Defines the user's access level to the resources in the account.  
  * **User**: The default. With this role, users can work with repositories and entities, but cannot change configuration settings.
  * **Administrator**: With this role, users have full access to accounts, and can change all settings, so make sure that they are trusted colleagues.
  {% if page.collection != site.gitops_collection %}
  For guidelines on access control, see [Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control-pipelines/) and [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/). 
  {% endif %}
  {% if page.collection == site.gitops_collection %}
  For guidelines on access control, see [Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/).
  {% endif %}
* **SSO**: By default, SSO is not enabled for users. If required, explicitly select the SSO provider. For an overview of SSO, see [About Federated Single Sign-on]({{site.baseurl}}/docs/administration/single-sign-on/).

### Add a user to a Codefresh account

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar select **Users**, and then click **Add User**.  
1. Add the user's **Email address**.
   <!---add screenshot-->
1. From **Assign a role**, select either **Administrator** or **User**.
1. If SSO is configured for the account, **Select the SSO provider** from the list.  

### Manage users in a Codefresh account

Once you add a user to your Codefresh account, you have the following options in the context menu of the user in the Users page. 
* **Edit**: Edit user's email address, change the role, or select a new SSO provider.
* **Delete**: Remove the user account.

## Teams in Codefresh

Teams are users who share the same permissions, roles, or requirements, defined according to company processes.
You first create a team and then invite users to it. You can then view the service accounts the user is assigned to, if any. 

{% if page.collection != site.gitops_collection %}
* Users
* Admins with users [invited as collaborators](#assign-a-user-to-a-team)  

> **NOTE**  
> Only Enterprise customers can add new teams. Other Codefresh plans can only use the predefined *Users* and *Admin* teams. [Contact us](https://codefresh.io/contact-us/){:target="\_blank"} to upgrade to an Enterprise plan.


### Automatically creating projects for teams

As part of the global pipeline settings for an account, when creating a team, you can also automatically create a project and a project tag with the same name as that of the team. Enabling **auto-create projects for teams** (disabled by default), simplifies permissions setup for pipelines and projects, as it also creates a Read rule for the project. See [Auto-create projects for teams]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams).

{% endif %}

### Create teams in Codefresh

Create multiple teams in Codefresh.
1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Teams**, and then click **Add Team**.  
1. Enter the **Team Name** and click **Create**.
   > **NOTE**  
   > The team name can include only lower-case alphanumeric characters and hyphens, without spaces.
  



### Assign users to teams
Add one or more users to a team. You can assign the same user to multiple teams, as in most companies, users have overlapping roles.  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Teams**, and then click the team to which to add users.
1. Click **Add to team**, and select the user from the list.
1. Click **Add**.

### Manage teams and users

You can change the name of the team, delete the team, or remove users from a team .

* **Remove user from team**: Click the team name and from the user's context menu, select ** user's email address, change the role, or select a new SSO provider.
* **Delete**: Remove the user account.



## Troubleshoot user invites

1. For your security and to ensure a smooth process, it's crucial that the email account you're logging in with is the same as the email address used for the invite.
1. Log out of any previous sessions with the relevant identity provider and, if necessary, try a different browser or a private/incognito window.
1. If you can log in but need help finding the inviting account, your user may be under multiple accounts. If this is the case, you can switch between available accounts via the user menu drop-down in the upper right-hand corner.
1. If you are prompted to create an organization, you either logged in before you were invited to the account or logged in with a different email address than the invite.
   * Finish the account setup by entering a unique organization name (this creates a personal account).
   * Once logged in, click your username on the top right and see if you have access to the invited account.
1. If this issue persists, please know that our support team is here for you. [Contact](https://support.codefresh.io/hc/en-us/requests/new) them with as many details as you have, and they will assist you promptly.

## Related articles
[Single sign-on]({{site.baseurl}}/docs/administration/single-sign-on/)  
[Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
{% if page.collection != site.gitops_collection %}
[Setting up OAuth authentication for Git providers]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup)  
[Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control-pipelines/) 
{% endif %}
