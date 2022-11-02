---
title: "Architecture"
description: ""
group: getting-started
toc: true
---

Codefresh GitOps is built around an enterprise version of the Argo Ecosystem, fully GitOps-compliant with industry-standard security.
To cater to differing requirements and degrees of enterprise security, Codefresh offers hosted and hybrid installation environments.    
Both hosted and hybrid environments share a similar architecture, with the key difference being the location of the Codefresh Runtime.

The sections that follow illustrate hosted and hybrid architecture, and describe the main components in the Codefresh Platform.


### Hosted GitOps runtime architecture
In the hosted environment, the Codefresh Runtime is located on a K8s cluster managed by Codefresh. 

{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-hosted.png"
 url="/images/getting-started/architecture/arch-hosted.png"
  alt="Hosted runtime architecture"
  caption="Hosted runtime architecture"
  max-width="100%"
%}

### Hybrid runtime architecture
In the hybrid environment, the Codefresh Runtime is located on the customer's K8s cluster, and managed by the customer. 

{% include
   image.html
   lightbox="true"
   file="/images/getting-started/architecture/arch-hybrid.png"
 url="/images/getting-started/architecture/arch-hybrid.png"
  alt="Hybrid runtime architecture"
  caption="Hybrid runtime architecture"
  max-width="100%"
%}

### Codefresh Platform
The Codefresh Platform comprises:  

* Codefresh Control Plane 
* Codefresh Runtime with the Codefresh Application Proxy and Argo Project
* Codefresh Clients, the Codefresh UI and the Codefresh CLI

{::nomarkdown}
<br><br>
{:/}

#### Codefresh Control Plane 
The Codefresh Control Plane is the SaaS component in the platform. External to the enterprise firewall, it does not have direct communication with the Codefresh Runtime, Codefresh Clients, or the customer's organizational systems. The Codefresh Application Proxy and the Codefresh Clients communicate with the Codefresh Control Plane to retrieve the required information.  

The Codefresh Control Plane:  

* Securely stores user accounts, and retrieves   
* Enforces the permissions model 
* Controls authentication, user management, and billing

{::nomarkdown}
<br>
{:/}

#### Codefresh Runtime
The Codefresh Runtime is installed on a Kubernetes cluster, and houses the enterprise distribution of the Codefresh Application Proxy and the Argo Project.  

* Hosted runtimes are installed on a _Codefresh-managed cluster_ in the Codefresh platform
* Hybrid runtimes are installed on a _customer-managed cluster_

The Codefresh Runtime:  

* Integrates with Argo Workflows and Argo Events to run Delivery Pipelines (hybrid environment), and with Argo CD and Argo Rollouts (both hosted and hybrid environments) to implement GitOps deployments for progressive delivery
* Ensures that the installation repository and the Git Sources are always in sync, and applies Git changes back to the cluster
* Receives events and information from the customer's organizational systems to execute workflows

{::nomarkdown}
<br>
{:/}

#### Codefresh Application Proxy
The Codefresh Application Proxy (App-Proxy) functions as the Codefresh agent. Deployed as a service in the Codefresh Runtime, the App-Proxy is exposed externally through ingress controllers/load-balancers. It is the single point-of-contact from the Codefresh Clients, the Codefresh Platform, and any organizational system to the Codefresh Runtime.  

**Routing**  
The App-Proxy:  
* Accepts and serves requests from Codefresh Clients either via the Codefresh UI or CLI 
* Retrieves a list of Git repositories for visualization in Codefresh Clients  

**Authentication and authorization**  
The App-Proxy retrieves permissions from the Codefresh Control Plane to authenticate and authorize users for the required operations.  

**Write operations**  
The App-Proxy performs write and state-change operations:  
* Commits for GitOps-controlled entities, such as Delivery Pipelines and other CI resources
* State-change operations for non-GitOps controlled entities, such as terminating Argo Workflows

{::nomarkdown}
<br>
{:/}

#### Request Routing Service 
The Request Routing Service is installed on the same cluster as the Codefresh Runtime in the customer environment.
It receives requests from the Ingress Controller, and forwards the request URLs to the Application Proxy, and webhooks directly to the Event Sources. 


> Important:  
  The Request Routing Service is available from runtime version 0.0.543 and higher.  
  Older runtime versions are not affected as there is complete backward compatibility, and the Ingress Controller continues to route incoming requests.

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
<br>
{:/}

#### Codefresh Clients
Codefresh Clients include the Codefresh UI and the Codefresh CLI.  

**Codefresh UI**  

The Codefresh UI provides a unified, enterprise-wide view of your deployment (runtimes and clusters), and CI/CD operations (Delivery Pipelines, workflows, and deployments) in the same location.  

* Multi-runtime and multi-cluster management: View all provisioned runtimes, and the clusters they manage in the Runtimes page.   
* Dashboards for CI and CD visualizations: The Home dashboard for critical insights into CI and CD lifecycles, the DORA metrics dashboard for DevOps metrics, the Applications dashboard for GitOps details, and the Delivery Pipelines dashboard for workflow details.
* Wizards to simplify installation, Delivery Pipeline and application creation and management.
* Integrations for software delivery workflows  

{::nomarkdown}
<br>
{:/}

**Codefresh CLI**  

Perform hybrid runtime installation, and runtime and cluster management operations.

### Customer environment
The customer environment that communicates with the Codefresh platform, generally includes:
* Ingress controller
* Managed clusters
* Organizational systems

{::nomarkdown}
<br><br>
{:/}

#### Ingress Controller
In hybrid runtime environments, the ingress controller implements the ingress traffic rules for the Codefresh Runtime. It is configured on the same Kubernetes cluster as the Codefresh Runtime.  
See [Ingress controller]({{site.baseurl}}/docs/runtime/requirements/#ingress-controller).

{::nomarkdown}
<br>
{:/}


  



#### Managed clusters
Managed clusters are external clusters registered to a provisioned hosted or hybrid runtime(s).  

* Hosted runtime: Requires you to connect to an external K8s cluster as part of setting up the Hosted GitOps environment. You can add more managed clusters after completing the setup.
* Hybrid runtimes: You can add external clusters after provisioning hybrid runtimes.  

See [Add external clusters to runtimes]({{site.baseurl}}/docs/runtime/managed-cluster/).

{::nomarkdown}
<br>
{:/}
                
#### Organizational Systems
Organizational Systems include the tracking, monitoring, notification, registries, Git providers, and other tools incorporated into the continuous integration and continuous deployment processes. They can be entirely on-premises or in the public cloud.   
The tools send events to the Codefresh Application Proxy (via the ingress controller) to trigger and manage CI/CD flows. 

### Related articles
[Set up a hosted runtime environment]({{site.baseurl}}/docs/runtime/hosted-runtime/)  
[Install a hybrid runtime]({{site.baseurl}}/docs/runtime/installation/)



