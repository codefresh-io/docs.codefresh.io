---
title: "Install Hybrid GitOps Runtime"
description: "Install the Helm-based Hybrid GitOps Runtime"
group: getting-started
sub-group: quick-start
toc: true
---



Get up and running with Codefresh by installing the Hybrid Runtime for GitOps via Helm.
The Runtime is installed through a Helm chart. The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/){:target="\_blank"}. It contains all the arguments that can be configured, including optional ones.
 
## Quick start assumptions

The quick start assumes that you are installing the first Hybrid GitOps Runtime in your Codefresh account. 

## Argo project components & CRDs
Hybrid GitOps installation requires a cluster without Argo project components and CRDs (Custom Resource Definitions). 

Argo project components include Argo Rollouts, Argo CD, Argo Events, and Argo Workflows.  

You can handle Argo project CRDs outside the chart, or as recommended, adopt the CRDs to be managed by the GitOps Runtime Helm release. 

If you already have Argo project CRDs on your cluster, do one of the following:
* Handle Argo projects CRDs outside of the chart (see [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"})  
  Disable CRD installation under the relevant section for each of the Argo projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the argo project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

* Adopt the CRDs<br>
  Adopting the CRDs allows them to be managed by the `gitops-runtime helm release`. Doing so ensures when you upgrade the Hybrid GitOps Runtime, the CRDs are also automatically upgraded.

  Run this script _before_ installation:

```
#!/bin/sh
RELEASE=<helm-release-name>
NAMESPACE=<target-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```

### Tunnel-based runtime
Hybrid GitOps Runtimes supports tunnel-based, ingress-based, and service-mesh-based access modes.  
For the quick start, we'll use the tunnel-based mode which is the default access mode, not requiring an ingress controller.  
For details on these access modes, review [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

### GitHub as Git provider  
Hybrid GitOps Runtimes require a Git Runtime token for authentication to the Git installation repository based on your Git provider, and a Git user token to authenticate Git-based actions for the Runtime.  
The quick start uses GitHub as the Git provider. For other Git providers and token requirements, see [Git providers and Git runtime tokens]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes).  

Have your GitHub Runtime token ready for Runtime installation with a valid expiration date and access permissions:
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

  If you need detailed information on GitHub tokens, see the [GitHub article](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

### Shared Configuration Repository
When you select the Git provider, Codefresh prompts you to also select the Shared Configuration Repository for your account. The repo stores account-level configuration settings and manifests.
Because the Shared Configuration Repo is defined at the account-level, the Git provider you select for the first Runtime in your account is used for all the other Runtimes in the same account. 
Read up on the [Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/).

## Install Hybrid GitOps Runtime

**Before you begin** 
* Make sure your cluster does not have [Argo project components & CRDs](#argo-project-components--crds)

**How to**  

1. In the Welcome page, select **+ Install Runtime**.
1. From Runtimes in the sidebar, select **GitOps Runtimes**.
1. Set up your Git provider account:
    1. If not GitHub, select the Git provider.  
    1. Define the provider's API URL.
    1. Define the URL of the **Shared Configuration Repository**.
    1. Click **Next**.
1. Install the Hybrid GitOps Runtime:
    1. Click **Generate** to create a new API key.
    1. Retain the default values for the GitOps Runtime name and namespace, `codefresh`.
    1. Copy the command in _Step 3_ and run it to add the repository in which to store the Helm chart. You don't need to change anything in the command.
    1. Copy the command in _Step 4_ and run it to install the Helm chart for the Hybrid GitOps Runtime:   
        where:  
        * `cf-gitops-runtime` is the default name of the Helm release, which you can change if needed.  
        * `codefresh` is the default namespace in which to install the Hybrid GitOps runtime.
        * `<codefresh-account-id>` is mandatory for _tunnel-based Hybrid GitOps Runtimes_, and is automatically populated by Codefresh in the command. 
        * `<codefresh-token>` is the API key you generated, and is automatically populated in the command.
        * `codefresh` is the default name of the runtime. 
        * `<cf-gitops-runtime/gitops-runtime>` is the name of the repo and must be identical to the one specified in _Step 3_, and is by default, `cf-gitops-runtime`. `gitops-runtime` is the name of the Helm chart predefined by Codefresh, and cannot be changed.

{% include
image.html
lightbox="true"
file="/images/quick-start/gitops/install-helm-command.png"
url="/images/quick-start/gitops/install-helm-command.png"
alt="Quick Start: Install Hybrid GitOps Runtime"
caption="Quick Start: Install Hybrid GitOps Runtime"
max-width="60%"
%}

{:start="5"}
1. Wait for a few minutes, and then click **Close**.
   You are taken to the List View for GitOps Runtimes where you can see the Hybrid GitOps Runtime you added with a green dot indicating that it is online, and the Type column for the Runtime displaying Helm.
1. Optional. Complete the installation by clicking **Configure as Argo Application**.  
  There is no need for any action from you, as Codefresh takes care of the configuration.
  By configuring the Hybrid GitOps Runtime as an Argo Application, you can ensure that GitOps is the single source of truth for the Runtime and view and monitor Runtime components. 

You are now ready to create and deploy a GitOps application in Codefresh.


## What to do next
[Create resources for codefresh-guestbook application]({{site.baseurl}}/docs/quick-start/gitops-quick-start/create-app-specs/)  

