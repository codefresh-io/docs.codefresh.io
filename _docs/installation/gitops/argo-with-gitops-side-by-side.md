---
title: "Install GitOps Runtime alongside existing Argo CD"
description: "Install GitOps Runtime on cluster with existing Argo CD"
group: installation
toc: true
---

If you have a cluster with Argo CD already installed, Codefresh provides an option to install the GitOps Runtime to co-exist with your Argo CD installation.  Extend your environment with Codefresh's GitOps capabilities with a few simple configuration changes, and without the need to uninstall Argo CD. 

* **Enhance CI/CD with Codefresh GitOps**  
  Dive into the world of Codefresh GitOps, exploring its capabilities and features without having to uninstall or reconfigure existing Argo CD installations. Read about our GitOps offering in [Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/).


* **Gradual migration to GitOps applications**  
  After becoming familiar with Codefresh GitOps, make informed decisions when migrating your Argo CD Applications to Codefresh GitOps.  

  For a smooth transition from Argo CD Applications to Codefresh's GitOps applications, migrate Applications at your preferred pace. On successful migration, view, track, and manage all aspects of the applications in Codefresh.

 
Follow these steps to install the GitOps Runtime on a cluster with Argo CD:
* Prepare the Argo CD cluster for GitOps Runtime installation
* Install the GitOps Runtime via Helm
* Migrate Argo CD Applications to GitOps Runtime


## Prepare Argo CD cluster for GitOps Runtime installation

There are three configuration changes to make _before_ installing the GitOps Runtime on the cluster with Argo CD:
1. [Switch ownership of Argo project CRDs]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#gitops-onlygitops-with-argo-cd-argo-project-crds)
2. [Synchronize Argo CD chart's minor versions]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#gitops-with-argo-cd-synchronize-argo-cd-charts-minor-versions)
3. [Set native Argo CD resource tracking to `label`]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#gitops-with-argo-cd-set-native-argo-cd-resource-tracking-to-label) 


## Install Hybrid GitOps Runtime via Helm

After completing the configuration changes, follow our [step-by-step installation guide]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#install-first-gitops-runtime-in-account) to install the GitOps Runtime.  

The GitOps Runtime installation is Helm-based, and installing the Runtime on a cluster with an existing Argo CD, requires additional flags in the installation command and an additional step after installation.


## Migrate Argo CD Applications to Codefresh GitOps Runtime
The final task depending on your requirements is to migrate your Argo CD Applications to the Codefresh GitOps Runtime.  

Why would you want to do this?  
Because this allows you to completely and seamlessly manage the applications in Codefresh as GitOps entities.


The process to migrate an Argo CD Application is simple:
1. Add a Git Source to the Runtime to which store application manifests
1. Make the needed configuration changes in the Argo CD Application
1. Commit the application to the Git Source for viewing and management in Codefresh


### Step 1: Add a Git Source to GitOps Runtime

After installing the GitOps Runtime successfully, you can add a Git Source to the Runtime and commit your applications to it.
A Git Source is a Git repository managed by Codefresh as an Argo CD Application.
Read about [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources/).



* Add a [Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) to your GitOps Runtime.

### Step 2: Modify Argo CD Applications

Modify the Argo CD Application's manifest to remove `finalizers`, if any, and also remove the Application from the `argocd` `namespace` it is assigned to by default.

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




### Step 3: Commit the application to the Git Source
As the final step in migrating your Argo CD Application to a Codefresh GitOps one, manually commit the updated Application manifest to the Git Source you created in Step 1.
Once you commit the manifest to the Git Source, it is converted into a GitOps application. You can view it in the Codefresh UI, modify definitions, track it through our different dashboards, and in short, manage it as you  would any GitOps resource in Codefresh. 

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
      alt="Current State tab for migrated " 
      caption="GitOps Apps dashboard with Git Source and GitOps Application"
      max-width="50%" 
   %}



## Related articles
[Creating GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application)  
[Monitoring GitOps applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard)  
[Managing GitOps applications]({{site.baseurl}}/docs/deployments/gitops/manage-application)  
[Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  
