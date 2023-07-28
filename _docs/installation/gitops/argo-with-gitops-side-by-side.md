---
title: "Side-by-side: Argo CD and GitOps Runtimes"
description: "Install GitOps Runtimes with Argo CD"
group: installation
toc: true
---


## Prepare for side-by-side

Same minor version for Argo CD & Codefresh GitOps
Argo CD must have the same minor version as Codefresh GitOps.  

When installing Argo CD using Helm, we recommend using the same upstream chart version as Codefresh. 
Where is this?? You can find this version in the dependencies for the [gitops-runtime chart](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/Chart.yaml). 
The version will look like this: <upstream chart version>-<codefresh-version id>

CRD adoption
When installing GitOps with the native Argo CD, we recommned that the Custom Resource Definitionsby managed by the GitOps Runtime's Helm release. Doing so ensures that when you upgrade the Hybrid GitOps Runtime, the CRDs are also automatically upgraded.
You can adopt all CRDs or only 

This also applies to Argo Rollout CRDs, as there should only be one active Argo Rollouts controller in the cluster and . To adopt only CRDs for rollouts, run the following script (only if you haven't executed the script to adopt all CRDs mentioned above). Make sure to set your release name and namespace:
Run this script before installation:

Resource collisions
To prevent collisions with Argo CD and Argo Rollouts resources on the cluster, set `fullnameOverride` arguments in the Helm with the custom values.
* For Argo CD:
```
argo-cd:
  fullnameOverride: codefresh-argo-cd
```
* For Argo Rollouts:
```
argo-rollouts:
  fullnameOverride: codefresh-argo-rollouts
```
In the context of your snippet, codefresh-argo-cd is used as the custom value for fullnameOverride. This means that when Helm installs the "argo-cd" chart, it will use codefresh-argo-cd as the base name for Kubernetes resources, rather than the default release name provided during the Helm installation.

Annotations for resource tracking
If ArgoCD and gitops-runtime ArgoCD use the same resource tracking method, collisions can occur when using the same application names or tracking the same resource from both ArgoCDs. 
GitOps Runtimes use annotations to track resources. For side-by-side installation, this means that native Argo CD's resource tracking method is not set, which means it defaults to `label` or must be explicty set as `label`.



## Installation


## Post installation



##

