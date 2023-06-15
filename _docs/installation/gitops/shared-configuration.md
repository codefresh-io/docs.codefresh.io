---
title: "Shared Configuration Repository"
description: "Share configuration settings across GitOps Runtimes"
group: installation
redirect_from:
  - /reference/shared-configuration/
toc: true
---


A Codefresh account with a Hosted or a Hybrid GitOps runtime can store configuration manifests for account-level resources in a Git repository. This repository can be shared with other runtimes in the same account, avoiding the need to create and maintain different configuration manifests for every GitOps Runtime.

* Hosted GitOps Runtimes  
  As part of the setup for a Hosted GitOps runtime, Codefresh creates the Shared Configuration Repository in the selected organization, together with the default Git Source repo. See [Connect Git provider]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/#2-connect-git-provider) in Hosted GitOps setup.  

* Hybrid GitOps Runtimes  
  When you install the first Hybrid GitOps runtime for an account, you are required to define the Shared Configuration Repo as part of setting up your Git account.  See [Installing Hybrid GitOps Helm Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#step-3-set-up-gitops-git-account).  


> Currently, Codefresh supports a single Shared Configuration Repo per account.
  You may need to reset the Shared Configuration Repo after creating it. See [Reset shared configuration repository for GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#reset-shared-configuration-repository-for-gitops-runtimes).


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
    ├── production                │ # referenced by <install_repo_1>/apps/runtime1/config_dir.json
    │   ├── in-cluster.yaml      ─┤ #     manage `include` field to decide which dirs/files to sync to cluster
    │   └── remote-cluster.yaml  ─┤ #     manage `include` field to decide which dirs/files to sync to cluster
    └── staging                   │ # referenced by <install_repo_2>/apps/runtime2/config_dir.json
        └── in-cluster.yaml      ─┘ #     manage `include` field to decide which dirs/files to sync to cluster
```
{::nomarkdown}
<br>
{:/}

### `resources` directory 

The `resources` directory holds the resources shared by all clusters managed by the GitOps Runtime:

  * `all-runtimes-all-clusters`: Every resource manifest in this directory is applied to all the GitOps Runtimes in the account, and to all the clusters managed by those Runtimes.  
  * `control-planes`: Optional. Valid for Hosted GitOps Runtimes only. When defined, every resource manifest in this directory is applied to each Hosted Runtime’s `in-cluster`.
  * `runtimes/<runtime_name>`: Optional. Runtime-specific subdirectory. Every resource manifest in a runtime-specific subdirectory is applied to only that GitOps Runtime. `manifest4.yaml` in the above example is applied only to `runtime1`. 

{::nomarkdown}
<br>
{:/}

### `runtimes` directory 
Includes subdirectories specific to each GitOps Runtime installed in the cluster, always with `in-cluster.yaml`, and optionally, application manifests for other clusters. 

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
    repoURL: <account's-isc-repository>
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
In addition to the application manifests for GitOps Runtimes in the shared configuration repository, every GitOps Runtime has a Git Source application that references `runtimes/<runtime-name>`.  

This Git Source application creates an application manifest with the `<cluster-name>` for every cluster managed by the GitOps Runtime. The `include` field in the `<cluster-name>` application manifest determines which subdirectories in the `resources` directory are synced to the target cluster.


## Adding resources
When creating a new resource, such as a new integration for example in the Codefresh UI, you can define the GitOps Runtimes and clusters to which to apply that resource. The app-proxy saves the resource in the correct location and updates the relevant Argo CD Applications to include it. 

## Related articles
[Hosted GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)  
[Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
 










