---
title: "WIP: Codefresh for GitOps"
description: "GitOps and Argo CD with Codefresh"
group: getting-started
toc: true
---

This article reviews the concepts of GitOps and Argo CD, and how Codefresh integrates with and implements both.


## GitOps
Weaveworks, who introduced the concept of GitOps, describes it as "a way of implementing Continuous Deployment for cloud native applications. It focuses on a developer-centric experience when operating infrastructure, by using tools developers are already familiar with, including Git and Continuous Deployment tools."

At the root of the GitOps paradigm is having "Git as the single source of truth". All operations are executed only via Git. Git repositories are the source-control systems that declaratively describe applications and infrastructure using code. The continuous integration and continuous delivery processes then synchronize these changes with the live environments, making sure that the state in production always matches the desired state in Git.

The main principles of GitOps:

* The state of the system/application is always stored in Git.
* Git is always the source of truth for what happens in the system.
* To change the state of the system, you need to perform a Git operation, such as creating a commit or opening a pull request. Deployments, tests, and rollbacks are controlled through the Git flow.
* A change in the Git state and therefore what is described in the Git repository, must match the state described in your deployment target, a cluster or any other deployment target.
* Hand-rolled deployments, ad-hoc cluster changes, and live configuration changes are NOT allowed. If a change needs to happen, it must first be committed to Git.

GitOps deployments have several advantages compared to traditional imperative deployments. The main advantage is that the Git repo represents the state of the system, and Git history is essentially the same thing as deployment history. Rollbacks are very easy to perform by simply using a previous Git hash.

Read more in our blog, [What is a GitOps workflow](https://codefresh.io/learn/gitops/gitops-workflow-vs-traditional-workflow-what-is-the-difference/){:target="\_blank"}.  

See also [Codefresh for GitOps & Argo CD]


## Argo CD

Argo CD is "a declarative, GitOps continuous delivery tool for Kubernetes."

Argo CD uses a Kubernetes controller to constantly monitor the state of all resources in production and compare them against the desired states set in Git. When there are changes to the desired state, the controller detects them, and works to synchronize the production configuration to the desired configuration. 

Argo CD is also designed to work with Argo Rollouts, a progressive delivery tool for handling canary and blue/green deployments with robust support for most load balancers in use today. 


## Codefresh for GitOps & Argo CD 

Where does Codefresh come into play with GitOps and Argo CD?

Codefresh is the easiest way to get started with GitOps and Argo CD. Codefresh leverages Argo components to have the entire desired state applied from Git to your Kubernetes cluster, and then reported back to Codefresh.

If you review the main GitOps principles, you can 
Every state change operation in Codefresh is made via Git
Codefresh audit log is derived from the Git changelog
Codefresh access control is derived from Git permissions

From our runtimes, to applications, and deployments, 


## GitOps Runtimes 

Codefresh offers two models for GitOps deployments:  

* Hosted GitOps, which is a fully-managed version of Argo CD. The runtime for Hosted GitOps is hosted on a Codefresh cluster (easy setup) and managed by Codefresh (zero maintenance overhead).  
  If you already have Argo CD installations, this is the option for you. Click once to provision the hosted runtime, and start deploying applications to clusters without having to install and maintain Argo CD.

* Hybrid GitOps, which is a customer-managed version of Argo CD. The Hybrid GitOps runtime is hosted on the customer cluster and managed by the customer.  
  The Hybrid GitOps offering retains runtimes within the customer infrastructure to comply your security while giving you the power of Argo CD with Codefresh’s CI and CD tools, to help achieve continuous integration and continuous delivery goals.

Review [GitOps runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-architecture).  
For installation, see [Hosted GitOps setup]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/) and [Hybrid GitOps installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/).

## Argo CD applications

Codefresh supports the complete lifecycle to create and deploy Argo CD applications that are GitOps compliant. The application manifest is generated, committed to Git, and synced to your cluster.  
The Codefresh UI makes it easy to create full-featured Argo CD applications in Form or YAML modes, with built-in validations make it easy to identify and fix errors before commit.  

See [Creating]({{site.baseurl}}/docs/deployments/gitops/create-application/) and [Managing]({{site.baseurl}}/docs/deployments/gitops/manage-application/) GitOps applications. 

Once deployed, our dashboards give you enterprise-wide visibility into deployments and key metrics, and alerts you to production versus Git state discrepancies.
From global analytics on applications and deployments (Home dashboard), to failure rate and lead time for changes (DORA dashboard), to application configuration, resource, and rollout management (Applications dashboard). 

See:  
[Home]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  
[Monitoring applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/)  

## Codefresh & the Argo Project 
Codefresh brings the power of the Argo project to your Kubernetes deployments:

Argo CD for declarative continuous deployment
Argo Rollouts for progressive delivery
Argo Workflows as the workflow engine
Argo Events for event-driven workflow automation framework

Codefresh creates a conformed fork of the Argo project, providing an enterprise-supported version of the same, enhanced with unique functionality.

>Our users rely on the Codefresh platform to deliver software, reliably and predictably, without disruptions. To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh. Typically, new versions of Argo are available within 30 days of their release.

## Related articles
[Codefresh for CI]({{site.baseurl}}/docs/getting-started/ci-codefresh/)  
[Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/)    
[Concepts in Codefresh]({{site.baseurl}}/docs/getting-started/concepts/)   
