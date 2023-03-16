---
title: "Hybrid GitOps Runtime installation"
description: "Provision Hybrid GitOps Runtimes"
group: installation
toc: false
---

Install the Hybrid Runtime for GitOps through a Helm chart.
> Helm installation for Hybrid GitOps is currently in Alpha. 

* Access mode for runtime  
  Helm install supports both tunnel-based and ingress-based access modes. The tunnel-based access mode is the default access mode. <br>
  Ingress-based access modes require an ingress controller to be configured before the installation, and additional flags such as the ingress host and class to be supplied as part of the install command. 

* Shared configuration repository  
  The Alpha version assumes that you already have a [shared configuration repository]({{site.baseurl}}/docs/reference/shared-configuration/) for your account.
  If this is not the case, contact support to help you set one up.

* Argo project CRDs  
  The installation requires a cluster without Argo project CRDs.
  You can handle Argo project CRDs outside the chart, or as recommended, adopt the CRDs to be managed by the GitOps runtime Helm release.
  For details, see [Argo project CRDs](#argo-project-crds).
  
  
## Argo project CRDs
If you already have Argo project CRDs on your cluster, do one of the following:
* Handle Argo projects CRDs outside of the chart (see [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"})  
  Disable CRD installation under the relevant section for each of the Argo projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the argo project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

* Adopt the CRDs<br>
  Adopting the CRDs allows them to be managed by the `gitops-runtime helm release`. Doing so ensures that a runtime upgrade also automatically upgrades the CRDs.

  Run this script _before_ installation:

```
#!/bin/sh
RELEASE=<helm-release-name>
NAMESPACE=<target-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```



## Prerequisites

* [Minimum requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements) for installation
* Git provider requirements:
    * [Runtime token with the required scopes]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes). You will need it after installation to update runtime credentials
    * [Personal Access Token (PAT)]({{site.baseurl}}/docs/reference/git-tokens/#git-personal-tokens) for Git-based actions
    * Server URLs for on-premises Git providers
* Verify there are no Argo project CRDs in the target namespace or that you have adopted the CRDs (see [Argo project CRDs](#argo-project-crds))
* For ingress-based runtimes only, verify that these ingress controllers are configured correctly:
  * [Ambasador ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#alb-aws-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#traefik-ingress-configuration)


## Install Hybrid GitOps runtime with Helm
Follow the steps to install Hybrid GitOps via Helm.<br>
The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/tree/main/charts/gitops-runtime){:target="\_blank"}.
<br><br>
Ingress-based runtimes require you to add ingress-specific flags to the install command, including the ingress host and the ingress class.  
The ingress host is the IP address or host name of the ingress controller component.  
The ingress class is the ingress class of the ingress controller, for example, `nginx` for the NGINX ingress controller.  

<br>


1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes, in the Codefresh UI:  
    On the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Click **Generate** to generate your API key. 
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   > The Namespace must be identical to the Runtime Name. The default names are `codefresh` for both.
1. Copy and run the command to the add the repository for the Helm chart:  
   `helm repo add <helm-repo-name> https://chartmuseum.codefresh.io/gitops-runtime` <br>
   `helm repo update`<br>
   where: <br> 
   `<helm-repo-name>` is the name of the repository to which to add the runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:  
  The commands differ depending on the access mode. An ingress-based runtime requires additional flags.<br>

  **Tunnel-based install chart command:**<br>
    `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime --devel --wait`  

    **Ingress-based install chart command:**<br>
      `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime  --set global.runtime.ingress.enabled=true --set "global.runtime.ingress.hosts[0]"=<ingress-host> --set global.runtime.ingress.className=<ingress-class> --devel --wait`  

    >Unless otherwise indicated, values are automatically populated by Codefresh. 
    
    where:  
    * `<helm-release-name>` is the name of the Helm release.  
    * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * `<codefresh-account-id>` is your Codefresh account ID.
    * `<codefresh-api-key>` is the generated API key.
    * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * `gitops-runtime` is the chart name defined by Codefresh.
    * `global.runtime.ingress.enabled=true` is mandatory for _ingress-based runtimes_, and indicates that the runtime is ingress-based.
    * `<ingress-host>` is mandatory for _ingress-based runtimes_, and is the IP address or host name of the ingress controller component. 
    * `<ingress-class>` is mandatory for _ingress-based runtimes_, and is the ingress class of the ingress controller. For example, `nginx` for the NGINX ingress controller.

    * `--wait` waits until all the pods are up and running for the deployment.
1. Define your Git provider and register the Git integration:  
  `cf integration git add default --runtime <runtime-name> --api-url <api-url> --provider <provider>`  
  `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`   
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
1. Now add your personal access token, or if your admin has set up OAuth2, authorize access.
    * Click your avatar, select [**Git Personal Access Token**](https://g.codefresh.io/2.0/git-personal-access-token){:target="\_blank"}.
    * Proceed as needed. For details, see [Authorize Git access in Codefresh]({{site.baseurl}}/docs/administration/user-self-management/manage-pats/#authorize-git-access-in-codefresh).
1. If you don't have the shared configuration repository for GitOps runtimes, contact support. 
  > For the Alpha, we assume that you already have a shared configuration repository for your account.
1. Optional. [Create a Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the runtime.
1. Required only for ALB AWS, Istio, or NGINX Enterprise ingress-controllers.<br>
   Complete the configuration for these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#patch-certificate-secret)  


## Related articles
[Shared configuration repo for GitOps Runtimes]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Add Git Sources to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture)  

