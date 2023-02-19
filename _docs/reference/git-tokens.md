---
title: "Git tokens"
description: ""
group: reference
redirect_from:
  - /docs/administration/git-tokens/ 
toc: true
---



Codefresh requires two types of Git tokens for authentication:
* Git runtime token for runtime installation
  Used by:
  * Argo CD clone repositories and pull changes to sync the desired state in Git to the live state on the cluster. 
  * Argo Events to create webhooks in Git repositories for Event Sources in Delivery Pipelines
  
  The Git runtime token is runtime-specific but not user-specific.
  

* Git user token, a user-specific personal access token for each runtime, unique to every user  
  Unique to every user, the Git user token is used to authenticate the user for client-based actions, such as Git clone and push operations on specific repositories.
  Git user token requirements translate to permission scopes which differ for the different Git providers.  

  After installation, you need to authorize Git access for every provisioned runtime either through OAuth2 or through a personal access token from your Git provider.  
  Every user can view the list of runtimes and tokens assigned to each runtime in [User Settings](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}. Codefresh flags and notifies you of invalid, revoked, or expired tokens. 




### Git runtime token scopes
The Git runtime token is mandatory for runtime installation.

{::nomarkdown}
</br>
{:/}

#### GitHub and GitHub Enterprise runtime token scopes

* `repo`
* `admin:repo_hook`

{::nomarkdown}
</br>
{:/}

#### GitLab Cloud and GitLab Server runtime token scopes

* `api`
* `read_repository` 

{::nomarkdown}
</br>
{:/}

#### Bitbucket Cloud and Bitbucket Server runtime token scopes

* **Account**: `Read`
* **Workspace membership**: `Read`
* **Webhooks**: `Read and write`
* **Repositories**: `Write`, `Admin`

{::nomarkdown}
</br></br>
{:/}

### Git personal tokens
The Git personal token is a user-specific personal access token per provisioned runtime. Unique to each user, it may be required after to authenticate Git-based actions per runtime in Codefresh, based on how your admin has set up authentication for Git providers. 

> If you have access to multiple runtimes, you can use the same personal access token for all the runtimes.   
  You must configure the token for each runtime.

{::nomarkdown}
</br>
{:/}

#### GitHub and GitHub Enterprise personal user token scopes
* `repo`

<!---{% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/github-pat.png" 
   url="/images/getting-started/github-pat.png" 
   alt="Permissions for Git personal token" 
   caption="Permissions for Git personal token"
   max-width="60%" 
   %}-->
{::nomarkdown}
</br>
{:/}

#### GitLab Cloud and GitLab Server personal user token scopes

* `write_repository` (includes `read-repository`)
* `api-read`

{::nomarkdown}
</br>
{:/}

#### Bitbucket Cloud and Server personal user token scopes

* **Account**: `Read`
* **Workspace membership**: `Read`
* **Repositories**: `Write`, `Admin`

### Related articles  
[User settings]({{site.baseurl}}/docs/administration/user-self-management/user-settings/)