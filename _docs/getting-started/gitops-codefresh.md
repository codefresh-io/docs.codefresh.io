---
title: "Codefresh for GitOps"
description: "GitOps and Argo CD with Codefresh"
group: getting-started
toc: true
---

This article reviews the concepts of GitOps and Argo CD, and how Codefresh integrates with and implements both.


## GitOps

GitOps is a set of best practices for application/infrastructure deployment centered around the concept of using Git as the single source of truth.

You can read more about GitOps at [OpenGitOps.dev](https://opengitops.dev/).

 Git repositories are the source-control systems that declaratively describe applications and infrastructure using code. The continuous integration and continuous delivery processes synchronize these changes with live environments, making sure that the production state always matches the desired state in Git.

The entire application lifecycle is managed by Git.

The key difference is that while the traditional workflow is based on “pushing” new code changes through the pipeline to production, a GitOps workflow is a “pull” process in which new changes are submitted, and the GitOps agent detects and synchronizes them with the production environment.

Read more in our blog, [What is a GitOps workflow](https://codefresh.io/learn/gitops/gitops-workflow-vs-traditional-workflow-what-is-the-difference/){:target="\_blank"}.  



## Argo CD

Argo CD is "a declarative, GitOps continuous delivery tool for Kubernetes."

Argo CD uses a Kubernetes controller to constantly monitor the state of all resources in production and compare them against the desired states set in Git. When there are changes to the desired state, the controller detects them, and works to synchronize the production configuration to the desired configuration. 

Argo CD is also designed to work with Argo Rollouts, a progressive delivery tool for handling canary and blue/green deployments with robust support for most load balancers in use today. 


## Codefresh for GitOps & Argo CD 

Where does Codefresh come into play with GitOps and Argo CD?

Codefresh is the easiest way to get started with GitOps and Argo CD. Codefresh leverages Argo components to have the entire desired state applied from Git to your Kubernetes cluster, and then reported back to Codefresh.



## GitOps Runtimes 

Codefresh offers two models for GitOps deployments:  

* Hosted GitOps, which is a fully-managed version of Argo CD. The runtime for Hosted GitOps is hosted on a Codefresh cluster (easy setup) and managed by Codefresh (zero maintenance overhead).  
  If you already have Argo CD installations, this is the option for you. Click once to provision the hosted runtime, and start deploying applications to clusters without having to install and maintain Argo CD.

* Hybrid GitOps, which is a customer-managed version of Argo CD. The  Hybrid GitOps runtime is hosted on the customer cluster and managed by the customer.  
  The Hybrid GitOps offering retains runtimes within the customer infrastructure to comply your security rewhile giving you the power of Argo CD with Codefresh’s CI and CD tools, to help achieve continuous integration and continuous delivery goals.

Review [GitOps runtime architecture]({{site.baseurl}}/docs/installation/gitops/runtime-architecture/) and [Hybrid GitOps installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops-helm-installation/).

## Argo CD applications

Codefresh supports the complete lifecycle to create and deploy Argo CD applications.  

You can create full-featured Argo CD applications in Form or YAML modes. Built-in validations make it easy to identify and fix errors before commit.   

The application is also completely GitOps-compliant. The application manifest is generated, committed to Git, and synced to your cluster.   
See [Creating]({{site.baseurl}}/docs/deployments/gitops/create-application/) and [Managing]({{site.baseurl}}/docs/deployments/gitops/manage-application/) GitOps applications. 


Once deployed, our dashboards give you enterprise-wide visibility into deployments, and key metrics.
From global analytics on applications and deployments (), to failure rate and lead time for changes (DORA dashboard), to application configuration, resource, and rollout management (Applications dashboard). 

See:  
[Home]({{site.baseurl}}/docs/dashboards/home-dashboard/)  
[DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/)  
[GitOps Apps]({{site.baseurl}}/docs/dashboards/gitops-apps-dashboard/)  

## Codefresh & Argo Project  

Codefresh integrates Argo CD to your Kubernetes deployments through the Codefresh GitOps Runtime, providing an enterprise-supported version enhanced with unique functionality.

>**Argo CD release policy**  
Our users rely on the Codefresh platform for consistent and uninterrupted software delivery.   
To maintain this high standard, we rigorously test and refine new versions of Argo CD before integrating them into the Codefresh GitOps Runtime.   
Typically, new versions of Argo CD are available in the Codefresh Runtime within 30 days of their official release.


## Related articles
[Codefresh for CI]({{site.baseurl}}/docs/getting-started/ci-codefresh/)  
[Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/)    
[Concepts in Codefresh]({{site.baseurl}}/docs/getting-started/concepts/)   
[Introduction to Codefresh]({{site.baseurl}}/docs/getting-started/intro-to-codefresh/)
