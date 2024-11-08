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
After setting up the basics, use the Promotion Flow entity to orchestrate promotion sequences for multiple environments. Promotion Flows support more complex, multi-environment deployment strategies.

##### Promotion Workflows
Adding Promotion Workflows introduces validations and checks that ensure each environment in the sequence meets your standards.


Here are the promotion scenarios that take you through the different scenarios:

[Drag-and-drop promotions](#drag-and-drop-promotion)  
[Multi-environment sequential promotion](#multi-environment-sequential-promotion)  
[Policy-driven multi-environment promotion](#policy-driven-multi-environment-promotion)  
[Parallel multi-environment promotion](#parallel-multi-environment-promotion)  
[Promotion with environment dependencies](#promotion-with-environment-dependencies)




## Drag-and-drop promotion

In this basic scenario, we'll show you how to promote products in the Environments dashboard using drag-and-drop functionality. 
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
file="/images/gitops-promotions/tutorials/dnd-action.png" 
url="/images/gitops-promotions/tutorials/dnd-action.png"
alt="Drag and drop `cf-101` to promote" 
caption="Drag and drop `cf-101` to promote"
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
In this scenario, we’ll set up a Promotion Flow to move changes in the `cf-101` product through three environments: `dev`, `qa`, and `production`. 
We'll also trigger the promotion to orchestrate changes through each environment.


>**NOTE**  
You must be an account administrator to create Promotion Flows.  
For successful promotion, each environment must have an application for the product in the Promotion Flow, with a consistent repo structure.

##### Adding Promotion Flow

* Click **Settings**, and from the sidebar select **Promotion Flows** and then click **Add Promotion Flow**.

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


The Promotion Flow has its first environment. 

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
Next, we'll select the target environments in the sequence: `qa` and `production`.


* Hover over the right of the `dev` environment node, and click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/}.
* Select the target environment from the list.
* Repeat to add each target environment. 

 
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

Add a name and optional description, and click **Save**. The flow's YAML file lists the environment sequence.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Required target environments in Promotion Flow" 
caption="Required target environments in Promotion Flow"
max-width="60%"
%}

The new flow, `three-env-promotion`, is added to the Promotion Flows page.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Promotion Flow page" 
caption="Promotion Flow page"
max-width="60%"
%}

##### Triggering Promotion Flow
After creating the flow, trigger it to promote changes from the trigger environment to the defined target environments.

First select the flow to trigger from the list of Promotion Flows, and then click **Trigger** to initiate the promotion.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png"
alt="Trigger selected Promotion Flow" 
caption="Trigger selected Promotion Flow"
max-width="60%"
%}

Select the product for which to trigger the flow and click **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png"
alt="Select product to promote" 
caption="Select product to promote"
max-width="60%"
%}

Select the application with the changes to promote and click **Trigger**.
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
The promotion mechanism creates a release for the product. 
Changes are orchestrated sequentially through the environments, following the order defined in the Promotion Flow.



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
In this scenario, we’ll configure policies for a multi-environment Promotion Flow to manage promotion conditions, ensuring that each environment’s specific requirements are met before changes are promoted.

##### What are Promotion Policies?
Promotion Policies define the criteria for promoting changes through each environment. They can include automated tests, scans, quality checks, approvals, notifications, and more.  
You can define these checks or tests through Promotion Workflows, modeled on Argo Workflows.

To create Promotion Workflows, select **Promotion Workflows** from the sidebar.





##### Assigning Policy settings

Promotion Policies support three optional settings:
* **Pre-Action Workflow**: The workflow to run before the Promotion Action.
* **Promotion Action**: The action that promotes the changes, which defaults to Commit if not set.
* **Post-Action Workflow**: The workflow to run after the Promotion Action.

Open the Promotion Flow, and select the Pre- and Post-Action Workflows, and the Promotion Action settings for each target environments to manage promotion behavior.



{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-pre-action.png" 
url="/images/gitops-promotions/tutorials/seq-flow-pre-action.png"
alt="Policy settings for target environments" 
caption="Policy settings for target environments"
max-width="60%"
%}




##### Triggering policy-driven Promotion Flow
Trigger the Promotion Flow and monitor the release in the Release page.
In contrast to the previous release, the current release view shows the `qa` and `productions` environments with the Pre- and Post-Actions defined for each environment. 

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

In this scenario, we'll create a more complex promotion flow, with additional environments and parallel promotions. 

Consider a multi-region deployment model, where you have designated primary regions for deployment and you want promotions to pass successfully for all these regions and the production environment in parallel.

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

Add environments to the Promotion Flow before the final target environment.
We'll add two additional production environments to `qa`. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs.png"
alt="Adding parallel environments in Promotion Flow" 
caption="Adding parallel environments in Promotion Flow"
max-width="60%"
%}

Save this as a new Promotion Flow if needed. 

When you trigger this flow and monitor the Release view, you'll see that it is structured accordingly.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-release.png" 
url="/images/gitops-promotions/tutorials/promo-flow-parallel-envs-release.png"
alt="Release view of parallel environments" 
caption="Release view of parallel environments"
max-width="60%"
%}


## Promotion with environment dependencies
In this final scenario, we’ll examine how to create dependencies between environments in a Promotion Flow. 

Be default, every environment in a flow is dependent on the one preceding it.  
Critical environments may rely on the stability or success of another before they can be promoted to. By defining additional dependencies for an environment, you can ensure that the changes are promoted only when all dependent environments meet all criteria.

In our example, we want to add a `staging` environment, and then add a dependency on `staging` for `production`.
What this means that changes are promoted to `production` only after both `qa` and `staging` are successfully promoted.  


Update the dependency for your `production` environment:

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-dependency.png" 
url="/images/gitops-promotions/tutorials/promo-flow-dependency.png"
alt="Update dependencies for environment" 
caption="Update dependencies for environment"
max-width="60%"
%}

Here's the Promotion Flow with the updated depenencu

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/promo-flow-updated-dependency.png" 
url="/images/gitops-promotions/tutorials/promo-flow-updated-dependency.png"
alt="Promotion Flow with updated dependencies" 
caption="Promotion Flow with updated dependencies"
max-width="60%"
%}

## Related articles
[Promotion components]({{site.baseurl}}/docs/promotions/promotion-components/)
[Promotion sequence]({{site.baseurl}}/docs/promotions/create-promotion-sequence/)  
[Promotion Flow]({{site.baseurl}}/docs/promotions/configuration/promotion-flow/)  
[Promotion Policy]({{site.baseurl}}/docs/promotions/configuration/promotion-policy/)  
[Trigger promotions]({{site.baseurl}}/docs/promotions/trigger-promotions/)  
[Tracking product releases]({{site.baseurl}}/docs/promotions/product-releases/)  