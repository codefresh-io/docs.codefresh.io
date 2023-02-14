---
title: "Using Helm in a Codefresh pipeline"
description: "Deploy and push Helm charts with Codefresh"
group: deployments
sub_group: helm
redirect_from:
  - /docs/new-helm/using-helm-in-codefresh-pipeline/
  - /docs/deployments/helm/create-helm-artifacts-using-codefresh-pipeline/
  - /docs/install-helm-chart-using-codefresh-pipeline/  
toc: true
---

We created a [special Helm step](https://codefresh.io/steps/step/helm){:target="\_blank"} for easy integration of Helm in Codefresh pipelines. The Helm step facilitates authentication, configuration, and execution of Helm commands.

> If you have a special use case that is not covered by the Codefresh Helm step, you can always use the regular `helm` cli in a freestyle step.  
  In this case, you can use the simpler container `codefresh/kube-helm` which includes only Kubectl and helm tools. `kube-helm` is available on DockerHub: [https://hub.docker.com/r/codefresh/kube-helm/](https://hub.docker.com/r/codefresh/kube-helm/){:target="\_blank"}.

If you are just starting with Helm, refer to our [Helm quick start guide]({{site.baseurl}}/docs/quick-start/ci-quick-start/deploy-with-helm/) . And, if you prefer to work directly with code, see our [full Helm example]({{site.baseurl}}/docs/example-catalog/cd-examples/helm/).

## Helm setup

<!--the steps below do not correspond to the number of steps in the proc -->

To use Helm in your Codefresh pipeline you must do the following:

1. Make sure that your application has a [Helm chart](https://helm.sh/docs/chart_template_guide/getting_started/){:target="\_blank"}
1. Create a Helm package for your application from the chart
1. [Add a Kubernetes cluster]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster) in Codefresh
1. Define a Helm repository or use the [one offered by Codefresh to all accounts]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/)
1. Import the Helm [configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/) into your pipeline variables
1. Use the Helm step in your [Pipeline definitions YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)

Let's see these steps in order.

### Step 1: Create a Helm chart for your application

Helm applications are bundled in special archives called *Charts*. You can create a Helm
chart for your application by following [the official documentation on charts](https://helm.sh/docs/chart_template_guide/getting_started/){:target="\_blank"}.

The example Codefresh application includes a [sample chart](https://github.com/codefresh-contrib/python-flask-sample-app/tree/with-helm/charts/python){:target="\_blank"}, used in our Helm quick start guide, mentioned earlier in this article.

You can create the chart manually or by using the [helm create](https://helm.sh/docs/helm/#helm-create){:target="\_blank"} command on your workstation. There are also several third-party tools that can create Helm packages for you such as [Draft](https://draft.sh/){:target="\_blank"}.

Once your Helm chart is ready, commit it to a folder called `charts`, in the same Git repository that contains the source code of your application.  
Codefresh can also work with Helm charts that are in different Git repositories. We suggest however that you keep both the source code and the Helm chart of an application in the same Git repository to make chart management much easier.


### Step 2: Select Kubernetes cluster for deployment

The Helm pipeline step requires the configuration of a `kube_context` variable that determines the Kubernetes cluster used for the deployment.

1. [Connect your Kubernetes cluster with Codefresh]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster).  

1. Provide the cluster to the Helm step by adding the `KUBE_CONTEXT` variable, where the value is the connection *name* entered when you created the connection. 
> The connection name also appears as the title of the cluster in Kubernetes integration settings (Settings >Pipeline Integrations > Kubernetes).

{% include image.html 
lightbox="true" 
file="/images/deployments/helm/k8s-name.png" 
url="/images/deployments/helm/k8s-name.png" 
alt="Name of Kubernetes cluster"
caption="Name of Kubernetes cluster" 
max-width="70%" 
%}

{:start="3"}
1. Verify that your cluster is set up for Helm,  from the sidebar, below DevOps Insights, select **Helm Releases**. 
  The [Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/) in your cluster are displayed. If you have just started using Helm, the release page may be empty. 

### Step 3: Define a Helm repository

To push your chart to a Helm repository, configure the target repository to work with. 
Always a good practice to save Helm charts in Helm repositories, Codefresh supports a variety of private, authenticated Helm repositories
in addition to public HTTP repositories. Codefresh also provides a free, managed Helm repository for every account.

* Either [connect your repository with Codefresh]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/)  
OR  
* Obtain your [managed Helm repository URL]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/#get-the-chart-repository-url)


### Step 4: (Optional) Import the Helm configuration into your pipeline definition

Once you have a connected to a Helm repository, attach it to the pipeline.

1. Frpm the Pipelines page, select the pipeline into which to import the Helm configuation.
1. In the Workflows tab, do one of the following: 
  * Click **Variables** on the right, and then click the Settings (gear) icon in the variables section on the right. 
  * Click the context menu next to the settings icon.
1. Click on **Import from/Add shared configuration**, and from the list, select `CF_HELM_DEFAULT`. See [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/).

{% include image.html 
lightbox="true" 
file="/images/deployments/helm/import-helm-configuration.png" 
url="/images/deployments/helm/import-helm-configuration.png" 
alt="Connecting a Helm repository in the pipeline"
caption="Connecting a Helm repository in the pipeline" 
max-width="50%" 
%}


### Step 5: Use the Helm freestyle step in the pipeline 

You can now use the Helm freestyle step in the `codefresh.yml` file. This step is only needed in pipelines that actually upload/fetch Helm charts to/from Helm repositories. If your pipeline directly installs a Helm chart from the Git filesystem, there is no need to import a Helm configuration.

>Currently, you can use only one Helm configuration in the same pipeline. We are aware
of this limitation and will soon improve the way Codefresh works with multiple Helm configurations.



* Use the Helm typed step from the [Step Marketplace](https://codefresh.io/steps/step/helm){:target="\_blank"}.
* Configure the Helm step using environment variables, as described in [user-defined variables]({{site.baseurl}}/docs/pipelines/variables/#user-defined-variables).  

The example below illustrates how to provide variables as part of the Helm step definition:

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

<!--For Helm 3, just use the [newest Helm 3 image tag](https://hub.docker.com/r/codefresh/cfstep-helm/tags){:target="\_blank"}.  -->

#### Helm step action modes

The Helm step can operate in one of three modes, as defined by the `action` field:

1. `install`: Installs the chart into a Kubernetes cluster. This is the default mode if not explicitly set.
2. `push`: Packages the chart and pushes it to the repository.
3. `auth`: Authenticate only. Only sets up authentication and adds the repo to the Helm. This mode is useful to write your own Helm commands using the freestyle step's `commands` property, but still allow the step to handle authentication.


#### Helm values

* To supply a value file, add to the Helm step, `custom_values_file`, with the value pointing to an existing values file.  
* To override specific values, add to the Helm step, `custom_values` followed by the path to the value to set. For example, `myservice_imageTag`. Note that `.` (dot) should be replaced with `_` (underscore). The value of the variable is used to override or set the templated property.

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

## Helm usage examples

The following sections illustrate all three modes of Helm usage.

You can also look at the [GitHub repository](https://github.com/codefresh-contrib/helm-sample-app){:target="\_blank"} of [our Helm example]({{site.baseurl}}/docs/example-catalog/cd-examples/helm/) for full pipelines:

* Pipeline YAML for [deploying a chart](https://github.com/codefresh-contrib/helm-sample-app/blob/master/codefresh-do-not-store.yml){:target="\_blank"}
* Pipeline YAML for [both storing and deploying a chart](https://github.com/codefresh-contrib/helm-sample-app/blob/master/codefresh.yml){:target="\_blank"}

### Helm usage example: Installing a Helm Chart

The following example includes the minimum configuration to install a Helm chart from a repository. For more configuration options, see the [Argument reference](https://codefresh.io/steps/step/helm){:target="\_blank"}.  

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

### Helm usage example: Pushing a Helm Chart

The following example illustrates how to package and push a Helm chart into a repository.

```yaml
deploy:
  type: helm
  arguments:
    action: push
    chart_name: /codefresh/volume/repo/chart
    chart_repo_url: 'cm://h.cfcr.io/useraccount/default'
```

> **Notes**:  
  - Assumes that a Git repository with the Helm chart files was cloned as a part of the pipeline.
  - The Git repository contains the chart files in the `chart` directory.
  - `chart_repo_url` is optional. If a [Helm repository configuration](#step-4-optional-import-the-helm-configuration-into-your-pipeline-definition) is attached to the pipeline, this setting is ignored.

### Helm usage example: Authenticating only

The following example illustrates the Helm mode for authentication only.

```yaml
deploy:
  type: helm
  arguments:
    action: auth
    kube_context: my-kubernetes-context
    commands:
      - helm list
```

### Helm usage example: Custom Helm commands

The following example illustrates executing custom Helm commands.

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

> Notes:
- The directory that contains a chart MUST have the same name as the chart. Thus, a chart named `my-chart` MUST be created in a directory called `my-chart/`. This is a requirement of the [Helm Chart format](https://helm.sh/docs/chart_template_guide/){:target="\_blank"}.

## Helm configuration fields

Name|Required|Description
---|---|---
action|Defaults to 'install'|Operation mode: `install`/`push`/`auth`
chart_name|required for install/push|Chart reference to use, adhering to Helm's lookup rules (path to chart folder, or name of packaged chart). There's no need to prefix with `/reponame` if referencing a chart in a repository, this is handled automatically. a.k.a `CHART_NAME` but `CHART_NAME` shouldn't be used anymore. <!--need to verify this -->
chart_repo_url|optional|Helm chart repository URL. If a [Helm repository configuration](#step-4-optional-import-the-helm-configuration-into-your-pipeline-definition) is attached to the pipeline, this setting is ignored.
chart_version|optional|Override or set the chart version.
cmd_ps|optional|When defined, Command Postscript is appended as is to the generated Helm command string. Can be used to set additional parameters supported by the command but not exposed as configuration options.|
commands|optional|Commands to execute in plugin after `auth` action.
custom_value_files|optional|Values file to provide to Helm as `--values` or `-f`.|
custom_values|optional|Values to provide to Helm as `--set`
helm_version|optional|Version of [cfstep-helm image](https://hub.docker.com/r/codefresh/cfstep-helm/tags){:target="\_blank"}
kube_context|required for install|Kubernetes context to use. The name of the cluster as [configured in Codefresh]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster).
namespace|optional|Target Kubernetes namespace to deploy to.
release_name|required for install|Helm release name. If the release exists, it is upgraded.
repos|optional|Array of custom repositories.


## Full Helm pipeline example

The pipeline in this example builds a docker image, runs unit tests, stores the Helm chart in the Codefresh private Helm repository and finally deploys the Helm chart to a cluster. 

{% include image.html 
lightbox="true" 
file="/images/deployments/helm/full-helm-pipeline.png" 
url="/images/deployments/helm/full-helm-pipeline.png" 
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

You can see the source code in our [example section]({{site.baseurl}}/docs/example-catalog/cd-examples/helm/).


## Related articles  
[Helm charts and repositories]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/)  
[Using managed Helm repositories]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/)  
[Helm Promotion boards]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion)
