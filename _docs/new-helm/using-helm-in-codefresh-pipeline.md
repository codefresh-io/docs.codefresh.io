---
title: "Using Helm in a Codefresh pipeline"
description: "Deploying and pushing Helm charts with Codefresh"
group: new-helm
redirect_from:
  - /docs/new-helm/create-helm-artifacts-using-codefresh-pipeline/
  - /docs/install-helm-chart-using-codefresh-pipeline/  
toc: true
---

We have created a [special Helm step](https://codefresh.io/steps/step/helm)  for easy integration of Helm in Codefresh pipelines. The Helm step facilitates authentication, configuration and execution of Helm commands.

> You can always use the regular `helm` cli in a freestyle step, if you have a special use case that is not covered by the Codefresh Helm step. In this case, you can use the simpler container `codefresh/kube-helm` which includes only the Kubectl and helm tools. kube-helm is available on DockerHub: [https://hub.docker.com/r/codefresh/kube-helm/](https://hub.docker.com/r/codefresh/kube-helm/).

If you are just starting using Helm please also consult the [Helm quick start guide]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/). Also if you prefer to work directly with code see our [full Helm example]({{site.baseurl}}/docs/yaml-examples/examples/helm/).

## Helm setup

In order to use Helm in your Codefresh pipeline you must do the following:

1. Make sure that your application has a [Helm chart](https://helm.sh/docs/chart_template_guide/getting_started/)
1. Create a Helm package for your application from the chart
1. [Add a Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) in Codefresh (enabled with Helm/Tiller if you still use Helm 2)
1. Define a Helm repository or use the [one offered by Codefresh to all accounts]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
1. Import the Helm [configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/) in your pipeline variables
1. Use the Helm step in your [yml build definition]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)

Let's see these steps in order.

### Step 1 - Create a Helm chart for your application

Helm applications are bundled in special archives called *Charts*. You can create a Helm
chart for your application by following [the official documentation on charts](https://helm.sh/docs/chart_template_guide/getting_started/).

The example Codefresh application also comes with a [sample chart](https://github.com/codefresh-contrib/python-flask-sample-app/tree/with-helm/charts/python) that is used in the [Helm quick start guide]({{site.baseurl}}/docs/getting-started/helm-quick-start-guide/).

You can create the chart manually or by using the [helm create](https://helm.sh/docs/helm/#helm-create) command on your workstation. There are also several third party tools that can create Helm packages for you such as [Draft](https://draft.sh/).

Once you have your Helm chart ready, commit it to the same git repository that contains the source code of your application. It should be in a folder called `charts`. Codefresh can also work with Helm charts that are in different Git repositories. We suggest however that you keep both the source code and the Helm chart of an application in the same git repository as this makes chart management much easier.


### Step 2 - Kubernetes Configuration

The Helm pipeline step requires the configuration of a `kube_context` variable that decides which Kubernetes cluster will be used for the deployment.

First, you'll need to connect your Kubernetes cluster with Codefresh as described [here]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/). Once you have a Kubernetes cluster connected, provide it to the Helm step by adding the `KUBE_CONTEXT` variable, where the value is the connection *name* that you've entered when creating the connection. The connection name also appears as the title of the cluster in Kubernetes integration settings (from the left sidebar go to Integrations -> Kubernetes).

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/k8s-name.png" 
url="/images/kubernetes-helm/k8s-name.png" 
alt="Name of Kubernetes cluster"
caption="Name of Kubernetes cluster" 
max-width="70%" 
%}


To verify that your cluster is setup for Helm select the *Helm Releases* item from the left sidebar in the Codefresh UI. You should see the [Helm releases]({{site.baseurl}}/docs/new-helm/helm-releases-management/) in your cluster or an empty screen if you just started using Helm. 

### Step 3 - Define a Helm repository

If you also wish to push your chart to a Helm repository (which is always a good practice)
you should configure a Helm repository for the step to work with. Besides public HTTP repositories, we support a variety of private, authenticated Helm repositories. Codefresh also provides a free, managed Helm repository for every account.

You will need to connect your repository with Codefresh as described [here]({{site.baseurl}}/docs/new-helm/add-helm-repository/), or obtain your managed Helm repository URL as described [here]({{site.baseurl}}/docs/new-helm/managed-helm-repository/#chart-repository-url).


### Step 4 (optional) - Import Helm configuration(s) into your pipeline definition

Once you have Helm repositories connected to Codefresh, you can import one or more of them into the pipeline. This step is needed in pipelines that actually upload/fetch Helm charts from/to Helm repositories. If you have a pipeline that directly installs a Helm chart from the Git filesystem, there is no need to import a Helm configuration.

1. Click the **Variables** tab on the right sidebar, and then click the **Settings** (gear) icon.  
1. Click **Import from shared configuration**, and select the Helm context or contexts to import into the pipeline:  
  * To import a single context, which is the general requirement, select the `CF_HELM_DEFAULT`[shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/).
  * To import multiple contexts, select each context to import.  

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/import-helm-configuration.png" 
url="/images/kubernetes-helm/import-helm-configuration.png" 
alt="Connecting a Helm repository in the pipeline"
caption="Connecting a Helm repository in the pipeline" 
max-width="50%" 
%}

> You can also click on *Add shared configuration* directly from the three dots menu for the same functionality.

This concludes the Helm setup for Codefresh. Now you can use the Helm freestyle step in the pipeline `codefresh.yml` file.



## Helm usage in a pipeline step

You can use the `helm` typed step from the [Step Marketplace](https://codefresh.io/steps/step/helm).

The Helm step can be configured using environment variables, which can be provided in any of the various ways supported by Codefresh as described [here]({{site.baseurl}}/docs/codefresh-yaml/variables/#user-provided-variables).  

For example, here's how to provide variables as part of the helm step definition:

```yaml
deploy:
  type: helm
  arguments:
    action: install
    chart_name: test_chart
    release_name: first
    helm_version: 3.0.3
    kube_context: my-kubernetes-context
    custom_values:
      - 'pat.arr="{one,two,three}"'
      - 'STR_WITH_COMAS="one\,two\,three"'
``` 

<!---For Helm 2, the Docker image tag refers to the version of Helm/Tiller you need. For Helm 3, just use the [newest Helm 3 image tag](https://hub.docker.com/r/codefresh/cfstep-helm/tags).  -->

### Action modes

The Helm step can operate in one of three modes:

1. install: Installs the Helm chart into a Kubernetes cluster. This is the default mode, if a mode is not explicitly set.
1. push: Packages the Helm chart and pushes it to the repository.
1. authentication only: Only sets up authentication and adds the repo to the helm. This is useful if you want to write your own helm commands using the freestyle step's `commands` property, but you still want the step to handle authentication.

The operation mode is set by the `action` field, where the value can be `install`/`push`/`auth`.

If you have imported multiple Helm contexts into the same pipeline, for the `install` and `push` actions you need to define the primary Helm context to use through the `primary_helm_context` argument.  
For the `auth` action, if the chart has dependencies on other repos, then to authenticate the referenced repos, you need to add  `use_repos_for_auth_action: 'true'`.  
For a description of these and other arguments, see [Configuration](#configuration).


### Helm Values

To supply value file, add to the Helm step, `custom_values_file` and the value should point to an existing values file.  
To override specific values, add to the Helm step, `custom_values` followed by the path to the value to set. For example, `myservice_imageTag`. Note that `.` (dot) should be replaced with `_` (underscore). The value of the variable will be used to override or set the templated property.

Examples:
```yaml
...
    custom_values:
      - 'myimage_pullPolicy=Always'
...
```
results in:
`--set myimage.pullPolicy=Always`

```yaml
...
    custom_value_files: 
    - 'values-prod.yaml'
...
```
results in:
`--values values-prod.yaml`

If a variable already contains a `_` (underscore) in its name, replace it with `__` (double underscore).

## Examples

All three modes of Helm usage are demonstrated in the following sections.

You can also look at the [GitHub repository](https://github.com/codefresh-contrib/helm-sample-app) of [our Helm example]({{site.baseurl}}/docs/yaml-examples/examples/helm/) for full pipelines:

* Pipeline YAML for [deploying a chart](https://github.com/codefresh-contrib/helm-sample-app/blob/master/codefresh-do-not-store.yml)
* Pipeline YAML for [both storing and deploying a chart](https://github.com/codefresh-contrib/helm-sample-app/blob/master/codefresh.yml)

### Example: Installing a Chart

The following example demonstrates the minimum configuration for installing a chart from a repository. For more configuration options, see the [Arguments reference](https://codefresh.io/steps/step/helm).  

```yaml
deploy:
  type: helm
  arguments:
    action: install
    chart_name: path/to/charts
    release_name: first
    helm_version: 3.0.3
    kube_context: my-kubernetes-context
```

### Example: Pushing a Chart

The following example demonstrates packaging and pushing a chart into a repository.

```yaml
deploy:
  type: helm
  arguments:
    action: push
    chart_name: /codefresh/volume/repo/chart
    chart_repo_url: 'cm://h.cfcr.io/useraccount/default'
```

Notes:
- Assuming a git repository with the Helm chart files was cloned as a part of the pipeline.
- The Git repository contains the chart files under the `chart` directory.
- `chart_repo_url` is optional. If a [Helm repository configuration](#step-4-optional---import-the-helm-configuration-in-your-pipeline-definition) is attached to the pipeline, this setting is ignored.

### Example: Authenticating only

The following example demonstrates executing custom commands.

```yaml
deploy:
  type: helm
  arguments:
    action: auth
    kube_context: my-kubernetes-context
    commands:
      - helm list
```

### Example: Custom Helm Commands

The following example demonstrates executing custom commands.

`codefresh.yml`
{% highlight yaml %}
{% raw %}
my_custom_helm_command:
  type: helm
  arguments:
    action: auth
    kube_context: my-kubernetes-context
    commands:
      - source /opt/bin/release_chart
      - helm repo add incubator https://kubernetes-charts-incubator.storage.googleapis.com/
      - helm repo add stable https://kubernetes-charts.storage.googleapis.com
      - helm repo list
      - helm repo update
      - helm list
{% endraw %}
{% endhighlight %}

Notes:
- The directory that contains a chart MUST have the same name as the chart. Thus, a chart named `my-chart` MUST be created in a directory called `my-chart/`. This is a requirement of the [Helm Chart format](https://helm.sh/docs/chart_template_guide/).

## Configuration

Name|Required|Description
---|---|---
action|defaults to `install'|Operation mode: `install`/`push`/`auth`
chart_name|required for install/push|Chart reference to use, adhering to Helm's lookup rules (path to chart folder, or name of packaged chart). There's no need to prefix with `/reponame` if referencing a chart in a repository, this is handled automatically. a.k.a `CHART_NAME` but `CHART_NAME` shouldn't be used anymore.
chart_repo_url|optional|Helm chart repository URL. If a [Helm repository configuration](#step-4-optional---import-the-helm-configuration-in-your-pipeline-definition) is attached to the pipeline, this setting is ignored
chart_subdir |optional | The subfolder where the chart is located in the JFrog Artifactory Helm repository.
chart_version|optional|Override or set the chart version
cmd_ps|optional|Command Postscript - this will be appended as is to the generated helm command string. Can be used to set additional parameters supported by the command but not exposed as configuration options.
commands|optional|commands to execute in plugin after auth action
credentials_in_arguments | optional | The username and password credentials to add to the Helm command as arguments. If not added to the Helm command, the credentials are passed in the URL `http(s)://username:password@url`. Should be enabled for JFrog Artifactory Helm repositories.
custom_value_files|optional|values file to provide to Helm as --values or -f
custom_values|optional|values to provide to Helm as --set
helm_repository_context | The name of the Helm repository integration configured in Codefresh.
helm_version|optional|version of [cfstep-helm image](https://hub.docker.com/r/codefresh/cfstep-helm/tags)
kube_context|required for install|Kubernetes context to use. The name of the cluster as [configured in Codefresh]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/)
namespace|optional|Target Kubernetes namespace to deploy to
primary_helm_context |required for `install` and `push` actions  |The Helm context to use for the Helm command when the pipeline has multiple Helm contexts. When omitted, the repo most recently added to the pipeline is used.
release_name|required for `install`|Helm release name. If the release exists, it will be upgraded
repos|optional|array of custom repositories
set_file | optional | Set values from the respective files specified by the command line in `key=value` format. To specify multiple key-value pairs, separate them with commas.
skip_cf_stable_helm_repo | optional | Don't add stable repository.
tiller_namespace|optional|Kubernetes namespace where Tiller is installed (unnecessary for Helm 3)
timeout | optional | The maximum time, in seconds, to wait for Kubernetes commands to complete.
use_debian_image | optional | Use Debian-based `cfstep-helm` image.
use_repos_for_auth_action |optional  | Required if the chart has dependencies on other repos that need to be authenticated. Set `true`.
wait |optional | When specified, waits until all pods are in state `ready` to mark the release as successful. Otherwise, release is marked as successful when the minimum number of pods are `ready` and the Services have IP addresses. 

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
  - checkout
  - build
  - test
steps:
  clone:
    title: Cloning main repository...
    stage: checkout
    type: git-clone
    arguments:
      repo: 'codefresh-contrib/python-flask-sample-app'
      revision: with-helm
      git: github  
  MyAppDockerImage:
    title: Building Docker Image
    stage: build
    type: build
    working_directory: '${{clone}}'
    arguments:
      image_name: kostis-codefresh/python-flask-sample-app
      tag: 'master'
      dockerfile: Dockerfile
  MyUnitTests:
    title: Running Unit tests
    stage: test
    type: freestyle
    working_directory: '${{clone}}'
    arguments:
      image: ${{MyAppDockerImage}}
      commands: 
        - python setup.py test
  StoreChart:
    title: Storing Helm Chart
    type: helm
    stage: store
    working_directory: ./python-flask-sample-app
    arguments:
      action: push
      chart_name: charts/python
      kube_context: kostis-demo@FirstKubernetes
  DeployMyChart:
      type: helm
      stage: deploy
      working_directory: ./python-flask-sample-app
      arguments:
        action: install
        chart_name: charts/python
        release_name: my-python-chart
        helm_version: 3.0.2
        kube_context: kostis-demo@FirstKubernetes
        custom_values:
          - 'buildID=${{CF_BUILD_ID}}'
          - 'image_pullPolicy=Always'
          - 'image_tag=master'
          - 'image_pullSecret=codefresh-generated-r.cfcr.io-cfcr-default'
{% endraw %}
{% endhighlight %}

You can see the source code in our [example section]({{site.baseurl}}/docs/yaml-examples/examples/helm/).


## What to read next

* [Helm pipeline example]({{site.baseurl}}/docs/yaml-examples/examples/helm/)
* [Helm Charts and repositories]({{site.baseurl}}/docs/new-helm/add-helm-repository/)
* [Codefresh Managed Helm Repositories]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)
* [Helm Promotion boards]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)
