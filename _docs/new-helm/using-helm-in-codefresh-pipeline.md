---
title: "Using Helm in a Codefresh pipeline"
description: "Deploying and pushing Helm charts with Codefresh"
group: new-helm
redirect_from:
  - /docs/new-helm/create-helm-artifacts-using-codefresh-pipeline/
  - /docs/install-helm-chart-using-codefresh-pipeline/  
toc: true
---

We have created a special Helm step for easy integration of Helm in Codefresh pipelines. The Helm step facilitates authentication, configuration and execution of Helm commands.

> You can always use the regular `helm` cli in a freestyle step, if you have a special use case that is not covered by the Codefresh Helm step. In this case, you can use the simpler container `codefresh/kube-helm` which includes only the Kubectl and helm tools. kube-helm is available on DockerHub: [https://hub.docker.com/r/codefresh/kube-helm/](https://hub.docker.com/r/codefresh/kube-helm/).

If you are just starting using Helm please also consult the [Helm quick start guide]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/).

## Helm setup

In order to use Helm in your Codefresh pipeline you must do the following

1. Create a Helm package for your application
1. Add a Kubernetes cluster enabled with Helm/Tiller
1. Define a Helm repository or use the one offered by Codefresh to all accounts
1. Import the Helm configuration in your pipeline variables
1. Use the `codefresh/cfstep-helm` in your [yml build definition]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/).

Let's see these steps in order

### Step 1 - Create a Helm chart for your application

Helm applications are bundled in special archives called *Charts*. You can create a Helm
chart for your application by following [the official documentation on charts](https://helm.sh/docs/developing_charts/).

The example Codefresh application also comes with a [sample chart](https://github.com/codefresh-contrib/python-flask-sample-app/tree/with-helm/charts/python) that is used in the [Helm quick start guide]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/).

You can create the chart manually or by using the [helm create](https://helm.sh/docs/helm/#helm-create) command on your workstation. There are also several third part tools that can create Helm packages for you such as [Draft](https://draft.sh/).

Once you have your Helm chart ready, commit it to the same git repository that contains the source code of your application. It should be in a folder called `charts`. Codefresh can also work with Helm charts that are in different Git repositories. We suggest however that you keep both the source code and the Helm chart of an application in the same git repository as this makes chart management much easier.


### Step 2 - Kubernetes Configuration

You can configure a Kubernetes cluster to deploy using the `KUBE_CONTEXT` variable.

First, you'll need to connect your Kubernetes cluster with Codefresh as described [here]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/). Once you have a Kubernetes cluster connected, provide it to the Helm step by adding the `KUBE_CONTEXT` variable, where the value is the connection *name* that you've entered when creating the connection. The connection name also appears as the title of the cluster in Kubernetes integration settings (from the left sidebar go to Integrations -> Kubernetes).

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/k8s-name.png" 
url="/images/kubernetes-helm/k8s-name.png" 
alt="Name of Kubernetes cluster"
caption="Name of Kubernetes cluster" 
max-width="70%" 
%}

Make sure also that your Kubernetes cluster has the server part of Helm installed (called Tiller).
The easiest way to do that is to run `helm init` from the command shell of your cloud provider or
any other terminal that has access to your cluster via `kubectl`.

To verify that your cluster is setup for Helm select the *Helm Releases* item from the left sidebar in the Codefresh UI. You should see the Helm releases in your cluster or an empty screen if you just started using Helm. 

### Step 3 - Define a Helm repository

You should configure a Helm repository for the step to work with. Besides public HTTP repositories, we support a variety of private, authenticated Helm repositories. Codefresh also provides a free, managed Helm repository for every account.

You will need to connect your repository with Codefresh as described [here]({{site.baseurl}}/docs/new-helm/add-helm-repository/), or obtain your managed Helm repository URL as described [here]({{site.baseurl}}/docs/new-helm/managed-helm-repository/#chart-repository-url).


### Step 4 - Import the Helm Configuration in your pipeline definition

Once you have a Helm repository connected, attach it to the pipeline by selecting it in the pipeline editing page, under "Environment Variables" -> "Import from shared configuration".

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/connect-helm-repo.png" 
url="/images/kubernetes-helm/connect-helm-repo.png" 
alt="Connecting a Helm repository in the pipeline"
caption="Connecting a Helm repository in the pipeline" 
max-width="70%" 
%}

This concludes the Helm setup for Codefresh. Now you can use the Helm freestyle step in the pipeline `codefresh.yml` file.

Note that this step is only needed in pipelines that actually upload/fetch Helm charts from/to Helm repositories. If you have a pipeline that directly installs a Helm chart from the git filesystem, there is no need to import a Helm configuration.

>Currently only one Helm configuration can be used in the same pipeline. We are aware
of this limitation and will soon improve the way Codefresh works with multiple Helm configurations.


## Helm Usage

Add a Freestyle step, with the `codefresh/cfstep-helm` image.  
The Helm step is configured using environment variables, which can be provided in any of the various ways supported by Codefresh as described [here]({{site.baseurl}}/docs/codefresh-yaml/variables/#user-provided-variables).  
For example, here's how to provide variables as part of the freestyle step definition:

```yaml
Helm Upgrade:
    image: 'codefresh/cfstep-helm:2.9.0'
    environment:
      - key=value
``` 

(the Docker image tag refers to the version of Helm you need)

### Operation modes

The Helm step can operate in one of 3 modes:

1. Install - will install the chart into a Kubernetes cluster. This is the default mode if not explicitly set.
2. Push - will package chart and push it to the repository.
3. Authentication only - will only setup authentication and add the repo to the helm. This is useful if you want to write your own helm commands using the freestyle step's `commands` property, but you still want the step to handle authentication.

The operation mode is set by the `ACTION` variable, where the value is `install`/`auth`/`push`.

### Helm Values

To supply value file, add an environment variable with the name prefix of `VALUESFILE_`, and the value should point to an existing values file.  
To override specific values, add an environment variable with the name prefix of `VALUE_` followed by the path to the value to set. For example, `VALUE_myservice_imageTag`. Note that `.` (dot) should be replaced with `_` (underscore). The value of the variable will be used to override or set the templated property.

Examples:
```text
VALUE_myimage_pullPolicy=Always
results in:
--set myimage.pullPolicy=Always

VALUESFILE_prod='values-prod.yaml'
results in:
--values values-prod.yaml
```

If a variable already contains a `_` (underscore) in its name, replace it with `__` (double underscore).

## Examples

All three modes of Helm usage are demonstrated below

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
- Helm repository connection was attached to the pipeline (see step 4 above)
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
- Helm repository connection was attached to the pipeline (see step 3 above)
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
- Helm repository connection was attached to the pipeline (see step 3 above)
- The attached repo will be added to helm cli under the name `repo`.
- The attached repo URL will be available as a variable called `CF_CTX_<reponame>_URL` (where `<reponame>` is the name of the repo).
- The credentials used to setup the repo will be available in the container under the name they were provided when you connected the repo.

### Example: Custom Helm Commands

The following example demonstrates executing custom commands.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
helm:
  image: codefresh/cfstep-helm:2.9.0
  commands:
    - export HELM_REPO_ACCESS_TOKEN=${{CF_API_KEY}}
    - export HELM_REPO_AUTH_HEADER=Authorization
    - helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
    - helm repo add myrepo ${{CF_CTX_CF_HELM_DEFAULT_URL}}
    - helm push chart-example/ myrepo
{% endraw %}
{% endhighlight %}

Notes:
- The directory that contains a chart MUST have the same name as the chart. Thus, a chart named `my-chart` MUST be created in a directory called `my-chart/`. This is a requirement of the [Helm Chart format](https://docs.helm.sh/developing_charts).

## Configuration

Name|Required|Description
---|---|---
ACTION|defaults to 'install'|Operation mode: `install`/`push`/`auth`
CHART_REF|required for install/push|Chart reference to use, adhering to Helm's lookup rules (path to chart folder, or name of packaged chart). There's no need to prefix with `/reponame` if referencing a chart in a repository, this is handled automatically. a.k.a `CHART_NAME` but `CHART_NAME` shouldn't be used anymore.
KUBE_CONTEXT|required for install|Kubernetes context to use. The name of the cluster as [configured in Codefresh]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
RELEASE_NAME|required for install|Helm release name. If the release exists, it will be upgraded
NAMESPACE|optional|Target Kubernetes namespace to deploy to
TILLER_NAMESPACE|optional|Kubernetes namespace where Tiller is installed
CHART_VERSION|optional|Override or set the chart version
CHART_REPO_URL|optional|Helm chart repository URL. If a [Helm repository configuration](#step-3---import-the-helm-configuration-in-your-pipeline-definition) is attached to the pipeline, this setting is ignored
VALUESFILE_|optional|Values file to provide to Helm (as --file). a.k.a `CUSTOMFILE` but `CUSTOMFILE` shouldn't be used anymore.
VALUE_|optional|Value to provide to Helm (as --set). a.k.a `CUSTOM` but `CUSTOM` shouldn't be used anymore. If a variable already contains a `_` (underscore) in it's name, replace it with `__` (double underscore).
CMD_PS|optional|Command Postscript - this will be appended as is to the generated helm command string. Can be used to set additional parameters supported by the command but not exposed as configuration options.

## Full Helm pipeline example

This pipeline builds a docker image, runs unit tests, stores the Helm chart in the Codefresh private Helm repository and finally deploys the Helm chart to a cluster. 

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/full-helm-pipeline.png" 
url="/images/kubernetes-helm/full-helm-pipeline.png" 
alt="Helm pipeline"
caption="Helm pipeline" 
max-width="90%" 
%}

This is the pipeline definition:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
stages:
  - build
  - test
  - deploy
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'codefresh-contrib/python-flask-sampleapp'
    revision: with-helm
    git: github  
  MyAppDockerImage:
    title: Building Docker Image
    stage: build
    type: build
    image_name: kostis-codefresh/python-flask-sampleapp
    working_directory: ./
    tag: '${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
    dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    stage: test
    image: ${{MyAppDockerImage}}
    commands: 
      - python setup.py test   
  StoreChart:
    title: Storing Helm chart
    stage: deploy
    image: 'codefresh/cfstep-helm:2.9.1'
    environment:
      - ACTION=push
      - CHART_REF=charts/python    
  DeployMyChart:
    image: 'codefresh/cfstep-helm:2.9.1'
    title: Deploying Helm chart
    stage: deploy
    environment:
      - CHART_REF=charts/python
      - RELEASE_NAME=mypython-chart-prod
      - KUBE_CONTEXT=kostis-demo@FirstKubernetes 
      - VALUE_image_pullPolicy=Always
      - VALUE_image_tag='${{CF_BRANCH_TAG_NORMALIZED}}-${{CF_SHORT_REVISION}}'
{% endraw %}
{% endhighlight %}

You can see the source code in our [example section]({{site.baseurl}}/docs/yaml-examples/examples/helm/).


## What to read next

* [Helm pipeline example]({{site.baseurl}}/docs/yaml-examples/examples/helm/)
* [Helm Charts and repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
* [Codefresh Managed Helm Repositories]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
* [Helm Promotion boards]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)
