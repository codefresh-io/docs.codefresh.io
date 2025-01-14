---
title: "Ingress configuration for GitOps Runtimes"
description: "Configure ingress controllers for GitOps Runtimes"
group: gitops-runtimes
toc: true
---


## Ingress controller configuration

Codefresh supports both tunnel-based and ingress-based access modes when installing GitOps Runtimes. <br>
Ingress-based access mode requires you to configure an ingress controller before the installation, and pass additional flags such as the ingress host and class in the Helm install command.
See also [GitOps Runtime architecture]({{site.baseurl}}/docs/gitops-runtime/runtime-architecture).


## Ambassador ingress configuration
For detailed configuration information, see the [Ambassador ingress controller documentation](https://www.getambassador.io/docs/edge-stack/latest/topics/running/ingress-controller){:target="\_blank"}.

This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the Hybrid GitOps Runtime.
* Valid external IP address
* Valid TLS certificate
* TCP support



### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.



### Valid TLS certificate
For secure installation, the ingress controller must have a valid TLS certificate.
{{site.data.callout.callout_tip}}
**TIP**  
  Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.
{{site.data.callout.end}}



#### TCP support
Configure the ingress controller to handle TCP requests.



## AWS ALB ingress configuration

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



### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.



### Valid TLS certificate
For secure runtime installation, the ingress controller must have a valid TLS certificate.

{{site.data.callout.callout_tip}}
**TIP**:  
  Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.
{{site.data.callout.end}}


### TCP support
Configure the ingress controller to handle TCP requests.



### Controller configuration
In the ingress resource file, verify that `spec.controller` is configured as `ingress.k8s.aws/alb`.

```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  name: alb
spec:
  controller: ingress.k8s.aws/alb
```


### Create an alias to load balancer in route53

{{site.data.callout.callout_warning}}
**IMPORTANT**  
Configure the alias _after_ installing the Hybrid GitOps Runtime.
{{site.data.callout.end}}

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



### (Optional) Git integration registration
If the installation failed, as can happen if the DNS record was not created within the timeframe, manually create and register Git integrations using these commands:

  `cf integration git add default --runtime <RUNTIME-NAME> --api-url <API-URL>`
  
  `cf integration git register default --runtime <RUNTIME-NAME> --token <RUNTIME-AUTHENTICATION-TOKEN>`



## Istio ingress configuration
For detailed configuration information, see [Istio ingress controller documentation](https://istio.io/latest/docs/tasks/traffic-management/ingress/kubernetes-ingress){:target="\_blank}.

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}
| What to configure    |   When to configure |
| --------------       | --------------   |
|Valid external IP address |_Before_ installing Hybrid GitOps Runtime  |
|Valid TLS certificate| |
|TCP support |  |
|Cluster routing service | _After_ installing Hybrid GitOps Runtime |



### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.



### Valid TLS certificate
For secure runtime installation, the ingress controller must have a valid TLS certificate.
{{site.data.callout.callout_tip}}
**TIP**  
  Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.
{{site.data.callout.end}}


### TCP support
Configure the ingress controller to handle TCP requests.





### Cluster routing service
{{site.data.callout.callout_warning}}
**IMPORTANT**  
Configure the cluster routing service _after_ installing the Hybrid GitOps Runtime.
{{site.data.callout.end}}

Based on the Hybrid GitOps Runtime version, you need to configure single or multiple `VirtualService` resources for the `app-proxy`, `webhook`, and `workflow` services.

#### Runtime version 0.0.543 or higher
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

#### Runtime version 0.0.542 or lower

Configure two different `VirtualService` resources, one to route traffic to the `app-proxy`, and the second to route traffic to the `webhook` services, as in the examples below.



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



## NGINX Enterprise ingress configuration

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




### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.




### Valid TLS certificate
For secure runtime installation, the ingress controller must have a valid TLS certificate.
{{site.data.callout.callout_tip}}
**TIP**  
  Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.
{{site.data.callout.end}}


### TCP support
Configure the ingress controller to handle TCP requests.



### NGINX Ingress: Enable report status to cluster

If the ingress controller is not configured to report its status to the cluster, Argo’s health check reports the health status as “progressing” resulting in a timeout error during installation.

* Pass `--report-ingress-status` to `deployment`.

```yaml
spec:
  containers:
    - args:
      - --report-ingress-status
```



### NGINX Ingress Operator: Enable report status to cluster

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



### Patch certificate secret
{{site.data.callout.callout_warning}}
**IMPORTANT**    
  The certificate secret must be configured _after_ installing the Hybrid GitOps Runtime.
{{site.data.callout.end}}

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



## NGINX Community version ingress configuration

Codefresh has been tested with and supports implementations of the major providers. For your convenience, we have provided configuration instructions, both for supported and untested providers in [Provider-specific configuration](#provider-specific-configuration).


This section lists the specific configuration requirements for Codefresh to be completed  _before_ installing the Hybrid GitOps Runtime.
* Verify valid external IP address
* Valid TLS certificate
* TCP support



### Valid external IP address
Run `kubectl get svc -A` to get a list of services, and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.



### Valid TLS certificate
For secure runtime installation, the ingress controller must have a valid TLS certificate.
{{site.data.callout.callout_tip}}
**TIP**    
  Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.
{{site.data.callout.end}}


### TCP support
Configure the ingress controller to handle TCP requests.

Here's an example of TCP configuration for NGINX Community on AWS.
Verify that the `ingress-nginx-controller` service manifest has either of the following annotations:

`service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"`
OR
`service.beta.kubernetes.io/aws-load-balancer-type: nlb`


### Provider-specific configuration

>**NOTE**    
  The instructions are valid for `k8s.io/ingress-nginx`, the community version of NGINX.

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



## Traefik ingress configuration
For detailed configuration information, see [Traefik ingress controller documentation](https://doc.traefik.io/traefik/providers/kubernetes-ingress){:target="\_blank}.

The table below lists the specific configuration requirements for Codefresh.

{: .table .table-bordered .table-hover}

| What to configure    |   When to configure |
| --------------       | --------------  |
|Valid external IP address | _Before_ installing Hybrid GitOps Runtime  |
|Valid SSL certificate | |
|TCP support |  |
|Enable report status to cluster|  |




### Valid external IP address
Run `kubectl get svc -A` to get a list of services and verify that the `EXTERNAL-IP` column for your ingress controller shows a valid hostname.



### Valid TLS certificate
For secure runtime installation, the ingress controller must have a valid TLS certificate.

{{site.data.callout.callout_tip}}
**TIP**    
  Use the FQDN (Fully Qualified Domain Name) of the ingress controller for the TLS certificate.
{{site.data.callout.end}}



### TCP support
Configure the ingress controller to handle TCP requests.



### Enable report status to cluster
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

## Related articles
[System requirements & prerequisites]({{site.baseurl}}/docs/gitops-runtime/runtime-system-requirements/)  
[Install GitOps Runtime]({{site.baseurl}}/docs/gitops-runtime/hybrid-gitops-helm-installation/)  
[Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/gitops-runtime/argo-with-gitops-side-by-side/)   