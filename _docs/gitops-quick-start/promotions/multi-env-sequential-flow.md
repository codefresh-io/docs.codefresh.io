---
title: "QUick start: Multi-environment sequential promotion"
description: "Promote product apps between multiple environments sequentially"
group: gitops-quick-start
toc: true
---


Drag-and-drop promotion covered in the previous quick start, is ideal for on-demand promotion to a single environment. Sequential promotion flows provide a structured way to manage changes across multiple environments, reducing deployment risks. 

This quick start demonstrates creating a promotion flow with three environments (`dev`, `qa`, `prod`), triggering the flow, and monitoring its progression in the Releases view.



## Before you begin

For this quicks start, ensure that you have:
* Three environments
  For multi-environment promotions, you need at least three environments.
  Here we use  `dev`, `qa`, and `prod`.

* Applications in environments
  Each environment must have an application for the product, such as `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`.  

* Consistent repo structure for applications
  Applications must have a consistent repo structure for resources.


## Create Promotion Flow for multi-environment promotions

Codefresh simplifies creating multi-environment through Promotion Flows.  
You can use the Flow Builder in either Chart or YAML modes, depending on your preference to create a Promotion Flow. 

>**NOTE**  
You need to be an account administrator to create Promotion Flows.


1. In the Codefresh UI, on the toolbar, click the **Settings** icon. 
1. From the sidebar select **Promotion Flows**, and then click **Add Promotion Flow**.
1. Select the **Trigger Environment** as the starting point for the promotion. For the quick start, select `dev`.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-trigger-env.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-trigger-env.png"
alt="Promotions quick start: Select Trigger Environment" 
caption="Promotions quick start: Select Trigger Environment"
max-width="60%"
%}

{:start="4"}
1. Select the target environments in the promotion sequence to which to promote changes: `qa` and `prod`.
    1. Mouse over the right of the `dev` environment node and click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/}.
    1. From the list, select the first target environment in the flow, `qa` for this quick start.
    1. Repeat the action for the `qa` environment node to add the next target environment. 
      For the quick start, we'll add `prod` as the final target environment in the flow. 

 
{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-target-env.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-target-env.png"
alt="Promotions quick start: Add target environment" 
caption="Promotions quick start: Add target environment"
max-width="60%"
%}



{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Promotions quick start: Promotion Flow with required environments" 
caption="Promotions quick start: Promotion Flow with required environments"
max-width="60%"
%}

{:start="5"}
1. Click **Save Promotion Flow** on the top-right.
1. Enter a name **Name** for the flow. For this quick start, we'll use `multi-env-sequential-promotion`.  
  The flow's YAML version lists the environment sequence.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-save-flow.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-save-flow.png"
alt="Promotions quick start: Save Promotion Flow" 
caption="Promotions quick start: Save Promotion Flow"
max-width="60%"
%}

{:start="6"}
1. To add the new flow to the Promotion Flows list, click **Save**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-flow-list.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-flow-list.png"
alt="Promotion Flow page with new flow" 
caption="Promotion Flow page with new flow"
max-width="60%"
%}


{:start="7"}
1. Continue with [Trigger Promotion Flow](#trigger-promotion-flow).

## Trigger Promotion Flow
Once the Promotion Flow is created, you can manually trigger it to promote changes from the Trigger Environment to the defined target environments.


1. From the list of Promotion Flows, select  `multi-env-sequential-promotion` and then click **Trigger** to initiate the promotion.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png"
alt="Trigger selected Promotion Flow" 
caption="Trigger selected Promotion Flow"
max-width="60%"
%}

{:start="2"}
1. Select the product to promote. For this quick start, select `demo-trioapp`, and continue by clicking  **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png"
alt="Select product to promote" 
caption="Select product to promote"
max-width="60%"
%}

{:start="3"}
1. Select the application, in our case, the application with the changes, `demo-trioapp-dev`, is automatically selected.
1. To initiate the promotion, click **Trigger** .
<!--- do we auto-select the app with the changes? -->

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-app.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-app.png"
alt="Promotions quick start: Select product's application to promote" 
caption="Promotions quick start: Select product's application to promote"
max-width="60%"
%}


## View and monitor product release 
On triggering the flow, the promotion mechanism automatically creates a new release for the product (`demo-trioapp`), and orchestrates the changes sequentially through the environments defined in the Promotion Flow.

In the release view, monitor the sequential progression of changes through `dev`, `qa`, and `prod` as per `multi-env-sequential-promotion` Promotion Flow.



{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-release-view.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-release-view.png"
alt="Release view for triggered Promotion Flow" 
caption="Release view for triggered Promotion Flow"
max-width="60%"
%}

##### Release record in releases list

In the Releases page, the Promotion Flow column displays the name of the flow (`multi-env-sequential-promotion` for example) for traceability.
Drag-and-drop promotions display Manual in this column.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-release-list.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-release-list.png"
alt="Release list with release record for triggered Promotion Flow" 
caption="Release view for triggered Promotion Flow"
max-width="60%"
%}

## What's next
To further enhance your promotion flow, the next quick start will guide you through adding gates and conditional promotions to each environment, allowing you to introduce more control and flexibility in your promotion processes.

[Quick start: Multi-environment promotion with gates]({{site.baseurl}}/docs/gitops-quick-start/promotion-scenarios/policy-multi-env-promotion/)

 
 