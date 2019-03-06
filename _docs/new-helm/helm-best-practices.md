---
title: "HELM Best practices"
description: "A high level overview of Helm workflows"
group: new-helm
toc: true
---

## Helm - the package manager

### Helm concepts

Helm Concept|Description| Important point
---|--- | ---
Chart (unpackaged) | A folder with files that follow the Helm chart guidelines. | |
Chart (packaged) | A tar.gz package of the above | |
Chart name | Name of the package as defined in `Chart.yaml` | Part of package identification |
Templates | A set of Kubernetes manifests that form an application | Go templates can be used |
Values | Settings that can be parameterized in Kubernetes manifests | Used for templating of manifests |
Chart version | The version of the package/chart | Part of package identification |
App version | The version of the application contained in the chart | **Independent from chart version** |
Release | A deployed package in a Kubernetes cluster | **Multiple releases of the same chart can be active**|
Release name | An arbitrary name given to the release | **Independent from name of chart** |
Release Revision | A number that gets incremented each time an application is deployed/upgraded | **Unrelated to chart version**|
Repository | A file structure (HTTP server) with packages and an `index.yaml` file | |
Installing | Creating a brand new release from a Helm chart (either unpackaged, packaged or from a repo) | |
Upgrading | Changing an existing release in a cluster | Can upgrade to any version (even the same) | 
Rolling back | Going back to a previous revision of a release | Helm handles the rollback, no need to re-rerun pipeline |
Pushing | Storing a Helm package on a repository | Will automatically package as well | 
Fetching | Downloading a Helm package from a repository to the local filesystem | Will not install/deploy the package |

### Common Helm pitfalls

Helm repos are optional

Versioning between app and chart. Multiple charts
 
Helm dependencies either embedded 




## Helm pipelines

### Deploy from unpackaged chart

### Deploy and package/push

### Separate Helm pipelines 

## Helm packaging strategies

### Simple 1-1 versioning

### Chart versus application versioning

### Umbrella charts

## Helm promotion strategies

### Single repository with multiple environments

### Chart promotion between environments

### Chart promotion between repositories and environments
