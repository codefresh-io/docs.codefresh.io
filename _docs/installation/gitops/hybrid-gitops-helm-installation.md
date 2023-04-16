---
title: "Hybrid GitOps Runtime installation"
description: "Provision Hybrid GitOps Runtimes through Helm"
group: installation
toc: true
---

Install the Hybrid Runtime for GitOps through a Helm chart.
> Helm installation for Hybrid GitOps is currently in Beta. 



* Access mode   
  Codefresh supports both tunnel-based and ingress-based access modes. The tunnel-based access mode is the default access mode. <br>
  Ingress-based access mode requires you to configure an [ingress controller](#ingress-controller-configuration) before the installation, and pass additional flags such as the ingress host and class in the Helm install command. 
  See also [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

* Shared configuration repository    
  For each account, you can create a shared configuration repository, which is a Git repository with configuration manifests, shared between all the GitOps Runtimes in the same account. Read more on the [shared configuration repository]({{site.baseurl}}/docs/reference/shared-configuration).
  * If this is the first Hybrid GitOps Runtime in your account, then you will define the shared config repo during the installation. 
  * If you already have a Hosted or Hybrid GitOps Runtime, you already have a shared repo, and don't need to create one. 
  See also 

* Argo project CRDs  
  Hybrid GitOps installation requires a cluster without Argo project CRDs.  
  You can handle Argo project CRDs outside the chart, or as recommended, adopt the CRDs to be managed by the GitOps Runtime Helm release. See [Argo porject CRDs](/#argo-project-crds).


## Minimum system requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |  
| --------------         | --------------           |  
|Kubernetes cluster      | Server version 1.18 and higher, without Argo Project components. {::nomarkdown}<br><b>Tip</b>:  To check the server version, run:<br> <code class="highlighter-rouge">kubectl version --short</code>.{:/}|
| Ingress controller| Configured on Kubernetes cluster and exposed from the cluster. {::nomarkdown} <br>Supported and tested ingress controllers include: <ul><li>Ambassador</li>{:/}(see [Ambassador ingress configuration](#ambassador-ingress-configuration)){::nomarkdown}<li>AWS ALB (Application Load Balancer)</li>{:/} (see [AWS ALB ingress configuration](#aws-alb-ingress-configuration)){::nomarkdown}<li>Istio</li>{:/} (see [Istio ingress configuration](#istio-ingress-configuration)){::nomarkdown}<li>NGINX Enterprise (nginx.org/ingress-controller)</li>{:/} (see [NGINX Enterprise ingress configuration](#nginx-enterprise-ingress-configuration)){::nomarkdown}<li>NGINX Community (k8s.io/ingress-nginx)</li> {:/} (see [NGINX Community ingress configuration](#nginx-community-version-ingress-configuration)){::nomarkdown}<li>Trafik</li>{:/}(see [Traefik ingress configuration](#traefik-ingress-configuration))|
|Node requirements| {::nomarkdown}<ul><li>Memory: 5000 MB</li><li>CPU: 2</li></ul>{:/}|
|Cluster permissions | Cluster admin permissions |
|Git providers    |{::nomarkdown}<ul><li>GitHub</li><li>GitHub Enterprise</li><li>GitLab Cloud</li><li>GitLab Server</li><li>Bitbucket Cloud</li><li>Bitbucket Server</li></ul>{:/}|
|Git access tokens    | {::nomarkdown}Git runtime token:<ul><li>Valid expiration date</li><li>Scopes:<ul><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#github-and-github-enterprise-runtime-token-scopes">GitHub and GitHub Enterprise</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-runtime-token-scopes">GitLab Cloud and GitLab Server</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#bitbucket-cloud-and-bitbucket-server-runtime-token-scopes">Bitbucket Cloud and Server</a> </li></ul></ul>{:/}|
| |Git personal token:{::nomarkdown}<ul><li>Valid expiration date</li><li>Scopes: <ul><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#github-and-github-enterprise-personal-user-token-scopes">GitHub and GitHub Enterprise</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#gitlab-cloud-and-gitlab-server-personal-user-token-scopes">GitLab Cloud and GitLab Server</a></li><li><a href="https://codefresh.io/docs/docs/reference/git-tokens/#bitbucket-cloud-and-server-personal-user-token-scopes">Bitbucket Cloud and Server</a> </li></ul>{:/}|

## Ingress controller configuration

>This section is relevant only for ingress-based Hybrid GitOps Runtimes.

You need to configure ingress controllers only for ingress-based Hybrid GitOps Runtimes. Codefresh offers tunnel-based Hybrid GitOps Runtimes which do not require ingress controllers. 

### Ambassador ingress configuration
For detailed configuration information, see the [Ambassador ingress controller documentation](https://www.getambassador.io/docs/edge-stack/latest/topics/running/ingress-controller){:target="\_blank"}.  

This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the Hybrid GitOps Runtime.  
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
For secure installation, the ingress controller must have a valid TLS certificate.  
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
|Valid external IP address |   _Before_ installing Hybrid GitOps Runtime  |     
|Valid TLS certificate | |
|TCP support|  |  
|Controller  configuration] |  | 
|Alias DNS record in route53 to load balancer | _After_ installing Hybrid GitOps Runtime| 
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

>  The alias  must be configured _after_ installing the Hybrid GitOps Runtime.

1. Make sure a DNS record is available in the correct hosted zone. 
1. _After_ Hybrid GitOps Runtime installation, in Amazon Route 53, create an alias to route traffic to the load balancer that is automatically created during the installation:  
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
|Valid external IP address |_Before_ installing Hybrid GitOps Runtime  |     
|Valid TLS certificate| |
|TCP support |  | 
|Cluster routing service | _After_ installing Hybrid GitOps Runtime | 

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
>  The cluster routing service must be configured _after_ installing the Hybrid GitOps Runtime.

Based on the Hybrid GitOps Runtime version, you need to configure single or multiple `VirtualService` resources for the `app-proxy`, `webhook`, and `workflow` services.

##### Runtime version 0.0.543 or higher
Configure a single `VirtualService` resource to route traffic to the `app-proxy`, `webhook`, and `workflow` services, as in the example below.  

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  namespace: pov-codefresh-istio-runtime # replace with your Hybrid GitOps runtime name
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
  namespace: test-runtime3 # replace with your Hybrid GitOps runtime name
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
  namespace: test-runtime3 # replace with your Hybrid GitOps runtime name
  name: csdp-default-git-source
spec:
  hosts:
    - my.support.cf-cd.com # replace with your host name
  gateways:
    - my-gateway # replace with your gateway name
  http:
    - match:
      - uri:
          prefix: /webhooks/test-runtime3/push-github # replace `test-runtime3` with your Hybrid GitOps runtime name, and `push-github` with the name of your event source
      route:
      - destination:
          host: push-github-eventsource-svc # replace `push-github' with the name of your event source
          port:
            number: 80
    - match:
      - uri:
          prefix: /webhooks/test-runtime3/cypress-docker-images-push # replace `test-runtime3` with your Hybrid GitOps runtime name, and `cypress-docker-images-push` with the name of your event source
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
|Verify valid external IP address |_Before_ installing Hybrid GitOps Runtime  |     
|Valid TLS certificate | |
|TCP support|  | 
|NGINX Ingress: Enable report status to cluster |  | 
|NGINX Ingress Operator: Enable report status to cluster| |
|Patch certificate secret |_After_ installing Hybrid GitOps Runtime|

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

1. Make sure you have a certificate secret in the same namespace as the Hybrid GitOps Runtime. Copy an existing secret if you don't have one.  
You will need to add this to the `ingress-master` when you have completed runtime installation.

{::nomarkdown}
</br>
{:/}

#### Patch certificate secret
>  The certificate secret must be configured _after_ installing the Hybrid GitOps Runtime.

Patch the certificate secret in `spec.tls` of the `ingress-master` resource.  
The secret must be in the same namespace as the Hybrid GitOps Runtime.

1. Go to the Hybrid GitOps Runtime namespace with the NGINX ingress controller.
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


This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the Hybrid GitOps Runtime.  
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
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/aws/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#aws">ingress-nginx documentation for AWS</a>.
</details>
<details>
<summary><b>Azure (AKS)</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://docs.microsoft.com/en-us/azure/aks/ingress-internal-ip?tabs=azure-cli#create-an-ingress-controller">ingress-nginx documentation for AKS</a>.

</details>

<details>
<summary><b>Bare Metal Clusters</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/baremetal/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
Bare-metal clusters often have additional considerations. See <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/baremetal/">Bare-metal ingress-nginx considerations</a>.

</details>

<details>
<summary><b>Digital Ocean</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/do/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#digital-ocean">ingress-nginx documentation for Digital Ocean</a>.

</details>

<details>
<summary><b>Docker Desktop</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop">ingress-nginx documentation for Docker Desktop</a>.<br>
<b>Note:</b> By default, Docker Desktop services will provision with localhost as their external address. Triggers in delivery pipelines cannot reach this instance unless they originate from the same machine where Docker Desktop is being used.

</details>

<details>
<summary><b>Exoscale</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/exoscale/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://github.com/exoscale/exoscale-cloud-controller-manager/blob/master/docs/service-loadbalancer.md">ingress-nginx documentation for Exoscale</a>.

</details>


<details>
<summary><b>Google (GKE)</b></summary>
<br>
<b>Add firewall rules</b>
<br>
GKE by default limits outbound requests from nodes. For the Hybrid GitOps Runtime to communicate with the control-plane in Codefresh, add a firewall-specific rule.

<ol>
<li>Find your cluster's network:<br>
    <code class="highlighter-rouge">gcloud container clusters describe [CLUSTER_NAME] --format=get"(network)"</code>
</li>
<li>Get the Cluster IPV4 CIDR:<br>
    <code class="highlighter-rouge">gcloud container clusters describe [CLUSTER_NAME] --format=get"(clusterIpv4Cidr)"</code>
</li>
<li>Replace the `[CLUSTER_NAME]`, `[NETWORK]`, and `[CLUSTER_IPV4_CIDR]`, with the relevant values: <br>
    <code class="highlighter-rouge">gcloud compute firewall-rules create "[CLUSTER_NAME]-to-all-vms-on-network" </code><br>
    <code class="highlighter-rouge">  
    --network="[NETWORK]" \
    </code><br>
   <code class="highlighter-rouge">  
    --source-ranges="[CLUSTER_IPV4_CIDR]" \
    </code><br>
   <code class="highlighter-rouge">  
   --allow=tcp,udp,icmp,esp,ah,sctp
    </code><br>
</li> 
</ol>
<br>
<b>Use ingress-nginx</b><br>
<ol>
  <li>Create a `cluster-admin` role binding:<br>
      <code class="highlighter-rouge">  
        kubectl create clusterrolebinding cluster-admin-binding \
      </code><br>
      <code class="highlighter-rouge">  
        --clusterrole cluster-admin \
      </code><br>
      <code class="highlighter-rouge">  
        --user $(gcloud config get-value account)
      </code><br>
  </li>
  <li>Apply:<br>
      <code class="highlighter-rouge">  
        kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
      </code>
  </li>
  <li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
  </li>

</ol>
We recommend reviewing the <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke">provider-specific documentation for GKE</a>.

</details>


<details>
<summary><b>MicroK8s</b></summary>
<ol>
<li>Install using Microk8s addon system:<br>
    <code class="highlighter-rouge">microk8s enable ingress</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
MicroK8s has not been tested with Codefresh, and may require additional configuration. For details, see <a target="_blank" href="https://microk8s.io/docs/addon-ingress">Ingress addon documentation</a>.

</details>


<details>
<summary><b>MiniKube</b></summary>
<ol>
<li>Install using MiniKube addon system:<br>
    <code class="highlighter-rouge">minikube addons enable ingress</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
MiniKube has not been tested with Codefresh, and may require additional configuration. For details, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#minikube">Ingress addon documentation</a>.

</details>



<details>
<summary><b>Oracle Cloud Infrastructure</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
</li>
</ol>
For additional configuration options, see <a target="_blank" href="https://kubernetes.github.io/ingress-nginx/deploy/#oracle-cloud-infrastructure">ingress-nginx documentation for Oracle Cloud</a>.

</details>

<details>
<summary><b>Scaleway</b></summary>
<ol>
<li>Apply:<br>
    <code class="highlighter-rouge">kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/scw/deploy.yaml</code>
</li>
<li>Verify a valid external address exists:<br>
    <code class="highlighter-rouge">kubectl get svc ingress-nginx-controller -n ingress-nginx</code>
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
|Valid external IP address | _Before_ installing Hybrid GitOps Runtime  |     
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
 
#### Enable report status to cluster 
By default, the Traefik ingress controller is not configured to report its status to the cluster.  If not configured,  Argo’s health check reports the health status as “progressing”, resulting in a timeout error during installation.  

To enable reporting its status, add `publishedService` to `providers.kubernetesIngress.ingressEndpoint`.  
  
The value must be in the format `"<namespace>/<service-name>"`, where:  
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

## Argo project CRDs
If you already have Argo project CRDs on your cluster, do one of the following:
* Handle Argo projects CRDs outside of the chart (see [Argo's readme on Helm charts](https://github.com/argoproj/argo-helm/blob/main/README.md){:target="\_blank"})  
  Disable CRD installation under the relevant section for each of the Argo projects in the Helm chart:<br>
  `--set <argo-project>.crds.install=false`<br>
  where:<br>
  `<argo-project>` is the argo project component: `argo-cd`, `argo-workflows`, `argo-rollouts` and `argo-events`.

* Adopt the CRDs<br>
  Adopting the CRDs allows them to be managed by the `gitops-runtime helm release`. Doing so ensures upgrading the Hybrid GitOps Runtime, also automatically upgrades the CRDs.

  Run this script _before_ installation:

```
#!/bin/sh
RELEASE=<helm-release-name>
NAMESPACE=<target-namespace>
kubectl label --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) app.kubernetes.io/managed-by=Helm
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-name=$RELEASE
kubectl annotate --overwrite crds $(kubectl get crd | grep argoproj.io | awk '{print $1}' | xargs) meta.helm.sh/release-namespace=$NAMESPACE
```








## Install Hybrid GitOps Runtime with Helm
Follow the steps to install Hybrid GitOps via Helm.<br>
The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/tree/main/charts/gitops-runtime){:target="\_blank"}.

### Before you begin
* Make sure you meet the [minimum requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements) for installation
* Git provider requirements:
    * [Runtime token with the required scopes]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes). You need to supply as part of the Helm install command.
    * [Personal Access Token (PAT)]({{site.baseurl}}/docs/reference/git-tokens/#git-personal-tokens) with the required scopes for Git-based actions. 
    * Server URLs for on-premises Git providers
* Verify there are no Argo project CRDs in the target namespace or that you have adopted the CRDs (see [Argo project CRDs](#argo-project-crds))
* For ingress-based runtimes only, verify that these ingress controllers are configured correctly:
  * [Ambassador ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#ambassador-ingress-configuration)
  * [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#alb-aws-ingress-configuration)
  * [Istio ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#istio-ingress-configuration)
  * [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#nginx-enterprise-ingress-configuration)
  * [NGINX Community ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#nginx-community-version-ingress-configuration)
  * [Traefik ingress configuration]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#traefik-ingress-configuration)
<br><br>


<!---
1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes, in the Codefresh UI:  
    On the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Click **Generate** to generate your API key. 
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   > The Namespace must be identical to the Runtime Name. The default names are `codefresh` for both.
1. Copy and run the command to the add the repository for the Helm chart:  
   `helm repo add <helm-repo-name> https://chartmuseum.codefresh.io/gitops-runtime` <br>
   `helm repo update`<br>
   where: <br> 
   `<helm-repo-name>` is the name of the repository to which to add the runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:  
  The commands differ depending on the access mode. An ingress-based runtime requires additional flags.<br>

    **Tunnel-based install chart command:**<br>
    `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime --devel --wait`  


    **Ingress-based install chart command:**  
      `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime  --set global.runtime.ingress.enabled=true --set "global.runtime.ingress.hosts[0]"=<ingress-host> --set global.runtime.ingress.className=<ingress-class> --devel --wait`  
    
    >Unless otherwise indicated, values are automatically populated by Codefresh.

    where:  
    * `<helm-release-name>` is the name of the Helm release.  
    * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * `<codefresh-account-id>` is your Codefresh account ID.
    * `<codefresh-api-key>` is the generated API key.
    * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * `gitops-runtime` is the chart name defined by Codefresh.
    * `global.runtime.ingress.enabled=true` is mandatory for _ingress-based runtimes_, and indicates that the runtime is ingress-based.
    * `<ingress-host>` is mandatory for _ingress-based runtimes_, and is the IP address or host name of the ingress controller component. 
    * `<ingress-class>` is mandatory for _ingress-based runtimes_, and is the ingress class of the ingress controller. For example, `nginx` for the NGINX ingress controller.
    * `--wait` waits until all the pods are up and running for the deployment.

1. Define your Git provider and register the Git integration:  
  `cf integration git add default --runtime <runtime-name> --api-url <api-url> --provider <provider>`  
  `cf integration git register default --runtime <runtime-name> --token <git-personal-access-token>`   
  where:  
      * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
      * `<api-url>` is the URL of the Git provider, and can be one of the following:
          * GitHub Cloud: `https://api.github.com` 
          * GitHub Enterprise: `https://<server-url>/api/v3`
          * GitLab Cloud: `https://gitlab.com/api/v4`
          * GitLab Server: `<server-url>/api/v4`
          * Bitbucket Cloud: `https://api.bitbucket.org/2.0`
          * Bitbucket Server: `<server-url>/rest/api/1.0`
      * `<provider>` is the Git provider for the runtime. The same provider is used to install additional runtimes in the same account. Can be one of the following:
          * GitHub and GitHub Enterprise: `github`
          * GitLab Cloud and GitLab Server: `gitlab`
          * Bitbucket Cloud: `bitbucket`
          * Bitbucket Server: `bitbucket-server`  
      * `<git-personal-access-token>` is the token you generated with the required scopes. 
1. When the installation is complete, go to the **List View**, and select the new runtime.
1. From the context menu on the right, select **Update Git Runtime Credentials**.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/runtime/gitops-hybrid-helm-update-token.png" 
	url="/images/runtime/gitops-hybrid-helm-update-token.png" 
	alt="Update Git Runtime Credentials after installation" 
	caption="Update Git Runtime Credentials after installation"
  max-width="80%" 
%}

{:start="10"}
1. Paste the Git runtime token you created, and click **Update Credentials**. 
1. If you don't have the shared configuration repository for GitOps runtimes, contact support. 
  > For the Alpha, we assume that you already have a shared configuration repository for your account.
1. Optional. [Create a Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the runtime.
1. Required only for ALB AWS, Istio, or NGINX Enterprise ingress-controllers.<br>
   Complete the configuration for these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#patch-certificate-secret)  

-->

### Step 1: Select Hybrid Runtime install option

1. Do one of the following:  
  * If this is your first Hybrid GitOps installation, in the Welcome page, select **+ Install Runtime**.
  * If you have already provisioned a Hybrid GitOps Runtime, to provision additional runtimes:  
        1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and from Runtimes in the sidebar, select [**GitOps Runtimes**](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}.
        1. Click **+ Add Runtimes**, and then select **Hybrid Runtimes**.
1. Continue with [Step 2: Set up GitOps Git account](#step-2-set-up-gitops-git-account).

### Step 2: Set up GitOps Git account
As the first step in installing the Hybrid GitOps Runtime, define details for your Git provider and account.

1. Select the **Git provider** from the list.
1. Define the **API URL** for the Git provider you selected, as one of the following:
  * GitHub Cloud: `https://api.github.com` 
  * GitHub Enterprise: `https://<server-url>/api/v3`
  * GitLab Cloud: `https://gitlab.com/api/v4`
  * GitLab Server: `<server-url>/api/v4`
  * Bitbucket Cloud: `https://api.bitbucket.org/2.0`
  * Bitbucket Server: `<server-url>/rest/api/1.0`
1. Define the URL of the **Shared configuration repository**.
  >Because the shared configuration repo is defined at the account-level, the Git provider you select for the first Runtime in your account is used for all the other Runtimes in the same account.  
1. Click **Next**.
1. Continue with [Step 3: Install Hybrid Runtime](#step-3-install-hybrid-runtime).

### Step 3: Install Hybrid GitOps Runtime

Install the Hybrid GitOps Runtime through the Helm chart. The Codefresh `values.yaml` is located [here](https://github.com/codefresh-io/gitops-runtime-helm/tree/main/charts/gitops-runtime){:target="\_blank"}. 

**Runtime Name**  
If you define a custom name for the Hybrid GitOps Runtime, it must start with a lower-case character, and can include up to 62 lower-case characters and numbers.

**Namespace**
The Namespace must conform to the naming conventions for Kubernetes objects.


1. To generate your Codefresh API key, click **Generate**. 
1. If needed, select **Customize runtime values**, and define the **Runtime Name** and **Namespace**.
   The default names are `codefresh` for both.
1. Copy and run the command to the add the repository for the Helm chart:  
   `helm repo add <helm-repo-name> https://chartmuseum.codefresh.io/gitops-runtime` <br>
   `helm repo update`<br>
   where: <br> 
   `<helm-repo-name>` is the name of the repository to which to add the Hybrid GitOps Runtime Helm chart. For example, `cf-gitops-runtime`.
1. Copy and run the command to install the runtime Helm chart:  
  The commands differ depending on the access mode. An ingress-based Hybrid GitOps Runtime requires additional flags.<br>

    **Tunnel-based install chart command:**<br>
    `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime --devel --wait`  


    **Ingress-based install chart command:**  
      `helm upgrade --install <helm-release-name> --create-namespace --namespace <namespace> --set global.codefresh.accountId=<codefresh-account-id> --set global.codefresh.userToken.token=<codefresh-api-key> --set global.runtime.name=<runtime-name> <helm-repo-name>/gitops-runtime  --set global.runtime.ingress.enabled=true --set "global.runtime.ingress.hosts[0]"=<ingress-host> --set global.runtime.ingress.className=<ingress-class> --devel --wait`  
    
    >Unless otherwise indicated, values are automatically populated by Codefresh.

    where:  
    * `<helm-release-name>` is the name of the Helm release.  
    * `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either `codefresh`, or the custom name you defined.  
    * `<codefresh-account-id>` is your Codefresh account ID.
    * `<codefresh-api-key>` is the generated API key.
    * `<runtime-name>` is the name of the runtime, either `codefresh`, or the custom name you defined. 
    * `gitops-runtime` is the chart name defined by Codefresh.
    * `global.runtime.ingress.enabled=true` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and indicates that the runtime is ingress-based.
    * `<ingress-host>` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and is the IP address or host name of the ingress controller component. 
    * `<ingress-class>` is mandatory for _ingress-based Hybrid GitOps Runtimes_, and is the ingress class of the ingress controller. For example, `nginx` for the NGINX ingress controller.
    * `--wait` waits until all the pods are up and running for the deployment. 
1. Wait for a few minutes, and then click **Close**.
   You are taken to the List View for GitOps Runtimes where you can see the Hybrid GitOps Runtime you added prefixed with a red dot.
1. Continue with [Step 4: Configure Git credentials for runtime](#step-4-configure-git-credentials-for-runtime).



### Step 4: Configure Git credentials for Hybrid GitOps Runtime
After installing the Hybrid GitOps Runtime, you need to complete the installation by defining Git credentials for the runtime. Git credentials are essential for the proper functioning of the runtime.

Git credentials include authorizing access to Git through OAuth2 or a personal access token, and optionally configuring SSH access to Git.

**Git authorization** 
* OAuth2 authorization is possible if your admin has registered an OAuth Application for Codefresh. See [OAuth2 setup for Codefresh]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup/).
* Git access token authentication requires you to generate a personal access token in your Git provider account for the GitOps Runtime, with the correct scopes. See [GitOps Runtime token scopes]({{site.baseurl}}/docs/reference/git-tokens/#git-runtime-token-scopes).

**SSH access to Git**  
By default, Git repositories use the HTTPS protocol. You can also use SSH to connect Git repositories by entering the SSH private key.

>When SSH is configured for a GitOps runtime, on creating/editing Git-Source applications, you can select HTTPS OR SSH as the protocol to connect to the Git repository. See [Repository URL in Application Source definitions]({{site.baseurl}}/docs/deployments/gitops/create-application/#source).

For more information on generating SSH private keys, see the official documentation:
* [GitHub](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent){:target="\_blank"}
* [GitLab](https://docs.gitlab.com/ee/ssh/#generating-a-new-ssh-key-pair){:target="\_blank"}
* [Bitbucket](https://confluence.atlassian.com/bitbucket/set-up-an-ssh-key-728138079.html){:target="\_blank"}
* [Azure](https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops&tabs=current-page){:target="\_blank"}



**Before you begin**  
* To authenticate through a Git access token, make sure your token is valid and has the required scopes for GitOps Runtimes 
* To use SSH, copy the SSH private key for your Git provider 

**How to**

1. Do one of the following: 
  * If your admin has set up OAuth access, click **Authorize Access to Git Provider**. Go to _step 2_.
  * Alternatively, authenticate with an access token from your Git provider. Go to _step 3_.
1. For OAuth2 authorization:
  > If the application is not registered, you get an error. Contact your admin for help.  
  * Enter your credentials, and select **Sign In**.
  * If required, as for example with two-factor authentication, complete the verification. 
    {% include 
      image.html 
      lightbox="true" 
      file="/images/administration/user-settings/oauth-user-authentication.png" 
      url="/images/administration/user-settings/oauth-user-authentication.png" 
      alt="Authorizing access with OAuth2" 
      caption="Authorizing access with OAuth2"
      max-width="30%" 
   %}

{:start="3"} 
1. For Git token authentication, in the **Git Runtime Token** field, paste the Git runtime token you generated.
1. Optional. To configure SSH access to Git, expand **Connect Repo using SSH**, and then paste the raw SSH private key into the field. 

SCREENSHOT

{:start="5"}
1. Click **Configure**.
1. Continue with [Step 5: (Optional) Configure Hybrid GitOps Runtime as Argo Application](#step-5-optional-configure-hybrid-gitops-runtime-as-argo-application).


### Step 5: (Optional) Configure Hybrid GitOps Runtime as Argo Application

The final step, also optional, is to configure the Hybrid GitOps Runtime as an Argo Application. By doing so, you can easily monitor its health and sync statuses, and ensure that GitOps is the single source of truth for the runtime.  

To configure it, you simply need to click the button, and Codefresh takes care of the configuration for you.


>If you don't configure it as an Argo Application, the Sync Status column will show "N/A" and remind you to configure it.



1. Click **Configure as Argo Application**. 
1. Continue with [Step 6: (Optional) Create a Git Source](#step-6-optional-create-a-git-source).

### Step 6: (Optional) Create a Git Source


1. Optional. [Create a Git Source]({{site.baseurl}}/docs/installation/gitops/git-sources/#create-a-git-source) for the runtime.
1. Continue with [Step 7: (Optional) Configure ingress-controllers](#step-7-optional-configure-ingress-controllers).

### Step 7: (Optional) Configure ingress-controllers
Required only for ALB AWS, Istio, or NGINX Enterprise ingress-controllers.<br>

* Complete configuring these ingress controllers:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#patch-certificate-secret)  

That's it! You have successfully completed installing a Hybrid GitOps Runtime.

You can now add [external clusters to the runtime]({{site.baseurl}}/docs/installation/gitops/managed-cluster/), and [create and deploy GitOps applications]({{site.baseurl}}/docs/deployments/gitops/create-application/).

## Related articles
[Managing and monitoring GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/)  
[Troubleshooting Hybrid GitOps Runtimes]({{site.baseurl}}/docs/troubleshooting/runtime-issues/)  
[GitOps architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-architecture)  

