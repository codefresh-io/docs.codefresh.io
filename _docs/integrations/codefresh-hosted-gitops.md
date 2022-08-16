---
title: "Codefresh Hosted GitOps Integration"
description: "Connect with Codefresh Hosted GitOps to leverage Managed Argo CD"
group: integrations
toc: true
---

Integrate Codefresh Classic with Codefresh's Hosted GitOps for deployments powered by managed Argo CD.
Codefresh Hosted GitOps includes a dedicated report image step that both reports and enriches deployed images. Add the report image step in your Codefresh Classic pipeline and reference the different integrations for Codefresh to retrieve and enrich the image information.  

You can continue to use your Codefresh Classic pipelines with the full power and functionality of Hosted GitOps.  
For a brief overview of what you get with Codefresh Hosted GitOps, read the next section.  

For information on how to connect Codefresh Classic to Codefresh Hosted GitOps, see [CI integration with Codefresh Classic](https://codefresh.io/csdp-docs/docs/integrations/ci-integrations/codefresh-classic/){:target="\_blank"}.

### Codefresh Hosted GitOps features

#### Hosted and hybrid runtimes
Codefresh Hosted GitOps is based on a hosted environemt, with the runtime hosted and managed by Codefresh.  

After the three-step process of provisioning your hosted runtime, Codefresh handles administration and maintenance of the hosted runtime, including version and security updates.    

#### Dashboards for visibility and traceability

A set of dashboards provides visibility into all aspects of deployment:  

* The Home dashboard presents enterprise-wide deployment highlights across runtimes and clusters.  
  Get insights into important KPIs and deployments, all in the same location. View status of runtimes and managed clusters, deployments, failed deployments with rollbacks, most active applications.  Use filters to narrow the scope to focus on anything specific.  

* The Applications dashboard displays applications, also across runtimes and clusters, from which you can select individual applications for further analysis.  
  Individual application information is grouped by current and historical deployments, enriched with Argo, Jira, and Git details, including rollout visualizations for ongoing deployments, and an interactive tree view of application resources.


* The DORA metrics dashboard in Codefresh helps quantify DevOps performance. Apart from the metrics themselves, the DORA dashboard in Codefresh has several unique features to pinpoint just which applications or runtimes are contributing to problematic metrics.  


#### Application management

Manage the application lifecycle in the Codefresh UI, from creating, editing, and deleting applications, to quick manual sync when needed.  


#### Third-party integrations
Add integrations to issue-tracking tools such as Jira, and container-registries such as Docker Hub, JFrog and more, to enrich images. 

