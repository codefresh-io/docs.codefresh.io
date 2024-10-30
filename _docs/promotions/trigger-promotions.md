---
title: "Triggering promotions"
description: "Explore ways to trigger promotions manually based on deployment requirements"
group: promotions
toc: true
---

Promotions are a key component of the continuous delivery (CD) process, enabling teams to control how software moves through various environments based on automated triggers or manual inputs. 

Codefresh GitOps supports automated promotion sceanrios tailored to various deployment models through Promotion Flows, triggered on predefined criteria, such as specific commit messages or changes in Git branches, allowing seamless and consistent updates across environments. See [Creating Promotion Flows](#{{site.baseurl}}/docs/promotions/configuration/promotion-flow/).  

Recognizing that some scenarios require on-demand control, Codefresh also provides manual promotion triggers to handle specific needs. Whether deploying a hotfix to production, promoting an entire product release, or testing code changes in a targeted environment, manual promotion options offer flexibility to meet these demands.

Manual promotion triggers provide different levels of control, accessible from distinct areas of the platform, enabling:

* **Single-environment promotion**
  Useful for quick promotion to a specific environment through the drag-and-drop option, or the promote option for more control on promotion behavior for traget the environment
* **Multi-environment promotion**  
  Designed for promotion across multiple environments through predefined flows, with the promote product via Promotion Flow flow, and the option to trigger a promotion for any product directly from within a Promotion Flow.

The [quick reference for manual promotion triggers](#manual-promotion-triggers-quick-reference) provides details on the different options, where you can find them, and potential use cases for each. How-to details are in the sections that follow the quick reference.




## Manual promotion triggers: quick reference

The table below lists the different methods to manually trigger promotions.

>**NOTE**  
Each method is available only if your account administrator has assigned permissions for the same. 

| Manual trigger type | Method       | Available in  | Control & flexibility | Potential use case|
|----------------- |-------------    |------------------|--------------------|------------------------|
|Single environment| Drag-and-drop   | Environment dashboard | Enforces global Policy settings if defined or allows you to select Policy behavior, including Promotion Action and Promotion Workflows. | Test changes in selected environment with desired promotion method.|
|                 |Promote product  | Product dashboard<br>Environments dashboard | Identical to drag-and-drop  | Identical to drag-and-drop             |
| Multiple environments | Promote product | Product dashboard<br>Environments dashboard |Automated promotion across multiple environments according to predefined flow.  | Promote changes for product across all environments without further commits.|
|                |Trigger | Promotion Flow  | Select product to promote with Promotion Flow  | Test newly designed Promotion Flow |



## Manually trigger promotions through drag-n-drop
Drag-and-drop the product to the target environment to promote changes, and customize the Promotion Settings to control promotion behavior for the environment.    
This method is useful to test changes within a specific environment. For example, QA teams wanting to test changes in staging or other internal environments.  



##### Before you begin
* Verify that you have permission to trigger promotions in the Environments dashboard

##### How to
1. From the sidebar in the Codefresh UI, select **Environments**, and then select the environment with the product to promote. 
1. Drag the product to the desired target environment.
  On the left, the Promotion Settings are either populated from global Policy settings that match the product, or left empty for you to define.  
  On the right, you can see the Compact diff view, displaying the files with the changes and the changes to be promoted.

SCREENSHOT


{:start="3"}
1. Review the files with the changes.
1. Add information on the commit or PR.
1. Click **Promote**.

A release is created for the Product and the Release tab displays the ongoing deployment.

SCREENSHOT

## Manually promote products to specific environments

Manually trigger promotion for a product to a specific target environment, and customize the Promotion Settings to control promotion behavior for the environment.  
This method is useful to test changes within a specific environment. For example, QA teams wanting to test changes in staging or other internal environments.  


##### Before you begin
* Make sure you have permissions to promote in the Product or Environment dashboards

##### How to
1. From the sidebar in the Codefresh UI, do one of the following:
    * To promote from the Product dashboard, select **Products**, and then select the product with the application to promote. 
    * To promote from the Environments dashboard, select **Environments**. 
1. Click the context menu of the product to promote and select **Promote**.

SCREENSHOT

1. Select the target environment to promote to and click **Next**.
1. In the Commit Changes page, if needed, define the Promotion Settings:
    * Select the Promotion Action as **Commit** (automated) or **Pull Request** (may require manual approval based on organization policies). 
    * Optional. Select the **Pre-Action Workflow** to run before, and the **Post-Action Workflow** to run after, the Promotion Action.
1. Review the files with the changes to be promoted. 
1. Click **Promote**.
A release is created for the Product and the Release tab displays the ongoing deployment.

SCREENSHOT



## Manually promote products to multiple environments by Promotion Flow
Manually trigger promotion for a product across all environments as configured in a predefined Promotion Flow.  
This method is useful for example to promote changes for product across all environments without further commits. 

##### Before you begin
* Make sure you have permissions to promote in the Product or Environment dashboards
* Verify that the selected product has applications in all the environments defined in the Promotion Flow

##### How to
1. From the sidebar in the Codefresh UI, do one of the following:
    * To promote from the Product dashboard, select **Products**, and then select the product with the application to promote. 
    * To promote from the Environments dashboard, select **Environments**. 
1. Click the context menu of the product to promote and select **Promote**.

SCREENSHOT
1. Select **Trigger Promotion Flow**, and click **Next**.
1. In the Trigger Promotion Flow page, verify that there are no validation errors, and then click **Trigger**.

SCREENSHOT

A release is created for the Product and the Release tab displays the ongoing deployment.

SCREENSHOT


## Manually promote products from within Promotion Flows

Manually trigger promotion for a product from within a Promotion Flow.

This method is useful to test newly designed Promotion Flows, and also verify how Promotion Flows work for different products and optimize them accordingly.

##### Before you begin
* Make sure you have permissions to trigger Promotion Flows 

##### How to

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select **Promotion Flows**. 
1. Select the Promotion Flow to trigger manually.
1. On the toolbar, click **Trigger**.


{:start="4"}
1. From the list of products, select the product for which to trigger the Promotion Flow, and click **Next**.

SCREENSHOT

{:start="5"}
1. Select the application or applications to promote for the product. 

SCREENSHOT

{:start="6"}
1. Click **Trigger**.

A release is created for the product, the Releases tab is displayed.

SCREENSHOT




## Related articles  
[Promotion sequences]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Promotion building blocks]({{site.baseurl}}/docs/promotions/promotion-components/)  
[Creating Promotion Flows]({{site.baseurl}}docs/promotions/promotion-flow/)  
