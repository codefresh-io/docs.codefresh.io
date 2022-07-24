---
title: "User settings"
description: ""
group: administration
toc: true
---

As a user in Codefresh, you can manage the access tokens defined in your account, and optionally, enable access for Codefresh support.

* Enable access for Codefresh support  

  Optional. Enable access to your account for troubleshooting purposes. 

* Manage Git tokens for authentication  

  The Git personal token is a user-specific access token per provisioned runtime, and is required to authenticate Git-based actions per runtime in Codefresh.  
  If your admin has set up authentication with OAuth2, you can authorize access to GitHub using OAuth2.  
  Or, you can always generate a personal access token from GitHub and then add the same to Codefresh to authorize access.  


### Enable access for Codefresh support
Enable Codefresh support personnel to access your user account. Access to your account is useful for visibility during troubleshooting.  

You can disable this security setting at any time.

> Codefresh personnel takes action only after confirmation from you, and all actions are audited.

1. In the CSDP UI, go to [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}.
1. Enable **Allow Codefresh support tem to log in...**.

{% include 
   image.html 
   lightbox="true" 
   file="/images/administration/user-settings/security-enable-support-access.png" 
   url="/images/administration/user-settings/security-enable-support-access.png" 
   alt="Enable access for Codefresh support" 
   caption="Enable access for Codefresh support"
   max-width="50%" 
%}



### Update/delete Git personal access tokens
Update your Git personal access token for hosted and hybrid runtimes when needed from the User Settings page.  
To authorize with OAuth2, you have to supply your credentials. When authorized, you are automatically directed to the Git Personal Tokens page. 

* For OAuth2, the permissions and expiry date are pre-configured by the administrator.  
* For Git personal access tokens, when generating a new token, make sure you select `repo` scope for commits and other actions.   


> If you need access to more than one runtime, you can use the same token for multiple runtimes. 
You must however authorize GitHub access or add the personal access token individually for each runtime.  


{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/github-pat.png" 
   url="/images/getting-started/github-pat.png" 
   alt="Permissions for Git personal token" 
   caption="Permissions for Git personal token"
   max-width="50%" 
%}

To authorize with OAuth2, you have to supply your credentials. When authorized, you are automatically directed to the Git Personal Tokens page.

**Before you begin**  
* To use a Git PAT, generate a valid personal access token from your Git provider  

**How to**  
1. In the CSDP UI, go to [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}.
1. Select the runtime, and then select one of the following:
  * To add a token, select **Add Token**.
  * To update an existing token by replacing it with a new token, select **Update Token**.
  * To delete an existing token, select **Delete Token**.
1. For OAuth2:
   * In the Add Token panel, click **Authorize Access to GitHub**.
    > If the application is not registered, you get an error. For example, _Git app not registered_. Contact your admin for help.  
   *  Enter your credentials, and select **Sign In**.
   * Complete the verification, for example, if you two-factor authentication is configured.


    {% include 
      image.html 
      lightbox="true" 
      file="/images/administration/user-settings/oauth-user-authentication.png" 
      url="/images/administration/user-settings/oauth-user-authentication.png" 
      alt="Authorizing access with OAuth2" 
      caption="Authorizing access with OAuth2"
      max-width="30%" 
   %}
   


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


The token is generated and you are redirected to the User Settings page where you can see the new Git token assigned to the runtime. 


### Related articles  
[Git tokens in Codefresh]({{site.baseurl}}/docs/reference/git-tokens/)