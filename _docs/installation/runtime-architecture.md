---
title: "Architecture"
description: "Codefresh platform and Runtime architecture"
group: installation
toc: true
---

If you have familiarized yourself with the different installation options, here's a deep dive into the architecture and components of the different options.



## Codefresh SaaS platform architecture

The diagram shows a high-level view of the SaaS version of the Codefresh platform and its core components. 


{% include
image.html
lightbox="true"
file="/images/runtime/architecture/arch-saas.png"
url="/images/runtime/architecture/arch-saas.png"
alt="Codefresh SaaS platform architecture"
caption="Codefresh SaaS platform architecture"
max-width="100%"
%}

### GitOps Control Plane
The Codefresh Control Plane is the SaaS component in the platform. External to the enterprise firewall, it does not have direct communication with the Codefresh Runtime, Codefresh Clients, or the customer's organizational systems. The Codefresh Runtime and the Codefresh Clients communicate with the Codefresh Control Plane to retrieve the required information.  



### GitOps Runtime
The GitOps Runtime is installed on a Kubernetes cluster, and houses the enterprise distribution of the Codefresh Application Proxy and the Argo Project.  
Depending on the type of GitOps installation, the GitOps Runtime is installed either in the Codefresh platform (Hosted GitOps), or in the customer environment (Hybrid GitOps). Read more about it in [GitOps Runtime architecture](#gitops-runtime-architecture).

### Codefresh Runner
The Codefresh Runner, also known as the Agent, enables running Codefresh pipeline builds in the customer's environment.  It provides a way to run pipeline builds, tests, and deployments within your private network or on-premises environment by making API calls to the Codefresh platform.

### GitOps Clients

GitOps Clients include the  UI and the GitOps CLI.   
The UI provides a unified, enterprise-wide view of deployments (Runtimes, clusters, and applications), and CI/CD operations (Delivery Pipelines, workflows, and deployments) in the same location.  
The Codefresh CLI includes commands to install Hybrid GitOps Runtimes, add external clusters, and manage Runtimes and clusters.

## Codefresh on-premises platform architecture

The diagram shows a high-level view of the on-premises version of the Codefresh platform, and its core components. 

{% include
image.html
lightbox="true"
file="/images/runtime/architecture/arch-on-premises.png"
url="/images/runtime/architecture/arch-on-premises.png"
alt="Codefresh On-Premises platform architecture"
caption="Codefresh On-Premises platform architecture"
max-width="100%"
%}



### External Components


<br>

#### Codefresh Runner
The Codefresh Runner can be installed on the same cluster as the On-Premises platform or on a remote cluster.  It provides a way to run pipeline builds, tests, and deployments within your private network or on-premises environment by making API calls to the Codefresh platform.

Read more about how it works in [Runner behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall/).

<br>

#### GitOps Runtime
The GitOps Runtime, similar to the Codefresh Runner can be installed on the same cluster as the On-Premises platform on a remote cluster. It includes Codefresh-signed versions of the Argo Project components, Argo CD, Argo Workflows, Argo Rollouts, and Argo Events.
The GitOps Runtime reports events in clusters and GitOps repositories through API calls to the Codefresh platform. 

Read more in [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

<br>

#### Codefresh UI & CLI
Codefresh provides a web-based UI and CLI to work with the Codefresh On-Premises platform through API calls. 

The UI allows users to visually manage and control CI/CD pipelines, GitOps applications and deployments, and more.
The CLI provides a flexible option for developers to interact with the On-Premises platform.


### On-Premises Platform Components

<br>

#### Ingress Controller

The Codefresh On-Premises platform uses an ingress controller to handle incoming traffic. The NGINX Ingress Controller is deployed within the cluster hosting the Codefresh platform. The ingress controller serves as the entry point for requests originating from Codefresh Runners, GitOps Runtimes, and Clients, and routes them to the appropriate destinations, namely the Pipelines API/UI and the GitOps API/UI.

<br>

#### Pipelines API

The Pipelines API serves as the primary gateway for the Codefresh Pipelines module in the On-Premises platform. It handles a wide range of system functionalities, including authentication, authorization, audit logging, user management, and pipeline builds, among others. The Pipelines API utilizes a REST API interface with OpenAPI (Swagger v3) specifications.  

<br>

#### Pipelines UI
The Pipelines UI acts as a static file server that hosts and delivers all the user interface pages for Codefresh Pipelines. It provides visualization of pipelines, builds, third-party integrations and more.

<br>

#### GitOps API
The GitOps API serves as the primary gateway for the Codefresh GitOps module in the On-Premises platform. It interfaces between Codefresh GitOps, Git, and Argo CD, to sync 
It utilizes a GraphQL interface to provide a user interface

<br>

#### GitOps UI
The GitOps UI provides a unified, enterprise-wide view of deployments, Runtimes, clusters, and applications in the same location.  

<br>

#### Pipelines

The Pipelines module comprises a set of microservices for managing Codefresh pipelines in the On-Premises platform.
The Codefresh Runner and clients (UI/CLI) forward incoming requests to the Pipelines API, which in turn forwards them to the different Pipeline microservices.


* Broadcaster
  Forwards requests from the Codefresh Runner and client to the Codefresh API when Firebase is not used.

* Runtime Manager 
  Manages the runtime environments for the Codefresh Runner in the Codefresh On-Premises platform.

* Context Manager 
  Stores information on Pipeline Integrations created in Codefresh.

* Pipeline Manager 
  Stores and manages projects and pipeline entities. 

* Helm Manager 
   Provides an interface for aggregated views of Helm integrations in Codefresh Pipelines. 

* GitOps Manager 
  Deprecated. Stored information for populating the GitOps Dashboard in Codefresh Pipelines. The dashboard is now populated by Codefresh GitOps. 

<br>

#### GitOps

The GitOps module comprises the microservices for Codefresh and Argo users to consume and share Argo Workflow templates.

* Cron executer
   The Cron Executor performs periodic internal tasks required for platform functionality.

* API Events
  Receives events from GitOps Runtimes and publishes them to the Event Bus.

* Event Handler
  The Event Handler subscribes to events originating from the API Events received via the Event Bus, processes, and updates them.

* Audit Manager
  The Audit Manager reports and stores audit logs of API calls to Codefresh GitOps.

* Analytics Reporter
  Reports analytics information to populate deployment, runtime, and cluster data for GitOps in the different dashboards and widgets.

* Argo Hub
  Interfaces with the Argo Hub platform for working with pre-built Argo Workflow templates. Visit ​​https://codefresh.io/argohub/ for more details.

<br>

#### Infrastructure
Codefresh stores entity, configuration, and integration data for Codefresh Pipelines and Codefresh GitOps in different databases.
Each microservice within the Codefresh Pipeline and GitOps modules has its own dedicated database, which is independent from the databases used by other microservices. Communication between each microservice and its respective database is exclusive.


* mongoDB
  The main database for entity storage for Pipeline and GitOps microservices. 

* Redis
    * Optimizes caching for faster response times to requests and reduce load on the database
    * When Firebase is not used, interacts with the Broadcaster microservice to serve pipeline build logs to the client

* RabbitMQ
  RabbitMQ serves as a message bus to move tasks and information between microservices in the Pipeline and GitOps modules.

* PostgreSQL
  The PostgreSQL database stores:
    * Audit logs of API calls from the Codefresh and GitOps APIs
    * Analytics information (OF WHAT WOULD BE HELPFUL)


* NATS
  Legacy message bus.

* Consul
  Stores data for legacy builder and windows nodes.


## Codefresh Runner architecture
This section shows a detailed view of the Codefresh Runner architecture, and a description of the components. See [Runner installation behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall/).

???


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

<br>

**Volume Cleaners**  
The Volume Cleaners are responsible for PV management based on the environment setup:
* LV-Monitor: Installed when local volumes are used to allocate disk space for PVs on the cluster nodes.
* Dind Volume Cleanup: Installed instead of the LV Monitor when local volumes are not used, to delete PVs according to retention policies. 

<br>

**Cluster Monitor**
Optional. When installed, provides visibility on cluster resources in Codefresh, through the Kubernetes Services dashboard.

<br>

**App-Proxy**  
Another optional component, the App-Proxy serves as an extension to the Codefresh platform. Its purpose is to enable remote operations, such as displaying Git repositories for Git providers behind firewalls and creating webhooks, while maintaining security.


### Clients
* API
Codefresh offers a [public API]({{site.baseurl}}/docs/integrations/codefresh-api/) that is consumed both by the Web user interface and the [Codefresh CLI](https://codefresh-io.github.io/cli/){:target="\_blank"}. The API is also available for any custom integration with external tools or services.




 

## GitOps Runtime architecture
The sections that follow show detailed views of the GitOps Runtime architecture for the different installation options, and descriptions of the GitOps Runtime components.

* [Hosted GitOps Runtime architecture](#hosted-gitops-runtime-architecture)
  For Hosted GitOps, the GitOps Runtime is installed on a _Codefresh-managed cluster_ in the Codefresh platform.  
* Hybrid GitOps Runtime architecture:
  For Hybrid GitOps, the GitOps Runtime is installed on a _customer-managed cluster_ in the customer environment. The Hybrid GitOps Runtime can be tunnel- or ingress-based:  
  * [Tunnel-based](#tunnel-based-hybrid-gitops-runtime-architecture)  
  * [Ingress-based](#ingress-based-hybrid-gitops-runtime-architecture)  
* GitOps Runtime components
  * [Application Proxy](#application-proxy)
  * [Argo Project](#argo-project)
  * [Request Routing Service](#request-routing-service)
  * [Tunnel Server](#tunnel-server)
  * [Tunnel Client](#tunnel-client)

<br>

### Hosted GitOps Runtime architecture
In the hosted environment, the Codefresh Runtime is installed on a K8s cluster managed by Codefresh. 

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

>**NOTE**:  
Tunnel-based access mode is not supported for GitOps on-premises installations.

Note: Tunnel-based architecture is not supported for on-prem instances.

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
Ingress-based Runtimes use ingress controllers to control communication between the GitOps Runtime in the customer cluster and the Codefresh GitOps Platform. Ingress-based Runtimes are optimal when the cluster with the GitOps Runtime is exposed to the internet.  



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
The GitOps Application Proxy (App-Proxy) functions as the Codefresh agent, and is deployed as a service in the GitOps Runtime.  

For tunnel-based Hybrid GitOps Runtimes, the Tunnel Client forwards the incoming traffic from the Tunnel Server using the Request Routing Service to the GitOps App-Proxy. 
For Hybrid GitOps Runtimes with ingress, the App-Proxy is the single point-of-contact between the GitOps Runtime, and the GitOps Clients, the GitOps Platform, and any organizational systems in the customer environment.  

 
The GitOps App-Proxy:  
* Accepts and serves requests from GitOps Clients either via the UI or CLI 
* Retrieves a list of Git repositories for visualization in the Client interfaces  
* Retrieves permissions from the GitOps Control Plane to authenticate and authorize users for the required operations.    
* Implements commits for GitOps-controlled entities, such as Delivery Pipelines and other CI resources
* Implements state-change operations for non-GitOps controlled entities, such as terminating Argo Workflows



### Argo Project 

The Argo Project includes:
* Argo CD for declarative continuous deployment 
* Argo Rollouts for progressive delivery 
* Argo Workflows as the workflow engine 
* Argo Events for event-driven workflow automation framework

>**NOTE**:  
Codefresh users rely on our platform to deliver software reliably, and predictably without interruption.  
To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh.  
Typically, new versions of Argo are available within 30 days of release in Argo.



### Request Routing Service
The Request Routing Service is installed on the same cluster as the GitOps Runtime in the customer environment.  
It receives requests from the the Tunnel Client (tunnel-based) or the ingress controller (ingress-based), and forwards the request URLs to the Application Proxy, and webhooks directly to the Event Sources.  

>**IMPORTANT**:  
  The Request Routing Service is available from Runtime version 0.0.543 and higher.   
  Older Runtime versions are not affected as there is complete backward compatibility, and the ingress controller continues to route incoming requests.

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
The customer environment that communicates with the GitOps Runtime and Codefresh, generally includes:
* Ingress controller for ingress-based Hybrid GitOps Runtimes  
  The ingress controller is configured on the same Kubernetes cluster as the GitOps Runtime, and implements the ingress traffic rules for the GitOps Runtime. 
  See [Ingress controller requirements]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#ingress-controller).
* Managed clusters  
  Managed clusters are external clusters registered to provisioned Hosted or Hybrid GitOps Runtimes for application deployment.  
  Hosted GitOps requires you to connect at least one external K8s cluster as part of setting up the Hosted GitOps environment.  
  Hybrid GitOps allow you to add external clusters after provisioning the Runtimes.  
  See [Add external clusters to Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).
* Organizational systems  
  Organizational Systems include the customer's tracking, monitoring, notification, container registries, Git providers, and other systems. They can be entirely on-premises or in the public cloud.   
  Either the ingress controller (ingress hybrid environments), or the Tunnel Client (tunnel-based hybrid environments), forwards incoming events to the GitOps Application Proxy. 


## Related articles
[Codefresh pricing](https://codefresh.io/pricing/){:target="\_blank"}  
[Codefresh features](https://codefresh.io/features/){:target="\_blank"}  

 
