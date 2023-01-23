---
title: "WIP: Concepts in Codefresh"
description: "Understand terminology and nuances in Codefresh"
group: getting-started
toc: true
---
<!--- remove WIP from header once complete -->
Familiarize yourself with the main concepts in Codefresh (listed in alphabetical order).

## Applications
An application is a deployment to a Kubernetes or any Kubernetes-compatible cluster or clusters.
Codefresh supports two types of applications:
* Containerized applications packaged as Docker images or 
* Argo CD applications 

**Containerized applications**  
Containerized applications are compiled, packaged, and deployed through Codefresh pipelines. Codefresh has native support for Docker artifacts, and also supports non-Dockerized applications that don’t use a Dockerfile for the actual build.

Deploy an application directly to Kubernetes through the Codefresh UI, or use Helm as a package manager to deploy to Kubernetes, again from Codefresh. 
Codefresh offers several levels of visibility into your deployments :
* The Kubernetes dashboard displays the status of pods and Docker images.
* The Helm dashboard displays the applications deployed to the cluster through Helm packages.
* The Environment dashboard displays both Helm and Kubernetes releases, the status of the cluster, and most importantly that of the builds that affect it. 

See:  
Quick starts for [Kubernetes]({{site.baseurl}}/docs/quick-start/ci-quickstart/deploy-to-kubernetes/) and [Helm]({{site.baseurl}}/docs/quick-start/ci-quickstart/deploy-with-helm/) deployments  
[Deployment options for Kubernetes]({{site.baseurl}}/docs/deployments/kubernetes/deployment-options-to-kubernetes/)  
[Using Helm in Codefresh pipelines]({{site.baseurl}}/docs/deployments/helm/using-helm-in-codefresh-pipeline/)  


**Argo CD applications**  
Argo CD applications conform to Argo CD's application definition CRD (Custom Resource Definition). Argo CD supports several types of Kubernetes manifests, including Jsonnet, Kustomize applications, Helm charts, and YAML/json files, and supports webhook notifications from Git. 

Create Argo CD applications that are fully GitOps-compliant in Codefresh. Identify and fix errors before commit with our built-in validations. The application manifest is generated, committed to Git, and synced to your cluster.   
See:
[Creating]({{site.baseurl}}/docs/deployments/gitops/create-application/) and [Managing]({{site.baseurl}}/docs/deployments/gitops/manage-application/) GitOps applications  


Just as with Dockerized applications, you get full visibility into the applications and their deployment through the global Analytics, DORA metrics, and the Application dashboards. The Applications dashboard shows the current state of all the resources in the application, including information for each resource, and possible actions.  
See:
[Monitoring applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/) 


## Pipeline
The pipeline is the central component in Codefresh that implements CI/CD processes. Everything for CI/CD in Codefresh starts and ends with pipelines.  

Codefresh pipelines can do only CI, only CD, both CI and CD, or run any custom action, such as unit and integration tests.
A CI pipeline can compile and package code, build and push Docker images. A CD pipeline can deploy applications/artifacts to VMs, Kubernetes clusters, FTP sites, S3 buckets, and more. And a CI/CD pipeline can combine code compilation, integration, and deployment for full CI/CD. 

Codefresh offers a rich set of capabilities to easily create and maintain pipelines such as ready-to-use steps for common tasks, system and user-defined variables, shared configurations for resuse, and more.

See:  
[Introduction to Codefresh pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)  
[Pipeline definitions YAML]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  

## Project
A project is a top-level entity in Codefresh for grouping related pipelines. Projects can group pipelines according to any criteria that is relevant to your enterprise. The criteria can be logical and based on teams, departments, or location for example, or functional, and based on microservices in applications. 
Projects centralize viewing and configuration settings for the pipelines that belong to them:
* Selecting  a pipeline shows the other pipelines in the same project
* Access control and user-defined variables for the project are inherited by all the pipelines assigned to the project

There are no limits to the number of projects you can create in your account. You can also create standalone pipelines and assign them later to a project, or detach a pipeline assigned to a project. 

See [Projects in pipelines]({{site.baseurl}}/docs/pipelines/pipelines/#pipeline-concepts).

## Runner
The Runner is the hybrid installation option for pipelines in your Codefresh account. The Runner is installed as a Kubernetes native application on any Kubernetes-compliant cluster. It allows you to run pipelines on your own Kubernetes cluster, including private clusters behind company firewalls.

Codefresh Runner gives you: 
* Access to secure services (such as Git repositories or databases) that are behind the firewall and normally not accessible to the public cloud.
* The ability to use special resources in your Codefresh pipeline that are unique to your application, GPU nodes or other special hardware only present in your data center.
* Complete control over the build environment in addition to resources for pipelines.

Every Runner installation creates a runtime environment in your account. Assign the Runner to any pipeline to automatically run the pipeline in your own cluster. External integrations (such as Docker registry or Helm repositories) are also available to the Runner making pipelines exactly the same regardless of their runtime environment.

You can have multiple Runner installations in the same Codefresh account. A Runner can also manage multiple remote clusters in your account. 

See [Codefresh Runner installation]({{site.baseurl}}/docs/installation/codefresh-runner) and [Runner installation behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall)  

## Runtime
A Runtime in Codefresh is a  GitOps installation in your Codefresh account, in either a Hosted or Hybrid installation environment. Hosted Runtimes are installed on a Codefresh cluster and managed by Codefresh. Hybrid Runtimes are installed on customer clusters, and managed by the customers.
You can install a  single Hosted runtime, and multiple Hybrid Runtines in a Codefresh account.  


<!--add diagram -->
A single Runtime can connect to and manage multiple remote clusters.  


See:  
[GitOps runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/#gitops-architecture)  
[Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops)  
[Hosted GitOps Runtime installation]({{site.baseurl}}/docs/installation/gitops/hosted-runtime)


## Triggers
Triggers are events that launch pipelines and Argo Workflows in Codefresh. 

Codefresh pipelines offer a rich set of triggers. You have triggers based on code-repository events triggers (Git triggers), triggers based on events in external systems (Docker Hub, Azure, Quay, and more), and triggers based on scheduled jobs (Cron).  
See:
[Triggers in Codefresh pipelines]({{site.baseurl}}/docs/pipelines/triggers/)  

For Argo Workflows in Codefresh, triggers are managed by Argo Events. You can define the event-source and the Sensor that determines if and when to trigger the event. Codefresh supports Git and Cron events for Argo Workflows.

To enable Argo Workflows in Codefresh, contact support.

See:  
[Trigger conditions for events]({{site.baseurl}}/docs/workflows/create-pipeline/#configure-trigger-conditions-for-events)



## Argo Workflows

A workflow is a type of Kubernetes resource that lets you define and run automated workflows, and stores their state. 
Argo Workflows is an open source workflow engine that orchestrates parallel tasks on Kubernetes, implemented as a set of Kubernetes custom resource definitions (CRDs). 

Argo Workflows is part of the Argo project, which provides Kubernetes-native software delivery tools including Argo CD, Argo Events and Argo Rollouts. 


## Related articles
[Codefresh for CI]({{site.baseurl}}/docs/getting-started/ci-codefresh/)  
[Codefresh for CD]({{site.baseurl}}/docs/getting-started/cd-codefresh/)   
[Codefresh for GitOps]({{site.baseurl}}/docs/getting-started/gitops-codefresh/)  
