---
title: "Codefresh On-premise Installation"
description: "Use the Kubernetes Codefresh Installer to install the Codefresh platform on-premises"
group: enterprise
toc: true
---

## Introduction

This manual will guide you through the installation of Codefresh platform on your On-prem environment.  This manual is intended to cover all aspects of installation, upgrade, and maintenance.  Please read this manual carefully before installing Codefresh.

`kfci` (the Kubernetes Codefresh Installer) is a one-stop-shop, while Codefresh offers multiple tools to install components, kcfi will aggregate all of them into a single tool.

## Survey -- What Codefresh Needs to Know

The following information needs to be provided to Codefresh before the installation to make sure your on-prem environment is ready for deployment:

Please fill out the survey [here](https://docs.google.com/forms/d/e/1FAIpQLSf18sfG4bEQuwMT7p11F6q70JzWgHEgoAfSFlQuTnno5Rw3GQ/viewform).

## Supported Operating Systems and Git Providers

The `kcfi` tool supports the operation systems:

- Windows 10/7
- Linux
- OSX

Codefresh supports the following Git providers:

- GitHub: SaaS and on-premise versions
- Bitbucket: SaaS and Bitbucket server (on-premise) 5.4.0 version and above
- GitLab: SaaS and on-premise versions (API v4 only)

## Prerequisites

- Kubernetes cluster (v1.9+)
  - Minimum node sizes:
    - Single node: 8 CPU core and 16GB RAM
    - Multi node: master(s) + 3 nodes with 4 CPU core and 8GB RAM (24 GB in total)
  
- Helm Tiller, v1.12 or above, installed with permissions to the same namespace codefresh is going to be installed to (codefresh namespace)
- Service Account file (provided by Codefresh)
- Default app credentials (provided by Codefresh)
- Storage size allocated for Codefresh persisted services - described in the storage section

Codefresh will need outbound connection to the internet for the following services:
- GCR - pulling platform images
- Dockerhub - pulling pipeline images

## Security Constraints

### RBAC for Codefresh

The Codefresh installer should be run with a Kubernetes RBAC role that allows object creation in a single namespace.  If, by corporate policy, you do not allow the creation of service accounts or roles, a Kubernetes administrator will need to create the role, serviceAccount, and binding as shown below.  Users with the `codefresh-app` role do not have the ability to create other roles or roleBindings.

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

If, due to security rules you are not allowed to create a CRD for a client running `kfci`, have an Administrator create the RBAC (as instructed above) and the CRD as follows:

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

You will also need to modify the `config.yaml` for `kfci` by setting `skipCRD: true` and `serviceAccountName: codefresh-app`:

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

Download the binary from [Github](https://github.com/codefresh-io/kcfi/releases).
>Note: Darwin is for OSX

Extract the file you just downloaded.

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

### Step 2 -- Initialize the Codefresh Platform

Run the following:

```
kcfi init codefresh [-d /path/to/stage-dir]
```
Running the init command will create a directory containing a `config.yaml` file, which will use us to configure our installation, and other files and directories required for the installation.

Edit the configuration in config.yaml and deploy to Kubernetes. The config.yaml is very descriptive and it contains an explanation for every parameter.

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
Set usePrivateRegistry: true, and set private registry address and credentials.
 
Then, execute the following:

```
kcfi images push  [-c|--config /path/to/config.yaml] 
```

Or, to push a single image, execute the following:
```
kcfi images push [-c|--config /path/to/config.yaml] [options] repo/image:tag [repo/image:tag]
```

You can find a full list of options by running `kcfi images --help`.
In case you are running a Kubernetes cluster that has internet access, note that Codefresh platform images are not public and can be obtained by using `sa.json` file provided by support.
Use the flag `--codefresh-registry-secret` to pass the path to the file `sa.json`.

### Step 3 -- TLS Certificates (Optional)

It is highly recommended to use TLS certificates for secured installation. In the `config.yaml` file set `tls.selfSigned=false` and place both `ssl.crt` and `private.key` into certs/ directory.

### Step 4 -- Deploy

Deploy the Codefresh Platform by running:

```
kcfi deploy [ -c config.yaml ] [ --kube-context <kube-context-name> ] [ --atomic ] [ --debug ] [ helm upgrade parameters ]
```
### Step 5 -- Install the Codefresh Kubernetes Agent

The cf-k8s-agent is responsible for accessing Kubernetes resources (pods, deployments, services, etc.) behind the firewall in order to display them in the Codefresh UI.

Execute the following:

```
kcfi init k8s-agent
```
A staging directory will be created named k8s-agent with a `config.yaml`.
Edit k8s-agent/config.yaml and run:

```
kcfi deploy [ -c config.yaml ] [-n namespace]
```

## Additional Configurations

### Setup Git Integration (Optional)

Codefresh supports out-of-the-box Git logins using your local username and password, or logins using your git provider (per the list and instructions of providers below). You can also configure login to supported SSO providers post-install as described [in the Codefresh documentation]({{site.baseurl}}/docs/enterprise/single-sign-on/sso-setup-oauth2/).

If you’d like to set up a login to Codefresh using your git provider, first login using the local default credentials provided by Codefresh and add your git provider OAuth integration details in our admin console: 

**Admin Management** > **IDPs** tab

To get the Client ID and Client Secret for each of the supported Git providers, follow the instructions according to your VCS provider.

#### GitHub Enterprise

Navigate to your GitHub organization settings: https://github.com/organizations/<your_org_name>/settings.

On the left-hand side, under **Developer settings**, select **OAuth Apps**, and click **Register an Application**.

Complete the OAuth application registration as follows:
- **Application name:** codefresh-on-prem (or a significant name)
- **Homepage URL:** https://<your-codefresh-onprem-domain>
- **Authorization callback URL:** https://<your-codefresh-onprem-domain>/api/auth/github/callback

After registration, note down the created Client ID and Client Secret. They will be required for the settings in **Codefresh Admin**->**IDPs**

#### GitLab

Navigate to your Applications menu in GitLab User Settings: https://gitlab.com/profile/applications

Complete the application creation form as follows:

- **Name:** codefresh-onprem (or a significant name)
- **Redirect URI:** https://<your-codefresh-onprem-domain>/api/auth/gitlab/callback
- **Scopes (permissions):**
  - API
  - read_user
  - read_registry

Click **Save application**.

After app creation, note down the created Application ID and Client Secret. They will be required for the settings in **Codefresh Admin**->**IDPs** as shown below:

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/git-idp.png"
  url="/images/enterprise/installation/git-idp.png"
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
In addition to this, you should also add your k8s api IP address (`kubectl get svc kubernetes`) to both: `NO_PROXY` and `no_proxy`.

### External Mongo Service

To configure Codefresh on-premises to use an external Mongo Service, provide the following values:

- **Mongo connection string (mongoURI):** This string will be used by all of the services to communicate with Mongo. Codefresh will automatically create and add a user with read-write permissions to all of the created databases with the username and password from the URI. Optionally, automatic user addition can be disabled (mongoSkipUserCreation) in order to use an already existing user. In such a case an existing user must have read-write permissions to all of the newly created databases.
- **Mongo root user name and password (mongodbRootUser, mongodbRootPassword):** Codefresh will use privileged users only during installation for seed jobs and for automatic user addition. After installation, credentials from the provided Mongo URI will be used.

Here is an example of all the related values from config.yaml:

```yaml
global:
  mongodbRootUser: my-mongo-admin-user
  mongodbRootPassword: yeqTeVwqVa9qDqebq
  mongoURI: mongodb://someuser:mTiqweAsdw@my-mongo-cluster-shard-00-00-vziq1.mongodb.net:27017/?ssl=true
  mongoSkipUserCreation: true
  mongoDeploy: false   # disables deployment of internal mongo service
```

### Storage

#### Volumes

These are the volumes required for Codefresh on-premise:


{: .table .table-bordered .table-hover}
| Name           | Purpose                | Minimum Capacity | Can run on netfs (nfs, cifs) |
|----------------|------------------------|------------------|------------------------------|
| cf-mongodb*    | Main database - Mongo  | 8GB              | Yes**                        |
| cf-postgresql* | Events databases - Postgres | 8GB         | Yes**                        |
| cf-rabbitmq*   | Message broker         | 8GB              | No**                         |
| cf-redis*      | Cache                  | 8GB              | No**                         |
| cf-registry*   | Internal docker registry | 100GB          | Yes                          |
| cf-store       | Trigger Redis data     | 8GB              | No**                         |
| cf-cronus      | Trigger crontab data   | 1GB              | Yes                          |
| datadir-cf-consul-0 | Consul datadir    | 1GB              | Yes                          |
| cf-chartmuseum | chartmuseum            | 10GB             | Yes                          |
| cf-builder-0   | /var/lib/docker for builder | 100GB       | No***                        |
| cf-runner-0    | /var/lib/docker for composition runner | 100GB | No***                   |

{% raw %}
*Possibility to use external service 

**Running on netfs (nfs, cifs) is not recommended by product admin guide

***Docker daemon can be run on block device only
{% endraw %}

Stateful sets (cf-builder and cf-runner) process their data on separate physical volumes (PVs) and can be claimed using PVCs with default initial sizes of 100Gi. Also, those stateful sets have the ability to connect to existing pre-defined PVCs. The default initial volume size (100 Gi) can be overridden in the custom config.yaml file. Values descriptions are in the `config.yaml` file.
The registry’s initial volume size is 100Gi. It also can be overridden in a custom `config.yaml` file. There is a possibility to use a customer-defined registry configuration file (config.yml) that allows using different registry storage back-ends (S3, Azure Blob, GCS, etc.) and other parameters. More details can be found in the [Docker documentation](https://docs.docker.com/registry/configuration/).

Depending on the customer’s Kubernetes version we can assist with PV resizing. Details are can be found in this [Kubernetes blog post](https://kubernetes.io/blog/2018/07/12/resizing-persistent-volumes-using-kubernetes/).

Automatic Volume Provisioning
Codefresh installation supports automatic storage provisioning based on standard Kubernetes dynamic provisioner Storage Classes and Persistent Volume Claims. All required installation volumes will be provisioned automatically using the default storage class or custom Storage Class that can be specified as a parameter in config.yaml under storageClass: my-storage-class.

## Common Problems, Solutions, and Dependencies

1. **Problem:** pipeline runs, but does not show logs.

**Solution:** There is a dependency between the broadcaster pod and the API pod.  Try restarting the broadcaster pod.
