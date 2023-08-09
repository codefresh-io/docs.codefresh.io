---

title: "Promoting Helm Environments"
description: "Manage your Helm Environments with the Codefresh UI"
group: deployments
sub_group: helm
redirect_from:
  - /docs/new-helm/helm-environment-promotion/
toc: true
---
Apart from the [Helm Releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management) dashboard that shows your Kubernetes clusters at the application level, Codefresh also comes with a special environment board that allows you to track one or more applications as they move within your infrastructure (example, Dev, QA, Prod). 

The environment board can function both as an overview of the whole lifecycle of the application, as well as a tool to shift-left/right Helm releases between environments.

Here is an example board:

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/board.png" 
url="/images/deployments/helm/promotion/board.png"
alt="Helm Environment Dashboard" 
caption="Helm Environment Dashboard" 
max-width="80%"
%}

This board has three environments that correspond to Kubernetes clusters:
 * A Load-testing environment where applications are stress-tested
 * A Staging environment where smoke tests are performed
 * The Production environment where applications go live

You can see that a Python example app at version 0.2.0 is already in production. Version 0.3.0 is waiting in the staging environment for smoke tests. Once it is tested it can be dragged to the production column therefore *promoting* it to production status.


## Using the Helm Environment Board

You can create and manage as many Helm promotion boards as you want.  
For each board, you define how many columns it will contain, where each column is a Helm-enabled Kubernetes cluster.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/helm-environments.png" 
url="/images/deployments/helm/promotion/helm-environments.png"
alt="Helm environments column structure" 
caption="Helm environments column structure" 
max-width="80%"
%}

You can use different clusters for each column or different namespaces from the same cluster. You can even mix and match both approaches.  
As an example, you could create a Helm board with the following environments:

* Column 1, dev cluster showing all namespaces (DEV)
* Column 2, namespace qa from cluster staging (QA)
* Column 3, namespace staging from cluster staging (STAGING)
* Column 4, namespace production from cluster prod (PRODUCTION)

Once you have your columns in place, you can move Helm releases between clusters/namespaces by drag-n-drop. Each Helm release can be dragged to any other column either promoting it, for example, from QA to Production, or shifting it left, for example, from  Production to QA.

## Creating a custom Helm Board

Create your own Helm board with a single or multiple Helm applications. You can create as many boards as you want. 

1. In the Codefresh UI, from DevOps Insights in the sidebar, select [**Helm  Boards**](https://g.codefresh.io/helm/helm-kanban/){:target="\_blank"}. 
 
{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/board-selection.png" 
url="/images/deployments/helm/promotion/board-selection.png"
alt="Helm board selection" 
caption="Helm board selection" 
max-width="80%"
%}

{:start="2"}
1. On the top-right, click **Add board**.
1. Enter the title of your board as the **Board Name**.
1. Optional. In the **Release name regex expression** field, enter the Regex expression for this board to filter all its environments to show only Helm releases that match this regular expression.  
  Regex expressions are very helpful if you want your environment board to focus only on a single or set of Helm applications. 
  To see all Helm releases of your clusters, leave empty.

You can edit both options for an existing board if you change your mind later.

### Define Clusters/Namespaces for each Environment

Once you create your Helm environment board, you are ready to define its columns. 

* To add a column, on the top-right, click **Add environment***.  
  You will see the environment details dialog:

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/edit-helm-environment.png" 
url="/images/deployments/helm/promotion/edit-helm-environment.png"
alt="Edit Helm environment" 
caption="Edit Helm environment" 
max-width="50%"
%}

  For each environment you can select:  
  * A name for that column
  * The Kubernetes cluster it corresponds to
  * One or more namespaces that define this environment (You can even toggle the switch for a regex match)
  * A custom pipeline that will be used when a Helm release is installed for the first time in this column
  * A custom pipeline that will be used when a Helm release is dragged in this column (promoted from another column)
  * Optional. One or more charts to use for the environment. Defining charts for the environment saves you from having to search through all the charts in your Helm repository. When you install an application from the install graphical dialog, only the selected chart(s) are displayed.
  * A presentation color to easily identify the environment on the board (For example, a "production" environment should have a red color)

You can also select no namespace at all. In that case, the column will show Helm releases for all namespaces in that cluster.
You can change all these options after creation, so feel free to change your mind.

Repeat the same process for additional environments. Remember that you can name your environment as you want and define any combination of cluster/namespace for any of the columns. This gives you a lot of power to define a Helm environment board that matches exactly your own process.

You don't have to define the environments in order. You can drag-n-drop columns to change their order after the initial creation.


### Installing Helm Releases on each Environment

If you already have [pipelines that deploy Helm releases]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/), your columns are populated automatically with information.

For each Helm release, you will get some basic details such as the chart version and the name of the release. You can expand a release by clicking on the arrow button to get additional information such as the docker images and the replicas of each pod that are contained in the release.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/expand.png" 
url="/images/deployments/helm/promotion/expand.png"
alt="Helm release details" 
caption="Helm release details" 
max-width="50%"
%}

You can even install manually a Helm release from any external repository by clicking on the *PLUS* button at the header of each column. In that case you will see a list of possible Helm applications to choose from.

You will be able to select the target cluster and namespace as well as the chart values [as any other Helm release]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/#install-chart-from-your-helm-repository).


## Moving Releases between Environments

A Helm environment board can be used by different stakeholders in order to get the detailed status of all defined environments. In that aspect it can act as a read-only tool that simply shows the results of Codefresh pipelines that deploy Helm applications.

### Promoting Helm Releases with the UI

You can also use the board as an action tool in order to promote/demote a Helm release between individual environments. To move a Helm release between environments just drag-n-drop it to a different column.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/shift-right.png" 
url="/images/deployments/helm/promotion/shift-right.png"
alt="Promoting a Helm release" 
caption="Promoting a Helm release" 
max-width="80%"
%}

Once you drop the release you will also see the promotion dialog.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/promote-settings.png" 
url="/images/deployments/helm/promotion/promote-settings.png"
alt="Promotion Settings" 
caption="Promotion Settings" 
max-width="40%"
%}

All fields here will be auto-filled according to the Helm release that you dragged. You can also choose a custom pipeline (see below) for the promotion if you don't want to use the default one.

By clicking the *Variables* button you can override the chart values, import a specific shared configuration or add new values.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/value-options.png" 
url="/images/deployments/helm/promotion/value-options.png"
alt="Changing deployment values" 
caption="Changing deployment values" 
max-width="40%"
%}

By default Codefresh will use a built-in install/upgrade pipeline for performing the promotion. You can choose your own pipeline from the promotion dialog. That pipeline will be automatically provided with the following [environment variables]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/#environment-variables-for-custom-helm-commands):

* `CF_HELM_RELEASE` - name of release
* `CF_HELM_KUBE_CONTEXT` - `kubectl` context name of target cluster (cluster name from [dashboard]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/#work-with-your-services))
* `CF_HELM_NAMESPACE` - Tiller Namespace if you use Helm 2 
* `CF_HELM_INSTALLATION_NAMESPACE` - namespace where release is promoted to
* `CF_HELM_CONTEXTS` - [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration) Helm contexts
* `CF_HELM_VALUES` - Helm chart values 
* `CF_HELM_SET` - Additional values there were overriden
* `CF_HELM_CHART_JSON_GZIP` - Gzipped JSON of Helm chart (only for Helm 3)
* `CF_HELM_CHART_JSON` - JSON of Helm chart (only for Helm 2)
* `CF_HELM_BOARD` - Name of the board that is used for the drag-n-drop-action
* `CF_HELM_TARGET_SECTION` - Name of the Source Environment that you are promoting from
* `CF_HELM_SOURCE_SECTION` - Name of the Target Environment that you are promoting to


Note that the variable `CF_HELM_CHART_JSON_GZIP` is both compressed and base64 encoded. To get the raw value you need a command like `echo $CF_HELM_CHART_JSON_GZIP | base64 -d | gunzip`

>Overriding the default pipeline can only be done by [Codefresh admin users]({{site.baseurl}}/docs/administration/account-user-management/access-control/#users-and-administrators).

Once you click the *update* button, a new build will run that will perform the deployment.

Note that you can move releases to any column both on the right and on the left of the current column. This is helpful if for example you find a bug in your production environment and you want to bring it back to a staging environment for debugging.

### Promoting Helm releases programmatically

You can also promote Helm releases with the [Codefresh CLI](https://codefresh-io.github.io/cli/predefined-pipelines/promote-helm-release/){:target="\_blank"}.

Once you have [installed the CLI](https://codefresh-io.github.io/cli/getting-started/){:target="\_blank"}, you can use it from an external script or terminal with the `helm-promotion` parameter:

{% highlight shell %}
{% raw %}
codefresh helm-promotion --board MySampleBoard --source Staging --target Production --source-release my-app --set myenv=prod
{% endraw %}
{% endhighlight %}

Here we promote the Helm release `my-app` to the *Production* column overriding also the `myenv` value.

Remember that the Codefresh CLI can also run in a Codefresh pipeline with a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).  
Here is an example of a Helm promotion from within a Codefresh pipeline.


`codefresh.yml` 
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  triggerstep:
    title: trigger
    image: codefresh/cli
    commands:
      - 'codefresh helm-promotion --board MySampleBoard --source Staging --target Production --source-release my-app --namespace my-namespace --set myenv=prod'
{% endraw %}
{% endhighlight %}

## Viewing the promotion pipeline

When you promote a Helm Release for a Board, you can view the pipeline for that release.

1. Click on Boards under the Helm section on the left-hand side
2. Select the board you want to view
3. Select the Builds tab on the top
4. Here, you can see the Promotion Pipelines / builds for promoting a Release

## Editing your Helm Boards

For any existing Helm board, you have the following options:

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/board-management.png" 
url="/images/deployments/helm/promotion/board-management.png"
alt="Editing a Helm environment" 
caption="Editing a Helm environment" 
max-width="80%"
%}


1. The refresh button will update the board with the current state of the clusters
1. The filtering menu can be used to further constrain the Helm releases shown in each column. 
1. The *edit properties* button allows you to change again the title of the board as well as a global filter for Helm releases
1. The *remove board* completely deletes the present board from the Codefresh UI
1. The environment details on the environment header are:
* The edit button to change again the options for this column (shown on mouse hover)
* The delete button to remove this column from the board (shown on mouse hover)
* The plus button to install a new chart. If you selected one or more charts when you defined your environment, only the selected charts are displayed.
* A numeric value that shows how many releases are contained on this environment
1. The delete button allows you to uninstall a Helm release for an environment

The filtering options allow you to further constrain the Helm release shown for the whole board.

{% include 
image.html 
lightbox="true" 
file="/images/deployments/helm/promotion/filter.png" 
url="/images/deployments/helm/promotion/filter.png"
alt="Filtering options" 
caption="Filtering options" 
max-width="50%"
%}

The filters are especially helpful in Helm boards with large numbers of environments and/or releases.

## Related articles
[Using Helm in a Codefresh pipeline]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)  
[Helm charts and repositories]({{site.baseurl}}/docs/deployments/helm/helm-charts-and-repositories/#add-helm-repository)  
[Managing Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management)  
[Environment Dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/)  
