---
title: "Codefresh On-Premises Installation"
description: "Use the Kubernetes Codefresh Installer to install the Codefresh On-Premises platform "
group: administration
redirect_from:
  - /docs/enterprise/codefresh-on-prem/
toc: true
---

## Introduction

This manual will guide you through the installation of the Codefresh platform on your on-prem environment. This manual is intended to cover all aspects of installation, upgrading, and maintenance.  Please read this manual carefully before installing Codefresh.

[kcfi](https://github.com/codefresh-io/kcfi) (the Kubernetes Codefresh Installer) is a one-stop-shop for this purpose. Even though Codefresh offers multiple tools to install components, `kcfi` aggregates all of them into a single tool.

## Survey -- What Codefresh Needs to Know

The following information needs to be provided to Codefresh before the installation to make sure your on-prem environment is ready for deployment:

Please fill out [this survey](https://docs.google.com/forms/d/e/1FAIpQLSf18sfG4bEQuwMT7p11F6q70JzWgHEgoAfSFlQuTnno5Rw3GQ/viewform).

## Supported Operating Systems and Git Providers

The `kcfi` tool supports the following operating systems:

- Windows 10/7
- Linux
- OSX

Codefresh supports the following Git providers:

- GitHub: SaaS and on-premises versions
- Bitbucket: SaaS and Bitbucket server (on-premises) 5.4.0 version and above
- GitLab: SaaS and on-premise versions (API v4 only)

## Prerequisites

- Kubernetes cluster (version between v1.19 and v1.21)
  - *Note:* Kubernetes v1.19 maintenance support ended on Oct 28, 2021
  - Minimum node sizes:
    - Single node: 8 CPU core and 16GB RAM
    - Multi node: master(s) + 3 nodes with 4 CPU core and 8GB RAM (24 GB in total)

- Service Account file (provided by Codefresh)
- Default app credentials (provided by Codefresh)
- Storage size allocated for Codefresh persisted services - described in the storage section

Codefresh will need an outbound connection to the Internet for the following services:

- GCR - pulling platform images
- Dockerhub - pulling pipeline images

## Security Constraints

Codefresh has some security assumptions about the Kubernetes cluster it is installed on.

### RBAC for Codefresh

The Codefresh installer should be run with a Kubernetes RBAC role that allows object creation in a single namespace.  If, by corporate policy, you do not allow the creation of service accounts or roles, a Kubernetes administrator will need to create the role, service account, and binding as shown below.  Users with the `codefresh-app` role do not have the ability to create other roles or role bindings.

`codefresh-app-service-account.yaml`
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: codefresh-app
  namespace: codefresh
```

`codefresh-app-role.yaml`
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: codefresh-app
  namespace: codefresh
rules:
- apiGroups:
  - ""
  - apps
  - codefresh.io
  - autoscaling
  - extensions
  - batch
  resources:
  - '*'
  verbs:
  - '*'
- apiGroups:
  - networking.k8s.io
  - route.openshift.io
  - policy
  resources:
  - routes
  - ingresses
  - poddisruptionbudgets
  verbs:
  - '*'
```

`codefresh-app-roleBinding.yaml`
```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  labels:
    app: codefresh
  name: codefresh-app-binding
  namespace: codefresh
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: codefresh-app
subjects:
- kind: ServiceAccount
  name: codefresh-app
```

To apply these changes, run:

```
kubectl apply -f [file]
```

### Operator CRD

If, due to security rules you are not allowed to create a CRD for a client running `kcfi`, have an Administrator create the RBAC (as instructed above) and the CRD as follows:

`codefresh-crd.yaml`
```yaml
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: codefreshes.codefresh.io
  labels:
    app: cf-onprem-operator
spec:
  group: codefresh.io
  names:
    kind: Codefresh
    listKind: CodefreshList
    plural: codefreshes
    singular: codefresh
  scope: Namespaced
  subresources:
    status: {}
  versions:
  - name: v1alpha1
    served: true
    storage: true
```

To apply these changes, run:
```
kubectl apply -f codefresh-crd.yaml
```

You will also need to modify the `config.yaml` for `kcfi` by setting `skipCRD: true` and `serviceAccountName: codefresh-app`:

`config.yaml`
```yaml
    operator:
      #dockerRegistry: gcr.io/codefresh-enterprise
      #image: codefresh/cf-onprem-operator
      #imageTag:
      serviceAccountName: codefresh-app
      skipCRD: true
```

## Download and Install `kcfi`

`kcfi` is a single binary and doesn’t have any dependencies.

Download the binary from [GitHub](https://github.com/codefresh-io/kcfi/releases).
>Note: Darwin is for OSX

Extract the downloaded file.

Copy the file to your $PATH, i.e. `cp /path/to/kcfi /usr/local/bin`

## Install the Codefresh Platform

### Step 1 -- Set the Current Context

Make sure you have a `kubeconfig` file with the correct context set.

i.e.,

```
kubectl config get-contexts                  # display list of contexts
kubectl config use-context my-cluster-name   # set the default context to my-cluster-name
kubectl config current-context               # verify the current-context`
```

### Step 2 -- Prepare the Codefresh Platform Installation

Run the following:

```
kcfi init codefresh [-d /path/to/stage-dir]
```
Running the init command will create a directory containing a `config.yaml` file, which will be uses to configure our installation, along with other files and directories required for the installation.

Edit the configuration in `config.yaml` and deploy to Kubernetes. The `config.yaml` is very descriptive and it contains an explanation for every parameter.

#### Installation Methods (Helm or Codefresh CRD)

You have the option to install by either the Codefresh CRD Definition (as described above), or by using Helm, which will install/upgrade the chart from the client.
Define either **operator** or **helm** as your preferred installation method in the `config.yaml`:

```yaml
  installer:
    # type: 
    #   "operator" - apply codefresh crd definition
    #   "helm" - install/upgrade helm chart from client
```

If you install Codefresh on the air-gapped environment (without access to public Docker Hub or codefresh-enterprise registry) you will have to copy the images to your organization container registry (Kubernetes will pull the images from it as part of the installation).
This can be done by uncommenting and setting the proper values in the `config.yaml` file:

```yaml
images:
  codefreshRegistrySa: sa.json
  # usePrivateRegistry: false
  # privateRegistry:
  #   address:
  #   username:
  #   password:
  lists:
  - images/images-list
```
Set `usePrivateRegistry: true`, and set `privateRegistry` `address`, `username` and `password`.
 
Then, execute the following:

```
kcfi images push  [-c|--config /path/to/config.yaml] 
```

Or, to push a single image, execute the following:
```
kcfi images push [-c|--config /path/to/config.yaml] [options] repo/image:tag [repo/image:tag]
```

You can find a full list of options by running `kcfi images --help`.

Even if you are running a Kubernetes cluster that has outgoing access to the public Internet, note that Codefresh platform images are not public and can be obtained by using `sa.json` file provided by Codefresh support personnel.

Use the flag `--codefresh-registry-secret` to pass the path to the file `sa.json`.

### Step 3 -- TLS Certificates (Optional)

It is highly recommended to use TLS certificates for a secured installation. In the `config.yaml` file set `tls.selfSigned=false` and place both `ssl.crt` and `private.key` into certs/ directory.

>Note: Any valid TLS certificate will work, i.e. certificates from lets-encrypt or a Corporate Signed certificate.

### Step 4 -- Deploy

Deploy the Codefresh Platform by running:

```
kcfi deploy [ -c config.yaml ] [ --kube-context <kube-context-name> ] [ --atomic ] [ --debug ] [ helm upgrade parameters ]
```
### Step 5 -- Install the Codefresh Kubernetes Agent

The cf-k8s-agent is responsible for accessing Kubernetes resources (pods, deployments, services, etc.) behind the firewall in order to display them in the Codefresh UI.  It can be installed in a separate cluster from the installer, or in a separate namespace in the same cluster.

The agent streams updates from cluster resources and then sends information updates to the `k8s-monitor` service.

Execute the following:

```
kcfi init k8s-agent
```
A staging directory will be created named k8s-agent with a `config.yaml`.
Edit k8s-agent/config.yaml and run:

```
kcfi deploy [ -c config.yaml ] [-n namespace]
```


## High-Availability (HA) with active-passive clusters
Enable high-availability in the Codefresh platform for disaster recovery with an active-passive cluster configuration.  
Review the prerequisites, and then do the following to configure high-availability:
* For new installations, install Codefresh on the active cluster  
* Install Codefresh on the passive cluster  
* When needed, switch between clusters for disaster recovery

**Prerequisites**

* **K8s clusters**  
  Two K8s clusters, one designated as the active cluster, and the other designated as the passive cluster for disaster recovery.  

* **External databases and services**  
  Databases and services external to the clusters.  

  * Postgres database (see [Configuring an external Postgres database](#configuring-an-external-postgres-database))
  * MongoDB (see [Configuring an external MongoDB](#configuring-an-external-mongodb))
  * Redis service (see [Configuring an external Redis service](#configure-an-external-redis-service))
  * RabbitMQ service (see [Configuring an external RabbitMQ service](#configure-an-external-redis-service))  
  * Consul service (see [Configuring an external Consul service](#configuring-an-external-consul-service))

* **DNS record**  
  To switch between clusters for disaster recovery

**Install Codefresh on active cluster**

If you are installing Codefresh for the first time, install Codefresh on the cluster designated as the _active_ cluster.  
See [Installing the Codefresh platform]({{site.baseurl}}/docs/administration/codefresh-on-prem/#install-the-codefresh-platform).

**Install Codefresh on passive cluster**

First get the `values.yaml` file from the current Codefresh installation on the active cluster. Then install Codefresh on the passive cluster using Helm. 

**Get values.yaml**
1. Switch your kube context to the active cluster.
1. Get `values.yaml` from the active cluster:  
  `helm get values ${release_name} -n ${namespace} > cf-passive-values.yaml`  
  where:  
  `{release-version}` is the name of the Codefresh release, and is by default `cf`.   
  `${namespace}` is the namespace with the Codefresh release, and is by default `codefresh`.  

{:start="3"}
1. Update the required variables in `cf-passive-values.yaml`.  
  > If the variables do not exist, add them to the file.

  * In the `global` section, disable `seedJobs` by setting it to `false`:
  
  ```yaml
  global:
    seedJobs: false
  ```

  * Add variable `FREEZE_WORKFLOWS_EXECUTION` to `cfapi`, and set it to `true`.

  ```yaml
  cfapi:
    env:
      FREEZE_WORKFLOWS_EXECUTION: true
  ``` 

**Install Codefresh on passive cluster**   

1. Download the Helm chart:  
  `helm repo add codefresh-onprem-prod http://charts.codefresh.io/prod`  
  `helm fetch codefresh-onprem-prod/codefresh --version ${release-version}`  
  where:  
  `{release-version}` is the version of Codefresh you are downloading. 

1. Unzip the Helm chart:  
  `tar -xzf codefresh-${release-version}.tgz`
1. Go to the folder where you unzipped the Helm chart.
1. Install Codefresh with the Helm command using `cf-passive-values.yaml`:  
  `helm install cf . -f ${path}/cf-passive-values.yaml -n codefresh`


**Switch between clusters for disaster recovery**

For disaster recovery, switch between the active and passive clusters.

1. In the `cfapi` deployment on the _active_ cluster, change the value of `FREEZE_WORKFLOWS_EXECUTION` from `false` to `true`.  
  If the variable does not exist, add it, and make sure the value is set to `true`.  
1. In the `cfapi` deployment on the _passive_ cluster, change the value of `FREEZE_WORKFLOWS_EXECUTION` from `true` to `false`. 
1. Switch DNS from the currently active cluster to the passive cluster.

**Services without HA**

The following services cannot run in HA, but are not critical in case of downtime or during the process of switchover from active to passive.
These services are not considered critical as they are part of build-handling. In case of failure, a build retry occurs, ensuring that the build is always handled.
* `cronus`
* `cf-sign`


## Additional Configurations

After you install Codefresh, these are some day-2 operations that you should follow.

### Setup Git Integration (Optional)

Codefresh supports out-of-the-box Git logins using your local username and password, or logins using your git provider (per the list and instructions of providers below). You can also configure login to supported SSO providers post-install as described [in the Codefresh documentation]({{site.baseurl}}/docs/administration/single-sign-on/sso-setup-oauth2/).

If you’d like to set up a login to Codefresh using your Git provider, first login using the default credentials (username: `AdminCF`, password: `AdminCF` and add your Git provider OAuth integration details in our admin console: 

**Admin Management** > **IDPs** tab

To get the Client ID and Client Secret for each of the supported Git providers, follow the instructions according to your VCS provider.

#### GitHub Enterprise

Navigate to your GitHub organization settings: https://github.com/organizations/your_org_name/settings.

On the left-hand side, under **Developer settings**, select **OAuth Apps**, and click **Register an Application**.

Complete the OAuth application registration as follows:

- **Application name:** codefresh-on-prem (or a significant name)
- **Homepage URL:** https://your-codefresh-onprem-domain
- **Authorization callback URL:** https://your-codefresh-onprem-domain/api/auth/github/callback

After registration, note down the created Client ID and Client Secret. They will be required for the settings in **Codefresh Admin**->**IDPs**

#### GitLab

Navigate to your Applications menu in GitLab User Settings: https://gitlab.com/profile/applications

Complete the application creation form as follows:

- **Name:** codefresh-onprem (or a significant name)
- **Redirect URI:** https://your-codefresh-onprem-domain/api/auth/gitlab/callback
- **Scopes (permissions):**
  - API
  - read_user
  - read_registry

Click **Save application**.

After app creation, note down the created Application ID and Client Secret. They will be required for the settings in **Codefresh Admin**->**IDPs**.

{% include image.html
  lightbox="true"
  file="/images/administration/installation/git-idp.png"
  url="/images/administration/installation/git-idp.png"
    %}   

>Note: When configuring the default IDP (for GitHub, GitLab, etc), do not modify the Client Name field. Please keep them as GitHub, GitLab, BitBucket, etc. Otherwise, the signup and login views won’t work.

### Proxy Configuration

If your environment resides behind HTTP proxies, you need to uncomment the following section in config.yaml:

```yaml
global:
  env:
    HTTP_PROXY: "http://myproxy.domain.com:8080"
    http_proxy: "http://myproxy.domain.com:8080"
    HTTPS_PROXY: "http://myproxy.domain.com:8080"
    https_proxy: "http://myproxy.domain.com:8080"
    NO_PROXY: "127.0.0.1,localhost,kubernetes.default.svc,.codefresh.svc,100.64.0.1,169.254.169.254,cf-builder,cf-cfapi,cf-cfui,cf-chartmuseum,cf-charts-manager,cf-cluster-providers,cf-consul,cf-consul-ui,cf-context-manager,cf-cronus,cf-helm-repo-manager,cf-hermes,cf-ingress-controller,cf-ingress-http-backend,cf-kube-integration,cf-mongodb,cf-nats,cf-nomios,cf-pipeline-manager,cf-postgresql,cf-rabbitmq,cf-redis,cf-registry,cf-runner,cf-runtime-environment-manager,cf-store"
    no_proxy: "127.0.0.1,localhost,kubernetes.default.svc,.codefresh.svc,100.64.0.1,169.254.169.254,cf-builder,cf-cfapi,cf-cfui,cf-chartmuseum,cf-charts-manager,cf-cluster-providers,cf-consul,cf-consul-ui,cf-context-manager,cf-cronus,cf-helm-repo-manager,cf-hermes,cf-ingress-controller,cf-ingress-http-backend,cf-kube-integration,cf-mongodb,cf-nats,cf-nomios,cf-pipeline-manager,cf-postgresql,cf-rabbitmq,cf-redis,cf-registry,cf-runner,cf-runtime-environment-manager,cf-store"
```
In addition to this, you should also add your Kubernetes API IP address (`kubectl get svc kubernetes`) to both: `NO_PROXY` and `no_proxy`.

### Storage

Codefresh is using both cluster storage (volumes) as well as external storage.

#### Databases

The following table displays the list of databases created as part of the installation:

| Database | Purpose | Latest supported version |
|----------|---------| ---------------|
| mongoDB | storing all account data (account settings, users, projects, pipelines, builds etc.) | 4.2.x |
| postgresql | storing data about events that happened on the account (pipeline updates, deletes, etc.). The audit log uses the data from this database. | 13.x |
| redis | mainly used for caching, but also used as a key-value store for our trigger manager. | 6.0.x |

#### Volumes

These are the volumes required for Codefresh on-premises:


{: .table .table-bordered .table-hover}
| Name           | Purpose                | Minimum Capacity | Can run on netfs (nfs, cifs) |
|----------------|------------------------|------------------|------------------------------|
| cf-mongodb*    | Main database - Mongo  | 8GB              | Yes**                        |
| cf-postgresql* | Events databases - Postgres | 8GB         | Yes**                        |
| cf-rabbitmq*   | Message broker         | 8GB              | No**                         |
| cf-redis*      | Cache                  | 8GB              | No**                         |
| cf-store       | Trigger Redis data     | 8GB              | No**                         |
| cf-cronus      | Trigger crontab data   | 1GB              | Yes                          |
| datadir-cf-consul-0 | Consul datadir    | 1GB              | Yes                          |
| cf-chartmuseum | chartmuseum            | 10GB             | Yes                          |
| cf-builder-0   | /var/lib/docker for builder | 100GB       | No***                        |
| cf-runner-0    | /var/lib/docker for composition runner | 100GB | No***                   |

{% raw %}

 (*) Possibility to use external service 

 (**) Running on netfs (nfs, cifs) is not recommended by product admin guide

 (***) Docker daemon can be run on block device only

{% endraw %}

StatefulSets (`cf-builder` and `cf-runner`) process their data on separate physical volumes (PVs) and can be claimed using Persistent Volume Claims (PVCs) with default initial sizes of 100Gi. Also, those StatefulSets have the ability to connect to existing pre-defined PVCs. 

The default initial volume size (100 Gi) can be overridden in the custom `config.yaml` file. Values descriptions are in the `config.yaml` file.
The registry’s initial volume size is 100Gi. It also can be overridden in a custom `config.yaml` file. There is a possibility to use a customer-defined registry configuration file (`config.yaml`) that allows using different registry storage back-ends (S3, Azure Blob, GCS, etc.) and other parameters. More details can be found in the [Docker documentation](https://docs.docker.com/registry/configuration/).

Depending on the customer’s Kubernetes version we can assist with PV resizing. Details are can be found in this [Kubernetes blog post](https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/).

#### Automatic Volume Provisioning

Codefresh installation supports automatic storage provisioning based on the standard Kubernetes dynamic provisioner Storage Classes and Persistent Volume Claims. All required installation volumes will be provisioned automatically using the default Storage Class or custom Storage Class that can be specified as a parameter in `config.yaml` under `storageClass: my-storage-class`.

### Retention policy for Codefresh builds
You can define a retention policy to manage Codefresh builds. The retention settings are controlled through environment variables, all of which have default settings which you can retain or customize. The default policy is set to delete builds older than six months, including offline logs.

The retention mechanism is implemented as a Cron Job through the Codefresh. It removes data from collections such as:
* workflowproccesses
* workflowrequests
* workflowrevisions

{: .table .table-bordered .table-hover}
| Env Variable                   | Description                                                                     | Default                | 
|------------------------------- |-------------------------------------------------------------------------------- |----------------------  |
|`RETENTION_POLICY_IS_ENABLED`      | Determines if automatic build deletion through the Cron job is enabled.         | `true`                 |
|`RETENTION_POLICY_BUILDS_TO_DELETE`| The maximum number of builds to delete by a sinle Cron job. To avoid database issues, especially when there are large numbers of old builds, we recommend deleting them in small chunks. You can gradually increase the number after verifying that performance is not affected.                                   | `50`                  |
|`RETENTION_POLICY_DAYS`         | The number of days for which to retain builds. Builds older than the defined retention period are deleted.                                  | `180`              |
|`RUNTIME_MONGO_URI`             | Optional. The URI of the Mongo database from which to remove MongoDB logs (in addition to the builds). |              |
                                

### Managing Codefresh backups

Codefresh on-premises backups can be automated by installing a specific service as an addon to your Codefresh on-premises installation. It is based on the [mgob](https://github.com/stefanprodan/mgob) open source project and can run scheduled backups with retention, S3 & SFTP upload, notifications, instrumentation with Prometheus and more.

#### Configuring and Installing the Backup Manager

Backup manager is installed as an addon and therefore it needs an existing Codefresh on-premises installation. Before installing it, please make sure you have selected a proper kube config pointing to the cluster, where you have Codefresh installed on.

To configure backup manager, please go to the staging directory of your Codefresh installation and find a specific config file: `your-CF-stage-dir/addons/backup-manager/config.yaml`.

There you will find a few configuration parameters, which you might want to change:

* `metadada` - various CF-installer-specific parameters, which should not be changed in this case
* `kubernetes` - here you can specify a kube context, kube config file and a namespace for the backup manager
* `storage`- storage class, storage size and read modes for persistent volumes to store backups locally within your cluster
* Backup plan configuration parameters under `jobConfigs.cfBackupPlan`:
    * `target.uri` - target mongo URI. It is recommended to leave the mongo uri value blank - it will be taken automatically from the Codefresh release installed in your cluster
    * `scheduler` - here you can specify cron expression for your backups schedule, backups retention and timeout values

For more advanced backup plan settings, like specifying various remote cloud-based storage providers for your backups, configuring notifications and other, please refer to [this](https://github.com/stefanprodan/mgob#configure) page 

To **deploy the backup manager** service, please select a correct kube context, where you have Codefresh on-premises installed and deploy backup-manager with the following command:

```
kcfi deploy -c `your-CF-stage-dir/addons/backup-manager/config.yaml`
```

#### On-demand/ad-hoc backup
```
kubectl port-forward cf-backup-manager-0 8090
curl -X POST http://localhost:8090/backup/cfBackupPlan
```

#### Restore from backup
```
kubectl exec -it cf-backup-manager-0 bash
mongorestore --gzip --archive=/storage/cfBackupPlan/backup-archive-name.gz --uri mongodb://root:password@mongodb:27017 --drop
```

### Configuring AWS Load Balancers

By default Codefresh deploys the [ingress-nginx](https://github.com/kubernetes/ingress-nginx/) controller and [Classic Load Balancer](https://docs.aws.amazon.com/eks/latest/userguide/load-balancing.html) as a controller service.

#### NLB

To use a **Network Load Balancer** - deploy a regular Codefresh installation with the following ingress config for the the `cf-ingress-controller` controller service.

`config.yaml`
```yaml
ingress:
  controller:
    service:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-type: nlb
        service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
        service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '60'
        service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: 'true'

tls:
  selfSigned: false
  cert: certs/certificate.crt
  key: certs/private.key
```
This annotation will create a new Load Balancer - Network Load Balancer, which you should use in the Codefresh UI DNS record.
Update the DNS record according to the new service. 

#### L7 ELB with SSL Termination

When a **Classic Load Balancer** is used, some Codefresh features that (for example `OfflineLogging`), will use a websocket to connect with Codefresh API and they will require secure TCP (SSL) protocol enabled on the Load Balancer listener instead of HTTPS.

To use either a certificate from a third party issuer that was uploaded to IAM or a certificate [requested](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) within AWS Certificate Manager see the followning config example:


`config.yaml`
```yaml
ingress:
  controller:
    service:
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"
        service.beta.kubernetes.io/aws-load-balancer-ssl-ports: "443"
        service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: '3600'
        service.beta.kubernetes.io/aws-load-balancer-ssl-cert: < CERTIFICATE ARN >
      targetPorts:
        http: http
        https: http
        
tls:
  selfSigned: true        
```

- both http and https target port should be set to **80**.
- update your AWS Load Balancer listener for port 443 from HTTPS protocol to SSL.

#### ALB

To use the **Application Load Balancer** the [ALB Ingress Controller](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) should be deployed to the cluster.

To support ALB:

-  First disable Nginx controller in the Codefresh init config file - __config.yaml__:

```yaml
ingress:
  enabled: false
```

- [deploy](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html) the ALB controller;
- create a new **ingress** resource:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    kubernetes.io/ingress.class: alb
    meta.helm.sh/release-name: cf
    meta.helm.sh/release-namespace: codefresh
  labels:
    app: cf-codefresh
    release: cf
  name: cf-codefresh-ingress
  namespace: codefresh
spec:
  defaultBackend:
    service:
      name: cf-cfui
      port:
        number: 80
  rules:
  - host: myonprem.domain.com
    http:
      paths:
      - backend:
          service:
            name: cf-cfapi
            port:
              number: 80
        path: /api/*
        pathType: ImplementationSpecific
      - backend:
          service:
            name: cf-cfapi
            port:
              number: 80
        path: /ws/*
        pathType: ImplementationSpecific
      - backend:
          service:
            name: cf-cfui
            port:
              number: 80
        path: /
        pathType: ImplementationSpecific
```

### Configure CSP (Content Security Policy)
Add CSP environment variables to `config.yaml`, and define the values to be returned in the CSP HTTP headers.
```yaml
cfui:
  env:
    CONTENT_SECURITY_POLICY: "<YOUR SECURITY POLICIES>"
    CONTENT_SECURITY_POLICY_REPORT_ONLY: "default-src 'self'; font-src 'self' 
      https://fonts.gstatic.com; script-src 'self' https://unpkg.com https://js.stripe.com; 
      style-src 'self' https://fonts.googleapis.com; 'unsafe-eval' 'unsafe-inline'"
    CONTENT_SECURITY_POLICY_REPORT_TO: "<LIST OF ENDPOINTS AS JSON OBJECTS>"
```
`CONTENT_SECURITY_POLICY` is the string describing content policies. Use semi-colons to separate between policies.  
`CONTENT_SECURITY_POLICY_REPORT_TO` is a comma-separated list of JSON objects. Each object must have a name and an array of endpoints that receive the incoming CSP reports. 

For detailed information, see the [Content Security Policy article on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).
## Using existing external services for data storage/messaging

Normally the Codefresh installer, is taking care of all needed dependencies internally by deploying the respective services (mongo, redis etc) on its own.

You might want however to use your own existing options if you already have those services up and running externally.

### Configuring an external Postgres database

It is possible to configure Codefresh to work with your existing Postgres database service, if you don't want to use the default one as provided by the Codefresh installer.

#### Configuration steps

All the configuration comes down to putting a set of correct values into your Codefresh configuration file `config.yaml`, which is present in `your/stage-dir/codefresh` directory. During the installation, Codefresh will run a seed job, using the values described in the following steps:

1. Specify a user name `global.postgresSeedJob.user` and password `global.postgresSeedJob.password` for a seed job. This must be a privileged user allowed to create databases and roles. It will be used only by the seed job to create the needed database and a user.
2. Specify a user name `global.postgresUser` and password `global.postgresPassword` to be used by Codefresh installation. A user with the name and password will be created by the seed job and granted with required privileges to access the created database.
3. Specify a database name `global.postgresDatabase` to be created by the seed job and used by Codefresh installation.
4. Specify `global.postgresHostname` and optionally `global.postgresPort` (`5432` is a default value).
5. Disable the postgres subchart installation with the `postgresql.enabled: false` value, because it is not needed in this case.


Below is an example of the relevant piece of `config.yaml`:

```yaml
global:
  postgresSeedJob:
    user: postgres
    password: zDyGp79XyZEqLq7V
  postgresUser: cf_user
  postgresPassword: fJTFJMGV7sg5E4Bj
  postgresDatabase: codefresh
  postgresHostname: my-postgres.ccjog7pqzunf.us-west-2.rds.amazonaws.com
  postgresPort: 5432

postgresql:
  enabled: false #disable default postgresql subchart installation
```
#### Running the seed job manually

If you prefer running the seed job manually, you can do it by using a script present in `your/stage-dir/codefresh/addons/seed-scripts` directory named `postgres-seed.sh`. The script takes the following set of variables that you need to have set before running it:

```shell
export POSTGRES_SEED_USER="postgres"
export POSTGRES_SEED_PASSWORD="zDyGp79XyZEqLq7V"
export POSTGRES_USER="cf_user"
export POSTGRES_PASSWORD="fJTFJMGV7sg5E4Bj"
export POSTGRES_DATABASE="codefresh"
export POSTGRES_HOST="my-postgres.ccjog7pqzunf.us-west-2.rds.amazonaws.com"
export POSTGRES_PORT="5432"
```
The variables have the same meaning as the configuration values described in the previous section about Postgres.

However you **still need to specify a set of values** in the Codefresh config file as described in the section above, but with the whole **`postgresSeedJob` section omitted**, like this:

```yaml
global:
  postgresUser: cf_user
  postgresPassword: fJTFJMGV7sg5E4Bj
  postgresDatabase: codefresh
  postgresHostname: my-postgresql.prod.svc.cluster.local
  postgresPort: 5432

postgresql:
  enabled: false #disable default postgresql subchart installation
```

### Configuring an external MongoDB

Codefresh recommends to use the Bitnami MongoDB [chart](https://github.com/bitnami/charts/tree/master/bitnami/mongodb) as a Mongo database. The supported version of Mongo is 4.2.x

To configure Codefresh on-premises to use an external Mongo service one needs to provide the following values in `config.yaml`:

- **mongo connection string** - `mongoURI`. This string will be used by all of the services to communicate with mongo. Codefresh will automatically create and add a user with "ReadWrite" permissions to all of the created databases with the username and password from the URI. Optionally, automatic user addition can be disabled - `mongoSkipUserCreation`, in order to use already existing user. In such a case the existing user must have **ReadWrite** permissions to all of newly created databases
Codefresh does not support [DNS Seedlist Connection Format](https://docs.mongodb.com/manual/reference/connection-string/#connections-dns-seedlist) at the moment, use the [Standard Connection Format](https://docs.mongodb.com/manual/reference/connection-string/#connections-standard-connection-string-format) instead.
- mongo **root user** name and **password** - `mongodbRootUser`, `mongodbRootPassword`. The privileged user will be used by Codefresh only during installation for seed jobs and for automatic user addition. After installation, credentials from the provided mongo URI will be used.  Mongo root user must have permissions to create users.

See the [Mongo required Access](https://docs.mongodb.com/manual/reference/method/db.createUser/#required-access) for more details.

Here is an example of all the related values:

```yaml
global:
  mongodbRootUser: <MONGO ROOT USER>
  mongodbRootPassword: <MONGO ROOT PASSWORD>
  mongoURI: <MONGO URI>
  mongoSkipUserCreation: true
  mongoDeploy: false   # disables deployment of internal mongo service

mongo:
  enabled: false
 ```

#### MongoDB with Mutual TLS

>The option available in kcfi **v0.5.10**

Codefresh supports enabling SSL/TLS between cf microservices and MongoDB. To enable this option specify in `config.yaml` the following parameters:

 `global.mongoTLS: true`  <br />
 `global.mongoCaCert` - CA certificate file path (in kcfi init directory) <br />
 `global.mongoCaKey` - CA certificate private key file path (in kcfi init directory)

`config.yaml` example:
```yaml
global:
  mongodbRootUser: root
  mongodbRootPassword: WOIqcSwr0y
  mongoURI: mongodb://my-mongodb.prod.svc.cluster.local/?ssl=true&authMechanism=MONGODB-X509&authSource=$external
  mongoSkipUserCreation: true
  mongoDeploy: false   # disables deployment of internal mongo service

  mongoTLS: true #enable MongoDB TLS support
  mongoCaCert: mongodb-ca/ca-cert.pem
  mongoCaKey: mongodb-ca/ca-key.pem

  ### for OfflineLogging feature 
  runtimeMongoURI: mongodb://my-mongodb.prod.svc.cluster.local/?ssl=true&authMechanism=MONGODB-X509&authSource=$external

### for OfflineLogging feature 
cfapi:
  env:
    RUNTIME_MONGO_TLS: "true" 
    RUNTIME_MONGO_TLS_VALIDATE: "true" # 'false' if self-signed certificate to avoid x509 errors 

mongo:
  enabled: false #disable default mongodb subchart installation
 ```

 >Perform an upgarde:  <br />
 >`kcfi deploy -c config.yaml --debug`

### Configure an external Redis service
Codefresh recommends to use the Bitnami Redis [chart](https://github.com/bitnami/charts/tree/master/bitnami/redis) as a Redis store.

**Limitations**

Codefresh does not support secure connection to Redis (TLS) and AUTH username extension.

**Configuration**

To configure Codefresh to use an external Redis service, add the following parameters to your `config.yaml`:

`config.yaml` example:
```yaml
global:
  redisUrl: my-redis.prod.svc.cluster.local
  redisPort: 6379
  redisPassword: 6oOhHI8fI5

  runtimeRedisHost: my-redis.prod.svc.cluster.local
  runtimeRedisPassword: 6oOhHI8fI5
  runtimeRedisPort: 6379
  runtimeRedisDb: 2

redis:
  enabled: false #disable default redis subchart installation
```

Where `redis*` - are for the main Redis storage, and `runtimeRedis*` - for storage is used to store pipeline logs in case of `OfflineLogging` feature is turned on. In most cases the host value is the same for these two values.


### Configuring an external RabbitMQ service

Codefresh recommends to use the Bitnami RabbitMQ [chart](https://github.com/bitnami/charts/tree/master/bitnami/rabbitmq) as a RabbitMQ service.

To use an external RabbitMQ service instead of the local helm chart, add the following values to the __config.yaml__:

```yaml
cf-db:
  rabbit:
    enabled: false

global:
  rabbitmqUsername: <RABBITMQ USER>
  rabbitmqPassword: <RABBITMQ PASSWORD>
  rabbitmqHostname: <RABBITMQ HOST>
```

### Configuring an external Consul service


Notice that at the moment Codefresh supports only the deprecated Consul API (image __consul:1.0.0__), and does not support connection via HTTPS and any authentication.
The Consul host must expose port `8500`.

>In general, we don't recommend to take the Consul service outside the cluster.


To configure Codefresh to use your external Consul service, add the following values to the __config.yaml__:

```yaml
global:
  consulHost: <MY CONSUL HOST>

consul:
  enabled: false
```

## App Cluster Autoscaling

Autoscaling in Kubernetes is implemented as an interaction between Cluster Autoscaler and Horizontal Pod Autoscaler

{: .table .table-bordered .table-hover}
|             | Scaling Target| Trigger | Controller | How it Works |
| ----------- | ------------- | ------- | ---------  | --------- |
| [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler)| Nodes | **Up:** Pending pod <br/> **Down:** Node resource allocations is low | On GKE we can turn on/off autoscaler and configure min/max per node group can be also installed separately | Listens on pending pods for scale up and node allocations for scaledown. Should have permissions to call cloud api. Considers pod affinity, pdb, storage, special annotations |
| [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) | replicas on deployments or StatefulSets | metrics value thresholds defined in HPA object | part of Kubernetes controller | Controller gets metrics from "metrics.k8s.io/v1beta1" , "custom.metrics.k8s.io/v1beta1", "external.metrics.k8s.io/v1beta1" requires [metrics-server](https://github.com/kubernetes-sigs/metrics-server) and custom metrics adapters ([prometheus-adapter](https://github.com/kubernetes-sigs/prometheus-adapter), [stackdriver-adapter](https://github.com/GoogleCloudPlatform/k8s-stackdriver/tree/master/custom-metrics-stackdriver-adapter)) to listen on this API (see note (1) below) and adjusts deployment or sts replicas according to definitions in  HorizontalPodAutocaler <br/> There are v1 and beta api versions for HorizontalPodAutocaler: <br/> [v1](https://github.com/kubernetes/api/blob/master/autoscaling/v1/types.go) - supports  for resource metrics (cpu, memory) - `kubect get hpa` <br/> [v2beta2](https://github.com/kubernetes/api/blob/master/autoscaling/v2beta2/types.go)  and [v2beta1](https://github.com/kubernetes/api/blob/master/autoscaling/v2beta1/types.go) - supports for both resource and custom metrics - `kubectl get hpa.v2beta2.autoscaling` **The metric value should decrease on adding new pods.** <br/> *Wrong metrics Example:* request rate <br/> *Right metrics Example:* average request rate per pod |

Note (1)   
```
kubectl get apiservices | awk 'NR==1 || $1 ~ "metrics"'
NAME                                   SERVICE                                      AVAILABLE   AGE
v1beta1.custom.metrics.k8s.io          monitoring/prom-adapter-prometheus-adapter   True        60d
v1beta1.metrics.k8s.io                 kube-system/metrics-server                   True        84d
```


**Implementation in Codefresh** 

* Default “Enable Autoscaling” settings for GKE
* Using [prometheus-adapter](https://github.com/kubernetes-sigs/prometheus-adapter) with custom metrics

We define HPA for cfapi and pipeline-manager services

**CFapi HPA object**

It's based on three metrics (HPA controller scales of only one of the targetValue reached): 

```
kubectl get hpa.v2beta1.autoscaling cf-cfapi -oyaml
```

{% highlight yaml %}
{% raw %}
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  annotations:
    meta.helm.sh/release-name: cf
    meta.helm.sh/release-namespace: default
  labels:
    app.kubernetes.io/managed-by: Helm
  name: cf-cfapi
  namespace: default
spec:
  maxReplicas: 16
  metrics:
  - object:
      metricName: requests_per_pod
      target:
        apiVersion: v1
        kind: Service
        name: cf-cfapi
      targetValue: "10"
    type: Object
  - object:
      metricName: cpu_usage_avg
      target:
        apiVersion: apps/v1
        kind: Deployment
        name: cf-cfapi-base
      targetValue: "1"
    type: Object
  - object:
      metricName: memory_working_set_bytes_avg
      target:
        apiVersion: apps/v1
        kind: Deployment
        name: cf-cfapi-base
      targetValue: 3G
    type: Object
  minReplicas: 2
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cf-cfapi-base
{% endraw%}
{% endhighlight %}

* `requests_per_pod` is based on  `rate(nginx_ingress_controller_requests)` metric ingested from nginx-ingress-controller
* `cpu_usage_avg` based on cadvisor (from kubelet) rate `(rate(container_cpu_user_seconds_total)`
* `memory_working_set_bytes_avg` based on cadvisor `container_memory_working_set_bytes`

**pipeline-manager HPA**

based on `cpu_usage_avg`

{% highlight yaml %}
{% raw %}
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  annotations:
    meta.helm.sh/release-name: cf
    meta.helm.sh/release-namespace: default
  labels:
    app.kubernetes.io/managed-by: Helm
  name: cf-pipeline-manager
spec:
  maxReplicas: 8
  metrics:
  - object:
      metricName: cpu_usage_avg
      target:
        apiVersion: apps/v1
        kind: Deployment
        name: cf-pipeline-manager-base
      targetValue: 400m
    type: Object
  minReplicas: 2
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: cf-pipeline-manager-base
{% endraw%}
{% endhighlight %}

**prometheus-adapter configuration**

Reference: [https://github.com/DirectXMan12/k8s-prometheus-adapter/blob/master/docs/config.md](https://github.com/DirectXMan12/k8s-prometheus-adapter/blob/master/docs/config.md 
)

{% highlight yaml %}
{% raw %}
Rules:
  - metricsQuery: |
      kube_service_info{<<.LabelMatchers>>} * on() group_right(service)
        (sum(rate(nginx_ingress_controller_requests{<<.LabelMatchers>>}[2m]))
          / on() kube_deployment_spec_replicas{deployment='<<index .LabelValuesByName "service">>-base',namespace='<<index .LabelValuesByName "namespace">>'})
    name:
      as: requests_per_pod
      matches: ^(.*)$
    resources:
      overrides:
        namespace:
          resource: namespace
        service:
          resource: service
    seriesQuery: kube_service_info{service=~".*cfapi.*"}
  - metricsQuery: |
      kube_deployment_labels{<<.LabelMatchers>>} * on(label_app) group_right(deployment)
        (label_replace(
          avg by (container) (rate(container_cpu_user_seconds_total{container=~"cf-(tasker-kubernetes|cfapi.*|pipeline-manager.*)", job="kubelet", namespace='<<index .LabelValuesByName "namespace">>'}[15m]))
        , "label_app", "$1", "container", "(.*)"))
    name:
      as: cpu_usage_avg
      matches: ^(.*)$
    resources:
      overrides:
        deployment:
          group: apps
          resource: deployment
        namespace:
          resource: namespace
    seriesQuery: kube_deployment_labels{label_app=~"cf-(tasker-kubernetes|cfapi.*|pipeline-manager.*)"}
  - metricsQuery: "kube_deployment_labels{<<.LabelMatchers>>} * on(label_app) group_right(deployment)\n
      \ (label_replace(\n    avg by (container) (avg_over_time (container_memory_working_set_bytes{container=~\"cf-.*\",
      job=\"kubelet\", namespace='<<index .LabelValuesByName \"namespace\">>'}[15m]))\n
      \ , \"label_app\", \"$1\", \"container\", \"(.*)\"))\n  \n"
    name:
      as: memory_working_set_bytes_avg
      matches: ^(.*)$
    resources:
      overrides:
        deployment:
          group: apps
          resource: deployment
        namespace:
          resource: namespace
    seriesQuery: kube_deployment_labels{label_app=~"cf-.*"}
  - metricsQuery: |
      kube_deployment_labels{<<.LabelMatchers>>} * on(label_app) group_right(deployment)
        label_replace(label_replace(avg_over_time(newrelic_apdex_score[15m]), "label_app", "cf-$1", "exported_app", '(cf-api.*|pipeline-manager|tasker-kuberentes)\\[kubernetes\\]'), "label_app", "$1cfapi$3", "label_app", '(cf-)(cf-api)(.*)')
    name:
      as: newrelic_apdex
      matches: ^(.*)$
    resources:
      overrides:
        deployment:
          group: apps
          resource: deployment
        namespace:
          resource: namespace
    seriesQuery: kube_deployment_labels{label_app=~"cf-(tasker-kubernetes|cfapi.*|pipeline-manager)"}
{% endraw%}
{% endhighlight %}

**How to define HPA in Codefresh installer (kcfi) config**

Most of Codefresh's Microservices subcharts contain `templates/hpa.yaml`:

{% highlight yaml %}
{% raw %}
{{- if .Values.HorizontalPodAutoscaler }}
apiVersion: autoscaling/v2beta1
kind: HorizontalPodAutoscaler
metadata:
  name:  {{ template "cfapi.fullname" . }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ template "cfapi.fullname" . }}-{{ .version | default "base" }}
  minReplicas: {{ coalesce .Values.HorizontalPodAutoscaler.minReplicas .Values.replicaCount 1 }}
  maxReplicas: {{ coalesce .Values.HorizontalPodAutoscaler.maxReplicas .Values.replicaCount 2 }}
  metrics:
{{- if .Values.HorizontalPodAutoscaler.metrics }}
{{ toYaml .Values.HorizontalPodAutoscaler.metrics | indent 4 }}
{{- else }}
  - type: Resource
    resource:
      name: cpu
      targetAverageUtilization: 60
{{- end }}
{{- end }}
{% endraw%}
{% endhighlight %}

To configure HPA for CFapi add `HorizontalPodAutoscaler` values to config.yaml, for example:

(assuming that we already have prometheus adapter configured for metrics `requests_per_pod`, `cpu_usage_avg`, `memory_working_set_bytes_avg`)

{% highlight yaml %}
{% raw %}
cfapi:
  replicaCount: 4
  resources:
    requests:
      memory: "4096Mi"
      cpu: "1100m"
    limits:
      memory: "4096Mi"
      cpu: "2200m"
  HorizontalPodAutoscaler:
    minReplicas: 2
    maxReplicas: 16
    metrics:
    - type: Object
      object:
        metricName: requests_per_pod
        target:
          apiVersion: "v1"
          kind: Service
          name: cf-cfapi
        targetValue: 10
    - type: Object
      object:
        metricName: cpu_usage_avg
        target:
          apiVersion: "apps/v1"
          kind: Deployment
          name: cf-cfapi-base
        targetValue: 1
    - type: Object
      object:
        metricName: memory_working_set_bytes_avg
        target:
          apiVersion: "apps/v1"
          kind: Deployment
          name: cf-cfapi-base
        targetValue: 3G
{% endraw%}
{% endhighlight %}

**Querying metrics (for debugging)**

CPU Metric API Call

```
kubectl get --raw /apis/metrics.k8s.io/v1beta1/namespaces/codefresh/pods/cf-cfapi-base-****-/ | jq 
```

Custom Metrics Call

```
kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1/namespaces/codefresh/services/cf-cfapi/requests_per_pod | jq
```

## Upgrade the Codefresh Platform

To upgrade Codefresh to a newer version

1. Locate the `config.yml` file you used in the initial installation, and change the release number inside it
1. Perform a dry run with `kcfi upgrade --dry-run --atomic -c codefresh/config.yaml` and see if there are no errors
1. Do the actual upgrade with `kcfi upgrade --atomic -c codefresh/config.yaml`
1. Run `watch kubectl -ncodefresh get pods` and wait for all the pods to be in running state
1. Log in the Codefresh UI and inspect the new version
1. Enable/disable new feature flags if needed

Notice that only `kfci` should be used for Codefresh upgrades. If you still have a `cf-onprem` script at hand, please contact us for migration instructions.

<a name="migrating-existing-installations"></a>
###  Backward compatibility for infrastructure services
If you already have Codefresh version 1.0.202 or lower installed, and are upgrading to a later version, _before upgrade, to retain the existing images_ for the services listed below, update the `config.yaml` for `kcfi`.

* `cf-mongodb`
* `cf-redis`
* `cf-rabbitmq`
* `cf-postgresql`
* `cf-nats`
* `cf-consul`

> In the `config.yaml` below, if needed, replace the `bitnami` prefix with that of your private repo.

```yaml
...

global:
  ### Codefresh App domain name. appUrl is manadatory parameter
  appUrl: onprem.mydomain.com
  appProtocol: https

  mongodbImage: bitnami/mongodb:3.6.13-r0 # (default `mongodbImage: bitnami/mongodb:4.2`)

mongodb:
  image: bitnami/mongodb:3.6.13-r0 # (default `image: bitnami/mongodb:4.2`)
  podSecurityContext:
    enabled: true
    runAsUser: 0
    fsGroup: 0
  containerSecurityContext:
    enabled: false    

### rabbitmq subchart replaced with cf-db subchart
### you can remove `rabbitmq` section from config

# rabbitmq:
#   image: bitnami/rabbitmq:3.7.2-r1
#   podSecurityContext:
#     enabled: false
#   containerSecurityContext:
#     enabled: false  

redis:
  image: bitnami/redis:3.2.9-r2 # (default `image: bitnami/redis:6.0.16`)
  podSecurityContext:
    enabled: false
  containerSecurityContext:
    enabled: false  

postgresql:
  imageTag: 9.6.2 # (default `imageTag:13`)

nats:
  imageTag: 0.9.4  # (default `imageTag:2.7`)

consul:
  ImageTag: 1.0.0 # (default `imageTag:1.11`)


...
```

## Common Problems, Solutions, and Dependencies

### Dependencies

#### Mongo

All services using the MongoDB are dependent on the `mongo` pod being up and running. If the `mongo` pod is down, the following dependencies will not work:

- `runtime-environment-manager`
- `pipeline-manager`
- `cf-api`
- `cf-broadcaster`
- `context-manager`
- `nomios`
- `cronius`
- `cluster-promoters`
- `k8s-monitor`
- `charts-manager`
- `tasker-kubernetes`

#### Logs

There is a dependency between the `cf-broadcaster` pod and the `cf-api` pod.  If your pipeline runs, but does not show any logs, try restarting the broadcaster pod.

### Problems and Solutions

**Problem:** installer fails because `codefresh` database does not exist.

**Solution:** If you are using an external PostgresSQL database (instead of the internal one that the installer provides), you will first need to manually create a new database named `codefresh` inside your PostgresSQL database before running the installer.


