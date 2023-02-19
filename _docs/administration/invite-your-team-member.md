---
title: "Invite your team members"
description: "Add other Codefresh users to your account"
group: administration
redirect_from:
  - /docs/accounts/
  - /docs/accounts/invite-your-team-member/
toc: true
---

You can easily add additional people to a Codefresh account to work with your repositories or pipelines. You also define the level of access they have in the  account resources.

## Managing users in a Codefresh account

On the left sidebar of the Codefresh UI choose *Account Settings* and then click on the *User & Teams* menu item under *User Management*


{% include 
	image.html 
	lightbox="true" 
	file="/images/administration/users/invite-users.png" 
	url="/images/administration/users/invite-users.png" 
	alt="Invite users" 
	caption="Invite users"
    max-width="100%" 
%}


1. In the *Username* text box, type the Codefresh username or email address of the user you want to add.
1. Click the *Add* button.


An email will be sent to the person that holds the email account. Once this invitation is sent, they will show as Pending until the invite is successfully accepted and the user is created


## Setting a role for each collaborator

You can also change the [role]({{site.baseurl}}/docs/administration/access-control/#users-and-administrators) of each team member by using the drop-down next to their name:

* People with the **User** role will be able to work with your repositories and pipelines, but will not be able to change settings
on clusters, docker registries, git integrations, shared configurations etc.
* People with the **Administrator** role have full access to your account and can change all your settings, so make sure that they are trusted colleagues.

You can completely remove a user from your account by clicking on the *bin* icon on the far right.

## Common issues

* [User is prompted to enter an organization name](https://support.codefresh.io/hc/en-us/articles/360020177959-User-is-prompted-to-enter-an-organization-name)
* [Account invitation not permitting login](https://support.codefresh.io/hc/en-us/articles/360015251000-Account-invitation-not-permitting-login)

## What to read next

* [Access control]({{site.baseurl}}/docs/administration/access-control/)
* [Single Sign on]({{site.baseurl}}/docs/administration/single-sign-on/)

