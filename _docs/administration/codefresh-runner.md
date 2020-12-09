---
title: "Codefresh Runner"
description: "Run Codefresh pipelines on your private Kubernetes cluster"
group: administration
redirect_from:
  - /docs/enterprise/codefresh-runner/
toc: true
---



Hey Install the Codefresh Runner on your Kubernetes cluster to run pipelines and access secure internal services without compromising on premise security requirements. These pipelines run on your infrastructure, even behind the firewall, and keep code on your Kubernetes cluster. 

[Skip to quick installation &#8594;](#installation-with-the-quick-start-wizard)

>Notice that a runner installation is needed for each cluster that will _run_ Codefresh pipelines. A runner is **not** needed
in clusters that are used for _deployment_. It is possible to deploy applications on different clusters other than the ones the runner is running on.

The installation process takes care of all the components of the runner as well as the other resources (config-maps, secrets, volumes) needed by them. 

## Prerequisites

In order to use the Codefresh runner you need the following:

1. A Kubernetes cluster with outgoing Internet access (with version later than 1.10). Each node should have 50GB disk size.
1. A [Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) with the Hybrid feature enabled.
1. A [Codefresh CLI token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions) that will be used to authenticate to your Codefresh account.

Installation can happen from any workstation or laptop that has access (i.e. via `kubectl`) to the Kubernetes cluster that will run Codefresh builds. The Codefresh runner will authenticate to your Codefresh account by using the Codefresh CLI token. 

## Installation with the quick-start wizard

Install the Codefresh CLI
```
npm install -g codefresh
```
[Alternative install methods](https://codefresh-io.github.io/cli/installation/)

Authenticate the cli
```
codefresh auth create-context --api-key {API_KEY}
```
You can obtain an API Key from your [user settings page](https://g.codefresh.io/user/settings).

Notice that access to the Codefresh CLI is only needed once during the Runner installation. After that, the Runner with authenticate on it own using the details provided. You do *NOT* need to install the Codefresh CLI on the cluster that is running Codefresh pipelines.

Then run the wizard with the following command

```
codefresh runner init
```

or

```
codefresh runner init --token <my-token>
```

The wizard will ask you some basic questions and proceed with the installation. 

{% include image.html
  lightbox="true"
  file="/images/administration/runner/installation-wizard.png"
  url="/images/administration/runner/installation-wizard.png"
  alt="Codefresh Runner wizard"
  caption="Codefresh Runner wizard"
  max-width="100%"
    %} 

The wizard will also create and run a sample pipeline that you can see in your Codefresh UI

{% include image.html
  lightbox="true"
  file="/images/administration/runner/sample-pipeline.png"
  url="/images/administration/runner/sample-pipeline.png"
  alt="Codefresh Runner example pipeline"
  caption="Codefresh Runner example pipeline"
  max-width="90%"
    %} 

That's it! You can now start using the Runner.

You can also verify your installation with 

```
codefresh runner info
```

During installation you will also see which API token will be used by the runner (if you don't provide one by yourself). The token that is printed is used by the runner to talk to the Codefresh platform and it carries permissions that allows the runner to run pipelines.  If you note down the token, it can later be used if the deployment is deleted to restore the runner's permissions without creating a new runner installation.

### Customizing the wizard installation

You can customize the wizard installation by passing your own values in the `init` command.
For example you can specify the runtime that will be used in advance with:

```
codefresh runner init --kube-namespace my-codefresh-namespace

```

Here are all the possible installation options

{: .table .table-bordered .table-hover}
| Parameter          | Description                | 
| -------------- | ---------------------------- |
| name       | The name of the agent that will be created. | 
| token       | Codefresh account token to be used to install the Codefresh Runner. |
| url       | Codefresh system custom url. |
| kube-context-name       |  Name of the Kubernetes context on which the runner should be installed |
| kube-node-selector       | The Kubernetes node selector "key=value" to be used by runner resources (default is no node selector) |
| yes       | Use installation defaults (don't ask any questions during the installation) |
| set-default-runtime      | Set this as the default runtime environment for your Codefresh account |
| exec-demo-pipeline       | Run a demo pipeline after the installation completes (true/false) |
| kube-namespace       | Name of the namespace on which the runner should be installed |
| tolerations       | The Kubernetes tolerations as path to a  JSON file to be used by the runner resources (default is no tolerations) |
| storage-class-name        |  Set a name of your custom storage class |
| kube-config-path      |  Path to kubeconfig file (default is $HOME/.kube/config) |
| set-value       | Pass a custom parameter/value pair |
| verbose       | Print logs |
| docker-daemon-access       | Allows direct Docker daemon access (default true) |

Alternatively you can pass a values.yml file to the `init` command that includes all installation settings:

```
codefresh runner init --values values.yaml
```

You can use [this example](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml) as a starting point for your values file.



## Using the Codefresh Runner 


Once installed the Runner is fully automated. It polls on its own the Codefresh SAAS (by default every ten seconds) and 
creates automatically all resources needed for running pipelines.

Once installation is complete, you should see the cluster of the runner as a new [Runtime environment](https://g.codefresh.io/account-admin/account-conf/runtime-environments) in Codefresh at your *Account Settings*, in the respective tab.

{% include image.html
  lightbox="true"
  file="/images/administration/runner/runtime-environments.png"
  url="/images/administration/runner/runtime-environments.png"
  alt="Available runtime environments"
  caption="Available runtime environments"
  max-width="60%"
    %} 

If you have multiple environments available, you can change the default one (shown with a thin blue border) by clicking on the 3 dot menu on the right of each environment. The Codefresh runner installer comes with an option `set-default` that will automatically set as default the new runtime environment.

You can even override the runtime environment for a specific pipeline by specifying in the respective section in the [pipeline settings]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/). 

{% include image.html
  lightbox="true"
  file="/images/administration/runner/environment-per-pipeline.png"
  url="/images/administration/runner/environment-per-pipeline.png"
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
NAME                                              READY   STATUS    RESTARTS   AGE
dind-5ee7577017ef40908b784388                     1/1     Running   0          22s
dind-lv-monitor-runner-hn64g                      1/1     Running   0          3d
dind-lv-monitor-runner-pj84r                      1/1     Running   0          3d
dind-lv-monitor-runner-v2lhc                      1/1     Running   0          3d
dind-volume-provisioner-runner-64994bbb84-lgg7v   1/1     Running   7          3d
engine-5ee7577017ef40908b784388                   1/1     Running   0          22s
monitor-648b4778bd-tvzcr                          1/1     Running   0          3d
runner-5d549f8bc5-7h5rc                           1/1     Running   0          3d
```
In the same manner you can list secrets, config-maps, logs, volumes etc. for the Codefresh builds. 

## Removing the Codefresh runner

You can uninstall the Codefresh runner from your cluster by running

```
codefresh runner delete
```

A wizard similar to the installation one, will ask you questions regarding your cluster before finishing with the removal.

Like the installation wizard you can pass the following options in advance as command line parameters:

{: .table .table-bordered .table-hover}
| Parameter          | Description                | 
| -------------- | ---------------------------- |
| name       | The name of the agent that will be created. | 
| url       | Codefresh system custom url. |
| kube-context-name       |  Name of the Kubernetes context on which the runner should be installed |
| kube-namespace       |  Name of the Kubernetes namespace from which the Codefresh agent and runtime will be removed. |
| kube-config-path      |  Path to kubeconfig file (default is $HOME/.kube/config) |
| verbose       | Print logs |

## System requirements 

Once installed the runner uses the following pods:

* `runner` - responsible for picking tasks from the Codefresh UI
* `engine` - responsible for running pipelines
* `dind` - responsible for building and using Docker images
* `dind-volume-provisioner` 
* `dind-lv-monitor` 

### CPU/Memory

The following table shows **MINIMUM** resources for each component:

{: .table .table-bordered .table-hover}
| Component         | Minimum CPU| Minimum Memory | Space                  | Type | Always on
| -------------- | --------------|------------- |-------------------------|-------|-------|
| `runner`        | 100m          | 100Mi        | Doesn't need PV         | Pod   | Yes   |
| `engine`         | 100m          | 500Mi        | Doesn't need PV         | Pod   | No   |
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
* `dind` needs outgoing/egress access to Dockerhub and `quay.io`
* `runner` - this pod needs outgoing/egress access to `g.codefresh.io`
* `runner` needs network access to [app-proxy]({{site.baseurl}}/docs/administration/codefresh-runner/#optional-installation-of-the-app-proxy) (if app-proxy is used)
* `engine` - this pod needs outgoing/egress access to `g.codefresh.io`, `*.firebaseio.com` and `quay.io`
* `engine` - this pod needs network access to `dind` pod

All CNI providers/plugins are compatible with the runner components.

## Upgrading from the previous version of the Runner

If you are still running the old version of the Codefresh runner (that is using the Venona installer) you can upgrade to the new version with


```
codefresh runner upgrade
```

and follow the wizard prompts.

## Optional installation of the App Proxy

The App Proxy is an optional component of the runner that once installed:

* Enables you to automatically create webhooks for Git in the Codefresh UI (same as the SAAS experience)
* Sends commit status information back to your Git provider (same as the SAAS experience)
* Makes all Git Operations in the GUI work exactly like the SAAS installation of Codefresh

The requirements for the App proxy is a Kubernetes cluster that:

1. has already the Codefresh runner installed 
1. has an active [ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/)
1. allows incoming connections from the VPC/VPN where users are browsing the Codefresh UI. The ingress connection **must** have a hostname assigned for this route and **must** be configured to perform SSL termination

>Currently the App-proxy works only for Github (SAAS and on-prem versions), and Gitlab (SAAS and on-prem versions). We are soon adding support for other Git providers.

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

```
codefresh install app-proxy --host=<hostname-of-ingress>
```

If you want to install the Codefresh runner and app-proxy in a single command use the following:

```
codefresh runner init --app-proxy --app-proxy-host=<hostname-of-ingress>

```

If you have multiple ingress controllers in the Kubernetes cluster you can use the `app-proxy-ingress-class` parameter to define which ingress will be used. For additional security you can also define a whitelist for IPs/ranges that are allowed to use the ingress (to further limit the web browsers that can access the Ingress). Check the documentation of your ingress controller for the exact details.

By default the app-proxy ingress will use the path `hostname/app-proxy`. You can change that default by using the values file in the installation with the flag `--values values.yaml`. See the `AppProxy` section in the example [values.yaml](https://github.com/codefresh-io/venona/blob/release-1.0/venonactl/example/values-example.yaml).  


## Manual installation of Runner components

If you don't want to use the wizard, you can also install the components of the runner yourself.

The Codefresh runner consists of the following:

* Runner - responsible for getting tasks from the platform and executing them. One per account. Can handle multiple runtimes 
* Runtime - the components that are responsible on runtime for the workflow execution : 
  *  Volume provisioner - (pod’s name prefix dind-volume-provisioner-runner) - responsible for volume provisioning for dind pod
  *  lv-monitor - (pod’s name perfix dind-lv-monitor-runner) - daemonset - responsible for cleaning volumes 

To install the runner on a single cluster with both the runtime and the agent, execute the following:

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

# 10. Attach the second runtime to agent and restart the Venoa pod automatically
codefresh attach runtime --agent-name $AGENT_NAME --agent-kube-namespace codefresh-agent --runtime-name $RUNTIME_NAME --runtime-kube-namespace codefresh-runtime-2 --restart-agent
```

## Configuration options

You can fine tune the installation of the runner to better match your environment and cloud provider.

### Custom global environment variables

You can add your own environment variables  in the runtime environment, so that all pipeline steps have access to the same set of external files. A typical
example would be a shared secret that you want to pass everywhere.

To get a list of all available runtimes execute:

```   
codefresh get runtime-environments
```

Choose the runtime that you want to modify and get its yaml representation:

```
codefresh get runtime-environments ivan@acme-ebs.us-west-2.eksctl.io/codefresh-runtime -o yaml > runtime.yaml
```

Under the `runtimeScheduler` block you can add an additional element with names `userEnvVars` that follows the same syntax as [secret/environment variables](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables)

`runtime.yaml`
{% highlight yaml %}
{% raw %}
runtimeScheduler:
  type: KubernetesPod
  imagePullPolicy: Always
  cluster:
    namespace: codefresh
    clusterProvider:
      accountId: 5c1658d1736122ee1114c842
      selector: docker-desktop
    serviceAccount: codefresh-engine
  envVars:
    LOGGER_LEVEL: debug
    NODE_ENV: kubernetes
    NODE_TLS_REJECT_UNAUTHORIZED: '0'
    DISABLE_WORKSPACE_CACHE: 'true'
    NO_EXT_MONITOR: 'true'
  userEnvVars:
    - name: SPECIAL_LEVEL_KEY
      valueFrom:
        secretKeyRef:
          name: dev-db-secret
          key: username
{% endraw %}
{% endhighlight %}

Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):

```
codefresh patch runtime-environment ivan@acme-ebs.us-west-2.eksctl.io/codefresh-runtime -f runtime.yaml
```



### Custom volume mounts

You can add your own volume mounts in the runtime environment, so that all pipeline steps have access to the same set of external files. A typical
example of this scenario is when you want to make a set of SSL certificates available to all your pipelines. Rather than manually
downlading the certificates in each pipeline, you can provide them centrally on the runtime level.

To get a list of all available runtimes execute:

```   
codefresh get runtime-environments
```

Choose the runtime that you want to modify and get its yaml representation:

```
codefresh get runtime-environments ivan@acme-ebs.us-west-2.eksctl.io/codefresh-runtime -o yaml > runtime.yaml
```

Under the `dockerDaemonScheduler` block you can add two additional elements with names `userVolumeMounts` and `userVolumes` (they follow the same syntax as normal `volumes` and `volumeMounts`) and define your own global volumes

`runtime.yaml`
{% highlight yaml %}
{% raw %}
dockerDaemonScheduler:
  userVolumeMounts:
    my-test:
      name: test
      mountPath: /etc/ssl/cert
      readOnly: true
  userVolumes:
    test:
      name: test
      secret: 
        secretName: test-secret

{% endraw %}
{% endhighlight %}

Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):

```
codefresh patch runtime-environment ivan@acme-ebs.us-west-2.eksctl.io/codefresh-runtime -f runtime.yaml
```
### Internal registry mirror

You can configure your Codefresh Runner to use an internal registry as a mirror for any container images that are mentioned in your pipelines.

First setup an internal registry as described in [https://docs.docker.com/registry/recipes/mirror/](https://docs.docker.com/registry/recipes/mirror/).

Then locate the `codefresh-dind-config` config map in the namespace that houses the runner and edit it.

```
kubectl -n codefresh edit configmap codefresh-dind-config
```

Change the `data` field from:

```
data:
  daemon.json: "{\n  \"hosts\": [ \"unix:///var/run/docker.sock\",\n             \"tcp://0.0.0.0:1300\"],\n
    \ \"storage-driver\": \"overlay2\",\n  \"tlsverify\": true,  \n  \"tls\": true,\n
    \ \"tlscacert\": \"/etc/ssl/cf-client/ca.pem\",\n  \"tlscert\": \"/etc/ssl/cf/server-cert.pem\",\n
    \ \"tlskey\": \"/etc/ssl/cf/server-key.pem\",\n  \"insecure-registries\" : [\"192.168.99.100:5000\"],\n
    \ \"metrics-addr\" : \"0.0.0.0:9323\",\n  \"experimental\" : true\n}\n"
```

to

```
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



### Installing on AWS

If you install the Codefresh runner on [EKS](https://aws.amazon.com/eks/) or any other custom cluster (e.g. with kops) in Amazon you need to configure it properly to work with EBS volume in order to gain [caching]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipeline-caching/).

Make sure that the  node group where `dind-volume-provisioner-runner` deployment is running has the appropriate permissions to create, attach, detach volumes:

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
codefresh get runtime-environments ivan@acme-ebs.us-west-2.eksctl.io/codefresh-runtime -o yaml > runtime.yaml
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
  name: ivan@acme-ebs.us-west-2.eksctl.io/codefresh-runtime
  changedBy: ivan-codefresh
  creationTime: '2019/12/11 11:30:00'
runtimeScheduler:
  cluster:
    clusterProvider:
      accountId: 5cb563d0506083262ba1f327
      selector: ivan@acme-ebs.us-west-2.eksctl.io
    namespace: codefresh-runtime
  annotations: {}
dockerDaemonScheduler:
  cluster:
    clusterProvider:
      accountId: 5cb563d0506083262ba1f327
      selector: ivan@acme-ebs.us-west-2.eksctl.io
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
  Runtime environment configure to cluster: ivan@acme-ebs.us-west-2.eksctl.io
  and namespace: codefresh-runtime
accountId: 5cb563d0506083262ba1f327
{% endraw %}
{% endhighlight %}

Update your runtime environment with the [patch command](https://codefresh-io.github.io/cli/operate-on-resources/patch/):

```
codefresh patch runtime-environment ivan@acme-ebs.us-west-2.eksctl.io/codefresh-runtime -f codefresh-runner.yaml
```


### Installing to EKS with autoscaling

#### Step 1-  EKS Cluster creation

See below is a content of cluster.yaml file. We define separate node pools for dind, engine and other services(like runner, cluster-autoscaler etc).

Before creating the cluster we have created two separate IAM policies:

* one for our volume-provisioner controller(policy/runner-ebs) that should create and delete volumes
* one for dind pods(policy/dind-ebs) that should be able to attach/detach those volumes to the appropriate nodes using [iam attachPolicyARNs options](https://eksctl.io/usage/iam-policies/). 

{% highlight json %}
{% raw %}
policy/dind-ebs: 
{
    "Version": "2012-10-17",
    "Statement": [
        {
           ### "Effect": "Allow",
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
{% endraw%}
{% endhighlight %}

{% highlight json %}
{% raw %}
policy/runner-ebs:

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
{% endraw%}
{% endhighlight %}


`my-eks-cluster.yaml`
{% highlight yaml %}
{% raw %}
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
{% endraw%}
{% endhighlight %}

Execute:

```
eksctl create cluster -f my-eks-cluster.yaml
```

#### Step 2 - Autoscaler

Once the cluster is up and running we need to install the [cluster autoscaler](https://docs.aws.amazon.com/eks/latest/userguide/cluster-autoscaler.html):

We used iam AddonPolicies `"autoScaler: true"` in the cluster.yaml file so there is no need to create a separate IAM policy or add Auto Scaling group tags, everything is done automatically.

Deploy the Cluster Autoscaler: 

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml
```

Add the `cluster-autoscaler.kubernetes.io/safe-to-evict` annotation

```
kubectl -n kube-system annotate deployment.apps/cluster-autoscaler cluster-autoscaler.kubernetes.io/safe-to-evict="false"
```

Edit the cluster-autoscaler container command to replace <YOUR CLUSTER NAME> with *my-eks*(name of the cluster from cluster.yaml file), and add the following options:
    `--balance-similar-node-groups` and    `--skip-nodes-with-system-pods=false`

```
kubectl -n kube-system edit deployment.apps/cluster-autoscaler
```

{% highlight yaml %}
{% raw %}
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
{% endraw%}
{% endhighlight %}

We created our EKS cluster with 1.15 version so the appropriate cluster autoscaler version from [https://github.com/kubernetes/autoscaler/releases](https://github.com/kubernetes/autoscaler/releases) is 1.15.6

```
kubectl -n kube-system set image deployment.apps/cluster-autoscaler cluster-autoscaler=us.gcr.io/k8s-artifacts-prod/autoscaling/cluster-autoscaler:v1.15.6
```

Check your own version to make sure that the autoscaler version is appropriate.



#### Step 3 -  Optional: We also advise to configure overprovisioning with Cluster Autoscaler

See details at the [FAQ](
https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-configure-overprovisioning-with-cluster-autoscaler).



#### Step 4 -  Adding an EKS cluster as a runner to the Codefresh platform with EBS support


Make sure that you are targeting the correct cluster

```
$ kubectl config current-context 
my-aws-runner
```

 


Install the runner passing additional options:

```
codefresh runner init \
--name my-aws-runner \
--kube-node-selector=failure-domain.beta.kubernetes.io/zone=us-west-2a \
--kube-namespace cf --kube-context-name my-aws-runner \
--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons \
--set-value=Storage.Backend=ebs \
--set-value=Storage.AvailabilityZone=us-west-2a
```

 * You should specify the zone in which you want your volumes to be created, example: `--set-value=Storage.AvailabilityZone=us-west-2a`
 * (Optional) -  if you want to assign the volume-provisioner to a specific node, for example a specific node group what has an IAM role which allows to create EBS volumes, example: `--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons`
 

 If you want to use [encrypted EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt) (they are unencrypted by default) - add the custom value `--set-value=Storage.Encrypted=true`
 If you already have a key - add its ARN via `--set-value=Storage.KmsKeyId=<key id> value`, otherwise a key is generated by AWS. Here is the full command:


```
codefresh runner init \
--name my-aws-runner \
--kube-node-selector=failure-domain.beta.kubernetes.io/zone=us-west-2a \
--kube-namespace cf --kube-context-name my-aws-runner \
--set-value Storage.VolumeProvisioner.NodeSelector=node-type=addons \
--set-value=Storage.Backend=ebs \
--set-value=Storage.AvailabilityZone=us-west-2a\
--set-value=Storage.Encrypted=[false|true] \
--set-value=Storage.KmsKeyId=<key id>
```  

For an explanation of all other options see the [global parameter table](#customizing-the-wizard-installation).

At this point the quick start wizard will start the installation.


Once that is done we need to modify the runtime environment of `my-aws-runner` to specify the necessary toleration, nodeSelector and disk size:

```
codefresh get re --limit=100 my-aws-runner/cf -o yaml > my-runtime.yml
```

{% highlight yaml %}
{% raw %}
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
  annotations: {}
dockerDaemonScheduler:
  cluster:
    clusterProvider:
      accountId: 5cb563d0506083262ba1f327
      selector: my-aws-runner
    namespace: cf
  annotations: {}
  defaultDindResources:
    requests: ''
  pvcs:
    dind:
      storageClassName: dind-local-volumes-runner-cf
  userAccess: true
extends:
  - system/default/hybrid/k8s_low_limits
description: 'Runtime environment configure to cluster: my-aws-runner and namespace: cf'
accountId: 5cb563d0506083262ba1f327
{% endraw%}
{% endhighlight %}

Modify the file my-runtime.yml as shown below:

{% highlight yaml %}
{% raw %}
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
{% endraw%}
{% endhighlight %}

Finally apply changes.

```
codefresh patch re my-aws-runner/cf -f my-runtime.yml
```

That's all. Now you can go to UI and try to run a pipeline on RE my-aws-runner/cf

### Injecting AWS arn roles into the cluster

Step 1 - Make sure the OIDC provider  is connected to the cluster

See:

 * [https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html)
 * [https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/)

Step 2 - Create IAM role and policy as explained in [https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html](https://docs.aws.amazon.com/eks/latest/userguide/create-service-account-iam-policy-and-role.html)

Here, in addition to the policy explained, you need a Trust Relationship established between this role and the OIDC entity.

{% include image.html
  lightbox="true"
  file="/images/administration/runner/edit-trust-relationship.png"
  url="/images/administration/runner/edit-trust-relationship.png"
  alt="IAM Role trust establishment with OIDC provider"
  caption="IAM Role trust establishment with OIDC provider"
  max-width="90%"
    %} 

Step 3 - Create a new namespace where the runner will be instlled (e.g.  `codefresh-runtime`) and annotate the default Kubernetes Service Account on the newly created namespace with the proper IAM role 

{% include image.html
  lightbox="true"
  file="/images/administration/runner/sa-annotation.png"
  url="/images/administration/runner/sa-annotation.png"
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

### Installing behind a proxy

If you want to deploy the Codefresh runner on a Kubernetes cluster that doesn’t have direct access to `g.codefresh.io`, and has to go trough a proxy server to access `g.codefresh.io`, you will need to follow these additional steps:

*Step 1* - Follow the installation instructions of the previous section

*Step 2* -  Run `kubectl edit deployment runner -ncodefresh-runtime` and add the proxy variables like this

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
codefresh runner init [options] --set-value=Storage.LocalVolumeParentDir=/mnt/disks/ssd0/codefresh-volumes \
                            --build-node-selector=cloud.google.com/gke-local-ssd=true
```

If you want to use  *GCE Disks*:

*Prerequisite:* volume provisioner (dind-volume-provisioner) should have permissions to create/delete/get of Google disks

There are 3 options to provide cloud credentials on GCE:

* run `dind-volume-provisioner-runner` on node with iam role which is allowed to create/delete/get of Google disks
* create Google Service Account with `ComputeEngine.StorageAdmin`, download its key and pass it to venona installed with `--set-file=Storage.GooogleServiceAccount=/path/to/google-service-account.json`
* use [Google Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to assign iam role to `volume-provisioner-venona` service account 

Notice that builds will be running in a single availability zone, so you must specify AvailabilityZone parameters.

Install Runner using GKE Disks:

```
codefresh runner init [options] --set-value=Storage.Backend=gcedisk \
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




## Troubleshooting

- **Problem:** You receive an error regarding the provided token or CLI context used for this installation might not have enough permissions.
- **Solution:** Make sure when you generate the token used to authenticate with the CLI, you generate it with *all scopes*.


- **Problem:** the cluster does not meet the minimum requirements (Kubernetes 1.10+, required memory/CPU on at least one single node, service account to create ClusterRoleBinding).
- **Solution:** install on a different cluster


- **Problem:** Node process crashes during the installation or installation gets stuck on “Executing pipeline.“
- **Solution:** Try to run the `codefresh runner init` command from a different terminal window or restart your machine and try again.


- **Problem:** Builds will not run.
- **Solution:** Check:
  - That there is only one Codefresh Runner per Kubernetes namespace
  - That you selected the correct runtime for the pipeline
  - The CPU/Memory specification in the pipeline settings

- **Problem:** After installing the runner, your builds are stuck in the "pending" state and if you look at the runner pod logs you get the following message: `HTTP request to Codefresh API rejected. Status-Code: 401`
- **Solution:** You probably installed the runner in a namespace where there was previously another Codefresh runner. Delete the namespace and install the runner on a new namespace.

## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/administration/installation-security/)
* [Account management]({{site.baseurl}}/docs/administration/ent-account-mng/)
* [Access Control]({{site.baseurl}}/docs/administration/access-control/)
* [Codefresh API]({{site.baseurl}}/docs/integrations/codefresh-api/)
