---
title: "Shared Configuration Repository"
description: "Share configuration settings across GitOps Runtimes"
group: installation
redirect_from:
  - /docs/reference/shared-configuration/
toc: true
---


A Codefresh account with a Hosted or a Hybrid GitOps runtime can store configuration manifests for account-level resources in a Git repository. This repository, the Shared Configuration Repository, can be shared with other GitOps Runtimes in the same account, avoiding the need to create and maintain different configuration manifests for every GitOps Runtime. At the same time, you also have the flexibility to store resources unique to specific Runtimes without affecting other Runtimes. 


* **Centralized cross-Runtime configuration management**  
  With the Shared Configuration Repository, you can store configuration manifests for account-level resources in a centralized location. The Git repository is accessible to all GitOps Runtimes within the same Codefresh account, ensuring that account-level resources are consistently deployed and managed across all environments.

* **Runtime-specific configuration**  
   With the Shared Configuration Repository, you can create subdirectories for different GitOps Runtimes, and place configuration manifests that are only applied to specific GitOps Runtimes. You have fine-grained control over the configuration of individual Runtimes without affecting others.

* **Control Plane configuration**  
  The Shared Configuration Repository also supports a control-planes directory, which is applicable only to Hosted GitOps Runtimes. You can place resource manifests in this directory to define configuration specific to the control plane of the Hosted GitOps runtime. You can customize and manage control plane resources separately from other account-level or runtime-specific resources.




## GitOps Runtimes & Shared Configuration Repos

* Hosted GitOps Runtimes  
  As part of the setup for a Hosted GitOps runtime, Codefresh creates the Shared Configuration Repository in the selected organization, together with the default Git Source repo. See [Connect Git provider]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/#2-connect-git-provider) in Hosted GitOps setup.  

* Hybrid GitOps Runtimes  
  When you install the first Hybrid GitOps runtime for an account, you are required to define the Shared Configuration Repo as part of setting up your Git account.  See [Installing Hybrid GitOps Helm Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#step-3-set-up-gitops-git-account).  


> Currently, Codefresh supports a single Shared Configuration Repo per account.
  You may need to reset the Shared Configuration Repo after creating it. See [Reset Shared Configuration Repository for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#reset-shared-configuration-repository-for-gitops-runtimes).


## Shared Configuration Repo structure
Below is a representation of the structure of the repository with the shared configuration. 
See a [sample repo](https://github.dev/noam-codefresh/shared-gs){:target="\_blank"}.

```
.
├── resources <───────────────────┐
│   ├── all-runtimes-all-clusters │
│   │   ├── cm-all.yaml           │
│   │   └── subfolder             │
│   │       └── manifest2.yaml    │
│   ├── control-planes            │
│   │   └── manifest3.yaml        │
│   ├── runtimes                  │
│   │   ├── runtime1              │
│   │   │   └── manifest4.yaml    │
│   │   └── runtime2              │
│   │       └── manifest5.yaml    │
│   └── manifest6.yaml            │
└── runtimes                      │
    ├── production                │ # referenced by "production-isc" argo-cd application, applied to the cluster by "cap-app-proxy"
    │   ├── in-cluster.yaml      ─┤ #     manage `include` field determines which dirs/files to sync to cluster
    │   └── remote-cluster.yaml  ─┤ #     manage `include` field to decide which dirs/files to sync to cluster
    └── staging                   │ # referenced by "staging-isc" argo-cd application, applied to the cluster by "cap-app-proxy
        └── in-cluster.yaml      ─┘ #     manage `include` field determines which dirs/files to sync to cluster
```
{::nomarkdown}
<br>
{:/}

### `resources` directory 

The `resources` directory holds the resources shared by _all_ clusters managed by the GitOps Runtime:

  * `all-runtimes-all-clusters`: Every resource manifest in this subdirectory is applied to all the GitOps Runtimes in the account, and to all the clusters managed by those Runtimes. In the above example, `manifest2.yaml` is applied to both `runtime1` and `runtime2`
  * `control-planes`: Optional. When defined, every resource manifest in this subdirectory is applied to each Runtime’s `in-cluster`. Config maps containing sealing keys are stored in this subdirectory.
  * `runtimes/<runtime_name>`: Optional. Runtime-specific subdirectory. Every resource manifest in a runtime-specific subdirectory is applied to only the GitOps Runtime defined by `<runtime_name>`. 
    In the above example, `manifest4.yaml` is applied only to `runtime1`, and `manifest5.yaml` is applied only to `runtime2`. 

{::nomarkdown}
<br>
{:/}

### `runtimes` directory 
The `runtimes` directory includes subdirectories specific to each GitOps Runtime installed in the cluster, always with `in-cluster.yaml`, and optionally, application manifests for other clusters. 

**Example application manifest for in-cluster.yaml**

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  labels:
    codefresh.io/entity: internal-config
    codefresh.io/internal: 'true'
  name: in-cluster
spec:
  project: default
  source: 
    repoURL: <account's-shared-config-repository>
    path: resources # or shared-config/resources
    directory:
      include: '{all-runtimes-all-clusters/*.yaml,all-runtimes-all-clusters/**/*.yaml,runtimes/<runtime_name>/*.yaml,runtimes/<runtime_name>/**/*.yaml,control-planes/*.yaml,control-planes/**/*.yaml}'
      recurse: true
  destination:
    namespace: <runtime_name>
    server: https://kubernetes.default.svc
  syncPolicy:
    automated:
      allowEmpty: true
      prune: true
      selfHeal: true
    syncOptions:
      - allowEmpty=true
```


## Git Source application per Runtime
In addition to the application manifests for GitOps Runtimes in the Shared Configuration Repository, every GitOps Runtime has a Git Source application that references `runtimes/<runtime-name>`.  

This Git Source application creates an application manifest with the `<cluster-name>` for every cluster managed by the GitOps Runtime. The `include` field in the `<cluster-name>` application manifest determines which subdirectories in the `resources` directory are synced to the target cluster.


## Use case: Integration resources for Runtimes
When creating a new GitOps Integration resource, such as a container registry integration for example in the Codefresh UI, you can define the GitOps Runtimes to which to apply that resource. The `app-proxy` saves the resource in the correct location in the Shared Configuration Repo, and updates the relevant Argo CD Applications to include it. 

## Use case: Create application for distribution across all GitOps Runtimes
In this scenario, you want to distribute an application configuration to all GitOps Runtimes within your Codefresh account. Storing the application manifest in the `resources/all-runtimes-all-clusters` directory of the Shared Configuration Repository makes it automatically accessible to all the GitOps Runtimes in the account and to all the clusters managed by those Runtimes. 

Here's how to do this with the Shared Configuration Repo:

1. Create or update the application manifest in the `resources/all-runtimes-all-clusters` directory of the Shared Configuration Repository.  
1. Specify the desired configuration settings and resources required for the application in the manifest file.
1. Save and commit the changes to the Git repository.

>**TIP**:  
You can then monitor these applications in the GitOps Overview Dashboard, and drill down to each application in the GitOps Apps dashboard. 

## Use case: Create application for distribution across specific clusters managed by a Runtime
In this scenario, you want to distribute an application configuration to specific clusters managed by a GitOps Runtime. You can add the application manifest to the specific GitOps Runtimes, and define the target clusters in the `include` statement in each application manifest.

Here's how to do this with the Shared Configuration Repo:

1. Create or update the application manifest in the `resources/runtimes/<runtime_name>` directory of the Shared Configuration Repository.
1. Replace `<runtime_name>` with the name of the GitOps Runtime to which to apply the application manifest.
1. In the application manifest, add an `include` statement defining the clusters to which to distribute/sync the application:
   
```
include: '{runtimes/<runtime_name>/*.yaml,runtimes/<runtime_name>/**/*.yaml,clusters/<cluster-name1>/*.yaml,clusters/<cluster-name2>/*.yaml}'
```
  where:  
      * `runtimes/<runtime_name>/*.yaml` includes all YAML files directly in the directory specified by the <runtime_name>. For example, files in `runtimes/production/*.yaml` are specific to Runtime `production`.
      * `runtimes/<runtime_name>/**/*.yaml` includes all YAML files in any subdirectories within the <runtime_name> directory. For example, files in `runtimes/production/**/*.yaml` are also specific to Runtime `production`.
      * `clusters/<cluster-name1>/*.yaml` includes all YAML files directly under the ClusterA directory in the `clusters` directory. These files are specific to Cluster A.
      * `clusters/ClusterB/*.yaml` includes all YAML files directly under the ClusterB directory in the `clusters` directory. These files are specific to Cluster B.

{:start="4"}
1. Save and commit the changes to the Git repository.  
The GitOps Runtime associated with the specific clusters will detect the changes in the Shared Configuration Repository and apply the application configuration only to the targeted clusters.

You can then monitor these applications in the GitOps Overview Dashboard, and drill down to each application in the GitOps Apps dashboard. 


## Related articles
[Hosted GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)  
[Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  

 










