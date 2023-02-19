---
title: "Helm Charts and repositories"
description: "How to use external Helm repositories in Codefresh pipelines"
group: new-helm
permalink: /:collection/new-helm/add-helm-repository/
redirect_from:
  - /docs/new-helm/
  - /docs/add-helm-repository/
toc: true
---
The "Helm Charts" page allows you to integrate with external Helm repositories and Helm charts. Note that all Codefresh accounts already include a [built-in Helm repository]({{site.baseurl}}/docs/new-helm/managed-helm-repository/). Using external Helm repositories is optional.

## Adding an external Helm repository

By default, we show you charts from the [official Helm repository](https://github.com/kubernetes/charts){:target="_blank"} but you can easily add your own:

In the "Helm Charts" page, click on the "Add Repository" button on the top right.

In the dialog that opened, name your repository, and specify it's URL. The URL should not include the specific path to `index.yaml`

{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/quick-helm-integration.png" 
url="/images/kubernetes-helm/quick-helm-integration.png" 
alt="Adding a Helm repository"
caption="Adding a Helm repository" 
max-width="70%" 
%}

If your repository doesn't require authentication, click 'Save' and you are done. 

For more details on adding extra Helm repositories see the [Helm integration page]({{site.baseurl}}/docs/integrations/helm/).

## Using Helm Repositories in a Codefresh pipeline

Once you have set up Helm integrations in Codefresh, you can import single or multiple Helm repository contexts into your pipelines. 
Select the **Import from shared configuration** option in the "Environment Variables" section, and then select the Helm repository or Helm repositories to import into the pipeline.  
The repository settings are imported as environment variables into the pipeline, to use as needed. 


{% include image.html 
lightbox="true" 
file="/images/kubernetes-helm/connect-helm-repo.png" 
url="/images/kubernetes-helm/connect-helm-repo.png" 
alt="Connecting a Helm repository in the pipeline"
caption="Connecting a Helm repository in the pipeline" 
max-width="70%" 
%}

If you are using the Helm step, the step uses the Helm repository context's settings to automatically connect to your authenticated repository.  
If the pipeline has multiple Helm repository contexts, then you must specify the primary repository context.   

For more info on the Codefresh Helm step, see [Using Helm in Codefresh pipelines]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/).

## Install chart from your Helm repository

In the "Helm Charts" page, locate the chart you would like to install, and click on the Install button.

In the dialog that opened:
- Name your release and choose a version of the chart to install.
- Cluster information:
  - Select a Kubernetes cluster and namespace to install to. This should be pre-configured in the Kubernetes Integration, see [here]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/).
  - Optionally, select the namespace where Tiller is at
- Values:
  - The default values that was provided with the chart will show up, you can press the edit button to view and override them.
  - When the default values yaml was changed, it will be provided to helm install as a values file. You can revert back your overriding changed by clicking on the revert button (next to the edit button).
  - You can provide additional values files by opening the 'Import from configuration' drop down list and selecting "Add new context of type: YAML". Insert your values YAML here and save. The YAML will be saved for future usage so that next time simply select it from the drop-down list.
  - Additionally, you can override some values by adding them in the "Override set variables section"

> The order of values configurations matter for helm, values provided last overrides values provided earlier. In the Chart Install wizard values are provided in the following order:
1. Default Values in the chart (implicitly part of the chart).
2. Overridden default values (provided as values file, provided only if edited by the user).
3. Supplied values files from Yaml Shared Configuration.
4. Override variables are provided as `--set` arguments.

From the same dialog you can also provide your own pipeline to be used (instead of the one offered by Codefresh). If you select a custom pipeline the following variables will be available to you:

* `CF_HELM_RELEASE` - name of release
* `CF_HELM_KUBE_CONTEXT` - kubectl context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_NAMESPACE` - Tiller Namespace if you use Helm 2 
* `CF_HELM_INSTALLATION_NAMESPACE` - desired namespace for the release 
* `CF_HELM_CHART_VERSION` - Chart Version,
* `CF_HELM_CHART_NAME` - Chart Name
* `CF_HELM_CONTEXTS` - values from [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/#using-shared-helm-values)
* `CF_HELM_VALUES` - extra values
* `CF_HELM_SET` - extra values,
* `CF_HELM_CHART_REPO_URL` - URL of Chart repository
* `CF_HELM_COMMIT_MESSAGE` - Message to show in Helm GUI,

Finally click on Install. You can observe the newly installed release on the "Helm Releases" page.

You can also install Helm releases from [any Helm environment board]({{site.baseurl}}/docs/new-helm/helm-environment-promotion).


## What to read next

* [Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/new-helm/using-helm-in-codefresh-pipeline/)
* [Helm Integration]({{site.baseurl}}/docs/integrations/helm/)
* [Helm Dashboard]({{site.baseurl}}/docs/new-helm/helm-releases-management)
* [Helm Promotion boards]({{site.baseurl}}/docs/new-helm/helm-environment-promotion)
* [Helm best practices]({{site.baseurl}}/docs/new-helm/helm-best-practices/)


