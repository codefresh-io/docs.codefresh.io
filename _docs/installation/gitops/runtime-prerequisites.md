---
title: "Runtime prerequisites"
description: "Complete the prerequisites depending on your installation mode"
toc: true
---

Before installing GitOps Runtimes, ensure you meet the [system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/), and complete the necessary prerequisites, which vary by installation mode.


## Prerequisites summary
This table lists the prerequisites for installing a GitOps Runtime, depending on the installation mode: with an existing Argo CD, new Argo CD, or Community Argo CD.

{: .table .table-bordered .table-hover}
| **Prerequisite**   | | **Runtime with existing Argo CD** | **Runtime with new Argo CD**  |{% if page.collection != site.gitops_collection %} **Runtime with Community Argo CD** |{% endif %}
|--------------------|---------------------------|----------------------------|----------------------------|
| [Switch ownership of Argo Project CRDs](#switch-ownership-of-argo-project-crds)  | ✅     | ✅     |{% if page.collection != site.gitops_collection %}✅     |{% endif %}
| [Configure connectivity with Argo CD services](#configure-connectivity-with-argo-cd-services-existing-argo-only)  | ✅ | - | -|
| [Verify Argo CD root path configuration](#verify-argo-cd-root-path-configuration-existing-argo-only) | ✅ | - | -|
| [Remove Argo Project and SealedSecret components](#remove-argo-project-and-sealedsecret-components-new-argo-only) | -    | ✅     | -|
{% if page.collection != site.gitops_collection %}| [Align Argo CD chart’s minor versions](#align-argo-cd-charts-minor-versions-community-argo-only)  | -   | -   | ✅ |
| [Set Community Argo CD resource tracking to label](#set-resource-tracking-to-label-for-existing-argo-cd-instance-community-argo-only) | - | - | ✅ |{% endif %}



## Switch ownership of Argo Project CRDs
If you have Argo Project CRDs on your cluster, you must decide how to manage them when installing the GitOps Runtime.  
The table below lists the options available depending on your installation mode. 

{: .table .table-bordered .table-hover}
| **Option** | **Description** | **Applicable Installation Modes** |
|------------|---------------|---------------------------------|
| **Adopt all Argo Project CRDs** | Transfers ownership of all CRDs to the GitOps Runtime, ensuring they are automatically upgraded with the Runtime. | {::nomarkdown}<ul><li>Runtime with new Argo CD</li>{% if page.collection != site.gitops_collection %}<li>Runtime alongside Community Argo CD</li>{% endif %}</ul>{:/} |
| **Adopt all Argo Project CRD except Argo CD CRDs** | Transfers ownership of Workflows, Rollouts, and Events CRDs to the GitOps Runtime but leaves Argo CD CRDs managed by an existing Argo CD installation. | {::nomarkdown}<ul><li>Runtime with existing Argo CD</li></ul>{:/} |
| **Adopt only Argo Rollout CRDs** | Transfers ownership of only Rollout CRDs to the GitOps Runtime. | {::nomarkdown}<ul><li>Runtime with existing Argo CD</li><li>Runtime with new Argo CD</li>{% if page.collection != site.gitops_collection %}<li>Runtime alongside Community Argo CD</li>{% endif %}</ul>{:/} |
| **Handle CRDs outside the GitOps Runtime** | Manage CRDs externally, by disabling installation for each type of CRD in the Helm chart. This options requires to manually upgrade and maintain the CRDs. | {::nomarkdown}<ul><li>Runtime with existing Argo CD</li><li>Runtime with new Argo CD</li>{% if page.collection != site.gitops_collection %}<li>Runtime alongside Community Argo CD</li>{% endif %}</ul>{:/}|



### Option 1: Adopt all Argo Project CRDs
Adopt all Argo Project CRDs to transfer their ownership to the GitOps Runtime.  
The GitOps Runtime manages them as part of the GitOps Runtime Helm chart: 
* The CRDs are automatically upgraded whenever the Runtime is upgraded.
* They remain compatible with the GitOps environment.


##### Script to adopt all Argo Project CRDs
* Run this script _before_ installation:
```
curl https://raw.githubusercontent.com/codefresh-io/gitops-runtime-helm/main/scripts/adopt-crds.sh | bash -s <runtime-helm-release name> <runtime-namespace>
```


### Option 2: Adopt All CRDs except Argo CD CRDs (Existing Argo CD only)
If you are installing the GitOps Runtime with an existing Argo CD instance, you can adopt all Argo Project CRDs, excluding Argo CD CRDs.  
This ensures that:
* Workflows, Rollouts, and Events CRDs are managed by the GitOps Runtime.
* Argo CD CRDs remain under the control of your existing Argo CD installation, avoiding conflicts.

##### Script to exclude Argo CD CRDs
Run this script before installation:


### Option 3: Adopt only Argo Rollout CRDs
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

### Option 4: Handle Argo Project CRDs outside of the Runtime chart

* Disable CRD installation under the relevant section for each of the Argo Projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the Argo Project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

See [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.  

## Configure connectivity with Argo CD services (Existing Argo only)

Installing the GitOps Runtime with an existing Argo CD instance requires connectivity between the Runtime and key Argo CD services.
The following Argo CD services must be accessible from the GitOps Runtime:
`argocd-server`
`argocd-repo-server`
`argocd-redis`

There are two options to configure service discovery:
* Auto-detection via labels
* Configuring service names and ports in the Runtime's `values.yaml` file.

### Configure auto-detect for Argo CD services
Assign the correct labels to the Argo CD services for the GitOps Runtime to auto-detect them. 
* `argocd-server`: `app.kubernetes.io/component=server,app.kubernetes.io/part-of=argocd`
* `argocd-repo-server`: `app.kubernetes.io/component=repo-server,app.kubernetes.io/part-of=argocd`
* `argocd-redis`: `app.kubernetes.io/component=redis,app.kubernetes.io/part-of=argocd`

Run this script to verify if the labels are correctly assigned:
<!--- add the script -->

### Manually configure service names and ports in values.yaml
If auto-detection is not feasible, configure the names and ports for each of the Argo CD services in the Runtime's `values.yaml` file located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/installation/gitops/){:target="\_blank"}. 

Here's an example of the service configuration in `values.yaml`.

```yaml
global:
  external-argo-cd:
    server:
      svc: argocd
      port: 80
    redis:
      svc: argocd-redis
      port: 6379
    repoServer:
      svc: argocd-repo-server
      port: 8081
...
```
## Verify Argo CD root path configuration (Existing Argo only)
If your existing Argo CD instance runs behind a reverse proxy and uses a non-default root path, you must configure the path in the Runtime's `values.yaml` in `global.external-argo-cd.server.rootpath`.

Here's an example of the non-default root path configuration for Argo CD in `values.yaml`.

```yaml
global:
  external-argo-cd:
    server:
      svc: argocd
      port: 80
      rootpath: '/argocd' # example value if ArgoCD is behind a reverse proxy such as https://example.com/argocd/
...
```

## Remove Argo Project and SealedSecret components (New Argo only)
For GitOps Runtime installation with a new Argo CD instance, the _target cluster should not have_:
* Argo Project components: Argo Rollouts, Argo CD, Argo Events, and Argo Workflows.
* SealedSecret controller components.



{% if page.collection != site.gitops_collection %}
## Align Argo CD chart's minor versions (Community Argo only)
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



## Set resource tracking to `label` for existing Argo CD instance (Community Argo only)

When installing a GitOps Runtime alongside an existing Argo CD instance, ensure that the existing Argo CD instance tracks resources using the `label` method. If both the existing Argo CD and the Runtime Argo CD use the same tracking methods, conflicts may occur when tracking applications with the same name or when tracking the same resource.

1. In the Argo CD namespace, check the `argocd-cm` ConfigMap.
1. Ensure that `argocd-cm.application.resourceTrackingMethod` is either:
  * **Not defined**, in which case it defaults to `label`, or
  * **Explicitly set** to `label`.
{% endif %}





## Related articles
[Ingress configuration for Runtimes]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/)  
[Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)  
[Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
{% if page.collection != site.gitops_collection %}[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/){% endif %}   