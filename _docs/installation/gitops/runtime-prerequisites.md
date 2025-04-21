---
title: "Runtime prerequisites"
description: "Complete the prerequisites depending on your installation mode"
toc: true
---

Before installing GitOps Runtimes, ensure you meet the [system requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/), and complete the necessary prerequisites, which vary by installation mode.


## Prerequisites summary
This table lists the prerequisites for installing a GitOps Runtime, depending on the installation mode.

{% if page.collection != site.gitops_collection %}
{: .table .table-bordered .table-hover}
| **Prerequisite**   | **Runtime with existing Argo CD** | **Runtime with new Argo CD**  |
|--------------------|---------------------------|----------------------------| 
| [Remove Argo Project and SealedSecret components](#remove-argo-project-and-sealedsecret-components-new-argo-only) | ✅   | ✅  |
| [Switch ownership of Argo Project CRDs](#switch-ownership-of-argo-project-crds)  | -    | ✅     |
| [Configure connectivity with Argo CD services](#configure-connectivity-with-argo-cd-services-existing-argo-only) | ✅ | - |
| [Verify Argo CD root path configuration](#verify-argo-cd-root-path-configuration-existing-argo-only) | ✅ | - |
{% endif %}

{% if page.collection == site.gitops_collection %}
{: .table .table-bordered .table-hover}
| **Prerequisite**   | **Runtime with existing Argo CD** | **Runtime with new Argo CD**  |
|--------------------|---------------------------|----------------------------|
| [Remove Argo Project and SealedSecret components](#remove-argo-project-and-sealedsecret-components-new-argo-only) | ✅   | ✅     | 
| [Configure connectivity with Argo CD services](#configure-connectivity-with-argo-cd-services-existing-argo-only)  | ✅ | - |
| [Verify Argo CD root path configuration](#verify-argo-cd-root-path-configuration-existing-argo-only) | ✅ | - | 
{% endif %}


## Remove Argo Project and SealedSecret components 
For GitOps Runtime installation, the _target cluster should not have_:
* SealedSecret controller components
* For an _existing Argo CD instance_:
  * Argo Events
  * Argo Rollouts
  * Argo Workflows
* For a _new Argo CD instance_:
  * Argo CD
  * Argo Events
  * Argo Rollouts 
  * Argo Workflows

{% if page.collection != site.gitops_collection %}
## Switch ownership of Argo Project CRDs
If you have Argo Project CRDs on your cluster, you must decide how to manage them when installing the GitOps Runtime with a new Argo CD instance.  
The table below lists the options available. 

{: .table .table-bordered .table-hover}
| **Option** | **Description** | **Applicable Installation Mode** |
|------------|---------------|---------------------------------|
| **Adopt all Argo Project CRDs** | Transfers ownership of all CRDs to the GitOps Runtime, ensuring they are automatically upgraded with the Runtime. | {::nomarkdown}<ul><li>Runtime with new Argo CD</li></ul>{:/} |
| **Adopt only Argo Rollout CRDs** | Transfers ownership of only Rollout CRDs to the GitOps Runtime. | {::nomarkdown}<ul><li>Runtime with new Argo CD</li></ul>{:/} |
| **Handle CRDs outside the GitOps Runtime** | Manage CRDs externally, by disabling installation for each type of CRD in the Helm chart. | {::nomarkdown}<ul><li>Runtime with new Argo CD</li></ul>{:/}|


### Option: Adopt all Argo Project CRDs
Adopt all Argo Project CRDs to transfer their ownership to the GitOps Runtime.  
The GitOps Runtime manages them as part of the GitOps Runtime Helm chart: 
* The CRDs are automatically upgraded whenever the Runtime is upgraded.
* They remain compatible with the GitOps environment.

##### Script to adopt all Argo Project CRDs
* Run this script _before_ installation:
```
curl https://raw.githubusercontent.com/codefresh-io/gitops-runtime-helm/main/scripts/adopt-crds.sh | bash -s <runtime-helm-release name> <runtime-namespace>
```

### Option: Adopt only Argo Rollout CRDs
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

### Option: Handle Argo Project CRDs outside of the Runtime chart

* Disable CRD installation under the relevant section for each of the Argo Projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the Argo Project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.


See [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.  
{% endif %}

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


<!--- Run this script to verify if the labels are correctly assigned: add the script -->

### Manually configure service names and ports in values.yaml
If auto-detection is not feasible, configure the names and ports for each of the Argo CD services in the Runtime's `values.yaml` file located [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/values.yaml){:target="\_blank"}. 

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






## Related articles
[GitOps Runtimes with ingress controllers/service meshes]({{site.baseurl}}/docs/installation/gitops/runtime-install-ingress-service-mesh-access-mode/)  
[Ingress configuration for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/)  
[Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)  
[Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
