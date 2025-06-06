---
title: "Setting up OAuth2 for GitOps"
description: "Set up Git authentication with OAuth2"
group: administration
sub_group: account-user-management
toc: true
---

## OAuth2 authentication for GitOps
Codefresh integrates with GitHub Cloud as the Git provider defined for the GitOps Runtime to sync repositories to your clusters, implementing Git-based operations when creating resources such as applications, and enriching images with valuable information.  

As the account administrator, you can select the authentication method for the account associated with the Runtime.  
Users in the account can then authorize access to GitHub as the Git provider through the defined mechanism.  

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

* **OAuth2 with Codefresh OAuth Application or custom OAuth2 Application**  
  OAuth2 is the preferred authentication mechanism, supported for GitHub.  
  You have the option to use the default predefined Codefresh OAuth Application, or a custom Oauth2 Application for Codefresh in your Git provider account.  

  To use a custom Oauth2 Application for Codefresh, first create the application in your GitHub account, then create a secret on your K8s cluster, and finally configure OAuth2 access for the custom application in Authentication > Settings. <br>
  See [Create a custom OAuth2 Application for Git provider](#create-a-custom-oauth2-application-for-git-provider) in this article.

* **Token-based authentication using PAT**  
  With token-based authentication, users must generate personal access tokens for their GitHub  accounts with the required scopes and enter their personal access tokens when prompted to authorize access.<br>
  See [Authorize Git access in Codefresh]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#git-provider-private-access).


## Authentication for Git providers and Runtime accounts
The **Git Authentication** page displays the accounts by Git provider and the authentication method selected for the same.  

Authentication accounts are organized by Runtimes. A Runtime can have a single authentication account.   
The Type column identifies the authentication for the provider as either Codefresh, Custom, or PAT (personal access token). 

{% include 
   image.html 
   lightbox="true" 
   file="/images/authentication/authentication-list.png" 
   url="/images/authentication/authentication-list.png" 
   alt="Git provider authentication accounts" 
   caption="Git provider authentication accounts"
   max-width="80%" 
   %}
 
As the account administrator, you can change the authentication method for a GitOps Runtime at any time to either Codefresh, Custom, or manual token entry. See [Select authentication mechanism for runtime](#select-authentication-mechanism-for-runtime).


## Create a custom OAuth2 Application for Git provider 
Create a custom OAuth2 Application for Codefresh in your GitHub account with the correct scopes, and set up authentication for the same within Codefresh. Users can then authorize access using OAuth2, instead of a personal access token.  


To set up OAuth2 authorization in Codefresh, you must:
1. [Create Custom OAuth2 Application in Git](#step-1-create-a-custom-oauth2-application-in-git) 
1. [Create a K8s `secret` in the runtime cluster](#step-2-create-a-k8s-secret-resource-in-the-runtime-cluster)
1. [Configure OAuth2 settings for Custom Application in Codefresh](#step-3-configure-oauth2-settings-for-custom-application-in-codefresh)



### Step 1: Create a custom OAuth2 Application in Git
Create and register an OAuth App under your organization to authorize Codefresh.  

{:start="1"}
1. For [GitHub](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app){:target="\_blank"}, do the following:      
    * For **Authorization callback URL**, enter this value:  
      `<ingressHost>/app-proxy/api/git-auth/github/callback`  
      where:  
      `<ingressHost>` is the IP address or URL of the ingress host in the Runtime cluster as defined in your `values.yaml`. <br>
      For tunnel-based access modes, run the command `codefresh runtime list` to retrieve the correct host.
    * Make sure **Enable Device Flow** is _not_ selected. 
    * Select **Register application**.<br>
      The client ID is automatically generated, and you are prompted to generate the client secret.
    * Select **Generate a new client secret**, and copy the generated secret.  

{:start="2"}
1. Note down the following, as you will need them to create the K8s secret for the Git OAuth2 application:<br>
  * Application ID from the URL, Client ID, and the client secret  

<br>


### Step 2: Create a K8s secret resource in the runtime cluster 
Create a K8s secret in the Runtime cluster, using the example below as a guideline. You must define the application ID (`appId`), client ID (`clientId`) and the client secret (`clientSecret`) from the OAuth2 Application you created in your GitHub account, and the Git URL (`url`).  

>**NOTE**    
  All fields in the secret _must be_ encoded in `base64`.  
  To encode, use this command: `echo -n VALUE | base64`.  


##### Before you begin 

Make sure you have the following handy:
* Application ID from the URL, Client ID, and the client secret  


##### How to

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
   


### Step 3: Configure OAuth2 settings for Custom Application in Codefresh 

Configure the settings for the Custom OAuth2 Application in Codefresh. Configuring the settings creates a K8s ConfigMap that references the OAuth secret credentials. When configuring the settings, you can work in Form mode, or directly update the YAML manifest. 

{{site.data.callout.callout_warning}}
**IMPORTANT**  
The values for all the settings in the ConfigMap are the `keys` in the secret file. 
{{site.data.callout.end}}


1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Git Authentication**.
  The list always shows the default predefined Codefresh provider account and custom provider accounts created, organized by Runtime, Type (Codefresh or Custom) and Status. 
1. From the list, select the Git provider and the Runtime to which to apply the current configuration. 
   >**NOTE**  
    The Runtime must be identical to the Runtime to which you saved the K8s secret.
1. Click **Edit** and then select **Use custom provider**.
    {{site.data.callout.callout_tip}}
    **TIP**  
     If you have managed clusters registered to the selected Runtime, the authentication account is available to all the clusters.  
    {{site.data.callout.end}}

  The settings page opens in **Form** mode.
    
{% include 
   image.html 
   lightbox="true" 
   file="/images/authentication/oauth-custom-settings.png" 
   url="/images/authentication/oauth-custom-settings.png" 
   alt="OAuth settings for custom provider in Codefresh" 
   caption="OAuth settings for custom provider in Codefresh"
   max-width="50%" 
   %}

{:start="5"}
1. Configure the settings for the **Git OAuth2 Application**, either in **Form** or in **YAML** modes:
  * **Secret Name**: The name of the K8s secret file you created in the runtime cluster.
  * **Secret Namespace**: The namespace in the runtime cluster where you created the K8s secret.
  * **Application ID**: The `key` representing the OAuth application ID in the K8s secret. For example, `appId`.
  * **Client ID**: The `key` representing the client ID in the K8s secret. For example, `clientId`.
  * **Client Secret**: The `key` representing the client secret in the K8s secret. For example, `clientSecret`.
  * **URL**: The `key` representing the Git provider URL in the K8s secret. For example, `url`.

{:start="6"}
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

{:start="7"}  
1. From the **Select Git Source** list, select the Git Source in which to store the manifest for the `ConfigMap` you are creating.
  The list displays all the Git Sources created for the selected runtime. 
1. Optional. Enter a commit message.
1. At the bottom-right, click **Commit** once again.

You have completed the setup to authorize Codefresh as an OAuth App for your Git provider. 

## Select authentication mechanism for Runtime
For a Git provider and a Runtime account, select the authentication mechanism: Codefresh account, Custom provider account if one exists, or token-based authentication.


1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Git Authentication**.
1. Select the Runtime, and click **Edit**. 
1. Select the OAuth authentication provider account.


## Related articles
[Adding users and teams]({{site.baseurl}}/docs/administration/account-user-management/add-users/)  
[Configuring access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
[Git tokens for GitOps]({{site.baseurl}}/docs/security/git-tokens/)  

 