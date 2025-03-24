---
title: "Argo CD Admin API token"
description: "Generate Argo CD Admin API token to authenticate Runtime to existing Argo CD instance"
toc: true
---


## Argo CD admin API token
When installing the GitOps Runtime with an existing Argo CD instance, the Runtime must authenticate to Argo CD. It does this using an Argo CD Admin API token, which you must provide during installation.

If you don't have an Argo CD Admin API token, generate one from the Argo CD UI or CLI as described below.

Codefresh GitOps supports both [token-based or a username-password-based authentication](#authentication-methods-for-existing-argo-cd) mechanisms for GitOps Runtimes. 



## Generating Argo CD Admin API token
Follow these steps to generate an Argo CD Admin API token:
1. [Verify Argo CD account privileges](#verify-argo-cd-account-privileges)
1. [Enable `apikey` privilege for Argo CD account](#enable-apikey-privilege-for-argo-cd-account)
1. [Generate Argo CD Admin API token](#generate-argo-cd-admin-api-token)

### Verify Argo CD account privileges
Ensure that the admin account or the account used for token generation has the following privileges:
* `apiKey`: Enables API token generation
* `login`: Enables UI login 

##### How to
1. From the Argo CD Dashboard, go to **Settings > Accounts**.
1. Select the admin account or another account to use. 
1. Confirm that the account includes these privileges: `apiKey` and `login`.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/argocd-api-key/argocd-account-privileges.png"
  url="/images/runtime/argocd-api-key/argocd-account-privileges.png"
  alt="Argo CD account privileges for Argo CD Admin API token generation"
  caption="Argo CD account privileges for Argo CD Admin API token generation"
  max-width="60%"
%}

{:start="4"}
1. Continue with [Enable `apikey` privilege for Argo CD account](#enable-apikey-privilege-for-argo-cd-account).

### Enable `apikey` privilege for Argo CD account
If the account does not include the `apikey` privilege, enable it in either the ConfigMap or the Helm values file, depending on your Argo CD installation method.

##### Update argocd-cm ConfigMap
Edit the `argocd-cm` ConfigMap. 
Make sure `data.accounts.admin` includes `apiKey` and `login`, and  `data.accounts.admin.enabled` is set to `true`.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  accounts.admin: apiKey, login
  accounts.admin.enabled: "true"
```

##### Update Helm values.yaml
If you installed Argo CD using Helm, update your `values.yaml`:

```yaml
configs:
  cm:
    accounts.admin: apiKey,login
```

Refresh the Dashboard and verify the account has been updated with the new privileges.  
If needed, [generate the Argo CD Admin API token](#generate-argo-cd-admin-api-token).

### Generate Argo CD Admin API token
Generate the Argo CD Admin API token using the Argo CD Dashboard or CLI.

##### Generate via Admin API token Dashboard
1. Go to **Settings > Accounts**.
1. Click the account enabled with `apiKey` privilege.
1. In **Tokens** section, click **Generate New**.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/argocd-api-key/argocd-generate-api-token.png"
  url="/images/runtime/argocd-api-key/argocd-generate-api-token.png"
  alt="Argo CD dashboard: Generate new Argo CD Admin API token"
  caption="Argo CD dashboard: Generate new Argo CD Admin API token"
  max-width="60%"
%}


{:start="4"}
1. Copy the generated token and store it securely. 
  You will need to paste it into the Argo CD Admin API token field during installation. 

##### Generate via Admin API token CLI
`argocd account generate-token --account admin`

For details, see the [argocd account generate-token](https://argo-cd.readthedocs.io/en/stable/user-guide/commands/argocd_account_generate-token/){:"\_blank"} command.

## Authentication methods for existing Argo CD  
The GitOps Runtime authenticates with the external Argo CD instance using either a token or a username-password combination.  

The installation wizard supports API token-based authentication, allowing you to paste the API token directly into the Argo CD Admin API token field.  
You can also configure authentication by referencing a token secret or using a username-password combination.


### Token-based authentication for Argo CD Admin API 
The token must be a non-expiring API key. If revoked, GitOps operations stop until you manually update the token for the Runtime, as the system does not regenerate or validate it automatically.

You can:
* Provide a token directly  
OR  
* Reference a Kubernetes secret containing the token
    * The secret must already exist and include a key with a valid, non-expiring `argo-cd apiKey`  
    * The system injects the key into the required services that the Runtime connects to, including App Proxy (`app-proxy`), Source Server (`sources-server`), Event Reporter (`event-reporter`), and GitOps Operator (`gitops-operator`).  

##### Example: Referencing a token secret in `values.yaml` file
  
```yaml
global:
  external-arg-cd:
    auth:
      type: token
      tokenSecretKeyRef:
        name: "secret-name"
        key: "secret-key"
```

### Password-based authentication for Argo CD Admin API  
This method uses an Argo CD username and password for authentication.  
The system:
* Generates both an API key and a session token, which differ primarily in their expiration dates 
* Stores the API key in the `argocd-token` Secret, and automatically regenerates it when needed

You can:   
* Specify the username and password as plain text  
    * The Helm chart creates a secret to store the password. 
    * The App Proxy uses these credentials to generate API keys and session tokens as needed.
OR  
* Specify the username in plain text and reference a Kubernetes secret containing the password  
    * The secret must already exist and contain a key with the password.
    * The App Proxy uses the secret name, key, and the plain-text username to generate API keys and session tokens.

##### Example username and password as plain text 
```yaml
global:
  external-arg-cd:
    auth:
      type: password
      username: "user-name"
      password: "explicit-password"
```

##### Example username as plain text and password as secret reference
```yaml
global:
  external-arg-cd:
    auth:
      type: password
      username: "some-user-name"
      passwordSecretKeyRef:
        name: "secret-name"
        key: "secret-key"
```
## Related articles
[Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)  