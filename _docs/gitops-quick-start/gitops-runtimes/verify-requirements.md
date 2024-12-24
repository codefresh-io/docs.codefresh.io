---
title: "Quick start: Preparing for Hybrid GitOps Runtime installation"
description: "Verify you're ready for Runtime installation"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/quick-start/gitops-quick-start/verify-requirements/
---



The Hybrid GitOps Runtime is installed through a Helm chart.  
For configuration details, refer to the Codefresh `values.yaml` file, which includes all available arguments (mandatory and optional) with descriptions. Go to [values.yaml](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}. 

## Quick start assumptions for Runtime installation

### First GitOps Runtime in account
The quick start assumes you are installing the first Hybrid GitOps Runtime in your Codefresh account. 

### Tunnel-based access mode
Hybrid GitOps Runtimes support tunnel-based, ingress-based, and service-mesh-based access modes.    
For the quick start, we'll use the default tunnel-based access mode, which does not require an ingress controller.  

For details on access modes, see [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).

### GitHub as the Git provider  
The Hybrid GitOps Runtime requires a Git Runtime token for authentication to the Git installation repository based on your Git provider, and a Git user token to authenticate Git-based actions for the Runtime.  

The quick start uses GitHub as the Git provider. For other Git providers and token requirements, see [Git providers and Git runtime tokens]({{site.baseurl}}/docs/security/git-tokens/#git-runtime-token-scopes).  

Have your GitHub Runtime token ready with a valid expiration date and access permissions:
  * Expiration: Either the default of 30 days or any duration you consider logical.
  * Access scopes: Set to `repo` and `admin-repo.hook`

  {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   url="/images/getting-started/quick-start/quick-start-git-event-permissions.png" 
   alt="GitHub PAT permissions" 
   caption="GitHub PAT permissions"
   max-width="30%" 
   %}  

For detailed information on GitHub tokens, see the [GitHub article](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Shared Configuration Repository
When selecting the Git provider, you will be required to also define the Shared Configuration Repository for your account. The shared repo stores account-level configuration settings and manifests.

Because the Shared Configuration Repo is defined at the account-level, the Git provider you select for the first Runtime in your account is used for all the other Runtimes in the same account. 
Learn more on the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).


## Prerequisites

### System requirements 
Verify that your deployment environment meets the minimum requirements for Hybrid GitOps Runtimes.  
Check the [system requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#minimum-system-requirements).  


### Argo project components & CRDs
Ensure that the target cluster does not include Argo project components or Custom Resource Definitions (CRDs), such as Argo Rollouts, Argo CD, Argo Events, and Argo Workflows.  

You can handle Argo project CRDs in two ways:
* Outside the Helm chart
* Adopt the CRDs to be managed by the GitOps Runtime Helm release (recommended)

#### Handle Argo project CRDs outside the Helm chart

Disable CRD installation for each of the Argo projects in the Helm chart by setting the following flag:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the Argo project component to replace: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

See [Argo's Helm chart README](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.

#### Adopt the CRDs into the Helm release
Allow the `gitops-runtime helm release` to manage CRDs for automatic upgrades whenever you upgrade the Hybrid GitOps Runtime.

Run this script _before_ installation:

```
#!/bin/sh
RELEASE=<helm-release-name>
NAMESPACE=<target-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```


## What's next
You are now ready to install the GitOps Runtime.

[Quick start: Installing a Hybrid GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
