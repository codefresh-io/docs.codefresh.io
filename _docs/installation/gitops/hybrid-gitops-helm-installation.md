---
title: "Hybrid GitOps Runtime installation"
description: "Provision Hybrid GitOps Runtimes"
group: installation
toc: false
---

Install the Hybrid Runtime for GitOps through a Helm chart.

> Helm installation for Hybrid GitOps is currently in Alpha. 


Hybrid GitOps runtimes are installed with the default access mode, [tunnel-based]({{site.baseurl}}/docs/installation/runtime-architecture/#tunnel-based-hybrid-gitops-runtime-architecture), without an ingress controller.  
You can also install an [ingress-based]({{site.baseurl}}/docs/installation/runtime-architecture/#ingress-based-hybrid-gitops-runtime-architecture) runtime.

This article describes Helm installation via the Codefresh UI:
* [For tunnel-based Hybrid GitOps](#helm-install-for-tunnel-based-hybrid-gitops)
* [For ingress-based Hybrid GitOps](#helm-install-for-ingress-based-hybrid-gitops)

> To define a custom values file, review the Codefresh `values.yaml` located [here](https://github.com/codefresh-io/gitops-runtime-helm/tree/main/charts/gitops-runtime){:target="\_blank"}.



## Prerequisites

* [Minimum requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements) for installation
* Git provider requirements:
    * [Runtime token with the required scopes]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes). You will need it after installation to update runtime credentials
    * [Personal Access Token (PAT)]({{site.baseurl}}/docs/reference/git-tokens/#git-personal-tokens) for Git-based actions
    * Server URLs for on-premises Git providers
* (Optional, for ingress-based runtimes only) configuration for ingress controllers:
  * [Ambasador ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#alb-aws-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#traefik-ingress-configuration)


## Helm install for tunnel-based Hybrid GitOps 

1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes, in the Codefresh UI:  
    On the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Click **Generate** to generate your API key. 
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   > The Namespace must be identical to the Runtime Name. The default names are `codefresh` for both.
1. Copy and run the command to the add the repository for the Helm chart:  
   `helm repo add <helm-repo-name> https://chartmuseum.codefresh.io/gitops-runtime`  
   where:  
   `<helm-repo-name>` is the name of the repository to which to add the runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:  
    `helm upgrade --install <helm-repo-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime`  
     >All values are automatically populated by Codefresh. The placeholders in the command are for informative purposes.
    
    where:  
    * `<helm-repo-name>` is the name of the Helm repository you added in the previous step.  
    * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * `<codefresh-account-id>` is your Codefresh account ID.
    * `<codefresh-api-key>` is the generated API key.
    * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * `gitops-runtime` is the chart name defined by Codefresh.
1. Verify that the deployment is up and running (approximately a couple of minutes or less).
1. Define your Git provider:  
  `cf integration git add default --runtime <runtime-name> --api-url <api-url> --provider <provider>`  
  where:  
      * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
      * `<api-url>` is the URL of the Git provider, and can be one of the following:
          * GitHub Cloud: `https://api.github.com` 
          * GitHub Enterprise: `https://<server-url>/api/v3`
          * GitLab Cloud: `https://gitlab.com/api/v4`
          * GitLab Server: `<server-url>/api/v4`
          * Bitbucket Cloud: `https://api.bitbucket.org/2.0`
          * Bitbucket Server: `<server-url>/rest/api/1.0`
      * `<provider>` is the Git provider for the runtime. The same provider is used to install additional runtimes in the same account. Can be one of the following:
          * GitHub and GitHub Enterprise: `github`
          * GitLab Cloud and GitLab Server: `gitlab`
          * Bitbucket Cloud: `bitbucket`
          * Bitbucket Server: `bitbucket-server`  
1. When the installation is complete, go to the **List View**, and select the new runtime.
1. From the context menu on the right, select **Update Git Runtime Credentials**.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/gitops-hybrid-helm-update-token.png" 
	url="/images/runtime/gitops-hybrid-helm-update-token.png" 
	alt="Update Git Runtime Credentials after installation" 
	caption="Update Git Runtime Credentials after installation"
  max-width="80%" 
%}

{:start="10"}
1. Paste the token you created and click **Update Credentials**. 
1. Now add your personal access token for your Git provider:
    * Click your avatar, select [**Git Personal Access Token**](https://g.codefresh.io/2.0/git-personal-access-token){:target="\_blank"}, and then click **Add Token**.
    * Paste the personal access token from your Git provider, and click **Add Token** to add the token. 
1. If you don't have the shared configuration repository for GitOps runtimes, run this command to create it:  
   `TBD`  
  <!--- (NIMA: we don't have a create command-needs to be added )  -->
1. Optional. [Create a Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the runtime.


## Helm install for ingress-based Hybrid GitOps 
Ingress-based runtimes requires you to add ingress-specific flags to the install command, including the ingress host and the ingress class.  
The ingress host is the IP address or host name of the ingress controller component.  
The ingress class is the ingress class of the ingress controller, for example, `nginx` for the NGINX ingress controller.  





1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes, in the Codefresh UI:  
    On the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Click **Generate** to generate your API key. 
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   > The Namespace must be identical to the Runtime Name. The default names are `codefresh` for both.
1. Copy and run the command to the add the repository for the Helm chart:
   `helm repo add <helm-repo-name> https://chartmuseum.codefresh.io/gitops-runtime` 
   where:  
   `<helm-repo-name>` is the name of the repository to which to add the runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:  
    `helm upgrade --install <helm-repo-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime --set global.runtime.ingress.enabled=true --set global.runtime.ingress.hosts[0]=<ingress-host> --set global.runtime.ingress.className=<ingress-class>` 
     >Unless otherwise stated, values are automatically populated by Codefresh. 
    where:  
    * `<helm-repo-name>` is the name of the Helm repository you added in the previous step.  
    * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * `<codefresh-account-id>` is your Codefresh account ID.
    * `<codefresh-api-key>` is the generated API key.
    * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * `<helm-repo-name>/<chart-name>` is the predefined name of the runtime Helm chart and cannot be changed.
    * `global.runtime.ingress.enabled=true` indicates that the runtime is ingress-based, and is mandatory.
    * `<ingress-host>` is the IP address or host name of the ingress controller component, and is mandatory. 
    * `<ingress-class>` is the ingress class of the ingress controller, and is mandatory. For example, `nginx` for the NGINX ingress controller.
1. Verify that the deployment is up and running (approximately a couple of minutes or less).
1. Define your Git provider:  
  `cf integration git add default --runtime <runtime-name> --api-url <api-url> --provider <provider>`  
  where:  
      * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
      * `<api-url>` is the URL of the Git provider, and can be one of the following:  
          * GitHub Cloud `https://api.github.com` 
          * GitHub Enterprise: `https://<server-url>/api/v3`
          * GitLab Cloud: `https://gitlab.com/api/v4`
          * GitLab Server: `<server-url>/api/v4`
          * Bitbucket Cloud: `https://api.bitbucket.org/2.0`
          * Bitbucket Server: `<server-url>/rest/api/1.0`  
      * `<provider>` is the Git provider for the runtime. The same provider is used for to install all subsequent runtimes in the same account. Can be one of the following:  
          * GitHub and GitHub Enterprise: `github`  
          * GitLab Cloud and GitLab Server: `gitlab`
          * Bitbucket Cloud: `bitbucket`
          * Bitbucket Server: `bitbucket-server`  
1. When the installation is complete, go to the **List View**, and select the new runtime.
1. From the context menu on the right, select **Update Git Runtime Credentials**.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/gitops-hybrid-helm-update-token.png" 
	url="/images/runtime/gitops-hybrid-helm-update-token.png" 
	alt="Update Git Runtime Credentials after installation" 
	caption="Update Git Runtime Credentials after installation"
  max-width="80%" 
%}

{:start="10"}
1. Paste the token you created and click **Update Credentials**. 
1. Now add your personal access token for your Git provider:
    * Click your avatar, select [**Git Personal Access Token**](https://g.codefresh.io/2.0/git-personal-access-token){:target="\_blank"}, and then click **Add Token**.
    * Paste the personal access token from your Git provider, and click **Add Token** to add the token.  
1. If you don't have the shared configuration repository for GitOps runtimes, run this command to create it:  
   `TBD`  
  (NIMA: we don't have a create command-needs to be added )
1. Optional. [Create a Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the runtime.


## Related articles
[Shared configuration repo for GitOps Runtimes]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Add Git Sources to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  

