---
title: "Quick start: Advanced Promotion Flow with parallel environments"
description: "Promote product apps between environments in parallel"
group: gitops-quick-start
toc: true
redirect_from:
  - /docs/promotions/promotion-scenarios/parallel-multi-env-promotion/
---




## Advanced Promotion Flow with parallel environments quick start



Parallel environments allow promotions across multiple environments. Parallel promotions are ideal for scenarios like multi-region deployments, where updates must be promoted simultaneously to designated regions before proceeding to a production environment. 

This quick start describes how to configure parallel promotions in Promotion Flows.




## Requirements

* [GitOps Runtime]({{site.baseurl}}/docs/quick-start/gitops-quick-start/runtime/)
* [Git Source]({{site.baseurl}}/docs/gitops-quick-start/gitops-runtimes/create-git-source/) to store application manifests
* [Environments]({{site.baseurl}}/docs/gitops-quick-start/quick-start-gitops-environments/)  
* [Products]({{site.baseurl}}/docs/gitops-quick-start/quick-start-product-create/) 
* [Applications]({{site.baseurl}}/docs/gitops-quick-start/create-app-ui/)  
  Each environment must have an application for the product.
  For example, `demo-trioapp-dev`, `demo-trioapp-qa`, and `demo-trioapp-prod`representing the development, testing, and production versions.
  The structure of the repos with the resources accessed by the applications must be consistent across all the three applications.   
  If it works for you, copy the corresponding subfolders in [demo-applications](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications) with the resources. <!--- add a link to the repo? -->





## Follow-along Git repo

You can copy the manifests and the resources for the new applications from the [example GitHub repository](https://github.com/codefresh-sandbox/codefresh-quickstart-demo){:target="\_blank"}.

* Application manifests
  * [`trio-prod-asia`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/argocd-app-manifests/trio-prod-asia){:target="\_blank"}
  * [`trio-prod-eu`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/argocd-app-manifests/trio-prod-eu){:target="\_blank"}

* Application resources
  * [`trioapp-prod-asia`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications/trioapp-prod-asia){:target="\_blank"}
  * [`trioapp-prod-eu`](https://github.com/codefresh-sandbox/codefresh-quickstart-demo/tree/main/demo-applications/trioapp-prod-eu){:target="\_blank"}

## Add parallel environments to Promotion Flow

We'll enhance the Promotion Flow by adding multiple environments to execute promotions in parallel.  


### Before you begin
* Ensure that you have: 
    * More than one production environment  
      For the quick start, we created `prod-asia` and `prod-eu` as additional production environments. 
    * Applications in each of the new environments  
      For the quick start, we created two different applications `demo-trioapp-eu`, `demo-trioapp-asia`, aligned to `prod-asia` and `prod-eu`.  


{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-dashboard-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-dashboard-view.png"
alt="Promotions quick start: Product with applications in multiple production environments" 
caption="Promotions quick start: Product with applications in multiple production environments"
max-width="60%"
%}

### Step-by-step
1. Open the Promotion Flow you created, `multi-env-sequential-promotion` for the quick start.
1. Open the Settings panel:
    * **Name**: Change the name to create a new Promotion Flow, `multi-env-parallel-promotion`.
    * **Version**: Change the version to 1.00.
1. Mouse over the right of the environment node before the final one in the flow and add the new environments you created.
  For the quick start, we'll add `prod-eu` and `prod-asia` to `qa`.

  {% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-add-envs.png" 
url="/images/quick-start/promotions/quick-start-parallel-add-envs.png"
alt="Promotions quick start: Adding parallel environments in Promotion Flow" 
caption="Promotions quick start: Adding parallel environments in Promotion Flow"
max-width="60%"
%}

{:start="4"}
1. Click **Save Promotion Flow**.


Below are the Chart and YAML views of the Promotion Flow. 

{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-chart-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-chart-view.png"
alt="Promotions quick start: Chart view of Promotion Flow with parallel environments" 
caption="Promotions quick start: Chart view of Promotion Flow with parallel environments"
max-width="60%"
%}



{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-envs-yaml-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-envs-yaml-view.png"
alt="Promotions quick start: YAML view of Promotion Flow with parallel environments" 
caption="Promotions quick start: YAML view of Promotion Flow with parallel environments"
max-width="60%"
%}

{:start="5"}
1. Continue with [Trigger and view product release for parallel environment promotion](#trigger-and-view-product-release-for-parallel-environment-promotion).

## Trigger and view product release for parallel environment promotion

Trigger the new Promotion Flow with parallel environments to create a new release for the product. 
Monitor the release to see changes promoted simultaneously across all defined parallel environments. 


1. Open the Promotion Flow with the parallel environments, `multi-env-parallel-promotion` for the quick start, and click **Trigger**.
1. Select the product, the application to promote, and then click **Trigger** once again. 
1. Click **View Release Details**.

The Release view displays the parallel structure of the Promotion Flow, with simultaneous promotions across `prod`, `prod-eu`, and `prod-asia`.



{% include 
image.html 
lightbox="true" 
file="/images/quick-start/promotions/quick-start-parallel-release-view.png" 
url="/images/quick-start/promotions/quick-start-parallel-release-view.png"
alt="Promotions quick start: Release view of Promotion Flow with parallel environments" 
caption="Promotions quick start: Release view of Promotion Flow with parallel environments"
max-width="60%"
%}

## What's next
The final quick start on promotions will guide you through creating dependencies between environments to define the order for promotions.

[Quick start: Advanced Promotion Flow with environment dependencies]({{site.baseurl}}/docs/gitops-quick-start/dependency-multi-env-promotion/)

 
 