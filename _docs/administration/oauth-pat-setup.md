---
title: "Set up OAuth2 app"
description: ""
group: administration
toc: true
---

Administrators can create, register and authorize CSDP as a OAuth2 App in GitHub. Users can then authorize access to GitHub instead of generating a personal access token from their Git providers.

To set up OAuth2 authorization for GitHub, as an admin you must create:
* GitHub OAuth2 Application for CSDP 
* Secret in runtime cluster with OAuth2 Application credentials
* Config-map that references the secret

> Reuse the same GitHub OAuth2 application across runtimes by applying the `secret` and `config-map` to _every runtime_. 



### Step 1: Create GitHub OAuth2 Application
Create and register an OAuth App under your organization to authorize Codefresh.  

1. Follow the step-by-step instructions in [GitHub](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app){:target="\_blank"}.  
  * `repo` scope with write access to code
  * For the `Authorization callback URL`, enter this value:  
    `<ingressHost>/app-proxy/api/git-auth/github/callback`  
    where:  
    `<ingressHost>` is the IP address or URL of the ingress host in the runtime cluster. 
1. Make sure **Enable Device Flow** is _not_ selected. 
1. After successful registration, note down the application ID, client ID and the client secret generated. You will need them to create the GitHub OAuth2 secret.

### Step 2: Create a K8s secret resource in runtime cluster 
Create a K8s secret in the runtime cluster as in the example below, with the application ID (`appId`), client ID (`clientId`) and the client secret (`clientSecret`) from the GitHub OAuth2 Application you created.  
* Create the secret manifest.

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: github-oauth2
  namespace: runtime
  labels:
    codefresh_io_entity: git-pat-obtainer-sec
data:
  appId: # application ID of your OAuth app from GitHub
  clientId: # client ID of your OAuth app from GitHub
  clientSecret: # client secret of your OAuth app from GitHub
  url: https://github.com
```
* Apply the secret to the runtime cluster:  
   `kubectl apply -f <filename>`   
   where:   
   `<filename>` is the user-defined name in `metadata.name`, `github-oauth2` in the example.


### Step 3: Create a ConfigMap resource 
Create a config map that references the OAuth secret credentials, as shown in the example below. 
>The `path` property attribute values maps to the `data` keys in the secret file. 

Create the config map manifest and push the config-map to a Git Source.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: git-pat-obtainer
  namespace: runtime
  labels:
    codefresh_io_entity: git-pat-obtainer
data:
  github: |
    secret:
      name: github-oauth2
      namespace: runtime
      path:
        appId: <data.appId key> # in example, appId 
        clientId: <data.ClientId> # in example, clientId 
        clientSecret: <data.clientSecret> # in example, clientSecret
        url: <data.url> # in example, https://github.com
```

You have completed setting up and authorizing CSDP an OAuth App in GitHub. 

### What to read next
[Manage Git personal access tokens]({{site.baseurl}}/docs/administration/user-settings/)