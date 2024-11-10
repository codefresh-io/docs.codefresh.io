---
title: "Multi-environment sequential promotion"
description: "Promote product apps between multiple environments sequentially"
group: promotions
toc: true
---


Drag-and-drop is useful for on-demand promotion to a single environment, but a sequential promotion flow is better for managing changes across multiple environments.  
In this scenario, we’ll see how to set up a Promotion Flow to move changes in the `cf-101` product through three environments: `dev`, `qa`, and `production`. 
We'll also trigger the promotion and monitor how the changes are orchestrated through each environment.


>**NOTE**  
You must be an account administrator to create Promotion Flows.  
For successful promotion, each environment must have an application for the product in the Promotion Flow, with a consistent repo structure.

##### Adding Promotion Flow

We'll go to **Settings**, from the sidebar select **Promotion Flows**, and then click **Add Promotion Flow**.

##### Trigger Environment
The Trigger Environment is the starting point for the promotion. 

When you add a Promotion Flow, you are promoted to select the **Trigger Environment**.  
We'll select `dev` as our Trigger Environment.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env.png"
alt="Selecting Trigger Environment" 
caption="Selecting Trigger Environment"
max-width="60%"
%}


The Promotion Flow has `dev` as its first environment. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env-created.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env-created.png"
alt="Flow Builder with first environment" 
caption="Flow Builder with first environment"
max-width="60%"
%}

##### Selecting target environments
Next, we'll select the target environments in the promotion sequence: `qa` and `production`.


* Mouse over the right of the `dev` environment node, displays the add icon: {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/}.
* From the list, we'll select `qa` as the first target environment to add to the flow.
* We'll repeat the actions on the `qa` environment to add `production` as the final target environment in the flow. 

 
{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-target-env.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-target-env.png"
alt="Add target environment" 
caption="Add target environment"
max-width="60%"
%}



Our Promotion Flow now has the three environments required: `dev`, `qa`, and `production`.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Required environments in Promotion Flow" 
caption="Required environments in Promotion Flow"
max-width="60%"
%}

##### Saving Promotion Flow
The final step is to save the Promotion Flow by clicking **Save Promotion Flow** on the top-right.

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

Clicking **Save** adds the new flow, `three-env-promotion` to the Promotion Flows page.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-flow-list.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-flow-list.png"
alt="Promotion Flow page with new flow" 
caption="Promotion Flow page with new flow"
max-width="60%"
%}

##### Triggering Promotion Flow
After creating the flow, we'll trigger it to promote changes from the trigger environment to the defined target environments.

* **Selecting the flow**  
  From the list of Promotion Flows, we'll select `three-env-promotion`, and then click **Trigger** to initiate the promotion.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png"
alt="Trigger selected Promotion Flow" 
caption="Trigger selected Promotion Flow"
max-width="60%"
%}

* **Selecting the product**  
  We'll select `cf-101` as the product and continue by clicking  **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png"
alt="Select product to promote" 
caption="Select product to promote"
max-width="60%"
%}

* **Selecting the application**  
  The application with the changes, `cf-101-dev`, is automatically selected, so we'll click **Trigger** to initiate the promotion.
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


##### Monitoring release 
A release is automatically created for `cf-101` with a new Release ID.  
In the release view, you can see that changes are orchestrated sequentially through the environments, following the order defined in the `three-env-promotion` Promotion Flow.



{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-release-view.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-release-view.png"
alt="Release view for triggered promotion" 
caption="Release view for triggered promotion"
max-width="60%"
%}


## Related articles
[Promotion tutorials]({{site.baseurl}}/docs/promotions/promotion-scenarios/)

 
 