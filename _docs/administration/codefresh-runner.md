---
title: "Codefresh Runner"
description: "Run Codefresh pipelines on your private Kubernetes cluster"
group: administration
redirect_from:
  - /docs/enterprise/codefresh-runner/
toc: true
---

Install the Codefresh Runner on your Kubernetes cluster to run pipelines and access secure internal services without compromising on-premises security requirements. These pipelines run on your infrastructure, even behind the firewall, and keep code on your Kubernetes cluster secure.

As the Codefresh Runner is **not** dependent on any special dockershim features, any compliant container runtime is acceptable. The docker socket/daemon used by Codefresh pipelines is **NOT** the one on the host node (as it might not exist at all in the case of containerd or cri-o), but instead an internal docker daemon created/managed by the pipeline itself.




## System requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |  
| --------------         | --------------           |  
|Kubernetes cluster      | Server version 1.10 to 1.24. {::nomarkdown}<br><b>Tip</b>:  To check the server version, run:<br> <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl version --short</span>.{:/}|
|Node requirements| Disk space: 50 GB per node|
|Container runtime | Any compliant container runtime, as the runner is **not** dependent on any special dockershim features. {::nomarkdown}<br>Examples: <ul><li><a href="https://kubernetes.io/blog/2020/12/02/dockershim-faq" target="blank">Docker</a></li><li><a href="https://containerd.io/" target="blank">containerd</a></li><li><a href="https://cri-o.io/" target="blank">cri-o</a></li></ul> {:/} |
|CLI token | [Codefresh CLI token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions)|

## Codefresh Runner installation
Install the Runner from any workstation or laptop with access to the Kubernetes cluster running Codefresh builds, via `kubectl`.  The Codefresh Runner authenticates to your Codefresh account using the CLI token.  

>**Notes:** 
  You _must_ install the Codefresh Runner on _every cluster that runs Codefresh pipelines_.  
  The Runner is **not** needed in clusters used for _deployment_, as you can deploy applications on clusters without the Runner.   
  <br />
  Access to the Codefresh CLI is only needed when installing the Codefresh Runner. After installation, the Runner then authenticates on it own using the details provided. You don't need to install the Codefresh CLI on the cluster running Codefresh pipelines.

Use any of the following options to install the Codefresh Runner:
* [Install Codefresh Runner with CLI Wizard](#install-runner-with-cli-wizard)
* [Install Codefresh Runner with values file](#install-codefresh-runner-with-values-file)
* [Install Codefresh Runner with Helm](#install-codefresh-runner-with-helm)

If the Kubernetes cluster with the Codefresh Runner is behind a proxy server, [complete Runner installation](#complete-codefresh-runner-installation).

### Install Runner with CLI Wizard

<!--Questions: Add prereq to authenticate the CLI using the token and everything about the token -->


Access to the Codefresh CLI is only needed  during the Runner installation. After that, the Runner will authenticate on it own using the details provided. You do NOT need to install the Codefresh CLI on the cluster that is running Codefresh pipelines.  

During installation, you can see which API token will be used by the runner (if you don't provide one). The printed token includes the permissions used by the Runner to communicate with the Codefresh platform and run pipelines. If you save the token, even if or when you delete the deployment, you can use the same token to restore the Runner's permissions without having to re-install the Codefresh Runner.

>Generate your API Key from your [user settings page](https://g.codefresh.io/user/settings).



**Before you begin**  
Make sure you have a:  
* Codefresh account
* [Codefresh CLI token with *all scopes*]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions)

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
  `{API_KEY}` is the API key you generated.

1. Start the installation:
```shell
codefresh runner init --token <my-token> <--dry-run>
```
  where:  
  * `<my-token>` is required, and is the CLI token you created with the required scopes.
  * `<--dry-run>`is optional. When specified, after you answer the configuration prompts, does the following:  
    * Saves all the Kubernetes manifests used by the installer locally in the folder `./codefresh_manifests`. 
    * Checks the installation of the Agent. <!--- (ADD to check dry run agent install) should you do anything to complete installation after dry run?-->

1. Reply to the prompts as needed:

{% include image.html
  lightbox="true"
  file="/images/administration/runner/installation-wizard.png"
  url="/images/administration/runner/installation-wizard.png"
  alt="Codefresh Runner wizard"
  caption="Codefresh Runner wizard"
  max-width="100%"
    %}

  The Wizard also creates and runs a sample pipeline that you can see in your Codefresh UI.

  {% include image.html
  lightbox="true"
  file="/images/administration/runner/sample-pipeline.png"
  url="/images/administration/runner/sample-pipeline.png"
  alt="Codefresh Runner example pipeline"
  caption="Codefresh Runner example pipeline"
  max-width="90%"
    %}

  You have completed installing the Codefresh Runner with CLI Wizard. 


{:start="5"}
1. Optional. If the Kubernetes cluster with the Codefresh Runner is behind a proxy, continue with [Complete Codefresh Runner installation](#complete-codefresh-runner-installation). 
1. Optional. Verify your installation:

```shell
codefresh runner info
```

<br />
> Tip:  
  You can customize the installation by passing your own values in the `init` command.  
  To inspect all available options run `init` with the `--help` flag:

```shell
codefresh runner init --help
```

<br />

### Install Codefresh Runner with values file
Use [this example](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml){:target="\_blank"} as a starting point for your `values` file.  

1. To install the Codefresh Runner with a predefined values file, add the `--values` flag, followed by the name of the YAML file:
```shell
codefresh runner init --values values.yaml 
```
1. Optional. If the Codefresh Runner is installed behind a proxy, continue with [Complete Codefresh Runner installation](#complete-codefresh-runner-installation). 

<br />

### Install Codefresh Runner with Helm

Installing the Codefresh Runner with Helm requires you to first create a `generated_values.yaml` file, and pass the file as part of the Helm installation.
>You must create `generated_values.yaml` file for every installation of the Codefresh Runner.

**Before you begin**  
* [Download the Codefresh CLI and authenticate it with your Codefresh account](https://codefresh-io.github.io/cli/getting-started/){:target="\_blank"}  

**How to**  

1. Run the following command to create all the necessary entities in Codefresh:

    ```shell
    codefresh runner init --generate-helm-values-file --skip-cluster-test
    ```
   where:   
   * `--skip-cluster-test` is optional, and when specified, runs cluster acceptance tests.  

   The command:  
   * Creates the Runner Agent and the Runtime Environment in your Codefresh account. 
   * Creates a `generated_values.yaml` file in your current directory, which you will need to provide to the `helm install` command later. 
1. Install the Codefresh Runner:

    ```shell
    helm repo add cf-runtime https://chartmuseum.codefresh.io/cf-runtime
    
    helm install cf-runtime cf-runtime/cf-runtime -f ./generated_values.yaml --create-namespace --namespace codefresh
    ```
1. Optional. If the Codefresh Runner is installed behind a proxy, continue with [Complete Codefresh Runner installation](#complete-codefresh-runner-installation).  

<!--- what is this -->
For reference, have a look at the repository with the chart: [https://github.com/codefresh-io/venona/tree/release-1.0/.deploy/cf-runtime](https://github.com/codefresh-io/venona/tree/release-1.0/.deploy/cf-runtime).


```shell
codefresh runner execute-test-pipeline --runtime-name <runtime-name>
```
>**Note:**  
  The `runner init` command determines the configuration of the `engine` and `dind` components. <br />
  The `helm install` command controls the configuration of only the `runner`, `dind-volume-provisioner` and `lv-monitor` components.

<br />

### Complete Codefresh Runner installation

If the Kubernetes cluster with the Codefresh Runner is behind a proxy server without direct access to `g.codefresh.io`, there are additional steps to complete the Codefresh Runner installation process.

**Before you begin**  
Make sure you have [installed the Codefresh Runner](#codefresh-runner-installation) using any of the options

**How to**  
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
  * Check the MTU value for `docker0`. If the value is than the MTU value of `eth0` (sometimes the `docker0` MTU is 1500, while `eth0` MTU is 1440), change the `docker0` MTU value to be lower than the `eth0` MTU.  
  * To change the `docker0` MTU value, edit the `configmap` in the `codefresh-runtime` namespace:
```shell
kubectl edit cm codefresh-dind-config -n codefresh-runtime
```
 * Add this after one of the commas:
`\"mtu\":1440,`

## Post-installation configuration

After installation, configure the Kubernetes cluster with the Codefresh Runner to better match your environment and cloud provider.

### AWS backend volume configuration

For Codefresh Runners on [EKS](https://aws.amazon.com/eks/){:target=\_blank"}, or any other custom cluster in Amazon, such as kops for example, configure the Runner to work with EBS volumes to support [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/) during pipeline execution.

> The configuration assumes that you have installed the Runner with the default options: `codefresh runner init`

#### `dind-volume-provisioner` permissions
The `dind-volume-provisioner` deployment should have permissions to create/attach/detach/delete/get EBS volumes.  

There are three options for this:
* Run `dind-volume-provisioner` pod on the node/node-group with IAM role
* Mount K8s secret in [AWS credential format](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html): 
  * To ~/.aws/credentials 
  OR
  By passing the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as environment variables to the `dind-volume-provisioner` pod
* Use [AWS identity for Service Account](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) IAM role assigned to `volume-provisioner-runner` service account

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
<br />

#### Configuration 

1. Create Storage Class for EBS volumes:
  >Choose **one** of the Availability Zones (AZs)to be used for your pipeline builds. Multi AZ configuration is not supported.  

**Storage Class (gp2)**  
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
  **Storage Class (gp3)**  
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
1. Apply storage class manifest:
```shell
kubectl apply -f dind-ebs.yaml
```
1. Get the YAML representation of the runtime you just added:
  * Get a list of all available runtimes:
    ```shell
    codefresh get runtime-environments
    ```
  * Select the runtime you just added, and get its YAML representation:
```shell
codefresh get runtime-environments my-eks-cluster/codefresh -o yaml > runtime.yaml
```

1. Modify the YAML:
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
1. Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):
```shell
codefresh patch runtime-environment my-eks-cluster/codefresh -f runtime.yaml
```
1. If necessary, delete all existing PV (Persistent Volume) and PVC (Persistent Volume Claim ) objects that remain from the default local provisioner:
```
kubectl delete pvc -l codefresh-app=dind -n <your_runner_ns>
kubectl delete pv -l codefresh-app=dind -n <your_runner_ns>
```

<!--- what is this? -->
>You can define all these options above for clean Runner installation with [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml) file:

`values-ebs.yaml` example:

```yaml
### Storage parameter example for aws ebs disks
Storage:
  Backend: ebs
  AvailabilityZone: us-east-1d
  VolumeType: gp3
  #AwsAccessKeyId: ABCDF
  #AwsSecretAccessKey: ZYXWV
  Encrypted:  # encrypt volume, default is false
  VolumeProvisioner: 
    ServiceAccount:
      Annotations:
        eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT_ID>:role/<IAM_ROLE_NAME>
NodeSelector: topology.kubernetes.io/zone=us-east-1d
...
 Runtime:
   NodeSelector: # dind and engine pods node-selector (--build-node-selector)
     topology.kubernetes.io/zone: us-east-1d
```

```shell
codefresh runner init --values values-ebs.yaml --exec-demo-pipeline false --skip-cluster-integration true
```


### GKE (Google Kubernetes Engine) backend volume configuration



#### Local SSD storage configuration

Configure the Codefresh Runner to use local SSDs for your pipeline volumes:

[How-to: Configuring an existing Runtime Environment with Local SSDs (GKE only)](https://support.codefresh.io/hc/en-us/articles/360016652920-How-to-Configuring-an-existing-Runtime-Environment-with-Local-SSDs-GKE-only-)

<br />

#### GCE  disk storage configuration

**Prerequisites**  
The `dind-volume-provisioner` should have permissions to create/delete/get GCE disks.

There are three options to provide cloud credentials:

* Run `dind-volume-provisioner-runner` pod on a node with an IAM role which can create/delete/get GCE disks
* Create Google Service Account with `ComputeEngine.StorageAdmin` role, download its key in JSON format, and pass it to `codefresh runner init` with `--set-file=Storage.GooogleServiceAccount=/path/to/google-service-account.json`
* Use [Google Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to assign IAM role to `volume-provisioner-runner` service account

Notice that builds run in a single Availability Zone (AZ), so you must specify Availability Zone parameters.

**Configuration**  
[How-to: Configuring an existing Runtime Environment with GCE disks](https://support.codefresh.io/hc/en-us/articles/360016652900-How-to-Configuring-an-existing-Runtime-Environment-with-GCE-disks)

<br />

##### Using multiple Availability Zones

Currently, to support effective caching with GCE disks, the builds/pods need to be scheduled in a single AZ. Note that this is more related to a GCP limitation than a Codefresh Runner issue.

To use the Codefresh Runner on Kubernetes nodes running in multiple Availability Zones, check out our suggestions:

**Provision a new Kubernetes cluster that runs in a single AZ**
This is the preferred solution and avoids extra complexity. The cluster should be dedicated for usage with the Codefresh Runner. 

**Install Codefresh Runner in your multi-zone cluster and run it in the default Node Pool**  

You must specify:   
*  `--build-node-selector=<node-az-label>` (e.g.: `--build-node-selector=topology.kubernetes.io/zone=us-central1-c`)
OR  
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

**Install Codefresh Runner in your multi-zone cluster and run it with a dedicated Node Pool**    
Follow the instructions for the default Node Pool.  

**Install a Codefresh Runner for every Availability Zone**  
Install separate Codefresh Runners in each Availability Zone,  one for AZ A, and the other for AZ B, for example.  
This is technically viable, but to distribute the builds across the Codefresh Runner runtime environments, you must manually specify the runtime environment for the pipelines that don't use the default runtime environment.

For example, let's say Venona-zoneA is the default runtime environment, for the pipelines to run in Venona-zoneB,  modify their RE settings, and explicitly set Venona-zoneB as the one to use.

The Codefresh Runner does not currently support [Regional Persistent Disks](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/regional-pd){:target="\_blank"}.

### Configure internal registry mirror

You can configure your Codefresh Runner to use an internal registry as a mirror for any container images that are mentioned in your pipelines.

First set up an internal registry as described in [https://docs.docker.com/registry/recipes/mirror/](https://docs.docker.com/registry/recipes/mirror/).

Then locate the `codefresh-dind-config` config map in the namespace that houses the runner and edit it.

```shell
kubectl -n codefresh edit configmap codefresh-dind-config
```

Change the `data` field from:

```yaml
data:
  daemon.json: "{\n  \"hosts\": [ \"unix:///var/run/docker.sock\",\n             \"tcp://0.0.0.0:1300\"],\n
    \ \"storage-driver\": \"overlay2\",\n  \"tlsverify\": true,  \n  \"tls\": true,\n
    \ \"tlscacert\": \"/etc/ssl/cf-client/ca.pem\",\n  \"tlscert\": \"/etc/ssl/cf/server-cert.pem\",\n
    \ \"tlskey\": \"/etc/ssl/cf/server-key.pem\",\n  \"insecure-registries\" : [\"192.168.99.100:5000\"],\n
    \ \"metrics-addr\" : \"0.0.0.0:9323\",\n  \"experimental\" : true\n}\n"
```

to

```yaml
data:
  daemon.json: "{\n  \"hosts\": [ \"unix:///var/run/docker.sock\",\n             \"tcp://0.0.0.0:1300\"],\n
    \ \"storage-driver\": \"overlay2\",\n  \"tlsverify\": true,  \n  \"tls\": true,\n
    \ \"tlscacert\": \"/etc/ssl/cf-client/ca.pem\",\n  \"tlscert\": \"/etc/ssl/cf/server-cert.pem\",\n
    \ \"tlskey\": \"/etc/ssl/cf/server-key.pem\",\n  \"insecure-registries\" : [\"192.168.99.100:5000\"],\n
    \ \"registry-mirrors\": [ \"https://<my-docker-mirror-host>\" ], \n
    \ \"metrics-addr\" : \"0.0.0.0:9323\",\n  \"experimental\" : true\n}\n"
```

This adds the line `\ \"registry-mirrors\": [ \"https://<my-docker-mirror-host>\" ], \n` which contains a single registry to use as a mirror. Quit and Save by typing `:wq`.

Now any container image that is used in your pipeline and isn't fully qualified, will be pulled through the Docker registry that is configured as a mirror.

## View Codefresh Runner and runtime environments

Once installed, the Runner polls Codefresh every three seconds by default to automatically create all resources needed for running pipelines.<br />

* In the Codefresh UI, to see the cluster with the Runner, from the sidebar, select [Runtime Environments](https://g.codefresh.io/account-admin/account-conf/runtime-environments){:target="\_blank"}. 

<!-- for projectOne https://g.codefresh.io/account-admin/agents -->



{% include image.html
  lightbox="true"
  file="/images/administration/runner/runtime-environments.png"
  url="/images/administration/runner/runtime-environments.png"
  alt="Available runtime environments"
  caption="Available runtime environments"
  max-width="60%"
    %}

### Select a default runtime environment  

If you have multiple runtime environments, select the one to use as the default environment. The default runtime environment is used for all pipelines in the account. 

* From the list of [Runtime Environments](https://g.codefresh.io/account-admin/account-conf/runtime-environments){:target="\_blank"}, click the context menu of the runtime to set as the default.
* Select **Set as Default**. 


###  Override default runtime environment for a pipeline
Override the default runtime environment for a specific pipeline through the pipeline's [settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).  


{% include image.html
  lightbox="true"
  file="/images/administration/runner/environment-per-pipeline.png"
  url="/images/administration/runner/environment-per-pipeline.png"
  alt="Running a pipeline on a specific environment"
  caption="Running a pipeline on a specific environment"
  max-width="60%"
    %}

### Runner components and resources

Once installed, the Codefresh Runner is similar to any Kubernetes application, and you can monitor it using your existing tools.
Among the Runner components, only the `runner` pod persists within your cluster. Other components, such as the `engine`, exist for the duration of pipeline builds.

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

You can also list secrets, config-maps, logs, volumes, etc. for the Codefresh builds.

The Runner uses the following pods:

* `runner`: Picks tasks (builds) from the Codefresh API
* `engine`: Runs pipelines
* `dind`: Builds and uses Docker images
* `dind-volume-provisioner`: Provisions volumes (PVs) for `dind`
* `dind-lv-monitor`: Cleans **local** volumes

**CPU/Memory**

The following table shows the **minimum** resources for each Runner component:

{: .table .table-bordered .table-hover}
| Component         | CPU requests| RAM requests | Storage                  | Type | Always on |
| -------------- | --------------|------------- |-------------------------|-------|-------|
| `runner`        | 100m          | 100Mi        | Doesn't need PV         | Deployment   | Yes   |
| `engine`         | 100m          | 500Mi        | Doesn't need PV         | Pod   | No   |
| `dind`         | 400m          | 800Mi        | 16GB PV         | Pod   | No   |
| `dind-volume-provisioner`         | 300m          | 400Mi        | Doesn't need PV         | Deployment   | Yes   |
| `dind-lv-monitor`         | 300m          | 400Mi        | Doesn't need PV         | DaemonSet   | Yes   |

NOTES:  
Components that are always on consume resources all the time. Components that are not always on, only consume resources when pipelines are running. They are automatically both created and destroyed for each pipeline.

Node size and count depends entirely on how many pipelines you want to be “ready” for, and how many will use “burst” capacity:  
* Ready (nodes): Lower initialization time and faster build times.
* Burst (nodes): High initialization time and slower build times (not recommended).

>The size of your nodes directly relates to the size required for your pipelines and is thus dynamic. If you find that only a few large pipelines require larger nodes, you may want to have two Codefresh Runners associated with different node pools.


**Storage**

For the storage options needed by the `dind` pod, we suggest:

* [Local Volumes](https://kubernetes.io/docs/concepts/storage/volumes/#local){:target="\_blank"} `/var/lib/codefresh/dind-volumes` on the K8S nodes filesystem (**default**)
* [EBS](https://aws.amazon.com/ebs/){:target="\_blank"} in the case of AWS. See also the [notes](#installing-on-aws) about getting caching working.
* [Local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd){:target="\_blank"} or [GCE Disks](https://cloud.google.com/compute/docs/disks#pdspecs){:target="\_blank"} in the case of GCP. See [notes](#installing-on-google-kubernetes-engine) about configuration. 


**Networking Requirements**

* `dind`: Pod creates an internal network in the cluster to run all the pipeline steps; needs outgoing/egress access to Docker Hub and `quay.io`.
* `runner`: Pod needs outgoing/egress access to `g.codefresh.io`; needs network access to [app-proxy]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy) if installed.
* `engine`: Pod needs outgoing/egress access to `g.codefresh.io`, `*.firebaseio.com` and `quay.io`; needs network access to `dind` pod

All CNI providers/plugins are compatible with the runner components.

## Monitoring disk space in Codefresh Runner

Codefresh pipelines require disk space for:
  * [Pipeline Shared Volume]({{site.baseurl}}/docs/example-catalog/ci-examples/shared-volumes-between-builds/) (`/codefresh/volume`, implemented as [docker volume](https://docs.docker.com/storage/volumes/){:target="\_blank"})
  * Docker containers, both running and stopped
  * Docker images and cached layers

Codefresh offers two options to manage disk space and prevent out-of-space errors:  
* Use runtime cleaners on Docker images and volumes
* [Set the disk space per pipeline build volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/#runtime)

<!--- not sure where this fits in -->
To improve performance by using Docker cache and decreasing I/O rate, `volume-provisioner` can provision previously used disks with Docker images and pipeline volumes from previously run builds. 



### Types of runtime cleaners

Docker images and volumes must be cleaned on a regular basis.  

* [IN-DIND cleaner](https://github.com/codefresh-io/dind/tree/master/cleaner){:target="\_blank"}: Deletes extra Docker containers, volumes, and images in **dind pod**.
* [External volume cleaner](https://github.com/codefresh-io/runtime-cluster-monitor/blob/master/charts/cf-monitoring/templates/dind-volume-cleanup.yaml){:target="\_blank"}: Deletes unused **external** PVs (EBS, GCE/Azure disks).
* [Local volume cleaner](https://github.com/codefresh-io/dind-volume-utils/blob/master/local-volumes/lv-cleaner.sh){:target="\_blank"}: Deletes **local** volumes if node disk space is close to the threshold.


#### IN-DIND cleaner

**Purpose:** Removes unneeded *docker containers, images, volumes* inside Kubernetes volume mounted on the dind pod

**Where it runs:** Inside each dind pod as script

**Triggered by:** SIGTERM and also during the run when disk usage (cleaner-agent ) > 90% (configurable)

**Configured by:**  Environment Variables which can be set in Runtime Environment configuration

**Configuration/Logic:** [README.md](https://github.com/codefresh-io/dind/tree/master/cleaner#readme){:target="\_blank"}

Override `dockerDaemonScheduler.envVars` on Runtime Environment if necessary (the following are **defaults**):

```yaml
dockerDaemonScheduler:
  envVars:
    CLEAN_PERIOD_SECONDS: '21600' # launch clean if last clean was more than CLEAN_PERIOD_SECONDS seconds ago
    CLEAN_PERIOD_BUILDS: '5' # launch clean if last clean was more CLEAN_PERIOD_BUILDS builds since last build
    IMAGE_RETAIN_PERIOD: '14400' # do not delete docker images if they have events since current_timestamp - IMAGE_RETAIN_PERIOD
    VOLUMES_RETAIN_PERIOD: '14400' # do not delete docker volumes if they have events since current_timestamp - VOLUMES_RETAIN_PERIOD
    DISK_USAGE_THRESHOLD: '0.8' # launch clean based on current disk usage DISK_USAGE_THRESHOLD
    INODES_USAGE_THRESHOLD: '0.8' # launch clean based on current inodes usage INODES_USAGE_THRESHOLD
```



#### External volume cleaner

**Purpose:** Removes unused *kubernetes volumes and related backend volumes*

**Where it runs:** On Runtime Cluster as CronJob
(`kubectl get cronjobs -n codefresh -l app=dind-volume-cleanup`). Installed in case the Runner uses non-local volumes (`Storage.Backend != local`)

**Triggered by:** CronJob every 10min (configurable), part of [runtime-cluster-monitor](https://github.com/codefresh-io/runtime-cluster-monitor/blob/master/charts/cf-monitoring/templates/dind-volume-cleanup.yaml) and runner deployment

**Configuration:**

Set `codefresh.io/volume-retention` annotation on Runtime Environment:

```yaml
dockerDaemonScheduler:
  pvcs:
    dind:
      storageClassName: dind-ebs-volumes-runner-codefresh
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'
      volumeSize: 32Gi
      annotations:
        codefresh.io/volume-retention: 7d
```

Override environment variables for `dind-volume-cleanup` cronjob if necessary:

* `RETENTION_DAYS` (defaults to 4)
* `MOUNT_MIN` (defaults to 3)
* `PROVISIONED_BY` (defaults to `codefresh.io/dind-volume-provisioner`)

About *optional* `-m` argument:

* `dind-volume-cleanup` to clean volumes that were last used more than `RETENTION_DAYS` ago
* `dind-volume-cleanup-m` to clean volumes that were used more than a day ago, but mounted less than `MOUNT_MIN` times



#### Local volume cleaner

**Purpose:** Deletes local volumes when node disk space is close to the threshold

**Where it runs:** On each node on runtime cluster as DaemonSet `dind-lv-monitor`. Installed in case the Runner uses local volumes (`Storage.Backend == local`)

**Triggered by:** Disk space usage or node usage that exceeds thresholds (configurable)

**Configuration:**

Override environment variables for `dind-lv-monitor` daemonset if necessary:

* `VOLUME_PARENT_DIR` - default `/var/lib/codefresh/dind-volumes`
* `KB_USAGE_THRESHOLD` - default 80 (percentage)
* `INODE_USAGE_THRESHOLD` - default 80






## Codefresh Runner architecture

{% include image.html
  lightbox="true"
  file="/images/administration/runner/codefresh_runner.png"
  url="/images/administration/runner/codefresh_runner.png"
  alt="Codefresh Runner architecture overview"
  caption="Codefresh Runner architecture overview"
  max-width="100%"
    %}


1. [Runtime-Environment specification]({{site.baseurl}}/docs/administration/codefresh-runner/) defines engine and dind pods spec and PVC parameters.
2. Runner pod (Agent) pulls tasks (Builds) from Codefresh API every 3 seconds.
3. Once the agent receives build task (either Manual run build or Webhook triggered build) it calls k8s API to create engine/dind pods and PVC object.
4. Volume Provisioner listens for PVC events (create) and based on StorageClass definition it creates PV object with the corresponding underlying volume backend (ebs/gcedisk/local).
5. During the build, each step (clone/build/push/freestyle/composition) is represented as docker container inside dind (docker-in-docker) pod. Shared Volume (`/codefresh/volume`) is represented as docker volume and mounted to every step (docker containers). PV mount point inside dind pod is `/var/lib/docker`.
6. Engine pod controls dind pod. It deserializes pipeline yaml to docker API calls, terminates dind after build has been finished or per user request (sigterm).
7. `dind-lv-monitor` DaemonSet OR `dind-volume-cleanup` CronJob are part of [Runtime Cleaner]({{site.baseurl}}/docs/administration/codefresh-runner/#runtime-cleaners), `app-proxy` Deployment and Ingress are described in the [next section]({{site.baseurl}}/docs/administration/codefresh-runner/#app-proxy-installation), `monitor` Deployment is for [Kubernetes Dashboard]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/).

## Customized Codefresh Runner installations 


### App-Proxy installation

The App-Proxy is an **optional** component of the Runner, used mainly when the Git provider server is installed on-premises, behind the firewall.  

#### App-Proxy requirements

App-Proxy requires a Kubernetes cluster:

1. With the Codefresh Runner installed <!--- is this correct? -->
1. With an active [ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/){:target="\_blank"}
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
  file="/images/administration/runner/app-proxy-architecture.png"
  url="/images/administration/runner/app-proxy-architecture.png"
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




### Install multiple runtimes with a single Runner (agent)

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

### Install Codefresh Runner on Google Kubernetes Engine (GKE)

You can install the Codefresh Runner on [GKE](https://cloud.google.com/kubernetes-engine/){:target="\_blank"} Kubernetes cluster.  
Codefresh supports the following GKE configurations:
* [Install on GKE with local SSD](#install-on-gke-with-local-ssd)
* [Install Codefresh Runner on GKE with GCE disks and Google SA JSON key](#install-codefresh-runner-on-gke-with-gce-disks-and-google-sa-json-key)
* [Install Codefresh Runner on GKE with GCE disks with Workload Identity and IAM role](#install-codefresh-runner-on-gke-with-gce-disks-with-workload-identity-and-iam-role)

#### Common prerequsites

Before you start the installation, verify the following:  
* Make sure your user has `Kubernetes Engine Cluster Admin` role in Google console  
* Bind your user with `cluster-admin` Kubernetes cluster role. 

```shell
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
```

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


1. Create the `cluster.yaml` as in the example below (`my-eks-cluster.yaml`).

`my-eks-cluster.yaml`

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
Bottlerocket is an open source Linux based Operating System specifically built to run containers. It focuses on security, simplicity and easy updates via transactions. Find more information in the [official repository](https://github.com/bottlerocket-os/bottlerocket.  

To leverage [Bottlerocket-based nodes](https://aws.amazon.com/bottlerocket/){:target="\_blank"}:
* Specify the AMI Family using `amiFamily: Bottlerocket`
* Add these additional IAM Policies: 
  *  `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly` 
  *   `arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore`



#### Step 2: Install autoscaler on EKS cluster

Once the cluster is up and running, install the [cluster autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html){:target="\_blank"}:

Because we used IAM AddonPolicies `"autoScaler: true"` in the `cluster.yaml` file, everything is done automatically, and there is no need to create a separate IAM policy or add Auto Scaling group tags.

1. Deploy the cluster autoscaler:
```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```

1. Add the `cluster-autoscaler.kubernetes.io/safe-to-evict` annotation:
```shell
kubectl -n kube-system annotate deployment.apps/cluster-autoscaler cluster-autoscaler.kubernetes.io/safe-to-evict="false"
```
1. Edit the `cluster-autoscaler` container command:
```shell
kubectl -n kube-system edit deployment.apps/cluster-autoscaler
```
1. Do the following as in the example below:
  * Replace `<YOUR CLUSTER NAME>` with the name of the cluster `cluster.yaml`
  * Add the following options:
    `--balance-similar-node-groups`  
    `--skip-nodes-with-system-pods=false`

```yaml
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

1. Set the autoscaler version:
  If the version of the EKS cluster 1.15, the corresponding autoscaler version according to [https://github.com/kubernetes/autoscaler/releases](https://github.com/kubernetes/autoscaler/releases){:target="\_blank"} is 1.15.6.
```shell
kubectl -n kube-system set image deployment.apps/cluster-autoscaler cluster-autoscaler=us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler:v1.15.6
```

> Check your version of the EKS to make sure that the you have the correct autoscaler version for it.

#### Step 3: (Optional) Configure overprovisioning with Cluster Autoscaler

For details, see the [FAQ](
https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-configure-overprovisioning-with-cluster-autoscaler){:target="\_blank"}.

#### Step 4: Add an EKS cluster as Runner to the Codefresh platform with EBS support

1. Make sure target the correct cluster:
```shell
$ kubectl config current-context 
my-aws-runner
```

1. Install the Runner with additional options:
  * Specify the zone in which to create your volumes, for example: `--set-value=Storage.AvailabilityZone=us-west-2a`.
  * (Optional) To assign the volume-provisioner to a specific node, for example, a specific node group with an IAM role that can create EBS volumes, `--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons`.
  * To use [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt){:target="\_blank"}, add the custom value `--set-value=Storage.Encrypted=true`.
  * If you already have a key, add its ARN via `--set-value=Storage.KmsKeyId=<key id> value`. Otherwise a key is generated by AWS. 

Here is an example with _all_ the options configured:
<!--```shell
codefresh runner init \
--name my-aws-runner \
--kube-node-selector=topology.kubernetes.io/zone=us-west-2a \
--build-node-selector=topology.kubernetes.io/zone=us-west-2a \
--kube-namespace cf --kube-context-name my-aws-runner \
--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons \
--set-value=Storage.Backend=ebs \
--set-value=Storage.AvailabilityZone=us-west-2a -->
```

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

For descriptions of the other options, run `codefresh runner init --help` ([global parameter table](#customizing-the-wizard-installation)).

1. When the Wizard completes the installation, modify the runtime environment of `my-aws-runner` to specify the necessary toleration, nodeSelector and disk size:
  1. Run: 
```shell
codefresh get re --limit=100 my-aws-runner/cf -o yaml > my-runtime.yml
```
  1. Modify the file my-runtime.yml as shown below:
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

1. Apply changes.
```shell
codefresh patch re my-aws-runner/cf -f my-runtime.yml
```

You have completed installing the Codefresh Runner on an EKS cluster. You can try runing a pipeline on the runtime environment `my-aws-runner/cf`.



### Install Codefresh Runner on Rancher RKE 2.X

Installing Codefresh Runner on Rancher RKE 2.X includes these steps: 
[Step 1: Configure kubelet for Runner StorageClass](#step-1-configure-kubelet-for-runner-storageclass)  
[Step 2: Set kubeconfig user permissions](#step-2-set-kubeconfig-user-permissions)
[Step 3: Install the Runner](#step-3-install-the-runner)  
[Step 4: Update Runner Docker MTU](#step-4-update-runner-docker-mtu)  
[Step 5: Create the cluster integration](#step-5-create-the-cluster-integration)

#### Step 1: Configure kubelet for Runner StorageClass

Configure the cluster to allow the Runner's default `StorageClass` to create the persistent cache volume from local storage on each node. 

1. In the Rancher UI: 
  For Rancher v2.5.9 and earlier, drill into the target cluster, and then click **Edit Cluster** at the top-right.

{% include image.html
  lightbox="true"
  file="/images/administration/runner/rancher-cluster.png"
  url="/images/administration/runner/rancher-cluster.png"
  alt="Drill into your cluster and click Edit Cluster on the right"
  caption="Drill into your cluster and click Edit Cluster on the right"
  max-width="100%"
      %}

  For Rancher v2.6+ with the updated UI, open **Cluster Management** in the left panel, then click the three-dot menu near the corresponding cluster and select **Edit Config**.
  
  {% include image.html
  lightbox="true"
  file="/images/administration/runner/rancher-cluster-2.png"
  url="/images/administration/runner/rancher-cluster-2.png"
  alt="Click Edit Cluster on the right in your cluster list"
  caption="Click Edit Cluster on the right in your cluster list"
  max-width="100%"
      %}

{:start="2"}
1. On the edit cluster page, scroll down to the Cluster Options section, and click its **Edit as YAML** button
  
  {% include image.html
  lightbox="true"
  file="/images/administration/runner/rancher-edit-as-yaml.png"
  url="/images/administration/runner/rancher-edit-as-yaml.png"
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
  file="/images/administration/runner/rancher-kublet.png"
  url="/images/administration/runner/rancher-kublet.png"
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
  * To use your personal user account with `ClusterAdmin` privileges for the installation, continue from [Step 3: Install the Runner](step-3-install-the-runner).
  
1. In the Rancher UI do the following:

 {% include image.html lightbox="true" file="/images/administration/runner/rancher-security.png" url="/images/administration/runner/rancher-security.png" alt="Create a cluster admin user for Codefresh" caption="Create a cluster admin user for Codefresh" max-width="100%" %}

  * Click **Security** at the top, and then select **Users**.
  * Click **Add User**, and below Global Permissions, select **Restricted Administrstor**.
  * Log out of the Rancher UI, and then log back in as the new user.
  * Click your user icon at the top-right, and then choose **API & Keys**.
  * Click **Add Key**, and create a `kubeconfig` token with **Expires** set to **Never**.
  * Copy the Bearer Token field (combines Access Key and Secret Key).
  * Edit your `kubeconfig` and paste the Bearer Token you copied in the `token` field of your user.

     

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

By default, RKE nodes use the [Canal CNI](https://rancher.com/docs/rancher/v2.x/en/faq/networking/cni-providers/#canal){:target="\_blank"}, which combines elements of Flannel and Calico, and uses VXLAN encapsulation. The VXLAN encapsulation has a 50-byte overhead, and reduces the MTU of its virtual interfaces from the standard 1500 to 1450. For example, when running `ifconfig` on an RKE 2.5.5 node, you might see several interfaces like this.  Note the `MTU:1450`.

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

1.In the editor, update the **daemon.json** field, by adding `,\"mtu\":1440` before the final closing curley brace (highlighted in the example below).

 {% include image.html
  lightbox="true"
  file="/images/administration/runner/rancher-mtu.png"
  url="/images/administration/runner/rancher-mtu.png"
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

```shell
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

1. Install Codefresh Runner using one of these options:  
* CLI Wizard:  
```shell
codefresh runner init --set-value Storage.Backend=azuredisk --set Storage.VolumeProvisioner.MountAzureJson=true 
```
* [values-example.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml):  
```yaml
Storage:
  Backend: azuredisk
  VolumeProvisioner:
    MountAzureJson: true
```
```shell
codefresh runner init --values values-example.yaml 
```
* Helm chart [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/charts/cf-runtime/values.yaml):  
```yaml
storage:
  backend: azuredisk
  azuredisk:
    skuName: Premium_LRS

volumeProvisioner:
  mountAzureJson: true
```
```shell
helm install cf-runtime cf-runtime/cf-runtime -f ./generated_values.yaml -f values.yaml --create-namespace --namespace codefresh 
```

### Manually install Codefresh Runner

Manually install the Codefresh Runner on a single cluster with both the runtime and the agent:

```shell
kubectl create namespace codefresh
codefresh install agent --agent-kube-namespace codefresh --install-runtime
```

The Codefresh runner consists of the following:

* Runner: Gets tasks from the platform and executes them. You can install a single Runner per account that can handle multiple runtimes.
* Runtime: Includes the components for workflow execution:
  * Volume provisioner (`prefix dind-volume-provisioner-runner`):  Provisions volumes for `dind` pod
  * lv-monitor  (`prefix dind-lv-monitor-runner`): Daemonset that cleans volumes


You can monitor and  [using the runner](#using-the-codefresh-runner).

### Install monitoring component

If your cluster is located [behind the firewall]({{site.baseurl}}/docs/administration/behind-the-firewall/) you might want to use the runner monitoring component to get valuable information about the cluster resources to Codefresh, for example, to [Kubernetes](https://g.codefresh.io/kubernetes/services/){:target="\_blank"} and [Helm Releases](https://g.codefresh.io/helm/releases/releasesNew/){:target="\_blank"} dashboards.

To install the monitoring component:

```shell
codefresh runner init --install-monitor
```

> If you use `--install-monitor` with `--skip-cluster-integration` flag, the monitoring component _is not_ installed. To skip adding the cluster integration during the Runner installation, but still want to get the cluster resources to Codefresh dashboards, you can install the monitoring component separately:

```shell
codefresh install monitor --kube-context-name <CONTEXT> --kube-namespace <NAMESPACE> --cluster-id <CLUSTER_NAME> --token <TOKEN>
```

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










## Runtime environment specification

The following section describes the runtime environment specification and possible options to modify it.  
Notice that there are additional and hidden fields that are autogenerated by Codefresh that complete a full runtime spec. You can view and edit these fields only for [Codefresh On-Premises Installation]({{site.baseurl}}/docs/administration/codefresh-on-prem/)).

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

Below is an example of the default and basic runtime spec after you've installed the Runner: 

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

### Top level fields

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
| `image`       | string | Override default engine image |
| `imagePullPolicy`       | string | Override image pull policy (default `IfNotPresent`) |
| `type`       | string | `KubernetesPod` |
| `envVars`       | object | Override or add environment variables passed into the engine pod |
| `userEnvVars`       | object | Add external env var(s) to the pipeline. See [Custom Global Environment Variables]({{site.baseurl}}/docs/administration/codefresh-runner/#custom-global-environment-variables)  |
| `cluster`       | object | k8s related information (`namespace`, `serviceAccount`, `nodeSelector`) |
| `resources`       | object | Specify non-default `requests` and `limits` for engine pod |
| `tolerations`       | array | Add tolerations to engine pod |
| `annotations`       | object | Add custom annotations to engine pod (empty by default `{}`) |
| `labels`       | object | Add custom labels to engine pod (empty by default `{}`) |
| `dnsPolicy`       | string | Engine pod's [DNS policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy) |
| `dnsConfig`       | object | Engine pod's [DNS config](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config) |

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
| `envVars`       | object | Override or add environment variables passed into the dind pod. See [IN-DIND cleaner]({{site.baseurl}}/docs/administration/codefresh-runner/#cleaners)  |
| `userVolumeMounts` with `userVolumes`       | object | Add volume mounts to the pipeline See [Custom Volume Mounts]({{site.baseurl}}/docs/administration/codefresh-runner/#custom-volume-mounts) |
| `cluster`       | object | k8s related information (`namespace`, `serviceAccount`, `nodeSelector`) |
| `defaultDindResources`       | object | Override `requests` and `limits` for dind pod (defaults are `cpu: 400m` and `memory:800Mi` ) |
| `tolerations`       | array | Add tolerations to dind pod |
| `annotations`       | object | Add custom annotations to dind pod (empty by default `{}`) |
| `labels`       | object | Add custom labels to dind pod (empty by default `{}`) |
| `pvc`       | object | Override default storage configuration for PersistentVolumeClaim (PVC) with `storageClassName`, `volumeSize`, `reuseVolumeSelector`. See [Volume Reusage Policy]({{site.baseurl}}/docs/administration/codefresh-runner/#volume-reusage-policy)  |
| `dnsPolicy`       | string | Dind pod's [DNS policy](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-s-dns-policy) |
| `dnsConfig`       | object | Dind pod's [DNS config](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config) |

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

### Custom global environment variables
You can add your own environment variables to the runtime environment. All pipeline steps have access to the global variables. A typical example of such a variable would be a shared secret that you want to pass to the pipeline.

To the `runtimeScheduler` block, you can add an additional element with named `userEnvVars` that follows the same syntax as [secret/environment variables](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables){:target="\_blank"}.

`runtime.yaml`
{% highlight yaml %}
{% raw %}
...
runtimeScheduler:
  userEnvVars:
    - name: GITHUB_TOKEN
      valueFrom:
        secretKeyRef:
          name: github-token
          key: token
...
{% endraw %}
{% endhighlight %}

### Custom volume mounts
You can add your own volume mounts in the runtime environment, so that all pipeline steps have access to the same set of external files. A typical example of this scenario is when you want to make a set of SSL certificates available to all your pipelines. Rather than manually download the certificates for each pipeline, you can provide them centrally at the runtime level.

Under the `dockerDaemonScheduler` block you can add two additional elements with names `userVolumeMounts` and `userVolumes` (they follow the same syntax as normal k8s `volumes` and `volumeMounts`) and define your own global volumes.

`runtime.yaml`
{% highlight yaml %}
{% raw %}
...
dockerDaemonScheduler:
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
...
{% endraw %}
{% endhighlight %}

### Debug timeout duration

The default timeout for [debug mode]({{site.baseurl}}/docs/configure-ci-cd-pipeline/debugging-pipelines/) is 14 minutes, even if the user is actively working.  
To change the duration of the debugger for a runtime, you must update the Runtime Spec of that runtime with the `DEBUGGER_TIMEOUT` to the environment variable. The timeout is defined in minutes, so '30' corresponds to 30 minutes.

* Under `.runtimeScheduler`, add an `envVars` section
* Add `DEBUGGER_TIMEOUT` to `envVars` with the value you want.

```yaml
...
runtimeScheduler:
  envVars:
    DEBUGGER_TIMEOUT: '30'
...
```

### Volume reuse policy

Volume reuse behavior depends on the configuration for `reuseVolumeSelector` in the runtime environment spec.

The following options are available:

* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName'`  
  Determined PV can be used by **ANY** pipeline in the specified account (it's a **default** volume selector).  
  * Benefit: Fewer PVs, leading tolower cost. Since any PV can be used by any pipeline, the cluster needs to maintain/reserve fewer PVs in its PV pool for Codefresh.
  * Downside: Since the PV can be used by any pipeline, the PVs could have assets and info from different pipelines, reducing the probability of cache.
* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'`  
  Determined PV can be used only by a **single pipeline**.   
  Benfits: More probability of cache without "spam" from other pipelines. 
  Downside: More PVs to maintain and therefore higher costs 
* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id,io.codefresh.branch_name'`  
  Determined PV can be used only by **single pipeline AND single branch**.
* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id,trigger'`  
  Determined PV can be used only by **single pipeline AND single trigger**.


**To change volume selector:**

* Get runtime yaml spec.
* Below `dockerDaemonScheduler.pvcs.dind` block, specify `reuseVolumeSelector`:

```yaml
  pvcs:
    dind:
      volumeSize: 30Gi
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'
```


## ARM Builds

With the Codefresh Runner, you can run native ARM64v8 builds.

>**Note:**  
  You cannot run *both* amd64 and arm64 images within the same pipeline. As we do not support multi-architecture builds, and one pipeline can map only to one runtime, you can run either amd64 or arm64 within the same pipeline.

The following scenario is an example of how to set up ARM Runner on existing EKS cluster:

**Step 1: Preparing nodes**

1. Create new ARM nodegroup:

```shell
eksctl utils update-coredns --cluster <cluster-name>
eksctl utils update-kube-proxy --cluster <cluster-name> --approve
eksctl utils update-aws-node --cluster <cluster-name> --approve

eksctl create nodegroup \
--cluster <cluster-name> \
--region <region> \
--name <arm-ng> \
--node-type <a1.2xlarge> \
--nodes <3>\
--nodes-min <2>\
--nodes-max <4>\
--managed
```

1. Check nodes status:

```shell
kubectl get nodes -l kubernetes.io/arch=arm64
```

1. Also it's recommeded to label and taint the required ARM nodes:

```shell
kubectl taint nodes <node> arch=aarch64:NoSchedule
kubectl label nodes <node> arch=arm
```

**Step 2: Runner installation**

1. Use [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml) to inject `tolerations`, `kube-node-selector`, `build-node-selector` into the Runtime Environment spec.

`values-arm.yaml`

```yaml
...
Namespace: codefresh

### NodeSelector --kube-node-selector: controls runner and dind-volume-provisioner pods
NodeSelector: arch=arm

### Tolerations --tolerations: controls runner, dind-volume-provisioner and dind-lv-monitor
Tolerations: 
- key: arch
  operator: Equal
  value: aarch64
  effect: NoSchedule
...
########################################################
###                Codefresh Runtime                 ###
###                                                  ###
###         configure engine and dind pods           ###
########################################################
Runtime:
### NodeSelector --build-node-selector: controls engine and dind pods
  NodeSelector:
    arch: arm
### Tolerations for engine and dind pods
  tolerations: 
  - key: arch
    operator: Equal
    value: aarch64
    effect: NoSchedule  
...    
```

1. Install the Runner:

```shell
codefresh runner init --values values-arm.yaml --exec-demo-pipeline false --skip-cluster-integration true
```

**Step 3 - Post-installation fixes**

1. Change `engine` image version in Runtime Environment specification:

```shell
# get the latest engine ARM64 tag
curl -X GET "https://quay.io/api/v1/repository/codefresh/engine/tag/?limit=100" --silent | jq -r '.tags[].name' | grep "^1.*arm64$"
1.136.1-arm64
```

```shell
# get runtime spec
codefresh get re $RUNTIME_NAME -o yaml > runtime.yaml
```

1. Under `runtimeScheduler.image` change image tag:

```yaml
runtimeScheduler:
  image: 'quay.io/codefresh/engine:1.136.1-arm64'
```

```shell
# patch runtime spec
codefresh patch re -f runtime.yaml
```

1. For `local` storage patch `dind-lv-monitor-runner` DaemonSet and add `nodeSelector`:

```shell
kubectl edit ds dind-lv-monitor-runner
```

```yaml
    spec:
      nodeSelector:
        arch: arm
```

**Step 4 - Run Demo pipeline**

Run a modified version of the *CF_Runner_Demo* pipeline:

```yaml
version: '1.0'
stages:
  - test
steps:
  test:
    stage: test
    title: test
    image: 'arm64v8/alpine'
    commands:
      - echo hello Codefresh Runner!
```

## Uninstall Codefresh Runner

You amy want to uninstall the Codefresh Runner. 

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

## Troubleshooting

For troubleshooting refer to the [Knowledge Base](https://support.codefresh.io/hc/en-us/sections/4416999487762-Hybrid-Runner)

## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/administration/installation-security/)
* [Codefresh On-Premises]({{site.baseurl}}/docs/administration/codefresh-on-prem/)
* [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)
