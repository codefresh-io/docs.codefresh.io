---
title: "Codefresh Runner"
description: "Run Codefresh pipelines on your private Kubernetes cluster"
group: enterprise
toc: true
---

The Codefresh runner is a helper application that can be installed on your own Kubernetes cluster (behind a company firewall).
It can then build Codefresh pipelines, with full access to secure internal services, without actually compromising the requirements
of the on-premise installation.

See the [Hybrid installation]({{site.baseurl}}/docs/enterprise/installation-security/#hybrid-installation) and [behind-the-firewall]({{site.baseurl}}/docs/enterprise/behind-the-firewall/) pages for more details.

## Codefresh Runner installation

The Codefresh runner installer is available at [https://github.com/codefresh-io/venona](https://github.com/codefresh-io/venona). You can use Venona to create, upgrade and remove runner installations on any internal Kubernetes cluster.

Notice that a runner installation is needed for each cluster that will _run_ Codefresh pipelines. A runner is **not** needed
in clusters that are used for _deployment_. It is possible to deploy applications on different clusters other than the ones the runner is running on.

The installation process takes care of all the components of the runner as well as the other resources (config-maps, secrets, volumes) needed by them. 

### Prerequisites

In order to use the Codefresh runner you need the following:

1. A Kubernetes cluster with outgoing Internet access (with version later than 1.10). Each node should have 50GB disk size.
1. A [Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) with the Hybrid feature enabled.
1. A [Codefresh CLI token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions) that will be used to authenticate to your Codefresh account.

Installation can happen from any workstation or laptop that has access (i.e. via `kubectl`) to the Kubernetes cluster that will run Codefresh builds. The Codefresh runner will authenticate to your Codefresh account by using the Codefresh CLI token. 

### Components

Once installed the runner uses the following pods:

* `venona` - responsible for picking tasks from the Codefresh UI
* `engine` - responsible for running pipelines
* `dind` - responsible for building and using Docker images
* `dind-volume-provisioner` 
* `dind-lv-monitor` 

### System requirements

The following table shows **MINIMUM** resources for each component:

{: .table .table-bordered .table-hover}
| Component         | Minimum CPU| Minimum Memory | Space                  | Type | Always on
| -------------- | --------------|------------- |-------------------------|-------|-------|
| `venona`        | 100m          | 100Mi        | Doesn't need PV         | Pod   | Yes   |
| `engine`         | 100m          | 100Mi        | Doesn't need PV         | Pod   | No   |
| `dind`         | 390m          | 255Mi        | 30GB         | Pod   | No   |
| `dind-volume-provisioner`         | 300m          | 400Mi        | Doesn't need PV         | Pod   | Yes   |
| `dind-lv-monitor`         | 300m          | 400Mi        | Doesn't need PV         | DaemonSet   | Yes   |

Components that are always on consume resources all the time. Components that are not always on only consume resource when pipelines are running (they are created and destroyed automatically for each pipeline).

Node size and count will entirely depend on how many pipelines you want to be “ready” for and how many will use “burst” capacity.  

* Ready (nodes): Lower initialization time and faster build times.
* Burst (nodes): High initialization time and slower build times. (Not recommended)

The size of your nodes directly relates to the size required for your pipelines and thus it is dynamic.  If you find that only a few larger pipelines require larger nodes you may want to have two Codefresh Runners associated to different node pools.

### Storage space

For the storage space needed by the `dind` pod we suggest:

* [Local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd) in the case of GCP 
* [EBS](https://aws.amazon.com/ebs/) in the case of Amazon. See also the [notes](#installing-on-aws) about getting caching working.

### Networking requirements

* `dind` - this pod will create an internal network in the cluster to run all the pipeline steps
* `venona` - this pod needs outgoing/egress access to `g.codefresh.io`
* `engine` - this pod needs outgoing/egress access to `g.codefresh.io`

All CNI providers/plugins are compatible with the runner components.


### Command line installation

First setup [Codefresh CLI access](https://codefresh-io.github.io/cli/getting-started/) first, in the machine where you want to install the runner from.

You can see if the CLI works correctly by running any command such as:

```
codefresh get pipelines
```

This should list the pipelines of your Codefresh account. 
Notice that access to the Codefresh CLI is only needed once during the Runner installation. After that, the Runner with authenticate on it own using the details provided. You do *NOT* need to install the Codefresh CLI on the cluster that is running Codefresh pipelines.

Download the Runner installer (called Venona) from the [releases page](https://github.com/codefresh-io/venona/releases) or by using homebrew if you are on a Mac:

```
brew tap codefresh-io/venona
brew install venona
```

Create a namespace in your cluster where you want the Codefresh runner to be installed:

```
kubectl create namespace codefresh-runtime
```

And finally run the installer passing as argument the namespace you just created:

```
venona install --kube-namespace codefresh-runtime
```

After a while you should see a message that the installation process has finished with success. You can run `venona --help` to get additional installation options.

As an example, you can define your own location for kubeconfig and/or CLI config:

```
venona install --kube-namespace my-codefresh-runtime --verbose --kube-config-path c:/users/kostis/.kube/config --cfconfig c:/Users/Kostis/.cfconfig
```

To check the installation result type `venona status --verbose` and you will get a list of all installations.

### Installing behind a proxy

If you want to deploy the Codefresh runner on a Kubernetes cluster that doesn’t have direct access to `g.codefresh.io`, and has to go trough a proxy server to access `g.codefresh.io`, you will need to follow these additional steps:

*Step 1* - Follow the installation instructions of the previous section

*Step 2* -  Run `kubectl edit deployment venona -ncodefresh-runtime` and add the proxy variables like this
    
{% highlight yaml %}
{% raw %}
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
{% endraw %}
{% endhighlight %}

    
*Step 3* - Add the following variables to your runtime.yaml, both under the `runtimeScheduler:` and under `dockerDaemonScheduler:` blocks inside the `envVars:` section

```
HTTP_PROXY: http://<ip of proxy server>:port
http_proxy: http://<ip of proxy server>:port
HTTPS_PROXY: http://<ip of proxy server>:port
https_proxy: http://<ip of proxy server>:port
No_proxy: localhost, 127.0.0.1, <local_ip_of_machine>
NO_PROXY: localhost, 127.0.0.1, <local_ip_of_machine>
```

*Step 4* -  Add `.firebaseio.com` to the allowed-sites of the proxy server

*Step 5* -  Exec into the `dind` pod and run `ifconfig`

If the MTU value for `docker0` is higher than the MTU value of `eth0` (sometimes the `docker0` MTU is 1500, while `eth0` MTU is 1440 - you need to change this, the `docker0` MTU should be lower than `eth0` MTU

To fix this, edit the configmap in the codefresh-runtime namespace:

```
kubectl edit cm codefresh-dind-config -ncodefresh-runtime
```

And add this after one of the commas:
`"mtu":1440,`

### Installing on Google Kubernetes Engine

If you are installing Codefresh runner on the Kubernetes cluster on [GKE](https://cloud.google.com/kubernetes-engine/)

* make sure your user has `Kubernetes Engine Cluster Admin` role in google console and
* bind your user with `cluster-admin` Kubernetes cluster role.

```
kubectl create clusterrolebinding NAME --clusterrole cluster-admin --user <YOUR_USER>

```

### Docker cache support for GKE

If you want to use  *LocalSSD* in GKE:

*Prerequisite:* [GKE cluster with local SSD](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/local-ssd)

*Install runner using GKE Local SSD:*
```
venona install [options] --set-value=Storage.LocalVolumeParentDir=/mnt/disks/ssd0/codefresh-volumes \
                            --build-node-selector=cloud.google.com/gke-local-ssd=true
```

If you want to use  *GCE Disks*:

*Prerequisite:* volume provisioner (dind-volume-provisioner) should have permissions to create/delete/get of Google disks

There are 3 options to provide cloud credentials on GCE:

* run venona dind-volume-provisioniner on node with iam role which is allowed to create/delete/get of Google disks
* create Google Service Account with `ComputeEngine.StorageAdmin`, download its key and pass it to venona installed with `--set-file=Storage.GooogleServiceAccount=/path/to/google-service-account.json`
* use [Google Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to assign iam role to `volume-provisioner-venona` service account 

Notice that builds will be running in a single availability zone, so you must specify AvailabilityZone parameters.

Install Runner using GKE Disks:

```
venona install [options] --set-value=Storage.Backend=gcedisk \
                            --set-value=Storage.AvailabilityZone=us-central1-a \
                            --build-node-selector=failure-domain.beta.kubernetes.io/zone=us-central1-a \
                            [--set-file=Storage.GoogleServiceAccount=/path/to/google-service-account.json]
```

#### Using multiple Availability Zones

Currently, to support effective caching with GCE disks, the builds/pods need to be scheduled in a single AZ (this is more related to a GCP limitation than a Codefresh runner issue).

If you have Kubernetes nodes running in multiple Availability Zones and wish to use the Codefresh runner we suggest the following:

**Option A** - Provision a new Kubernetes cluster: a cluster that runs in a single AZ only. - The cluster should be dedicated for usage with the Codefresh runner. This is the preferred solution and avoids extra complexity.

**Option B** - Install Codefresh runner in your multi-zone cluster, and let it run in the default Node Pool: - in this case, you must specify `--build-node-selector=<node-az-label>` (e.g.: `--build-node-selector=failure-domain.beta.kubernetes.io/zone=us-central1-a`) or simply modify the Runtime environment as below:

```
codefresh get runtime-environments gke_us-east4_my-gke-cluster/codefresh -o yaml > re.yaml
```

Edit the yaml:

{% highlight yaml %}
{% raw %}
version: 2metadata:
  agent: true
  trial:
    endingAt: 34534534
    reason: Codefresh hybrid runtime
    started: 23434
  name: gke_us-east4_my-gke-cluster/codefresh
  changedBy: kostis
  creationTime: '2020/04/01 21:04:11'
runtimeScheduler:
  cluster:
    clusterProvider:
      accountId: 34543545456
      selector: gke_us-east4_my-gke-cluster
    namespace: codefresh
    nodeSelector:
      failure-domain.beta.kubernetes.io/zone: us-east4-a
dockerDaemonScheduler:
  cluster:
    clusterProvider:
      accountId: 5cdd8937242f167387e5aa56
      selector: gke_us-east4_my-gke-cluster
    namespace: codefresh
    nodeSelector:
      failure-domain.beta.kubernetes.io/zone: us-east4-a    
  dockerDaemonParams: null
  pvcs:
    dind:
      storageClassName: dind-gcedisk-us-east4-a-venona-codefresh
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName,pipeline_id'
      volumeSize: 30Gi
  userAccess: true
extends:
  - system/default/hybrid/k8s
description: >-
  Runtime environment configure to cluster:
  gke_us-east4_my-gke-cluster and namespace: codefresh
accountId: 45645k694353459
{% endraw %}
{% endhighlight %}

Apply changes with: 

```
codefresh patch runtime-environments -f re.yaml
```



**Option C** - Like option B, but with a dedicated Node Pool

**Option D** - Have 2 separate Codefresh runner Runtimes, one for zone A, and the other for zone B, and so on: this technically works, but it will require you to manually set the RE to use for the pipelines that won't use the default Codefresh runner RE. To distribute the pipeline's builds across the Codefresh runner REs.

For example, let's say Venona-zoneA is the default RE, then, that means that for the pipelines that you want to run in Venona-zoneB, then you'll need to modify their RE settings, and explicitly set Venona-zoneB as the one to use.

Regarding [Regional Persistent Disks](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/regional-pd), their support is not currently implemented in the Codefresh runner.

### Installing on AWS

If you install the Codefresh runner on [EKS](https://aws.amazon.com/eks/) or any other custom cluster (e.g. with kops) in Amazon you need to configure it properly to work with EBS volume in order to gain [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/).

Make sure that the  node group where `dind-volume-provisioner-venona` deployment is running has the appropriate permissions to create, attach, detach volumes:

{% highlight json %}
{% raw %}

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
                  "ec2:CreateVolume",
                  "ec2:ModifyVolume",
                  "ec2:CreateTags",
                  "ec2:DescribeTags",
                  "ec2:DetachVolume",
                  "ec2:AttachVolume"
              ],
              "Resource": [
                  "*"
              ]
          }
      ]
  }
{% endraw %}
{% endhighlight %}


Then in order to proceed with Storage Class installation please choose one of the Availability Zones you want to be used for your pipeline builds:

{% highlight yaml %}
{% raw %}
    apiVersion: storage.k8s.io/v1
    kind: StorageClass
    metadata:
      name: venona-ebs
    parameters:
      AvailabilityZone: us-west-2c # <----(Please change it to yours)
      volumeBackend: ebs
    provisioner: codefresh.io/dind-volume-provisioner-venona-codefresh-runtime
{% endraw %}
{% endhighlight %}

Finally you need to change your Codefresh runtime configuration.

The same AZ you selected before should be used in nodeSelector inside Runtime Configuration:

  To get a list of all available runtimes execute:

```   
codefresh get runtime-environments
```

Choose the runtime you have just added and get its yaml representation:

```
codefresh get runtime-environments ivan@wawa-ebs.us-west-2.eksctl.io/codefresh-runtime -o yaml > runtime.yaml
```

The nodeSelector `failure-domain.beta.kubernetes.io/zone: us-west-2c` (Please change it to yours) should be added to the `dockerDaemonScheduler` block. It should be at the same level as `clusterProvider` or `namespace`. Also the `pvcs` block should be modified to use the Storage Class you created above (`venona-ebs`). Here is the example:

`runtime.yaml`
{% highlight yaml %}
{% raw %}
version: null
metadata:
  agent: true
  trial:
    endingAt: 1577273400263
    reason: Codefresh hybrid runtime
    started: 1576063800333
  name: ivan@wawa-ebs.us-west-2.eksctl.io/codefresh-runtime
  changedBy: ivan-codefresh
  creationTime: '2019/12/11 11:30:00'
runtimeScheduler:
  cluster:
    clusterProvider:
      accountId: 5cb563d0506083262ba1f327
      selector: ivan@wawa-ebs.us-west-2.eksctl.io
    namespace: codefresh-runtime
  annotations: {}
dockerDaemonScheduler:
  cluster:
    clusterProvider:
      accountId: 5cb563d0506083262ba1f327
      selector: ivan@wawa-ebs.us-west-2.eksctl.io
    namespace: codefresh-runtime
    nodeSelector:
      failure-domain.beta.kubernetes.io/zone: us-west-2c
  annotations: {}
  dockerDaemonParams: null
  pvcs:
    dind:
      volumeSize: 30Gi
      storageClassName: venona-ebs
      reuseVolumeSelector: 'codefresh-app,io.codefresh.accountName'
      reuseVolumeSortOrder: 'pipeline_id,trigger'
  userAccess: true
extends:
  - system/default/hybrid/k8s
description: >-
  Runtime environment configure to cluster: ivan@wawa-ebs.us-west-2.eksctl.io
  and namespace: codefresh-runtime
accountId: 5cb563d0506083262ba1f327
{% endraw %}
{% endhighlight %}

Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):

```
codefresh patch runtime-environment ivan@wawa-ebs.us-west-2.eksctl.io/codefresh-runtime -f codefresh-runner.yaml
```

### Injecting AWS arn roles into the cluster

Step 1 - Make sure the OIDC provider  is connected to the cluster

See:

 * [https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)
 * [https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/)

Step 2 - Create IAM role and policy as explained in [https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html](https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html)

Here, in addition to the policy explained, you need a Trust Relationship established between this role and the OIDC entity.

{% include image.html
  lightbox="true"
  file="/images/enterprise/runner/edit-trust-relationship.png"
  url="/images/enterprise/runner/edit-trust-relationship.png"
  alt="IAM Role trust establishment with OIDC provider"
  caption="IAM Role trust establishment with OIDC provider"
  max-width="90%"
    %} 

Step 3 - Create a new namespace where the runner will be instlled (e.g.  `codefresh-runtime`) and annotate the default Kubernetes Service Account on the newly created namespace with the proper IAM role 

{% include image.html
  lightbox="true"
  file="/images/enterprise/runner/sa-annotation.png"
  url="/images/enterprise/runner/sa-annotation.png"
  alt="Service Account annotation"
  caption="Service Account annotation"
  max-width="90%"
    %}         

Step 4 - Install the Codefresh runner using the instructions of the previous section

Step 5 - Using the AWS assumed role identity

After the Codefresh runner is installed run a pipeline to test the AWS resource access:

{% highlight yaml %}
{% raw %}
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
{% endraw %}
{% endhighlight %}

### Security roles

Installation of the Codefresh runner on a Kubernetes cluster is also setting up 2 groups of objects.
Each one has own RBAC needs and therefore, expected created roles(and cluster-roles)


You can see the exact resource descriptors [on GitHub](https://github.com/codefresh-io/venona/tree/master/venonactl/pkg/templates/kubernetes).

Here is a list of the resources that are created during a Runner installation:

* Agent (grouped by `/.*.venona.yaml/`)
  * `service-account.venona.yaml` - The service account that the agent's pod will use at the end.
  * `cluster-role-binding.venona.yaml` - The agent discovering K8S apis by calling to `openapi/v2`, this ClusterRoleBinding binds  bootstraped ClusterRole by Kubernetes `system:discovery` to `service-account.venona.yaml`. This role has only permissions to make a GET calls to non-resources URLs.
  * `role.venona.yaml` - Allow to `GET`, `CREATE` and `DELETE` pods and persistent volume claims.
  * `role-binding.venona.yaml` - The agent is spinning up pods and pvc, this binding binds `role.venona.yaml` to `service-account.venona.yaml`.
* Runtime-environment (grouped by `/.*.re.yaml/`) - Kubernetes controller that spins up all required resources to provide a good caching experience during pipeline execution.
  * `service-account.dind-volume-provisioner.re.yaml` - The service account that the controller will use.
  * `cluster-role.dind-volume-provisioner.re.yaml` Defines all the permission needed for the controller to operate correctly.
  * `cluster-role-binding.dind-volume-provisioner.yaml` - Binds the ClusterRole to `service-account.dind-volume-provisioner.re.yaml`.

## Codefresh Runner Preview release

We are now preparing the next version of Codefresh runner with two major changes:

* You can now install the runner from the [Codefresh CLI](https://codefresh-io.github.io/cli/). You don't need a separate installer anymore.
* You can use a single agent to manage multiple installations of the runner (even from other Kubernetes clusters)

> This release is only offered as a preview. We recommend that you do not use it for production deployments yet.

First follow the [prerequisites](#prerequisites) and make sure that the version of Codefresh CLI is at least 0.45.0

Then to install the runner on a single cluster with both the runtime and the agent, execute the following:

```
kubectl create namespace codefresh
codefresh install agent --agent-kube-namespace codefresh --install-runtime

```

You can then follow the instructions for [using the runner](#using-the-codefresh-runner).

### Installing multiple runtimes with a single agent

It is also possible, for advanced users to install a single agent that can manage multiple runtime environments.

>NOTE: Please make sure that the cluster where the agent is installed has network access to the other clusters of the runtimes

```
# 1. Create namespace for the agent: 
kubectl create namespace codefresh-agent

# 2. Install the agent on the namespace ( give your agent a unique name as $NAME):
# Note down the token and use it in the second command.
codefresh create agent $NAME
codefresh install agent --token $TOKEN --agent-kube-namespace codefresh-agent
codefresh get agents

# 3. Create namespace for the first runtime:
kubectl create namespace codefresh-runtime-1

# 4. Install the first runtime on the namespace
# 5. the runtime name is printed
codefresh install runtime --kube-namespace codefresh-runtime-1

# 6. Attach the first runtime to agent:
codefresh attach runtime --agent-name $AGENT_NAME --agent-kube-namespace codefresh-agent --runtime-name $RUNTIME_NAME --runtime-kube-namespace codefresh-runtime-1

# 7. Restart the venona pod in namespace `codefresh-agent`
kubectl delete pods $VENONA_POD

# 8. Create namespace for the second runtime
kubectl create namespace codefresh-runtime-2

# 9. Install the second runtime on the namespace
codefresh install runtime --kube-namespace codefresh-runtime-2

# 10. Attach the second runtime to agent and restart the Venoa pod automatically
codefresh attach runtime --agent-name $AGENT_NAME --agent-kube-namespace codefresh-agent --runtime-name $RUNTIME_NAME --runtime-kube-namespace codefresh-runtime-2 --restart-agent
```

### Migrating to the new Codefresh runner version

In order to migrate your existing Codefresh runner to the new version, you need to initiate the migration using our [migration script](https://github.com/codefresh-io/venona/blob/release-1.0/scripts/migration.sh)

> This release is only offered as a preview. We recommend that you do not use it for production deployments yet.



## Using the Codefresh Runner 


Once installed the Runner is fully automated. It polls on its own the Codefresh SAAS (by default every ten seconds) and 
creates automatically all resources needed for running pipelines.

Once installation is complete, you should see the cluster of the runner as a new [Runtime environment](https://g.codefresh.io/account-admin/account-conf/runtime-environments) in Codefresh at your *Account Settings*, in the respective tab.

{% include image.html
  lightbox="true"
  file="/images/enterprise/runner/runtime-environments.png"
  url="/images/enterprise/runner/runtime-environments.png"
  alt="Available runtime environments"
  caption="Available runtime environments"
  max-width="60%"
    %} 

If you have multiple environments available, you can change the default one (shown with a thin blue border) by clicking on the 3 dot menu on the right of each environment. The Codefresh runner installer comes with an option `set-default` that will automatically set as default the new runtime environment.

You can even override the runtime environment for a specific pipeline by specifying in the respective section in the [pipeline settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/). 

{% include image.html
  lightbox="true"
  file="/images/enterprise/runner/environment-per-pipeline.png"
  url="/images/enterprise/runner/environment-per-pipeline.png"
  alt="Running a pipeline on a specific environment"
  caption="Running a pipeline on a specific environment"
  max-width="60%"
    %} 



## Monitoring the Runner

Once installed, the runner is a normal Kubernetes application like all other applications. You can use your existing tools to monitor it.

Only the runner pod is long living inside your cluster. All other components (such as the engine) are short lived and exist only during pipeline builds.
You can always see what the Runner is doing by listing the resources inside the namespace you chose during installation:

```
$ kubectl get pods -n codefresh-runtime
NAME                                             READY     STATUS    RESTARTS   AGE
dind-5c5afbb02e9fd02917b33f06                    1/1       Running   0          1m
dind-lv-monitor-venona-kkkwr                     1/1       Running   1          7d
dind-volume-provisioner-venona-646cdcdc9-dqh8k   1/1       Running   2          7d
engine-5c5afbb02e9fd02917b33f06                  1/1       Running   0          1m
venona-8b5f787c5-ftbnd                           1/1       Running   2          7d
```
In the same manner you can list secrets, config-maps, logs, volumes etc. for the Codefresh builds. 

## Upgrading the Runner

To update the runner to a new version you use the `venona upgrade command`

To delete a runner installation use `venona delete <installation_name>`. Make sure that you don't have any pipelines assigned to that runtime environment before the removal takes place.

## Deploying applications to the same cluster of the runner

By default the Codefresh runner allows you to *build* pipelines in your private cluster. If you also want to *deploy* Docker images on your private cluster you need to use the [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/) or CLI to add the cluster to Codefresh.

Here is the [CLI command](https://codefresh-io.github.io/cli/clusters/create-cluster/)

``` 
codefresh create cluster --kube-context <CONTEXT_NAME> --namespace <NAMESPACE> --serviceaccount <SERVICE_ACCOUNT> --behind-firewall
```
See the [connecting a cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) page for more details on adding cluster.

## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/enterprise/installation-security/)
* [Account management]({{site.baseurl}}/docs/enterprise/ent-account-mng/)
* [Access Control]({{site.baseurl}}/docs/enterprise/access-control/)
* [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)
