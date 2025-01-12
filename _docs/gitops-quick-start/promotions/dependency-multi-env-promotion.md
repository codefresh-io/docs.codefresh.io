---
title: "Quick start: Multi-environment promotion with dependencies"
description: "Promote product apps between environments with dependencies"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/dependency-multi-env-promotion/
---


In the final quick start, we’ll explore how to create dependencies between environments in a Promotion Flow.

By default, each environment in a promotion flow (except the trigger environment), is dependent on the one preceding it.  
However, critical environments may rely on the success or stability of multiple environments before they are promoted to. By defining additional dependencies, you can ensure that changes are promoted only when all required environments meet the specified criteria.

## In this quick start - dependency-based multi-environment promotions

In this quick start, we'll update the `multi-env-sequential-promotion` Promotion Flow.

* Create a new environment   
  Add a `staging` environment to our existing environments.  
  For guidelines, see [Create an environment]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/#create-an-environment) in the Environments quick start.

* Create a new application
  Create a new application `demo-trioapp-staging` aligned to `staging`.  
  For guidelines, see [Create an application]({{site.baseurl}}/docs/gitops-quick-start/products/create-app-ui/#create-your-first-application) in the Applications quick start.
 
* Modify and save `multi-env-sequential-promotion` Promotion Flow   
  * Add `staging` as a parallel environment to `qa`.
  * Create a dependency for `prod` on both `qa` and `staging` 
 
* Trigger the promotion  
  Manually trigger the Promotion Flow from within the Flow Builder to orchestrate the promotion.

* Monitor release 
  Track the progress of the promotion in the Releases tab for the `demo-trioapp` product.


## Follow-along Git repo

You can copy the manifests and the resources for the new application from the [public GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"}.

* Application manifest
  * [`trio-satging`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/argocd-app-manifests/trio-staging){:target="\_blank"}

* Application resources
  * [`trioapp-staging`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications/trioapp-staging){:target="\_blank"}



## Add dependency to Promotion Flow
Update the dependency on the `prod` environment, by selecting `staging` in addition to `qa`.

### Before you begin
* Ensure you have a new non-production environment, for example, `staging` in the quick start
* Ensure you have created and deployed an application to this environment, `demo-trioapp-staging` in the quick start

### Step-by-step
1. From the list of Promotion Flows, open `multi-env-sequential-promotion`.
  In the example, we have already added the `staging` environment as a parallel environment to `qa`.  
1. Mouse over the environment for which to add the dependency (`prod`), and click **Depends on**.
1. Select the additional environment, `staging` for the quick start, and then click **Update dependency**.

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

Here's the YAML view of the same flow with the updated dependency.

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
Triggering a Promotion Flow with dependencies promotes changes to the target environment only after all dependent environments are successfully promoted.

1. Open the `multi-env-sequential-promotion` Promotion Flow and click **Trigger**.
1. Select the product, the application to promote, and then click **Trigger** once again. 
1. Click **View Release Details**.

The Release view displays the dependencies in the Promotion Flow, showing that promotion to `prod` is contingent on the successful promotion of both `qa` and `staging`.  
In this example, while `qa` has been promoted successfully, `staging` is still pending promotion, preventing `prod` from starting its promotion.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-flow-release-view.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow-release-view.png"
alt="Promotions quick start: Release view of Promotion Flow with dependencies" 
caption="Promotions quick start: Release view of Promotion Flow with dependencies"
max-width="60%"
%}

Congratulations! You've completed the final quick start in the Promotion series!

By now, you’ve successfully created environments, your first product, added applications, and promoted them across environments. These foundational steps empower you to manage complex promotions confidently and effectively.

## Related articles
Now that you’ve mastered the basics, learn more on promotion settings for products and configuring promotion entities.
[Configuring version and promotable properties for products]({{site.baseurl}}/docs/products/promotion-version-properties/)  
[Configuring promotion flows and triggers for products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Configuring promotion entities]({{site.baseurl}}/docs/promotions/entities/)  



 
 