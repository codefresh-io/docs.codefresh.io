---
title: "HELM Best practices"
description: "A high level overview of Helm workflows"
group: new-helm
toc: true
---

[Helm](https://helm.sh) is a package manager for Kubernetes (think apt or yum). It works by combining several manifests into a single package that is called [a chart](https://helm.sh/docs/developing_charts/). Helm also supports chart storage in remote or local Helm repositories that function like package registries such as maven central, ruby gems, npm registry etc.

Helm is currently the only solution that supports

* The grouping of related Kubernetes manifests in a single entity (the chart)
* Basic templating and value support for Kubernetes manifests
* Dependency declaration between applications (chart of charts)
* A registry of available applications to be deployed (Helm repository)
* A view of a Kubernetes cluster in the application/chart level
* Management of installation/upgrades of charts as a whole
* Built-in rollback of a chart to a previous version without running a CI/CD pipeline again

You can find a list of public curated charts in the default [Helm repository](https://github.com/helm/charts/tree/master/stable).

Several third part tools support Helm chart creation such as [Draft](https://draft.sh/). Local Helm development
is also supported with [garden.io](https://docs.garden.io/using-garden/using-helm-charts) and/or [skaffold](https://skaffold.dev/docs/how-tos/deployers/#deploying-with-helm). Check your favorite tool for native Helm support.

Codefresh also has built-in support for Helm [packages]({{site.baseurl}}/docs/new-helm/helm-releases-management/), [deployments]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/), [repositories]({{site.baseurl}}/docs/new-helm/managed-helm-repository/) and [environments]({{site.baseurl}}/docs/new-helm/helm-environment-promotion/).

## Helm concepts

The [official docs](https://helm.sh/docs/using_helm/) do a good job of explaining the basic concepts. Some important points are shown in the table below:

Helm Concept|Description| Important point
---|--- | ---
Chart (unpackaged) | A folder with files that follow the Helm chart guidelines. | Can be deployed as is |
Chart (packaged) | A tar.gz package of the above | Can be deployed as is |
Chart name | Name of the package as defined in `Chart.yaml` | Part of package identification |
Templates | A set of Kubernetes manifests that form an application | Go templates can be used |
Values | Settings that can be parameterized in Kubernetes manifests | Used for templating of manifests |
Chart version | The version of the package/chart | Part of package identification |
App version | The version of the application contained in the chart | **Independent from chart version** |
Release | A deployed package in a Kubernetes cluster | **Multiple releases of the same chart can be active**|
Release name | An arbitrary name given to the release | **Independent from name of chart** |
Release Revision | A number that gets incremented each time an application is deployed/upgraded | **Unrelated to chart version**|
Repository | A file structure (HTTP server) with packages and an `index.yaml` file | Helm charts can be deployed **without** being in a repository first |
Installing | Creating a brand new release from a Helm chart (either unpackaged, packaged or from a repo) | |
Upgrading | Changing an existing release in a cluster | Can upgrade to any version (even the same) | 
Rolling back | Going back to a previous revision of a release | Helm handles the rollback, no need to re-rerun pipeline |
Pushing | Storing a Helm package on a repository | Chart will be automatically packaged | 
Fetching | Downloading a Helm package from a repository to the local filesystem | |

## Common Helm misconceptions

Any new technology requires training on how to use effectively. If you have already worked with any type of package manager you should be familiar with how Helm works. 

Here is a list of important Helm points that are often controversial between teams.

### Helm repositories are optional

Using Helm repositories is a recommended practice, but completely optional. You can deploy a Helm chart to a Kubernetes cluster directly from the filesystem. The [quick start guide]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/) actually shows this scenario.

Helm can install a chart either in the package (`.tgz`) or unpackaged form (tree of files) to a Kubernetes cluster right away. Thus the most minimal Helm pipeline has only two steps:

1. Checkout from git a Helm chart described in uncompressed files
1. Install this chart to a Kubernetes cluster

You will see in the next section more efficient workflows, but the fact remains that Helm repositories are optional. There is  **no** technical requirement that a Helm chart must be uploaded to a Helm repository before being deployed to a cluster.

### Chart versions and appVersions

Each Helm chart has the ability to define two separate versions:

1. The version of the chart itself (`version` field in `Chart.yaml`)
1. The version of the application contained in the chart (`appVersion` field in `Chart.yaml`)

These are unrelated and can be bumped up in any manner that you see fit. You can sync them together, or have them increase independently. There is no right or wrong practice here as long as you stick into one. We will see some versioning strategies in the next section.

### Charts and sub-charts

The most basic way to use Helm is by having a single chart that holds your application. The single chart will contain all resources needed by your application such as deployments, services, config-maps etc.

However, you can also create a chart with dependencies to other charts (a.k.a. umbrella chart) which are completely external using the `requirements.yaml` file. Using this strategy is optional and can work well in several organizations. Again, there is no definitive answer on right and wrong here, it depends on your team process.

IMAGE here.

We will see some scenarios in the next sections on why you would want to use umbrella charts.


### Helm vs K8s templates

Helm is a package manager that also happens to include templating capabilities. Unfortunately a lot of people focus only on the usage of Helm as a template manager and nothing else.

Technically Helm can be used as only a templating engine by stopping the deployment process in the manifest level. It is perfectly possible to use Helm only to create plain Kubernetes manifests and then install them on the cluster using the standard methods (such as `kubectl`). But then you miss all the advantages of Helm (especially the application registry aspect).

At the time of writing Helm is the only package manager for Kubernetes, so if you want a way to group your manifests and a registry of your running applications, there are no off-the-shelf alternative apart from Helm.

Here is table that higlights the comparison:

Helm Feature|Alternative| 
---|--- 
Templating | Kustomize, k8comp, kdeploy, ktmpl, kuku, jinja, sed, awk, etc.
Manifest grouping (entity/package) | None
Application/package dependencies | None
Runtime view of cluster packages | None
Registry of applications | None
Direct rollbacks and Upgrades  | None




## Helm pipelines

With the basics out of the way we can now see some typical Helm usage patterns. Depending on the size of your company and your level of involvement with Helm you need to decide which practice is best for you.


### Deploy from unpackaged chart

### Deploy and package/push

### Double push and Rollback

### Separate Helm pipelines 

## Helm packaging strategies

### Simple 1-1 versioning

### Chart versus application versioning

### Umbrella charts

## Helm promotion strategies

### Single repository with multiple environments

### Chart promotion between environments

### Chart promotion between repositories and environments
