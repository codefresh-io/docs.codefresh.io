---
title: "Git tokens for GitOps"
description: "Understand Git tokens and scopes required for Git authentication"
group: security
redirect_from:
  - /docs/administration/git-tokens/ 
  - /docs/reference/git-tokens/ 
toc: true
---




Codefresh requires two types of Git tokens for authentication in GitOps, a Git Runtime token, and a Git user token. The Runtime and user tokens are both Git access tokens used for different purposes. See [Git Runtime tokens versus Git user tokens in Codefresh](#git-runtime-tokens-versus-git-user-tokens-in-codefresh) and [Interaction between Argo CD secrets and Git tokens](#interaction-between-argo-cd-secrets-and-git-tokens). 
* The [Git Runtime token](#git-runtime-token-scopes) is mandatory for every GitOps Runtime. It must be provided during the Runtime installation, and is typically associated with a service/robot account.
* The [Git user token](#git-user-access-token-scopes) is an access token that is unique to every user in the Codefresh platform. It is required after installation for every Runtime which the user has access to. 

>**IMPORTANT**  
At all times, _both tokens are always securely stored on your cluster_ and never stored locally on our platform. 

Users can also create and use Git tokens with custom scopes for both GitOps Runtimes and for Git repositories associated with the Runtimes that they need to access. See [Git user tokens with custom scopes](#git-user-tokens-with-custom-scopes).

## Git Runtime tokens versus Git user tokens in Codefresh
The table below summarizes the main differences between the Git Runtime token and Git user tokens in Codefresh.

{: .table .table-bordered .table-hover}
|                            | Git Runtime token                  | Git user token         |
| -------------------------- | ---------------------          | ------------------ |
| Usage                      | {::nomarkdown}<ul><li><i>During installation</i>, to create the Shared Configuration Repository to store shared runtime settings and install the GitOps Runtime.</li><li><i>After installation</i>, used by:<ul><li>Argo CD to clone the Git repos, pull changes, and sync to the K8s cluster.</li><li>Used during promotion to perform commits, and pull requests for GitHub. <li> Argo Events to create web hooks in Git repositories.</li><li><code class="highlighter-rouge">cap-app-proxy</code> to clone the Shared Configuration Repository</li></ul> {:/} | Authenticate and authorize user actions in Codefresh UI and CLI to Git repositories for every provisioned GitOps Runtime. <br>Users can view and manage the Git user tokens assigned to the Runtimes in the [Git Personal Access Token](https://g.codefresh.io/2.0/user-settings){:target="\_blank"} page.  |
| Created                    | Before Runtime installation; see [required scopes for Git Runtime tokens](#git-runtime-token-scopes).   | After Runtime installation; see [required scopes for Git user tokens](#git-user-access-token-scopes).
| Managed by                    | Admin at account-level                    | User   |
| Associated Account Type    | (Recommended) [Service account or robot account](#use-a-servicerobot-account-for-gitops-runtimes) | User account    |

## Interaction between Git tokens and secrets  
Codefresh needs access to Git repositories for reading and writing to configuration and resource manifests. This section elaborates on how Git providers and repositories with Git tokens for authentication to . 


### GitOps Runtime token and secret
The Git Runtime token is the personal access token provided during Runtime installation and is automatically converted to a secret. The secret for the Runtime repository is stored in the `runtime-repo-creds-secret` secret, labeled with `argocd.argoproj.io/secret-type: repo-creds`.  

This label 
The Runtime uses the same credentials 

The secret:
* Allows Argo CD to use the credentials to clone and pull data from the repositories it syncs from for read-only operations.
* Allows the Runtime to both read and write to the same repositories, for all actions on behalf of the Runtime such as commits during promotions.

### GitOps user token and secret

The Git user token, also a personal access token, is used for operations initiated by the user via the UI, and is therefore unique to each user.  
The Git user token is also converted to an encrypted secret, and stored in the `git-default-<account-id>` secret.

The token is used to:
* Perform Git commits and pushes on behalf of the user.
* Validate the user’s access permissions to specific Git repositories and determine application visibility.




## Git Runtime token scopes
The table below lists the scopes required for Git Runtime tokens for the different Git providers. You can also create a Git Runtime token with custom scopes and [add it directly to the `values.yaml` file](#git-runtime-token-in-valuesyaml).


| Git provider                  | Required scopes for Git Runtime token           | 
| ---------------------------- | ------------------------------ | 
| GitHub and GitHub Enterprise |{::nomarkdown}<ul><li>Classic:<ul><li><code class="highlighter-rouge">repo</code></li><li><code class="highlighter-rouge">admin:repo_hook</code></li></ul><li>Fine-grained (personal or group-based):<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code> including all repos that Argo CD syncs from</li><li>Repository permissions:<ul><li>Administration: <code class="highlighter-rouge">Read and write</code></li><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li><li>Webhook: <code class="highlighter-rouge">Read and write</code></li></ul></li></ul></li></ul>{:/}|
| GitLab Cloud and GitLab Server       |Can be personal or group-based:{::nomarkdown}<ul><li><code class="highlighter-rouge">api</code> (includes <code class="highlighter-rouge">read_api</code>, <code class="highlighter-rouge">read_repository</code>, and <code class="highlighter-rouge">write_repository</code>)</li></ul> {:/}**NOTE**<br>For _personal_ tokens, the token must have `write` access to the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/), and `read` access to all the repositories that Argo CD syncs from.<br>For _group_ tokens, the group must include all the repositories that Argo CD syncs from.      |             
| Bitbucket Cloud and Bitbucket Server | {::nomarkdown} <ul><li>Account: <code class="highlighter-rouge">Read</code></li><li>Workspace membership: <code class="highlighter-rouge">Read</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li><li>Repositories: <code class="highlighter-rouge">Write, Admin </code></li></ul>{:/}|

### Git Runtime token in values.yaml

You also have the option to directly add your Git Runtime token, or a reference to the secret that contains the Runtime secret, to `values.yaml` (typically the latter).  

To skip token validation both during installation and upgrade in this scenario, add the `skipValidation` flag to `values.yaml`. 

```yaml
installer:
  skipValidation: true
```

{{site.data.callout.callout_warning}}
**IMPORTANT**  
If you set the flag to skip validation, _the onus is on you to provide a valid and secure token_.  
{{site.data.callout.end}}



## Git user access token scopes
The table below lists the scopes required for Git user access tokens for the different Git providers. 
As with the Git Runtime token, you can create and use Git user tokens with custom scopes per GitOps Runtime, and per Git repository to which the Runtime has access. 


| Git provider                  | Required scopes for Git user token          | 
| ---------------------------- | ------------------------------ | 
| GitHub and GitHub Enterprise |{::nomarkdown}<ul><li>Classic:<ul><li><code class="highlighter-rouge">repo</code></li></ul><li>Fine-grained:<ul><li>Repository access: <code class="highlighter-rouge">All repositories</code> or <code class="highlighter-rouge">Only select repositories</code></li><li>Repository permissions:<ul><li>Contents: <code class="highlighter-rouge">Read and write</code></li><li>Metadata: <code class="highlighter-rouge">Read-only</code></li></ul></li></ul></li></ul>{:/}|
| GitLab Cloud and GitLab Server       |{::nomarkdown}<ul><li><code class="highlighter-rouge">write_repository</code> (includes <code class="highlighter-rouge">read_repository</code>) </li><li><code class="highlighter-rouge">api_read</code></li></ul> {:/}  |
| Bitbucket Cloud and Bitbucket Server | {::nomarkdown} <ul><li>Account: <code class="highlighter-rouge">Read</code></li><li>Workspace membership: <code class="highlighter-rouge">Read</code></li><li>Webhooks: <code class="highlighter-rouge">Read and write</code></li><li>Repositories: <code class="highlighter-rouge">Write, Admin </code></li></ul>{:/}|


### Git user tokens with custom scopes 
Codefresh validates Git user tokens and their associated scopes when authorizing Git actions for the Runtime.  


If you require custom scopes in Git user tokens that don't meet the default Codefresh requirements, you can create Git user tokens with custom scopes. You may want to have Git user tokens without `admin` scopes, or use the new fine-grained tokens for GitHub (currently not officially supported by Codefresh). 

Codefresh provides the `skipGitPermissionValidation` flag which you can add to your `values.yaml` file to bypass token validation for such cases. 


```yaml
app-proxy:
  config:
    skipGitPermissionValidation: "true"
```

If you set this flag, make sure that:
1. The Git user token defined for the GitOps Runtime (the token defined for `runtime-repo-creds-secret`), has read and write access to the Shared Configuration Repository.
1. The Git user tokens for the different Git repositories associated with the Runtimes have read and write permissions to those Git repositories they expect to write to and read from.  
  Read more on configuring the repositories with multiple `repo-creds` secrets in [Argo CD Repositories](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#repositories).

{{site.data.callout.callout_warning}}
**IMPORTANT**  
If you set the flag to skip validation, _the onus is on you to provide valid and secure tokens_. Codefresh does not validate the tokens whenever Git Runtime and Git user tokens are updated. 
{{site.data.callout.end}}

### Use same Git user tokens for multiple GitOps Runtimes
If a user has access to multiple GitOps Runtimes in the same or in different accounts in Codefresh, they can use either the same Git user token to authenticate and authorize all the Runtimes to which they have access.     

>**NOTE**  
The user must configure the Git user token for each GitOps Runtime separately.  

### Manage Git user tokens
User can manage their Git user tokens for Runtimes, as described in [Managing Git PATS]({{site.baseurl}}/docs/administration/user-self-management/manage-pats/).


## Use a service/robot account for GitOps Runtimes
For GitOps Runtime installation, we recommend using an account not related to any specific user in your organization. 
Service/robot accounts are ideal for this purpose, as they provide secure authentication, restricted permissions, and centralized management. 

You need to create a service or robot account with your Git provider, generate the Git Runtime token, and use this account exclusively to install GitOps Runtimes.

## Related articles  
[Managing Git PATs]({{site.baseurl}}/docs/administration/user-self-management/manage-pats/)  
[User settings]({{site.baseurl}}/docs/administration/user-self-management/user-settings/)  
[Secrets for GitOps]({{site.baseurl}}/docs/security/secrets/)  
[Verifying authenticity of Codefresh artifacts]({{site.baseurl}}/docs/security/codefresh-signed-artifacts/)  
