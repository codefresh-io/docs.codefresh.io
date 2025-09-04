---
title: "Triggering promotions"
description: "Explore ways to trigger promotions manually based on deployment requirements"
group: promotions
toc: true
---

>**Promotions is currently in development**  
This feature is still under active development and we've identified some issues with its resilience and reliability, particularly with recovery from cluster and network problems. We are currently upgrading our architecture to resolve these known issues and add self-healing capabilities.
We don't recommend using Promotions for mission-critical or production deployments at this time.

Promotions are a key part of the continuous delivery (CD) process, controlling how software moves through various environments based on automated triggers or manual inputs. 

Codefresh GitOps supports automated promotion scenarios tailored to various deployment models through [Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/). These flows are triggered based on predefined criteria, such as specific commit messages or changes in Git branches, allowing seamless and consistent updates across environments.  

For on-demand control, Codefresh also provides manual promotion triggers to handle specific deployment needs, whether pushing a hotfix to production, promoting an entire product release, or testing code changes in a specific environment.

Manual promotion offer different levels of control, accessible from distinct areas of the platform:

* **Single-environment promotion**  
  Useful for quick promotion to a specific environment through the drag-and-drop option, or the promote option for more control on promotion behavior.
* **Multi-environment promotion**  
  Designed for promotion across multiple environments through predefined Promotion Flows.

<!--- SCREENSHOT OF TRIGGER MOSAIC-->

The [quick reference for manual promotion triggers](#manual-promotion-triggers-quick-reference) provides details on the different options, where you can find them, and potential use cases for each. How-to details are in the sections that follow the quick reference.

For details on current limitations when working with promotions, see [Promotion limitations]({{site.baseurl}}/docs/promotions/promotion-limitations/).

## Manual promotion triggers: quick reference

The table below lists the methods to manually trigger promotions.

>**NOTE**  
Each method is available only if your account administrator has assigned the necessary permissions. 

| Manual trigger type | Method       | Available in  | Control & flexibility | Potential use case|
|----------------- |-------------    |------------------|--------------------|------------------------|
|**Single environment**| **Drag-and-drop**   | {::nomarkdown}<ul><li>Environments dashboard</li></ul>{:/} | Enforces global Promotion Policy settings if defined, or allows defining Policy behavior, including Promotion Action and Promotion Workflows. | Test changes in selected environment with desired promotion method.|
|                 |**Promote product**  | {::nomarkdown}<ul><li>Environments dashboard</li><li>Product Dashboard</li></ul>{:/} | Identical to drag-and-drop  | Identical to drag-and-drop             |
| **Multiple environment**s | **Promote product via Promotion Flow** | {::nomarkdown}<ul><li>Environments dashboard</li><li>Product Dashboard</li></ul>{:/} | Automates promotion across multiple environments according to selected predefined flow.  | Promote changes for product across all environments without further commits.|
|                |**Trigger Promotion Flow** | Promotion Flow page | Select a Promotion Flow and then select the product for which to trigger it.  | Test a newly designed Promotion Flow |



## Manually trigger promotions through drag-n-drop
Drag and drop the product to the target environment to promote changes. Customize the Promotion Settings to control promotion behavior for the environment.    
This method is useful to test changes within a specific environment. For example, QA teams verifying changes in staging or other internal environments.  

<iframe width="560" height="315" src="https://www.youtube.com/embed/4isYoutmRco?si=EDSfZFQQ4Dp5gw6i" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 

<!--- Watch this video:
{::nomarkdown}<img src=../../../images/icons/video-play-icon-blue.svg?display=inline-block>{:/} [Drag-and-drop promotions](https://www.youtube.com/watch?v=4isYoutmRco){:target="\_blank"} -->



##### Before you begin
* Verify that you have permission to trigger promotions in the Environments dashboard

##### How to
1. From the sidebar in the Codefresh UI, select **Environments**, and then select the environment with the product to promote. 
1. Drag the product to the desired target environment.
  The Promotion Settings on the left are populated from global Policy settings that match the product, or left empty for you to define.  
  The Compact diff view on the right shows the files with the changes and the changes to be promoted.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/triggers/drag-n-drop.png" 
url="/images/gitops-promotions/triggers/drag-n-drop.png" 
alt="Promote app through drag-and-drop" 
caption="Promote app through drag-and-drop" 
max-width="60%" 
%}

{:start="3"}
1. Review the files with the changes.
1. Add information on the commit or PR.
1. Click **Promote**.

A release is created for the product, and the product's Release tab displays the ongoing deployment.



## Manually promote products to specific environments

Manually trigger promotion for a product to a specific target environment, and customize Promotion Settings to control promotion behavior for the environment.  
This method is useful to test changes within a specific environment. For example, QA teams wanting to test changes in staging or other internal environments.  


##### Before you begin
* Verify you have permissions to promote in the Product or Environment dashboards

##### How to
1. In the Codefresh UI, do one of the following:
    * To promote from the Product dashboard, select **Products**, and then select the product with the application to promote. 
    * To promote from the Environments dashboard, select **Environments**. 
1. Click the context menu of the product to promote and select **Promote**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/triggers/promote-app-context-menu.png" 
url="/images/gitops-promotions/triggers/promote-app-context-menu.png" 
alt="Promote option in context menu" 
caption="Promote option in context menu" 
max-width="60%" 
%}

{:start="3"}
1. Select the target environment to promote to and click **Next**.
1. In the Commit Changes page, if needed, define the Promotion Settings:
    * Select the Promotion Action as **Commit** (automated) or **Pull Request** (may require manual approval based on organization policies). 
    * Optional. Select the **Pre-Action Workflow** to run before, and the **Post-Action Workflow** to run after, the Promotion Action.
1. Review the files with the changes to be promoted. 
1. Click **Promote**.

A release is created for the product, and the product's Release tab displays the ongoing deployment.





## Manually promote products to multiple environments by Promotion Flow
Manually trigger promotion for a product across all environments configured in a predefined Promotion Flow.  
This method is useful for promoting changes across all environments without requiring additional commits. 

##### Before you begin
* Verify you have permissions to promote in the Product or Environment dashboards
* Ensure that the selected product has applications in all the environments defined in the Promotion Flow

##### How to
1. From the sidebar in the Codefresh UI, do one of the following:
    * From the Product dashboard, select **Products**, and then select the product with the application to promote. 
    * From the Environments dashboard, select **Environments**. 
1. Click the context menu of the product to promote and select **Promote**.
1. Select **Trigger Promotion Flow**, and click **Next**.
1. In the Trigger Promotion Flow page, select the Promotion Flow and then click **Trigger**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/triggers/trigger-by-flow-select-flow.png" 
url="/images/gitops-promotions/triggers/trigger-by-flow-select-flow.png" 
alt="Select Promotion Flow to promote to multiple environments" 
caption="Select Promotion Flow to promote to multiple environments" 
max-width="60%" 
%}

A release is created for the product, and the product's Release tab displays the ongoing deployment.




## Manually trigger Promotion Flows

Manually trigger a predefined or a new Promotion Flow to promote a product.

This method is useful to test newly designed Promotion Flows, or optimize them for different products.

##### Before you begin
* Verify you have permissions to trigger Promotion Flows 

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Promotion Flows**. 
1. Select the Promotion Flow to trigger manually.
1. Click **Trigger**.
1. From the list of products, select the product for which to trigger the Promotion Flow, and click **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/triggers/trigger-promo-flow-select-product.png" 
url="/images/gitops-promotions/triggers/trigger-promo-flow-select-product.png" 
alt="Select product for which to trigger Promotion Flow" 
caption="Select product for which to trigger Promotion Flow" 
max-width="60%" 
%}

{:start="5"}
1. Select the application to promote for the product. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/triggers/trigger-promo-flow-select-product.png" 
url="/images/gitops-promotions/triggers/trigger-promo-flow-select-product.png" 
alt="Select application to promote through Promotion Flow" 
caption="Select application to promote through Promotion Flow" 
max-width="60%" 
%}

{:start="6"}
1. Click **Trigger**.
  A notification confirms that the promotion is triggered and a release is created.  


<!--- SCREENSHOT-->




## Related articles  
[Promotions: Setup & configuration guidelines]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/)  
[Configure Promotion Flows]({{site.baseurl}}/docs/promotions/promotion-flow/)  
