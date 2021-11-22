---
title: "Add users"
description: "Add other Codefresh users to your account"
group: administration
toc: true
---

You can easily add additional people to a Codefresh account to work with your repositories or pipelines. You also define the level of access they have in the  account resources.

## Managing users in a Codefresh account

Navigate to your account settings and find your user management under [collaboration section](https://g.codefresh.io/2.0/account-settings/users){:target="\_blank"}.

{% include
image.html
lightbox="true"
file="/images/administration/users/users-list.png"
url="/images/administration/users/users-list.png"
alt="Users list"
caption="Users list"
max-width="100%"
%}

Click on [add user](https://g.codefresh.io/2.0/account-settings/users?drawer=add-user){:target="\_blank"} which will open a new modal with a form to fill

{% include 
	image.html 
	lightbox="true" 
	file="/images/administration/users/invite-user.png" 
	url="/images/administration/users/invite-user.png" 
	alt="Invite users" 
	caption="Invite users"
    max-width="100%" 
%}


1. In the *User's email address* text box, type the email address of the user you want to add.
2. Choose the role that you want to assign to the user.
1. In case SSO is configured for you account you can choose the specific required sso provider.


An email will be sent to the person that holds the email account. Once this invitation is sent, they will show as Pending until the invite is successfully accepted and the user is created


## Setting a role for each collaborator

You can also change the [role]({{site.baseurl}}/docs/administration/access-control/#users-and-administrators) of each team member by clicking on the edit button in the users list page.

* People with the **User** role are not permitted to enter the account settings area.
* People with the **Administrator** role have full access to your account and can change all your settings, so make sure that they are trusted colleagues.

You can completely remove a user from your account by clicking on the *bin* icon on the far right.

## Common issues

* [User is prompted to enter an organization name](https://support.codefresh.io/hc/en-us/articles/360020177959-User-is-prompted-to-enter-an-organization-name)
* [Account invitation not permitting login](https://support.codefresh.io/hc/en-us/articles/360015251000-Account-invitation-not-permitting-login)

## What to read next

* [Access control]({{site.baseurl}}/docs/administration/access-control/)
* [Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/)

