---
title: "Managing Git PATs"
description: "Generate, assign, and manage Git user tokens for GitOps Runtimes"
group: administration
sub_group: user-self-management
toc: true
---

As a user in Codefresh, you must authorize access to your Git provider accounts, and authenticate Git-based actions from Codefresh clients, per provisioned runtime. This is done through the Git user token, which is a personal access token, unique to each use. For more details, see [Git tokens in Codefresh]({{site.baseurl}}/docs/reference/git-tokens/).

The authorization method depends on the Git provider and the authorization method set up by your account admin: 
* OAuth2  
  If your admin has set up authentication with OAuth2, you can authorize access using OAuth2.  
* Git user personal access token  
  You can always generate a Git user token, a personal access token, from your Git provider and then add the same to Codefresh to authorize access. 



## Authorize Git access in Codefresh
Authorize Git access to GitOps Runtimes with OAuth2 if your account admin has set up Codefresh as an OAuth application, or alternatively through personal access tokens from your Git provider.  

If you have access to more than one GitOps Runtime in the same or in different accounts, you can use the same Git user token for all the Runtimes you have access to. _You must however authorize access for each GitOps Runtime individually_.  

>**NOTE**:  
  For OAuth2, the administrator pre-configures the permissions and expiry date. Once you supply your credentials for authorization, you are automatically directed to the Git Personal Tokens page. 

**Before you begin**  

Make sure you have:  
* For Bitbucket only, your Bitbucket account username
* If needed, a _personal access token_ from your Git provider with the required scopes
  * [GitHub](#generate-github-personal-access-tokens)
  * [GitLab](#generate-gitlab-personal-access-tokens)
  * [Bitbucket](#generate-bitbucket-personal-access-tokens)

**How to**  
1. In the Codefresh UI, on the toolbar, click your avatar, and then select [**Git Personal Access Token**](https://g.codefresh.io/2.0/git-personal-access-token){:target="\_blank"}.
1. Select the GitOps Runtime to authenticate to, and then do one of the following:
  * To add a token, select **Add Token**.
  * To update an existing token by replacing it with a new token, select **Update Token**.
1. Do as needed:
      * For **OAuth2**: 
        1. Click **Authorize Access to GitHub**.
        1. Enter your credentials, and select **Sign In**.
        1. Complete the verification if required, as when two-factor authentication is configured, for example.
      * For **Git personal access tokens**:  
        1. Expand **Advanced authorization options**. 
        1. For Bitbucket, enter your **Bitbucket username**. 
        1. In the **Personal Access Token** field, paste the token you generated.

<!---add new screenshot> -->


{:start="4"}
1. Click **Add Token**.  
  In the Git Personal Access Tokens list, you can see that the new token is assigned to the GitOps Runtime. 



## Generate GitHub personal access tokens 

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
   alt="GitHub personal access token scopes" 
   caption="GitHub personal access token scopes"
   max-width="50%" 
  %}

{:start="4"}  
1. Copy the personal access token generated as you will need it to authorize access.

{::nomarkdown}
</br>
{:/}

## Generate GitLab personal access tokens

1. Log in to your GitLab Cloud or Server account.
1. Select **User settings > Access tokens**.
1. Define the following:
  * Token name
  * Expiration date
  * Select these scopes: `read_api`, `read_repository`, `write_repository`

 {% include 
   image.html 
   lightbox="true" 
   file="/images/administration/manage-pats/gitlab-pat-scopes.png" 
   url="/images/administration/manage-pats/gitlab-pat-scopes.png" 
   alt="GitLab personal access token scopes" 
   caption="GitLab personal access token scopes"
   max-width="50%" 
  %}

{:start="4"}  
1. Copy the personal access token generated as you will need it to authorize access.

## Generate Bitbucket personal access tokens


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
   alt="Bitbucket personal access token scopes" 
   caption="Bitbucket personal access token scopes"
   max-width="50%" 
  %}

{:start="4"}
1. Copy the personal access token generated as you will need it to authorize access.


## Related articles  
[Git tokens in Codefresh]({{site.baseurl}}/docs/reference/git-tokens/)