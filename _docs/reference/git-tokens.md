---
title: "Git tokens"
description: ""
group: reference
redirect_from:
  - /docs/administration/git-tokens/ 
toc: true
---



Codefresh requires two types of Git tokens for authentication:
* A token per runtime (Git runtime token)
* A personal access token for each runtime, unique to every user (Git user token)

You can update expired, revoked, or invalid Git runtime and personal user tokens. 

### Git runtime tokens
The Git runtime token is required to provision Codefresh runtimes. The Git runtime token is specific to a runtime, and is mandatory for runtime installation. 
An expired, revoked, or invalid Git runtime token is flagged by a notification in the UI. You can then generate a new Git runtime token from your Git provider, and update it in Codefresh. 

#### Git runtime token permissions
Git runtime tokens need both repo and admim repo access to create webhooks for Git events.

{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   url="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   alt="Permissions for Git runtime token" 
   caption="Permissions for Git runtime token"
   max-width="60%" 
   %}

#### How to update a Git runtime token
Update Git runtime tokens when needed. 

**Before you begin**  
* Generate a new runtime token with the correct permissions  

**How to**  

1. In the Codefresh UI, when you see a notification, select **[Update Token]**.
  In the **Runtimes** page, runtimes with invalid tokens are prefixed by the key icon. Mouse over shows invalid token.
1. Select the runtime, and then on the top-right of the page, select and then **+Add Token**. 
1. Paste the generated personal access token. 
1. If there are no validation errors, select **Add**.

### Git personal tokens
The Git personal token is a user-specific personal access token per provisioned runtime. Unique to each user, it is required to authenticate Git-based actions per runtime in Codefresh. 
If not provided during runtime installation, user can add personal access tokens (PATs) after installation through [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"} in the UI, using either OAuth to authorize access or generate one from GitHub.

If users have access to multiple runtimes, they can use the same personal access token for all the runtimes.  
> Users must configure the token for each runtime.

#### Git personal token permissions
Git personal tokens need repo access for commits and other actions.

{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/github-pat.png" 
   url="/images/getting-started/github-pat.png" 
   alt="Permissions for Git personal token" 
   caption="Permissions for Git personal token"
   max-width="60%" 
   %}

### Related articles  
[User settings]({{site.baseurl}}/docs/administration/user-settings/)