---
title: "Introducing CSDP"
description: ""
group: getting-started
toc: true
---

The Codefresh Software Delivery Platform (CSDP), is a full-featured, turn-key solution for application deployments and releases. Powered by the Argo Project, CSDP uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments.  

CSDP offers security, maintainability, traceability, and most importantly, a single control plane for all stakeholders, be they developers, operators, product owners or project managers.
 
With CSDP teams can:
 
* Deliver software at scale by managing hundreds or thousands of deployment targets and applications
* Get a secure, enterprise-ready distribution of Argo with built-in identity, RBAC (role-based access control), and secrets
* Gain clear visibility across all deployments and trace changes and regressions from code to cloud in seconds
* Get enterprise-level dedicated support for Argo deployments
 
### CSDP and open source Argo
CSDP brings you the power of the Argo project for your Kubernetes deployments:  

* Argo CD for declarative continuous deployment 
* Argo Rollouts for progressive delivery 
* Argo Workflows as the workflow engine 
* Argo Events for event-driven workflow automation framework

CSDP creates a conformed fork of the Argo project, providing an enterprise-supported version of the same, enhanced with unique functionality.
For details, see [CSDP architecture]({{site.baseurl}}/docs/getting-started/architecture).

 
### CSDP and GitOps
CSDP is GitOps centric, and supports GitOps from the ground up. CSDP leverages Argo components to have the entire desired state applied from Git to your Kubernetes cluster, and then reported back to CSDP.  And takes the GitOps approach a step further:  

* Every state change operation in CSDP is made via Git  
* The CSDP audit log is derived from the Git changelog  
* CSDP access control is derived from Git permissions  

For details, see [entity model]({{site.baseurl}}/docs/getting-started/entity-model) and [access control]({{site.baseurl}}/docs/administration/access-control).
 
### CSDP user interface
And finally, the CSDP UI gives you easy access to all the functionality, and visibility at all times to key information:  

* Runtimes management  
  View and manage all the runtimes in your deployment in the Runtimes dashboard. Get notified when versions are updated, view the changelog, and then decide if to upgrade. Detect health and sync errors at a glance in the Sync Status column. At any point, drill down into a runtime for detailed information on its components.
* Applications dashboards for CD tracking  
  No matter what the volume and frequency of deployments, our Application dashboards make it super easy to track them. Search for Jira issues, commit messages, committers, and see exactly when and if the change was applied to a specific application. 
* Pipelines for CI/CD  
  Pipelines are where all the magic happens in CSDP. Our pipeline creation wizard removes the complexity from creating, validating, and maintaining pipelines. Every stage has multi-layered views of all the related Git change information for the pipeline.  

### What to read next
[Quick start tutorials]({{site.baseurl}}/docs/getting-started/quick-start)