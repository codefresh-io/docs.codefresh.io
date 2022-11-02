---
title: "User settings"
description: ""
group: administration
toc: true
---

As a user in Codefresh, you can manage your account by authorizing access to your Git provider accounts, and optionally, enabling access for Codefresh support.

* Enable access for Codefresh support  
  Optional. Enable access to your account for troubleshooting purposes. 

* Authorize Git providers  
  The Git personal token is a user-specific access token, required to authenticate Git-based actions from Codefresh clients, per provisioned runtime.  

  The authorization method depends on the Git provider and on what authorization has been set up by ypur adin.
  If your admin has set up authentication with OAuth2, you can authorize access using OAuth2.  
  Or, you can always generate a personal access token from your Git provider and then add the same to Codefresh to authorize access.  

  > If you have access to more than one runtime, you can use the same token for multiple runtimes.  
    You must however authorize access individually for each runtime.   

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

### Authorize Git access with OAuth or personal access tokens
Authorize Git access with OAuth2 if your account admin has set up Codefresh as an OAuth application, or alternatively through personal access tokens from your Git provider.  
* For OAuth2:  The adminstrator pre-configures the permissions and expiry date. Once you supply your credentials for authorization, you are automatically directed to the Git Personal Tokens page. 

#### Generate personal access token for GitHub

#### Authorize access for Bitbucket
Bitbucket requires your Bitbucket account name and a personal access token to authorize access.  

**Generate personal access token**

1. Log in to your Bitbucket Cloud or Server account.
1. Select **Manage account > Account settings > Personal access tokens**.
1. Select these scopes: `repository write`,`Project read`.
1. Copy the personal access token generated as you will need it to authorize access.

**How to**
1. In the Codefresh UI, go to [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}.
1. Select the runtime, and then select one of the following:
  * To add a token, select **Add Token**.
  * To update an existing token by replacing it with a new token, select **Update Token**.
1. From the **Select Git provider** drop-down, select **Bitbucket**.
1. In the **Bitbucket username field**, enter  the username of your Bitbucket account.
1. In the **Bitbucket Personal Access Token** field, paste the token you generated.

<!---add new screenshot> -->


{:start="6"}
1. Click **Add Token**.
  In the Git Personal Access Tokens list, you can see that the new token is assigned to the runtime. 

#### Authorize access for GitHub
**Before you begin**
Make sure you have:
* For Bitbucket only, your Bitbucket account username
* If needed, a _personal access token_ with the required scopes:  
  * [GitHub]({{site.baseurl}}/docs/reference/git-tokens/#github-tokens)
  * [GitLab]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-tokens)
  * [Bitbucket]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-tokens)


**How to**
1. In the Codefresh UI, go to [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}.
1. Select the runtime, and then select one of the following:
  * To add a token, select **Add Token**.
  * To update an existing token by replacing it with a new token, select **Update Token**.
1. For OAuth2:
    > If the application is not registered, the button is disabled. Contact your admin for help.  
   * Click **Authorize Access to GitHub**.
   * Enter your credentials, and select **Sign In**.
   * Complete the verification if required, as when two-factor authentication is configured, for example.
<!---add new screenshot> -->

{:start="4"}
1. For Git personal access tokens:  
  * Expand **Advanced authorization options**. 
  <!---* For Bitbucket, enter your **Bitbucket username**. -->
  *  In the **Git Personal Access Token** field, paste the token you generated.

<!---add new screenshot> -->


{:start="5"}
1. Click **Add Token**.
  In the Git Personal Access Tokens list, you can see that the new token is assigned to the runtime. 


  


{::nomarkdown} 
<br>
{:/}


  




  
### Related articles  
[Git tokens in Codefresh]({{site.baseurl}}/docs/reference/git-tokens/)