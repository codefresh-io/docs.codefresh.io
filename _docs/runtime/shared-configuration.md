---
title: "Shared runtime configuration repo"
description: ""
group: runtime
toc: true
---


A Codefresh account with a hosted or a hybrid runtime can store configuration settings in a Git repository. This repository can be shared with other runtimes in the same account, avoiding the need to create and maintain configurations for each runtime.

* Hosted runtimes  
  As part of the setup for a hosted runtime, you must select the Git Organization for which to create the runtime installation repo. Codefresh then creates the shared configuration repository.  

* Hybrid runtimes  
  When you install the first hybrid runtime for an account, you can define the shared configuration repo through the `--shared-config-repo` flag. If the flag is omitted, and the runtime account does not have a shared configuration repo, it is created in the runtime installation repo, in `shared-config` root.

> Currently, Codefresh supports a single shared configuration repo per account.


### Shared runtime configuration repo structure
Below is a representation of the structure of the shared configuration repo for runtimes. 
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

#### `resources` directory 

The `resources` directory holds the resources shared by all clusters managed by the runtime:

  * `all-runtimes-all-clusters`: Every resource manifest in this directory is applied to all the runtimes in the account, and to all the clusters managed by those runtimes.  
  * `control-planes`: Optional. Valid for hosted runtimes only. When defined, every resource manifest in this directory is applied to each hosted runtime’s `in-cluster`.
  * `runtimes/<runtime_name>`: Optional. Runtime-specific subdirectory. Every resource manifest in a runtime-specific subdirectory is applied to only that runtime. `manifest4.yaml` in the above example is applied only to `runtime1`. 

#### `runtimes` directory 
Includes subdirectories specific to each runtime installed in the cluster, always with `in-cluster.yaml`, and optionally application manifests for other clusters. 

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


### Git Source application per runtime
In addition to the application manifests for the runtimes in the shared configuration repository, every runtime has a Git-Source Application that references `runtimes/<runtime-name>` in the shared configuration repo.  

This Git Source application creates an application manifest with the `<cluster-name>` for every cluster managed by the runtime. The `include` field in the `<cluster-name>` application manifest determines which subdirectories in the `resources` directory are synced to the target cluster.


### Adding resources
When creating a new resource, such as a new integration for example in the Codefresh UI, you can define the runtimes and clusters to which to apply that resource. The app-proxy saves the resource in the correct location and updates the relevant Argo CD Applications to include it. 

### Upgrading hybrid runtimes
Older hybrid runtimes that do not have the shared configuration repository must be upgraded to the latest version.  
You have two options to define the shared configuration repository during upgrade:
* Upgrade the runtime, and let the app-proxy create the shared runtime configuration repo automatically.
* Manually define the shared runtime configuration repository, by adding the `--shared-config-repo` flag in the runtime upgrade command.

>If the shared runtime configuration repo is not created for an account, Codefresh creates it in the installation repo, in `shared-config` root. 

If the hybrid runtime being upgraded has managed clusters, once the shared configuration repo is created for the account either automatically or manually on upgrade, all clusters are migrated to the same repo when app-proxy is initialized. An Argoproj application manifest is committed to the repo for each cluster managed by the runtime. 



