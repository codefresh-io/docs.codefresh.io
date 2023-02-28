---
title: "Hybrid GitOps Runtime installation"
description: "Provision Hybrid GitOps Runtimes"
group: installation
toc: false
---

Install the Hybrid Runtime for GitOps through a Helm chart.



## Installation notes

* Hybrid GitOps runtimes are installed with the default access mode, [tunnel-based]({{site.baseurl}}/docs/installation/runtime-architecture/#tunnel-based-hybrid-gitops-runtime-architecture), without an ingress controller.  
  Codefresh also supports [ingress-based]({{site.baseurl}}/docs/installation/runtime-architecture/##ingress-based-hybrid-gitops-runtime-architecture) runtimes. You need to configure your ingress controller before the Helm install. 
* You can customize the names of the runtime and the namespace if you want to, or retain Codefresh defaults for both.  
* Codefresh automatically populates values for required flags in the Helm install command with those generated or defined. 
  Review the [values.yaml](https://github.com/codefresh-sandbox/gitops-runtime-charts){:target="\_blank"} for the complete list.


## Before you begin
Make sure that you:
* Meet the [minimum requirements](#minimum-system-requirements) for installation
* Have a [runtime token with the required scopes from your Git provider]({{site.baseurl}}/docs/reference/git-tokens); you will need it after installation to update runtime credentials
* For ingress-based runtimes, your ingress controller is configured correctly:
  * [Ambasador ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#alb-aws-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/runtime/requirements/#traefik-ingress-configuration)

 
## How to

1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes, in the Codefresh UI:  
    On the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Click **Generate** to generate your API key. 
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   > The Namespace must be identical to the Runtime Name. 
1. Copy and run the command to the add the repository for the Helm chart:
   `helm repo add <helm-repo-name> https://chartmuseum.codefresh.io/gitops-runtime` 
   where:  
   <helm-repo-name> is the name of the repository to which to add the runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:
    `helm upgrade --install <helm-repo-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime`  
     >All values are automatically populated by Codefresh.
    where:  
    * <helm-repo-name> is the name of the Helm repository you added in _step 5_.  
    * <namespace> is the namespace in which to install the Hybrid GitOps runtime.  
    * <codefresh-account-id> is your Codefresh account ID.
    * <codefresh-api-key> is the generated API key generated.
    * <runtime-name> is the name of the runtime, either the Codefresh default or the custom name you defined. 
    * <helm-repo-name>/<chart-name> is the predefined name of the runtime Helm chart and cannot be changed.
1. When the installation is complete, go to **List View**.
1. Select the row with the new runtime, and from the context menu on the right, select **Update Git Runtime Credentials**.  
   (NIMA: not sure if this is the correct step)

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
1. If you don't have a shared configuration repository for GitOps runtimes, run this command to create it:  
   `cf config --reset-shared-config-repo`  
   (NIMA: to be confirmed - do we have a create command? I added the reset one for now as a placeholder. Also Dev to confirm if the user needs to run it before the install or after )

## Related articles
[Shared configuration repo for GitOps Runtimes]({{site.baseurl}}/docs/reference/shared-configuration)  


             
