---
title: "Managing external clusters in GitOps Runtimes"
description: "Add multiple remote clusters to a GitOps Runtime"
group: installation
sub_group: gitops
toc: true
---

Once you have an Argo CD installation as part of a [Hybrid]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/) or [Hosted]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/) GitOps Runtime, you can add external clusters to them. You can then deploy applications to  those clusters without having to install Argo CD on the clusters in order to do so. 

When you add an external cluster to a provisioned GitOps Runtime, the cluster is registered as a managed cluster. A managed cluster is treated as any other managed K8s resource, meaning that you can monitor its health and sync status, deploy applications to it, view information in the Applications dashboard, and remove the cluster from the Runtime's managed list.  

Adding a managed cluster via Codefresh ensures that Codefresh applies the required RBAC resources (`ServiceAccount`, `ClusterRole` and `ClusterRoleBinding`) to the target cluster, creates a `Job` that updates the selected Runtime with the information, registers the cluster in Argo CD as a managed cluster, and updates the platform with the new cluster information.
 



## Prerequisites 

* For _Hosted GitOps_ Runtimes: [Configure access to these IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/)
* Valid Git personal access token with the [required scopes]({{site.baseurl}}/docs/reference/git-tokens) 
* [Latest version of the Codefresh CLI]({{site.baseurl}}/docs/installation/gitops/upgrade-gitops-cli/)
* Codefresh token in user settings
* For ingress-based GitOps Runtimes, the ingress host of the Runtime (use `cf runtime list` to get this)

## Adding managed clusters
Add a managed cluster in any of the following ways:
* [Codefresh UI](#add-a-managed-cluster-in-codefresh)
* [Kustomize](#add-a-managed-cluster-with-kustomize)
* [Helm](#add-a-managed-cluster-with-helm)
* [Terraform](#add-a-managed-cluster-with-terraform)

### Add a managed cluster in Codefresh
Add an external cluster to a provisioned GitOps Runtime in the Codefresh UI. When adding the cluster, you can also add labels and annotations to the cluster, which are added to the cluster secret created by Argo CD.
Optionally, to first generate the YAML manifests, and then manually apply them, use the `dry-run` flag in the CLI. 

**How to**  

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. From either the **Topology** or **List** views, select the Runtime to which to add the cluster. 
1. Topology View: Select {::nomarkdown}<img src="../../../../images/icons/add-cluster.png" display=inline-block/>{:/}.  
  List View: Select the **Managed Clusters** tab, and then select **+ Add Cluster**.  
1. In the Add Managed Cluster panel, if needed install the Codefresh GitOps CLI.
1. Copy and run the command:  
  `cf cluster add [runtime-name] [--labels label-key=label-value] [--annotations annotation-key=annotation-value][--dry-run]`  
  where:   
  * `runtime-name` is the name of the Runtime to which to add the cluster.
  * `--labels` is optional, and required to add labels to the cluster. When defined, add a label in the format `label-key=label-value`. Separate multiple labels with `commas`.   
  * `--annotations` is optional, and required to add annotations to the cluster. When defined, add an annotation in the format `annotation-key=annotation-value`. Separate multiple annotations with `commas`.   
  * `--dry-run` is optional, and required if you want to generate a list of YAML manifests that you can redirect and apply manually with `kubectl`.   


   {% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/managed-cluster-add-panel.png" 
	url="/images/runtime/managed-cluster-add-panel.png" 
	alt="Add Managed Cluster panel" 
	caption="Add Managed Cluster panel"
  max-width="40%" 
%}

{:start="7"}
1. If you used `dry-run`, apply the generated manifests to the same target cluster on which you ran the command.  
  Here is an example of the YAML manifest generated with the `--dry-run` flag. Note that the example has placeholders, which are replaced with the actual values during the `--dry-run`.  
  

The new cluster is registered to the GitOps Runtime as a managed cluster.  

### Add a managed cluster with Kustomize

1. Locally clone [https://github.com/codefresh-io/csdp-official/tree/main/add-cluster/kustomize](https://github.com/codefresh-io/csdp-official/tree/main/add-cluster/kustomize){:target="\_blank"}.
1. Update `configmap.yml` and `secret.yml` with the requires values.
1. Run `kustomize build` or `kubectl -k` to apply the final result to the cluster.

> For ingress-based GitOps Runtimes, to get the `ingressUrl` for your, first authenticate to the [Codefresh GitOps CLI]({{site.baseurl}}/docs/installation/cli/), and then run `cf runtime list` in your terminal.


### Add a managed cluster with Helm

The Helm chart is published at https://chartmuseum.codefresh.io/csdp-add-cluster. You can see the source templates at [https://github.com/codefresh-io/csdp-official/tree/main/add-cluster/helm](https://github.com/codefresh-io/csdp-official/tree/main/add-cluster/helm){:target="\_blank"}.

To deploy the chart:
1. Copy [https://github.com/codefresh-io/csdp-official/blob/main/add-cluster/helm/values.yaml](https://github.com/codefresh-io/csdp-official/blob/main/add-cluster/helm/values.yaml){:target="\_blank"} locally.
1. Fill in the required values.
1. Run:
```shell
helm repo add csdp-add-cluster https://chartmuseum.codefresh.io/csdp-add-cluster
helm repo update
helm search repo csdp-add-cluster
helm install csdp-add-cluster/csdp-add-cluster -f values.yaml --generate-name
``` 

> For ingress-based GitOps Runtimes, to get the `ingressUrl` for your, first authenticate to the [Codefresh GitOps CLI]({{site.baseurl}}/docs/installation/cli/), and then run `cf runtime list` in your terminal.
 

### Add a managed cluster with Terraform

* Use the [Helm provider](https://registry.terraform.io/providers/hashicorp/helm/latest/docs) as any other Helm chart.

```hcl
resource "helm_release" "my-managed-cluster" {
  name = "my-managed-cluster"

  repository = "https://chartmuseum.codefresh.io/csdp-add-cluster"
  chart      = "csdp-add-cluster"
  values = [
    "${file("values.yaml")}"
  ]
}
```
{:start="2"}
* Apply the file using Terraform or your favorite workflow tool.

## View managed clusters 
View managed clusters in either the Topology or List Runtime views. For information on Runtime views, see [Runtime views]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#gitops-runtime-views).  
As the cluster is managed through the Runtime, updates to the Runtime automatically updates the components on all the managed clusters that include it. 
     
View connection status for the managed cluster, and health and sync errors. Health and sync errors are flagged by the error notification in the toolbar, and visually flagged in the List and Topology views.  
  
## Install Argo Rollouts 
Applications with `rollout` resources need Argo Rollouts on the target cluster, both to visualize rollouts in the Applications dashboard and control rollout steps with the Rollout Player.  
If Argo Rollouts has not been installed on the target cluster, the **Install Argo Rollouts** button displayed.  

Install Argo Rollouts with a single click to execute rollout instructions, deploy the application, and visualize rollout progress in the [Applications dashboard]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/). 
 

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Select **Topology View**.
1. Select the target cluster, and then select **+ Install Argo Rollouts**.
 
{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/cluster-install-rollout.png" 
	url="/images/runtime/cluster-install-rollout.png" 
	alt="Install Argo Rollouts" 
	caption="Install Argo Rollouts"
  max-width="40%" 
%}

## Removing managed clusters

Removing a cluster as a deployment target means removing it from the GitOps Runtime that manages it.

> This action only removes the management link between your GitOps Runtime and your cluster. Applications that are already running on the cluster are not affected.

Remove a managed cluster in any of the following ways:
* [Codefresh UI](#remove-a-managed-cluster-from-the-codefresh-ui)
* [GitOps CLI](#remove-a-managed-cluster-through-the-gitops-cli)
* [Kustomize](#remove-a-managed-cluster-with-kustomize)
* [Helm](#remove-a-managed-cluster-with-helm)
* [Terraform](#remove-a-managed-cluster-with-terraform)


### Remove a managed cluster from the Codefresh UI 
Remove a cluster from the list managed by the GitOps Runtime in the Codefresh UI.

> You can also remove it through the CLI.

In the Codefresh UI, on the toolbar, click the **Settings** icon, expand Runtimes in the sidebar, and select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Select either the **Topology View** or the **List View** tabs.
1. Do one of the following:
    * In the Topology View, select the cluster node from the Runtime it is registered to. 
    * In the List View, select the Runtime, and then select the **Managed Clusters** tab.
1. Select the three dots next to the cluster name, and then select **Uninstall** (Topology View) or **Remove** (List View). 

{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/managed-cluster-remove-single.png" 
	url="/images/runtime/managed-cluster-remove-single.png" 
	alt="Remove a managed cluster from runtime (List View)" 
	caption="Remove a managed cluster from runtime (List View)"
  max-width="50%" 
%}


### Remove a managed cluster through the GitOps CLI 
Remove a managed cluster from the list managed by the GitOps Runtime through the GitOps CLI.  

* Run:  
  `cf cluster remove <runtime-name> --server-url <server-url>`  
  where:  
  `<runtime-name>` is the name of the GitOps Runtime that the managed cluster is registered to.  
  `<server-url>` is the URL of the server on which the managed cluster is installed. 




### Remove a managed cluster with Kustomize

Run `kubectl delete -f <your_yaml>` with the result of the `kustomize build` command that you run during installation

### Remove a managed cluster with Helm

Run `helm delete <release_name>` with the name of the release that was created during installation.

### Remove a managed cluster with Terraform 

Use the `terraform destroy` command.

## Related articles
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  