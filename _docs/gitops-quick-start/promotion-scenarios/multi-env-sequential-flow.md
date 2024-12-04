---
title: "Multi-environment sequential promotion"
description: "Promote product apps between multiple environments sequentially"
group: promotions
toc: true
---


Drag-and-drop is useful for on-demand promotion to a single environment, but a sequential promotion flow is better for managing changes across multiple environments. 

In this quick start, we’ll see how to:
Create a Promotion Flow to move changes in a product through multiple environments
Trigger the Promotion Fow
Monitor the promotion orchestration in Releases


We'll also trigger the .

## Before you begin
  
Admin permissions
To create Promotion Flows, uou must be an account administrator.

* Applications in environments
For successful promotion, each environment in the Promotion Flow must have an application for the product.
* Repo structur for applications
   with a consistent repo structure.
* Trigger and target environments
  The Trigger Environment is the starting point for the promotion. The target environments are the additional environments to which to ptomoe changes. 

## Create Promotion Flow

1. In the Codefresh UI, on the toolbar, click the **Settings** icon. 
1. From the sidebar select **Promotion Flows**, and then click **Add Promotion Flow**.
1. Select the **Trigger Environment**, `dev` for the quick start.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-trigger-env.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-trigger-env.png"
alt="Select Trigger Environment" 
caption="Select Trigger Environment"
max-width="60%"
%}

{:start="4"}
1. Select the target environments in the promotion sequence: `qa` and `prod`.
    1. Mouse over the right of the `dev` environment node, and click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/}.
    1. From the list, select the first target environment to the flow. For the quick start, we'll select `qa` as the first target environment.
    1. Repeat the actions to add the next target environment. 
      For the quick start, we'll mouse over the `qa` environment and add `prod` as the final target environment in the flow. 

 
{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-target-env.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-target-env.png"
alt="Add target environment" 
caption="Add target environment"
max-width="60%"
%}



{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Promotion Flow with required environments" 
caption="Promotion Flow with required environments"
max-width="60%"
%}

1. Click **Save Promotion Flow** on the top-right.
  The **Name** is required. The flow's YAML file lists the environment sequence.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-save-flow.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-save-flow.png"
alt="Save Promotion Flow" 
caption="Save Promotion Flow"
max-width="60%"
%}

1. Click **Save** to add the new flow to the Promotion Flows page.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-flow-list.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-flow-list.png"
alt="Promotion Flow page with new flow" 
caption="Promotion Flow page with new flow"
max-width="60%"
%}

## Trigger Promotion Flow
After creating the flow, manually trigger it to promote changes from the trigger environment to the defined target environments.
For the quick start, we'll trigger the `multi-env-sequential-promotion` Promotion Flow.

1. From the list of Promotion Flows, select the Promotion Flow, `multi-env-sequential-promotion` and then click **Trigger** to initiate the promotion.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png"
alt="Trigger selected Promotion Flow" 
caption="Trigger selected Promotion Flow"
max-width="60%"
%}

1. Select the product for which to trigger the flow, `demo-trioapp` and continue by clicking  **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png"
alt="Select product to promote" 
caption="Select product to promote"
max-width="60%"
%}

1. Select the application, in our case, the application with the changes, `cf-101-dev`, is automatically selected.
1. Click **Trigger** to initiate the promotion.
<!--- do we auto-select the app with the changes? -->

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-app.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-app.png"
alt="Select product's application to promote" 
caption="Select product's application to promote"
max-width="60%"
%}


## View and monitor release 
The promotion mechanism automatically create a new release for `demo-trioapp`.  

In the release view, you can see that changes are orchestrated sequentially through the environments, following the order defined in the Promotion Flow, `multi-env-sequential-promotion` for the quick start.



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

In the Releases page, the Promotion Flow column displays the name of the Promotion Flow, compared to Manual which is displayed for drag-and-drop promotions.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-release-list.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-release-list.png"
alt="Release list with release record for triggered Promotion Flow" 
caption="Release view for triggered Promotion Flow"
max-width="60%"
%}

## What to do next
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
 