---
title: "GitOps Runtime architecture"
description: "View components of GitOps Runtimes"
toc: true
---


See detailed views of GitOps Runtime architecture for the different installation modes, and descriptions of the GitOps Runtime components.

<!--- * [Hosted GitOps Runtime architecture](#hosted-gitops-runtime-architecture)
* Hybrid GitOps Runtime architecture: -->

The Hybrid GitOps Runtime supports tunnel-based and ingress-based access modes:  
  * [Tunnel-based](#tunnel-based-hybrid-gitops-runtime-architecture)  
  * [Ingress-based](#ingress-based-hybrid-gitops-runtime-architecture)  


The Runtime components are common to both installation modes:
  * [Application Proxy](#application-proxy)
  * [Argo Project](#argo-project)
  * [Event Reporters](#event-reporters)
  * [Application Change Revision Controller](#application-change-revision-controller)
  * [Request Routing Service](#request-routing-service)
  * [Tunnel Server](#tunnel-server)
  * [Tunnel Client](#tunnel-client)



<!--- ## Hosted GitOps Runtime architecture
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
-->

## Tunnel-based Hybrid GitOps Runtime architecture
Tunnel-based Hybrid GitOps Runtimes use tunneling instead of ingress controllers to control communication between the GitOps Runtime in the customer's cluster and the GitOps Platform.  
Tunnel-based runtimes are optimal when the cluster with the GitOps Runtime is not exposed to the internet. 

{% if page.url contains '/docs/' %}
>**NOTE**  
Tunnel-based access mode is not supported for GitOps on-premises installations.
{% endif %}

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
Ingress-based Runtimes use ingress controllers to control communication between the GitOps Runtime in the customer cluster and the GitOps Platform.  
Ingress-based Runtimes are optimal when the cluster with the GitOps Runtime is exposed to the internet.  



{% include
   image.html
   lightbox="true"
   file="/images/runtime/architecture/arch-hybrid-ingress.png"
 url="/images/runtime/architecture/arch-hybrid-ingress.png"
  alt="Ingress-based Hybrid GitOps Runtime architecture"
  caption="Ingress-based Hybrid GitOps Runtime architecture"
  max-width="100%"
%}

## Runtime components
### Application Proxy
The GitOps Application Proxy (App-Proxy) functions as the Codefresh agent, and is deployed as a service in the GitOps Runtime.  

For tunnel-based Hybrid GitOps Runtimes, the Tunnel Client forwards the incoming traffic from the Tunnel Server using the Request Routing Service to the GitOps App-Proxy. 
For Hybrid GitOps Runtimes with ingress, the App-Proxy is the single point-of-contact between the GitOps Runtime, and the GitOps Clients, the GitOps Platform, and any organizational systems in the customer environment.  

 
The GitOps App-Proxy:  
* Accepts and serves requests from GitOps Clients either via the UI or CLI 
* Retrieves a list of Git repositories for visualization in the Client interfaces  
* Retrieves permissions from the GitOps Control Plane to authenticate and authorize users for the required operations 
* Implements commits for GitOps-controlled entities
* Implements state-change operations for non-GitOps controlled entities



### Argo Project 

The Argo Project includes:
* Argo CD for declarative continuous deployment 
* Argo Rollouts for progressive delivery 
* Argo Workflows as the workflow engine 
* Argo Events for event-driven workflow automation framework

>**NOTE**  
Codefresh users rely on our platform to deliver software reliably, and predictably without interruption.  
To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh.  
Typically, new versions of Argo CD are available in the Codefresh Runtime within 30 days of their official release.

### Event Reporters
Event Reporters monitor changes to resources deployed on the cluster and report the changes back to the Codefresh platform.

Codefresh has two types of Event Reporters:
* Resource Event Reporter
* Application Event Reporter

#### Resource Event Reporter
The Resource Event Reporter monitors specific types of resources on the cluster and tracks changes in their live-states. It sends the live-state manifests with the changes to Codefresh without preprocessing.  

The Resource Event Reporter monitors changes to these resource types:
* Rollouts (Argo Rollouts)
* ReplicaSets and Workflows (Argo Workflows)

Resource Event Reporters leverage Argo Event components such as Event Sources to monitor changes to the live-state manifests, and Sensors to send the live-state manifests to Codefresh. For setup information on these Argo Event components, see Argo CD's documentation on [Event Source](https://argoproj.github.io/argo-events/concepts/event_source/){:target="\_blank"} and [Sensor](https://argoproj.github.io/argo-events/concepts/sensor/){:target="\_blank"}.

#### Application Event Reporter
The Application Event Reporter specializes in monitoring changes to Argo CD applications deployed on the cluster. 

In contrast to the Resource Event Reporter which utilizes Argo Events, the Application Event Reporter employs a proprietary implementation that includes an event queue to process application change-events and sharding for a robust and scalable setup. Another significant difference is that the Application Reporter retrieves both the live-state manifest of the application, and the Git manifests for all the application's managed resources. 

##### Application Event Reporter data flow
The diagram below illustrates the data flow for the Application Event Reporter (identified on the cluster as **event-reporter**):

{% include
   image.html
   lightbox="true"
   file="/images/runtime/architecture/app-event-reporter-flow.png"
 url="/images/runtime/architecture/app-event-reporter-flow.png"
  alt="Application Event Reporter flow"
  caption="Application Event Reporter flow"
  max-width="100%"
%}


1. The user makes changes to the application manifest or its managed resources and commits them to the Git repository.

1. The Argo CD Application Controller monitors the Git repository for changes, synchronizes the updates with the cluster, and forwards the changes to the Kubernetes API.

1. The Application Event Reporter subscribes to the Kubernetes API to receive application-change events. 
  * If there are multiple instances of the Application Event Reporter, each instance subscribes to a set of specific applications determined through a hash function on the application name.
  * The application-change event is added to the Event Queue of the appropriate Application Reporter instance for processing based on the shard to which it belongs.  Each instance of the Application Reporter can queue up to 1,000 events at a time.
  
  >**NOTE**  
  The number of Application Event Reporters are equal to the configured number of replicas. By default, there are five replicas, but the number can be customized through the `argo-cd.eventReporter.replicas` parameter in your Helm values file [values.yaml](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/gitops-runtime/values.yaml){:target="\_blank"}.

{:start="4"}  
1. The Application Event Reporter requests both the application's live-state manifest and the Git manifests for all the application's managed resources from the Argo CD Server.  

1. The Argo CD server retrieves these manifests from the Argo CD repo-server and forwards them to the Application Event Reporter.

1. The Application Event Reporter reports the application-change events to the Codefresh platform.

### Application Change Revision Controller 

The Application Change Revision (ACR) Controller is a Codefresh-specific component integrated into Argo CD. Its primary function is to identify and display the exact revision associated with an application change that triggered a promotion or deployment in monorepo environments. 

In monorepo environments where multiple applications share a single repository, the ACR Controller:

* Detects and associates the precise revision responsible for triggering a promotion or deployment of a specific application. 
* Ensures that notifications are scoped to the application that was actually modified, preventing unnecessary notifications for other applications within the same repository, improving clarity and reducing noise.

>**NOTE**  
  The ACR Controller is supported from Runtime version 0.13.0 and higher.   
  It does not support multi-source applications.

##### Configuration

The ACR Controller must be explicitly enabled in the `argo-cd` section of the Runtime's `values.yaml` file. See [Enable precise sync detection for monorepo apps]({{site.baseurl}}/docs/installation/gitops/manage-runtimes/#enable-precise-sync-detection-for-monorepo-apps). 

### Request Routing Service
The Request Routing Service is installed on the same cluster as the GitOps Runtime in the customer environment.  
It receives requests from the Tunnel Client (tunnel-based) or the ingress controller (ingress-based), and forwards the request URLs to the Application Proxy, and webhooks directly to the Event Sources.  

{{site.data.callout.callout_warning}}
**IMPORTANT**  
  The Request Routing Service is available from Runtime version 0.0.543 and higher.   
  Older Runtime versions are not affected as the ingress controller continues to route incoming requests and there is full backward compatibility.
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
The customer environment that communicates with the GitOps Runtime and Codefresh generally includes:
* Ingress controller for ingress-based Hybrid GitOps Runtimes  
  The ingress controller is configured on the same Kubernetes cluster as the GitOps Runtime, and implements the ingress traffic rules for the GitOps Runtime. 
  See [Ingress controller requirements]({{site.baseurl}}/docs/installation/gitops/runtime-ingress-configuration/).
* Managed clusters  
  Managed clusters are external clusters registered to provisioned GitOps Runtimes for application deployment.  
  <!---  Hosted GitOps requires you to connect at least one external K8s cluster as part of setting up the Hosted GitOps environment.  -->
  Hybrid GitOps allow you to add external clusters after provisioning the Runtimes.  
  See [Managing external clusters in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/managed-cluster/).
* Organizational systems  
  Organizational Systems include the customer's tracking, monitoring, notification, container registries, Git providers, and other systems. They can be entirely on-premises or in the public cloud.   
  Either the ingress controller (ingress-based hybrid environments), or the Tunnel Client (tunnel-based hybrid environments), forwards incoming events to the GitOps Application Proxy. 

## Data flow: GitOps Runtime & external systems
The GitOps Runtime interacts with external systems and components in the customer environment to enable GitOps operations and processes.

* **Runtime cluster**  
  * Both Argo CD and Codefresh components within the Runtime interact with the Runtime cluster’s Kubernetes API server.
  * Argo CD components also access managed clusters registered to GitOps Runtimes to deploy applications.

* **Git providers**  
  * Argo CD components access Git providers such as GitHub. Git provider credentials are always securlety stored in the customer’s cluster.
  * Codefresh components also access the Git provider to enable UI-driven commits and pull requests.

* **Container registries and Jira (optional)**  
  If enrichment functionality is enabled, jobs can be executed within the Runtime cluster or a CI system to retrieve metadata from those container registries and Jira instances integrated with Codefresh.


## Data reporting: GitOps Runtime to Codefresh Platform
The GitOps Runtime reports data to the Codefresh platform, which stores the data.

{: .table .table-bordered .table-hover}
| Entity/Metadata        | Reported data             |
| --------------         | --------------           |
|**Kubernetes resources**     | {::nomarkdown}<ul><li>Argo CD applications</l><li>All managed resources within an Argo CD application, for example, Deployments, ConfigMaps</li><li>Argo Rollouts and ReplicaSets</li></ul>{:/}|
|**Git commit metadata**     | {::nomarkdown}<ul><li>Commit SHA, message, and committer details (avatar URL, username)</l><li>Link to the commit in the Git provider</li></ul>{:/}|
|**Jira issue metadata**      | {::nomarkdown}<ul><li>Jira ticket number, link, and title (if configured)</l></ul>{:/}|
|**Docker image metadata**      | {::nomarkdown}<ul><li>Image name, digest, and repository information (if configured)</l></ul>{:/}|



## Related articles
<!--- [Hosted GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/)-->
[Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/)  
{% if page.url contains '/docs/' %}[On-premises GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/on-prem-gitops-runtime-install/)  {% endif %}  
 
