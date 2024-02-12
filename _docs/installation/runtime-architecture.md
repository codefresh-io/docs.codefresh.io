---
title: "Codefresh Runtimes"
description: "Runner and GitOps Runtimes architecture"
group: installation
toc: true
---

Whether you opt for our [SaaS or on-premises deployment]({{site.baseurl}}/docs/installation/installation-options/), both deployment options include Codefresh Runtimes as integral components.  
The Runtimes play a critical role in managing and facilitating smooth execution of Codefresh pipelines and Argo CD applications. 

This article provides a deep dive into the architecture of the [Codefresh Runner](#codefresh-runner-architecture) for CI pipelines, and [GitOps Runtimes](#gitops-runtime-architecture) for Argo CD applications. 

Both types of Runtimes can coexist. To understand their distinctions, review [Runtimes comparison](#runtimes-comparison). 



## Codefresh Runner architecture
The diagram shows a high-level view of the Codefresh Runner and its components. 

The Runner installation is the hybrid installation mode for Codefresh pipelines. The Codefresh UI runs in the Codefresh cloud, and the builds run on customer premises. The Runner combines flexibility with security, and is optimal for Enterprise customers looking for a "behind-the-firewall" solution.  


{% include
image.html
lightbox="true"
file="/images/runtime/architecture/arch-runner.png"
url="/images/runtime/architecture/arch-runner.png"
alt="Codefresh Runner architecture"
caption="Codefresh Runner architecture"
max-width="80%"
%}


The Codefresh Runner includes two main components:

### Runner Agent
The Codefresh Runner, often referred to as the Agent, is responsible for executing and managing tasks within the Runtime Environment. 
Main functions include:

Executing and terminating pipeline builds.
Creating and deleting necessary resources, such as engine and DinD pods, as well as DinD PVCs.

### Runtime Environment

The Runtime Environment is attached to the Codefresh Runner, and includes the following components:

**Volume Provisioner**  
The Volume Provisioner is the central component that controls all Codefresh services, and performs the following functions:
Acting as a Persistent Volume (PV) Kubernetes controller 
Managing DinD Persistent Volume Claim s(PVCs)
Optimizing Docker caching volumes to enhance cache utilization for Codefresh builds


**Volume Cleaners**  
The Volume Cleaners are responsible for PV management based on the environment setup:
* LV-Monitor: Installed when local volumes are used to allocate disk space for PVs on the cluster nodes.
* Dind Volume Cleanup: Installed instead of the LV Monitor when local volumes are not used, to delete PVs according to retention policies. 


**Cluster Monitor**  
Optional. When installed, provides visibility on cluster resources in Codefresh, through the Kubernetes Services dashboard.


**App-Proxy**  
Another optional component, the App-Proxy serves as an extension to the Codefresh platform. Its purpose is to enable remote operations, such as displaying Git repositories for Git providers behind firewalls and creating webhooks, while maintaining security.


## GitOps Runtime architecture
The sections that follow show detailed views of the GitOps Runtime architecture for the different installation options, and descriptions of the GitOps Runtime components.

* [Hosted GitOps Runtime architecture](#hosted-gitops-runtime-architecture)  
  For Hosted GitOps, the GitOps Runtime is installed on a _Codefresh-managed cluster_ in the Codefresh platform.  
* Hybrid GitOps Runtime architecture:  
  For Hybrid GitOps, the GitOps Runtime is installed on a _customer-managed cluster_ in the customer environment.  
  The Hybrid GitOps Runtime can be tunnel- or ingress-based:  
  * [Tunnel-based](#tunnel-based-hybrid-gitops-runtime-architecture)  
  * [Ingress-based](#ingress-based-hybrid-gitops-runtime-architecture)  
* GitOps Runtime components
  * [Application Proxy](#application-proxy)
  * [Argo Project](#argo-project)
  * [Request Routing Service](#request-routing-service)
  * [Tunnel Server](#tunnel-server)
  * [Tunnel Client](#tunnel-client)



### Hosted GitOps Runtime architecture
In the hosted environment, the GitOps Runtime is installed on a K8s cluster managed by Codefresh. 

{% include
   image.html
   lightbox="true"
   file="/images/runtime/architecture/arch-hosted.png"
 url="/images/runtime/architecture/arch-hosted.png"
  alt="Hosted GitOps Runtime architecture"
  caption="Hosted GitOps Runtime architecture"
  max-width="100%"
%}

### Tunnel-based Hybrid GitOps Runtime architecture
Tunnel-based Hybrid GitOps Runtimes use tunneling instead of ingress controllers to control communication between the GitOps Runtime in the customer cluster and the Codefresh GitOps Platform. Tunnel-based runtimes are optimal when the cluster with the GitOps Runtime is not exposed to the internet. 

>**NOTE**  
Tunnel-based access mode is not supported for GitOps on-premises installations.


{% include
   image.html
   lightbox="true"
   file="/images/runtime/architecture/arch-hybrid-ingressless.png"
 url="/images/runtime/architecture/arch-hybrid-ingressless.png"
  alt="Tunnel-based Hybrid GitOps Runtime architecture"
  caption="Tunnel-based Hybrid GitOps Runtime architecture"
  max-width="100%"
%}


### Ingress-based Hybrid GitOps Runtime architecture
Ingress-based Hybrid GitOps Runtimes use ingress controllers to control communication between the GitOps Runtime in the customer cluster and the Codefresh platform. Ingress-based Runtimes are optimal when the cluster with the GitOps Runtime is exposed to the internet.  



{% include
   image.html
   lightbox="true"
   file="/images/runtime/architecture/arch-hybrid-ingress.png"
 url="/images/runtime/architecture/arch-hybrid-ingress.png"
  alt="Ingress-based Hybrid GitOps Runtime architecture"
  caption="Ingress-based Hybrid GitOps Runtime architecture"
  max-width="100%"
%}


### Application Proxy
The Application Proxy (App-Proxy) functions as the Codefresh agent, and is deployed as a service in the GitOps Runtime.  

For tunnel-based Hybrid GitOps Runtimes, the Tunnel Client forwards the incoming traffic from the Tunnel Server using the Request Routing Service to the GitOps App-Proxy.   
For Hybrid GitOps Runtimes with ingress, the App-Proxy is the single point-of-contact between the GitOps Runtime, and the GitOps Clients, the GitOps platform, and any organizational systems in the customer environment.  

 
The App-Proxy:  
* Accepts and serves requests from GitOps Clients either via the UI or CLI 
* Retrieves a list of Git repositories for visualization in the Client interfaces  
* Retrieves permissions from the Codefresh Control Plane to authenticate and authorize users for the required operations   
* Implements commits for GitOps-controlled entities, such as Delivery Pipelines and other CI resources
* Implements state-change operations for non-GitOps controlled entities, such as terminating Argo Workflows



### Argo Project 

The Argo Project includes:
* Argo CD for declarative continuous deployment 
* Argo Rollouts for progressive delivery 
* Argo Workflows as the workflow engine 
* Argo Events for event-driven workflow automation framework

>**NOTE**  
Codefresh users rely on our platform to deliver software reliably, and predictably without interruption.  
To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh.  
Typically, new versions of Argo CD are available in the GitOps Runtime within 30 days of their official release.




### Request Routing Service
The Request Routing Service is installed on the same cluster as the GitOps Runtime in the customer environment.  
It receives requests from the the Tunnel Client (tunnel-based) or the ingress controller (ingress-based), and forwards the request URLs to the Application Proxy, and webhooks directly to the Event Sources.  

{{site.data.callout.callout_warning}}
**IMPORTANT**  
  The Request Routing Service is available from Runtime version 0.0.543 and higher.   
  Older Runtime versions are not affected as there is complete backward compatibility, and the ingress controller continues to route incoming requests.
{{site.data.callout.end}}

### Tunnel Server
Applies only to _tunnel-based_ Hybrid GitOps Runtimes.  
The Codefresh Tunnel Server is installed in the Codefresh platform. It communicates with the enterprise cluster located behind a NAT or firewall.  

The Tunnel Server:  
* Forwards traffic from Codefresh Clients to the client (customer) cluster.
* Manages the lifecycle of the Tunnel Client.
* Authenticates requests from the Tunnel Client to open tunneling connections.



### Tunnel Client
Applies only to _tunnel-based_ Hybrid GitOps Runtimes.  

Installed on the same cluster as the Hybrid GitOps Runtime, the Tunnel Client establishes the tunneling connection to the Tunnel Server via the WebSocket Secure (WSS) protocol.   
A single Hybrid GitOps Runtime can have a single Tunnel Client.  

The Tunnel Client: 
* Initiates the connection with the Tunnel Server.
* Forwards the incoming traffic from the Tunnel Server through the Request Routing Service to App-Proxy, and other services.  



### Customer environment
The customer environment communicates with the GitOps Runtime and Codefresh, and generally includes:
* Ingress controller for ingress-based Hybrid GitOps Runtimes  
  The ingress controller is configured on the same Kubernetes cluster as the GitOps Runtime, and implements the ingress traffic rules for the GitOps Runtime. 
  See [Ingress controller requirements]({{site.baseurl}}/docs/installation/runtime-architecture/gitops/hybrid-gitops-helm-installation/#ingress-controller-configuration).
* Managed clusters  
  Managed clusters are external clusters registered to provisioned Hosted or Hybrid GitOps Runtimes for application deployment.  
  Hosted GitOps requires you to connect at least one external K8s cluster as part of setting up the Hosted GitOps environment.  
  Hybrid GitOps allow you to add external clusters after provisioning the Runtimes.  
  See [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/runtime-architecture/gitops/managed-cluster/).
* Organizational systems  
  Organizational Systems include the customer's tracking, monitoring, notification, container registries, Git providers, and other systems. They can be entirely on-premises or in the public cloud.   
  Either the ingress controller (ingress-based hybrid environments), or the Tunnel Client (tunnel-based hybrid environments), forwards incoming events to the Application Proxy. 

##  Runtimes comparison
Codefresh Runner for CI pipelines and GitOps Runtimes can coexist giving you the best of both worlds. 

{: .table .table-bordered .table-hover}
| Characteristic | Hybrid Runner                |  GitOps
| -------------- | ---------------------------- |-------------------------| ----------------|
| Managed by      | Codefresh and customer      | Codefresh and customer |
| UI runs on      | Public cloud                |  Public cloud|
| Builds run on   | Private cluster             |  Private cluster (Hybrid)/Codefresh cluster (Hosted)|
| Access to secure/private services | Yes       |  Yes |
| Maintenance effort | Partial by customer      | Partial by customer |
| Best for        | Companies with security constraints  | Companies with security constraints |
| Available to    |[Enterprise plans](https://codefresh.io/contact-us/){:target="\_blank"} |[Enterprise plans](https://codefresh.io/contact-us/) |


## Related articles
[Codefresh Runner installation]({{site.baseurl}}/docs/installation/install-codefresh-runner/)  
[Hosted GitOps Runtime installation]({{site.baseurl}}/docs/installation/runtime-architecture/gitops/hosted-runtime/)  
[Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)   


 
