---
title: "Quick start: Simple Promotion Flow with multiple environments"
description: "Promote product apps between multiple environments sequentially"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/multi-env-sequential-flow/
---






## Simple Promotion Flow with multiple environments quick start
[Drag-and-drop promotion]({{site.baseurl}}/docs/gitops-quick-start/drag-and-drop/) is ideal for on-demand promotions to a single environment.  

In contrast, Promotion Flows offer a structured approach to promoting changes across multiple environments, minimizing deployment risks.

This quick start demonstrates creating a Promotion Flow with three environments:

* Set up a Promotion Flow  
  Learn to work with the Flow Builder to create a Promotion Flow that promotes changes across multiple environments.

* Trigger the promotion  
  Manually trigger the Promotion Flow from within the Flow Builder to orchestrate the promotion.

* Monitor release 
  Track the progress of the promotion in the `demo-trioapp` product's Releases tab.

## Follow-along Git repo
To follow along, you can use the following applications in the [example GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"} containing the application manifests and resources used in the quick starts:
* `trio-dev` for the `dev` environment
* `trio-qa` for the `qa` environment
* `trio-prod` for the `prod` environment

The structure of the repos with the resources must be consistent across all the three applications. See [demo-applications](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications){:target="\_blank"} in the Git repo.

## Requirements

* [GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/gitops-runtimes/create-git-source/) to store application manifests
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/)  
  For a Promotion Flow, you need at least three environments.
  Here we use `dev`, `qa`, and `prod`.
* [Products]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/) 
* [Applications]({{site.baseurl}}/docs/gitops-quick-start/products/create-app-ui/)  
  Each environment must have an application for the product.
  For example, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`representing the development, testing, and production versions.
  The structure of the repos with the resources accessed by the applications must be consistent across all the three applications.   
  If it works for you, copy the corresponding subfolders in [demo-applications](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications) with the resources. <!--- add a link to the repo? -->

## Create Promotion Flow for automated promotions
Codefresh simplifies creating multi-environment promotion sequences through Promotion Flows.  
You can use the Flow Builder in either Chart or YAML modes depending on your preference to create a Promotion Flow. 

>**NOTE**  
You need to be an account administrator to create Promotion Flows.




### Step-by-step
1. In the Codefresh UI, on the toolbar, click the **Settings** icon. 
1. From the sidebar select **Promotion Flows**, and then click **Add Promotion Flow**.
1. Enter the settings for the Promotion Flow:
    * **Name**: The name for the flow. For this quick start, we'll use `multi-env-sequential-promotion`. 
    * **Description**: (Optional) More information about the purpose of the Promotion Flow. 
    * **Flow Timeout**: The maximum duration allowed for the Promotion Flow to complete execution after being triggered, before it is automatically terminated. If not specified, the default timeout is 1 day (24 hours). For this quick start, we'll set it to `5 minutes`. 
    * **Version**: (Optional) The version of the Promotion Flow. This is manually defined and manually updated, and is useful to indicate changes in the same flow. For the quick start, we'll set it to `1.0`. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-settings.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-settings.png"
alt="Promotions quick start: Define Promotion Flow settings" 
caption="Promotions quick start: Define Promotion Flow settings"
max-width="60%"
%}

{:start="4"}
1. Click **>** to close the panel.
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

{:start="6"}
1. Select the target environments in the promotion sequence to which to promote changes. For example, `qa` and `prod`.
    1. Mouse over the right of the environment node to which to add the new environment (`dev` for example), and click {::nomarkdown}<img src="../../../../images/icons/plus-icon.png" display=inline-block>{:/}.
    1. From the list, select the first target environment in the flow, `qa` for this quick start.
    1. Repeat the action on the newly added environment node (for example, `qa`) to add the next target environment. 
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
file="/images/quick-start/promotions/quick-start-seq-promo-all-envs.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-all-envs.png"
alt="Promotions quick start: Promotion Flow with required environments" 
caption="Promotions quick start: Promotion Flow with required environments"
max-width="60%"
%}

{:start="7"}
1. Click **Save Promotion Flow** on the top-right.  
  The Name and Description are populated from the Settings. The flow's YAML version on the right lists the environment sequence.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-save-flow.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-save-flow.png"
alt="Promotions quick start: Save Promotion Flow" 
caption="Promotions quick start: Save Promotion Flow"
max-width="60%"
%}

{:start="8"}
1. To add the new flow to the Promotion Flows list, click **Save**.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-flow-list.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-flow-list.png"
alt="Promotions quick start: Promotion Flow list with new flow" 
caption="Promotions quick start: Promotion Flow page with new flow"
max-width="60%"
%}


{:start="9"}
1. Continue with [Trigger Promotion Flow](#trigger-promotion-flow).

## Trigger Promotion Flow
Manually trigger the Promotion Flow to promote changes from the Trigger Environment to the defined target environments.


1. From the list of Promotion Flows, select `multi-env-sequential-promotion` and then click **Trigger** to initiate the promotion.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-trigger.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-trigger.png"
alt="Promotions quick start: Trigger selected Promotion Flow" 
caption="Promotions quick start: Trigger selected Promotion Flow"
max-width="60%"
%}

{:start="2"}
1. Select the product to promote, for example, `demo-trioapp`, and continue by clicking **Next**.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-trigger-select-product.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-trigger-select-product.png"
alt="Promotions quick start: Select product to promote" 
caption="Promotions quick start: Select product to promote"
max-width="50%"
%}

{:start="3"}
1. Select the application with the changes to promote.  
  In our example, the application `demo-trioapp-dev` is automatically selected.
1. To initiate the promotion, click **Trigger**.
1. Continue with [View and monitor product release](#view-and-monitor-product-release).

<!--- do we auto-select the app with the changes? -->


## View and monitor product release 
On triggering the Promotion Flow, the promotion mechanism automatically creates a new release for the product (`demo-trioapp`), and orchestrates the changes sequentially through the environments defined in the Promotion Flow.

* Click **View Release Details** to go to the release view and monitor the sequential progression of changes through `dev`, `qa`, and `prod` as per the `multi-env-sequential-promotion` Promotion Flow.



{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-release-view.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-release-view.png"
alt="Promotions quick start: Release view for triggered Promotion Flow" 
caption="Promotions quick start: Release view for triggered Promotion Flow"
max-width="60%"
%}

##### Release record in releases list

In the Releases page, the Promotion Flow column displays the name of the flow (`multi-env-sequential-promotion` for example) for traceability. For drag-and-drop promotions in contrast, this column displays Manual.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-release-list.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-release-list.png"
alt="Promotions quick start: Release list with release record for triggered Promotion Flow" 
caption="Promotions quick start: Release list with release record for triggered Promotion Flow"
max-width="60%"
%}

## YAML 

  annotations:
    description: ""
    version: "1.0"
spec:
  triggerEnvironment: dev
  steps:
    - environment: qa
      dependsOn:
        - dev
      policy:
        action: commit
    - environment: prod
      dependsOn:
        - qa
      policy:
        action: commit
  promotionTimeoutLimit: 5


## What's next
The next quick start will guide you through adding Promotion Workflows to each environment, acting as gates for conditional promotions, allowing you to introduce more control and flexibility in your promotion processes.

[Quick start: Automated promotions: Advanced Promotion Flow with Promotion Workflows]({{site.baseurl}}/docs/git/docs/gitops-quick-start/policy-multi-env-promotion/)

 
 