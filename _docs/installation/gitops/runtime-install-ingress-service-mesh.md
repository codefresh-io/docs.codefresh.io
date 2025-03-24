---
title: "GitOps Runtimes with ingress controllers/service meshes"
description: "Requirements for installing GitOps Runtimes with ingress/service-mesh access modes"
toc: true
---

## Installation with ingress controllers/service meshes
When installing the GitOps Runtime to ingress controllers or service meshes, you need to configure these before installation. These configurations affect how the runtime communicates within the cluster and with external services.

In addition to the tunnel-based access mode which is is the default, the GitOps Runtime also supports ingress-based and service-mesh based access modes.
* **Ingress-based access mode**  
  The ingress controller configured on the same Kubernetes cluster as the GitOps Runtime, implements the ingress traffic rules for the GitOps Runtime. 
* **Service-mesh based access mode**   
  The runtime integrates with a service mesh for communication.
For details, see [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).

##### Pre-installation configuration  
Configure ingress controllers and service meshes before installing the GitOps Runtime.

##### Installation command flags
The Runtime Install command requires additional flags to specify ingress or service-mesh compatibility. 

##### Post-installation configuration
After installing the GitOps Runtime, specific ingress controllers and service meshes need additional configuration.


## Pre-installation: Configure ingress controllers/service meshes
For GitOps Runtimes using ingress-based and service-mesh based access modes, verify they are configured correctly before installation.

* [Ambassador ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#ambassador-ingress-configuration)
* [AWS ALB ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#aws-alb-ingress-configuration)
* [Istio ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#istio-ingress-configuration)
* [NGINX Enterprise ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-enterprise-ingress-configuration)
* [NGINX Community ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#nginx-community-version-ingress-configuration)
* [Traefik ingress configuration]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#traefik-ingress-configuration)


## Installation: Install Runtime command for ingress-based/service-mesh based access modes
When installing the GitOps Runtime using either ingress-based or service-mesh based access modes, the Install Runtime Command requires additional flags.

### Ingress-based install command
Following are the additional flags you need to add to the install command for ingress-based access modes.

{% highlight yaml %}
  --set global.runtime.ingress.enabled=true \
  --set "global.runtime.ingress.hosts[0]"=<ingress-host> \
  --set global.runtime.ingress.className=<ingress-class> \
{% endhighlight %}

where:
* `global.runtime.ingress.enabled=true`is mandatory for ingress-based Runtimes. Indicates the runtime is ingress-based. 
* `<ingress-host>` is the IP address or hostname of the ingress controller. Mandatory for ingress-based Runtimes.
* `<ingress-class>` is the ingress class of the ingress controller (e.g., `nginx` for the NGINX ingress controller). Mandatory for ingress-based Runtimes. 

### Service-mesh-based install command (without ingress and tunnel)
Following are the additional flags you need to add to the install command for service-mesh based access modes.

{% highlight yaml %}
  --set global.runtime.ingressUrl=<ingress-url> \
  --set global.runtime.ingress.enabled=false \
  --set tunnel-client.enabled=false \
{% endhighlight %}

where:
* `global.runtime.ingressUrl=<ingress-url>` is the ingress URL that serves as the entry point to the cluster. 
* `global.runtime.ingress.enabled=false` explicitly disables ingress-based access mode. |
* `tunnel-client.enabled=false` explicitly disables tunnel-based access mode. |

## Post-installation: Configure ingress controllers/service meshes
Required only for ALB AWS and NGINX Enterprise ingress-controllers, and Istio service meshes.<br>

* Complete configuring these ingress controllers _after installing the GitOps Runtime_:
  * [ALB AWS: Alias DNS record in route53 to load balancer]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#create-an-alias-to-load-balancer-in-route53)
  * [Istio: Configure cluster routing service]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#cluster-routing-service)
  * [NGINX Enterprise ingress controller: Patch certificate secret]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/#patch-certificate-secret)


## Related articles
[GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/)  
[Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)  
[Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)
