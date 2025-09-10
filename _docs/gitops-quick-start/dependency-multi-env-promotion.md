---
title: "Quick start: Advanced Promotion Flow with environment dependencies"
description: "Promote product apps between environments with dependencies"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/dependency-multi-env-promotion/
---

>**Promotions is currently in development**  
This feature is still under active development and we've identified some issues with its resilience and reliability, particularly with recovery from cluster and network problems. We are currently upgrading our architecture to resolve these known issues and add self-healing capabilities.
We don't recommend using Promotions for mission-critical or production deployments at this time.

## Advanced Promotion Flow with environment dependencies quick start

By default, each environment in a Promotion Flow (except the Trigger Environment), is dependent on the one preceding it.  
However, critical environments may rely on the success or stability of multiple environments before changes can be promoted to them. By defining additional dependencies, you ensure that changes are promoted only when all required environments meet the specified criteria.

This quick start shows how to create additional dependencies between environments in a Promotion Flow.  
We'll do the following:
* Create a new environment   
  Add a `staging` environment to the existing environments.  


* Create a new application
  Create a new application `demo-trioapp-staging` aligned to `staging`.  

 
* Modify and save `multi-env-sequential-promotion` Promotion Flow  
  * Add `staging` as a parallel environment to `qa`.
  * Create a dependency for `prod` on both `qa` and `staging` 
 
* Trigger the promotion  
  Manually trigger the Promotion Flow from within the Flow Builder to orchestrate the promotion.

* Monitor release  
  Track the progress of the promotion in the Releases tab for the `demo-trioapp` product.

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





## Example Git repository

You can copy the manifests and the resources for the new application from the [example GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"}.

* Application manifest
  * [`trio-staging`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/argocd-app-manifests/trio-staging){:target="\_blank"}

* Application resources
  * [`trioapp-staging`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications/trioapp-staging){:target="\_blank"}



## Add a dependency to Promotion Flow
Update the dependency on the `prod` environment, by selecting `staging` in addition to `qa`.

### Before you begin
* Make sure you have: 
  * A new environment for the additional dependency, `staging` in our example. 
  * Application in the new environment 
    `demo-trioapp-staging` for the quick start. 


### Step-by-step
1. From the list of Promotion Flows, open the Promotion Flow you created, for example, `multi-env-sequential-promotion`.
1. If required, change the **Version** to 3.00.
1. Mouse over the right of the environment node before the final environment in the flow, and add the new environment you created as a parallel environment.  
  In the example, `staging` is the parallel environment to `qa`.  
1. Mouse over the final environment node in the Promotion Flow for which to add the dependency, `prod` for the quick start, and click **Depends on**.  
1. Select the new environment you added, `staging` for the quick start, and then click **Update dependency**.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-update.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow.png"
alt="Promotions quick start: Update dependencies for environment" 
caption="Promotions quick start: Update dependencies for environment"
max-width="60%"
%}


Here's the `multi-env-sequential-promotion` Promotion Flow with the updated dependency.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-flow.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow.png"
alt="Promotions quick start: Chart view of Promotion Flow with updated dependencies" 
caption="Promotions quick start: Chart view of Promotion Flow with updated dependencies"
max-width="60%"
%}

Here's the YAML view of the same Promotion Flow with the updated dependency.

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-flow-yaml.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow-yaml.png"
alt="Promotions quick start: YAML view of Promotion Flow with updated dependencies" 
caption="Promotions quick start: YAML view of Promotion Flow with updated dependencies"
max-width="60%"
%}

{:start="4"}
1. Continue with [Trigger and view product release with dependencies](#trigger-and-view-product-release-with-dependencies).

## Trigger and view product release with dependencies
Trigger the Promotion Flow with dependencies and and verify that changes are promoted to the final environment only after all dependent environments are successfully promoted.

1. Open the Promotion Flow with environment dependencies, `multi-env-sequential-promotion` for the quick start, and click **Trigger**.
1. Select the product, the application to promote, and then click **Trigger** once again. 
1. Click **View Release Details**.

The Release view highlights the dependencies within the Promotion Flow, indicating that promotion to the final environment depends on the successful promotion of one or more environments.  
In the following example, `prod` is dependent on both `qa` and `staging`. `qa` has been promoted, but `staging` is still pending, preventing `prod` from starting promotion.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-flow-release-view.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow-release-view.png"
alt="Promotions quick start: Release view of Promotion Flow with dependencies" 
caption="Promotions quick start: Release view of Promotion Flow with dependencies"
max-width="60%"
%}

## YAML of Promotion Flow with dependencies
Here's the YAML of the `multi-env-sequential-promotion` Promotion Flow, updated with dependencies.


The YAML is saved in the Shared Configuration Repository of the GitOps Runtime selected as the Configuration Runtime.
The path in the Shared Configuration Repo is `<gitops-runtime>/<shared-configuration-repo>/resources/configurations/promotion-flows`.

```yaml
apiVersion: codefresh.io/v1beta1
kind: PromotionFlow
metadata:
  name: multi-env-sequential-promotion
  annotations:
    description: Sequential promotion flow with environment dependencies
    version: "3.0"
spec:
  triggerEnvironment: dev
  steps:
    - environment: qa
      dependsOn:
        - dev
      policy:
        action: commit
        preAction: pre-action
        postAction: post-action
    - environment: prod
      dependsOn:
        - qa
        - staging
      policy:
        action: commit
        preAction: pre-action
        postAction: post-action
    - environment: staging
      dependsOn:
        - dev
      policy:
        action: commit
  promotionTimeoutLimit: 5
```


By now, you’ve successfully created environments, created a product and applications, and promoted them across environments.  
These foundational steps empower you to manage complex promotions confidently and effectively.

## Related articles
Now that you’ve covered simple and advanced promotion scenarios, learn more on customizing promotion settings for products: 
* [Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/promotion-version-properties/)  
* [Selecting Promotion Flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   



 
 