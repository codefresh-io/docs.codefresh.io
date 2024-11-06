---
title: "Promotions"
description: "Explore the power of GitOps promotions for continuous delivery"
group: promotions
toc: true
---

Continuous Delivery (CD) is an essential practice in the Software Development Lifecycle (SDLC) that automates the release process, ensuring that application updates are and can be consistently and reliably deployed across various environments.   
CD bridges the gap between development and operations, empowering teams to deliver changes to production with speed and confidence by automating testing, validation, and deployment tasks. CD enables rapid response to customer needs and frequent, low-risk releases, ultimately resulting in a more responsive and efficient development process.

A key component of CD is promotion—the process of advancing an application version from one environment to the next, from staging to production for example, based on specific criteria or approvals. Promotion sequences help ensure that only validated, stable versions of applications make it to production, minimizing risk in every release.




##### GitOps promotions: The Codefresh advantage
Codefresh builds on the power of GitOps by fully integrating promotions into its framework, giving you enhanced visibility, control, and automation, with Git as the single source of truth.   

Here’s what makes Codefresh's GitOps promotions unique:

* **Declarative and version-controlled**  
  Promotions are tracked in Git as code. Every promotion is tied to a Git commit, giving you full traceability and version control. This means teams can always see who approved or triggered a promotion and why.

<!--- * **Automated Git sync**  
  With GitOps, the desired state of environments is automatically synced based on the Git repository, ensuring that any promotion aligns with the latest approved application version.  -->

* **Context and visibility**  
  While Argo CD manages deployments as individual applications, Codefresh introduces **environments** and **products** for a more intuitive and cohesive view of complex systems, and CD management:
    * Environments represent different stages in development. Environments allow teams to easily track applications as they progress through the SDLC. 
      Read more on [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/). 
    * Products group related applications. Products allow teams to manage promotions across applications within a specific product from one environment to another, for seamless coordination and control over applications.  
      Read more on [Products]({{site.baseurl}}/docs/products/about-products/).
    * Releases provide end-to-end visibility into the promotion and deployment journey for each product. Releases allow all stakeholders to easily to track the deployment process across environments and verify successful deployment.
      Read more on [Releases]({{site.baseurl}}/docs/promotions/product-releases/).

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/envs-prod-release.png" 
url="/images/gitops-promotions/envs-prod-release.png"
alt="Environments, products, releases" 
caption="Environments, products, releases"
max-width="60%"
%}

##### GitOps promotion entities
Codefresh's GitOps promotions include specialized entities that streamline and automate the promotion process. These entities provide you with the flexibility and control to model your delivery lifecycles with all the required checks built-in, and no custom scripting required. You get a predictable path to production that you can duplicate across projects, giving you ultimate control over your processes.
* **Promotion Templates**: Define which application properties to promote.
* **Promotion Policies**: Define validation and readiness requirements for environments.
* **Promotion Flows**: Define automated promotion sequences, simple or complex, reducing manual steps for accuracy and efficiency.

<!--- screenshot of yaml examples to differentiate and not overcrowd -->


##### Getting started with promotions in GitOps

* To get started, explore [promotion components]({{site.baseurl}}/docs/promotions/promotion-components/) and understand the entities involved.  

* For a step-by-step guide on implementing continuous delivery, see [Promotion sequence]({{site.baseurl}}/docs/promotions/create-promotion-sequence/).

