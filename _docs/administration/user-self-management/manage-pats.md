---
title: "Managing Git PATs"
description: "Generate, assign, and manage Git user tokens for GitOps Runtimes"
group: administration
sub_group: user-self-management
toc: true
---

As a user in Codefresh, you must authorize access to your Git provider accounts, and authenticate Git-based actions from Codefresh clients, per provisioned GitOps Runtime. This is done through the Git user token, which is an access token unique to each user. For more details, including required scopes and how the Git user token differs from the Git Runtime token, see [Git tokens in Codefresh]({{site.baseurl}}/docs/security/git-tokens/).

The authorization mode depends on the authorization method set up by your account admin: 
* OAuth2  
  If your admin has set up authentication with OAuth2, you can authorize access using OAuth2.  
* Git user access token  
  You can always generate a Git user token from your Git provider and then add the same to the GitOps Runtime in Codefresh to authorize access. 



## Authorize Git access to GitOps Runtimes
Authorize Git access to GitOps Runtimes with OAuth2 if your account admin has set up Codefresh as an OAuth application, or alternatively through Git user access tokens from your Git provider.  

If you have access to more than one GitOps Runtime in the same or in different accounts, you can use the same Git user token for all the Runtimes you have access to. _You must however authorize access for each GitOps Runtime individually_.  

>**NOTE**    
  For OAuth2, the administrator pre-configures the permissions and expiry date. Once you supply your credentials for authorization, you are automatically directed to the Git Personal Tokens page. 

**Before you begin**  

Make sure you have:  
* For Bitbucket only, your Bitbucket account username
* If needed, a _user access token_ from your Git provider with the required scopes
  * [GitHub](#generate-github-user-access-tokens)
  * [GitLab](#generate-gitlab-user-access-tokens)
  * [Bitbucket](#generate-bitbucket-user-access-tokens)

**How to**  
1. In the Codefresh UI, on the toolbar, click your avatar, and then select [**Git Personal Access Token**](https://g.codefresh.io/2.0/git-personal-access-token){:target="\_blank"}.
1. Select the GitOps Runtime to authenticate to, and then click **Add Token**.
1. Do as needed:
      * For **OAuth2**: 
        1. Click **Authorize Access to GitHub**.
        1. Enter your credentials, and select **Sign In**.
        1. Complete the verification if required, as when two-factor authentication is configured, for example.
      * For **Git user access tokens**:  
        1. Expand **Advanced authorization options**. 
        1. For Bitbucket, enter your **Bitbucket username**. 
        1. In the **Personal Access Token** field, paste the token you generated.

{% include 
image.html 
lightbox="true" 
file="/images/runtime/gitops-user-authorize-runtime-access.png" 
url="/images/runtime/gitops-user-authorize-runtime-access.png"
alt="Authorize access to GitOps Runtime with OAuth/Git user token" 
caption="Authorize access to GitOps Runtime with OAuth/Git user token" 
max-width="50%" 
%}

{:start="4"}
1. Click **Add Token**.  
  In the Git Personal Access Tokens list, you can see that the new token is assigned to the GitOps Runtime. 

## Manage Git user tokens for GitOps Runtimes
Once you authorize access to one or more GitOps Runtimes through OAuth or Git user tokens, the GitOps Runtimes and their associated tokens are listed in the Git Personal Access Tokens page. 

##### Manage Git user access tokens
You can manage Git user tokens for any GitOps Runtime, without affecting the GitOps Runtime at the account-level. Deleting the Git user token for a GitOps Runtime will deny _you_ access to the Git repositories, Git Sources and other resources associated with that Runtime, while the Runtime itself is not affected. 

##### Notifications for GitOps Runtimes 
If you have turned on notifications for GitOps Runtimes, Codefresh alerts you to GitOps Runtimes with invalid or expired Git personal access tokens.  
You can turn off these notifications for selectively for Runtimes for which these alerts are less critical.

##### Before you begin 
Have your Git user token handy

##### How to  
1. In the Codefresh UI, on the toolbar, click your avatar, and then select [**Git Personal Access Token**](https://g.codefresh.io/2.0/git-personal-access-token){:target="\_blank"}.
1. To replace/delete the Git user token for a Runtime, do one of the following:
  * To replace, click **Add Token**, and then either click **Authorize Access to Git provider** for OAuth2, or paste your Git user token into the **Git Personal Access Token** field. 
  * To delete, click **Delete Token**. The token is deleted and the **Add Token** button is displayed next to the Runtime. 
1. To turn off notifications, click the context menu at the right of the row with the Runtime and enable **Hide notifications**.

{% include 
image.html 
lightbox="true" 
file="/images/runtime/gitops-user-disable-runtime-notifications.png" 
url="/images/runtime/gitops-user-disable-runtime-notifications.png"
alt="Disable notifications option for GitOps Runtimes" 
caption="Disable notifications option for GitOps Runtimes"
max-width="70%" 
%}

{% include 
image.html 
lightbox="true" 
file="/images/runtime/gitops-indication-notification-disabled.png" 
url="/images/runtime/gitops-indication-notification-disabled.png"
alt="GitOps Runtime with notifications disabled" 
caption="GitOps Runtime with notifications disabled"
max-width="70%" 
%}



## Generate GitHub user access tokens 

1. Log in to your GitHub or GitHub Enterprise account.
1. Select **Settings > Developer Settings > Personal Access Tokens > Tokens (classic)**.
1. Define the following:
  * Token name
  * Expiration date
  * Select scope: `repo`

  {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/manage-pats/github-pat-scopes.png" 
   url="/images/administration/manage-pats/github-pat-scopes.png" 
   alt="GitHub user access token scopes" 
   caption="GitHub user access token scopes"
   max-width="50%" 
  %}

{:start="4"}  
1. Copy the user access token generated as you will need it to authorize access.

{::nomarkdown}
</br>
{:/}

## Generate GitLab user access tokens

1. Log in to your GitLab Cloud or Server account.
1. Select **User settings > Access tokens**.
1. Define the following:
  * Token name
  * Expiration date
  * Select these scopes: `write_repository` (includes `read_repository`), `api_read` 

 {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/manage-pats/gitlab-pat-scopes.png" 
   url="/images/administration/manage-pats/gitlab-pat-scopes.png" 
   alt="GitLab user access token scopes" 
   caption="GitLab user access token scopes"
   max-width="50%" 
  %}

{:start="4"}  
1. Copy the user access token generated as you will need it to authorize access.

## Generate Bitbucket user access tokens


1. Log in to your Bitbucket Cloud or Server account.
1. Select **Personal Settings > App passwords**.
1. Define the **Label**.
  Select these scopes: 
  * **Permissions**: `Read`
  * **Workspace membership**: `Read`
  * **Repositories**: `Write`

  {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/manage-pats/bitbucket-pat-scopes.png" 
   url="/images/administration/manage-pats/bitbucket-pat-scopes.png" 
   alt="Bitbucket user access token scopes" 
   caption="Bitbucket user access token scopes"
   max-width="50%" 
  %}

{:start="4"}
1. Copy the user access token generated as you will need it to authorize access.


## Related articles  
[Git tokens in Codefresh]({{site.baseurl}}/docs/security/git-tokens/)