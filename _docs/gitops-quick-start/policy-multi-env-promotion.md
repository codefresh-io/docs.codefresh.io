---
title: "Quick start: Advanced Promotion Flow with Promotion Workflows"
description: "Promote product apps between multiple environments with promotion conditions"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/policy-multi-env-promotion/
---

## Advanced Promotion Flow with Promotion Workflows quick start

With a Promotion Flow you can [automate promotions across multiple environments]({{site.baseurl}}/docs/gitops-quick-start/multi-env-sequential-flow/). 

This quick start explores how to enhance Promotion Flows by configuring conditions for each environment in the flow through Promotion Workflows.  
Promotion Workflows define the conditions under which changes are promoted to the next environment. They automate testing, validation, and other required checks, establishing gates that control how changes are promoted between environments.

For this quick start, we'll use the same Promotion Workflows we created [Quick Start: Creating Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/quick-start-promotion-workflow) within the Promotion Flow.
 
For detailed information, see [Configuring Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).

## Promotion Workflows in Promotion Flows
Promotion Workflows are designed to define the conditions under which changes are promoted to the next environment. They provide a way to automate testing, quality checks, validation, and any other requirements based on your deployment process, establishing gates that control the flow of changes between environments.

You can create workflows tailored to the specific tasks required during a promotion and categorize them based on the stage of the promotion process in which they are executed, as Pre- and Post-Action Workflows.

##### Pre-Action Workflows
A Pre-Action Workflow runs _before the promotion action is triggered_. These workflows can be used for tasks like smoke tests, unit tests, security scans, or any other validation that must pass before a change is promoted to the next environment.
If any validation in the Pre-Action Workflow fails, the promotion is blocked, ensuring that only approved changes proceed to the next environment.
 
In this quick start, we'll use the ServiceNow Promotion Workflow to open a change request before the promotion starts.

##### Post-Action Workflows
A Post-Action Workflow runs _after the promotion action has completed_. These workflows can be used for tasks like performance monitoring, database migrations, or notifications to inform stakeholders that the promotion is complete.  
Post-Action Workflows help ensure that promoted changes behave as expected in the new environment and allow teams to respond to any issues.

In this quick start, we'll use the Slack notification Promotion Workflow to send a Slack notification when the promotion is complete. 


## Requirements

* [GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/create-git-source/) to store application manifests
* [Products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)  
  Each environment must have an application for the product.
  For example, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`representing the development, testing, and production versions.
  The structure of the repos with the resources accessed by the applications must be consistent across all the three applications.   
  If it works for you, copy the corresponding subfolders in [demo-applications](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications) with the resources. <!--- add a link to the repo? -->
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)  
  For a Promotion Flow, you need at least three environments.
  Here we use `dev`, `qa`, and `prod`.
* [Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/quick-start-promotion-workflow/)


## Assign Pre- and Post-Action Workflows to environments in Promotion Flow
To ensure each environment's specific requirements are met, assign Promotion Workflows to govern promotion behavior.  
In this quick start, we’ll select the Promotion Workflows to govern promotion behavior for the `qa` and `prod` environments.

1. From the Promotion Flow list, select the Promotion Flow you created, `multi-env-sequential-promotion` for the quick start.
1. In the Settings panel, update the **Version** to indicate changes in the flow, for example, `2.0`. 
1. Assign the workflows by clicking the respective controls and selecting the Promotion Workflows and the Promotion Action from the list. 
  The examples below show the Pre-Action Workflows available, and the `qa` environment configured with the Pre- and Post-Action Workflows and the Promotion Action.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-policy-settings.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-policy-settings.png"
alt="Promotions quick start: Pre-Action Workflow to govern promotion behavior for environment" 
caption="Promotions quick start: Pre-Action Workflow to govern promotion behavior for environment"
max-width="60%"
%}

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-policy-populated.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-policy-populated.png"
alt="Promotions quick start: Target environment configured with Promotion Workflows and Action" 
caption="Promotions quick start: Target environment configured with Promotion Workflows and Action"
max-width="60%"
%}

{:start="4"}
1. Repeat _step 3_ to select the Promotion Workflows and Actions for the other target environments in the Promotion Flow.
   For this quick start, we'll select the same workflows and the same promotion action for `prod` as we did for `qa`.



  Here's the YAML view of the flow with the workflows and promotion actions.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-policy-yaml.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-policy-yaml.png"
alt="Promotions quick start: YAML view of Promotion Flow with Promotion Workflows" 
caption="Promotions quick start: YAML view of Promotion Flow with Promotion Workflows"
max-width="60%"
%}

{:start="5"}
1. To save the changes, click **Save Promotion Flow**.
1. Continue with [Trigger Promotion Flow and monitor Product release](#trigger-promotion-flow-and-monitor-product-release).


## Trigger Promotion Flow and monitor product release
Trigger the Promotion Flow updated with the appropriate Pre- and Post-Action Workflows, and monitor its progress.

The difference between the previous release (without workflows), and this one (with workflows), for the same Promotion Flow (`multi-env-sequential-promotion`), is that changes will only be promoted to the next environment when all workflows associated with the previous environment are complete.

1. Open the Promotion Flow, for example,`multi-env-sequential-promotion` and click **Trigger**.
1. Select the product, the application to promote, and then click **Trigger** once again. 
1. Click **View Release Details**.  
  In the example below, the current release view shows the `qa` and `prod` environments with the Pre- and Post-Action Workflows defined for each environment. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-policy-release.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-policy-release.png"
alt="Promotions quick start: Release view for gated Promotion Flow" 
caption="Promotions quick start: Release view for gated Promotion Flow"
max-width="60%"
%}



## What's next
The final quick start on promotions will guide you through creating dependencies between environments to define the order for promotions.

[Quick start: Advanced Promotion Flow with environment dependencies]({{site.baseurl}}/docs/gitops-quick-start/dependency-multi-env-promotion/)

 
 
