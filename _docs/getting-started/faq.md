---
title: "Frequently asked questions"
description: ""
group: getting-started
---
We have collected a few of the common questions on the Codefresh Software Development Platform (CSDP).

Navigate to our [classic FAQ](https://codefresh.io/docs/docs/getting-started/faq/){:target="\_blank"} for questions that are not specific for CAP


**Q. What is the Codefresh Software Development Platform (CSDP)?**  

A. The Codefresh Software Delivery Platform (CSDP), is a full-featured, turn-key solution for application deployments and releases. Powered by the Argo Project, CSDP uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments.   

**Q. Which deployment environments does CSDP support?**  

A. The current release of CSDP supports hybrid deployment environments. Stay tuned for our announcement on support for SaaS and on-premises deployments.   

**Q. How does CSDP relate to Open Source Argo?**   

A. CSDP creates a conformed fork of the Argo Project. You get an enterprise-supported version of the Agro Project comprising Argo Workflows, Argo Events, Argo CD, and Argo Rollouts. You can take advantage of the Argo Project offering, with the extended functionality that CSDP brings to it.

**Q. I already have a Kubernetes cluster with Argo CD. Can I install CSDP on the same cluster?**  

A. CSDP must be installed on a clean Kubernetes cluster without any Argo Project components. Because we create a conformed fork of the Argo Project in CSDP, installing it on a cluster with Argo components creates a conflict that will cause the installation to fail.

**Q. I have resources on my Kubernetes cluster that I want to use in CSDP. What should I do?**   

A. We will be giving detailed instructions on migrating resources from Kubernetes clusters to CSDP-based Kubernetes clusters.       

**Q. Does CSDP support all Git providers?**  
A. At the time of writing, CSDP supports GitHub. We are working to quickly extend support to GitLab and Bitbucket. Stay tuned.


## Migration from Classic Codefresh

**Q. I have Codefresh Classic. Can I migrate to CSDP?**  
A. At the time of writing, we are working on making the migration from Classic Codefresh to CSDP as seamless as possible. Stay tuned for the migration announcement.

