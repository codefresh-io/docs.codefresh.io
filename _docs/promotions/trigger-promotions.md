---
title: "Trigger promotions"
description: "Orchestrate promotions automatically or manually trigger promotions"
group: promotions
toc: true
---

 When you trigger a promotion

## Automatically trigger promotions


## Manually trigger a Promotion Flow

TBD prereqs for manual trigger.


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


## Manually promote applications through drag-n-drop
Drag-and-drop an application from the trigger environment to the target environment to promote changes.

This is one method to manually promote applications. To manually promote applications through Promotion Policies or Promotion Flows, see [Manually promote applications by Promotion Policies or Flows](#manually-promote-applications-through-promotion-policies-or-flows).

##### Before you begin
* ???


##### How to
1. From the sidebar in the Codefresh UI, do one of the following to drag-n-drop an application:
    * Select **Products**, and then select the product with the application to promote. 
    * Select **Environments**, and then select the trigger environment with the product. 
1. Drag the application/product from the trigger environment to the desired target environment.

SCREENSHOT

{:start="3"}
1. Select the Promotion Actions as **Commit** (automated) or **Pull Request** (may require manual approval based on organization policies). 
1. Optional. Select the **Pre-Action Workflow** to run before the Promotion Action.
1. Optional. Select the **Post-Action Workflow** to run after the Promotion Action.
1. Review the files with the changes that are to be promoted. By default, the changes are displayed in the compact diff view.
1. Add information on the Promotion Action describing the reason and changes for it.
1. Click **Promote**.

A release is created for the Product and the Release tab displays the ongoing deployment.

SCREENSHOT
## Manually promote applications through Promotion Policies or Flows

Manually promote an application in a product to a target environment either through a predefined Promotion Flow or by creating a custom Promotion Policy for the application.

##### Before you begin
* Make sure you have permissions:
  * To trigger Promotion Flows from Products
  * To promote to environments

##### How to
1. From the sidebar in the Codefresh UI, do one of the following:
    * To promote an application from a product, select **Products**, and then select the product with the application to promote. 
    * To promote an application from an environment, select **Environments**. 
1. Click the context menu of the application in the trigger environment, and select **Promote**.

SCREENSHOT

{:start="4"}
1. Do one of the following:
  * To promote through a preconfigured Promotion Policy or by defining a custom one, select **Select target environment**.  
    Continue from _step 5_.
  * To promote through a predefined Promotion Flow for the application's product, select **Trigger Promotion Flow**. Continue from _step 8_.

SCREENSHOT

{:start="5"}
1. To promote by Promotion Policies, do the following:
    1. From the list of environments, select the environment to promote to, and click **Next**.
    1. If needed, define the Policy settings:
        * Select the Promotion Actions as **Commit** (automated) or **Pull Request** (may require manual approval based on organization policies). 
        * Optional. Select the **Pre-Action Workflow** to run before the Promotion Action.
        * Optional. Select the **Post-Action Workflow** to run after the Promotion Action.
        product with the application and the target environment does not match configured Promotion Policy settings, define the settings, as describe d.
    1. Review the files with the changes that are to be promoted. 
    1. Add information on the Promotion Action describing the reason and changes for it.
    1. Click **Promote**.

    SCREENSHOT

{:start="8"}
1. To promote through a Promotion Flow, do the following:
    1. Click **Next**.
    1. Select the Promotion Flow to use for promotion. 
    1. In the Trigger Promotion Flow page, verify that there are no validation errors, and then click **Trigger**.

SCREENSHOT

A release is created for the Product and the Release tab displays the ongoing deployment.

SCREENSHOT
