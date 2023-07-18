---
title: "Git tokens"
description: ""
group: reference
redirect_from:
  - /docs/administration/git-tokens/ 
toc: true
---



Codefresh requires two types of Git tokens for authentication in GitOps, a Git Runtime token, and a Git user token. Both the Runtime and user tokens are Git access tokens, used for different purposes in Codefresh. 

* The Git Runtime token is unique to and mandatory for every GitOps Runtime. It must be provided during the Runtime installation.
* The Git user token is an access token that is unique to every user in the Codefresh platform. It is required after installation for every Runtime which the user has access to. 



## Git Runtime tokens versus Git user tokens in Codefresh
The table below summarizes the main differences between the Git Runtime and user tokens in Codefresh.

{: .table .table-bordered .table-hover}
|                            | Git Runtime token                  | Git user token         |
| -------------------------- | ---------------------          | ------------------ |
| Usage                      | {::nomarkdown}<ul><li>During installation, to create the Git repository and install the GitOps Runtime.</li><li>After installation, used by:<ul><li>Argo CD to clone the Git repos, pull changes, and sync to the K8s cluster.</li><li> Argo Events to create web hooks in Git repositories.</li><li>`cap-app-proxy` to clone the Shared Configuration Repository</li></ul> {:/} | Authenticate and authorize user actions in Codefresh UI and CLI to Git repositories for every provisioned GitOps Runtime. Users can view and manage the Git user tokens assigned to the Runtimes in the [Git Personal Access Token](https://g.codefresh.io/2.0/user-settings){:target="\_blank"} page.  |
| Created                    | Before Runtime installation; see [required scopes for Git Runtime tokens](#git-runtime-token-scopes).   | After Runtime installation; see [required scopes for Git user tokens](#git-user-access-token-scopes).
| Managed by                    | Admin at account-level                    | User   |
| Associated Account Type    | (Recommended) [Service account or robot account](#use-a-servicerobot-account-for-gitops-runtimes) | User account    |


## Git Runtime token scopes
The table below lists the scopes required for Git Runtime tokens for the different Git providers.


| Git provider                  | Required scopes for Git Runtime token           | 
| ---------------------------- | ------------------------------ | 
| GitHub and GitHub Enterprise |{::nomarkdown}<ul><li>Classic:<ul><li><code class="highlighter-rouge">repo</code></li><li><code class="highlighter-rouge">admin:repo_hook</code></li></ul><li>Fine-grained:<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code></li><li>Repository permissions:<ul><li>Administration: <code class="highlighter-rouge">Read and write</code></li><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li><li>Webhook: <code class="highlighter-rouge">Read and write</code></li></ul></li></ul></li></ul>{:/}|
| GitLab Cloud and GitLab Server       |{::nomarkdown}<ul><li><code class="highlighter-rouge">api</code></li><li><code class="highlighter-rouge">read_repository</code></li></ul> {:/}         |                           |
| Bitbucket Cloud and Bitbucket Server | {::nomarkdown} <ul><li>Account: <code class="highlighter-rouge">Read</code></li><li>Workspace membership: <code class="highlighter-rouge">Read</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li><li>Repositories: <code class="highlighter-rouge">Write, Admin </code></li></ul>{:/}|



## Git user access token scopes
The table below lists the scopes required for Git user access tokens for the different Git providers.


<!--- > **TIP**:  
  If a user has access to multiple GitOps Runtimes in the same or in different accounts in Codefresh, they can use the same Git user access token to authenticate and authorize all the Runtimes to which they have access.     
  The user must configure the Git user token for each Runtime separately.   
  User can manage their Git user tokens for Runtimes, as described in [Managing Git PATS]({{site.baseurl}}/docs/administration/user-self-management/manage-pats/).

-->

| Git provider                  | Required scopes for Git user token          | 
| ---------------------------- | ------------------------------ | 
| GitHub and GitHub Enterprise |{::nomarkdown}<ul><li><code class="highlighter-rouge">repo</code></li></ul>{:/}|  {::nomarkdown}<ul><li><b>Repository access</b>: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code></li><li><b>Repository permissions</b>: <ul><li><b>Contents</b>: <code class="highlighter-rouge">Read and write</code></li><li><b>Metadata</b>: <code class="highlighter-rouge">Read-only</code></li></li></ul></ul>{:/}|
| GitLab Cloud and GitLab Server       |{::nomarkdown}<ul><li><code class="highlighter-rouge">write_repository</code> (includes <code class="highlighter-rouge">read_repository</code>) </li><li><code class="highlighter-rouge">api_read</code></li></ul> {:/}  |
| Bitbucket Cloud and Bitbucket Server | {::nomarkdown} <ul><li>Account: <code class="highlighter-rouge">Read</code></li><li>Workspace membership: <code class="highlighter-rouge">Read</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li><li>Repositories: <code class="highlighter-rouge">Write, Admin </code></li></ul>{:/}|

## Use a service/robot account for GitOps Runtimes
For GitOps Runtime installation, we recommend using an account not related to any specific user in your organization. 
Service/robot accounts are ideal for this purpose, as they provide secure authentication, restricted permissions, and centralized management. 

You need to create a service or robot account with your Git provider, generate the Git Runtime token, and use this account exclusively to install GitOps Runtimes.

## Related articles  
[Managing Git PATs]({{site.baseurl}}/docs/administration/user-self-management/manage-pats/)  
[User settings]({{site.baseurl}}/docs/administration/user-self-management/user-settings/)