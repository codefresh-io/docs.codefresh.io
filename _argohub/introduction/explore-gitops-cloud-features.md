---
title: "Explore Codefresh GitOps Cloud"
description: "Understand the key features of Codefresh GitOps Cloud"
group: introduction
toc: true
---

[Codefresh GitOps Cloud]({{site.baseurl}}/argohub/introduction/what-is-gitops-cloud/) transforms how teams manage deployments. It brings application and environment promotion to Argo CD, making it fast and easy to promote software changes securely.

Below, we’ll explore some of the key features of Codefresh GitOps Cloud.

## Runtimes: The foundation of Codefresh GitOps Cloud

At the core of Codefresh GitOps Cloud are Runtimes, which provide the connection between your:
* Clusters and namespaces
* Argo CD instances
* Deployment workflows

{% include
image.html
lightbox="true"
file="/images/runtime/runtime-intro-list-view.png"
url="/images/runtime/runtime-intro-list-view.png"
alt="Codefresh GitOps Cloud: Runtimes"
caption="Codefresh GitOps Cloud: Runtimes"
max-width="70%"
%}

### Bring your own Argo CD instance, or use a managed Argo CD instance
Migrating Argo CD configurations can be difficult and often requires a lot of effort to ensure nothing breaks. That’s why we’re making it easy to connect existing Argo CD infrastructure with Codefresh GitOps Cloud, where you can:  


##### Bring your own Argo CD instance
The Runtime lets you bring your own Argo CD instance, which works in plug-and-play mode. You install it in minutes, and if you change your mind you can also remove it without affecting your existing Argo CD instance. 

Read more on [installing GitOps Runtime with your existing Argo CD]().

##### Use a managed Argo CD instance
If you don’t have an Argo CD instance, that’s no problem. You can still choose the Codefresh Runtime to manage all Argo services in one bundle with our easy installation process. 

Read more on [installing GitOps Runtime with a new Argo CD instance]().

Regardless of your choice, Codefresh provides a single control plane to track and promote applications across environments.



## Environments: Mapping deployments to clusters and namespaces
Typically Argo CD users handle application promotion between environments with tedious processes, lots of custom scripting, and even manual steps. Codefresh GitOps Cloud lets you model environments easily across clusters and namespaces, with a simple dashboard view that provides visibility at a glance.   

With Codefresh GitOps Cloud you get:
* **Cluster-aware deployments**  
  Instead of managing individual applications, Codefresh GitOps Cloud maps environments to the exact clusters and namespaces they belong to, making deployment locations clear.

* **Multi-cluster visibility** 
  Teams no longer need to track deployments manually across clusters—everything is managed centrally.

* **Application-centric management**
  Environments allow teams to group applications based on real-world deployment stages (e.g., dev, staging, production), making it easier to promote changes across them.

{% include
image.html
lightbox="true"
file="/images/gitops-environments/environments-dashboard.png"
url="/images/gitops-environments/environments-dashboard.png"
alt="Codefresh GitOps Cloud: Environments"
caption="Codefresh GitOps Cloud: Environments"
max-width="70%"
%}

Since environments are tightly integrated with the Runtime, all changes and promotions are tracked and controlled from a single control plane, ensuring consistency across deployments.

Read more on [Environments]({{site.baseurl}}/docs/environments/environments-overview/).

## Products: Moving beyond per-application deployments
Argo CD is great for managing individual applications, but teams often need more structure and insights into applications in the wider context of their development and deployment lifecycle. 

Codefresh GitOps Cloud introduces **Products**, which are collections of microservices managed and promoted together as a unit, allowing for coordinated deployments.

{% include
image.html
lightbox="true"
file="/images/gitops-products/product-overview-pic.png"
url="/images/gitops-products/product-overview-pic.png"
alt="Codefresh GitOps Cloud: Products"
caption="Codefresh GitOps Cloud: Products"
max-width="70%"
%}

By grouping applications into products, Codefresh GitOps Cloud makes it easier to:
* Deploy microservices together as a unit instead of managing them separately
* Track the deployment status of all components in a single view
* Reduce errors by ensuring that dependent services get promoted in sync

Read more on [Products]({{site.baseurl}}/docs/docs/products/about-products/).

## Applications: Full control over creation and deployment

Applications in Codefresh GitOps Cloud are **Argo CD applications**, representing a set of Kubernetes manifests that define how you deploy workloads. While Argo CD provides GitOps automation for individual applications, managing applications across multiple clusters at scale requires additional tooling and visibility.

{% include
image.html
lightbox="true"
file="/images/applications/app-dashboard-main-view.png"
url="/images/applications/app-dashboard-main-view.png"
alt="Codefresh GitOps Cloud: Applications"
caption="Codefresh GitOps Cloud: Applications"
max-width="70%"
%}


What Codefresh GitOps Cloud adds to application management:

* **Effortless application creation**
  Create fully-compliant Argo CD applications in our UI, in YAML or form modes.

* **Application context and relationships**
  Organize applications into products to manage microservices as a unit.

* **Centralized application management** 
  View and manage all Argo CD applications across all clusters and environments in a single dashboard, the **GitOps Apps dashboard**. This is the command center for Argo CD application management. You can deep dive into individual applications, including deployment timelines, the current state of applications and resources, diff views, and more. 

* **GitOps-based deployment with promotions**  
  After creating applications, seamlessly deploy changes through promotions for controlled deployments across environments.  
  Every deployment is fully traceable to its Git source, linking promotions to the exact changes and workflows that triggered them.
  
{% include
image.html
lightbox="true"
file="/images/applications/dashboard/app-view.png"
url="/images/applications/dashboard/app-view.png"
alt="Codefresh GitOps Cloud: Managing applications"
caption="Codefresh GitOps Cloud: Managing applications"
max-width="70%"
%}

Read more on [Applications]({{site.baseurl}}/docs/applications/about-apps/).

## Promotions: Structured and controlled deployments
Promotions in Codefresh GitOps Cloud go beyond Argo CD’s standard sync operation for applications. Instead of simply applying changes, promotions provide structure, governance, and visibility across environments.


##### What is unique to Codefresh promotions
* **Flexible promotion triggers**  
  Choose how you trigger promotions, from a simple drag-and-drop action to a fully automated, structured Promotion Flow that follows predefined policies. 

* **Environment-based promotion control**  
  Define rules and policies for how and when applications progress through different environments, ensuring compliance and reducing risk.
 
* **Full traceability**  
  Every promotion is linked to the Git changes, issue tracking references, and workflows that triggered it, providing a clear audit trail from commit to deployment.

{% include
image.html
lightbox="true"
file="/images/gitops-promotions/triggers/drag-n-drop.png"
url="/images/gitops-promotions/triggers/drag-n-drop.png"
alt="Codefresh GitOps Cloud: Promotions"
caption="Codefresh GitOps Cloud: Promotions"
max-width="70%"
%}


Read more on [promotions]({{site.baseurl}}/docs/promotions/promotions-overview/).

## Promotion Flows: Flexible controlled deployments
Promotion Flows are orchestrated workflows that automate how applications move across environments. Instead of manually updating Git repositories and coordinating approvals, Codefresh lets you define structured flows through our Flow Builder that enforces policies, approvals, and validation steps before a deployment gets promoted.

{% include
image.html
lightbox="true"
file="/images/gitops-promotions/overview/promos-gitops.png"
url="/images/gitops-promotions/overview/promos-gitops.png"
alt="Codefresh GitOps Cloud: Promotion Flows"
caption="Codefresh GitOps Cloud: Promotion Flows"
max-width="70%"
%}

##### What you can add to a Promotion Flow
* **Automated testing and validation**  
  Run smoke tests, integration tests, or performance checks before promoting changes.

* **Approval gates**
  Require manual approval at key stages to enforce compliance and governance.

* **Notifications and monitoring**
  Get Slack or email alerts on promotion status and track real-time progress.


By defining Promotion Flows, teams can ensure reliability, repeatability, and security while moving applications from development to production.

Read more [Promotion Flows]({{site.baseurl}}/docs/promotions/promotions/promotion-flow/).


## Get started with Codefresh GitOps Cloud
Ready to get started? You can sign up for a [free 45-day trial](https://codefresh.io/codefresh-signup/){:"\_blank"} to try Codefresh GitOps Cloud for yourself. 

Want to learn more? Explore our [quick start guides]({{site.baseurl}}/docs/gitops-quick-start/gitops-quick-start/) which take you from start to deployment.

