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

On the left sidebar of the Codefresh UI choose *Account Settings* and then click on the *People* menu item under *User Management*


{% include image.html lightbox="true" file="/images/account/collaborators.png" url="/images/account/collaborators.png" alt="Collaborators" max-width="70%" %}


1. In the *Username* text box, type the Codefresh username or email address of the user you want to add.
1. Click the *Add* button.



A message will be sent to the person that holds the email account. Once approved you will see the collaborator
in the user list.


## Setting a role for each collaborator

You can also change the role of each team member by using the drop-down next to their name:

* People with the **User** role will be able to work with your repositories and pipelines, but will not be able to change settings
on clusters, docker registries, git integrations, shared configurations etc.
* People with the **Administrator** role have full access to your account and can change all your settings, so make sure that they are trusted colleagues.

You can completely remove a user from your account by clicking on the *bin* icon on the far right.




## What to read next

* [Access control]({{site.baseurl}}/docs/enterprise/access-control/)
* [Account management]({{site.baseurl}}/docs/enterprise/ent-account-mng/)
* [Single Sign on]({{site.baseurl}}/docs/enterprise/single-sign-on/)

