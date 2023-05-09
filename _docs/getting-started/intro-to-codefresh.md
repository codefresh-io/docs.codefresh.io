---
title: "What is Codefresh?"
description: "Understand the features and benefits of Codefresh"
group: getting-started
toc: true
---

Codefresh is a complete software lifecycle solution with modules for CI, CD and GitOps.   

## Codefresh & CI/CD

Codefresh is a cloud-native continuous integration and delivery platform that enables teams to quickly and efficiently develop, deploy, and manage cloud-native applications. 

Teams can quickly and easily build, test, and deploy their applications on any cloud platform, including Kubernetes, Docker, and AWS.  Our intuitive, easy-to-use UI helps streamline the development process. 

Codefresh is a _complete CI/CD solution_, not just CI, covering the full software lifecycle.  

View a release in the Kubernetes dashboard, click on the release to go to the Docker image, click on the Docker image to go to the build that created it, all from a single interface!


Codefresh works with all major Git platforms and cloud providers. There is no lock-in with any particular vendor. Unlike other CI/CD platforms which can be tightly coupled to a single Git provider, or a specific vendor or set of tools, Codefresh is agnostic to both Git providers and target platforms.

Codefresh has a strong focus on containers/Kubernetes but can also be used for traditional applications that run on Virtual machines or physical datacenters.


### CI/CD pipelines

Everything in Codefresh CI/CD starts and ends with pipelines. 

A Codefresh pipeline has two distinct aspects, the specification that defines the pipeline, and steps that are essentially a collection of Docker images that define the jobs and CI and CD processes to implement.
  
To see how pipelines work, start with [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/), or jump to [pipeline creation]({{site.baseurl}}/docs/pipelines/pipelines/).

For ready-to-use collections of pipeline steps, check out our [built-in steps]({{site.baseurl}}/docs/pipelines/steps/), or jump to [pipeline creation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/) and our [Plugin marketplace](https://codefresh.io/steps/){:target="\_blank"}.

### Integrations

For a seamless CI/CD experience, Codefresh has native integrations with almost every major Git or Cloud provider.
Easily connect Git providers, registry providers, storage providers, secret stores, and notification channels.  

Docker registries and all cluster integrations are automatically available to all pipelines, without  Docker login commands or `kubectl` commands to set up a Kube context inside your pipeline.


### Dashboards and insights

Dashboards are key to providing the right information at the right time.

Codefresh has dedicated dashboards for Helm and Kubernetes, and a different dashboard that combines Helm and Kubernetes information in the same location. 

* Helm Boards  
  A special environment dashboard to track your applications as they move within your infrastructure (e.g., Dev, QA, Prod), and shift Helm releases between environments.
  See [Promoting Helm environments]({{site.baseurl}}/docs/deployments/helm/helm-environment-promotion/).
* 
Helm Releases  
  Here's where you can see everything about the cluster, including current status, currently deployed releases, their previous revisions including change tracking, and even rollbacks.
  See [Managing Helm releases]({{site.baseurl}}/docs/deployments/helm/helm-releases-management/).

* Kubernetes Services
  Track the state of your Kubernetes clusters, and even manage services if you have the appropriate access privileges.  
  See [Managing Kubernetes clusters]({{site.baseurl}}/docs/deployments/kubernetes/manage-kubernetes/).

* Environment Dashboard
  For both Kubernetes and Helm releases, see cluster status and pipeline information.  
  See [Environment dashboard]({{site.baseurl}}/docs/deployments/kubernetes/environment-dashboard/).


### Where to go from here
Here are several useful links to further explore CI/CD with Codefresh:

**Quick starts**  
To get up and running, follow our quick starts. The quick start modules are a series of flows that guide you from setting up your first account in Codefresh, to creating a basic pipeline, and deploying to Kubernetes.
See [CI/CD quick start]({{site.baseurl}}/docs/quick-start/ci-quick-start/).

**Example catalog**  
If you are familiar with CI/CD, we have an extensive collection of examples that cover several CI and CD scenarios: 
[CI examples]({{site.baseurl}}/docs/example-catalog/ci-examples/)
[CD examples]({{site.baseurl}}/docs/example-catalog/cd-examples/)

**Guides**  
And finally, you can dive in to our detailed guides. Look for CI/CI guides in the documentation such as [Packaging/Compilations]({{site.baseurl}}/docs/ci-cd-guides/packaging-compilation/) and [Building Docker images]({{site.baseurl}}/docs/ci-cd-guides/building-docker-images/)


## Codefresh & GitOps with Argo CD

GitOps provides a way to manage cloud-native applications using Git as the source of truth. Teams can define the desired state of their applications and Kubernetes clusters in a Git repository and then automatically deploy the applications to Kubernetes clusters. 

Codefresh is a full-featured, turn-key solution for application deployments and releases powered by Argo CD. By combining GitOps with Codefresh, teams can create Argo Workflows and Argo Applications to seamlessly build, test, and deploy their applications. 


**GitOps Runtimes**
You can use [your own GitOps Runtime]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/) or get started quick with a [runtime hosted by Codefresh]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).

Codefresh offers security, maintainability, traceability, and most importantly, a single control plane for all stakeholders, be they developers, operators, product owners or project managers.

### Codefresh & open source Argo
Codefresh brings the power of the Argo project to your Kubernetes deployments:

* Argo CD for declarative continuous deployment
* Argo Rollouts for progressive delivery
* Argo Workflows as the workflow engine
* Argo Events for event-driven workflow automation framework

Codefresh unified all 4 projects of the Argo family into a single *Runtime*, providing an enterprise-supported version of all projects enhanced with unique functionality.

>Our users rely on the Codefresh platform to deliver software, reliably and predictably, without disruptions.
To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh. Typically, new versions of Argo are available in the Codefresh Runtime within 30 days of their release.

### Argo CD applications and deployments

Codefresh supports the complete lifecycle for creating and deploying Argo CD applications.  

You can create full-featured Argo CD applications in Form or YAML modes in the Codefresh UI. Every action you take in the Codefresh GUI results in a Git commit behind the scenes. The application manifest is generated, committed to Git, and synced to your cluster. See [Creating]({{site.baseurl}}/docs/deployments/gitops/create-application/) and [Managing]({{site.baseurl}}/docs/deployments/gitops/manage-application/) GitOps applications.   

Track the deployed applications in the GitOps Apps dashboard. See [Monitoring GitOps applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/).

### GitOps image enrichment

Image enrichment adds to the quality of deployments by exposing metadata such as feature requests, pull requests, and logs as part of the application’s deployment, for visibility into all aspects of the deployment, making it easier to track actions and identify root cause of failures.  

You can use your own third-party CI platforms and tools, such as Jenkins, GitHub Actions, or Codefresh pipelines to enrich and report images to the Codefresh platform with no disruptions to existing CI processes and flows.

Add integration accounts in Codefresh to tools such as Jira, Docker Hub, Quay and, and then connect your CI tool with Codefresh for image enrichment and reporting.

We offer a pipeline step that both reports the image to GitOps and enriches it.  
See [GitOps image enrichment with integrations]({{site.baseurl}}/docs/gitops-integrations/image-enrichment-overview/).

### Dashboards for GitOps insights

Dashboards are key to providing the right information at the right time. Similar to our CI/CD dashboards, we have dedicated dashboards optimized for GitOps, for all stakeholders, developers, product owners, and management.

**Operational GitOps dashboard** 

The GitOps and the Argo Workflows Dashboards in the Home Dashboard display the most commonly needed application and environmental information to developers so that they can troubleshoot without needing assistance from the DevOps teams, even in production.  
See [Home Dashboard]({{site.baseurl}}/docs/dashboards/home-dashboard/).  


**DORA metrics** 

Developers often need to reach out to DevOps to get statistics and metrics around builds and deployments. Codefresh automatically generates DORA metrics as well as many other key indicators of build and deployment efficiency. These analytics are presented to be easily understood by product owners and management alike.

See [DORA metrics]({{site.baseurl}}/docs/dashboards/dora-metrics/).

**Applications dashboard**  
The GitOps Apps dashboard displays a unified view of applications across runtimes and clusters. No matter what the volume and frequency of your deployments, the GitOps dashboard makes it easy to track them. Search for Jira issues, commit messages, committers, and see exactly when and if the change was applied to a specific application.

Drill down into an application to view resources, timelines, services and more.
See [Monitoring GitOps applications]({{site.baseurl}}/docs/deployments/gitops/applications-dashboard/).


### Where to go from here

To get up and running, follow our quick starts. The quick start modules are a series of flows that guide you from setting up your first account in Codefresh, to creating and deploying an application.

See [GitOps quick start]({{site.baseurl}}/docs/quick-start/gitops-quick-start/).


