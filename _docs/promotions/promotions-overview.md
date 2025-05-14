---
title: "About promotions"
description: "Explore the power of promotions in Codefresh GitOps for continuous delivery"
group: promotions
toc: true
---

## Promotions with GitOps: The Codefresh advantage
Continuous Delivery (CD) is an essential practice in the software development lifecycle (SDLC) that automates the release process, ensuring consistent and reliable deployment of application updates across environments. CD bridges the gap between development and operations, empowering teams to deliver changes to production with speed and confidence.

**Promotions** are a core aspect of CD—advancing application versions through environments, such as from staging to production, based on predefined criteria or approvals. In Codefresh GitOps, promotions enhance visibility, control, and automation, integrating seamlessly with Git as the single source of truth.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/overview/promos-gitops.png" 
url="/images/gitops-promotions/overview/promos-gitops.png"
alt="GitOps promotions in Codefresh" 
caption="GitOps promotions in Codefresh"
max-width="60%"
%}

Watch this video to see a promotion in action: 
<iframe width="560" height="315" src="https://www.youtube.com/embed/4isYoutmRco?si=EDSfZFQQ4Dp5gw6i" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 





### Why use Codefresh's GitOps promotions?
Codefresh extends Argo CD’s deployment model by introducing structured promotion flows with additional context and automation:

* **Declarative and version-controlled**  
  Every promotion is tracked in Git, tied to a commit, ensuring full traceability. Teams can see who triggered a promotion and why.

* **Context and visibility**  
  While Argo CD manages deployments at the application level, promotions with Codefresh GitOps goes beyond this offering:
  * **Environments**:  
    Represent stages in the software lifecyle, allowing teams to easily track application progression.  
    Read more on [Environments]({{site.baseurl}}/docs/dashboards/gitops-environments/). 
  * **Products**  
    Group related applications for unified promotion management.   
    Read more on [Products]({{site.baseurl}}/docs/products/about-products/).
  * **Releases**  
    Provide end-to-end visibility into deployment across environments.  
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
Promotions in Codefresh GitOps require Runtime version 0.13.4 or higher. Ensure your Runtime is updated to access promotion features.  

For details on current limitations when working with promotions, see [Promotion limitations]({{site.baseurl}}/docs/promotions/promotion-limitations/).


## Key features with GitOps promotions
Codefresh GitOps provides specialized functionality to streamline and automate promotions while maintaining consistency and control without the need for custom scripts. These capabilities enable predictable and reusable delivery lifecycles with built-in validations, reducing operational overhead.

* **Predefine properties to promote**  
  Control which application properties are promoted to avoid unnecessary changes.  
  See [Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/promotion-version-properties/). 

* **Enforce environment-specific checks**  
  Automate validations, compliance, and performance checks for different environments at different stages of promotions.    
  See [Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).  

* **Govern promotion behavior with policy-based gating**  
  Use promotion policies to define rules and ensure promotions meet environment-specific security and compliance requirements.  
  See [Promotion Policies]({{site.baseurl}}/docs/promotions/promotion-policy/).

* **Automate complex promotion flows**  
  Reduce manual effort with multi-environment promotions.  
  See [Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/).


## Getting started with promotions

##### Walk through with quick starts  

Use these quick start guides to begin using promotions in Codefresh GitOps: 
* **Simple promotions**  
    * [Drag-and-drop]({{site.baseurl}}/docs//gitops-quick-start/drag-and-drop/)
    * [Multi-environment Promotion Flow]({{site.baseurl}}/docs/gitops-quick-start/multi-env-sequential-flow/)

* **Advanced promotions**  
    * [Promotions with Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/policy-multi-env-promotion/)
    * [Environment dependencies]({{site.baseurl}}/docs/gitops-quick-start/dependency-multi-env-promotion/)

Watch this video to learn how to configure an automated Promotion Flow: 
<iframe width="560" height="315" src="https://www.youtube.com/embed/M8G-AY7FIIg?si=LQzY5FkIelQr4qMP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 

<!--- {::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Promotion Flows](https://www.youtube.com/watch?v=M8G-AY7FIIg&t=76s){:target="\_blank"} -->


##### Understand the building blocks
Learn how promotions work by exploring their core components. See [Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/).

##### Configure and trigger promotions
Follow the guidelines in [Promotions: Setup & configuration]({{site.baseurl}}/docs/promotions/create-promotion-sequence/) to configure, trigger, and monitor promotions.  










