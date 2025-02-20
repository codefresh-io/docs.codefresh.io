---
title: "System requirements & prerequisites"
description: "Review minimum requirements and prerequisites for GitOps Runtimes"
toc: true
---

Before installing the GitOps Runtime, ensure your environment meets the necessary system requirements, and complete the prerequisites.  
This article outlines the Kubernetes cluster versions, minimum resource requirements, and key configurations needed for a smooth and successful Runtime installation. 

## Minimum system requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |
| --------------         | --------------           |
|Kubernetes cluster      | Server version 1.23 or higher {::nomarkdown}<br><b>Tip</b>: To check the server version, run:<br> <code class="highlighter-rouge">kubectl version --short</code>{:/}|
|Helm| 3.8.0 or higher|
|Node requirements| {::nomarkdown}<ul><li>Memory: 5000 MB</li><li>CPU: 2</li></ul>{:/}|
|Cluster permissions | Cluster admin permissions |
|Git providers    |{::nomarkdown}<ul><li>GitHub</li><li>GitHub Enterprise</li><li>GitLab Cloud</li><li>GitLab Server</li><li>Bitbucket Cloud</li><li>Bitbucket Data Center</li></ul>{:/}|
|Git access tokens    | {::nomarkdown}Git runtime token:<ul><li>Valid expiration date</li><li><a href="https://codefresh.io/docs/docs/security/git-tokens/#git-runtime-token-scopes">Scopes</a> </li></ul></ul>{:/}|
| |Git user token:{::nomarkdown}<ul><li>Valid expiration date</li><li><a href="https://codefresh.io/docs/docs/security/git-tokens/#git-user-access-token-scopes">Scopes</a> </li></ul>{:/}|


## Common prerequisites
These prerequisites are are required for both clean-cluster installations and those alongside Community Argo CD.

### Switch ownership of Argo Project CRDs
If you already have Argo Project CRDs on your cluster, Codefresh recommends doing one of the following:
* Adopting the CRDs    
  Adopting the CRDs switches ownership for them to the GitOps Runtime, ensures that the GitOps Runtime manages the CRDs, and that the CRDs are automatically upgraded whenever the Runtime is upgraded. 
* Handling the CRDs outside the chart

#### (Recommended) Adopt all Argo Project CRDs
Adopting _all CRDs_ switches ownership to the Hybrid GitOps Runtime, allowing them to be managed by the GitOps Runtime chart. 
 
* Run this script _before_ installation:
```
curl https://raw.githubusercontent.com/codefresh-io/gitops-runtime-helm/main/scripts/adopt-crds.sh | bash -s <runtime-helm-release name> <runtime-namespace>
```
#### (Optional) Switch ownership of only Argo Rollout CRDs

>**NOTE**  
If you already adopted all Argo Project CRDs, you can skip this part.

You can also adopt only those CRDs that apply to Argo Rollouts. Adopting Argo Rollouts CRDs also switches ownership of the Rollout CRDs to the GitOps Runtime, and ensures that there is only one active Argo Rollouts controller active on the Runtime cluster.


* Run this script _before_ installation:
```
#!/bin/sh
RELEASE=<runtime-helm-release-name>
NAMESPACE=<runtime-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```

#### Handle Argo Project CRDs outside of the chart

* Disable CRD installation under the relevant section for each of the Argo Projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the Argo Project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

See [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.  

## Prerequisites: Clean-cluster installation 
For Runtime installation on a clean cluster, the cluster should not have:
* Argo Project components: Argo Rollouts, Argo CD, Argo Events, and Argo Workflows.
* SealedSecret controller components.


## Prerequisites: Cluster with Community Argo CD installation 
These prerequisites apply only for Runtime installation alongside Community Argo CD.

### Align Argo CD chart's minor versions 
To avoid potentially incompatible changes or mismatches, ensure that the Community Argo CD instance uses the same upstream version of Argo CD used by Codefresh.  

{{site.data.callout.callout_tip}}
**TIP**  
If the chart's minor appversion is lower than the version used by Codefresh, you will need to upgrade to the required version. For higher minor appversions that are not available in Codefresh forks, please contact Codefresh Support for assistance. 
{{site.data.callout.end}}


1. Get the Argo CD chart version used by Codefresh from the Dependencies either in ArtifactHub or from the GitOps Runtime's `Chart.yaml` in Git: 
  * [ArtifactHub](https://artifacthub.io/packages/helm/codefresh-gitops-runtime/gitops-runtime){:target="\_blank"}: 
  
  {% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/argo-cd-chart-version-artifacthub.png"
   url="/images/runtime/helm/argo-cd-chart-version-artifacthub.png"
  alt="Getting the Codefresh chart version of Argo CD from Dependencies in ArtifactHub"
  caption="Getting the Codefresh chart version of Argo CD from Dependencies in ArtifactHub"
  max-width="60%"
%}

  * [Chart.yaml](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/installation/gitops/Chart.yaml){:target="\_blank"}:

    {% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/argo-cd-chart-version-git.png"
   url="/images/runtime/helm/argo-cd-chart-version-git.png"
  alt="Getting the Codefresh chart version of Argo CD from Dependencies in Chart.yaml"
  caption="Getting the Codefresh chart version of Argo CD from Dependencies in Chart.yaml"
  max-width="60%"
%}

{:start="2"}
1. Go to `https://github.com/codefresh-io/argo-helm/blob/argo-cd-<dependency-chart-version>/charts/argo-cd/Chart.yaml`  
  where:  
  `<dependency-chart-version>` is the Codefresh Argo CD chart version you retrieved in step 1, for example, `5.38.1-1-cap-CR-18361`.
1. Check the `appVersion` as in the example below.

{% include
   image.html
   lightbox="true"
   file="/images/runtime/helm/helm-side-by-side-argocd-version.png"
 url="/images/runtime/helm/helm-side-by-side-argocd-version.png"
  alt="Check versions"
  caption="Check versions"
  max-width="60%"
%}

{:start="4"}
1. If your minor appversion differs from that used by Codefresh, do one of the following: 
  * Lower version: Upgrade to the required minor appversion.
  * Higher version: If not available in Codefresh forks, please contact Codefresh Support.



### Set Community Argo CD resource tracking to `label` 
Set Community Argo CD to track resources using the `label` method.  If both Argo CD instances use the same tracking method, it can result in conflicts when tracking applications with the same name, or when tracking the same resource. 

* In the Argo CD namespace, make sure `argocd-cm.application.resourceTrackingMethod` is either not defined, in which case it defaults to `label`, or if defined, is set to `label`.





## Related articles
[Install GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/)   
