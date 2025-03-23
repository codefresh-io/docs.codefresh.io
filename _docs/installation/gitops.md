---
title: "About GitOps Runtimes"
description: " Install Hybrid GitOps Runtimes on K8s clusters"
toc: true
---


## About GitOps Runtimes
Managing applications at scale requires efficient tools and practices. Codefresh's GitOps Runtime is a hybrid solution powered by Argo CD and Argo Rollouts, designed to streamline GitOps operations and simplify application management across environments.

##### What is a GitOps Runtime?
The GitOps Runtime is a specialized component installed within your cluster, acting as a bridge between your infrastructure and the Codefresh platform. It integrates seamlessly with Argo CD, a leading tool for continuous delivery, and Argo Rollouts for advanced deployment strategies.

This Runtime forms the foundation of your GitOps operations, enabling centralized control and visibility across multiple Argo CD instances.
By leveraging the Runtime, teams can efficiently orchestrate deployments, monitor environments, and ensure consistency across applications. To better understand how the Runtime manages key aspects like Git token usage and shared config repos, see [GitOps Runtime concepts]({{site.baseurl}}/docs/installation/gitops/runtime-concepts/).

{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="70%"
%}

##### Why use GitOps Runtimes?  
Scaling GitOps across multiple clusters and environments can be complex, especially when managing multiple Argo CD instances. Codefresh GitOps Runtimes simplify this by providing:  

* **Unified visibility**: Manage all GitOps operations from a single control plane
* **Centralized administration**: Streamline user accessand security policies across all environments 
* **Simplified scalability**: Easily add or remove Argo CD instances while maintaining consistency across clusters
* **Effortless updates and security patches**: Get real-time update notifications and early access to security fixes.  

See [Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).


## Installation options for GitOps Runtimes

## Why use GitOps Runtimes?  
Scaling GitOps across multiple clusters and environments can be complex, especially when managing multiple Argo CD instances. Codefresh GitOps Runtimes simplify this by providing:  

- **Unified visibility:** Manage all GitOps operations from a single control plane.  
- **Centralized administration:** Streamline user access, auditing, and security policies across all environments.  
- **Simplified scalability:** Easily add or remove Argo CD instances while maintaining consistency across clusters.  
- **Effortless updates and security patches:** Get real-time update notifications and early access to security fixes.  

See [Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).  

## Installation modes for GitOps Runtimes  
Codefresh offers flexible installation options. If you already use Argo CD, you can integrate with it seamlessly. If not, you can deploy a new Argo CD instance.  

### Connect to an existing Argo CD instance  
Already using Argo CD? Integrate the Runtime keeping your setup unchanged.  

* No modifications to your existing Argo CD configuration
* Adds visibility, deployment tracking, and integrations
*Supports multiple authentication mechanisms and security settings  

See [Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).  

### Install a new Argo CD instance  
No Argo CD yet? Deploy a fully managed instance included within the GitOps Runtime.  
* Ideal for clean setups with full control  
* Codefresh manages Argo CD’s lifecycle, updates, and maintenance  

See [Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).  

{% if page.collection != site.gitops_collection %}  
### Install alongside Community Argo CD  
Using Community Argo CD? Install the GitOps Runtime alongside without disrupting your setup.  
Requires additional setup to manage resources independently.  

See [Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/).  
{% endif %}  

## Managing multiple GitOps Runtimes   
You can install one Hybrid GitOps Runtime per cluster. To add more, each Runtime must be on a separate cluster with a unique name.  

See [Installing additional GitOps Runtimes from the Codefresh UI]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation#install-additional-gitops-runtimes-in-account) or using [Terraform]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#install-gitops-runtime-via-terraform).  





You can install the Hybrid GitOps Runtime via Helm using one of two options, tailored to specific scenarios:

* **Installation with existing Argo CD**  
  Use this option if your cluster already an Argo CD installed. The installation process integrates the GitOps Runtime with the existing Argo CD instance and deploys the necessary Argo Project components.
  See [Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/).

* **Installation with new Argo CD**  
  Use this option to deploy if your cluster does not have Argo CD installed. The installation process deploys the GitOps Runtime and a new Argo CD instance along with the other Argo Project components.
  See [Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

{% if page.collection != site.gitops_collection %}
* **Installation with Community Argo CD**  
  Use this option if your cluster has Community Argo CD and you want to add GitOps Runtime capabilities.  
  To prevent naming and tracking conflicts between the Community Argo CD instance and the GitOps Runtime-managed resources, you need additional configuration.  
  See [Install GitOps Runtime alongside Community Argo CD]({{site.baseurl}}/docs/installation/gitops/argo-with-gitops-side-by-side/).
{% endif  %}

## Multiple GitOps Runtimes in account
Within the same account, you can install Hybrid GitOps Runtime per cluster.  
To install additional Hybrid GitOps Runtimes in the same account, each Runtime must be installed on a different cluster. Every Runtime within the same account must have a unique name.

See [Installing additional GitOps Runtimes from the Codefresh UI]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation#install-additional-gitops-runtimes-in-account), or using [Terraform]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/#install-gitops-runtime-via-terraform) to install Runtimes.

<!--- ## Hosted GitOps
The SaaS version of GitOps, Hosted GitOps has Argo CD installed in the Codefresh cluster.

Hosted GitOps Runtime is installed and provisioned in a Codefresh cluster, and managed by Codefresh.  
Hosted environments are full-cloud environments, where all updates and improvements are managed by Codefresh, with zero-maintenance overhead for you as the customer.  
Currently, you can add one Hosted GitOps Runtime per account.
For the architecture, see [Hosted GitOps Runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/).

  
{% include
 image.html
 lightbox="true"
 file="/images/runtime/hosted-gitops-initial-view.png"
 url="/images/runtime/hosted-gitops-initial-view.png"
 alt="Hosted GitOps runtime setup"
 caption="Hosted GitOps runtime setup"
    max-width="80%"
%} 

  For more information on how to set up the hosted environment, including provisioning hosted runtimes, see [Set up Hosted GitOps]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).  

## Hybrid GitOps
The hybrid version of GitOps, has Argo CD installed in the customer's cluster.    
Hybrid GitOps is installed in the customer's cluster, and managed by the customer.  

The Hybrid GitOps Runtime is optimal for organizations with security constraints, wanting to manage CI/CD operations within their premises. Hybrid GitOps strikes the perfect balance between security, flexibility, and ease of use. Codefresh maintains and manages most aspects of the platform, apart from installing and upgrading Hybrid GitOps Runtimes which are managed by the customer.  

Hybrid GitOps Runtime installation includes a forked version of the Argo Project with its components: Argo CD, Argo Rollouts, Argo Workflows and Argo Events.

-->


{% if page.collection != site.gitops_collection %}


## Hosted vs.Hybrid GitOps 

>**NOTE**  
We have deprecated Hosted GitOps Runtimes which are no longer supported.  
The comparison below is provided for historical reference only.

The table below highlights the main differences between Hosted and Hybrid GitOps.

{: .table .table-bordered .table-hover}
| GitOps Functionality           |Feature             |  Hosted                    | Hybrid |
| --------------          | --------------     |---------------             | --------------- |
| Runtime                 | Installation       | Provisioned by Codefresh   | Provisioned by customer       |
|                         | Runtime cluster    | Managed by Codefresh       | Managed by customer       |
|                         | Number per account | One Runtime                | Multiple Runtimes, one per cluster            |
|                         | External cluster   | Managed by customer        | Managed by customer         |
|                         | Upgrade            | Managed by Codefresh       | Managed by customer |
|                         | Uninstall          | Managed by customer        | Managed by customer |
| Argo CD                 |                    | Codefresh cluster          | Customer cluster  |
| CI Ops                  |Delivery Pipelines |Not supported               | Supported  |
|                         |Workflows           | Not supported              | Supported  |
|                         |Workflow Templates  | Not supported              | Supported  |
| CD  Ops                 |Applications        | Supported: see below for details                  | Supported: see below for details |
|                         |                    |Deployment supported only on managed clusters | Deployment supported on both in-cluster and managed clusters|
|                         |                     |Self-healing interval: 90 seconds<br>See [Argo CD automatic self-healing](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/#automatic-self-healing){:target="\_blank"}| Self-healing interval:  5 seconds (Argo CD default)<br>See [Argo CD automatic self-healing](https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/#automatic-self-healing){:target="\_blank"}|
|                         |Image enrichment    | Supported                  | Supported  |
|                         | Rollouts           | Supported                  |  Supported  |
|Integrations             |                    | Supported                  | Supported  |
|Dashboards               |Home                | Hosted Runtime and deployments|Runtimes, deployments, Delivery Pipelines |
|                         |DORA metrics        | Supported                 |Supported        |
|                         |Applications        | Supported                 |Supported        |  


{% endif %}  

