---
title: "Quick start: Advanced Promotion Flow with environment dependencies"
description: "Promote product apps between environments with dependencies"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/dependency-multi-env-promotion/
---


## Advanced Promotion Flow with environment dependencies quick start

By default, each environment in a promotion flow (except the Trigger Environment), is dependent on the one preceding it.  
However, critical environments may rely on the success or stability of multiple environments before they are promoted to. By defining additional dependencies, you can ensure that changes are promoted only when all required environments meet the specified criteria.

This quick start shows how to create additional dependencies between environments in a Promotion Flow.  
We'll do the following:
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

## Requirements

* [GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/gitops-runtimes/create-git-source/) to store application manifests
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-gitops-environments/)  
* [Products]({{site.baseurl}}/docs/gitops-quick-start/products/quick-start-product-create/) 
* [Applications]({{site.baseurl}}/docs/gitops-quick-start/products/create-app-ui/)  
  Each environment must have an application for the product.  
  For example, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`representing the development, testing, and production versions.
  The structure of the repos with the resources accessed by the applications must be consistent across all the three applications.   
  If it works for you, copy the corresponding subfolders in [demo-applications](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications) with the resources.




## Example Git repo

You can copy the manifests and the resources for the new application from the [example GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"}.

* Application manifest
  * [`trio-staging`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/argocd-app-manifests/trio-staging){:target="\_blank"}

* Application resources
  * [`trioapp-staging`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications/trioapp-staging){:target="\_blank"}



## Add dependency to Promotion Flow
Update the dependency on the `prod` environment, by selecting `staging` in addition to `qa`.

### Before you begin
* Ensure that you have: 
    * A new environment on which we'll create the dependency, `staging` in our example. 
    * Application in the new environment 
      For the quick start, we created the `demo-trioapp-staging` application aligned to `staging`. 


### Step-by-step
1. From the list of Promotion Flows, open the Promotion Flow you created, for example, `multi-env-sequential-promotion`.
1. If required, change the **Version** to 3.00.
1. Mouse over the right of the environment node before the final one in the flow, and add the new environment you created as a parallel environment.  
  In the example, we added the `staging` environment as a parallel environment to `qa`.  
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
Trigger the Promotion Flow with dependencies and monitor how change are promoted to the target environment only after all dependent environments are successfully promoted.

1. Open the Promotion Flow with environment dependencies, `multi-env-sequential-promotion` for the quick start, and click **Trigger**.
1. Select the product, the application to promote, and then click **Trigger** once again. 
1. Click **View Release Details**.

The Release view highlights the dependencies within the Promotion Flow, indicating that promotion to the final environment depends on the successful promotion of one or more environments.  
In the example below, `prod` is dependent on both `qa` and `staging`. While `qa` has been promoted successfully, `staging` is still pending promotion, preventing `prod` from starting its promotion.


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-dependency-flow-release-view.png" 
url="/images/quick-start/promotions/quick-start-dependency-flow-release-view.png"
alt="Promotions quick start: Release view of Promotion Flow with dependencies" 
caption="Promotions quick start: Release view of Promotion Flow with dependencies"
max-width="60%"
%}



By now, you’ve successfully created environments, your first product, added applications, and promoted them across environments.  
These foundational steps empower you to manage complex promotions confidently and effectively.

## Related articles
Now that you’ve mastered simple and advanced promotion, you may want to learn more on customizing promotion settings for products. 
* [Configuring version and promotable properties for Products]({{site.baseurl}}/docs/products/promotion-version-properties/)  
* [Configuring Promotion Flows and triggers for Products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   



 
 