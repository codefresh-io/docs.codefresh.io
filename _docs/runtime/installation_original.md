---
title: "Install hybrid runtimes"
description: ""
group: runtime
toc: true
---

If you have a hybrid environment, you can provision one or more hybrid runtimes in your Codefresh account. The hybrid runtime comprises Argo CD components and Codefresh-specific components. The Argo CD components are derived from a fork of the Argo ecosystem, and do not correspond to the open-source versions available.

> If you have Hosted GitOps, to provision a hosted runtime, see [Provision a hosted runtime]({{site.baseurl}}/docs/runtime/hosted-runtime/#1-provision-hosted-runtime) in [Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/runtime/hosted-runtime/).

There are two parts to installing a hybrid runtime:

1. Installing the Codefresh CLI
2. Installing the hybrid runtime from the CLI, either through the CLI wizard or via silent installation.  
  The hybrid runtime is installed in a specific namespace on your cluster. You can install more runtimes on different clusters in your deployment.  
  Every hybrid runtime installation makes commits to two Git repos:

  * Runtime install repo: The installation repo that manages the hybrid runtime itself with Argo CD. If the repo URL does not exist, runtime creates it automatically.
  * Git Source repo: Created automatically during runtime installation. The repo where you store manifests to run CodefreshCodefresh pipelines.

See also [Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture).

### Installing the Codefresh CLI

Install the Codefresh CLI using the option that best suits you: `curl`, `brew`, or standard download.  
If you are not sure which OS to select for `curl`, simply select one, and Codefresh automatically identifies and selects the right OS for CLI installation.

### Installing the hybrid runtime

1. Do one of the following:  
  * If this is your first hybrid runtime installation, in the Welcome page, select **+ Install Runtime**.
  * If you have provisioned a hybrid runtime, to provision additional runtimes, in the Codefresh UI, go to [**Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}, and select **+ Add Runtimes**.
1. Run:  
  * CLI wizard: Run `cf runtime install`, and follow the prompts to enter the required values.  
  * Silent install: Pass the required flags in the install command:  
    `cf runtime install <runtime-name> --repo <git-repo> --git-token <git-token> --silent`  
  For the list of flags, see _Hybrid runtime flags_.

> Note:  
> Hybrid runtime installation starts by checking network connectivity and the K8s cluster server version.  
  To skip these tests, pass the `--skip-cluster-checks` flag.

#### Hybrid runtime flags

**Runtime name**  
Required.  
The runtime name must start with a lower-case character, and can include up to 62 lower-case characters and numbers.  
* CLI wizard: Add when prompted. 
* Silent install: Required.

**Namespace resource labels**  
Optional.  
The label of the namespace resource to which you are installing the hybrid runtime. You can add more than one label. Labels are required to identity the networks that need access during installation, as is the case when using services meshes such as Istio for example.  

* CLI wizard and Silent install: Add the `--namespace-labels` flag, and define the labels in `key=value` format. Separate multiple labels with `commas`.

**Kube context**  
Required.  
The cluster defined as the default for `kubectl`. If you have more than one Kube context, the current context is selected by default.  

* CLI wizard: Select the Kube context from the list displayed.
* Silent install: Explicitly specify the Kube context with the `--context` flag.

**Ingress class**  
Required.  
If you have more than one ingress class configured on your cluster:

* CLI wizard: Select the ingress class for runtime installation from the list displayed.
* Silent install: Explicitly specify the ingress class through the `--ingress-class` flag. Otherwise, runtime installation fails.  

**Ingress host**  
Required.  
The IP address or host name of the ingress controller component.  

* CLI wizard: Automatically selects and displays the host, either from the cluster or the ingress controller associated with the **Ingress class**.  
* Silent install: Add the `--ingress-host` flag. If a value is not provided, takes the host from the ingress controller associated with the **Ingress class**.
  > Important: For AWS ALB, the ingress host is created post-installation. However, when prompted, add the domain name you will create in `Route 53` as the ingress host.  

SSL certificates for the ingress host:  
If the ingress host does not have a valid SSL certificate, you can continue with the installation in insecure mode, which disables certificate validation.  

* CLI wizard: Automatically detects and prompts you to confirm continuing with the installation in insecure mode.  
* Silent install: To continue with the installation in insecure mode, add the `--insecure-ingress-host` flag.  

**Internal ingress host**  
Optional.  
Enforce separation between internal (app-proxy) and external (webhook) communication by adding an internal ingress host for the app-proxy service in the internal network.  
For both CLI wizard and Silent install:  

* For new runtime installations, add the `--internal-ingress-host` flag pointing to the ingress host for `app-proxy`.
* For existing installations, commit changes to the installation repository by modifying the `app-proxy ingress` and `<runtime-name>.yaml`  
  See _Internal ingress host configuration (optional for existing runtimes only)_ in [Post-installation configuration](#post-installation-configuration).

**Ingress resources**  
Optional.  
If you have a different routing service (not NGINX), bypass installing ingress resources with the `--skip-ingress` flag.  
In this case, after completing the installation, manually configure the cluster's routing service, and create and register Git integrations. See _Cluster routing service_ in [Post-installation configuration](#post-installation-configuration).

**Shared configuration repository**
The Git repository per runtime account with shared configuration manifests.  
* CLI wizard and Silent install: Add the `--shared-config-repo` flag and define the path to the shared repo.  

**Insecure flag**  
For _on-premises installations_, if the Ingress controller does not have a valid SSL certificate, to continue with the installation, add the `--insecure` flag to the installation command.  

**Repository URLs**  
The GitHub repository to house the installation definitions.  

* CLI wizard: If the repo doesn't exist, Codefresh creates it during runtime installation.  
* Silent install: Required. Add the `--repo` flag.

**Git runtime token**  
Required.  
The Git token authenticating access to the GitHub installation repository.  
* Silent install: Add the `--git-token` flag.  

**Codefresh demo resources**  
Optional.  
Install demo pipelines to use as a starting point to create your own pipelines. We recommend installing the demo resources as these are used in our quick start tutorials.  

* Silent install: Add the `--demo-resources` flag. By default, set to `true`.

### Hybrid runtime components

**Git repositories**

* Runtime install repo: The installation repo contains three folders: apps, bootstrap and projects, to manage the runtime itself with Argo CD.  
* Git source repository: Created with the name `[repo_name]_git-source`. This repo stores manifests for pipelines with sources, events, workflow templates.

**Argo CD components**  

* Project, comprising an Argo CD AppProject and an ApplicationSet
* Installations of the following applications in the project:
  * Argo CD
  * Argo Workflows
  * Argo Events
  * Argo Rollouts
  
**Codefresh-specific components**  

* Codefresh Applications in the Argo CD AppProject:  
  * App-proxy facilitating behind-firewall access to Git
  * Git Source entity that references the`[repo_name]_git-source`  

Once the hybrid runtime is successfully installed, it is provisioned on the Kubernetes cluster, and displayed in the **Runtimes** page.

### Hybrid runtime post-installation configuration

After provisioning a hybrid runtime, configure additional settings for the following:

* NGINX Enterprise installations (with and without NGINX Ingress Operator)
* AWS ALB installations
* Cluster routing service if you bypassed installing ingress resources 
* (Existing hybrid runtimes) Internal and external ingress host specifications 
* Register Git integrations



#### AWS ALB post-install configuration

For AWS ALB installations, do the following:

* Create an `Alias` record in Amazon Route 53
* Manually register Git integrations - see _Git integration registration_.
  
Create an `Alias` record in Amazon Route 53, and map your zone apex (example.com) DNS name to your Amazon CloudFront distribution.
For more information, see [Creating records by using the Amazon Route 53 console](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html){:target="\_blank"}.

{% include image.html
  lightbox="true"
  file="/images/runtime/post-install-alb-ingress.png"
  url="/images/runtime/post-install-alb-ingress.png"
  alt="Route 53 record settings for AWS ALB"
  caption="Route 53 record settings for AWS ALB"
  max-width="30%"
%}

#### Configure cluster routing service

If you bypassed installing ingress resources with the `--skip-ingress` flag, configure the `host` for the Ingress, or the VirtualService for Istio if used, to route traffic to the `app-proxy` and `webhook` services, as in the examples below.  

**Ingress resource example for `app-proxy`:** 

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: codefresh-cap-app-proxy
  namespace: codefresh
spec:
  ingressClassName: alb
  rules:
  - host: my.support.cf-cd.com # replace with your host name
    http:
      paths:
      - backend:
          service:
            name: cap-app-proxy 
            port:
              number: 3017
        path: /app-proxy/
        pathType: Prefix
```

**`VirtualService` examples for `app-proxy` and `webhook`:** 

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  namespace: test-runtime3 # replace with your runtime name
  name: cap-app-proxy 
spec:
  hosts:
    - my.support.cf-cd.com # replace with your host name
  gateways:
    - my-gateway
  http:
    - match:
      - uri:
          prefix: /app-proxy 
      route:
      - destination:
          host: cap-app-proxy 
          port:
            number: 3017
```

```yaml  
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  namespace: test-runtime3 # replace with your runtime name
  name: csdp-default-git-source
spec:
  hosts:
    - my.support.cf-cd.com # replace with your host name
  gateways:
    - my-gateway
  http:
    - match:
      - uri:
          prefix: /webhooks/test-runtime3/push-github # replace `test-runtime3` with your runtime name
      route:
      - destination:
          host: push-github-eventsource-svc 
          port:
            number: 80
```
Continue with [Git integration registration](#git-integration-registration) in this article. 

#### Internal ingress host configuration (optional for existing hybrid runtimes only)

If you already have provisioned hybrid runtimes, to use an internal ingress host for app-proxy communication and an external ingress host to handle webhooks, change the specs for the `Ingress` and `Runtime` resources in the runtime installation repository. Use the examples as guidelines.  

`<runtime-install-repo>/apps/app-proxy/overlays/<runtime-name>/ingress.yaml`: change `host`

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: codefresh-cap-app-proxy
  namespace: codefresh #replace with your runtime name
spec:
  ingressClassName: nginx
  rules:
  - host: my-internal-ingress-host # replace with the internal ingress host for app-proxy
    http:
      paths:
      - backend:
          service:
            name: cap-app-proxy 
            port:
              number: 3017
        path: /app-proxy/
        pathType: Prefix
```

`../<runtime-install-repo>/bootstrap/<runtime-name>.yaml`: add `internalIngressHost`

```yaml
apiVersion: v1
data:
  base-url: https://g.codefresh.io
  runtime: |
    apiVersion: codefresh.io/v1alpha1
    kind: Runtime
    metadata:
      creationTimestamp: null
      name: codefresh #replace with your runtime name
      namespace: codefresh #replace with your runtime name
    spec:
      bootstrapSpecifier: github.com/codefresh-io/cli-v2/manifests/argo-cd
      cluster: https://7DD8390300DCEFDAF87DC5C587EC388C.gr7.us-east-1.eks.amazonaws.com
      components:
      - isInternal: false
        name: events
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/argo-events
        wait: true
      - isInternal: false
        name: rollouts
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/argo-rollouts
        wait: false
      - isInternal: false
        name: workflows
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/argo-workflows
        wait: false
      - isInternal: false
        name: app-proxy
        type: kustomize
        url: github.com/codefresh-io/cli-v2/manifests/app-proxy
        wait: false
      defVersion: 1.0.1
      ingressClassName: nginx
      ingressController: k8s.io/ingress-nginx
      ingressHost: https://support.cf.com/
      internalIngressHost: https://my-internal-ingress-host # add this line and replace my-internal-ingress-host with your internal ingress host
      repo: https://github.com/NimRegev/my-codefresh.git
      version: 99.99.99
```
  
#### Git integration registration

If you bypassed installing ingress resources with the `--skip-ingress` flag, or if AWS ALB is your ingress controller, create and register Git integrations using these commands:  
  `cf integration git add default --runtime <RUNTIME-NAME> --api-url <API-URL>`  
  
  `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`  

### Related articles
[Add external clusters to runtimes]({{site.baseurl}}/docs/runtime/managed-cluster/)  
[Add Git Sources to runtimes]({{site.baseurl}}/docs/runtime/git-sources/)  
[Manage provisioned runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)  
[Monitor provisioned hybrid runtimes]({{site.baseurl}}/docs/runtime/monitoring-troubleshooting/)  
[Troubleshoot runtime installation]({{site.baseurl}}/docs/troubleshooting/runtime-issues/)
