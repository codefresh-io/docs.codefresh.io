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

1. A Kubernetes cluster with outgoing Internet access (preferably with version 1.10). Each node should have 50GB disk size.
1. A [Codefresh account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) with the Hybrid feature enabled.
1. A [Codefresh CLI token]({{site.baseurl}}/docs/integrations/codefresh-api/#authentication-instructions) that will be used to authenticate to your Codefresh account.

Installation can happen from any workstation or laptop that has access (i.e. via `kubectl`) to the Kubernetes cluster that will run Codefresh builds. The Codefresh runner will authenticate to your Codefresh account by using the Codefresh CLI token. 

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

### Installing on Kubernetes clusters with version earlier than 1.10

If your Kubernetes cluster is using a version earlier than 1.10 you also need to do the following:

Make sure the `PersistentLocalVolumes` [feature gate](https://kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/) is turned on

The runner will try to load available apis using the  `/openapi/v2` endpoint
Add this endpoint to the ClusterRole `system:discovery` under `rules[0].nonResourceURLs`:


```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: system:discovery
rules:
- nonResourceURLs:
  - ...other_resources
  - /openapi
  - /openapi/*
  verbs:
  - get
```

Use `kubectl` or any other management tool to perform this change to the role.

### Installing on Google Kubernetes Engine

If you are installing Codefresh runner on the Kubernetes cluster on [GKE](https://cloud.google.com/kubernetes-engine/)

* make sure your user has `Kubernetes Engine Cluster Admin` role in google console and
* bind your user with `cluster-admin` Kubernetes cluster role.

```
kubectl create clusterrolebinding NAME --clusterrole cluster-admin --user <YOUR_USER>
```

### Security roles

Installation of the Codefresh runner on a Kubernetes cluster is also setting up 2 groups of objects.
Each one has own RBAC needs and therefore, expected created roles(and cluster-roles)


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