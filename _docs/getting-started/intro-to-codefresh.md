---
title: "What is Codefresh?"
description: "Understand the features and benefits of Codefresh"
group: getting-started
toc: true
---

What is Codefresh?  A complete CI/CD and GitOps-powered Argo CD in the same product.   

## Codefresh & CI/CD

Codefresh is a cloud-native continuous integration and delivery platform that enables teams to quickly and efficiently develop, deploy, and manage cloud-native applications. Teams can quickly and easily build, test, and deploy their applications on any cloud platform, including Kubernetes, Docker, and AWS. With its robust automation capabilities and powerful integrations, teams can easily collaborate and quickly deliver high-quality software. Our intuitive, easy-to-use UI helps streamline the development process. 



Codefresh is a _complete CI/CD solution_, not just CI, covering the full software lifecycle.  
View a release in the Kubernetes dashboard, click on the release to go to the Docker image, click on the Docker image to go to the build that created it, all from a single interface. ! 

Codefresh works with all major Git platforms and cloud providers. There is no lock-in with any particular vendor. Unlike other CI/CD platforms which can be tightly coupled to a single Git provider, or a specific vendor or set of tools, Codefresh supports a fully programmtic implementation.



### CI/CD pipelines

Everything in Codefresh CI/CD starts and ends with pipelines. 
A Codefresh pipeline has two distinct aspects, specifications that define the pipeline, and steps that are essentially a collection of Docker images that define the jobs and CI and CD processes to implement.
  
To see how pipeline work, start with the [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/), or jump to [pipeline creation]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/).

For ready-to-use collections of pipeline steps, check out our [Plugin marketplace](https://codefresh.io/steps/){:target="\_blank"}

### Integrations
For a seamless CI/CD experience, Codefresh has native integrations with almost every major provider.
Easily connect Git providers, registry providers, storage providers, secret stores, and notification channels.  
Docker registry and all cluster integrations are automatically available to all pipelines. You don’t need Docker login commands or `kubectl` commands to set up a Kube context inside your pipeline.

Look for Pipeline Integrations in the documentation.

### Dashboards and insights
Dashboards are key to providing the right information at the right time.
Codefresh has dedicated dashboards for Helm and Kubernetes, and another dashboard that combines Helm and Kubernetes information in the same location. 

* Helm Boards  
  A special environment dashboard to track your applications as they move within your infrastructure (e.g., Dev, QA, Prod), and shift Helm releases between environments.

* Helm Releases  
  Here's where you can see everything about the cluster, including current status, currently deployed releases, their previous revisions including change tracking, and even rollbacks.

* Kubernetes Services
  Track the state of your Kubernetes clusters, and even manage services if you have the appropriate access privileges.

* Environment Dashboard
  For both Kubernetes and Helm releases, see cluster status and pipeline information.


### Where to go from here
Here are several useful links to further explore CI/CD with Codefresh:

**Quick starts**  
To get up and running, follow our quick starts. The quick start modules are a series of flows that guide you from setting up your first account in Codefresh, to creating a basic pipeline, and deploying to Kubernetes.
See [CI/CD quick starts]({{site.baseurl}}/docs/quick-start/ci-quick-start/).

**Example catalog**  
If you are familiar with CI/CD, we have an extensive collection of examples that cover several CI and CD scenarios: 
[CI examples]({{site.baseurl}}/docs/example-catalog/ci-examples/)
[CD examples]({{site.baseurl}}/docs/example-catalog/cd-examples/)

**Guides**  
And finally, if you want more meat, dive in to our detailed guides. Look for CI/CI guides in the documentation.


## Codefresh & GitOps with Argo CD

GitOps provides a way to manage cloud-native applications using Git as the source of truth. Teams can define the desired state of their applications and Kubernetes clusters in a Git repository and then automatically deploy the applications to Kubernetes clusters. 
Codefresh is a full-featured, turn-key solution for application deployments and releases. Powered by Argo, Codefresh uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments. By combining GitOps with Codefresh, teams can create Argo Workflows and Argo Applications to seamlessly build, test, and deploy their applications. 


GitOps Runtimes
Install Hosted or Hybrid GitOp R

Codefresh offers security, maintainability, traceability, and most importantly, a single control plane for all stakeholders, be they developers, operators, product owners or project managers.

Codefresh brings the power of the Argo project to your Kubernetes deployments:

Argo CD for declarative continuous deployment
Argo Rollouts for progressive delivery
Argo Workflows as the workflow engine
Argo Events for event-driven workflow automation framework
Codefresh creates a conformed fork of the Argo project, providing an enterprise-supported version of the same, enhanced with unique functionality.

Our users rely on the Codefresh platform to deliver software, reliably and predictably, without disruptions.
To maintain that high standard, we add several weeks of testing and bug fixes to new versions of Argo before making them available within Codefresh. Typically, new versions of Argo are available within 30 days of their release.

Deliver software at scale by managing hundreds or thousands of deployment targets and applications
Get a secure, enterprise-ready distribution of Argo with built-in identity, RBAC (role-based access control), and secrets
Gain clear visibility across all deployments and trace changes and regressions from code to cloud in seconds
Get enterprise-level dedicated support for Argo deployments
Get insights into every aspect of your CI/CD with smart dashboards
Manage multiple runtimes and multiple clusters in a single pane of glass
### Dashboards
Dashboards are key to providing the right information at the right time.
Operational Dashboards
Exposing the most commonly needed application and environmental information to developers so that they can troubleshoot without needing assistance from the DevOps teams; even in production

Analytical Dashboards
Developers often need to reach out to the DevOps team to get statistics and metrics around builds and deployments. Codefresh automatically generates DORA metrics as well as many other key indicators of build and deployment efficiency, which can be easily viewed in seconds by product owners and management alike.