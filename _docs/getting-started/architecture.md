---
title: "Architecture"
description: ""
group: getting-started
toc: true
---

Codefresh GitOps is built around an enterprise version of the Argo Ecosystem, fully compliant with the GitOps paradigm, with industry-standard security.
To cater to differing requirements and degrees of enterprise security, Codefresh supports hosted and hybrid installation environments for Codefresh runtimes. 

The sections that follow illustrate the architecture of the different installation environments, starting with a high-level overview of the Codefresh Platform.

### Codefresh architecture

The diagram shows a high-level view of the Codefresh Platform and its core components, the Codefresh Control Plane, the Codefresh Runtime, and the Codefresh Clients. 

{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-codefresh-simple.png"
 url="/images/getting-started/architecture/arch-codefresh-simple.png"
  alt="Codefresh Platform architecture"
  caption="Codefresh Platform architecture"
  max-width="100%"
%}

{::nomarkdown}
<br>
{:/}

#### Codefresh Control Plane
The Codefresh Control Plane is the SaaS component in the platform. External to the enterprise firewall, it does not have direct communication with the Codefresh Runtime, Codefresh Clients, or the customer's organizational systems. The Codefresh Runtime and the Codefresh Clients communicate with the Codefresh Control Plane to retrieve the required information.  


{::nomarkdown}
<br>
{:/}

#### Codefresh Runtime
The Codefresh Runtime is installed on a Kubernetes cluster, and houses the enterprise distribution of the Codefresh Application Proxy and the Argo Project.  
Depending on the type of installation environment, the Codefresh Runtime is installed either in the Codefresh platform (hosted), or in the customer environment (hybrid). Read more in [Codefresh runtime architecture](#codefresh-runtime-architecture).


{::nomarkdown}
<br>
{:/}

#### Codefresh Clients

Codefresh Clients include the Codefresh UI and the Codefresh CLI.   
The Codefresh UI provides a unified, enterprise-wide view of deployments (runtimes and clusters), and CI/CD operations (Delivery Pipelines, workflows, and deployments) in the same location.  
The Codefresh CLI includes commands to install hybrid runtimes, add external clusters, and manage runtimes and clusters.

### Codefresh runtime architecture
The sections that follow show detailed views of runtime architecture in the different installation environments, and descriptions of the Codefresh Runtime components.

* [Hosted GitOps runtime architecture](#hosted-gitops-runtime-architecture)
  In this installation environment, the Codefresh Runtime is installed on a _Codefresh-managed cluster_ in the Codefresh platform.  
* Hybrid runtime architecture:
  In this installation environment, the Codefresh Runtime is installed on a _customer-managed cluster_ in the customer environment. The Codefresh Runtime with or without ingress controllers:  
  * [Ingress controller](#ingress-controller-hybrid-runtime-architecture)  
  * [Ingress-less](#ingress-less-hybrid-runtime-architecture)  
* Runtime components
  * [Codefresh Application Proxy](#codefresh-application-proxy)
  * [Argo Project](#argo-project)
  * [Request Routing Service](#request-routing-service)
  * [Tunnel Server](#codefresh-tunnel-server)
  * [Tunnel Client](#codefresh-tunnel-client)


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

#### Ingress controller hybrid runtime architecture
Runtimes with ingress use an ingress controller to control communication between the Codefresh Runtime in the customer cluster and the Codefresh Platform. Ingress controllers are optimal when the cluster with the Codefresh Runtime is exposed to the internet.  



{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-hybrid-ingress.png"
 url="/images/getting-started/architecture/arch-hybrid-ingress.png"
  alt="Ingress-based hybrid runtime architecture"
  caption="Ingress-based hybrid runtime architecture"
  max-width="100%"
%}

#### Ingress-less hybrid runtime architecture
Ingress-less runtimes uses tunneling to control communication between the Codefresh Runtime in the customer cluster and the Codefresh Platform. Ingress-less runtimes are optimal when the cluster with the Codefresh Runtime is not exposed to the internet. 

{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-hybrid-ingressless.png"
 url="/images/getting-started/architecture/arch-hybrid-ingressless.png"
  alt="Ingress-less hybrid runtime architecture"
  caption="Ingress-less hybrid runtime architecture"
  max-width="100%"
%}



#### Codefresh Application Proxy
The Codefresh Application Proxy (App-Proxy) functions as the Codefresh agent, and is deployed as a service in the Codefresh Runtime.   
For hybrid runtimes with ingress, the App-Proxy is the single point-of-contact between the Codefresh Runtime, and the Codefresh Clients, the Codefresh Platform, and any organizational systems in the customer environment.  
For ingress-less hybrid runtimes, the Tunnel Client forwards the incoming traffic from the Tunnel Server using internal reverse proxy to the App-Proxy. 
 
The App-Proxy:  
* Accepts and serves requests from Codefresh Clients either via the Codefresh UI or CLI 
* Retrieves a list of Git repositories for visualization in Codefresh Clients  
* Retrieves permissions from the Codefresh Control Plane to authenticate and authorize users for the required operations.    
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
The Request Routing Service is installed on the same cluster as the Codefresh Runtime in the customer environment.  
It receives requests from the ingress controller (ingress) or the Tunnel Client (ingress-less), and forwards the request URLs to the Application Proxy, and webhooks directly to the Event Sources.  

>Important:  
  The Request Routing Service is available from runtime version 0.0.543 and higher.   
  Older runtime versions are not affected as there is complete backward compatibility, and the ingress controller continues to route incoming requests.

#### Tunnel Server
Applies only to _ingress-less_ runtimes in hybrid installation environments.  
The Codefresh Tunnel Server is installed in the Codefresh platform. It communicates with the enterprise cluster located behind a NAT or firewall.  

The Tunnel Server:  
* Forwards traffic from Codefresh Clients to the client (customer) cluster.
* Manages the lifecycle of the Codefresh Tunnel Client.
* Authenticates requests from the Codefresh Tunnel Client to open tunneling connections.

{::nomarkdown}
<br>
{:/}

#### Tunnel Client
Applies only to _ingress-less_ runtimes in hybrid installation environments.  

Installed on the same cluster as the Codefresh Runtime, the Codefresh Tunnel Client establishes the tunneling connection to the Codefresh Tunnel Server via the WebSocket Secure (WSS) protocol.   
A single Codefresh Runtime can have a single Tunnel Client.  

The Codefresh Tunnel Client: 
* Initiates the connection with the Codefresh Tunnel Server.
* Forwards the incoming traffic from the Tunnel Server through the Request Routing Service to App-Proxy, and other services.  

{::nomarkdown}
<br>
{:/}


### Customer environment
The customer environment that communicates with the Codefresh Runtime and the Codefresh Platform, generally includes:
* Ingress controller for ingress hybrid runtimes  
  The ingress controller is configured on the same Kubernetes cluster as the Codefresh Runtime, and implements the ingress traffic rules for the Codefresh Runtime. 
  See [Ingress controller requirements]({{site.baseurl}}/docs/runtime/requirements/#ingress-controller).
* Managed clusters  
  Managed clusters are external clusters registered to provisioned hosted or hybrid runtimes for application deployment.  
  Hosted runtimes requires you to connect at least one external K8s cluster as part of setting up the Hosted GitOps environment.  
  Hybrid runtimes allow you to add external clusters after provisioning the runtimes.  
  See [Add external clusters to runtimes]({{site.baseurl}}/docs/runtime/managed-cluster/).
* Organizational systems  
  Organizational Systems include the customer's tracking, monitoring, notification, container registries, Git providers, and other systems. They can be entirely on-premises or in the public cloud.   
  Either the ingress controller (ingress hybrid environments), or the Tunnel Client (ingress-less hybrid environments), forwards incoming events to the Codefresh Application Proxy. 

### Related articles
[Set up a hosted runtime environment]({{site.baseurl}}/docs/runtime/hosted-runtime/)  
[Install a hybrid runtime]({{site.baseurl}}/docs/runtime/installation/)




