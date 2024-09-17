---
title: "Promotions"
description: "The power of promotions in Codefresh GitOps"
group: promotions
toc: true
---


In the context of Continuous Delivery (CD), a promotion is the process of advancing an application version from one environment to another, from staging to production for example, based on predefined criteria or manual approval. Promotions ensure that only validated, reliable versions of your applications are deployed to production.

The current  is experiencing rapid evolution, with a significant emphasis on automation, security, and cloud compatibility, revolving around the central concet of Git as the single source of truth.

Here's how promotions are typically implemented:

Promotion policies: Rules and conditions, such as passing test suites or code quality checks, must be satisfied before promotion.
Automated workflows: Once the criteria are met, the system automatically promotes the application to the next environment.
Manual approvals: In some cases, a manual approval gate requires human intervention before the promotion is finalized.


##### What is the unique value proposition of GitOps promotions in Codefresh?
Codefresh builds on the power of GitOps by fully integrating promotions into its framework, giving you enhanced visibility, control, and automation.   

Here’s what makes our GitOps promotions stand out:

* **Declarative and version-controlled**  
  Promotions are tracked in Git as code. Every promotion is tied to a Git commit, giving you full traceability and version control. This means teams can always see who approved or triggered a promotion and why.

<!--- * **Automated Git sync**  
  With GitOps, the desired state of environments is automatically synced based on the Git repository, ensuring that any promotion aligns with the latest approved application version.  -->

* **Context and visibility**  
  While Argo CD manages deployments as individual applications, Codefresh introduces **environments** and **products** for a more intuitive and cohesive view of your development and deployment system.
    * Environments represent different stages helping teams manage applications as they progress through the software lifecycle.
    * Products group related applications. Promoting a productInstead of individual applications, They simplify promotions as a applications are promoted as a unit instead of indTeams 
    * Releases, unique to Codefresh, give visibility to the deployment process for products, making it easy for any stakeholder to track the success and progress of application deployments.

##### Promotion entities
Codefresh offers several specialized entities to streamline and automate the promotion process:
* Promotion Templates: Define which properties to promote.
* Promotion Policies:  Define validation and readiness requirements for environments through workflows.
* Promotion Flows: Create promotion sequences, whether simple or complex, reducing  manual steps and improving accuracy.

As with other GitOps entities, you can create these promotion entities in our intuitive UI or directly in YAML. 


By leveraging GitOps for promotions, Codefresh ensures that the promotion process is transparent, automated, and easily auditable, offering a robust solution for enterprise-grade CD pipelines.


##### How do you get started with promotions?

To get started, explore [promotion components]({{site.baseurl}}/docs/promotions/promotion-components/) to understand the entities involved.  

For a step-by-step guide on creating and implementing a promotion and monitoring its deployment, see [Create a promotion sequence]({{site.baseurl}}/docs/promotions/create-promotion-sequence/).

