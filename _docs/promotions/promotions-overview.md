---
title: "Promotions"
description: "The power of promotions in Codefresh GitOps"
group: promotions
toc: true
---


In the context of Continuous Delivery (CD), a promotion is the process of advancing an application version from one environment to another, from staging to production for example, based on predefined criteria or manual approval. Promotions ensure that only validated, reliable versions of your applications are deployed to production.

Promotions are typically implemented through rules and conditions, such as passing test suites or code quality checks, automated workflows to promote the application to the next environment, and manual approval gates before the promotion moves into deployment.


##### What is the unique value proposition of GitOps promotions in Codefresh?
Codefresh builds on the power of GitOps by fully integrating promotions into its framework, giving you enhanced visibility, control, and automation, all with Git as the single source of truth.   

Here’s what makes our GitOps promotions stand out:

* **Declarative and version-controlled**  
  Promotions are tracked in Git as code. Every promotion is tied to a Git commit, giving you full traceability and version control. This means teams can always see who approved or triggered a promotion and why.

<!--- * **Automated Git sync**  
  With GitOps, the desired state of environments is automatically synced based on the Git repository, ensuring that any promotion aligns with the latest approved application version.  -->

* **Context and visibility**  
  While Argo CD manages deployments as individual applications, Codefresh introduces **environments** and **products** for a more intuitive and cohesive view and managment of your development and deployment system.
    * Environments represent different stages, clearly showing teams the applications as they progress through the software lifecycle.
    * Products group related applications. Products allow you to promote all its applications at once, simplifying promotions and saving valuable time.
    * Releases, unique to Codefresh, give visibility to the promotion and deployment process for products, making it easy for you or any stakeholder to track the success and progress of application deployments.

##### Promotion entities
Codefresh also offers several specialized entities that streamline and automate the promotion process, while giving you the fleiabily ou need to match organization requirements:
* **Promotion Templates**: Define which properties to promote.
* **Promotion Policies**: Define validation and readiness requirements for environments through workflows.
* **Promotion Flows**: Create simple or complex promotion sequences, reducing manual steps, improving accuracy and efficency.




##### How do you get started with promotions in GitOps?

To get started, explore [promotion components]({{site.baseurl}}/docs/promotions/promotion-components/) to understand the entities involved.  

For a step-by-step guide on creating and implementing a promotion and monitoring its deployment, see [Create a promotion sequence]({{site.baseurl}}/docs/promotions/create-promotion-sequence/).

