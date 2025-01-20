---
title: "About applications in GitOps"
description: "Unique features for Argo CD applications in Codefresh GitOps"
toc: true
---






## GitOps Applications
Applications in the GitOps context represent a declarative definition of infrastructure and services stored in Git repositories. These configurations ensure that the desired state of your system is always versioned, auditable, and easily recoverable in case of failure.

### Argo CD applications
In Argo CD, an application is a core concept representing a logical grouping of Kubernetes manifests. These manifests define what resources to deploy, where to deploy them and how to synchronize the live state with the desired state stored in Git.  
Argo CD automates synchronization, ensuring deployments remain consistent and preventing configuration drift. For example, an application that passes testing in the staging environment but encounters issues in production can be quickly traced and adjusted, thanks to Git as the single source of truth. This traceability ensures auditability and operational efficiency across environments.

### Argo CD applications with Codefresh GitOps
Codefresh GitOps builds on the foundation of Argo CD applications, adding unique capabilities that enhance context, deployment workflows, and lifecycle management.  

With Codefresh, you can:
Create full-featured, completely GitOps-compliant Argo CD applications in Form or YAML modes. The application manifest is generated, committed to Git, and synced to your cluster.
Create Applications Easily: Define applications in Form or YAML modes, with built-in validations to catch errors before committing changes to Git.
Maintain GitOps Compliance: Application manifests are auto-generated, committed to Git, and synchronized to your Kubernetes clusters, ensuring complete compliance with GitOps principles.

See 

## Codefresh GitOps features for integrating applications

### Environments and Argo CD applications
Environments represent stages in your software delivery process, such as testing, staging, or production.  

By associating applications with environments, you gain:
* Clear visibility into which applications are deployed in which environment
* A structured progression for applications as they move through your development lifecycle



### Products and Argo CD applications
Products group related applications, providing context for managing and deploying multiple applications as cohesive units. 

{% include
image.html
lightbox="true"
file="/images/gitops-products/apps-grouped-by-product.png"
url="/images/gitops-products/apps-grouped-by-product.png"
alt="Applications grouped by products"
caption="Applications grouped by products"
max-width="60%"
%}

This approach simplifies complex deployments by enabling you to:
* Coordinate related applications across environments.
* Manage promotions at the product level for a unified view of application performance and health. 

For details, see About Products.

### Promotions and Argo CD applications
Promotions are a critical part of application delivery in Codefresh GitOps.  

They streamline deployment processes by:
* Automating application delivery across environments and products
* Enforcing environment-specific checks, such as compliance and performance validations
* Governing promotions with policy-based gates, ensuring only approved changes move forward
* Simplifying complex multi-environment promotions, reducing manual effort and operational risks

By leveraging these promotion features, Codefresh GitOps enables you to design predictable, reusable delivery workflows tailored to your unique requirements.

## Dashboards for insights
Codefresh dashboards provide enterprise-wide visibility into your applications and deployments. Key dashboards include:

Applications Dashboard: Monitor application configurations, resources, and rollout progress.
DORA Dashboard: Track metrics like lead time for changes and deployment frequency.
Promotion Insights: Gain visibility into promotion workflows, policies, and outcomes. These insights help you optimize application performance and streamline deployment strategies.

## Getting started with applications
To begin managing GitOps applications in Codefresh:

Create an Application: Learn how to define your first Argo CD application.
Set Up Environments: Organize your applications across environments.
Group Applications into Products: Simplify management with cohesive product views.
Configure Promotion Flows: Automate application delivery using predefined workflows and policies.



Applications in the GitOps context represent a declarative definition of infrastructure and services stored in Git repositories. These configurations ensure that the desired state of your system is always versioned and auditable.

In Argo CD, , representing a collection of Kubernetes manifests that define the desired state of your application or infrastructure. These manifests are stored in a Git repository, adhering to the GitOps principle of managing configurations declaratively.

In Codefresh GitOps, applications are Argo CD applications, with the added advantage of our unique gitops capabilities that provide context and deployment 



## GitOps applications


Applications in the GitOps context represent a declarative definition of infrastructure and services stored in Git repositories. These configurations ensure that the desired state of your system is always versioned and auditable.



### Argo CD applications
In Argo CD, an application is a core concept representing logical groupings of Kubernetes manifests. They define what resources to deploy, where to deploy them, and how to keep the actual state synchronized with the desired state in Git. Argo CD automates this synchronization process and provides a robust framework for managing deployments. 
For example, an application might pass all the testing in the staging environment but fails when deployed to production. Argo CD helps prevent configuration drift and maintain state traceability by using Git as a single source of truth for all current and past deployments.


### Argo CD applications with Codefresh GitOps
Codefresh GitOps builds on the power of Argo CD applications and the GitOps pardigm  additional features tailored 
We support the complete lifecycle to create and deploy Argo CD applications within Codefresh.


Create full-featured Argo CD applications in Form or YAML modes. Built-in validations make it easy to identify and fix errors before commit.
The application is also completely GitOps-compliant. The application manifest is generated, committed to Git, and synced to your cluster.



Environments & Argo CD applications
Environments represent the various stages in your software delivery process, such as testing, staging, or production.  
Each environment serves a specific purpose, ensuring visibility into applications as they progress through development before reaching production.

Products & Argo CD applications
Products bridge the gap between environments and applications. Products group related Argo CD applications, offering a unified perspective as they transition through stages of development and deployment.
Products provide the much needed context between different but related applications, enabling streamlined management and deployment as a single entity.
By grouping and managing applications as cohesive units, products simplify coordination, enhance organization, and amplify your ability to manage complex deployments.
For details, see About Products.

Promotions & applications
We come to the critical or the final stage - the appication delivery process. Promotions in Codefresh GitOps streamline and automate the application delivery process, ensuring consistency and control across products and environments. With our unique promotion entities, you can eliminate the need for custom scripts, reduce operational overhead, and minimize manual errors by using predefined workflows and policies.

Some unique features Maintain precise control over which application properties are promoted, avoiding unnecessary promotions and keeping the process efficient.
Enforce environment-specific checks: Customize workflows to validate, ensure compliance, and conduct performance checks at different stages of promotion, tailoring the process for each environment.
Govern promotion behavior with policy-based gating: Define and enforce rules that combine workflows with Promotion Policies, ensuring promotions meet specific requirements for each product or environment.
Streamline complex promotion sequences: Automate multi-environment promotions, reducing manual effort while improving both accuracy and efficiency in the promotion flow.
By leveraging these features, Codefresh GitOps allows you to design predictable, reusable delivery lifecycles that integrate seamlessly with your existing workflows, improving overall

## Dashboards for insights
Our dashboards give you enterprise-wide visibility into deployments, key metrics, application promotion and more. From global analytics on applications and deployments (), to failure rate and lead time for changes (DORA dashboard), to application configuration, resource, and rollout management (Applications dashboard).


## Getting started with applications


