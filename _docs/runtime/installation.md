---
title: "Installation"
description: ""
group: runtime
toc: true
---


Codefresh runtime installs the Codefresh platform, comprising Argo CD components and Codefresh-specific components. The Argo CD components are derived from a fork of the Argo ecosystem, and do not correspond to the open-source versions available.

There are two parts to installing runtimes:
1. Installing the Codefresh CLI
2. Installing the Codefresh runtime from the CLI, either through the CLI wizard or a silent install. The runtime is installed in a specific namespace on your cluster. You can install more runtimes on different clusters in your deployment.  
 Every runtime installation makes commits to two Git repos: 
   * Runtime install repo: The installation repo that manages the runtime itself with Argo CD. If the repo URL does not exist, runtime creates it automatically.   
   * Git Source repo: Created automatically during runtime installation. The repo where you store manifests to run CodefreshCodefresh pipelines. 

 See [Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture).

### Where do you install runtimes?
* If this is your first Codefresh installation, in the Welcome page, select **+ Install Runtime**.
* To install additional runtimes, in the Codefresh UI, go to the [**Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"} page, and select **+ Add Runtimes**. 

### Installing the Codefresh CLI 
Install the Codefresh CLI using the option that best suits you: `curl`, `brew`, or standard download.  
If you are not sure which OS to select for `curl`, simply select one, and we automatically identify and select the right OS for CLI installation.

### Installing the Codefresh runtime
Install Codefresh runtime through the CLI wizard, or by running a silent install:
* CLI wizard: Run `cf runtime install`, and follow the prompts to enter the required values.
* Silent install: Pass the mandatory flags in the install command:  
  `cf runtime install <runtime-name> --repo <git-repo> --git-token <git-token> --silent`   
   
> Note:  
>  Runtime installation starts by checking network connectivity and the K8s cluster server version.  
  To skip these tests, pass the `--skip-cluster-checks` flag.

#### Runtime prerequisites
Before you start installing the Codefresh runtime, verify that:
* Your deployment conforms to our [system requirements]({{site.baseurl}}/docs/runtime/requirements).
 
* You have a Git runtime token: Authenticates to the Git installation repo that you will create or select during runtime installation.  
  To create a Git token, see [Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token){:target="\_blank"}.
  > When you create the Git token for runtime installation, set the correct expiration date and scope: 
   Expiration: Default is `30 days`  
   Scope: `repo` and `admin-repo.hook` 

#### Runtime installation flags

**Runtime name**  
  The runtime name must start with a lower-case character, and can include up to 62 lower-case characters and numbers.  

  Silent install: Mandatory parameter.

**Namespace resource labels**  
  Add one or more labels to the namespace resource where you are installing the runtime. Labels are required to identity the networks that need access during installation, as is the case when using services meshes such as Istio for example.  

  * CLI wizard and Silent install: Optional. Add the `--namespace-labels` flag, and define the labels in `key=value` format. Separate multiple labels with `commas`.

**Kube context**  
  If you have more than one Kube context, the current context, which is the cluster currently the default for `kubectl`, is selected by default.  
  * CLI wizard: Select the Kube context from the list displayed.
  * Silent install: Explicitly specify the Kube context with the `--context` flag.

**Ingress class**  
  * If you have more than one ingress class configured on your cluster:
    * CLI wizard: Select the ingress class for runtime installation from the list displayed. 
    * Silent install:   
      Explicitly specify the ingress class through the `--ingress-class` flag. Otherwise, runtime installation fails.  

 
**Ingress host**  
  * The IP address or host name of the ingress controller component.  
    * CLI wizard: Automatically selects and displays the host, either from the cluster or the ingress controller associated with the **Ingress class**.  
    * Silent install: Add the `--ingress-host` flag. If a value is not provided, takes the host from the ingress controller associated with the **Ingress class**. 
  > Important: For AWS ALB, the ingress host is created post-installation. However, when prompted, add the domain name you will create in `Route 53` as the ingress host. For example, 

 * If the ingress host does not have a valid SSL certificate, you can continue with the installation in insecure mode, which disables certificate validation.  
    * CLI wizard: Prompts you to confirm continuing with the installation in insecure mode.  
    * Silent install: To continue with the installation in insecure mode, add the `--insecure-ingress-host` flag.  

**Ingress resources**  
  If you have a different routing service (not NGINX), bypass installing ingress resources with the `--skip-ingress` flag.  
  In this case, after completing the installation, manually configure the cluster's routing service, and create and register Git integrations. See [Post-installation configuration](#post-installation-configuration) later on in this article. 
 
**Insecure flag**  
   For _on-premises installations_, if the Ingress controller does not have a valid SSL certificate, to continue with the installation, add the `--insecure` flag to the installation command.  
   
**Repository URLs**  
  The GitHub repository to house the installation definitions. If the repo doesn't exist, Codefresh creates it during runtime installation.  

  Silent install: Mandatory. Add the `--repo` flag. 


**Git runtime token**  
  The Git token authenticating access to the GitHub installation repository.  

  Silent install: Mandatory. Add the `--git-token` flag.  

**Codefresh demo resources**  
  Optional. Install demo pipelines to use as a starting point to create your own pipelines. We recommend installing the demo resources as these are used in our quick start tutorials.  

  Silent install: Optional. Add the `--demo-resources` flag. By default, set to `true`.

#### Post-installation configuration
After installing a runtime, you may have to configure additional settings:
* NGINX Enterprise installations (with and without NGINX Ingress Operator)
* AWS ALB installations
* If you used the `--skip-ingress` flag to bypass installing ingress resources  

**NGINX Enterprise post-install configuration**  

You need to patch the certificate secret in `spec.tls` of the `ingress-master` resource.  

Configure the `ingress-master` with the certificate secret. The secret must be in the same namespace as the runtime.
1. Go to the runtime namespace with the NGINX ingress controller.
1. In `ingress-master`, add to `spec.tls`:  

    ```yaml
    tls:                                                                                                                                                                    
     - hosts:                                                                                                                                                                
     - <host_name>                                                                                             
     secretName: <secret_name>
   ```

**AWS ALB post-install configuration**  

For AWS ALB installations, you must do the following:
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


**Cluster routing service**  

If you bypassed installing ingress resources with the `--skip-ingress` flag, configure the `host` for the Ingress, or the VirtualService for Istio if used, to route traffic to the `app-proxy` and `webhook` services, as in the examples below.  

Ingress resource example for `app-proxy`:

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



`VirtualService` examples for `app-proxy` and `webhook`:  

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

  
**Git integration registration**  
If you bypassed installing ingress resources with the `--skip-ingress` flag, or if AWS ALB is your ingress controller, create and register Git integrations using these commands:  
    `cf integration git add default --runtime <RUNTIME-NAME> --api-url <API-URL>`   
    `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`  


#### Runtime components

**Git repositories**   
 
* Runtime install repo: The installation repo contains three folders: apps, bootstrap and projects, to manage the runtime itself with Argo CD.  
* Git source repository: Created with the name `[repo_name]_git-source`. This repo stores manifests to run pipelines with sources, events, workflow templates.

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

Once the runtime is successfully installed, it is provisioned on the Kubernetes cluster, and displayed in the **Runtimes** page. 

### What to read next
[Manage runtimes]({{site.baseurl}}/docs/runtime/monitor-manage-runtimes/)  
[Manage Git Sources]({{site.baseurl}}/docs/runtime/git-sources/)  
[Troubleshooting runtime installation]({{site.baseurl}}/docs/troubleshooting/runtime-issues/)
