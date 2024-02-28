---
title: "Codefresh platform deployment"
description: "On-premises and SaaS deployment options"
group: installation
redirect_from:
  - /docs/administration/installation-security/
toc: true
---

Codefresh supports SaaS (Software as a Service) and on-premises deployment options for its platform.

Both deployment options provide seamless integration and support for Codefresh Pipelines for CI (continuous integration) and Codefresh GitOps for Argo CD applications, as standalone modules or co-existing side-by-side.  
In addition to other components, the Codefresh Runner for pipelines and GitOps Runtimes for Argo CD applications are pivotal components of both deployments.

Read more on the platform architecture for [SaaS](#codefresh-saas-platform-architecture) and [on-premises](#codefresh-on-premises-platform-architecture) deployments.

Both deployment options are compliant with [SOC2 - Type2](https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report){:target="\_blank"}.

{% include image.html
  lightbox="true"
  file="/images/installation/soc2-type2-certified.png"
  url="/images/installation/soc2-type2-certified.png"
  alt="sso-diagram.png"
  max-width="35%"
    %} 



## Codefresh SaaS platform architecture

The diagram shows the high-level architecture for Codefresh SaaS deployment and its core components. 


{% include
image.html
lightbox="true"
file="/images/runtime/architecture/arch-saas.png"
url="/images/runtime/architecture/arch-saas.png"
alt="Platform architecture: Codefresh SaaS deployments"
caption="Platform architecture: Codefresh SaaS deployments"
max-width="100%"
%}

### Control Plane
The Codefresh Control Plane is the SaaS component in the platform. External to the enterprise firewall, the Control Plane does not communicate directly with the Codefresh Runtimes, Codefresh Clients, or the customer's organizational systems. The Codefresh Runtimes and the Codefresh Clients communicate with the Codefresh Control Plane to retrieve the required information.  


### GitOps Runtime
The GitOps Runtime required for the GitOps module is installed on a Kubernetes cluster, and houses the enterprise distribution of the Codefresh Application Proxy and the Argo Project.  
The GitOps Runtime is installed in either hosted mode within the Codefresh platform (Hosted GitOps), or in hybrid mode within the customer environment (Hybrid GitOps).  
Read more about it in [GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/).

### Codefresh Runner
The Codefresh Runner, also known as the Agent, is required for Codefresh pipelines, and enables running pipeline builds in the customer's environment.  It provides a way to run pipeline builds, tests, and deployments within your private network or on-premises environment by making API calls to the Codefresh platform.  
Read more about it in [Codefresh Runner]({{site.baseurl}}/docs/installation/runner/).

### Managed Clusters
Managed clusters are external clusters added to provisioned GitOps Runtimes. You can deploy applications to the clusters without having to install Argo CD on the clusters in order to do so.



### Codefresh Clients

Codefresh Clients include the UI and the CLI.     

##### Codefresh UI
The Codefresh UI provides an intuitive web interface to create, run, and manage CI pipelines and Argo CD applications. 

The global (Home) dashboard consolidates unified, enterprise-wide insights into CI pipelines and Argo CD applications.  
For in-depth analysis, the UI has several additional dashboards, each dedicated to distinct aspects of pipeline and Argo CD application functionality and performance.  
For pipelines, you have Kubernetes and Helm dashboards to monitor releases and deployments.  
For GitOps, you have our unique Products and Environments dashboards to track and manage Argo CD application deployments.

##### Codefresh CLI 
The CLI for Codefresh Pipelines can:
* Perform any UI operation
* Create complex automation from your local machine
* Create and run pipelines for complex use cases using the CLI within pipeline steps

For installation instructions and CLI command descriptions, see the [CLI documentation](https://codefresh-io.github.io/cli/getting-started/){:target="\_blank"}.


## Codefresh on-premises platform architecture

The diagram shows a high-level view of the Codefresh on-premises deployment, and its core components. 

{% include
image.html
lightbox="true"
file="/images/runtime/architecture/arch-on-premises.png"
url="/images/runtime/architecture/arch-on-premises.png"
alt="Platform architecture: Codefresh on-premises deployments"
caption="Platform architecture: Codefresh on-premises deployments"
max-width="100%"
%}



### External components


#### Codefresh Runner
The Codefresh Runner can be installed on the same cluster as the on-premises platform or on a remote cluster.  It provides a way to run pipeline builds, tests, and deployments within your private network or on-premises environment by making API calls to the Codefresh platform.

Read more about it in [Codefresh Runner architecture]({{site.baseurl}}/docs/installation/runner/runner-architecture), and on how it works in [Runner behind firewalls]({{site.baseurl}}/docs/installation/runner/behind-the-firewall/).


#### GitOps Runtime
The GitOps Runtime, similar to the Codefresh Runner, can be installed on the same cluster as the on-premises platform or on a remote cluster. It includes Codefresh-signed versions of the Argo Project components, Argo CD, Argo Workflows, Argo Rollouts, and Argo Events.
The GitOps Runtime reports events in clusters and Git repositories through API calls to the Codefresh platform. 

Read more in [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture).


#### Codefresh UI & CLI

##### Codefresh UI
The Codefresh UI provides an intuitive web interface to create, run, and manage CI pipelines and Argo CD applications. 

The global (Home) dashboard displays unified, enterprise-wide insights into CI pipelines and Argo CD applications. 
For in-depth analysis, the UI has several additional dashboards, each dedicated to distinct aspects of Codefresh pipeline, and Argo CD application functionality and performance. For pipelines, you have Kubernetes and Helm dashboards to monitor releases and deployments.
For GitOps, you have our unique Products and Environments dashboards to track and manage Argo CD application deployments.

##### Codefresh CLI 
The CLI for Codefresh Pipelines can:
* Perform any UI operation
* Create complex automation from your local machine
* Create and run pipelines for complex use cases using the CLI within pipeline steps

For installation instructions and CLI command descriptions, see the [CLI documentation](https://codefresh-io.github.io/cli/getting-started/){:target="\_blank"}.


### On-premises platform components

#### Ingress controller

The Codefresh On-Premises platform uses an ingress controller to handle incoming traffic. The NGINX Ingress Controller is deployed within the cluster hosting the Codefresh platform. The ingress controller serves as the entry point for requests originating from Codefresh Runners, GitOps Runtimes, and Clients, and routes them to the appropriate destinations, namely the Pipelines API/UI and the GitOps API/UI.


#### Pipelines API

The Pipelines API serves as the primary gateway for the Codefresh Pipelines module in the On-Premises platform. It handles a wide range of system functionalities, including authentication, authorization, audit logging, user management, and pipeline builds, among others. The Pipelines API utilizes a REST API interface with OpenAPI (Swagger v3) specifications.  



#### Pipelines UI
The Pipelines UI acts as a static file server that hosts and delivers all the user interface pages for Codefresh Pipelines. It provides visualization of pipelines, builds, third-party integrations and more.



#### GitOps API
The GitOps API serves as the primary gateway for the Codefresh GitOps module in the On-Premises platform. It interfaces between Codefresh GitOps, Git, and Argo CD, to sync 
It utilizes a GraphQL interface to provide a user interface



#### GitOps UI
The GitOps UI provides a unified, enterprise-wide view of deployments, Runtimes, clusters, and applications in the same location.  



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
    * Analytics information 


* NATS  
  Legacy message bus.

* Consul  
  Stores data for legacy builder and Windows nodes.



## Related articles
[On-premises platform deployment]({{site.baseurl}}/docs/installation/on-premises/)  
[Codfresh Runner architecture]({{site.baseurl}}/docs/installation/runner/runner-architecture/)  
[GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/)  



