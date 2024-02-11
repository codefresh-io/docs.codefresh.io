---
title: "Codefresh platform deployment"
description: "On-premises and SaaS deployment models"
group: installation
redirect_from:
  - /docs/administration/installation-security/
toc: true
---

Codefresh supports SaaS (Software as a Service) and on-premises deployment options for its platform.

Both deployment models provide seamless integration and support for Codefresh pipelines for CI (continuous integration) and Codefresh GitOps for Argo CD applications, as standalone modules or co-existing side-by-side.
In addition to other components, Codefresh Runtimes are pivotal components within the modules. Codefresh pipelines and GitOps support different types of Runtimes, as you can see in the SaaS and on-premises platform architectures sections that follow.

Note that both deployment options are compliant with [SOC2 - Type2](https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report){:target="\_blank"}.

{% include image.html
  lightbox="true"
  file="/images/installation/soc2-type2-certified.png"
  url="/images/installation/soc2-type2-certified.png"
  alt="sso-diagram.png"
  max-width="40%"
    %} 



## Codefresh SaaS platform architecture

The diagram shows a high-level view of the SaaS deployment model and its core components. 


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
The GitOps Runtime is installed on a Kubernetes cluster, and houses the enterprise distribution of the Codefresh Application Proxy and the Argo Project.  
Depending on the type of GitOps installation, the GitOps Runtime is installed either in the Codefresh platform (Hosted GitOps), or in the customer environment (Hybrid GitOps). Read more about it in [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).

### Codefresh Runner
The Codefresh Runner, also known as the Agent, enables running Codefresh pipeline builds in the customer's environment.  It provides a way to run pipeline builds, tests, and deployments within your private network or on-premises environment by making API calls to the Codefresh platform.

See [Codefresh Runner architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#codefresh-runner-architecture) in this article. Read more about how it works in [Runner behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall/).

### Codefresh Clients

Codefresh Clients include the UI and the CLI.     

##### Codefresh UI
The Codefresh UI provides an intuitive web interface to create, run, and manage CI pipelines and Argo CD applications.  
The global (Home) dashboard displays unified, enterprise-wide insights into CI pipelines and Argo CD applications. For in-depth analysis, there are dedicated Kubernetes and Helm dashboards for CI releases and deployments. For GitOps, there are dedicated dashboards for Products, Environments dashboards focus on Argo CD application, Runtime, and cluster metrics and performance.

##### Codefresh CLI 
There are flavors of the Codefresh CLI:
  The CLI for pipelines includes commands to create, run, and manage CI pipelines.
  The CLI for GitOps and Argo CD applications is primarily used to download the latest versions of GitOps Runtimes.


## Codefresh on-premises platform architecture

The diagram shows a high-level view of the on-premises deployment model, and its core components. 

{% include
image.html
lightbox="true"
file="/images/runtime/architecture/arch-on-premises.png"
url="/images/runtime/architecture/arch-on-premises.png"
alt="Platform architecture: Codefresh on-premises deployments"
caption="Platform architecture: Codefresh on-premises deployments"
max-width="100%"
%}



### External Components


#### Codefresh Runner
The Codefresh Runner can be installed on the same cluster as the On-Premises platform or on a remote cluster.  It provides a way to run pipeline builds, tests, and deployments within your private network or on-premises environment by making API calls to the Codefresh platform.

See [Codefresh Runner architecture](#codefresh-runner-architecture) in this article. Read more about how it works in [Runner behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall/).


#### GitOps Runtime
The GitOps Runtime, similar to the Codefresh Runner, can be installed on the same cluster as the On-Premises platform or on a remote cluster. It includes Codefresh-signed versions of the Argo Project components, Argo CD, Argo Workflows, Argo Rollouts, and Argo Events.
The GitOps Runtime reports events in clusters and Git repositories through API calls to the Codefresh platform. 

Read more in [GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-runtime-architecture).


#### Codefresh UI & CLI
Codefresh provides a web-based UI and CLI to work with the Codefresh On-Premises platform through API calls. 

The UI allows users to visually manage and control CI/CD pipelines, Argo CD applications and deployments with  applications and deployments, and more.
The CLI provides a flexible option for developers to interact with the On-Premises platform.


### On-Premises Platform Components

#### Ingress Controller

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
  Stores data for legacy builder and windows nodes.




## Codefresh Runtimes

### Runner for CI pipelines**  
  



### GitOps Runtimes




  

* **GitOps for Argo CD Applications**  
  GitOps installation is a full-featured solution for application deployments and releases powered by the Argo Project. Codefresh uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments.

  GitOps installations support Hosted and Hybrid options.  
  See [GitOps](#gitops).




## On-premises   

For customers who want full control, Codefresh also offers on-premises installation. Both the UI and builds run on a Kubernetes cluster fully managed by the customer.

See [Codefresh On-Prem Installation & Configuration]({{site.baseurl}}/docs/installation/codefresh-on-prem).

## Hybrid Runner

The Hybrid Runner installation for Codefresh pipelines is for organizations who want their source code to live within their premises, or have other security constraints. For implementation details, see [[Runner installation behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall).
The UI runs on Codefresh infrastructure, while the builds happen in a Kubernetes cluster in the customer's premises.

{% include image.html
  lightbox="true"
  file="/images/installation/hybrid-installation.png"
  url="/images/installation/hybrid-installation.png"
  caption="Hybrid installation.png"
  alt="Hybrid installation.png"
  max-width="70%"
    %}    


Hybrid Runner installation strikes the perfect balance between security, flexibility, and ease of use. Codefresh still does the heavy lifting for maintaining most of the platform parts. Sensitive data such as source code and internal services never leave customer premises.  
Codefresh can easily connect to internal [secure services]({{site.baseurl}}/docs/installation/behind-the-firewall/#using-secure-services-in-your-pipelines) that have no public presence.
The UI is still compliant with Soc2.
  

The table lists the security implications of Hybrid Runner installation.

{: .table .table-bordered .table-hover}
| Company Asset          | Flow/Storage of data                 | Comments                  |
| -------------- | ---------------------------- |-------------------------|
| Source code       | Stays behind the firewall | |
| Binary artifacts  | Stay behind the firewall |   |
| Build logs        | Also sent to Codefresh Web application |  |
| Pipeline volumes   | Stay behind the firewall | |
| Pipeline variables   | Defined in Codefresh Web application | |
| Deployment docker images | Stay behind the firewall| Stored on your Docker registry |
| Development docker images | Stay behind the firewall | Stored on your Docker registry|
| Testing docker images | Stay behind the firewall|  Stored on your Docker registry |
| Inline pipeline definition | Defined in Codefresh Web application |  |
| Pipelines as YAML file | Stay behind the firewall |  |
| Test results | Stay behind the firewall | | 
| HTML Test reports | Shown on Web application |  Stored in your S3 or Google bucket or Azure storage  |
| Production database data | Stays behind the firewall | |
| Test database data | Stays behind the firewall | |
| Other services (e.g. Queue, ESB) | Stay behind the firewall | |
| Kubernetes deployment specs | Stay behind the firewall | |
| Helm charts | Stay behind the firewall | |
| Other deployment resources/script (e.g. terraform) | Stay behind the firewall | |
| Shared configuration variables | Defined in Codefresh Web application |  |
| Deployment secrets (from git/Puppet/Vault etc) | Stay behind the firewall|  |
| Audit logs | Managed via Codefresh Web application |  |
| SSO/Idp Configuration | Managed via Codefresh Web application |  |
| User emails | Managed via Codefresh Web application |  |
| Access control rules | Managed via Codefresh Web application | |









##  Installation options comparison
Codefresh Runner and GitOps environments can co-exist giving you the best of both worlds. 

{: .table .table-bordered .table-hover}
| Characteristic | Hybrid Runner                | On Premise              | GitOps
| -------------- | ---------------------------- |-------------------------| ----------------|
| Managed by      | Codefresh and customer      | Customer                | Codefresh and customer |
| UI runs on      | Public cloud                | Private cluster          | Public cloud|
| Builds run on   | Private cluster             | Private cluster          | Private cluster (Hybrid)/Codefresh cluster (Hosted)|
| Access to secure/private services | Yes       | Yes                      | Yes |
| Customer maintenance effort | Some            | Full                     | Some |
| Best for        | Companies with security constraints  | Large scale installations | Companies with security constraints |
| Available to    |[Enterprise plans](https://codefresh.io/contact-us/){:target="\_blank"} | [Enterprise plans](https://codefresh.io/contact-us/) |[Enterprise plans](https://codefresh.io/contact-us/) |


## Related articles
[Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/)  
[Managing Git Sources in GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)   
[Shared Configuration Repositorysitory]({{site.baseurl}}/docs/installation/gitops/shared-configuration)  


