---
title: "Helm charts and repositories"
description: "Use external Helm charts and repositories in Codefresh pipelines"
group: deployments
sub_group: helm
redirect_from:
  - /docs/new-helm/helm-charts-and-repositories/
  - /docs/new-helm/
  - /docs/add-helm-repository/
  - /docs/new-helm/add-helm-repository/
toc: true
---
Codefresh allows you to integrate with external Helm repositories and Helm charts in the Helm Charts page.  
It is optional to use external Helm repositories as all Codefresh accounts already include a [built-in Helm repository]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/).

## Add an external Helm repository

Easily add your own Helm charts.  
By default, we show charts from the [official Helm repository](https://github.com/kubernetes/charts){:target="_blank"}. 

1. In the Codefresh UI, from Artifacts in the sidebar, select [**Helm Charts**](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"}. 
1. On the top right, click **Add Existing Helm Repository**.
  You are taken to Pipeline Integrations.
1. In the Integrations page, click **Add Helm Repository**, and then select the type of Helm repo to add from the list.
1. Enter the **Helm repository name** and **URL**.  
  Do not include the specific path to `index.yaml` in the URL.

{% include image.html 
lightbox="true" 
file="/images/deployments/helm/quick-helm-integration.png" 
url="/images/deployments/helm/quick-helm-integration.png" 
alt="Adding a Helm repository"
caption="Adding a Helm repository" 
max-width="70%" 
%}

1. If your repository doesn't require authentication, to complete the process, click **Save**. 

For more details on adding Helm repositories, see [Helm integrations]({{site.baseurl}}/docs/integrations/helm/).

## Use a Helm repository in a Codefresh pipeline

Once you have set up Helm integrations in Codefresh, you can import single or multiple Helm repository contexts into your pipelines. 
Select the **Import from shared configuration** option in the "Environment Variables" section, and then select the Helm repository or Helm repositories to import into the pipeline.  
The repository settings are imported as environment variables into the pipeline, to use as needed. 

1. From the Pipelines page, select the pipeline into which to import the Helm repository contexts.
1. In the Workflows tab, do one of the following: 
  * Click **Variables** on the right, and then click the **Settings** (gear) icon. 
  * Click the context menu next to the settings icon.
1. Click **Import from/Add shared configuration**, and select the name of the repository.  
1. To import more Helm registry contexts, repeat step 3.
  The settings for the Helm registry contexts are injected as environment variables into the pipeline. 

{% include image.html 
lightbox="true" 
file="/images/deployments/helm/connect-helm-repo.png" 
url="/images/deployments/helm/connect-helm-repo.png" 
alt="Connecting a Helm repository in the pipeline"
caption="Connecting a Helm repository in the pipeline" 
max-width="70%" 
%}

{:start="5"}
1. If you are using the Helm step, the step uses these settings to connect to your authenticated repository automatically. For details, see [Using Helm in Codefresh pipelines]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/).

## Install a chart from your Helm repository
Install a chart from a Helm repository to your cluster. 

* Values in the Chart Install wizard are provided in the following order:
  1. Chart Default Values (implicitly part of the chart).
  2. Overridden default values (provided as values file, provided only if edited by the user).
  3. Supplied values files from Yaml Shared Configuration.
  4. Override variables are provided as `--set` arguments.
* Variables available for custom pipelines:  
  If you select a custom pipeline, the following variables are available:
  * `CF_HELM_RELEASE` - name of release
  * `CF_HELM_KUBE_CONTEXT` - kubectl context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#work-with-your-services))
  * `CF_HELM_INSTALLATION_NAMESPACE` - desired namespace for the release 
  * `CF_HELM_CHART_VERSION` - Chart Version,
  * `CF_HELM_CHART_NAME` - Chart Name
  * `CF_HELM_CONTEXTS` - values from [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/#using-shared-helm-values)
  * `CF_HELM_VALUES` - extra values
  * `CF_HELM_SET` - extra values,
  * `CF_HELM_CHART_REPO_URL` - URL of Chart repository
  * `CF_HELM_COMMIT_MESSAGE` - Message to show in Helm GUI,

<br />

**Before you begin**
* Make sure that you have a Kubernetes integration with the cluster and namespace, as described [here]({{site.baseurl}}/docs/integrations/kubernetes/#connect-a-kubernetes-cluster)

**How to** 
1. In the Codefresh UI, from Artifacts in the sidebar, select [**Helm Charts**](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"}. 
1. In the row with the chart to install, click **Install**.
1. Enter the **Release name** for the chart, and select the **Chart version** to install.
1. From Cluster Information, select a Kubernetes **Cluster** and the **Namespace** to install to.  
1. Select the **Pipeline** to install to.
1. If required, edit the **Default Chart Values** to view and override them.  
  When the default values yaml is changed, it is provided to Helm install as a values file. You can revert to the original values cby clicking Revert.
1. To provide additional values files, do the following:
  * From the **Import from configuration** list, select **Add new context of type: YAML**. 
  * Enter the **Context name**.
  * Insert your values YAML, and click **Save**.
    The YAML is saved and added to the list of configuration files that you can import from.
1. To override variable values, click **+Add variable**, and then enter the Key and Value.
  > The order of value configurations matter for Helm: most recently provided values override earlier ones.  
1. Click **Install**. You can observe the newly installed release in Helm Releases.

You can also install Helm releases from [any Helm environment board]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion).


## Related articles
[Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)  
[Helm integrations]({{site.baseurl}}/docs/integrations/helm/)  
[Helm Dashboard]({{site.baseurl}}/docs/deployments/helm/helm-releases-management)  
[Promoting Hlem environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion)  
[Helm best practices]({{site.baseurl}}/docs/ci-cd-guides/helm-best-practices/)  


