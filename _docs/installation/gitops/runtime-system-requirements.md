---
title: "System requirements & prerequisites"
description: "Review minimum requirements and prerequisites for GitOps Runtimes"
toc: true
---

Before installing the GitOps Runtime, ensure your environment meets the necessary system requirements, and complete the prerequisites.  
This article outlines the Kubernetes cluster server versions, minimum resource requirements, and key configurations needed for a smooth and successful Runtime installation. 

## Minimum system requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |
| --------------         | --------------           |
|Kubernetes cluster      | Server version 1.23 or higher {::nomarkdown}<br><b>Tip</b>: To check the server version, run:<br> <code class="highlighter-rouge">kubectl version --short</code>{:/}|
|Helm| 3.8.0 or higher|
|Node requirements| {::nomarkdown}<ul><li>Memory: 5000 MB</li><li>CPU: 2</li></ul>{:/}|
|Cluster permissions | Cluster admin permissions |
|Git providers    |{::nomarkdown}<ul><li>GitHub</li>{% if page.collection != site.gitops_collection %}<li>GitHub Enterprise</li><li>GitLab Cloud</li><li>GitLab Server</li><li>Bitbucket Cloud</li><li>Bitbucket Data Center</li>{% endif %}</ul>{:/}|
|Git access tokens    | {::nomarkdown}Git Runtime token:<ul><li>Valid expiration date</li><li><a href="https://codefresh.io/docs/docs/security/git-tokens/#git-runtime-token-scopes">Scopes</a> </li></ul></ul>{:/}|
| |Git user token:{::nomarkdown}<ul><li>Valid expiration date</li><li><a href="https://codefresh.io/docs/docs/security/git-tokens/#git-user-access-token-scopes">Scopes</a> </li></ul>{:/}|

{% if page.collection != site.gitops_collection %}
## Prerequisites
This table lists the prerequisites for installing a GitOps Runtime in Codefresh, depending on the installation mode for the Runtime: with built-in Argo CD, existing Argo CD, or with Community Argo CD.

{: .table .table-bordered .table-hover}
| **Prerequisite**   | **Runtime with built-in Argo CD** | **Runtime with existing Argo CD** |  **Runtime with Community Argo CD** |
|--------------------|---------------------------|----------------------------|----------------------------|
| [Switch ownership of Argo Project CRDs](#switch-ownership-of-argo-project-crds)  | ✅     | ✅     |✅     |
| [Remove Argo Project and SealedSecret components](#remove-argo-project-and-sealedsecret-components) | ✅     | ✅     | -|
| [Align Argo CD chart’s minor versions](#align-argo-cd-charts-minor-versions)         | -   | -   | ✅ |
| [Set Community Argo CD resource tracking to label](#set-resource-tracking-to-label-for-existing-argo-cd-instance) | - | - | ✅ |


### Switch ownership of Argo Project CRDs
If your cluster already has Argo Project CRDs, you must decide how to manage them when installing the GitOps Runtime.  
The table below lists the options available depending on your installation mode. 

{: .table .table-bordered .table-hover}
| **Option** | **Description** | **Applicable Installation Modes** |
|------------|---------------|---------------------------------|
| **Adopt all Argo Project CRDs** | Transfers ownership of all CRDs to the GitOps Runtime, ensuring they are automatically upgraded with the Runtime. | {::nomarkdown}<ul><li>Runtime with built-in Argo CD</li><li>Runtime with existing Argo CD</li><li>Runtime alongside Community Argo CD</li></ul>{:/} |
| **Adopt all CRDs except Argo CD CRDs** | Transfers ownership of Workflows, Rollouts, and Events CRDs to the GitOps Runtime but leaves Argo CD CRDs managed by an existing Argo CD installation. | {::nomarkdown}<ul><li>Runtime with existing Argo CD</li></ul>{:/} |
| **Handle CRDs outside the GitOps Runtime** | Manage CRDs externally, by disabling installation for each type of CRD in the Helm chart. This options requires to manually upgrade and maintain the CRDs. | {::nomarkdown}<ul><li>Runtime with built-in Argo CD</li><li>Runtime with existing Argo CD</li><li>Runtime alongside Community Argo CD</li></ul>{:/}|



#### Option: Adopt all Argo Project CRDs
Adopt all Argo Project CRDs to transfer their ownership to the GitOps Runtime.  
The GitOps Runtime manages them as part of the GitOps Runtime Helm chart: 
* The CRDs are automatically upgraded whenever the Runtime is upgraded.
* They remain compatible with the GitOps environment.


##### Script to adopt all Argo Project CRDs
* Run this script _before_ installation:
```
curl https://raw.githubusercontent.com/codefresh-io/gitops-runtime-helm/main/scripts/adopt-crds.sh | bash -s <runtime-helm-release name> <runtime-namespace>
```

##### Adopt only Argo Rollout CRDs
Adopting only Argo Rollouts CRDs ensures that there is only one active Argo Rollouts controller active on the cluster with the GitOps Runtime.


* Run this script _before_ installation:
```
#!/bin/sh
RELEASE=<runtime-helm-release-name>
NAMESPACE=<runtime-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```


#### Option: Adopt All CRDs except Argo CD CRDs (Existing Argo CD only)
If you are installing the GitOps Runtime with  the Bring-Your-Own-Argo (BYOA) installation mode, you can adopt all Argo Project CRDs except for Argo CD.  
This ensures that:
* Workflows, Rollouts, and Events CRDs are managed by the GitOps Runtime.
* Argo CD CRDs remain under the control of your existing Argo CD installation, avoiding conflicts.

##### Script to exclude Argo CD CRDs
Run this script before installation:


#### Option: Handle Argo Project CRDs outside of the Runtime chart

* Disable CRD installation under the relevant section for each of the Argo Projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the Argo Project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

See [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.  

### Remove Argo Project and SealedSecret components
For GitOps Runtime installation with built-in Argo, the _target cluster should not have_:
* Argo Project components: Argo Rollouts, Argo CD, Argo Events, and Argo Workflows.
* SealedSecret controller components.



### Align Argo CD chart's minor versions 
To avoid potentially incompatible changes or mismatches, ensure that the Runtime installation with an existing Argo CD instance uses the same upstream version of Argo CD used by Codefresh.  

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



### Set resource tracking to `label` for existing Argo CD instance

When installing a GitOps Runtime alongside an existing Argo CD instance, ensure that the existing Argo CD instance tracks resources using the `label` method. If both the existing Argo CD and the Runtime Argo CD use the same tracking methods, conflicts may occur when tracking applications with the same name or when tracking the same resource.

1. In the Argo CD namespace, check the `argocd-cm` ConfigMap.
1. Ensure that `argocd-cm.application.resourceTrackingMethod` is either:
  * **Not defined**, in which case it defaults to `label`, or
  * **Explicitly set** to `label`.
{% endif %}



{% if page.collection == site.gitops_collection %}
## Prerequisites
This table lists the prerequisites for installing a GitOps Runtime in Codefresh, depending on the installation mode for the Runtime: with built-in Argo CD or existing Argo CD.

### Switch ownership of Argo Project CRDs
If your cluster already has Argo Project CRDs, you must decide how to manage them when installing the GitOps Runtime.  
The table below lists the options available depending on your installation mode. 

{: .table .table-bordered .table-hover}
| **Option** | **Description** | **Applicable Installation Modes** |
|------------|---------------|---------------------------------|
| **Adopt all Argo Project CRDs** | Transfers ownership of all CRDs to the GitOps Runtime, ensuring they are automatically upgraded with the Runtime. | {::nomarkdown}<ul><li>Runtime with built-in Argo CD</li></ul>{:/} |
| **Adopt all CRDs except Argo CD CRDs** | Transfers ownership of Workflows, Rollouts, and Events CRDs to the GitOps Runtime but leaves Argo CD CRDs managed by an existing Argo CD installation. | {::nomarkdown}<ul><li>Runtime with existing Argo CD</li></ul>{:/} |
| **Handle CRDs outside the GitOps Runtime** | Manage CRDs externally, by disabling installation for each type of CRD in the Helm chart. This options requires to manually upgrade and maintain the CRDs. | {::nomarkdown}<ul><li>Runtime with built-in Argo CD</li><li>Runtime with existing Argo CD</li></ul>{:/}|



#### Option: Adopt all Argo Project CRDs (Built-in Argo CD only)
If you are installing the GitOps Runtime with a new Argo CD instance (built-in Argo CD), adopt all Argo Project CRDs to transfer their ownership to the GitOps Runtime.  
The CRDs are managed as part the GitOps Runtime Helm chart, ensuring they: 
* Are automatically upgraded whenever the Runtime is upgraded.
* Remain compatible with the GitOps environment.


##### Script to adopt all Argo Project CRDs 
* Run this script _before_ installation:
```
curl https://raw.githubusercontent.com/codefresh-io/gitops-runtime-helm/main/scripts/adopt-crds.sh | bash -s <runtime-helm-release name> <runtime-namespace>
```

##### Adopt only Argo Rollout CRDs
Adopting only Argo Rollouts CRDs ensures that there is only one active Argo Rollouts controller active on the cluster with the GitOps Runtime.


* Run this script _before_ installation:
```
#!/bin/sh
RELEASE=<runtime-helm-release-name>
NAMESPACE=<runtime-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```


#### Option: Adopt All CRDs except Argo CD CRDs (Existing Argo CD only)
If you are installing the GitOps Runtime with  the Bring-Your-Own-Argo (BYOA) installation mode, you can adopt all Argo Project CRDs except for Argo CD.  
This ensures that:
* Workflows, Rollouts, and Events CRDs are managed by the GitOps Runtime.
* Argo CD CRDs remain under the control of your existing Argo CD installation, avoiding conflicts.

##### Script to exclude Argo CD CRDs
Run this script before installation:
<!-- NIMA: TBD  -->

#### Option: Handle Argo Project CRDs outside of the Runtime chart

* Disable CRD installation under the relevant section for each of the Argo Projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the Argo Project component: `argo-cd` (only for built-in Argo CD), `argo-workflows`, `argo-rollouts` and `argo-events`.

See [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.  

### Remove Argo Project and SealedSecret components
For GitOps Runtime installation with built-in Argo, the _target cluster should not have_:
* Argo Project components: Argo Rollouts, Argo CD, Argo Events, and Argo Workflows.
* SealedSecret controller components.

{% endif %}

## Related articles
[Install GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
{% if page.collection != site.gitops_collection %}[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/){% endif %}   
