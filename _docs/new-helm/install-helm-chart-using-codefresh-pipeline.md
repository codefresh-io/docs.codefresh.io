---
title: "Using Helm in Codefresh pipeline"
description: ""
group: new-helm
redirect_from:
  - /docs/install-helm-chart-using-codefresh-pipeline/
toc: true
---

We have created a special Helm step for easy integration of Helm in Codefresh pipelines. The Helm step facilitates authentication, configuration and execution of Helm commands.

> You can always use the regular `helm` cli in a freestyle step, in case you have a special use case. In this case, you can use the simpler container `codefresh/kube-helm` which includes only the kubectl and helm tools. kube-helm is available on DockerHub: [https://hub.docker.com/r/codefresh/kube-helm/](https://hub.docker.com/r/codefresh/kube-helm/)

## Usage

Add a Freestyle step, with the `codefresh/cfstep-helm` image.  
The Helm step is configured using environment variables, which can be provided in any of the various ways supported by Codefresh as described [here](https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables).  
For example, here's how to provide variables as part of the freestyle step definition:

```yaml
Helm Upgrade:
    image: 'codefresh/cfstep-helm:2.9.0'
    environment:
      - key=value
``` 

(the Docker image tag refers to the version of Helm you need)

## Operation modes

The Helm step can operate in one of 3 modes:

1. Install - will install the chart into a Kubernetes cluster. This is the default mode if not explicitly set.
2. Push - will package chart and push it to the repository.
3. Authentication only - will only setup authentication, and add the repo to the helm. This is useful if you want to write your own helm commands using the freestyle step's `commands` property, but you still want the step to handle authentication.

The operation mode is set by the `ACTION` variable, where the value is `install`/`auth`/`push`.

## Helm Repository Configuration

You should configure a Helm repository for the step to work with. Besides public HTTP repositories, we support a variety of private, authenticated Helm repositories. Codefresh also provide a free, managed Helm repository for every account.

First, you'll need to connect your repository with Codefresh as described [here](https://codefresh.io/docs/docs/new-helm/add-helm-repository/), or obtain your managed Helm repository URL as described [here](https://codefresh.io/docs/docs/new-helm/managed-helm-repository/#chart-repository-url).

Once you have a Helm repository connected, attach it to the pipeline by selecting it in the pipeline editing page, under "Environment Variables" -> "Import from shared configuration".

## Kubernetes Configuration

You can configure a Kubernetes cluster to deploy to using the `KUBE_CONTEXT` variable.

First, you'll need to connect your Kubernetes cluster with Codefresh as described [here](https://codefresh.io/docs/docs/deploy-to-kubernetes/adding-non-gke-kubernetes-cluster/). Once you have a Kubernetes cluster connected, provide it to the Helm step by adding the `KUBE-CONTEXT` variable, where the value is the connection *name* that you've entered when creating the connection. The connection name also appears as the title of the cluster in Kubernetes integration settings (Account Settings -> Integration -> Kubernetes).

## Helm Values

To supply value file, add an environment variable with the name prefix of `VALUESFILE_`, and the value should point to an existing values file.  
To override specific values, add an environment variable with the name prefix of `VALUE_` followed by the path to the value to set. For example `VALUE_myservice_imageTag`. Note that `.` (dot) should be replaced with `_` (underscore). The value of the variable will be used to override or set the templated property.

Examples:
```text
CUSTOM_myimage_pullPolicy=Always
results in:
--set myimage.pullPolicy=Always

CUSTOMFILE_prod='values-prod.yaml'
results in:
--values values-prod.yaml
```

If a variable contains a `_` (underscore) in it's name, replace it character with `__` (double underscore).

## Examples

### Example: Installing a Chart

The following example demonstrates the minimum configuration for installing a chart from a repository. For more configuration options, see the [Configuration reference](#configuration).  

```yaml
deploy:
  image: codefresh/cfstep-helm:2.9.0
  environment:
    - CHART_REF=mychart
    - RELEASE_NAME=mychart-prod
    - KUBE_CONTEXT=kube-prod
```

Notes:
- Helm repository connection was attached to the pipeline
- mychart is a chart that exists in the connected repository
- no ACTION is provided, meaning `install` by default

### Example: Pushing a Chart

The following example demonstrates packaging and pushing a chart into a repository.

```yaml
push:
  image: codefresh/cfstep-helm:2.9.0
  environment:
    - ACTION=push
    - CHART_REF=mychart
```

Notes:
- Helm repository connection was attached to the pipeline
- assuming a git repository with the Helm chart files
- the repo container the chart files under `mychart` directory

### Example: Authenticating only

The following example demonstrates executing custom commands.

```yaml
helm:
  image: codefresh/cfstep-helm:2.9.0
  environment:
    - ACTION=auth
  commands:
    - source /opt/bin/release_chart
    - helm fetch $CHART_REF --repo $CF_CTX_myrepo_URL --untar
```

Notes:
- Helm repository connection was attached to the pipeline
- The attached repo will be added to helm cli under the name `repo`.
- The attached repo URL will be available as a variable called `CF_CTX_<reponame>_URL` (where `<reponame>` is the name of the repo).
- The credentials used to setup the repo will be available in the container under the name they were provided when you connected the repo.

## Configuration

Name|Required|Description
---|---|---
ACTION|defaults to 'install'|operation mode: `install`/`push`/`auth`
CHART_REF|required for install/push|Chart reference to use, adhering to Helm's lookup rules (path to chart folder, or name of packaged chart). There's no need to prefix with `/reponame` if referencing a chart in a repository, this is handled automatically. a.k.a CHART_NAME but CHART_NAME shouldn't be used anymore.
KUBE_CONTEXT|required for install|Kubernetes context to use. The name of the cluster as configured in Codefresh
RELEASE_NAME|required for install|Helm release name. If the release exists it will be upgraded
NAMESPACE|optional|target Kubernetes namespace to deploy to
TILLER_NAMESPACE|optional|Kubernetes namespace where tiller is installed
CHART_VERSION|optional|override or set the chart version
CHART_REPO_URL|optional|Helm chart repository URL. If a Helm repository context is attached to the pipeline, this setting is ignored
VALUESFILE_|optional|Values file to provide to Helm (as --file). a.k.a CUSTOMFILE but CUSTOMFILE should be used anymore.
VALUE_|optional|Value to provide to Helm (as --set). a.k.a CUSTOM but CUSTOM shouldn't be used anymore.
CMD_PS|optional|Command Postscript - this will be appended as is to the generated helm command string. Can be used to set additional parameters supported by the command but not exposed as configuration options.