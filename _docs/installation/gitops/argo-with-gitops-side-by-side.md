---
title: "Install GitOps Runtime alongside Community Argo CD"
description: "Install GitOps Runtime on cluster with existing Argo CD"
group: installation
toc: true
---

If you have a cluster with a version of Community Argo CD already installed, Codefresh provides an option to install the GitOps Runtime to co-exist with your Argo CD installation.  This option enables you to extend your environment with Codefresh's GitOps capabilities with a few simple configuration changes, without the need to uninstall Argo CD. 

* **Enhance CI/CD with Codefresh GitOps**  
  Dive into the world of Codefresh GitOps, exploring its capabilities and features without having to uninstall or reconfigure existing Argo CD installations. Read about our GitOps offering in [Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/).


* **Gradual migration to GitOps applications**  
  After becoming familiar with Codefresh GitOps, make informed decisions when migrating your Argo CD Applications to Codefresh GitOps.  

  For a smooth transition from Argo CD Applications to Codefresh, migrate them at your preferred pace. On successful migration, view, track, and manage all aspects of the applications in Codefresh.

<br>

Follow these steps to install the GitOps Runtime on a cluster with Community Argo CD:
* [Prepare Argo CD cluster for GitOps Runtime installation](#prepare-argo-cd-cluster-for-gitops-runtime-installation)
* [Install the GitOps Runtime via Helm](#install-hybrid-gitops-runtime-via-helm)
* [Remove Rollouts controller deployment](#remove-rollouts-controller-deployment)
* [Migrate Argo CD Applications to GitOps Runtime](#migrate-community-argo-cd-applications-to-codefresh-gitops-runtime)


## Prepare Argo CD cluster for GitOps Runtime installation

_Before_ installing the GitOps Runtime on the cluster with Community Argo CD, you need make configuration changes on the cluster. 

### Step 1: Switch ownership of Argo Project CRDs
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

#### Handle Argo Project CRDs outside of the chart

* Disable CRD installation under the relevant section for each of the Argo Projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the Argo Project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

See [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.  



### Step 2: (Optional) Switch ownership of only Argo Rollout CRDs

>**NOTE**  
If you already adopted all Argo Project CRDs, you can skip this part.

You can also adopt only those CRDs that apply to Argo Rollouts. Adopting Argo Rollouts CRDs also switches ownership of the Rollout CRDs to the GitOps Runtime, and ensures that there is only one active Argo Rollouts controller active on the Runtime cluster.

See [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"}.


* Run this script _before_ installation:
```
#!/bin/sh
RELEASE=<runtime-helm-release-name>
NAMESPACE=<runtime-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```



### Step 3: Align Argo CD chart's minor versions 
To avoid potentially incompatible changes or mismatches, ensure that the Community Argo CD instance uses the same upstream version of Argo CD used by Codefresh.  

If the chart's minor appversion is lower than the version used by Codefresh, you will need to upgrade to the required version. For higher minor appversions that are not available in Codefresh forks, please contact Codefresh Support for assistance.

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

  * [Chart.yaml](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/Chart.yaml){:target="\_blank"}:

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



### Step 4: Set Community Argo CD resource tracking to `label` 
Set Community Argo CD to track resources using the default `label` method.  If both Argo CD instances use the same tracking method, it can result in conflicts when tracking applications with the same name, or when tracking the same resource. 

* In the Argo CD namespace, make sure `argocd-cm.application.resourceTrackingMethod` is either not defined, in which case it defaults to `label`, or if defined, is set to `label`.



## Install Hybrid GitOps Runtime via Helm

After completing the configuration changes, follow our [step-by-step installation guide]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#install-first-gitops-runtime-in-account) to install the Hybrid GitOps Runtime via Helm.  


Most of the steps to install the GitOps Runtime are identical for both types (clean and alongside Community Argo CD) installations. 

Installing alongside Community Argo CD requires additional flags in the installation command. These flags are required in the installation commands for all access modes, tunnel-, ingress-, and service-mesh-based.

##### Additional installation flags for GitOps Runtime with Community Argo CD

{% highlight yaml %}
...
  --set argo-cd.fullnameOverride=codefresh-argo-cd \
  --set argo-rollouts.fullnameOverride=codefresh-argo-cd \
  --set argo-cd.configs.cm.application.resourceTrackingMethod=annotation \
...
{% endhighlight %}

where:
* `argo-cd.fullnameOverride=codefresh-argo-cd` is mandatory to avoid conflicts at the cluster-level for resources in both the Community Argo CD and GitOps Runtime's Argo CD.
* `argo-rollouts.fullnameOverride=codefresh-argo-rollouts` is mandatory when you have Argo Rollouts in your cluster to avoid conflicts.
* `argo-cd.configs.cm.application.resourceTrackingMethod=annotation` is mandatory to avoid conflicts when tracking resources with the same application names or when tracking the same resource in both the Community Argo CD and GitOps Runtime's Argo CD.
        

## Remove Rollouts controller deployment
(NIMA: need to confirm again if it is correct to do this after all the install steps. Seem to remember that the reason I moved it to core install is because Ilia said. Francisco, can you confirm this?)
If you have Argo Rollouts also installed with Community Argo CD,  _after_ confirming successful installation, remove the duplicate Argo Rollouts controller deployment to avoid having two controllers in the cluster. 

{{site.data.callout.callout_warning}}
**IMPORTANT**    
  Make sure to remove only  `deployment` and not the CRDs. Removing the CRDs also removes Rollout objects resulting in downtime for workloads. 
{{site.data.callout.end}}

1. Remove the duplicate Argo Rollouts controller:  
  `kubectl delete deployment <argo-rollouts-controller-name> -n <argo-rollouts-controller-namespace>`
1. Continue with [Step 8: (Optional) Create a Git Source](#step-8-optional-create-a-git-source).





## Migrate Community Argo CD Applications to Codefresh GitOps Runtime
The final task, depending on your requirements, is to migrate your Community Argo CD Applications to the Codefresh GitOps Runtime.  

Why would you want to do this?  
Because this allows you to completely and seamlessly manage the applications in Codefresh as GitOps entities.


The process to migrate an Argo CD Application is simple:
1. Add a Git Source to the GitOps Runtime to which store application manifests
1. Make the needed configuration changes in the Argo CD Application
1. Commit the application to the Git Source for viewing and management in Codefresh


### Step 1: (Optiona) Add a Git Source to GitOps Runtime

If you have already added a Git Source as part of the Hybrid GitOps Runtime installation procedure, skip this step.  

Otherwise, you can add a Git Source to the GitOps Runtime and commit your applications to it.
A Git Source is a Git repository managed by Codefresh as an Argo CD Application.
Read about [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/).



* Add a [Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) to your GitOps Runtime.

### Step 2: Modify Argo CD Applications

Modify the Argo CD Application's manifest to remove `finalizers` if any, and also remove the Application from the `argocd` `namespace` it is assigned to by default.

* Remove `metadata.namespace: argocd`.
* Remove `metadata.finalizers`.

Below is an example of a manifest for an Argo CD Application with `finalizers`.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-sample-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    path: guestbooks/apps
    repoURL: https://github.com/codefresh-codefresh/argocd-example-apps
    targetRevision: personal-eks
  destination:
    namespace: my-app
    server: https://kubernetes.default.svc
  syncPolicy:
    automated:
      prune: false
      selfHeal: false
      allowEmpty: false
    syncOptions:
      - PrunePropagationPolicy=foreground
      - Replace=false
      - PruneLast=false
      - Validate=true
      - CreateNamespace=true
      - ApplyOutOfSyncOnly=false
      - ServerSideApply=false
      - RespectIgnoreDifferences=false
```




### Step 3: Commit Argo CD application to Git Source
As the final step in migrating your Argo CD Application to a GitOps Runtime, manually commit the updated application manifest to the Git Source you created.
Once you commit the manifest to the Git Source, it is synced with the Git repo. You can view it in the Codefresh UI, modify definitions, track it through our different dashboards, and in short, manage it as you would any GitOps resource in Codefresh. 

1. Go to the Git repo where you created the Git Source.
1. Add and commit the Argo CD Application manifest to the Git Source.
   Here's an example of the `my-sample-app` above committed to a Git Source without `metadata.namespace: argocd` and `metadata.finalizers`.

  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/migrate-app-sample-in-git-source.png" 
      url="/images/runtime/helm/migrate-app-sample-in-git-source.png" 
      alt="Argo CD Application committed to GitOps Git Source" 
      caption="Argo CD Application committed to GitOps Git Source"
      max-width="50%" 
   %}

{:start="3"}
1. In the Codefresh UI, from the sidebar, below Ops, select [**GitOps Apps**](https://g.codefresh.io/2.0/applications-dashboard/list){:target="\_blank"}.
  The Applications Dashboard displays the new Git Source application.
  
  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/migrate-app-apps-dashboard.png" 
      url="/images/runtime/helm/migrate-app-apps-dashboard.png" 
      alt="GitOps Apps dashboard with Git Source and migrated Application" 
      caption="GitOps Apps dashboard with Git Source and migrated Application"
      max-width="50%" 
   %}

{:start="4"}
1. Click the application to drill down to the different tabs. The Configuration tab displays the application's settings which you can modify and update.
  Here's an example of the Current State tab for `my-sample-app`.

  {% include 
      image.html 
      lightbox="true" 
      file="/images/runtime/helm/migrate-app-current-state.png" 
      url="/images/runtime/helm/migrate-app-current-state.png" 
      alt="Current State tab for migrated Argo CD application" 
      caption="Current State tab for migrated Argo CD application"
      max-width="50%" 
   %}



## Related articles
[Creating Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/create-application)  
[Monitoring Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard)  
[Managing Argo CD applications]({{site.baseurl}}/docs/deployments/gitops/manage-application)  
[Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  
