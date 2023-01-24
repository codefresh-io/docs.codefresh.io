---
title: "Hosted GitOps integration"
description: "Connect with our Hosted GitOps to leverage Managed Argo CD"
group: integrations
redirect_from:
  - /docs/integrations/codefresh-hosted-gitops/
toc: true
---

Integrate Codefresh CI pipelines with Hosted GitOps for deployments powered by managed Argo CD.  
  

Codefresh Hosted GitOps includes a dedicated report image step that both reports and enriches deployed images. Add the report image step in your Codefresh CI pipeline and reference integrations with issue-tracking and container registry tools for Codefresh to retrieve and enrich image information.  

For a brief overview of what you get with Codefresh Hosted GitOps, read the next section.  

For information on how to connect to Hosted GitOps, see [CI integration with Codefresh pipelines]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/codefresh-classic/).

## Hosted GitOps features

### Hosted and hybrid runtimes
Codefresh Hosted GitOps is based on a hosted environemt, with the runtime hosted and managed by Codefresh.  

After the three-step process of provisioning your hosted runtime, Codefresh handles administration and maintenance of the hosted runtime, including version and security updates.    

{% include 
image.html 
lightbox="true" 
file="/images/integrations/codefresh-hosted-gitops/hosted-runtime.png" 
url="/images/integrations/codefresh-hosted-gitops/hosted-runtime.png"
caption="Provisioning a Hosted GitOps runtime" 
alt="Provisioning a Hosted GitOps runtime" 
max-width="70%" 
%}

### Dashboards for visibility and traceability

A set of dashboards provides visibility into all aspects of deployment:  

* The Home dashboard presents enterprise-wide deployment highlights across runtimes and clusters.  
  Get insights into important KPIs and deployments, all in the same location. View status of runtimes and managed clusters, deployments, failed deployments with rollbacks, most active applications.  Use filters to narrow the scope to focus on anything specific.  

  {% include 
image.html 
lightbox="true" 
file="/images/integrations/codefresh-hosted-gitops/hosted-home-dashboard.png" 
url="/images/integrations/codefresh-hosted-gitops/hosted-home-dashboard.png"
caption="Home dashboard in Hosted GitOps"
alt="Home dashboard in Hosted GitOps" 
max-width="70%" 
%}

* The Applications dashboard displays applications, also across runtimes and clusters, from which you can select individual applications for further analysis.  
  Individual application information is grouped by current and historical deployments, enriched with Argo, Jira, and Git details, including rollout visualizations for ongoing deployments, and an interactive tree view of application resources.

{% include 
image.html 
lightbox="true" 
file="/images/integrations/codefresh-hosted-gitops/hosted-app-dashboard.png" 
url="/images/integrations/codefresh-hosted-gitops/hosted-app-dashboard.png"
caption="Applications dashboard in Hosted GitOps" 
alt="Applications dashboard in Hosted GitOps" 
max-width="70%" 
%}


* The DORA metrics dashboard in Codefresh helps quantify DevOps performance. Apart from the metrics themselves, the DORA dashboard in Codefresh has several unique features to pinpoint just which applications or runtimes are contributing to problematic metrics.  

{% include 
image.html 
lightbox="true" 
file="/images/integrations/codefresh-hosted-gitops/hosted-dora-metrics.png" 
url="/images/integrations/codefresh-hosted-gitops/hosted-dora-metrics.png"
caption="DORA metrics in Hosted GitOps" 
alt="DORA metrics in Hosted GitOps" 
max-width="60%" 
%}

### Application management

Manage the application lifecycle in the Codefresh UI, from creating, editing, and deleting applications, to quick manual sync when needed.  


### Third-party integrations for image enrichment
Add integrations to issue-tracking tools such as Jira, and container-registries such as Docker Hub, JFrog and more, to enrich images. 

{% include 
image.html 
lightbox="true" 
file="/images/integrations/codefresh-hosted-gitops/hosted-int-tools.png" 
url="/images/integrations/codefresh-hosted-gitops/hosted-int-tools.png"
caption="Integrations in Hosted GitOps" 
alt="Integrations in Hosted GitOps" 
max-width="60%" 
%}

## Related articles
[CI integrations with GitOps]({{site.baseurl}}/docs/gitops-integrations/ci-integrations)  
