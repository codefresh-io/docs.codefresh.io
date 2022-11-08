---
title: "Hosted GitOps"
description: ""
group: incubation
toc: true
---


Codefresh has enhanced our solution offering with Hosted GitOps, the SaaS version of Codefresh.  

What do you get with Hosted GitOps?  
In a nutshell, a hosted and managed version of Argo CD. From application analytics, to application creation, rollout, and deployment, you get the best of both worlds: Argo CD with unique features and functionality from Codefresh to help achieve your CD goals.  
What it also means is easy set up and zero maintenance overhead.  

Read on for more details. And check out our [blog](https://codefresh.io/blog/codefresh-upends-continuous-delivery-with-hosted-gitops-platform-featuring-dora-dashboards-and-first-class-integrations-for-ci/).

### Hosted runtimes

Setting up your hosted environment takes just a few clicks. All you need is a Codefresh account, a Git account, and a Kubernetes cluster to which to deploy your applications.
Codefresh guides you through the simple three-step process of provisioning your hosted runtime.  From that point, Codefresh handles administration and maintenance of the hosted runtime, including version and security updates.  

See [Set up a hosted (Hosted GitOps) environment]({{site.baseurl}}/docs/runtime/hosted-runtime/).

{% include
 image.html
 lightbox="true"
 file="/images/runtime/intro-hosted-hosted-initial-view.png"
 url="/images/runtime/intro-hosted-hosted-initial-view.png"
 alt="Hosted runtime setup"
 caption="Hosted runtime setup"
    max-width="80%"
%}

### Global deployment analytics  

The Home dashboard presents enterprise-wide deployment highlights, making it a useful management tool.  

Get insights into important KPIs and deployments, across runtimes and clusters, all in the same location. View status of runtimes and managed clusters, deployments, failed deployments with rollbacks, most active applications.  Use filters to narrow the scope to focus on anything specific.

{% include
 image.html
 lightbox="true"
 file="/images/incubation/home-dashboard.png"
 url="/images/incubation/home-dashboard.png"
 alt="Global deployment analytics"
 caption="Global deployment analytics"
    max-width="80%"
%}

### Application analytics and analysis

The Applications dashboard displays applications across runtimes and clusters, from which you can select and analyze individual applications. Individual application information is grouped by current and historical deployments, enriched with Argo, Jira, and Git details, including rollout visualizations for ongoing deployments (Timeline tab), and an interactive tree view of application resources (Current State tab).

See [Monitoring applications]({{site.baseurl}}/docs/deployment/applications-dashboard/).

{% include
 image.html
 lightbox="true"
 file="/images/applications/app-dashboard-main-view.png"
 url="/images/applications/app-dashboard-main-view.png"
 alt="Applications dashboard"
 caption="Applications dashboard"
    max-width="80%"
%}

### DORA metrics

DORA metrics has become integral to enterprises wanting to quantify DevOps performance, and Codefresh has out-of-the-box support for it.

Apart from the metrics themselves, the DORA dashboard in Codefresh has several features such as the Totals bar with key metrics, filters that allow you to pinpoint just which applications or runtimes are contributing to problematic metrics, and the ability to set a different view granularity for each DORA metric.  

See [DORA metrics]({{site.baseurl}}/docs/reporting/dora-metrics/).

{% include
 image.html
 lightbox="true"
 file="/images/incubation/intro-dora-metrics.png"
 url="/images/incubation/intro-dora-metrics.png"
 alt="DORA metrics"
 caption="DORA metrics"
    max-width="60%"
%}

### Application management

Manage the application lifecycle in the Codefresh UI, from creating, editing, and deleting them.  

Define all application settings in a single location through the intuitive Form mode or directly in YAML, and commit all changes to Git.  
For easy access, the configuration settings are available for editing in the Applications dashboard.

See [Applications]({{site.baseurl}}/docs/deployment/create-application/).

{% include
 image.html
 lightbox="true"
 file="/images/applications/add-app-general-settings.png"
 url="/images/applications/add-app-general-settings.png"
 alt="Application creation in Codefresh"
 caption="Application creation in Codefresh"
    max-width="60%"
%}

### Third-party CI integrations

If you have your own tools for CI pipelines and workflows, Hosted GitOps gives you the option to connect them to Codefresh and enrich deployment information with our new report image template.  For example, you can add the report image step in your GitHub Actions pipeline and reference the different integrations for Codefresh to retrieve and enrich the image information.

* Git PRs (Pull Requests), Commits, and Committer information directly from the code repositories
* Jira ticket information for correlation with deployed features  
* Docker Hub or Quay for image information

See [Image enrichment with integrations]({{site.baseurl}}/docs/integrations/image-enrichment-overview/).

{% include
 image.html
 lightbox="true"
 file="/images/incubation/github-action-int-settings.png"
 url="/images/incubation/github-action-int-settings.png"
 alt="Image enrichment with GitHub Actions integration"
 caption="Image enrichment with GitHub Actions integration"
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
