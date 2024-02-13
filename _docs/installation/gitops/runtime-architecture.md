---
title: "GitOps Runtime architecture"
description: "View components of GitOps Runtimes"
group: installation
toc: true
---


The sections that follow show detailed views of the GitOps Runtime architecture for the different installation modes, and descriptions of the GitOps Runtime components.

* [Hosted GitOps Runtime architecture](#hosted-gitops-runtime-architecture)
* Hybrid GitOps Runtime architecture:
  The Hybrid GitOps Runtime can be tunnel- or ingress-based:  
  * [Tunnel-based](#tunnel-based-hybrid-gitops-runtime-architecture)  
  * [Ingress-based](#ingress-based-hybrid-gitops-runtime-architecture)  
* GitOps Runtime components
  * [Application Proxy](#application-proxy)
  * [Argo Project](#argo-project)
  * [Request Routing Service](#request-routing-service)
  * [Tunnel Server](#tunnel-server)
  * [Tunnel Client](#tunnel-client)



## Hosted GitOps Runtime architecture
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

## Tunnel-based Hybrid GitOps Runtime architecture
Tunnel-based Hybrid GitOps Runtimes use tunneling instead of ingress controllers to control communication between the GitOps Runtime in the customer cluster and the Codefresh GitOps Platform. Tunnel-based runtimes are optimal when the cluster with the GitOps Runtime is not exposed to the internet. 

>**NOTE**  
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


## Ingress-based Hybrid GitOps Runtime architecture
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


## Application Proxy
The GitOps Application Proxy (App-Proxy) functions as the Codefresh agent, and is deployed as a service in the GitOps Runtime.  

For tunnel-based Hybrid GitOps Runtimes, the Tunnel Client forwards the incoming traffic from the Tunnel Server using the Request Routing Service to the GitOps App-Proxy. 
For Hybrid GitOps Runtimes with ingress, the App-Proxy is the single point-of-contact between the GitOps Runtime, and the GitOps Clients, the GitOps Platform, and any organizational systems in the customer environment.  

 
The GitOps App-Proxy:  
* Accepts and serves requests from GitOps Clients either via the UI or CLI 
* Retrieves a list of Git repositories for visualization in the Client interfaces  
* Retrieves permissions from the GitOps Control Plane to authenticate and authorize users for the required operations.    
* Implements commits for GitOps-controlled entities, such as Delivery Pipelines and other CI resources
* Implements state-change operations for non-GitOps controlled entities, such as terminating Argo Workflows



## Argo Project 

The Argo Project includes:
* Argo CD for declarative continuous deployment 
* Argo Rollouts for progressive delivery 
* Argo Workflows as the workflow engine 
* Argo Events for event-driven workflow automation framework

>**NOTE**  
Codefresh users rely on our platform to deliver software reliably, and predictably without interruption.  
To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh.  
Typically, new versions of Argo CD are available in the Codefresh Runtime within 30 days of their official release.


## Reporters
Reporters monitor changes to resources deployed on the cluster and report these changes back to the Codefresh platform.

Codefresh has two types of reporters:
* Resource Reporter
* Application Reporter

### Resource Reporter
The Resource Reporter monitors specific types of resources on the cluster, tracking changes in their live-states. It sends the live-state manifests with the changes to Codefresh without preprocessing.  

The Resource Reporter monitors changes to these resource types:
* Rollouts (Argo Rollouts)
* ReplicaSets and Workflows (Argo Workflows)

Resource Reporters leverage Argo Event components such as Event Sources to monitor changes and Sensors to send the live-state manifests, to Codefresh. For setup information on these Argo Event components, see Argo CD's documentation on [Event Source](https://argoproj.github.io/argo-events/concepts/event_source/){:target="\_blank"} and [Sensor](https://argoproj.github.io/argo-events/concepts/sensor/){:target="\_blank"}.

### Application Reporter
The Application Reporter specializes in monitoring changes to Argo CD applications deployed on the cluster. 

In contrast to the Resource Reporter which utilizes Argo Events, the Application Reporter employs a proprietary implementation that includes an event queue to process application change-events and sharding for a robust and scalable setup. Another significant difference is that the Application Reporter retrieves both the live-state manifest of the application and the Git manifests for all the application's managed resources. 



The Application Reporter (identified on the cluster as **event-reporter**):

1. The user makes a change to the application manifest or to one of its managed resoruces, and commits the changes in the Git repo where it is housed.

2. The Argo CD Application Controller which monitors the Git repo for changes, syncs these changes to the cluster and forwards tje.

3. The Application Reporter subscribes to the Kubernetes API to receive application-change events. 
  If there are multiple instances of the Application Reporter, each instance subscribes to a set of specific applications, derived through a hash function on the application name.
  The number of Application Reporters are equal to to the number of replicas configured. By default, there are 5 replicas, but this number can be customized through the `argo-cd.eventReporter.replicas` parameter in your Helm values file. [add here link to values file] 

   The application-change event is added to the appro the Event Queues for processing based on the shard where .  
  Each instance of the Application Reporter can queue up to 1,000 events at a time.

4. The Application Reporter requests the Argo CD Server for both the application's live-state manifest and the Git manifests for all the application's managed resources. 
  The Argo CD server retrieves the Git manifests from the Argo CD repo-server for seamless integration and forwards them to the Application Reporter.

5. The Application Reporter reports the application-change events to the Codefresh platform.





* Monitors changes to Argo CD applications 
  The Application Reporter subscribes to the Kubernetes API to capture application-change events. It adds the captured application-change event to the Event Queue for processing.  
  Each instance of the Application Reporter can queue up to 1,000 events at a time.

* Retrieves live-state and Git manifests
  For each processed application-change event, the Application Reporter communicates with the Argo CD server to retrieve 

* Distributes application-change events for efficient load-sharing  
  To ensure scalability, optimal event handling, and resource utilization, the Application Reporter supports sharding. 
  
  Application-change events are distributed across the Application Reporter instances using a hash-function on the application name.  
  The distribution is limited to the number of replicas configured. By default, there are 5 replicas, but this number can be customized through the `argo-cd.eventReporter.replicas` parameter in your Helm values file. [add here link to values file] 
  
  For example, if the cluster has 100 apps and 5 replicas, each Reporter instance handles events from 20 apps. Codefresh recommends a default ratio of 25-30 apps per instance of the Application Reporter.


## Request Routing Service
The Request Routing Service is installed on the same cluster as the GitOps Runtime in the customer environment.  
It receives requests from the the Tunnel Client (tunnel-based) or the ingress controller (ingress-based), and forwards the request URLs to the Application Proxy, and webhooks directly to the Event Sources.  

{{site.data.callout.callout_warning}}
**IMPORTANT**  
  The Request Routing Service is available from Runtime version 0.0.543 and higher.   
  Older Runtime versions are not affected as there is complete backward compatibility, and the ingress controller continues to route incoming requests.
{{site.data.callout.end}}

## Tunnel Server
Applies only to _tunnel-based_ Hybrid GitOps Runtimes.  
The Codefresh Tunnel Server is installed in the Codefresh platform. It communicates with the enterprise cluster located behind a NAT or firewall.  

The Tunnel Server:  
* Forwards traffic from Codefresh Clients to the client (customer) cluster.
* Manages the lifecycle of the Tunnel Client.
* Authenticates requests from the Tunnel Client to open tunneling connections.



## Tunnel Client
Applies only to _tunnel-based_ Hybrid GitOps Runtimes.  

Installed on the same cluster as the Hybrid GitOps Runtime, the Tunnel Client establishes the tunneling connection to the Tunnel Server via the WebSocket Secure (WSS) protocol.   
A single Hybrid GitOps Runtime can have a single Tunnel Client.  

The Tunnel Client: 
* Initiates the connection with the Tunnel Server.
* Forwards the incoming traffic from the Tunnel Server through the Request Routing Service to App-Proxy, and other services.  



## Customer environment
The customer environment that communicates with the GitOps Runtime and Codefresh generally includes:
* Ingress controller for ingress-based Hybrid GitOps Runtimes  
  The ingress controller is configured on the same Kubernetes cluster as the GitOps Runtime, and implements the ingress traffic rules for the GitOps Runtime. 
  See [Ingress controller requirements]({{site.baseurl}}/docs/installation/gitops/monitor-manage-runtimes/#ingress-controller).
* Managed clusters  
  Managed clusters are external clusters registered to provisioned Hosted or Hybrid GitOps Runtimes for application deployment.  
  Hosted GitOps requires you to connect at least one external K8s cluster as part of setting up the Hosted GitOps environment.  
  Hybrid GitOps allow you to add external clusters after provisioning the Runtimes.  
  See [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).
* Organizational systems  
  Organizational Systems include the customer's tracking, monitoring, notification, container registries, Git providers, and other systems. They can be entirely on-premises or in the public cloud.   
  Either the ingress controller (ingress hybrid environments), or the Tunnel Client (tunnel-based hybrid environments), forwards incoming events to the GitOps Application Proxy. 


## Related articles
[Hosted GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)
[Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)
[On-premises GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/on-prem-gitops-runtime-install/)  
 
