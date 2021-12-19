---
title: "Manage users"
description: "Add other Codefresh users to your account"
group: administration
toc: true
---

If you have a Codefresh account, you can add any number of users to collaborate on repositories or pipelines. Adding a user requires assiging a role, optionally an SSO provider.

#### Role
The Role defines the user's access level, and is by default User. The Admin role????

#### SSO
If you have SSO, Codefresh supports 

## Add a user

1. In Codefresh, click Account Settings.
2. From the sidebar, below General, select [Collaboration](https://g.codefresh.io/2.0/account-settings/users){:target="\_blank"}.

{% include
image.html
lightbox="true"
file="/images/administration/users/users-list.png"
url="/images/administration/users/users-list.png"
alt="Users list"
caption="Users list"
max-width="100%"
%}

3. Select Users, and then select [Add User](https://g.codefresh.io/2.0/account-settings/users?drawer=add-user){:target="\_blank"}.

{% include 
	image.html 
	lightbox="true" 
	file="/images/administration/users/invite-user.png" 
	url="/images/administration/users/invite-user.png" 
	alt="Invite users" 
	caption="Invite users"
    max-width="100%" 
%}


4. Do the following:  

   In **User's email address**, type the email address of the user to add.  
   Below Assign a role, select either  **User** or **Administrator**.  
   If SSO is configured for the account, select the specific SSO provider. 

The user receives an email invitation. The Users page is updated with the information on the user. 
The Status column shows Pending until the user accepts the invitation, and then changes to ??. The user is created only on accepting the invitation. (NIMA: is there an expiry date?)  
 (NIMA: useful to add possible statuses).
>To edit the account details, click ??.  
 To delete the user permanently, click ??.

## Setting a role for each collaborator (NIMA: we don't need this)
You can also change the [role]({{site.baseurl}}/docs/administration/access-control/#users-and-administrators) of each team member by clicking on the edit button in the users list page.

* People with the **User** role are not permitted to enter the account settings area.
* People with the  role have full access to your account and can change all your settings, so make sure that they are trusted colleagues.

You can completely remove a user from your account by clicking on the *bin* icon on the far right.

### Common issues

* [User is prompted to enter an organization name](https://support.codefresh.io/hc/en-us/articles/360020177959-User-is-prompted-to-enter-an-organization-name)
* [Account invitation not permitting login](https://support.codefresh.io/hc/en-us/articles/360015251000-Account-invitation-not-permitting-login)

### What to read next
[Access control]({{site.baseurl}}/docs/administration/access-control/)  
[Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/)


