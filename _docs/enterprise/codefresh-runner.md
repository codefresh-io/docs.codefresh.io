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

## Introduction

The source code for the Codefresh Runner is available at [https://github.com/codefresh-io/venona](https://github.com/codefresh-io/venona). You can use Venona to create, upgrade and remove runner installations on any internal Kubernetes cluster.

Notice that a runner installation is needed for each cluster that will _run_ Codefresh pipelines. A runner is **not** needed
in clusters that are used for _deployment_. It is possible to deploy applications on different clusters other than the ones the runner is running on.

The installation process takes care of all the components of the runner as well as the other resources (config-maps, secrets, volumes) needed by them. 

### Prerequisites

In order to use the Codefresh runner you need the following:

1. A Kubernetes cluster with outgoing Internet access (with version later than 1.10). Each node should have 50GB disk size.
1. A [Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) with the Hybrid feature enabled.
1. A [Codefresh CLI token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions) that will be used to authenticate to your Codefresh account.

Installation can happen from any workstation or laptop that has access (i.e. via `kubectl`) to the Kubernetes cluster that will run Codefresh builds. The Codefresh runner will authenticate to your Codefresh account by using the Codefresh CLI token. 

### Architecture

The Codefresh Runner is comprised of the following components:

| Component | Pod Prefix | Purpose | Always On | Minimum CPU | Minimum Memory | Space |
|-----------|------------|---------|-----------|-------------|----------------|-------|
| Agent     | venona     | Responsible for getting tasks from the Codefresh platform and executing them (one per account).  Can handle multiple runtimes. | Yes |  100m | 100Mi | Doesn't need PV |
| Volume Provisioner | dind-volume-provisioner-venona | Runtime component, responsible for volume provisioning for dind pods. | Yes | 300m          | 400Mi        | Doesn't need PV         |
| Monitor | dind-lv-monitor-venona | Runtime component, daemonset responsible for cleaning volumes | Yes | 300m          | 400Mi        | Doesn't need PV         |
| Engine | engine | Responsible for running pipelines. | No | 100m          | 100Mi        | Doesn't need PV         |
| Docker builder/runner | dind | Responsible for building and running Docker images. | No | 390m          | 255Mi        | 30GB         |

Components that are always on (`venona`, `dind-volume-provisioner-venona`, `dind-lv-monitor-venona`) consume resources all the time. Components that are not always on (`engine` and `dind`) only consume resources when pipelines are running (they are created and destroyed automatically for each pipeline).

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

## Codefresh Runner -- Getting Started

The newest version of the Codefresh Runner has two major changes:

* You can now install the runner from the [Codefresh CLI](https://codefresh-io.github.io/cli/). You don't need a separate installer anymore.
* You can use a single agent to manage multiple installations of the runner (even from other Kubernetes clusters)

Watch a brief demo of an installation of the Codefresh Runner on asciinema:
<script id="asciicast-wKIN7XcAcILiI3Rpaz3OMVhxp" src="https://asciinema.org/a/wKIN7XcAcILiI3Rpaz3OMVhxp.js" async></script>
Or, continue reading below.

### Step 1 -- Install the Codefresh CLI

You can use npm, yarn, or brew to install the CLI.  You can also download it directly.

- **npm:** `npm install -g codefresh`
- **yarn:** `yarn global add codefresh`
- **brew (MacOS):** `brew tap codefresh-io/cli && brew install codefresh`
- **Download directly:** download from our [release](https://github.com/codefresh-io/cli/releases) page.  Make sure you download version 0.64.0 or above.

### Step 2 -- Get Codefresh Account Token and Authenticate with the CLI

There are two options to generating your token:

1. Click the "Setup Hybrid" link [available from the dashboard](https://g.codefresh.io/welcome) of new Codefresh accounts (still in their trial period) and go through the Setup Wizard
2. Generate a token with *all scopes* checked from your [user settings](https://g.codefresh.io/user/settings)
  - Authenticate with the CLI by running: `codefresh auth create-context --api-key <token>`
  - You can also pass a `--token` flag to the installation process as described in the next step

### Step 3 -- Install the Hybrid Solution on your Kubernetes Cluster

Execute the following:

```
codefresh runner init
```

You will be prompted for:

- The name of the current cluster you want to use
- The namespace you want to install to (it will be created for you if it does not exist.  The default is `codefresh`)
- If you want to set this runtime as the default runner
- If you want to run the demo pipeline after installation

The `init` command will:

- Install the agent, runtime, and monitor
- Create and run a demo pipeline (if you opted in)

**Additional parameters for `codefresh runner init`:**

- `--name` - The name of the agent that will be created.
- `--token` - codefresh account token to be used to install the Codefresh Runner.  This will automatically create a CLI context for you, if you did not do this separately with the CLI.
- `--url` - Codefresh system custom url.
- `--kube-context-name` - Name of the Kubernetes context on which the runner should be installed
- `--kube-node-selector` - The Kubernetes node selector. "key=value" to be used by Codefresh Runner build resources (default is no node selector)
- `--yes` - Use installation defaults (don't ask any questions during the installation)
- `--set-default-runtime` - Set this as the default runtime environment for your Codefresh account
- `--exec-demo-pipeline` - Run a demo pipeline after the installation completes (yes/no)
- `--kube-namespace` - Name of the namespace on which Codefresh Runner should be installed
- `--tolerations` - The Kubernetes [tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) as path to a JSON file. To be used by Codefresh Runner resources (default is no tolerations)
- `--storage-class-name` - Set a name of your custom storage class
- `--kube-config-path` - Path to kubeconfig file (default is $HOME/.kube/config)
-- `verbose` - Print logs

You can then follow the instructions for [using the runner](#using-the-codefresh-runner).

### Uninstalling a Hybrid Solution from Kubernetes Cluster

To uninstall the Hybrid solution, execute the following:

```
codefresh runner delete
```

The `delete` command will prompt you for:

- The name of the current cluster you want to uninstall from
- The namespace to remove Codefresh components from
- The agent to uninstall

More parameters for the delete command:
 
- `--name` - Agent's name to be deleted
- `--url` - Codefresh system custom URL
- `--kube-context-name` - Name of the kubernetes context from which the Codefresh agent and runtime will be removed
- `--kube-namespace` - Name of the kubernetes namespace from which the Codefresh agent and runtime will be removed
- `--kube-config-path` - Path to kubeconfig file (default is $HOME/.kube/config)
- `--verbose` - Print logs

### Migrating to the new Codefresh Runner Version

In order to migrate your existing Codefresh runner to the new version, you need to initiate the migration using our [migration script](https://github.com/codefresh-io/venona/blob/release-1.0/scripts/migration.sh)

You will need to set the following environment variables:

- `CODEFRESH_RUNTIME_NAME` - old runtime name (you can get the runtime environment with `codefresh get re`)
- `VENONA_KUBE_NAMESPACE` - old Venona namespace 

Note that manually added items to the Venona deployment will be deleted.  You will need to save them prior to migration and add them manually again.

## Advanced Installation

Here are some more complex use cases of installation methods.
 
### Installing Additional Runtimes

>NOTE: Please make sure that the cluster where the agent is installed has network access to the other clusters of the runtimes

```
# 1. Create namespace for the second runtime: 
kubectl create namespace codefresh-2

# 2. Install the second runtime, attach the runtime to the agent created in the Getting Started guide, and restart the Venona pod automatically
codefresh install runtime --runtime-kube-namespace codefresh-2 --attach-runtime true --agent-name gke_codefresh-support_us-central1-c_anna-sandbox_codefresh --agent-kube-namespace codefresh --restart-agent

# Repeat steps #1 and #2 for additional runtimes
```

### Installing Behind a Proxy

If you want to deploy the Codefresh Runner on a Kubernetes cluster that doesn’t have direct access to `g.codefresh.io`, and has to go trough a proxy server to access `g.codefresh.io`, you will need to follow these additional steps:

*Step 1* - Follow the installation instructions of the previous section

*Step 2* -  Run `kubectl edit deployment venona -n codefresh` and add the proxy variables like this:
    
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

### Docker Cache Support for GKE

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
    - name: dind
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

### Injecting AWS arn Roles into the Cluster

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

Step 3 - Create a new namespace where the runner will be insatlled (e.g.  `codefresh-runtime`) and annotate the default Kubernetes Service Account on the newly created namespace with the proper IAM role 

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

### Security Roles

Installation of the Codefresh runner on a Kubernetes cluster is also setting up 2 groups of objects.
Each one has own RBAC needs and therefore, expects created roles (and cluster-roles)

You can see the exact resource descriptors [on Github](https://github.com/codefresh-io/venona/tree/master/venonactl/pkg/templates/kubernetes).

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

Only the venona pod is long living inside your cluster. All other components are short lived and exist only during pipeline builds.
You can always see what the Runner is doing by listing the resources inside the namespace you chose during installation:

```
$ kubectl get pods -n codefresh
NAME                                              READY   STATUS    RESTARTS   AGE
dind-lv-monitor-venona-595vp                      1/1     Running   0          17m
dind-lv-monitor-venona-cc9np                      1/1     Running   0          17m
dind-lv-monitor-venona-qfz6l                      1/1     Running   0          17m
dind-lv-monitor-venona-rrqpd                      1/1     Running   0          14m
dind-volume-provisioner-venona-86d8dd69bd-zcqk4   1/1     Running   0          17m
monitor-9ff65896c-m4lnc                           1/1     Running   0          16m
venona-7fcc8dddf9-fmhr9                           1/1     Running   0          17m
```
In the same manner you can list secrets, config-maps, logs, volumes etc. for the Codefresh builds. 

## Deploying applications to the same cluster of the runner

By default the Codefresh runner allows you to *build* pipelines in your private cluster. If you also want to *deploy* Docker images on your private cluster you need to use the [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/) or CLI to add the cluster to Codefresh.

Here is the [CLI command](https://codefresh-io.github.io/cli/clusters/create-cluster/)

``` 
codefresh create cluster --kube-context <CONTEXT_NAME> --namespace <NAMESPACE> --serviceaccount <SERVICE_ACCOUNT> --behind-firewall
```
See the [connecting a cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/add-kubernetes-cluster/) page for more details on adding cluster.

## Troubleshooting

- **Problem:** You receive an error regarding the provided token or CLI context used for this installation might not have enough permissions.
- **Solution:** Make sure when you generate the token used to authenticate with the CLI, you generate it with *all scopes*.
 
 
- **Problem:** the cluster does not meet the minimum requirements (Kubernetes 1.10+, required memory/CPU on at least one single node, service account to create ClusterRoleBinding).
- **Solution:** install on a different cluster


- **Problem:** Node process crashes during the installation or installation gets stuck on “Executing pipeline.“
- **Solution:** Try to run the `codefresh unner init` command from a different terminal window or restart your machine and try again.


- **Problem:** Builds will not run.
- **Solution:** Check:
  - That there is only one Codefresh Runner per Kubernetes namespace
  - That you selected the correct runtime for the pipeline
  - The CPU/Memory specification in the pipeline settings

## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/enterprise/installation-security/)
* [Account management]({{site.baseurl}}/docs/enterprise/ent-account-mng/)
* [Access Control]({{site.baseurl}}/docs/enterprise/access-control/)
* [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)
