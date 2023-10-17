---
title: "Hybrid GitOps Runtime installation"
description: "Provision Hybrid GitOps Runtimes"
group: installation
sub_group: gitops
redirect_from:
  - /csdp-docs/docs/runtime/installation/
  - /csdp-docs/docs/runtime/requirements/
toc: true
---

>**ATTENTION**:  
We have transitioned to a [Helm-based installation for Hybrid GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/) for improved experience and performance, which is now the default for GitOps Runtimes.    
The CLI-based installation for Hybrid GitOps is now considered legacy.  
We will deprecate this installation mode permanently in the coming months. Please stay tuned for further updates and instructions, including the migration process.
   

Provision one or more Hybrid GitOps Runtimes in your Codefresh account.  
Start by reviewing [system requirements](#minimum-system-requirements) for Hybrid GitOps.  
If you are installing with ingress-controllers, you must configure them as required _before_ starting the installation. 

> To provision a Hosted GitOps Runtime, see [Provision a hosted runtime]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/#1-provision-hosted-runtime) in [Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).

**Git providers and Hybrid Runtimes**  
Your Codefresh account is always linked to a specific Git provider. This is the Git provider you select on installing the first GitOps Runtime, either Hybrid or Hosted, in your Codefresh account. All the Hybrid GitOps Runtimes you install in the same account use the same Git provider.  
If Bitbucker Server is your Git provider, you must also select the specific server instance to associate with the runtime. 

>To change the Git provider for your Codefresh account after installation, contact Codefresh support.

> If you want to [skip validating the scopes for the provided token](#skip-token-scope-validation), you _must create the repositories for the runtime and for the Git Source before starting the installation_.


**Codefresh and Argo CD**  
 The Hybrid GitOps Runtime comprises Argo CD components and Codefresh-specific components. 
 
Codefresh users rely on our platform to deliver software reliably, and predictably without interruption.  
To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh.  
Typically, new versions of Argo are available within 30 days of release in Argo.
   

There are two parts to installing a Hybrid GitOps Runtime:

1. [Installing the GitOps CLI](#gitops-cli-installation)
2. [Installing the Hybrid GitOps Runtime](#install-hybrid-gitops-runtime), either through the CLI wizard or via silent installation through the installation flags.  
  The Hybrid GitOps Runtime is installed in a specific namespace on your cluster. You can install more Hybrid GitOps Runtimes on different clusters in your deployment.  
  Every Hybrid GitOps Runtime installation makes commits to three Git repos:
  * Runtime install repo: The installation repo that manages the Hybrid Runtime itself with Argo CD. If the repo URL does not exist, it is automatically created during installation.
  * Git Source repo: Created automatically during Runtime installation. The repo where you store manifests for pipelines and applications. See [Git Sources]({{site.baseurl}}/docs/installation/gitops/git-sources).
  * Shared configuration repo: Created for the first GitOps Runtime installed in your account. The repo stores configuration manifests for account-level resources and is shared with other GitOps Runtimes in the same account. See [Shared configuration repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration).



{::nomarkdown}
</br>
{:/}

## Minimum system requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |  
| --------------         | --------------           |  
|Kubernetes cluster      | Server version 1.18 and higher, without Argo Project components. {::nomarkdown}<br><b>Tip</b>:  To check the server version, run:<br> <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl version --short</span>.{:/}|
| Ingress controller| Configured on Kubernetes cluster and exposed from the cluster. {::nomarkdown} <br>Supported and tested ingress controllers include: <ul><li>Ambassador</li>{:/}(see [Ambassador ingress configuration](#ambassador-ingress-configuration)){::nomarkdown}<li>AWS ALB (Application Load Balancer)</li>{:/} (see [AWS ALB ingress configuration](#aws-alb-ingress-configuration)){::nomarkdown}<li>Istio</li>{:/} (see [Istio ingress configuration](#istio-ingress-configuration)){::nomarkdown}<li>NGINX Enterprise (nginx.org/ingress-controller)</li>{:/} (see [NGINX Enterprise ingress configuration](#nginx-enterprise-ingress-configuration)){::nomarkdown}<li>NGINX Community (k8s.io/ingress-nginx)</li> {:/} (see [NGINX Community ingress configuration](#nginx-community-version-ingress-configuration)){::nomarkdown}<li>Trafik</li>{:/}(see [Traefik ingress configuration](#traefik-ingress-configuration))|
|Node requirements| {::nomarkdown}<ul><li>Memory: 5000 MB</li><li>CPU: 2</li></ul>{:/}|
|Cluster permissions | Cluster admin permissions |
|Git providers    |{::nomarkdown}<ul><li>GitHub</li><li>GitHub Enterprise</li><li>GitLab Cloud</li><li>GitLab Server</li><li>Bitbucket Cloud</li><li>Bitbucket Server</li></ul>{:/}|
|Git access tokens    | {::nomarkdown}Git runtime token:<ul><li>Valid expiration date</li><li>Scopes: <ul><li>GitHub and GitHub Enterprise: <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">repo</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">admin-repo.hook</span></li><li>GitLab Cloud and GitLab Server: <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">api</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">read_repository</span></li><li>Bitbucket Cloud and Server: <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">Permissions: Read</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">Workspace membership: Read</span>,  <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">Webhooks: Read and write</span>, <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">Repositories: Write, Admin</span> </li></ul>{:/}|

## Ingress controller configuration

You need to configure ingress controllers only if your runtime uses an ingress controller. Codefresh offers tunnel-based runtimes which do not require ingress controllers. See **Access Mode** in [Runtime flags](#runtime-flags) and [Tunnel-based runtime flags](#tunnel-based-runtime-flags).

### Ambassador ingress configuration
For detailed configuration information, see the [Ambassador ingress controller documentation](https://www.getambassador.io/docs/edge-stack/latest/topics/running/ingress-controller){:target="\_blank"}.  

This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the hybrid runtime.  
* Valid external IP address    
* Valid TLS certificate 
* TCP support

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  
  {::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.  

{::nomarkdown}
</br></br>
{:/}

### AWS ALB ingress configuration

For detailed configuration information, see the [ALB AWS ingress controller documentation](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4){:target="\_blank"}.  

This table lists the specific configuration requirements for Codefresh.  

{: .table .table-bordered .table-hover}
| What to configure    |   When to configure |   
| --------------       | --------------                    | 
|Valid external IP address |   _Before_ installing hybrid runtime  |     
|Valid TLS certificate | |
|TCP support|  |  
|Controller  configuration] |  | 
|Alias DNS record in route53 to load balancer | _After_ installing hybrid runtime | 
|(Optional) Git integration registration | | 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.  

{::nomarkdown}
</br>
{:/}

#### Controller configuration
In the ingress resource file, verify that `spec.controller` is configured as `ingress.k8s.aws/alb`. 

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: alb
spec:
  controller: ingress.k8s.aws/alb
```

{::nomarkdown}
</br>
{:/}

#### Create an alias to load balancer in route53

>  The alias  must be configured _after_ installing the hybrid runtime.

1. Make sure a DNS record is available in the correct hosted zone. 
1. _After_ hybrid runtime installation, in Amazon Route 53, create an alias to route traffic to the load balancer that is automatically created during the installation:  
  * **Record name**: Enter the same record name used in the installation.
  * Toggle **Alias** to **ON**.
  * From the **Route traffic to** list, select **Alias to Application and Classic Load Balancer**.
  * From the list of Regions, select the region. For example, **US East**.
  * From the list of load balancers, select the load balancer that was created during installation.  

For more information, see [Creating records by using the Amazon Route 53 console](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html){:target="\_blank"}.

{% include image.html
  lightbox="true"
  file="/images/runtime/post-install-alb-ingress.png"
  url="/images/runtime/post-install-alb-ingress.png"
  alt="Route 53 record settings for AWS ALB"
  caption="Route 53 record settings for AWS ALB"
  max-width="60%"
%}

{::nomarkdown}
</br>
{:/}

#### (Optional) Git integration registration
If the installation failed, as can happen if the DNS record was not created within the timeframe, manually create and register Git integrations using these commands:  
  `cf integration git add default --runtime <RUNTIME-NAME> --api-url <API-URL>`  
  `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`  
 
{::nomarkdown}
</br></br>
{:/}

### Istio ingress configuration
For detailed configuration information, see [Istio ingress controller documentation](https://istio.io/latest/docs/tasks/traffic-management/ingress/kubernetes-ingress){:target="\_blank}.  

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}
| What to configure    |   When to configure |   
| --------------       | --------------   | 
|Valid external IP address |_Before_ installing hybrid runtime  |     
|Valid TLS certificate| |
|TCP support |  | 
|Cluster routing service | _After_ installing hybrid runtime | 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.  

{::nomarkdown}
</br>
{:/}



#### Cluster routing service
>  The cluster routing service must be configured _after_ installing the hybrid runtime.

Based on the runtime version, you need to configure a single or multiple `VirtualService` resources for the `app-proxy`, `webhook`, and `workflow` services.

##### Runtime version 0.0.543 or higher
Configure a single `VirtualService` resource to route traffic to the `app-proxy`, `webhook`, and `workflow` services, as in the example below.  

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  namespace: pov-codefresh-istio-runtime # replace with your runtime name
  name: internal-router
spec:
  hosts:
    -  pov-codefresh-istio-runtime.sales-dev.codefresh.io   # replace with your host name
  gateways:
    - istio-system/internal-router  # replace with your gateway name
  http:
    - match:
      - uri:
          prefix: /webhooks
      route:
      - destination:
          host: internal-router
          port:
            number: 80
    - match:
      - uri:
          prefix: /app-proxy
      route:
      - destination:
          host: internal-router
          port:
            number: 80
    - match:
      - uri:
          prefix: /workflows
      route:
      - destination:
          host: internal-router
          port:
            number: 80
```

##### Runtime version 0.0.542 or lower

Configure two different `VirtualService` resources, one to route traffic to the `app-proxy`, and the second to route traffic to the `webhook` services, as in the examples below.  

{::nomarkdown}
</br>
{:/}

**`VirtualService` example for `app-proxy`:**

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
    - my-gateway # replace with your host name
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

**`VirtualService` example for `webhook`:**  

> Configure a `uri.prefix` and `destination.host` for each event-source if you have more than one.

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
    - my-gateway # replace with your gateway name
  http:
    - match:
      - uri:
          prefix: /webhooks/test-runtime3/push-github # replace `test-runtime3` with your runtime name, and `push-github` with the name of your event source
      route:
      - destination:
          host: push-github-eventsource-svc # replace `push-github' with the name of your event source
          port:
            number: 80
    - match:
      - uri:
          prefix: /webhooks/test-runtime3/cypress-docker-images-push # replace `test-runtime3` with your runtime name, and `cypress-docker-images-push` with the name of your event source
      route:
      - destination:
          host: cypress-docker-images-push-eventsource-svc # replace `cypress-docker-images-push` with the name of your event source
          port:
            number: 80
```

{::nomarkdown}
</br></br>
{:/}

### NGINX Enterprise ingress configuration

For detailed configuration information, see [NGINX ingress controller documentation](https://docs.nginx.com/nginx-ingress-controller){:target="\_blank}.  

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}
| What to configure    |   When to configure |   
| --------------       | --------------                    | 
|Verify valid external IP address |_Before_ installing hybrid runtime  |     
|Valid TLS certificate | |
|TCP support|  | 
|NGINX Ingress: Enable report status to cluster |  | 
|NGINX Ingress Operator: Enable report status to cluster| |
|Patch certificate secret |_After_ installing hybrid runtime  

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.   

{::nomarkdown}
</br>
{:/}

#### NGINX Ingress: Enable report status to cluster

If the ingress controller is not configured to report its status to the cluster, Argo’s health check reports the health status as “progressing” resulting in a timeout error during installation.  

* Pass `--report-ingress-status` to `deployment`.

```yaml
spec:                                                                                                                                                                 
  containers: 
    - args:                                                                                                                                              
      - --report-ingress-status
```

{::nomarkdown}
</br>
{:/}

#### NGINX Ingress Operator: Enable report status to cluster

If the ingress controller is not configured to report its status to the cluster, Argo’s health check reports the health status as “progressing” resulting in a timeout error during installation.  

1. Add this to the `Nginxingresscontrollers` resource file:

   ```yaml
   ...
   spec:
     reportIngressStatus:
       enable: true
   ...
  ```

1. Make sure you have a certificate secret in the same namespace as the runtime. Copy an existing secret if you don't have one.  
You will need to add this to the `ingress-master` when you have completed runtime installation.

{::nomarkdown}
</br>
{:/}

#### Patch certificate secret
>  The certificate secret must be configured _after_ installing the hybrid runtime.

Patch the certificate secret in `spec.tls` of the `ingress-master` resource.  
The secret must be in the same namespace as the runtime.

1. Go to the runtime namespace with the NGINX ingress controller.
1. In `ingress-master`, add to `spec.tls`:  

    ```yaml
    tls:                                                                                                                                                                    
     - hosts:                                                                                                                                                                
     - <host_name>                                                                                             
     secretName: <secret_name>
   ```

{::nomarkdown}
</br></br>
{:/}

### NGINX Community version ingress configuration

Codefresh has been tested with and supports implementations of the major providers. For your convenience, we have provided configuration instructions, both for supported and untested providers in [Provider-specific configuration](#provider-specific-configuration).  


This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the hybrid runtime.  
* Verify valid external IP address 
* Valid TLS certificate 
* TCP support 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services, and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}

#### TCP support  
Configure the ingress controller to handle TCP requests.   

Here's an example of TCP configuration for NGINX Community on AWS.  
Verify that the `ingress-nginx-controller` service manifest has either of the following annotations:  

`service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"`  
OR  
`service.beta.kubernetes.io/aws-load-balancer-type: nlb` 

{::nomarkdown}
</br>
{:/}

#### Provider-specific configuration

> The instructions are valid for `k8s.io/ingress-nginx`, the community version of NGINX.

<details>
<summary><b>AWS</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/aws/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#aws">ingress-nginx documentation for AWS</a>.
</details>
<details>
<summary><b>Azure (AKS)</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://docs.microsoft.com/en-us/azure/aks/ingress-internal-ip?tabs=azure-cli#create-an-ingress-controller">ingress-nginx documentation for AKS</a>.

</details>

<details>
<summary><b>Bare Metal Clusters</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/baremetal/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
Bare-metal clusters often have additional considerations. See <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/baremetal/">Bare-metal ingress-nginx considerations</a>.

</details>

<details>
<summary><b>Digital Ocean</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/do/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean">ingress-nginx documentation for Digital Ocean</a>.

</details>

<details>
<summary><b>Docker Desktop</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop">ingress-nginx documentation for Docker Desktop</a>.<br>
<b>Note:</b> By default, Docker Desktop services will provision with localhost as their external address. Triggers in delivery pipelines cannot reach this instance unless they originate from the same machine where Docker Desktop is being used.

</details>

<details>
<summary><b>Exoscale</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/exoscale/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://github.com/exoscale/exoscale-cloud-controller-manager/blob/master/docs/service-loadbalancer.md">ingress-nginx documentation for Exoscale</a>.

</details>


<details>
<summary><b>Google (GKE)</b></summary>
<br>
<b>Add firewall rules</b>
<br>
GKE by default limits outbound requests from nodes. For the runtime to communicate with the control-plane in Codefresh, add a firewall-specific rule.

<ol>
<li>Find your cluster's network:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gcloud container clusters describe [CLUSTER_NAME] --format=get"(network)"</span>
</li>
<li>Get the Cluster IPV4 CIDR:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gcloud container clusters describe [CLUSTER_NAME] --format=get"(clusterIpv4Cidr)"</span>
</li>
<li>Replace the `[CLUSTER_NAME]`, `[NETWORK]`, and `[CLUSTER_IPV4_CIDR]`, with the relevant values: <br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">gcloud compute firewall-rules create "[CLUSTER_NAME]-to-all-vms-on-network" </span><br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">  
    --network="[NETWORK]" \
    </span><br>
   <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">  
    --source-ranges="[CLUSTER_IPV4_CIDR]" \
    </span><br>
   <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">  
   --allow=tcp,udp,icmp,esp,ah,sctp
    </span><br>
</li> 
</ol>
<br>
<b>Use ingress-nginx</b><br>
<ol>
  <li>Create a `cluster-admin` role binding:<br>
      <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">  
        kubectl create clusterrolebinding cluster-admin-binding \
      </span><br>
      <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">  
        --clusterrole cluster-admin \
      </span><br>
      <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">  
        --user $(gcloud config get-value account)
      </span><br>
  </li>
  <li>Apply:<br>
      <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">  
        kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
      </span>
  </li>
  <li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
  </li>

</ol>
We recommend reviewing the <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke">provider-specific documentation for GKE</a>.

</details>


<details>
<summary><b>MicroK8s</b></summary>
<ol>
<li>Install using Microk8s addon system:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">microk8s enable ingress</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
MicroK8s has not been tested with Codefresh, and may require additional configuration. For details, see <a target="_blank" href="https://microk8s.io/docs/addon-ingress">Ingress addon documentation</a>.

</details>


<details>
<summary><b>MiniKube</b></summary>
<ol>
<li>Install using MiniKube addon system:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">minikube addons enable ingress</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
MiniKube has not been tested with Codefresh, and may require additional configuration. For details, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#minikube">Ingress addon documentation</a>.

</details>



<details>
<summary><b>Oracle Cloud Infrastructure</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#oracle-cloud-infrastructure">ingress-nginx documentation for Oracle Cloud</a>.

</details>

<details>
<summary><b>Scaleway</b></summary>
<ol>
<li>Apply:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/scw/deploy.yaml</span>
</li>
<li>Verify a valid external address exists:<br>
    <span style="font-family: var(--font-family-monospace); font-size: 87.5%; color: #ad6800; background-color: #fffbe6">kubectl get svc ingress-nginx-controller -n ingress-nginx</span>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#scaleway">ingress-nginx documentation for Scaleway</a>.

</details> 

{::nomarkdown}
</br></br>
{:/}

### Traefik ingress configuration
For detailed configuration information, see [Traefik ingress controller documentation](https://doc.traefik.io/traefik/providers/kubernetes-ingress){:target="\_blank}.  

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}

| What to configure    |   When to configure |   
| --------------       | --------------  | 
|Valid external IP address | _Before_ installing hybrid runtime  |     
|Valid SSL certificate | |
|TCP support |  | 
|Enable report status to cluster|  | 

{::nomarkdown}
</br>
{:/}

#### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.  

{::nomarkdown}
</br>
{:/}

#### Valid TLS certificate  
For secure runtime installation, the ingress controller must have a valid TLS certificate.  
> Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.

{::nomarkdown}
</br>
{:/}
 
#### TCP support  
Configure the ingress controller to handle TCP requests.   

{::nomarkdown}
</br>
{:/}
 
#### Enable report health status to cluster 
By default, the Traefik ingress controller is not configured to report its health status to the cluster or ingress resource.  Argo CD is therefore unable to assess its health status as the `status.loadBalancer.ingress` list does not have a value for `hostname` or `IP`. During installation, ArgoCD reports the health status of the ingress controller  as `progressing`, resulting in a timeout error.

To prevent the timeout error, add  `publishedService` to your ingress resource configuration . This parameter populates the health status of the ingress resource, enabling Argo CD to report the correct health status during installation.  For details, see [ Traefik Kubernetes Ingress Documentation](https://doc.traefik.io/traefik/providers/kubernetes-ingress/#publishedservice){:target=\_block"}.

Based on your Traefik ingress controller installation, update your ingress resource by adding `publishedService` to `providers.kubernetesIngress.ingressEndpoint`.  
  
The value must be in the format  `"<namespace>/<service-name>"`<br>
where:<br>
  `<service-name>` is the Traefik service from which to copy the status

```yaml
...
providers:
  kubernetesIngress:
    ingressEndpoint:
      publishedService: "<namespace>/<traefik-service>" # Example, "codefresh/traefik-default" 
...
```

{::nomarkdown}
</br>
{:/}

## GitOps CLI installation

### GitOps CLI installation modes
The table lists the modes available to install the Codefresh CLI.

{: .table .table-bordered .table-hover}
| Install mode | OS       | Commands |
| -------------- | ----------| ----------|  
| `curl`         | MacOS-x64 |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-amd64.tar.gz | tar zx && mv ./cf-darwin-amd64 /usr/local/bin/cf && cf version`|
|             | MacOS-m1 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-arm64.tar.gz | tar zx && mv ./cf-darwin-arm64 /usr/local/bin/cf && cf version` |          
|             | Linux - X64 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-amd64.tar.gz | tar zx && mv ./cf-linux-amd64 /usr/local/bin/cf && cf version` |       
|              | Linux - ARM  |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-arm64.tar.gz | tar zx && mv ./cf-linux-arm64 /usr/local/bin/cf && cf version`|     
| `brew` | N/A| `brew tap codefresh-io/cli && brew install cf2`|

### Install the GitOps CLI
Install the GitOps CLI using the option that best suits you: `curl`, `brew`, or standard download.  
If you are not sure which OS to select for `curl`, simply select one, and Codefresh automatically identifies and selects the right OS for the installation.

1. Do one of the following:
  * For first-time installation, go to the Welcome page, select **+ Install Runtime**.
  * If you have provisioned a GitOps Runtime, in the Codefresh UI, go to [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}, and select **+ Add Runtime**.
1. Install the Codefresh CLI:
  * Select one of the installation modes. 
  * Generate the API key.
  * Create the authentication context:
    `cf config create-context codefresh --api-key <generatedKey>` 
  

    {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-download-cli.png" 
   url="/images/getting-started/quick-start/quick-start-download-cli.png" 
   alt="Download CLI to install runtime" 
   caption="Download CLI to install runtime"
   max-width="30%" 
   %} 


{::nomarkdown}
</br></br>
{:/}

## Install Hybrid GitOps Runtime  

### Before you begin
* Make sure you meet the [minimum requirements](#minimum-system-requirements) for installation
* Make sure you have [Runtime token with the required scopes from your Git provider]({{site.baseurl}}/docs/reference/git-tokens)
* [Download or upgrade to the latest version of the CLI]({{site.baseurl}}/docs/installation/gitops/upgrade-gitops-cli/)
* Review [Hybrid Runtime installation flags](#hybrid-runtime-installation-flags)
* For ingress-based runtimes, make sure your ingress controller is configured correctly:
  * [Ambasador ingress configuration](#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration](#aws-alb-ingress-configuration)
  * [Istio ingress configuration](#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration](#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration](#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration](#traefik-ingress-configuration)


{::nomarkdown}
</br>
{:/}
 
### How to

1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes, in the Codefresh UI:  
    On the toolbar, click the **Settings** icon, and expand Runtimes in the sidebar, and select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Do one of the following:  
  * CLI wizard: Run `cf runtime install`, and follow the prompts to enter the required values.  
  * Silent install: Pass the required flags in the install command:  
    `cf runtime install <runtime-name> --repo <git-repo> --git-token <git-token> --silent`  
  For the list of flags, see [Hybrid runtime installation flags](#hybrid-runtime-installation-flags).
1. If relevant, complete the configuration for these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer](#alias-dns-record-in-route53-to-load-balancer)
  * [Istio: Configure cluster routing service](#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret](#patch-certificate-secret)  
1. If you bypassed installing ingress resources with the `--skip-ingress` flag for ingress controllers not in the supported list, create and register Git integrations using these commands:  
  `cf integration git add default --runtime <RUNTIME-NAME> --api-url <API-URL>`  
  `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`  


{::nomarkdown}
</br>
{:/}



## Hybrid GitOps Runtime installation flags
This section describes the required and optional flags to install a Hybrid GitOps Runtime.
For documentation purposes, the flags are grouped into:
* Runtime flags, relating to runtime, cluster, and namespace requirements
* Ingress-less flags, for tunnel-based installation
* Ingress-controller flags, for ingress-based installation
* Git provider and repo flags
* Codefresh resource flags

{::nomarkdown}
</br>
{:/}

### Runtime flags

**Runtime name**  
Required.  
The Runtime name must start with a lower-case character, and can include up to 62 lower-case characters and numbers.  
* CLI wizard: Add when prompted. 
* Silent install: Add the `--runtime` flag and define the name.

**Namespace resource labels**  
Optional.  
The label of the namespace resource to which you are installing the Hybrid Runtime. Labels are required to identify the networks that need access during installation, as is the case when using services meshes, such as Istio for example.  

* CLI wizard and Silent install: Add the `--namespace-labels` flag, and define the labels in `key=value` format. Separate multiple labels with `commas`.

**Kube context**  
Required.  
The cluster defined as the default for `kubectl`. If you have more than one Kube context, the current context is selected by default.  

* CLI wizard: Select the Kube context from the list displayed.
* Silent install: Explicitly specify the Kube context with the `--context` flag.

**Access mode**  
The access mode for the runtime, which can be one of the following:
* [Tunnel-based]({{site.baseurl}}/docs/installation/runtime-architecture/#tunnel-based-hybrid-gitops-runtime-architecture), for runtimes without ingress controllers. This is the default.
* [Ingress-based]({{site.baseurl}}/docs/installation/runtime-architecture/#ingress-based-hybrid-gitops-runtime-architecture), for runtimes with ingress controllers. 


* CLI wizard: Select the `Codefresh tunnel-based` or `Ingress-based` access mode from the list displayed. `Tunnel-based` mode is selected by default.  
* Silent install:  
  * For tunnel-based, you can omit the flag as this is the default access mode, and then add the [Tunnel-based runtime flags](#tunnel-based-runtime-flags), as needed.
  * For ingress-based, add the `--access-mode ingress` flag, and then add the [Ingress controller flags](#ingress-controller-flags), as needed.


**Shared configuration repository**  
The Git repository per Runtime account with shared configuration manifests.  
* CLI wizard and Silent install: Add the `--shared-config-repo` flag and define the path to the shared repo.  

{::nomarkdown}
</br>
{:/}

### Tunnel-based runtime flags
These flags are required to install tunnel-based Hybrid Runtimes, without an ingress controller. 

**IP allowlist**

Optional.  

The allowed list of IPs from which to forward requests to the internal customer cluster for ingress-less runtime installations. The allowlist can include IPv4 and IPv6 addresses, with/without subnet and subnet masks. Multiple IPs must be separated by commas.  

When omitted, all incoming requests are authenticated regardless of the IPs from which they originated. 

* CLI wizard and Silent install: Add the `--ips-allow-list` flag, followed by the IP address, or list of comma-separated IPs to define more than one. For example, `--ips-allow-list 77.126.94.70/16,192.168.0.0` 

{::nomarkdown}
</br>
{:/}

### Ingress controller flags


**Skip ingress**  
Required, if you are using an unsupported ingress controller.  
For unsupported ingress controllers, bypass installing ingress resources with the `--skip-ingress` flag.  
In this case, after completing the installation, manually configure the cluster's routing service, and create and register Git integrations. See the last step in [Install the Hybrid GitOps Runtime](#install-hybrid-gitops-runtime).

**Ingress class**  
Required.  

* CLI wizard: Select the ingress class for Runtime installation from the list displayed.
* Silent install: Explicitly specify the ingress class through the `--ingress-class` flag. Otherwise, Runtime installation fails.  

**Ingress host**  
Required.  
The IP address or host name of the ingress controller component.  

* CLI wizard: Automatically selects and displays the host, either from the cluster or the ingress controller associated with the **Ingress class**.  
* Silent install: Add the `--ingress-host` flag. If a value is not provided, takes the host from the ingress controller associated with the **Ingress class**.
  > Important: For AWS ALB, the ingress host is created post-installation. However, when prompted, add the domain name you will create in `Route 53` as the ingress host.  

**Insecure ingress hosts**  
TLS certificates for the ingress host:  
If the ingress host does not have a valid TLS certificate, you can continue with the installation in insecure mode, which disables certificate validation.  

* CLI wizard: Automatically detects and prompts you to confirm continuing the installation in insecure mode.  
* Silent install: To continue with the installation in insecure mode, add the `--insecure-ingress-host` flag.  

**Internal ingress host**  
Optional.  
Enforce separation between internal (app-proxy) and external (webhook) communication by adding an internal ingress host for the app-proxy service in the internal network.  
For both CLI wizard and Silent install:  

* For new Runtime installations, add the `--internal-ingress-host` flag pointing to the ingress host for `app-proxy`.
* For existing installations, commit changes to the installation repository by modifying the `app-proxy ingress` and `<runtime-name>.yaml`  
  See [(Optional) Internal ingress host configuration for existing Hybrid Runtimes](#optional-internal-ingress-host-configuration-for-existing-hybrid-runtimes).

{::nomarkdown}
</br>
{:/}



### Git provider and repo flags
The Git provider defined for the Runtime. 

>Because Codefresh creates a [shared configuration repo]({{site.baseurl}}/docs/installation/gitops/shared-configuration) for the Runtimes in your account, the Git provider defined for the first Runtime you install in your account is used for all the other Runtimes in the same account.  

You can define any of the following Git providers:
* GitHub:
  * [GitHub](#github) (the default Git provider)
  * [GitHub Enterprise](#github-enterprise)
* GitLab:
  * [GitLab Cloud](#gitlab-cloud)
  * [GitLab Server](#gitlab-server)
* Bitbucket:
  * [Bitbucket Cloud](#bitbucket-cloud)
  * [Bitbucket Server](#bitbucket-server)

{::nomarkdown}
</br>
{:/}

#### Skip token scopes validation
Optional.  
Skip validating scopes for the token provided (for any Git provider). This flag can be useful for GitHub with fine-grained tokens, as these are currently (March 23) still in Beta according to GitHub, and therefore not offically supported by Codefresh. The tokens should work if they have the correct scopes.<br>

To skip token validation, add `--skip-permission-validation true`.

  > IMPORTANT:  
    Before using this flag, [review the required scopes for runtime tokens]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes). <br><br>
    When defined, Codefresh does not validate the scopes assigned to the token provided. If the token does not include the scopes required for Codefresh to automatically create the repositories for the runtime and Git Source during installation, the installation will fail.  
    The alternative is to create both repos before the installation.


#### GitHub
GitHub is the default Git provider for Hybrid Runtimes. Being the default provider, for both the CLI wizard and Silent install, you need to provide only the repository URL and the Git runtime token.

> For the required scopes, see [GitHub and GitHub Enterprise Runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes).

`--repo <repo_url> --git-token <git-runtime-token>`  

where:
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the Runtime installation, including the `.git` suffix. Copy the clone URL from your GitHub website (see [Cloning with HTTPS URLs](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls){:target="\_blank"}).   
  If the repo doesn't exist, copy an existing clone URL and change the name of the repo. Codefresh creates the repository during the installation.  

  Repo URL format:  
  `https://github.com/<owner>/reponame>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>/<reponame>` is your username or organization name, followed by the name of the repo, identical to the HTTPS clone URL.  For example, `https://github.com/nr-codefresh/codefresh.io.git`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the Runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the Runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://github.com/nr-codefresh/codefresh.io.git/runtimes/defs?ref=codefresh-prod`  
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the Runtime installation repository (see [GitHub runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes)).

{::nomarkdown}
</br>
{:/}

#### GitHub Enterprise 

> For the required scopes, see [GitHub and GitHub Enterprise runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes).


`--provider github --repo <repo_url> --git-token <git-runtime-token>`  

where:  
* `--provider github` (required), defines GitHub Enterprise as the Git provider for the Runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the Runtime installation, including the `.git` suffix. Copy the clone URL for HTTPS from your GitHub Enterprise website (see [Cloning with HTTPS URLs](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls){:target="\_blank"}).  
  If the repo doesn't exist, copy an existing clone URL and change the name of the repo. Codefresh creates the repository during the installation. 
  Repo URL format:  

  `https://ghe-trial.devops.cf-cd.com/<owner>/<https-repo-url>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>/<reponame>` is your username or organization name, followed by the name of the repo. For example, `codefresh-io/codefresh.io.git`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the Runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the Runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://ghe-trial.devops.cf-cd.com/codefresh-io/codefresh.io.git/runtimes/defs?ref=codefresh-prod`
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the Runtime installation repository (see [GitHub runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes)).  


{::nomarkdown}
</br>
{:/}

#### GitLab Cloud
> For the required scopes, see [GitLab Cloud and GitLab Server runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes).


`--provider gitlab --repo <https_project_url> --git-token <git_runtime_token>`  

where:  
* `--provider gitlab` (required), defines GitLab Cloud as the Git provider for the Runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git project for the Runtime installation, including the `.git` suffix. Copy the clone URL for HTTPS from your GitLab website.   
  If the repo doesn't exist, copy an existing clone URL and change the name of the repo. Codefresh creates the repository during the installation. 

  > Important: You must create the group with access to the project prior to the installation.

  Repo URL format:  

  `https://gitlab.com/<owner>/<project_name>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>` is either your username, or if your project is within a group, the front-slash separated path to the project. For example, `nr-codefresh` (owner), or `parent-group/child-group` (group hierarchy)
  * `<projectname>` is the name of the project.  For example, `codefresh`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the Runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the Runtime is installed in the default branch. For example, `codefresh-prod`.  

  Examples:  
  `https://gitlab.com/nr-codefresh/codefresh.git/runtimes/defs?ref=codefresh-prod` (owner)  

  `https://gitlab.com/parent-group/child-group/codefresh.git/runtimes/defs?ref=codefresh-prod` (group hierarchy)

* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the Runtime installation repository (see [GitLab runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes)).  


{::nomarkdown}
</br>
{:/}


#### GitLab Server

> For the required scopes, see [GitLab Cloud and GitLab Server runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes).

`--provider gitlab --repo <https_project_url> --git-token <git_runtime_token>`  

where:  
* `--provider gitlab` (required), defines GitLab Server as the Git provider for the Runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the Runtime installation, including the `.git` suffix.  
  If the project doesn't exist, copy an existing clone URL and change the name of the project. Codefresh creates the project during the installation.  
  
  > Important: You must create the group with access to the project prior to the installation.

  Repo URL format:  
  `https://gitlab-onprem.devops.cf-cd.com/<owner>/<project_name>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner>` is your username, or if the project is within a group or groups, the name of the group. For example, `nr-codefresh` (owner), or `parent-group/child-group` (group hierarchy)
  * `<projectname>` is the name of the project.  For example, `codefresh`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the Runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the Runtime is installed in the default branch. For example, `codefresh-prod`.  

  Examples:  
  `https://gitlab-onprem.devops.cf-cd.com/nr-codefresh/codefresh.git/runtimes/defs?ref=codefresh-prod` (owner)  
  
  `https://gitlab-onprem.devops.cf-cd.com/parent-group/child-group/codefresh.git/runtimes/defs?ref=codefresh-prod` (group hierarchy)

* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the Runtime installation repository (see [GitLab runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes)).


{::nomarkdown}
</br>
{:/}

#### Bitbucket Cloud
> For the required scopes, see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes).


`--provider bitbucket --repo <https_repo_url> --git-user <git_username> --git-token <git_runtime_token>`    

where:  
* `--provider gitlab` (required), defines Bitbucket Cloud as the Git provider for the Runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the Runtime installation, including the `.git` suffix.  
  If the project doesn't exist, copy an existing clone URL and change the name of the project. Codefresh creates the project during Runtime installation.  
  >Important: Remove the username, including @ from the copied URL. 
  
  Repo URL format:  

  `https://bitbucket.org<workspace_id><https-repo-url>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<workspace_id>` is your workspace ID. For example, `nr-codefresh`.
  * `<repo_name>` is the name of the repository. For example, `codefresh`.
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the Runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the Runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://bitbucket.org/nr-codefresh/codefresh.git/runtimes/defs?ref=codefresh-prod`    
* `--git-user <git_username>` (required), is your username for the Bitbucket Cloud account. 
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the runtime installation repository (see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes)).


{::nomarkdown}
</br>
{:/}

#### Bitbucket Server

> For the required scopes, see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes).


`--provider bitbucket-server --repo <repo_url> --git-user <git_username> --git-token <git_runtime_token>`  

where:  
* `--provider gitlab` (required), defines Bitbucket Cloud as the Git provider for the Runtime and the account.
* `--repo <repo_url>` (required), is the `HTTPS` clone URL of the Git repository for the Runtime installation, including the `.git` suffix.  
  If the project doesn't exist, copy an existing clone URL and change the name of the project. Codefresh then creates the project during the installation.  
  >Important: Remove the username, including @ from the copied URL.  

  Repo URL format:  

  `https://bitbucket-server-8.2.devops.cf-cd.com:7990/scm/<owner_org_name>/<repo_name>.git[/subdirectory][?ref=branch]`  
  where:  
  * `<owner_org_name>` is your username or organization name.  For example, `codefresh-io.`. 
  * `<repo_name>` is the name of the repo.  For example, `codefresh`.  
  * `[/subdirectory]` (optional) is the path to a subdirectory within the repo. When omitted, the Runtime is installed in the root of the repository.  For example, `/runtimes/defs`.  
  * `[?ref=branch]` (optional) is the `ref` queryParam to select a specific branch. When omitted, the Runtime is installed in the default branch. For example, `codefresh-prod`.  

  Example:  
  `https://bitbucket-server-8.2.devops.cf-cd.com:7990/scm/codefresh-io/codefresh.git/runtimes/defs?ref=codefresh-prod` 
* `--git-user <git_username>` (required), is your username for the Bitbucket Server account. 
* `--git-token <git-runtime-token>` (required), is the Git token authenticating access to the Runtime installation repository (see [Bitbucket runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes)).

{::nomarkdown}
</br></br>
{:/}



### Codefresh resource flags
**Codefresh demo resources**  
Optional.  
Install demo pipelines to use as a starting point to create your own GitOps pipelines. We recommend installing the demo resources as these are used in our quick start tutorials.  

* Silent install: Add the `--demo-resources` flag, and define its value as `true` (default), or `false`. For example, `--demo-resources=true`

**Insecure flag**  
For _on-premises installations_, if the Ingress controller does not have a valid SSL certificate, to continue with the installation, add the `--insecure` flag to the installation command.  

{::nomarkdown}
</br></br>
{:/}




<!--### Hybrid Runtime components

**Git repositories**  
* Runtime install repository: The installation repo contains three folders: apps, bootstrap and projects, to manage the runtime itself with Argo CD.  
* Git source repository: Created with the name `[repo_name]_git-source`. This repo stores manifests for pipelines with sources, events, workflow templates. See [Add Git Sources to runtimes]({{site.baseurl}}/docs/runtime/git-sources/).

* Shared configuration repository: Stores configuration and resource manifests that can be shared across runtimes, such as integration resources. See [Shared configuration repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration/)

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

Once the Hybrid Runtime is successfully installed, it is provisioned on the Kubernetes cluster, and displayed in the **Runtimes** page.

{::nomarkdown}
</br>
{:/}-->


## (Optional) Internal ingress host configuration for existing Hybrid GitOps Runtimes
If you already have provisioned  Hybrid GitOps Runtimes, to use an internal ingress host for app-proxy communication and an external ingress host to handle webhooks, change the specs for the `Ingress` and `Runtime` resources in the Runtime installation repository. Use the examples as guidelines.  

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
  

## Related articles
[Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/)  
[Monitoring & managing GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)  
[Shared Configuration Repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)  
[Troubleshoot Hybrid Runtime installation]({{site.baseurl}}/docs/kb/articles/runtime-issues/)
