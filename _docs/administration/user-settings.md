---
title: "Managing Git personal access tokens"
description: ""
group: administration
toc: true
---
As a user, you can generate or update Git personal tokens required for authentication when these have expired or are invalid. The Git personal token is a user-specific personal access token per provisioned runtime, and is required to authenticate Git-based actions per runtime in Codefresh.  

> You can use the same token for multiple runtimes, if you need access to more than one runtime. 
You must however authorize GitHub access or add the personal access token for each runtime.  


### Git personal token permissions
For Git personal access tokens, make sure you select `repo` scope for commits and other actions when you generate the token.
{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/github-pat.png" 
   url="/images/getting-started/github-pat.png" 
   alt="Permissions for Git personal token" 
   caption="Permissions for Git personal token"
   max-width="30%" 
   %}

### How to update a Git personal token
Update your Git personal access token for each runtime when needed.  

**Before you begin**  
* For a Git personal access token, generate a valid personal access token from your Git provider  

**How to**  

1. In the Codefresh UI, go to [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}.
1. Select **+Add Token**.
1. Paste the generated token in the **Token** field, and select **+Add Token**. 

The Token column for the runtime is updated with the encrypted token, and the Add Token button changes to Delete Token.  

#### Related info  
[Git tokens in Codefresh]({{site.baseurl}}/docs/administration/git-tokens/)