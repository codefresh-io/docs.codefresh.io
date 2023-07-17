---
title: "Git tokens"
description: ""
group: reference
redirect_from:
  - /docs/administration/git-tokens/ 
toc: true
---



Codefresh requires two types of Git tokens for authentication in GitOps, a Git Runtime token, and a Git user token. Both the Runtime and user tokens are Git personal access tokens, used for different purposes in Codefresh. 

* The Git Runtime token is mandatory when installing GitOps Runtimes, and must be provided during the installation.
* The Git user token is a personal access token that is unique to every user in the Codefresh platform. It is required after installation for every Runtime that the user has access to. 



## Git Runtime tokens versus Git user tokens in Codefresh
The table below summarizes the main differences between the Git Runtime and user tokens in Codefresh.

{: .table .table-bordered .table-hover}
|                            | Git Runtime token                  | Git user token         |
| -------------------------- | ---------------------          | ------------------ |
| Usage                      | {::nomarkdown}<ul><li>During installation, to create the Git repository if it does not exist, and install the GitOps Runtime.</li><li>After installation, used by:<ul><li>Argo CD to clone the Git repos, pull changes, and sync to the K8s cluster.</li><li> Argo Events to create web hooks in Git repositories.</li><li>`cap-app-proxy` to clone the Shared Configuration Repository</li></ul> {:/} | Authenticate and authorize user actions in Codefresh UI and CLI to Git repositories for every provisioned GitOps Runtime (OAuth2 if set up is also permitted). Users can view the list of Runtimes and the tokens assigned to each Runtime in [Git Personal Access Token](https://g.codefresh.io/2.0/user-settings){:target="\_blank"}.</li></ul>  |
| Created                    | Before Runtime installation; see [required scopes for Git Runtime tokens](#git-runtime-token-scopes).   | After Runtime installation;see [required scopes for Git user (Personal Access) tokens](#git-user-personal-access-token-scopes).
| Managed                    | By admin.                       | By user.   |
| Associated Account Type    | (Recommended) Service account or robot account | User account    |
| Security                   | Shared among Runtimes in same or different accounts | Individual access to each Runtime |
| Authentication             | Automated processes   | Individual users   |
| Auditing and Accountability| Process-level tracking| User-level tracking|


## Git Runtime token scopes
The table below lists the scopes required for Git Runtime tokens for the different Git providers.


| Git provider                  | Runtime token scopes          | 
| ---------------------------- | ------------------------------ | 
| GitHub and GitHub Enterprise |{::nomarkdown}<ul><li>Classic:<ul><li><code class="highlighter-rouge">repo</code></li><li><code class="highlighter-rouge">admin:repo_hook</code></li></ul><li>Fine-grained:<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code></li><li>Repository permissions:<ul><li>Administration: <code class="highlighter-rouge">Read and write</code></li><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li><li>Webhook: <code class="highlighter-rouge">Read and write</code></li></ul></li></ul></li></ul>{:/}|
| GitLab Cloud and GitLab Server       |{::nomarkdown}<ul><li><code class="highlighter-rouge">api</code></li><li><code class="highlighter-rouge">read_repository</code></li></ul> {:/}         |                           |
| Bitbucket Cloud and Bitbucket Server | {::nomarkdown} <ul><li>Account: <code class="highlighter-rouge">Read</code></li><li>Workspace membership: <code class="highlighter-rouge">Read</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li><li>Repositories: <code class="highlighter-rouge">Write, Admin </code></li></ul>{:/}|



## Git user (personal access) token scopes
The table below lists the scopes required for Git user personal access tokens for the different Git providers.


> **TIP**:  
  If you have access to multiple GitOps Runtimes in the same or in different accounts in Codefresh, you can use the same Git user (personal access) token to authenticate and authorize all the Runtimes to which you have access.     
  You must configure the Git user token for each Runtime separately.

| Git provider                  | User token scopes          | 
| ---------------------------- | ------------------------------ | 
| GitHub and GitHub Enterprise |{::nomarkdown}<ul><li><code class="highlighter-rouge">repo</code></li></ul>{:/}| | {::nomarkdown}<ul><li><b>Repository access</b>: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code></li><li><b>Repository permissions</b>: <ul><li><b>Contents</b>: <code class="highlighter-rouge">Read and write</code></li><li><b>Metadata</b>: <code class="highlighter-rouge">Read-only</code></li></li></ul></ul>{:/}|
| GitLab Cloud and GitLab Server       |{::nomarkdown}<ul><li><code class="highlighter-rouge">write_repository</code> (includes <code class="highlighter-rouge">read_repository</code>) </li><li><code class="highlighter-rouge">api_read</code></li></ul> {:/}         |                           |
| Bitbucket Cloud and Bitbucket Server | {::nomarkdown} <ul><li>Account: <code class="highlighter-rouge">Read</code></li><li>Workspace membership: <code class="highlighter-rouge">Read</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li><li>Repositories: <code class="highlighter-rouge">Write, Admin </code></li></ul>{:/}|

## Use a service/robot account for GitOps Runtimes
For GitOps Runtime installation, we recommend using an account not related to any specific user in your organization. 
Service/robot accounts are ideal for this purpose, as they provide secure authentication, restricted permissions, and centralized management. 

You need to create an account once, generate the Git Runtime token, and use this account exclusively to install GitOps Runtimes.


1. Create a service/robot account in Codefresh with the Administrator Role.
1. Log in to your Git provider account, and generate a Git Runtime token with the required scopes.
1. Log back in to Codefresh, this time, to the service/robot account you created.
1. Install the GitOps Runtime with 



## Related articles  
[Managing Git PATs]({{site.baseurl}}/docs/administration/user-self-management/manage-pats/)  
[User settings]({{site.baseurl}}/docs/administration/user-self-management/user-settings/)