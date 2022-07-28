---
title: "Introducing Codefresh"
description: ""
group: getting-started
toc: true
---

Codefresh is a full-featured, turn-key solution for application deployments and releases. Powered by Argo, Codefresh uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments.  

Codefresh offers security, maintainability, traceability, and most importantly, a single control plane for all stakeholders, be they developers, operators, product owners or project managers.
 
With Codefresh, you can:
 
* Deliver software at scale by managing hundreds or thousands of deployment targets and applications
* Get a secure, enterprise-ready distribution of Argo with built-in identity, RBAC (role-based access control), and secrets
* Gain clear visibility across all deployments and trace changes and regressions from code to cloud in seconds
* Get enterprise-level dedicated support for Argo deployments
* Get insights into every aspect of your CI/CD with smart dashboards 
* Manage multiple runtimes and multiple clusters in a single pane of glass

 
### Codefresh deployment models

Codefresh supports hosted and hybrid deployments:  

* **Hosted** deployment or Hosted GitOps, a hosted and managed version of Argo CD. The SaaS version of Codefresh, the runtime is hosted on a Codefresh cluster (easy setup) and managed by Codefresh (zero maintenance overhead).   
Click once to provision the hosted runtime, and start deploying applications to clusters without having to install and maintain Argo CD.  


* **Hybrid** deployment, with the runtime hosted on the customer cluster and managed by the customer.  
The hybrid offering retains runtimes within the customer infrastructure while giving you the power of Argo CD with Codefresh's CI and CD tools, to help achieve continuous integration and continuous delivery goals.  

For details, see [Codefresh architecture]({{site.baseurl}}/docs/getting-started/architecture).


### Codefresh and open source Argo
Codefresh brings the power of the Argo project to your Kubernetes deployments:  

* Argo CD for declarative continuous deployment 
* Argo Rollouts for progressive delivery 
* Argo Workflows as the workflow engine 
* Argo Events for event-driven workflow automation framework

Codefresh creates a conformed fork of the Argo project, providing an enterprise-supported version of the same, enhanced with unique functionality.


 
### Codefresh and GitOps
Codefresh is GitOps-centric, and supports GitOps from the ground up. Codefresh leverages Argo components to have the entire desired state applied from Git to your Kubernetes cluster, and then reported back to Codefresh.  
In addition:  

* Every state change operation in Codefresh is made via Git  
* Codefresh audit log is derived from the Git changelog  
* Codefresh access control is derived from Git permissions  

For details, see [entity model]({{site.baseurl}}/docs/getting-started/entity-model) and [access control]({{site.baseurl}}/docs/administration/access-control).
 

### Insights in Codefresh
Codefresh makes it easy to both access and visualize critical information for any CI/CD resource at any stage, at any level, and for anyone, from managers to DevOps engineers. 

{::nomarkdown}
<br>
 {:/}

#### Global deployment analytics  

The Home dashboard presents system-wide highlights in real-time, making it an ideal tool for management.  
Get insights into important KPIs for entities across runtimes and clusters, in the same location. View status of runtimes and managed clusters, deployments, failed deployments with rollbacks, most active applications, and Delivery Pipelines.  

{% include
 image.html
 lightbox="true"
 file="/images/incubation/home-dashboard.png"
 url="/images/incubation/home-dashboard.png"
 alt="Global deployment analytics"
 caption="Global deployment analytics"
    max-width="70%"
%}

{::nomarkdown}
<br>
 {:/}

#### DORA metrics

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

{::nomarkdown}
<br>
 {:/}

#### Application analytics and analysis

The Applications dashboard displays a unified view of applications across runtimes and clusters. No matter what the volume and frequency of your deployments, the Applications dashboard makes it easy to track them. Search for Jira issues, commit messages, committers, and see exactly when and if the change was applied to a specific application.  

See [Applications dashboard]({{site.baseurl}}/docs/deployment/applications-dashboard/).

{::nomarkdown}
<br>
 {:/}

#### Delivery Pipelines
The Delivery Pipelines dashboard displays aggregated performance analytics based on the pipeline’s workflows, including step analytics across all the workflows in the pipeline. 

{::nomarkdown}
<br>
 {:/}

#### Workflows
View and monitor submitted workflows across all pipelines in the Workflows dashboard. Select a time range, or view up to fifty of the most recent workflows for all the pipelines in the runtime. Drill down to any workflow for further analysis.
{::nomarkdown}
<br>
 {:/}

### CI/CD resources in Codefresh
Wizards make it easy to create delivery pipelines and applications. Smart views and options make it easier to monitor and manage them.  
{::nomarkdown}
<br><br>
 {:/}

#### Delivery Pipelines

Delivery Pipelines are where the CI magic happens in Codefresh. Our pipeline creation wizard removes the complexity from creating, validating, and maintaining pipelines. Every stage has multi-layered views of all the related Git change information for the pipeline.  
See [Create delivery pipelines]({{site.baseurl}}/docs/pipelines/create-pipeline/).  

{::nomarkdown}
<br>
 {:/}

#### Workflows 
Drill down into a workflow to visualize the connections between the steps in the workflow.
A unique feature is the incorporation of Argo Events into the workflow visualization. You get a unified view of Argo Events and Argo Workflows in the same location, the events that triggered the workflow combined with the workflow itself.

{::nomarkdown}
<br>
 {:/}

#### Workflow Templates
Select from ready-to-use Workflow Templates in the Codefresh Hub for Argo or create your own custom template. The **Run** option allows you to test a new Workflow Template, or changes to an existing template, without needing to first commit the changes.
 
 {% include 
	image.html 
	lightbox="true" 
	file="/images/whats-new/wrkflow-template-main.png" 
	url="/images/whats-new/wrkflow-template-main.png" 
	alt="Workflow Templates" 
	caption="Workflow Templates"
  max-width="70%" 
  %}

{::nomarkdown}
<br>
 {:/}

#### Applications
Create GitOps-compliant applications, and manage the application lifecycle in the Codefresh UI.

Define all application settings in a single location through the intuitive Form mode or directly in YAML, and commit all changes to Git.  
For easy access, after commit, the configuration settings are available in the Applications dashboard along with the deployment and resource information.

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

### GitOps CI integrations

If you have Hosted GitOps, and your own CI tools for pipelines and workflows, enrich your deployments with CI information without disrupting existing processes.  
Simply connect your CI tools to Codefresh, and our new report image template retrieves the information.  For example, add the report image step in your GitHub Actions pipeline and reference the different integrations for Codefresh to retrieve and enrich the image with Jira ticket information.  

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


### What to read next
[Quick start tutorials]({{site.baseurl}}/docs/getting-started/quick-start)