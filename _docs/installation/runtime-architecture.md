---
title: "Runtime architectures"
description: ""
group: installation
toc: true
---

Overview TBD

## Codefresh CI/CD architecture

The most important components are the following:

**Codefresh VPC:** All internal Codefresh services run in the VPC (analyzed in the next section). Codefresh uses Mongo and PostgreSQL to store user and authentication information.

**Pipeline execution environment**:  The Codefresh engine component is responsible for taking pipeline definitions and running them in managed Kubernetes clusters by automatically launching the Docker containers that each pipeline needs for its steps.

**External actors**. Codefresh offers a [public API]({{site.baseurl}}/docs/integrations/ci-integrations/codefresh-api/) that is consumed both by the Web user interface and the <!--should i differentiate between the CI Cli and GitOps CLI -->[Codefresh CLI](https://codefresh-io.github.io/cli/){:target="\_blank"}. The API is also available for any custom integration with external tools or services.

### CI/CD topology

If we zoom into Codefresh Services for CI/CD, we will see the following:

{% include image.html
  lightbox="true"
  file="/images/administration/installation/topology-new.png"
  url="/images/administration/installation/topology-new.png"
  alt="Topology diagram"
  caption="Topology diagram (click to enlarge)"
  max-width="100%"
    %}  

### CI/CD core components

{: .table .table-bordered .table-hover}
|Category | Component | Function      | 
| -------------- | ----------| ----------|  
| Core  | **pipeline-manager**| Manages all CRUD operations for CI pipelines.| 
|  | **cfsign**  | Signs server TLS certificates for docker daemons, and generates client TLS certificates for hybrid pipelines. | 
|  | **cf-api** | Central back-end component that functions as an API gateway for other services, and handles authentication/authorization. | 
|  | **context-manager**| Manages the authentications/configurations used by Codefresh CI/CD and by the Codefresh engine. |  
|  | **runtime-environment-manager**| Manages the different runtime environments for CI pipelines. The runtime environment for CI/CD SaaS is fully managed by Codefresh. For CI/CD Hybrid, customers can add their own runtime environments using private Kubernetes clusters. | 
| Trigger  | **hermes**| Controls CI pipeline trigger management. See [triggers]({{site.baseurl}}/docs/pipelines/triggers/). |  
|   | **nomios**| Enables triggers from Docker Hub when a new image/tag is pushed.See [Triggers from Docker Hub]({{site.baseurl}}/docs/pipelines/triggers/dockerhub-triggers/). |  
|   | **cronus**| Enables defining Cron triggers for CI pipelines. See [Cron triggers]({{site.baseurl}}/docs/pipelines/triggers/cron-triggers/).|   
| Log  | **cf-broadcaster**| Stores build logs from CI pipelines.  The UI and CLI stream logs by accessing the **cf-broadcaster** through a web socket. | 
| Kubernetes  | **cluster-providers** | Provides an interface to define cluster contexts to connect Kubernetes clusters in CI/CD installation environments. |  
|   | **helm-repo-manager** | Manages the Helm charts for CI/CD installation environments through the Helm repository admin API and ChartMuseum proxy. See [Helm charts in Codefresh]({{site.baseurl}}/docs/deployments/helm/managed-helm-repository/). | 
|   | **k8s-monitor** | The agent installed on every Kubernetes cluster, providing information for the Kubernetes dashboards.  See [Kubernetes dashboards]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/). |     
|   |**charts-manager** | Models the Helm chart view in Codefresh.  See [Helm chart view]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/). |   
|   | **kube-integration** | Provides an interface to retrieve required information from a Kubernetes cluster, can be run either as an http server or an NPM module. |   
|   | **tasker-kubernetes** | Provides cache storage for Kubernetes dashboards.  See [Kubernetes dashboards]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/). |   


## Codefresh GitOps Platform architecture

The diagram shows a high-level view of the Codefresh GitOps installation environment, and its core components, the Codefresh Control Plane, the Codefresh Runtime, and the Codefresh Clients. 

{% include
image.html
lightbox="true"
file="/images/getting-started/architecture/arch-codefresh-simple.png"
url="/images/getting-started/architecture/arch-codefresh-simple.png"
alt="Codefresh GitOps Platform architecture"
caption="Codefresh GitOps Platform architecture"
max-width="100%"
%}

{::nomarkdown}
<br>
{:/}

### Codefresh GitOps Control Plane
The Codefresh Control Plane is the SaaS component in the platform. External to the enterprise firewall, it does not have direct communication with the Codefresh Runtime, Codefresh Clients, or the customer's organizational systems. The Codefresh Runtime and the Codefresh Clients communicate with the Codefresh Control Plane to retrieve the required information.  


{::nomarkdown}
<br>
{:/}

### Codefresh GitOps Runtime
The Codefresh Runtime is installed on a Kubernetes cluster, and houses the enterprise distribution of the Codefresh Application Proxy and the Argo Project.  
Depending on the type of GitOps installation, the Codefresh Runtime is installed either in the Codefresh platform (Hosted GitOps), or in the customer environment (Hybrid GitOps). Read more in [Codefresh GitOps Runtime architecture](#codefresh-gitops-runtime-architecture).


{::nomarkdown}
<br>
{:/}

### Codefresh GitOps Clients

Codefresh Clients include the Codefresh UI and the Codefresh CLI.   
The Codefresh UI provides a unified, enterprise-wide view of deployments (runtimes and clusters), and CI/CD operations (Delivery Pipelines, workflows, and deployments) in the same location.  
The Codefresh CLI includes commands to install hybrid runtimes, add external clusters, and manage runtimes and clusters.

### Codefresh GitOps Runtime architecture
The sections that follow show detailed views of the GitOps Runtime architecture for the different installation options, and descriptions of the GitOps Runtime components.

* [Hosted GitOps runtime architecture](#hosted-gitops-runtime-architecture)
  For Hosted GitOps, the GitOps Runtime is installed on a _Codefresh-managed cluster_ in the Codefresh platform.  
* Hybrid GitOps runtime architecture:
  For Hybrid GitOps, the GitOps Runtime is installed on a _customer-managed cluster_ in the customer environment. The Hybrid GitOps Runtime can be tunnel- or ingress-based:  
  * [Tunnel-based](#tunnel-based-hybrid-gitops-runtime-architecture)  
  * [Ingress-based](#ingress-based-hybrid-gitops-runtime-architecture)  
* GitOps Runtime components
  * [Application Proxy](#application-proxy)
  * [Argo Project](#argo-project)
  * [Request Routing Service](#request-routing-service)
  * [Tunnel Server](#tunnel-server)
  * [Tunnel Client](#tunnel-client)


#### Hosted GitOps runtime architecture
In the hosted environment, the Codefresh Runtime is installed on a K8s cluster managed by Codefresh. 

{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-hosted.png"
 url="/images/getting-started/architecture/arch-hosted.png"
  alt="Hosted runtime architecture"
  caption="Hosted runtime architecture"
  max-width="100%"
%}

#### Tunnel-based Hybrid GitOps runtime architecture
Tunnel-based Hybrid GitOps runtimes use tunneling instead of ingress controllers to control communication between the GitOps Runtime in the customer cluster and the Codefresh GitOps Platform. Tunnel-based runtimes are optimal when the cluster with the GitOps Runtime is not exposed to the internet. 

{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-hybrid-ingressless.png"
 url="/images/getting-started/architecture/arch-hybrid-ingressless.png"
  alt="Tunnel-based hybrid runtime architecture"
  caption="Tunnel-based hybrid runtime architecture"
  max-width="100%"
%}


#### Ingress-based Hybrid GitOps runtime architecture
Ingress-based runtimes use ingress controllers to control communication between the GitOps Runtime in the customer cluster and the Codefresh GitOps Platform. Ingress-based runtimes are optimal when the cluster with the GitOps Runtime is exposed to the internet.  



{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-hybrid-ingress.png"
 url="/images/getting-started/architecture/arch-hybrid-ingress.png"
  alt="Ingress-based hybrid runtime architecture"
  caption="Ingress-based hybrid runtime architecture"
  max-width="100%"
%}


#### Application Proxy
The GitOps Application Proxy (App-Proxy) functions as the Codefresh agent, and is deployed as a service in the GitOps Runtime.  

For tunnel-based Hybrid GitOps Runtimes, the Tunnel Client forwards the incoming traffic from the Tunnel Server using the Request Routing Service to the GitOps App-Proxy. 
For Hybrid GitOps Runtimes with ingress, the App-Proxy is the single point-of-contact between the GitOps Runtime, and the GitOps Clients, the GitOps Platform, and any organizational systems in the customer environment.  

 
The GitOps App-Proxy:  
* Accepts and serves requests from GitOps Clients either via the UI or CLI 
* Retrieves a list of Git repositories for visualization in the Client interfaces  
* Retrieves permissions from the GitOps Control Plane to authenticate and authorize users for the required operations.    
* Implements commits for GitOps-controlled entities, such as Delivery Pipelines and other CI resources
* Implements state-change operations for non-GitOps controlled entities, such as terminating Argo Workflows

{::nomarkdown}
<br>
{:/}

#### Argo Project 

The Argo Project includes:
* Argo CD for declarative continuous deployment 
* Argo Rollouts for progressive delivery 
* Argo Workflows as the workflow engine 
* Argo Events for event-driven workflow automation framework


{::nomarkdown}
<br><br>
{:/}

#### Request Routing Service
The Request Routing Service is installed on the same cluster as the GitOps Runtime in the customer environment.  
It receives requests from the the Tunnel Client (tunnel-based) or the ingress controller (ingress-based), and forwards the request URLs to the Application Proxy, and webhooks directly to the Event Sources.  

>Important:  
  The Request Routing Service is available from runtime version 0.0.543 and higher.   
  Older runtime versions are not affected as there is complete backward compatibility, and the ingress controller continues to route incoming requests.

#### Tunnel Server
Applies only to _tunnel-based_ Hybrid GitOps Runtimes.  
The Codefresh Tunnel Server is installed in the Codefresh platform. It communicates with the enterprise cluster located behind a NAT or firewall.  

The Tunnel Server:  
* Forwards traffic from Codefresh Clients to the client (customer) cluster.
* Manages the lifecycle of the Tunnel Client.
* Authenticates requests from the Tunnel Client to open tunneling connections.

{::nomarkdown}
<br>
{:/}

#### Tunnel Client
Applies only to _tunnel-based_ Hybrid GitOps Runtimes.  

Installed on the same cluster as the Hybrid GitOps Runtime, the Tunnel Client establishes the tunneling connection to the Tunnel Server via the WebSocket Secure (WSS) protocol.   
A single Hybrid GitOps Runtime can have a single Tunnel Client.  

The Tunnel Client: 
* Initiates the connection with the Tunnel Server.
* Forwards the incoming traffic from the Tunnel Server through the Request Routing Service to App-Proxy, and other services.  

{::nomarkdown}
<br>
{:/}


#### Customer environment
The customer environment that communicates with the GitOps Runtime and the GitOps Platform, generally includes:
* Ingress controller for ingress hybrid runtimes  
  The ingress controller is configured on the same Kubernetes cluster as the GitOps Runtime, and implements the ingress traffic rules for the GitOps Runtime. 
  See [Ingress controller requirements]({{site.baseurl}}/docs/installation/requirements/#ingress-controller).
* Managed clusters  
  Managed clusters are external clusters registered to provisioned Hosted or Hybrid GitOps runtimes for application deployment.  
  Hosted GitOps requires you to connect at least one external K8s cluster as part of setting up the Hosted GitOps environment.  
  Hybrid GitOps allow you to add external clusters after provisioning the runtimes.  
  See [Add external clusters to runtimes]({{site.baseurl}}/docs/installation/managed-cluster/).
* Organizational systems  
  Organizational Systems include the customer's tracking, monitoring, notification, container registries, Git providers, and other systems. They can be entirely on-premises or in the public cloud.   
  Either the ingress controller (ingress hybrid environments), or the Tunnel Client (tunnel-based hybrid environments), forwards incoming events to the Codefresh Application Proxy. 

 ## Related articles
[Codefresh pricing](https://codefresh.io/pricing/)  
[Codefresh features](https://codefresh.io/features/)  
 