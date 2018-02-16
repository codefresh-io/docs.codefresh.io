---
layout: docs
title: "Install HELM chart using Codefresh pipeline"
description: ""
group: new-helm
redirect_from:
  - /docs/instal-helm-chart-using-codefresh-pipeline
  - /docs/install-helm-chart-using-codefresh-pipeline/
toc: true
---

# Prerequisites
Make sure the you have the following before you start deploying with HELM:
* Kubernetes Cluster - [Learn how to add Kubernetes cluster using our Kubernetes Integration](https://docs.codefresh.io/v1.0/docs/adding-non-gke-kubernetes-cluster)
* HELM Chart associated with your application

# Overriding Helm Variables

To supply value file, add an environment variable with the name prefix of `CUSTOMFILE_` (case *in*sensitive), and the value should point to an existing values file.
To override specific values, add an environment variable with the name prefix of `CUSTOM_` (case *in*sensitive), and replace any `.` characters in the name with `_`. The value should be the value for the variable.

Examples:
```text
CUSTOM_myimage_pullPolicy=Always
# Codefresh Helm plugin will add option below to the 'helm update --install' command
--set myimage.pullPolicy=Always

CUSTOMFILE_prod='values-prod.yaml'
# Codefresh Helm plugin will add option below to the 'helm update --install' command
--values values-prod.yaml
```

If a variable contains a `_`, replace the `_` character with `__`.

```text
custom_env_open_STORAGE__AMAZON__BUCKET=my-s3-bucket
# translates to ...
--set env.open.STORAGE_AMAZON_BUCKET=my-s3-bucket
```


# Environment Variables

| Variables      | Required | Default | Description                                                                             |
|----------------|----------|---------|-----------------------------------------------------------------------------------------|
| CHART_NAME     | YES      |         | Helm chart name                                                                         |
| RELEASE_NAME   | YES      |         | Helm release name                                                                       |
| KUBE_CONTEXT   | YES      |         | Kubernetes context to use (Custom Cluster Name in Codefresh)                            |
| NAMESPACE      | NO       |         | Target Kubernetes namespace                                                             |
| CHART_VERSION  | NO       |         | Helm chart version to install                                                           |
| CHART_REPO_URL | NO       |         | Helm chart repository URL (Required unless code repository contains Helm chart)         |
| DRY_RUN        | NO       |         | Do a "dry run" installation (do not install anything, useful for Debug)                 |
| DEBUG          | NO       |         | Print verbose install output                                                            |
| WAIT           | NO       |         | Block step execution till installation completed and all Kubernetes resources are ready |
| TIMEOUT        | NO       | 5 Min   | Wait Timeout                                                                            |


# Kubernetes Configuration

Add Kubernetes integration to Codefresh: `> Account Settings > Integration > Kubernetes`. From now on, you can use added Kubernetes cluster in Codefresh pipeline, addressing its context by the name you see in `Clusters` menu.

# Example

Set required and optional environment variable and add the following step to your Codefresh pipeline:

Example Variables:

The example below will run `helm upgrade` using Helm chart with the name `mychart` located in `https://helmrepo.codefresh.io/codefresh/helm` Helm chart repository using the `myrelease` Helm release name against `mycluster` Kubernetes cluster in the `mynamespace` Kubernetes Namespace.

```text
CHART_NAME=mychart
RELEASE_NAME=myrelease
KUBE_CONTEXT=mycluster
NAMESPACE=mynamespace
CHART_REPO_URL=https://helmrepo.codefresh.io/codefresh/helm
```

```yaml
---
version: '1.0'

steps:

  ...

  Helm Upgrade:
    title: Helm Upgrade
    image: 'codefresh/plugin-helm:2.8.0'
    environment:
      - CHART_NAME=${{CHART_NAME}}
      - RELEASE_NAME=${{RELEASE_NAME}}
      - KUBE_CONTEXT=${{KUBE_CONTEXT}}
      - NAMESPACE=${{NAMESPACE}}
      - DEBUG_CHART=${{DEBUG_CHART}}
      - CHART_REPO_URL=${{CHART_REPO_URL}}

  ...

```
