---
title: "Codefresh Runner installation"
description: "Run Codefresh pipelines on your private Kubernetes cluster"
group: installation
redirect_from:
  - /docs/administration/codefresh-runner/
  - /docs/enterprise/codefresh-runner/
  - /docs/administration/codefresh-hybrid/
toc: true
---

Install the Codefresh Runner on your Kubernetes cluster to run pipelines and access secure internal services without compromising on-premises security requirements. These pipelines run on your infrastructure, even behind the firewall, and keep code on your Kubernetes cluster secure.

The Codefresh Runner does not rely on specific dockershim features. It can work with any container runtime that adheres to the standards. In Codefresh pipelines, the docker socket/daemon is an internal docker daemon created and managed by the pipeline itself. It is also distinct from the docker daemon on the host node, which may not even exist in cases where containerd or cri-o is used.
Review [Runner architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#codefresh-runner-architecture) and how the [Runner works Runner behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall/).

>**IMPORTANT**:
We have transitioned to a new Helm-based installation for the Codefresh Runner, which is now the default for all Runner installations.  
Existing installations, both CLI-based, and older Helm-based ones, we encourage you to transition to the new Helm installation.
The [CLI-based installation and configuration](#cli-based-codefresh-runner-installation) is considered legacy and will be deprecated in the coming months. 

>**Codefresh Runner with spot instances**:<br>
  Using spot instances can cause failures in Codefresh builds as they can be taken down without notice. If you require 100% availability, we do not recommend using spot instances.

After installing the Codefresh Runner, you can:
* View the Runner Agent and its Runtime Environments
* Runner components and resources
* Configure different aspects of the Runner
*  
## System requirements


{: .table .table-bordered .table-hover}
| Item                     | Requirement            |
| --------------         | --------------           |
|Kubernetes cluster      | Server version 1.21 to 1.27. {::nomarkdown}<br><b>Tip</b>:  To check the server version, run:<br> <code class="highlighter-rouge">kubectl version --short</code>.{:/}|
|Helm| 3.8.0 and higher|
|Container runtime | Any compliant container runtime, as the runner is **not** dependent on any special dockershim features. {::nomarkdown}<br>Examples: <ul><li><a href="https://kubernetes.io/blog/2020/12/02/dockershim-faq" target="blank">Docker</a></li><li><a href="https://containerd.io/" target="blank">containerd</a></li><li><a href="https://cri-o.io/" target="blank">cri-o</a></li></ul> {:/} |
|CLI API token | [Required scopes]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions)|





## Install Codefresh Runner with Helm


To install the Codefresh Runner, follow the [chart installation instructions](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#install-chart) in ArtifactHub.


**Existing installations**  
For existing Runner installations, either older Helm installations or CLI-based installations:  
Delete the existing `values` file and reinstall the Codefresh Runner with the new `values` file.

## Runner components and resources
<!--- to be removed from this page once Mikhail has added to Artifact Hub -->


Once installed, the Codefresh Runner is similar to any Kubernetes application, and you can monitor it using your existing tools.
Among the Runner components, only the `runner` pod persists within your cluster. Other components, such as the `engine`, exist for the duration of pipeline build.

To monitor the Runner, list the resources inside the namespace you chose during installation:


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

### CPU/Memory

The following table shows the **minimum** resources for each Runner component:


{: .table .table-bordered .table-hover}
| Component         | CPU requests| RAM requests | Storage                  | Type | Always on |
| -------------- | --------------|------------- |-------------------------|-------|-------|
| `runner`        | 100m          | 100Mi        | Doesn't need PV         | Deployment   | Yes   |
| `engine`         | 100m          | 500Mi        | Doesn't need PV         | Pod   | No   |
| `dind`         | 400m          | 800Mi        | 16GB PV         | Pod   | No   |
| `dind-volume-provisioner`         | 300m          | 400Mi        | Doesn't need PV         | Deployment   | Yes   |
| `dind-lv-monitor`         | 300m          | 400Mi        | Doesn't need PV         | DaemonSet   | Yes   |

  You have completed installing the Codefresh Runner with CLI Wizard.


>**NOTES**:  
Components that are always-on consume resources all the time. Components that are not always-on consume resources only when pipelines are running. Such resources are automatically both created and destroyed for each pipeline.


Node size and count depends entirely on how many pipelines you want to be “ready” for, and how many will use “burst” capacity:  
* Ready (nodes): Lower initialization time and faster build times.
* Burst (nodes): High initialization time and slower build times (not recommended).

{:start="5"}
1. Optional. If the Kubernetes cluster with the Codefresh Runner is behind a proxy, continue with [Complete Codefresh Runner installation](#complete-codefresh-runner-installation).
1. Optional. Verify your installation:


>**TIP**:  
The size of your nodes relates directly to the size required for your pipelines, and is thus dynamic. If you find that only a few large pipelines require larger nodes, you may want to have two Codefresh Runners associated with different node pools.



### Storage

For the storage options needed by the `dind` pod, we suggest:


* [Local Volumes](https://kubernetes.io/docs/concepts/storage/volumes/#local){:target="\_blank"} `/var/lib/codefresh/dind-volumes` on the K8S nodes filesystem (**default**)
* [EBS](https://aws.amazon.com/ebs/){:target="\_blank"} in the case of AWS. See also the [notes](#aws-backend-volume-configuration) about getting caching working.
* [Local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd){:target="\_blank"} or [GCE Disks](https://cloud.google.com/compute/docs/disks#pdspecs){:target="\_blank"} in the case of GCP. See [notes](#gke-google-kubernetes-engine-backend-volume-configuration) about configuration. 


### Networking Requirements

* `dind`: Pod creates an internal network in the cluster to run all the pipeline steps; needs outgoing/egress access to Docker Hub and `quay.io`.
* `runner`: Pod needs outgoing/egress access to `g.codefresh.io`; needs network access to [app-proxy](#app-proxy-installation) if installed.
* `engine`: Pod needs outgoing/egress access to `g.codefresh.io`, `*.firebaseio.com` and `quay.io`; needs network access to `dind` pod

All CNI providers/plugins are compatible with the runner components.

## Codefresh Runner Agents and Runtime Environments

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




## Codefresh Runner configuration
After you install the Codefresh Runner, review the [configuration](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#configuration){:target="\_blank"} options described in ArtifactHub:
* [EBS backend volume](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#ebs-backend-volume-configuration){:target="\_blank"}
* [Custom global environment variables](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#custom-global-environment-variables){:target="\_blank"}
* [Custom volume mounts](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#custom-volume-mounts){:target="\_blank"}
* [Volume reuse policy](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime#volume-reuse-policy){:target="\_blank"}







## Runtime Environment specifications

The section describes the specifications for the Runtime Environment.  

There are additional and hidden fields auto-generated by Codefresh that complete the specifications. You can view and edit these fields only for [Codefresh On-Premises installations]({{site.baseurl}}/docs/installation/codefresh-on-prem/).



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



### dockerDaemonScheduler fields (dind)

| Field name          | Type                  | Value |
| -------------- |-------------------------| -------------------------|
| `dindImage`       | string | Override default dind image |
| `type`       | string | `DindPodPvc` |
| `envVars`       | object | Override or add environment variables passed into the dind pod. See [IN-DIND cleaner](https://github.com/codefresh-io/dind/tree/master/cleaner){:target="\_blank"}  |
| `userVolumeMounts` with `userVolumes`       | object | Add volume mounts to the pipeline See [Custom Volume Mounts](#custom-volume-mounts) |
| `cluster`       | object | k8s related information (`namespace`, `serviceAccount`, `nodeSelector`) |
| `defaultDindResources`       | object | Override `requests` and `limits` for dind pod (defaults are `cpu: 400m` and `memory:800Mi`). For memory, use `Mi` (mebibytes); for CPU, use `m` (millicpu) |
| `tolerations`       | array | Add tolerations to dind pod |
| `annotations`       | object | Add custom annotations to dind pod (empty by default `{}`) |
| `labels`       | object | Add custom labels to dind pod (empty by default `{}`) |
| `pvc`       | object | Override default storage configuration for PersistentVolumeClaim (PVC) with `storageClassName`, `volumeSize`, `reuseVolumeSelector`. See [Volume reuse policy](#volume-reuse-policy)  |
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
If your builds are failing with `Failed to validate connection to Docker daemon; caused by Error: certificate has expired`, you can verify and if needed replace the expired certificates.  
See [Troubleshooting this error in ArtifactHub](https://artifacthub.io/packages/helm/codefresh-onprem/codefresh#error-failed-to-validate-connection-to-docker-daemon-caused-by-error-certificate-has-expired){:target="\_blank"}.

## CLI-based Codefresh Runner installation

>**LEGACY CONTENT**  
Please be aware that the content in this section, including installation and configuration, is _no longer actively updated_.  
We have transitioned to a [new Helm-based installation](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime){:target="\_blank"} for the Codefresh Runner. As a result, this content will be deprecated in the coming months. 

Access to the Codefresh CLI is only needed when installing the Codefresh Runner. After installation, the Runner authenticates on its own using the details provided. You don't need to install the Codefresh CLI on the cluster running Codefresh pipelines.

During installation, you can see which API token will be used by the Runner (if you don't provide one). The printed token includes the permissions used by the Runner to communicate with the Codefresh platform and run pipelines. If you save the token, even if or when you delete the deployment, you can use the same token to restore the Runner's permissions without having to re-install the Codefresh Runner.

If the Kubernetes cluster with the Codefresh Runner is behind a proxy server without direct access to `g.codefresh.io`, you need additional steps to complete the installation.


>**NOTE**:  
Only a Codefresh account administrator can install the Codefresh Runner. 

### Install Codefresh Runner through CLI Wizard

**Before you begin**  
Make sure you have a:  
* Codefresh account
* [API token with the required scopes to authenticate the CLI]({{site.baseurl}}/docs/administration/user-self-management/user-settings/#create-and-manage-api-keys) 

**How to**

1. Install the Codefresh CLI:
```shell
npm install -g codefresh
```
1. Authenticate the Codefresh CLI:
```shell
codefresh auth create-context --api-key {API_KEY}  
```
  where:  
  `{API_KEY}` is the API key you generated from [User Settings](https://g.codefresh.io/user/settings){:target="\_blank"}.

1. Start the installation:
```shell
codefresh runner init 
```
  >**TIP**:   
    To inspect all available options run `init` with the `--help` flag: `codefresh runner init --help`

{:start="4"}  
1. Follow the instructions in the CLI Wizard to complete the installation. 

{% include image.html
  lightbox="true"
  file="/images/runtime/runner/installation-wizard.png"
  url="/images/runtime/runner/installation-wizard.png"
  alt="Codefresh Runner wizard"
  caption="Codefresh Runner wizard"
  max-width="100%"
    %}

  The Wizard also creates and runs a sample pipeline that you can see in your Codefresh UI.

  {% include image.html
  lightbox="true"
  file="/images/runtime/runner/sample-pipeline.png"
  url="/images/runtime/runner/sample-pipeline.png"
  alt="Codefresh Runner example pipeline"
  caption="Codefresh Runner example pipeline"
  max-width="90%"
    %}



{:start="5"}
1. Optional. If the Kubernetes cluster with the Codefresh Runner is behind a proxy, do the following:
 {:start="1"}
  1. Run `kubectl edit deployment runner -n codefresh-runtime` and add the proxy variables:
```yaml
spec:
  containers:
  - env:
    - name: HTTP_PROXY
      value: http://<ip of proxy server>:port
    - name: HTTPS_PROXY
      value: http://<ip of proxy server>:port
    - name: http_proxy
      value: http://<ip of proxy server>:port
    - name: https_proxy
      value: http://<ip of proxy server>:port
    - name: no_proxy
      value: localhost,127.0.0.1,<local_ip_of_machine>
    - name: NO_PROXY
      value: localhost,127.0.0.1,<local_ip_of_machine>
```

  {:start="2"}
  1. Add the following variables to your `runtime.yaml`, both to the `runtimeScheduler:` and to the `dockerDaemonScheduler:` blocks, within the `envVars:` section:
```yaml
HTTP_PROXY: http://<ip of proxy server>:port
http_proxy: http://<ip of proxy server>:port
HTTPS_PROXY: http://<ip of proxy server>:port
https_proxy: http://<ip of proxy server>:port
No_proxy: localhost, 127.0.0.1, <local_ip_of_machine>
NO_PROXY: localhost, 127.0.0.1, <local_ip_of_machine>
```
  1. Add `.firebaseio.com` to the allowed-sites of the proxy server.
  1. Exec into the `dind` pod, and run `ifconfig`.  
  1. If the MTU value for `docker0` is _greater than or equal to_ the MTU value of `eth0` (sometimes the `docker0` MTU is 1500, while `eth0` MTU is 1440), change the `docker0` MTU value to be lower than the `eth0` MTU.  
      * To change the `docker0` MTU value, edit the `configmap` in the `codefresh-runtime` namespace:  `kubectl edit cm codefresh-dind-config -n codefresh-runtime`  
      * Add the string after one of the commas: `\"mtu\":1440,`

{:start="6"}
1. Optional. Verify your installation:

```shell
codefresh runner info
```


After installation, configure the Kubernetes cluster with the Codefresh Runner to better match your environment and cloud provider.

### AWS backend volume configuration

For Codefresh Runners on [EKS](https://aws.amazon.com/eks/){:target="\_blank"} or any other custom cluster in Amazon, such as kops for example, configure the Runner to work with EBS volumes to support [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/) during pipeline execution.

> The configuration assumes that you have installed the Runner with the default options: `codefresh runner init`

<br />

#### `dind-volume-provisioner` permissions
The `dind-volume-provisioner` deployment should have permissions to create/attach/detach/delete/get EBS volumes.  

There are three options for this:
1. Run `dind-volume-provisioner` pod on the node/node-group with IAM role
1. Mount K8s secret in [AWS credential format](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html){:target="\_blank"}: 
    To ~/.aws/credentials 
    OR  
    By passing the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables to the `dind-volume-provisioner` pod
1. Use [AWS identity for Service Account](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html){:target="\_blank"} IAM role assigned to `volume-provisioner-runner` service account


**Minimal policy for `dind-volume-provisioner`**  

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

#### Configuration 

**Step 1:** Create Storage Class for EBS volumes:
  >Choose **one** of the Availability Zones (AZs)to be used for your pipeline builds. Multi AZ configuration is not supported.  

  * **Storage Class (gp2)**

```yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: dind-ebs
### Specify name of provisioner
provisioner: codefresh.io/dind-volume-provisioner-runner-<-NAMESPACE-> # <---- rename <-NAMESPACE-> with the runner namespace
volumeBindingMode: Immediate
parameters:
  # ebs or ebs-csi
  volumeBackend: ebs
  # Valid zone
  AvailabilityZone: us-central1-a # <---- change it to your AZ
  #  gp2, gp3 or io1
  VolumeType: gp2
  # in case of io1 you can set iops
  # iops: 1000
  # ext4 or xfs (default to xfs, ensure that there is xfstools )
  fsType: xfs
```
  * **Storage Class (gp3)**

```yaml
kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: dind-ebs
### Specify name of provisioner
provisioner: codefresh.io/dind-volume-provisioner-runner-<-NAMESPACE-> # <---- rename <-NAMESPACE-> with the runner namespace
volumeBindingMode: Immediate
parameters:
  # ebs or ebs-csi
  volumeBackend: ebs
  # Valid zone
  AvailabilityZone: us-central1-a  # <---- change it to your AZ
  #  gp2, gp3 or io1
  VolumeType: gp3
  # ext4 or xfs (default to xfs, ensure that there is xfstools )
  fsType: xfs
  # I/O operations per second. Only effetive when gp3 volume type is specified.
  # Default value - 3000.
  # Max - 16,000
  iops: "5000"
  # Throughput in MiB/s. Only effective when gp3 volume type is specified.
  # Default value - 125.
  # Max - 1000.
  throughput: "500"
```
**Step 2:** Apply storage class manifest:
```shell
kubectl apply -f dind-ebs.yaml
```
**Step 3:** Get the YAML representation of the runtime you just added:
  * Get a list of all available runtimes:
```shell
codefresh get runtime-environments
```
  * Select the runtime you just added, and get its YAML representation:
```shell
codefresh get runtime-environments my-eks-cluster/codefresh -o yaml > runtime.yaml
```

**Step 4:** Modify the YAML:
  *  In `dockerDaemonScheduler.cluster`, add `nodeSelector: topology.kubernetes.io/zone: <your_az_here>`.
    > Make sure you define the same AZ you selected for Runtime Configuration.
  * Modify `pvcs.dind` to use the Storage Class you created above (`dind-ebs`).

  Here is an example of the `runtime.yaml` including the required updates:


```yaml
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
    nodeSelector:
      topology.kubernetes.io/zone: us-central1-a
    serviceAccount: codefresh-engine
  annotations: {}
  userAccess: true
  defaultDindResources:
    requests: ''
  pvcs:
    dind:
      volumeSize: 30Gi
      storageClassName: dind-ebs
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName'
extends:
  - system/default/hybrid/k8s_low_limits
description: '...'
accountId: 5f048d85eb107d52b16c53ea
```

**Step 5:** Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):

```shell
codefresh patch runtime-environment my-eks-cluster/codefresh -f runtime.yaml
```

**Step 6:**  If necessary, delete all existing PV (Persistent Volume) and PVC (Persistent Volume Claim ) objects that remain from the default local provisioner:

```
kubectl delete pvc -l codefresh-app=dind -n <your_runner_ns>
kubectl delete pv -l codefresh-app=dind -n <your_runner_ns>
```
**Step 7:** Restart the volume provisioner pod.





### GKE (Google Kubernetes Engine) backend volume configuration

GKE volume configuration includes:
* [Local SSD storage configuration](#local-ssd-storage-configuration)
* [GCE disk storage configuration](#gce-disk-storage-configuration)

<br />

#### Local SSD storage configuration

Configure the Codefresh Runner to use local SSDs for your pipeline volumes:

[How-to: Configuring an existing Runtime Environment with Local SSDs (GKE only)]({{site.baseurl}}/docs/kb/articles/config-re-gke-ssd){:target="\_blank"}

<br />

#### GCE  disk storage configuration

**Prerequisites**
The `dind-volume-provisioner` should have permissions to create/delete/get GCE disks.

There are three options to provide cloud credentials:

1. Run `dind-volume-provisioner-runner` pod on a node with an IAM role which can create/delete/get GCE disks
1. Create Google Service Account with `ComputeEngine.StorageAdmin` role, download its key in JSON format, and pass it to `codefresh runner init` with `--set-file=Storage.GooogleServiceAccount=/path/to/google-service-account.json`
1. Use [Google Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity){:target="\_blank"} to assign IAM role to `volume-provisioner-runner` service account

Notice that builds run in a single Availability Zone (AZ), so you must specify Availability Zone parameters.

**Configuration**
[How-to: Configuring an existing Runtime Environment with GCE disks]({{site.baseurl}}/docs/kb/articles/config-re-gke-gce-disk){:target="\_blank"}

<br />

##### Using multiple Availability Zones

Currently, to support effective caching with GCE disks, the builds/pods need to be scheduled in a single AZ. Note that this is more related to a GCP limitation than a Codefresh Runner issue.

To use the Codefresh Runner on Kubernetes nodes running in multiple Availability Zones, check out our suggestions:

**Provision a new Kubernetes cluster that runs in a single AZ**
This is the preferred solution and avoids extra complexity. The cluster should be dedicated for usage with the Codefresh Runner.

<br />

**Install Codefresh Runner in your multi-zone cluster and run it in the default Node Pool**

You must specify:
`--build-node-selector=<node-az-label>` (e.g.: `--build-node-selector=topology.kubernetes.io/zone=us-central1-c`)
OR
Do the following:
1. Modify the Runtime environment as below:
```shell
codefresh get re $RUNTIME_NAME -o yaml > re.yaml
```
1. Edit the yaml:
```yaml
version: 2
metadata:
  ...
runtimeScheduler:
  cluster:
    nodeSelector: #schedule engine pod onto a node whose labels match the nodeSelector
      topology.kubernetes.io/zone: us-central1-c
    ...
dockerDaemonScheduler:
  cluster:
    nodeSelector: #schedule dind pod onto a node whose labels match the nodeSelector
      topology.kubernetes.io/zone: us-central1-c
    ...
  pvcs:
    dind:
      ...
```
1. Apply changes with:
```shell
codefresh patch re -f re.yaml
```
<br />

**Install Codefresh Runner in your multi-zone cluster and run it with a dedicated Node Pool**
Follow the instructions for the default Node Pool.

**Install a Codefresh Runner for every Availability Zone**
Install separate Codefresh Runners in each Availability Zone,  one for AZ A, and the other for AZ B, for example.
This is technically viable, but to distribute the builds across the Codefresh Runner runtime environments, you must manually specify the runtime environment for the pipelines that don't use the default runtime environment.

For example, let's say Venona-zoneA is the default runtime environment, for the pipelines to run in Venona-zoneB,  modify their RE settings, and explicitly set Venona-zoneB as the one to use.

The Codefresh Runner does not currently support [Regional Persistent Disks](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/regional-pd){:target="\_blank"}.

### Configure internal registry mirror

You can configure your Codefresh Runner to use an internal registry as a mirror for any container images that are specified in your pipelines.

1. Set up an internal registry as described in [https://docs.docker.com/registry/recipes/mirror/](https://docs.docker.com/registry/recipes/mirror/){:target="\_blank"}.
1. Locate the `codefresh-dind-config` config map in the namespace that houses the Runner.
```shell
kubectl -n codefresh edit configmap codefresh-dind-config
```
1. Add the line `\ \"registry-mirrors\": [ \"https://<my-docker-mirror-host>\" ], \n` to define the single registry to use as a mirror to `data` after the `tlskey`:
```yaml
data:
  daemon.json: "{\n  \"hosts\": [ \"unix:///var/run/docker.sock\",\n             \"tcp://0.0.0.0:1300\"],\n
    \ \"storage-driver\": \"overlay2\",\n  \"tlsverify\": true,  \n  \"tls\": true,\n
    \ \"tlscacert\": \"/etc/ssl/cf-client/ca.pem\",\n  \"tlscert\": \"/etc/ssl/cf/server-cert.pem\",\n
    \ \"tlskey\": \"/etc/ssl/cf/server-key.pem\",\n  \"insecure-registries\" : [\"192.168.99.100:5000\"],\n
    \ \"registry-mirrors\": [ \"https://<my-docker-mirror-host>\" ], \n
    \ \"metrics-addr\" : \"0.0.0.0:9323\",\n  \"experimental\" : true\n}\n"
```
1. Save and quit by typing `:wq`.

Now any container image used in your pipeline and isn't fully qualified, will be pulled through the Docker registry that is configured as a mirror.

### Add custom labels to dind and engine pods
Add custom labels to your Engine and Dind pods in Runtime Environment (RE) by patching it.
{:start="1"}
1. Get the configuration of the RE and place it in a file named `runtime.yaml`.
  `codefresh get runtime-environments -o yaml <$RUNTIME_ENVIRONMENT> > runtime.yaml`
  where:
  `$RUNTIME_ENVIRONMENT` must be replaced with the name of your RE.
1. Edit the `dockerDaemonScheduler.labels` or `runtimeScheduler.labels` property of `runtime.yaml` to include the label, as in the example below.
  If the `dockerDaemonScheduler.labels` are not included in the RE configuration by default, add them.
```yaml
version: 1
metadata:
  [...]
runtimeScheduler:
  labels:
    my-custom-ENGINE-label: "true"
  cluster:
    [...]
dockerDaemonScheduler:
  cluster:
    [...]
  annotations: {}
  labels:
    my-custom-DIND-label: "true"
[...]
```
1. Patch the runtime environment:
  `codefresh patch re $RUNTIME_ENVIRONMENT -f runtime.yaml`
  where:
  `$RUNTIME_ENVIRONMENT` must be replaced with the name of your RE.

Once you have applied the patch, future builds will include the label preventing eviction.

### Install monitoring component


If your cluster is located [behind the firewall]({{site.baseurl}}/docs/installation/behind-the-firewall/), you can use the Runner's monitoring component to get valuable information about cluster resources to Codefresh dashboards. For example, to [Kubernetes](https://g.codefresh.io/kubernetes/services/){:target="\_blank"} and [Helm Releases](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"} dashboards.


You can install the monitoring component during Runner installation with cluster integration, or after Runner installation without cluster integration. 

#### Install _with_ cluster integration _during_ Runner install 
The cluster integration is created automatically during Runner installation. 
```shell
codefresh runner init --install-monitor
```
where:  
* `--install-monitor` is by default set to `true` and installs the monitoring component that makes valuable data on the cluster available to Codefresh.


#### Install _without_ cluster integration _after_ Runner install
If you defined the `--skip-cluster-integration` flag to skip cluster integration during Runner installation, then you cannot install the  monitoring component during the installation. Install the monitoring component separately after completing the Runner installation to get cluster resource information to the Codefresh dashboards. 



```shell
codefresh install monitor --kube-context-name <CONTEXT> --kube-namespace <NAMESPACE> --cluster-id <CLUSTER_NAME> --token <TOKEN>
```
where:  
* `<CONTEXT>`, `<NAMESPACE>`, '<CLUSTER_NAME>' are the context, namespace, and the name of the cluster to which install the monitoring component.
* `<TOKEN>`  is the token to authenticate to the cluster. 

### Injecting AWS ARN roles into the cluster

**Step 1** - Make sure the OIDC provider is connected to the cluster

See:

* [https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)
* [https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/)

**Step 2** - Create IAM role and policy as explained in [https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html](https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html)

Here, in addition to the policy explained, you need a Trust Relationship established between this role and the OIDC entity.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${ACCOUNT_ID}:oidc-provider/${OIDC_PROVIDER}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "${OIDC_PROVIDER}:sub": "system:serviceaccount:${CODEFRESH_NAMESPACE}:codefresh-engine"
        }
      }
    }
  ]
}
```

**Step 3** - Annotate the `codefresh-engine` Kubernetes Service Account in the namespace where the Codefresh Runner is installed with the proper IAM role.

```shell
kubectl annotate -n ${CODEFRESH_NAMESPACE} sa codefresh-engine eks.amazonaws.com/role-arn=${ROLE_ARN}
```

Once the annotation is added, you should see it when you describe the Service Account.

```shell
kubectl describe -n ${CODEFRESH_NAMESPACE} sa codefresh-engine

Name:                codefresh-engine
Namespace:           codefresh
Labels:              app=app-proxy
                     version=1.6.8
Annotations:         eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/Codefresh
Image pull secrets:  <none>
Mountable secrets:   codefresh-engine-token-msj8d
Tokens:              codefresh-engine-token-msj8d
Events:              <none>
```

**Step 4** - Using the AWS assumed role identity

After annotating the Service Account, run a pipeline to test the AWS resource access:

```yaml
RunAwsCli:
      title : Communication with AWS
      image : mesosphere/aws-cli
      stage: "build"
      commands :
         - apk update
         - apk add jq
         - env
         - cat /codefresh/volume/sensitive/.kube/web_id_token
         - aws sts assume-role-with-web-identity --role-arn $AWS_ROLE_ARN --role-session-name mh9test --web-identity-token file://$AWS_WEB_IDENTITY_TOKEN_FILE --duration-seconds 1000 > /tmp/irp-cred.txt
         - export AWS_ACCESS_KEY_ID="$(cat /tmp/irp-cred.txt | jq -r ".Credentials.AccessKeyId")"
         - export AWS_SECRET_ACCESS_KEY="$(cat /tmp/irp-cred.txt | jq -r ".Credentials.SecretAccessKey")"
         - export AWS_SESSION_TOKEN="$(cat /tmp/irp-cred.txt | jq -r ".Credentials.SessionToken")"
         - rm /tmp/irp-cred.txt
         - aws s3api get-object --bucket jags-cf-eks-pod-secrets-bucket --key  eks-pod2019-12-10-21-18-32-560931EEF8561BC4 getObjectNotWorks.txt
```

### Modify runtime
 
1. Get a list of all available runtimes:
```shell
codefresh get runtime-environments
#or
codefresh get re
```
1. Choose the runtime you want to inspect or modify, and get its yaml/json representation:
```shell
codefresh get re my-eks-cluster/codefresh -o yaml > runtime.yaml
#or
codefresh get re my-eks-cluster/codefresh -o json > runtime.json
```

1. Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/){:target="\_blank"}:
```shell
codefresh patch re my-eks-cluster/codefresh -f runtime.yaml
```

### Uninstall Codefresh Runner

You may want to uninstall the Codefresh Runner. 

>Uninstalling the Codefresh Runner does not affect pipelines. You continue to see existing pipelines and can create new pipelines.


* Run:

```shell
codefresh runner delete
```

* Answer the prompts as required.

To use the CLI, run:  (`--help` to see the available options):
```shell
codefresh runner delete --help
```



## Customized Codefresh Runner installations


### App-Proxy installation

The App-Proxy is an **optional** component of the Runner, used mainly when the Git provider server is installed on-premises, behind the firewall.

#### App-Proxy requirements

App-Proxy requires a Kubernetes cluster:

1. With the Codefresh Runner installed <!--- is this correct? -->
1. With an active [ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/){:target="\_blank"}.
  The ingress controller must allow incoming connections from the VPC/VPN where users are browsing the Codefresh UI.
  The ingress connection **must** have a hostname assigned for this route, and **must** be configured to perform SSL termination.

>Currently, App-Proxy is supported for both SaaS and on-prem versions of GitHub and GitLab, and Bitbucket Server.

#### Install App-Proxy

**On a Kubernetes cluster with existing Codefresh Runner**:

```shell
codefresh install app-proxy --host=<hostname-of-ingress>
```

**Install Codefresh Runner and App-Proxy**:

```shell
codefresh runner init --app-proxy --app-proxy-host=<hostname-of-ingress>
```
**Define the ingress class for App-Proxy**:

If you have multiple ingress controllers in the Kubernetes cluster, use the `--app-proxy-ingress-class` parameter to define which ingress will be used.
For additional security, to further limit the web browsers that can access the ingress, you can also define an allowlist of IPs/ranges. Check the documentation of your ingress controller for the exact details.

By default, the app-proxy ingress uses the path `hostname/app-proxy`. You can change that default by using the values file in the installation with the flag `--values values.yaml`.
See the `AppProxy` section in the example [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml#L231-L253){:target="\_blank"}.

```shell
codefresh install app-proxy --values values.yaml
```
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




### Install multiple runtimes with a single Runner (Agent)

>**DEPRECATED CONTENT**  
Please be aware that the content in this section is _no longer actively updated_.  
We have transitioned to a [new Helm-based installation](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime){:target="\_blank"} for the Codefresh Runner. As a result, this content will be deprecated in the coming months. 

Advanced users can install a single Codefresh Runner (agent) to manage multiple runtime environments.

>Note:
  Make sure the cluster on which the Runner (agent) is installed has network access to the other clusters in the runtime environments.

```shell
# 1. Create namespace for the agent:
kubectl create namespace codefresh-agent

# 2. Install the agent in the namespace ( give your agent a unique name as $NAME):
# Note down the token and use it in the second command.
codefresh create agent $NAME
codefresh install agent --token $TOKEN --kube-namespace codefresh-agent
codefresh get agents

# 3. Create namespace for the first runtime:
kubectl create namespace codefresh-runtime-1

# 4. Install the first runtime in the namespace
# 5. the runtime name is printed
codefresh install runtime --runtime-kube-namespace codefresh-runtime-1

# 6. Attach the first runtime to agent:
codefresh attach runtime --agent-name $AGENT_NAME --agent-kube-namespace codefresh-agent --runtime-name $RUNTIME_NAME --runtime-kube-namespace codefresh-runtime-1

# 7. Restart the runner pod in namespace `codefresh-agent`
kubectl delete pods $RUNNER_POD

# 8. Create namespace for the second runtime
kubectl create namespace codefresh-runtime-2

# 9. Install the second runtime on the namespace
codefresh install runtime --runtime-kube-namespace codefresh-runtime-2

# 10. Attach the second runtime to agent and restart the Venona pod automatically
codefresh attach runtime --agent-name $AGENT_NAME --agent-kube-namespace codefresh-agent --runtime-name $RUNTIME_NAME --runtime-kube-namespace codefresh-runtime-2 --restart-agent
```

### Install Codefresh Runner on Google Kubernetes Engine (GKE) CLI-based 

You can install the Codefresh Runner on [GKE](https://cloud.google.com/kubernetes-engine/){:target="\_blank"} Kubernetes cluster.
Codefresh supports the following GKE configurations:
* [Install on GKE with local SSD](#install-on-gke-with-local-ssd)
* [Install Codefresh Runner on GKE with GCE disks and Google SA JSON key](#install-codefresh-runner-on-gke-with-gce-disks-and-google-sa-json-key)
* [Install Codefresh Runner on GKE with GCE disks with Workload Identity and IAM role](#install-codefresh-runner-on-gke-with-gce-disks-with-workload-identity-and-iam-role)

#### Common prerequisites

Before you start the installation, verify the following:
* Make sure your user has `Kubernetes Engine Cluster Admin` role in Google console
* Bind your user with `cluster-admin` Kubernetes cluster role.

```shell
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
```
<br />

#### Install on GKE with local SSD

**Prerequisites**
[GKE cluster with local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd){:target="\_blank"}

**How to**

1. Run the CLI Wizard with these options:
```shell
codefresh runner init [options] --set-value=Storage.LocalVolumeParentDir=/mnt/disks/ssd0/codefresh-volumes \
                            --build-node-selector=cloud.google.com/gke-local-ssd=true
```

1. Based on the installation mode, edit the predfined  `values-example.yaml` values file or the generated Helm values file:
```yaml
...
### Storage parameters example for gke-local-ssd
 Storage:
   Backend: local
   LocalVolumeParentDir: /mnt/disks/ssd0/codefresh-volumes
 NodeSelector: cloud.google.com/gke-local-ssd=true
...
 Runtime:
   NodeSelector: # dind and engine pods node-selector (--build-node-selector)
     cloud.google.com/gke-local-ssd: "true"
...
```
```shell
codefresh runner init [options] --values values-example.yaml
```

<br />

#### Install Codefresh Runner on GKE with GCE disks and Google SA JSON key

**With the CLI Wizard:**

```shell
codefresh runner init [options] \
  --set-value=Storage.Backend=gcedisk \
  --set-value=Storage.AvailabilityZone=us-central1-c \
  --kube-node-selector=topology.kubernetes.io/zone=us-central1-c \
  --build-node-selector=topology.kubernetes.io/zone=us-central1-c \
  --set-file=Storage.GoogleServiceAccount=/path/to/google-service-account.json
```

**With the values `values-example.yaml` file:**
```yaml
...
### Storage parameter example for GCE disks
 Storage:
   Backend: gcedisk
   AvailabilityZone: us-central1-c
   GoogleServiceAccount: > #serviceAccount.json content
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
 NodeSelector: topology.kubernetes.io/zone=us-central1-c
...
 Runtime:
   NodeSelector: # dind and engine pods node-selector (--build-node-selector)
     topology.kubernetes.io/zone: us-central1-c
...
```
```shell
codefresh runner init [options] --values values-example.yaml
```
<br />

#### Install Codefresh Runner on GKE with GCE disks with Workload Identity and IAM role

**With the values `values-example.yaml` file:**

1. Configure the storage options for GCE disks as in the example below.
```yaml
...
### Storage parameter example for GCE disks
 Storage:
   Backend: gcedisk
   AvailabilityZone: us-central1-c
   VolumeProvisioner:
     ServiceAccount:
       Annotations: #annotation to the volume-provisioner service account, using the email address of the Google service account
         iam.gke.io/gcp-service-account: <GSA_NAME>@<PROJECT_ID>.iam.gserviceaccount.com
 NodeSelector: topology.kubernetes.io/zone=us-central1-c
...
 Runtime:
   NodeSelector: # dind and engine pods node-selector (--build-node-selector)
     topology.kubernetes.io/zone: us-central1-c
...
```
1. Install the Codefresh Runner with `values-example.yaml`:
```shell
codefresh runner init [options] --values values-example.yaml
```
1. Create the binding between Kubernetes service account and the Google service account:
```
export K8S_NAMESPACE=codefresh
export KSA_NAME=volume-provisioner-runner
export GSA_NAME=<google_sa_name>
export PROJECT_ID=<google_project_name>
gcloud iam service-accounts add-iam-policy-binding \
  --role roles/iam.workloadIdentityUser \
  --member "serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/${KSA_NAME}]" \
  ${GSA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```
<br />

###  Install Codefresh Runner on EKS


>**LEGACY CONTENT**  
Please be aware that the content in this section is _no longer receiving active updates_.  
We have transitioned to a [Helm-based installation](https://artifacthub.io/packages/helm/codefresh-runner/cf-runtime){:target="\_blank"} for the Codefresh Runner. As a result, this content will be deprecated in the coming months. 

Installing the Codefresh Runner on EKS includes:  
[Step 1: Create an EKS cluster](#step-1-create-an-eks-cluster)  
[Step 2: Install autoscaler on EKS cluster](#step-2-install-autoscaler-on-eks-cluster)  
[Step 3: (Optional) Configure overprovisioning with Cluster Autoscaler](#step-3-optional-configure-overprovisioning-with-cluster-autoscaler)  
[Step 4: Add an EKS cluster as Runner to the Codefresh platform with EBS support](#step-4-add-an-eks-cluster-as-runner-to-the-codefresh-platform-with-ebs-support)  



#### Step 1: Create an EKS cluster

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



#### Step 2: Install autoscaler on EKS cluster

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

> Check your version of the EKS to make sure that the you have the correct autoscaler version for it.

#### Step 3: (Optional) Configure overprovisioning with Cluster Autoscaler

For details, see the [FAQ](
https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-configure-overprovisioning-with-cluster-autoscaler){:target="\_blank"}.

#### Step 4: Add an EKS cluster as Runner to the Codefresh platform with EBS support

**How to**

* Make sure to target the correct cluster:

```shell
$ kubectl config current-context
my-aws-runner
```

* Install the Runner with additional options:
    * Specify the zone in which to create your volumes, for example: `--set-value=Storage.AvailabilityZone=us-west-2a`.
    * (Optional) To assign the volume-provisioner to a specific node, for example, a specific node group with an IAM role that can create EBS volumes, `--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons`.
    * To use [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt){:target="\_blank"}, add the custom value `--set-value=Storage.Encrypted=true`.
    * If you already have a key, add its ARN via `--set-value=Storage.KmsKeyId=<key id> value`. Otherwise a key is generated by AWS.

  Here is an example with _all_ the options configured:

```shell
codefresh runner init \
--name my-aws-runner \
--kube-node-selector=topology.kubernetes.io/zone=us-west-2a \
--build-node-selector=topology.kubernetes.io/zone=us-west-2a \
--kube-namespace cf --kube-context-name my-aws-runner \
--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons \
--set-value=Storage.Backend=ebs \
--set-value=Storage.AvailabilityZone=us-west-2a\
--set-value=Storage.Encrypted=[false|true] \
--set-value=Storage.KmsKeyId=<key id>
```
    For descriptions of the other options, run `codefresh runner init --help`.

* When the Wizard completes the installation, modify the runtime environment of `my-aws-runner` to specify the necessary toleration, nodeSelector and disk size:
    * Run:
```shell
codefresh get re --limit=100 my-aws-runner/cf -o yaml > my-runtime.yml
```
    * Modify the file `my-runtime.yml` as shown below:

```yaml
version: null
metadata:
  agent: true
  trial:
    endingAt: 1593596844167
    reason: Codefresh hybrid runtime
    started: 1592387244207
  name: my-aws-runner/cf
  changedBy: ivan-codefresh
  creationTime: '2020/06/17 09:47:24'
runtimeScheduler:
  cluster:
    clusterProvider:
      accountId: 5cb563d0506083262ba1f327
      selector: my-aws-runner
    namespace: cf
    nodeSelector:
      node-type: engine
  tolerations:
  - effect: NoSchedule
    key: codefresh.io
    operator: Equal
    value: engine
  annotations: {}
dockerDaemonScheduler:
  cluster:
    clusterProvider:
      accountId: 5cb563d0506083262ba1f327
      selector: my-aws-runner
    namespace: cf
    nodeSelector:
      node-type: dind
  annotations: {}
  defaultDindResources:
    requests: ''
  tolerations:
  - effect: NoSchedule
    key: codefresh.io
    operator: Equal
    value: dinds
  pvcs:
    dind:
      volumeSize: 30Gi
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName'
      storageClassName: dind-local-volumes-runner-cf
  userAccess: true
extends:
  - system/default/hybrid/k8s_low_limits
description: 'Runtime environment configure to cluster: my-aws-runner and namespace: cf'
accountId: 5cb563d0506083262ba1f327
```

* Apply changes.
```shell
codefresh patch re my-aws-runner/cf -f my-runtime.yml
```

You have completed installing the Codefresh Runner on an EKS cluster. You can try runing a pipeline on the runtime environment `my-aws-runner/cf`.



### Install Codefresh Runner on Rancher RKE 2.X


<!--- retain until validated -->

Installing Codefresh Runner on Rancher RKE 2.X includes these steps:  


* [Step 1: Configure kubelet for Runner StorageClass](#step-1-configure-kubelet-for-runner-storageclass)
* [Step 2: Set kubeconfig user permissions](#step-2-set-kubeconfig-user-permissions)
* [Step 3: Install the Runner](#step-3-install-the-runner)
* [Step 4: Update Runner Docker MTU](#step-4-update-runner-docker-mtu)
* [Step 5: Create the cluster integration](#step-5-create-the-cluster-integration)

#### Step 1: Configure kubelet for Runner StorageClass

Configure the cluster to allow the Runner's default `StorageClass` to create the persistent cache volume from local storage on each node.

1. In the Rancher UI:
  For Rancher v2.5.9 and earlier, drill into the target cluster, and then click **Edit Cluster** at the top-right.

{% include image.html
  lightbox="true"
  file="/images/runtime/runner/rancher-cluster.png"
  url="/images/runtime/runner/rancher-cluster.png"
  alt="Drill into your cluster and click Edit Cluster on the right"
  caption="Drill into your cluster and click Edit Cluster on the right"
  max-width="100%"
      %}


  For Rancher v2.6+ with the updated UI, open **Cluster Management** in the left panel, then click the three-dot menu near the corresponding cluster and select **Edit Config**.

  {% include image.html
  lightbox="true"
  file="/images/runtime/runner/rancher-cluster-2.png"
  url="/images/runtime/runner/rancher-cluster-2.png"
  alt="Click Edit Cluster on the right in your cluster list"
  caption="Click Edit Cluster on the right in your cluster list"
  max-width="100%"
      %}

{:start="2"}
1. On the edit cluster page, scroll down to the Cluster Options section, and click its **Edit as YAML** button

  {% include image.html
  lightbox="true"
  file="/images/runtime/runner/rancher-edit-as-yaml.png"
  url="/images/runtime/runner/rancher-edit-as-yaml.png"
  alt="Cluster Options -> Edit as YAML"
  caption="Cluster Options -> Edit as YAML"
  max-width="100%"
    %}

{:start="3"}
1. Edit the YAML to include an extra mount in the kubelet service:

```yaml
rancher_kubernetes_engine_config:
  ...
  services:
    ...
    kubelet:
      extra_binds:
        - '/var/lib/codefresh:/var/lib/codefresh:rshared'
```

{% include image.html
  lightbox="true"
  file="/images/runtime/runner/rancher-kublet.png"
  url="/images/runtime/runner/rancher-kublet.png"
  alt="Add volume to rancher_kubernetes_engine_config.services.kublet.extra_binds"
  caption="Add volume to rancher_kubernetes_engine_config.services.kublet.extra_binds"
  max-width="100%"
    %}

#### Step 2: Set kubeconfig user permissions

The user in your `kubeconfig` must be a `ClusterAdmin` to install the Runner.

There are two options to create a user:

* For your pipelines to connect to this cluster as a cluster admin, create a Codefresh user in the Rancher UI with a **non-expiring** `kubeconfig` token. This is the easiest way install Codefresh Runner.

* For your pipelines to connect to this cluster with fewer privileges, use your personal user account with `ClusterAdmin` privileges for the installation, and then create a Codefresh account with fewer privileges later.

<br />

1. Do one of the following:
  * To create a Codefresh user with `ClusterAdmin` rights in the Rancher, start from _step 2_.
  * To use your personal user account with `ClusterAdmin` privileges for the installation, continue from [Step 3: Install the Runner](#step-3-install-the-runner).

1. In the Rancher UI do the following:
  * Click **Security** at the top, and then select **Users**.
  * Click **Add User**, and below Global Permissions, select **Restricted Administrstor**.
  * Log out of the Rancher UI, and then log back in as the new user.
  * Click your user icon at the top-right, and then choose **API & Keys**.
  * Click **Add Key**, and create a `kubeconfig` token with **Expires** set to **Never**.
  * Copy the Bearer Token field (combines Access Key and Secret Key).
  * Edit your `kubeconfig` and paste the Bearer Token you copied in the `token` field of your user.

 {% include image.html lightbox="true" file="/images/runtime/runner/rancher-security.png" url="/images/runtime/runner/rancher-security.png" alt="Create a cluster admin user for Codefresh" caption="Create a cluster admin user for Codefresh" max-width="100%" %}


#### Step 3: Install the Runner

If you've created your `kubeconfig` in the Rancher UI, it includes an API endpoint that is not reachable internally from within the cluster. To work around this, the Runner should use Kubernetes' generic internal API endpoint. If your `kubeconfig` contains your personal user account, then you should also add the `--skip-cluster-integration` option.


1. Do one of the following
  * Install the Runner with a Codefresh user (`ClusterAdmin`, non-expiring token):
```shell
codefresh runner init \
  --set-value KubernetesHost=https://kubernetes.default.svc.cluster.local
```
  * Install the runner with your personal user account:
```shell
codefresh runner init \
  --set-value KubernetesHost=https://kubernetes.default.svc.cluster.local \
  --skip-cluster-integration
```
1. Answer the prompts to complete the installation.

#### Step 4: Update Runner Docker MTU

By default, RKE nodes use the [Canal CNI](https://rancher.com/docs/rancher/v2.x/en/faq/networking/cni-providers/#canal){:target="\_blank"}, which combines elements of Flannel and Calico, and uses VXLAN encapsulation. The VXLAN encapsulation has a 50-byte overhead, and reduces the MTU of its virtual interfaces from the standard 1500 to 1450.

For example, when running `ifconfig` on an RKE 2.5.5 node, you might see several interfaces like this.  Note the `MTU:1450`.

```shell
cali0f8ac592086 Link encap:Ethernet  HWaddr ee:ee:ee:ee:ee:ee
          inet6 addr: fe80::ecee:eeff:feee:eeee/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1450  Metric:1
          RX packets:11106 errors:0 dropped:0 overruns:0 frame:0
          TX packets:10908 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:922373 (922.3 KB)  TX bytes:9825590 (9.8 MB)
```

Reduce the Docker MTU used by the Runner's Docker in Docker (dind) pods to match this lower MTU:

1. Edit the `configmap` in the namespace where the Runner is installed:
  The example shows the edit command if you installed the Runner in the `codefresh` namespace
```shell
kubectl edit cm codefresh-dind-config -n codefresh
```
1. In the editor, update the **daemon.json** field, by adding `,\"mtu\":1440` before the final closing curley brace (highlighted in the example below).

 {% include image.html
  lightbox="true"
  file="/images/runtime/runner/rancher-mtu.png"
  url="/images/runtime/runner/rancher-mtu.png"
  alt="Update the runner's Docker MTU"
  caption="Update the runner's Docker MTU"
  max-width="100%"
    %}

#### Step 5: Create the cluster integration

If you installed the Runner with the `--skip-cluster-integration` option, then must add a Rancher cluster to your to your Kubernetes integrations.

* [Add a Rancher Cluster]({{site.baseurl}}/docs/integrations/kubernetes/#adding-a-rancher-cluster).

Once complete, you can go to the Codefresh UI and run a pipeline on the new runtime, including steps that deploy to the Kubernetes Integration.

#### Troubleshooting TLS Errors

Depending on your Rancher configuration, you may need to allow insecure HTTPS/TLS connections, by adding an environment variable to the Runner deployment.

* Edit the Runner deployment:
  The example below assumes that you installed the Runner in the `codefresh` namespace.

```shell
kubectl edit deploy runner -n codefresh
```

* In the editor, add this environment variable below `spec.containers.env[]`:

```yaml
- name: NODE_TLS_REJECT_UNAUTHORIZED
  value: "0"
```





### Install Codefresh Runner on Azure Kubernetes Service (AKS)

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
1. Install Codefresh Runner using one of these options:  
  **CLI Wizard:**    
```
codefresh runner init --set-value Storage.Backend=azuredisk --set Storage.VolumeProvisioner.MountAzureJson=true 
```

  **[values-example.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml){:target="\_blank"}:**   
```
Storage:
  Backend: azuredisk
  VolumeProvisioner:
    MountAzureJson: true
```
```shell
codefresh runner init --values values-example.yaml 
```
  **Helm chart [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/charts/cf-runtime/values.yaml){:target="\_blank"}:**   

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









### Note for ARM Builds



>**NOTE:**  
  You cannot run *both* amd64 and arm64 images within the same pipeline. As we do not support multi-architecture builds, and one pipeline can map only to one runtime, you can run either amd64 or arm64 within the same pipeline.



## Troubleshooting

For troubleshooting information, refer to the [Knowledge Base]({{site.baseurl}}/docs/kb/troubleshooting/#runtimes){:target="\_blank"}.

## Related articles

[Codefresh installation options]({{site.baseurl}}/docs/installation/installation-options/)  
[Codefresh On-Premises installation]({{site.baseurl}}/docs/installation/codefresh-on-prem/)  
[Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)  


