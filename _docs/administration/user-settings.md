---
title: "Managing Git personal access tokens"
description: ""
group: administration
toc: true
---
As a user, you can generate or update Git personal tokens required for authentication when these have expired or are invalid. The Git personal token is a user-specific personal access token per provisioned runtime, and is required to authenticate Git-based actions per runtime in Codefresh.  
If your admin has set up authentication with OAuth2, you can authorize access to GitHub using OAuth2.
Alternatively, you can always generate a personal access token from GitHub and then add the same to Codefresh to authorize access.

> You can use the same token for multiple runtimes, if you need access to more than one runtime. 
You must however authorize GitHub access using OAuth2 or add the personal access token for each runtime.  


### Git personal token permissions
For OAuth2, the permissions and expiry date are pre-configured by the administrator.  

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

To authorize with OAuth2, you have to supply your credentials. When authorized, you are automatically directed to the Git Personal Tokens page.

**Before you begin**  
* For a Git personal access token, generate a valid personal access token from your Git provider  

**Before you begin**  
1. In the Codefresh UI, go to [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}.
1. Select **+Add Token**. 
1. For OAuth2:
   * In the Add Token panel, select **Authorize Access to GitHub**.
    > If the application is not registered, you get a _Git app not registered_ error. Contact your admin to continue.  
   *  Enter your credentials, and select **Sign In**.
   * Complete the verification, if you have two-factor authentication for example.

    {% include 
      image.html 
      lightbox="true" 
      file="/images/administration/user-settings/oauth-user-authentication.png" 
      url="/images/administration/user-settings/oauth-user-authentication.png" 
      alt="Authorizing access with OAuth2" 
      caption="Authorizing access with OAuth2"
      max-width="30%" 
   %}
   
  The token is generated, and you are automatically directed to the Git Personal Access Tokens page. 

{:start="4"}
1. For Git personal access tokens:  
  Paste the generated token in the **Token** field, and select **+Add Token**. 

    {% include 
      image.html 
      lightbox="true" 
      file="/images/administration/user-settings/user-settings-pat.png" 
      url="/images/administration/user-settings/user-settings-pat.png" 
      alt="Adding a Git personal access token" 
      caption="Adding a Git personal access token"
      max-width="30%"  
   %}


#### Related articles  
[Git tokens in Codefresh]({{site.baseurl}}/docs/administration/git-tokens/)