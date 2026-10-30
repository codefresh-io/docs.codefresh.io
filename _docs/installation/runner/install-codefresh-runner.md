---
title: "Codefresh Runner installation"
description: "Run Codefresh pipelines on your private Kubernetes cluster"
group: installation
redirect_from:
  - /docs/administration/codefresh-runner/
  - /docs/enterprise/codefresh-runner/
  - /docs/administration/codefresh-hybrid/
  - /docs/installation/codefresh-runner/
toc: true
---

Install the Codefresh Runner on your Kubernetes cluster to run pipelines and access secure internal services without compromising on-premises security requirements. These pipelines run on your infrastructure, even behind the firewall, and keep code on your Kubernetes cluster secure.

The Codefresh Runner does not rely on specific dockershim features. It can work with any container runtime that adheres to the standards. In Codefresh pipelines, the docker socket/daemon is an internal docker daemon created and managed by the pipeline itself. It is also distinct from the docker daemon on the host node, which may not even exist in cases where containerd or cri-o is used.
Review [Runner architecture]({{site.baseurl}}/docs/installation/runner/runner-architecture) and how the [Runner works behind firewalls]({{site.baseurl}}/docs/installation/runner/behind-the-firewall/).

{{site.data.callout.callout_warning}}
**IMPORTANT**:  
The Codefresh Runner is installed with Helm. CLI-based installation is no longer supported.<br>  
If you have an existing CLI-based installation, migrate it to the Helm installation, as described in [Migrating existing installations](#migrating-existing-installations).
{{site.data.callout.end}}

>**Codefresh Runner with spot instances**<br>
  Using spot instances can cause failures in Codefresh pipeline builds as they can be taken down without notice.<br>If you require 100% availability, we do not recommend using spot instances.

After installing the Codefresh Runner, you can:
* [View Runner components and resources](#runner-components-and-resources)
* [View the Runner Agent and its Runtime Environments](#runner-agents-and-runtime-environments)
* [Configure different aspects of the Runner](#runner-configuration)

## System requirements


{: .table .table-bordered .table-hover}
| Item                     | Requirement            |
| --------------         | --------------           |
|Kubernetes cluster      | Server version 1.21 or higher. {::nomarkdown}<br><b>Tip</b>:  To check the server version, run:<br> <code class="highlighter-rouge">kubectl version --short</code>.{:/}|
|Helm| 3.8.0 and higher|
|Container runtime | Any compliant container runtime, as the runner is **not** dependent on any special dockershim features. {::nomarkdown}<br>Examples: <ul><li><a href="https://kubernetes.io/blog/2020/12/02/dockershim-faq" target="blank">Docker</a></li><li><a href="https://containerd.io/" target="blank">containerd</a></li><li><a href="https://cri-o.io/" target="blank">cri-o</a></li></ul> {:/} |
|Codefresh API Token |{::nomarkdown} <ul><li><a href="https://codefresh.io/docs/docs/integrations/codefresh-api/#authentication-instructions">Required scopes</a>: <code class="highlighter-rouge">Runner-Installation(read+write)</code>, <code class="highlighter-rouge">Agent(read+write)</code>, <code class="highlighter-rouge">Agents(read+write)</code></li><li>Token needs to be from an Account Admin.</li><li>When using service accounts, select the **Assign Admin role to service account** option.<br>See <a href="https://codefresh.io/docs/docs/administration/account-user-management/service-accounts/">Managing service accounts</a>.</li></ul> {:/}|





## Install Codefresh Runner with Helm


To install the latest version of Codefresh Runner, follow the [chart installation instructions](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime) on ArtifactHub.


## Migrating existing installations 
You need to migrate existing CLI- and Helm-based installations of the Codefresh Runner to the new Helm installation.
* CLI installations  
  Follow [Migrating from CLI-based installation to Helm chart](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#migrating-from-cli-based-installation-to-helm-chart){:target="\_blank"} on ArtifactHub.

* Helm installations  
  Based on the chart version of the Runner installed, from 3.x or higher, you need to migrate the existing Helm chart to the latest version.
  * For Helm chart customization, see [Chart Configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#chart-configuration){:target="\_blank"} on ArtifactHub.  
  * For upgrade instructions per chart version, see the [Upgrade Chart section](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#upgrade-chart){:target="\_blank"}, also on ArtifactHub. 

If you need help, please reach out to Codefresh support.

## Runner components and resources
<!--- to be removed from this page once moved to Artifact Hub -->
Once installed, the Codefresh Runner is similar to any Kubernetes application, and you can monitor it using your existing tools.
Among the Runner components, only the `runner` pod persists within your cluster. Other components, such as the `engine`, exist for the duration of pipeline build.

To monitor the Runner, list the resources inside the namespace you chose during installation:

<!--- update this commands; to get from Mikhail -->
```shell
$ kubectl get pods -n codefresh-runtime
NAME                                              READY   STATUS    RESTARTS   AGE
dind-5ee7577017ef40908b784388                     1/1     Running   0          22s
dind-lv-monitor-runner-hn64g                      1/1     Running   0          3d
dind-lv-monitor-runner-pj84r                      1/1     Running   0          3d
dind-lv-monitor-runner-v2lhc                      1/1     Running   0          3d
dind-volume-provisioner-runner-64994bbb84-lgg7v   1/1     Running   0          3d
engine-5ee7577017ef40908b784388                   1/1     Running   0          22s
monitor-648b4778bd-tvzcr                          1/1     Running   0          3d
runner-5d549f8bc5-7h5rc                           1/1     Running   0          3d
```


You can also list `secrets`, `config-maps`, `logs`, `volumes`, etc. for the Codefresh builds.

The Runner uses the following pods:

* `runner`: Picks tasks (builds) from the Codefresh API
* `engine`: Runs pipelines
* `dind`: Builds and uses Docker images
* `dind-volume-provisioner`: Provisions volumes (PVs) for `dind`
* `dind-lv-monitor`: Cleans **local** volumes


### Networking Requirements
<!--- keep until moved -->
* `dind`: Pod creates an internal network in the cluster to run all the pipeline steps; needs outgoing/egress access to Docker Hub and `quay.io`.
* `runner`: Pod needs outgoing/egress access to `g.codefresh.io`; needs network access to [App-Proxy](#customized-codefresh-runner-installations) if installed.
* `engine`: Pod needs outgoing/egress access to `g.codefresh.io`, `*.firebaseio.com` and `quay.io`; needs network access to `dind` pod

All CNI providers/plugins are compatible with the runner components.

## Runner Agents and Runtime Environments

View Codefresh Runners installed for your account and their status. The Codefresh Runners tab in Pipeline Runtimes displays the list of Agents for the account. Every Agent is attached to one or more Runtime Environments. The API token is the one provided during Runner installation.  

The Runner polls the Codefresh platform every three seconds by default to automatically create all resources needed for running pipelines. 

1. In the Codefresh UI, click the **Settings** icon on the toolbar.
1. From the sidebar, select **Pipeline Runtimes**, and then click [**Codefresh Runners**](https://g.codefresh.io/account-admin/pipeline-runtimes){:target="\_blank"}. 

{% include image.html
  lightbox="true"
  file="/images/runtime/runner/runtime-environments.png"
  url="/images/runtime/runner/runtime-environments.png"
  alt="Available runtime environments"
  caption="Available runtime environments"
  max-width="60%"
    %}
1. To add an Agent, click **New Agent**, and do the following:
  1. In the **Agent Name** field, enter the name of the Agent.
  1. From the list of **Runtime Environments**, select one or more Runtime Environments to attach to the Agent. 
  1. Click **Save**.

 
### Select a default Runtime Environment  

If you have multiple Runtime Environments for an Agent, select the one to use as the default environment for all the pipelines in the account. 
You can always override the default Runtime Environment if needed for a specific pipeline.

1. In the Codefresh UI, click the **Settings** icon on the toolbar.
1. From the sidebar, select [**Pipeline Runtimes**](https://g.codefresh.io/account-admin/pipeline-runtimes){:target="\_blank"}. 
1. From the list of Pipeline Runtimes, select the row with the runtime to set as the default.
1. Click the context menu on the right, and select **Set as Default**.  
  The selected Runtime Environment is outlined to indicate that it is the default.


###  Override default Runtime Environment for a pipeline

Override the default Runtime Environment for a specific pipeline through the pipeline's [Build Runtime settings]({{site.baseurl}}/docs/pipelines/pipelines/#build-runtime).  

{% include image.html
  lightbox="true"
  file="/images/runtime/runner/environment-per-pipeline.png"
  url="/images/runtime/runner/environment-per-pipeline.png"
  alt="Overriding the default Runtime Environment for a pipeline"
  caption="Overriding the default Runtime Environment for a pipeline"
  max-width="60%"
    %}




## Runner configuration
After you install the Codefresh Runner, use the configuration options to customize the installation for your organization.  
For detailed information, see [Configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#configuration){:target="\_blank"} in ArtifactHub.

### Runner volume configuration options 
* **Custom volume mounts**  
  Add custom volumes and volume mounts to the runtime environment for all pipeline steps to have access to the same set of external files.  
  See [Custom volume mounts](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#custom-volume-mounts){:target="\_blank"}.
* **Volume reuse**    
  Configure the value of `reuseVolumeSelector` in the runtime environment to define volume reuse behavior.  
  See [Volume reuse policy](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#volume-reuse-policy){:target="\_blank"}. 

* **Volume cleaners**  
  Manage disk space and prevent out-of-sapce errors for Codefresh pipelines.  
  See [Volume cleaners](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#volume-cleaners){:target="\_blank"}.  

* **EBS volume configuration**  
  Assign permissions to `dind-volume-provisioner` to create/attach/detach/delete/get EBS volumes.  
  See   [EBS backend](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#ebs-backend-volume-configuration){:target="\_blank"}.

* **Azure Disks volume configuration**    
  Assign permissions to `dind-volume-provisioner` to create/delete/get Azure disks.  
  See [Azure Disks backend](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#azure-disks-backend-volume-configuration){:target="\_blank"}.

* **GCE Disks volume configuration**  
  Assign `ComputeEngine.StorageAdmin` permissions to `dind-volume-provisioner`.  
  See   [GCE Disks backend](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#gce-disks-backend-volume-configuration-in-gke){:target="\_blank"}.


### Runner custom environment variables
Add custom environment variables to the Runtime Environment that all pipeline steps can access.  
See [Custom global environment variables](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#custom-global-environment-variables){:target="\_blank"}.

### Runner rootless DinD
To run the docker daemon as non-root user in `rootless` mode, configure the `dind` image tag.  
See [Docker daemon in rootless mode](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#rootless-dind){:target="\_blank"}.

### Runner ARM builds
Run native ARM64v8 builds with `nodeSelector` or `tolerations` for `dind` pods.  
See [Run native ARM builds](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#arm){:target="\_blank"}.

### Runner on OpenShift
Install Runner on OpenShift by configuring `values.yaml`.  
See [Install Runner on OpenShift](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#openshift){:target="\_blank"}.

### Runner in Agentless mode
For on-premises installations, install Runner in `agentless` mode.  
See [Agentless install mode for on-premises](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#on-premise){:target="\_blank"}.

## Runtime Environment specifications

The section describes the specifications for the Runtime Environment.  

There are additional and hidden fields auto-generated by Codefresh that complete the specifications. You can view and edit these fields only for [Codefresh On-Premises installations]({{site.baseurl}}/docs/installation/installation-options/on-premises/codefresh-on-prem/).

<!--- remove example -->

### Example: Default Runtime Environment specifications
Below is an example of the default and basic runtime spec after you've installed the Codefresh Runner: 


{% highlight yaml %}
{% raw %}
version: 1
metadata:
  ...
runtimeScheduler:
  cluster:
    clusterProvider:
      accountId: 5f048d85eb107d52b16c53ea
      selector: my-eks-cluster
    namespace: codefresh
    serviceAccount: codefresh-engine
  annotations: {}
dockerDaemonScheduler:
  cluster:
    clusterProvider:
      accountId: 5f048d85eb107d52b16c53ea
      selector: my-eks-cluster
    namespace: codefresh
    serviceAccount: codefresh-engine
  annotations: {}
  userAccess: true
  defaultDindResources:
    requests: ''
  pvcs:
    dind:
      storageClassName: dind-local-volumes-runner-codefresh
extends:
  - system/default/hybrid/k8s_low_limits
description: '...'
accountId: 5f048d85eb107d52b16c53ea
{% endraw %}
{% endhighlight %}


### Top-level fields


{: .table .table-bordered .table-hover}
| Field name          | Type                  | Value |
| -------------- |-------------------------| -------------------------|
| `version`       | string | Runtime environment version |
| `metadata`       | object | Meta-information  |
| `runtimeScheduler`       | object | Engine pod definition |
| `dockerDaemonScheduler`       | object | Dind pod definition |
| `extends`       | array | System field (links to full runtime spec from Codefresh API) |
| `description`       | string | Runtime environment description (k8s context name and namespace) |
| `accountId`       | string | Account to which this runtime belongs |
| `appProxy`       | object | Optional filed for [App-Proxy](#customized-codefresh-runner-installations)  |

### runtimeScheduler fields (engine)

{: .table .table-bordered .table-hover}
| Field name          | Type                  | Value |
| -------------- |-------------------------| -------------------------|
|`image`	|string	|Override default engine image|
|`imagePullPolicy`|string	|Override image pull policy (default `IfNotPresent`)|
|`type`	|string	`KubernetesPod`|
|`envVars`	|object	|Override or add environment variables passed into the engine pod|
|`userEnvVars`|	object	|Add external env var(s) to the pipeline. See [Custom Global Environment Variables](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#custom-global-environment-variables){:target="\_blank"}.|
|`cluster`|	object|	k8s related information (`namespace`, `serviceAccount`, `nodeSelector`)|
|`resources`|	object	|Specify non-default `requests` and `limits` for engine pod. <br>For memory, use `Mi` (mebibytes).<br>For CPU, use `m` (millicpu).|
|`tolerations`	|array	|Add tolerations to engine pod|
|`annotations`	|object|	Add custom annotations to engine pod (empty by default `{}`)|
|`labels`	|object	|Add custom labels to engine pod (empty by default `{}`)|
|`dnsPolicy`|	string|	Engine pod’s [DNS policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy){:target="\_blank"} |
|`dnsConfig`	|object	|Engine pod’s [DNS config](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config){:target="\_blank"}  |

`runtimeScheduler` example:

{% highlight yaml %}
{% raw %}
runtimeScheduler:
  imagePullPolicy: Always
  cluster:
    clusterProvider:
      accountId: 5f048d85eb107d52b16c53ea
      selector: my-eks-cluster
    nodeSelector: #schedule engine pod onto a node whose labels match the nodeSelector
      node-type: engine
    namespace: codefresh
    serviceAccount: codefresh-engine
  annotations: {}
  labels:
    spotinst.io/restrict-scale-down: "true" #optional label to prevent node scaling down when the runner is deployed on spot instances using spot.io
  envVars:
    NODE_TLS_REJECT_UNAUTHORIZED: '0' #disable certificate validation for TLS connections (e.g. to g.codefresh.io)
    METRICS_PROMETHEUS_ENABLED: 'true' #enable /metrics on engine pod
    DEBUGGER_TIMEOUT: '30' #debug mode timeout duration (in minutes)
  userEnvVars:
    - name: GITHUB_TOKEN
      valueFrom:
        secretKeyRef:
          name: github-token
          key: token
  resources:
    requests:
      cpu: 60m
      memory: 500Mi
    limits:
      cpu: 1000m
      memory: 2048Mi
  tolerations:
    - effect: NoSchedule
      key: codefresh.io
      operator: Equal
      value: engine
{% endraw %}
{% endhighlight %}

### dockerDaemonScheduler fields (dind)

| Field name          | Type                  | Value |
| -------------- |-------------------------| -------------------------|
| `dindImage`       | string | Override default dind image |
| `type`       | string | `DindPodPvc` |
| `envVars`       | object | Override or add environment variables passed into the dind pod. See [IN-DIND cleaner](https://github.com/codefresh-io/dind/tree/master/cleaner){:target="\_blank"}  |
| `userVolumeMounts` with `userVolumes`       | object | Add volume mounts to the pipeline.<br>See [Custom Volume Mounts](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#custom-volume-mounts){:target="\_blank"}. |
| `cluster`       | object | k8s related information (`namespace`, `serviceAccount`, `nodeSelector`) |
 `defaultDindResources`       | object | Override `requests` and `limits` for dind pod (defaults are `cpu: 400m` and `memory:800Mi`). For memory, use `Mi` (mebibytes); for CPU, use `m` (millicpu).<!---<br>See also [How to: Update Runtime Environment memory and CPU settings]({{site.baseurl}}/docs/kb/articles/update-runtime-mem-cpu/).--> |
| `tolerations`       | array | Add tolerations to dind pod |
| `annotations`       | object | Add custom annotations to dind pod (empty by default `{}`) |
| `labels`       | object | Add custom labels to dind pod (empty by default `{}`) |
| `pvc`       | object | Override default storage configuration for PersistentVolumeClaim (PVC) with `storageClassName`, `volumeSize`, `reuseVolumeSelector`. <br>See [Volume reuse policy](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#volume-reuse-policy){:target="\_blank"}.  |
| `dnsPolicy`       | string | Dind pod's [DNS policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy){:target="\_blank"} |
| `dnsConfig`       | object | Dind pod's [DNS config](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config){:target="\_blank"} |

`dockerDaemonScheduler` example:
{% highlight yaml %}
{% raw %}
dockerDaemonScheduler:
  cluster:
    clusterProvider:
      accountId: 5f048d85eb107d52b16c53ea
      selector: my-eks-cluster
    nodeSelector: #schedule dind pod onto a node whose labels match the nodeSelector
      node-type: dind  
    namespace: codefresh
    serviceAccount: codefresh-engine
  annotations: {}
  labels:
    spotinst.io/restrict-scale-down: "true" #optional label to prevent node scaling down when the runner is deployed on spot instances using spot.io
  userAccess: true
  defaultDindResources:
    requests: ''
    limits:
      cpu: 1000m
      memory: 2048Mi
  userVolumeMounts:
    my-cert:
      name: cert
      mountPath: /etc/ssl/cert
      readOnly: true
  userVolumes:
    my-cert:
      name: cert
      secret:
        secretName: tls-secret
  pvcs:
    dind:
      storageClassName: dind-local-volumes-runner-codefresh
      volumeSize: 30Gi
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'
  tolerations:
    - key: codefresh.io
      operator: Equal
      value: dinds
      effect: NoSchedule    
{% endraw %}
{% endhighlight %}

## Replacing expired certificates
If your builds are stuck in Pending or failing with `Failed to validate connection to Docker daemon; caused by Error: certificate has expired`, you can verify if your certificates have expired, and then replace them if needed.  

* Re-apply the [`cf-runtime` helm chart](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime){:target="\_blank"}.  
  Post-upgrade, the `gencerts-dind` Helm hook regenerates the DinD certificates using a new CA (Certificate Authority).

## Customized Codefresh Runner installations

Installation and configuration options for the Codefresh Runner are described in the [`cf-runtime` Helm chart README](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime){:target="\_blank"} on ArtifactHub. Customize the installation by adding values to the chart's `values.yaml` file, and then installing or upgrading the chart.

For example:
* App-Proxy: set `appProxy.enabled: true`. See [Values](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#values){:target="\_blank"}.
* Amazon EKS: [EBS backend volume configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#ebs-backend-volume-configuration){:target="\_blank"}
* Azure AKS: [Azure Disks backend volume configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#azure-disks-backend-volume-configuration){:target="\_blank"}
* Google GKE: [GCE Disks backend volume configuration in GKE](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#gce-disks-backend-volume-configuration-in-gke){:target="\_blank"}


## Troubleshooting

For troubleshooting information, refer to the [Knowledge Base]({{site.baseurl}}/docs/kb/troubleshooting/#runtimes){:target="\_blank"}.

## Related articles
[Codefresh platform deployment]({{site.baseurl}}/docs/installation/installation-options/)  
[Codefresh on-premises deployment]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem/)  
[Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)  
