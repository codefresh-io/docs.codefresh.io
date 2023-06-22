---
title: "Hosted GitOps integration"
description: "Connect with our Hosted GitOps to leverage Managed Argo CD"
group: integrations
toc: true
---

Integrate Codefresh  pipelines with Hosted GitOps for deployments powered by managed Argo CD.  
  

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
file="/images/runtime/hosted-gitops-initial-view.png" 
url="/images/runtime/hosted-gitops-initial-view.png"
caption="Provisioning a Hosted GitOps runtime" 
alt="Provisioning a Hosted GitOps runtime" 
max-width="70%" 
%}

### Dashboards for visibility and traceability

A set of dashboards provide visibility into all aspects of deployment:  

* The GitOps Dashboard in the Home Dashboard presents enterprise-wide deployment highlights across runtimes and clusters.  
  Get insights into important KPIs and deployments, all in the same location. View status of runtimes and managed clusters, deployments, failed deployments with rollbacks, most active applications.  Use filters to narrow the scope to focus on anything specific.  

  {% include 
image.html 
lightbox="true" 
file="/images/reporting/home-dashboard-gitops.png" 
url="/images/reporting/home-dashboard-gitops.png"
caption="GitOps Dashboard"
alt="GitOps Dashboard" 
max-width="70%" 
%}

* The GitOps Apps dashboard displays applications, also across runtimes and clusters, from which you can select individual applications for further analysis.  
  Individual application information is grouped by current and historical deployments, enriched with Argo, Jira, and Git details, including rollout visualizations for ongoing deployments, and an interactive tree view of application resources.

{% include 
image.html 
lightbox="true" 
file="/images/applications/app-dashboard-main-view.png" 
url="/images/applications/app-dashboard-main-view.png"
caption="GitOps Apps dashboard" 
alt="GitOps Apps dashboard" 
max-width="70%" 
%}


* The DORA metrics dashboard in Codefresh helps quantify DevOps performance. Apart from the metrics themselves, the DORA dashboard in Codefresh has several unique features to pinpoint just which applications or runtimes are contributing to problematic metrics.  

{% include 
image.html 
lightbox="true" 
file="/images/reporting/dora-metrics.png" 
url="/images/reporting/dora-metrics.png"
caption="DORA Metrics dashboard" 
alt="DORA Metrics dashboard" 
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

### Hosted vs. hybrid environments

The table below highlights the main differences between hosted and hybrid environments.

{: .table .table-bordered .table-hover}
| Functionality           |Feature        |  Hosted                | Hybrid |
| --------------          | --------------|--------------- | --------------- |
| Runtime                 | Installation       | Provisioned by Codefresh   | Provisioned by customer       |
|                         | Runtime cluster   |Managed by Codefresh       | Managed by customer       |
|                         | Number per account | Only one runtime           | Multiple runtimes            |
|                         | Upgrade            | Managed by Codefresh     | Managed by customer |
|                         | External cluster   | Managed by customer        | Managed by customer         |
|                         | Uninstall          | Managed by customer        | Managed by customer |
| Argo CD                 |                    | Codefresh cluster          | Customer cluster  |
| CI Ops                  | Delivery Pipelines |Not supported               | Supported  |
|                         |Workflows           | Not supported              | Supported  |
|                         |Workflow Templates  | Not supported              | Supported  |
| CD  Ops                 |Applications        | Supported                  | Supported |
|                         |Image enrichment    | Supported                  | Supported  |
|                         | Rollouts           | Supported                  |  Supported  |
|Integrations             |                    | Supported                  | Supported  |
|Dashboards               |Home Analytics       | Hosted runtime and deployments|Runtimes, deployments, Delivery Pipelines |
|                         |DORA metrics         | Supported                 |Supported        |
|                         |Applications         | Supported                 |Supported        |

## Related articles
[CI integrations with GitOps]({{site.baseurl}}/docs/gitops-integrations/ci-integrations/)  
