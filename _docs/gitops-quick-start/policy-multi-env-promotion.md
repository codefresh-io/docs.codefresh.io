---
title: "Quick start: Advanced Promotion Flow with Promotion Workflows"
description: "Promote product apps between multiple environments with promotion conditions"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/policy-multi-env-promotion/
---

## Advanced Promotion Flow with Promotion Workflows quick start

Promotion Flows allow you to [automate promotions across multiple environments]({{site.baseurl}}/docs/gitops-quick-start/multi-env-sequential-flow/). 

This quick start explores how to enhance Promotion Flows by configuring conditions for each environment through Promotion Workflows.  
Promotion Workflows define the conditions under which changes are promoted to the next environment. They automate testing, validation, and other required checks, establishing gates to enforce promotion criteria.

For this quick start, we'll use the same Promotion Workflows created in [Quick Start: Creating Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/quick-start-promotion-workflow) within the Promotion Flow.
 
For detailed information, see [Configuring Promotion Workflows]({{site.baseurl}}/docs/promotions/promotion-workflow/).

## Promotion Workflows in Promotion Flows
Promotion Workflows define the conditions required for changes to be promoted to the next environment. They automate testing, quality checks, validation, and other deployment requirements for environments.

You can create workflows tailored to the specific tasks required during a promotion and categorize them based on when they run in the promotion process, as Pre-Action or Post-Action Workflows.

##### Pre-Action Workflows
A Pre-Action Workflow runs _before the promotion action is triggered_. These workflows handle tasks like smoke tests, unit tests, security scans-any validation that must pass before a change is promoted.
If the Pre-Action Workflow fails, the promotion is blocked, ensuring that only approved changes are advanced.
 
In this quick start, we'll use the **ServiceNow Promotion Workflow** to open a change request before the promotion starts.

##### Post-Action Workflows
A Post-Action Workflow runs _after the promotion action has completed_. These workflows handle tasks like performance monitoring, database migrations, or stakeholder notifications.  
Post-Action Workflows help verify that promoted changes behave as expected in the new environment and allow teams to respond to any issues.

In this quick start, we'll use the **Slack notification Promotion Workflow** to send a Slack notification when the promotion is complete. 


## Requirements

* [GitOps Runtime]({{site.baseurl}}/docs/gitops-quick-start/quick-start-install-runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/quick-start-configure-runtime/#add-git-source-to-runtime) to store application manifests
* [Products and applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)  
    * Each environment must have an application for the product. For example, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`representing the development, testing, and production versions.  
    * The repository structure must be consistent across all applications.   
    If it works for you, copy the corresponding subfolders in [demo-applications](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications) with the resources.
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)  
  A Promotion Flow requires at least three environments.
  In this quick start, we use `dev`, `qa`, and `prod`.
* [Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/quick-start-promotion-workflow/)


## Assign Pre- and Post-Action Workflows to environments in Promotion Flow
To ensure each environment's specific requirements are met, assign Promotion Workflows to govern promotion behavior.  
In this quick start, we’ll select the Promotion Workflows to govern promotion behavior for the `qa` and `prod` environments.

1. From the list of Promotion Flows, select the Promotion Flow you created, `multi-env-sequential-promotion` for the quick start.
1. In the Settings panel, update the **Version** to indicate changes in the flow, for example, `2.0`. 
1. Select the Promotion Workflows and the Promotion Action from the list. 
  The following examples show the Pre-Action Workflows available, and the `qa` environment configured with the Pre- and Post-Action Workflows and the Promotion Action.

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
1. Repeat _step 3_ to configure Promotion Workflows and Actions for the other target environments in the Promotion Flow.
   For this quick start, we'll select the same workflows and the same promotion action for `prod` as we did for `qa`.



  Here's the YAML view of the flow with the Promotion Workflows and Promotion Actions.

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
Trigger the Promotion Flow updated with the configured Pre- and Post-Action Workflows, and monitor its progress.

Unlike the previous release (without workflows), this release for the same Promotion Flow (`multi-env-sequential-promotion`), only promotes changes to the next environment when all workflows associated with the current environment are complete.

1. Open the Promotion Flow, for example,`multi-env-sequential-promotion` and click **Trigger**.
1. Select the product, the application to promote, and then click **Trigger** once again. 
1. Click **View Release Details**.  
  The following example shows the `qa` and `prod` environments with their respective Pre- and Post-Action Workflows. 

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
The final quick start on promotions covers creating dependencies between environments to define the order for promotions.

[Quick start: Advanced Promotion Flow with environment dependencies]({{site.baseurl}}/docs/gitops-quick-start/dependency-multi-env-promotion/)

 
 
