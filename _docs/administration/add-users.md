---
title: "Managing users and teams in Codefress"
description: ""
group: administration
toc: true
---

Once you have created a Codefresh account, you can add any number of users to collaborate on repositories, workflows, and pipelines, and teams of users. 


## Users in Codefresh
Adding a user requires assigning a role to define access to account resources, and optionally, selecting an SSO provider:

* **Role**: Defines the user's access level to the resources in the account.  
  * **User**: The default. With this role, users can work with your repositories and pipelines, but cannot change settings
on clusters, docker registries, git integrations, shared configurations etc.
  * **Administrator**: User with this role have full access to your account and can change all your settings, so make sure that they are trusted colleagues.
  For guidelines on access control, see [Access control]({{site.baseurl}}/docs/administration/access-control/).  
* **SSO**: By default, SSO is not enabled for users. If required, explicitly select the SSO provider. For an overview of SSO, see [Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/).


###  Add a user to a Codefresh account 
1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From the sidebar, from Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/account-admin/collaborators/users){:target="\_blank"}.   
1. Select **Users**, and then select **+ [Add User]**.  
1. Type the **User's email address**, and click **Invite**. 
<!---add screenshot-->
  The user receives an email invitation, and in the Users list, the user name is set to Pending, and status to Resend. 
1. From the **Role** dropdown, select either **User** or **Administrator**.  
1. If SSO is configured for the account, **Select SSO provider**.  



### Manage users in a Codefresh account

Once you add a user to an account, you can do the following to manage that user:  
* For invitations pending accept, select ![](/images/administration/users/icon-Send.png?display=inline-block) **Resend**.  
* To edit the user's email address, select ![](/images/administration/users/icon-Edit.png?display=inline-block) **Edit**.  
* To remove the user account, select ![](/images/administration/users/icon-Delete.png?display=inline-block) **Delete**.



## Teams in Codefresh

### Create a team in Codefresh

Create a team in Codefresh and then assign users to the team. You can assign the same user to multiple teams, as in most companies, users have overlapping roles.  
 >By default there are two teams, *users* and *admins* with users [invited as collaborators]({{site.baseurl}}/docs/accounts/invite-your-team-member/).
 
 Teams allow you to enforce access control through ABAC.

> Only Enterprise customers can add new teams. Other Codefresh plans can only use the predefined *Users* and *Admin* teams. [Contact us](https://codefresh.io/contact-us/) if you wish to upgrade to an Enterprise plan.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From the sidebar, from Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/account-admin/collaborators/users){:target="\_blank"}.   
1. Select **Teams**, and then select **Create a Team**.  
1. Enter the **Team Name**.
  > The team name can include only lower-case alphanumeric characters and hyphens, without spaces.
  
  See the screenshot below for some sample team names.

{% include image.html
  lightbox="true"
  file="/images/administration/access-control/teams.png"
  url="/images/administration/access-control/teams.png"
  alt="Examples of teams in Codefresh"
  caption="Examples of teams in Codefresh"
  max-width="80%"
    %}

### Assign a user to a team
1. To assign users to the team, do the following:
    1. Hover over the team and click the **Settings** icon. 
    1. Click **Invite to team**, type the email address of the user to invite, and then click **Add**.
1. To change the name of the team, click **Edit** and type the new name. 

## Define session timeouts and domain restrictions for user accounts
As an administrator, you can also define session timeouts to automatically log out users who have inactive for the specified duration, and restrict invitations to specific email domains.  

> The maximum inactivity duration you can set is 30 days. Inactive users are warned 90 seconds before the last 15 minutes.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From the sidebar, from Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/account-admin/collaborators/users){:target="\_blank"}.   
1. Select **Security**.  
1. For **User Session**, add the timeout duration in minutes/hours/days.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/security-timeout.png"
  url="/images/administration/access-control/security-timeout.png"
  alt="Security timeout"
  caption="Security timeout"
  max-width="90%"
    %}

1. To restrict invitations to specific email domains, in the **Email domains** field below User Invitations, type in the domains, one per line.

## Troubleshoot add users

* [User is prompted to enter an organization name](https://support.codefresh.io/hc/en-us/articles/360020177959-User-is-prompted-to-enter-an-organization-name)
* [Account invitation not permitting login](https://support.codefresh.io/hc/en-us/articles/360015251000-Account-invitation-not-permitting-login)

<!--this is already mentioned as inline refs; add other topics-->
## What to read next
[Access control]({{site.baseurl}}/docs/administration/access-control/)  
[Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/)  


