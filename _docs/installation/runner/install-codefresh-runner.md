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
  1. Save the current Runtime Environment specifications, so that you can move your manual overrides to the Helm values file:
```shell
codefresh get runtime-environments <runtime-name> -o yaml > <runtime-name>.yaml
```
  1. Delete the Runtime Environments and the Agent from your Codefresh account.  
     Pipelines assigned to a deleted Runtime Environment run on the account's default Runtime Environment until you reassign them.
```shell
codefresh delete runtime-environments <runtime-name> --force
codefresh delete agent <agent-name>
```
  1. Delete the Runner components from the cluster.  
     Deleting the namespace removes the namespaced components. The commands below also remove the cluster-scoped resources created by the CLI installation, with their default names. The `app-proxy` resources exist only if you installed the App-Proxy.
```shell
NAMESPACE=codefresh   # namespace of the CLI installation

kubectl delete namespace $NAMESPACE
kubectl delete clusterrolebinding runner-$NAMESPACE volume-provisioner-runner-$NAMESPACE app-proxy-cluster-reader-$NAMESPACE --ignore-not-found
kubectl delete clusterrole volume-provisioner-runner-$NAMESPACE app-proxy-cluster-reader-$NAMESPACE --ignore-not-found
kubectl delete storageclass dind-local-volumes-runner-$NAMESPACE --ignore-not-found
```
     If PersistentVolumes of the deleted StorageClass remain, delete them as well: `kubectl get pv | grep dind-local-volumes-runner-$NAMESPACE`.
  1. Install the latest Helm version, making sure you _add all the manual overrides you made to the Runtime specifications_ to the new Helm [values](https://github.com/codefresh-io/venona/blob/release-1.0/charts/cf-runtime/values.yaml){:target="\_blank"} file. <br>For example storage configuration in `.values.storage`, dind/engine configuration in `.Values.runtime.dind/engine`.

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
* `runner`: Pod needs outgoing/egress access to `g.codefresh.io`; needs network access to [app-proxy](#app-proxy-installation) if installed.
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
| `appProxy`       | object | Optional filed for [app-proxy]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy)  |

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

Customize the Codefresh Runner installation by adding values to the `values.yaml` file of the [Helm chart](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime){:target="\_blank"}, and then installing or upgrading the chart:

```shell
helm upgrade --install cf-runtime oci://quay.io/codefresh/cf-runtime -f values.yaml --create-namespace --namespace codefresh
```

For the full list of values, see [Values](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#values){:target="\_blank"} in ArtifactHub.

### App-Proxy installation

The App-Proxy is an **optional** component of the Runner, used mainly when the Git provider server is installed on-premises, behind the firewall.

#### App-Proxy requirements

App-Proxy requires a Kubernetes cluster:

1. With the Codefresh Runner installed
1. With an active [ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/){:target="\_blank"}.
  The ingress controller must allow incoming connections from the VPC/VPN where users are browsing the Codefresh UI.
  The ingress connection **must** have a hostname assigned for this route, and **must** be configured to perform SSL termination.

>**NOTE**  
Currently, App-Proxy is supported for both SaaS and on-prem versions of GitHub and GitLab, and Bitbucket Data Center.

#### Install App-Proxy

Enable the App-Proxy in `values.yaml`, and then install or upgrade the chart:

```yaml
appProxy:
  enabled: true
  ingress:
    host: <hostname-of-ingress>
    # (Optional) Ingress class, if you have multiple ingress controllers in the cluster
    class: nginx
    # (Optional) Kubernetes TLS secret for the ingress
    tlsSecret: <tls-secret-name>
    # (Optional) Path prefix, by default `/`
    pathPrefix: /app-proxy
    # (Optional) Extra annotations, for example an allowlist of IPs/ranges
    annotations:
      nginx.ingress.kubernetes.io/whitelist-source-range: 123.123.123.123/32
```

For additional security, to further limit the web browsers that can access the ingress, define an allowlist of IPs/ranges. Check the documentation of your ingress controller for the exact details.  
To expose the App-Proxy through the Gateway API instead of an ingress, use the `appProxy.httpRoute` values.

#### App-Proxy architecture
Here is the architecture of the App-Proxy:

{% include image.html
  lightbox="true"
  file="/images/runtime/runner/app-proxy-architecture.png"
  url="/images/runtime/runner/app-proxy-architecture.png"
  alt="How App Proxy and the Codefresh runner work together"
  caption="How App Proxy and the Codefresh runner work together"
  max-width="80%"
    %}

The App-Proxy:
* Enables you to automatically create webhooks for Git in the Codefresh UI (identical to the SaaS experience)
* Sends commit status information back to your Git provider (identical to the SaaS experience)
* Makes all Git operations in the GUI work exactly like the SaaS installation of Codefresh

For a Git GET operation, the Codefresh UI communicates with the App-Proxy to route the request to the Git provider. The confidential Git information never leaves the firewall premises, and the connection between the browser and the ingress is SSL/HTTPS.

The App-Proxy has to work over HTTPS, and by default it uses the ingress controller to terminate the SSL. Therefore, the ingress controller must be configured to perform SSL termination. Check the documentation of your ingress controller (for example [nginx ingress](https://kubernetes.github.io/ingress-nginx/examples/tls-termination/){:target="\_blank"}). This means that the App-Proxy does not compromise security in any way.


## Install Codefresh Runner on Google Kubernetes Engine (GKE)

You can install the Codefresh Runner on [GKE](https://cloud.google.com/kubernetes-engine/){:target="\_blank"} Kubernetes cluster.
Codefresh supports the following GKE configurations:
* [Install on GKE with local SSD](#install-on-gke-with-local-ssd)
* [Install on GKE with GCE disks and Google SA JSON key](#install-on-gke-with-gce-disks-and-google-sa-json-key)
* [Install on GKE with GCE disks with Workload Identity and IAM role](#install-on-gke-with-gce-disks-with-workload-identity-and-iam-role)

### Common prerequisites

Before you start the installation, verify the following:
* Make sure your user has `Kubernetes Engine Cluster Admin` role in Google console
* Bind your user with `cluster-admin` Kubernetes cluster role.

```shell
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
```

### Install on GKE with local SSD

**Prerequisites**  
[GKE cluster with local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd){:target="\_blank"}

**How to**  
Install the chart with these values:

```yaml
storage:
  backend: local
  local:
    volumeParentDir: /mnt/disks/ssd0/codefresh-volumes

volumeProvisioner:
  dind-lv-monitor:
    nodeSelector:
      cloud.google.com/gke-local-ssd: "true"

runtime:
  dind:
    nodeSelector:
      cloud.google.com/gke-local-ssd: "true"
```

### Install on GKE with GCE disks and Google SA JSON key

`dind-volume-provisioner` requires `ComputeEngine.StorageAdmin` permissions.

1. Create a Google Service Account with the `ComputeEngine.StorageAdmin` role, and download its key in JSON format.
1. Install the chart with these values:
```yaml
storage:
  backend: gcedisk
  gcedisk:
    volumeType: pd-ssd
    availabilityZone: us-central1-c
    serviceAccountJson: |
      {
       "type": "service_account",
       "project_id": "...",
       "private_key_id": "...",
       "private_key": "...",
       "client_email": "...",
       "client_id": "...",
       "auth_uri": "...",
       "token_uri": "...",
       "auth_provider_x509_cert_url": "...",
       "client_x509_cert_url": "..."
      }
    # Alternatively, reference an existing secret with the JSON key:
    # serviceAccountJsonSecretKeyRef:
    #   name: gce-service-account
    #   key: service-account.json

runtime:
  dind:
    nodeSelector:
      topology.kubernetes.io/zone: us-central1-c
```

### Install on GKE with GCE disks with Workload Identity and IAM role

1. Install the chart with these values. The annotation binds the `dind-volume-provisioner` service account to the Google service account.
```yaml
storage:
  backend: gcedisk
  gcedisk:
    volumeType: pd-ssd
    availabilityZone: us-central1-c

volumeProvisioner:
  serviceAccount:
    create: true
    annotations:
      iam.gke.io/gcp-service-account: <GSA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com

runtime:
  dind:
    nodeSelector:
      topology.kubernetes.io/zone: us-central1-c
```
1. Create the binding between the Kubernetes service account and the Google service account:
```shell
export K8S_NAMESPACE=codefresh
export KSA_NAME=cf-runtime-volume-provisioner # <release-name>-volume-provisioner, or volumeProvisioner.serviceAccount.name if set
export GSA_NAME=<google_sa_name>
export PROJECT_ID=<google_project_name>
gcloud iam service-accounts add-iam-policy-binding \
  --role roles/iam.workloadIdentityUser \
  --member "serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/${KSA_NAME}]" \
  ${GSA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

## Install Codefresh Runner on EKS

Installing the Codefresh Runner on EKS includes:  
[Step 1: Create an EKS cluster](#step-1-create-an-eks-cluster)  
[Step 2: Install autoscaler on EKS cluster](#step-2-install-autoscaler-on-eks-cluster)  
[Step 3: (Optional) Configure overprovisioning with Cluster Autoscaler](#step-3-optional-configure-overprovisioning-with-cluster-autoscaler)  
[Step 4: Install the Codefresh Runner with EBS support](#step-4-install-the-codefresh-runner-with-ebs-support)  

### Step 1: Create an EKS cluster

<!-- is this part of the procedure? -->
You need to create three files:
* `cluster.yaml` file with separate node pools for dind, engine and other services, like runner, cluster-autoscaler etc
* Create two separate IAM policies for:
  * Volume-provisioner controller(`policy/runner-ebs`) for creating and deleting volumes
  * Dind pods(`policy/dind-ebs`) for attaching/detaching the volumes to the appropriate nodes using [IAM attachPolicyARNs options](https://eksctl.io/usage/iam-policies/){:target="\_blank"}.

`policy/runner-ebs:`

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:AttachVolume",
                "ec2:CreateSnapshot",
                "ec2:CreateTags",
                "ec2:CreateVolume",
                "ec2:DeleteSnapshot",
                "ec2:DeleteTags",
                "ec2:DeleteVolume",
                "ec2:DescribeInstances",
                "ec2:DescribeSnapshots",
                "ec2:DescribeTags",
                "ec2:DescribeVolumes",
                "ec2:DetachVolume"
            ],
            "Resource": "*"
        }
    ]
}
```

`policy/dind-ebs:`

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeVolumes"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DetachVolume",
                "ec2:AttachVolume"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

**How to**
1. Create the `cluster.yaml` as in the example below (`my-eks-cluster.yaml`).
```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: my-eks
  region: us-west-2
  version: "1.15"
nodeGroups:
  - name: dind
    instanceType: m5.2xlarge
    desiredCapacity: 1
    iam:
      attachPolicyARNs:
        - arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy
        - arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy
        - arn:aws:iam::aws:policy/ElasticLoadBalancingFullAccess
        - arn:aws:iam::XXXXXXXXXXXX:policy/dind-ebs
      withAddonPolicies:
        autoScaler: true
    ssh: # import public key from file
      publicKeyPath: ~/.ssh/id_rsa.pub
    minSize: 1
    maxSize: 50
    volumeSize: 50
    volumeType: gp2
    ebsOptimized: true
    availabilityZones: ["us-west-2a"]
    kubeletExtraConfig:
        enableControllerAttachDetach: false
    labels:
      node-type: dind
    taints:
      codefresh.io: "dinds:NoSchedule"
  - name: engine
    instanceType: m5.large
    desiredCapacity: 1
    iam:
      withAddonPolicies:
        autoScaler: true
    minSize: 1
    maxSize: 10
    volumeSize: 50
    volumeType: gp2
    availabilityZones: ["us-west-2a"]
    labels:
      node-type: engine
    taints:
      codefresh.io: "engine:NoSchedule"
  - name: addons
    instanceType: m5.2xlarge
    desiredCapacity: 1
    ssh: # import public key from file
      publicKeyPath: ~/.ssh/id_rsa.pub
    minSize: 1
    maxSize: 10
    volumeSize: 50
    volumeType: gp2
    ebsOptimized: true
    availabilityZones: ["us-west-2a"]
    labels:
      node-type: addons
    iam:
      attachPolicyARNs:
        - arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy
        - arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy
        - arn:aws:iam::aws:policy/ElasticLoadBalancingFullAccess
        - arn:aws:iam::XXXXXXXXXXXX:policy/runner-ebs
      withAddonPolicies:
        autoScaler: true
availabilityZones: ["us-west-2a", "us-west-2b", "us-west-2c"]
```
1. Execute:
```shell
eksctl create cluster -f my-eks-cluster.yaml
```

The configuration leverages [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/){:target="\_blank"} as the default operating system for the nodes in the node group.

**Bottlerocket-based nodes**
Bottlerocket is an open source Linux based Operating System specifically built to run containers. It focuses on security, simplicity and easy updates via transactions. Find more information in the [official repository](https://github.com/bottlerocket-os/bottlerocket){:target="\_blank"}.

To leverage [Bottlerocket-based nodes](https://aws.amazon.com/bottlerocket/){:target="\_blank"}:
* Specify the AMI Family using `amiFamily: Bottlerocket`
* Add these additional IAM Policies:
    * `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly`
    * `arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore`



### Step 2: Install autoscaler on EKS cluster

Once the cluster is up and running, install the [cluster autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html){:target="\_blank"}.

Because we used IAM AddonPolicies `"autoScaler: true"` in the `cluster.yaml` file, everything is done automatically, and there is no need to create a separate IAM policy or add Auto Scaling group tags.

* Deploy the cluster autoscaler:

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```
* Add the `cluster-autoscaler.kubernetes.io/safe-to-evict` annotation:
```shell
kubectl -n kube-system annotate deployment.apps/cluster-autoscaler cluster-autoscaler.kubernetes.io/safe-to-evict="false"
```

* Edit the `cluster-autoscaler` container command:

```shell
kubectl -n kube-system edit deployment.apps/cluster-autoscaler
```

* Do the following as in the example below:
    * Replace `<YOUR CLUSTER NAME>` with the name of the cluster `cluster.yaml`
    * Add the following options:
      `--balance-similar-node-groups`
      `--skip-nodes-with-system-pods=false`

```
spec:
      containers:
      - command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/my-eks
        - --balance-similar-node-groups
        - --skip-nodes-with-system-pods=false
```

* Set the autoscaler version:
  If the version of the EKS cluster 1.15, the corresponding autoscaler version according to [https://github.com/kubernetes/autoscaler/releases](https://github.com/kubernetes/autoscaler/releases){:target="\_blank"} is 1.15.6.

```shell
kubectl -n kube-system set image deployment.apps/cluster-autoscaler cluster-autoscaler=us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler:v1.15.6
```

>**NOTE**  
Check your version of the EKS to make sure that the you have the correct autoscaler version for it.

### Step 3: (Optional) Configure overprovisioning with Cluster Autoscaler

For details, see the [FAQ](
https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-configure-overprovisioning-with-cluster-autoscaler){:target="\_blank"}.

### Step 4: Install the Codefresh Runner with EBS support

1. Make sure to target the correct cluster:
```shell
kubectl config current-context
```
1. Create `values.yaml` with the EBS storage and the node groups from the `cluster.yaml`:
  * `storage.ebs.availabilityZone`: The zone in which to create your volumes. Must match the zone of the `dind` nodes.
  * `volumeProvisioner.nodeSelector`: (Optional) Assigns the volume-provisioner to the node group with the IAM role that can create EBS volumes.
  * `storage.ebs.encrypted`: (Optional) Set to `true` to use [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt){:target="\_blank"}.
  * `storage.ebs.kmsKeyId`: (Optional) The ARN of an existing key. Otherwise a key is generated by AWS.
```yaml
global:
  context: my-aws-runner
  runtimeName: my-aws-runner/cf

storage:
  backend: ebs
  ebs:
    volumeType: gp2
    availabilityZone: us-west-2a
    encrypted: "false"
    kmsKeyId: ""

volumeProvisioner:
  nodeSelector:
    node-type: addons

runtime:
  dind:
    nodeSelector:
      node-type: dind
    tolerations:
    - effect: NoSchedule
      key: codefresh.io
      operator: Equal
      value: dinds
    pvcs:
      dind:
        volumeSize: 30Gi
  engine:
    nodeSelector:
      node-type: engine
    tolerations:
    - effect: NoSchedule
      key: codefresh.io
      operator: Equal
      value: engine
```
  For other ways to grant EBS permissions to the volume-provisioner, such as IRSA or the `ebs-csi` backend, see [EBS backend volume configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#ebs-backend-volume-configuration){:target="\_blank"} in ArtifactHub.
1. Install the chart:
```shell
helm upgrade --install cf-runtime oci://quay.io/codefresh/cf-runtime -f values.yaml --create-namespace --namespace cf
```

You have completed installing the Codefresh Runner on an EKS cluster. You can try running a pipeline on the runtime environment `my-aws-runner/cf`.

## Install Codefresh Runner on Azure Kubernetes Service (AKS)

<!--- retain until Mikhail adds to ArtifactHub -->


**Prerequisites**  

* Volume provisioner (`dind-volume-provisioner`) with permissions to create/delete/get Azure Disks

* Minimal IAM role for `dind-volume-provisioner: <br />
`dind-volume-provisioner-role.json`
```json
{
    "Name": "CodefreshDindVolumeProvisioner",
    "Description": "Perform create/delete/get disks",
    "IsCustom": true,
    "Actions": [
        "Microsoft.Compute/disks/read",
        "Microsoft.Compute/disks/write",
        "Microsoft.Compute/disks/delete"

    ],
    "AssignableScopes": ["/subscriptions/<your-subsripton_id>"]
}
```
**How to**  
 
1. If you use AKS with managed [identities for node group](https://docs.microsoft.com/en-us/azure/aks/use-managed-identity), you can run the script below to assign `CodefreshDindVolumeProvisioner` role to AKS node identity:  

```
export ROLE_DEFINITIN_FILE=dind-volume-provisioner-role.json
export SUBSCRIPTION_ID=$(az account show --query "id" | xargs echo )
export RESOURCE_GROUP=codefresh-rt1
export AKS_NAME=codefresh-rt1
export LOCATION=$(az aks show -g $RESOURCE_GROUP -n $AKS_NAME --query location | xargs echo)
export NODES_RESOURCE_GROUP=MC_${RESOURCE_GROUP}_${AKS_NAME}_${LOCATION}
export NODE_SERVICE_PRINCIPAL=$(az aks show -g $RESOURCE_GROUP -n $AKS_NAME --query identityProfile.kubeletidentity.objectId | xargs echo)

az role definition create --role-definition @${ROLE_DEFINITIN_FILE}
az role assignment create --assignee $NODE_SERVICE_PRINCIPAL --scope /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$NODES_RESOURCE_GROUP --role CodefreshDindVolumeProvisioner
```

{:start="2"}
1. Install Codefresh Runner with the Helm chart [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/charts/cf-runtime/values.yaml){:target="\_blank"}:

```
storage:
  backend: azuredisk
  azuredisk:
    skuName: Premium_LRS

volumeProvisioner:
  mountAzureJson: true
```

```
helm install cf-runtime cf-runtime/cf-runtime -f ./generated_values.yaml -f values.yaml --create-namespace --namespace codefresh 
```




## Troubleshooting

For troubleshooting information, refer to the [Knowledge Base]({{site.baseurl}}/docs/kb/troubleshooting/#runtimes){:target="\_blank"}.

## Related articles
[Codefresh platform deployment]({{site.baseurl}}/docs/installation/installation-options/)  
[Codefresh on-premises deployment]({{site.baseurl}}/docs/installation/on-premises/codefresh-on-prem/)  
[Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)  
