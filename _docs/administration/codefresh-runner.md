---
title: "Codefresh Runner"
description: "Run Codefresh pipelines on your private Kubernetes cluster"
group: administration
redirect_from:
  - /docs/enterprise/codefresh-runner/
toc: true
---

Install the Codefresh Runner on your Kubernetes cluster to run pipelines and access secure internal services without compromising on-premises security requirements. These pipelines run on your infrastructure, even behind the firewall, and keep code on your Kubernetes cluster secure.

[Skip to quick installation &#8594;](#installation-with-the-quick-start-wizard)

>**Note:** a runner installation is needed for each cluster _running_ Codefresh pipelines. A runner is **not** needed
in clusters used for _deployment_. It is possible to deploy applications on clusters other than the ones the runner is deployed on.

The installation process takes care of all runner components and other required resources (config-maps, secrets, volumes).

## Prerequisites

To use the Codefresh runner the following is required:

1. A Kubernetes cluster with outgoing internet access (for version later than 1.10). Each node should have 50GB disk size.
2. A container runtime, such as [docker](https://kubernetes.io/blog/2020/12/02/dockershim-faq/), [containerd](https://containerd.io/) or [cri-o](https://cri-o.io/). Note that the runner is **not** dependent on any special dockershim features, so any compliant container runtime is acceptable. The docker socket/daemon used by Codefresh pipelines is **NOT** the one on the host node (as it might not exist at all in the case of containerd or cri-o), but instead an internal docker daemon created/managed by the pipeline itself. 
3. A [Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) with the Hybrid feature enabled.
4. A [Codefresh CLI token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions) that will be used to authenticate your Codefresh account.

The runner can be installed from any workstation or laptop with access (i.e. via `kubectl`) to the Kubernetes cluster running Codefresh builds. The Codefresh runner will authenticate to your Codefresh account by using the Codefresh CLI token.

## Installation with the Quick-start Wizard

Install the Codefresh CLI

```shell
npm install -g codefresh
```

[Alternative install methods](https://codefresh-io.github.io/cli/installation/)

Authenticate the CLI

```shell
codefresh auth create-context --api-key {API_KEY}
```

You can obtain an API Key from your [user settings page](https://g.codefresh.io/user/settings).
>**Note:** Make sure when you generate the token used to authenticate with the CLI, you generate it with *all scopes*.

>**Note:** access to the Codefresh CLI is only needed once during the Runner installation. After that, the Runner will authenticate on it own using the details provided. You do NOT need to install the Codefresh CLI on the cluster that is running Codefresh pipelines.

Then run the wizard with the following command:

```shell
codefresh runner init
```

or

```shell
codefresh runner init --token <my-token>
```

Brefore proceeding with installation, the wizard asks you some basic questions.

{% include image.html
  lightbox="true"
  file="/images/administration/runner/installation-wizard.png"
  url="/images/administration/runner/installation-wizard.png"
  alt="Codefresh Runner wizard"
  caption="Codefresh Runner wizard"
  max-width="100%"
    %}

The wizard also creates and runs a sample pipeline that you can see in your Codefresh UI.

{% include image.html
  lightbox="true"
  file="/images/administration/runner/sample-pipeline.png"
  url="/images/administration/runner/sample-pipeline.png"
  alt="Codefresh Runner example pipeline"
  caption="Codefresh Runner example pipeline"
  max-width="90%"
    %}

That's it! You can now start using the Runner.

You can also verify your installation with:

```shell
codefresh runner info
```

During installation you can see which API token will be used by the runner (if you don't provide one). The printed token is used by the runner to talk to the Codefresh platform carrying permissions that allow the runner to run pipelines. If you save the token, it can later be used to restore the runner's permissions without creating a new runner installation, if the deployment is deleted.

**Customizing the Wizard Installation**

You can customize the wizard installation by passing your own values in the `init` command.
To inspect all available options run `init` with the `--help` flag:

```shell
codefresh runner init --help
```

**Inspecting the Manifests Before they are Installed**

If you want to see what manifests are used by the installation wizard you can supply the `--dry-run` parameter in the installation process.

```shell
codefresh runner init --dry-run
```

This will execute the wizard in a special mode that will not actually install anything in your cluster. After all configuration questions are asked, all Kubernetes manifests used by the installer will be instead saved locally in a folder `./codefresh_manifests`.

## Installing Codefresh Runner with values file

To install the Codefresh Runner with pre-defined values file use `--values` flag:

```shell
codefresh runner init --values values.yaml 
```

Use [this example](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml) as a starting point for your values file.

## Installing Codefresh Runner with Helm

To install the Codefresh Runner using Helm, follow these steps:

1. Download the Codefresh CLI and authenticate it with your Codefresh account. Click [here](https://codefresh-io.github.io/cli/getting-started/) for more detailed instructions.
2. Run the following command to create all of the necessary entities in Codefresh:

    ```shell
    codefresh runner init --generate-helm-values-file
    ```

   * This will not install anything on your cluster, except for running cluster acceptance tests, (which may be skipped using the `--skip-cluster-test` option).
   * This command will also generate a `generated_values.yaml` file in your current directory, which you will need to provide to the `helm install` command later.

3. Now run the following to complete the installation:

    ```shell
    helm repo add cf-runtime https://h.cfcr.io/codefresh-inc/runtime
    
    helm install cf-runtime cf-runtime/cf-runtime -f ./generated_values.yaml --create-namespace --namespace codefresh
    ```

4. At this point you should have a working Codefresh Runner. You can verify the installation by running:

    ```shell
    codefresh runner execute-test-pipeline --runtime-name <runtime-name>
    ```
>**Note!** <br />
Runtime components' (engine and dind) configuration is determined by the `runner init` command. <br />
The `helm install` command can only control the configuration of `runner`, `dind-volume-provisioner` and `lv-monitor` components.

## Using the Codefresh Runner

Once installed, the Runner is fully automated. It polls the Codefresh SAAS (by default every 3 seconds) on its own and automatically creates all resources needed for running pipelines.

Once installation is complete, you should see the cluster of the runner as a new [Runtime environment](https://g.codefresh.io/account-admin/account-conf/runtime-environments) in Codefresh in your *Account Settings*, in the respective tab.

{% include image.html
  lightbox="true"
  file="/images/administration/runner/runtime-environments.png"
  url="/images/administration/runner/runtime-environments.png"
  alt="Available runtime environments"
  caption="Available runtime environments"
  max-width="60%"
    %}

If you have multiple environments available, you can change the default (shown with a thin blue border) by clicking on the 3 dot menu on the right of each environment. The Codefresh runner installer comes with a `set-default` option that is automatically set by default in the new runtime environment.

You can even override the runtime environment for a specific pipeline by specifying in the respective section in the [pipeline settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).

{% include image.html
  lightbox="true"
  file="/images/administration/runner/environment-per-pipeline.png"
  url="/images/administration/runner/environment-per-pipeline.png"
  alt="Running a pipeline on a specific environment"
  caption="Running a pipeline on a specific environment"
  max-width="60%"
    %}

## Checking the Runner

Once installed, the runner is a normal Kubernetes application like all other applications. You can use your existing tools to monitor it.

Only the runner pod is long living inside your cluster. All other components (such as the engine) are short lived and exist only during pipeline builds.
You can always see what the Runner is doing by listing the resources inside the namespace you chose during installation:

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

In the same manner you can list secrets, config-maps, logs, volumes etc. for the Codefresh builds.

## Removing the Codefresh Runner

You can uninstall the Codefresh runner from your cluster by running:

```shell
codefresh runner delete
```

A wizard, similar to the installation wizard, will ask you questions regarding your cluster before finishing with the removal.

Like the installation wizard, you can pass the additional options in advance as command line parameters (see `--help` output):
```shell
codefresh runner delete --help
```

## System Requirements

Once installed the runner uses the following pods:

* `runner` - responsible for picking tasks (builds) from the Codefresh API
* `engine` - responsible for running pipelines
* `dind` - responsible for building and using Docker images
* `dind-volume-provisioner` - responsible for provisioning volumes (PV) for dind 
* `dind-lv-monitor` - responsible for cleaning **local** volumes

**CPU/Memory**

The following table shows **MINIMUM** resources for each component:

{: .table .table-bordered .table-hover}
| Component         | CPU requests| RAM requests | Storage                  | Type | Always on |
| -------------- | --------------|------------- |-------------------------|-------|-------|
| `runner`        | 100m          | 100Mi        | Doesn't need PV         | Deployment   | Yes   |
| `engine`         | 100m          | 500Mi        | Doesn't need PV         | Pod   | No   |
| `dind`         | 400m          | 800Mi        | 16GB PV         | Pod   | No   |
| `dind-volume-provisioner`         | 300m          | 400Mi        | Doesn't need PV         | Deployment   | Yes   |
| `dind-lv-monitor`         | 300m          | 400Mi        | Doesn't need PV         | DaemonSet   | Yes   |

Components that are always on consume resources all the time. Components that are not always on only consume resources when pipelines are running (they are created and destroyed automatically for each pipeline).

Node size and count will depend entirely on how many pipelines you want to be “ready” for and how many will use “burst” capacity.  

* Ready (nodes): Lower initialization time and faster build times.
* Burst (nodes): High initialization time and slower build times. (Not recommended)

The size of your nodes directly relates to the size required for your pipelines and thus it is dynamic.  If you find that only a few larger pipelines require larger nodes you may want to have two Codefresh Runners associated to different node pools.


**Storage**

For the storage options needed by the `dind` pod we suggest:

* [Local Volumes](https://kubernetes.io/docs/concepts/storage/volumes/#local) `/var/lib/codefresh/dind-volumes` on the K8S nodes filesystem (**default**)
* [EBS](https://aws.amazon.com/ebs/) in the case of AWS. See also the [notes](#installing-on-aws) about getting caching working.
* [Local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd) or [GCE Disks](https://cloud.google.com/compute/docs/disks#pdspecs) in the case of GCP. See [notes](#installing-on-google-kubernetes-engine) about configuration. 


**Networking Requirements**

* `dind` - this pod will create an internal network in the cluster to run all the pipeline steps; needs outgoing/egress access to Dockerhub and `quay.io`
* `runner` - this pod needs outgoing/egress access to `g.codefresh.io`; needs network access to [app-proxy]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy) (if app-proxy is used)
* `engine` - this pod needs outgoing/egress access to `g.codefresh.io`, `*.firebaseio.com` and `quay.io`; needs network access to `dind` pod

All CNI providers/plugins are compatible with the runner components.

## Runner architecture overview

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

## App Proxy installation

The App Proxy is an **optional** component of the runner that once installed:

* Enables you to automatically create webhooks for Git in the Codefresh UI (same as the SAAS experience)
* Sends commit status information back to your Git provider (same as the SAAS experience)
* Makes all Git Operations in the GUI work exactly like the SAAS installation of Codefresh

The requirements for the App proxy is a Kubernetes cluster that:

1. has already the Codefresh runner installed
1. has an active [ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/)
1. allows incoming connections from the VPC/VPN where users are browsing the Codefresh UI. The ingress connection **must** have a hostname assigned for this route and **must** be configured to perform SSL termination

>Currently the App-proxy works only for Github (SAAS and on-prem versions), Gitlab (SAAS and on-prem versions) and Bitbucket server.

Here is the architecture of the app-proxy:

{% include image.html
  lightbox="true"
  file="/images/administration/runner/app-proxy-architecture.png"
  url="/images/administration/runner/app-proxy-architecture.png"
  alt="How App Proxy and the Codefresh runner work together"
  caption="How App Proxy and the Codefresh runner work together"
  max-width="80%"
    %}

Basically when a Git GET operation takes place, the Codefresh UI will contact the app-proxy (if it is present) and it will route the request to the backing Git provider. The confidential Git information never leaves the firewall premises and the connection between the browser and the ingress is SSL/HTTPS.

The app-proxy has to work over HTTPS and by default it will use the ingress controller to do its SSL termination. Therefore, the ingress controller will need to be configured to perform SSL termination. Check the documentation of your ingress controller (for example [nginx ingress](https://kubernetes.github.io/ingress-nginx/examples/tls-termination/)). This means that the app-proxy does not compromise security in any way.

To install the app-proxy on a Kubernetes cluster that already has a Codefresh runner use the following command:

```shell
codefresh install app-proxy --host=<hostname-of-ingress>
```

If you want to install the Codefresh runner and app-proxy in a single command use the following:

```shell
codefresh runner init --app-proxy --app-proxy-host=<hostname-of-ingress> 
```

If you have multiple ingress controllers in the Kubernetes cluster you can use the `--app-proxy-ingress-class` parameter to define which ingress will be used. For additional security you can also define an allowlist for IPs/ranges that are allowed to use the ingress (to further limit the web browsers that can access the Ingress). Check the documentation of your ingress controller for the exact details.

By default the app-proxy ingress will use the path `hostname/app-proxy`. You can change that default by using the values file in the installation with the flag `--values values.yaml`.

See the `AppProxy` section in the example [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml#L231-L253).  

```shell
codefresh install app-proxy --values values.yaml
```

## Manual Installation of Runner Components

If you don't want to use the wizard, you can also install the components of the runner yourself.

The Codefresh runner consists of the following:

* Runner - responsible for getting tasks from the platform and executing them. One per account. Can handle multiple runtimes
* Runtime - the components that are responsible on runtime for the workflow execution :
  * Volume provisioner - (pod’s name prefix dind-volume-provisioner-runner) - responsible for volume provisioning for dind pod
  * lv-monitor - (pod’s name prefix dind-lv-monitor-runner) - daemonset - responsible for cleaning volumes

To install the runner on a single cluster with both the runtime and the agent, execute the following:

```shell
kubectl create namespace codefresh
codefresh install agent --agent-kube-namespace codefresh --install-runtime
```

You can then follow the instructions for [using the runner](#using-the-codefresh-runner).

### Installing Multiple runtimes with a Single Agent

It is also possible, for advanced users to install a single agent that can manage multiple runtime environments.

>NOTE: Please make sure that the cluster where the agent is installed has network access to the other clusters of the runtimes

```shell
# 1. Create namespace for the agent: 
kubectl create namespace codefresh-agent

# 2. Install the agent on the namespace ( give your agent a unique name as $NAME):
# Note down the token and use it in the second command.
codefresh create agent $NAME
codefresh install agent --token $TOKEN --kube-namespace codefresh-agent
codefresh get agents

# 3. Create namespace for the first runtime:
kubectl create namespace codefresh-runtime-1

# 4. Install the first runtime on the namespace
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

## Configuration Options

You can fine tune the installation of the runner to better match your environment and cloud provider.

### Installing on AWS

If you've installed the Codefresh runner on [EKS](https://aws.amazon.com/eks/) or any other custom cluster (e.g. with kops) in Amazon you need to configure it properly to work with EBS volumes in order to gain [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/).

> This section assumes you already installed the Runner with default options: `codefresh runner init`

**Prerequisites**

`dind-volume-provisioner` deployment should have permissions to create/attach/detach/delete/get ebs volumes.

There are 3 options:
* running `dind-volume-provisioniner` pod on the node (node-group) with iam role
* k8s secret with [aws credentials format](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) mounted to ~/.aws/credentials (or `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` env vars passed) to the `dind-volume-provisioniner` pod
* using [Aws Identity for Service Account](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) iam role assigned to `volume-provisioner-runner` service account

Minimal policy for `dind-volume-provisioner`:
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

Create Storage Class for EBS volumes:
>Choose **one** of the Availability Zones you want to be used for your pipeline builds. Multi AZ configuration is not supported.

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

Apply storage class manifest:
```shell
kubectl apply -f dind-ebs.yaml
```

Change your [runtime environment]({{site.baseurl}}/docs/administration/codefresh-runner/#full-runtime-environment-specification) configuration:

The same AZ you selected before should be used in nodeSelector inside Runtime Configuration:

To get a list of all available runtimes execute:

```shell
codefresh get runtime-environments
```

Choose the runtime you have just added and get its yaml representation:

```shell
codefresh get runtime-environments my-eks-cluster/codefresh -o yaml > runtime.yaml
```

 Under `dockerDaemonScheduler.cluster` block add the nodeSelector `topology.kubernetes.io/zone: <your_az_here>`. It should be at the same level as `clusterProvider` and `namespace`. Also, the `pvcs.dind` block should be modified to use the Storage Class you created above (`dind-ebs`).

`runtime.yaml` example:

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

Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):

```shell
codefresh patch runtime-environment my-eks-cluster/codefresh -f runtime.yaml
```

If necessary, delete all existing PV and PVC objects left from default local provisioner:
```
kubectl delete pvc -l codefresh-app=dind -n <your_runner_ns>
kubectl delete pv -l codefresh-app=dind -n <your_runner_ns>
```

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

### Installing to EKS with Autoscaling

#### Step 1-  EKS Cluster Creation

See below is a content of cluster.yaml file. We define separate node pools for dind, engine and other services(like runner, cluster-autoscaler etc).

Before creating the cluster we have created two separate IAM policies:

* one for our volume-provisioner controller(policy/runner-ebs) that should create and delete volumes
* one for dind pods(policy/dind-ebs) that should be able to attach/detach those volumes to the appropriate nodes using [iam attachPolicyARNs options](https://eksctl.io/usage/iam-policies/).

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

Execute:

```shell
eksctl create cluster -f my-eks-cluster.yaml
```

The config above will leverage [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/) as the default operating system for the nodes in the nodegroup.  To leverage [Bottlerocket-based nodes](https://aws.amazon.com/bottlerocket/), specify the AMI Family using `amiFamily: Bottlerocket` and add the following additional IAM Policies: `arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly` and `arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore`.

>Bottlerocket is an open source Linux based Operating System specifically built to run containers. It focuses on security, simplicity and easy updates via transactions. Find more information in the [official repository](https://github.com/bottlerocket-os/bottlerocket).

#### Step 2 - Autoscaler

Once the cluster is up and running we need to install the [cluster autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html):

We used iam AddonPolicies `"autoScaler: true"` in the cluster.yaml file so there is no need to create a separate IAM policy or add Auto Scaling group tags, everything is done automatically.

Deploy the Cluster Autoscaler:

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```

Add the `cluster-autoscaler.kubernetes.io/safe-to-evict` annotation

```shell
kubectl -n kube-system annotate deployment.apps/cluster-autoscaler cluster-autoscaler.kubernetes.io/safe-to-evict="false"
```

Edit the cluster-autoscaler container command to replace `<YOUR CLUSTER NAME>` with *my-eks*(name of the cluster from cluster.yaml file), and add the following options:
    `--balance-similar-node-groups` and    `--skip-nodes-with-system-pods=false`

```shell
kubectl -n kube-system edit deployment.apps/cluster-autoscaler
```

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

We created our EKS cluster with 1.15 version so the appropriate cluster autoscaler version from [https://github.com/kubernetes/autoscaler/releases](https://github.com/kubernetes/autoscaler/releases) is 1.15.6

```shell
kubectl -n kube-system set image deployment.apps/cluster-autoscaler cluster-autoscaler=us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler:v1.15.6
```

Check your own version to make sure that the autoscaler version is appropriate.

#### Step 3 -  Optional: We also advise to configure overprovisioning with Cluster Autoscaler

See details at the [FAQ](
https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-configure-overprovisioning-with-cluster-autoscaler).

#### Step 4 -  Adding an EKS cluster as a runner to the Codefresh platform with EBS support

Make sure that you are targeting the correct cluster

```shell
$ kubectl config current-context 
my-aws-runner
```

Install the runner passing additional options:

```shell
codefresh runner init \
--name my-aws-runner \
--kube-node-selector=topology.kubernetes.io/zone=us-west-2a \
--build-node-selector=topology.kubernetes.io/zone=us-west-2a \
--kube-namespace cf --kube-context-name my-aws-runner \
--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons \
--set-value=Storage.Backend=ebs \
--set-value=Storage.AvailabilityZone=us-west-2a
```

* You should specify the zone in which you want your volumes to be created, example: `--set-value=Storage.AvailabilityZone=us-west-2a`
* (Optional) -  if you want to assign the volume-provisioner to a specific node, for example a specific node group what has an IAM role which allows to create EBS volumes, example: `--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons`

If you want to use [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt) (they are unencrypted by default) - add the custom value `--set-value=Storage.Encrypted=true`
If you already have a key - add its ARN via `--set-value=Storage.KmsKeyId=<key id> value`, otherwise a key is generated by AWS. Here is the full command:

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

For an explanation of all other options run `codefresh runner init --help` ([global parameter table](#customizing-the-wizard-installation)).

At this point the quick start wizard will start the installation.

Once that is done we need to modify the runtime environment of `my-aws-runner` to specify the necessary toleration, nodeSelector and disk size:

```shell
codefresh get re --limit=100 my-aws-runner/cf -o yaml > my-runtime.yml
```

Modify the file my-runtime.yml as shown below:

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

Apply changes.

```shell
codefresh patch re my-aws-runner/cf -f my-runtime.yml
```

That's all. Now you can go to UI and try to run a pipeline on RE my-aws-runner/cf

### Injecting AWS arn roles into the cluster

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

### Installing behind a proxy

If you want to deploy the Codefresh runner on a Kubernetes cluster that doesn’t have direct access to `g.codefresh.io`, and has to go trough a proxy server to access `g.codefresh.io`, you will need to follow these additional steps:

**Step 1** - Follow the installation instructions of the previous section

**Step 2** -  Run `kubectl edit deployment runner -n codefresh-runtime` and add the proxy variables like this

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

**Step 3** - Add the following variables to your runtime.yaml, both under the `runtimeScheduler:` and under `dockerDaemonScheduler:` blocks inside the `envVars:` section

```yaml
HTTP_PROXY: http://<ip of proxy server>:port
http_proxy: http://<ip of proxy server>:port
HTTPS_PROXY: http://<ip of proxy server>:port
https_proxy: http://<ip of proxy server>:port
No_proxy: localhost, 127.0.0.1, <local_ip_of_machine>
NO_PROXY: localhost, 127.0.0.1, <local_ip_of_machine>
```

**Step 4** -  Add `.firebaseio.com` to the allowed-sites of the proxy server

**Step 5** -  Exec into the `dind` pod and run `ifconfig`

If the MTU value for `docker0` is higher than the MTU value of `eth0` (sometimes the `docker0` MTU is 1500, while `eth0` MTU is 1440) - you need to change this, the `docker0` MTU should be lower than `eth0` MTU

To fix this, edit the configmap in the codefresh-runtime namespace:

```shell
kubectl edit cm codefresh-dind-config -n codefresh-runtime
```

And add this after one of the commas:
`\"mtu\":1440,`

### Installing on Rancher RKE 2.X

#### Step 1 - Configure the kubelet to work with the runner's StorageClass

The runner's default StorageClass creates the persistent cache volume from local storage on each node.  We need to edit the cluster config to allow this.

In the Rancher UI, drill into the target cluster and then click the Edit Cluster button at the top-right.
{% include image.html
  lightbox="true"
  file="/images/administration/runner/rancher-cluster.png"
  url="/images/administration/runner/rancher-cluster.png"
  alt="Drill into your cluster and click Edit Cluster on the right"
  caption="Drill into your cluster and click Edit Cluster on the right"
  max-width="100%"
      %}
On the edit cluster page, scroll down to the Cluster Options section and click its **Edit as YAML** button
{% include image.html
  lightbox="true"
  file="/images/administration/runner/rancher-edit-as-yaml.png"
  url="/images/administration/runner/rancher-edit-as-yaml.png"
  alt="Cluster Options -> Edit as YAML"
  caption="Cluster Options -> Edit as YAML"
  max-width="100%"
    %}
Edit the YAML to include an extra mount in the kubelet service:

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

#### Step 2 - Make sure your kubeconfig user is a ClusterAdmin

The user in your kubeconfig must be a cluster admin in order to install the runner. If you plan to have your pipelines connect to this cluster as a cluster admin, then you can go ahead and create a Codefresh user for this purpose in the Rancher UI with a **non-expiring** kubeconfig token. This is the easiest way to do the installation.

However, if you want your pipelines to connect to this cluster with less privileges, then you can use your personal user account with Cluster Admin privileges for the installation, and then we'll create a Codefresh account with lesser privileges later (in Step 5). In that case, you can now move on to Step 3.

Follow these steps to create a Codefresh user with Cluster Admin rights, from the Rancher UI:

* Click Security at the top, and then choose Users
    {% include image.html lightbox="true" file="/images/administration/runner/rancher-security.png" url="/images/administration/runner/rancher-security.png" alt="Create a cluster admin user for Codefresh" caption="Create a cluster admin ser for Codefresh" max-width="100%" %}
* Click the Add User button, and under Global Permissions check the box for **Restricted Administrstor**
* Log out of the Rancher UI, and then log back in as the new user
* Click your user icon at the top-right, and then choose **API & Keys**
* Click the **Add Key** button and create a kubeconfig token with Expires set to Never
* Copy the Bearer Token field (combines Access Key and Secret Key)
* Edit your kubeconfig and put the Bearer Token you copied in the `token` field of your user

#### Step 3 - Install the Runner

If you've created your kubeconfig from the Rancher UI, then it will contain an API endpoint that is not reachable internally, from within the cluster. To work around this, we need to tell the runner to instead use Kubernetes' generic internal API endpoint.  Also, if you didn't create a Codefresh user in step 2 and your kubeconfig contains your personal user account, then you should also add the `--skip-cluster-integration` option.

Install the runner with a Codefresh user (ClusterAdmin, non-expiring token):

```shell
codefresh runner init \
  --set-value KubernetesHost=https://kubernetes.default.svc.cluster.local
```

Or install the runner with your personal user account:

```shell
codefresh runner init \
  --set-value KubernetesHost=https://kubernetes.default.svc.cluster.local \
  --skip-cluster-integration
```

The wizard will then ask you some basic questions.

#### Step 4 - Update the runner's Docker MTU

By default, RKE nodes use the [Canal CNI](https://rancher.com/docs/rancher/v2.x/en/faq/networking/cni-providers/#canal), which combines elements of Flannel and Calico, and uses VXLAN encapsulation. This VXLAN encapsulation has a 50-byte overhead, thus reducing the MTU of its virtual interfaces from the standard 1500 to 1450. For example, when running `ifconfig` on an RKE 2.5.5 node, you might see several interfaces like this.  Note the `MTU:1450`.

```shell
cali0f8ac592086 Link encap:Ethernet  HWaddr ee:ee:ee:ee:ee:ee
          inet6 addr: fe80::ecee:eeff:feee:eeee/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1450  Metric:1
          RX packets:11106 errors:0 dropped:0 overruns:0 frame:0
          TX packets:10908 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:922373 (922.3 KB)  TX bytes:9825590 (9.8 MB)
```

We must reduce the Docker MTU used by the runner's Docker in Docker (dind) pods to fit within this lower MTU. This is stored in a configmap in the namespace where the runner is installed. Assuming that you installed the runner into the `codefresh` namespace, you would edit the configmap like this:

```shell
kubectl edit cm codefresh-dind-config -n codefresh
```

In the editor, update the **daemon.json** field - add `,\"mtu\":1440` just before the last curley brace.
 {% include image.html
  lightbox="true"
  file="/images/administration/runner/rancher-mtu.png"
  url="/images/administration/runner/rancher-mtu.png"
  alt="Update the runner's Docker MTU"
  caption="Update the runner's Docker MTU"
  max-width="100%"
    %}

#### Step 5 - Create the Cluster Integration

If you created a user in Step 2 and used it to install the runner in Step 3, then you can skip this step - your installation is complete!

However, if you installed the runner with the `--skip-cluster-integration` option then you should follow the documentaion to [Add a Rancher Cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/#adding-a-rancher-cluster) to your Kubernetes Integrations.

Once complete, you can go to the Codefresh UI and run a pipeline on the new runtime, including steps that deploy to the Kubernetes Integration.

#### Troubleshooting TLS Errors

Depending on your Rancher configuration, you may need to allow insecure HTTPS/TLS connections. You can do this by adding an environment variable to the runner deployment.

Assuming that you installed the runner into the `codefresh` namespace, you would edit the runner deployment like this:

```shell
kubectl edit deploy runner -n codefresh
```

In the editor, add this environment variable under spec.containers.env[]:

```yaml
- name: NODE_TLS_REJECT_UNAUTHORIZED
  value: "0"
```

### Installing on Google Kubernetes Engine

If you are installing Codefresh runner on the Kubernetes cluster on [GKE](https://cloud.google.com/kubernetes-engine/)

* make sure your user has `Kubernetes Engine Cluster Admin` role in google console and
* bind your user with `cluster-admin` Kubernetes cluster role.

```shell
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
```


#### Storage options on GKE

**Local SSD**

If you want to use  *LocalSSD* in GKE:

*Prerequisites:* [GKE cluster with local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd)

Install Runner with the Wizard:

```shell
codefresh runner init [options] --set-value=Storage.LocalVolumeParentDir=/mnt/disks/ssd0/codefresh-volumes \
                            --build-node-selector=cloud.google.com/gke-local-ssd=true
```

Or with `values-example.yaml` values file:

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

To configure existing Runner with Local SSDs follow this article:

[How-to: Configuring an existing Runtime Environment with Local SSDs (GKE only)](https://support.codefresh.io/hc/en-us/articles/360016652920-How-to-Configuring-an-existing-Runtime-Environment-with-Local-SSDs-GKE-only-)


**GCE Disks**

If you want to use  *GCE Disks*:

*Prerequisites:* volume provisioner (dind-volume-provisioner) should have permissions to create/delete/get GCE disks

There are 3 options to provide cloud credentials:

* run `dind-volume-provisioner-runner` pod on a node with IAM role which is allowed to create/delete/get GCE disks
* create Google Service Account with `ComputeEngine.StorageAdmin` role, download its key in JSON format and pass it to `codefresh runner init` with `--set-file=Storage.GooogleServiceAccount=/path/to/google-service-account.json`
* use [Google Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to assign IAM role to `volume-provisioner-runner` service account

Notice that builds will be running in a single availability zone, so you must specify AvailabilityZone parameters.


##### Runner installation with GCE Disks (Google SA JSON key)

Using the Wizard:

```shell
codefresh runner init [options] \
  --set-value=Storage.Backend=gcedisk \
  --set-value=Storage.AvailabilityZone=us-central1-c \
  --kube-node-selector=topology.kubernetes.io/zone=us-central1-c \
  --build-node-selector=topology.kubernetes.io/zone=us-central1-c \
  --set-file=Storage.GoogleServiceAccount=/path/to/google-service-account.json
```

Using the values `values-example.yaml` file:
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


##### Runner installation with GCE Disks (Workload Identity with IAM role)

Using the values `values-example.yaml` file:

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
```shell
codefresh runner init [options] --values values-example.yaml
```

Create the binding between Kubernetes service account and Google service account:

```shell
export K8S_NAMESPACE=codefresh
export KSA_NAME=volume-provisioner-runner
export GSA_NAME=<google_sa_name>
export PROJECT_ID=<google_project_name>

gcloud iam service-accounts add-iam-policy-binding \
  --role roles/iam.workloadIdentityUser \
  --member "serviceAccount:${PROJECT_ID}.svc.id.goog[${K8S_NAMESPACE}/${KSA_NAME}]" \
  ${GSA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com
```

To configure existing Runner with GCE Disks follow this article:

[How-to: Configuring an existing Runtime Environment with GCE disks](https://support.codefresh.io/hc/en-us/articles/360016652900-How-to-Configuring-an-existing-Runtime-Environment-with-GCE-disks)


##### Using multiple Availability Zones

Currently, to support effective caching with GCE disks, the builds/pods need to be scheduled in a single AZ (this is more related to a GCP limitation than a Codefresh runner issue).

If you have Kubernetes nodes running in multiple Availability Zones and wish to use the Codefresh runner we suggest the following:

**Option A** - Provision a new Kubernetes cluster: a cluster that runs in a single AZ only. - The cluster should be dedicated for usage with the Codefresh runner. This is the preferred solution and avoids extra complexity.

**Option B** - Install Codefresh runner in your multi-zone cluster, and let it run in the default Node Pool: - in this case, you must specify `--build-node-selector=<node-az-label>` (e.g.: `--build-node-selector=topology.kubernetes.io/zone=us-central1-c`) or simply modify the Runtime environment as below:

```shell
codefresh get re $RUNTIME_NAME -o yaml > re.yaml
```

Edit the yaml:

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

Apply changes with:

```shell
codefresh patch re -f re.yaml
```

**Option C** - Like option B, but with a dedicated Node Pool

**Option D** - Have 2 separate Codefresh runner Runtimes, one for zone A, and the other for zone B, and so on: this technically works, but it will require you to manually set the RE to use for the pipelines that won't use the default Codefresh runner RE. To distribute the pipeline's builds across the Codefresh runner REs.

For example, let's say Venona-zoneA is the default RE, then, that means that for the pipelines that you want to run in Venona-zoneB, then you'll need to modify their RE settings, and explicitly set Venona-zoneB as the one to use.

Regarding [Regional Persistent Disks](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/regional-pd), their support is not currently implemented in the Codefresh runner.


### Internal Registry Mirror

You can configure your Codefresh Runner to use an internal registry as a mirror for any container images that are mentioned in your pipelines.

First setup an internal registry as described in [https://docs.docker.com/registry/recipes/mirror/](https://docs.docker.com/registry/recipes/mirror/).

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


### Installing the monitoring component

If your cluster is located [behind the firewall](https://codefresh.io/docs/docs/administration/behind-the-firewall/) you might want to use the runner monitoring component to get valuable information about the cluster resources to Codefresh, for example, to [Kubernetes](https://g.codefresh.io/kubernetes/services/) and [Helm Releases](https://g.codefresh.io/helm/releases/releasesNew/) dashboards.

To install the monitoring component you can use `--install-monitor` flag in the `runner init` command:

```shell
codefresh runner init --install-monitor
```

Please note, that the monitoring component will not be installed if you use `--install-monitor` with `--skip-cluster-integration` flag. In case you want to skip adding the cluster integration during the runner installation, but still want to get the cluster resources to Codefresh dashboards, you can install the monitoring component separately:

```shell
codefresh install monitor --kube-context-name <CONTEXT> --kube-namespace <NAMESPACE> --cluster-id <CLUSTER_NAME> --token <TOKEN>
```



## Full runtime environment specification

The following section contains an explanation of runtime environment specification and possible options to modify it. Notice that there are additional and hidden fields that are autogenerated by Codefresh that complete a full runtime spec. You can't directly see or edit them (unless you run your own [Codefresh On-Premises Installation]({{site.baseurl}}/docs/administration/codefresh-on-prem/) )


To get a list of all available runtimes execute:
```shell
codefresh get runtime-environments
#or
codefresh get re
```

Choose the runtime that you want to inspect or modify and get its yaml/json representation:
```shell
codefresh get re my-eks-cluster/codefresh -o yaml > runtime.yaml
#or
codefresh get re my-eks-cluster/codefresh -o json > runtime.json
```

Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):
```shell
codefresh patch re my-eks-cluster/codefresh -f runtime.yaml
```

Below is the example for the default and basic runtime spec after you've installed the Runner: 

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
    spotinst.io/restrict-scale-down: "true"
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
    spotinst.io/restrict-scale-down: "true"
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

### Custom Global Environment Variables
You can add your own environment variables in the runtime environment, so that all pipeline steps will have access to it. A typical example would be a shared secret that you want to pass to the pipeline.

Under the `runtimeScheduler` block you can add an additional element with named `userEnvVars` that follows the same syntax as [secret/environment variables](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables).

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

### Custom Volume Mounts
You can add your own volume mounts in the runtime environment, so that all pipeline steps have access to the same set of external files. A typical example of this scenario is when you want to make a set of SSL certificates available to all your pipelines. Rather than manually download the certificates in each pipeline, you can provide them centrally on the runtime level.

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

### Debug Timeout Duration

The default timeout for [debug mode]({{site.baseurl}}/docs/configure-ci-cd-pipeline/debugging-pipelines/) is 14 minutes, and even if the user is actively working, it is still 14 minutes. To change the duration of the debugger, you will need to update your Runtime Spec for the runtime you would like to change. To change the default duration, you will need to add `DEBUGGER_TIMEOUT` to the environment variable. The value you pass is a string value that will define the timeout in minutes. For example, you can pass '30', which will be 30 minutes.

Under `.runtimeScheduler`, add an `envVars` section, then add `DEBUGGER_TIMEOUT` under `envVars` with the value you want.

```yaml
...
runtimeScheduler:
  envVars:
    DEBUGGER_TIMEOUT: '30'
...
```

### Volume Reusage Policy

The behavior of how the volumes are reused depends on volume selector configuration.
`reuseVolumeSelector` option is configurable in runtime environment spec.

The following options are available:

* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName'` - determined PV can be used by **ANY** pipeline of your account (it's a **default** volume selector).
* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'` - determined PV can be used only by a **single pipeline**.
* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id,io.codefresh.branch_name'` - determined PV can be used only by **single pipeline AND single branch**.
* `reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id,trigger'` - determined PV can be used only by **single pipeline AND single trigger**.

For approach `codefresh-app,io.codefresh.accountName`:

* Benefit: less PVs --> lower cost (since any PV can be used by any pipeline, then, the cluster would need to keep less PVs in its pool of PVs for Codefresh)
* Downside: since the PV can be used by any pipeline, then, the PVs could have assets and info from different pipelines, thus reducing the probability of cache,

For approach `codefresh-app,io.codefresh.accountName,pipeline_id`:

* Benefit: more probability of cache (no "spam" from other pipelines)
* Downside: more PVs to keep (higher cost)


To change volume selector get runtime yaml spec and under `dockerDaemonScheduler.pvcs.dind` block specify `reuseVolumeSelector`:

```yaml
  pvcs:
    dind:
      volumeSize: 30Gi
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'
```

## Runtime Cleaners

### Key points

* Codefresh pipelines require disk space for:
  * [Pipeline Shared Volume](https://codefresh.io/docs/docs/yaml-examples/examples/shared-volumes-between-builds/) (`/codefresh/volume`, implemented as [docker volume](https://docs.docker.com/storage/volumes/))
  * Docker containers - running and stopped
  * Docker images and cached layers
* To improve performance, `volume-provisioner` is able to provision previously used disk with docker images and pipeline volume from previously running builds. It improves performance by using docker cache and decreasing I/O rate.
* Least recently docker images and volumes should be cleaned to avoid out-of-space errors.
* There are several places where pipeline volume cleanup is required, so there are several kinds of cleaner.

### Cleaners

* [IN-DIND cleaner](https://github.com/codefresh-io/dind/tree/master/cleaner) - deletes extra docker containers, volumes, images in **dind pod**
* [External volumes cleaner](https://github.com/codefresh-io/runtime-cluster-monitor/blob/master/chart/templates/dind-volume-cleanup.yaml) - deletes unused **external** PVs (EBS, GCE/Azure disks)
* [Local volumes cleaner](https://github.com/codefresh-io/dind-volume-utils/blob/master/local-volumes/lv-cleaner.sh) - deletes **local** volumes in case node disk space is close to the threshold

***

#### IN-DIND cleaner

**Purpose:** Removes unneeded *docker containers, images, volumes* inside kubernetes volume mounted to the dind pod

**Where it runs:** Running inside each dind pod as script

**Triggered by:** SIGTERM and also during the run when disk usage (cleaner-agent ) > 90% (configurable)

**Configured by:**  Environment Variables which can be set in Runtime Environment configuration

**Configuration/Logic:** [README.md](https://github.com/codefresh-io/dind/tree/master/cleaner#readme)

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

***

#### External volumes cleaner

**Purpose:** Removes unused *kubernetes volumes and related backend volumes*

**Where it runs:** On Runtime Cluster as CronJob
(`kubectl get cronjobs -n codefresh -l app=dind-volume-cleanup`). Installed in case the Runner uses non-local volumes (`Storage.Backend != local`)

**Triggered by:** CronJob every 10min (configurable), part of [runtime-cluster-monitor](https://github.com/codefresh-io/runtime-cluster-monitor/blob/master/chart/templates/dind-volume-cleanup.yaml) and runner deployment

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

***

#### Local volumes cleaner

**Purpose:** Deletes local volumes in case node disk space is close to the threshold

**Where it runs:** On each node on runtime cluster as DaemonSet `dind-lv-monitor`. Installed in case the Runner use local volumes (`Storage.Backend == local`)

**Triggered by:** Starts clean if disk space usage or inodes usage is more than thresholds (configurable)

**Configuration:**

Override environment variables for `dind-lv-monitor` daemonset if necessary:

* `VOLUME_PARENT_DIR` - default `/var/lib/codefresh/dind-volumes`
* `KB_USAGE_THRESHOLD` - default 80 (percentage)
* `INODE_USAGE_THRESHOLD` - default 80

## ARM Builds

With hybrid runner it's possibe to run native ARM64v8 builds.

>**Note:** Running both amd64 and arm64 images within the same pipeline - it is not possible. We do not support multi-architecture builds. One runtime configuration - one architecture. Considering one pipeline can map only to one runtime, it is possible to run either amd64 or arm64, but not both within a one pipeline

The following scenario is an example of how to set up ARM Runner on existing EKS cluster:

**Step 1 - Preparing nodes**

Create new ARM nodegroup:

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

Check nodes status:

```shell
kubectl get nodes -l kubernetes.io/arch=arm64
```

Also it's recommeded to label and taint the required ARM nodes:

```shell
kubectl taint nodes <node> arch=aarch64:NoSchedule
kubectl label nodes <node> arch=arm
```

**Step 2 - Runner installation**

Use [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml) to inject `tolerations`, `kube-node-selector`, `build-node-selector` into the Runtime Environment spec.

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

Install the Runner with:

```shell
codefresh runner init --values values-arm.yaml --exec-demo-pipeline false --skip-cluster-integration true
```

**Step 3 - Post-installation fixes**

Change `engine` image version in Runtime Environment specification:

```shell
# get the latest engine ARM64 tag
curl -X GET "https://quay.io/api/v1/repository/codefresh/engine/tag/?limit=100" --silent | jq -r '.tags[].name' | grep "^1.*arm64$"
1.136.1-arm64
```

```shell
# get runtime spec
codefresh get re $RUNTIME_NAME -o yaml > runtime.yaml
```

under `runtimeScheduler.image` change image tag:

```yaml
runtimeScheduler:
  image: 'quay.io/codefresh/engine:1.136.1-arm64'
```

```shell
# patch runtime spec
codefresh patch re -f runtime.yaml
```

For `local` storage patch `dind-lv-monitor-runner` DaemonSet and add `nodeSelector`:

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

## Troubleshooting

For troubleshooting refer to the [Knowledge Base](https://support.codefresh.io/hc/en-us/sections/4416999487762-Hybrid-Runner)

## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/administration/installation-security/)
* [Codefresh On-Premises]({{site.baseurl}}/docs/administration/codefresh-on-prem/)
* [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)
