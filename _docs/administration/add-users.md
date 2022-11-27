---
title: "Adding users to Codefresh accounts"
description: ""
group: administration
toc: true
---

Once you have created a Codefresh account, you can add any number of users to collaborate on repositories, workflows, and pipelines.  

Adding a user requires assigning a role to define access to account resources, and optionally, selecting an SSO provider:

* **Role**: Defines the user's access level to the resources in the account.  
  * **User**: The default. With this role, users can work with your repositories and pipelines, but cannot change settings
on clusters, docker registries, git integrations, shared configurations etc.
  * **Administrator**: User with this role have full access to your account and can change all your settings, so make sure that they are trusted colleagues.
  For guidelines on access control, see [Access control]({{site.baseurl}}/docs/administration/access-control/).  
* **SSO**: By default, SSO is not enabled for users. If required, explicitly select the SSO provider. For an overview of SSO, see [Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/).


## Add a user to an account 
1. In the Codefresh UI, on the toolbar, click the **Settings** icon and then select **Account Settings**.
1. From the sidebar, from Access & Collaboration, select [**Users & Teams**](https://g.codefresh.io/account-admin/collaborators/users){:target="\_blank"}.   
1. Select **Users**, and then select **+ [Add User]**.  
1. Type the **User's email address**, and click **Invite**. 
<!---add screenshot-->
  The user receives an email invitation, and in the Users list, the user name is set to Pending, and status to Resend. 
1. From the **Role** dropdown, select either **User** or **Administrator**.  
1. If SSO is configured for the account, **Select SSO provider**.  





## Manage users in an account

Once you add a user to an account, you can do the following to manage that user:  
* For invitations pending accept, select ![](/images/administration/users/icon-Send.png?display=inline-block) **Resend**.  
* To edit the user's email address, select ![](/images/administration/users/icon-Edit.png?display=inline-block) **Edit**.  
* To remove the user account, select ![](/images/administration/users/icon-Delete.png?display=inline-block) **Delete**.


## Troubleshoot add users

* [User is prompted to enter an organization name](https://support.codefresh.io/hc/en-us/articles/360020177959-User-is-prompted-to-enter-an-organization-name)
* [Account invitation not permitting login](https://support.codefresh.io/hc/en-us/articles/360015251000-Account-invitation-not-permitting-login)

<!--this is already mentioned as inline refs; add other topics-->
## What to read next
[Access control]({{site.baseurl}}/docs/administration/access-control/)  
[Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/)  


