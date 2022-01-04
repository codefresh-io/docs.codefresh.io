---
title: "Introducing Codefresh Software Delivery Platform"
description: ""
group: getting-started
toc: true
---


The Codefresh Software Delivery Platform (CSDP), is a full-featured, turn-key solution for application deployments and releases. Powered by the Argo Project, CSDP uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with functionality and features essential for enterprise deployments. CSDP offers security, maintainability, traceability, and most importantly, a single control plane for all stakeholders, be they developers, operators, product owners or project managers. 

PIC

CSDP brings all these tools into a single enterprise-ready platform that enables teams to:

* Deliver software at scale by managing hundreds or thousands of deployment targets and applications
* Get a secure, enterprise-ready distribution of Argo with built-in identity, RBAC, and secrets
* Gain clear visibility across all deployments and trace changes and regressions from code to cloud in seconds
* Get enterprise-level dedicated support for Argo deployments

### Codefresh Hub for Argo
Speaking of the amazing Argo community, we noticed that many practitioners building on Argo Workflows get stuck rebuilding the same steps over and over again. Because Codefresh has experience running a user-contributed marketplace with hundreds of millions of executions, we wanted to bring that functionality to Argo Workflows. At Codefresh Hub for Argo, users can find, use, and even contribute their own Argo Workflow Templates. To get things started, we’ve added some of our most popular steps, and we’re committed to bringing more and more. Best of all, these templates are tested and certified to not only work but also pass a thorough security review process.

These Argo Workflow templates can be used in the open-source version of Argo Workflows or within CSDP.

### Argo CD Autopilot
Argo CD is incredibly flexible but this sometimes leaves users wondering how best to organize their repos, how to promote changes between environments, and how to bootstrap, update and recover Argo CD itself. To solve these challenges we launched Argo CD Autopilot. Autopilot is a GitOps friendly way to set up, operate, and maintain Argo CD. It creates a scalable structure for your Git repos, can handle disaster recovery, and is just a joy to use. You can watch a demo here or read the docs.