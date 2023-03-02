---
title: "Hybrid GitOps Runtime installation"
description: "Provision Hybrid GitOps Runtimes"
group: installation
toc: false
---

Install the Hybrid Runtime for GitOps through a Helm chart.

> Helm installation for Hybrid GitOps is currently in Alpha. 

## Installation notes

* Hybrid GitOps runtimes are installed with the default access mode, [tunnel-based]({{site.baseurl}}/docs/installation/runtime-architecture/#tunnel-based-hybrid-gitops-runtime-architecture), without an ingress controller.  
  Codefresh also supports [ingress-based]({{site.baseurl}}/docs/installation/runtime-architecture/##ingress-based-hybrid-gitops-runtime-architecture) runtimes. You need to configure your ingress controller before the Helm install. 
* You can customize the names of the runtime and the namespace if you want to, or retain the UI defaults for both.  
* Codefresh automatically populates values for required flags in the Helm install command with those generated or defined. 
  Review the [values.yaml](https://github.com/codefresh-sandbox/gitops-runtime-charts){:target="\_blank"} for the complete list.

## Prerequisites
Ensure that you:
* Meet the [minimum requirements](#minimum-system-requirements) for installation
* Have a [runtime token with the required scopes from your Git provider]({{site.baseurl}}/docs/reference/git-tokens); you will need it after installation to update runtime credentials
* (Optional, for ingress-based runtimes only) configure your ingress controller:
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
   <helm-repo-name> is the name of the repository to which to add the runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:
    `helm upgrade --install <helm-repo-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime`  
     >All values are automatically populated by Codefresh. The placeholders in the command are for descriptive purposes.
    where:  
    * <helm-repo-name> is the name of the Helm repository you added in _step 5_.  
    * <namespace> is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * <codefresh-account-id> is your Codefresh account ID.
    * <codefresh-api-key> is the generated API key.
    * <runtime-name> is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * <helm-repo-name>/<chart-name> is the predefined name of the runtime Helm chart and cannot be changed.
1. When the installation is complete, go to the **List View**, and select the new runtime.
1. If you see a banner that you are missing the shared configuration repository for GitOps runtimes, run this command to create it:  
   `cf config --reset-shared-config-repo`  
  > Before you proceed to the next step, wait until the banner disappears from the page.
  (NIMA: to be confirmed - do we have a create command? I added the reset one for now as a placeholder. Also Dev to confirm if the user needs to run it before the install or after )

1. Return to the List View and select the row with the new runtime.
1. From the context menu on the right, select **Update Git Runtime Credentials**.  
  

{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/gitops-hybrid-helm-update-token.png" 
	url="/images/runtime/gitops-hybrid-helm-update-token.png" 
	alt="Update Git Runtime Credentials after installation" 
	caption="Update Git Runtime Credentials after installation"
  max-width="40%" 
%}

{:start="9"}
1. Paste the token you created and click **Update Credentials**.
1. [Create a Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the runtime.

## Helm install for ingress-based Hybrid GitOps 

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
   <helm-repo-name> is the name of the repository to which to add the runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:
    `helm upgrade --install <helm-repo-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime --set global.runtime.ingress.enabled=true --set global.runtime.ingress.hosts[0]=<ingress-host> --set global.runtime.ingress.className=<ingress-class> --set global.codefresh.gitIntegration.provider.name=GITHUB --set global.codefresh.gitIntegration.provider.apiUrl=https://api.github.com`  
     >All values are automatically populated by Codefresh. The placeholders in the command are for descriptive purposes.
    where:  
    * `<helm-repo-name>` is the name of the Helm repository you added in _step 5_.  
    * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * `<codefresh-account-id>` is your Codefresh account ID.
    * `<codefresh-api-key>` is the generated API key.
    * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * `<helm-repo-name>/<chart-name>` is the predefined name of the runtime Helm chart and cannot be changed.
    * `global.runtime.ingress.enabled=true` indicates an ingress-based runtime.
    * `<ingress-host>` is the IP address or host name of the ingress controller component. 
    * `<ingress-class>` is the ingress class of the ingress controller, for example, `nginx` for the NGINX ingress controller.
    * `global.codefresh.gitIntegration.provider.name=GITHUB` is the Git provider for the runtime. The same provider is used for to install all subsequent runtimes in the same account. (NIMA: can this be changed or is currently only GitHub?)
    * `global.codefresh.gitIntegration.provider.apiUrl` is the URL of the Git provider.
1. When the installation is complete, go to the **List View**, and select the new runtime.
1. If you see a banner that you are missing the shared configuration repository for GitOps runtimes, run this command to create it:  
   `cf config --reset-shared-config-repo`  
  > Before you proceed to the next step, wait until the banner disappears from the page.
  (NIMA: to be confirmed - do we have a create command? I added the reset one for now as a placeholder. Also Dev to confirm if the user needs to run it before the install or after )
1. Return to the List View and select the row with the new runtime.
1. From the context menu on the right, select **Update Git Runtime Credentials**.  
  

{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/gitops-hybrid-helm-update-token.png" 
	url="/images/runtime/gitops-hybrid-helm-update-token.png" 
	alt="Update Git Runtime Credentials after installation" 
	caption="Update Git Runtime Credentials after installation"
  max-width="40%" 
%}

{:start="9"}
1. Paste the token you created and click **Update Credentials**. 
1. [Create a Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the runtime.

## Related articles
[Shared configuration repo for GitOps Runtimes]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Add Git Sources to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  

             
