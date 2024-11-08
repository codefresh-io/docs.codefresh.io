---
title: "Exploring promotion scenarios"
description: "Review promotion scenarios"
group: promotions
toc: true
---



A successful promotion sequence relies on several key components that together govern and orchestrate the promotion flow across environments. The sections that follow takes you through configuring several scenarios for promotions, from basic to complex promotions.


Here’s how to progress from basic to advanced promotion sequences:

##### Applications, Products, and Environments
These core deployment entities are required for all promotions. Products enable you to group and configure related applications, and environments define where changes to these applications are promoted.
With these entities, you can quickly promote changes using a drag-and-drop method between two environments and choose the target environment for promotion.

##### Promotion Flows
After setting up the basics, orchestrate promotion across multiple environments. 
Use our Promotion Flow entity to create complex, multi-environment deployment strategies.

##### Promotion Workflows
Adding Promotion Workflows introduces validations and checks that ensure each environment in the sequence meets your standards.


Here are the different promotion scenarios you can explore:

[Drag-and-drop promotions](#drag-and-drop-promotion)  
[Multi-environment sequential promotion](#multi-environment-sequential-promotion)  
[Policy-driven multi-environment promotion](#policy-driven-multi-environment-promotion)  
[Multi-environment promotion with parallel environments](#parallel-multi-environment-promotion)  
[Multi-environment promotion with dependencies](#promotion-with-environment-dependencies)




## Drag-and-drop promotion

In this basic scenario, we'll see how to promote products in the Environments dashboard using drag-and-drop functionality. 
This quick, visual method allows you to move applications across two environments in a few simple steps.

##### Context
In the Environments dashboard, we see the `cf-101` product, in the `dev` and `qa` environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-prod-in-env.png" 
url="/images/gitops-promotions/tutorials/dnd-prod-in-env.png"
alt="`cf-101` product in Environments dashboard" 
caption="`cf-101` product in Environments dashboard"
max-width="60%"
%}


##### Linked applications
Mouse over `cf-101` displays the linked applications in each environment, `cf-101-dev` and `cf-101-qa`.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-apps-in-prod.png" 
url="/images/gitops-promotions/tutorials/dnd-apps-in-prod.png"
alt="`cf-101-dev` and `cf-101-qa` applications" 
caption="`cf-101-dev` and `cf-101-qa` applications"
max-width="60%"
%}

##### Product versions
`cf-101` has different versions in `dev` and `qa` environments.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-prod-versions.png" 
url="/images/gitops-promotions/tutorials/dnd-prod-versions.png"
alt="`cf-101` versions in environments" 
caption="``cf-101` versions in environments"
max-width="60%"
%}

##### Promotion with drag-and-drop
To promote, we'll drag `cf-101-dev` from `dev` and drop it into `cf-101` in the `qa` environment.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-action.png" 
url="/images/gitops-promotions/tutorials/dnd-action.png"
alt="Drag and drop `cf-101` to promote" 
caption="Drag and drop `cf-101` to promote"
max-width="60%"
%}

##### Commit changes page
The Commit Changes page shows the action used for the promotion, the files, and the properties in the files that will be changed.
Review the files and properties that will be updated as part of this promotion action.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-commit.png" 
url="/images/gitops-promotions/tutorials/dnd-commit.png"
alt="Commit changes for `cf-101`" 
caption="Commit changes for `cf-101`"
max-width="60%"
%}

##### Release creation and completion
After commit, a release is automatically created for `cf-101` with a new Release ID.  
Clicking **View Release Details** takes you to the release view.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-inital-release.png" 
url="/images/gitops-promotions/tutorials/dnd-inital-release.png"
alt="Running release for `cf-101`" 
caption="Running release for `cf-101`"
max-width="60%"
%}

Wait for the release to complete, and then return to the Releases page to view the Release ID updated with the current status.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/dnd-releases-page.png" 
url="/images/gitops-promotions/tutorials/dnd-releases-page.png"
alt="Releases list with new release for `cf-101`" 
caption="Releases list with new release for `cf-101`"
max-width="60%"
%}

## Multi-environment sequential promotion
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

## Policy-driven multi-environment promotion
Now that we have reviewed multi-environment promotion, let's configure policies to manage promotion conditions, ensuring that each environment’s specific requirements are met before changes are promoted.

##### What are Promotion Policies?
Promotion Policies define the criteria for promoting changes through each environment. They govern promotion behavior through include automated tests, scans, quality checks, approvals, notifications, and more.  
You can define promotion criteria through Promotion Workflows, modeled on Argo Workflows.

* Create Promotion Workflows in Codefresh by selecting **Promotion Workflows** from the sidebar.






##### Assigning Policy settings

Promotion Policies support three optional settings:
* **Pre-Action Workflow**: The workflow to run before the Promotion Action.
* **Promotion Action**: The action that promotes the changes, which defaults to Commit if not set.
* **Post-Action Workflow**: The workflow to run after the Promotion Action.

We'll define the policy settings for the `three-env-promotion` Promotion Flow to manage promotion behavior for the `qa` and `production` target environments.

Assigning settings is as simple as clicking the respective controls and selecting the workflows/action from the list. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-pre-action.png" 
url="/images/gitops-promotions/tutorials/seq-flow-pre-action.png"
alt="Policy settings for target environments" 
caption="Policy settings for target environments"
max-width="60%"
%}

For both `qa` and `production`, we'll select the same workflows and the same promotion action.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-populated-policy.png" 
url="/images/gitops-promotions/tutorials/seq-flow-populated-policy.png"
alt="Target environment with policy settings" 
caption="Target environment with policy settings"
max-width="60%"
%}




##### Triggering policy-driven Promotion Flow
We'll save the changes to the `three-env-promotion` flow, trigger it, and monitor the release view.

In contrast to the previous release, the current release view shows the `qa` and `production` environments with the Pre- and Post-Action Workflows defined for each environment. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-release-with-workflows.png" 
url="/images/gitops-promotions/tutorials/seq-flow-release-with-workflows.png"
alt="Release view for policy-driven Promotion Flow" 
caption="Release view for policy-driven Promotion Flow"
max-width="60%"
%}

## Multi-environment promotion with parallel environments

In this scenario, we'll build on the `three-env-promotion` flow to create a promotion flow with additional environments and parallel promotions, and save it as a new flow.

Consider a multi-region deployment model, where you have designated primary regions for deployment, and you want promotions to pass successfully for all these regions and the production environment in parallel.

##### Context
In the Product dashboard, the `cf-101` product has applications in several production environments. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-prod-apps.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-prod-apps.png"
alt="Product with applications in multiple production environments" 
caption="Product with applications in multiple production environments"
max-width="60%"
%}


##### Adding environments to Promotion Flow

We'll add two additional production environments to `qa`: `prod-asia` and `prod-us`. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png"
alt="Adding parallel environments in Promotion Flow" 
caption="Adding parallel environments in Promotion Flow"
max-width="60%"
%}

Here's the promotion flow with the parallel environments:

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-created.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-created.png"
alt="Promotion Flow with parallel environments" 
caption="Promotion Flow with parallel environments"
max-width="60%"
%}


We'll save this as `parallel-env-promotion`. 

Triggering this flow displays the parallel promotion structure in the Release view.  
Promotions occur simultaneously for each environment, and the release is considered successful once all environments are promoted successfully.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-release.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-release.png"
alt="Release view of Promotion Flow with parallel environments" 
caption="Release view of Promotion Flow with parallel environments"
max-width="60%"
%}


## Multi-environment promotion with dependencies

In this final scenario, we’ll explore how to create dependencies between environments in a Promotion Flow.

By default, each environment in a promotion flow (except the trigger environment) is dependent on the one preceding it. However, critical environments may rely on the success or stability of multiple environments before they are promoted to. By defining additional dependencies, you can ensure that changes are promoted only when all required environments meet the specified criteria.

In this example, we’ll return to the `three-env-promotion` flow, add a parallel `staging` environment, and set a dependency on `staging` for `production`. This setup means changes are promoted to `production` only after both `qa` and `staging` have been successfully promoted.

In the example, we have already added the `staging` environment.  

Now we'll update the dependency on the `production` environment, by selecting `staging`, in addition to `qa`:

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-dependency.png" 
url="/images/gitops-promotions/tutorials/promo-flow-dependency.png"
alt="Update dependencies for environment" 
caption="Update dependencies for environment"
max-width="60%"
%}

Here's the `three-env-promotion` Promotion Flow with the updated dependency.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-updated-dependency.png" 
url="/images/gitops-promotions/tutorials/promo-flow-updated-dependency.png"
alt="Promotion Flow with updated dependencies" 
caption="Promotion Flow with updated dependencies"
max-width="60%"
%}

Now that you've seen how promotions work in Codefresh, explore the links in Related Articles to learn more about key entities, advanced configurations, and additional use cases.

## Related articles
[Promotion components]({{site.baseurl}}/docs/promotions/promotion-components/)  
[Promotion sequence]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Promotion Flow]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/)  
[Promotion Policy]({{site.baseurl}}/docs/promotions/configuration/promotion-policy/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  