---
title: "Setting up OAuth2 for Git providers"
description: ""
group: administration
sub_group: account-user-management
toc: true
---

Codefresh integrates with the Git provider defined for your GitOps runtime account to sync repositories to your clusters, implementing Git-based operations when creating resources such as Delivery Pipelines, applications, and enriching images with valuable information.  

As the account administrator, you can select the authentication method for a runtime account. Users in Codefresh will then authorize access to the Git providers through the defined mechanism.  

{% include 
   image.html 
   lightbox="true" 
   file="/images/authentication/authentication-list.png" 
   url="/images/authentication/authentication-list.png" 
   alt="Git provider authentication accounts" 
   caption="Git provider authentication accounts"
   max-width="80%" 
   %}

Codefresh supports OAuth2 or personal access tokens (PATs) for authentication:  

* OAuth2 with Codefresh OAuth Application or custom OAuth2 Application  
  OAuth2 is the preferred authentication mechanism, supported for popular Git providers such as GitHub, GitHub Enterprise, GitLab Cloud and Server, and Bitbucket Cloud and Server.  
  You have the option to use the default predefined Codefresh OAuth Application, or a custom Oauth2 Application for Codefresh in your Git provider account.  
  Hosted runtime accounts automatically use Codefresh's predefined OAuth Application.  
  To use a custom Oauth2 Application for Codefresh, first create the application in your Git provider account, then create a secret on your K8s cluster, and finally configure OAuth2 access for the custom application in Authentication > Settings. See [Create a custom OAuth2 Application for Git provider](#create-a-custom-oauth2-application-for-git-provider) in this article.

* Token-based authentication using PAT  
  With token-based authentication, users must generate personal access tokens from their Git providers with the required scopes and enter their personal access tokens when prompted to authorize access. See [Authorize Git access in Codefresh]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#git-provider-private-access).



## Authentication for Git providers and runtime accounts
The [Git Authentication](https://g.codefresh.io/2.0/account-settings/authentication?providerName=github){:target="\_blank"} page displays the accounts by Git provider and the authentication method selected for the same.  

Authentication accounts are organized by Runtimes. A runtime can have a single authentication account.   
The Type column identifies the authentication for the provider account as either Codefresh, Custom, or PAT (personal access token). 

{% include 
   image.html 
   lightbox="true" 
   file="/images/authentication/authentication-list.png" 
   url="/images/authentication/authentication-list.png" 
   alt="Git provider authentication accounts" 
   caption="Git provider authentication accounts"
   max-width="80%" 
   %}
 
As the account administrator, you can change the authentication method for a Hybrid GitOps runtime at any time to either Codefresh, Custom, or manual token entry. See [Select authentication mechanism for runtime](#select-authentication-mechanism-for-runtime).

## Create a custom OAuth2 Application for Git provider 
Create a custom OAuth2 Application for Codefresh in your Git provider accounts with the correct scopes, and set up authentication for the same within Codefresh. Users in Codefresh can then authorize access to the Git provider using OAuth2, instead of a personal access token.  

Supported Git providers:
* GitHub and GitHub Enterprise
* GitLab Cloud and GitLab Server
* Bitbucket Cloud (hosted) and Bitbucket Server (hybrid)

{::nomarkdown}
<br>
{:/}

To set up OAuth2 authorization in Codefresh, you must:
1. [Create Custom OAuth2 Application in Git](#step-1-create-a-custom-oauth2-application-in-git) 
1. [Create a K8s `secret` in the runtime cluster](#step-2-create-a-k8s-secret-resource-in-the-runtime-cluster)
1. [Configure OAuth2 settings for Custom Application in Codefresh](#step-3-configure-oauth2-settings-for-custom-application-in-codefresh)

{::nomarkdown}
<br>
{:/}

### Step 1: Create a custom OAuth2 Application in Git
Create and register an OAuth App under your organization to authorize Codefresh.  

1. Follow the step-by-step instructions for your Git provider:   

  * [GitHub](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app){:target="\_blank"}:      
    * For **Authorization callback URL**, enter this value:  
       `<ingressHost>/app-proxy/api/git-auth/github/callback`  
       where:  
       `<ingressHost>` is the IP address or URL of the ingress host in the runtime cluster.
    * Make sure **Enable Device Flow** is _not_ selected. 
    * Select **Register application**. 
       The client ID is automatically generated, and you are prompted to generate the client secret.
    * Select **Generate a new client secret**, and copy the generated secret.  

  * [GitLab Cloud and Server](https://docs.gitlab.com/ee/integration/oauth_provider.html#user-owned-applications){:target="\_blank"}:   
    * For **Redirect URI**, enter this value:   
      `<ingressHost>/app-proxy/api/git-auth/gitlab/callback`  
      where:  
      `<ingressHost>` is the IP address or URL of the ingress host in the runtime cluster.  

  * [Bitbucket Server](https://confluence.atlassian.com/adminjiraserver0902/configure-an-outgoing-link-1168853925.html){:target="\_blank"}:      
    * For **Callback URL**, enter this value:  
      `<ingressHost>/app-proxy/api/git-auth/bitbucket-server/callback`  
      where:  
      `<ingressHost>` is the IP address or URL of the ingress host in the runtime cluster.
    
    > OAuth2 is not supported for hybrid runtimes with Bitbucket Cloud as the Git provider. Users can authorize access with their [Git personal access tokens]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#authorize-git-access-in-codefresh) in such cases.


{:start="2"}
1. Note down the following, as you will need them to create the K8s secret for the Git OAuth2 application:
  * GitHub: Application ID from the URL, Client ID, and the client secret  
  * GitLab Cloud and Server: Application ID and Secret
  * Bitbucket Server: Key and Secret

{::nomarkdown}
<br>
{:/}

### Step 2: Create a K8s secret resource in the runtime cluster 
Create a K8s secret in the runtime cluster, using the example below as a guideline. You must define the application ID (`appId`), client ID (`clientId`) and the client secret (`clientSecret`) from the OAuth2 Application you created in your Git provider, and the Git URL (`url`).  

> All fields in the secret _must be_ encoded in `base64`.  
  To encode, use this command: `echo -n VALUE | base64`.  


**Before you begin**  

Make sure you have the following handy:
* GitHub: Application ID from the URL, Client ID, and the client secret  
* GitLab Cloud and Server: Application ID and Secret
* Bitbucket Server: Key and Secret


**How to**  

1. Create the manifest for the K8s secret resource.

```yaml
apiVersion: v1
kind: Secret
type: Opaque
metadata:
  name: github-oauth2
  namespace: <RUNTIME_NAME> # replace with the name of the runtime
  labels:
    codefresh_io_entity: git-pat-obtainer-sec
data:
  appId: # application ID of your OAuth app
  clientId: # client ID of your OAuth app 
  clientSecret: # client secret of your OAuth app
  url: https://github.com # Git provider URL which by default is github.com, unless self-hosted provider
```

{:start="2"}
1. Apply the secret to the runtime cluster:  
   `kubectl apply -f <filename>`   
   
{::nomarkdown}
<br>
{:/}

### Step 3: Configure OAuth2 settings for Custom Application in Codefresh 

Configure the settings for the Custom OAuth2 Application in Codefresh. Configuring the settings creates a K8s ConfigMap that references the OAuth secret credentials. When configuring the settings, you can work in Form mode, or directly update the YAML manifest. 

>Important:  
  > The values for all the settings in the ConfigMap are the `keys` in the secret file. 

1. In the Codefresh UI, go to [Authentication](https://g.codefresh.io/2.0/account-settings/authentication?providerName=github){:target="\_blank"}.
  The list always shows the default predefined Codefresh provider account and custom provider accounts created, organized by Runtime, Type (Codefresh or Custom) and Status. 
1. From the list, select the Git provider and the runtime to which to apply the current configuration. 
   >The runtime must be identical to the runtime to which you saved the K8s secret.
1. Click **Edit** and then select **Use custom provider**.
   > If you have managed clusters registered to the selected runtime, the authentication account is available to all the clusters.  
  The settings page is opened in **Form** mode.
    
{% include 
   image.html 
   lightbox="true" 
   file="/images/authentication/oauth-custom-settings.png" 
   url="/images/authentication/oauth-custom-settings.png" 
   alt="OAuth settings for custom provider in Codefresh" 
   caption="OAuth settings for custom provider in Codefresh"
   max-width="50%" 
   %}

{:start="4"}
1. Configure the settings for the **Git OAuth2 Application**, either in **Form** or in **YAML** modes:
  * **Secret Name**: The name of the K8s secret file you created in the runtime cluster.
  * **Secret Namespace**: The namespace in the runtime cluster where you created the K8s secret.
  * **Application ID**: The `key` representing the OAuth application ID in the K8s secret. For example, `appId`.
  * **Client ID**: The `key` representing the client ID in the K8s secret. For example, `clientId`.
  * **Client Secret**: The `key` representing the client secret in the K8s secret. For example, `clientSecret`.
  * **URL**: The `key` representing the Git provider URL in the K8s secret. For example, `url`.

{:start="5"}
1. Click **Commit**.
  The Commit Changes panel shows a summary of the settings and the final version of the YAML manifest in read-only mode. 
  
{% include 
   image.html 
   lightbox="true" 
   file="/images/authentication/oauth-custom-commit-settings.png" 
   url="/images/authentication/oauth-custom-commit-settings.png" 
   alt="OAuth settings for custom provider in Codefresh" 
   caption="OAuth settings for custom provider in Codefresh"
   max-width="50%" 
   %}

{:start="6"}  
1. From the **Select Git Source** list, select the Git Source in which to store the manifest for the `ConfigMap` you are creating.
  The list displays all the Git Sources created for the selected runtime. 
1. Optional. Enter a commit message.
1. At the bottom-right, click **Commit** once again.

You have completed the setup to authorize Codefresh as an OAuth App for your Git provider. 

## Select authentication mechanism for runtime
For a Git provider and a runtime account, select the authentication mechanism: Codefresh account, Custom provider account if one exists, or token-based authentication.

>Hosted GitOps runtimes support either Codefresh or token-based authentication.

1. In the Codefresh UI, go to [Authentication](https://g.codefresh.io/2.0/account-settings/authentication?providerName=github){:target="\_blank"}.
1. Select the runtime, and click **Edit**. 
1. Select the OAuth authentication provider account.


## Related articles
[Adding users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/)  
[Configuring access control]({{site.baseurl}}/docs/administration/account-user-management/access-control/)  
[Codefresh IP addresses]({{site.baseurl}}/docs/administration/account-user-management/platform-ip-addresses/)  
 