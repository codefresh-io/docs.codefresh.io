---
title: "Frequently asked questions"
description: ""
group: getting-started
---
We have collected a few of the common questions on the Codefresh solution.  

For questions on Codefresh Classic, navigate to our [FAQs for Codefresh Classic](https://codefresh.io/docs/docs/getting-started/faq/){:target="\_blank"}.


**Q. What is the Codefresh platform?**  

A. The Codefresh platform is a full-featured, turn-key solution for application deployments and releases. Powered by the Argo Project, Codefresh uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments.   

**Q. Which deployment environments does Codefresh support?**  

A. The current release of Codefresh supports hosted and hybrid deployment environments. Stay tuned for our announcement on support for on-premises deployments.   

**Q. How does Codefresh relate to Open Source Argo?**   

A. Codefresh creates a conformed fork of the Argo Project. You get an enterprise-supported version of the Argo Project comprising Argo Workflows, Argo Events, Argo CD, and Argo Rollouts. You can take advantage of the Argo Project offering, with the extended functionality that Codefresh brings to it.

**Q. I already have a Kubernetes cluster with Argo CD. Can I install Codefresh on the same cluster?**  

A. Hybrid runtimes must be installed on a clean Kubernetes cluster without any Argo Project components. Because we create a conformed fork of the Argo Project in Codefresh, installing it on a cluster with Argo components creates a conflict that will cause the installation to fail.

**Q. I have resources on my Kubernetes cluster that I want to use in Codefresh. What should I do?**   

A. We will be giving detailed instructions on migrating resources from Kubernetes clusters to Codefresh-based Kubernetes clusters.       

**Q. Does Codefresh support all Git providers?**  
A. At the time of writing, Codefresh supports GitHub. We are working to quickly extend support to GitLab and Bitbucket. Stay tuned.

**Q. What are the browser requirements for the Codefresh UI?**  

A. Officially, we support the latest version of the Chrome browser. Any browser released in the last couple of years should work without major issues.
The following browser versions are **NOT** supported:

{: .table .table-bordered .table-hover}
| Browser          | Version                 | Date released                  |
| -------------- | ---------------------------- |-------------------------|
| Chrome       | < 51 | May 2016 |
| Firefox  | < 54 |  Jun 2017 |
| Edge        | < 14 | Aug 2016 |
| Safari   | < 10  | Sep 2016 |


## Migration from Codefresh Classic

**Q. I have Codefresh Classic. Can I migrate to Codefresh?**  
A. At the time of writing, we are working on making the migration from Codefresh Classic to Codefresh as seamless as possible. Stay tuned for the migration announcement.

