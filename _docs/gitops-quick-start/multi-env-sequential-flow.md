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
Promotion Flows, in contrast, offer a structured approach to promoting changes across multiple environments while minimizing deployment risks.

This quick start guides you through creating a Promotion Flow with three environments.

We'll do the following:

* Set up a Promotion Flow  
  Use the Flow Builder to create a Promotion Flow that promotes changes across multiple environments.

* Trigger the promotion  
  Manually trigger the Promotion Flow to orchestrate the promotion.

* Monitor release  
  Track the promotion's progress in the product's Releases tab.

## Example Git repository
To follow along, use the following applications in the [example GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"}. The repository contains the application manifests and resources for the quick starts:
* `trio-dev` for the `dev` environment
* `trio-qa` for the `qa` environment
* `trio-prod` for the `prod` environment



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


 <!--- add a link to the repo? -->

## Create a Promotion Flow for automated promotions
Promotion Flows allow for automated multi-environment promotions. You can create a Promotion Flow using the Flow Builder in either Chart or YAML mode.



>**NOTE**  
You must be an account administrator to create Promotion Flows.




##### Step-by-step
1. In the Codefresh UI, on the toolbar, click the **Settings** icon. 
1. From the sidebar select **Promotion Flows**, and then click **Add Promotion Flow**.
1. Enter the settings for the Promotion Flow:
    * **Name**: The name for the flow. For this quick start, we'll use `multi-env-sequential-promotion`. 
    * **Description**: (Optional) A brief description of the Promotion Flow. 
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
    1. Mouse over the right of the environment node to which to add the new environment (`dev` for example), and click {::nomarkdown}<img src="../../../images/icons/plus-icon.png" display=inline-block>{:/}.
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
1. Click **Save Promotion Flow**.  
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
Manually trigger the Promotion Flow to promote changes from the Trigger Environment to target environments.

##### Step-by-step
1. From the list of Promotion Flows, select the Promotion Flow you created, `multi-env-sequential-promotion` for example, and then click **Trigger** to initiate the promotion.

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
1. To start promotion, click **Trigger**.
1. Continue with [View and monitor product release](#view-and-monitor-product-release).

<!--- do we auto-select the app with the changes? -->


## View and monitor Product release 
Triggering the Promotion Flow creates a new release for the product (`demo-trioapp`), and orchestrates the changes sequentially through the environments defined in the Promotion Flow.

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

##### Release record in Releases tab

On the Releases page, the Promotion Flow column displays the name of the flow (`multi-env-sequential-promotion` for example) for traceability. For drag-and-drop promotions in contrast, this column displays Manual.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-seq-promo-release-list.png" 
url="/images/quick-start/promotions/quick-start-seq-promo-release-list.png"
alt="Promotions quick start: Release list with release record for triggered Promotion Flow" 
caption="Promotions quick start: Release list with release record for triggered Promotion Flow"
max-width="60%"
%}

## YAML for Promotion Flow
Here's the YAML for the `multi-env-sequential-promotion` Promotion Flow.

The YAML is saved in the Shared Configuration Repository of the GitOps Runtime selected as the Configuration Runtime.
The path in the Shared Configuration Repo is `<gitops-runtime>/<shared-configuration-repo>/resources/configurations/promotion-flows`.



```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionFlow
metadata:
  name: multi-env-sequential-promotion
  annotations:
    description: Sequential promotion flow
    version: "1.00"
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
```


## What's next
Before we move to more advanced scenarios for promotion applications, we'll create another key entity which enhances the promotion process—Promotion Workflows.  
Promotion Workflows are used in automated promotion flows to enforce quality, security, and compliance requirements at each stage of the promotion.

[Quick start: Creating Promotion Workflows]({{site.baseurl}}/docs/gitops-quick-start/quick-start-promotion-workflow/)






 
 