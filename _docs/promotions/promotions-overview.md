---
title: "About promotions"
description: "Explore the power of GitOps promotions for continuous delivery"
group: promotions
toc: true
---

## Promotions in Codefresh GitOps
Continuous Delivery (CD) is an essential practice in the Software Development Lifecycle (SDLC) that automates the release process, ensuring consistent and reliable deployment of application updates across environments. CD bridges the gap between development and operations, empowering teams to deliver changes to production with speed and confidence.

A core element of CD is **promotion** - the process of advancing an application version through environments, such as from staging to production, based on predefined criteria or approvals. Promotion sequences ensure that only validated, stable versions of applications only validated, stable versions reach production, reducing risk with every release.

## Getting started with promotions in GitOps

Review these articles to begin with promotions in Codefresh GitOps:
##### Walk through with quick starts  
Dive into [quick starts on promotions]({{site.baseurl}}/docs/gitops-quick-start/promotions/)<!--- ({{site.baseurl}}/docs/gitops-quick-start/)--> for step-by-step guides to get started efficiently.   

Watch this video to see a promotion in action:  
{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Drag-and-drop Promotion](https://www.youtube.com/watch?v=4isYoutmRco&t=1s){:target="\_blank"}


##### Understand the components and entities 
Explore [Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/) to learn about the key entities and how they fit together in the promotion process.

##### Set up and configure promotions
Follow the guidelines in [Promotions: Setup & configuration]({{site.baseurl}}/docs/promotions/create-promotion-sequence/) to configure, trigger, and monitor promotions.  

Watch this video to learn how to configure an automated Promotion Flow:
{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Promotion Flows](https://www.youtube.com/watch?v=M8G-AY7FIIg&t=76s){:target="\_blank"}


## Promotions with GitOps: The Codefresh advantage
Codefresh builds on the power of GitOps by fully integrating promotions into its framework, giving you enhanced visibility, control, and automation, with Git as the single source of truth.   

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/overview/promos-gitops.png" 
url="/images/gitops-promotions/overview/promos-gitops.png"
alt="GitOps promotions in Codefresh" 
caption="GitOps promotions in Codefresh"
max-width="60%"
%}

Here’s what makes Codefresh's GitOps promotions unique:

* **Declarative and version-controlled**  
  Promotions are tracked in Git as code. Every promotion is tied to a Git commit, giving you full traceability and version control. This means teams can always see who approved or triggered a promotion and why.

<!--- * **Automated Git sync**  
  With GitOps, the desired state of environments is automatically synced based on the Git repository, ensuring that any promotion aligns with the latest approved application version.  -->

* **Context and visibility**  
While Argo CD manages deployments at the application level, Codefresh enhances visibility and control by introducing **environments**, **products**, and **releases**. These entities provide a cohesive view of complex systems and streamline CD management:
  * **Environments** represent stages in the development lifecyle, allowing teams to easily track applications as they move through the SDLC.  
    Read more on [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/). 
  * **Products** group related applications, allowing teams to manage promotions across all applications within the product from one environment to another. This ensures seamless coordination and centralized control over application management.   
    Read more on [Products]({{site.baseurl}}/docs/products/about-products/).
  * **Releases** provide end-to-end visibility into the promotion and deployment journey for each product, allowing stakeholders to monitor the promotions across environments and verify successful deployments.  
    Read more on [Releases]({{site.baseurl}}/docs/promotions/product-releases/).

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/overview/envs-prod-release.png" 
url="/images/gitops-promotions/overview/envs-prod-release.png"
alt="Environments, products, releases" 
caption="Environments, products, releases"
max-width="65%"
%}

>**NOTE**  
You need Runtime version 0.13.4 or higher to support GitOps promotions. Ensure your runtime is updated to at least this version to access  promotion features.

## GitOps promotion entities
Codefresh  GitOps provides specialized functionality to streamline and automate the promotion process, ensuring consistency and control without the need for custom scripts. These features allow you to design predictable reusable delivery lifecycles across products and environments, with all the required validations, reducing operational overhead and manual errors.

* **Predefine properties to promote**  
  Specify which application properties to promote within products, maintaining precise control and avoiding the need to promote everything.   
  See [Configuring version and promotable properties for Products]({{site.baseurl}}/docs/products/promotion-version-properties/). 

* **Enforce environment-specific checks**  
  Create different types of workflows to run at different stages of the promotion process for validation, compliance, performance checks.  
  See [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).  

* **Govern promotion behavior with policy-based gating**  
  Define rules and constraints combining different workflows with Promotion Policies to ensure promotions adhere to specific requirements for products or environments.  
  See [Promotion Policies]({{site.baseurl}}/docs/promotions/promotion-policy/).

* **Streamline complex promotion sequences**  
  Automate multi-environment promotions reducing manual effort while improving accuracy and efficiency.  
  See [Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/).




<!--- screenshot of yaml examples to differentiate and not overcrowd -->








