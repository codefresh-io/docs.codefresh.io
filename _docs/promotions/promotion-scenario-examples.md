



A successful promotion sequence relies on several key components that together govern and orchestrate the promotion flow across environments.The sections that follow takes you through configuring several scenarios for promotions, from basic to complex promotions .

## From basic to complex promotions
The promotion process begins with the core entities that also enable simple deployments and gradually evolves into more complex flows, as additional requirements arise. 

Here’s how you move from basic to advanced promotion sequences:

Applications, Products, and Environments: These are core deployment entities, required for all types of promotions. Products allow you to group and configure related applications, and environments define where changes to these applications are promoted.  
These entities allow for quick drag-and-drop promotions across two environments and an option to select the target to promote to. 

Promotion Flow: Once the basics are in place, you can establish orchestration in your promotion sequence. Promotion Flow allows you to define how changes move through multiple environments, to accommodate more complex, multi-environment deployment strategies.

Promotion Workflows: Introducing Argo Workflows adds validations and checks ensures that each environment in the sequence meets your standards and is ready for changes, transitioning from basic deployments to rigorous testing and verification processes.

Promotion Policies: With a structured promotion flow and workflows established, you can implement policies that define rules for your promotions. These can range from global to environment-specific policies, ensuring that promotions comply with operational requirements and maintain consistency across environments and products.

Promotion Templates: Finally, Promotion Templates serve to further streamline your processes by allowing you to define precisely the changes  Templates simplify the configuration of promotion attributes for product groups, allowing you to quickly adapt standard settings to multiple products without redundant configuration.
enhance consistency, create reusable templates that apply across products. 

## Basic: Drag-and-drop promotion

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
After committing, a release is automatically created for `cf-101` with a new Release ID, and you are taken to the Releases page.

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

## Promotion Flow: Multi-environment sequential promotion
Drag-and-drop is useful for on-demand promotion to a single environment, but most likely you'll want or need to promote to multiple environments.
That's what you can do with our Promotion Flows. 

In this scenario, we'll show you how to  create a simple Promotion Flow woith three environments and then trigger the promotion to see how changes are orchestrated through the environments.

Easily create a promotion Flow visually with Flow Builder.
Only account administrators can create Promotion Flows so you may need to ask your acocunt admin to create one for you.

For the promotion to succeed, the product must include an application in each environment defined in the Promotion Flow. 
Each application must have the same repo structure.

##### Context
Create a Promotion Flow with three environments, `dev`, `qa`, and `production`, and trigger the Promption Flow to promote changes in the cf-101 product's applications in these environments to create and deploy a release.

Promote the changes in cf-101 from dev to qa and staging through a Promotion Flow.

##### Add Promotion Flow

Create a Promotion Flow with three environments, `dev`, `qa`, and `production`.

1. Go to **Settings**, and from the sidebar select **Promotion Flows** and then click **Add Promotion Flow**.

##### Trigger Environment
The Trigger Environment is the environment with the application that will initiate the promotion.
You can select any environment as the Trigger Environment, which is typicall `dev`.

1. Click **Select Trigger Environment**, select the environment from the list, and click **Add**.


{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env.png"
alt="Selecting Trigger Environment" 
caption="Selecting Trigger Environment"
max-width="60%"
%}


Your Promotion Flow now has it's first environment. 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env-created.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-env-created.png"
alt="Flow Builder with first environment" 
caption="Flow Builder with first environment"
max-width="60%"
%}

##### Target environments
The next steps are to add the other environments to which you want to promote.


1. Mouse over the right of the `dev` environment node, and click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/}.
1. Select the target environment, and click **Add**.
 
{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-target-env.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-target-env.png"
alt="Add target environment" 
caption="Add target environment"
max-width="60%"
%}

1. Repeat the above steps to add other target environments.

Our Promotion Flow now has the three environments required: `dev`, `qa`, and `production`.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Required target environments in Promotion Flow" 
caption="Required target environments in Promotion Flow"
max-width="60%"
%}

##### Save Promotion Flow
The final step is to save the Promotion Flow by committing to Git.
As all aspects of promotions are declarative and Git-based, ...

1. On the top-right, click **Save Promotion Flow**.
1. Add the name, an optional description and click **Save**.
  You can also see the YAML version of the Promotion Flow you created, clearly listing the environments and their dependencies.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Required target environments in Promotion Flow" 
caption="Required target environments in Promotion Flow"
max-width="60%"
%}

The new flow is synced to the cluster and added to the Promotion Flows page.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-all-target-envs.png"
alt="Promotion Flow page" 
caption="Promotion Flow page"
max-width="60%"
%}

##### Trigger promotion flow
Trigger the Promotion Flow you created to orchestrate changes from the trigger to the target environments defined in the flow.

1. From the list of Promotion Flows, select the flow to trigger. 
1. Click **Trigger**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow.png"
alt="Trigger selected Promotion Flow" 
caption="Trigger selected Promotion Flow"
max-width="60%"
%}

1. Select the product for which to trigger the flow and click **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png" 
url="/images/gitops-promotions/tutorials/seq-promo-flow-trigger-flow-select-product.png"
alt="Select product to promote" 
caption="Select product to promote"
max-width="60%"
%}

1. Select the application to promote and click **Trigger**.
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


##### Monitor release 


## Policy-driven Promotion Flow
In this scenario, we’ll explore how to set policies for a Promotion Flow to control promotion actions and ensure each environment’s unique requirements are met before advancing to the next stage.

##### About Promotion Policies
Promotion Policies control the conditions for advancing promotion through each environment. Policies can implement or run automated testing or scanning, quality checks and approvals, and any 

Whatever the tests or approvals you need to carry out, are implemented throgh Promotion Workflows. Promotion Workflows are Argo Workflows.
You can create them directly within Codefresh 


##### Context
Configure policy settings for the Promotion Flow to run Workflows and validate promotion behavior for the target environments in the Promotion Flow.

##### Configure Policy settings for Promotion Flow

From the list of Promotion Flows, select the Promotion Flow. 
Mouse over the connector between the first and second environment, and do the following:
    Select the Workflow to run before the Promotion Action.
    Select the Promotion Action as Commit.
    Select the Workflow to run after the Promotion Action.

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-pre-action.png" 
url="/images/gitops-promotions/tutorials/seq-flow-pre-action.png"
alt="Select product's application to promote" 
caption="Select product's application to promote"
max-width="60%"
%}

Repeat to add Pre-, Post-Action, and Action to other target environments.


##### Trigger policy-driven Promotion Flow
Trigger the Promotion Flow and monitor the release in the Release page.
In contrast to the previous release, the current release shows the `qa` and `staging` environments with 

{% include 
image.html 
lightbox="true" 
file="/images/gitops-promotions/tutorials/seq-flow-release-with-workflows.png" 
url="/images/gitops-promotions/tutorials/seq-flow-release-with-workflows.png"
alt="Release view for policy-driven Promotion Flow" 
caption="Release view for policy-driven Promotion Flow"
max-width="60%"
%}

## Promotion Flow with parallel promotions

In this scenario, we'll create a more complex promotion flow, with additional environments and parallel promotions. 

Consider a multi-region deployment model, where you have designated primary regions for deployment and you want promotions to pass successfully for all these regions before promoting to the production environment.

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


##### Add environments to Promotion Flow

Add environments to the Promotion Flow before the final target environment.
We'll add two production environments to `qa`. 

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


## Promotion Flow with environment dependencies
In this final scenario, we’ll examine how to create dependencies between environments in a Promotion Flow. 

Be default, every environment in a flow is dependent on the one preceding it.  
Critical environments may rely on the stability or success of another before they can be promoted to. By defining additional dependencies, you can ensure that the changes are promoted only when all dependent environments meet all criteria.

In our example, we want to add a staging envrionment and add a dependency on staging for production.
What this means that changes are promoted to production only after both qa and staging are successfully promoted.  


Update the dependency for your `production`

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